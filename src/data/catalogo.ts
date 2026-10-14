import { gatas } from './gatas';
import { equiposTaller } from './equipos-taller';
import { sanear } from './limpiar';
import { fotosCatalogo } from './fotos';

// Catálogo de VENTA de equipos ("Para tu taller").
// Lo que Hidrofluid repara o fabrica a pedido (soportes de motor, etc.) va en Servicios, no aquí.
//
// Cómo agregar un producto: copia un objeto de `productos`, cambia slug, nombre y categoría.
// - `foto`: nombre del archivo en src/assets/productos (fondo blanco, 1:1, SIN marcas de agua).
// - `codigo`, `marca`, `precio`: déjalos vacíos si no están confirmados. La web no muestra campos vacíos.
// - `pendiente: true` marca fichas que aún faltan validar con el taller (solo es una nota interna).

export type Grupo = { slug: string; nombre: string };

export type Categoria = {
  slug: string;
  nombre: string;
  grupo: string;
  descripcion: string;
  icono: string;
  familias?: { slug: string; nombre: string }[];
};

export type Producto = {
  slug: string;
  nombre: string;
  categoria: string;
  familia?: string;
  /** Referencia interna del proveedor. NO se muestra en la web. */
  ref?: string;
  /** Solo de entrada: `sanear()` los elimina antes de publicar. */
  marca?: string;
  codigo?: string;
  capacidad?: string;
  precio?: number;
  resumen: string;
  specs?: [string, string][];
  /** Puntos de la ficha que no son un dato con etiqueta (por ejemplo "Incluye accesorios"). */
  caracteristicas?: string[];
  usos?: string[];
  foto?: string;
  pendiente?: boolean;
};

// Grupos del menú "Venta de equipos" (como "Para tu taller").
export const grupos: Grupo[] = [
  { slug: 'hidraulicos', nombre: 'Equipos hidráulicos' },
  { slug: 'herramientas', nombre: 'Taller y herramientas' },
  { slug: 'limpieza', nombre: 'Limpieza y seguridad' },
];

export const categorias: Categoria[] = [
  // Equipos hidráulicos
  {
    slug: 'gatas-de-taller',
    nombre: 'Gatas de taller',
    grupo: 'hidraulicos',
    descripcion: 'Gatas hidráulicas tipo botella y lagarto, manuales y neumáticas, para autos, camionetas, buses y camiones.',
    icono: 'crane',
    familias: [
      { slug: 'botella', nombre: 'Gatas botella' },
      { slug: 'lagarto', nombre: 'Gatas lagarto' },
      { slug: 'motos', nombre: 'Gatas para motos' },
    ],
  },
  {
    slug: 'gatas-de-transmision',
    nombre: 'Gatas de transmisión',
    grupo: 'hidraulicos',
    descripcion: 'Gatas de transmisión telescópicas y de piso para montar y desmontar cajas de cambio, transmisiones y diferenciales.',
    icono: 'crane',
    familias: [
      { slug: 'telescopica', nombre: 'Telescópicas' },
      { slug: 'piso', nombre: 'De piso' },
    ],
  },
  {
    slug: 'plumas-hidraulicas',
    nombre: 'Plumas hidráulicas',
    grupo: 'hidraulicos',
    descripcion: 'Plumas hidráulicas para izaje de motores y componentes pesados en taller.',
    icono: 'crane',
  },
  {
    slug: 'prensas-hidraulicas',
    nombre: 'Prensas hidráulicas',
    grupo: 'hidraulicos',
    descripcion: 'Prensas hidráulicas y neumohidráulicas de taller de 10 a 75 toneladas para montaje y desmontaje de rodamientos, bujes y piezas a presión.',
    icono: 'gear',
    familias: [
      { slug: 'hasta-20', nombre: 'Hasta 20 ton' },
      { slug: '30', nombre: '30 ton' },
      { slug: '50-mas', nombre: '50 ton o más' },
    ],
  },
  {
    slug: 'elevadores',
    nombre: 'Elevadores',
    grupo: 'hidraulicos',
    descripcion: 'Elevadores de dos y cuatro columnas, de tijera, para motos, para neumáticos y para lavado de vehículos.',
    icono: 'crane',
    familias: [
      { slug: 'columnas', nombre: 'Columnas y puente' },
      { slug: 'tijera', nombre: 'De tijera y media altura' },
      { slug: 'motos', nombre: 'Para motos' },
      { slug: 'neumaticos', nombre: 'Para neumáticos' },
      { slug: 'lavado', nombre: 'Para lavado' },
    ],
  },
  {
    slug: 'izaje-y-manipulacion',
    nombre: 'Izaje y manipulación',
    grupo: 'hidraulicos',
    descripcion: 'Apiladores manuales y tecles de cadena, de palanca y eléctricos para levantar y mover cargas en taller y planta.',
    icono: 'crane',
    familias: [
      { slug: 'apiladores', nombre: 'Apiladores' },
      { slug: 'tecles', nombre: 'Tecles' },
    ],
  },
  {
    slug: 'carroceria',
    nombre: 'Carrocería y planchado',
    grupo: 'hidraulicos',
    descripcion: 'Estiradores de chasis, expansores, kits hidráulicos, desabolladores, lámparas de secado y accesorios para carrocería.',
    icono: 'wrench',
  },
  // Taller y herramientas
  {
    slug: 'pistolas-de-impacto',
    nombre: 'Pistolas de impacto',
    grupo: 'herramientas',
    descripcion: 'Pistolas de impacto neumáticas e inalámbricas de 1/2", 3/4" y 1" para neumáticos y trabajos de alto torque.',
    icono: 'wrench',
    familias: [
      { slug: 'media', nombre: 'Encastre 1/2"' },
      { slug: 'tres-cuartos', nombre: 'Encastre 3/4"' },
      { slug: 'una', nombre: 'Encastre 1"' },
    ],
  },
  {
    slug: 'herramientas-de-torque',
    nombre: 'Herramientas de torque',
    grupo: 'herramientas',
    descripcion: 'Torquímetros de dial, de trinquete y digitales, y llaves de torque eléctricas y a batería para ajuste controlado.',
    icono: 'wrench',
    familias: [
      { slug: 'llaves-de-torque', nombre: 'Llaves de torque' },
      { slug: 'torquimetros', nombre: 'Torquímetros' },
    ],
  },
  {
    slug: 'lubricacion',
    nombre: 'Engrase y lubricación',
    grupo: 'herramientas',
    descripcion: 'Engrasadoras, equipos para aceite, recuperadores, trasegadores y lavaderos de piezas para flotas y talleres.',
    icono: 'drop',
    familias: [
      { slug: 'engrase', nombre: 'Engrase' },
      { slug: 'aceite', nombre: 'Aceite' },
      { slug: 'lavaderos', nombre: 'Lavaderos de piezas' },
    ],
  },
  {
    slug: 'coches-y-mesas',
    nombre: 'Coches y mesas de trabajo',
    grupo: 'herramientas',
    descripcion: 'Coches porta herramientas cerrados y abiertos, y mesas de trabajo para taller.',
    icono: 'package',
    familias: [
      { slug: 'cerrado', nombre: 'Coches cerrados' },
      { slug: 'abierto', nombre: 'Coches abiertos y mesas' },
    ],
  },
  {
    slug: 'bancos-portaherramientas',
    nombre: 'Bancos portaherramientas',
    grupo: 'herramientas',
    descripcion: 'Bancos de trabajo y portaherramientas reforzados para el taller.',
    icono: 'toolbox',
  },
  {
    slug: 'compresoras-de-aire',
    nombre: 'Compresoras de aire',
    grupo: 'herramientas',
    descripcion: 'Compresoras de 80 a 120 galones y carretes retráctiles para aire comprimido en taller y planta.',
    icono: 'gear',
  },
  {
    slug: 'rectificadoras',
    nombre: 'Rectificadoras y enderezadoras',
    grupo: 'herramientas',
    descripcion: 'Rectificadoras de discos y tambores de freno y enderezadoras de rines y aros.',
    icono: 'engine',
  },
  // Limpieza y seguridad
  {
    slug: 'hidrolavadoras',
    nombre: 'Hidrolavadoras',
    grupo: 'limpieza',
    descripcion: 'Hidrolavadoras industriales a presión de agua fría y caliente, Kärcher y multimarca, con repuestos y servicio técnico.',
    icono: 'spray',
  },
];

// PENDIENTE: validar cada ficha con el taller (capacidades, marca, código y precio).
const otros: Producto[] = [
  // Gatas de transmisión con fotos del taller
  {
    slug: 'gata-de-transmision-hidraulica',
    nombre: 'Gata de transmisión hidráulica',
    categoria: 'gatas-de-transmision',
    familia: 'piso',
    resumen: 'Gata hidráulica con plataforma basculante para montar y desmontar cajas de transmisión de forma segura.',
    usos: ['Desmontaje de cajas de cambio', 'Montaje de transmisiones y diferenciales', 'Talleres de camiones y buses'],
    foto: 'gata-transmision-roja',
    pendiente: true,
  },
  {
    slug: 'gata-de-transmision-para-camiones',
    nombre: 'Gata de transmisión para camiones',
    categoria: 'gatas-de-transmision',
    familia: 'piso',
    resumen: 'Gata de transmisión de bastidor reforzado y plataforma amplia para cajas de camiones y tractocamiones.',
    usos: ['Cajas de tractocamiones', 'Transmisiones de buses', 'Flotas de transporte pesado'],
    foto: 'gata-transmision-azul',
    pendiente: true,
  },
  {
    slug: 'gata-de-transmision-de-piso',
    nombre: 'Gata de transmisión de piso',
    categoria: 'gatas-de-transmision',
    familia: 'piso',
    resumen: 'Gata de transmisión baja con ruedas giratorias, ideal para fosas y elevadores de taller.',
    foto: 'gata-transmision-taller',
    pendiente: true,
  },
  {
    slug: 'pluma-hidraulica-5-ton',
    nombre: 'Pluma hidráulica 5 ton',
    categoria: 'plumas-hidraulicas',
    capacidad: '5 toneladas',
    resumen: 'Pluma hidráulica de taller para izaje de motores y componentes pesados de camiones.',
    usos: ['Retiro de motores', 'Izaje de cajas y diferenciales'],
    pendiente: true,
  },
  {
    slug: 'prensa-hidraulica-60-ton',
    nombre: 'Prensa hidráulica 60 ton',
    categoria: 'prensas-hidraulicas',
    capacidad: '60 toneladas',
    resumen: 'Prensa hidráulica de bastidor para trabajos pesados de montaje y desmontaje a presión.',
    usos: ['Rodamientos y bujes', 'Pines y ejes', 'Enderezado de piezas'],
    foto: 'prensa-hidraulica-60-ton',
    pendiente: true,
  },



  // Coches: cerrados y abiertos.
  {
    slug: 'coche-porta-herramientas-cerrado',
    nombre: 'Coche porta herramientas cerrado',
    categoria: 'coches-y-mesas',
    familia: 'cerrado',
    resumen: 'Coche metálico con ruedas y puertas con malla y chapa para guardar y trasladar herramientas de forma segura.',
    foto: 'coche-porta-herramientas',
    pendiente: true,
  },
  {
    slug: 'mesa-de-trabajo-para-taller',
    nombre: 'Mesa de trabajo para taller',
    categoria: 'coches-y-mesas',
    familia: 'abierto',
    resumen: 'Mesa metálica con ruedas y bandeja inferior para trabajos de banco y armado de piezas.',
    foto: 'mesas-de-trabajo',
    pendiente: true,
  },

  {
    slug: 'hidrolavadora-industrial-agua-fria',
    nombre: 'Hidrolavadora industrial de agua fría',
    categoria: 'hidrolavadoras',
    resumen: 'Hidrolavadora industrial a presión de agua fría para limpieza de flotas, maquinaria y plantas. Kärcher y multimarca.',
    pendiente: true,
  },
  {
    slug: 'hidrolavadora-industrial-agua-caliente',
    nombre: 'Hidrolavadora industrial de agua caliente',
    categoria: 'hidrolavadoras',
    resumen: 'Hidrolavadora industrial a presión de agua caliente para retirar grasa y aceite en talleres, plantas y minería. Kärcher y multimarca.',
    pendiente: true,
  },
];

// Productos con foto en fondo blanco (carpeta Imagenes/, convertidas con scripts/png-a-fondo-blanco.py).
// Sin marca, código ni precio: se completan cuando el taller los confirme.
type Nuevo = [slug: string, nombre: string, categoria: string, familia: string | undefined, resumen: string];
const fichasNuevas: Nuevo[] = [
  ['elevador-de-tijera', 'Elevador de tijera', 'elevadores', 'tijera', 'Elevador de tijera con rampas de acceso para subir el vehículo y trabajar cómodo en la parte baja.'],
  ['elevador-de-rampas', 'Elevador de rampas', 'elevadores', undefined, 'Elevador de rampas de estructura reforzada para el mantenimiento de vehículos en taller.'],
  ['llave-de-torque-electrica', 'Llave de torque eléctrica', 'herramientas-de-torque', 'llaves-de-torque', 'Llave de torque eléctrica con brazo de reacción para ajustar pernos grandes con torque controlado.'],
  ['llave-de-torque-a-bateria', 'Llave de torque a batería', 'herramientas-de-torque', 'llaves-de-torque', 'Llave de torque a batería con brazo de reacción, sin cables, para ajustar pernos en campo.'],
  ['llave-de-torque-con-reaccion', 'Llave de torque con brazo de reacción', 'herramientas-de-torque', 'llaves-de-torque', 'Llave de torque con brazo de reacción y cable de alimentación para ajuste de pernos de alta exigencia.'],
  ['torquimetro-de-brazo-largo', 'Torquímetro de brazo largo', 'herramientas-de-torque', 'torquimetros', 'Torquímetro de brazo largo para aplicar torques altos con menos esfuerzo.'],
  ['torquimetro-de-dial', 'Torquímetro de dial', 'herramientas-de-torque', 'torquimetros', 'Torquímetro con carátula de dial para leer el torque aplicado mientras se ajusta.'],
  ['torquimetro-de-trinquete', 'Torquímetro de trinquete', 'herramientas-de-torque', 'torquimetros', 'Torquímetro de trinquete para ajustar tuercas y pernos al torque indicado.'],
  ['torquimetro-digital', 'Torquímetro digital', 'herramientas-de-torque', 'torquimetros', 'Torquímetro digital con pantalla para leer y controlar el torque con precisión.'],
  ['apilador-hidraulico-manual', 'Apilador manual', 'izaje-y-manipulacion', 'apiladores', 'Apilador manual de mástil con horquillas para levantar, mover y acomodar cargas en almacén y taller.'],
  ['tecle-de-cadena-0-5-ton', 'Tecle de cadena 0.5 ton', 'izaje-y-manipulacion', 'tecles', 'Tecle de cadena de 0.5 toneladas para izaje manual de cargas.'],
  ['tecle-de-palanca', 'Tecle de palanca', 'izaje-y-manipulacion', 'tecles', 'Tecle de palanca para levantar, jalar y tensar cargas en espacios reducidos.'],
  ['tecle-electrico', 'Tecle eléctrico', 'izaje-y-manipulacion', 'tecles', 'Tecle eléctrico de cadena con carro para izaje continuo de cargas en planta.'],
  ['hidrolavadora-agua-fria', 'Hidrolavadora de agua fría', 'hidrolavadoras', undefined, 'Hidrolavadora a presión de agua fría con ruedas, manguera y pistola para limpieza en taller y planta.'],
  ['hidrolavadora-agua-caliente', 'Hidrolavadora de agua caliente', 'hidrolavadoras', undefined, 'Hidrolavadora a presión de agua caliente para retirar grasa y aceite en talleres y plantas.'],
  ['hidrolavadora-a-gasolina', 'Hidrolavadora a gasolina', 'hidrolavadoras', undefined, 'Hidrolavadora a presión con motor a gasolina, para limpiar donde no hay conexión eléctrica.'],
  ['gata-botella-50-ton', 'Gata botella 50 ton', 'gatas-de-taller', 'botella', 'Gata botella hidráulica de 50 toneladas para levantar cargas pesadas.'],
  ['bandeja-de-drenaje-de-aceite', 'Bandeja de drenaje de aceite', 'lubricacion', 'aceite', 'Bandeja de drenaje con ruedas y rejilla para recoger el aceite usado del vehículo.'],
  ['bomba-de-grasa-con-carrito', 'Bomba de grasa con carrito', 'lubricacion', 'engrase', 'Bomba de grasa neumática montada en carrito para engrasar equipos en taller y planta.'],
  ['equipos-de-engrase', 'Equipos de engrase', 'lubricacion', 'engrase', 'Equipos de engrase: bombas, carrete retráctil y pistolas de engrase para flotas y talleres.'],
  ['llave-de-impacto-inalambrica-18v', 'Llave de impacto inalámbrica 18V', 'pistolas-de-impacto', undefined, 'Llave de impacto inalámbrica de 18 V para aflojar y ajustar tuercas sin cable ni compresor.'],
  ['llave-de-impacto-neumatica', 'Llave de impacto neumática', 'pistolas-de-impacto', undefined, 'Llave de impacto neumática para aflojar y ajustar tuercas de neumáticos y de alto torque.'],
  ['prensa-con-compresor-de-resortes', 'Prensa con compresor de resortes', 'prensas-hidraulicas', undefined, 'Prensa hidráulica de taller con compresor de resortes para trabajos de suspensión.'],
  ['prensa-hidraulica-de-taller', 'Prensa hidráulica de taller', 'prensas-hidraulicas', undefined, 'Prensa hidráulica de bastidor para montaje y desmontaje de rodamientos, bujes y piezas a presión.'],
  ['pluma-hidraulica-de-taller', 'Pluma hidráulica de taller', 'plumas-hidraulicas', undefined, 'Pluma hidráulica con base rodante para izar y trasladar motores y piezas pesadas en taller.'],
  ['plumas-plegables', 'Plumas plegables', 'plumas-hidraulicas', undefined, 'Plumas hidráulicas plegables que ocupan poco espacio al guardarlas.'],
];
const nuevos: Producto[] = fichasNuevas.map(([slug, nombre, categoria, familia, resumen]) => ({
  slug,
  nombre,
  categoria,
  ...(familia ? { familia } : {}),
  resumen,
  foto: slug,
  pendiente: true,
}));

// Se quitan marcas y códigos de todos los nombres; ver limpiar.ts.
// Si existe src/assets/productos/<slug>.jpg, esa es la foto del producto (ver scripts/procesar-descargas.py).
export const productos: Producto[] = sanear([...otros, ...nuevos, ...gatas, ...equiposTaller]).map((p) =>
  !p.foto && fotosCatalogo[p.slug] ? { ...p, foto: p.slug } : p,
);

export const categoria = (slug: string) => categorias.find((c) => c.slug === slug);
export const categoriasDe = (grupo: string) => categorias.filter((c) => c.grupo === grupo);
// Orden predeterminado: primero los productos con foto real, luego el resto en su orden original.
export const productosDe = (slug: string) =>
  productos.filter((p) => p.categoria === slug).sort((a, b) => Number(Boolean(b.foto)) - Number(Boolean(a.foto)));
export const precio = (p: Producto) =>
  p.precio ? `S/ ${p.precio.toLocaleString('es-PE', { minimumFractionDigits: 2 })}` : 'Precio a cotizar';
