#!/usr/bin/env python3
"""Convert WEBSITE_CONTENT.md to a professionally formatted PDF using ReportLab.

Handles headings, tables, blockquotes, bold text, bullet lists, horizontal
rules, and inline formatting. Uses the FBSF navy/green color scheme.
"""
import re
import datetime

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, ListFlowable, ListItem, HRFlowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus.tableofcontents import TableOfContents

# ----------------------------------------------------------------- fonts
FONT_REGULAR = 'Helvetica'
FONT_BOLD = 'Helvetica-Bold'
FONT_OBLIQUE = 'Helvetica-Oblique'
FONT_BOLD_OBLIQUE = 'Helvetica-BoldOblique'

# ----------------------------------------------------------------- colors
NAVY = HexColor('#192f59')
GREEN = HexColor('#3db166')
GREEN_DARK = HexColor('#2a8a4f')
BG_LIGHT = HexColor('#f5f7fa')
BG_SOFT = HexColor('#eef2f7')
TEXT = HexColor('#2b2f36')
TEXT_SOFT = HexColor('#6b6b6b')
BORDER = HexColor('#d1d9e0')
TABLE_HEADER_BG = NAVY
TABLE_HEADER_TEXT = white
ROW_ALT = HexColor('#f8fafc')

# ----------------------------------------------------------------- styles
styles = getSampleStyleSheet()

STYLE_TITLE = ParagraphStyle('Title', parent=styles['Title'],
    fontName=FONT_BOLD, fontSize=22, leading=28, textColor=NAVY,
    spaceAfter=6*mm, alignment=TA_LEFT)

STYLE_SUBTITLE = ParagraphStyle('Subtitle', parent=styles['Normal'],
    fontName=FONT_REGULAR, fontSize=10, leading=14, textColor=TEXT_SOFT,
    spaceAfter=10*mm)

STYLE_H1 = ParagraphStyle('H1', parent=styles['Heading1'],
    fontName=FONT_BOLD, fontSize=18, leading=24, textColor=NAVY,
    spaceBefore=8*mm, spaceAfter=4*mm)

STYLE_H2 = ParagraphStyle('H2', parent=styles['Heading2'],
    fontName=FONT_BOLD, fontSize=14, leading=18, textColor=NAVY,
    spaceBefore=6*mm, spaceAfter=3*mm)

STYLE_H3 = ParagraphStyle('H3', parent=styles['Heading3'],
    fontName=FONT_BOLD, fontSize=12, leading=16, textColor=GREEN_DARK,
    spaceBefore=4*mm, spaceAfter=2*mm)

STYLE_H4 = ParagraphStyle('H4', parent=styles['Heading4'],
    fontName=FONT_BOLD, fontSize=10.5, leading=14, textColor=TEXT,
    spaceBefore=3*mm, spaceAfter=1.5*mm)

STYLE_BODY = ParagraphStyle('Body', parent=styles['Normal'],
    fontName=FONT_REGULAR, fontSize=9.5, leading=14, textColor=TEXT,
    spaceAfter=2*mm, alignment=TA_JUSTIFY)

STYLE_BLOCKQUOTE = ParagraphStyle('Blockquote', parent=styles['Normal'],
    fontName=FONT_OBLIQUE, fontSize=9.5, leading=14, textColor=TEXT,
    leftIndent=8*mm, rightIndent=4*mm, spaceBefore=1*mm, spaceAfter=3*mm,
    borderColor=GREEN, borderWidth=0, borderPadding=0)

STYLE_BULLET = ParagraphStyle('Bullet', parent=styles['Normal'],
    fontName=FONT_REGULAR, fontSize=9.5, leading=13, textColor=TEXT,
    leftIndent=10*mm, bulletIndent=2*mm, spaceAfter=1*mm)

STYLE_TOC_H1 = ParagraphStyle('TOC1', parent=styles['Normal'],
    fontName=FONT_BOLD, fontSize=10, leading=16, textColor=NAVY,
    leftIndent=0, spaceAfter=1*mm)

STYLE_TOC_H2 = ParagraphStyle('TOC2', parent=styles['Normal'],
    fontName=FONT_REGULAR, fontSize=9, leading=14, textColor=TEXT,
    leftIndent=6*mm, spaceAfter=0.5*mm)

STYLE_TABLE_CELL = ParagraphStyle('TableCell', parent=styles['Normal'],
    fontName=FONT_REGULAR, fontSize=8.5, leading=11, textColor=TEXT)

STYLE_TABLE_HEADER = ParagraphStyle('TableHeader', parent=styles['Normal'],
    fontName=FONT_BOLD, fontSize=8.5, leading=11, textColor=TABLE_HEADER_TEXT)

STYLE_TOTAL_PAGES = ParagraphStyle('TotalPages', parent=styles['Normal'],
    fontName=FONT_REGULAR, fontSize=8, leading=10, textColor=TEXT_SOFT,
    alignment=TA_CENTER)


# ----------------------------------------------------------------- helpers
def esc(text):
    """Escape XML-special chars for ReportLab."""
    text = text.replace('&', '&amp;')
    text = text.replace('<', '&lt;')
    text = text.replace('>', '&gt;')
    return text


def inline_format(text):
    """Convert markdown inline formatting to ReportLab markup."""
    text = esc(text)
    # Bold **text**
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    # Italic *text* (avoid matching **)
    text = re.sub(r'(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)', r'<i>\1</i>', text)
    # Inline code `text`
    text = re.sub(r'`(.+?)`', r'<font face="Courier">\1</font>', text)
    return text


def make_table(rows):
    """Build a styled ReportLab table from markdown table rows."""
    # Convert cells to paragraphs
    data = []
    for ri, row in enumerate(rows):
        cells = []
        for cell in row:
            if ri == 0:
                cells.append(Paragraph(inline_format(cell), STYLE_TABLE_HEADER))
            else:
                cells.append(Paragraph(inline_format(cell), STYLE_TABLE_CELL))
        data.append(cells)

    if not data:
        return []

    num_cols = max(len(r) for r in data)
    # pad rows
    for r in data:
        while len(r) < num_cols:
            r.append(Paragraph('', STYLE_TABLE_CELL))

    # column widths - distribute evenly, but first column slightly wider
    col_widths = []
    avail = 170 * mm  # A4 width minus margins
    if num_cols == 2:
        col_widths = [avail * 0.35, avail * 0.65]
    elif num_cols == 3:
        col_widths = [avail * 0.30, avail * 0.40, avail * 0.30]
    elif num_cols == 4:
        col_widths = [avail * 0.20, avail * 0.30, avail * 0.30, avail * 0.20]
    else:
        col_widths = [avail / num_cols] * num_cols

    tbl = Table(data, colWidths=col_widths, repeatRows=1)
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_BG),
        ('TEXTCOLOR', (0, 0), (-1, 0), TABLE_HEADER_TEXT),
        ('FONTNAME', (0, 0), (-1, 0), FONT_BOLD),
        ('FONTSIZE', (0, 0), (-1, -1), 8.5),
        ('LEADING', (0, 0), (-1, -1), 11),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ])
    # alternate row background
    for ri in range(1, len(data)):
        if ri % 2 == 0:
            style.add('BACKGROUND', (0, ri), (-1, ri), ROW_ALT)
    tbl.setStyle(style)
    return [tbl, Spacer(1, 3*mm)]


def make_bullet_list(items):
    """Build a bullet list flowable."""
    bullets = []
    for item in items:
        bullets.append(Paragraph(inline_format(item), STYLE_BULLET, bulletText='•'))
    return [ListFlowable(
        [ListItem(b, leftIndent=8*mm, value='•') for b in bullets],
        bulletType='bullet', start='•',
        leftIndent=8*mm,
    ), Spacer(1, 2*mm)]


# ----------------------------------------------------------------- parser
MD_PATH = '/home/user/BSF-Site/WEBSITE_CONTENT.md'
OUT_PATH = '/home/user/BSF-Site/WEBSITE_CONTENT.pdf'

with open(MD_PATH, encoding='utf-8') as fh:
    raw = fh.read()

lines = raw.split('\n')

flowables = []
i = 0
in_code_block = False
code_buf = []

# Title page
flowables.append(Spacer(1, 40*mm))
flowables.append(Paragraph('FBSF Website — Complete Content Document', STYLE_TITLE))
flowables.append(HRFlowable(width='100%', thickness=3, color=GREEN, spaceAfter=6*mm))
flowables.append(Paragraph(
    'Faculty of Business Studies and Finance, Wayamba University of Sri Lanka',
    STYLE_SUBTITLE))
flowables.append(Paragraph(
    f'Generated: {datetime.date.today().isoformat()}',
    STYLE_SUBTITLE))
flowables.append(Paragraph(
    'Source: verified site documentation (2023–2026)',
    STYLE_SUBTITLE))
flowables.append(Spacer(1, 30*mm))
flowables.append(Paragraph(
    'This document consolidates all verified content from the FBSF website, '
    'including site information, departments, academic programmes, publications, '
    'research symposia, announcements, FAQs, authorities, contacts, and quick links.',
    STYLE_BODY))
flowables.append(PageBreak())

# TOC
flowables.append(Paragraph('Table of Contents', STYLE_H1))
flowables.append(HRFlowable(width='100%', thickness=2, color=GREEN, spaceAfter=4*mm))
toc_entries = []
for line in lines:
    if line.startswith('## '):
        title = line[3:].strip()
        toc_entries.append(Paragraph(f'• {title}', STYLE_TOC_H1))
for e in toc_entries:
    flowables.append(e)
flowables.append(PageBreak())

# Body
i = 0
while i < len(lines):
    line = lines[i]

    # Skip the title/subtitle/TOC/appendix header lines that are in the markdown
    if line.startswith('# FBSF') or line.startswith('> Faculty') or line.startswith('> Consolidated'):
        i += 1
        continue
    if line.startswith('**Document generated:**') or line.startswith('---'):
        if line.startswith('**Document'):
            i += 1
            continue
        # horizontal rule
        flowables.append(HRFlowable(width='100%', thickness=0.5, color=BORDER, spaceBefore=2*mm, spaceAfter=2*mm))
        i += 1
        continue
    if line.startswith('## Table of Contents'):
        i += 1
        continue
    # Skip TOC links block (lines between "## Table of Contents" and "---")
    if re.match(r'\d+\.\s+\[', line):
        i += 1
        continue

    # Headings
    if line.startswith('### '):
        text = line[4:].strip()
        flowables.append(Paragraph(inline_format(text), STYLE_H3))
        i += 1
        continue
    if line.startswith('#### '):
        text = line[5:].strip()
        flowables.append(Paragraph(inline_format(text), STYLE_H4))
        i += 1
        continue
    if line.startswith('## '):
        text = line[3:].strip()
        flowables.append(Paragraph(inline_format(text), STYLE_H1))
        flowables.append(HRFlowable(width='100%', thickness=2, color=GREEN, spaceAfter=3*mm))
        i += 1
        continue
    if line.startswith('# '):
        text = line[2:].strip()
        flowables.append(Paragraph(inline_format(text), STYLE_H1))
        i += 1
        continue

    # Table detection
    if line.strip().startswith('|') and line.strip().endswith('|'):
        # gather table rows
        table_rows = []
        while i < len(lines) and lines[i].strip().startswith('|') and lines[i].strip().endswith('|'):
            row = lines[i].strip()
            # skip separator rows like |---|---|
            if not re.match(r'\|[\s\-:|]+\|', row):
                cells = [c.strip() for c in row.split('|')[1:-1]]
                table_rows.append(cells)
            i += 1
        if table_rows:
            flowables.extend(make_table(table_rows))
        continue

    # Blockquote
    if line.startswith('> '):
        text = line[2:].strip()
        flowables.append(Paragraph(inline_format(text), STYLE_BLOCKQUOTE))
        i += 1
        continue

    # Bullet list
    if line.strip().startswith('- '):
        bullets = []
        while i < len(lines) and lines[i].strip().startswith('- '):
            bullets.append(lines[i].strip()[2:].strip())
            i += 1
        flowables.extend(make_bullet_list(bullets))
        continue

    # Numbered list
    if re.match(r'^\d+\.\s', line.strip()):
        items = []
        while i < len(lines) and re.match(r'^\d+\.\s', lines[i].strip()):
            items.append(re.sub(r'^\d+\.\s', '', lines[i].strip()))
            i += 1
        flowables.extend(make_bullet_list(items))
        continue

    # Horizontal rule (---)
    if line.strip() == '---':
        flowables.append(HRFlowable(width='100%', thickness=0.5, color=BORDER, spaceBefore=3*mm, spaceAfter=3*mm))
        i += 1
        continue

    # Empty line
    if line.strip() == '':
        i += 1
        continue

    # Regular paragraph
    if line.strip():
        flowables.append(Paragraph(inline_format(line.strip()), STYLE_BODY))
        i += 1
        continue

    i += 1

# ----------------------------------------------------------------- build
def header_footer(canvas, doc):
    canvas.saveState()
    page_num = canvas.getPageNumber()
    if page_num == 1:
        canvas.restoreState()
        return
    # Footer
    canvas.setFont(FONT_REGULAR, 8)
    canvas.setFillColor(TEXT_SOFT)
    canvas.drawString(20*mm, 10*mm, 'FBSF Website — Complete Content Document')
    canvas.drawRightString(190*mm, 10*mm, f'Page {page_num}')
    # Top accent line
    canvas.setStrokeColor(GREEN)
    canvas.setLineWidth(2)
    canvas.line(20*mm, 282*mm, 190*mm, 282*mm)
    canvas.restoreState()


doc = SimpleDocTemplate(
    OUT_PATH,
    pagesize=A4,
    leftMargin=20*mm,
    rightMargin=20*mm,
    topMargin=25*mm,
    bottomMargin=18*mm,
    title='FBSF Website — Complete Content Document',
    author='FBSF Web Team',
    subject='Complete website content documentation',
)

doc.build(flowables, onFirstPage=header_footer, onLaterPages=header_footer)
print(f'written: {OUT_PATH}')
