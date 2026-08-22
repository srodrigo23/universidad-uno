import { FaLocationDot } from 'react-icons/fa6';
import Reveal from './shared/Reveal';
import Eyebrow from './Eyebrow';

const address =
  'Calle Junín entre Calle de la Reza y Calle La Paz, Cochabamba, Bolivia';
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

interface Props {
  t: {
    eyebrow: string;
    title: string;
    mapTitle: string;
  };
}

export default function Ubicacion({ t }: Props) {
  return (
    <section className='px-6 py-16'>
      <Reveal className='mx-auto max-w-6xl'>
        <Eyebrow icon={FaLocationDot} label={t.eyebrow} />
        <h2 className='mb-4 text-3xl text-primary-dark'>{t.title}</h2>
        <p className='mb-6 text-slate-600'>
          Edificio Central — Calle Junín entre J. de la Reza y Calle La Paz
        </p>
        <div className='overflow-hidden rounded-2xl border border-slate-200 shadow-lg'>
          <iframe
            src={mapSrc}
            title={t.mapTitle}
            className='h-96 w-full'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            allowFullScreen
          />
        </div>
      </Reveal>
    </section>
  );
}
