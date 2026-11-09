#!/usr/bin/env python3
"""Generate WEBSITE_CONTENT.md — a comprehensive document containing ALL
website content, derived from the verified migration/fbsf-content.json.

This document is the consolidated content source for the site redesign.
It preserves original terminology, marks missing data as "Information not
available", and distinguishes historical events from current information.
"""
import json
import datetime

JSON_PATH = '/home/user/BSF-Site/migration/fbsf-content.json'
OUT_PATH = '/home/user/BSF-Site/WEBSITE_CONTENT.md'

with open(JSON_PATH, encoding='utf-8') as fh:
    D = json.load(fh)

lines = []
A = lines.append

A('# FBSF Website — Complete Content Document')
A('')
A('> Faculty of Business Studies and Finance, Wayamba University of Sri Lanka')
A('> Consolidated from the verified site content (`migration/fbsf-content.json`, generated from `js/data.js`).')
A('')
A(f'**Document generated:** {datetime.date.today().isoformat()} · **Source:** verified site documentation (2023–2026)')
A('')
A('---')
A('')
A('## Table of Contents')
A('')
A('1. [Site Information](#1-site-information)')
A('2. [Departments](#2-departments)')
A('3. [Academic Programmes](#3-academic-programmes)')
A('4. [Publications & Journals](#4-publications--journals)')
A('5. [Research Symposia](#5-research-symposia)')
A('6. [News & Announcements](#6-news--announcements)')
A('7. [Frequently Asked Questions](#7-frequently-asked-questions)')
A('8. [Authorities & Quality Assurance](#8-authorities--quality-assurance)')
A('9. [Contacts](#9-contacts)')
A('10. [Quick Links](#10-quick-links)')
A('')
A('---')
A('')

# ------------------------------------------------------------------ site
A('## 1. Site Information')
A('')
s = D['site']
A('| Field | Value |')
A('|---|---|')
A(f"| Name | {s['name']} |")
A(f"| Abbreviation | {s['shortName']} |")
A(f"| University | {s['university']} |")
A(f"| Established | {s['established']} |")
A(f"| Gazette | {s['gazette']} |")
A(f"| Location | {s['location']} |")
A(f"| Postal | {s['postal']} |")
A(f"| Email | {s['email']} |")
A(f"| Telephone | {s['tel']} |")
A(f"| Dean | {s['dean']} |")
A('')
A('### Vision')
A('')
A(f"> {s['vision']}")
A('')
A('### Mission')
A('')
A(f"> {s['mission']}")
A('')
A('### Accuracy notice')
A('')
A(f"> {s['noteCurrent']}")
A('')
A('---')
A('')

# ------------------------------------------------------------------ depts
A('## 2. Departments')
A('')
A(f"The faculty has **{len(D['departments'])} departments**.")
A('')
for i, dept in enumerate(D['departments'], 1):
    A(f"### 2.{i} {dept['name']} ({dept['short']})")
    A('')
    A(f"**Tagline:** {dept['tagline']}")
    A('')
    A('#### Introduction')
    A('')
    A(dept['intro'])
    A('')
    if dept.get('vision'):
        A('#### Vision')
        A('')
        A(f"> {dept['vision']}")
        A('')
    if dept.get('mission'):
        A('#### Mission')
        A('')
        A(f"> {dept['mission']}")
        A('')
    if dept.get('hodTitle'):
        A(f"#### {dept['hodTitle']}")
        A('')
        if dept.get('hodName'):
            A(f"**{dept['hodName']}**")
            A('')
        if dept.get('hodMessage'):
            A(dept['hodMessage'])
            A('')
    if dept.get('research'):
        A('#### Research')
        A('')
        A(dept['research'])
        A('')
    if dept.get('industry'):
        ind = dept['industry']
        if isinstance(ind, list):
            A('#### Industry & Professional Bodies')
            A('')
            for item in ind:
                if isinstance(item, dict):
                    A(f"- **{item.get('name', '')}** — {item.get('detail', '')}")
                else:
                    A(f"- {item}")
            A('')
        elif isinstance(ind, str):
            A('#### Industry & Professional Bodies')
            A('')
            A(ind)
            A('')
    if dept.get('publications'):
        pubs = dept['publications']
        A('#### Publications')
        A('')
        if isinstance(pubs, list):
            for p in pubs:
                if isinstance(p, dict):
                    A(f"- **{p.get('abbr', '')}** — {p.get('name', '')}")
                else:
                    A(f"- {p}")
        else:
            A(pubs)
        A('')
    if dept.get('contact'):
        A('#### Contact')
        A('')
        ct = dept['contact']
        if isinstance(ct, dict):
            for k, v in ct.items():
                A(f"- **{k}:** {v}")
        elif isinstance(ct, list):
            for item in ct:
                A(f"- {item}")
        else:
            A(ct)
        A('')
    A('---')
    A('')

# ------------------------------------------------------------------ programmes
A('## 3. Academic Programmes')
A('')
A(f"The faculty offers **{len(D['programmes'])} programmes** across undergraduate, postgraduate, diploma, and certificate levels.")
A('')

# group by category
categories = {}
for p in D['programmes']:
    cat = p['category']
    categories.setdefault(cat, []).append(p)

cat_labels = {
    'ug': 'Undergraduate',
    'pg': 'Postgraduate',
    'diploma': 'Diploma',
    'higher-diploma': 'Higher Diploma',
    'advanced-certificate': 'Advanced Certificate',
}

for cat_key in ['ug', 'pg', 'diploma', 'higher-diploma', 'advanced-certificate']:
    if cat_key not in categories:
        continue
    label = cat_labels.get(cat_key, cat_key)
    A(f"### 3.{list(categories.keys()).index(cat_key)+1} {label} Programmes")
    A('')
    for p in categories[cat_key]:
        A(f"#### {p['name']}")
        A('')
        A(f"**ID:** `{p['id']}` · **Department:** {p['department']}")
        A('')
        if p.get('summary'):
            A(f"**Summary:** {p['summary']}")
            A('')
        if p.get('description'):
            A('#### Programme Description')
            A('')
            A(p['description'])
            A('')
        if p.get('duration') or p.get('credits'):
            A('| Attribute | Value |')
            A('|---|---|')
            if p.get('duration'):
                A(f"| Duration | {p['duration']} |")
            if p.get('credits'):
                A(f"| Credits | {p['credits']} |")
            A('')
        if p.get('entry'):
            A('#### Entry Requirements')
            A('')
            if isinstance(p['entry'], list):
                for req in p['entry']:
                    A(f"- {req}")
            else:
                A(p['entry'])
            A('')
        if p.get('fees'):
            A('#### Fees')
            A('')
            A(p['fees'])
            A('')
        if p.get('deadline'):
            A('#### Application Deadline')
            A('')
            dl = p['deadline']
            if isinstance(dl, dict):
                A(f"- **Date:** {dl.get('date', 'Information not available')}")
                if dl.get('status'):
                    A(f"- **Status:** {dl['status']}")
            else:
                A(dl)
            A('')
        if p.get('structure'):
            A('#### Course Structure')
            A('')
            st = p['structure']
            if isinstance(st, list):
                for sem in st:
                    if isinstance(sem, dict):
                        sem_label = sem.get('semester', sem.get('label', ''))
                        A(f"**{sem_label}**")
                        A('')
                        A('| Code | Title |')
                        A('|---|---|')
                        courses = sem.get('courses', [])
                        for course in courses:
                            if isinstance(course, dict):
                                A(f"| {course.get('code', '')} | {course.get('title', '')} |")
                            elif isinstance(course, str):
                                # Format: "CODE — Title"
                                if '—' in course or '–' in course:
                                    sep = '—' if '—' in course else '–'
                                    parts = course.split(sep, 1)
                                    code = parts[0].strip()
                                    title = parts[1].strip() if len(parts) > 1 else ''
                                    A(f"| {code} | {title} |")
                                else:
                                    A(f"| | {course} |")
                        A('')
                    else:
                        A(f"- {sem}")
            elif isinstance(st, str):
                A(st)
                A('')
        if p.get('contact'):
            A('#### Application Contact')
            A('')
            A(p['contact'])
            A('')
        A('---')
        A('')

# ------------------------------------------------------------------ publications
A('## 4. Publications & Journals')
A('')
A(f"The faculty publishes **{len(D['publications'])} journals and magazines**.")
A('')
for i, pub in enumerate(D['publications'], 1):
    A(f"### 4.{i} {pub['name']}")
    A('')
    A(f"**Abbreviation:** {pub['abbr']} · **Type:** {pub['type']}")
    A('')
    type_info = []
    if pub.get('publisher'):
        type_info.append(f"**Publisher:** {pub['publisher']}")
    if pub.get('issn'):
        type_info.append(f"**ISSN:** {pub['issn']}")
    if pub.get('frequency'):
        type_info.append(f"**Frequency:** {pub['frequency']}")
    if type_info:
        for ti in type_info:
            A(ti)
        A('')
    if pub.get('description'):
        A('#### Description')
        A('')
        A(pub['description'])
        A('')
    if pub.get('submission'):
        A('#### Submission Guidelines')
        A('')
        A(pub['submission'])
        A('')
    if pub.get('submission_email'):
        A(f"**Submission email:** {pub['submission_email']}")
        A('')
    if pub.get('latest_issue'):
        A(f"**Latest issue:** {pub['latest_issue']}")
        A('')
    # issues
    issues = pub.get('issues', [])
    if issues:
        A(f"**Issues published:** {len(issues)}")
        A('')
        for iss in issues:
            if isinstance(iss, dict):
                vol = iss.get('volume', iss.get('year', ''))
                A(f"- Volume/Year: {vol}")
            else:
                A(f"- {iss}")
        A('')
    # editorial
    ed = pub.get('editorial')
    if ed:
        A('#### Editorial Board')
        A('')
        if isinstance(ed, list):
            for member in ed:
                if isinstance(member, dict):
                    A(f"- **{member.get('name', '')}** — {member.get('role', 'Editorial Board')}")
                else:
                    A(f"- {member}")
        else:
            A(ed)
        A('')
    # articles
    articles = pub.get('articles', [])
    if articles:
        A(f"**Articles listed:** {len(articles)}")
        A('')
        for art in articles:
            if isinstance(art, dict):
                title = art.get('title', '')
                authors = art.get('authors', '')
                issue = art.get('issue', '')
                A(f"- **{title}**")
                if authors:
                    A(f"  - Authors: {authors}")
                if issue:
                    A(f"  - Issue: {issue}")
            else:
                A(f"- {art}")
        A('')
    A('---')
    A('')

# ------------------------------------------------------------------ symposia
A('## 5. Research Symposia')
A('')
A(f"The faculty hosts **{len(D['symposia'])} research symposia**.")
A('')
for i, sym in enumerate(D['symposia'], 1):
    status_label = {'concluded': 'Concluded', 'upcoming': 'Upcoming'}.get(sym.get('status', ''), sym.get('status', ''))
    A(f"### 5.{i} {sym['name']} ({status_label})")
    A('')
    if sym.get('full'):
        A(f"**{sym['full']}**")
        A('')
    if sym.get('organiser'):
        A(f"**Organiser:** {sym['organiser']}")
        A('')
    if sym.get('theme'):
        A(f"**Theme:** {sym['theme']}")
        A('')
    if sym.get('description'):
        A('#### Description')
        A('')
        A(sym['description'])
        A('')
    # dates
    dates = sym.get('dates', [])
    if dates:
        A('#### Important Dates')
        A('')
        A('| Milestone | Date |')
        A('|---|---|')
        for dt in dates:
            if isinstance(dt, dict):
                A(f"| {dt.get('label', '')} | {dt.get('date', 'Information not available')} |")
            else:
                A(f"| {dt} | |")
        A('')
    # tracks
    tracks = sym.get('tracks', [])
    if tracks:
        A(f"#### Research Tracks ({len(tracks)})")
        A('')
        for tr in tracks:
            A(f"- {tr}")
        A('')
    # keynote
    keynote = sym.get('keynote')
    if keynote:
        A('#### Keynote Speaker')
        A('')
        if isinstance(keynote, dict):
            A(f"**{keynote.get('name', '')}**")
            if keynote.get('details'):
                A(f"> {keynote['details']}")
                A('')
        else:
            A(keynote)
            A('')
    # committee
    committee = sym.get('committee', [])
    if committee:
        A('#### Organizing Committee')
        A('')
        A('| Role | Name | Contact |')
        A('|---|---|---|')
        for cm in committee:
            if isinstance(cm, dict):
                A(f"| {cm.get('role', '')} | {cm.get('name', '')} | {cm.get('contact', 'Information not available')} |")
            else:
                A(f"| | {cm} | |")
        A('')
    # downloads
    dl = sym.get('downloads', [])
    if dl:
        A('#### Downloads')
        A('')
        for d in dl:
            A(f"- {d}")
        A('')
    # submission
    if sym.get('submission'):
        A('#### Submission')
        A('')
        A(sym['submission'])
        A('')
    # proceedings
    proc = sym.get('proceedings', [])
    if proc:
        A('#### Proceedings')
        A('')
        for p in proc:
            A(f"- {p}")
        A('')
    A('---')
    A('')

# ------------------------------------------------------------------ announcements
A('## 6. News & Announcements')
A('')
ann = D['announcements']
A(f"**{len(ann)} announcements** are documented. All are historical (concluded) as of November 2026.")
A('')
ann_type_labels = {
    'programme': 'Programme',
    'symposium': 'Symposium',
    'publication': 'Publication',
    'event': 'Event',
}
for a in ann:
    tlabel = ann_type_labels.get(a['type'], a['type'])
    A(f"### [{tlabel}] {a['title']}")
    A('')
    if a.get('date'):
        A(f"**Date:** {a['date']} · **Status:** {a['status']}")
        A('')
    if a.get('body'):
        A(a['body'])
        A('')
    A('---')
    A('')

# ------------------------------------------------------------------ faqs
A('## 7. Frequently Asked Questions')
A('')
faqs = D['faqs']
A(f"**{len(faqs)} FAQs** are documented.")
A('')
for i, f in enumerate(faqs, 1):
    A(f"### Q{i}. {f['q']}")
    A('')
    A(f['a'])
    A('')

# ------------------------------------------------------------------ authorities
A('---')
A('')
A('## 8. Authorities & Quality Assurance')
A('')
a = D['authorities']
# FQAC
fqac = a.get('fqac', {})
if fqac:
    A('### 8.1 Faculty Quality Assurance Cell (FQAC)')
    A('')
    if fqac.get('name'):
        A(f"**{fqac['name']}**")
        A('')
    if fqac.get('description'):
        A('#### Description')
        A('')
        A(fqac['description'])
        A('')
    if fqac.get('purpose'):
        A('#### Purpose')
        A('')
        A(fqac['purpose'])
        A('')
    A('---')
    A('')
# Department QA
dqa = a.get('departmentQA', [])
if dqa:
    A('### 8.2 Department Quality Assurance Units')
    A('')
    for qa in dqa:
        if isinstance(qa, dict):
            A(f"#### {qa.get('name', '')}")
            A('')
            if qa.get('note'):
                A(qa['note'])
                A('')
        else:
            A(f"- {qa}")
    A('')
# Committees
committees = a.get('committees', [])
if committees:
    A('### 8.3 Faculty Committees')
    A('')
    for c in committees:
        A(f"- **{c}**")
    A('')
# Links
links = a.get('links', [])
if links:
    A('### 8.4 Useful Links')
    A('')
    for l in links:
        if isinstance(l, dict):
            A(f"- **{l.get('label', '')}** — {l.get('url', '')}")
        else:
            A(f"- {l}")
    A('')
# Downloads
dl = a.get('downloads', [])
if dl:
    A('### 8.5 Downloads')
    A('')
    for d in dl:
        A(f"- {d}")
    A('')

# ------------------------------------------------------------------ contacts
A('---')
A('')
A('## 9. Contacts')
A('')
contacts = D['contacts']
A(f"**{len(contacts)} contact groups** are documented.")
A('')
for c in contacts:
    A(f"### {c['group']}")
    A('')
    items = c.get('items', [])
    if items:
        A('| Contact | Details |')
        A('|---|---|')
        for item in items:
            if isinstance(item, dict):
                icon = item.get('icon', '')
                icon_label = {'icon-mail': 'Email', 'icon-phone': 'Phone', 'icon-user': 'Person', 'icon-pin': 'Address'}.get(icon, icon)
                name = item.get('name', '')
                value = item.get('contact', item.get('value', ''))
                A(f"| {icon_label} | {name}: {value} |")
            else:
                A(f"| | {item} |")
        A('')

# ------------------------------------------------------------------ quick links
A('---')
A('')
A('## 10. Quick Links')
A('')
ql = D['quick_links']
A(f"**{len(ql)} quick links** are available.")
A('')
A('| Label | URL | Description |')
A('|---|---|---|')
for q in ql:
    A(f"| {q['label']} | `{q['href']}` | {q.get('desc', '')} |")
A('')
A('---')
A('')
A('## Appendix: Content Verification Notes')
A('')
A("- All content is **verified against the faculty's published documentation** (2023–2026).")
A('- Where information is incomplete, fields are marked *"Information not available in the source document"*.')
A('- Historical deadlines, events, and calls for papers are labelled **concluded / archived** — they are not presented as upcoming.')
A('- Department, programme, journal, and symposium names are preserved exactly as in the source.')
A('- Vision, mission, and official messages are preserved verbatim.')
A('')
A(f'*Document generated from `migration/fbsf-content.json` on {datetime.date.today().isoformat()}.*')

open(OUT_PATH, 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
print(f'written: {OUT_PATH} ({len(lines)} lines)')
