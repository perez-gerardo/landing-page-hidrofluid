import type { APIRoute } from 'astro';
import { empresa } from '../data/site';
import { servicios } from '../data/servicios';
import { categorias, productosDe } from '../data/catalogo';

// Resumen en texto plano para asistentes de IA (ChatGPT, Claude, Perplexity).
export const GET: APIRoute = ({ site }) => {
  const lineas = [
    `# ${empresa.nombre}`,
    '',
    `> Venta, mantenimiento, fabricación y alquiler de equipos hidráulicos e industriales en ${empresa.distrito}, ${empresa.ciudad}, Perú. Taller propio. Más de 10 años de experiencia.`,
    '',
    '## Contacto',
    `- Dirección: ${empresa.direccion}, ${empresa.distrito}, ${empresa.ciudad}`,
    `- Teléfonos: ${empresa.telefonos.map((t) => t.texto).join(' / ')}`,
    `- WhatsApp: https://wa.me/${empresa.whatsapp}`,
    `- Correo: ${empresa.correo}`,
    `- RUC: ${empresa.ruc}`,
    `- Web: ${site?.href ?? ''}`,
    '',
    '## Servicios',
    ...servicios.map((s) => `- ${s.menu}: ${s.bajada}. ${site ? new URL(`/servicios/${s.slug}`, site).href : ''}`),
    '',
    '## Venta de equipos',
    ...categorias.map((c) => `- ${c.nombre} (${productosDe(c.slug).length}): ${c.descripcion}`),
  ];
  return new Response(lineas.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
