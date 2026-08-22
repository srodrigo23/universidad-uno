import { useState } from 'react';
import { FaGraduationCap } from 'react-icons/fa6';
import CareerCard from './CareerCard';
import VideoModal from './VideoModal';
import Reveal from './shared/Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';
import { careerVideo } from '../data/careers';

interface CareerSummary {
  slug: string;
  nombre: string;
  videoSlug: string;
  image: ImageMetadata;
}

interface Props {
  careers: CareerSummary[];
  basePath: string;
  t: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  cardT: {
    badge: string;
    cta: string;
    verVideo: string;
  };
  videoT: {
    close: string;
  };
}

export default function CareersSection({
  careers,
  basePath,
  t,
  cardT,
  videoT,
}: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = careers.find((career) => career.slug === activeSlug) ?? null;

  return (
    <section id='carreras' className='px-6 pt-6'>
      <div className='relative mx-auto max-w-6xl'>
        <SectionGlow />
        <Reveal>
          <Eyebrow icon={FaGraduationCap} label={t.eyebrow} />
          <h2 className='mb-3 text-3xl text-primary-dark'>{t.title}</h2>
          <p className='max-w-xl text-slate-600'>{t.subtitle}</p>
        </Reveal>
        <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {careers.map((career, i) => (
            <CareerCard
              key={career.slug}
              href={`${basePath}/${career.slug}`}
              nombre={career.nombre}
              image={career.image}
              video={careerVideo(career.videoSlug)}
              badge={cardT.badge}
              cta={cardT.cta}
              verVideo={cardT.verVideo}
              onPlay={() => setActiveSlug(career.slug)}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Una sola instancia para toda la grilla. */}
      <VideoModal
        open={active !== null}
        nombre={active?.nombre ?? ''}
        video={active ? careerVideo(active.videoSlug) : null}
        onClose={() => setActiveSlug(null)}
        t={videoT}
      />
    </section>
  );
}
