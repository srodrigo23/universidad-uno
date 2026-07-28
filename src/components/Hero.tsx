import { FaChevronDown } from 'react-icons/fa6';
import Reveal from './Reveal';
import heroBg from '../assets/images/hero_section.webp';

interface Props {
  t: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
  };
}

export default function Hero({ t }: Props) {
  return (
    <section className="relative overflow-hidden bg-primary-dark px-6 py-20 text-white sm:py-28">
      <div
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg.src})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-primary-dark) 0%, color-mix(in srgb, var(--color-primary-dark) 96%, transparent) 55%, color-mix(in srgb, var(--color-primary-dark) 40%, transparent) 72%, color-mix(in srgb, var(--color-primary-dark) 5%, transparent) 88%)',
        }}
      />

      <Reveal className="relative mx-auto max-w-6xl">
        <p className="mb-2 text-xs font-bold tracking-widest text-secondary-light uppercase">{t.eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-extrabold text-white sm:text-5xl">{t.title}</h1>
        <p className="mt-4 max-w-xl text-lg font-light text-white/85">{t.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#carreras"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-secondary/30 transition hover:-translate-y-px hover:bg-secondary-dark"
          >
            {t.cta} <FaChevronDown />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
