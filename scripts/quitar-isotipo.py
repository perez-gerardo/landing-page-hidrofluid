"""Borra isotipos/logos sueltos (separados del equipo) en las fotos de catálogo sobre fondo blanco.

Uso: python quitar-isotipo.py FOTO [FOTO...]   (sobrescribe)
Busca manchas no blancas separadas del equipo (la más grande), pequeñas y cerca del borde superior,
y las pinta de blanco. Para logos pegados al equipo usa borrar-textos.py o retoca a mano.
"""
import sys
TODO = "--todo" in sys.argv
import cv2
import numpy as np

for ruta in [a for a in sys.argv[1:] if a != "--todo"]:
    img = cv2.imread(ruta)
    h, w = img.shape[:2]
    no_blanco = (img.min(axis=2) < 235).astype(np.uint8)
    cerrado = cv2.dilate(no_blanco, np.ones((15, 15), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(cerrado)
    if n < 3:
        continue
    mayor = 1 + int(np.argmax(st[1:, cv2.CC_STAT_AREA]))
    quitados = 0
    for i in range(1, n):
        x, y, bw, bh, area = st[i]
        if i == mayor or area > 0.04 * w * h:
            continue
        if y + bh / 2 > 0.45 * h and not TODO:
            continue
        m = (lab == i).astype(np.uint8) * 255
        m = cv2.dilate(m, np.ones((25, 25), np.uint8))
        img[m > 0] = (255, 255, 255)
        quitados += 1
    cv2.imwrite(ruta, img, [cv2.IMWRITE_JPEG_QUALITY, 92])
    print(ruta.split('/')[-1], quitados)
