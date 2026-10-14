import { empresa, seo } from './site';
import { servicios } from './servicios';

// Un solo grafo JSON-LD para la portada: negocio local, sitio web, página y preguntas frecuentes.
export function schema(site: URL) {
  const url = site.href;
  const negocio = `${url}#negocio`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'AutomotiveBusiness'],
        '@id': negocio,
        name: empresa.nombre,
        alternateName: empresa.marca,
        description: seo.descripcion,
        url,
        image: new URL('/og-image.jpg', site).href,
        logo: new URL('/logo-hidrofluid.png', site).href,
        telephone: empresa.telefonos.map((t) => t.tel),
        email: empresa.correo,
        taxID: empresa.ruc,
        address: {
          '@type': 'PostalAddress',
          streetAddress: empresa.direccion,
          addressLocality: empresa.distrito,
          addressRegion: empresa.ciudad,
          addressCountry: 'PE',
        },
        areaServed: { '@type': 'City', name: 'Lima' },
        hasMap: empresa.mapa,
        sameAs: empresa.redes.map((r) => r.url).filter(Boolean),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios',
          itemListElement: servicios.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.titulo, description: s.intro, areaServed: 'Lima', url: new URL(`/servicios/${s.slug}`, site).href },
          })),
        },
      },
      { '@type': 'WebSite', '@id': `${url}#web`, url, name: empresa.marca, inLanguage: 'es-PE', publisher: { '@id': negocio } },
      {
        '@type': 'WebPage',
        '@id': `${url}#pagina`,
        url,
        name: seo.titulo,
        description: seo.descripcion,
        isPartOf: { '@id': `${url}#web` },
        about: { '@id': negocio },
        inLanguage: 'es-PE',
      },
    ],
  };
}
