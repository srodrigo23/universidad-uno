import { FaBullseye, FaEye } from 'react-icons/fa6';
import MisionVisionCard from './MisionVisionCard';

interface Props {
  t: {
    misionLabel: string;
    misionText: string;
    visionLabel: string;
    visionText: string;
    readMore: string;
    readLess: string;
  };
}

export default function MisionVision({ t }: Props) {
  return (
    <section id="mision-vision" className="px-6 py-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        <MisionVisionCard icon={FaBullseye} label={t.misionLabel} text={t.misionText} t={t} />
        <MisionVisionCard icon={FaEye} label={t.visionLabel} text={t.visionText} delay={0.12} t={t} />
      </div>
    </section>
  );
}
