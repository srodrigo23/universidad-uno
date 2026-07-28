import es from './es.json';
import pt from './pt.json';

export const locales = ['es', 'pt'] as const;
export type Locale = (typeof locales)[number];

export type Dictionary = typeof es;

export const dictionaries: Record<Locale, Dictionary> = { es, pt };

export const localeLabels: Record<Locale, string> = { es: 'ES', pt: 'PT' };

export function otherLocale(locale: Locale): Locale {
  return locale === 'es' ? 'pt' : 'es';
}

/** Builds the equivalent path for a locale. `path` is the unprefixed (Spanish) path, e.g. "/" or "/carreras/enfermeria". */
export function localizedPath(locale: Locale, path: string): string {
  if (locale === 'es') return path;
  return path === '/' ? '/pt/' : `/pt${path}`;
}
