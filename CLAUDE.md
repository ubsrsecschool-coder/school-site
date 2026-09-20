# Uma Bharti Senior Secondary School — Website

Project context for Claude Code sessions working in this repo. Full detail lives in
[docs/requirements-analysis.md](docs/requirements-analysis.md) — this file is the quick-reference
summary; that doc is the source of truth when the two disagree.

**Building the site?** [PLAN.md](PLAN.md) is the architecture and the reasoning;
[docs/build-steps.md](docs/build-steps.md) is the numbered execution guide. Start with the steps
and refer back to the plan for the why.

## What this project is

A trust-building marketing/info website for a long-established (est. 1999), English-medium,
community-rooted school in Bhora Kalan, Gurugram, Haryana. It is **not** a coaching-institute-style
flashy site — lean into the school's real, decades-long identity (the Saraswati crest, a genuine
reused tagline, the actual peach-plaster campus) rather than a generic template look.

## Non-negotiable content rule

**No statistic, award, affiliation, or testimonial goes on the live site beyond what the school has
explicitly confirmed.** If a fact isn't verified, the UI renders a `[Needs verification]` placeholder
— never a plausible-sounding guess, and never silently drop the section either. See
[docs/content-checklist.md](docs/content-checklist.md) for exactly what's confirmed vs. still pending.

This matters especially for anything involving minors: names, photos, and marks of students must not
be published without confirmed parental/guardian consent (see checklist).

## Confirmed facts (safe to use as-is)

- **Name:** Uma Bharti Senior Secondary School (spelling is "Bharti", not "Bharati")
- **Location:** Bhora Kalan, Gurugram (Gurgaon), Haryana — confirmed 2026-09-20 from the school
  crest, which reads "BHORA KALAN- GURUGRAM". The newspaper's "Bhojkalan" was a misprint.
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

## Design system (as built — supersedes Section F of the spec)

Section F proposed navy `#1B2A56` / crimson / gold with Playfair Display + Inter. **Superseded.**
Three palettes were tried and rejected before this one: navy+gold read as a generic "prestige
institution" cliche; maroon and red-oxide both read as synthetic dye rather than material; and a
full-bleed dark hero read muddy regardless of hue.

The built palette is taken from the school's own photographs — every block has **green window
glass** against peach plaster and open sky, so green is already the building's accent colour.
Equally important: **the landing section is a light field.** Do not turn the hero into a dark
full-bleed band again; the photographs carry the colour.

| Role | Token | Hex |
|---|---|---|
| Dark bands (results, footer) | `ink` | `#14322A` |
| Primary — headings, buttons | `green` | `#1C4A3C` |
| Hover / gradient | `green2` | `#276655` |
| Muted green — italic type | `greenSoft` | `#4F6B5E` |
| Utility icons, dates, metadata | `stone` | `#5E6D64` |
| Accent — rules, small fills | `brass` | `#C08A3E` |
| Accent on dark fields | `brassLight` | `#E8CF9E` |
| Accent text on light | `brassDark` | `#8A6118` |
| Plaster tint (echoes building) | `peach` | `#F3E1D6` |
| Validation + unverified flags ONLY | `error` | `#BF3B2B` |
| Ground | `cream` | `#FAF7F0` |
| Cards / raised surfaces | `paper` | `#FFFDF9` |
| Tinted panels | `sand` | `#F0EBE0` |
| Hairlines | `line` | `#E4DDD0` |
| Body text | `text` | `#1B241F` |
| Secondary text | `muted` | `#5E6862` |

**Colour roles are strict:** green = brand and actions, stone = utility/metadata, brass = accent,
peach = photographic tint, error = validation only. Never use `error` as a brand colour; never let
`brass` become a large fill.

- Display: **Fraunces**. Body/UI: **Plus Jakarta Sans** (deliberately not Inter/Roboto).
  Devanagari: **Noto Serif Devanagari**, loaded through weight 700.
- **The motto sits in a bold band at the top of the page**, directly under the header and above the
  hero — तमसो मा ज्योतिर्गमय / *Tamaso Ma Jyotirgamaya*. It is the school's own line; it reads as a
  statement, not a footnote. Do not demote it back into a side panel.
- 8/14/22px radii; arched media frames (`180px 180px 14px 14px`) as the recurring motif.
- Warm-tinted shadows; motion restrained and disabled under `prefers-reduced-motion`.

Full token set: [content/design-tokens.json](content/design-tokens.json).
Reference implementation: [design/homepage.html](design/homepage.html).

**Open conflict:** the crest is navy/red/magenta/gold and does not sit naturally in this palette.
Resolve before launch (see checklist).

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
