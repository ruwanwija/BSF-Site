# FBSF Content Migration Checklist

Verifies that every part of the original static website (the 13-page HTML site) has been transferred to the WordPress + Elementor project. Run after importing `migration/fbsf-wp-import.json`.

**Import summary (expected):** 4 departments · 10 programmes · 7 journals · 24 articles · 13 events · 12 downloads · 9 pages · 4 Theme Builder templates · 4 single templates · 6 reusable templates · 1 menu

---

## 1. Page-by-page migration verification

| # | Original page (static) | WordPress destination | Status |
|---|---|---|---|
| 1 | index.html (hero, vision/mission, about, dean, departments, programmes, research, announcements, quick links, contact strip) | Page `home` (/) with Elementor layout | ☐ |
| 2 | about.html (history timeline, vision/mission, overview stats, dean, structure) | Page `about` (/about/) + history/committees from Options | ☐ |
| 3 | departments.html (4 dept cards, Find-a-Programme, QA units) | Page `departments` (/departments/) | ☐ |
| 4 | departments/accountancy.html | Single template `single-department` → CPT `Department of Accountancy` | ☐ |
| 5 | departments/banking-finance.html | Single template → CPT `Department of Banking & Finance` | ☐ |
| 6 | departments/business-management.html | Single template → CPT `Department of Business Management` | ☐ |
| 7 | departments/insurance-valuation.html | Single template → CPT `Department of Insurance & Valuation` | ☐ |
| 8 | programmes.html (filter bar, 10 programme cards, details, how-to-apply) | Page `programmes` (/programmes/) + `fbsf-programme-filter` widget + CPTs | ☐ |
| 9 | research.html (portal, journals, symposia, submissions) | Page `research` (/research/) | ☐ |
| 10 | publications.html (journal tabs, article search, submissions) | Page `publications` (/publications/) + `fbsf-journal-tabs` + `fbsf-article-search` | ☐ |
| 11 | events.html (3 symposia, 10 announcements, proceedings) | Page `events` (/events/) + CPT events | ☐ |
| 12 | authorities.html (FQAC, QA units, downloads, useful links) | Page `authorities` (/authorities/) + Options | ☐ |
| 13 | contact.html (6 contact groups, visit/hours, form, FAQ) | Page `contact` (/contact/) + Options + Elementor Form | ☐ |

## 2. Content inventory verification

| Content | Static count | WordPress count | Check |
|---|---|---|---|
| Departments | 4 | 4 (CPT `fbsf_department`) | ☐ |
| Programmes | 10 | 10 (CPT `fbsf_programme`) | ☐ |
| Journals | 7 | 7 (CPT `fbsf_journal`) | ☐ |
| Research articles | 24 | 24 (CPT `fbsf_article`) | ☐ |
| Symposia | 3 (ARSYM, SACFIRE, SyBFin) | 3 (CPT `fbsf_event`) | ☐ |
| Announcements | 10 (archived) | 10 (CPT `fbsf_event`, type programme-application) | ☐ |
| Downloads | 12 (4 QA + proceedings) | 12 (CPT `fbsf_download`) | ☐ |
| FAQs | 8 | 8 (Options) | ☐ |
| Contact groups | 6 | 6 (Options) | ☐ |
| Quick links | 6 | 6 (Options) | ☐ |
| Menu items | 8 top-level (+2 dropdowns) | 8 (WP menu) | ☐ |

## 3. Structured data spot checks (after import)

For each programme, verify in the editor that the meta matches the static site:

- ☐ DAIS: code DAIS 1263, diploma, Accountancy, fees Rs. 80,000.00, deadline 25 January 2024 (historical)
- ☐ DBFS: diploma, Banking-finance, deadline 10th May 2025 (historical)
- ☐ HDBFS: higher diploma, Banking-finance, closing 25th February 2026 (historical), contact hdbfs@wyb.ac.lk
- ☐ PGDBM: postgraduate, Business-management, 12 modules / 24 credits
- ☐ MBA: postgraduate, Business-management, 16 credits
- ☐ External flag on: DBFS, HDBFS, ACFSM, RMI Dip/HDip
- ☐ All 4 external programmes carry `category_term = external` → green "External" badge

Journals:
- ☐ SLJBSF ISSN 2756-9381 · SLJBF ISSN 2345-9271 · JIF ISSN 2673-1258 · Voice of Insurance ISSN 2806-5018
- ☐ Submission emails: jaf@wyb.ac.lk, jif@wyb.ac.lk, sacfire@wyb.ac.lk (as documented)
- ☐ JARSYM 15 + SACFIRE 7 + SLJBSF 2 = 24 articles present in article search

Events:
- ☐ ARSYM 2024 theme "Beyond Boundaries", keynote Prof. Ravi Dissanayake, 16 tracks
- ☐ SACFIRE 2025 theme "Furtherance of Entrepreneurialism Culture…", keynote Prof. Lakshman R. Watawala
- ☐ SyBFin 2025 theme "Redesigning Finance for an Intelligent, Inclusive Future"
- ☐ All three have status "past" → "Archived — concluded" badge renders

Contacts:
- ☐ Faculty office: +94 37 228 4215, bsfoffice@wyb.ac.lk
- ☐ HDBFS: 037 228 4216 / 071 757 4114, hdbfs@wyb.ac.lk
- ☐ Insurance HOD: Dr. Weedige Sampath Sanjeewa

## 4. Navigation & templates

- ☐ Header renders on every page (topbar + logo + nav + search button)
- ☐ Departments dropdown shows 4 departments + "All departments"
- ☐ Research dropdown shows Research Portal / Publications / Events & Symposia
- ☐ Footer renders (brand, quick links, contact, useful links, © 2026)
- ☐ Single templates work: visit /department/accountancy/, /programme/dais/, /journal/jarsym/, /event/arsym-2024/
- ☐ Homepage is set (Settings → Reading → Your homepage displays → A static page → Home)
- ☐ Permalinks use Post name structure

## 5. Interactivity verification

- ☐ /programmes/ — click category pills, department select, type in search — cards filter; count updates
- ☐ /publications/ — journal tabs switch panels; article search filters by title/author
- ☐ /events/ — all events show "Archived — concluded" badges
- ☐ Download buttons open the request notice (email faculty office)
- ☐ Contact form submits (check mailbox)
- ☐ Back-to-top button appears on scroll
- ☐ Global search (header button → /search/) returns results across CPTs

## 6. Accuracy & integrity rules

- ☐ No invented names, fees, dates, ISSNs or contacts — everything traceable to the source document
- ☐ Missing data shows "Information not available" — no placeholder fabrication
- ☐ Historical dates are never displayed as upcoming
- ☐ Official terminology preserved (department names, journal titles, programme names)
- ☐ No broken internal links (check every navigation item)
- ☐ All images load (logo, hero pattern, campus art from child theme assets)

## 7. Migration source files

| File | Purpose |
|---|---|
| `migration/fbsf-content.json` | Original export from the static site's verified `js/data.js` (source of truth) |
| `migration/fbsf-wp-import.json` | Generated WordPress import payload (pages + templates + CPTs + options + menu) |
| `tools/build-elementor.js` | Regenerates all Elementor JSON from `fbsf-content.json` |

Re-generate after any content change to `fbsf-content.json`:

```bash
node tools/build-elementor.js
```

## 8. Sign-off

- ☐ All 13 pages verified in browser
- ☐ All counts match
- ☐ All spot checks pass
- ☐ Accuracy rules confirmed
- ☐ Administrator can edit content without code (see EDITING_GUIDE.md)

**Migration completed by:** ____________________ **Date:** ____________
