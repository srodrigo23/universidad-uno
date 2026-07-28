import { FaHeart } from 'react-icons/fa6';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';
import type { Valor } from '../data/careers';

interface Props {
  valores: Valor[];
  t: {
    eyebrow: string;
    title: string;
  };
}

export default function ValoresGrid({ valores, t }: Props) {
  return (
    <section className="px-6 py-16">
      <div className="relative mx-auto max-w-6xl">
        <SectionGlow />
        <Reveal>
          <Eyebrow icon={FaHeart} label={t.eyebrow} />
          <h2 className="mb-6 text-3xl text-primary-dark">{t.title}</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {valores.map((valor, i) => {
            const key = typeof valor === 'string' ? valor : valor.titulo;
            return (
              <Reveal
                key={key}
                delay={Math.min(i * 0.06, 0.6)}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                {typeof valor === 'string' ? (
                  <p className="text-slate-600">{valor}</p>
                ) : (
                  <>
                    <h3 className="mb-2 text-base text-primary-dark">{valor.titulo}</h3>
                    <p className="text-sm text-slate-600">{valor.descripcion}</p>
                  </>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
