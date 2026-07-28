import { useEffect, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { AnimatePresence, motion } from 'motion/react';

export default function InscripcionesModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inscripciones-modal-title"
        >
          <motion.div
            className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-4 right-4 rounded-md p-1 text-slate-400 hover:text-primary"
              aria-label="Cerrar"
              onClick={() => setOpen(false)}
            >
              <HiX size={22} />
            </button>

            <p className="text-sm font-semibold tracking-wide text-secondary uppercase">Admisión 2026</p>
            <h2
              id="inscripciones-modal-title"
              className="mt-2 text-3xl font-black text-primary sm:text-4xl"
            >
              Inscripciones abiertas
            </h2>
            <p className="mt-4 text-sm font-normal text-slate-600">
              Asegura tu cupo en Enfermería, Medicina, Fisioterapia y Kinesiología, Derecho o Administración de
              Empresas.
            </p>

            <a
              href="/#carreras"
              className="mt-6 inline-block rounded-md bg-secondary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary-dark"
              onClick={() => setOpen(false)}
            >
              Ver carreras
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
