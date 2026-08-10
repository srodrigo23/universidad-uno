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
    <section className="relative overflow-hidden px-6 py-24">
      <img src={bgImage.src} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
      {/* En móvil el texto ocupa todo el ancho, así que el velo va parejo. */}
      <div className="absolute inset-0 bg-white/88 md:hidden" />
      {/* En desktop el texto vive en los dos tercios izquierdos: la derecha se abre a la foto. */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage:
            'linear-gradient(100deg, rgb(255 255 255 / 0.92) 0%, rgb(255 255 255 / 0.86) 50%, rgb(255 255 255 / 0.52) 74%, rgb(255 255 255 / 0.18) 100%)',
        }}
      />
      {/* Funde los bordes superior e inferior para que la foto no forme una banda con cortes secos. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, #fff 0%, transparent 20%, transparent 80%, #fff 100%)',
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
