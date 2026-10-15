// Contenido de la portada y datos de la empresa. Los componentes solo lo pintan.
// Regla: no inventar datos. Lo que falte confirmar lleva un comentario PENDIENTE.

export const empresa = {
  nombre: 'HIDROFLUID SERVICE S.A.C.',
  marca: 'Hidrofluid Service',
  ruc: '20556463680',
  direccion: 'Av. Colectora Mz C Lt 01, Urb. Sucre',
  distrito: 'Santa Anita',
  ciudad: 'Lima',
  // PENDIENTE: el brochure 2025 usa hidrofluid@hotmail.com. Confirmar cuál queda.
  correo: 'hidrofluidmantenimin@gmail.com',
  telefonos: [
    { texto: '971 537 667', tel: '+51971537667' },
    { texto: '939 681 960', tel: '+51939681960' },
  ],
  whatsapp: '51971537667',
  mapa: 'https://www.google.com/maps?q=Av.%20Colectora%20Urb.%20Sucre%20Santa%20Anita%20Lima',
  mapaEmbed: 'https://www.google.com/maps?q=Av.%20Colectora%20Urb.%20Sucre%20Santa%20Anita%20Lima&output=embed',
  // PENDIENTE: enlaces reales de redes. Mientras estén vacíos los botones se ven pero no llevan a ningún lado.
  redes: [
    { nombre: 'Facebook', icono: 'facebook', url: '' },
    { nombre: 'Instagram', icono: 'instagram', url: '' },
    { nombre: 'TikTok', icono: 'tiktok', url: '' },
    { nombre: 'LinkedIn', icono: 'linkedin', url: '' },
  ],
} as const;

// Todos los botones de contacto abren WhatsApp con el mismo mensaje de ejemplo.
export const wa = (asunto = '') =>
  `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(
    asunto ? `Hola, estuve en la web y requiero mayor información de: ${asunto}.` : 'Hola, estuve en la web y requiero mayor información.',
  )}`;

export const seo = {
  titulo: 'Hidrofluid Service | Equipos hidráulicos en Santa Anita, Lima',
  descripcion:
    'Venta, mantenimiento y fabricación de equipos hidráulicos e industriales. Gatas, prensas, elevadores y más. Taller en Santa Anita, Lima.',
};

export const confianza = ['Más de 10 años de experiencia', 'Taller propio en Santa Anita', 'Atención in situ en Lima', 'Garantía por escrito'];

// Tarjetas de la sección Servicios (estilo AST: foto grande, título y texto al pasar el mouse).
// `foto`: nombre del archivo en src/assets/ambiente (provisional) o src/assets/servicios (definitivo).
export const serviciosHome = [
  {
    titulo: 'Mantenimiento preventivo y correctivo',
    texto: 'Hidrolavadoras industriales, montacargas y elevadores, equipos hidráulicos y pistolas de impacto, en nuestro taller o en tu planta.',
    href: '/servicios/mantenimiento-preventivo-y-correctivo',
    foto: 'srv-hidraulicos',
  },
  {
    titulo: 'Fabricación',
    texto: 'Elevadores, gatas, prensas, acoples, retenes, rines, llaves hidráulicas y llaves de paso, a medida.',
    href: '/servicios/fabricacion',
    foto: 'srv-fabricacion',
  },
  {
    titulo: 'Venta de equipos',
    texto: 'Gatas, prensas, elevadores, compresoras, pistolas de impacto y más para tu taller.',
    href: '/productos',
    foto: 'srv-pistolas',
  },
] as const;

// Textos del brochure 2025 de Hidrofluid.
export const nosotros = {
  resumen:
    'HIDROFLUID SERVICE S.A.C. es una empresa peruana con taller propio en Santa Anita. Vendemos, damos mantenimiento y fabricamos equipos industriales y automotrices, con más de 10 años de experiencia.',
  mision: 'Ser líderes en la importación y distribución de productos de alta calidad para satisfacer y solucionar las necesidades de nuestros clientes.',
  vision: 'Mantener un sólido posicionamiento y liderazgo, brindando oportunidades de negocio a nuestros clientes a través de la competitividad y la excelencia.',
  valores: ['Compromiso', 'Calidad', 'Experiencia', 'Respuesta rápida'],
} as const;

// Clientes de Hidrofluid. `logo` = archivo en src/assets/clientes (sin extensión).
// `claro: true` = el logo es oscuro o trae fondo blanco y se muestra sobre una tarjeta blanca.
// PENDIENTE: logo de Montana y autorización de cada cliente para mostrar su logo.
// Mientras no haya logo, se muestra el nombre en texto.
export const clientes = [
  { nombre: 'San Bartolomé', logo: 'san-bartolome', alt: 'San Bartolomé, 34 años ofreciendo soluciones en transporte' },
  { nombre: 'JCH Llantas', logo: 'jch-llantas', alt: 'JCH Llantas' },
  { nombre: 'International Camiones del Perú', logo: 'international-camiones', alt: 'International Camiones del Perú' },
  { nombre: 'Tracto Camiones USA', logo: 'tracto-camiones', alt: 'Tracto Camiones USA' },
  { nombre: 'Granotec', logo: 'granotec', alt: 'Granotec', claro: true },
  { nombre: 'Montana', logo: null },
  { nombre: 'Transportes 77', logo: 'transportes-77', alt: 'Transportes 77 S.A.', claro: true },
] as const;
