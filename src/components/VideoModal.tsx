import { useEffect, useRef } from 'react';
import { HiX } from 'react-icons/hi';
import { AnimatePresence, motion } from 'motion/react';
import type { CareerVideo } from '../data/careers';

interface Props {
  open: boolean;
  nombre: string;
  video: CareerVideo | null;
  onClose: () => void;
  t: {
    close: string;
  };
}

export default function VideoModal({ open, nombre, video, onClose, t }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    // Devolvemos el foco al disparador; guardamos la referencia antes de moverlo.
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && video && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={nombre}
        >
          <motion.div
            className="relative w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              ref={closeRef}
              onClick={onClose}
              aria-label={t.close}
              className="absolute -top-12 right-0 inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <HiX size={24} />
            </button>

            {/* Montado sólo cuando open: ocultarlo por CSS dejaría la descarga viva. */}
            <video
              key={video.src}
              src={video.src}
              poster={video.poster}
              preload="none"
              controls
              autoPlay
              playsInline
              className="max-h-[80vh] w-full rounded-2xl bg-black shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
