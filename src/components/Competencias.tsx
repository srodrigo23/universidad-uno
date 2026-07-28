import { FaListCheck } from 'react-icons/fa6';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';
import type { CompetenciaGrupo } from '../data/careers';

interface Props {
  grupos: CompetenciaGrupo[];
}

export default function Competencias({ grupos }: Props) {
  return (
    <section className="px-6 py-16">
      <div className="relative mx-auto max-w-6xl">
        <SectionGlow />
        <Reveal>
          <Eyebrow icon={FaListCheck} label="Perfil de egreso" />
          <h2 className="mb-6 text-3xl text-primary-dark">Competencias</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {grupos.map((grupo, i) => (
            <Reveal
              key={grupo.titulo}
              delay={i * 0.1}
              className="rounded-2xl border border-t-4 border-slate-200 border-t-secondary bg-white p-7 shadow-sm"
            >
              <h3 className="mb-3 text-lg text-primary-dark">{grupo.titulo}</h3>
              <ul className="flex flex-col gap-2">
                {grupo.items.map((item) => (
                  <li key={item.slice(0, 24)} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-0.5 shrink-0 font-bold text-secondary">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
