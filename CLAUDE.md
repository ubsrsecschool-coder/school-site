# Uma Bharti Senior Secondary School — Website

Project context for Claude Code sessions working in this repo. Full detail lives in
[docs/requirements-analysis.md](docs/requirements-analysis.md) — this file is the quick-reference
summary; that doc is the source of truth when the two disagree.

## What this project is

A trust-building marketing/info website for a long-established (est. 1999), English-medium,
community-rooted school in Bhora Kalan, Gurugram, Haryana. It is **not** a coaching-institute-style
flashy site — lean into the school's real, decades-long identity (navy/red/gold brand colors, the
Saraswati crest, a genuine reused tagline) rather than a generic template look.

## Non-negotiable content rule

**No statistic, award, affiliation, or testimonial goes on the live site beyond what the school has
explicitly confirmed.** If a fact isn't verified, the UI renders a `[Needs verification]` placeholder
— never a plausible-sounding guess, and never silently drop the section either. See
[docs/content-checklist.md](docs/content-checklist.md) for exactly what's confirmed vs. still pending.

This matters especially for anything involving minors: names, photos, and marks of students must not
be published without confirmed parental/guardian consent (see checklist).

## Confirmed facts (safe to use as-is)

- **Name:** Uma Bharti Senior Secondary School (spelling is "Bharti", not "Bharati")
- **Location:** Bhora Kalan, Gurugram (Gurgaon), Haryana — *village spelling itself still needs
  verification, see checklist*
- **Established:** 1999
- **Medium:** English
- **Classes:** Nursery to Class XII
- **Board:** HBSE-affiliated (Haryana Board of School Education), CBSE-pattern curriculum — always
  phrase it exactly this way, never "CBSE-affiliated"
- **Chairman:** Mr. Randhir Singh Chauhan (title is "Chairman", not "Chairperson")
- **Phones:** 9813218913, 8053170444, 8053170448
- **Email:** umabhartischool@gmail.com
- **Motto:** *Tamaso Ma Jyotirgamaya* — तमसो मा ज्योतिर्गमय — "Lead me from darkness to light"
  (render in Noto Sans Devanagari)
- **Tagline:** "Building Strong Foundation for Tomorrow"
- **Admissions:** 2026–27 session open; scholarship-cum-admission test held 8 Feb 2026 for Classes
  1–XI (Science/Commerce/Humanities); no admission fee; full tuition-fee concession for a third child
- **Board results:** 2024–25 — Class X: 46 students, 18 merit, 100% pass; Class XII: 44 students, 8
  merit, 100% pass. Also cited: 10th session "2026" — 64/64 passed (100%)
- **Sports:** multiple 1st/2nd/3rd place finishes at SGFI District/Block athletics

## Tech stack

- **Framework:** Next.js (React) + Tailwind CSS
- **Content:** flat JSON files under `content/` (non-technical admin edits notices/results); consider
  a headless CMS (e.g. Sanity) later if budget allows
- **Forms:** a form service (e.g. Formspree) or a serverless API route + email — no custom backend
- **Hosting:** Vercel

## Folder structure

```
/app
  /about
  /academics
  /admissions
  /achievements
  /gallery
  /contact
/components
  Header, Footer, Hero, QuickFactsStrip, NoticeBoard, AchievementCard,
  GalleryGrid, AdmissionEnquiryForm, ContactForm, MapEmbed
/content
  notices.json
  achievements.json
  gallery.json
  faculty.json
  design-tokens.json
/public
  /images
/styles
docs/
  requirements-analysis.md   — full spec (sections A–K)
  content-checklist.md       — condensed "needs verification / needs content" tracker
```

Routes: `/`, `/about`, `/about/chairman-message`, `/about/principal-message`, `/academics`,
`/admissions`, `/achievements`, `/gallery`, `/contact`, `/notices`.

## Design system (Section F of the spec)

| Role | Hex |
|---|---|
| Primary (navy) | `#1B2A56` |
| Secondary (crimson) | `#B3122A` |
| Accent (gold) | `#D4AF37` |
| Tertiary (magenta, sparing) | `#C2185B` |
| Background | `#FBF9F5` |
| Text | `#22252B` |

These are drawn from crest/poster visual inspection, not the original logo file — treat as a starting
point and re-derive from `content/design-tokens.json` once a source-of-truth logo asset lands. See
that file for the full token set (also machine-readable for Tailwind config).

- Headings: serif (Playfair Display or Merriweather). Body: sans-serif (Inter or Poppins).
  Devanagari content: Noto Sans Devanagari.
- 8px button radius, 12–16px card radius, 8pt spacing grid.
- Minimal animation — subtle fade/slide on scroll only, no parallax.

## Data schema conventions

Every entry in `content/achievements.json` and similar files carries a `"verified": false` flag by
default. Do not flip it to `true` unless the fact traces to something in the "Confirmed facts" table
above or the school has explicitly signed off in `docs/content-checklist.md`. UI components should
visibly gate unverified entries (e.g. skip rendering, or badge as pending) rather than assume verified.

## Working conventions for this repo

- Keep `docs/requirements-analysis.md` and `docs/content-checklist.md` in sync with reality — when the
  school resolves a "needs verification" item, update the checklist in the same commit as the code
  that uses the newly-confirmed fact.
- Don't invent facility photos, staff bios, or numbers (student/faculty counts) — none were supplied;
  those sections stay `[Needs content]` until the school provides them.
- Git identity/remote is already configured for this repo (`origin` → GitHub, `main` branch). Commit
  small and often; this is a solo/small-team project, no branch-protection workflow yet.
