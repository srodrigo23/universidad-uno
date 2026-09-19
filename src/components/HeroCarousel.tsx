import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export function useHeroCarousel(visible = true) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // `select` dispara al empezar la transición y `settle` al terminarla, así que
  // durante el desplazamiento ambos índices difieren: el saliente sigue siendo
  // `settledIndex` hasta que sale de pantalla.
  const [settledIndex, setSettledIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onSettle = () => setSettledIndex(emblaApi.selectedScrollSnap());

    onSelect();
    onSettle();
    emblaApi.on('select', onSelect).on('settle', onSettle);

    return () => {
      emblaApi.off('select', onSelect).off('settle', onSettle);
    };
  }, [emblaApi]);

  // El autoplay de Embla no sabe nada del viewport: sin esto sigue cambiando
  // slides —y animando transforms— con el hero fuera de pantalla.
  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    if (visible) autoplay.play();
    else autoplay.stop();
  }, [emblaApi, visible]);

  return { emblaRef, emblaApi, selectedIndex, settledIndex };
}

interface BackgroundProps {
  emblaRef: ReturnType<typeof useHeroCarousel>['emblaRef'];
  slides: ImageMetadata[];
  /** Slide visible; es el único que anima. */
  activeIndex: number;
  /** Slide ya asentado; mantiene el zoom en el saliente durante la transición. */
  settledIndex?: number;
  /** Fuera de pantalla no se anima nada: una animación CSS infinita no se pausa sola. */
  visible?: boolean;
  /** Ajusta el encuadre por breakpoint, p. ej. "md:object-top md:origin-top". */
  imageClassName?: string;
}

export function CarouselBackground({
  emblaRef,
  slides,
  activeIndex,
  settledIndex = activeIndex,
  visible = true,
  imageClassName = '',
}: BackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, i) => {
          // Animar los cinco slides a la vez promueve cinco texturas del tamaño
          // completo de cada foto; las que no se ven no aportan nada y sí obligan
          // al compositor a rasterizarlas en cada fotograma.
          const animated = visible && (i === activeIndex || i === settledIndex);

          return (
            <div key={i} className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden">
              <img
                src={slide.src}
                alt=""
                // El slide 0 es el elemento LCP. Sin esto los cinco se piden a la
                // vez con la misma prioridad y compite con ~700 KB que nadie ve.
                // No se usa loading="lazy" en los demás: el autoplay los necesita
                // a los 5 s y llegarían en blanco.
                fetchPriority={i === 0 ? 'high' : 'low'}
                decoding={i === 0 ? 'sync' : 'async'}
                className={`h-full w-full origin-center object-cover ${
                  animated ? 'animate-hero-zoom will-change-transform' : ''
                } ${imageClassName}`}
              />
            </div>
          );
        })}
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
