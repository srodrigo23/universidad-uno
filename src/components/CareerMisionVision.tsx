import { FaBullseye, FaEye } from 'react-icons/fa6';
import Reveal from './Reveal';

interface Props {
  mision: string;
  vision: string;
}

export default function CareerMisionVision({ mision, vision }: Props) {
  return (
    <section className="bg-surface px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        <Reveal className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide text-secondary uppercase">
            <FaBullseye /> Misión
          </p>
          <p className="text-slate-600">{mision}</p>
        </Reveal>
        <Reveal delay={0.12} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide text-secondary uppercase">
            <FaEye /> Visión
          </p>
          <p className="text-slate-600">{vision}</p>
        </Reveal>
      </div>
    </section>
  );
}
