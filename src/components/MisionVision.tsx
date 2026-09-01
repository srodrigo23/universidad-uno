import type { IconType } from 'react-icons';
import { FaBullseye, FaEye } from 'react-icons/fa6';
import Reveal from './shared/Reveal';
import SectionGlow from './SectionGlow';

interface BlockProps {
  icon: IconType;
  label: string;
  text: string;
  delay?: number;
}

function Block({ icon: Icon, label, text, delay }: BlockProps) {
  return (
    <Reveal delay={delay}>
      <h2 className='mb-3 flex items-center gap-2.5 text-2xl text-primary-dark'>
        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary'>
          <Icon size={14} />
        </span>
        {label}
      </h2>
      <p className='text-slate-600'>{text}</p>
    </Reveal>
  );
}

interface TextProps {
  mision: string;
  vision: string;
  misionLabel: string;
  visionLabel: string;
}

/** Bloque compartido con la versión por carrera; el texto va completo, sin recorte. */
export function MisionVisionText({ mision, vision, misionLabel, visionLabel }: TextProps) {
  return (
    <div className='grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-12'>
      <Block icon={FaBullseye} label={misionLabel} text={mision} />
      <Block icon={FaEye} label={visionLabel} text={vision} delay={0.12} />
    </div>
  );
}

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
    <section id='mision-vision' className='px-6 py-16'>
      <div className='relative mx-auto max-w-6xl'>
        <SectionGlow />
        <MisionVisionText
          mision={t.misionText}
          vision={t.visionText}
          misionLabel={t.misionLabel}
          visionLabel={t.visionLabel}
        />
      </div>
    </section>
  );
}
