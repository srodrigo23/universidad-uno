import { FaBullseye, FaEye } from 'react-icons/fa6';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';

interface Props {
  mision: string;
  vision: string;
  t: {
    misionLabel: string;
    visionLabel: string;
  };
}

export default function CareerMisionVision({ mision, vision, t }: Props) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        <Reveal className="rounded-2xl border border-t-4 border-slate-200 border-t-secondary bg-white p-7 shadow-sm">
          <Eyebrow icon={FaBullseye} label={t.misionLabel} />
          <p className="text-slate-600">{mision}</p>
        </Reveal>
        <Reveal
          delay={0.12}
          className="rounded-2xl border border-t-4 border-slate-200 border-t-secondary bg-white p-7 shadow-sm"
        >
          <Eyebrow icon={FaEye} label={t.visionLabel} />
          <p className="text-slate-600">{vision}</p>
        </Reveal>
      </div>
    </section>
  );
}
