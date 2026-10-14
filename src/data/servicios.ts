// Páginas de servicio (/servicios/<slug>). Estructura:
// servicio → grupo de equipos → tarjetas de cada equipo con su foto.
//
// FOTOS: por ahora todas las tarjetas muestran un espacio vacío "Foto en preparación".
// Para ponerla, copia la foto (fondo limpio, sin logos, 4:3) a src/assets/servicios/<nombre>.jpg
// y escribe `foto: '<nombre>'` en el equipo. Mientras falte, la web no muestra nada roto.
//
// PENDIENTE: Calibración y Capacitación (Hidrofluid no confirmó si ofrece Calibración).

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
    bajada: 'Equipos hidráulicos, de alta presión, de izaje y eléctricos',
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
          { nombre: 'Hidrolavadora industrial de agua fría', detalle: 'Bomba, pistola, lanza, mangueras y accesorios.' },
          { nombre: 'Hidrolavadora industrial de agua caliente', detalle: 'Incluye el sistema de calentamiento.' },
        ],
      },
      {
        id: 'montacargas',
        titulo: 'Montacargas y elevadores industriales',
        icono: 'crane',
        resumen: 'Mantenimiento de estocas, transpaletas manuales y eléctricas, montacargas y elevadores industriales.',
        equipos: [
          { nombre: 'Estocas', detalle: 'Apiladores hidráulicos manuales.' },
          { nombre: 'Transpaleta manual' },
          { nombre: 'Transpaleta eléctrica' },
          { nombre: 'Montacargas' },
          { nombre: 'Elevadores industriales' },
        ],
      },
      {
        id: 'hidraulicos',
        titulo: 'Equipos hidráulicos',
        icono: 'gear',
        resumen: 'Reparación y mantenimiento de gatas de distintos tipos y tonelajes, prensas y plumas hidráulicas.',
        equipos: [
          { nombre: 'Gata botella', detalle: 'Distintos tonelajes.' },
          { nombre: 'Gata lagarto', detalle: 'Distintos tonelajes.' },
          { nombre: 'Gata de transmisión' },
          { nombre: 'Prensa hidráulica' },
          { nombre: 'Pluma hidráulica' },
        ],
      },
      {
        id: 'pistolas',
        titulo: 'Pistolas de impacto',
        icono: 'wrench',
        resumen: 'Mantenimiento de pistolas de impacto de todas las capacidades.',
        equipos: [{ nombre: 'Pistola de impacto neumática' }, { nombre: 'Pistola de impacto eléctrica' }, { nombre: 'Pistola de impacto inalámbrica' }],
      },
      {
        id: 'electricos',
        titulo: 'Motores y equipos eléctricos',
        icono: 'engine',
        resumen: 'Rebobinado de motores, motorreductores y mantenimiento de tableros y compresores.',
        equipos: [
          { nombre: 'Motores eléctricos', detalle: 'Diagnóstico y rebobinado.' },
          { nombre: 'Motorreductores' },
          { nombre: 'Tableros eléctricos', detalle: 'Megado, rotulado y diagramas unifilares.' },
          { nombre: 'Compresores' },
        ],
      },
    ],
    incluye: ['Diagnóstico en planta o en taller', 'Propuesta técnica y económica antes de empezar', 'Pruebas de funcionamiento antes de la entrega', 'Informe técnico y garantía por escrito'],
    seo: {
      titulo: 'Mantenimiento de equipos hidráulicos en Lima',
      descripcion:
        'Mantenimiento preventivo y correctivo de hidrolavadoras industriales de agua fría y caliente, estocas, transpaletas manuales y eléctricas, gatas, prensas y pistolas de impacto. Taller en Santa Anita y atención in situ.',
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
        titulo: 'Equipos hidráulicos',
        icono: 'crane',
        resumen: 'Fabricación de equipos hidráulicos de taller.',
        equipos: [{ nombre: 'Elevadores' }, { nombre: 'Gatas' }, { nombre: 'Prensas' }],
      },
      {
        id: 'componentes',
        titulo: 'Componentes hidráulicos',
        icono: 'gear',
        resumen: 'Fabricación de piezas y accesorios hidráulicos según plano o muestra.',
        equipos: [{ nombre: 'Acoples' }, { nombre: 'Retenes' }, { nombre: 'Rines' }, { nombre: 'Llaves hidráulicas' }, { nombre: 'Llaves de paso' }],
      },
    ],
    incluye: ['Fabricación según plano, muestra o requerimiento', 'Materiales adecuados para trabajo pesado', 'Pruebas de presión y funcionamiento', 'Garantía por escrito'],
    seo: {
      titulo: 'Fabricación de equipos hidráulicos en Lima',
      descripcion:
        'Fabricamos a medida elevadores, gatas y prensas hidráulicas, acoples, retenes, rines, llaves hidráulicas y llaves de paso. Hidrofluid Service, Santa Anita, Lima.',
    },
  },
  {
    slug: 'alquiler-de-equipos',
    menu: 'Alquiler de equipos',
    titulo: 'Alquiler de equipos',
    bajada: 'Por día, semana o mes',
    intro:
      'Alquila equipos revisados por nuestro taller y mantén tu operación en marcha mientras reparas los tuyos o cubres un pico de trabajo. Te confirmamos disponibilidad, condiciones y entrega por WhatsApp.',
    icono: 'calendar',
    grupos: [
      {
        id: 'disponibles',
        titulo: 'Equipos disponibles',
        icono: 'toolbox',
        resumen: 'Equipos revisados antes de cada entrega.',
        equipos: [
          { nombre: 'Hidrolavadoras industriales' },
          { nombre: 'Montacargas hidráulicos y estocas' },
          { nombre: 'Bombas' },
          { nombre: 'Gatas, plumas y prensas' },
          { nombre: 'Herramientas de taller' },
        ],
      },
    ],
    incluye: ['Equipos revisados antes de cada entrega', 'Alquiler por día, semana o mes', 'Soporte técnico durante el alquiler'],
    seo: {
      titulo: 'Alquiler de equipos y maquinaria en Lima',
      descripcion: 'Alquiler de hidrolavadoras, montacargas hidráulicos, estocas, bombas y herramientas por día, semana o mes en Lima. Hidrofluid Service.',
    },
  },
];

export const servicio = (slug: string) => servicios.find((s) => s.slug === slug);
