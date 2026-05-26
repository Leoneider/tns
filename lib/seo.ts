export const SITE_URL = 'https://www.transportadorestns.com';
export const SITE_NAME = 'TNS - Transportadores de Norte de Santander';

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Transportadores de Norte de Santander S.A.S.',
  alternateName: 'TNS',
  url: SITE_URL,
  logo: `${SITE_URL}/tns-logo.png`,
  sameAs: [
    'https://www.instagram.com/transportadorestns?igsh=MTBobW9wbDc1bWY3MA%3D%3D&utm_source=qr',
    'https://www.facebook.com/share/18ebjpeVXu/?mibextid=wwXIfr',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+57-318-217-2113',
      areaServed: 'CO',
      availableLanguage: ['es'],
    },
  ],
};

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}#localbusiness`,
  name: 'Transportadores de Norte de Santander S.A.S.',
  image: `${SITE_URL}/tns-logo.png`,
  url: SITE_URL,
  telephone: '+57-318-217-2113',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Carrera 35 # 7 - 40 Barrio La Primavera',
    addressLocality: 'Ocaña',
    addressRegion: 'Norte de Santander',
    addressCountry: 'CO',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '12:00',
    },
  ],
  hasMap:
    'https://www.google.com/maps?q=Carrera+35+%23+7-40+Barrio+La+Primavera,+Oca%C3%B1a,+Norte+de+Santander',
  areaServed: ['Norte de Santander', 'Colombia'],
  department: [
    {
      '@type': 'LocalBusiness',
      name: 'Sucursal Cúcuta',
      telephone: '+57-310-291-5013',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av 7 21N – 55 Sevilla ofc. 103',
        addressLocality: 'Cúcuta',
        addressRegion: 'Norte de Santander',
        addressCountry: 'CO',
      },
      hasMap:
        'https://www.google.com/maps?q=Av+7+21N-55+Sevilla,+C%C3%BAcuta,+Norte+de+Santander',
    },
  ],
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'es-CO',
};

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué servicios presta TNS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TNS presta soluciones de transporte terrestre de carga líquida y seca en Colombia, con enfoque en seguridad, trazabilidad y eficiencia operativa.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde está ubicada TNS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TNS cuenta con oficina principal en Ocaña y una sucursal en Cúcuta, en el departamento de Norte de Santander.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo puedo cotizar un servicio de transporte?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Puede cotizar desde la sección de contacto del sitio web o a través del botón de WhatsApp disponible en la página principal.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué horarios atiende TNS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La atención es de lunes a viernes de 08:00 a.m. a 12:00 p.m. y de 02:00 p.m. a 06:00 p.m.; sábados de 08:00 a.m. a 12:00 p.m.',
      },
    },
  ],
};
