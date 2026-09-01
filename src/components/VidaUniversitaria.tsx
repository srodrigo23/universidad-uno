import { FaCameraRetro } from 'react-icons/fa6';
import Reveal from './shared/Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';

/** Variantes ya procesadas en build; el componente no recibe el original de 22 MP. */
export interface GaleriaImagen {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
}

interface Props {
  fotos: GaleriaImagen[];
  t: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
}

export default function VidaUniversitaria({ fotos, t }: Props) {
  return (
    <section id='vida-universitaria' className='px-6 py-16'>
      <div className='relative mx-auto max-w-6xl'>
        <SectionGlow />
        <Reveal>
          <Eyebrow icon={FaCameraRetro} label={t.eyebrow} />
          <h2 className='mb-3 text-3xl text-primary-dark'>{t.title}</h2>
          <p className='mb-8 max-w-2xl text-slate-600'>{t.subtitle}</p>
        </Reveal>
        <div className='grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3'>
          {fotos.map((foto, i) => (
            <Reveal
              key={foto.src}
              delay={(i % 3) * 0.08}
              className='group overflow-hidden rounded-2xl'
            >
              <img
                src={foto.src}
                srcSet={foto.srcSet}
                sizes='(min-width: 1024px) 33vw, 50vw'
                width={foto.width}
                height={foto.height}
                alt={foto.alt}
                loading='lazy'
                decoding='async'
                className='h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64'
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
