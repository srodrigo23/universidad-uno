import { FaArrowLeft } from 'react-icons/fa6';
import Reveal from './Reveal';

interface Props {
  nombre: string;
  resumen: string;
  image: ImageMetadata;
  backHref: string;
  t: {
    back: string;
    badge: string;
  };
}

export default function CareerHero({ nombre, resumen, image, backHref, t }: Props) {
  const excerpt = resumen.length > 180 ? `${resumen.slice(0, 180).trimEnd()}…` : resumen;

  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-primary-dark px-6 py-24 text-white">
      <img src={image.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-primary-dark/75" />

      <Reveal className="relative mx-auto max-w-6xl">
        <a href={backHref} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-secondary-light">
          <FaArrowLeft size={12} /> {t.back}
        </a>
        <p className="mb-2 text-xs font-bold tracking-wide text-secondary-light uppercase">{t.badge}</p>
        <h1 className="max-w-3xl text-3xl text-white sm:text-4xl">{nombre}</h1>
        <p className="mt-4 max-w-2xl text-white/85">{excerpt}</p>
      </Reveal>
    </section>
  );
}
