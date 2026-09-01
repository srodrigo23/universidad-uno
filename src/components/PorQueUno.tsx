import type { IconType } from 'react-icons';
import {
  FaListCheck,
  FaLocationDot,
  FaLightbulb,
  FaEarthAmericas,
} from 'react-icons/fa6';
import Reveal from './shared/Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';

interface Props {
  t: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { titulo: string; texto: string }[];
  };
}

/** Los iconos viven aquí y no en el diccionario: acompañan al orden, no al idioma. */
const icons: IconType[] = [
  FaListCheck,
  FaLocationDot,
  FaLightbulb,
  FaEarthAmericas,
];

export default function PorQueUno({ t }: Props) {
  return (
    <section className='px-6 py-16'>
      <div className='relative mx-auto max-w-6xl'>
        <SectionGlow />
        <Reveal>
          <Eyebrow icon={FaLightbulb} label={t.eyebrow} />
          <h2 className='mb-3 text-3xl text-primary-dark'>{t.title}</h2>
          <p className='mb-10 max-w-2xl text-slate-600'>{t.subtitle}</p>
        </Reveal>
        <div className='grid max-w-5xl grid-cols-1 gap-9 md:grid-cols-2 md:gap-x-12'>
          {t.items.map((item, i) => {
            const Icon = icons[i % icons.length];

            return (
              <Reveal key={item.titulo} delay={i * 0.08}>
                <h3 className='mb-2 flex items-center gap-2.5 text-lg text-primary-dark'>
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary'>
                    <Icon size={15} />
                  </span>
                  {item.titulo}
                </h3>
                <p className='text-slate-600'>{item.texto}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
