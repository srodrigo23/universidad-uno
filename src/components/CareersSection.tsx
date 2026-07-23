import { FaGraduationCap } from 'react-icons/fa6';
import CareerCard from './CareerCard';
import Reveal from './Reveal';
import type { Career } from '../data/careers';

interface Props {
  careers: Career[];
}

export default function CareersSection({ careers }: Props) {
  return (
    <section id="carreras" className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide text-secondary uppercase">
            <FaGraduationCap /> Oferta académica
          </p>
          <h2 className="mb-3 text-3xl text-primary-dark">Nuestras carreras</h2>
          <p className="max-w-xl text-slate-600">
            Cinco licenciaturas orientadas a la ciencia, la salud, la justicia y el desarrollo empresarial de
            Bolivia.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((career, i) => (
            <CareerCard
              key={career.slug}
              slug={career.slug}
              nombre={career.nombre}
              resumen={career.resumen}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
