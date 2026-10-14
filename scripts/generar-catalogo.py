"""Genera src/data/equipos-taller.ts a partir de docs/fuente-equipos-taller.tsv.

Uso (desde apps/landing):  python3 scripts/generar-catalogo.py

La fuente guarda, por producto: categoría ~ nombre ~ (vacío) ~ (vacío) ~ ficha técnica corta.
Del texto solo se toman datos técnicos (código, marca, capacidades, medidas). No se copian precios, fotos
ni textos de marketing: el resumen de cada producto lo escribe este script con plantillas propias.
"""
import json
import re
import unicodedata
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FUENTE = RAIZ / 'docs' / 'fuente-equipos-taller.tsv'
SALIDA = RAIZ / 'src' / 'data' / 'equipos-taller.ts'

CATEGORIA = {
    'comp': 'compresoras-de-aire', 'rect': 'rectificadoras', 'pren': 'prensas-hidraulicas', 'plan': 'carroceria',
    'banc': 'bancos-portaherramientas', 'elev': 'elevadores', 'coch': 'coches-y-mesas', 'pist': 'pistolas-de-impacto', 'equi': 'lubricacion',
}
PARA = {
    'compresoras-de-aire': 'generar y distribuir aire comprimido en talleres y plantas',
    'rectificadoras': 'rectificar discos y tambores de freno y enderezar rines',
    'prensas-hidraulicas': 'prensado hidráulico: montaje y desmontaje de rodamientos, bujes y piezas a presión',
    'carroceria': 'reparación de carrocería, planchado y enderezado de chasis',
    'bancos-portaherramientas': 'ordenar herramientas y trabajar con comodidad en el taller',
    'coches-y-mesas': 'guardar y trasladar herramientas dentro del taller',
    'pistolas-de-impacto': 'ajustar y desajustar tuercas de alto torque',
    'lubricacion': 'lubricación, manejo de aceite y grasa y limpieza de piezas',
    'elevadores': 'elevar vehículos, motos y neumáticos con seguridad en taller y lavado',
}
MARCAS = {'BIG RED': 'Big Red', 'BIGRED': 'Big Red', 'TORIN BIGRED': 'Big Red', 'APO GARAGE': 'APO Garage', 'BORI': 'Bori',
          'AMCO': 'AMCO', 'SMITHDE': 'Smithde', 'OSATE': 'Osate', 'ROTAKE': 'Rotake', 'THINKCAR': 'Thinkcar',
          'LAUNCH': 'Launch', 'PHIXWELL': 'Phixwell', 'FANBAO': 'Fanbao', 'TCE': 'TCE', 'SUMMARY': 'Summary'}
UNIDADES = [(r'(?<=\d)\s*v\b', ' V'), (r'(?<=\d)hz\b', ' Hz'), (r'(?<=\d)hp\b', ' HP'), (r'(?<=\d)kw\b', ' kW'), (r'(?<=\d)kgs?\b', ' kg'), (r'(?<=\d)psi\b', ' PSI'), (r'\bhz\b', 'Hz'), (r'\bkgs?\b', 'kg'), (r'(?<=\d)\s*nm\b', ' Nm'), (r'\bnm\b', 'Nm'), (r'\bppsi\b', 'PSI'),
            (r'\bpsi\b', 'PSI'), (r'\bhp\b', 'HP'), (r'\bkw\b', 'kW'), (r'\bnpt\b', 'NPT'), (r'\bntp\b', 'NPT'), (r'\bcfm\b', 'CFM'),
            (r'\bmpa\b', 'MPa'), (r'\brpm\b', 'RPM'), (r'\blts?\b', 'L'), (r'\bmts\b', 'm'), (r'\bgr\b', 'g'), (r'\bglns\b', 'galones'),
            (r'\bapo\b', 'APO'), (r'\bdc\b', 'DC'), (r'\bipm\b', 'IPM')]


TILDES = {
    'neumatica': 'neumática', 'neumatico': 'neumático', 'neumaticas': 'neumáticas', 'hidraulica': 'hidráulica', 'hidraulico': 'hidráulico',
    'retractil': 'retráctil', 'maxima': 'máxima', 'maximo': 'máximo', 'minima': 'mínima', 'presion': 'presión', 'garantia': 'garantía',
    'trifasico': 'trifásico', 'monofasico': 'monofásico', 'cañon': 'cañón', 'carroceria': 'carrocería', 'carrocerias': 'carrocerías',
    'diametro': 'diámetro', 'lubricacion': 'lubricación', 'conexion': 'conexión', 'relacion': 'relación', 'compresion': 'compresión',
    'extension': 'extensión', 'bateria': 'batería', 'estandar': 'estándar', 'tension': 'tensión', 'piston': 'pistón', 'movil': 'móvil',
    'mecanica': 'mecánica', 'alimentacion': 'alimentación', 'contometro': 'contómetro', 'cajon': 'cajón', 'maquina': 'máquina',
    'electrica': 'eléctrica', 'electrico': 'eléctrico', 'herraminetas': 'herramientas', 'pedal': 'pedal', 'basica': 'básica',
}
ETIQUETAS = {'N.W': 'Peso neto / bruto', 'Nw': 'Peso neto / bruto', 'Paquete': 'Medidas del paquete'}


def tildes(s):
    def f(m):
        w = m.group(0)
        n = TILDES.get(w.lower())
        if not n:
            return w
        return n.capitalize() if w[:1].isupper() else n
    return re.sub(r'[A-Za-zñÑ]+', f, s)


def medidas(s):
    s = re.sub(r'(?<=\d)\s*[*x×]\s*(?=\d)', ' × ', s)
    s = re.sub(r'(\d)\s*(mm|cm)\b', lambda m: f'{m.group(1)} {m.group(2).lower()}', s, flags=re.I)
    return re.sub(r'\bKgs?\b', 'kg', s)


def es_mayus(s):
    letras = [c for c in s if c.isalpha()]
    return bool(letras) and sum(c.isupper() for c in letras) / len(letras) > 0.6


def unidades(s):
    for patron, nuevo in UNIDADES:
        s = re.sub(patron, nuevo, s, flags=re.I)
    return s


def oracion(s):
    s = s.strip().rstrip('.').strip()
    if es_mayus(s):
        s = unidades(s.lower())
    s = medidas(tildes(s))
    return s[:1].upper() + s[1:]


def slug(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = s.replace('″', '').replace('"', '').replace('/', '-')
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')


def nombre_limpio(n):
    n = re.sub(r'\s*[–-]\s*COD:?\s*\S+', '', n).strip()
    palabras = n.split()
    out = []
    for i, w in enumerate(palabras):
        base = w.strip('().,')
        if base.upper() in MARCAS and base.upper() not in ('BIG', 'RED'):
            out.append(MARCAS[base.upper()])
        elif re.search(r'\d', base) and re.search(r'[A-Za-z]', base) and not re.fullmatch(r'\d+[A-Za-z]{1,3}', base):
            out.append(w)  # códigos como TY20030, RT-5280K
        elif base.upper() in ('TTK', 'PVC', 'LED'):
            out.append(base.upper())
        elif base.upper() in ('TON', 'KG'):
            out.append(base.lower())
        elif base.upper() in ('LTS', 'LTRS'):
            out.append('L')
        elif i == 0:
            out.append(w.capitalize())
        else:
            out.append(w.lower())
    r = ' '.join(out)
    r = re.sub(r'\bton-\s*', 'ton ', r)
    r = re.sub(r'\b(tipo) ([a-z])$', lambda m: m.group(1) + ' ' + m.group(2).upper(), r)
    r = tildes(r)
    r = re.sub(r'(\d)NM\b', r'\1 Nm', r, flags=re.I)
    return r.replace('ʺ', '″')


def codigo(corto, nombre):
    m = re.search(r'(?:COD(?:IGO)?|C[OÓ]DIGO|MODELO)\s*:?\s*([A-Z0-9][A-Z0-9\-\./ ]*?)\s*(?:\.|\||/|$)', corto, re.I)
    if m:
        c = m.group(1).replace(' ', '').strip('.-')
        if c:
            return c
    m = re.search(r'[»«]\s*-?\s*([A-Z]{1,4}-?\d[A-Z0-9\-]*)\s*\.', corto)
    if m:
        return m.group(1)
    m = re.search(r'\b([A-Z]{1,5}-?\d[A-Z0-9\-]*)\b(?!.*\b[A-Z]{1,5}-?\d)', nombre.upper())
    return m.group(1) if m and not re.fullmatch(r'\d+', m.group(1)) else ''


def marca(corto, nombre):
    m = re.search(r'MARCA\s*[:»«]*\s*[»«]?\s*([^»«|/\.;,]+?)\s*(?:[»«]|\||/|\.|;|,|$)', corto, re.I)
    if m:
        k = m.group(1).strip().upper()
        return MARCAS.get(k, k.title())
    for k, v in MARCAS.items():
        if re.search(rf'\b{k}\b', nombre.upper()) and k not in ('BIG RED', 'BIGRED'):
            return v
    return ''


def datos(corto, nombre_orig, cod):
    specs, carac = [], []
    for it in [x.strip() for x in corto.split('|')]:
        if not it or len(it) > 95:
            continue
        u = it.upper()
        if re.match(r'^(MARCA|COD|C[OÓ]DIGO|MODELO)\b', u) or 'MARCA»' in u or 'MARCA «' in u or u.rstrip('.') == nombre_orig.upper().rstrip('.'):
            continue
        if cod and u.replace('.', '').strip() == cod.upper():
            continue
        if ':' in it:
            k, v = it.split(':', 1)
            specs.append([ETIQUETAS.get(k.strip(), oracion(k)), medidas(tildes(oracion(v) if es_mayus(v) else v.strip().rstrip('.')))])
            continue
        m = re.match(r'^([A-ZÁÉÍÓÚÑa-záéíóúñ ]{4,}?)\s+(\d[\d\.,/\-–x×\* ]*[A-Za-z″"%/°]*.*)$', it)
        if m and not re.match(r'^(INCLUYE|DE|CON)\b', m.group(1).upper()) and not re.search(r'\b(de|del|en|con|para|por|y)$', m.group(1).strip(), re.I):
            specs.append([oracion(m.group(1)), medidas(tildes(oracion(m.group(2)) if es_mayus(m.group(2)) else m.group(2).strip().rstrip('.')))])
        else:
            carac.append(oracion(it))
    vistos, sp = set(), []
    for k, v in specs:
        if k not in vistos:
            vistos.add(k)
            sp.append([k, v])
    return sp, carac


def familia(cat, nombre, corto):
    n = nombre.upper()
    if cat == 'pistolas-de-impacto':
        return 'media' if '1/2' in n else 'tres-cuartos' if '3/4' in n else 'una'
    if cat == 'prensas-hidraulicas':
        t = int(re.search(r'(\d+)\s*TON', n).group(1))
        return 'hasta-20' if t <= 20 else '30' if t <= 30 else '50-mas'
    if cat == 'lubricacion':
        if re.search(r'ENGRAS|GRASA', n):
            return 'engrase'
        if re.search(r'LAVADERO|SHAMPOO', n):
            return 'lavaderos'
        return 'aceite'
    if cat == 'elevadores':
        if 'MOTO' in n:
            return 'motos'
        if 'LAVADO' in n:
            return 'lavado'
        if 'NEUM' in n or 'ROLLING' in n:
            return 'neumaticos'
        if 'TIJERA' in n or 'ALTURA' in n or 'RAMPA' in n:
            return 'tijera'
        return 'columnas'
    if cat == 'coches-y-mesas':
        abiertos = ('PORTA SCANNER', 'C300', 'C310', 'TC301-2', 'TC310', 'TC327')
        return 'abierto' if any(a in n for a in abiertos) else 'cerrado'
    return None


def main():
    filas = [l.split('~', 4) for l in FUENTE.read_text(encoding='utf-8').splitlines() if l.strip()]
    productos, usados = [], set()
    for c, n_orig, _, _, corto in filas:
        cat = CATEGORIA[c]
        n = nombre_limpio(n_orig)
        cod = codigo(corto, n_orig)
        mar = marca(corto, n_orig)
        sp, carac = datos(corto, n_orig, cod)
        s = slug(n)
        if s in usados and cod:
            s = slug(f'{n} {cod}')
        k = 2
        base = s
        while s in usados:
            s = f'{base}-{k}'
            k += 1
        usados.add(s)
        cap = re.search(r'(\d+(?:[.,]\d+)?)\s*TON', n_orig.upper())
        p = {'slug': s, 'nombre': n, 'categoria': cat}
        fam = familia(cat, n_orig, corto)
        if fam:
            p['familia'] = fam
        if cod:
            p['ref'] = cod  # referencia interna: no se muestra en la web
        if cat == 'prensas-hidraulicas' and cap:
            p['capacidad'] = f'{cap.group(1)} toneladas'
        p['resumen'] = f'{n}. Equipo para {PARA[cat]}. Consulta disponibilidad, garantía y precio.'
        if sp:
            p['specs'] = sp
        if carac:
            p['caracteristicas'] = carac
        p['pendiente'] = True
        productos.append(p)
    cuerpo = json.dumps(productos, ensure_ascii=False, indent=2)
    SALIDA.write_text(
        '// GENERADO por scripts/generar-catalogo.py desde docs/fuente-equipos-taller.tsv. No editar a mano.\n'
        '// Solo datos técnicos (medidas, capacidades). La marca y el código no se muestran: `ref` es solo referencia interna. Sin precios ni fotos. PENDIENTE: confirmar con Hidrofluid\n'
        '// qué modelos tiene disponibles, y completar garantía, fotos propias y precio.\n\n'
        "import type { Producto } from './catalogo';\n\n"
        f'export const equiposTaller: Producto[] = {cuerpo};\n',
        encoding='utf-8',
    )
    print(len(productos), 'productos ->', SALIDA)


if __name__ == '__main__':
    main()
