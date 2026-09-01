import { FaShieldHalved } from 'react-icons/fa6';
import Reveal from './shared/Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';

interface Props {
  t: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { value: string; label: string; detail: string }[];
  };
}

export default function Credenciales({ t }: Props) {
  return (
    <section className='px-6 py-16'>
      <div className='relative mx-auto max-w-6xl'>
        <SectionGlow />
        <Reveal>
          <Eyebrow icon={FaShieldHalved} label={t.eyebrow} />
          <h2 className='mb-3 text-3xl text-primary-dark'>{t.title}</h2>
          <p className='mb-10 max-w-2xl text-slate-600'>{t.subtitle}</p>
        </Reveal>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {t.items.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.08}
              className='border-l-2 border-secondary/30 pl-5'
            >
              <p className='text-2xl font-extrabold text-primary'>{item.value}</p>
              <p className='mt-1 text-sm font-semibold text-primary-dark'>{item.label}</p>
              <p className='mt-1.5 text-sm text-slate-600'>{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
