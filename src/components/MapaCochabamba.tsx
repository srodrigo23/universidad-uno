import { motion, useReducedMotion } from 'motion/react';
import {
  VIEW_BOX,
  BOLIVIA_D,
  COCHABAMBA_D,
  CAMPUS,
} from '../data/mapaBolivia';

interface Props {
  /** Etiqueta accesible: el mapa comunica información, no es puro adorno. */
  label: string;
  className?: string;
}

const VIEWPORT = { once: true, amount: 0.35 } as const;

/** Segundos. El relleno entra cuando el trazo casi ha cerrado, y el pin tras él. */
const DRAW = 1.6;
const FILL_AT = 1.35;
const PIN_AT = 1.95;

export default function MapaCochabamba({ label, className = '' }: Props) {
  const reduce = useReducedMotion();
  /** Con movimiento reducido no hay estado inicial: el mapa ya está trazado. */
  const from = (value: Record<string, number>) => (reduce ? false : value);
  const delay = (seconds: number) => (reduce ? 0 : seconds);

  return (
    <svg
      viewBox={VIEW_BOX}
      role='img'
      aria-label={label}
      className={className}
      fill='none'
    >
      <defs>
        <linearGradient id='mapa-cochabamba' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='var(--color-secondary)' />
          <stop offset='100%' stopColor='var(--color-primary)' />
        </linearGradient>
      </defs>

      {/* El país se traza de un solo golpe: pathLength deja que motion calcule el
          dasharray sin depender de la longitud real del trazo. */}
      <motion.path
        d={BOLIVIA_D}
        stroke='var(--color-primary)'
        strokeWidth={5}
        strokeOpacity={0.4}
        strokeLinejoin='round'
        initial={from({ pathLength: 0 })}
        whileInView={{ pathLength: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: reduce ? 0 : DRAW, ease: 'easeInOut' }}
      />

      <motion.path
        d={COCHABAMBA_D}
        fill='url(#mapa-cochabamba)'
        initial={from({ opacity: 0, scale: 0.92 })}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT}
        transition={{
          duration: reduce ? 0 : 0.7,
          delay: delay(FILL_AT),
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />

      <motion.g
        initial={from({ opacity: 0, y: -70 })}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{
          delay: delay(PIN_AT),
          type: 'spring',
          stiffness: 260,
          damping: 18,
        }}
      >
        {/* El anillo late dos veces (uno inicial + un repeat) y se queda quieto:
            una animación infinita aquí sería coste sostenido para siempre. */}
        {!reduce && (
          <motion.circle
            cx={CAMPUS.x}
            cy={CAMPUS.y}
            r={18}
            stroke='var(--color-secondary)'
            strokeWidth={5}
            initial={{ scale: 0.6, opacity: 0.9 }}
            whileInView={{ scale: 2.8, opacity: 0 }}
            viewport={VIEWPORT}
            transition={{
              delay: PIN_AT + 0.25,
              duration: 1.2,
              repeat: 1,
              ease: 'easeOut',
            }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        )}
        <circle
          cx={CAMPUS.x}
          cy={CAMPUS.y}
          r={13}
          fill='var(--color-secondary)'
          stroke='#fff'
          strokeWidth={5}
        />
      </motion.g>
    </svg>
  );
}
