/* Eat Istanbul — site interactions */
(function () {
  'use strict';

  /* ---- header background on scroll ---- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      mobileMenu.hidden = open;
    });
    mobileMenu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      }
    });
  }

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- footer year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- catering form (graceful submit) ---- */
  var form = document.getElementById('cateringForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      // If Formspree isn't configured yet, fall back to a mailto so no enquiry is lost.
      var notConfigured = form.action.indexOf('your-form-id') !== -1;
      if (notConfigured) {
        e.preventDefault();
        var data = new FormData(form);
        var body = encodeURIComponent(
          'Name: ' + (data.get('name') || '') + '\n' +
          'Email: ' + (data.get('email') || '') + '\n' +
          'Phone: ' + (data.get('phone') || '') + '\n' +
          'People: ' + (data.get('people') || '') + '\n' +
          'Date: ' + (data.get('date') || '') + '\n\n' +
          (data.get('message') || '')
        );
        window.location.href = 'mailto:hello@eatistanbul.com.au'
          + '?subject=' + encodeURIComponent('Catering enquiry — website')
          + '&body=' + body;
        if (note) { note.textContent = 'Opening your email app to send the enquiry…'; note.className = 'form-note ok'; }
      }
    });
  }
})();
