type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: Params) => void;
  }
}

/**
 * Envía un evento a GA4. Es un no-op si `gtag` no está: bloqueador de anuncios,
 * SSR o el script todavía cargando. Medir nunca debe romper la interfaz.
 *
 * Se usan los nombres recomendados por GA4 donde existe equivalente
 * (`generate_lead`, `file_download`), porque llegan a los informes sin
 * configurar nada. El resto son personalizados en snake_case.
 */
export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', event, params);
}
