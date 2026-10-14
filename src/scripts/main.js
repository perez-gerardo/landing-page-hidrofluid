// Comportamiento de la landing: menú, apariciones, tagline, navegación activa y formulario.
// Se carga como módulo desde Layout.astro.

function init() {
  var formEl = document.getElementById('form-cotizacion');
  var WA_NUMBER = formEl ? formEl.dataset.whatsapp : '';
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

  /* ---------- Tagline: cada palabra se activa al cruzar la línea ---------- */
  var words = document.querySelectorAll('.tw');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    words.forEach(function (w) { w.classList.add('on'); });
  } else {
    var wordIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('on', entry.isIntersecting || entry.boundingClientRect.top < 0);
      });
    }, { rootMargin: '0px 0px -45% 0px', threshold: 1 });
    words.forEach(function (w) { wordIO.observe(w); });
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

  /* ---------- Atajos que preseleccionan el servicio ---------- */
  var servicio = document.getElementById('f-servicio');
  document.querySelectorAll('[data-servicio]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (servicio) { servicio.value = a.getAttribute('data-servicio'); clearError(servicio); }
    });
  });

  /* ---------- Formulario de cotización ---------- */
  var form = document.getElementById('form-cotizacion');
  if (!form) return;
  var foto = document.getElementById('f-foto');
  var fotoNombre = document.getElementById('foto-nombre');
  var ok = document.getElementById('form-ok');
  var submit = document.getElementById('f-submit');

  if (foto) {
    foto.addEventListener('change', function () {
      var f = foto.files && foto.files[0];
      if (!f) { fotoNombre.textContent = 'Adjuntar foto'; return; }
      if (f.size > 10 * 1024 * 1024) { foto.value = ''; fotoNombre.textContent = 'La foto supera 10 MB. Elige otra.'; return; }
      fotoNombre.textContent = f.name;
    });
  }

  var rules = {
    nombre: function (v) { return v.trim().length >= 2; },
    empresa: function (v) { return v.trim().length >= 2; },
    ruc: function (v) { return v.trim() === '' || /^(10|15|17|20)\d{9}$/.test(v.trim()); },
    telefono: function (v) { return /^9\d{8}$/.test(v.replace(/[\s+]/g, '').replace(/^51/, '')); },
    correo: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
    servicio: function (v) { return v !== ''; },
    descripcion: function (v) { return v.trim().length >= 10; }
  };

  function fieldOf(el) { return el.closest('.field'); }
  function setError(el) { fieldOf(el).classList.add('invalid'); el.setAttribute('aria-invalid', 'true'); }
  function clearError(el) { fieldOf(el).classList.remove('invalid'); el.removeAttribute('aria-invalid'); }
  function check(el) {
    var rule = rules[el.name];
    var valid = el.type === 'checkbox' ? el.checked : (rule ? rule(el.value) : true);
    if (valid) clearError(el); else setError(el);
    return valid;
  }

  Object.keys(rules).concat(['consent']).forEach(function (name) {
    var el = form.elements[name];
    if (!el) return;
    el.addEventListener('blur', function () { if (el.value !== '' || el.type === 'checkbox') check(el); });
    el.addEventListener('input', function () { if (fieldOf(el).classList.contains('invalid')) check(el); });
    el.addEventListener('change', function () { if (fieldOf(el).classList.contains('invalid')) check(el); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    ok.classList.remove('show');
    var first = null;
    Object.keys(rules).concat(['consent']).forEach(function (name) {
      var el = form.elements[name];
      if (el && !check(el) && !first) first = el;
    });
    if (first) { first.focus(); return; }

    var d = form.elements;
    var msg = [
      'Hola Hidrofluid, quisiera una cotización.',
      '',
      'Nombre: ' + d.nombre.value.trim(),
      'Empresa: ' + d.empresa.value.trim(),
      d.ruc.value.trim() ? 'RUC: ' + d.ruc.value.trim() : null,
      'Teléfono: ' + d.telefono.value.trim(),
      'Correo: ' + d.correo.value.trim(),
      'Servicio: ' + d.servicio.value,
      'Detalle: ' + d.descripcion.value.trim()
    ].filter(function (l) { return l !== null; }).join('\n');

    submit.setAttribute('aria-busy', 'true');
    submit.textContent = 'Preparando tu solicitud…';

    // Cuando el SaaS tenga el endpoint público, colocarlo en data-endpoint del formulario.
    var endpoint = form.getAttribute('data-endpoint');
    var send = endpoint
      ? fetch(endpoint, { method: 'POST', body: new FormData(form) }).then(function (r) { if (!r.ok) throw new Error(); })
      : Promise.resolve();

    send.then(function () {
      if (!endpoint) window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      ok.classList.add('show');
      form.reset();
      if (fotoNombre) fotoNombre.textContent = 'Adjuntar foto';
    }).catch(function () {
      document.getElementById('form-ok-msg').textContent = 'No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos al 939 681 960.';
      ok.classList.add('show');
    }).then(function () {
      submit.removeAttribute('aria-busy');
      submit.textContent = 'Enviar solicitud de cotización';
    });
  });
}

init();
