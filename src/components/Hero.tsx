import { useRef } from 'react';
import { FaChevronDown, FaCircleCheck, FaLocationDot } from 'react-icons/fa6';
import Reveal from './shared/Reveal';
import HeroBottomFade from './HeroBottomFade';
import HeroRotatingText from './HeroRotatingText';
import { useSeccionVisible } from '../lib/useSeccionVisible';
import {
  useHeroCarousel,
  CarouselBackground,
  CarouselDots,
} from './HeroCarousel';

// import slide0 from '../assets/images/estudiantes/hero/estudiante-mujer-modelo-uno.webp';
import slide1 from '../assets/images/estudiantes/hero/estudiantes-biblioteca.webp';
import slide2 from '../assets/images/estudiantes/hero/estudiantes-libro-biblioteca.webp';
import slide3 from '../assets/images/medicina/hero/med-todos.webp';
import slide4 from '../assets/images/enfermeria/hero/enf-estudiandes-uno.webp';
import slide5 from '../assets/images/admin/hero/admin-todos-uno.webp';

const slides = [slide1, slide2, slide3, slide4, slide5];

/** El primero es el candidato a LCP: la página lo precarga desde el <head>. */
export const heroLcpImage = slides[0];

interface Props {
  t: {
    eyebrow: string;
    title: string;
    rotatingPhrases: string[];
    resolution: string;
    cta: string;
  };
}

export default function Hero({ t }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useSeccionVisible(sectionRef);
  const { emblaRef, emblaApi, selectedIndex, settledIndex } = useHeroCarousel(visible);
  return (
    <section ref={sectionRef} className='relative flex min-h-screen items-end overflow-hidden bg-primary-dark px-6 pt-32 pb-20 text-white sm:pb-24'>
      <CarouselBackground
        emblaRef={emblaRef}
        slides={slides}
        activeIndex={selectedIndex}
        settledIndex={settledIndex}
        visible={visible}
      />
      <div
        className='absolute inset-0'
        style={{
          backgroundImage:
            'linear-gradient(115deg, color-mix(in srgb, var(--color-primary-dark) 78%, transparent) 0%, color-mix(in srgb, var(--color-primary-dark) 45%, transparent) 52%, color-mix(in srgb, var(--color-primary-dark) 18%, transparent) 100%)',
        }}
      />
      <div
        className='absolute inset-x-0 bottom-0 h-2/3'
        style={{
          backgroundImage:
            'linear-gradient(to top, color-mix(in srgb, var(--color-primary-dark) 85%, transparent) 0%, transparent 100%)',
        }}
      />
      <div
        className='absolute inset-0 opacity-[0.15] mix-blend-overlay'
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <HeroBottomFade />

      <div className='relative mx-auto flex w-full max-w-6xl flex-col'>
        <Reveal>
          <p className='inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[0.7rem] font-bold tracking-[0.18em] text-white uppercase backdrop-blur-sm'>
            <FaLocationDot className='text-secondary-light' size={12} />
            {t.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className='mt-5 max-w-4xl bg-gradient-to-br from-white via-white to-secondary-light bg-clip-text text-4xl leading-[1.08] font-extrabold text-balance text-transparent sm:text-5xl lg:text-6xl'>
            {t.title}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p
            className='mt-4 flex min-h-14 max-w-xl items-start text-base font-semibold text-white/85 sm:min-h-8 sm:text-lg'
            aria-hidden='true'
          >
            <span className='mr-3 mt-2.5 hidden h-px w-8 shrink-0 bg-secondary-light/70 sm:block' />
            <HeroRotatingText phrases={t.rotatingPhrases} />
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className='mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
            <a
              href='#carreras'
              className='group inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-secondary/30 transition hover:-translate-y-0.5 hover:bg-secondary-dark hover:shadow-xl hover:shadow-secondary/40'
            >
              {t.cta}
              <FaChevronDown className='transition-transform group-hover:translate-y-0.5' />
            </a>
            <div className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white/90 backdrop-blur-sm sm:text-sm'>
              <FaCircleCheck size={13} className='shrink-0 text-secondary-light' />
              {t.resolution}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <CarouselDots
            className='mt-10'
            count={slides.length}
            selectedIndex={selectedIndex}
            onSelect={(i) => emblaApi?.scrollTo(i)}
          />
        </Reveal>
      </div>
    </section>
  );
}
