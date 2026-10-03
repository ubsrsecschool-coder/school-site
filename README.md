# Uma Bharti Senior Secondary School — website

Marketing and information site for Uma Bharti Senior Secondary School, Bhora Kalan, Gurugram.
React + Vite + TypeScript + Tailwind CSS 4, prerendered to static HTML and hosted on Vercel.

Project rules, confirmed facts and design decisions: [CLAUDE.md](CLAUDE.md).
Why the build differs from the original Next.js plan: [DECISIONS.md](DECISIONS.md).

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run build` | Typecheck, build, prerender every route to static HTML, write `sitemap.xml` and `robots.txt` |
| `npm run preview` | Serve a build locally (note: it does not map `/about` to `about/index.html`; use a static server that does) |
| `npm run lint` | ESLint, including the ban on importing gated JSON directly |
| `npm run typecheck` | `tsc -b` |
| `npm test` | Vitest: the publish gate, content rules, wording rules, forms, SEO output |
| `npm run content:report` | Lists everything the publish gate is holding back, and why |
| `npm run tokens` | Regenerates `src/styles/tokens.generated.css` from `content/design-tokens.json` |
| `npm run images` | Generates the WebP variants named in `content/gallery.json` |

## Environment

Copy `.env.example` to `.env` locally; on Vercel set the same names under Project Settings.

| Variable | Needed for | If missing |
|---|---|---|
| `VITE_ENQUIRY_ENDPOINT` | The enquiry and contact forms (a Formspree-compatible URL) | The form says the message was not sent and offers a pre-filled email. It never pretends to succeed |
| `SITE_URL` | Canonical URLs, `og:url`, `og:image`, JSON-LD `url`, `sitemap.xml`, the `Sitemap:` line in `robots.txt` | Those are omitted and the build prints a warning. A domain is never guessed |

If the form provider is not Formspree, update `connect-src` and `form-action` in `vercel.json`.

## How content works

Everything the school can change lives in `content/*.json`. Pages never read those files directly;
they go through `src/lib/content.ts`, which applies the **publish gate**: an item reaches the public
site only if `verified` is `true` and `usable` is not `false`. Malformed JSON fails the build with a
readable message. See [docs/maintaining-the-site.md](docs/maintaining-the-site.md).

## Layout

```
content/            school-editable JSON + design tokens
docs/               requirements, content checklist, launch and maintenance guides
public/images/      photographs (campus/ are cropped; raw/ are the supplied originals)
scripts/            tokens, content report, image optimiser, prerender
src/
  components/       ui/ layout/ sections/ forms/
  lib/              gate, schema, content loader, routes, SEO, forms logic
  pages/            one component per route
  styles/           Tailwind entry, base, components, generated tokens
```
