# FBSF Website — WordPress + Elementor Conversion
## Phase 1: Existing Website Analysis & WordPress Architecture

**Project:** Convert the existing static FBSF website (HTML5/CSS3/Vanilla JS) into an Elementor-based WordPress website.
**Scope:** This document covers Stage 1 (analysis) and Stage 2 (architecture). **Implementation begins only after this document is approved.**

---

## 1. Executive Summary

| Item | Finding |
|---|---|
| Source site | 13 HTML pages, 5 JS modules, 3 CSS files, 5 SVG assets (repo `main` branch, commit `7cce23c`) |
| WordPress approach | Elementor (free, latest 3.x) + one custom plugin (`fbsf-core`) + one child theme — **no Elementor Pro required** (Theme Builder & Containers are free in Elementor 3.x) |
| Content model | 4 custom post types + 2 secondary CPTs, 4 taxonomies, ~30 structured content items (4 departments, 10 programmes, 7 journals, 24 articles, 3 symposia, 10 announcements, 8 FAQs, 6 contact groups) |
| Migration | Machine-generated content export (`migration/fbsf-content.json`, generated from the site's own verified `js/data.js`) imported via a WP-CLI command in the custom plugin |
| Environment constraint | **This sandbox has no PHP, MySQL, or WP-CLI** — the WordPress project cannot be executed here. Deliverables are a complete, ready-to-deploy project (code, templates, importer, docs) plus verification on the target hosting. |

---

## 2. Stage 1 — Existing Website Analysis

### 2.1 Project file inventory

```
BSF-Site/
├── index.html, about.html, departments.html, programmes.html, research.html,
│   publications.html, events.html, authorities.html, contact.html
├── departments/{accountancy,banking-finance,business-management,insurance-valuation}.html
├── css/{style,components,responsive}.css      (~390 rules)
├── js/{data,main,navigation,search,filters}.js
├── assets/{images,icons}/  (logo, hero pattern, campus art, favicon, 35-icon sprite)
├── README.md, CONTENT_MAPPING.md, CONTENT_GAPS.md
├── Complete_Website_Reverse_Engineering_and_Documentation.pdf  (audit of the live WordPress site)
└── migration/fbsf-content.json  (NEW — machine-generated content export for WP import)
```

### 2.2 Page-by-page inventory (verified from source)

| # | Page | Sections / components |
|---|---|---|
| 1 | **Home** | Topbar + sticky header (logo, 7-item nav w/ 2 dropdowns, search btn) · Hero (badge, H1, intro, 2 CTAs, 4 stats) · accuracy notice · Vision & Mission (2 cards) · About the Faculty (text + campus art + CTAs) · Dean's Message (quote + portrait + signature) · 4 department cards · 6 programme cards · Research & Publications (4 journal cards + symposia band) · Announcements (6 cards + latest-notice) · Quick Access (6 links) · Contact strip · Footer (3-col + copyright) |
| 2 | **About** | Breadcrumb + hero · History & Establishment (text + 5-item timeline) · Vision & Mission · Faculty Overview (4 stats + 4 department cards) · Dean's Message · Academic & Administrative Structure (FQAC + committees cards) · notice · Contact strip · Footer |
| 3 | **Departments** (landing) | Hero · 4 department cards · Find-a-Programme CTA · 4 departmental QA unit cards · Contact strip · Footer |
| 4–7 | **Department pages** (×4) | Hero + breadcrumb · Intro + At-a-Glance card · Vision & Mission · HOD message · Programme cards (2–4) · Research activities + publication links · MoUs/Industry cards (3–4) · Contact strip · Footer |
| 8 | **Programmes** | Hero · Filter bar (category pills ×7, department select ×5, text search) · count badge · 10 programme cards with expandable details (description, entry reqs, highlights, course-structure table, fees, documents, deadline) · accuracy notice · How-to-Apply 3 steps · Footer |
| 9 | **Research** | Hero · 4 stats · Research culture + research-area chips · 7 publication teaser cards · 3 symposium teaser cards · Submission guidelines cards · Contact strip · Footer |
| 10 | **Publications** | Hero · Journal filter tabs (×8) + search · 7 journal cards (ISSN, frequency, publisher, description, issues, latest, submission) · Article search (24 articles) · Submission info · Footer |
| 11 | **Events** | Hero · Archive notice · 3 symposium cards (theme, description, tracks, dates timeline, keynote, committee, downloads) · 10 announcement cards · Proceedings downloads (3) · Footer |
| 12 | **Authorities** | Hero · FQAC (description, structure, functions, liaison committees) · 4 departmental QA units · Downloads (4) · Useful links (3) · Footer |
| 13 | **Contact** | Hero · 6 contact-group cards · Visit Us card · Office-hours card · Enquiry form (frontend demo) · FAQ accordion (8) · Footer |

### 2.3 Interactive feature inventory (14 required features → mapping)

| # | Existing feature | WordPress/Elementor equivalent |
|---|---|---|
| 1 | Responsive navigation menu | Elementor **Navigate/Menu widget** + mobile menu (Theme Builder header) |
| 2 | Dropdown navigation | Elementor Menu widget with dropdown items (Departments, Research) |
| 3 | Global search (Ctrl+K modal) | WP search (CPTs enabled) + Elementor **Search widget**; optional modal via child-theme JS |
| 4 | Programme filtering (category/department/text) | **Custom plugin shortcode/widget** (`fbsf_programme_filter`) with Elementor Repeater/Posts-widget-compatible output + vanilla JS |
| 5 | Department navigation | WP menus + CPT archive pages |
| 6 | Publication filtering by journal | Elementor Posts widget w/ taxonomy filter + custom journal-tabs shortcode |
| 7 | FAQ accordions | Elementor **Accordion widget** (content via CPT or editor) |
| 8 | Event/announcement cards | Elementor Posts widget / custom event-card shortcode |
| 9 | Back-to-top | Child-theme vanilla JS (10 lines) |
| 10 | Smooth scrolling | Child-theme CSS `scroll-behavior` |
| 11 | Mobile-friendly nav | Elementor responsive breakpoints + theme mobile header |
| 12 | Download buttons (request-file notice) | Elementor **File/Button widget** + child-theme notice JS (or Elementor toggle) |
| 13 | Internal page navigation | WP menus + permalink structure |
| 14 | Active nav highlighting | Menu active states + current-post highlighting in child theme |

### 2.4 Content inventory (migrated from verified `js/data.js`)

- **4 departments** (full vision/mission, HOD messages, programmes, research, MoUs, contacts)
- **10 programmes** (3 UG, 2 PG, 3 diploma, 1 higher diploma, 1 advanced certificate, incl. full course structures for DAIS/DBFS, fees, deadlines, contact info)
- **7 publications** (ISSNs, frequencies, issues, submission emails, editorial boards where documented)
- **24 research articles** (titles, authors, issues) — searchable
- **3 symposia** (themes, tracks, dates, keynotes, committees, downloads) + **10 archived announcements**
- **8 FAQs**, **6 contact groups**, **FQAC/QA content**, **6 quick links**, site-wide footer contact data

### 2.5 Design system inventory (preserved in Elementor Site Settings)

| Token | Value | Elementor mapping |
|---|---|---|
| Primary (navy) | `#192f59` | Global default color 1 |
| Accent (green) | `#3db166` / `#339966` | Global accent color |
| Headings | `#161616`, Poppins 600 | Site Settings → Typography |
| Body | `#2b2f36` / `#6b6b6b`, 16px/1.7 | Site Settings → Typography |
| Backgrounds | `#ffffff`, `#f5f7fa` | Global background + section background presets |
| Radius / shadow | 8–22px; 3 shadow levels | Global defaults + section style presets |
| Container | 1240px, 24px padding | Global site width |
| Footer | `#181818` bg, `#ababab` text | Footer template styling |

### 2.6 Reusable components (→ Elementor reusable templates)

1. **Global Header** (topbar + logo + nav + dropdowns + search) → Theme Builder Header
2. **Global Footer** (brand + explore links + contact + useful links + copyright) → Theme Builder Footer
3. **Department card** → Reusable template (Icon Box + heading + text + button)
4. **Programme card** (meta + expandable details) → Reusable template + custom detail-toggle JS
5. **Journal card** → Reusable template
6. **Event/announcement card** → Reusable template
7. **Stat band** (hero stats / overview stats) → Reusable template
8. **Contact strip** → Reusable template
9. **Hero (home) / Page hero (inner)** → 2 reusable templates
10. **Section heading** (eyebrow + title + divider) → reusable row

---

## 3. Stage 2 — WordPress Architecture

### 3.1 Page hierarchy (post type `page`)

```
Home (front page)
├── About the Faculty
├── Departments  → archive: /departments/ (fbsf_department CPT)
│   ├── Department of Accountancy        (single template)
│   ├── Department of Banking & Finance
│   ├── Department of Business Management
│   └── Department of Insurance & Valuation
├── Programmes   → /programmes/ landing + archive /programmes/ (fbsf_programme CPT)
│   └── individual programme pages (single template)
├── Research  → /research/ (portal landing)
├── Publications → /publications/ landing + archive (fbsf_journal CPT)
│   ├── individual journal pages
│   └── fbsf_article CPT (article listings)
├── Events  → /events/ landing + archive (fbsf_event CPT)
│   └── ARSYM / SACFIRE / SyBFin pages
├── Authorities  → /authorities/
└── Contact  → /contact/
```

### 3.2 Custom Post Types (custom plugin `fbsf-core`)

| CPT | Label | Key fields |
|---|---|---|
| `fbsf_department` | Faculty Department | abbreviation, tagline, intro, vision, mission, hod_name, hod_title, hod_message, research, industry_partners (repeater), publications (taxonomy), contact |
| `fbsf_programme` | Academic Programme | code, department (taxonomy), category (taxonomy), summary, description, duration, credits, slqf_level, entry_requirements (repeater), fees, deadline, deadline_status (historical/upcoming), course_structure (repeater: semester → courses), highlights (repeater), documents (media), application_contact |
| `fbsf_journal` | Research Journal | abbreviation, type, publisher, issn, frequency, description, aims_scope, issues (repeater), latest_issue, submission_guidelines, editorial_board (repeater: role/name), email |
| `fbsf_article` | Research Article | parent journal (taxonomy), title, authors, issue, description |
| `fbsf_event` | Event / Symposium | event_type (taxonomy), edition, theme, description, organizer, dates (repeater: label/date), tracks (repeater), keynote_name, keynote_details, committee (repeater), downloads (repeater), submission, status (past/upcoming/archived), proceedings (repeater) |
| `fbsf_staff` | Staff Profile | name, title, department (taxonomy), qualifications, roles, bio, email |
| `fbsf_download` | Downloadable Document | name, file (media), category, description |

### 3.3 Taxonomies

| Taxonomy | Terms | Attached to |
|---|---|---|
| `fbsf_programme_category` | Undergraduate, Postgraduate, Diploma, Higher Diploma, Advanced Certificate, External | `fbsf_programme` |
| `fbsf_department` | Accountancy, Banking & Finance, Business Management, Insurance & Valuation | `fbsf_programme`, `fbsf_staff` |
| `fbsf_journal_type` | Refereed Journal, Open-Access Journal, Double-blind Peer-reviewed, Magazine | `fbsf_journal` |
| `fbsf_event_type` | Research Symposium, Conference, Programme Application, Journal Call, Event | `fbsf_event` |
| `fbsf_publication_type` | Journal, Magazine, Proceedings | `fbsf_journal`, `fbsf_download` |

### 3.4 Plugin inventory (free vs paid decision)

| Plugin | Free/Paid | Purpose |
|---|---|---|
| **Elementor** (latest 3.x) | Free — **required** | Page builder, Theme Builder, Containers, Forms widget |
| **fbsf-core** (custom) | Custom | CPTs, taxonomies, shortcodes/filter widget, importer, search enhancements, download notices |
| **fbsf-child** (custom child theme) | Custom | Header/footer overrides, custom CSS (design tokens), vanilla JS (back-to-top, smooth scroll, filter scripts), favicon |
| Yoast SEO **or** Rank Math | Free — recommended | SEO, sitemap, breadcrumbs, schema |
| WP Mail SMTP (optional) | Free | Reliable contact-form email delivery |
| **Elementor Pro** | **Not required** | Theme Builder, Containers, Forms are free in Elementor 3.x; Pro only adds advanced widgets (Popovers, Theme Builder conditional logic depth) — defer unless needed |

### 3.5 Elementor development plan

**Theme Builder templates (built in Elementor UI on staging, exported to repo):**
- Header (topbar strip + logo + Menu widget with 2 dropdowns + search button)
- Footer (3 columns + contact + useful links + copyright)
- Single `fbsf_department` (hero → intro → vision/mission accordion → HOD message → programmes grid → research → MoUs → contact)
- Single `fbsf_programme` (hero → summary → meta table → details accordions → course structure → fees → documents → contact)
- Single `fbsf_journal` (hero → ISSN/frequency → description → issues → editorial board → submission → articles listing)
- Single `fbsf_event` (hero + archived badge → theme → description → tracks → dates timeline → keynote → committee → downloads)
- Archive `fbsf_programme` (filter bar + cards grid) — **or** embed the filter shortcode on the `/programmes/` page
- Archive `fbsf_journal`, `fbsf_event`, `fbsf_article`, `fbsf_department`

**Pages built in Elementor (post type page):** Home, About, Departments landing, Programmes landing, Research, Publications landing, Events landing, Authorities, Contact (Elementor Form widget).

**Reusable templates (Template Library → save as reusable):** Department card, Programme card, Journal card, Event card, Stat band, Contact strip, Home hero, Page hero, Section heading, Announcement card.

**Widget mapping** (existing component → Elementor widget):
- Headings/eyebrows → Heading widget
- Text blocks → Text Editor widget
- Hero → Section with background image (hero-pattern.svg) + container + Heading/Text/Button
- Stats → Counter/Icon List widgets
- Department/Quick-link cards → Icon Box / Image Box + Button
- Programme cards → Custom element (container + Heading + Text + Icon List + Button + Toggle for details) driven by shortcode `fbsf_programme_card`
- Journal/Event cards → custom shortcode cards (preserve exact design)
- Filters → custom `fbsf_programme_filter` element (pills + select + search input) + vanilla JS (migrated from `js/filters.js`)
- FAQ → Accordion widget (or shortcode from FAQ data)
- Contact form → **Elementor Form widget** (fields: name, email, phone, subject, message; mail-to: `bsfoffice@wyb.ac.lk`; spam protection)
- Downloads → File widget / Button with media links + request-notice JS
- Timeline → custom shortcode (migrated from `events.html` timeline markup) or List widget
- Footer/header → Theme Builder (editable centrally)

**Design system in Elementor Site Settings:** global colors, typography (Poppins via Google Fonts or system stack), default section/container settings, button presets, link colors. Custom CSS (design tokens from `css/style.css`) loaded via child theme for exact parity (cards, hero, badges, timeline, filters).

### 3.6 Custom plugin `fbsf-core` — implementation standards

- WordPress coding standards: `wp_kses`, `esc_html`, `esc_url`, `sanitize_text_field`, `wp_nonce_field`/`check_ajax_referer` on all custom actions.
- CPTs via `register_post_type()` with `show_in_rest`, REST-friendly; `show_in_nav_menus` for menus; rewrite rules with `feeds`/`with_front` for clean URLs (`/programmes/`).
- Importer: `wp fbsf import --file=migration/fbsf-content.json` (WP-CLI command) creating all CPT posts, taxonomy terms, pages (Home/About/… with default templates), and homepage assignment; upserts by slug for idempotent re-runs.
- Filter element: Elementor `Elementor\Controls_Manager` + `Elementor\Widget_Base` registering a custom widget rendering programme cards with client-side filtering (category/department/text) — equivalent of `js/filters.js`.
- Journal/event/announcement card widgets: same pattern.
- Search enhancement: `pre_get_posts` to include CPTs; search results template via Elementor Single Search (or custom results page).
- Stats/quick-link data: a `fbsf_options` page in Settings (editable faculty info: name, dean, contact, vision, mission) to avoid hardcoding frequently-updated content in templates.
- Media: register custom image sizes; the existing SVGs (logo, hero, campus art, icons) uploaded to Media Library; favicon via child theme.
- No hardcoded credentials; all email addresses are content fields.

### 3.7 Child theme `fbsf-child`

- Parent: **Twenty Twenty-Five** (or any block theme) — minimal, fast, Elementor-friendly; header/footer fully delegated to Elementor Theme Builder.
- `style.css` (theme header), `functions.php` (enqueue design CSS + JS, register SVG icons, disable emojis, child-theme support), `assets/css/fbsf-style.css` (design tokens + component parity CSS), `assets/js/fbsf-scripts.js` (back-to-top, smooth scroll, download-request notice, programme/article filter JS — ported from the static site, namespaced, no external libs).
- `inc/` helpers: sanitisation, template parts.

### 3.8 Content migration approach

1. `migration/fbsf-content.json` — **already generated** from the site's verified `js/data.js` (4 departments, 10 programmes, 7 journals, 24 articles, 3 symposia, 10 announcements, 8 FAQs, 6 contact groups, site info, authorities).
2. On staging WordPress: install Elementor + `fbsf-core` + child theme → run `wp fbsf import --file=...` → all CPT content + taxonomy terms + pages created.
3. Page layouts: built with Elementor (per §3.5); exported JSON templates stored in `elementor-templates/` and documented in the setup guide (or recreated via the Elementor editor).
4. Images/documents: upload `assets/images/*` to Media Library (guide included). Documents (application forms, brochures, proceedings) are "request-file" notices — no fabricated files; download links point to the faculty office email.
5. **Historical dates:** every deadline/event carries `deadline_status`/`event_status = historical`; templates render an "Archived — concluded" badge. No past dates are ever displayed as upcoming.
6. Migration checklist: `docs/MIGRATION_CHECKLIST.md` (per-page verification table, content source, status).

### 3.9 Risk register

| Risk | Mitigation |
|---|---|
| No PHP/MySQL in sandbox → cannot run WP here | Deliver ready-to-deploy project + run WP-CLI importer & Elementor verification on staging hosting; PHP syntax checked via `php -l` on staging (documented in testing report) |
| Elementor JSON authored by hand is brittle | Templates built via Elementor UI on staging, exported, stored in repo; hand-written importer only handles content data (validated JSON) |
| Filter/search interactivity complexity | Port existing, tested vanilla JS into child theme + custom widgets; reuse `js/filters.js` logic (already unit-tested) |
| Contact form delivery | Elementor Forms widget + backend mail settings; WP Mail SMTP optional; frontend-only demo fallback documented |
| Design parity | Global design tokens replicated in Site Settings + child-theme CSS; visual QA checklist per page |
| Historical dates presented as current | Status fields + archived badges in every template |

---

## 4. Development Plan (Stages 3–8, to be executed after approval)

| Stage | Deliverable | Verification gate |
|---|---|---|
| **3 — Foundation** | WP install on staging; Elementor + child theme + `fbsf-core`; Site Settings design tokens; Theme Builder header/footer | Header/footer render on all pages; mobile menu works; global styles applied |
| **4 — Pages** | All 9 page types built in Elementor; reusable templates; single templates for department/programme/journal/event/article | Every page visually matches the static site (QA checklist); internal links work |
| **5 — Migration** | `wp fbsf import` run; media uploaded; slugs/permalinks verified; archived-date badges verified | Counts match JSON export; spot-check fees/deadlines/ISSNs; checklist 100% |
| **6 — Functionality** | Custom filter widget; journal tabs; article search; Elementor Form; download notices; back-to-top; active-nav; WP search | Interaction tests (same suite as the static site, adapted) |
| **7 — Testing** | Page/link/download/edit/mobile/desktop/console checks; PHP/JS/CSS error scan; performance pass | Testing report in `docs/TESTING_REPORT.md` |
| **8 — Deployment** | Permalinks, SSL, sitemap, backup/rollback, admin training docs | Deployment guide executed; final acceptance criteria signed off |

## 5. Deliverables mapping (task §12)

| # | Required | Where |
|---|---|---|
| 1–2 | WordPress structure + Elementor layouts | plugin/, theme/, elementor-templates/ |
| 3–4 | Global header/footer + reusable templates | Theme Builder exports + Template Library |
| 5 | CPTs/taxonomies | plugin/fbsf-core (post-types.php) |
| 6 | Custom plugin + child theme | plugin/fbsf-core, theme/fbsf-child |
| 7 | Custom CSS/JS | theme/fbsf-child/assets/, plugin/fbsf-core/assets/ |
| 8 | Migration checklist | docs/MIGRATION_CHECKLIST.md |
| 9–11 | Setup / editing / deployment guides | docs/ |
| 12 | Testing report | docs/TESTING_REPORT.md |
| 13–14 | Missing content & broken-link list | docs/CONTENT_GAPS.md (updated for WP) |

## 6. Approval required before implementation

The architecture above is presented for review. Upon approval, implementation proceeds Stage 3 → 8 in order, with verification at each gate. Please confirm:

1. **Target hosting** for the WordPress install (staging URL/credentials) — needed to run Elementor and the importer.
2. **Elementor free-only** is acceptable (no Elementor Pro).
3. **Child theme base** — Twenty Twenty-Five is proposed (any modern WP default theme works).

---

*Analysis complete 2026-11-05. Content source: existing static site (verified `js/data.js`) + repository audit PDF. No faculty information was invented; historical data is flagged as archived.*
