// Comportamiento de la web: menú móvil, apariciones al hacer scroll y sección actual en la navegación.
// Se carga como módulo desde Layout.astro.

function init() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menú móvil ---------- */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger && menu) {
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    menu.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMenu(false); burger.focus(); } });
  }

  /* ---------- Revelado al entrar en pantalla ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); revealIO.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { revealIO.observe(el); });
  }

  /* ---------- Sección actual en la navegación ---------- */
  var navLinks = document.body.classList.contains('is-home') ? document.querySelectorAll('.main-nav > a.nav-item') : [];
  if ('IntersectionObserver' in window) {
    var byId = {};
    navLinks.forEach(function (a) { var h = a.getAttribute('href') || ''; var i = h.indexOf('#'); if (i >= 0) byId[h.slice(i + 1)] = a; });
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = byId[entry.target.id];
        if (link) link.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main > section, body > footer').forEach(function (s) { navIO.observe(s); });
  }
}

init();
