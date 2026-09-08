import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { useSeccionVisible } from '../lib/useSeccionVisible';

interface Props {
  phrases: string[];
}

const TYPE_MS = 40;
const DELETE_MS = 22;
const HOLD_MS = 2600;
const PAUSE_MS = 400;

/**
 * Frase que se teclea y se borra en bucle, aislada del resto del hero.
 *
 * Vive en su propio componente por rendimiento: el ciclo hace un `setState` cada
 * 22-40 ms y, dentro de `Hero`, eso re-renderizaba también el carrusel de fondo
 * con sus cinco imágenes y sus capas de degradado, unas 13 veces por segundo.
 */
export default function HeroRotatingText({ phrases }: Props) {
  // La primera frase se sirve completa desde SSR: la línea nunca aparece vacía.
  const [text, setText] = useState(phrases?.[0] ?? '');

  const anchorRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const visible = useSeccionVisible(anchorRef);
  const activo = visible && !reduce;

  const phraseIndex = useRef(0);
  const charCount = useRef(phrases?.[0]?.length ?? 0);

  useEffect(() => {
    if (!activo || !phrases || phrases.length < 2) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const escribir = () => {
      const actual = phrases[phraseIndex.current];
      charCount.current += 1;
      setText(actual.slice(0, charCount.current));
      const completa = charCount.current >= actual.length;
      timeoutId = setTimeout(completa ? borrar : escribir, completa ? HOLD_MS : TYPE_MS);
    };

    const borrar = () => {
      const actual = phrases[phraseIndex.current];
      charCount.current -= 1;
      setText(actual.slice(0, charCount.current));

      if (charCount.current > 0) {
        timeoutId = setTimeout(borrar, DELETE_MS);
      } else {
        phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
        timeoutId = setTimeout(escribir, PAUSE_MS);
      }
    };

    // El progreso vive en refs, así que al volver a pantalla retoma donde quedó
    // en vez de saltar al principio del ciclo.
    const actual = phrases[phraseIndex.current];
    const completa = charCount.current >= actual.length;
    timeoutId = setTimeout(completa ? borrar : escribir, completa ? HOLD_MS : TYPE_MS);

    return () => clearTimeout(timeoutId);
  }, [activo, phrases]);

  return (
    <span ref={anchorRef}>
      {text}
      <span className='ml-0.5 inline-block h-[0.9em] w-0.5 translate-y-[0.15em] animate-pulse bg-secondary-light align-middle' />
    </span>
  );
}
