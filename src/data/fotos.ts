import type { ImageMetadata } from 'astro';

// Fotos optimizadas por Astro en el build (WebP, tamaños responsivos).
// - src/assets/fotos: fotos del taller (trabajos, hero, nosotros).
// - src/assets/ambiente: escenas de servicio generadas con IA, sin marcas.
// - src/assets/productos: fotos de catálogo del cliente con fondo blanco, 1:1.
// - src/assets/descargadas: fotos de catálogo bajadas de internet (aparte para distinguirlas). Si existe una con el mismo nombre, gana esta.
const taller = import.meta.glob<{ default: ImageMetadata }>('../assets/fotos/*.{jpg,png,webp}', { eager: true });
const ambiente = import.meta.glob<{ default: ImageMetadata }>('../assets/ambiente/*.{jpg,png,webp}', { eager: true });
const servicios = import.meta.glob<{ default: ImageMetadata }>('../assets/servicios/*.{jpg,png,webp}', { eager: true });
const descargadas = import.meta.glob<{ default: ImageMetadata }>('../assets/descargadas/*.{jpg,png,webp}', { eager: true });
const catalogo = import.meta.glob<{ default: ImageMetadata }>('../assets/productos/*.{jpg,png,webp}', { eager: true });

const nombre = (ruta: string) => ruta.split('/').pop()!.replace(/\.(jpg|png|webp)$/, '');
const indexar = (archivos: typeof taller) =>
  Object.fromEntries(Object.entries(archivos).map(([ruta, mod]) => [nombre(ruta), mod.default]));

const fotos: Record<string, ImageMetadata> = indexar(taller);
// productos = fotos entregadas por el cliente; descargadas = fotos bajadas de internet (si hay una con el mismo nombre, gana la del cliente).
export const fotosCatalogo: Record<string, ImageMetadata> = { ...indexar(descargadas), ...indexar(catalogo) };
// Imágenes de ambiente generadas con IA (Higgsfield), sin marcas. Solo para ilustrar servicios, nunca productos en venta.
const fotosAmbiente: Record<string, ImageMetadata> = indexar(ambiente);
const fotosServicios: Record<string, ImageMetadata> = indexar(servicios);
export const fotoServicio = (n?: string) => (n ? fotosServicios[n] ?? null : null);
export const fotoAmbiente = (n?: string) => (n ? fotosAmbiente[n] ?? null : null);

/** Foto de producto: primero la versión de catálogo (fondo blanco), si no la del taller. */
export function fotoProducto(n?: string): { img: ImageMetadata; blanco: boolean } | null {
  if (!n) return null;
  if (fotosCatalogo[n]) return { img: fotosCatalogo[n], blanco: true };
  if (fotos[n]) return { img: fotos[n], blanco: false };
  return null;
}
