import { useEffect, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { AnimatePresence, motion } from 'motion/react';

import modalEsp from '../../assets/images/inscripcion/modal-esp.webp';
import modalPort from '../../assets/images/inscripcion/modal-port.webp';

type Locale = 'es' | 'pt';

const banners: Record<Locale, ImageMetadata> = { es: modalEsp, pt: modalPort };

const CLAVE_VISTO = 'uno:modal-inscripciones-visto';
const INTERVALO_MS = 60 * 60 * 1000; // 1 hora

/**
 * localStorage lanza en modo privado y con el almacenamiento bloqueado, así que
 * todo acceso va protegido: no poder recordar la visita degrada a "mostrar el
 * modal", nunca a romper la página.
 */
function leerUltimaVez() {
  try {
    const valor = Number(localStorage.getItem(CLAVE_VISTO));
    return Number.isFinite(valor) && valor > 0 ? valor : 0;
  } catch {
    return 0;
  }
}

function marcarVisto() {
  try {
    localStorage.setItem(CLAVE_VISTO, String(Date.now()));
  } catch {
    // Sin persistencia el modal reaparecerá en la próxima visita. Es aceptable.
  }
}

interface Props {
  locale: Locale;
  homeHref: string;
  t: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
    close: string;
  };
}

export default function InscripcionesModal({ locale, homeHref, t }: Props) {
  const [open, setOpen] = useState(false);
  const banner = banners[locale];

  useEffect(() => {
    const ultimaVez = leerUltimaVez();
    const transcurrido = Date.now() - ultimaVez;

    // `transcurrido < 0` significa marca en el futuro: pasa si el reloj del
    // equipo iba adelantado y luego se corrigió. Sin este caso, esa marca
    // bloquearía el modal hasta que el reloj la alcanzase.
    const dentroDeLaHora =
      ultimaVez > 0 && transcurrido >= 0 && transcurrido < INTERVALO_MS;

    if (dentroDeLaHora) return;

    const timer = setTimeout(() => {
      setOpen(true);
      // Se marca al mostrarlo, no al cerrarlo: si el usuario se va sin cerrar,
      // el modal ya le apareció y no debe repetirse.
      marcarVisto();
    }, 500);

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
          aria-label={t.title}
        >
          <motion.div
            className="relative w-full max-w-3xl"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-3 -right-3 z-10 rounded-full bg-white p-2 text-primary shadow-lg transition-colors hover:bg-slate-100"
              aria-label={t.close}
              onClick={() => setOpen(false)}
            >
              <HiX size={20} />
            </button>

            {/* El banner ya trae el botón "Ver cursos" dibujado: toda la pieza es el enlace. */}
            <a href={`${homeHref}#carreras`} onClick={() => setOpen(false)} className="block">
              <img
                src={banner.src}
                width={banner.width}
                height={banner.height}
                alt={`${t.eyebrow}. ${t.title}. ${t.text}`}
                className="w-full rounded-2xl shadow-2xl"
              />
            </a>

            {/* Contenido anterior del modal, reemplazado por el banner por idioma:

            <div className="rounded-2xl bg-white p-8 text-center shadow-2xl">
              <p className="text-sm font-semibold tracking-wide text-secondary uppercase">{t.eyebrow}</p>
              <h2 id="inscripciones-modal-title" className="mt-2 text-3xl font-black text-primary sm:text-4xl">
                {t.title}
              </h2>
              <p className="mt-4 text-sm font-normal text-slate-600">{t.text}</p>

              <a
                href={`${homeHref}#carreras`}
                className="mt-6 inline-block rounded-md bg-secondary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary-dark"
                onClick={() => setOpen(false)}
              >
                {t.cta}
              </a>
            </div>

            */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
