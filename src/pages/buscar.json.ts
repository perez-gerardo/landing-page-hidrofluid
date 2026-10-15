// Índice del buscador (lupa del encabezado). Se genera en el build: productos, categorías y servicios.
import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { productos, categorias, categoria } from '../data/catalogo';
import { servicios } from '../data/servicios';
import { fotoProducto } from '../data/fotos';

export const GET: APIRoute = async () => {
  const items: { t: string; n: string; s: string; u: string; i?: string; k?: string }[] = [];

  for (const c of categorias) {
    items.push({ t: 'cat', n: c.nombre, s: 'Venta de equipos', u: `/productos/${c.slug}`, k: c.descripcion });
  }
  for (const s of servicios) {
    items.push({ t: 'srv', n: s.menu, s: 'Servicios', u: `/servicios/${s.slug}`, k: s.bajada });
    for (const g of s.grupos) {
      items.push({
        t: 'srv',
        n: g.titulo,
        s: s.menu,
        u: `/servicios/${s.slug}#${g.id}`,
        k: [g.resumen, ...g.equipos.map((e) => e.nombre)].join(' '),
      });
    }
  }
  for (const p of productos) {
    const f = fotoProducto(p.foto);
    const img = f ? await getImage({ src: f.img, width: 96, height: 96, format: 'webp', fit: 'contain', background: '#ffffff' }) : null;
    items.push({
      t: 'prod',
      n: p.nombre,
      s: categoria(p.categoria)?.nombre ?? '',
      u: `/producto/${p.slug}`,
      i: img?.src,
      k: [p.capacidad, p.familia, p.resumen].filter(Boolean).join(' '),
    });
  }
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
