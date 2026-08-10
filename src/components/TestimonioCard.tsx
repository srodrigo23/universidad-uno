import { FaQuoteLeft, FaChevronDown } from 'react-icons/fa6';
import { BO, BR } from 'country-flag-icons/react/3x2';
import { paisLabels, type Nacionalidad } from '../data/testimonios';

const flags: Record<Nacionalidad, typeof BO> = { BO, BR };

/** Los recortes vienen sin fondo, así que la card siempre pinta el degradado de marca debajo. */
const BRAND_BG =
  'bg-[linear-gradient(150deg,var(--color-secondary-light)_0%,var(--color-secondary)_45%,var(--color-primary)_100%)]';

interface Props {
  nombre: string;
  testimonio: string;
  pais: Nacionalidad;
  foto?: ImageMetadata;
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
  expanded,
  onToggle,
  t,
}: Props) {
  const Flag = flags[pais];
  // Con dos líneas visibles no todo testimonio necesita el enlace.
  const necesitaVerMas = testimonio.length > 90;

  return (
    <article
      className={`group relative flex h-[26rem] flex-col justify-end overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl ${BRAND_BG}`}
    >
      {foto && (
        <img
          src={foto.src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Velo de abajo hacia arriba: deja ver el rostro y sostiene el texto.
          Al desplegar sube la opacidad, porque el texto largo pisa la imagen. */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundImage:
            'linear-gradient(to top, var(--color-primary-dark) 0%, color-mix(in srgb, var(--color-primary-dark) 92%, transparent) 38%, color-mix(in srgb, var(--color-primary-dark) 45%, transparent) 62%, color-mix(in srgb, var(--color-primary-dark) 10%, transparent) 85%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-primary-dark/70 transition-opacity duration-300 ${
          expanded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <FaQuoteLeft
        aria-hidden="true"
        size={64}
        className="pointer-events-none absolute top-5 right-5 text-white/15"
      />

      <div className="relative p-6 text-white">
        <p
          id={`testimonio-${pais}-${nombre.replace(/\s+/g, '-')}`}
          className={`text-sm leading-relaxed text-white/90 ${
            expanded ? 'max-h-56 overflow-y-auto pr-1' : 'line-clamp-2'
          }`}
        >
          {testimonio}
        </p>

        {necesitaVerMas && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={`testimonio-${pais}-${nombre.replace(/\s+/g, '-')}`}
            className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-secondary-light uppercase transition-colors hover:text-white"
          >
            {expanded ? t.readLess : t.readMore}
            <FaChevronDown
              size={8}
              className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}

        <footer className="mt-4 flex items-center gap-2.5 border-t border-white/20 pt-3">
          <Flag aria-hidden="true" className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{nombre}</p>
            <p className="text-xs text-white/70">{paisLabels[pais]}</p>
          </div>
        </footer>
      </div>
    </article>
  );
}
