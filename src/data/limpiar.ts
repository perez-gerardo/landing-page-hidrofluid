// Quita marcas y códigos de fabricante de los productos antes de publicarlos.
// - El código original queda en `ref` (referencia interna para el equipo: nombrar fotos, pedir al proveedor). No se muestra.
// - Si dos productos quedan con el mismo nombre, se distinguen con un dato técnico (capacidad, torque, altura...), no con el código.

import type { Producto } from './catalogo';

const MARCAS = /\b(big\s?red|rotake|thinkcar|launch|phixwell|amco|smithde|osate|apo\s+garage|apo|bori|torin|fanbao|tce|summary)\b/gi;
const ES_CODIGO = /^[A-Za-z]{1,6}-?[A-Za-z]*\d[\w\-./]*$/;
const ES_RESTO_CODIGO = /^-+\d[\w\-./]*$/;
const ES_CODIGO_NUM = /^\d+(?:\.\d+)?-\d+(?:\.\d+)?\.?[A-Za-z]$/;

// Orden de preferencia del dato que distingue a dos modelos con el mismo nombre.
const DISTINTIVOS = [
  'Capacidad', 'Carga nominal', 'Torque máximo', 'Máximo torque', 'Altura máxima', 'Altura máxima de elevación', 'Altura mínima',
  'Salida de pistón', 'Rango de trabajo', 'Diámetro del disco', 'Sistema', 'Dimensiones', 'Medidas del equipo', 'Motor',
  'Capacidad del tanque', 'Encastre', 'Corriente', 'Tiempo de elevación',
];

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[″"]/g, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function nombreSinMarcaNiCodigo(n: string) {
  const s = n
    .replace(MARCAS, ' ')
    .replace(/\bTTK\s*333\b/gi, ' ')
    .replace(/\bgal\b/gi, 'galones')
    .replace(/\btvl\s*ev\s*\d+\b/gi, ' ')
    .replace(/\s[–-]\s*(?=\s|$)/g, ' ');
  const t = s
    .split(/\s+/)
    .filter((x) => x && !ES_CODIGO.test(x) && !ES_CODIGO_NUM.test(x) && !ES_RESTO_CODIGO.test(x))
    .join(' ')
    .replace(/\s+[–-]$/, '')
    .trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

const valor = (p: Producto, clave: string) => p.specs?.find(([k]) => k === clave)?.[1];
// Dos valores son "el mismo" si solo cambia la forma de escribir la unidad (20 ton = 20 toneladas).
const normal = (v: string) => v.toLowerCase().replace(/toneladas?|ton|tn|kilogramos|kgs?/g, '').replace(/\s+/g, '');
const CORTO = 30; // un sufijo largo ensucia el nombre
const SIN_ETIQUETA = /^(Capacidad|Carga|Torque|Máximo torque|Encastre)/;

/** Texto corto que se agrega al nombre para distinguir un modelo. */
function sufijo(clave: string, v: string) {
  if (clave === 'Motor') v = v.split('-')[0].trim();
  v = v.replace(/^0\s*[–-]\s*/, '');
  return SIN_ETIQUETA.test(clave) ? v : `${clave.toLowerCase()} ${v}`;
}

export function sanear(lista: Producto[]): Producto[] {
  const base = lista.map((p) => {
    const { marca: _m, codigo, ...resto } = p as Producto & { codigo?: string; marca?: string };
    const nombre = nombreSinMarcaNiCodigo(p.nombre);
    const ref = p.ref ?? codigo;
    return {
      ...resto,
      ...(ref ? { ref } : {}),
      nombre,
      resumen: p.resumen.replace(p.nombre, nombre),
    } as Producto;
  });

  // Nombres repetidos dentro de una misma categoría
  const grupos = new Map<string, number[]>();
  base.forEach((p, i) => {
    const k = `${p.categoria}|${p.nombre.toLowerCase()}`;
    grupos.set(k, [...(grupos.get(k) ?? []), i]);
  });
  for (const idx of grupos.values()) {
    if (idx.length < 2) continue;
    let mejor: { clave: string; distintos: number } | null = null;
    for (const clave of DISTINTIVOS) {
      const valores = idx.map((i) => valor(base[i], clave)).filter((v): v is string => !!v);
      if (valores.some((v) => sufijo(clave, v).length > CORTO)) continue;
      const distintos = new Set(valores.map(normal)).size;
      if (distintos > (mejor?.distintos ?? 1)) mejor = { clave, distintos };
    }
    const usados = new Map<string, number>();
    idx.forEach((i, n) => {
      const v = mejor ? valor(base[i], mejor.clave) : undefined;
      if (v) {
        const suf = sufijo(mejor!.clave, v);
        const veces = (usados.get(suf) ?? 0) + 1;
        usados.set(suf, veces);
        base[i] = { ...base[i], nombre: `${base[i].nombre} – ${suf}${veces > 1 ? ` (opción ${veces})` : ''}` };
      } else if (n > 0) {
        base[i] = { ...base[i], nombre: `${base[i].nombre} (opción ${n + 1})` };
      }
    });
  }

  const vistos = new Set<string>();
  return base.map((p) => {
    let slug = slugify(p.nombre);
    for (let k = 2; vistos.has(slug); k++) slug = `${slugify(p.nombre)}-${k}`;
    vistos.add(slug);
    return { ...p, slug };
  });
}
