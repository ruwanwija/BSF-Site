/**
 * FBSF Website — filters.js
 * Academic programme filtering (category, department, text search)
 * and publication filtering (journal) with searchable article listings
 */
(function () {
  'use strict';

  var D = window.FBSF_DATA;

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ------------------------------------------------------------------ */
  /* PROGRAMME FILTERING                                                 */
  /* ------------------------------------------------------------------ */
  var CATEGORIES = [
    { id: 'ug', label: 'Undergraduate' },
    { id: 'pg', label: 'Postgraduate' },
    { id: 'diploma', label: 'Diploma' },
    { id: 'higher-diploma', label: 'Higher Diploma' },
    { id: 'advanced-certificate', label: 'Advanced Certificate' },
    { id: 'external', label: 'External' }
  ];

  function programmeCard(p) {
    var deadlineBadge = '';
    if (p.deadline) {
      deadlineBadge =
        '<div class="badge badge--concluded"><svg class="icon"><use href="assets/icons/icons.svg#icon-clock"></use></svg>' +
        escapeHtml(p.deadline) + '</div>';
    }

    var meta = '';
    var duration = p.duration && !/Information not available/.test(p.duration) ? p.duration : null;
    var credits = p.credits && !/Information not available/.test(p.credits) ? p.credits : null;
    var fees = p.fees && !/Information not available/.test(p.fees) ? p.fees : null;

    if (duration) meta += '<div class="prog-meta-item"><svg class="icon"><use href="assets/icons/icons.svg#icon-clock"></use></svg><span><strong>Duration</strong>' + escapeHtml(duration) + '</span></div>';
    if (credits) meta += '<div class="prog-meta-item"><svg class="icon"><use href="assets/icons/icons.svg#icon-award"></use></svg><span><strong>Credits</strong>' + escapeHtml(credits) + '</span></div>';
    if (fees) meta += '<div class="prog-meta-item"><svg class="icon"><use href="assets/icons/icons.svg#icon-file"></use></svg><span><strong>Fees</strong>' + escapeHtml(fees) + '</span></div>';

    var tagsHtml = (p.tags || []).map(function (t) {
      if (t === 'internal') return '<span class="badge badge--navy">Internal</span>';
      if (t === 'external') return '<span class="badge badge--green">External</span>';
      if (t === 'weekend') return '<span class="badge badge--outline">Weekend classes</span>';
      if (t === 'second-year') return '<span class="badge badge--outline">2nd year</span>';
      return '<span class="badge badge--outline">' + escapeHtml(t) + '</span>';
    }).join('');

    var structureHtml = '';
    if (p.structure && p.structure.length) {
      structureHtml = '<div class="detail-block"><h4><svg class="icon"><use href="assets/icons/icons.svg#icon-book"></use></svg>Course Structure</h4><table class="course-table"><tbody>';
      p.structure.forEach(function (sem) {
        structureHtml += '<tr><th style="width:34%">' + escapeHtml(sem.semester) + '</th><td>' +
          sem.courses.map(escapeHtml).join('<br>') + '</td></tr>';
      });
      structureHtml += '</tbody></table></div>';
    }

    var entryHtml = '';
    if (p.entry && p.entry.length) {
      entryHtml = '<div class="detail-block"><h4><svg class="icon"><use href="assets/icons/icons.svg#icon-check"></use></svg>Entry Requirements</h4><ul class="detail-list">' +
        p.entry.map(function (e) { return '<li>' + escapeHtml(e) + '</li>'; }).join('') + '</ul></div>';
    }

    var highlightsHtml = '';
    if (p.highlights && p.highlights.length) {
      highlightsHtml = '<div class="detail-block"><h4><svg class="icon"><use href="assets/icons/icons.svg#icon-star"></use></svg>Why choose this programme</h4><ul class="detail-list">' +
        p.highlights.map(function (e) { return '<li>' + escapeHtml(e) + '</li>'; }).join('') + '</ul></div>';
    }

    var documentsHtml = '';
    if (p.documents && p.documents.length) {
      documentsHtml = '<div class="detail-block"><h4><svg class="icon"><use href="assets/icons/icons.svg#icon-download"></use></svg>Downloads</h4><ul class="detail-list">' +
        p.documents.map(function (e) { return '<li>' + escapeHtml(e) + ' — <a href="#" class="js-download-notice" data-file="' + escapeHtml(e) + '">request file</a></li>'; }).join('') + '</ul></div>';
    }

    return '' +
      '<article class="programme-card" id="' + p.id + '" data-category="' + p.category + '" data-dept="' + escapeHtml(p.departmentSlug) + '">' +
      '  <div class="prog-head">' +
      '    <div><h3>' + escapeHtml(p.name) + '</h3>' +
      '      <div class="prog-dept"><svg class="icon" style="width:14px;height:14px;display:inline;vertical-align:-2px;color:#339966"><use href="assets/icons/icons.svg#icon-building"></use></svg> ' + escapeHtml(p.department) + '</div>' +
      '    </div>' +
      deadlineBadge +
      '  </div>' +
      '  <div class="prog-tags">' + tagsHtml + '</div>' +
      '  <p class="prog-summary">' + escapeHtml(p.summary) + '</p>' +
      '  ' + meta +
      '  <details class="programme-detail">' +
      '    <summary><svg class="icon"><use href="assets/icons/icons.svg#icon-chevron-down"></use></svg></summary>' +
      '    <div class="detail-body">' +
      '      <div class="detail-block"><h4><svg class="icon"><use href="assets/icons/icons.svg#icon-info"></use></svg>Programme Description</h4><p>' + escapeHtml(p.description) + '</p></div>' +
      entryHtml +
      highlightsHtml +
      structureHtml +
      '      <div class="detail-block"><h4><svg class="icon"><use href="assets/icons/icons.svg#icon-info"></use></svg>Fees &amp; Payment</h4><p>' + (fees ? escapeHtml(fees) : 'Information not available in the source document.') + '</p></div>' +
      documentsHtml +
      '      <div class="detail-block"><h4><svg class="icon"><use href="assets/icons/icons.svg#icon-info"></use></svg>Application &amp; Contact</h4><p>' + escapeHtml(p.contact) + (p.deadline ? ' <strong>Deadline (as documented):</strong> ' + escapeHtml(p.deadline) : '') + '</p></div>' +
      '    </div>' +
      '  </details>' +
      '</article>';
  }

  function initProgrammes() {
    var grid = document.getElementById('programmeGrid');
    if (!grid || !D) return;

    /* Build filter bar */
    var catPills = document.getElementById('categoryPills');
    var deptSelect = document.getElementById('deptFilter');
    var progSearch = document.getElementById('programmeSearch');

    if (catPills) {
      catPills.innerHTML = '<button class="filter-pill active" data-cat="all">All</button>' +
        CATEGORIES.map(function (c) {
          return '<button class="filter-pill" data-cat="' + c.id + '">' + c.label + '</button>';
        }).join('');
    }
    if (deptSelect) {
      deptSelect.innerHTML = '<option value="all">All departments</option>' +
        D.DEPARTMENTS.map(function (dept) {
          return '<option value="' + dept.slug + '">' + escapeHtml(dept.name) + '</option>';
        }).join('');
    }

    var state = { cat: 'all', dept: 'all', q: '' };

    function apply() {
      var q = state.q.toLowerCase();
      var shown = 0;
      Array.prototype.forEach.call(grid.children, function (card) {
        var cat = card.getAttribute('data-category');
        var dept = card.getAttribute('data-dept');
        var hay = card.textContent.toLowerCase();
        /* 'external' category = programmes tagged as external (green badge) */
        var catOk = state.cat === 'all'
          ? true
          : state.cat === 'external'
            ? card.querySelector('.badge--green') !== null
            : cat === state.cat;
        var deptOk = state.dept === 'all' || dept === state.dept;
        var qOk = !q || hay.indexOf(q) !== -1;
        var ok = catOk && deptOk && qOk;
        card.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });

      var empty = document.getElementById('programmeEmpty');
      if (empty) empty.style.display = shown === 0 ? '' : 'none';
      var counter = document.getElementById('programmeCount');
      if (counter) counter.textContent = shown + ' programme' + (shown === 1 ? '' : 's');
    }

    if (catPills) {
      catPills.addEventListener('click', function (e) {
        var btn = e.target.closest('.filter-pill');
        if (!btn) return;
        catPills.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        state.cat = btn.getAttribute('data-cat');
        apply();
      });
    }
    if (deptSelect) {
      deptSelect.addEventListener('change', function () {
        state.dept = deptSelect.value;
        apply();
      });
    }
    if (progSearch) {
      progSearch.addEventListener('input', function () {
        state.q = progSearch.value;
        apply();
      });
    }

    grid.innerHTML = D.PROGRAMMES.map(programmeCard).join('');
    apply();

    /* Scroll to card when navigated from search/home */
    if (window.location.hash) {
      var el = document.getElementById(window.location.hash.slice(1));
      if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 200);
    }
  }

  /* ------------------------------------------------------------------ */
  /* PUBLICATION FILTERING                                              */
  /* ------------------------------------------------------------------ */
  function initPublications() {
    var grid = document.getElementById('publicationGrid');
    if (!grid || !D) return;

    var tabs = document.getElementById('journalTabs');
    var articleSearch = document.getElementById('articleSearch');
    var articleBox = document.getElementById('articleResults');
    var articleCount = document.getElementById('articleCount');

    if (tabs) {
      tabs.innerHTML = '<button class="filter-pill active" data-journal="all">All journals</button>' +
        D.PUBLICATIONS.map(function (p) {
          return '<button class="filter-pill" data-journal="' + p.abbr + '">' + p.abbr + '</button>';
        }).join('');
    }

    function pubCard(p) {
      var issues = (p.issues || []).slice(0, 4).map(function (i) {
        return '<span class="issue-chip">' + escapeHtml(i) + '</span>';
      }).join('');
      var moreIssues = (p.issues && p.issues.length > 4)
        ? '<span class="issue-chip">+' + (p.issues.length - 4) + ' more</span>' : '';

      var issn = p.issn && !/Information not available/.test(p.issn) ? p.issn : null;

      return '' +
        '<article class="pub-card" id="pub-' + p.abbr + '">' +
        '  <div class="pub-head">' +
        '    <div><h3>' + escapeHtml(p.name) + '</h3><span class="pub-abbr">' + escapeHtml(p.type) + '</span></div>' +
        '  </div>' +
        '  <div class="pub-meta">' +
        (issn ? '<div><strong>ISSN</strong>' + escapeHtml(issn) + '</div>' : '') +
        '    <div><strong>Frequency</strong>' + escapeHtml(p.frequency) + '</div>' +
        '    <div style="grid-column:1/-1"><strong>Published by</strong>' + escapeHtml(p.publisher) + '</div>' +
        '  </div>' +
        '  <p class="pub-desc">' + escapeHtml(p.description) + '</p>' +
        '  <h4 style="font-size:13.5px;margin:0 0 8px;color:#6b6b6b;text-transform:uppercase;letter-spacing:.06em">Issues</h4>' +
        '  <div class="issue-chips" style="margin-bottom:16px">' + issues + moreIssues + '</div>' +
        '  <div class="card-foot">' +
        '    <span class="badge badge--green">Latest: ' + escapeHtml(p.latestIssue || 'Information not available') + '</span>' +
        (p.submission ? '<span class="badge badge--outline" style="max-width:100%">Submission: ' + escapeHtml(p.submission.slice(0, 110)) + (p.submission.length > 110 ? '…' : '') + '</span>' : '') +
        '  </div>' +
        '</article>';
    }

    grid.innerHTML = D.PUBLICATIONS.map(pubCard).join('');

    if (tabs) {
      tabs.addEventListener('click', function (e) {
        var btn = e.target.closest('.filter-pill');
        if (!btn) return;
        tabs.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var journal = btn.getAttribute('data-journal');
        Array.prototype.forEach.call(grid.children, function (card) {
          var id = card.id.replace('pub-', '');
          card.style.display = (journal === 'all' || id === journal) ? '' : 'none';
        });
      });
    }

    /* Article search */
    function renderArticles(query) {
      if (!articleBox) return;
      var q = (query || '').toLowerCase().trim();
      var results = [];
      D.PUBLICATIONS.forEach(function (p) {
        p.articles.forEach(function (art) {
          if (!q || (art.title + ' ' + art.authors + ' ' + art.issue + ' ' + p.abbr).toLowerCase().indexOf(q) !== -1) {
            results.push({ pub: p, art: art });
          }
        });
      });
      if (articleCount) articleCount.textContent = results.length + ' article' + (results.length === 1 ? '' : 's');
      articleBox.innerHTML = results.length
        ? results.map(function (r) {
          return '<li class="article-item">' +
            '<span class="article-issue">' + escapeHtml(r.art.issue) + ' · ' + escapeHtml(r.pub.abbr) + '</span>' +
            '<h4>' + escapeHtml(r.art.title) + '</h4>' +
            '<p>' + escapeHtml(r.art.authors) + '</p>' +
            '</li>';
        }).join('')
        : '<li class="article-item" style="border-style:dashed"><p style="margin:0">No articles match your search.</p></li>';
    }

    if (articleSearch) {
      articleSearch.addEventListener('input', function () { renderArticles(articleSearch.value); });
      renderArticles('');
    }

    if (window.location.hash) {
      var el = document.getElementById(window.location.hash.slice(1));
      if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 200);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initProgrammes();
    initPublications();
  });
})();
