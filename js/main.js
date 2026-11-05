/**
 * FBSF Website — main.js
 * Shared behaviours: announcements rendering, download notices,
 * back-to-top, footer year, notice banner, page-level rendering helpers
 */
(function () {
  'use strict';

  var D = window.FBSF_DATA;

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function iconUse(name, cls) {
    return '<svg class="icon ' + (cls || '') + '"><use href="assets/icons/icons.svg#' + name + '"></use></svg>';
  }

  /* ------------------------------------------------------------------ */
  /* Announcements (home + events pages)                                 */
  /* ------------------------------------------------------------------ */
  var TYPE_ICONS = {
    programme: 'icon-graduation',
    symposium: 'icon-calendar',
    publication: 'icon-journal',
    event: 'icon-megaphone'
  };

  function announcementCard(a) {
    return '' +
      '<div class="announcement-card">' +
      '  <div class="icon-box">' + iconUse(TYPE_ICONS[a.type] || 'icon-info') + '</div>' +
      '  <div>' +
      '    <div class="event-top">' +
      '      <span class="badge badge--concluded">Concluded — for reference</span>' +
      '      <span class="badge badge--outline">' + escapeHtml(a.date) + '</span>' +
      '    </div>' +
      '    <h3>' + escapeHtml(a.title) + '</h3>' +
      '    <p>' + escapeHtml(a.body) + '</p>' +
      '  </div>' +
      '</div>';
  }

  function initAnnouncements() {
    var home = document.getElementById('announcementList');
    if (home && D) home.innerHTML = D.ANNOUNCEMENTS.slice(0, 6).map(announcementCard).join('');

    var all = document.getElementById('announcementListAll');
    if (all && D) all.innerHTML = D.ANNOUNCEMENTS.map(announcementCard).join('');
  }

  /* ------------------------------------------------------------------ */
  /* Events page — symposia + events cards                               */
  /* ------------------------------------------------------------------ */
  function sympCard(s) {
    var dateRows = s.dates.map(function (d) {
      return '<li><span class="tl-date">' + escapeHtml(d.date) + '</span> — <span class="tl-label">' + escapeHtml(d.label) + '</span></li>';
    }).join('');

    var tracks = s.tracks.map(function (t) { return '<span class="track-chip">' + escapeHtml(t) + '</span>'; }).join('');

    var downloads = (s.downloads || []).map(function (dl) {
      return '<button class="btn btn--outline btn--sm js-download-notice" data-file="' + escapeHtml(dl) + '">' + iconUse('icon-download') + escapeHtml(dl) + '</button>';
    }).join('');

    var proceedings = (s.proceedings || []).map(function (pp) {
      return '<button class="btn btn--outline btn--sm js-download-notice" data-file="' + escapeHtml(pp) + '">' + iconUse('icon-download') + escapeHtml(pp) + '</button>';
    }).join('');

    var committee = s.committee.map(function (c) {
      return '<li><span class="role">' + escapeHtml(c.role) + '</span><span>' + escapeHtml(c.name) + (c.contact ? ' — ' + escapeHtml(c.contact) : '') + '</span></li>';
    }).join('');

    return '' +
      '<div class="symp-card" id="symp-' + s.id + '">' +
      '  <div class="symp-banner">' +
      '    <div class="symp-abbr">Research Symposium</div>' +
      '    <h3>' + escapeHtml(s.name) + '</h3>' +
      '    <p class="symp-theme">"' + escapeHtml(s.theme) + '"</p>' +
      '    <span class="badge badge--concluded" style="margin-top:12px">Concluded — archived for reference</span>' +
      '  </div>' +
      '  <div class="symp-body">' +
      '    <h4>About</h4>' +
      '    <p>' + escapeHtml(s.description) + '</p>' +
      '    <h4>Conference Tracks</h4>' +
      '    <div class="track-chips">' + tracks + '</div>' +
      '    <h4>Important Dates</h4>' +
      '    <ul class="timeline" style="margin-top:0">' + dateRows + '</ul>' +
      '    <h4>Keynote Speaker</h4>' +
      '    <div class="keynote-card">' + iconUse('icon-star') +
      '      <div><strong>' + escapeHtml(s.keynote.name) + '</strong><span>' + escapeHtml(s.keynote.details) + '</span></div>' +
      '    </div>' +
      '    <h4>Organizing Committee</h4>' +
      '    <ul class="committee-list">' + committee + '</ul>' +
      '    <h4>Submissions &amp; Downloads</h4>' +
      '    <p style="font-size:14px">' + escapeHtml(s.submission) + '</p>' +
      '    <div class="card-foot" style="margin-top:10px">' + downloads + proceedings + '</div>' +
      '  </div>' +
      '</div>';
  }

  function eventCard(e) {
    return '' +
      '<div class="event-card is-concluded">' +
      '  <div class="event-top">' +
      '    <span class="badge badge--concluded">Archived</span>' +
      '    <span class="event-date">' + iconUse('icon-calendar') + escapeHtml(e.date) + '</span>' +
      '  </div>' +
      '  <h3>' + escapeHtml(e.title) + '</h3>' +
      '  <p>' + escapeHtml(e.body) + '</p>' +
      '  <div class="event-foot">' +
      '    <span class="badge badge--navy">' + escapeHtml(e.type === 'symposium' ? 'Symposium' : e.type === 'programme' ? 'Programme Application' : e.type === 'publication' ? 'Journal' : 'Event') + '</span>' +
      '  </div>' +
      '</div>';
  }

  function initEvents() {
    var sympGrid = document.getElementById('symposiumGrid');
    if (sympGrid && D) sympGrid.innerHTML = D.SYMPOSIA.map(sympCard).join('');

    var eventGrid = document.getElementById('eventGrid');
    if (eventGrid && D) eventGrid.innerHTML = D.ANNOUNCEMENTS.map(eventCard).join('');
  }

  /* ------------------------------------------------------------------ */
  /* Download notices (files were not bundled with the source material) */
  /* ------------------------------------------------------------------ */
  function initDownloads() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.js-download-notice');
      if (btn) {
        e.preventDefault();
        showNotice('Document not bundled',
          'The file <strong>' + escapeHtml(btn.getAttribute('data-file')) + '</strong> is referenced in the faculty\u2019s published documentation but was not included in the source material provided for this website. Request the document through the faculty office: <a href="mailto:bsfoffice@wyb.ac.lk">bsfoffice@wyb.ac.lk</a> (Tel +94 37 228 4215).');
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Notice modal (lightweight)                                          */
  /* ------------------------------------------------------------------ */
  function ensureNoticeStyles() {
    if (document.getElementById('noticeModalStyles')) return;
    var style = document.createElement('style');
    style.id = 'noticeModalStyles';
    style.textContent =
      '.notice-modal{position:fixed;inset:0;z-index:210;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(13,24,46,.6);backdrop-filter:blur(4px);opacity:0;visibility:hidden;transition:opacity .2s,visibility .2s}' +
      '.notice-modal.open{opacity:1;visibility:visible}' +
      '.notice-modal-inner{width:100%;max-width:520px;background:#fff;border-radius:16px;box-shadow:0 24px 64px rgba(13,24,46,.35);padding:28px 30px;transform:translateY(10px);transition:transform .2s}' +
      '.notice-modal.open .notice-modal-inner{transform:translateY(0)}' +
      '.notice-modal h3{font-size:19px;color:#16294a;margin:0 0 10px;display:flex;align-items:center;gap:10px}' +
      '.notice-modal h3 svg{width:22px;height:22px;color:#b0873c}' +
      '.notice-modal p{font-size:14.5px;color:#6b6b6b;margin:0 0 22px}' +
      '.notice-modal .notice-modal-actions{display:flex;justify-content:flex-end}';
    document.head.appendChild(style);
  }

  function showNotice(title, html) {
    ensureNoticeStyles();
    document.getElementById('noticeHost').innerHTML =
      '<div class="notice-modal open" id="noticeModal" role="dialog" aria-modal="true">' +
      '  <div class="notice-modal-inner">' +
      '    <h3>' + iconUse('icon-alert') + escapeHtml(title) + '</h3>' +
      '    <p>' + html + '</p>' +
      '    <div class="notice-modal-actions"><button class="btn btn--navy btn--sm" id="noticeClose">OK, understood</button></div>' +
      '  </div>' +
      '</div>';
    var close = function () {
      var host = document.getElementById('noticeHost');
      if (host) host.innerHTML = '';
      document.body.style.overflow = '';
    };
    document.getElementById('noticeClose').addEventListener('click', close);
    document.getElementById('noticeModal').addEventListener('click', function (e) {
      if (e.target === e.currentTarget) close();
    });
    document.body.style.overflow = 'hidden';
  }

  /* ------------------------------------------------------------------ */
  /* Back to top + footer year + smooth anchors                          */
  /* ------------------------------------------------------------------ */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 420) btn.classList.add('visible');
      else btn.classList.remove('visible');
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initFooter() {
    var yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------ */
  /* Contact form (frontend demonstration only)                         */
  /* ------------------------------------------------------------------ */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.getElementById('formSuccess');
      if (success) {
        success.classList.add('visible');
        form.reset();
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function () { success.classList.remove('visible'); }, 8000);
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* FAQ accordion stats / smooth scroll for hash links                 */
  /* ------------------------------------------------------------------ */
  function initHashAnchors() {
    if (window.location.hash) {
      var el = document.querySelector(window.location.hash);
      if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 250);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Home page rendering: stats, dean portrait fallback                 */
  /* ------------------------------------------------------------------ */
  function initHome() {
    var statEls = document.querySelectorAll('[data-count]');
    statEls.forEach(function (el) {
      var val = el.getAttribute('data-count');
      el.textContent = val;
    });

    /* Announcements count strip */
    var latestEl = document.getElementById('latestAnnouncement');
    if (latestEl && D && D.ANNOUNCEMENTS.length) {
      latestEl.innerHTML = '<strong>' + escapeHtml(D.ANNOUNCEMENTS[0].title) + '</strong><span>' + escapeHtml(D.ANNOUNCEMENTS[0].body.slice(0, 120) + (D.ANNOUNCEMENTS[0].body.length > 120 ? '…' : '')) + '</span>';
    }
  }

  /* ------------------------------------------------------------------ */
  /* FAQ rendering (contact page)                                        */
  /* ------------------------------------------------------------------ */
  function initFaqs() {
    var list = document.getElementById('faqList');
    if (!list || !D) return;
    list.innerHTML = D.FAQS.map(function (f) {
      return '<details class="faq-item"><summary>' + escapeHtml(f.q) +
        '<svg class="icon"><use href="assets/icons/icons.svg#icon-plus"></use></svg></summary>' +
        '<div class="faq-answer">' + escapeHtml(f.a) + '</div></details>';
    }).join('');
  }

  /* ------------------------------------------------------------------ */
  function init() {
    initAnnouncements();
    initEvents();
    initDownloads();
    initBackToTop();
    initFooter();
    initContactForm();
    initHashAnchors();
    initHome();
    initFaqs();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
