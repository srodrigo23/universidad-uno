/**
 * Constructores de datos estructurados (schema.org / JSON-LD).
 *
 * Regla: todo lo que se declara aquí tiene que estar visible en la página.
 * Emitir datos que el usuario no ve (teléfonos, valoraciones, programas
 * inexistentes) es motivo de acción manual por spam estructurado en Search.
 *
 * Los mismos datos se muestran en `Footer.tsx`, `WhatsAppFloatingButton.tsx`
 * y `Ubicacion.tsx`; si cambian allí, cambiarlos también aquí.
 */
import { careers, type Career } from './careers';
import { localizedPath, type Locale, type Dictionary } from '../i18n/config';

const ORGANIZATION_NAME = 'Universidad Privada UNO · Subsede Cochabamba';
const LOGO_PATH =
  '/logo/LogotipoOriginalVersiones/recortado/LogotipoOriginalCompleto.png';

const SOCIAL_PROFILES = [
  'https://www.facebook.com/UNOCBBA',
  'https://www.instagram.com/unocochabamba/',
  'https://www.tiktok.com/@universidadunocbba',
];

/** URL absoluta con barra final, para que coincida con la canónica del layout. */
function absolute(site: URL | undefined, path: string): string {
  const withSlash = path.endsWith('/') ? path : `${path}/`;
  return new URL(withSlash, site).toString();
}

/** Identificador estable de la organización, para referenciarla desde otros nodos. */
function organizationId(site: URL | undefined): string {
  return `${new URL('/', site).toString()}#organization`;
}

export function organizationSchema(
  site: URL | undefined,
  locale: Locale,
  dict: Dictionary,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    '@id': organizationId(site),
    name: ORGANIZATION_NAME,
    alternateName: 'UNO Cochabamba',
    description: dict.meta.description,
    url: absolute(site, localizedPath(locale, '/')),
    logo: new URL(LOGO_PATH, site).toString(),
    image: new URL('/og/default.jpg', site).toString(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Junín entre J. de la Reza y Calle La Paz',
      addressLocality: 'Cochabamba',
      addressRegion: 'Cochabamba',
      addressCountry: 'BO',
    },
    telephone: '+591 64849322',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+591 64849322',
        contactType: 'admissions',
        areaServed: 'BO',
        availableLanguage: ['es'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+591 64847741',
        contactType: 'admissions',
        areaServed: 'BR',
        availableLanguage: ['pt', 'es'],
      },
    ],
    sameAs: SOCIAL_PROFILES,
  };
}

/** Índice de la oferta académica que se lista en la home. */
export function careerListSchema(
  site: URL | undefined,
  locale: Locale,
  dict: Dictionary,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: dict.careersSection.title,
    itemListElement: careers.map((career, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: career[locale].nombre,
      url: absolute(site, localizedPath(locale, `/carreras/${career.slug}`)),
    })),
  };
}

export function careerProgramSchema(
  site: URL | undefined,
  locale: Locale,
  career: Career,
) {
  const content = career[locale];
  // `teaches` recoge las competencias tal como se muestran en la página.
  const competencias = content.competencias?.flatMap((grupo) => grupo.items);

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: content.nombre,
    description: content.resumen,
    url: absolute(site, localizedPath(locale, `/carreras/${career.slug}`)),
    inLanguage: locale === 'es' ? 'es-BO' : 'pt-BR',
    educationalProgramMode: 'full-time',
    occupationalCategory: content.campoLaboral,
    ...(competencias?.length ? { teaches: competencias } : {}),
    provider: {
      '@type': 'CollegeOrUniversity',
      '@id': organizationId(site),
      name: ORGANIZATION_NAME,
      url: absolute(site, localizedPath(locale, '/')),
    },
  };
}

export function faqSchema(dict: Dictionary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
