# Decisions

Why the build differs from [PLAN.md](PLAN.md) and [docs/build-steps.md](docs/build-steps.md), which
were written for Next.js. Where this file and those disagree on *how to build*, this file wins.
Requirements, content rules and design rules are unchanged.

## 2026-10-03 — React + Vite instead of Next.js

Requested by the project owner. Consequences, and what replaced each Next.js feature:

| Next.js plan | Vite build | Why |
|---|---|---|
| Server Components read JSON at build | Client components import JSON through `src/lib/content.ts`; every route is prerendered to static HTML by `scripts/prerender.mjs` using an SSR build | Keeps crawlable HTML, link previews and a readable page without JavaScript |
| `app/api/enquiry/route.ts` | Form posts to a hosted form endpoint (`VITE_ENQUIRY_ENDPOINT`, Formspree-compatible) | Vite has no server. No custom backend, as the original spec allows |
| Per-IP rate limit, honeypot, min time | Honeypot field and minimum time-to-submit on the client; rate limiting and spam filtering are the form provider's | No server to hold a rate limiter |
| Progressive enhancement: form works without JS | Not achievable with a client-rendered form. Prerendered pages stay readable; `<noscript>` and the contact page carry phone and email | Honest trade-off of dropping the server |
| `next/font` | `@fontsource` packages imported in CSS, bundled and self-hosted | Same goal: no third-party font request |
| `next/image` | Plain `<img>` with explicit `width`/`height` from `gallery.json`, `loading="lazy"`, hero eager | Prevents layout shift; no image CDN on a static host |
| Metadata API, `sitemap.ts`, `robots.ts` | `src/lib/routes.json` is the single route list; prerender injects per-route head tags; `scripts/prerender.mjs` also writes `sitemap.xml` and `robots.txt` | One list drives nav, titles, sitemap and prerender |
| ESLint ban on JSON imports | Same rule, scoped to the three gated files | `routes.json` and similar are not gated content |

## Publish gate shared with build scripts

`src/lib/gate.ts` has no imports and only erasable TypeScript, so `scripts/content-report.mjs`
imports the very same function the site uses (Node strips the types natively). The report and the
site cannot disagree about what is withheld.

## Structured board results

`content/achievements.json` gained a `classes` array on the two verified board-result entries so
the UI can render the figures as numbers. The values restate the confirmed facts in `CLAUDE.md`
and add nothing. 2024–25 does not state a passed count, so none is recorded.

## No site URL guessed

The production domain is not decided. Canonical URLs, `og:url`, JSON-LD `url`, `sitemap.xml` and the
`Sitemap:` line in `robots.txt` are only emitted when `SITE_URL` is set at build time. Without it the
build says so and omits them rather than inventing a domain.

## Comments

No comments in code files, per the project owner's global rule. Rationale lives here, in commit
messages and in `docs/`.

## 2026-10-04 — Performance and rendering choices (Phase 6)

**Reveal and counters never hide first-screen content.** The first version hid every reveal
element until JavaScript ran, which delayed LCP by about two seconds on a throttled phone and made
the prerender pointless. Elements already in the viewport when the app starts are left visible;
only elements below the fold are hidden, then revealed as they scroll in. Counters follow the same
rule and animate only when they start below the fold.

**Images ship as WebP with a JPEG fallback.** `content/gallery.json` has an optional `webp` path;
`npm run images` generates it from `src` with sharp (64KB to 19KB and 97KB to 35KB). `og:image`
keeps the JPEG because social crawlers handle WebP unevenly.

**The hero photo is preloaded only at desktop widths** (`min-width: 1081px`), where it is above the
fold. On a phone it sits below the text and would otherwise compete with the fonts and CSS.

**The app bundle loads at low fetch priority.** The prerendered HTML is complete and readable
without it, so the bytes of the first screen go to CSS and fonts first.

**Three fonts are preloaded:** Fraunces (latin), Plus Jakarta Sans (latin) and Noto Serif
Devanagari 700. The 600 weight of the Devanagari face was dropped; nothing used it.

**Measured** on the built site, Lighthouse mobile preset (simulated slow 4G, 4x CPU), served with
brotli like Vercel: Accessibility 100, Best Practices 100, SEO 100 on every page; Performance
91 to 97; CLS 0; LCP 2.4 to 2.8s. Desktop: Performance 100, LCP 0.4 to 0.6s. axe-core reports zero
violations on every route at 390px and 1440px, and on the open drawer, open lightbox, form with
errors, second results tab and loaded map.

**Open: LCP is 0.0 to 0.3s above the 2.5s target on some phone pages.** The remaining lever is the
Fraunces optical-size axis. A weight-only build is 37KB against 67KB, but the design tokens name
optical sizing as part of the typographic identity, so this is a design decision for the project
owner and has not been made.

## Pages and links not built

- `/about/chairman-message` exists as a stub, is `noindex`, is left out of the sitemap, and nothing
  links to it. It is there for the day the message and portrait arrive.
- The homepage has no separate gallery preview. With two photographs it would repeat the campus
  section, so the campus section links to `/gallery` instead.
- The WhatsApp row appears only when `whatsapp` in `src/lib/school.ts` is given a value.
