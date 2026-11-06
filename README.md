# FBSF Website — Faculty of Business Studies and Finance, Wayamba University of Sri Lanka

A complete, modern, responsive university faculty website built with **HTML5, CSS3 and Vanilla JavaScript** — no frameworks, no backend, no build tools, no databases.

The website runs directly in any browser by opening `index.html`.

---

## 1. What is this?

This project transforms the information contained in the faculty's published documentation (`New Microsoft Word Document.pdf`, 74 pages) into an interactive information portal for students, prospective applicants, academics, researchers and visitors.

All content is **verified against the source document**. Where the document does not provide a detail (fees, entry requirements, staff names, etc.), the website clearly marks it as *"Information not available"* instead of inventing it.

> **Note on dates:** the site is current as of November 2026. All application deadlines, symposia and calls documented in the source (2023–2026) have concluded. They are displayed as **concluded / archived** records and clearly labelled — they are not presented as upcoming events.

## 2. Run the website

**Option A — open directly (simplest)**

```
Open index.html in your browser (double-click or drag into the browser).
```

**Option B — local server (optional)**

If you prefer a local server:

```bash
# Python
python3 -m http.server 8000

# or Node.js
npx serve .
```

Then visit `http://localhost:8000`.

No installation, dependencies or internet access are required. The site is fully self-contained.

## 3. Project structure

```
BSF-Site/
├── index.html                  # Home page
├── about.html                  # Faculty history, vision, mission, Dean's message
├── departments.html            # Departments overview
├── programmes.html             # Filterable academic programmes directory
├── research.html               # Research portal (publications + symposia)
├── publications.html           # Journals & magazines + article search
├── events.html                 # Symposia, announcements, proceedings
├── authorities.html            # FQAC, QA units, committees, downloads
├── contact.html                # Contact details, enquiry form, FAQ
├── departments/
│   ├── accountancy.html        # Department of Accountancy
│   ├── banking-finance.html    # Department of Banking & Finance
│   ├── business-management.html# Department of Business Management
│   └── insurance-valuation.html# Department of Insurance & Valuation
├── assets/
│   ├── images/                 # logo, hero background, campus art, favicon (SVG)
│   └── icons/                  # shared SVG icon sprite
├── css/
│   ├── style.css               # design tokens, layout, header/hero/footer
│   ├── components.css          # cards, badges, tabs, accordion, forms, modals
│   └── responsive.css          # tablet/mobile breakpoints
├── js/
│   ├── data.js                 # verified content data (single source of truth)
│   ├── main.js                 # announcements, events, downloads, back-to-top, FAQ
│   ├── navigation.js           # responsive nav, mobile menu, active links
│   ├── search.js               # global site search (Ctrl/Cmd+K)
│   └── filters.js              # programme & publication filtering, article search
├── README.md                   # this file
├── CONTENT_MAPPING.md          # where every document section lives on the site
├── CONTENT_GAPS.md             # missing information & assets requiring follow-up
├── database/
│   ├── website_database.sql    # MySQL schema + seed data (35 tables, importable)
│   ├── DATABASE_DOCUMENTATION.md  # table/column docs, ERD, sample queries, import guide
│   └── database_erd.png        # entity-relationship diagram
└── wordpress-project/          # WordPress + Elementor conversion of the site
```

## 4. Features

- **Responsive design** — desktop, laptop, tablet and smartphone layouts (mobile-first breakpoints).
- **Sticky navigation** with dropdown menus (Departments, Research).
- **Global search** (button in header, or press `Ctrl/Cmd + K`) across pages, departments, programmes, publications, journal articles, symposia, announcements and FAQs.
- **Filterable programme directory** — by category (Undergraduate, Postgraduate, Diploma, Higher Diploma, Advanced Certificate, External), by department, and free-text search; expandable cards with duration, credits, entry requirements, fees and full course structures.
- **Publication portal** — journal filter tabs, ISSNs, frequencies, issues, editorial boards, submission guidelines, and a searchable article index (24+ documented research articles).
- **Research symposia** — ARSYM, SACFIRE and SyBFin with themes, tracks, important dates, keynote speakers, organizing committees and downloads.
- **Interactive FAQ** accordion and announcement cards.
- **Back-to-top** button, **smooth scrolling**, active navigation highlighting, mobile hamburger menu.
- **Download buttons** for documented resources — request a file through the faculty office when the file is not bundled.
- **Contact form** (frontend demonstration with validation) and FAQ anchor.

## 5. Content accuracy rules applied

1. The attached Word document is the **primary and authoritative** content source.
2. No faculty details, staff names, programme details, qualifications, fees, dates or contact details were invented.
3. Vision, mission and official messages are preserved verbatim.
4. Where information is incomplete, the field is marked *"Information not available in the source document"*.
5. Historical deadlines/events are labelled **concluded / archived** — never shown as upcoming.
6. Department, programme, journal and symposium names are preserved exactly.
7. Missing items are listed in `CONTENT_GAPS.md` for follow-up with the faculty.

See **CONTENT_MAPPING.md** for a section-by-section trace of the document, and **CONTENT_GAPS.md** for missing information.

## 6. Browser support

- Chrome, Edge, Firefox, Safari (recent versions).
- Uses CSS custom properties, Grid, Flexbox, `details`/`summary`, SVG sprites and ES5-compatible JavaScript — no polyfills required.

## 7. Customisation

- **Colours / typography:** edit the CSS variables in `css/style.css` (top of file). The palette follows the university's institutional identity (navy `#192f59`, accent green `#3db166`).
- **Content:** almost all content lives in `js/data.js` (departments, programmes, publications, symposia, announcements, FAQs, contacts). Edit the data and every page updates automatically.
- **Logo:** `assets/images/logo.svg` is a clean typographic placeholder — replace it with the official FBSF logo when available (see CONTENT_GAPS.md).

## 8. Database (MySQL)

A relational MySQL database (35 tables, InnoDB, utf8mb4) supports the site's dynamic content for a future backend. It is designed to be served through an API — the frontend itself contains no database credentials or connection code.

| File | Description |
|---|---|
| `database/website_database.sql` | Full schema + seed data. Creates the database, all 35 tables (PK/FK, indexes, unique constraints), and inserts sample rows derived from the verified site content. |
| `database/DATABASE_DOCUMENTATION.md` | Overview, table catalog (columns, keys, FKs), ERD, sample queries, phpMyAdmin/CLI import instructions, backend-integration notes, and security guidance. |
| `database/database_erd.png` | Entity-relationship diagram of all tables and relationships. |

**Import** (phpMyAdmin: create database `bsf_website` → Import → choose the `.sql`; or CLI: `mysql -u <user> -p < database/website_database.sql`). The seeded admin account uses a placeholder password — change it after first login. See `DATABASE_DOCUMENTATION.md` for full instructions.

---

© Faculty of Business Studies and Finance, Wayamba University of Sri Lanka. Website content verified against faculty documentation (2023–2026).
