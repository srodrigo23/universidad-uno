import { useCallback, useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaCircleCheck } from 'react-icons/fa6';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Reveal from './Reveal';

import slide1 from '../assets/images/estudiantes/estudiantes-biblioteca.webp';
import slide2 from '../assets/images/estudiantes/estudiantes-libro-biblioteca.webp';
import slide3 from '../assets/images/medicina/med-todos.webp';
import slide4 from '../assets/images/enfermeria/enf-estudiandes-uno.webp';
import slide5 from '../assets/images/admin/admin-todos-uno.webp';

type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;

const slides = [slide1, slide2, slide3, slide4, slide5];

const PARALLAX_FACTOR = 1.6;

interface Props {
  t: {
    eyebrow: string;
    title: string;
    subtitle: string;
    resolution: string;
    cta: string;
  };
}

export default function Hero({ t }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const parallaxNodes = useRef<HTMLElement[]>([]);
  const parallaxFactor = useRef(0);

  const setParallaxNodes = useCallback((api: EmblaApi) => {
    parallaxNodes.current = api
      .slideNodes()
      .map((node) => node.querySelector<HTMLElement>('.hero-slide-img'))
      .filter((node): node is HTMLElement => node !== null);
  }, []);

  const setParallaxFactor = useCallback((api: EmblaApi) => {
    parallaxFactor.current = PARALLAX_FACTOR * api.scrollSnapList().length;
  }, []);

  const applyParallax = useCallback((api: EmblaApi) => {
    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();
    const slidesInView = api.slidesInView();

    api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (!slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });
        }

        const translate = diffToTarget * (-1 * parallaxFactor.current) * 100;
        const node = parallaxNodes.current[slideIndex];
        if (node) node.style.transform = `translateX(${translate}%) scale(1.25)`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setParallaxNodes(emblaApi);
    setParallaxFactor(emblaApi);
    applyParallax(emblaApi);
    setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi
      .on('reInit', setParallaxNodes)
      .on('reInit', setParallaxFactor)
      .on('reInit', applyParallax)
      .on('scroll', applyParallax)
      .on('slideFocus', applyParallax)
      .on('select', (api) => setSelectedIndex(api.selectedScrollSnap()));
  }, [emblaApi, setParallaxNodes, setParallaxFactor, applyParallax]);

  return (
    <section className="relative overflow-hidden bg-primary-dark px-6 py-20 text-white sm:py-28">
      <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={i} className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden">
              <img
                src={slide.src}
                alt=""
                className="hero-slide-img h-full w-full scale-125 object-cover will-change-transform"
              />
            </div>
          ))}
        </div>
      </div>
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
