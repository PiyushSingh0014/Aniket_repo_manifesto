// Renders public/og-image.png (1200×630), the link-preview card for WhatsApp and others.
// Uses your installed Chrome or Edge in headless mode. Set CHROME_PATH to override.
// Includes the photo automatically once public/aniket.webp exists (run `npm run images` first).
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const out = resolve(root, "public/og-image.png");

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const browser = candidates.find((p) => existsSync(p));
if (!browser) throw new Error("og: Chrome or Edge not found. Set CHROME_PATH to your browser executable.");

const font = async (pkg, file) =>
  `data:font/woff2;base64,${(await readFile(resolve(root, "node_modules", pkg, "files", file))).toString("base64")}`;
const archivo = await font("@fontsource-variable/archivo", "archivo-latin-wdth-normal.woff2");
const inter = await font("@fontsource-variable/inter", "inter-latin-wght-normal.woff2");
const mono = await font("@fontsource-variable/jetbrains-mono", "jetbrains-mono-latin-wght-normal.woff2");

const photoPath = resolve(root, "public/aniket.webp");
const photo = existsSync(photoPath)
  ? `data:image/png;base64,${(await sharp(photoPath).png().toBuffer()).toString("base64")}`
  : null;

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: Archivo; src: url(${archivo}) format("woff2"); font-weight: 100 900; font-stretch: 62% 125%; }
@font-face { font-family: Inter; src: url(${inter}) format("woff2"); font-weight: 100 900; }
@font-face { font-family: Mono; src: url(${mono}) format("woff2"); font-weight: 100 800; }
* { margin: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body {
  background-color: #001A44;
  background-image:
    linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px);
  background-size: 32px 32px;
  color: #fff; font-family: Inter, sans-serif; position: relative;
}
.left { position: absolute; left: 72px; top: 70px; width: 640px; }
.meta { font-family: Mono; font-size: 17px; letter-spacing: .08em; white-space: nowrap; text-transform: uppercase; color: #1EAEE4; }
h1 { font-family: Archivo; font-weight: 880; font-stretch: 70%; text-transform: uppercase;
     font-size: 158px; line-height: .88; letter-spacing: -.01em; margin-top: 26px; }
h1 span { display: block; }
h1 .last { color: #1EAEE4; }
.role { font-size: 38px; font-weight: 600; margin-top: 34px; }
.tag { font-family: Mono; font-size: 18px; letter-spacing: .24em; color: rgba(255,255,255,.72); margin-top: 18px; }
.tag b { color: #1EAEE4; font-weight: 400; }
.frame { position: absolute; right: 96px; top: 96px; width: 330px; height: 412px;
         outline: 1.5px solid rgba(255,255,255,.7); outline-offset: 12px; background: #00244E; overflow: visible; }
.frame img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
.mono { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
        font-family: Archivo; font-weight: 880; font-stretch: 70%; font-size: 150px; color: #fff;
        background-image:
          linear-gradient(to right, rgba(255,255,255,.07) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,.07) 1px, transparent 1px);
        background-size: 32px 32px; }
.mono b { color: #1EAEE4; }
.tick { position: absolute; background: rgba(255,255,255,.7); }
.caption { position: absolute; right: 96px; top: 536px; width: 330px; font-family: Mono; font-size: 15px; white-space: nowrap; color: rgba(255,255,255,.72); }
</style></head><body>
<div class="left">
  <p class="meta">IIITDM Kurnool · Students' Union Elections 2026–27</p>
  <h1><span>Aniket</span><span class="last">Patil</span></h1>
  <p class="role">Candidate for Technical Secretary</p>
  <p class="tag">BUILD <b>|</b> CREATE <b>|</b> COMPETE <b>|</b> TOGETHER</p>
</div>
<div class="frame">
  ${photo ? `<img src="${photo}" alt="">` : `<div class="mono">A<b>P</b></div>`}
  <span class="tick" style="left:-30px;top:-13px;width:12px;height:1.5px"></span>
  <span class="tick" style="left:-13px;top:-30px;width:1.5px;height:12px"></span>
  <span class="tick" style="right:-30px;top:-13px;width:12px;height:1.5px"></span>
  <span class="tick" style="right:-13px;top:-30px;width:1.5px;height:12px"></span>
  <span class="tick" style="left:-30px;bottom:-13px;width:12px;height:1.5px"></span>
  <span class="tick" style="left:-13px;bottom:-30px;width:1.5px;height:12px"></span>
  <span class="tick" style="right:-30px;bottom:-13px;width:12px;height:1.5px"></span>
  <span class="tick" style="right:-13px;bottom:-30px;width:1.5px;height:12px"></span>
</div>
<p class="caption">Aniket Patil · B.Tech CSE, 3rd year</p>
</body></html>`;

const dir = await mkdtemp(join(tmpdir(), "og-"));
const page = join(dir, "og.html");
const shot = join(dir, "og.png");
await writeFile(page, html);

// Render a little taller than needed, then crop, so browser chrome differences never clip the card.
execFileSync(
  browser,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1200,700",
    "--virtual-time-budget=3000",
    `--screenshot=${shot}`,
    pathToFileURL(page).href,
  ],
  { stdio: "ignore" },
);

await sharp(shot).extract({ left: 0, top: 0, width: 1200, height: 630 }).png({ compressionLevel: 9 }).toFile(out);
await rm(dir, { recursive: true, force: true });
console.log(`og: wrote public/og-image.png (1200×630)${photo ? " with photo" : " with monogram (no photo yet)"}`);
