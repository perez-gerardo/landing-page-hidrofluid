import { initBuscador } from './buscar.js';
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

  initBuscador();

  /* ---------- Portada: cambia de imagen sola ---------- */
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroDots = document.querySelectorAll('.hero-dot');
  if (heroSlides.length > 1) {
    var actual = 0;
    var DURACION = 6000;
    var timer = null;
    function mostrar(n) {
      heroSlides[actual].classList.remove('is-on');
      heroDots[actual] && heroDots[actual].classList.remove('is-on');
      actual = (n + heroSlides.length) % heroSlides.length;
      var img = heroSlides[actual];
      if (img.loading === 'lazy') img.loading = 'eager';
      img.classList.add('is-on');
      heroDots[actual] && heroDots[actual].classList.add('is-on');
    }
    function iniciar() { if (!reduceMotion && !timer) timer = setInterval(function () { mostrar(actual + 1); }, DURACION); }
    function parar() { clearInterval(timer); timer = null; }
    heroDots.forEach(function (d, i) {
      d.addEventListener('mouseenter', function () { parar(); mostrar(i); });
      d.addEventListener('focus', function () { parar(); mostrar(i); });
      d.addEventListener('mouseleave', iniciar);
    });
    // precarga las siguientes cuando el navegador está libre
    setTimeout(function () { heroSlides.forEach(function (im) { im.loading = 'eager'; }); }, 2500);
    document.addEventListener('visibilitychange', function () { document.hidden ? parar() : iniciar(); });
    iniciar();
  }

  /* ---------- Carrusel de equipos ---------- */
  document.querySelectorAll('[data-carrusel]').forEach(function (car) {
    var track = car.querySelector('.carrusel-track');
    var prev = car.querySelector('[data-dir="-1"]');
    var next = car.querySelector('[data-dir="1"]');
    function estado() {
      prev.disabled = track.scrollLeft < 8;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    }
    function mover(d) { track.scrollBy({ left: d * Math.max(track.clientWidth * 0.8, 280), behavior: reduceMotion ? 'auto' : 'smooth' }); }
    prev.addEventListener('click', function () { mover(-1); });
    next.addEventListener('click', function () { mover(1); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(estado); }, { passive: true });
    estado();
  });

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
