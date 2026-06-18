/* Pulse landing — i18n toggle, scroll reveal, SideStore source helper */
(function () {
  'use strict';

  const STORE_KEY = 'pulse-lang';

  /* ---------- Language ---------- */
  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-fr', lang === 'fr');
    document.body.classList.toggle('lang-en', lang === 'en');

    document.querySelectorAll('[data-fr][data-en]').forEach((el) => {
      const val = el.getAttribute('data-' + lang);
      if (val == null) return;
      if (el.tagName === 'META') {
        el.setAttribute('content', val);
      } else {
        el.innerHTML = val;
      }
    });

    document.querySelectorAll('.lang-toggle button').forEach((b) => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
  }

  function initLang() {
    let lang;
    try { lang = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (!lang) {
      lang = (navigator.language || 'fr').toLowerCase().startsWith('en') ? 'en' : 'fr';
    }
    applyLang(lang);

    document.querySelectorAll('.lang-toggle button').forEach((b) => {
      b.addEventListener('click', () => applyLang(b.dataset.lang));
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const targets = document.querySelectorAll('.card, .showcase-row, .dl-card, .section-head, .onboarding-copy, .onboarding-shot');
    targets.forEach((t) => t.classList.add('reveal'));

    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach((t) => io.observe(t));
  }

  /* ---------- SideStore source: copy URL to clipboard ---------- */
  function initSideStore() {
    const btn = document.getElementById('sidestore-btn');
    if (!btn) return;
    const url = btn.getAttribute('href');
    btn.addEventListener('click', (ev) => {
      if (!navigator.clipboard) return; // let the link open normally
      ev.preventDefault();
      navigator.clipboard.writeText(url).then(() => {
        const span = btn.querySelector('.i18n') || btn;
        const original = span.innerHTML;
        const lang = document.documentElement.lang;
        span.innerHTML = lang === 'en' ? 'Source URL copied ✓' : 'URL de la source copiée ✓';
        setTimeout(() => { span.innerHTML = original; }, 2200);
      }).catch(() => { window.open(url, '_blank'); });
    });
  }

  /* ---------- Year ---------- */
  function initYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initReveal();
    initSideStore();
    initYear();
  });
})();
