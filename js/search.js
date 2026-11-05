/**
 * FBSF Website — search.js
 * Global site search across faculty content (client-side only)
 *
 * Covers: pages, departments, programmes, publications, journal articles,
 * symposia, events/announcements and FAQs.
 */
(function () {
  'use strict';

  var INDEX = [];

  function pageEntry(title, desc, href, keywords) {
    INDEX.push({ type: 'page', typeLabel: 'Page', title: title, desc: desc, href: href, keywords: keywords || '' });
  }

  function buildIndex() {
    var D = window.FBSF_DATA;
    if (!D) return;

    pageEntry('Home', 'Faculty home page — vision, mission, departments, programmes, research highlights', 'index.html');
    pageEntry('About the Faculty', 'History, establishment, vision, mission, Dean\u2019s message and institutional information', 'about.html', 'history established gazette dean');
    pageEntry('Departments', 'Overview of the four academic departments', 'departments.html');
    pageEntry('Academic Programmes', 'Undergraduate, postgraduate, diploma, higher diploma, advanced certificate and external programmes', 'programmes.html', 'degree diploma mba pgdbm fees admission');
    pageEntry('Research & Publications', 'Faculty research portal — symposia and publication outlets', 'research.html');
    pageEntry('Publications', 'Journals and magazines with issues, articles and submission guidelines', 'publications.html', 'journal issn submission editorial');
    pageEntry('Events', 'Research symposia, conferences, announcements and calls for papers', 'events.html', 'conference symposium call papers dates');
    pageEntry('Authorities & Quality Assurance', 'Faculty Quality Assurance Cell (FQAC), department QA units, committees and useful links', 'authorities.html', 'fqac quality assurance committee senate');
    pageEntry('Contact', 'Faculty and department contact information and enquiry form', 'contact.html');

    D.DEPARTMENTS.forEach(function (dept) {
      INDEX.push({
        type: 'department', typeLabel: 'Department',
        title: dept.name, desc: dept.tagline + ' — ' + dept.intro.slice(0, 150) + '...',
        href: 'departments/' + dept.slug + '.html',
        keywords: dept.vision + ' ' + dept.mission + ' ' + dept.short
      });
    });

    D.PROGRAMMES.forEach(function (p) {
      INDEX.push({
        type: 'programme', typeLabel: 'Programme',
        title: p.name,
        desc: (p.summary || '') + ' — ' + p.department + '. ' + (p.duration || ''),
        href: 'programmes.html#' + p.id,
        keywords: p.department + ' ' + (p.tags || []).join(' ') + ' ' + (p.credits || '') + ' ' + (p.fees || '') + ' ' + (p.entry || []).join(' ')
      });
    });

    D.PUBLICATIONS.forEach(function (pub) {
      INDEX.push({
        type: 'publication', typeLabel: 'Publication',
        title: pub.name,
        desc: pub.description.slice(0, 160) + '...',
        href: 'publications.html#pub-' + pub.abbr,
        keywords: pub.abbr + ' ' + pub.publisher + ' ' + pub.frequency + ' ' + (pub.issn || '') + ' ' + (pub.submission || '')
      });
      pub.articles.forEach(function (art) {
        INDEX.push({
          type: 'article', typeLabel: 'Article',
          title: art.title,
          desc: art.authors + ' — ' + pub.name + ', ' + art.issue,
          href: 'publications.html#pub-' + pub.abbr,
          keywords: art.authors + ' ' + art.issue + ' ' + pub.abbr
        });
      });
    });

    D.SYMPOSIA.forEach(function (symp) {
      INDEX.push({
        type: 'symposium', typeLabel: 'Symposium',
        title: symp.full + ' — ' + symp.theme,
        desc: symp.description.slice(0, 150) + '...',
        href: 'events.html#symp-' + symp.id,
        keywords: symp.organiser + ' ' + symp.tracks.join(' ') + ' ' + symp.keynote.name + ' ' + symp.committee.map(function (c) { return c.name; }).join(' ')
      });
    });

    D.ANNOUNCEMENTS.forEach(function (a) {
      INDEX.push({
        type: 'announcement', typeLabel: 'Announcement',
        title: a.title, desc: a.body.slice(0, 160) + '...',
        href: 'events.html#announcements',
        keywords: a.type + ' ' + a.date + ' ' + a.body
      });
    });

    D.FAQS.forEach(function (f) {
      INDEX.push({
        type: 'faq', typeLabel: 'FAQ',
        title: f.q, desc: f.a.slice(0, 150) + '...',
        href: 'contact.html#faq',
        keywords: f.q + ' ' + f.a
      });
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function highlight(text, terms) {
    var safe = escapeHtml(text);
    terms.forEach(function (t) {
      if (!t) return;
      var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      safe = safe.replace(re, '<mark>$1</mark>');
    });
    return safe;
  }

  function search(query) {
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    var scored = [];
    INDEX.forEach(function (entry) {
      var hay = (entry.title + ' ' + entry.desc + ' ' + (entry.keywords || '')).toLowerCase();
      var score = 0;
      terms.forEach(function (t) {
        if (entry.title.toLowerCase().indexOf(t) !== -1) score += 10;
        if (hay.indexOf(t) !== -1) score += 3;
        if (entry.keywords && entry.keywords.toLowerCase().indexOf(t) !== -1) score += 1;
      });
      if (score > 0) scored.push({ entry: entry, score: score });
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, 24).map(function (s) { return s.entry; });
  }

  function renderResults(query) {
    var resultsBox = document.getElementById('searchResults');
    var count = document.getElementById('searchResultCount');
    if (!resultsBox) return;

    if (!query.trim()) {
      resultsBox.innerHTML = '';
      if (count) count.textContent = '';
      return;
    }

    var results = search(query);
    if (count) count.textContent = results.length + ' result' + (results.length === 1 ? '' : 's');

    if (!results.length) {
      resultsBox.innerHTML =
        '<div class="search-no-results">' +
        '<svg class="icon" style="width:40px;height:40px;color:#b6bec9"><use href="assets/icons/icons.svg#icon-search"></use></svg>' +
        '<p>No matching content found. Try a different keyword such as <strong>programme</strong>, <strong>journal</strong>, <strong>fees</strong> or <strong>admission</strong>.</p>' +
        '</div>';
      return;
    }

    var html = '';
    results.forEach(function (entry) {
      html +=
        '<a class="search-result" href="' + entry.href + '" data-close-search>' +
        '<span class="search-result-type">' + entry.typeLabel + '</span>' +
        '<strong>' + highlight(entry.title, query.toLowerCase().split(/\s+/).filter(Boolean)) + '</strong>' +
        '<span class="search-result-desc">' + highlight(entry.desc, query.toLowerCase().split(/\s+/).filter(Boolean)) + '</span>' +
        '</a>';
    });
    resultsBox.innerHTML = html;
  }

  function openModal() {
    var modal = document.getElementById('searchModal');
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var input = document.getElementById('searchInput');
    if (input) { input.value = ''; renderResults(''); input.focus(); }
  }

  function closeModal() {
    var modal = document.getElementById('searchModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function injectModalStyles() {
    var style = document.createElement('style');
    style.textContent =
      '.search-modal{position:fixed;inset:0;z-index:200;display:flex;align-items:flex-start;justify-content:center;padding:9vh 20px 20px;background:rgba(13,24,46,0.6);backdrop-filter:blur(4px);opacity:0;visibility:hidden;transition:opacity .2s,visibility .2s}' +
      '.search-modal.open{opacity:1;visibility:visible}' +
      '.search-modal-inner{width:100%;max-width:640px;background:#fff;border-radius:16px;box-shadow:0 24px 64px rgba(13,24,46,.35);overflow:hidden;transform:translateY(12px);transition:transform .2s}' +
      '.search-modal.open .search-modal-inner{transform:translateY(0)}' +
      '.search-modal-top{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid #e6e6e6}' +
      '.search-modal-top svg{width:20px;height:20px;color:#6b6b6b;flex-shrink:0}' +
      '.search-modal-top input{flex:1;border:none;font-size:16px;font-family:inherit;color:#2b2f36;outline:none;background:transparent}' +
      '.search-modal-top .search-close{border:none;background:#f5f7fa;color:#6b6b6b;width:34px;height:34px;border-radius:8px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:background .2s,color .2s}' +
      '.search-modal-top .search-close:hover{background:#eef2f7;color:#161616}' +
      '#searchResults{max-height:56vh;overflow-y:auto;padding:10px}' +
      '#searchResultCount{padding:8px 14px;font-size:12.5px;color:#6b6b6b;border-bottom:1px solid #eef2f7}' +
      '.search-result{display:flex;flex-direction:column;gap:2px;padding:12px 14px;border-radius:10px;color:#2b2f36;transition:background .15s}' +
      '.search-result:hover{background:#f5f7fa}' +
      '.search-result-type{font-family:"Poppins",sans-serif;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#339966;margin-bottom:2px}' +
      '.search-result strong{font-size:15px;color:#161616;font-weight:600}' +
      '.search-result-desc{font-size:13.5px;color:#6b6b6b}' +
      'mark{background:#ffe9a8;color:#161616;border-radius:3px;padding:0 1px}' +
      '.search-no-results{text-align:center;padding:40px 20px;color:#6b6b6b;display:flex;flex-direction:column;align-items:center;gap:12px}';
    document.head.appendChild(style);
  }

  function injectModalMarkup() {
    var host = document.getElementById('searchModalHost');
    if (!host) return;
    host.innerHTML =
      '<div class="search-modal" id="searchModal" role="dialog" aria-modal="true" aria-label="Site search" aria-hidden="true">' +
      '  <div class="search-modal-inner">' +
      '    <div class="search-modal-top">' +
      '      <svg class="icon"><use href="assets/icons/icons.svg#icon-search"></use></svg>' +
      '      <input id="searchInput" type="search" placeholder="Search the faculty website — programmes, journals, events..." autocomplete="off" aria-label="Search query">' +
      '      <button class="search-close" id="searchClose" aria-label="Close search">×</button>' +
      '    </div>' +
      '    <div id="searchResultCount"></div>' +
      '    <div id="searchResults"></div>' +
      '  </div>' +
      '</div>';

    var input = document.getElementById('searchInput');
    input.addEventListener('input', function () { renderResults(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
    document.getElementById('searchClose').addEventListener('click', closeModal);
    document.getElementById('searchModal').addEventListener('click', function (e) {
      if (e.target === e.currentTarget) closeModal();
    });
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-close-search]')) closeModal();
    });
  }

  function init() {
    buildIndex();
    injectModalStyles();
    injectModalMarkup();

    var btn = document.getElementById('searchButton');
    if (btn) btn.addEventListener('click', openModal);

    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        var modal = document.getElementById('searchModal');
        if (modal && modal.classList.contains('open')) closeModal(); else openModal();
      }
      if (e.key === '/' && !/input|textarea|select/i.test((document.activeElement || {}).tagName || '')) {
        e.preventDefault();
        openModal();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
