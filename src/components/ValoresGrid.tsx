import { FaHeart } from 'react-icons/fa6';
import Reveal from './Reveal';
import type { Valor } from '../data/careers';

interface Props {
  valores: Valor[];
}

export default function ValoresGrid({ valores }: Props) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide text-secondary uppercase">
            <FaHeart /> Nuestros principios
          </p>
          <h2 className="mb-6 text-3xl text-primary-dark">Valores de la carrera</h2>
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
