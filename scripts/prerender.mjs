// Renders the React app to static HTML and injects it into dist/index.html,
// so the page paints before any JavaScript runs (and link-preview bots see real content).
// Also preloads the Latin font files, so text lays out once in its final font.
import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const ssrEntry = resolve(root, ".ssr/entry-server.js");
const htmlPath = resolve(root, "dist/index.html");

const { render } = await import(pathToFileURL(ssrEntry).href);
let html = await readFile(htmlPath, "utf8");
const placeholder = '<div id="root"></div>';

if (!html.includes(placeholder)) {
  throw new Error(`prerender: ${placeholder} not found in dist/index.html`);
}
html = html.replace(placeholder, `<div id="root">${render()}</div>`);

const fonts = (await readdir(resolve(root, "dist/assets"))).filter((file) =>
  /^(inter-latin-wght-normal|jetbrains-mono-latin-wght-normal|archivo-display|kalam-note)-.*\.woff2$/.test(file),
);
const preloads = fonts
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`)
  .join("\n    ");
html = html.replace("</title>", `</title>\n    ${preloads}`);

await writeFile(htmlPath, html);
await rm(resolve(root, ".ssr"), { recursive: true, force: true });
console.log(`prerender: wrote dist/index.html (${fonts.length} font preloads)`);
