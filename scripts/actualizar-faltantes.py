"""Regenera los LEEME.txt de Imagenes/fotos-por-descargar/ con lo que todavia falta.

Primero: npm run build  (lee dist/ para saber que productos no tienen foto).
Uso: python scripts/actualizar-faltantes.py
"""
import glob
import json
import os
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
BASE = RAIZ / "Imagenes" / "fotos-por-descargar"
cat = (RAIZ / "src" / "data" / "catalogo.ts").read_text(encoding="utf8")

catnames = {m.group(1): m.group(2) for m in re.finditer(r"slug: '([^']+)',\n    nombre: '([^']+)',\n    grupo", cat)}
fam = {}
for m in re.finditer(r"slug: '([^']+)',\n    nombre: '[^']+',\n    grupo.*?(?=\n  \},)", cat, re.S):
    for f in re.finditer(r"\{ slug: '([^']+)', nombre: '([^']+)' \}", m.group(0)):
        fam[(m.group(1), f.group(1))] = f.group(2)

info = {}
for f in glob.glob(str(RAIZ / "dist" / "producto" / "*" / "index.html")):
    h = open(f, encoding="utf8").read()
    s = os.path.basename(os.path.dirname(f))
    for m in re.finditer(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', h, re.S):
        try:
            d = json.loads(m.group(1))
        except Exception:
            continue
        if d.get("@type") == "Product":
            info[s] = (d["name"], "image" in d)


def slugs(folder):
    out = set()
    for f in glob.glob(folder + "/**/index.html", recursive=True):
        h = open(f, encoding="utf8").read().split("<footer")[0]
        out |= set(re.findall(r'href="/producto/([^"/]+)"', h))
    return {s for s in out if s in info}


bad = r'[<>:"/\\|?*]'
for old in BASE.rglob("LEEME.txt"):
    old.unlink()

HEAD = "Fotos que faltan en esta carpeta.\nGuarda cada foto con EL NOMBRE DE ARCHIVO de la derecha (JPG o PNG), asi la pongo sola en su producto.\n\n"
resumen_total = 0
for c in sorted(glob.glob(str(RAIZ / "dist" / "productos" / "*") + os.sep)):
    cs = os.path.basename(os.path.dirname(c))
    if cs not in catnames:
        continue
    allp = slugs(c)
    intipo = set()
    grupos = {}
    for t in sorted(glob.glob(c + "tipo" + os.sep + "*" + os.sep)):
        fs = os.path.basename(os.path.dirname(t))
        ps = slugs(t)
        intipo |= ps
        grupos[fam[(cs, fs)]] = ps
    if allp - intipo:
        grupos[None] = allp - intipo
    cdir = BASE / re.sub(bad, "", catnames[cs])
    cdir.mkdir(parents=True, exist_ok=True)
    total = 0
    partes = []
    for fname, ps in grupos.items():
        falt = sorted((info[s][0], s) for s in ps if not info[s][1])
        d = cdir / re.sub(bad, "", fname) if fname else cdir
        d.mkdir(parents=True, exist_ok=True)
        total += len(falt)
        if falt:
            (d / "LEEME.txt").write_text(HEAD + "\n".join(f"{n}  ->  {s}.jpg" for n, s in falt) + "\n", encoding="utf8")
        partes.append((fname or "(sin tipo)", falt))
    resumen_total += total
    lineas = [f"Resumen de {catnames[cs]}. Total que faltan: {total}"]
    for fname, falt in partes:
        if falt:
            lineas += [f"\n== {fname} ({len(falt)}) =="] + [f"{n}  ->  {s}.jpg" for n, s in falt]
        else:
            lineas += [f"\n== {fname} ==", "Completo: todos sus productos ya tienen foto."]
    if len(grupos) > 1 or not any(f for _, f in partes):
        (cdir / "LEEME.txt").write_text("\n".join(lineas) + "\n", encoding="utf8")

(BASE / "LEEME.txt").write_text(
    "Fotos por descargar de internet\n================================\n"
    "Aqui van SOLO las fotos que descargues. Lo que ya se entrego esta en la carpeta \"organizacion fotos\".\n\n"
    "Orden: Categoria / Tipo (igual que los filtros de la web).\n"
    "Cada carpeta con modelos pendientes tiene un LEEME.txt con el nombre exacto de cada foto.\n"
    "Las fotos que ya estan en estas carpetas ya se publicaron en la web.\n\n"
    "Cual foto sirve: el equipo solo, fondo blanco o transparente, sin personas ni textos, minimo 800 px.\n"
    f"\nFaltan en total: {resumen_total}\n"
    "Para publicar las nuevas: python scripts/procesar-descargas.py y luego npm run build.\n",
    encoding="utf8",
)
print("faltan", resumen_total)
