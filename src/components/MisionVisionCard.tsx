import { useState } from 'react';
import type { IconType } from 'react-icons';
import { FaChevronDown } from 'react-icons/fa6';
import Reveal from './Reveal';

interface Props {
  icon: IconType;
  label: string;
  text: string;
  delay?: number;
  t: {
    readMore: string;
    readLess: string;
  };
}

export default function MisionVisionCard({ icon: Icon, label, text, delay, t }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Reveal delay={delay} className="h-full">
      <article
        // En escritorio basta pasar el cursor; el guard evita que iOS dispare
        // un mouseenter sintético y abra la tarjeta antes del tap.
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setExpanded(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') setExpanded(false);
        }}
        className="flex h-full flex-col rounded-2xl border-t-4 border-t-primary bg-secondary-light p-7 text-primary-dark shadow-lg shadow-secondary/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-secondary/40"
      >
        <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wide text-secondary-dark uppercase">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Icon size={12} />
          </span>
          {label}
        </p>

        <div
          className={`relative overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            expanded ? 'max-h-[32rem]' : 'max-h-[4.5rem]'
          }`}
        >
          <p className="text-primary-dark/85">{text}</p>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-secondary-light to-transparent transition-opacity duration-300 ${
              expanded ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>

        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 inline-flex w-fit items-center gap-2 self-start rounded-full border border-primary/30 px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/5"
        >
          {expanded ? t.readLess : t.readMore}
          <FaChevronDown
            size={10}
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </article>
    </Reveal>
  );
}
