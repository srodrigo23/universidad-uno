import { FaClipboardList, FaArrowRight } from 'react-icons/fa6';
import Reveal from './shared/Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';

interface Props {
  t: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: { titulo: string; texto: string }[];
    cta: string;
  };
}

export default function ComoPostular({ t }: Props) {
  return (
    <section id='como-postular' className='px-6 py-16'>
      <div className='relative mx-auto max-w-6xl'>
        <SectionGlow />
        <Reveal>
          <Eyebrow icon={FaClipboardList} label={t.eyebrow} />
          <h2 className='mb-3 text-3xl text-primary-dark'>{t.title}</h2>
          <p className='mb-10 max-w-2xl text-slate-600'>{t.subtitle}</p>
        </Reveal>
        <ol className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {t.steps.map((step, i) => (
            <li key={step.titulo}>
              <Reveal delay={i * 0.08}>
                <span
                  aria-hidden='true'
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-base font-extrabold text-white shadow-lg shadow-secondary/30'
                >
                  {i + 1}
                </span>
                <h3 className='mt-4 text-lg text-primary-dark'>{step.titulo}</h3>
                <p className='mt-1.5 text-sm text-slate-600'>{step.texto}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal delay={0.32}>
          <a
            href='#preinscripcion'
            className='group mt-10 inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-secondary/30 transition hover:-translate-y-0.5 hover:bg-secondary-dark hover:shadow-xl hover:shadow-secondary/40'
          >
            {t.cta}
            <FaArrowRight
              size={12}
              className='transition-transform group-hover:translate-x-0.5'
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
