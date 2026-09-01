import { FaLocationDot } from 'react-icons/fa6';
import Reveal from './shared/Reveal';
import Eyebrow from './Eyebrow';

// const address =
//   'Calle Junín entre Calle de la Reza y Calle La Paz, Cochabamba, Bolivia';
const mapSrc =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.513048208485!2d-66.16344472405896!3d-17.387149383499956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3750066333891%3A0x66f1de6b1de0684!2sUniversidad%20UNO%20Cochabamba!5e0!3m2!1ses!2sbo!4v1788209452170!5m2!1ses!2sbo';

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
{/* <iframe
  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.513048208485!2d-66.16344472405896!3d-17.387149383499956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3750066333891%3A0x66f1de6b1de0684!2sUniversidad%20UNO%20Cochabamba!5e0!3m2!1ses!2sbo!4v1788209452170!5m2!1ses!2sbo'
  width='600'
  height='450'
  style='border:0;'
  allowfullscreen=''
  loading='lazy'
  referrerpolicy='strict-origin-when-cross-origin'
></iframe>; */}
