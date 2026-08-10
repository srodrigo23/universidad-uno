import { FaQuoteLeft } from 'react-icons/fa6';
import { BO, BR } from 'country-flag-icons/react/3x2';
import { paisLabels, type Nacionalidad } from '../data/testimonios';

const flags: Record<Nacionalidad, typeof BO> = { BO, BR };

interface Props {
  nombre: string;
  testimonio: string;
  pais: Nacionalidad;
}

export default function TestimonioCard({ nombre, testimonio, pais }: Props) {
  const Flag = flags[pais];

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {/* Comilla decorativa de fondo: da identidad de "testimonio" sin cargar un asset. */}
      <FaQuoteLeft
        aria-hidden="true"
        size={120}
        className="pointer-events-none absolute -top-3 -right-4 text-secondary/10"
      />

      <p className="relative line-clamp-[9] flex-1 text-sm leading-relaxed text-slate-600">
        {testimonio}
      </p>

      <footer className="relative mt-5 flex items-center gap-3 border-t border-slate-200 pt-4">
        <Flag aria-hidden="true" className="h-4 w-6 shrink-0 rounded-[2px] object-cover" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-primary-dark">{nombre}</p>
          <p className="text-xs text-slate-500">{paisLabels[pais]}</p>
        </div>
      </footer>
    </article>
  );
}
