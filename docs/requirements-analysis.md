# Uma Bharti Senior Secondary School — Website Requirements Analysis & Development Specification

**Prepared from:** 3 campus/building photographs, 1 school crest, and 9 social-media posts (athletics results, board-result banners, admission notices, a newspaper clipping, and a Chairman's greeting) provided by the school.

**Ground rule followed throughout this document:** nothing below states an achievement, statistic, affiliation, or fact that isn't visibly printed in your material. Anything ambiguous, inconsistent, or missing is called out explicitly under "Needs verification" so the school can confirm it before it goes live.

## Table of Contents

- [0. Data Accuracy Notes — Read This First](#0-data-accuracy-notes--read-this-first)
- [A. Executive Website Concept](#a-executive-website-concept)
- [B. Complete Sitemap](#b-complete-sitemap)
- [C. Detailed Homepage Wireframe](#c-detailed-homepage-wireframe)
- [D. Content Requirements — What's Still Needed From You](#d-content-requirements--whats-still-needed-from-you)
- [E. Image Mapping](#e-image-mapping)
- [F. Design System](#f-design-system)
- [G. Functional Requirements](#g-functional-requirements)
- [H. Technical Recommendations](#h-technical-recommendations)
- [I. SEO & Accessibility Checklist](#i-seo--accessibility-checklist)
- [J. Development Roadmap](#j-development-roadmap)
- [K. Final Build Specification (Developer-Ready Summary)](#k-final-build-specification-developer-ready-summary)

---

## 0. Data Accuracy Notes — Read This First

### Confirmed facts (visible in your material)

| Fact | Source |
|---|---|
| School name (confirmed official spelling) | Uma Bharti Senior Secondary School / "Uma Bharti Sr. Sec. School" |
| Location | Bhora Kalan, Gurugram (Gurgaon), Haryana |
| Established | 1999 ("ESTD-1999" on 2022 banner) |
| Medium of instruction | English Medium |
| Board affiliation (confirmed) | Affiliated with HBSE — Haryana Board of School Education; curriculum follows the CBSE pattern (this is a pattern/syllabus style, not a CBSE affiliation — the two should not be conflated on the site) |
| Recognition status (as printed) | "Permanent Recognised" |
| Classes offered | Nursery to Class XII |
| Chairman (confirmed) | Mr. Randhir Singh Chauhan, Chairman (previously miscaptioned as "Chairperson" in social posts — use "Chairman" site-wide) |
| Phone numbers | 9813218913, 8053170444, 8053170448 |
| Email | umabhartischool@gmail.com |
| Motto | *Tamaso Ma Jyotirgamaya* — "Lead me from darkness to light" (Devanagari: तमसो मा ज्योतिर्गमय — render in Noto Sans Devanagari on the live site) |
| Admission session open | 2026–27, scholarship-cum-admission test held 8 Feb 2026 for Classes 1–XI (Science/Commerce/Humanities streams) |
| Admission benefit | No admission fee; full tuition-fee concession for the third child of the same parents |
| Board results (2024–25, per newspaper) | Class X: 46 students, 18 with merit, 100% pass. Class XII: 44 students, 8 with merit, 100% pass |
| Board results (10th, session referred to as 2026) | 64 total students, 64 passed (100%) |
| Sports | Multiple 1st/2nd/3rd place finishes at SGFI District- and Block-level athletics competitions across track & field events |
| Existing tagline in use | "Building Strong Foundation for Tomorrow" |

### Resolved (confirmed by school)

- Official spelling is **"Bharti"** (not "Bharati" — Image 13's signage was outdated/incorrect and should not be used as reference).
- Board affiliation is **HBSE (Haryana Board of School Education)**, with the curriculum following the **CBSE pattern**. The website should say "HBSE-affiliated, CBSE-pattern curriculum" — not "CBSE-affiliated," which would be inaccurate.
- Chairman is **Mr. Randhir Singh Chauhan** — correct title is **"Chairman"**, not "Chairperson."

### Still needs verification before publishing

- **Village name.** Facebook posts say "Bhora Kalan," but the newspaper clipping refers to the village as "Bhojkalan." Confirm the correct name for the address, Google Maps pin, and schema markup.
- **HBSE affiliation/registration number.** Please supply this so it can be stated precisely (with number) rather than generically.
- **"Permanent Recognised" status.** No recognition/registration number is shown. If you want to state this on the site, provide the certificate/number so it can be cited accurately, or keep the wording general.
- **Two of the three building photos look architecturally different** — different height, window color, and gate style (Image 11/13 vs. Image 12). Please confirm whether these are two different blocks of the same campus or two different photos that shouldn't both be used. Also, Image 11 and Image 13 show different signage text ("Uma Bharti Sr. Sec. School" vs. "Uma Bharati School") — likely the same building at different times; confirm which signage is current.
- **Two of the athletics posters (Images 5 and 6) are labeled "AI content" by Facebook itself.** This likely just means the poster graphic/template was AI-designed, but please confirm the underlying results data is accurate before it goes on the website.
- **Principal's name and message are not present anywhere** — only the Chairman's birthday greeting was provided, which is not appropriate content for the site.
- **Exact topper percentages/marks in the newspaper clipping (Image 8)** are small and partly hard to read with certainty. Before publishing exact figures, please verify them against your original records.
- **Names, photographs, and marks of minor students** appear throughout the achievement posters. Before publishing these publicly, please confirm the school has parental/guardian consent to display children's full names, photos, and academic marks on a public website. If consent isn't already on file, consider using first names only, a smaller representative selection, or anonymized summaries for the public site.

---

## A. Executive Website Concept

The site should function as a **digital front door and trust-builder** for a long-established (1999), English-medium, low-cost, community-rooted school — not as a flashy coaching-institute-style site. The existing brand materials (navy blue, red, and gold color usage; the Saraswati crest; a genuine, repeatedly-reused tagline; a real, decades-long history) already give the school a stronger authentic identity than most local competitors, and the design should lean into that rather than override it with a generic template look.

**Who it needs to work for:**
- **Parents evaluating schools** — need to quickly see the campus, results, fees/admission process, and how to contact/enquire.
- **Prospective parents further away** — need location clarity (Bhora Kalan, Gurugram), transport info if available, and admission timelines.
- **Current parents/students** — need notices, results, and event updates without calling the office.
- **Teachers/staff & prospective staff** — an "About/Careers" presence adds credibility.
- **Local community & alumni** — validate the school's standing (press coverage, sports achievements).

**What builds trust here specifically:** the 1999 establishment date, consistent multi-year board results, real newspaper coverage, and genuine sports achievements — not stock photography or invented statistics.

---

## B. Complete Sitemap

```
Home
About Us
├─ Our Story (history since 1999, motto, crest meaning)
├─ Chairman's Message
├─ Principal's Message [Needs content]
└─ Infrastructure & Campus
Academics
├─ Curriculum & Streams (Science / Commerce / Humanities)
└─ Academic Results (year-wise, board results)
Admissions
├─ Admission Process
├─ Scholarship-cum-Admission Test
└─ Fee Structure [Needs content — optional to publish]
Achievements
├─ Academic Toppers
├─ Sports & Athletics
└─ In the News / Press
Gallery
├─ Campus
├─ Events & Activities
└─ Sports
Faculty [Needs content]
Student Life [Needs content]
Notices & Announcements
Contact Us
```

---

## C. Detailed Homepage Wireframe

1. **Header / Navigation** — logo (crest) + school name, sticky nav, phone number and "Admissions Open 2026–27" badge visible at all times, mobile hamburger menu.
2. **Hero Section** — best available building photograph (Image 11, pending a higher-resolution version), school name, existing tagline "Building Strong Foundation for Tomorrow," primary CTA ("Enquire for Admission") and secondary CTA ("Call Now").
3. **Quick Facts Strip** — Established 1999 · English Medium · Nursery–XII · Bhora Kalan, Gurugram. (Numbers like student/faculty count only if the school supplies them — none were in the material provided.)
4. **School Introduction** — 2–3 sentence authentic summary (drafted in Section D below).
5. **Chairman's Message** — short quote/photo of Mr. Randhir Singh Chauhan (needs a proper portrait, not the birthday graphic) + link to full message page.
6. **Academic Highlights** — most recent verified board result summary (e.g., 100% Class X & XII pass, session confirmed) with a link to the full Achievements page.
7. **Sports & Co-curricular Highlights** — 2–3 standout athletics results with a link to the full page.
8. **Facilities** — only once the school confirms which facilities exist and supplies photos; currently no facility photos were provided.
9. **Admissions CTA Banner** — 2026–27 admission open, scholarship-cum-admission test details, "No Admission Fee" benefit, enquiry button.
10. **Photo Gallery Preview** — 6–8 curated images (campus + a couple of the cleaner achievement banners), linking to full gallery.
11. **Notices/Announcements Strip** — a simple, admin-editable list (admission dates, test dates, holidays).
12. **Location & Contact** — embedded map (once exact address/village name is confirmed), phone numbers, email, WhatsApp click-to-chat.
13. **Footer** — logo, quick links, social links (the school's Facebook page is confirmed and active), contact details, copyright.

---

## D. Content Requirements — What's Still Needed From You

| Category | What's needed |
|---|---|
| Identity | Correct village name for the address (Bhora Kalan vs. Bhojkalan) |
| Legal/credibility | HBSE affiliation/registration number; "Permanent Recognised" certificate/number |
| People | Principal's name, a formal photo, and a short message; a formal (non-birthday) photo of Chairman Mr. Randhir Singh Chauhan |
| Numbers | Current total student strength, total faculty count, class-wise sections — none of this was in the provided material |
| Facilities | Which of these actually exist on campus, plus photos: library, science/computer labs, playground/sports ground, transport, smart classrooms, medical room, etc. |
| Logistics | School timings, working days, holiday calendar |
| Admissions | Full admission process/document checklist; whether to publish a fee structure |
| Contact | Whether one of the phone numbers should be a WhatsApp-enabled business number for click-to-chat |
| Media | Higher-resolution originals of the building photos and the logo (ideally a transparent PNG or vector of the crest) |
| Consent | Confirmation that parental consent exists to publish children's names, photos, and marks publicly — or a decision to use partial/anonymized data instead |

**Suggested homepage copy** (marketing copy, not factual claims — for your review/edit):
- Headline: "Uma Bharti Senior Secondary School — Nurturing Minds Since 1999"
- Tagline (reusing your existing one): "Building Strong Foundation for Tomorrow"
- Intro line: "An English-medium school affiliated with HBSE, following the CBSE-pattern curriculum, serving Bhora Kalan, Gurugram from Nursery to Class XII."

---

## E. Image Mapping

| # | What it shows | Recommended section | Suggested use | Notes |
|---|---|---|---|---|
| 1 | SGFI District-Level Athletics results poster | Achievements → Sports | Gallery/card image | Solid content, clean poster |
| 2 | 2026–27 Scholarship-cum-Admission Test notice | Admissions page + homepage banner | Featured banner | Core admissions content |
| 3 | Class X Result 2026 poster (toppers + stats) | Achievements → Academic Toppers, homepage highlight | Card image | Verify exact stat wording before quoting |
| 4 | Best Result 2022–23 achievers poster | Achievements → archive | Gallery image | Good historical trust signal |
| 5 | SGFI Block-Level Athletics poster (Facebook-flagged "AI content") | Achievements → Sports | Gallery image, pending data verification | Confirm data accuracy first |
| 6 | SGFI Block-Level Athletics poster #2 (Facebook-flagged "AI content") | Achievements → Sports | Gallery image, pending data verification | Confirm data accuracy first |
| 7 | Chairman's birthday greeting | Not recommended for public site | — | Internal/social content only; request a proper portrait of Mr. Randhir Singh Chauhan instead |
| 8 | Newspaper clipping (Amar Ujala) with board-result coverage and toppers | Achievements → In the News | Featured "Press Coverage" section | Strong third-party trust signal; verify small-print figures |
| 9 | 2021–22 meritorious students poster (also shows "ESTD-1999" and CBSE-pattern line) | About Us (for founding year), Achievements archive | Gallery/reference | Source for the 1999 establishment date |
| 10 | School crest/logo (Saraswati emblem) | Header, footer, favicon | Site-wide brand asset | Request a high-res transparent version |
| 11 | Building photo — peach façade, columns, 2 floors | Homepage hero (best candidate) | Hero image | Needs higher resolution for hero use |
| 12 | Building photo — white/teal façade, taller block | Campus/Facilities gallery | Gallery image | Confirm relationship to Image 11/13 |
| 13 | Building photo — peach façade, columns, festive entrance decor | About Us / Campus gallery | Gallery image | Likely same building as #11; confirm current signage |

---

## F. Design System

**Color palette** (derived from the school's own crest and posters — navy, red/crimson, and gold are already used consistently across your materials, which is a good sign of an existing, if informal, brand identity):

| Role | Color | Approx. Hex |
|---|---|---|
| Primary (navy) | Used in crest text, headers | `#1B2A56` |
| Secondary (crimson red) | Shield border, banners | `#B3122A` |
| Accent (gold) | Trophies, laurels, highlights | `#D4AF37` |
| Tertiary accent (magenta) — sparing use | Crest emblem background | `#C2185B` |
| Background | Warm off-white | `#FBF9F5` |
| Text | Charcoal | `#22252B` |

*(These are a professional starting palette based on visual inspection — a designer should pull exact hex values from the original logo file when available.)*

- **Typography:** A serif display font (e.g., Playfair Display or Merriweather) for headings to convey heritage/trust, paired with a clean sans-serif (e.g., Inter or Poppins) for body text. Include a Devanagari-supporting font (e.g., Noto Sans Devanagari) for the Sanskrit motto and any Hindi content.
- **Buttons:** Solid navy primary buttons, gold on hover; outlined secondary buttons; 8px corner radius; no heavy gradients.
- **Cards:** White background, soft shadow, 12–16px radius, a thin gold top-border accent for achievement cards.
- **Icons:** Simple line-icon style (e.g., Lucide/Feather), navy by default, gold for achievement/award icons.
- **Spacing:** 8pt grid system for consistent rhythm.
- **Image treatment:** Consistent aspect ratios per section, subtle rounded corners, no heavy filters — keep the campus authentic per your own instruction.
- **Animation level:** Minimal — subtle fade/slide on scroll only. No parallax or heavy motion; this should read as a school site, not a startup landing page.

---

## G. Functional Requirements

**Essential**
- Online admission enquiry form
- Contact form
- Click-to-call button
- WhatsApp CTA (pending confirmation of a WhatsApp-enabled number)
- Google Maps embed
- Notice board (admin-editable)
- Photo gallery
- Achievement showcase

**Recommended**
- Events/activities calendar
- Downloadable documents (admission form PDF, fee structure if published)
- Social media links (Facebook page confirmed active)

**Optional / Future**
- Online fee payment
- Parent/student login portal
- Alumni section
- Careers/staff recruitment page
- Newsletter signup

---

## H. Technical Recommendations

- **Stack:** Next.js (React) + Tailwind CSS — good SEO support, fast, and modern.
- **Content management:** Given a non-technical admin will update notices/results, use either (a) simple JSON/Markdown content files editable through a lightweight custom admin page, or (b) a headless CMS such as Sanity if budget allows for a friendlier editing UI.
- **Forms:** A form service (e.g., Formspree) or a simple serverless API route with an email service — avoids building custom backend infrastructure.
- **Hosting:** Vercel (pairs naturally with Next.js, generous free tier for a site this size).
- **Suggested folder structure:**

```
/app
  /about
  /academics
  /admissions
  /achievements
  /gallery
  /contact
/components
  Header, Footer, Hero, NoticeBoard, AchievementCard, GalleryGrid, AdmissionForm...
/content
  notices.json
  achievements.json
  gallery.json
  faculty.json
/public
  /images
/styles
```

---

## I. SEO & Accessibility Checklist

- [ ] Descriptive, unique page titles and meta descriptions per page
- [ ] Clear H1→H2→H3 heading hierarchy
- [ ] `EducationalOrganization` / `School` schema.org structured data (name, address, phone, founding date 1999, logo, `sameAs` → Facebook page) — once address details are verified
- [ ] Local SEO: consistent NAP (Name, Address, Phone) across site and Google Business Profile
- [ ] Descriptive alt text on every image (no generic "image1.jpg")
- [ ] Responsive images with lazy loading
- [ ] Sitemap.xml and robots.txt
- [ ] Color-contrast compliance (the navy/gold/white palette above passes standard contrast checks)
- [ ] Full keyboard navigability
- [ ] Open Graph tags for social sharing

---

## J. Development Roadmap

1. **Discovery & Content Finalization** (~1 week) — resolve the "Needs verification" items above, collect missing content and higher-res media, confirm consent for student data.
2. **Design** (~1–1.5 weeks) — finalize palette/typography from actual logo file, build homepage wireframe/mockup, get sign-off.
3. **Core Development** (~2–3 weeks) — build all sitemap pages, responsive layout, forms.
4. **Content Population** (~1 week) — load real content, notices system, results, gallery.
5. **SEO/Accessibility/Performance QA** (~3–5 days) — Lighthouse audit, alt-text pass, structured data validation.
6. **Launch** — domain/hosting setup, Google Business Profile, sitemap submission.
7. **Post-Launch** — admin training on updating notices/results, plan future features (fee payments, portal, etc.) from the "Optional" list.

---

## K. Final Build Specification (Developer-Ready Summary)

- **Pages/routes:** `/`, `/about`, `/about/chairman-message`, `/about/principal-message`, `/academics`, `/admissions`, `/achievements`, `/gallery`, `/contact`, `/notices`
- **Core reusable components:** `Header`, `Footer`, `Hero`, `QuickFactsStrip`, `NoticeBoard`, `AchievementCard`, `GalleryGrid`, `AdmissionEnquiryForm`, `ContactForm`, `MapEmbed`

**Example data schema (`content/achievements.json`):**

```json
{
  "id": "district-athletics-2026",
  "type": "sports",
  "title": "SGFI District Level Athletics Competition",
  "date": "2026",
  "results": [
    { "event": "400m Hurdles (U-19)", "position": "1st" },
    { "event": "Long Jump (U-19)", "position": "1st" }
  ],
  "sourceImage": "image-1.jpg",
  "verified": false
}
```

**Example data schema (`content/notices.json`):**

```json
{
  "id": "adm-test-2026",
  "title": "Scholarship-cum-Admission Test",
  "date": "2026-02-08",
  "body": "Classes 1st–XI, Science/Commerce/Humanities, 10:00 AM, offline mode."
}
```

- **Brand tokens:** colors, fonts, and spacing as defined in Section F, to be implemented as Tailwind theme variables.
- **Non-negotiable content rule for whoever builds this:** no statistic, award, affiliation, or testimonial should be added to the live site beyond what the school has explicitly confirmed — placeholders should read `[Needs verification]` until then, not a plausible-sounding guess.

---

### Next Step

Once you've reviewed the "Needs verification" list in Section 0 and the content gaps in Section D, ready to move into actual homepage design/build — starting with the homepage wireframe as code once the flagged items are confirmed, per the instruction not to start building before the requirements are settled.
