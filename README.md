# Aniket Patil · Technical Secretary campaign site

Single-page campaign site for Aniket Patil, candidate for Technical Secretary, IIITDM Kurnool Students' Union Elections 2026–27.

Built with Vite, React, TypeScript (strict) and Tailwind CSS v4. Fonts are self-hosted from Fontsource. There is no router and no animation library. The page is prerendered to static HTML at build time, so it loads fast on phones and link previews show real content.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, build, prerender → dist/
npm run preview    # serve dist/ at http://localhost:4173
```

Node 22.12 or newer.

---

## Editing content

All text, facts, links and sample data live in `src/content/`. You never need to touch the components to change wording.

| File | What's in it |
|---|---|
| `src/content/site.ts` | Hero, About, Experience, achievements, Vision, the seven pillars, Event App, Coding League, New Coders, Mentorship, Plan, Contact, footer, links, vote date |
| `src/content/demoEvents.ts` | The five fictional events in the Event App demo. Dates are offsets from today. |
| `src/content/demoLeague.ts` | Fictional handles and rating histories for the League dashboard |

**Empty means hidden.** Any field set to `""` (or `null`) is not rendered. Leave a field empty rather than guessing.

Common edits in `site.ts`:

- **Links** (`site.links`): add the email, GitHub, LinkedIn, Codeforces, CodeChef, LeetCode and Instagram URLs you want shown. Only filled-in links appear in the Contact section.
  - Filling in `codeforces`, `codechef` or `leetcode` also adds a "profile" link on the matching achievement block, so anyone can verify the claim.
  - Filling in `email` adds an email fallback to the form.
  - `repo` adds a "Source on GitHub" link to the footer.
- **Vote date** (`site.voteDate`): e.g. `"14 October 2026"`. Shows "Voting on …" in the hero.
- **Form service name** (`site.contact.formServiceName`): e.g. `"Formspree"`. Adds "Submissions are processed by …" to the privacy note.

### Content rules

- Facts must match the experience sheet word for word in strength: "Coordinator", "ranked 20th among 8,000+ participants", "submitted to CVIP 2026", "part of the organizing team".
- Everything in the manifesto, Coding League, New Coders, Mentorship and Plan sections is a proposal and carries a `Proposed` tag.
- The one firm commitment is building the event-tracking app. It always appears with the note that official adoption needs consultation and institute approval.
- If you change the handwritten margin note (`hero.marginNote`), run `npm run fonts` (see below).

---

## Adding the photo, poster and BitSquad logo

1. Put the original files in `assets-src/`:
   - `aniket.jpg`: the original photograph (not the poster crop)
   - `poster.jpg` or `poster.png`
   - `bitsquad-logo.svg` or `bitsquad-logo.png`
2. Run:
   ```bash
   npm run images   # resizes the photo to WebP (no crop, no filters), copies poster and logo
   npm run og       # re-renders the link-preview image with the photo
   ```
3. Commit the changes in `public/` and `src/content/assets.generated.json`.

Until the photo is added, the hero frame shows an "AP" monogram. The poster download link and the BitSquad logo stay hidden until their files exist.

`npm run og` uses your installed Chrome or Edge in headless mode. If it can't find one, set `CHROME_PATH` to the browser executable.

---

## Connecting the suggestion form

The form POSTs JSON to the URL in the `VITE_FORM_ENDPOINT` environment variable. If the variable is not set, the form still shows, but its button is disabled with the note "The suggestion form isn't connected yet".

Pick one service:

### Option A: Formspree (easiest)
1. Create a form at [formspree.io](https://formspree.io). Copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
2. Set `VITE_FORM_ENDPOINT` to that URL.
3. Set `contact.formServiceName` to `"Formspree"`.

### Option B: Web3Forms
1. Get an access key at [web3forms.com](https://web3forms.com). The key is designed to be public.
2. Set `VITE_FORM_ENDPOINT=https://api.web3forms.com/submit` and `VITE_FORM_ACCESS_KEY=<your key>`.
3. Set `contact.formServiceName` to `"Web3Forms"`.

### Option C: Google Sheet (via Apps Script)
Follow the steps at the top of [`docs/google-apps-script.js`](docs/google-apps-script.js). Set `VITE_FORM_ENDPOINT` to the web app URL ending in `/exec`, and `contact.formServiceName` to `"Google Sheets"`.

### Where to set the variable
- **Locally:** copy `.env.example` to `.env` and fill it in, then restart `npm run dev`.
- **On Vercel:** Project → Settings → Environment Variables. Then **redeploy**: Vite reads these at build time.

What gets sent: `category`, `suggestion`, `name` (optional), `email` (optional), `quote_publicly_without_name` (true/false) and a `subject` line. A hidden spam-trap field is checked in the browser. If a bot fills it, nothing is sent.

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com): **Add New → Project** and import the repository.
3. Vercel detects Vite. The settings should read (they're also pinned in `vercel.json`):
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add the environment variables for the form (see above). They're optional for the first deploy.
5. Click **Deploy**.

Every push to `main` redeploys automatically.

### Link previews (WhatsApp, Telegram, Instagram)
`og:image` needs an absolute URL. On Vercel it's filled in automatically from your production domain. If you use a custom domain, set `VITE_SITE_URL=https://your-domain` in Vercel and redeploy.

WhatsApp caches previews. If you share the link before the photo is added, a new preview can take a while to appear. Adding `?v=2` to the shared link forces a fresh one.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type-check → client build → server build → prerender into `dist/index.html` |
| `npm run preview` | Serve the production build locally |
| `npm run images` | Process files in `assets-src/` into `public/` and update `assets.generated.json` |
| `npm run og` | Render `public/og-image.png` (1200×630) with headless Chrome/Edge |
| `npm run fonts` | Rebuild the small Archivo and Kalam subsets in `src/fonts/` |

---

## How it's put together

```
src/
  content/              all editable copy and data
  components/ui/        Button, Tag, Section, SectionHeader, SpecBlock, DemoFrame, Tabs, DashList, Rule
  components/sections/  Nav, Hero, About, Experience, Vision, Manifesto, EventApp,
                        CodingLeague, NewCoders, Mentorship, Plan, Contact, Footer
  components/diagrams/  VisionDiagram, EventLifecycle, CoderRoute (inline SVG / CSS)
  components/demos/     EventAppDemo, LeagueDashboard (local state only, no network)
  hooks/                useActiveSection, useReveal, useReducedMotion, useToday
  lib/                  submitSuggestion, cx
  fonts/                generated font subsets (npm run fonts)
  index.css             design tokens (colours, type scale) and base styles
  main.tsx / boot.tsx   loads React after first paint, then hydrates the prerendered HTML
  entry-server.tsx      used by the build to prerender the page
scripts/                prerender, images, og-image, fonts
public/                 favicon, og-image, robots.txt, and generated images
```

Performance choices:
- The HTML is prerendered, so text shows before any JavaScript runs. React loads after the first paint.
- The display font (Archivo) and the handwriting font (Kalam) are subset to the characters actually used. The full Fontsource files stay declared as a fallback for any other character.
- The four font files needed on first paint are preloaded.

Last local Lighthouse run (mobile): Performance 97, Accessibility 100, Best Practices 100, SEO 100.
