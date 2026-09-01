import { useState } from 'react';
import { FaCircleQuestion, FaChevronDown, FaArrowRight } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'motion/react';
import Reveal from './shared/Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';

interface Props {
  /** En la home mostramos un extracto; la lista completa vive en sobre-nosotros. */
  limit?: number;
  seeAllHref?: string;
  t: {
    eyebrow: string;
    title: string;
    seeAll: string;
    items: { q: string; a: string }[];
  };
}

export default function Faq({ limit, seeAllHref, t }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = limit ? t.items.slice(0, limit) : t.items;

  return (
    <section id='faq' className='px-6 py-16'>
      <div className='relative mx-auto max-w-6xl'>
        <SectionGlow />
        <Reveal>
          <Eyebrow icon={FaCircleQuestion} label={t.eyebrow} />
          <h2 className='mb-6 text-3xl text-primary-dark'>{t.title}</h2>
        </Reveal>
        <div className='flex max-w-3xl flex-col gap-3'>
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal
                key={item.q}
                delay={i * 0.08}
                className='rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm'
              >
                <button
                  type='button'
                  className='flex w-full items-center justify-between gap-4 text-left font-semibold text-primary-dark'
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {item.q}
                  <FaChevronDown
                    className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key='answer'
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className='overflow-hidden'
                    >
                      <p className='mt-3 text-sm text-slate-600'>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
          {seeAllHref && items.length < t.items.length && (
            <Reveal delay={items.length * 0.08}>
              <a
                href={seeAllHref}
                className='inline-flex items-center gap-2 text-sm font-bold text-secondary transition-colors hover:text-secondary-dark'
              >
                {t.seeAll} <FaArrowRight size={12} />
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
