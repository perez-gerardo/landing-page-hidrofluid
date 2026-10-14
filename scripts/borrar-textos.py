"""Borra textos, marcas y marcas de agua de las fotos de catálogo (OCR + relleno).

Uso: python borrar-textos.py CARPETA [CARPETA...]   (sobrescribe los JPG)
Requiere: pip install rapidocr-onnxruntime opencv-python-headless pillow numpy
Detecta texto con OCR (conf >= 0.5, 2 o más caracteres) y lo rellena con el entorno
(cv2.inpaint). Lo que no sea texto (isotipos, colores de marca) hay que retocarlo aparte.
"""
import re
import sys
from pathlib import Path

import cv2
import numpy as np
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
MIN_CONF = 0.5


def util(txt):
    return len(re.findall(r'[A-Za-z0-9一-鿿]', txt)) >= 2


def limpiar(ruta):
    img = cv2.imread(str(ruta))
    h, w = img.shape[:2]
    res, _ = ocr(str(ruta))
    mask = np.zeros((h, w), np.uint8)
    n = 0
    for box, txt, conf in res or []:
        if float(conf) < MIN_CONF or not util(txt):
            continue
        pts = np.array(box, np.int32)
        x, y, bw, bh = cv2.boundingRect(pts)
        pad = max(4, int(min(bw, bh) * 0.25))
        cv2.rectangle(mask, (max(0, x - pad), max(0, y - pad)), (min(w, x + bw + pad), min(h, y + bh + pad)), 255, -1)
        n += 1
    if not n:
        return 0
    out = cv2.inpaint(img, mask, 7, cv2.INPAINT_TELEA)
    cv2.imwrite(str(ruta), out, [cv2.IMWRITE_JPEG_QUALITY, 92])
    return n


for carpeta in sys.argv[1:]:
    for f in sorted(Path(carpeta).glob('*.jpg')):
        n = limpiar(f)
        if n:
            print(f'{f.name}: {n} texto(s) borrado(s)')
