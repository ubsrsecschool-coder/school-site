# Launch checklist (Phase 7)

What is already done in the repository, and what only the project owner can do.

## Prepared in the repository

- [x] `vercel.json`: clean URLs, immutable caching for `/assets`, a day for `/images`, and security
      headers (CSP, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`). The CSP was tested in
      a browser against every route, the lightbox and the map: no violations.
- [x] Every route prerendered to static HTML; `404.html` for unknown URLs.
- [x] `sitemap.xml` and `robots.txt` generated when `SITE_URL` is set.
- [x] Per-route title, description, Open Graph tags; `EducationalOrganization` JSON-LD with confirmed
      facts only; the chairman stub is `noindex` and left out of the sitemap.

## Needs the project owner

1. **Create the form endpoint.** Sign up for a Formspree-compatible service, create a form that
   emails `umabhartischool@gmail.com`, and note its URL. If it is not on `formspree.io`, change
   `connect-src` and `form-action` in `vercel.json` to that host.
2. **Create the Vercel project** and connect the GitHub repository (`origin`, branch `main`).
   Build command `npm run build`, output directory `dist`, framework preset Vite.
3. **Set environment variables** in Vercel: `VITE_ENQUIRY_ENDPOINT` and `SITE_URL` (the final
   `https://` address with no trailing slash). Redeploy after changing either; they are read at build time.
4. **Point the domain** and confirm HTTPS and the www/apex redirect. The domain is not decided yet.
5. **Send a real test enquiry** from the live site and confirm it reaches the school inbox.
6. **Run `npm run content:report`** and confirm nothing it lists as held back has actually been
   confirmed by the school since the last check. Then update `docs/content-checklist.md`.
7. **Submit `https://<domain>/sitemap.xml`** in Google Search Console.
8. **Claim the Google Business Profile** using exactly the name, address and phone numbers on the site,
   and check the map pin. The site's map is a Google search for the school by name, so confirm it lands
   on the right building.
9. **Check the admissions notice is current.** The only admission dates the school has confirmed are
   the 8 February 2026 scholarship-cum-admission test and the 2026–27 session. Ask whether a later test
   or the next session's dates should replace them.

## Before announcing it

- [ ] The three photographs and the crest question in `docs/content-checklist.md` are decided (see
      "Building photo conflict" and "Crest vs. site palette conflict").
- [ ] Replace the phone-screenshot photographs with full-resolution originals, then run `npm run images`.
- [ ] Decide whether to publish a fee structure (affects `/admissions`).
- [ ] Decide on a WhatsApp number (set `whatsapp` in `src/lib/school.ts`; the row then appears).
- [ ] Facebook page URL, if wanted, for the footer and JSON-LD `sameAs`.
