import { useState } from 'react';
import { FaCircleQuestion, FaChevronDown } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'motion/react';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';

interface Props {
  t: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
}

export default function Faq({ t }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 py-16">
      <div className="relative mx-auto max-w-6xl">
        <SectionGlow />
        <Reveal>
          <Eyebrow icon={FaCircleQuestion} label={t.eyebrow} />
          <h2 className="mb-6 text-3xl text-primary-dark">{t.title}</h2>
        </Reveal>
        <div className="flex max-w-3xl flex-col gap-3">
          {t.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal
                key={item.q}
                delay={i * 0.08}
                className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left font-semibold text-primary-dark"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {item.q}
                  <FaChevronDown className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm text-slate-600">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
