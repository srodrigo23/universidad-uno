import { FaLandmark } from 'react-icons/fa6';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';

import bgImage from '../assets/images/estudiantes/estudiantes-mochila-modelo.webp';

interface Props {
  t: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
}

export default function Historia({ t }: Props) {
  return (
    <section className="relative overflow-hidden bg-surface px-6 py-16">
      <img src={bgImage.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(100deg, color-mix(in srgb, var(--color-surface) 97%, transparent) 0%, color-mix(in srgb, var(--color-surface) 94%, transparent) 55%, color-mix(in srgb, var(--color-surface) 72%, transparent) 100%)',
        }}
      />
      <Reveal className="relative mx-auto max-w-6xl">
        <SectionGlow />
        <Eyebrow icon={FaLandmark} label={t.eyebrow} />
        <h2 className="mb-6 text-3xl text-primary-dark">{t.title}</h2>
        <div className="max-w-3xl space-y-4">
          {t.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-slate-600">
              {p}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
