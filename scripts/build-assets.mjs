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

async function buildPhotos() {
  console.log("\nPhotos, avatars and thumbnails → public/images");
  await toWebp(path.join(SRC, "hero/student.png"), path.join(OUT, "hero/student.webp"));
  await toWebp(path.join(SRC, "features/creator-photo.png"), path.join(OUT, "features/creator-photo.webp"));

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

  for (const file of (await readdir(path.join(SRC, "backgrounds"))).filter((f) => f.endsWith(".svg")).sort()) {
    await copySvg(path.join(SRC, "backgrounds", file), svg(file));
  }
  await copySvg(path.join(SRC, "hero/lime-arc.svg"), svg("lime-arc.svg"));
  await copySvg(path.join(SRC, "logo/mark-light.svg"), svg("logo/mark-light.svg"));
  await copySvg(path.join(SRC, "logo/mark-footer.svg"), svg("logo/mark-footer.svg"));

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
