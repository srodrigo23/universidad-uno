import { FaArrowLeft, FaFilePdf } from 'react-icons/fa6';
import Reveal from './Reveal';

interface Props {
  nombre: string;
  resumen: string;
  image: ImageMetadata;
  backHref: string;
  mallaHref: string;
  t: {
    back: string;
    badge: string;
    malla: string;
  };
}

export default function CareerHero({ nombre, resumen, image, backHref, mallaHref, t }: Props) {
  const excerpt = resumen.length > 180 ? `${resumen.slice(0, 180).trimEnd()}…` : resumen;

  return (
    <section className="relative flex min-h-[75vh] items-end overflow-hidden bg-primary-dark px-6 pt-32 pb-12 text-white">
      <img src={image.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-primary-dark/75" />

      <Reveal className="relative mx-auto w-full max-w-6xl">
        <a href={backHref} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-secondary-light">
          <FaArrowLeft size={12} /> {t.back}
        </a>
        <p className="mb-2 text-xs font-bold tracking-wide text-secondary-light uppercase">{t.badge}</p>
        <h1 className="max-w-3xl text-3xl text-white sm:text-4xl">{nombre}</h1>
        <p className="mt-4 max-w-2xl text-white/85">{excerpt}</p>
        <a
          href={mallaHref}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-secondary/30 transition hover:-translate-y-px hover:bg-secondary-dark"
        >
          <FaFilePdf size={14} className="shrink-0" />
          {t.malla}
        </a>
      </Reveal>
    </section>
  );
}
