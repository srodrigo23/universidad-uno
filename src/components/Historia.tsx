import { FaLandmark } from 'react-icons/fa6';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';

interface Props {
  t: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
}

export default function Historia({ t }: Props) {
  return (
    <section id="historia" className="bg-surface px-6 py-16">
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
