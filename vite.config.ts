import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Link previews (WhatsApp, Telegram, X) need absolute URLs for og:image.
// Set VITE_SITE_URL to a custom domain, or let Vercel's production URL fill it in.
function resolveSiteUrl(): string {
  const explicit = process.env.VITE_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return vercel ? `https://${vercel}` : "";
}

function siteUrlPlugin(): Plugin {
  const siteUrl = resolveSiteUrl();
  return {
    name: "site-url",
    transformIndexHtml(html) {
      // A relative canonical URL is worse than none, so drop it when the domain is unknown.
      const out = siteUrl ? html : html.replace(/\s*<link rel="canonical"[^>]*>/, "");
      return out.replaceAll("%SITE_URL%", siteUrl);
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), siteUrlPlugin()],
  build: {
    copyPublicDir: !isSsrBuild,
    // Keep fonts as files (preloaded, cached) instead of base64 inside the render-blocking CSS
    assetsInlineLimit: (file: string) => (file.endsWith(".woff2") ? false : undefined),
  },
}));
