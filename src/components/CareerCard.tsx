import { FaArrowRight } from 'react-icons/fa6';

interface Props {
  slug: string;
  nombre: string;
  resumen: string;
}

export default function CareerCard({ slug, nombre, resumen }: Props) {
  const excerpt = resumen.length > 160 ? `${resumen.slice(0, 160).trimEnd()}…` : resumen;

  return (
    <a
      href={`/carreras/${slug}`}
      className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <span className="text-xs font-bold tracking-wide text-secondary uppercase">Licenciatura</span>
      <h3 className="text-lg text-primary-dark">{nombre}</h3>
      <p className="text-sm text-slate-600">{excerpt}</p>
      <span className="mt-auto flex items-center gap-1.5 pt-2 font-bold text-primary">
        Ver carrera <FaArrowRight size={12} />
      </span>
    </a>
  );
}
