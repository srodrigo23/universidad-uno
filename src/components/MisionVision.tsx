import { FaBullseye, FaEye } from 'react-icons/fa6';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';

interface Props {
  t: {
    misionLabel: string;
    misionText: string;
    visionLabel: string;
    visionText: string;
  };
}

export default function MisionVision({ t }: Props) {
  return (
    <section id="mision-vision" className="px-6 py-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        <Reveal className="rounded-2xl border border-t-4 border-slate-200 border-t-secondary bg-white p-7 shadow-sm">
          <Eyebrow icon={FaBullseye} label={t.misionLabel} />
          <p className="text-slate-600">{t.misionText}</p>
        </Reveal>
        <Reveal
          delay={0.12}
          className="rounded-2xl border border-t-4 border-slate-200 border-t-secondary bg-white p-7 shadow-sm"
        >
          <Eyebrow icon={FaEye} label={t.visionLabel} />
          <p className="text-slate-600">{t.visionText}</p>
        </Reveal>
      </div>
    </section>
  );
}
