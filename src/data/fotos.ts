import type { ImageMetadata } from 'astro';

// Fotos optimizadas por Astro en el build (WebP, tamaños responsivos).
// - src/assets/fotos: fotos del taller (trabajos, hero, nosotros).
// - src/assets/ambiente: escenas de servicio generadas con IA, sin marcas.
// - src/assets/productos: fotos de catálogo con fondo blanco, 1:1. Si existe una con el mismo nombre, gana esta.
const taller = import.meta.glob<{ default: ImageMetadata }>('../assets/fotos/*.{jpg,png,webp}', { eager: true });
const ambiente = import.meta.glob<{ default: ImageMetadata }>('../assets/ambiente/*.{jpg,png,webp}', { eager: true });
const servicios = import.meta.glob<{ default: ImageMetadata }>('../assets/servicios/*.{jpg,png,webp}', { eager: true });
const catalogo = import.meta.glob<{ default: ImageMetadata }>('../assets/productos/*.{jpg,png,webp}', { eager: true });

const nombre = (ruta: string) => ruta.split('/').pop()!.replace(/\.(jpg|png|webp)$/, '');
const indexar = (archivos: typeof taller) =>
  Object.fromEntries(Object.entries(archivos).map(([ruta, mod]) => [nombre(ruta), mod.default]));

export const fotos: Record<string, ImageMetadata> = indexar(taller);
export const fotosCatalogo: Record<string, ImageMetadata> = indexar(catalogo);
// Imágenes de ambiente generadas con IA (Higgsfield), sin marcas. Solo para ilustrar servicios, nunca productos en venta.
export const fotosAmbiente: Record<string, ImageMetadata> = indexar(ambiente);
export const fotosServicios: Record<string, ImageMetadata> = indexar(servicios);
export const fotoServicio = (n?: string) => (n ? fotosServicios[n] ?? null : null);
export const fotoAmbiente = (n?: string) => (n ? fotosAmbiente[n] ?? null : null);

export function foto(n: string): ImageMetadata {
  const f = fotos[n];
  if (!f) throw new Error(`Foto no encontrada: ${n}`);
  return f;
}

/** Foto de producto: primero la versión de catálogo (fondo blanco), si no la del taller. */
export function fotoProducto(n?: string): { img: ImageMetadata; blanco: boolean } | null {
  if (!n) return null;
  if (fotosCatalogo[n]) return { img: fotosCatalogo[n], blanco: true };
  if (fotos[n]) return { img: fotos[n], blanco: false };
  return null;
}
