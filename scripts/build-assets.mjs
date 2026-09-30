// Turns the raw Figma exports in .claude/figma/assets into web-ready files in public/images.
// Idempotent: every run rewrites the same outputs. Usage: npm run assets
import { copyFile, mkdir, readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, ".claude/figma/assets");
const MANUAL = path.join(SRC, "manual");
const OUT = path.join(ROOT, "public/images");

const TINTS = { lime: "#D4FB20", white: "#F5F5F6" };
const WEBP = { quality: 90, effort: 5 };

// Figma "Shadow A" (--shadow-float in globals.css): x, y, blur and alpha byte of each layer.
const SHADOW_A = [
  [0.518, 0.741, 3.036, 0x0a],
  [2.233, 3.19, 5.723, 0x0f],
  [5.383, 7.69, 9.571, 0x12],
  [10.208, 14.582, 16.087, 0x14],
  [16.946, 24.209, 24, 0x17],
  [25.838, 36.912, 36, 0x1a],
  [37.122, 53.032, 56, 0x1b],
  [51.038, 72.912, 72, 0x21],
];
// How far Shadow A reaches past the picture's box (3σ of the widest layer). src/components/ui/FloatShadow.tsx
// places the baked file with the same padding.
const SHADOW_PAD = { left: 64, top: 40, right: 160, bottom: 184 };

const written = [];
const missing = [];

const rel = (p) => path.relative(ROOT, p).replaceAll("\\", "/");

async function log(file) {
  const ext = path.extname(file);
  let size = "";
  if (ext === ".svg") {
    const svg = await readFile(file, "utf8");
    const m = svg.match(/<svg[^>]*\bwidth="([\d.]+)[^"]*"[^>]*\bheight="([\d.]+)/);
    size = m ? `${m[1]}×${m[2]}` : "svg";
  } else {
    const { width, height } = await sharp(file).metadata();
    size = `${width}×${height}`;
  }
  const kb = ((await stat(file)).size / 1024).toFixed(1);
  written.push(file);
  console.log(`  ${rel(file).padEnd(58)} ${size.padStart(11)}  ${kb.padStart(7)} KB`);
}

async function ensureDir(file) {
  await mkdir(path.dirname(file), { recursive: true });
}

/** Parses the "Ornament map" table in the Figma README. */
async function readOrnamentMap() {
  const md = await readFile(path.join(ROOT, ".claude/figma/README.md"), "utf8");
  const section = md.split("### Ornament map")[1];
  if (!section) throw new Error("No 'Ornament map' section in .claude/figma/README.md");
  return section
    .split("\n")
    .filter((line) => /^\|\s*[A-Z]/.test(line) && !line.startsWith("| Section"))
    .map((line) => {
      const [section, node, render, size, xy, tint, extra] = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      return {
        section,
        node,
        shape: render.replace(/\?$/, ""),
        guessed: render.endsWith("?"),
        size: Number(size),
        tint: tint.startsWith("lime") ? "lime" : "white",
        mirrored: /mirror/i.test(extra ?? ""),
        xy,
      };
    });
}

async function buildOrnaments() {
  console.log("\nOrnaments → public/images/ornaments");
  const rows = await readOrnamentMap();
  const seen = new Set();
  for (const row of rows) {
    const src = path.join(SRC, "ornaments", `render-${row.shape}.png`);
    if (!existsSync(src)) {
      missing.push(`ornament ${row.section} ${row.node}: no render-${row.shape}.png (render unconfirmed)`);
      continue;
    }
    const name = `${row.shape}-${row.tint}-${row.size}${row.mirrored ? "-flip" : ""}`;
    if (seen.has(name)) continue;
    seen.add(name);

    const px = row.size * 2;
    let render = sharp(src).resize(px, px, { fit: "fill", kernel: "lanczos3" });
    if (row.mirrored) render = render.flop();
    const base = await render.ensureAlpha().png().toBuffer();

    // Solid tint clipped to the render's silhouette, hard-lit over the render.
    const tint = await sharp({
      create: { width: px, height: px, channels: 4, background: TINTS[row.tint] },
    })
      .composite([{ input: base, blend: "dest-in" }])
      .png()
      .toBuffer();
    const lit = await sharp(base).composite([{ input: tint, blend: "hard-light" }]).removeAlpha().toBuffer();
    // The blend unions the alphas, so put the render's own alpha back.
    const alpha = await sharp(base).extractChannel("alpha").toBuffer();

    const out = path.join(OUT, "ornaments", `${name}.webp`);
    await ensureDir(out);
    await sharp(lit).joinChannel(alpha).webp({ ...WEBP, alphaQuality: 100 }).toFile(out);
    await log(out);
    if (row.guessed) console.log(`    ↳ ${row.section} ${row.node}: render is a guess, confirm with the manual auth-* export`);
  }
}

/** Converts to WebP at native size (never upscales). */
async function toWebp(src, out, { required = true } = {}) {
  if (!existsSync(src)) {
    if (required) missing.push(rel(src));
    return;
  }
  await ensureDir(out);
  await sharp(src).webp(WEBP).toFile(out);
  await log(out);
}

/**
 * Pre-renders Shadow A under a cut-out as a black WebP whose alpha is the shadow, so the page draws a plain image
 * instead of a drop-shadow() filter chain (which Chrome re-blurs on every scroll frame). `width`×`height` is the
 * picture's CSS box; `resize` and `crop` place the source in it the way the page does (object-cover, or a clipping
 * frame). Output is 1 px per CSS px, padded by SHADOW_PAD. The layers are independent, as in Figma.
 */
async function bakeShadow(src, out, { width, height, resize = { width, height }, crop }) {
  if (!existsSync(src)) {
    missing.push(rel(src));
    return;
  }
  let picture = sharp(src).resize(resize.width, resize.height, { fit: "cover", kernel: "lanczos3" });
  if (crop) picture = picture.extract(crop);
  const alpha = await picture.ensureAlpha().extractChannel("alpha").raw().toBuffer();

  const W = width + SHADOW_PAD.left + SHADOW_PAD.right;
  const H = height + SHADOW_PAD.top + SHADOW_PAD.bottom;
  // Product of (1 - layer alpha): the black layers stacked with source-over.
  const clear = new Float32Array(W * H).fill(1);
  for (const [x, y, blur, alphaByte] of SHADOW_A) {
    const left = SHADOW_PAD.left + Math.round(x);
    const top = SHADOW_PAD.top + Math.round(y);
    const layer = await sharp(alpha, { raw: { width, height, channels: 1 } })
      .extend({ left, top, right: W - width - left, bottom: H - height - top, background: "#000" })
      .blur({ sigma: blur / 2, minAmplitude: 0.001, precision: "float" })
      .extractChannel(0)
      .raw()
      .toBuffer();
    if (layer.length !== W * H) throw new Error(`bakeShadow: expected one channel, got ${layer.length / (W * H)}`);
    const a = alphaByte / 255 / 255;
    for (let i = 0; i < clear.length; i++) clear[i] *= 1 - a * layer[i];
  }

  const rgba = Buffer.alloc(W * H * 4);
  for (let i = 0; i < clear.length; i++) rgba[i * 4 + 3] = Math.round((1 - clear[i]) * 255);
  await ensureDir(out);
  await sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).webp({ lossless: true, effort: 6 }).toFile(out);
  await log(out);
}

async function buildPhotos() {
  console.log("\nPhotos, avatars and thumbnails → public/images");
  await toWebp(path.join(SRC, "hero/student.png"), path.join(OUT, "hero/student.webp"));
  await toWebp(path.join(SRC, "features/creator-photo.png"), path.join(OUT, "features/creator-photo.webp"));
  // Home student box 578×541 (object-cover); Features reuses it on its 577×540 box.
  await bakeShadow(path.join(SRC, "hero/student.png"), path.join(OUT, "hero/student-shadow.webp"), {
    width: 578,
    height: 541,
  });
  // Figma 34:1011: the photo at 683×683, shifted -124px, clipped by a 435×596 frame.
  await bakeShadow(path.join(SRC, "features/creator-photo.png"), path.join(OUT, "features/creator-photo-shadow.webp"), {
    width: 435,
    height: 596,
    resize: { width: 683, height: 683 },
    crop: { left: 124, top: 0, width: 435, height: 596 },
  });

  for (const dir of ["avatars", "testimonials"]) {
    for (const file of (await readdir(path.join(SRC, dir))).filter((f) => f.endsWith(".png")).sort()) {
      await toWebp(path.join(SRC, dir, file), path.join(OUT, dir, file.replace(/\.png$/, ".webp")));
    }
  }

  // Course thumbnails: course 1 came from the API export, 2–6 from the manual export.
  await toWebp(path.join(SRC, "course-card/thumb-learn-figma.jpg"), path.join(OUT, "courses/course-1.webp"));
  for (let n = 2; n <= 6; n++) {
    await toWebp(path.join(MANUAL, `thumb-${n}.png`), path.join(OUT, `courses/course-${n}.webp`));
  }

  // Detail-page, creator and auth images from the manual export.
  const manual = [
    ["video-thumb.png", "course/video-thumb.webp"],
    ...[1, 2, 3, 4].map((n) => [`sneak-${n}.png`, `course/sneak-${n}.webp`]),
    ["creator-purepearl.png", "creators/creator-purepearl.webp"],
    ["creator-sm.png", "creators/creator-sm.webp"],
    ...[1, 2, 3, 4].map((n) => [`reviewer-${n}.png`, `avatars/reviewer-${n}.webp`]),
  ];
  for (const [from, to] of manual) await toWebp(path.join(MANUAL, from), path.join(OUT, to));

  const auth = existsSync(MANUAL) ? (await readdir(MANUAL)).filter((f) => /^auth-.*\.png$/.test(f)).sort() : [];
  if (auth.length === 0) missing.push(rel(path.join(MANUAL, "auth-*.png")));
  for (const file of auth) {
    await toWebp(path.join(MANUAL, file), path.join(OUT, "ornaments", file.replace(/\.png$/, ".webp")));
  }
}

async function copySvg(src, out) {
  if (!existsSync(src)) {
    missing.push(rel(src));
    return;
  }
  await ensureDir(out);
  await copyFile(src, out);
  await log(out);
}

async function copySvgs() {
  console.log("\nSVGs → public/images/svg (verbatim)");
  const svg = (p) => path.join(OUT, "svg", p);

  // The blueprint grids, glows and logo marks in the Figma kit are drawn in CSS (bg-blueprint, ui/Glow) or inline
  // (Logo), so only the hero arc is copied.
  await copySvg(path.join(SRC, "hero/lime-arc.svg"), svg("lime-arc.svg"));

  await copySvg(path.join(MANUAL, "logo-light.svg"), svg("logo/logo-light.svg"));
  await copySvg(path.join(MANUAL, "logo-dark.svg"), svg("logo/logo-dark.svg"));
  for (let n = 1; n <= 5; n++) await copySvg(path.join(MANUAL, `brand-${n}.svg`), svg(`brands/brand-${n}.svg`));
  for (const icon of ["icon-design", "icon-facebook", "icon-google"]) {
    await copySvg(path.join(MANUAL, `${icon}.svg`), svg(`icons/${icon}.svg`));
  }
}

await buildOrnaments();
await buildPhotos();
await copySvgs();

console.log(`\n${written.length} files written.`);
if (missing.length) {
  console.log(`${missing.length} sources missing (skipped):`);
  for (const m of missing) console.log(`  - ${m}`);
}
