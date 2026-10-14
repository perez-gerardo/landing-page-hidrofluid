"""Tapa un sticker/logo amarillo de la parte superior de una foto de equipo, rellenando con la chapa de alrededor.

Uso: python quitar-sticker.py FOTO [FOTO...]   (sobrescribe los archivos)
Busca el primer bloque amarillo dentro del 20-85 % del ancho y lo rellena
interpolando columna por columna entre el borde superior e inferior del sticker.
"""
import sys
from PIL import Image, ImageFilter


def amarillo(c):
    r, g, b = c[:3]
    return r > 170 and g > 150 and b < 120 and abs(r - g) < 70


def limpiar(ruta):
    im = Image.open(ruta)
    rgb = im.convert('RGB')
    px = rgb.load()
    w, h = rgb.size
    xa, xb = int(w * 0.2), int(w * 0.85)
    filas = [sum(1 for x in range(xa, xb, 2) if amarillo(px[x, y])) for y in range(h)]
    umbral = max(15, w // 60)
    y0 = next(y for y in range(h) if filas[y] > umbral)
    y, gap = y0, 0
    while y < h and gap < 4:
        gap = 0 if filas[y] > umbral else gap + 1
        y += 1
    y1 = y - gap
    xs = sorted(x for yy in range(y0, y1) for x in range(xa, xb, 2) if amarillo(px[x, yy]))
    x0, x1 = xs[int(len(xs) * .01)], xs[int(len(xs) * .99)]
    pad = max(8, int((x1 - x0) * 0.09))
    x0, x1, y0, y1 = x0 - pad, x1 + pad, y0 - pad, y1 + pad
    parche = Image.new('RGB', (x1 - x0, y1 - y0))
    pp = parche.load()
    for x in range(x0, x1):
        arriba = px[x, max(0, y0 - pad)]
        abajo = px[x, min(h - 1, y1 + pad)]
        for yy in range(y0, y1):
            t = (yy - y0) / max(1, (y1 - y0 - 1))
            pp[x - x0, yy - y0] = tuple(int(arriba[i] * (1 - t) + abajo[i] * t) for i in range(3))
    parche = parche.filter(ImageFilter.GaussianBlur(2))
    rgb.paste(parche, (x0, y0))
    if im.mode == 'RGBA':
        out = rgb.convert('RGBA')
        out.putalpha(im.getchannel('A'))
        out.save(ruta)
    else:
        rgb.save(ruta, quality=90)
    print('ok', ruta, (x0, y0, x1, y1))


for a in sys.argv[1:]:
    limpiar(a)
