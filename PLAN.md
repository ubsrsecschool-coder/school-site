# Build Plan — Uma Bharti Senior Secondary School Website

**Audience:** the developer (human or agent) implementing this site.
**Source of truth for requirements:** [docs/requirements-analysis.md](docs/requirements-analysis.md) (sections A–K).
**Source of truth for what may be published:** [docs/content-checklist.md](docs/content-checklist.md).
**Source of truth for design:** [content/design-tokens.json](content/design-tokens.json) + [design/homepage.html](design/homepage.html).

**To execute this plan, follow [docs/build-steps.md](docs/build-steps.md)** — the same sequence
broken into numbered steps with commands, file contents and a verification check per step.

This plan turns the requirements analysis into an engineering sequence. Where it and the
requirements doc disagree, this file wins for *how to build*; the requirements doc wins for *what
the school actually asked for*.

---

## 0. Where the project already is

Done:

| Artefact | State |
|---|---|
| `docs/requirements-analysis.md` | Full spec, sections A–K |
| `docs/content-checklist.md` | Live tracker of confirmed vs. pending content |
| `content/*.json` | Seeded real content with `verified` flags |
| `content/design-tokens.json` | Settled palette + type system |
| `design/homepage.html` | **Reference implementation** of the homepage, hand-built, responsive, interactive |
| `public/images/` | 2 usable campus photos, 1 unusable (bad signage), crest (unusable — raster on white) |
| `CLAUDE.md` | Project rules, confirmed facts, design decisions |

Not started: the Next.js application itself. There is no `package.json` yet.

`design/homepage.html` is a **reference to port, not code to ship.** It is a single static file with
inline CSS and vanilla JS. Port its visual decisions and interaction behaviour into components; do
not copy it wholesale into `app/page.tsx`.

---

## 1. Stack

Locked by the requirements doc (Section H) unless noted:

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js, App Router** | Spec names Next.js. App Router for layouts + metadata API. |
| Language | **TypeScript** | *Extension of the spec.* Content is JSON edited by non-developers; types + schema validation catch malformed edits at build time rather than at runtime in front of a parent. |
| Styling | **Tailwind CSS** | Spec names it. Theme is generated from `design-tokens.json` — see §4. |
| Content | **Flat JSON in `content/`** | Spec's option (a). See §10 for why the CMS question is still open. |
| Validation | **Zod** | *Extension of the spec.* Enforces the content schema and, critically, the publish gate (§3). |
| Forms | **Route Handler + email provider** | Spec's option (b). Formspree is the fallback if no backend is wanted. |
| Hosting | **Vercel** | Spec names it. |
| Analytics | Vercel Analytics or Plausible | Privacy-friendly; avoid anything that profiles minors. |

Rendering: **fully static.** Every page is a Server Component reading local JSON at build time. No
database, no client-side data fetching, no ISR. The only dynamic surface is the enquiry form POST.

---

## 2. Repository layout

```
app/
  layout.tsx                 root layout, fonts, metadata defaults, skip-link
  page.tsx                   homepage
  about/page.tsx
  about/chairman-message/page.tsx
  academics/page.tsx
  admissions/page.tsx
  achievements/page.tsx
  gallery/page.tsx
  notices/page.tsx
  contact/page.tsx
  api/enquiry/route.ts       form handler
  sitemap.ts  robots.ts  opengraph-image.tsx
  tokens.css                 GENERATED from design-tokens.json — do not hand-edit
  globals.css
components/
  layout/      Header  Footer  MottoBand  SkipLink
  ui/          Frame  Button  Pill  LinkArrow  Reveal  Counter  PendingNote
  sections/    Hero  QuickFactsStrip  ChairmanMessage  ResultsBand  SportsRail
               CampusGrid  AdmissionsBanner  GalleryGrid  NoticeBoard  LocationContact
  forms/       AdmissionEnquiryForm  ContactForm
lib/
  content.ts                 typed loaders + THE PUBLISH GATE
  schema.ts                  zod schemas for every content file
  seo.ts                     metadata + JSON-LD helpers
content/                     *.json (already exists)
public/images/               (already exists)
scripts/
  tokens-to-css.mjs          design-tokens.json -> app/tokens.css
  content-report.mjs         prints everything held back from publication
docs/  design/               (already exist)
```

---

## 3. The publish gate — build this first, before any page

This is the one piece of architecture that is not optional. `CLAUDE.md` states the rule: **nothing
reaches the live site that the school has not confirmed.** That rule must be enforced by code, not
by memory, or it will be violated the first time someone adds a page in a hurry.

Two independent flags already exist in the content files, and they mean different things:

- **`verified`** — *is this fact confirmed?* A claim the school has signed off on.
- **`usable`** — *may this asset be published?* An asset can be a true, verified thing and still be
  unpublishable. The crest is `verified: true, usable: false` (it is genuinely the crest, but it is
  raster on white and would show a white box). The tan block photo is `verified: false, usable:
  false` (the signage carries the outdated "Uma Bharati" spelling).

Both must be true for public rendering.

```ts
// lib/content.ts
import { z } from "zod";
import { AchievementSchema, GalleryItemSchema, NoticeSchema } from "./schema";
import achievementsJson from "@/content/achievements.json";
import galleryJson from "@/content/gallery.json";
import noticesJson from "@/content/notices.json";

const parse = <T extends z.ZodTypeAny>(s: T, data: unknown, file: string) => {
  const r = z.array(s).safeParse(data);
  if (!r.success) throw new Error(`${file} failed validation:\n${r.error.message}`);
  return r.data;
};

const allAchievements = parse(AchievementSchema, achievementsJson, "achievements.json");
const allGallery      = parse(GalleryItemSchema, galleryJson,      "gallery.json");
const allNotices      = parse(NoticeSchema,      noticesJson,      "notices.json");

/** Publishable = confirmed AND clearable for publication. */
const publishable = <T extends { verified: boolean; usable?: boolean }>(xs: T[]) =>
  xs.filter((x) => x.verified && x.usable !== false);

export const achievements = publishable(allAchievements);
export const gallery      = publishable(allGallery);
export const notices      = publishable(allNotices);

/** Everything held back, with the reason. Used by the build report — never rendered publicly. */
export const withheld = [
  ...allAchievements.filter((x) => !publishable([x]).length).map((x) => ({ file: "achievements", ...x })),
  ...allGallery.filter((x) => !publishable([x]).length).map((x) => ({ file: "gallery", ...x })),
  ...allNotices.filter((x) => !publishable([x]).length).map((x) => ({ file: "notices", ...x })),
];
```

Rules that follow from this:

1. **Pages import from `lib/content.ts` only.** Importing a `content/*.json` file directly in a
   component is a bug — it bypasses the gate. Enforce with an ESLint `no-restricted-imports` rule.
2. **`scripts/content-report.mjs` runs in `prebuild`** and prints every withheld item with its
   `note`. It does not fail the build; it makes the omissions visible so they are chased, not
   forgotten.
3. **Sections that would render empty must say so**, using `<PendingNote>` — the same treatment as
   in the mockup. A section that silently disappears looks like a bug and hides the gap from the
   school. A section that says "facilities list pending confirmation" prompts them to send it.
4. **Never invent a fallback.** No "Coming soon — 20+ classrooms!" placeholder copy. Placeholder
   text states what is missing, nothing more.

### Student data

Names, photographs and marks of minors must not be rendered at all until consent is confirmed
(checklist, blocking). There is currently no consented student data in `content/`, and none should
be added. When it arrives, it needs a third flag — `consent: true` — gated the same way. Build the
achievements UI so individual toppers are a separate, independently-gated block, not interleaved
with the aggregate results that are already publishable.

---

## 4. Design system → Tailwind

`content/design-tokens.json` is the single source of truth. The palette was reworked three times;
it drifted from the mockup each time until the token file and the HTML were synced by hand. Remove
that failure mode with a generator.

1. `scripts/tokens-to-css.mjs` reads `design-tokens.json` and emits `app/tokens.css` as CSS custom
   properties (`--color-green`, `--color-cream`, `--font-display`, `--radius-arch`, …).
2. `app/tokens.css` is committed but marked generated; `npm run tokens` regenerates it, and
   `prebuild` runs it so a stale file cannot ship.
3. Tailwind's theme maps onto those variables, so utilities and raw CSS agree.

Non-negotiables carried from `CLAUDE.md` — a reviewer should reject a PR that breaks these:

- **The hero is a light field.** Do not restore a dark full-bleed landing section.
- **The motto band sits at the top**, under the header, Devanagari at weight 700.
- **Colour roles are strict:** `green` = brand/actions, `stone` = utility/metadata, `brass` =
  accent only (never a large fill), `peach` = photographic tint, `error` = validation only.
- Fonts: Fraunces (display), Plus Jakarta Sans (body), Noto Serif Devanagari (motto) via
  `next/font` — self-hosted, not a `<link>` to Google, for LCP and privacy.
- All motion disabled under `prefers-reduced-motion`.

---

## 5. Pages

| Route | Content source | Ship now? |
|---|---|---|
| `/` | all files | Yes — port from the mockup |
| `/about` | static copy + `gallery` | Yes |
| `/about/chairman-message` | static copy | **Stub only** — quote and portrait pending |
| `/about/principal-message` | — | **Do not create.** No name, photo or message exists. An empty route indexed by Google is worse than no route. Add it when content lands. |
| `/academics` | static copy | Yes — streams and curriculum are confirmed |
| `/admissions` | `notices` + form | Yes — the strongest confirmed content |
| `/achievements` | `achievements` | Yes — aggregates only, no individual students |
| `/gallery` | `gallery` | Yes — 2 photos; the grid must not look broken at n=2 |
| `/notices` | `notices` | Yes |
| `/contact` | static + map | Yes — address is now confirmed (Bhora Kalan) |

Navigation must not link to routes that do not exist. Faculty and Student Life are in the spec's
sitemap but have no content at all; leave them out of the nav until they do.

---

## 6. Forms

One handler, `POST /api/enquiry`, used by both the admission enquiry and the contact form.

- Validate with the same Zod schema on client and server.
- Send via a transactional provider (Resend or similar) to `umabhartischool@gmail.com`.
- **Anti-spam without a captcha:** honeypot field + minimum time-to-submit + per-IP rate limit.
  A captcha is a poor fit for the likely audience on a phone on mobile data.
- Collect only: parent/guardian name, phone, class of interest, optional message. **No student
  name, no date of birth, no marks.** There is no consent basis for collecting a child's data
  through a public form.
- Log nothing containing personal data.
- Progressive enhancement: the form must submit and show a result without JavaScript.

---

## 7. Images

Current assets are cropped phone screenshots. They are good enough to build against, not to launch
against.

- Use `next/image` everywhere; set explicit `width`/`height` from `gallery.json` to reserve layout
  space and protect CLS.
- Serve AVIF/WebP; the hero gets `priority`, everything else lazy-loads.
- `alt` text comes from `gallery.json`, which already carries real descriptions. Never `alt=""` on
  a content photograph, never a filename.
- **Before launch:** replace the screenshots with full-resolution originals. The peach façade is
  739×666 and is currently doing hero duty — it will soften badly on a desktop viewport.
- The tan block stays excluded **by data** (`usable: false`), not by a code comment. If its signage
  is ever corrected, flipping the flag is the entire change.

---

## 8. SEO & accessibility

From Section I of the spec, plus what the photos resolved:

- Unique `<title>` and description per route via the Metadata API.
- `EducationalOrganization` JSON-LD: name, `foundingDate: 1999`, address (**Bhora Kalan now
  confirmed**), phones, email, logo. `sameAs` waits on the Facebook URL — omit the property rather
  than guess it.
- Do **not** publish an affiliation number until the school supplies it. Phrase affiliation exactly
  as `CLAUDE.md` specifies: *HBSE-affiliated, CBSE-pattern curriculum* — never "CBSE-affiliated".
- `sitemap.ts` and `robots.ts` generated from the route list.
- One `<h1>` per page; headings in order.
- Skip-link; visible focus rings; real `<button>`/`<a>`/`<label>`; `aria-label` on icon-only
  controls; lightbox traps focus and closes on Escape.
- Target WCAG 2.1 AA. Current tokens already pass (body 14.9:1, green 9.4:1, white-on-green 10.0:1)
   — re-check any new pairing.
- `lang="en"` on `<html>`; the Devanagari motto wrapped in `lang="sa"`.

---

## 9. Phases

Each phase has an exit criterion. Do not start the next one until it is met.

**Phase 1 — Foundation.**
Scaffold Next.js + TS + Tailwind. Implement `lib/schema.ts`, `lib/content.ts` and the publish gate.
Wire `scripts/tokens-to-css.mjs` and `scripts/content-report.mjs` into `prebuild`. Add the ESLint
rule banning direct `content/*.json` imports.
*Exit: `npm run build` succeeds, prints the withheld-content report, and a deliberate malformed edit
to a JSON file fails the build with a readable error.*

**Phase 2 — Design system + layout shell.**
Fonts via `next/font`. `Header`, `MottoBand`, `Footer`, `Frame`, `Button`, `Reveal`, `Counter`.
*Exit: an empty page renders header, motto band and footer pixel-close to the mockup at 390px,
768px and 1440px.*

**Phase 3 — Homepage.**
Port every section from `design/homepage.html`, reading through `lib/content.ts`.
*Exit: homepage matches the mockup, all interactions work, Lighthouse ≥ 90 on all four categories.*

**Phase 4 — Inner pages.**
The routes marked "ship now" in §5.
*Exit: every nav link resolves; no route renders an empty or filler page.*

**Phase 5 — Forms.**
Handler, validation, email delivery, anti-spam, no-JS fallback.
*Exit: a test enquiry arrives at the school inbox; submitting with JS disabled still works.*

**Phase 6 — SEO, a11y, performance.**
Metadata, JSON-LD, sitemap, robots, OG image. Keyboard pass. Axe pass.
*Exit: Lighthouse ≥ 95 SEO and Accessibility; zero critical axe violations; LCP < 2.5s on
simulated 4G.*

**Phase 7 — Launch.**
Domain, Vercel project, Google Business Profile, sitemap submission.
*Exit: live on the real domain over HTTPS, indexed, form delivering to the school.*

**Phase 8 — Handover.**
Written guide for the school office on updating notices and results. This is the phase most likely
to be skipped and the one that decides whether the site is still accurate in a year.

---

## 10. Open decisions — needed from the school or the project owner

Blocking or shaping the build:

1. **Who edits notices after launch?** JSON-in-Git is not realistic for a school office. Either
   (a) accept that a developer makes every update, or (b) add a Git-backed CMS (Decap/Sanity) over
   `content/` in Phase 8. This changes the content layer, so decide before Phase 1 if possible.
   *Recommendation: build on flat JSON now, add the CMS in Phase 8 — the file shapes will not change.*
2. **Publish a fee structure?** (Spec Section D.) Affects `/admissions`.
3. **WhatsApp-enabled number** — the contact section has a slot reserved for it.
4. **Facebook page URL** — needed for the footer and the `sameAs` JSON-LD property.
5. **Transparent/vector crest** — until it arrives the header shows a `UB` monogram placeholder.
6. **HBSE affiliation number** and the "Permanent Recognised" certificate number.
7. **Are the peach and white blocks the same campus?** Determines how the gallery is captioned.
8. **Student consent** — decides whether an academic-toppers section can exist at all.

Tracked in [docs/content-checklist.md](docs/content-checklist.md); that file is the one to update
when an answer arrives.

---

## 11. Definition of done

The site is launchable when:

- Every phase exit criterion is met.
- The withheld-content report contains nothing that the school has actually confirmed — i.e. the
  gate is holding back only genuinely unresolved items.
- No page states a fact that is not traceable to the confirmed list in `CLAUDE.md`.
- No minor's name, photograph or marks appear anywhere without recorded consent.
- The school office can reach a human who can update the site.
