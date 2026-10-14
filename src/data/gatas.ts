// Línea de gatas de taller (mismos modelos que distribuye el mercado peruano, marca Big Red / Torin).
// Fuente: fichas técnicas públicas de los modelos (código del fabricante, capacidad y alturas).
// PENDIENTE: confirmar con Hidrofluid disponibilidad, precio y garantía de cada modelo.
// Las fotos de catálogo se toman en el banco de fotos propio (ver docs/banco-de-fotos.md).

import type { Producto } from './catalogo';

type Fila = [
  slug: string,
  nombre: string,
  familia: 'botella' | 'lagarto' | 'telescopica' | 'piso' | 'motos',
  marca: string,
  codigo: string,
  capacidad: string,
  alturaMin: string,
  alturaMax: string,
  extra?: [string, string][],
];

const filas: Fila[] = [
  // Gatas botella
  ['gata-botella-2-ton', 'Gata botella 2 ton', 'botella', 'Big Red', 'T90204', '2 t', '181 mm', '345 mm'],
  ['gata-botella-4-ton', 'Gata botella 4 ton', 'botella', 'Big Red', 'T90404', '4 t', '194 mm', '372 mm'],
  ['gata-botella-6-ton', 'Gata botella 6 ton', 'botella', 'Big Red', 'TH90604', '6 t', '207 mm', '402 mm'],
  ['gata-botella-10-ton', 'Gata botella 10 ton', 'botella', 'Big Red', 'T91004', '10 t', '230 mm', '460 mm'],
  ['gata-botella-alta-20-ton', 'Gata botella alta 20 ton', 'botella', 'Big Red', 'T92004', '20 t', '242 mm', '460 mm'],
  ['gata-botella-alta-32-ton', 'Gata botella alta 32 ton', 'botella', 'Big Red', 'T93204', '32 t', '285 mm', '465 mm'],
  ['gata-botella-estandar-32-ton', 'Gata botella estándar 32 ton', 'botella', 'Big Red', 'TH93204', '32 t', '260 mm', '420 mm'],
  ['gata-botella-estandar-50-ton', 'Gata botella estándar 50 ton', 'botella', 'Big Red', 'TH95004', '50 t', '280 mm', '450 mm'],
  ['gata-botella-perfil-bajo-12-ton', 'Gata botella perfil bajo 12 ton', 'botella', 'Big Red', 'T91207', '12 t', '190 mm', '350 mm'],
  ['gata-botella-perfil-bajo-20-ton', 'Gata botella perfil bajo 20 ton', 'botella', 'Big Red', 'T92007', '20 t', '195 mm', '335 mm', [['Uso', 'Buses y camiones']]],
  ['gata-botella-neumatica-20-ton', 'Gata botella neumática 20 ton', 'botella', '', 'TQ20002', '20 t', '267 mm', '510 mm', [['Salida del pistón', '165 mm'], ['Salida del tornillo', '82 mm']]],
  ['gata-botella-neumatica-30-ton', 'Gata botella neumática 30 ton', 'botella', '', 'TRQ30002', '30 t', '', '405 mm'],
  ['gata-botella-neumatica-35-ton', 'Gata botella neumática 35 ton', 'botella', '', 'TRQ35002', '35 t', '', '405 mm'],
  ['gata-botella-neumatica-50-ton', 'Gata botella neumática 50 ton', 'botella', '', 'TRQ50002', '50 t', '290 mm', '450 mm', [['Salida del pistón', '160 mm']]],
  ['gata-botella-neumatica-perfil-bajo-20-ton', 'Gata botella neumática perfil bajo 20 ton', 'botella', 'Big Red', 'TL-A3020L', '20 t', '148 mm', '260 mm', [['Salida del tornillo', '45 mm'], ['Presión de aire', '0,7 a 1,0 MPa']]],
  ['gata-botella-para-pluma-hidraulica', 'Gata botella para pluma hidráulica', 'botella', 'Big Red', 'T30508', '5 t', '', ''],

  // Gatas lagarto
  ['gata-lagarto-2-ton', 'Gata lagarto 2 ton', 'lagarto', 'Big Red', 'T825010R', '2 t', '89 mm', '359 mm', [['Dimensiones', '556 × 234 × 140 mm']]],
  ['gata-lagarto-2-ton-aluminio', 'Gata lagarto 2 ton aluminio', 'lagarto', 'Big Red', 'T820010L', '2 t', '90 mm', '440 mm', [['Dimensiones', '670 × 310 × 163 mm'], ['Peso', '21 kg'], ['Sistema', 'Doble pistón y cardán']]],
  ['gata-lagarto-2-ton-auxilio', 'Gata lagarto 2 ton de auxilio', 'lagarto', 'Big Red', 'TA820011S', '2 t', '140 mm', '285 mm', [['Dimensiones', '390 × 195 × 140 mm'], ['Peso', '5,6 kg']]],
  ['gata-lagarto-3-ton', 'Gata lagarto 3 ton', 'lagarto', 'Big Red', 'T83003C', '3 t', '130 mm', '410 mm', [['Dimensiones', '625 × 242 × 158 mm']]],
  ['gata-lagarto-3-ton-comercial', 'Gata lagarto 3 ton comercial', 'lagarto', 'Big Red', 'T830025', '3 t', '130 mm', '465 mm', [['Dimensiones', '572 × 328 × 175 mm']]],
  ['gata-lagarto-3-ton-doble-piston-basica', 'Gata lagarto 3 ton doble pistón básica', 'lagarto', 'Big Red', 'T830023', '3 t', '130 mm', '465 mm', [['Dimensiones', '630 × 328 × 162 mm'], ['Sistema', 'Doble pistón']]],
  ['gata-lagarto-3-ton-estandar', 'Gata lagarto 3 ton estándar', 'lagarto', 'Big Red', 'T830022', '3 t', '140 mm', '520 mm', [['Dimensiones', '660 × 344 × 180 mm']]],
  ['gata-lagarto-3-ton-pesada', 'Gata lagarto 3 ton pesada', 'lagarto', 'Big Red', 'T83001', '3 t', '140 mm', '520 mm', [['Dimensiones', '675 × 346 × 180 mm']]],
  ['gata-lagarto-3-ton-racing', 'Gata lagarto 3 ton racing', 'lagarto', 'Big Red', 'T83003L', '3 t', '98 mm', '480 mm', [['Dimensiones', '730 × 320 × 180 mm'], ['Peso', '24 kg']]],
  ['gata-lagarto-3-ton-perfil-bajo', 'Gata lagarto 3 ton perfil bajo', 'lagarto', 'Big Red', 'TZ830026', '3 t', '75 mm', '515 mm', [['Dimensiones', '722 × 328 × 150 mm'], ['Sistema', 'Doble pistón y cardán']]],
  ['gata-lagarto-perfil-bajo-3-ton', 'Gata lagarto perfil bajo 3 ton', 'lagarto', 'Big Red', 'TZA830003', '3 t', '95 mm', '505 mm'],
  ['gata-lagarto-perfil-bajo-3-ton-tfj330', 'Gata lagarto perfil bajo 3 ton TFJ330', 'lagarto', '', 'TFJ330', '3 t', '85 mm', '500 mm', [['Dimensiones', '702 × 343 × 158 mm']]],
  ['gata-lagarto-hibrida-3-ton', 'Gata lagarto híbrida 3 ton', 'lagarto', 'Big Red', 'T830027', '3 t', '98 mm', '585 mm', [['Dimensiones', '795 × 335 × 170 mm']]],
  ['gata-lagarto-3-ton-chasis-largo', 'Gata lagarto 3 ton chasis largo', 'lagarto', 'Big Red', 'TR30001', '3 t', '160 mm', '560 mm', [['Dimensiones', '1412 × 418 × 186 mm']]],
  ['gata-lagarto-3-ton-chasis-largo-profesional', 'Gata lagarto 3 ton chasis largo profesional', 'lagarto', 'Big Red', 'T830028', '3 t', '140 mm', '525 mm', [['Dimensiones', '1150 × 350 × 180 mm']]],
  ['gata-lagarto-3-5-ton-pedal', 'Gata lagarto 3,5 ton con pedal', 'lagarto', 'Big Red', 'T83502', '3,5 t', '145 mm', '500 mm', [['Dimensiones', '685 × 346 × 180 mm']]],
  ['gata-lagarto-perfil-bajo-3-5-ton', 'Gata lagarto perfil bajo 3,5 ton', 'lagarto', 'Big Red', 'T83508', '3,5 t', '98 mm', '535 mm', [['Dimensiones', '760 × 345 × 170 mm']]],
  ['gata-lagarto-4-ton-perfil-bajo', 'Gata lagarto 4 ton perfil bajo', 'lagarto', 'Big Red', 'T84007', '4 t', '98 mm', '508 mm', [['Dimensiones', '726 × 342 × 170 mm']]],
  ['gata-lagarto-perfil-bajo-4-ton-tfj340', 'Gata lagarto perfil bajo 4 ton TFJ340', 'lagarto', '', 'TFJ340', '4 t', '100 mm', '533 mm', [['Dimensiones', '751 × 359 × 162 mm']]],
  ['gata-lagarto-5-ton-chasis-largo', 'Gata lagarto 5 ton chasis largo', 'lagarto', 'Big Red', 'TR50001', '5 t', '160 mm', '560 mm', [['Dimensiones', '1412 × 418 × 186 mm']]],
  ['gata-lagarto-10-ton-chasis-largo', 'Gata lagarto 10 ton chasis largo', 'lagarto', 'Big Red', 'TR100001', '10 t', '160 mm', '560 mm', [['Dimensiones', '1540 × 486 × 255 mm']]],
  ['gata-lagarto-20-ton-chasis-largo', 'Gata lagarto 20 ton chasis largo', 'lagarto', 'Big Red', 'TR200001', '20 t', '220 mm', '560 mm', [['Dimensiones', '1540 × 486 × 255 mm']]],
  ['gata-lagarto-neumatica-5-ton', 'Gata lagarto neumática 5 ton', 'lagarto', 'Big Red', '', '5 t', '', ''],
  ['gata-lagarto-neumatica-22-ton', 'Gata lagarto neumática 22 ton', 'lagarto', 'Big Red', 'TQ22001', '22 t', '220 mm', '435 mm', [['Salida del pistón', '110 mm'], ['Salida del tornillo', '105 mm'], ['Presión de aire', '0,7 a 1,2 MPa'], ['Incluye', 'Calzas de elevación']]],
  ['gata-lagarto-neumatica-35-ton', 'Gata lagarto neumática 35 ton', 'lagarto', 'Big Red', 'TQ35001', '35 t', '250 mm', '495 mm', [['Salida del pistón', '130 mm'], ['Salida del tornillo', '115 mm'], ['Presión de aire', '0,7 a 1,2 MPa'], ['Incluye', 'Calzas de elevación']]],
  ['gata-lagarto-neumatica-30-15-ton-portatil', 'Gata lagarto neumática 30/15 ton portátil', 'lagarto', 'Big Red', 'TRA30SP', '30 / 15 t', '150 mm', '', [['Salida del pistón', '73 mm (30 t) / 66 mm (15 t)'], ['Extensiones', '75 + 45 mm'], ['Presión de aire', '0,9 a 1,2 MPa']]],
  ['gata-lagarto-neumatica-40-20-ton', 'Gata lagarto neumática 40/20 ton', 'lagarto', '', '', '40 / 20 t', '190 mm', '', [['Salida del pistón', '106 mm (40 t) / 88 mm (20 t)'], ['Presión de aire', '0,9 a 1,2 MPa']]],
  ['gata-lagarto-neumatica-50-25-ton', 'Gata lagarto neumática 50/25 ton', 'lagarto', 'Big Red', 'TRA50-2A', '50 / 25 t', '215 mm', '', [['Salida del pistón', '115 mm (50 t) / 114 mm (25 t)'], ['Extensiones', '75 + 45 mm'], ['Presión de aire', '0,9 a 1,2 MPa']]],
  ['gata-lagarto-neumatica-80-50-ton', 'Gata lagarto neumática 80/50 ton', 'lagarto', 'Big Red', 'TRA80-2A', '80 / 50 t', '230 mm', '', [['Salida del pistón', '111 mm (80 t) / 102 mm (50 t)'], ['Extensiones', '75 + 45 mm'], ['Presión de aire', '0,9 a 1,2 MPa']]],

  // Gatas de transmisión
  ['gata-de-transmision-300-kg', 'Gata de transmisión 300 kg', 'telescopica', 'Big Red', 'TEL03004S', '300 kg', '1140 mm', '1945 mm'],
  ['gata-de-transmision-300-kg-telescopica', 'Gata de transmisión 300 kg telescópica', 'telescopica', 'Big Red', 'TEL03005', '300 kg', '1235 mm', '2050 mm', [['Bandeja', 'Regulable para cajas automáticas']]],
  ['gata-de-transmision-500-kg', 'Gata de transmisión 500 kg', 'telescopica', 'Big Red', 'TEL05006', '500 kg', '875 mm', '1855 mm'],
  ['gata-de-transmision-600-kg', 'Gata de transmisión 600 kg', 'telescopica', 'Big Red', 'TEL06011', '600 kg', '1135 mm', '1980 mm'],
  ['gata-de-transmision-1-ton-telescopica', 'Gata de transmisión 1 ton telescópica', 'telescopica', 'Big Red', 'TEL10001', '1 t', '880 mm', '1915 mm'],
  ['gata-lagarto-de-transmision-500-kg', 'Gata lagarto de transmisión 500 kg', 'piso', 'Big Red', 'TE05001', '500 kg', '215 mm', '590 mm'],
  ['gata-lagarto-de-transmision-1-ton', 'Gata lagarto de transmisión 1 ton', 'piso', 'Big Red', 'TE10001', '1 t', '210 mm', '780 mm'],
  ['gata-lagarto-de-transmision-1-5-ton', 'Gata lagarto de transmisión 1,5 ton', 'piso', 'Big Red', 'TRE15001', '1,5 t', '270 mm', '900 mm'],

  // Gatas para motos
  ['gata-de-motocicletas-680-kg', 'Gata de motocicletas 680 kg', 'motos', 'Big Red', 'TR5154C-J', '680 kg', '120 mm', '400 mm'],
  ['gata-hidraulica-para-motocicletas', 'Gata hidráulica para motocicletas y cuatrimotos', 'motos', '', 'TRG40001-20', '', '', '', [['Accionamiento', 'Hidráulico con pedal']]],
];

const resumenes: Record<Fila[2], (cap: string) => string> = {
  telescopica: (c) => `Gata de transmisión telescópica${c ? ` de ${c}` : ''} para cajas de cambio y diferenciales trabajando desde fosa o elevador.`,
  piso: (c) => `Gata de transmisión de piso${c ? ` de ${c}` : ''} para montar y desmontar cajas de cambio y diferenciales de forma segura.`,
  botella: (c) => `Gata hidráulica tipo botella${c ? ` de ${c}` : ''} para levante vertical de vehículos, ejes y cargas en taller.`,
  lagarto: (c) => `Gata hidráulica tipo lagarto${c ? ` de ${c}` : ''} con ruedas, para levante rápido y seguro de vehículos en taller.`,
  motos: () => 'Gata hidráulica para levantar motocicletas en taller y realizar mantenimiento con comodidad.',
};

const usos: Record<Fila[2], string[]> = {
  botella: ['Cambio de neumáticos', 'Levante de ejes y chasis', 'Prensas y trabajos de taller'],
  lagarto: ['Talleres de mecánica', 'Llanterías y mecánica rápida', 'Mantenimiento de flotas'],
  telescopica: ['Desmontaje de cajas de cambio desde fosa o elevador', 'Cajas automáticas y mecánicas'],
  piso: ['Desmontaje de cajas de cambio', 'Montaje de transmisiones y diferenciales'],
  motos: ['Talleres de motos', 'Mantenimiento y limpieza'],
};

export const gatas: Producto[] = filas.map(([slug, nombre, familia, marca, codigo, capacidad, min, max, extra = []]) => ({
  slug,
  nombre,
  categoria: familia === 'telescopica' || familia === 'piso' ? 'gatas-de-transmision' : 'gatas-de-taller',
  familia,
  ...(marca ? { marca } : {}),
  ...(codigo ? { codigo } : {}),
  ...(capacidad ? { capacidad: capacidad.replace(/ t$/, ' toneladas') } : {}),
  resumen: resumenes[familia](capacidad.replace(/ t$/, ' toneladas')),
  specs: [...(min ? [['Altura mínima', min] as [string, string]] : []), ...(max ? [['Altura máxima', max] as [string, string]] : []), ...extra],
  usos: usos[familia],
  pendiente: true,
}));
