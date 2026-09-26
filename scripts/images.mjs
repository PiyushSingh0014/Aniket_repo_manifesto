// Prepares images from assets-src/ for the site and records them in
// src/content/assets.generated.json, so the content file picks them up.
//
//   assets-src/aniket.jpg         → public/aniket.webp  (resized only: no crop, no filters)
//   assets-src/poster.jpg|png     → public/poster.jpg   (download link in the hero)
//   assets-src/bitsquad-logo.svg  → public/bitsquad-logo.svg
//   assets-src/bitsquad-logo.png  → public/bitsquad-logo.png (resized)
//
// Also renders public/apple-touch-icon.png from public/favicon.svg.
// Run: npm run images   (then `npm run og` to refresh the link-preview image)
import { copyFile, readFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const src = (name) => resolve(root, "assets-src", name);
const pub = (name) => resolve(root, "public", name);
const manifestPath = resolve(root, "src/content/assets.generated.json");

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const kb = async (file) => `${Math.round((await stat(file)).size / 1024)} KB`;
const firstExisting = (names) => names.map(src).find((file) => existsSync(file));

// Photo: shown at up to ~440px wide, so export 880px (2×). Keep the original aspect ratio.
const photo = firstExisting(["aniket.jpg", "aniket.jpeg", "aniket.png", "aniket.webp"]);
if (photo) {
  const out = pub("aniket.webp");
  let quality = 82;
  let info;
  do {
    info = await sharp(photo)
      .rotate() // respect camera orientation; no crop
      .resize({ width: 880, withoutEnlargement: true })
      .webp({ quality })
      .toFile(out);
    quality -= 6;
  } while (info.size > 200 * 1024 && quality > 40);
  manifest.photo = { src: "/aniket.webp", width: info.width, height: info.height };
  console.log(`photo   → public/aniket.webp ${info.width}×${info.height}, ${await kb(out)}`);
} else {
  console.log("photo   – no assets-src/aniket.jpg, skipped");
}

// Poster: offered as a download, never embedded in the page.
const poster = firstExisting(["poster.jpg", "poster.jpeg", "poster.png"]);
if (poster) {
  const out = pub("poster.jpg");
  if (/\.jpe?g$/i.test(poster)) await copyFile(poster, out);
  else await sharp(poster).jpeg({ quality: 90, mozjpeg: true }).toFile(out);
  manifest.poster = "/poster.jpg";
  console.log(`poster  → public/poster.jpg, ${await kb(out)}`);
} else {
  console.log("poster  – no assets-src/poster.jpg, skipped");
}

// BitSquad logo, shown 40px tall next to the experience entry.
const logoSvg = src("bitsquad-logo.svg");
const logoPng = firstExisting(["bitsquad-logo.png", "bitsquad-logo.jpg", "bitsquad-logo.webp"]);
if (existsSync(logoSvg)) {
  await copyFile(logoSvg, pub("bitsquad-logo.svg"));
  const meta = await sharp(logoSvg).metadata();
  const height = 40;
  const width = Math.round((meta.width / meta.height) * height);
  manifest.bitsquadLogo = { src: "/bitsquad-logo.svg", width, height };
  console.log(`logo    → public/bitsquad-logo.svg`);
} else if (logoPng) {
  const out = pub("bitsquad-logo.png");
  const info = await sharp(logoPng).resize({ height: 80, withoutEnlargement: true }).png().toFile(out);
  const height = 40;
  manifest.bitsquadLogo = { src: "/bitsquad-logo.png", width: Math.round((info.width / info.height) * height), height };
  console.log(`logo    → public/bitsquad-logo.png, ${await kb(out)}`);
} else {
  console.log("logo    – no assets-src/bitsquad-logo.svg or .png, skipped");
}

await sharp(pub("favicon.svg"), { density: 1200 }).resize(180, 180).png().toFile(pub("apple-touch-icon.png"));
console.log("icon    → public/apple-touch-icon.png");

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log("wrote src/content/assets.generated.json");
