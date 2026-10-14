# Landing page · HIDROFLUID SERVICE S.A.C.

Sitio web estático de Hidrofluid Service (Santa Anita, Lima): venta de equipos, servicios de mantenimiento, fabricación y alquiler.
Hecho con [Astro](https://astro.build) 7. Todos los botones de contacto abren WhatsApp.

## Cómo correrlo

Requiere **Node 22.12 o superior** (hay un `.nvmrc` con la 24).

```bash
nvm use
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # revisa el build
```

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Datos de la empresa, WhatsApp, textos de la portada, clientes | `src/data/site.ts` |
| Páginas de servicio (mantenimiento, fabricación, alquiler) | `src/data/servicios.ts` |
| Categorías del catálogo de venta | `src/data/catalogo.ts` |
| Productos generados (gatas, prensas, pistolas, elevadores…) | `src/data/gatas.ts`, `src/data/equipos-taller.ts` (no editar `equipos-taller.ts` a mano) |
| Limpieza de marcas/códigos y nombres repetidos | `src/data/limpiar.ts` |
| Estilos | `src/styles/global.css` |
| Páginas | `src/pages/` (`index`, `productos/`, `producto/`, `servicios/`, `privacidad`, `404`) |

## Cómo agregar las imágenes

Las fotos se optimizan solas en el build (WebP, tamaños responsivos). Mientras falte una foto, la web muestra "Foto en preparación".

1. **Productos** (fondo blanco, cuadradas 1:1, sin logos ni marcas de agua): copiar a `src/assets/productos/<nombre>.jpg`
   y poner `foto: '<nombre>'` en el producto (en `src/data/catalogo.ts` para los propios, o en `src/data/gatas.ts`).
   El script `scripts/fotos-fondo-blanco.py` recorta el fondo y centra el equipo (ver `docs/banco-de-fotos.md`).
2. **Servicios** (4:3, sin logos): `src/assets/servicios/<nombre>.jpg` y `foto: '<nombre>'` en el equipo, dentro de `src/data/servicios.ts`.
   Las tarjetas de la portada leen su foto de `serviciosHome` en `src/data/site.ts` (`foto`).
3. **Clientes**: logos PNG con fondo transparente en `src/assets/clientes/`, y el nombre del archivo en `clientes` de `src/data/site.ts`.

Las fotos de `src/assets/ambiente/` son imágenes provisionales generadas con IA; se pueden reemplazar por fotos reales.

## SEO

- `site` en `astro.config.mjs` es el dominio público (hoy `https://hidrofluid.pe`, **cambiar por el real**): de ahí salen canonical, sitemap, robots.txt, og:image y datos estructurados.
- Cada página tiene título, descripción, canonical, Open Graph y Twitter Card.
- Datos estructurados (JSON-LD): `LocalBusiness` en la portada, `Service` en cada servicio, `Product` y `BreadcrumbList` en cada producto.
- Se generan `sitemap-index.xml`, `robots.txt` y `llms.txt` (resumen para asistentes de IA).
- Los productos no muestran marca ni código de fabricante. El código queda en `ref` (interno).

## Pendientes

- Enlaces reales de redes sociales (`empresa.redes` en `src/data/site.ts`). Los botones ya están, pero no llevan a ningún lado.
- Logos de Granotex, Montana y Transporte 77, y autorización de los clientes para mostrarlos.
- Logo de Hidrofluid en vectores (SVG).
- Dominio final, precios, garantía y confirmación de qué productos se venden.
- Fotos reales de productos y servicios.

## Regenerar el catálogo desde la fuente

```bash
python3 scripts/generar-catalogo.py   # lee docs/fuente-equipos-taller.tsv y escribe src/data/equipos-taller.ts
```
