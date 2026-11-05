# FBSF WordPress + Elementor Conversion

Complete, ready-to-deploy WordPress project that converts the FBSF static website
(HTML5/CSS3/Vanilla JS) into an Elementor-based, fully manageable WordPress site.

**Faculty:** Faculty of Business Studies and Finance (FBSF), Wayamba University of Sri Lanka
**Version:** 1.0.0 · **PHP:** 7.4+ · **WordPress:** 6.0+ · **Elementor:** free 3.x

---

## 1. What's included

| Folder | Contents |
|---|---|
| `wp-content/plugins/fbsf-core/` | Custom plugin: 7 custom post types, 5 taxonomies, 23 shortcodes, 15 Elementor widgets, content importer (WP-CLI + admin UI) |
| `wp-content/themes/fbsf-child/` | Child theme (Twenty Twenty-Five parent): design system CSS, interaction JS, logo/hero/campus SVG assets |
| `elementor/pages/` | 9 Elementor page layouts (home, about, departments, programmes, research, publications, events, authorities, contact) |
| `elementor/templates/` | Elementor Theme Builder + single + reusable templates (header, footer, search results, single CPT templates, 6 reusable card templates) |
| `docs/` | Setup, editing, migration checklist, testing report, deployment guides |
| `tools/build-elementor.js` | Node generator that produces all Elementor JSON from `migration/fbsf-content.json` (regenerate anytime) |

## 2. Architecture at a glance

```
Content (editable in WP admin)          Pages (editable in Elementor)
┌───────────────────────────┐          ┌───────────────────────────┐
│ fbsf_department    CPT    │          │ 9 pages (Elementor JSON)  │
│ fbsf_programme     CPT    │          │ ├─ home, about, contact … │
│ fbsf_journal      CPT    │          │ └─ built from generator   │
│ fbsf_article      CPT    │          │                          │
│ fbsf_event        CPT    │          │ Custom widgets render    │
│ fbsf_staff        CPT    │  ──►     │ dynamic content from     │
│ fbsf_download     CPT    │          │ the CPTs above           │
│ 5 taxonomies              │          │                          │
│ Options page (site info)  │          │ Header / Footer / Singles│
└───────────────────────────┘          │ (Elementor Theme Builder)│
                                       └───────────────────────────┘
Design: Elementor Site Settings + child theme CSS (navy/green design tokens)
```

- **Global header/footer:** Elementor Theme Builder templates — editable centrally.
- **Single pages:** department, programme, journal, event get dynamic Elementor single templates.
- **Dynamic content:** custom widgets (Program Filter, Journal Tabs, Article Search, Events, etc.) pull from CPTs — add a programme in WP admin and it appears on the site.
- **Historical data:** every deadline/event is flagged `historical/past` and shows an "Archived — concluded" badge; never presented as upcoming.

## 3. Quick start (3 steps)

1. **Drop the payload into WordPress** — copy `wp-content/plugins/fbsf-core` to `wp-content/plugins/`, copy `wp-content/themes/fbsf-child` to `wp-content/themes/`, activate the parent theme Twenty Twenty-Five and the child theme.
2. **Install Elementor** (free) from the Plugins directory and activate it.
3. **Import content:**
   ```bash
   wp fbsf import --file=/path/to/migration/fbsf-wp-import.json
   ```
   — or use **Tools → FBSF Import** in the admin and upload `migration/fbsf-wp-import.json`.

That creates all CPT content, options, pages (with Elementor layouts), Theme Builder templates, reusable templates and the primary menu, then sets the homepage.

> Full details: `docs/SETUP_GUIDE.md`

## 4. Requirements & plugins

| Plugin | Free/Paid | Purpose |
|---|---|---|
| Elementor (3.x) | Free — required | Page builder, Theme Builder, Containers, Forms |
| fbsf-core (included) | Custom | CPTs, taxonomies, widgets, shortcodes, importer |
| fbsf-child (included) | Custom | Design system, scripts, assets |
| Yoast SEO / Rank Math | Free — recommended | SEO, sitemap, breadcrumbs |
| WP Mail SMTP (optional) | Free | Reliable contact-form delivery |

**Elementor Pro is not required.** Theme Builder, Containers and Forms are free in Elementor 3.x.

## 5. Verification status

| Check | Result |
|---|---|
| Elementor JSON (22 files) | Valid structure, unique IDs, known widget types |
| PHP files (10) | Bracket-balanced, guarded with `ABSPATH`, nonces/sanitisation applied |
| Import payload | 9 pages, 4 departments, 10 programmes, 7 journals, 24 articles, 13 events, 12 downloads, 4 templates, 6 reusable, menu |
| `php -l` | Run on staging host — see `docs/TESTING_REPORT.md` |
| Browser/visual test | Run on staging host — see `docs/TESTING_REPORT.md` |

## 6. Documentation index

- `docs/SETUP_GUIDE.md` — full installation & configuration
- `docs/EDITING_GUIDE.md` — Elementor editing guide for administrators
- `docs/MIGRATION_CHECKLIST.md` — content migration verification
- `docs/TESTING_REPORT.md` — test plan + results
- `docs/DEPLOYMENT.md` — production deployment & rollback
