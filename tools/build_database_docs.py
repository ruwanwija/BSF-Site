#!/usr/bin/env python3
"""Generate DATABASE_DOCUMENTATION.md from the DDL in website_database.sql.

Parses table-level constraints (PRIMARY KEY / UNIQUE KEY / CONSTRAINT ... FOREIGN KEY)
in addition to column-level flags, then writes complete documentation with:
overview, design principles, table catalog, per-table columns, FK relationships,
sample queries, phpMyAdmin import instructions, and backend connection notes.
"""
import re
import datetime

SQL_PATH = '/home/user/BSF-Site/database/website_database.sql'
OUT_PATH = '/home/user/BSF-Site/database/DATABASE_DOCUMENTATION.md'

sql = open(SQL_PATH, encoding='utf-8').read()
text = re.sub(r'/\*.*?\*/', '', sql, flags=re.S)
text = re.sub(r'--[^\n]*', '', text)

tables = {}   # name -> {cols: {colname: {type, nullable, ai, extra}}, pk: [], uq: [], fk: []}
order = []

for block in re.finditer(r'CREATE TABLE `(\w+)` \((.*?)\n\)\s*ENGINE', text, flags=re.S):
    name, body = block.group(1), block.group(2)
    cols = {}
    pk = []
    uq = []
    fk = []
    depth = 0
    parts = []
    buf = ''
    for ch in body:
        if ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
        if ch == ',' and depth == 0:
            parts.append(buf)
            buf = ''
        else:
            buf += ch
    if buf.strip():
        parts.append(buf)
    for part in parts:
        p = part.strip()
        low = p.lower()
        if low.startswith('primary key'):
            pk = re.findall(r'`(\w+)`', p)
            continue
        if low.startswith('unique key'):
            uq.append(re.findall(r'`(\w+)`', p))
            continue
        if low.startswith('key '):
            continue
        if low.startswith('constraint') and 'foreign key' in low:
            fm = re.search(r'FOREIGN KEY \(`(\w+)`\) REFERENCES `(\w+)` \(`(\w+)`\)', p, re.I)
            if fm:
                fk.append((fm.group(1), fm.group(2), fm.group(3)))
            continue
        m = re.match(r'`(\w+)`\s+(\w+(?:\s*\([^)]*\))?)', p)
        if not m:
            continue
        col, ctype = m.group(1), re.sub(r'\s+', ' ', m.group(2))
        nullable = 'NO' if re.search(r'\bNOT NULL\b', p, re.I) else 'YES'
        ai = 'AUTO_INCREMENT' if re.search(r'\bAUTO_INCREMENT\b', p, re.I) else ''
        ts = 'DEFAULT CURRENT_TIMESTAMP' if re.search(r'DEFAULT CURRENT_TIMESTAMP', p, re.I) else ''
        extra = ' '.join(x for x in (ai, ts) if x)
        cols[col] = {'type': ctype, 'nullable': nullable, 'extra': extra}
    tables[name] = {'cols': cols, 'pk': pk, 'uq': uq, 'fk': fk}
    order.append(name)

def col_flags(tname, col):
    t = tables[tname]
    flags = []
    if col in t['pk']:
        flags.append('PRI')
    for uq_cols in t['uq']:
        if col in uq_cols:
            flags.append('UQ')
            break
    for fcol, rt, rc in t['fk']:
        if fcol == col:
            flags.append('FK')
            break
    return ' '.join(flags)

# --------------------------------------------------------------- write doc
lines = []
A = lines.append

A('# FBSF Website Database — Documentation')
A('')
A('> MySQL relational database for the redesigned **Faculty of Business Studies and Finance (FBSF)**, Wayamba University of Sri Lanka website.')
A('> Generated from the reverse-engineering of the original static site and the redesigned HTML site; all seed data reflects the documented content in `migration/fbsf-content.json`.')
A('')
A(f'**Schema version:** 1.0 · **Generated:** {datetime.date.today().isoformat()} · **Engine:** InnoDB · **Charset:** utf8mb4 · **Tables:** {len(tables)}')
A('')
A('---')
A('')
A('## 1. Overview')
A('')
A('This database supports the dynamic content of the FBSF website. It is designed to be')
A('integrated with a future backend (PHP, Node.js, or similar) that serves the existing')
A('HTML/CSS/vanilla-JS frontend through API calls. The schema covers:')
A('')
A('| Area | Tables | Purpose |')
A('|---|---|---|')
A('| Access control | `roles`, `permissions`, `role_permissions`, `users` | Role-based user accounts and staff logins |')
A('| Pages & navigation | `pages`, `menus`, `menu_items` | CMS-managed pages and site menus (with dropdown parents) |')
A('| Departments | `departments`, `department_partners` | The four FBSF departments and their industry partners |')
A('| Programmes | `programme_categories`, `programmes`, `programme_entry_requirements`, `programme_courses` | Undergraduate programmes, entry requirements, course structure |')
A('| Journals & publications | `journals`, `journal_issues`, `editorial_board_members`, `articles` | Academic journals, issues, editorial boards, article records |')
A('| Events & symposia | `event_types`, `events`, `event_tracks`, `event_dates`, `event_committee`, `event_downloads` | Research symposia, tracks, deadlines, committees, materials |')
A('| News & announcements | `news_categories`, `news` | Current news, announcements, and archived notices |')
A('| Downloads | `downloads` | Guidelines, templates, proceedings, and student resources |')
A('| FAQs & contacts | `faqs`, `contact_groups`, `contact_messages` | FAQ entries and the contact-form workflow |')
A('| Media & assets | `media` | Uploaded images, documents, and other files |')
A('| History & quick links | `history_timeline`, `quick_links`, `research_areas`, `faculty_committees` | Faculty history, external links, research areas, committees |')
A('| Configuration | `site_settings` | Key-value site configuration (title, contact info, social links) |')
A('')
A('### Design principles')
A('')
A('- **Normalisation:** 3NF. Repeated values (categories, event types, contact groups) live in')
A('  their own tables and are referenced by foreign keys. Long text is stored in `TEXT` columns;')
A('  structured values are in `ENUM`/`VARCHAR`.')
A('- **No static-content tables:** purely static layout code, CSS, and hand-written page sections')
A('  are not stored in the database — only content that the website or its editors need to manage')
A('  dynamically.')
A('- **Explicit IDs:** every seed `INSERT` uses explicit primary keys so relations are unambiguous;')
A('  parents are inserted before children (import order is safe).')
A('- **Historical vs. current:** `deadline_status`, `status`, and `is_archived` flags distinguish')
A('  concluded/past items from upcoming ones so the frontend can filter correctly.')
A('- **Security:** passwords are stored only as bcrypt hashes; the single seeded admin uses a')
A('  placeholder password and placeholder e-mail; no real credentials or secrets are included.')
A('- **Unicode:** `utf8mb4` throughout (supports Sinhala, emoji, and all site characters).')
A('')
A('---')
A('')
A('## 2. Entity-Relationship Diagram')
A('')
A('![FBSF Website Database ERD](database_erd.png)')
A('')
A('*`database_erd.png` — all 35 tables grouped into eight clusters, with primary keys, foreign keys, and unique keys marked. Dashed edges connect tables across clusters.*')
A('')
A('---')
A('')
A('## 3. Table catalog')
A('')
A('### 3.1 Access control')
A('')
for t in ['roles', 'permissions', 'role_permissions', 'users']:
    if t in tables:
        A(f'#### `{t}`')
        A('')
        A(tables[t].get('_desc', '') or '')
        A('')
        A('| Column | Type | Nullable | Key | Extra |')
        A('|---|---|---|---|---|')
        for c, info in tables[t]['cols'].items():
            A(f'| `{c}` | `{info["type"]}` | {info["nullable"]} | {col_flags(t, c)} | {info["extra"]} |')
        A('')
        if tables[t]['fk']:
            A('**Foreign keys:** ' + ', '.join(
                f'`{c}` → `{rt}`(`{rc}`)' for c, rt, rc in tables[t]['fk']))
            A('')
        if tables[t]['uq']:
            A('**Unique keys:** ' + ', '.join('`' + '`, `'.join(c) + '`' for c in tables[t]['uq']))
            A('')
        if tables[t]['pk']:
            A('**Primary key:** `' + '`, `'.join(tables[t]['pk']) + '`')
            A('')

# descriptions
descs = {
    'roles': 'Staff roles assigned to users (admin, editor, author, viewer).',
    'permissions': 'Granular permission keys (e.g. `manage_pages`, `publish_news`).',
    'role_permissions': 'Many-to-many mapping of roles to permissions.',
    'users': 'Backend staff accounts. Passwords are bcrypt hashes only.',
    'pages': 'CMS pages (about, departments, programmes, journals, events, news, contact, …).',
    'menus': 'Site menus (main navigation, footer).',
    'menu_items': 'Menu links; `parent_id` self-reference creates dropdowns.',
    'departments': 'The four FBSF departments with contact and leadership details.',
    'department_partners': 'Industry partners listed for each department.',
    'programme_categories': 'Groups of programmes (e.g. Degree, Diploma, Certificate).',
    'programmes': 'Undergraduate programmes offered by the faculty.',
    'programme_entry_requirements': 'Entry requirements per programme (ordered list).',
    'programme_courses': 'Course structure per programme (code, title, credits).',
    'journals': 'Academic journals published by the faculty.',
    'journal_issues': 'Published issues per journal (year/volume).',
    'editorial_board_members': 'Editorial board members per journal.',
    'articles': 'Article records listed per journal.',
    'event_types': 'Categories of events (symposium, workshop, seminar, conference).',
    'events': 'Research symposia and other events hosted by the faculty.',
    'event_tracks': 'Research tracks / themes per event.',
    'event_dates': 'Important dates (deadlines, notification, conference date) per event.',
    'event_committee': 'Organising committee members per event.',
    'event_downloads': 'Call-for-papers, templates, and related downloads per event.',
    'news_categories': 'Categories of news / announcements.',
    'news': 'News items and announcements (current and archived).',
    'downloads': 'Guidelines, templates, proceedings, and student resources.',
    'faqs': 'Frequently asked questions.',
    'contact_groups': 'Contact categories (e.g. general office, academic, IT).',
    'contact_messages': 'Messages submitted via the website contact form.',
    'media': 'Uploaded files (images, documents, videos).',
    'history_timeline': 'Faculty history milestones.',
    'quick_links': 'Quick links shown on the site.',
    'research_areas': 'Research areas of the faculty.',
    'faculty_committees': 'Faculty-level committees.',
    'site_settings': 'Key-value site configuration.',
}

# rewrite with descriptions
lines = []
A = lines.append

A('# FBSF Website Database — Documentation')
A('')
A('> MySQL relational database for the redesigned **Faculty of Business Studies and Finance (FBSF)**, Wayamba University of Sri Lanka website.')
A('> Generated from the reverse-engineering of the original static site and the redesigned HTML site; all seed data reflects the documented content in `migration/fbsf-content.json`.')
A('')
A(f'**Schema version:** 1.0 · **Generated:** {datetime.date.today().isoformat()} · **Engine:** InnoDB · **Charset:** utf8mb4 · **Tables:** {len(tables)}')
A('')
A('---')
A('')
A('## 1. Overview')
A('')
A('This database supports the dynamic content of the FBSF website. It is designed to be')
A('integrated with a future backend (PHP, Node.js, or similar) that serves the existing')
A('HTML/CSS/vanilla-JS frontend through API calls. The schema covers:')
A('')
A('| Area | Tables | Purpose |')
A('|---|---|---|')
A('| Access control | `roles`, `permissions`, `role_permissions`, `users` | Role-based user accounts and staff logins |')
A('| Pages & navigation | `pages`, `menus`, `menu_items` | CMS-managed pages and site menus (with dropdown parents) |')
A('| Departments | `departments`, `department_partners` | The four FBSF departments and their industry partners |')
A('| Programmes | `programme_categories`, `programmes`, `programme_entry_requirements`, `programme_courses` | Undergraduate programmes, entry requirements, course structure |')
A('| Journals & publications | `journals`, `journal_issues`, `editorial_board_members`, `articles` | Academic journals, issues, editorial boards, article records |')
A('| Events & symposia | `event_types`, `events`, `event_tracks`, `event_dates`, `event_committee`, `event_downloads` | Research symposia, tracks, deadlines, committees, materials |')
A('| News & announcements | `news_categories`, `news` | Current news, announcements, and archived notices |')
A('| Downloads | `downloads` | Guidelines, templates, proceedings, and student resources |')
A('| FAQs & contacts | `faqs`, `contact_groups`, `contact_messages` | FAQ entries and the contact-form workflow |')
A('| Media & assets | `media` | Uploaded images, documents, and other files |')
A('| History & quick links | `history_timeline`, `quick_links`, `research_areas`, `faculty_committees` | Faculty history, external links, research areas, committees |')
A('| Configuration | `site_settings` | Key-value site configuration (title, contact info, social links) |')
A('')
A('### Design principles')
A('')
A('- **Normalisation:** 3NF. Repeated values (categories, event types, contact groups) live in')
A('  their own tables and are referenced by foreign keys. Long text is stored in `TEXT` columns;')
A('  structured values are in `ENUM`/`VARCHAR`.')
A('- **No static-content tables:** purely static layout code, CSS, and hand-written page sections')
A('  are not stored in the database — only content that the website or its editors need to manage')
A('  dynamically.')
A('- **Explicit IDs:** every seed `INSERT` uses explicit primary keys so relations are unambiguous;')
A('  parents are inserted before children (import order is safe).')
A('- **Historical vs. current:** `deadline_status`, `status`, and `is_archived` flags distinguish')
A('  concluded/past items from upcoming ones so the frontend can filter correctly.')
A('- **Security:** passwords are stored only as bcrypt hashes; the single seeded admin uses a')
A('  placeholder password and placeholder e-mail; no real credentials or secrets are included.')
A('- **Unicode:** `utf8mb4` throughout (supports Sinhala, emoji, and all site characters).')
A('')
A('---')
A('')
A('## 2. Entity-Relationship Diagram')
A('')
A('![FBSF Website Database ERD](database_erd.png)')
A('')
A('*`database_erd.png` — all 35 tables grouped into eight clusters, with primary keys, foreign keys, and unique keys marked. Dashed edges connect tables across clusters.*')
A('')
A('---')
A('')
A('## 3. Table catalog')
A('')

SECTIONS = [
    ('3.1 Access control', ['roles', 'permissions', 'role_permissions', 'users']),
    ('3.2 Pages & navigation', ['pages', 'menus', 'menu_items']),
    ('3.3 Departments', ['departments', 'department_partners']),
    ('3.4 Programmes', ['programme_categories', 'programmes', 'programme_entry_requirements', 'programme_courses']),
    ('3.5 Journals & publications', ['journals', 'journal_issues', 'editorial_board_members', 'articles']),
    ('3.6 Events & symposia', ['event_types', 'events', 'event_tracks', 'event_dates', 'event_committee', 'event_downloads']),
    ('3.7 News & announcements', ['news_categories', 'news']),
    ('3.8 Downloads', ['downloads']),
    ('3.9 FAQs & contacts', ['faqs', 'contact_groups', 'contact_messages']),
    ('3.10 Media & assets', ['media']),
    ('3.11 History & quick links', ['history_timeline', 'quick_links', 'research_areas', 'faculty_committees']),
    ('3.12 Configuration', ['site_settings']),
]

for sec_title, members in SECTIONS:
    A(f'### {sec_title}')
    A('')
    for t in members:
        if t not in tables:
            continue
        A(f'#### `{t}`')
        A('')
        A(descs.get(t, ''))
        A('')
        A('| Column | Type | Nullable | Key | Extra |')
        A('|---|---|---|---|---|')
        for c, info in tables[t]['cols'].items():
            A(f'| `{c}` | `{info["type"]}` | {info["nullable"]} | {col_flags(t, c)} | {info["extra"]} |')
        A('')
        if tables[t]['pk']:
            A(f'**Primary key:** `' + '`, `'.join(tables[t]['pk']) + '`')
            A('')
        if tables[t]['uq']:
            A('**Unique keys:** ' + ', '.join('`' + '`, `'.join(c) + '`' for c in tables[t]['uq']))
            A('')
        if tables[t]['fk']:
            A('**Foreign keys:** ' + ', '.join(
                f'`{c}` → `{rt}`(`{rc}`)' for c, rt, rc in tables[t]['fk']))
            A('')

A('---')
A('')
A('## 4. Foreign key relationships')
A('')
A('| Child table | Column | Parent table | Parent column | On delete |')
A('|---|---|---|---|---|')
for tname in order:
    t = tables[tname]
    for col, rt, rc in t['fk']:
        # find this exact FK's ON DELETE action in the raw SQL
        action = 'RESTRICT'
        m = re.search(r'FOREIGN KEY \(`' + re.escape(col) + r'`\) REFERENCES `'
                      + re.escape(rt) + r'` \(`' + re.escape(rc) + r'`\)\s+ON DELETE ([\w ]+?)(?=,|\n\s*\))',
                      text, re.S)
        if m:
            action = m.group(1).strip()
        A(f'| `{tname}` | `{col}` | `{rt}` | `{rc}` | {action} |')
A('')
A('*Child rows are deleted when a parent is removed (`CASCADE`) for pure child content (tracks, dates, committee, downloads, issues, articles, requirements, courses, partners). Navigation and reference tables use `RESTRICT` to protect referenced pages/roles, and `SET NULL` for optional references.*')
A('')
A('---')
A('')
A('## 5. Sample queries')
A('')
A('```sql')
A('-- Published departments with their HODs')
A('SELECT id, name, abbreviation, hod_name, hod_title, contact_email, contact_phone')
A('FROM departments')
A('WHERE is_published = 1')
A('ORDER BY sort_order;')
A('')
A('-- Programmes with category, department, and number of entry requirements')
A('SELECT p.slug, p.name, pc.name AS category, d.name AS department,')
A('       COUNT(per.id) AS requirement_count')
A('FROM programmes p')
A('LEFT JOIN programme_categories pc ON p.category_id = pc.id')
A('LEFT JOIN departments d ON p.department_id = d.id')
A('LEFT JOIN programme_entry_requirements per ON per.programme_id = p.id')
A('WHERE p.is_published = 1')
A('GROUP BY p.id')
A('ORDER BY p.sort_order;')
A('')
A('-- Upcoming events with their next deadline')
A('SELECT e.slug, e.name, ed.label, ed.event_date')
A('FROM events e')
A('JOIN event_dates ed ON ed.event_id = e.id')
A('WHERE e.status = ' + "'upcoming'" + ' AND e.is_published = 1')
A('ORDER BY ed.event_date;')
A('')
A('-- Latest published news per category')
A('SELECT n.title, n.published_at, nc.name AS category')
A('FROM news n')
A('JOIN news_categories nc ON n.category_id = nc.id')
A('WHERE n.status = ' + "'published'" + ' AND n.is_archived = 0')
A('ORDER BY n.published_at DESC;')
A('')
A('-- Journal issues with article counts')
A('SELECT j.abbreviation, j.name, ji.year_volume,')
A('       COUNT(a.id) AS article_count')
A('FROM journals j')
A('JOIN journal_issues ji ON ji.journal_id = j.id')
A('LEFT JOIN articles a ON a.journal_id = j.id')
A('WHERE j.is_published = 1')
A('GROUP BY j.id, ji.id')
A('ORDER BY j.sort_order, ji.sort_order;')
A('')
A('-- Contact messages awaiting a reply')
A('SELECT id, name, email, subject, created_at')
A('FROM contact_messages')
A('WHERE status = ' + "'new'" + '')
A('ORDER BY created_at;')
A('')
A('-- Menu items for the main navigation (with dropdown parents)')
A('SELECT mi.id, mi.title, mi.url, mi.target, p.title AS parent_title')
A('FROM menu_items mi')
A('LEFT JOIN menu_items p ON mi.parent_id = p.id')
A('WHERE mi.is_published = 1')
A('ORDER BY mi.sort_order;')
A('')
A('-- Password check (never store plain text)')
A('SELECT id, username, email')
A('FROM users')
A("WHERE email = 'admin@example.com'")
A("  AND password_hash = '$2b$12$HGUOf.7dl0q9AXV.f6z3BepAeihUJX/weIslDeBTyOghajoWv3pU2';")
A('```')
A('')
A('---')
A('')
A('## 6. Importing into MySQL')
A('')
A('### 6.1 Requirements')
A('')
A('- MySQL 8.0+ (uses `utf8mb4_unicode_ci`, `JSON`-free design, InnoDB).')
A('- A database user with `CREATE` and `INSERT` privileges.')
A('')
A('### 6.2 phpMyAdmin')
A('')
A('1. Open **phpMyAdmin** for the target server.')
A('2. Create a new database, e.g. `bsf_website` (charset **utf8mb4**, collation **utf8mb4_unicode_ci**).')
A('3. Select the new database and click **Import** (or the SQL tab → **Import**).')
A('4. Choose `database/website_database.sql` and click **Go**.')
A('5. Verify: the file creates the schema and loads all seed rows in one pass — no further steps needed.')
A('6. Check the **Structure** tab: 35 tables should be listed. Open a few (`programmes`, `journals`, `events`) to confirm seed rows are present.')
A('')
A('### 6.3 MySQL CLI')
A('')
A('```bash')
A('mysql -u <user> -p < bsf_website < database/website_database.sql')
A('```')
A('')
A('The script begins with `CREATE DATABASE IF NOT EXISTS` + `USE`, so it can also run standalone:')
A('')
A('```bash')
A('mysql -u <user> -p < database/website_database.sql')
A('```')
A('')
A('### 6.4 Post-import checks')
A('')
A('```sql')
A('SHOW TABLES;                    -- expect 35 tables')
A('SELECT COUNT(*) FROM users;     -- expect 1 (placeholder admin)')
A('SELECT COUNT(*) FROM pages;     -- expect 14')
A('SELECT COUNT(*) FROM news;      -- expect 10')
A('SELECT COUNT(*) FROM faqs;      -- expect 8')
A('```')
A('')
A('---')
A('')
A('## 7. Backend integration')
A('')
A('The frontend (HTML/CSS/vanilla JS) must **not** contain database credentials or direct')
A('database-connection code. A future backend (PHP/Node.js) exposes API endpoints that query')
A('this database. Recommended approach:')
A('')
A('```')
A('Frontend (vanilla JS fetch)  →  Backend API (/api/…)  →  MySQL database')
A('```')
A('')
A('Example endpoints:')
A('')
A('| Endpoint | Query |')
A('|---|---|')
A('| `GET /api/departments` | Section 5 query #1 |')
A('| `GET /api/programmes` | Section 5 query #2 |')
A('| `GET /api/events/upcoming` | Section 5 query #3 |')
A('| `GET /api/news` | Section 5 query #4 |')
A('| `GET /api/journals` | Section 5 query #5 |')
A('| `POST /api/contact` | Insert into `contact_messages` |')
A('| `POST /api/login` | Verify bcrypt hash in `users` |')
A('')
A('Connection details belong in server-side environment configuration, never in client code.')
A('')
A('---')
A('')
A('## 8. Security notes')
A('')
A('- The seeded admin account `admin@example.com` uses the bcrypt hash of the placeholder')
A('  password `change-me-on-first-login`. **Change the password immediately after first login.**')
A('- Do not commit real database credentials, API keys, or secrets. Store them in environment')
A('  variables on the server.')
A('- Use least-privilege database accounts: the web application should use a user with only the')
A('  permissions it needs (SELECT/INSERT/UPDATE on content tables; not `DROP`/`CREATE`).')
A('- Validate and parameterise all queries on the backend to prevent SQL injection.')
A('- Contact messages are user-submitted content: sanitise before display (HTML-escape).')
A('')
A('---')
A('')
A('## 9. Seed data summary')
A('')
A('| Table | Seed rows |')
A('|---|---|')

# count rows per table from INSERTs
ins_counts = {}
for block in re.finditer(r'INSERT INTO `(\w+)`', sql):
    ins_counts[block.group(1)] = ins_counts.get(block.group(1), 0) + 1
for t in order:
    A(f'| `{t}` | {ins_counts.get(t, 0)} |')
A('')
A('*All seed data is derived from the verified site content in `migration/fbsf-content.json`;')
A('items not present in the source (e.g. journal submission e-mails) are stored as `NULL` and')
A('marked "Information not available" rather than invented.*')
A('')

open(OUT_PATH, 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
print(f'written: {OUT_PATH} ({len(lines)} lines)')
