// Ayudas de SEO: Google corta los títulos a ~60 caracteres y las descripciones a ~155.

/** Recorta en una palabra completa y agrega "…" si hace falta. */
export function cortar(texto: string, max: number) {
  const t = texto.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

/** Título con marca; si no cabe en ~63 caracteres, se omite la marca antes que cortar el nombre. */
export const titulo = (parte: string) => {
  const t = `${parte} | Hidrofluid Service`;
  return t.length <= 63 ? t : cortar(parte, 63);
};
export const descripcion = (texto: string) => cortar(texto, 155);
