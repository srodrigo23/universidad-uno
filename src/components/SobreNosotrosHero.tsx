import Reveal from './Reveal';
import { useHeroCarousel, CarouselBackground, CarouselDots } from './HeroCarousel';

import slide1 from '../assets/images/estudiantes/estudiante-mujer-modelo-uno.webp';
import slide2 from '../assets/images/estudiantes/estudiante-hombre-modelo-mochila.webp';
import slide3 from '../assets/images/estudiantes/estudiante-jugando-area-recreacional.webp';
import slide4 from '../assets/images/estudiantes/estudiantes-jugando-pinpon.webp';

const slides = [slide1, slide2, slide3, slide4];

interface Props {
  t: {
    eyebrow: string;
    title: string;
    intro: string;
  };
}

export default function SobreNosotrosHero({ t }: Props) {
  const { emblaRef, emblaApi, selectedIndex } = useHeroCarousel();

  return (
    <section className="relative flex min-h-[75vh] items-end overflow-hidden bg-primary-dark px-6 pt-32 pb-12 text-white">
      <CarouselBackground emblaRef={emblaRef} slides={slides} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(115deg, color-mix(in srgb, var(--color-primary-dark) 62%, transparent) 0%, color-mix(in srgb, var(--color-primary-dark) 32%, transparent) 50%, color-mix(in srgb, var(--color-primary-dark) 15%, transparent) 100%)',
        }}
      />

      <Reveal className="relative mx-auto w-full max-w-6xl">
        <p className="mb-2 text-xs font-bold tracking-widest text-secondary-light uppercase">{t.eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-extrabold text-white sm:text-5xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-lg font-light text-white/85">{t.intro}</p>
        <CarouselDots
          className="mt-8"
          count={slides.length}
          selectedIndex={selectedIndex}
          onSelect={(i) => emblaApi?.scrollTo(i)}
        />
      </Reveal>
    </section>
  );
}
