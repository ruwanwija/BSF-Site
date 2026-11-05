# FBSF WordPress Deployment Guide

Deployment, backup and rollback procedures for the FBSF WordPress + Elementor website.

---

## 1. Pre-deployment checklist

- [ ] Staging environment running the full site, tests passed (TESTING_REPORT.md §2)
- [ ] All content verified (MIGRATION_CHECKLIST.md signed off)
- [ ] Domain/SSL ready for production
- [ ] Backup of the current site taken (see §5)

## 2. Production deployment steps

### Option A — Fresh install (new WordPress)

1. Install WordPress on the production server (or use hosting one-click install).
2. Copy payload:
   ```bash
   scp -r fbsf-core server:/var/www/html/wp-content/plugins/
   scp -r fbsf-child server:/var/www/html/wp-content/themes/
   ```
3. Activate Twenty Twenty-Five → activate FBSF Child → install Elementor (free).
4. Import content:
   ```bash
   wp fbsf import --file=/path/to/migration/fbsf-wp-import.json
   ```
5. Configure SMTP (WP Mail SMTP), Yoast/Rank Math, permalinks (Post name).
6. Set site address with HTTPS in Settings → General.

### Option B — Migration from staging (existing WP install)

1. Export the staging database:
   ```bash
   wp db export staging.sql
   ```
2. Copy the media library:
   ```bash
   rsync -avz staging/wp-content/uploads/ production/wp-content/uploads/
   ```
3. Import the database on production:
   ```bash
   wp db import production.sql
   ```
4. Update site URL in the database:
   ```sql
   UPDATE wp_options SET option_value = 'https://production.example.com'
   WHERE option_name IN ('siteurl', 'home');
   ```
   (or use WP-CLI: `wp search-replace 'https://staging' 'https://production' --all-tables`)
5. Re-upload the plugins/theme payload on production if staging had a different payload path.
6. Flush rewrite rules: `wp rewrite flush`.
7. Verify: run the TESTING_REPORT.md §2.3–2.6 checks against production.

### Option C — WP-CLI push from local dev

```bash
wp db export local.sql
wp scp local.sql production:/tmp/
wp db import /tmp/local.sql   # on production
wp search-replace 'https://dev.example.com' 'https://production.example.com' --all-tables
```

## 3. Post-deployment verification

Run the same browser checks as the staging tests (TESTING_REPORT.md §2.3–2.7), plus:

- [ ] HTTPS works on every page; mixed-content warnings absent
- [ ] Header/footer render; menu works
- [ ] Contact form delivers mail (test submission)
- [ ] Sitemap submitted (Yoast/Rank Math) to Google Search Console
- [ ] DNS/CDN cache purged if applicable
- [ ] Backup job scheduled (§5)

## 4. SSL & performance

- **SSL:** enable via hosting (Let's Encrypt) or `certbot`; force HTTPS in Settings → General and in .htaccess:
  ```apache
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
  ```
- **Caching:** use a host-provided page cache or a lightweight caching plugin (e.g., WP Super Cache / LiteSpeed Cache). Elementor is compatible with most caches; clear cache after major content changes.
- **Images:** SVGs are already small; upload new photos at reasonable resolution (max width ~1600px). Elementor's lazy-loading applies to images in widgets.

## 5. Backups & rollback

### Backup strategy (weekly automated)

```bash
# Database
wp db export --gzip /backups/fbsf-$(date +%F).sql.gz

# Files (theme/plugin/uploads)
tar czf /backups/fbsf-files-$(date +%F).tar.gz \
  wp-content/themes/fbsf-child \
  wp-content/plugins/fbsf-core \
  wp-content/uploads
```

Schedule via cron:

```cron
0 2 * * 0 /usr/local/bin/wp db export --gzip /backups/fbsf-$(date +\%F).sql.gz && tar czf /backups/fbsf-files-$(date +\%F).tar.gz -C /var/www/html wp-content/themes/fbsf-child wp-content/plugins/fbsf-core wp-content/uploads
```

### Rollback procedure

1. Stop writes (or take the site offline if needed).
2. Restore the database from the most recent backup:
   ```bash
   wp db import /backups/fbsf-2026-11-05.sql
   ```
3. Restore the payload files from the files backup (theme/plugin/uploads).
4. Verify the site renders; run the TESTING_REPORT.md §2.3–2.6 checks.
5. If Elementor layouts are missing after restore, re-run:
   ```bash
   wp fbsf import --file=/path/to/migration/fbsf-wp-import.json
   ```
   (import is idempotent — safe to re-run)

### Rollback of a bad content change

- Content is stored in CPTs/Options — edit the post in WP admin and revert fields.
- For full rollback, restore the database backup from before the change.

## 6. Updates & maintenance

| Item | How |
|---|---|
| WordPress core | Updates → available updates (take backup first) |
| Elementor | Updates → available updates (clear cache after) |
| fbsf-core | Replace plugin folder from the repo / release ZIP |
| fbsf-child | Replace theme folder from the repo / release ZIP |
| Content regeneration | `node tools/build-elementor.js` → re-import via `wp fbsf import` |

After any payload update, run:

```bash
for f in $(find wp-content/plugins/fbsf-core -name '*.php'); do php -l "$f"; done
wp fbsf import --file=/path/to/migration/fbsf-wp-import.json
```

## 7. Security hardening (recommended)

- Keep WordPress, Elementor and all plugins updated.
- Limit login attempts (e.g., Wordfence free or hosting-provided protection).
- Use strong admin credentials; enable 2FA for admin users.
- No credentials in code — all emails are content fields.
- Remove inactive plugins.
- HTTPS everywhere; HSTS if available.

## 8. Deployment record

| Deployment | Date | Environment | Version | Result |
|---|---|---|---|---|
| 1 | 2026-11-05 | (staging) | fbsf-core 1.0.0 | ☐ |
| 2 | | (production) | | ☐ |

**Deployed by:** ____________________ **Approved by:** ____________________
