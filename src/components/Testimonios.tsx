import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { FaComments, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';
import TestimonioCard from './TestimonioCard';
import { testimonios } from '../data/testimonios';

interface Props {
  t: {
    eyebrow: string;
    title: string;
    subtitle: string;
    prev: string;
    next: string;
  };
}

export default function Testimonios({ t }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', (api) => setSelectedIndex(api.selectedScrollSnap()));
  }, [emblaApi]);

  const navClass =
    'inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-primary transition-colors hover:border-secondary hover:bg-secondary hover:text-white';

  return (
    <section id="testimonios" className="px-6 py-16">
      <div className="relative mx-auto max-w-6xl">
        <SectionGlow />
        <Reveal>
          <Eyebrow icon={FaComments} label={t.eyebrow} />
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="mb-3 text-3xl text-primary-dark">{t.title}</h2>
              <p className="max-w-xl text-slate-600">{t.subtitle}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" aria-label={t.prev} onClick={() => emblaApi?.scrollPrev()} className={navClass}>
                <FaChevronLeft size={13} />
              </button>
              <button type="button" aria-label={t.next} onClick={() => emblaApi?.scrollNext()} className={navClass}>
                <FaChevronRight size={13} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* -ml-4 + pl-4 en cada slide: crea la separación sin romper el cálculo de ancho del loop. */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ml-4 flex items-stretch">
            {testimonios.map((item) => (
              <div
                key={item.nombre}
                className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <TestimonioCard nombre={item.nombre} testimonio={item.testimonio} pais={item.pais} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonios.map((item, i) => (
            <button
              key={item.nombre}
              type="button"
              aria-label={`${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex ? 'w-6 bg-secondary' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
