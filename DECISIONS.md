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
| Metadata API, `sitemap.ts`, `robots.ts` | `src/lib/routes.json` is the single route list; prerender injects per-route head tags; `scripts/seo-files.mjs` writes `sitemap.xml` and `robots.txt` | One list drives nav, titles, sitemap and prerender |
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
