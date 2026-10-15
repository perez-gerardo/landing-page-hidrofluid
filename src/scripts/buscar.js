// Buscador del encabezado (lupa). Carga /buscar.json la primera vez que se abre y filtra en el navegador.
// Lógica: sin tildes ni mayúsculas, todas las palabras deben coincidir (por inicio de palabra),
// sinónimos del rubro (gato = gata, llave de impacto = pistola, etc.) y números exactos (20 ≠ 2).

const SINONIMOS = {
  gato: ['gata'], gatos: ['gatas'], gata: ['gato'], botella: ['botella'], cocodrilo: ['lagarto'], caiman: ['lagarto'],
  llave: ['pistola', 'llave'], pistola: ['llave', 'pistola'], impacto: ['impacto'],
  compresor: ['compresora'], compresores: ['compresoras'], compresora: ['compresor'],
  hidrolavadora: ['hidrolavadoras', 'lavadora'], lavadora: ['hidrolavadora'], karcher: ['hidrolavadora'],
  elevador: ['elevadores', 'rampa', 'puente', 'tijera'], rampa: ['elevador', 'rampas'], puente: ['elevador'],
  montacarga: ['montacargas'], estoca: ['estocas', 'apilador'], apilador: ['estoca', 'apiladores'], stoca: ['estoca'],
  torquimetro: ['torquimetros', 'torque'], torque: ['torquimetro'], calibracion: ['calibracion', 'torquimetros'],
  tecle: ['tecles', 'polipasto'], polipasto: ['tecle'], grua: ['pluma'], pluma: ['plumas', 'grua'],
  coche: ['coches', 'carrito', 'carro'], carrito: ['coche', 'carrito'], carro: ['coche', 'carrito'],
  engrasadora: ['engrasador', 'engrase'], grasera: ['engrasador', 'engrase'], aceite: ['aceite', 'aceitera', 'lubricacion'],
  transmision: ['transmision'], caja: ['transmision'], mantenimiento: ['mantenimiento', 'reparacion'], reparacion: ['mantenimiento'],
  fabricacion: ['fabricacion'], manguera: ['mangueras'], reten: ['retenes'], sello: ['sellos'], ton: ['ton', 'toneladas'], tn: ['ton'],
};

const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/["″”“'’]/g, ' pulg ')
    .replace(/(\d)([a-z])/g, '$1 $2')
    .replace(/([a-z])(\d)/g, '$1 $2')
    .replace(/[^a-z0-9/.]+/g, ' ')
    .trim();
const palabras = (s) => norm(s).split(' ').filter(Boolean);
const VACIAS = new Set(['de', 'la', 'el', 'para', 'con', 'y', 'en', 'del', 'los', 'las', 'un', 'una', 'pulg']);

function prepararIndice(items) {
  return items.map((it) => ({ ...it, wn: palabras(it.n), ws: palabras(it.s), wk: palabras(it.k) }));
}

function coincide(token, words) {
  const num = /^\d/.test(token);
  return words.some((w) => (num ? w === token : w.startsWith(token)));
}

function puntuar(it, tokens, qn) {
  let score = 0;
  for (const t of tokens) {
    const alts = [t, ...(SINONIMOS[t] || [])];
    let best = 0;
    for (const a of alts) {
      if (coincide(a, it.wn)) best = Math.max(best, a === t ? 6 : 5);
      else if (coincide(a, it.ws)) best = Math.max(best, a === t ? 3 : 2);
      else if (coincide(a, it.wk)) best = Math.max(best, 1);
    }
    if (!best) return 0;
    score += best;
  }
  const n = norm(it.n);
  if (n === qn) score += 12;
  else if (n.startsWith(qn)) score += 6;
  if (it.t === 'cat') score += 3;
  if (it.t === 'srv') score += 1;
  return score;
}

export function initBuscador() {
  const panel = document.getElementById('buscador');
  if (!panel) return;
  const input = panel.querySelector('.buscador-input');
  const lista = panel.querySelector('.buscador-res');
  const vacio = panel.querySelector('.buscador-vacio');
  const sug = panel.querySelector('[data-buscar-sug]');
  const wa = panel.dataset.wa;
  let indice = null;
  let activo = -1;
  let anterior = null;

  async function cargar() {
    if (indice) return indice;
    const r = await fetch('/buscar.json');
    indice = prepararIndice(await r.json());
    return indice;
  }

  function abrir() {
    anterior = document.activeElement;
    panel.hidden = false;
    document.body.style.overflow = 'hidden';
    input.focus();
    input.select();
    cargar().then(() => buscar());
  }
  function cerrar() {
    panel.hidden = true;
    document.body.style.overflow = '';
    if (anterior && anterior.focus) anterior.focus();
  }

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const etiqueta = { prod: 'Equipo', cat: 'Categoría', srv: 'Servicio' };

  function buscar() {
    const q = input.value;
    const qn = norm(q);
    const tokens = palabras(q).filter((t) => !VACIAS.has(t));
    sug.hidden = !!qn;
    activo = -1;
    if (!indice || !tokens.length) {
      lista.innerHTML = '';
      vacio.hidden = true;
      return;
    }
    const res = indice
      .map((it) => [puntuar(it, tokens, qn), it])
      .filter(([s]) => s > 0)
      .sort((a, b) => b[0] - a[0] || a[1].n.localeCompare(b[1].n, 'es', { numeric: true }))
      .slice(0, 12)
      .map(([, it]) => it);
    lista.innerHTML = res
      .map(
        (it, i) => `<li role="option" id="bres-${i}"><a href="${it.u}" class="bres bres-${it.t}">
          ${it.i ? `<img src="${it.i}" alt="" width="48" height="48" loading="lazy" />` : `<span class="bres-ico" aria-hidden="true">${it.t === 'srv' ? 'S' : 'C'}</span>`}
          <span class="bres-txt"><span class="bres-n">${esc(it.n)}</span><span class="bres-s">${etiqueta[it.t]} · ${esc(it.s)}</span></span></a></li>`,
      )
      .join('');
    vacio.hidden = res.length > 0;
    if (!res.length) {
      const link = `https://wa.me/${wa}?text=${encodeURIComponent(`Hola, estuve en la web y requiero mayor información de: ${q.trim()}.`)}`;
      vacio.innerHTML = `No encontramos «${esc(q.trim())}» en la web, pero puede que lo tengamos. <a href="${link}" target="_blank" rel="noopener">Pregúntanos por WhatsApp</a>.`;
    }
  }

  function mover(d) {
    const items = lista.querySelectorAll('a');
    if (!items.length) return;
    activo = (activo + d + items.length) % items.length;
    items.forEach((a, i) => a.classList.toggle('is-activo', i === activo));
    items[activo].scrollIntoView({ block: 'nearest' });
    input.setAttribute('aria-activedescendant', `bres-${activo}`);
  }

  document.querySelectorAll('[data-buscar-abrir]').forEach((b) => b.addEventListener('click', abrir));
  panel.querySelector('[data-buscar-cerrar]').addEventListener('click', cerrar);
  panel.addEventListener('click', (e) => { if (e.target === panel) cerrar(); });
  sug.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') { input.value = e.target.textContent; buscar(); input.focus(); }
  });
  input.addEventListener('input', buscar);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); mover(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); mover(-1); }
    else if (e.key === 'Enter') {
      const items = lista.querySelectorAll('a');
      const a = items[activo >= 0 ? activo : 0];
      if (a) { e.preventDefault(); location.href = a.href; }
    } else if (e.key === 'Escape') cerrar();
  });
  document.addEventListener('keydown', (e) => {
    const escribiendo = /input|textarea|select/i.test(document.activeElement?.tagName || '');
    if ((e.key === '/' && !escribiendo) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
      if (panel.hidden) { e.preventDefault(); abrir(); }
    } else if (e.key === 'Escape' && !panel.hidden) cerrar();
  });
}
