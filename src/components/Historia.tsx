import { useState } from 'react';
import { FaLandmark, FaChevronDown } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'motion/react';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';

import bgImage from '../assets/images/estudiantes/estudiantes-mochila-modelo.webp';

interface Props {
  t: {
    eyebrow: string;
    title: string;
    readMore: string;
    readLess: string;
    paragraphs: string[];
  };
}

export default function Historia({ t }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [firstParagraph, ...restParagraphs] = t.paragraphs;

  return (
    <section className="relative overflow-hidden bg-surface px-6 py-16">
      <img src={bgImage.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(100deg, color-mix(in srgb, var(--color-surface) 97%, transparent) 0%, color-mix(in srgb, var(--color-surface) 94%, transparent) 55%, color-mix(in srgb, var(--color-surface) 72%, transparent) 100%)',
        }}
      />
      <Reveal className="relative mx-auto max-w-6xl">
        <SectionGlow />
        <Eyebrow icon={FaLandmark} label={t.eyebrow} />
        <h2 className="mb-6 text-3xl text-primary-dark">{t.title}</h2>
        <div className="max-w-3xl">
          <p className="text-slate-600">{firstParagraph}</p>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="rest"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4">
                  {restParagraphs.map((p) => (
                    <p key={p.slice(0, 24)} className="text-slate-600">
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-secondary/40 px-4 py-2 text-sm font-semibold text-secondary transition-colors hover:border-secondary hover:bg-secondary/10"
          >
            {expanded ? t.readLess : t.readMore}
            <FaChevronDown className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
