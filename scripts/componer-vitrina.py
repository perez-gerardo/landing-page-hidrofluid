"""Compone la imagen de portada: equipos reales recortados (PNG transparentes) sobre un fondo de taller.

Uso: python componer-vitrina.py FONDO CARPETA_PNG SALIDA.jpg
Los PNG se generan con: fotos-fondo-blanco.py ENTRADA SALIDA --png
"""
import sys
from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageDraw, ImageChops

fondo, carpeta, salida = sys.argv[1:4]
W, H = 2400, 1200
bg = ImageOps.fit(Image.open(fondo).convert('RGB'), (W, H), Image.LANCZOS, centering=(0.55, 0.6))
bg = ImageEnhance.Brightness(bg).enhance(0.62)
piso = int(H * 0.90)
# (archivo, alto relativo, centro x). Los grandes a la derecha; el texto va a la izquierda.
equipos = [
    ('apilador-hidraulico-manual', 0.60, 0.835),
    ('prensa-hidraulica-60-ton', 0.64, 0.625),
    ('coche-porta-herramientas', 0.31, 0.405),
    ('gata-transmision-azul', 0.27, 0.94),
    ('gata-transmision-roja', 0.23, 0.245),
    ('gata-transmision-taller', 0.17, 0.10),
]
for nombre, alto, cx in equipos:
    im = Image.open(f'{carpeta}/{nombre}.png').convert('RGBA')
    h = int(H * alto); w = int(im.width * h / im.height); im = im.resize((w, h), Image.LANCZOS)
    x = int(W * cx - w / 2); y = piso - h
    reflejo = ImageOps.flip(im)
    fade = Image.new('L', (w, h), 0); d = ImageDraw.Draw(fade); tramo = int(h * 0.35)
    for i in range(tramo):
        d.line([(0, i), (w, i)], fill=int(42 * (1 - i / tramo)))
    reflejo.putalpha(ImageChops.multiply(reflejo.getchannel('A'), fade))
    bg.paste(reflejo, (x, piso), reflejo)
    sombra = Image.new('L', (w + 80, 60), 0); ImageDraw.Draw(sombra).ellipse([0, 10, w + 79, 50], fill=150)
    bg.paste((0, 0, 0), (x - 40, piso - 30), sombra.filter(ImageFilter.GaussianBlur(18)))
    bg.paste(im, (x, y), im)
bg.save(salida, quality=86, optimize=True, progressive=True)
print('ok', salida)
