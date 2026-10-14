# Banco de fotos y fichas del catálogo Hidrofluid

Objetivo: que cada producto en venta tenga fotos en **fondo blanco**, como en las tiendas de equipos (como en las tiendas de equipos de taller), y una ficha completa. Primero ordenamos fotos y datos; después escribimos las descripciones.

Regla de separación:
- **Venta de equipos** (catálogo): gatas, plumas, prensas, llaves de impacto, lubricación, coches, hidrolavadoras, EPP.
- **Mantenimiento y fabricación** (galería de trabajos): soportes de motor y corona, reparaciones, equipos fabricados a pedido. Estas fotos **no** van al catálogo de venta.

---

## 1. Estándar de la foto de catálogo

| Punto | Estándar |
|---|---|
| Formato final | JPG cuadrado 1:1, 1600 × 1600 px |
| Fondo | Blanco puro (#FFFFFF) |
| Encuadre | Equipo centrado, ocupa cerca del 84 % del cuadro, sombra suave debajo |
| Vistas por producto | 1) principal en 3/4 frontal, 2) lateral, 3) detalle (placa, manómetro, válvula o ruedas), 4) en uso (opcional) |
| Prohibido | Otros objetos alrededor, personas tapando el equipo, logos de otras marcas como fondo, filtros o textos encima |

La foto **1 (principal)** es la que aparece en la grilla del catálogo. Todas deben tomarse con el mismo ángulo para que la grilla se vea ordenada.

## 2. Cómo tomar las fotos (con celular)

1. **Fondo**: papel continuo o tela blanca. Para equipos grandes (prensas, plumas), una pared clara y piso limpio; el fondo se limpia después con el script.
2. **Luz**: luz natural de día, sin sol directo, o 2 luces LED a 45° a cada lado. Evitar sombras duras.
3. **Cámara**: modo foto normal (no retrato), sin zoom digital, a la altura de la mitad del equipo. Usar trípode o apoyar el celular.
4. **Limpieza**: equipo limpio, sin grasa visible ni etiquetas sueltas. Quitar herramientas y cajas alrededor.
5. **Varias tomas**: 3 a 5 por vista; luego se elige la mejor.

## 3. Nombres de archivo

```
<slug-del-producto>-<numero-de-vista>.jpg
gata-botella-10-ton-1.jpg     ← principal
gata-botella-10-ton-2.jpg     ← lateral
gata-botella-10-ton-3.jpg     ← detalle
```

El `slug` es el nombre del producto en minúsculas, sin tildes y con guiones. Es el mismo de la columna `slug` de `inventario-catalogo.csv` y de la web (`/producto/<slug>`).

## 4. Carpetas en Google Drive

```
Banco de fotos Hidrofluid/
├── 01-originales/<categoria>/<slug>/   fotos tal cual salen del celular
├── 02-fondo-blanco/<categoria>/        resultado del script (revisado)
└── 03-descartadas/
```

Categorías (igual que en la web): `gatas-de-taller`, `plumas-hidraulicas`, `prensas-hidraulicas`, `herramientas-neumaticas`, `lubricacion`, `herramientas-especiales`, `coches-y-almacenaje`, `hidrolavadoras`, `epp-y-seguridad`.

## 5. Procesar a fondo blanco

El script `apps/landing/scripts/fotos-fondo-blanco.py` quita el fondo, centra el equipo y genera el JPG cuadrado con sombra suave.

```bash
python3 -m venv ~/.venvs/fotos && ~/.venvs/fotos/bin/pip install "rembg[cpu]==2.0.50" pillow
~/.venvs/fotos/bin/python apps/landing/scripts/fotos-fondo-blanco.py ENTRADA SALIDA
```

La primera vez descarga el modelo de recorte (unos 180 MB). Con fondos limpios el resultado sale listo; con fondos de taller cargados puede dejar restos (por ejemplo, lo que se ve a través de una malla). Por eso el paso 2 importa.

**Control de calidad antes de subir:** bordes limpios, sin restos de otros objetos, equipo completo (sin partes cortadas), color real del equipo.

## 6. Subir a la web

1. Copiar la foto principal a `apps/landing/src/assets/productos/<slug>.jpg`.
2. En `apps/landing/src/data/catalogo.ts`, poner `foto: '<slug>'` en el producto.
3. Completar `codigo`, `marca`, `capacidad`, `specs` y `precio` si se publicará. Los campos vacíos no se muestran.

## 7. Ficha de cada producto (después de las fotos)

| Campo | Ejemplo |
|---|---|
| Nombre | Gata botella 10 ton |
| Marca / modelo | [MARCA] / [MODELO] |
| Código interno | [CÓDIGO] |
| Capacidad | 10 toneladas |
| Altura mínima / máxima | [mm] / [mm] |
| Peso | [kg] |
| Usos | Cambio de neumáticos, levante de ejes |
| Garantía | [plazo] por escrito |
| Precio | [S/] o "a cotizar" |
| Estado | Stock / a pedido |

## 8. Orden de trabajo sugerido

| Semana | Tarea |
|---|---|
| 1 | Completar `inventario-catalogo.csv` con todos los productos que se venden. Empezar por **gatas de taller** (transmisión, botella, lagarto), que es lo que más se vende. |
| 1 | Sesión de fotos de gatas. Procesar y revisar. |
| 2 | Plumas, prensas, llaves de impacto y lubricación. |
| 2 | Coches, mesas, hidrolavadoras y EPP. |
| 3 | Fichas técnicas y precios (o "a cotizar") por categoría. Subir a la web. |
| 3 | Revisar en Google Search Console que las fichas estén indexadas. |

## 9. Imágenes generadas con IA (Higgsfield)

Solo para fotos de ambiente (portada, banners, redes): por ejemplo, un técnico usando una hidrolavadora en planta. **Nunca** para la foto del producto en venta: el cliente debe ver el equipo real que va a comprar.
