import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { FaArrowRight, FaPlay } from 'react-icons/fa6';
import type { CareerVideo } from '../../data/careers';

interface Props {
  href: string;
  nombre: string;
  image: ImageMetadata;
  video: CareerVideo;
  badge: string;
  cta: string;
  verVideo: string;
  onPlay: () => void;
  index?: number;
}

export default function CareerCard({
  href,
  nombre,
  image,
  video,
  badge,
  cta,
  verVideo,
  onPlay,
  index = 0,
}: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    // Con movimiento reducido nos quedamos en la imagen fija y no bajamos el clip.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShowPreview(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.article
      ref={cardRef}
      className='group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl shadow-sm transition hover:-translate-y-1 hover:shadow-xl'
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* La imagen queda siempre debajo: evita el frame en blanco mientras el clip carga. */}
      <img
        src={image.src}
        alt={`Estudiantes de ${nombre} en la Universidad Privada UNO Cochabamba`}
        className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
      />
      {showPreview && (
        <video
          aria-hidden='true'
          src={video.preview}
          poster={video.poster}
          preload='metadata'
          muted
          loop
          playsInline
          autoPlay
          className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
      )}
      <div className='absolute inset-0 bg-primary-dark/15' />
      <div
        className='absolute inset-0'
        style={{
          backgroundImage:
            'linear-gradient(to top, var(--color-primary-dark) 0%, color-mix(in srgb, var(--color-primary-dark) 88%, transparent) 32%, color-mix(in srgb, var(--color-primary-dark) 15%, transparent) 65%, transparent 100%)',
        }}
      />

      <button
        type='button'
        onClick={onPlay}
        aria-label={`${verVideo}: ${nombre}`}
        className='absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-white shadow-lg shadow-primary-dark/30 transition hover:scale-110 hover:bg-secondary-dark'
      >
        <FaPlay size={14} className='ml-0.5' />
      </button>

      <div className='relative flex flex-col gap-1 p-6'>
        <span className='text-xs font-bold tracking-wide text-secondary-light uppercase'>
          {badge}
        </span>
        <h3 className='text-xl text-white'>{nombre}</h3>
        {/* after:inset-0 extiende el enlace a toda la tarjeta sin anidar el botón dentro de un <a>. */}
        <a
          href={href}
          className='mt-2 flex items-center gap-1.5 text-sm font-bold text-white transition-colors after:absolute after:inset-0 group-hover:text-secondary-light'
        >
          {cta} <FaArrowRight size={12} />
        </a>
      </div>
    </motion.article>
  );
}
