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
    // Catering enquiries are emailed to the owner via FormSubmit (no backend needed).
    var ENDPOINT = 'https://formsubmit.co/ajax/ekrem.157@gmail.com';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var f = form.elements;
      var shop = f['shop'].value;
      var payload = {
        shop: shop,
        name: f['name'].value,
        email: f['email'].value,
        phone: f['phone'].value,
        people: f['people'].value,
        date: f['date'].value,
        message: f['message'].value,
        _subject: 'Catering enquiry (' + shop + ') — Eat Istanbul website',
        _template: 'table',
        _captcha: 'false'
      };
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      note.textContent = 'Sending your enquiry…';
      note.className = 'form-note';
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && (res.success === 'true' || res.success === true)) {
            form.reset();
            note.textContent = 'Thanks! Your catering enquiry for ' + shop + ' has been sent — we\'ll be in touch shortly.';
            note.className = 'form-note ok';
          } else { throw new Error('failed'); }
        })
        .catch(function () {
          note.innerHTML = 'Sorry, that didn\'t send. Please call us on <a href="tel:+61424996666">0424 996 666</a> and we\'ll sort your catering.';
          note.className = 'form-note err';
        })
        .then(function () { btn.disabled = false; });
    });
  }
})();
