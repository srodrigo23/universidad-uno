import { FaBriefcase, FaCircleCheck } from 'react-icons/fa6';
import Reveal from './shared/Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';

interface Props {
  titulo: string;
  items: string[];
  t: {
    eyebrow: string;
  };
}

export default function CampoLaboral({ titulo, items, t }: Props) {
  return (
    <section className='px-6 py-16'>
      <Reveal className='relative mx-auto max-w-6xl'>
        <SectionGlow />
        <Eyebrow icon={FaBriefcase} label={t.eyebrow} />
        <h2 className='mb-6 text-3xl text-primary-dark'>{titulo}</h2>
        <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {items.map((item) => (
            <li
              key={item.slice(0, 24)}
              className='flex items-start gap-2 text-slate-600'
            >
              <FaCircleCheck className='mt-0.5 shrink-0 text-secondary' />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
