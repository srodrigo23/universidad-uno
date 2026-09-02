import { useEffect, useRef, useState } from 'react';
import { FaQuoteLeft, FaChevronDown } from 'react-icons/fa6';
import { BO, BR } from 'country-flag-icons/react/3x2';
import {
  paisLabels,
  type Nacionalidad,
  type Testimonio,
} from '../../data/testimonios';

const flags: Record<Nacionalidad, typeof BO> = { BO, BR };

/** Los recortes vienen sin fondo, así que la card siempre pinta el degradado de marca debajo. */
const BRAND_BG =
  'bg-[linear-gradient(150deg,var(--color-secondary-light)_0%,var(--color-secondary)_45%,var(--color-primary)_100%)]';

interface Props {
  nombre: string;
  testimonio: string;
  pais: Nacionalidad;
  foto?: ImageMetadata;
  encuadre?: Testimonio['encuadre'];
  expanded: boolean;
  onToggle: () => void;
  t: {
    readMore: string;
    readLess: string;
  };
}

export default function TestimonioCard({
  nombre,
  testimonio,
  pais,
  foto,
  encuadre,
  expanded,
  onToggle,
  t,
}: Props) {
  const Flag = flags[pais];
  const textRef = useRef<HTMLParagraphElement>(null);
  // El largo del texto solo sirve como suposición para el HTML servido; cuántas
  // líneas caben de verdad depende del ancho de la tarjeta, que cambia por
  // breakpoint. Se mide en cuanto hay DOM.
  const [desborda, setDesborda] = useState(testimonio.length > 90);

  useEffect(() => {
    const node = textRef.current;
    if (!node || expanded) return;

    const medir = () => setDesborda(node.scrollHeight > node.clientHeight + 1);
    medir();

    const observer = new ResizeObserver(medir);
    observer.observe(node);
    return () => observer.disconnect();
  }, [expanded, testimonio]);

  // Desplegado el enlace sigue haciendo falta para poder cerrar.
  const necesitaVerMas = expanded || desborda;

  return (
    <article
      className={`group relative flex h-112 flex-col justify-end lg:h-88 overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl ${BRAND_BG}`}
    >
      {/* El zoom del hover va en el contenedor para no pisar el transform del encuadre. */}
      {foto && (
        <div className='absolute inset-0 overflow-hidden transition-transform duration-500 group-hover:scale-105'>
          <img
            src={foto.src}
            alt=''
            aria-hidden='true'
            className='h-full w-full object-cover object-top'
            style={{
              transform: `scale(${encuadre?.zoom ?? 1}) translateY(${encuadre?.y ?? 0}%)`,
              transformOrigin: 'top center',
            }}
          />
        </div>
      )}

      {/* Velo de abajo hacia arriba: sostiene el texto sin llegar al rostro.
          El rostro ocupa el ~47% superior, así que el velo muere antes del 74%.
          Al desplegar sube la opacidad, porque el texto largo pisa la imagen. */}
      <div
        className='absolute inset-0 transition-opacity duration-300'
        style={{
          backgroundImage:
            'linear-gradient(to top, var(--color-primary-dark) 0%, color-mix(in srgb, var(--color-primary-dark) 90%, transparent) 32%, color-mix(in srgb, var(--color-primary-dark) 35%, transparent) 48%, color-mix(in srgb, var(--color-primary-dark) 6%, transparent) 62%, transparent 74%)',
        }}
      />
      <div
        aria-hidden='true'
        className={`absolute inset-0 bg-primary-dark/70 transition-opacity duration-300 ${
          expanded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <FaQuoteLeft
        aria-hidden='true'
        className='pointer-events-none absolute top-5 right-5 h-16 w-16 text-white/15 lg:h-11 lg:w-11'
      />

      <div className='relative p-6 text-white lg:p-5'>
        <p
          ref={textRef}
          id={`testimonio-${pais}-${nombre.replace(/\s+/g, '-')}`}
          className={`text-sm leading-relaxed text-white/90 ${
            expanded ? 'max-h-44 overflow-y-auto pr-1 lg:max-h-52' : 'line-clamp-2'
          }`}
        >
          {testimonio}
        </p>

        {necesitaVerMas && (
          <button
            type='button'
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={`testimonio-${pais}-${nombre.replace(/\s+/g, '-')}`}
            className='mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-secondary-light uppercase transition-colors hover:text-white'
          >
            {expanded ? t.readLess : t.readMore}
            <FaChevronDown
              size={8}
              className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}

        <footer className='mt-4 flex items-center gap-2.5 border-t border-white/20 pt-3'>
          <Flag
            aria-hidden='true'
            className='h-3.5 w-5 shrink-0 object-cover'
          />
          <div className='min-w-0'>
            <p className='truncate text-sm font-semibold text-white'>
              {nombre}
            </p>
            {/* <p className='text-xs text-white/70'>{paisLabels[pais]}</p> */}
          </div>
        </footer>
      </div>
    </article>
  );
}
