// Screenshots a page with headless Edge/Chrome and scores it against the Figma reference, band by band.
// Usage: node scripts/visual-diff.mjs <page> [--url /path] [--ref file] [--width 1440]
// Pages live in scripts/visual-pages.json; the dev server must be running (BASE_URL, default http://localhost:3000).
// Headless Chromium can't go below ~500px wide, so check mobile in DevTools instead.
import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { parseArgs, promisify } from "node:util";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIFF_DIR = path.join(ROOT, ".claude/figma/diff");
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const BROWSERS = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

const { values: opts, positionals } = parseArgs({
  allowPositionals: true,
  options: { url: { type: "string" }, ref: { type: "string" }, width: { type: "string", default: "1440" } },
});

const pageName = positionals[0];
const pages = JSON.parse(await readFile(path.join(import.meta.dirname, "visual-pages.json"), "utf8"));
if (!pageName || !pages[pageName]) {
  console.error(`Usage: node scripts/visual-diff.mjs <page> [--url /path] [--ref file] [--width 1440]`);
  console.error(`Pages: ${Object.keys(pages).join(", ")}`);
  process.exit(1);
}

const config = pages[pageName];
const url = new URL(opts.url ?? config.url, BASE_URL).href;
const refPath = path.resolve(ROOT, opts.ref ?? config.ref);
const width = Number(opts.width);

if (!existsSync(refPath)) {
  console.error(`Reference not found: ${path.relative(ROOT, refPath)}. Export it from Figma (Phase 00, step A) or pass --ref.`);
  process.exit(1);
}
const browser = BROWSERS.find((b) => existsSync(b));
if (!browser) {
  console.error("No Edge or Chrome binary found.");
  process.exit(1);
}

// Scale the 1440 reference (and its bands) when a different width is asked for. Scores are then approximate.
const refMeta = await sharp(refPath).metadata();
const scale = width / refMeta.width;
const refHeight = Math.round(refMeta.height * scale);
const ref = await sharp(refPath).resize(width, refHeight).flatten({ background: "#fff" }).removeAlpha().raw().toBuffer();
if (scale !== 1) console.warn(`Note: reference is ${refMeta.width}px wide; scaled ×${scale.toFixed(3)} for --width ${width}.`);

// Capture.
const profile = await mkdtemp(path.join(os.tmpdir(), "bytespace-diff-"));
const shotPath = path.join(profile, "shot.png");
try {
  await promisify(execFile)(
    browser,
    [
      "--headless=new",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${profile}`,
      `--window-size=${width},${refHeight}`,
      "--virtual-time-budget=8000",
      `--screenshot=${shotPath}`,
      url,
    ],
    { timeout: 60_000 },
  );
  if (!existsSync(shotPath)) throw new Error("the browser exited without writing a screenshot");
} catch (err) {
  console.error(`Capture of ${url} failed: ${err.message}\nIs the dev server running (npm run dev)?`);
  await rm(profile, { recursive: true, force: true });
  process.exit(1);
}

// Normalise the capture to exactly width × refHeight (pad with white or crop).
const shotMeta = await sharp(shotPath).metadata();
const current = await sharp(shotPath)
  .flatten({ background: "#fff" })
  .extend({
    right: Math.max(0, width - shotMeta.width),
    bottom: Math.max(0, refHeight - shotMeta.height),
    background: "#fff",
  })
  .extract({ left: 0, top: 0, width, height: refHeight })
  .removeAlpha()
  .raw()
  .toBuffer();
await rm(profile, { recursive: true, force: true });
if (shotMeta.width !== width || shotMeta.height !== refHeight) {
  console.warn(`Note: capture was ${shotMeta.width}×${shotMeta.height}; normalised to ${width}×${refHeight}.`);
}

// Score each band.
await mkdir(DIFF_DIR, { recursive: true });
const raw = (h) => ({ raw: { width, height: h, channels: 3 } });
const rows = [];
for (const [name, from, to] of config.bands) {
  const top = Math.round(from * scale);
  const bottom = Math.min(refHeight, Math.round((to ?? refMeta.height) * scale));
  const h = bottom - top;
  const start = top * width * 3;
  const a = ref.subarray(start, start + h * width * 3);
  const b = current.subarray(start, start + h * width * 3);

  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += Math.abs(a[i] - b[i]);
  const score = (sum / a.length / 255) * 100;

  const base = path.join(DIFF_DIR, `${pageName}-${name}`);
  await sharp({ create: { width: width * 2, height: h, channels: 3, background: "#fff" } })
    .composite([
      { input: a, ...raw(h), left: 0, top: 0 },
      { input: b, ...raw(h), left: width, top: 0 },
    ])
    .png()
    .toFile(`${base}-side.png`);
  await sharp(a, raw(h))
    .composite([{ input: await sharp(b, raw(h)).png().toBuffer(), blend: "difference" }])
    .png()
    .toFile(`${base}-diff.png`);

  rows.push({ band: name, y: `${from}–${to ?? refMeta.height}`, score });
}

console.log(`\n${pageName}  ${url}  @${width}  (ref ${path.relative(ROOT, refPath).replaceAll("\\", "/")})\n`);
console.log(`${"band".padEnd(20)}${"y range".padEnd(14)}${"diff %".padStart(8)}`);
console.log("-".repeat(42));
for (const r of rows) {
  console.log(`${r.band.padEnd(20)}${r.y.padEnd(14)}${r.score.toFixed(2).padStart(8)}${r.score <= 2 ? "  ✓" : ""}`);
}
const mean = rows.reduce((s, r) => s + r.score, 0) / rows.length;
console.log("-".repeat(42));
console.log(`${"mean".padEnd(34)}${mean.toFixed(2).padStart(8)}`);
console.log(`\nSide-by-side and diff PNGs: ${path.relative(ROOT, DIFF_DIR).replaceAll("\\", "/")}/${pageName}-<band>-{side,diff}.png`);
