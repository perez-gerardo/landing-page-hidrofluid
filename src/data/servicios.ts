// Páginas de servicio (/servicios/<slug>). Estructura:
// servicio → grupo de equipos → tarjetas de cada equipo con su foto.
//
// FOTOS: por ahora todas las tarjetas muestran un espacio vacío "Foto en preparación".
// Para ponerla, copia la foto (fondo limpio, sin logos, 4:3) a src/assets/servicios/<nombre>.jpg
// y escribe `foto: '<nombre>'` en el equipo. Mientras falte, la web no muestra nada roto.
//

export type Equipo = {
  nombre: string;
  /** Una línea de apoyo. No inventar datos técnicos: solo lo que Hidrofluid confirme. */
  detalle?: string;
  foto?: string;
};

export type GrupoEquipos = {
  id: string;
  titulo: string;
  icono: string;
  resumen: string;
  equipos: Equipo[];
};

export type Servicio = {
  slug: string;
  menu: string;
  titulo: string;
  bajada: string;
  intro: string;
  icono: string;
  grupos: GrupoEquipos[];
  incluye: string[];
  seo: { titulo: string; descripcion: string };
};

export const servicios: Servicio[] = [
  {
    slug: 'mantenimiento-preventivo-y-correctivo',
    menu: 'Mantenimiento preventivo y correctivo',
    titulo: 'Mantenimiento preventivo y correctivo',
    bajada: 'Equipos hidráulicos, de alta presión, de izaje y torquímetros',
    intro:
      'Diagnosticamos, reparamos y damos mantenimiento a tus equipos en nuestro taller de Santa Anita o directamente en tu planta. Trabajamos con repuestos adecuados, probamos cada equipo antes de entregarlo y dejamos informe técnico con garantía por escrito.',
    icono: 'wrench',
    grupos: [
      {
        id: 'hidrolavadoras',
        titulo: 'Hidrolavadoras industriales a presión',
        icono: 'drop',
        resumen: 'Mantenimiento de hidrolavadoras industriales de agua fría y de agua caliente, Kärcher y multimarca.',
        equipos: [
          { nombre: 'Hidrolavadora industrial de agua fría', detalle: 'Bomba, pistola, lanza, mangueras y accesorios.', foto: 'hidrolavadora-agua-fria' },
          { nombre: 'Hidrolavadora industrial de agua caliente', detalle: 'Incluye el sistema de calentamiento.', foto: 'hidrolavadora-agua-caliente' },
        ],
      },
      {
        id: 'montacargas',
        titulo: 'Montacargas y elevadores industriales',
        icono: 'crane',
        resumen: 'Mantenimiento de estocas, transpaletas manuales y eléctricas, montacargas y elevadores industriales.',
        equipos: [
          { nombre: 'Estocas', detalle: 'Apiladores hidráulicos manuales.', foto: 'apilador-hidraulico-manual' },
          { nombre: 'Transpaleta manual', foto: 'transpaleta-manual' },
          { nombre: 'Transpaleta eléctrica', foto: 'srv-montacargas' },
          { nombre: 'Montacargas', foto: 'montacargas' },
          { nombre: 'Elevadores industriales', foto: 'elevador-de-tijera' },
        ],
      },
      {
        id: 'hidraulicos',
        titulo: 'Equipos hidráulicos',
        icono: 'gear',
        resumen: 'Reparación y mantenimiento de gatas de distintos tipos y tonelajes, prensas y plumas hidráulicas.',
        equipos: [
          { nombre: 'Gata botella', detalle: 'Distintos tonelajes.', foto: 'gata-botella-10-ton' },
          { nombre: 'Gata lagarto', detalle: 'Distintos tonelajes.', foto: 'gata-lagarto-3-ton' },
          { nombre: 'Gata de transmisión', foto: 'gata-de-transmision' },
          { nombre: 'Prensa hidráulica', foto: 'prensa-hidraulica-de-taller' },
          { nombre: 'Pluma hidráulica', foto: 'pluma-hidraulica-5-ton' },
          { nombre: 'Soportes de motor y de corona', detalle: 'Reparación y mantenimiento.', foto: 'soportes-reparacion-motor' },
        ],
      },
      {
        id: 'pistolas',
        titulo: 'Pistolas de impacto',
        icono: 'wrench',
        resumen: 'Mantenimiento de pistolas de impacto de todas las capacidades.',
        equipos: [
          { nombre: 'Pistola de impacto neumática', foto: 'llave-de-impacto-neumatica' },
          { nombre: 'Pistola de impacto eléctrica', foto: 'pistola-inalambrica-1-2500-nm' },
          { nombre: 'Pistola de impacto inalámbrica', foto: 'pistola-inalambrica-3-4-1980-nm' },
        ],
      },
      {
        id: 'torquimetros',
        titulo: 'Mantenimiento y calibración de torquímetros',
        icono: 'wrench',
        resumen:
          'Calibración, verificación y mantenimiento de torquímetros y herramientas de torque, para que cada ajuste se haga con el valor correcto.',
        equipos: [
          { nombre: 'Torquímetros de click', detalle: 'Calibración y verificación.', foto: 'torquimetro-de-trinquete' },
          { nombre: 'Torquímetros digitales', detalle: 'Calibración y verificación.', foto: 'torquimetro-digital' },
          { nombre: 'Torquímetros de dial', detalle: 'Calibración y verificación.', foto: 'torquimetro-de-dial' },
          { nombre: 'Llaves de torque hidráulicas', detalle: 'Mantenimiento y calibración.', foto: 'llave-de-torque-con-reaccion' },
          { nombre: 'Llaves de torque eléctricas y a batería', detalle: 'Mantenimiento y calibración.', foto: 'llave-de-torque-electrica' },
        ],
      },
    ],
    incluye: ['Diagnóstico en planta o en taller', 'Propuesta técnica y económica antes de empezar', 'Pruebas de funcionamiento antes de la entrega', 'Informe técnico y garantía por escrito'],
    seo: {
      titulo: 'Mantenimiento de equipos hidráulicos en Lima',
      descripcion:
        'Mantenimiento preventivo y correctivo de hidrolavadoras industriales de agua fría y caliente, estocas, transpaletas manuales y eléctricas, gatas, prensas, pistolas de impacto y torquímetros, con calibración de torquímetros. Taller en Santa Anita y atención in situ.',
    },
  },
  {
    slug: 'fabricacion',
    menu: 'Fabricación',
    titulo: 'Fabricación',
    bajada: 'Equipos y componentes hidráulicos a medida',
    intro:
      'Desarrollamos y fabricamos equipos y componentes hidráulicos a medida para aplicaciones que requieren precisión, resistencia y adaptación específica. Trabajamos según plano, muestra o necesidad del equipo, y entregamos cada pieza probada.',
    icono: 'gear',
    grupos: [
      {
        id: 'equipos',
        titulo: 'Fabricación de equipos para taller',
        icono: 'crane',
        resumen: 'Fabricamos equipos para taller según tu necesidad.',
        equipos: [
          { nombre: 'Elevadores', foto: 'elevador-de-rampas' },
          { nombre: 'Gatas', foto: 'surtido-de-gatas' },
          { nombre: 'Prensas', foto: 'prensa-hidraulica-60-ton' },
          { nombre: 'Soportes para reparación de motor', foto: 'fab-soporte-reparacion-motor' },
        ],
      },
      {
        id: 'componentes',
        titulo: 'Componentes hidráulicos',
        icono: 'gear',
        resumen: 'Fabricación de piezas y accesorios hidráulicos según plano o muestra.',
        equipos: [
          { nombre: 'Acoples', foto: 'acoples' },
          { nombre: 'Retenes', foto: 'retenes' },
          { nombre: 'Sellos hidráulicos', foto: 'sellos-hidraulicos' },
          { nombre: 'Llaves hidráulicas', foto: 'llaves-hidraulicas' },
          { nombre: 'Mangueras hidráulicas', foto: 'mangueras-hidraulicas' },
        ],
      },
    ],
    incluye: ['Fabricación según plano, muestra o requerimiento', 'Materiales adecuados para trabajo pesado', 'Pruebas de presión y funcionamiento', 'Garantía por escrito'],
    seo: {
      titulo: 'Fabricación de equipos hidráulicos en Lima',
      descripcion:
        'Fabricamos a medida elevadores, gatas, prensas y soportes para reparación de motor, acoples, retenes, sellos hidráulicos, llaves hidráulicas y mangueras hidráulicas. Hidrofluid Service, Santa Anita, Lima.',
    },
  },
];

export const servicio = (slug: string) => servicios.find((s) => s.slug === slug);
