# FBSF WordPress Setup Guide

Complete installation and configuration guide for the FBSF WordPress + Elementor website.

**Prerequisites:** WordPress 6.0+ (PHP 7.4+, MySQL 5.7+/MariaDB 10.3+), a web server with HTTPS, WP-CLI available on the server (recommended), or PHP 7.4+ locally for the admin importer.

---

## 1. Install WordPress

1. Download WordPress 6.x from wordpress.org and install it on your server (or use your hosting's WordPress installer).
2. Create the database and complete the install.
3. Install **WP-CLI** on the server (or use the admin upload importer instead — see §5).

## 2. Install the theme and plugin payload

Copy the payload folders into the WordPress installation:

```
wordpress/
├── wp-content/
│   ├── plugins/
│   │   └── fbsf-core/          ← copy from project
│   └── themes/
│       └── fbsf-child/         ← copy from project
```

Or via SSH:

```bash
# On the server, if you have the project files:
cp -r /path/to/fbsf-core  wp-content/plugins/
cp -r /path/to/fbsf-child wp-content/themes/
```

## 3. Install and configure Elementor

1. **Plugins → Add New → search "Elementor"** → Install & Activate (free version, latest 3.x).
2. On activation, Elementor creates its kit and default templates.
3. (Recommended) Install **Twenty Twenty-Five** (Appearance → Themes → Add New → Twenty Twenty-Five) — it's the parent theme of `fbsf-child`.
4. **Appearance → Themes → Activate:** Twenty Twenty-Five → Twenty Twenty-Five (parent) → **FBSF Child** (child theme activates automatically when parent is active).
5. (Optional but recommended) Install **Yoast SEO** or **Rank Math** for sitemaps/breadcrumbs/schema.
6. (Optional) Install **WP Mail SMTP** and configure SMTP credentials so the contact form delivers mail reliably (see §7).

## 4. Configure Elementor global design system

In **Elementor → Site Settings**, apply the FBSF design tokens:

| Setting | Value |
|---|---|
| **Site Identity** | Site Title: *Faculty of Business Studies and Finance* |
| **Global Colors** | Color 1 (primary): `#192f59` (navy) · Accent: `#3db166` (green) · Light: `#f5f7fa` |
| **Typography** | Headings: Poppins 600 (or system sans), color `#161616` · Body: 15–16px, color `#2b2f36`, line-height 1.7 |
| **Buttons** | Solid: green `#3db166` · Outline: navy |
| **Container** | Default content width 1240px, 20px padding |
| **Border Radius** | Cards 18px, buttons 12px |

The child theme already carries the design tokens and component styles (`assets/css/fbsf-style.css`, plugin `assets/css/fbsf-shortcodes.css`), so the site renders correctly even before you adjust Site Settings — but Site Settings lets administrators manage the design centrally.

## 5. Import the content

### Option A — WP-CLI (recommended for production)

```bash
wp fbsf import --file=/path/to/migration/fbsf-wp-import.json
```

Output: a summary of created posts (departments, programmes, journals, articles, events, downloads, pages, templates, menu).

### Option B — Admin upload

1. Log in to WordPress admin → **Tools → FBSF Import**.
2. Upload `migration/fbsf-wp-import.json` → click **Import**.
3. The importer creates the same content, then redirects with a result summary.

**What the importer creates:**

- 5 taxonomies + all terms
- 4 departments, 10 programmes, 7 journals, 24 articles, 13 events (3 symposia + 10 archived announcements), 12 downloads
- 9 pages **with Elementor layouts** (homepage set automatically)
- Header, Footer, Search Results Theme Builder templates
- Single templates for department / programme / journal / event
- 6 reusable templates (Department/Programme/Journal/Event cards, Stat Band, Contact Strip)
- The **FBSF Primary** menu wired to the header template

The importer rewrites the `{{child}}` image placeholders to the child theme asset URLs automatically.

> **Re-running the import is safe** — posts are upserted by slug, so re-importing updates existing content without duplicates.

## 6. Configure menus & permalinks

1. **Appearance → Menus:** the FBSF Primary menu is created by the importer. Confirm it's assigned to the header (the header template's Navigate menu widget references it automatically).
2. **Settings → Permalinks:** choose **Post name** (clean URLs) and save.
3. Flush rewrite rules if needed: `wp rewrite flush`.

## 7. Configure the contact form

The contact page uses Elementor's Form widget with fields: Full name, Email, Phone, Subject, Message. It emails `bsfoffice@wyb.ac.lk` (configured from the import options).

To make delivery reliable:

1. Install **WP Mail SMTP** (free).
2. Settings → WP Mail SMTP: enter SMTP host/user/pass/encryption (from your hosting provider).
3. Send a test email to confirm delivery.

Alternatively, configure WordPress's built-in mail (`wp-config.php` constants) or use a transactional email service (SendGrid/Mailgun) with the SMTP plugin.

## 8. Verify the site

Run the verification checklist in `docs/MIGRATION_CHECKLIST.md` and the browser tests in `docs/TESTING_REPORT.md`:

- Homepage renders with hero, stats, departments, programmes, announcements
- Header shows logo + nav (with Departments and Research dropdowns) + search button
- Footer shows brand, quick links, contact, useful links, copyright
- /programmes/ filter works (categories, department, text search)
- /publications/ journal tabs and article search work
- /events/ shows archived badges on historical events
- /contact/ form submission works (check email)
- Department/programme/journal/event single pages render from CPT content

## 9. SEO & security basics

1. Yoast/Rank Math: set sitemap, generate meta titles/descriptions per page (titles are pre-set from page names).
2. **Settings → General:** site address with HTTPS.
3. Keep Elementor + fbsf-core updated; remove unused plugins.
4. No credentials are stored in the code — all emails are content fields; change them in **Settings → FBSF Options**.

## 10. Troubleshooting

| Issue | Fix |
|---|---|
| Page shows blank/default | Elementor not activated, or `elementor_data` not set — re-run the import; verify Elementor is active and the page is edited with Elementor |
| Header/footer missing | Confirm the Theme Builder templates were imported (Elementor → Templates → Theme Builder); re-run `wp fbsf import` |
| Menu dropdown empty | The FBSF Primary menu exists — confirm it has items (Appearance → Menus); the header nav widget reads it by ID |
| Images missing | Confirm `fbsf-child/assets/images/` files are present (logo, hero-pattern, campus-art, favicon) |
| Contact form mail not arriving | Configure WP Mail SMTP; check the mailto in Elementor Form widget settings |
| Programme filter shows nothing | Confirm programme posts exist (Posts → Programmes) and taxonomies are assigned |
| `php -l` errors | Run `php -l` on each plugin file on the server; report to the development team with the file path |

## 11. Known limitations

- No live WordPress/PHP in the development sandbox — PHP syntax and browser rendering must be verified on the staging host (see `docs/TESTING_REPORT.md`).
- Downloads are "request" buttons (email the faculty office) — no files are stored, matching the original site's approach.
- Historical deadlines/events are displayed as archived; the site does not display past dates as upcoming.
- Google Fonts (Poppins) load from the CDN by default in Elementor; if offline, the child theme falls back to system fonts.
