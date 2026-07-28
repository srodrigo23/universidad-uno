import { FaArrowLeft } from 'react-icons/fa6';
import Reveal from './Reveal';
import SectionGlow from './SectionGlow';

interface Props {
  nombre: string;
  resumen: string;
  backHref: string;
  t: {
    back: string;
    badge: string;
  };
}

export default function CareerHero({ nombre, resumen, backHref, t }: Props) {
  return (
    <section className="px-6 py-16">
      <Reveal className="relative mx-auto max-w-6xl">
        <SectionGlow />
        <a href={backHref} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          <FaArrowLeft size={12} /> {t.back}
        </a>
        <p className="mb-2 text-xs font-bold tracking-wide text-secondary uppercase">{t.badge}</p>
        <h1 className="max-w-3xl text-3xl text-primary-dark sm:text-4xl">{nombre}</h1>
        <p className="mt-4 max-w-2xl text-slate-600">{resumen}</p>
      </Reveal>
    </section>
  );
}
