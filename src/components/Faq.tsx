import { useState } from 'react';
import { FaCircleQuestion, FaChevronDown } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'motion/react';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';

const faqs = [
  {
    q: '¿Cuáles son los requisitos de admisión?',
    a: 'Contáctanos por WhatsApp o visita el Edificio Central para conocer los requisitos vigentes de admisión para cada carrera.',
  },
  {
    q: '¿Qué modalidad de estudio ofrecen?',
    a: 'Ofrecemos formación presencial en la Subsede Cochabamba, con un enfoque de Educación Basada en Competencias.',
  },
  {
    q: '¿Cuándo inician las clases?',
    a: 'Las fechas de inicio de gestión se publican en nuestras redes sociales y se informan a través de nuestros asesores de admisión.',
  },
  {
    q: '¿Dónde puedo ver la malla curricular de cada carrera?',
    a: 'Puedes solicitar la malla curricular completa a través de nuestros asesores de admisión por WhatsApp.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-surface px-6 py-16">
      <div className="relative mx-auto max-w-6xl">
        <SectionGlow />
        <Reveal>
          <Eyebrow icon={FaCircleQuestion} label="Preguntas frecuentes" />
          <h2 className="mb-6 text-3xl text-primary-dark">FAQ</h2>
        </Reveal>
        <div className="flex max-w-3xl flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal
                key={item.q}
                delay={i * 0.08}
                className="rounded-xl border border-slate-200 bg-white px-5 py-4"
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
