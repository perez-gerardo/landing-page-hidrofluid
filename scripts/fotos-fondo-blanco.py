"""Convierte fotos de equipos en fotos de catálogo: fondo blanco, cuadradas y centradas.

Uso:
    python fotos-fondo-blanco.py ENTRADA SALIDA [--size 1600] [--margen 0.08] [--modelo isnet-general-use]

ENTRADA puede ser un archivo o una carpeta. Cada foto se guarda en SALIDA como <nombre>.jpg.
Requiere: pip install "rembg[cpu]==2.0.50" pillow   (Python 3.9+)

Para mejores resultados, fotografía el equipo según docs/banco-de-fotos.md:
fondo liso y claro, sin otros objetos alrededor y con luz pareja.
"""

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps
from rembg import new_session, remove

EXT = {".jpg", ".jpeg", ".png", ".webp", ".heic"}


def recortar(img: Image.Image, session) -> Image.Image:
    sin_fondo = remove(img, session=session, post_process_mask=True)
    bbox = sin_fondo.getchannel("A").point(lambda a: 255 if a > 24 else 0).getbbox()
    return sin_fondo.crop(bbox) if bbox else sin_fondo


def componer(objeto: Image.Image, size: int, margen: float) -> Image.Image:
    util = int(size * (1 - 2 * margen))
    objeto = objeto.copy()
    objeto.thumbnail((util, util), Image.LANCZOS)
    lienzo = Image.new("RGB", (size, size), (255, 255, 255))
    x = (size - objeto.width) // 2
    y = (size - objeto.height) // 2

    # Sombra suave bajo el equipo para que no "flote".
    alfa = objeto.getchannel("A")
    sombra = Image.new("L", (size, size), 0)
    elipse = Image.new("L", (objeto.width, max(8, objeto.height // 10)), 0)
    from PIL import ImageDraw

    ImageDraw.Draw(elipse).ellipse([0, 0, elipse.width - 1, elipse.height - 1], fill=70)
    sombra.paste(elipse, (x, y + objeto.height - elipse.height // 2))
    sombra = sombra.filter(ImageFilter.GaussianBlur(size // 60))
    lienzo.paste((210, 214, 220), mask=sombra)

    lienzo.paste(objeto, (x, y), alfa)
    return lienzo


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("entrada", type=Path)
    ap.add_argument("salida", type=Path)
    ap.add_argument("--size", type=int, default=1600)
    ap.add_argument("--margen", type=float, default=0.08)
    ap.add_argument("--modelo", default="isnet-general-use")
    ap.add_argument("--png", action="store_true", help="Exporta además un PNG transparente recortado (para composiciones como la portada).")
    a = ap.parse_args()

    archivos = [a.entrada] if a.entrada.is_file() else sorted(p for p in a.entrada.iterdir() if p.suffix.lower() in EXT)
    if not archivos:
        print("No hay fotos para procesar.", file=sys.stderr)
        return 1

    a.salida.mkdir(parents=True, exist_ok=True)
    session = new_session(a.modelo)
    for f in archivos:
        img = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
        objeto = recortar(img, session)
        if a.png:
            objeto.save(a.salida / f"{f.stem}.png", optimize=True)
        final = componer(objeto, a.size, a.margen)
        destino = a.salida / f"{f.stem}.jpg"
        final.save(destino, quality=90, optimize=True, progressive=True)
        print(f"ok  {f.name} -> {destino}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
