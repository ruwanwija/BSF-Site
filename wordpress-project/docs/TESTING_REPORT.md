# FBSF WordPress Conversion — Testing Report

Test plan and results for the WordPress + Elementor conversion. The development sandbox does **not** include PHP/MySQL, so dynamic (browser) verification runs on the staging host; static validation (JSON, PHP structure, import payload) ran in the sandbox.

---

## 1. Static validation (completed in sandbox)

| # | Test | Method | Result |
|---|---|---|---|
| 1 | Elementor JSON syntax | All 22 generated files parsed with `JSON.parse` | ✅ 22/22 valid |
| 2 | Elementor structure | Recursive check: every element has `id`, `elType` ∈ {section, column, widget}; containers have `elements`; widgets have `widgetType` + `settings` | ✅ Pass |
| 3 | Unique element IDs | No duplicate `id` across any page/template | ✅ Pass |
| 4 | Widget type registry | All 27 widget types used in JSON are either native Elementor widgets (heading, text-editor, button, image, icon-list, counter, form, nav-menu) or registered by fbsf-core | ✅ Pass |
| 5 | PHP bracket balance | String/comment-aware bracket check over all 10 PHP files | ✅ 10/10 pass |
| 6 | PHP guard clauses | All plugin/theme files start with `ABSPATH` guard | ✅ Pass |
| 7 | Import payload completeness | Sections: options, taxonomies, departments, programmes, journals, articles, events, downloads, pages, templates, singles, reusable, front_page, menu — all present | ✅ Pass |
| 8 | Content counts | 4 depts / 10 programmes / 7 journals / 24 articles / 13 events / 12 downloads / 9 pages — match the static site | ✅ Pass |
| 9 | Placeholder rewriting | 15 `{{child}}` image URLs present for the importer to rewrite to child theme URLs | ✅ Pass (designed) |
| 10 | Generator re-run | `node tools/build-elementor.js` reproduces all outputs deterministically | ✅ Pass |

## 2. Dynamic test plan (run on staging host)

### 2.1 PHP syntax
```bash
for f in $(find wp-content/plugins/fbsf-core -name '*.php'); do
  php -l "$f"
done
php -l wp-content/themes/fbsf-child/functions.php
```
**Expected:** no errors for all 10 files. **Status:** ☐ to complete on staging

### 2.2 Import
```bash
wp fbsf import --file=/path/to/migration/fbsf-wp-import.json
```
**Expected:** summary with pages=9, departments=4, programmes=10, journals=7, articles=24, events=13, downloads=12, templates=10, menu=1. **Status:** ☐

Re-run import → **expected idempotent** (no duplicates). ☐

### 2.3 Pages (browser)
| Page | Checks | Status |
|---|---|---|
| / (home) | hero, stats, vision/mission, dean, 4 dept cards, 6 programme cards, journal cards, announcements, quick links, contact strip, footer | ☐ |
| /about/ | history timeline (5 events), vision/mission, stats, department cards, dean, committees | ☐ |
| /departments/ | 4 department cards, Find-a-Programme CTA, QA units | ☐ |
| /department/accountancy/ (single) | intro, at-a-glance, vision/mission, HOD message, programmes, research, MoUs, contact | ☐ |
| /programmes/ | filter bar + 10 cards, expandable details, course-structure tables, how-to-apply, count badge | ☐ |
| /research/ | research areas chips, 7 journal cards, 3 symposium cards, submission emails | ☐ |
| /publications/ | 8 journal tabs, 7 journal cards, article search (24 articles), submission info | ☐ |
| /events/ | 3 symposium cards with tracks/dates/keynote/committee, archived badges, 10 announcements, proceedings downloads | ☐ |
| /authorities/ | FQAC structure/functions, committees, QA units, downloads, useful links | ☐ |
| /contact/ | 6 contact groups, visit us, office hours, form, 8 FAQs | ☐ |
| /search/ | search for "banking", "DAIS", "SACFIRE" → results across CPTs | ☐ |

### 2.4 Interactivity
| Feature | Test | Status |
|---|---|---|
| Programme filter | click each of 7 category pills; select departments; type search terms; verify count + empty state | ☐ |
| Journal tabs | click each tab; verify panel switch | ☐ |
| Article search | type "going concern", "intellectual capital", "green banking" | ☐ |
| Download notice | click request buttons; modal opens; email link works | ☐ |
| Contact form | submit valid + invalid email; check mailbox + error handling | ☐ |
| Back-to-top | scroll down; button appears; click → top | ☐ |
| Nav dropdowns | Departments, Research dropdowns expand/collapse; mobile menu works | ☐ |
| Single-page navigation | navigate to department/programme/journal/event singles from cards | ☐ |

### 2.5 Historical-data integrity
- ☐ No past deadline/event displays without "Archived — concluded" badge
- ☐ Archive notices render on home + events + publications
- ☐ Statuses in CPT editor are `historical`/`past` for all 2023–2026 items

### 2.6 Responsive
- ☐ Desktop 1440/1280, tablet 1024, mobile 768/375 — no horizontal overflow, cards reflow
- ☐ Filter bar stacks on mobile; stats wrap
- ☐ Mobile nav (hamburger) opens/closes; dropdowns work on touch

### 2.7 Console & performance
- ☐ Browser console: no JS errors, no failed resource requests
- ☐ PageSpeed/Lighthouse: run on home; record scores (baseline recorded)
- ☐ No Elementor Pro features required (Theme Builder, Containers, Forms all free)

### 2.8 Security
- ☐ No hardcoded credentials; emails are content fields
- ☐ All admin actions use nonces (import form, meta boxes)
- ☐ Custom meta uses `sanitize_textarea_field`/`sanitize_text_field`
- ☐ Plugin update flow: fbsf-core updates via ZIP

### 2.9 Accessibility
- ☐ Images have alt text (logo/decorative)
- ☐ Buttons have labels; form fields have labels
- ☐ Colour contrast of navy/green on white meets WCAG AA for text

## 3. Test results log (fill on staging)

| Test | Date | Result | Notes |
|---|---|---|---|
| PHP syntax | 2026-11-05 | ☐ | |
| Import | | ☐ | |
| Pages | | ☐ | |
| Interactivity | | ☐ | |
| Responsive | | ☐ | |
| Performance | | ☐ | |
| Security | | ☐ | |

## 4. Known issues / open items

| # | Issue | Impact | Mitigation |
|---|---|---|---|
| 1 | No PHP/MySQL in sandbox — PHP syntax + browser tests must run on staging | Cannot execute the site here | Static validation done; test scripts provided (§2) |
| 2 | Google Fonts (Poppins) require internet on first load | Falls back to system fonts offline | Acceptable; can bundle later |
| 3 | Downloads are request-notice buttons (no files hosted) | Matches original site design | Request email links to faculty office |
| 4 | Elementor version drift may change template JSON format | Minor — regenerate via `tools/build-elementor.js` | Keep generator + re-run after upgrades |
| 5 | Journal editorial boards: not provided in source document for most journals | "Information not available" displayed | Faculty must supply board lists |
| 6 | Department contact details: partially unavailable in source | Contact card shows "contact faculty office" | Faculty must supply per-department contacts |

## 5. Acceptance criteria checklist (from the project brief)

- ☐ Website visually matches the original HTML site
- ☐ All original pages/content migrated (see MIGRATION_CHECKLIST.md)
- ☐ Pages editable through Elementor
- ☐ Global header/footer managed centrally (Theme Builder)
- ☐ News, programmes, journals, publications, events updatable via WordPress (CPTs)
- ☐ Images/documents managed via Media Library
- ☐ Works on desktop, tablet, mobile
- ☐ Internal navigation + downloadable documents work
- ☐ No major PHP/JS/CSS errors
- ☐ Maintainable by faculty administrators without code (EDITING_GUIDE.md)

**Testing completed by:** ____________________ **Date:** ____________
