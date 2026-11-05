# FBSF Elementor Editing Guide for Administrators

How to manage the website **without touching code**. All content lives in WordPress posts, options and Elementor layouts.

---

## 1. Editing pages (Elementor)

1. Go to **Pages → All Pages**, hover a page, click **Edit with Elementor**.
2. The visual editor opens — click any element to edit it in the left panel.
3. Common edits:
   - **Text:** click the text → edit in the *Content* tab.
   - **Headings:** change text, size (`header_size`), alignment.
   - **Buttons:** click → *Content* tab → change text or link (`url`).
   - **Colors:** *Style* tab → pick from the global palette (navy `#192f59`, green `#3db166`, light `#f5f7fa`).
   - **Spacing:** *Layout* tab → padding/margins.
4. **Update** (top-right) to save. **Preview changes** with the eye icon.

### FBSF custom widgets (orange category "FBSF Content")

| Widget | What it does | Editing |
|---|---|---|
| FBSF — Programme Filter | Category pills + department select + text search + programme cards | Content tab: cards per row |
| FBSF — Department Cards | Grid of the 4 department cards | Content tab: limit |
| FBSF — Programme Cards | Programme cards without the filter bar | Content tab: category/department/limit |
| FBSF — Journal Tabs | All-journal + per-journal tabs | — |
| FBSF — Journal Cards | Grid of journal cards | Content tab: limit |
| FBSF — Article Search | Searchable article index | — |
| FBSF — Events | Event cards (symposiums) | Content tab: type/limit |
| FBSF — Announcements | Archived programme announcements | Content tab: limit |
| FBSF — Downloads | Download request cards | Content tab: limit |
| FBSF — Contact Cards | Contact groups from options | — |
| FBSF — FAQ Accordion | FAQ items from options | — |
| FBSF — Stats Band / Quick Links | Homepage stats / quick links | — |
| FBSF — Site Content | Block selector: vision/mission, dean's message, history, committees, QA units, FQAC, research areas, office hours, visit us | Content tab: block type |
| FBSF — Search Results | Search results on the search page | — |

**Card content itself is NOT edited in Elementor** — it comes from the CPT posts (see §2). Change the post, and every card on every page updates automatically.

## 2. Editing custom content (WordPress admin)

### Departments
**Departments → All Departments → Edit** (e.g., *Department of Accountancy*):

- *Department Details* meta box: abbreviation, tagline, introduction, vision, mission, HOD name/title/message, research, contact
- *Professional Partnerships & MoUs* repeater: add/remove rows (name + details)
- *Department Contacts*: email, phone

The department's **single page** (/department/accountancy/) and the department cards on the homepage/departments page update automatically.

### Programmes
**Programmes → All Programmes → Edit**:

- *Programme Details*: code, category (term slug), department (term slug), summary, description, duration, credits, SLQF level, fees, application deadline, **deadline status (historical/upcoming)**, application contact, entry requirements, highlights, documents note
- *Entry Requirements (repeater)*: one row per requirement
- *Course Structure (repeater)*: rows of Semester / Course code / Course title / Credits

The programme appears in the filterable directory and in department pages. **Deadline status = historical** renders the "Archived — concluded" badge — never present past dates as upcoming.

### Journals
**Journals → All Journals → Edit**:

- Abbreviation, type, publisher, ISSN, frequency, aims & scope, submission guidelines, submission email, latest issue
- *Published Issues (repeater)*: year/volume + detail
- *Editorial Board (repeater)*: role + name

### Articles
**Articles → All Articles → Edit**: parent journal (term slug), authors, issue, description. Appears in the article search index on /publications/.

### Events & announcements
**Events → All Events → Edit**:

- Event type (term slug), edition, theme, **status (past/upcoming)**, organiser, keynote, description, submission info
- *Tracks / Key Dates / Committee / Materials & Downloads* repeaters

Create new events with status **upcoming** to show them as current; historical events keep the archived badge.

### Downloads
**Downloads → All Downloads → Edit**: file name (for the request notice), category, description. Rendered as "Request this document" buttons (email the faculty office).

### Staff (for future use)
**Staff → Add New**: name, title, department, qualifications, roles, bio, email.

## 3. Global site content — Settings → FBSF Options

Everything on the homepage and contact page that administrators update most often:

- General: site name, short name, motto, university, established, address, telephone, email
- Vision / Mission / Dean's name + message
- History timeline (repeater: date / title / description)
- Homepage statistics (repeater: value / label)
- Quick links (repeater: title / URL / icon)
- Contact groups (repeater: group / contact / email / phone)
- FAQs (repeater: question / answer)
- Research areas (repeater: name)
- Office hours, FQAC structure, FQAC functions, Faculty committees (repeater)

**Save Changes** → updates appear instantly across all pages.

> Repeater editors: click **Add row**, fill the fields, click **Remove** to delete. Fields save automatically on input.

## 4. Header & footer (central management)

The header and footer are Elementor **Theme Builder** templates — edit once, applies to every page:

1. **Elementor → Templates → Theme Builder → Header → FBSF Header → Edit with Elementor**
2. Edit the topbar (tel/email), logo, site name, or the menu items.
3. **Footer → FBSF Footer** — edit columns, links, copyright.
4. Update → publish.

The header's navigation is the **FBSF Primary** WP menu (Appearance → Menus) — add, reorder or remove items there; dropdowns work by setting parent items.

## 5. Managing menus

**Appearance → Menus:**

- Edit the **FBSF Primary** menu: add pages (Departments, Programmes, Research, etc.), custom links, reorder by drag, create dropdowns by assigning parents.
- Assign to a location if needed (the header template uses the menu directly).

## 6. Media library

**Media → Add New:** upload images (logo, banners, photos). Use descriptive alt text. SVG assets (logo, hero pattern, campus art) ship in the child theme — no need to upload them.

## 7. Adding a new programme / journal / event (workflow)

1. Create the post (Programmes → Add New), fill the meta box + repeaters.
2. Assign the correct **category/department taxonomies**.
3. Publish.
4. It appears automatically on /programmes/ (filterable directory), department pages and homepage highlights.

No Elementor changes needed.

## 8. Content accuracy rules (IMPORTANT)

- **Never invent** names, fees, dates, contacts or ISSNs. If the faculty documentation doesn't state it, leave the field empty or write *"Information not available"*.
- **Historical dates:** always set deadline/event status to *historical/past* — the site shows an "Archived — concluded" badge. Do not present past deadlines as current.
- **Preserve official names** (e.g., *Department of Banking & Finance*, *Journal of Accountancy & Finance*).
- **Contact data** comes only from the verified faculty documentation.

## 9. Daily tasks summary

| Task | Where |
|---|---|
| Edit page text/layout | Pages → Edit with Elementor |
| Add a programme | Programmes → Add New |
| Publish an event | Events → Add New (status: upcoming) |
| Change FAQ / vision / dean message | Settings → FBSF Options |
| Update nav menu | Appearance → Menus |
| Change header/footer | Elementor → Theme Builder |
| Upload images | Media Library |
| Contact form mail | WP Mail SMTP settings |

No coding required for any of these.
