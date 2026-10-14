"""Convierte los PNG con fondo transparente de Imagenes/ en fotos de catálogo:
JPG cuadrado 1600 x 1600, fondo blanco, producto centrado (84 % del cuadro).

Uso: python scripts/png-a-fondo-blanco.py
Escribe en src/assets/productos/<slug>.jpg. No toca las fotos que ya existen con otro nombre.
"""
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
ENTRADA = RAIZ / "Imagenes" / "organizacion fotos" / "productos"
SALIDA = RAIZ / "src" / "assets" / "productos"
SIZE, MARGEN = 1600, 0.08

# Repetidas de fotos que ya existían (Apilador manual = apilador-hidraulico-manual, Gata de transmisión = gata-transmision-roja): se omiten.
# archivo original (sin carpeta) -> nombre final
NOMBRES = {
    "Elevador de rampas rojo": "elevador-de-rampas",
    "Elevador de tijera azul": "elevador-de-tijera",
    "Llave de torque eléctrica": "llave-de-torque-electrica",
    "Llave de torque Juwel a batería": "llave-de-torque-a-bateria",
    "Llave de torque Juwel": "llave-de-torque-con-reaccion",
    "Torquímetro de brazo largo": "torquimetro-de-brazo-largo",
    "Torquímetro de dial": "torquimetro-de-dial",
    "Torquímetro de trinquete": "torquimetro-de-trinquete",
    "Torquímetro digital": "torquimetro-digital",
    "Tecle de cadena 0.5 ton": "tecle-de-cadena-0-5-ton",
    "Tecle de palanca": "tecle-de-palanca",
    "Tecle eléctrico Kito": "tecle-electrico",
    "Hidrolavadora Kärcher HD 4-10": "hidrolavadora-agua-fria",
    "Hidrolavadora Kärcher HDS": "hidrolavadora-agua-caliente",
    "Hidrolavadora a gasolina": "hidrolavadora-a-gasolina",
    "Gata botella Mega 50 ton": "gata-botella-50-ton",
    "Surtido de gatas": "surtido-de-gatas",
    "Bandeja de drenaje de aceite": "bandeja-de-drenaje-de-aceite",
    "Bomba de grasa con carrito": "bomba-de-grasa-con-carrito",
    "Equipos de engrase": "equipos-de-engrase",
    "Llave inalámbrica Chicago Pneumatic 18V": "llave-de-impacto-inalambrica-18v",
    "Llave neumática Chicago Pneumatic": "llave-de-impacto-neumatica",
    "Prensa con compresor de resortes": "prensa-con-compresor-de-resortes",
    "Prensa hidráulica de taller": "prensa-hidraulica-de-taller",
    "Pluma hidráulica de taller": "pluma-hidraulica-de-taller",
    "Plumas plegables": "plumas-plegables",
    "Soporte de motor": "soporte-de-motor",
}

SALIDA.mkdir(parents=True, exist_ok=True)
for f in sorted(ENTRADA.rglob("*.png")):
    slug = NOMBRES.get(f.stem)
    if not slug:
        print("omitida:", f.stem)
        continue
    im = Image.open(f).convert("RGBA")
    bbox = im.getchannel("A").point(lambda a: 255 if a > 24 else 0).getbbox()
    if bbox:
        im = im.crop(bbox)
    util = int(SIZE * (1 - 2 * MARGEN))
    k = util / max(im.size)
    im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    lienzo = Image.new("RGB", (SIZE, SIZE), "white")
    lienzo.paste(im, ((SIZE - im.width) // 2, (SIZE - im.height) // 2), im)
    lienzo.save(SALIDA / f"{slug}.jpg", quality=88, optimize=True)
    print("ok:", slug)
