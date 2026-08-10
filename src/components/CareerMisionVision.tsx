import { FaBullseye, FaEye } from 'react-icons/fa6';
import MisionVisionCard from './MisionVisionCard';

interface Props {
  mision: string;
  vision: string;
  t: {
    misionLabel: string;
    visionLabel: string;
    readMore: string;
    readLess: string;
  };
}

export default function CareerMisionVision({ mision, vision, t }: Props) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        <MisionVisionCard icon={FaBullseye} label={t.misionLabel} text={mision} t={t} />
        <MisionVisionCard icon={FaEye} label={t.visionLabel} text={vision} delay={0.12} t={t} />
      </div>
    </section>
  );
}
