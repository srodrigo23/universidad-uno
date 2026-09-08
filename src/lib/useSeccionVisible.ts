import { useEffect, useState, type RefObject } from 'react';

/**
 * `true` mientras el elemento esté en pantalla Y la pestaña esté visible.
 *
 * Existe porque el navegador no pausa nada por haber hecho scroll: animaciones
 * CSS, timers y carruseles siguen corriendo aunque su sección quede a diez
 * scrolls de distancia. Solo estrangula pestañas en segundo plano.
 */
export function useSeccionVisible(
  ref: RefObject<HTMLElement | null>,
  rootMargin = '0px',
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let enPantalla = false;
    const sincronizar = () => setVisible(enPantalla && !document.hidden);

    const observer = new IntersectionObserver(
      ([entry]) => {
        enPantalla = entry.isIntersecting;
        sincronizar();
      },
      { rootMargin },
    );

    observer.observe(node);
    document.addEventListener('visibilitychange', sincronizar);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sincronizar);
    };
  }, [ref, rootMargin]);

  return visible;
}
