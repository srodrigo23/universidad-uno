import { FaArrowLeft } from 'react-icons/fa6';
import Reveal from './Reveal';

interface Props {
  nombre: string;
  resumen: string;
}

export default function CareerHero({ nombre, resumen }: Props) {
  return (
    <section className="px-6 py-16">
      <Reveal className="mx-auto max-w-6xl">
        <a href="/#carreras" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          <FaArrowLeft size={12} /> Volver a carreras
        </a>
        <p className="mb-2 text-xs font-bold tracking-wide text-secondary uppercase">Licenciatura</p>
        <h1 className="max-w-3xl text-3xl text-primary-dark sm:text-4xl">{nombre}</h1>
        <p className="mt-4 max-w-2xl text-slate-600">{resumen}</p>
      </Reveal>
    </section>
  );
}
