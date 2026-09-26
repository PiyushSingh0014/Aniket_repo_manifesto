# Source images

Drop the original files here, then run `npm run images` and `npm run og`.

| File | What happens |
|---|---|
| `aniket.jpg` | Your original photograph. Resized to 880px wide WebP (under 200 KB) as `public/aniket.webp`. No crop, no filters. Replaces the "AP" monogram in the hero frame. |
| `poster.jpg` or `poster.png` | Copied to `public/poster.jpg`. Turns on the "Download the manifesto poster" link. |
| `bitsquad-logo.svg` or `bitsquad-logo.png` | Copied to `public/`. Shown next to the BitSquad entry in Experience. |

`npm run og` then re-renders the link-preview image (`public/og-image.png`) with the photo in it.

Commit the generated files in `public/` and `src/content/assets.generated.json`. The originals here can be committed too, or left out.

`experience-sheet.jpeg` is the factual source for every role, number and achievement on the site. It is not published on the site.
