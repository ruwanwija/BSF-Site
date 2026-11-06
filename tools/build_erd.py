#!/usr/bin/env python3
"""Generate database_erd.png — ERD diagram for the FBSF website database.

Parses the DDL from database/website_database.sql and draws all 35 tables
with columns (PK / FK / unique marked), grouped into clusters with FK
edges between boxes. Uses matplotlib (graphviz unavailable in sandbox).
"""
import re
import sys
from collections import defaultdict

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

SQL_PATH = '/home/user/BSF-Site/database/website_database.sql'
OUT_PATH = '/home/user/BSF-Site/database/database_erd.png'

# ---------------------------------------------------------------- parse DDL
tables = {}   # name -> {'cols': [(name, type, flags)], 'fks': [(col, ref_table, ref_col)]}
order = []

def parse_sql():
    with open(SQL_PATH, encoding='utf-8') as fh:
        text = fh.read()
    # strip comments
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.S)
    text = re.sub(r'--[^\n]*', '', text)
    # find each CREATE TABLE ... ;
    for block in re.finditer(r'CREATE TABLE `(\w+)` \((.*?)\n\)\s*ENGINE', text, flags=re.S):
        name, body = block.group(1), block.group(2)
        cols = []
        fks = []
        # split columns on commas at depth 0
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
            p = part.strip().strip('`')
            low = p.lower()
            if low.startswith('primary key') or low.startswith('unique key') or low.startswith('key '):
                continue
            m = re.match(r'`(\w+)`\s+(\w+(?:\s*\([^)]*\))?)', p)
            if not m:
                continue
            col, ctype = m.group(1), re.sub(r'\s+', ' ', m.group(2))
            flags = set()
            if re.search(r'\bNOT NULL\b', p, re.I):
                flags.add('NN')
            if re.search(r'\bAUTO_INCREMENT\b', p, re.I):
                flags.add('AI')
            if re.search(r'\bDEFAULT CURRENT_TIMESTAMP\b', p, re.I):
                flags.add('TS')
            fm = re.search(r'FOREIGN KEY \(`(\w+)`\) REFERENCES `(\w+)` \(`(\w+)`\)', p, re.I)
            if fm:
                cols.append((col, ctype, flags))
                fks.append((col, fm.group(2), fm.group(3)))
                continue
            pkm = re.search(r'PRIMARY KEY \(`(\w+)`\)', p, re.I)
            if pkm:
                flags.add('PK')
            um = re.search(r'UNIQUE KEY `\w+` \(`(\w+)`\)', p, re.I)
            if um:
                flags.add('UQ')
            cols.append((col, ctype, flags))
        tables[name] = {'cols': cols, 'fks': fks}
        order.append(name)

parse_sql()
if not tables:
    print('ERROR: no tables parsed'); sys.exit(1)
print(f'parsed {len(tables)} tables')

# ------------------------------------------------------------------ layout
CLUSTERS = [
    ('Core & Access Control', ['users', 'roles', 'permissions', 'role_permissions', 'site_settings']),
    ('Pages & Navigation', ['pages', 'menus', 'menu_items']),
    ('Departments & Programmes', ['departments', 'department_partners', 'programme_categories',
                                   'programmes', 'programme_entry_requirements', 'programme_courses']),
    ('Journals & Publications', ['journals', 'journal_issues', 'editorial_board_members', 'articles']),
    ('Events & Symposia', ['event_types', 'events', 'event_tracks', 'event_dates',
                           'event_committee', 'event_downloads']),
    ('News & Downloads', ['news_categories', 'news', 'downloads']),
    ('FAQs, Contacts & Media', ['faqs', 'contact_groups', 'contact_messages', 'media']),
    ('History & Quick Links', ['history_timeline', 'quick_links', 'research_areas', 'faculty_committees']),
]

# grid placement: 4 clusters per row, 2 rows
cluster_pos = {}
for ci, (title, members) in enumerate(CLUSTERS):
    r, c = divmod(ci, 4)
    cluster_pos[title] = (r, c, members)

# box geometry
BOX_W, BOX_H = 2.55, 0.30 + 0.185 * 8   # width, height per 8 columns
GAP_X, GAP_Y = 3.05, 1.55
CELL_W = BOX_W + GAP_X
CELL_H = BOX_H + GAP_Y
MARGIN = 2.0

def box_pos(cluster_title, local_idx):
    r, c, _ = cluster_pos[cluster_title]
    return (MARGIN + c * CELL_W + BOX_W / 2,
            (len(CLUSTERS) // 4) * (CELL_H + 1.4) - (r + 1) * CELL_H + BOX_H / 2 - 0.7)

def draw_box(ax, tname):
    info = tables[tname]
    cols = info['cols'][:8]
    x, y = box_pos(cluster_of[tname], local_idx[tname])
    h = 0.30 + 0.185 * len(cols)
    ax.add_patch(FancyBboxPatch((x - BOX_W / 2, y - h / 2), BOX_W, h,
                 boxstyle='round,pad=0.02,rounding_size=0.08',
                 linewidth=1.2, edgecolor='#2b6cb0', facecolor='#ebf4ff'))
    ax.text(x, y + h / 2 - 0.13, tname, ha='center', va='center',
            fontsize=9.5, fontweight='bold', color='#1a365d')
    for i, (col, ctype, flags) in enumerate(cols):
        cy = y + h / 2 - 0.30 - 0.185 * i
        marks = []
        if 'PK' in flags: marks.append('PK')
        elif 'UQ' in flags: marks.append('UQ')
        if info['fks'] and any(f[0] == col for f in info['fks']):
            marks.append('FK')
        mark = '  '.join(marks)
        ctype_short = ctype.split('(')[0] if '(' in ctype else ctype
        if ctype_short in ('varchar', 'char'):
            ctype_short = 'varchar'
        label = f'{col} {ctype_short}'
        if mark:
            label = f'[{mark}] ' + label
        ax.text(x - BOX_W / 2 + 0.06, cy, label, ha='left', va='center', fontsize=7.2, color='#2d3748')

# cluster_of / local_idx
cluster_of = {}
local_idx = {}
for title, members in CLUSTERS:
    for i, m in enumerate(members):
        cluster_of[m] = title
        local_idx[m] = i

# ------------------------------------------------------------------ figure
fig_w = 4 * CELL_W + 2 * MARGIN + 3
fig_h = 2 * (CELL_H + 1.4) + 2 * MARGIN
fig, ax = plt.subplots(figsize=(fig_w, fig_h))
ax.set_xlim(0, fig_w)
ax.set_ylim(0, fig_h)
ax.axis('off')

# cluster titles
for title, (r, c, members) in cluster_pos.items():
    tx = MARGIN + c * CELL_W + BOX_W / 2
    ty = (len(CLUSTERS) // 4) * (CELL_H + 1.4) - r * CELL_H - 0.75
    ax.text(tx, ty, title.upper(), ha='center', va='center', fontsize=11.5,
            fontweight='bold', color='#ffffff',
            bbox=dict(boxstyle='round,pad=0.45', facecolor='#2b6cb0', edgecolor='none'))

# boxes
for tname in tables:
    draw_box(ax, tname)

# FK edges
edge_colors = {'news': '#dd6b20', 'events': '#805ad5', 'programmes': '#38a169',
               'journals': '#d53f8c', 'pages': '#319795', 'downloads': '#d53f8c'}
edge_style = defaultdict(lambda: '#4a5568')
for tname, info in tables.items():
    for col, ref_table, ref_col in info['fks']:
        if tname not in cluster_of or ref_table not in cluster_of:
            continue
        same = cluster_of[tname] == cluster_of[ref_table]
        # pick edge style by table group
        for key, colr in edge_colors.items():
            if tname.startswith(key.split('_')[0]) or ref_table.startswith(key.split('_')[0]):
                style = (colr, '-', 1.1) if not same else (colr, '--', 1.0)
                break
        else:
            style = ('#4a5568', '-', 0.9) if not same else ('#718096', '--', 0.7)
        x1, y1 = box_pos(cluster_of[tname], local_idx[tname])
        x2, y2 = box_pos(cluster_of[ref_table], local_idx[ref_table])
        # shorten lines to box edges
        dx, dy = x2 - x1, y2 - y1
        norm = (dx * dx + dy * dy) ** 0.5 or 1
        # skip if too far / messy (cross-cluster long lines)
        if abs(x2 - x1) > CELL_W * 1.6 and abs(y2 - y1) > CELL_H * 1.4:
            continue
        ax.annotate('', xy=(x2 - dx / norm * (BOX_W / 2 - 0.1), y2 - dy / norm * (BOX_H / 2 - 0.1)),
                    xytext=(x1 + dx / norm * (BOX_W / 2 - 0.1), y1 + dy / norm * (BOX_H / 2 - 0.1)),
                    arrowprops=dict(arrowstyle='-|>', color=style[0], lw=style[2],
                                    linestyle=style[1],
                                    shrinkA=2, shrinkB=2))

# legend
legend_items = [
    ('#2b6cb0', 'solid'), ('#718096', 'dashed'),
    ('#dd6b20', '-'), ('#805ad5', '-'), ('#38a169', '-'), ('#d53f8c', '-'), ('#319795', '-'),
]
lx, ly = MARGIN, MARGIN * 0.65
ax.text(lx, ly + 0.35, 'Legend:', fontsize=9, fontweight='bold', color='#2d3748')
ax.plot([lx + 0.75, lx + 1.35], [ly, ly], color='#2b6cb0', lw=1.6)
ax.text(lx + 1.5, ly, 'FK (same cluster)', fontsize=8, va='center', color='#2d3748')
ax.plot([lx + 0.75, lx + 1.35], [ly - 0.22, ly - 0.22], color='#718096', lw=1.2, linestyle='--')
ax.text(lx + 1.5, ly - 0.22, 'FK (cross-cluster)', fontsize=8, va='center', color='#2d3748')
ax.text(lx + 3.4, ly - 0.05, '[PK] primary key · [FK] foreign key · [UQ] unique · NN not null · AI auto-increment · TS timestamp',
        fontsize=8, va='center', color='#2d3748')
ax.text(lx + 3.4, ly - 0.28, '8 columns shown per table (of up to 14); full column list in DATABASE_DOCUMENTATION.md',
        fontsize=8, va='center', color='#718096')

ax.set_title('FBSF Website Database — Entity-Relationship Diagram (MySQL, utf8mb4)',
             fontsize=15, fontweight='bold', color='#1a365d', pad=18)

plt.tight_layout()
plt.savefig(OUT_PATH, dpi=170, bbox_inches='tight', facecolor='white')
print(f'written: {OUT_PATH}')
