import { useState } from 'react';
import { FaArrowLeft, FaFilePdf, FaPlay } from 'react-icons/fa6';
import Reveal from './shared/Reveal';
import HeroBottomFade from './HeroBottomFade';
import VideoModal from './VideoModal';
import { careerVideo } from '../data/careers';

interface Props {
  nombre: string;
  resumen: string;
  image: ImageMetadata;
  videoSlug: string;
  backHref: string;
  mallaHref: string;
  t: {
    back: string;
    badge: string;
    malla: string;
    verVideo: string;
  };
  videoT: {
    close: string;
  };
}

export default function CareerHero({
  nombre,
  resumen,
  image,
  videoSlug,
  backHref,
  mallaHref,
  t,
  videoT,
}: Props) {
  const excerpt =
    resumen.length > 180 ? `${resumen.slice(0, 180).trimEnd()}…` : resumen;
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className='relative flex min-h-[75vh] items-end overflow-hidden bg-primary-dark px-6 pt-32 pb-20 text-white'>
      <img
        src={image.src}
        alt=''
        className='absolute inset-0 h-full w-full object-cover'
      />
      <div className='absolute inset-0 bg-primary-dark/75' />
      <HeroBottomFade />

      <Reveal className='relative mx-auto w-full max-w-6xl'>
        <a
          href={backHref}
          className='mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-secondary-light'
        >
          <FaArrowLeft size={12} /> {t.back}
        </a>
        <p className='mb-2 text-xs font-bold tracking-wide text-secondary-light uppercase'>
          {t.badge}
        </p>
        <h1 className='max-w-3xl text-3xl text-white sm:text-4xl'>{nombre}</h1>
        <p className='mt-4 max-w-2xl text-white/85'>{excerpt}</p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <a
            href={mallaHref}
            target='_blank'
            rel='noopener'
            className='inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-px hover:border-secondary-light hover:text-secondary-light'
          >
            <FaFilePdf size={14} className='shrink-0' />
            {t.malla}
          </a>
          <button
            type='button'
            onClick={() => setVideoOpen(true)}
            className='inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-secondary/30 transition hover:-translate-y-px hover:bg-secondary-dark'
          >
            <FaPlay size={12} className='shrink-0' />
            {t.verVideo}
          </button>
        </div>
      </Reveal>

      <VideoModal
        open={videoOpen}
        nombre={nombre}
        video={careerVideo(videoSlug)}
        onClose={() => setVideoOpen(false)}
        t={videoT}
      />
    </section>
  );
}
