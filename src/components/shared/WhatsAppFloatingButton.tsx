import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { BO, BR } from 'country-flag-icons/react/3x2';
import { AnimatePresence, motion } from 'motion/react';
import { track } from '../../lib/analytics';

interface Props {
  t: {
    message: string;
    advisorBolivia: string;
    advisorBrasil: string;
    openLabel: string;
    closeLabel: string;
  };
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function WhatsAppFloatingButton({ t }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const message = encodeURIComponent(t.message);
  const advisors = [
    { country: 'Bolivia', Flag: BO, label: t.advisorBolivia, href: `https://wa.me/59164849322?text=${message}` },
    { country: 'Brasil', Flag: BR, label: t.advisorBrasil, href: `https://wa.me/59164847741?text=${message}` },
  ];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] z-50 flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            className="flex flex-col items-end gap-3"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {advisors.map(({ country, Flag, label, href }) => (
              <motion.a
                key={country}
                href={href}
                target="_blank"
                rel="noopener"
                onClick={() => {
                  track('whatsapp_click', { asesor: country });
                  setOpen(false);
                }}
                variants={itemVariants}
                className="flex items-center gap-2 rounded-full bg-white py-2 pr-4 pl-3 text-sm font-semibold text-primary shadow-lg transition-transform hover:scale-105"
              >
                <Flag title={country} className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover" />
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? t.closeLabel : t.openLabel}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-75"></span>}
        <span className="relative z-10 animate-bounce-gentle">
          <FaWhatsapp size={28} />
        </span>
      </button>
    </div>
  );
}
