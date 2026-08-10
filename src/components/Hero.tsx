import { useEffect, useState } from 'react';
import { FaChevronDown, FaCircleCheck } from 'react-icons/fa6';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Reveal from './Reveal';

import slide1 from '../assets/images/estudiantes/estudiantes-biblioteca.webp';
import slide2 from '../assets/images/estudiantes/estudiantes-libro-biblioteca.webp';
import slide3 from '../assets/images/medicina/med-todos.webp';
import slide4 from '../assets/images/enfermeria/enf-estudiandes-uno.webp';
import slide5 from '../assets/images/admin/admin-todos-uno.webp';

const slides = [slide1, slide2, slide3, slide4, slide5];

interface Props {
  t: {
    eyebrow: string;
    title: string;
    rotatingPhrases: string[];
    resolution: string;
    cta: string;
  };
}

const TYPE_SPEED_MS = 45;
const TYPE_START_DELAY_MS = 350;

const ROTATE_TYPE_SPEED_MS = 40;
const ROTATE_DELETE_SPEED_MS = 22;
const ROTATE_HOLD_MS = 1800;
const ROTATE_PAUSE_MS = 400;

export default function Hero({ t }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [typedTitle, setTypedTitle] = useState('');
  const [rotatingText, setRotatingText] = useState('');

  useEffect(() => {
    setTypedTitle('');
    let charCount = 0;
    let typeInterval: ReturnType<typeof setInterval>;

    const startTimeout = setTimeout(() => {
      typeInterval = setInterval(() => {
        charCount += 1;
        setTypedTitle(t.title.slice(0, charCount));
        if (charCount >= t.title.length) clearInterval(typeInterval);
      }, TYPE_SPEED_MS);
    }, TYPE_START_DELAY_MS);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(typeInterval);
    };
  }, [t.title]);

  useEffect(() => {
    const phrases = t.rotatingPhrases;
    if (!phrases || phrases.length === 0) return;

    let phraseIndex = 0;
    let charCount = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = phrases[phraseIndex];
      charCount += 1;
      setRotatingText(current.slice(0, charCount));
      timeoutId = setTimeout(charCount < current.length ? type : erase, charCount < current.length ? ROTATE_TYPE_SPEED_MS : ROTATE_HOLD_MS);
    };

    const erase = () => {
      const current = phrases[phraseIndex];
      charCount -= 1;
      setRotatingText(current.slice(0, charCount));
      if (charCount > 0) {
        timeoutId = setTimeout(erase, ROTATE_DELETE_SPEED_MS);
      } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timeoutId = setTimeout(type, ROTATE_PAUSE_MS);
      }
    };

    const initialDelay = TYPE_START_DELAY_MS + t.title.length * TYPE_SPEED_MS + ROTATE_PAUSE_MS;
    setRotatingText('');
    timeoutId = setTimeout(type, initialDelay);

    return () => clearTimeout(timeoutId);
  }, [t.rotatingPhrases, t.title]);

  useEffect(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', (api) => setSelectedIndex(api.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-primary-dark px-6 py-24 text-white">
      <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={i} className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden">
              <img
                src={slide.src}
                alt=""
                className="h-full w-full origin-center animate-hero-zoom object-cover will-change-transform"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(115deg, color-mix(in srgb, var(--color-primary-dark) 62%, transparent) 0%, color-mix(in srgb, var(--color-primary-dark) 32%, transparent) 50%, color-mix(in srgb, var(--color-primary-dark) 15%, transparent) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <Reveal className="absolute mx-auto max-w-6xl bottom-0 pb-10">
        <p className="mb-2 text-xs font-bold tracking-widest text-secondary-light uppercase">{t.eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-extrabold text-white sm:text-5xl" aria-label={t.title}>
          <span aria-hidden="true">{typedTitle}</span>
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-[0.85em] w-0.75 translate-y-[0.1em] animate-pulse bg-secondary-light align-middle"
          />
        </h1>
        <p className="mt-4 min-h-14 max-w-xl text-lg font-light text-white/85 sm:min-h-8" aria-hidden="true">
          {rotatingText}
          <span className="ml-0.5 inline-block h-[0.8em] w-0.5 translate-y-[0.1em] animate-pulse bg-white/70 align-middle" />
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-secondary-light/40 bg-secondary/15 px-3 py-1.5 text-xs font-semibold text-secondary-light">
          <FaCircleCheck size={12} className="shrink-0" />
          {t.resolution}
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="#carreras"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-secondary/30 transition hover:-translate-y-px hover:bg-secondary-dark"
          >
            {t.cta} <FaChevronDown />
          </a>
        </div>

        <div className="mt-8 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex ? 'w-6 bg-secondary' : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
