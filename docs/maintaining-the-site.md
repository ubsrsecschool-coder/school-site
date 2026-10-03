# Maintaining the site

Written for whoever makes changes to the repository. The school office has its own plain-language
guide: [school-office-guide.md](school-office-guide.md).

## The one rule

Nothing is published unless the school has confirmed it. Every item in `content/achievements.json`,
`notices.json` and `gallery.json` has a `verified` flag, and gallery items also have `usable`. An item
is public only when `verified` is `true` and `usable` is not `false`. Do not flip `verified` unless the
fact is in the confirmed list in `CLAUDE.md` or the school has signed it off in `docs/content-checklist.md`.
Update the checklist in the same commit.

`npm run content:report` lists everything currently held back and the note explaining why.

## Add a notice

Add an object to `content/notices.json`:

```json
{
  "id": "short-unique-slug",
  "title": "Notice title",
  "date": "2026-11-14",
  "category": "Admissions",
  "body": "The text, exactly as the school approved it.",
  "verified": true
}
```

`date` is `YYYY-MM-DD`, or a bare year like `"2026"` when only a year is known. Notices appear newest
first. Set `verified` to `true` only for text the school has approved.

## Add or change board results

`content/achievements.json`, entries with `"type": "academic"` and a `classes` array:

```json
"classes": [
  { "label": "Class X", "students": 46, "merit": 18, "passPercent": 100 },
  { "label": "Class XII", "students": 44, "merit": 8, "passPercent": 100 }
]
```

`label` must be exactly `Class X` or `Class XII` for the card layout. `passed` and `merit` are optional.
Never add individual student names, photographs or marks. Individual toppers need a separate,
consent-gated block that does not exist yet.

## Add photographs

1. Put the cropped image in `public/images/<section>/` and the untouched original in `public/images/raw/`.
2. Add an entry to `content/gallery.json` with a real `alt` description (at least 10 characters, and it
   must describe the photograph), a `caption`, the true `width` and `height`, and `webp` set to the same
   path with a `.webp` extension.
3. Run `npm run images` to generate the WebP file.
4. Photographs that show identifiable students need parental or guardian consent first. Check the
   signage for the correct spelling "Bharti" before marking a photo `usable: true`.

A new `section` value other than `campus`, `events`, `sports` or `brand` needs a schema change.

## Change the look

Edit `content/design-tokens.json`, then `npm run tokens` (the build does this too). Do not hand-edit
`src/styles/tokens.generated.css`.

## Ship a change

```bash
npm run lint && npm run typecheck && npm test
npm run build
git add -A && git commit -m "…" && git push
```

Vercel builds on push to `main`. A change to `VITE_ENQUIRY_ENDPOINT` or `SITE_URL` needs a redeploy.

## Pages that stay out until content exists

`/about/principal-message`, `/faculty` and `/student-life` have no content and are not built. When the
material arrives, add the route to `src/lib/routes.json` and `src/App.tsx`; the nav, footer, sitemap
and prerender pick it up from the route list.
