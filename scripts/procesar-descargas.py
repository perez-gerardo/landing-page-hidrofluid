"""Convierte las fotos de Imagenes/fotos-por-descargar/ en fotos de catálogo:
JPG cuadrado 1600 x 1600, fondo blanco, equipo centrado (84 % del cuadro).

Cada foto debe llamarse como indica el LEEME.txt de su carpeta (el nombre es el slug del producto).
Uso: python scripts/procesar-descargas.py
Escribe en src/assets/descargadas/<slug>.jpg (aparte de src/assets/productos, que son las fotos entregadas por el cliente). La web las toma sola: no hay que tocar el código.
"""
from pathlib import Path

import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
ENTRADA = RAIZ / "Imagenes" / "fotos-por-descargar"
SALIDA = RAIZ / "src" / "assets" / "descargadas"
SIZE, MARGEN = 1600, 0.08
EXT = {".jpg", ".jpeg", ".png", ".webp"}


def contenido(im: Image.Image) -> Image.Image:
    """Recorta al objeto: lo que no es blanco (o lo que no es transparente)."""
    rgba = im.convert("RGBA")
    a = np.asarray(rgba)
    visible = (a[..., 3] > 24) & (a[..., :3].min(axis=2) < 244)
    ys, xs = np.where(visible)
    if len(xs) == 0:
        return rgba
    return rgba.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


SALIDA.mkdir(parents=True, exist_ok=True)
n = 0
for f in sorted(ENTRADA.rglob("*")):
    if f.suffix.lower() not in EXT:
        continue
    obj = contenido(Image.open(f))
    util = int(SIZE * (1 - 2 * MARGEN))
    k = util / max(obj.size)
    obj = obj.resize((max(1, round(obj.width * k)), max(1, round(obj.height * k))), Image.LANCZOS)
    lienzo = Image.new("RGB", (SIZE, SIZE), "white")
    lienzo.paste(obj, ((SIZE - obj.width) // 2, (SIZE - obj.height) // 2), obj)
    lienzo.save(SALIDA / f"{f.stem}.jpg", quality=88, optimize=True)
    n += 1
print(f"{n} fotos procesadas")
