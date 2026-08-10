import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export function useHeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', (api) => setSelectedIndex(api.selectedScrollSnap()));
  }, [emblaApi]);

  return { emblaRef, emblaApi, selectedIndex };
}

interface BackgroundProps {
  emblaRef: ReturnType<typeof useHeroCarousel>['emblaRef'];
  slides: ImageMetadata[];
  /** Ajusta el encuadre por breakpoint, p. ej. "md:object-top md:origin-top". */
  imageClassName?: string;
}

export function CarouselBackground({ emblaRef, slides, imageClassName = '' }: BackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, i) => (
          <div key={i} className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden">
            <img
              src={slide.src}
              alt=""
              className={`h-full w-full origin-center animate-hero-zoom object-cover will-change-transform ${imageClassName}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface DotsProps {
  count: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

export function CarouselDots({ count, selectedIndex, onSelect, className = '' }: DotsProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === selectedIndex ? 'w-6 bg-secondary' : 'w-1.5 bg-white/40 hover:bg-white/60'
          }`}
        />
      ))}
    </div>
  );
}
