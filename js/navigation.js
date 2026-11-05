/**
 * FBSF Website — navigation.js
 * Responsive navigation, mobile menu, dropdowns, active link highlighting
 */
(function () {
  'use strict';

  function init() {
    var navToggle = document.querySelector('.nav-toggle');
    var mainNav = document.querySelector('.main-nav');

    /* Mobile menu toggle */
    if (navToggle && mainNav) {
      navToggle.addEventListener('click', function () {
        var isOpen = mainNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        renderIcon(navToggle, isOpen);
      });

      /* Close on link click (mobile) */
      mainNav.addEventListener('click', function (e) {
        if (e.target.closest('a') && window.innerWidth <= 900) {
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
          renderIcon(navToggle, false);
        }
      });

      /* Close on Escape */
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
          renderIcon(navToggle, false);
        }
      });

      /* Reset state on resize to desktop */
      window.addEventListener('resize', function () {
        if (window.innerWidth > 900 && mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
          renderIcon(navToggle, false);
        }
      });
    }

    /* Active link highlighting based on current page */
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var target = href.split('/').pop();
      if (target === path || (path === '' && target === 'index.html')) {
        link.classList.add('active');
      }
    });

    /* Make mobile dropdown toggle work (aria-expanded on button) */
    document.querySelectorAll('.nav-dropdown-toggle').forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          var parent = toggle.closest('.nav-dropdown');
          var dropdown = parent && parent.querySelector('ul');
          var open = dropdown ? dropdown.style.display === 'flex' : false;
          if (dropdown) {
            dropdown.style.display = open ? '' : 'flex';
          }
        }
      });
    });
  }

  function renderIcon(button, menuOpen) {
    var use = button.querySelector('use');
    if (use) {
      use.setAttribute('href', menuOpen ? 'assets/icons/icons.svg#icon-close' : 'assets/icons/icons.svg#icon-menu');
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
