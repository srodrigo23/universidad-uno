import { FaGraduationCap } from 'react-icons/fa6';
import CareerCard from './CareerCard';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';

interface CareerSummary {
  slug: string;
  nombre: string;
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
  };
}

export default function CareersSection({ careers, basePath, t, cardT }: Props) {
  return (
    <section id="carreras" className="px-6 py-16">
      <div className="relative mx-auto max-w-6xl">
        <SectionGlow />
        <Reveal>
          <Eyebrow icon={FaGraduationCap} label={t.eyebrow} />
          <h2 className="mb-3 text-3xl text-primary-dark">{t.title}</h2>
          <p className="max-w-xl text-slate-600">{t.subtitle}</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((career, i) => (
            <CareerCard
              key={career.slug}
              href={`${basePath}/${career.slug}`}
              nombre={career.nombre}
              image={career.image}
              badge={cardT.badge}
              cta={cardT.cta}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
