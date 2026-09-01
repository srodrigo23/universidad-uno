import { MisionVisionText } from './MisionVision';
import SectionGlow from './SectionGlow';

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
    <section className='px-6 py-16'>
      <div className='relative mx-auto max-w-6xl'>
        <SectionGlow />
        <MisionVisionText
          mision={mision}
          vision={vision}
          misionLabel={t.misionLabel}
          visionLabel={t.visionLabel}
        />
      </div>
    </section>
  );
}
