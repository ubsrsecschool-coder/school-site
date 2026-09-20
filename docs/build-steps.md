# Step-by-Step Build Guide

The executable version of [PLAN.md](../PLAN.md). Work top to bottom. Every step has a **Verify**
line — do not move on until it passes.

Phases map to PLAN.md §9. Steps are numbered `<phase>.<step>`.

---

## Step 0 — Before you start

**0.1 Check your toolchain**

```bash
node -v      # need 18.18+ (20 LTS recommended)
npm -v
git -v
```

**0.2 Confirm you are in the repo and it is clean**

```bash
cd /home/harsh-singh/uma_bharti_site
git status            # should be clean
git pull origin main
```

**0.3 Read these three files before writing code**

- `CLAUDE.md` — confirmed facts, colour roles, the two design non-negotiables
- `docs/content-checklist.md` — what may and may not be published
- `design/homepage.html` — open it in a browser; this is the target

**Verify:** you can state, without looking, why `content/gallery.json` marks the crest
`usable: false`. If you can't, re-read §3 of PLAN.md — that distinction drives the whole content layer.

---

# Phase 1 — Foundation

## Step 1.1 — Scaffold Next.js without destroying the repo

`create-next-app` refuses to run in a directory with conflicting files. Scaffold beside the repo,
then copy in.

```bash
cd /home/harsh-singh
npx create-next-app@latest ub-scaffold \
  --typescript --tailwind --app --eslint \
  --no-src-dir --import-alias "@/*" --use-npm
```

Copy in everything except what the repo already owns:

```bash
cd /home/harsh-singh/ub-scaffold
rsync -av --progress ./ /home/harsh-singh/uma_bharti_site/ \
  --exclude .git --exclude README.md --exclude .gitignore --exclude node_modules
cd /home/harsh-singh/uma_bharti_site
npm install
rm -rf /home/harsh-singh/ub-scaffold
```

Merge the scaffold's `.gitignore` additions into the existing one by hand — `node_modules/`,
`.next/`, `.vercel`, `*.tsbuildinfo` — keeping the entries already there.

```bash
npm run dev     # http://localhost:3000
```

**Verify:** the Next.js starter page loads, and `git status` still shows your `content/`,
`design/`, `docs/`, `public/images/` intact.

## Step 1.2 — Note your Tailwind version

```bash
node -p "require('./package.json').devDependencies.tailwindcss || require('./package.json').dependencies.tailwindcss"
```

- **4.x** → theme is configured in CSS with `@theme`. There is no `tailwind.config.ts`.
- **3.x** → theme is configured in `tailwind.config.ts`.

Both are fine. Step 2.2 branches on this. Write the version down.

**Verify:** you know which major version you have.

## Step 1.3 — Install runtime dependencies

```bash
npm install zod
```

**Verify:** `zod` appears in `package.json` dependencies.

## Step 1.4 — Write the content schemas

Create `lib/schema.ts`. These match the JSON files as they exist today — check them against
`content/*.json` before trusting this.

```ts
import { z } from "zod";

export const AchievementSchema = z.object({
  id: z.string(),
  type: z.enum(["academic", "sports"]),
  title: z.string(),
  date: z.string().nullable(),
  summary: z.string().nullable().optional(),
  results: z.array(z.object({ event: z.string(), position: z.string() })).optional(),
  sourceImage: z.string().optional(),
  verified: z.boolean(),
  usable: z.boolean().optional(),
  note: z.string().optional(),
});

export const NoticeSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  body: z.string(),
  verified: z.boolean(),
  usable: z.boolean().optional(),
  note: z.string().optional(),
});

export const GalleryItemSchema = z.object({
  id: z.string(),
  section: z.enum(["campus", "events", "sports", "brand"]),
  src: z.string(),
  raw: z.string().optional(),
  alt: z.string().min(10, "alt text must actually describe the image"),
  caption: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  verified: z.boolean(),
  usable: z.boolean(),
  note: z.string().optional(),
});

export type Achievement = z.infer<typeof AchievementSchema>;
export type Notice      = z.infer<typeof NoticeSchema>;
export type GalleryItem = z.infer<typeof GalleryItemSchema>;
```

**Verify:** `npx tsc --noEmit` passes.

## Step 1.5 — Write the publish gate

Create `lib/content.ts`. **This is the most important file in the project.**

```ts
import { z } from "zod";
import { AchievementSchema, GalleryItemSchema, NoticeSchema } from "./schema";
import achievementsJson from "@/content/achievements.json";
import galleryJson from "@/content/gallery.json";
import noticesJson from "@/content/notices.json";

function parseFile<T extends z.ZodTypeAny>(schema: T, data: unknown, file: string) {
  const result = z.array(schema).safeParse(data);
  if (!result.success) {
    throw new Error(
      `content/${file} failed validation. Fix the JSON, do not loosen the schema.\n` +
        JSON.stringify(result.error.format(), null, 2)
    );
  }
  return result.data;
}

const allAchievements = parseFile(AchievementSchema, achievementsJson, "achievements.json");
const allGallery      = parseFile(GalleryItemSchema, galleryJson,      "gallery.json");
const allNotices      = parseFile(NoticeSchema,      noticesJson,      "notices.json");

/**
 * Publishable = the fact is confirmed AND the asset is clear to publish.
 * These are different questions. The crest is verified (it really is the crest)
 * but not usable (raster on white). The tan-block photo is neither.
 */
function publishable<T extends { verified: boolean; usable?: boolean }>(items: T[]): T[] {
  return items.filter((i) => i.verified === true && i.usable !== false);
}

export const achievements = publishable(allAchievements);
export const notices      = publishable(allNotices);
export const gallery      = publishable(allGallery);

export const galleryBySection = (s: "campus" | "events" | "sports") =>
  gallery.filter((g) => g.section === s);

/** Held back from the public site, with the reason. Build report only — never rendered. */
export const withheld = [
  ...allAchievements.map((x) => ({ file: "achievements.json", ...x })),
  ...allNotices.map((x) => ({ file: "notices.json", ...x })),
  ...allGallery.map((x) => ({ file: "gallery.json", ...x })),
].filter((x) => !(x.verified === true && (x as { usable?: boolean }).usable !== false));
```

**Verify:**

```bash
npx tsc --noEmit
```

Then temporarily set `"verified": "yes"` (a string) in `content/notices.json` and run
`npm run build`. It must fail with a readable message naming the file. Put it back.

## Step 1.6 — Ban direct content imports

A page importing `content/*.json` directly bypasses the gate. Make it a lint error.

In `eslint.config.mjs` add to the rules:

```js
"no-restricted-imports": ["error", {
  patterns: [{
    group: ["@/content/*.json", "**/content/*.json"],
    message: "Import from @/lib/content instead — direct JSON imports bypass the publish gate (PLAN.md §3)."
  }]
}]
```

Then allow the one legitimate exception by adding an override for `lib/content.ts` that turns the
rule off for that file only.

**Verify:** add `import x from "@/content/notices.json"` to `app/page.tsx` → `npm run lint` errors.
Remove it.

## Step 1.7 — Token generator

Create `scripts/tokens-to-css.mjs`:

```js
import { readFileSync, writeFileSync } from "node:fs";

const t = JSON.parse(readFileSync("content/design-tokens.json", "utf8"));
const kebab = (s) => s.replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
const lines = [];

for (const [name, v] of Object.entries(t.colors)) lines.push(`  --color-${kebab(name)}: ${v.value};`);
for (const [name, v] of Object.entries(t.typography)) lines.push(`  --font-${kebab(name)}: ${v.family};`);
for (const [name, v] of Object.entries(t.radius)) lines.push(`  --radius-${kebab(name)}: ${v};`);
for (const [name, v] of Object.entries(t.shadows)) {
  if (name === "note") continue;
  // strip the "sh" prefix off the RAW name: kebab("sh1") is "sh-1", which would
  // yield --shadow--1 if stripped after kebabbing.
  lines.push(`  --shadow-${name.replace(/^sh/, "")}: ${v};`);
}

writeFileSync(
  "app/tokens.css",
  `/* GENERATED from content/design-tokens.json by scripts/tokens-to-css.mjs.\n` +
    `   Do not hand-edit. Run: npm run tokens */\n:root {\n${lines.join("\n")}\n}\n`
);
console.log(`tokens: wrote app/tokens.css (${lines.length} variables)`);
```

**Verify:** `node scripts/tokens-to-css.mjs` then open `app/tokens.css`. Expect 25 variables,
including `--color-green: #1C4A3C;`, `--color-green-2:`, `--font-devanagari:`, `--radius-arch:`
and `--shadow-1:`. If you see `--shadow--1` the kebab fix above was not applied.

## Step 1.8 — Withheld-content report

Create `scripts/content-report.mjs`:

```js
import { readFileSync } from "node:fs";

const read = (f) => JSON.parse(readFileSync(`content/${f}`, "utf8"));
const files = ["achievements.json", "notices.json", "gallery.json"];
const held = [];

for (const f of files)
  for (const item of read(f))
    if (!(item.verified === true && item.usable !== false))
      held.push({ file: f, id: item.id, reason: item.note ?? "not verified" });

if (!held.length) {
  console.log("\ncontent: nothing held back — everything is published.\n");
} else {
  console.log(`\ncontent: ${held.length} item(s) held back from the public site:\n`);
  for (const h of held) console.log(`  · ${h.file} → ${h.id}\n      ${h.reason}\n`);
  console.log("  Chase these with the school; see docs/content-checklist.md\n");
}
```

**Verify:** `node scripts/content-report.mjs` reports **6 items** held back as of today — four
athletics/archive entries in `achievements.json` awaiting data verification, plus the tan block
(bad signage) and the crest (raster on white) in `gallery.json`.

## Step 1.9 — Wire both into the build

In `package.json` scripts:

```json
"tokens": "node scripts/tokens-to-css.mjs",
"content:report": "node scripts/content-report.mjs",
"prebuild": "npm run tokens && npm run content:report"
```

**Verify:** `npm run build` regenerates tokens, prints the held-back list, and completes.

> ### Phase 1 exit criterion
> `npm run build` succeeds, prints the withheld report, and a deliberately malformed JSON edit
> fails the build with a readable error. **Commit now.**

---

# Phase 2 — Design system and layout shell

## Step 2.1 — Fonts, self-hosted

In `app/layout.tsx`, use `next/font/google` for Fraunces, Plus Jakarta Sans and Noto Serif
Devanagari (weights 400/500/600/700 — the motto needs 700). Expose each as a CSS variable and put
those variable classes on `<html>`. Do not use a `<link>` to Google Fonts: `next/font` self-hosts,
which removes a third-party request and improves LCP.

**Verify:** DevTools → Network shows no request to `fonts.googleapis.com`, and the motto renders
bold.

## Step 2.2 — Hook tokens into Tailwind

Import `./tokens.css` at the top of `app/globals.css`.

- **Tailwind 4:** add an `@theme` block mapping to the variables, e.g.
  `--color-green: var(--color-green);` so `bg-green` and `text-green` work.
- **Tailwind 3:** in `tailwind.config.ts`, set
  `theme.extend.colors.green = "var(--color-green)"` and the same for the rest.

**Verify:** a test element with `className="bg-cream text-green font-display"` renders in the right
colours and typeface.

## Step 2.3 — Base UI primitives

Build in `components/ui/`, porting styles from `design/homepage.html`:

- `Frame` — the arched media frame. Props: `src`/`alt` for a real photo, or `glyph`/`caption` for a
  pending placeholder. This component is how "photo not supplied yet" looks intentional.
- `Button` — variants `primary` | `brass` | `line`. Must render a real `<button>` or `<a>`.
- `Reveal` — IntersectionObserver wrapper; renders children visible immediately when
  `prefers-reduced-motion` is set.
- `Counter` — count-up number; static under reduced motion.
- `PendingNote` — the bordered note used to state what is missing. Never invents copy.

**Verify:** each renders in isolation and keyboard focus is visible on `Button`.

## Step 2.4 — Layout shell

`components/layout/`: `Header` (scroll state, mobile drawer), `MottoBand`, `Footer`, `SkipLink`.

Two rules from `CLAUDE.md` that a reviewer should enforce:
- the motto band sits directly under the header, Devanagari at weight 700, wrapped in `lang="sa"`;
- the header is the light treatment — nothing dark sits behind it.

**Verify:** at 390px, 768px and 1440px the shell matches the mockup; the drawer traps focus and
closes on Escape.

> ### Phase 2 exit criterion
> An otherwise empty page renders header, motto band and footer pixel-close to the mockup at all
> three widths. **Commit.**

---

# Phase 3 — Homepage

Port section by section from `design/homepage.html`, each as a component in
`components/sections/`, reading only through `@/lib/content`.

| Step | Section | Data |
|---|---|---|
| 3.1 | `Hero` | static copy + `gallery` hero image, `priority` |
| 3.2 | `QuickFactsStrip` | static — confirmed facts only |
| 3.3 | `AboutIntro` | static copy |
| 3.4 | `ChairmanMessage` | static; quote is a `PendingNote` until supplied |
| 3.5 | `ResultsBand` | `achievements` filtered to `type: "academic"` |
| 3.6 | `SportsRail` | `achievements` filtered to `type: "sports"` |
| 3.7 | `CampusGrid` | `galleryBySection("campus")` |
| 3.8 | `AdmissionsBanner` | `notices` |
| 3.9 | `GalleryPreview` | `gallery`, capped |
| 3.10 | `NoticeBoard` | `notices` |
| 3.11 | `LocationContact` | static; address confirmed, map embed |

Use `next/image` with `width`/`height` from `gallery.json`.

**Verify each:** the section renders from data, and deleting an item from the JSON removes it from
the page without breaking the layout. The gallery grid must still look deliberate with only two
photos.

> ### Phase 3 exit criterion
> Homepage matches the mockup, all interactions work, Lighthouse ≥ 90 in all four categories.
> **Commit.**

---

# Phase 4 — Inner pages

Build only the routes marked "ship now" in PLAN.md §5:

- 4.1 `/about`
- 4.2 `/about/chairman-message` — stub, clearly marked pending
- 4.3 `/academics`
- 4.4 `/admissions`
- 4.5 `/achievements` — aggregates only; **no individual student names, photos or marks**
- 4.6 `/gallery`
- 4.7 `/notices`
- 4.8 `/contact`

**Do not create** `/about/principal-message`, `/faculty` or `/student-life`. No content exists, and
an empty route indexed by Google is worse than no route. Keep them out of the nav too.

> ### Phase 4 exit criterion
> Every nav link resolves; no route renders an empty or filler page. **Commit.**

---

# Phase 5 — Forms

**5.1** `POST /api/enquiry` route handler, validating with a shared Zod schema.
**5.2** Wire `AdmissionEnquiryForm` and `ContactForm` to it.
**5.3** Email delivery to `umabhartischool@gmail.com` (Resend or similar; key in env, never committed).
**5.4** Anti-spam: honeypot field, minimum time-to-submit, per-IP rate limit. No captcha.
**5.5** No-JS fallback — the form must work as a plain POST.

Collect only parent/guardian name, phone, class of interest, optional message. **No student name,
date of birth or marks** — there is no consent basis for collecting a child's data via a public form.

> ### Phase 5 exit criterion
> A test enquiry arrives in the school inbox, and submitting with JavaScript disabled still works.
> **Commit.**

---

# Phase 6 — SEO, accessibility, performance

**6.1** Per-route `title` and `description` via the Metadata API.
**6.2** `EducationalOrganization` JSON-LD — name, `foundingDate: 1999`, address (Bhora Kalan,
confirmed), phones, email, logo. **Omit `sameAs` until the Facebook URL exists.** Do not state an
affiliation number until supplied. Affiliation phrasing is exactly *HBSE-affiliated, CBSE-pattern
curriculum*.
**6.3** `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`.
**6.4** Keyboard pass: every interactive element reachable, focus visible, lightbox traps focus and
closes on Escape.
**6.5** `npx @axe-core/cli http://localhost:3000` — resolve all critical violations.
**6.6** Image pass: AVIF/WebP, hero `priority`, everything else lazy, no layout shift.

> ### Phase 6 exit criterion
> Lighthouse ≥ 95 SEO and Accessibility, zero critical axe violations, LCP < 2.5s on simulated 4G.
> **Commit.**

---

# Phase 7 — Launch

**7.1** Create the Vercel project, connect the GitHub repo, set env vars.
**7.2** Point the domain; confirm HTTPS and the apex/www redirect.
**7.3** Before going live, run `npm run content:report` and confirm nothing held back has actually
been confirmed by the school.
**7.4** Submit the sitemap in Google Search Console.
**7.5** Create/claim the Google Business Profile with the same name, address and phone as the site.

> ### Phase 7 exit criterion
> Live on the real domain over HTTPS, indexed, form delivering to the school.

---

# Phase 8 — Handover

**8.1** Decide the notices question (PLAN.md §10.1): a developer updates JSON, or a Git-backed CMS
goes over `content/`.
**8.2** Write a one-page guide for the school office: how to add a notice, how to send photos, who
to contact.
**8.3** Walk one person at the school through it and watch them do it once.

This phase is the one most likely to be skipped, and it decides whether the site is still accurate
in a year.

---

## Standing rules

1. Pages import from `@/lib/content`, never from `content/*.json`.
2. If a fact is not in `CLAUDE.md`'s confirmed list or marked `verified` in the content files, it
   does not go on a page. Placeholders state what is missing and nothing more.
3. No minor's name, photograph or marks anywhere until consent is recorded.
4. The hero stays a light field. The motto stays at the top.
5. When the school confirms something, update `docs/content-checklist.md` **in the same commit** as
   the code that uses it.
