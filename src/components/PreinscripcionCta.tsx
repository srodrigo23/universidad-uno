import { useState } from 'react';
import { FaPenToSquare, FaArrowRight } from 'react-icons/fa6';
import Reveal from './shared/Reveal';
import CochabambaWatermark from './CochabambaWatermark';
import { track } from '../lib/analytics';
import PreinscripcionModal, {
  type CareerOption,
} from './modals/PreinscripcionModal';

interface Props {
  /** Título de la sección; en las rutas de carrera llega ya interpolado. */
  titulo: string;
  careers: CareerOption[];
  /** Preselecciona la carrera cuando el bloque vive dentro de su ruta. */
  defaultCareer?: string;
  /** Solo la home tiene la sección de pasos, así que el enlace es opcional. */
  stepsHref?: string;
  t: {
    eyebrow: string;
    sectionSubtitle: string;
    verPasos: string;
    cta: string;
    title: string;
    subtitle: string;
    nombres: string;
    apellidos: string;
    celular: string;
    correo: string;
    carrera: string;
    carreraPlaceholder: string;
    prefijo: string;
    submit: string;
    close: string;
    successTitle: string;
    successText: string;
    requerido: string;
    hintLetras: string;
    hintCelular: string;
    hintCorreo: string;
  };
}

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function PreinscripcionCta({
  titulo,
  careers,
  defaultCareer,
  stepsHref,
  t,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section id='preinscripcion' className='px-6 py-20'>
      {/* El modal se queda FUERA del Reveal a propósito: es position:fixed y sin
          portal, así que un ancestro con transform lo anclaría al panel. */}
      <Reveal className='mx-auto max-w-6xl'>
        <div className='relative overflow-hidden rounded-3xl bg-primary-dark px-6 py-16 text-center text-white sm:px-12 sm:py-20'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage:
                'linear-gradient(115deg, color-mix(in srgb, var(--color-primary) 55%, transparent) 0%, transparent 55%, color-mix(in srgb, var(--color-secondary) 22%, transparent) 100%)',
            }}
          />
          <div
            aria-hidden='true'
            className='absolute inset-0 opacity-[0.15] mix-blend-overlay'
            style={{ backgroundImage: NOISE }}
          />
          <CochabambaWatermark className='absolute -right-20 -bottom-1/3 h-[170%] text-white opacity-[0.06]' />
          <div
            aria-hidden='true'
            className='pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-secondary/30 blur-3xl'
          />

          <div className='relative mx-auto max-w-2xl'>
            <p className='mb-3 text-xs font-bold tracking-[0.18em] text-secondary-light uppercase'>
              {t.eyebrow}
            </p>
            <h2 className='text-3xl text-balance text-white sm:text-4xl lg:text-5xl'>
              {titulo}
            </h2>
            <p className='mx-auto mt-4 max-w-xl text-white/80'>
              {t.sectionSubtitle}
            </p>

            <button
              type='button'
              onClick={() => {
                track('preinscripcion_abrir', {
                  origen: defaultCareer ?? 'home',
                });
                setOpen(true);
              }}
              className='group relative mt-9 inline-flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-full bg-secondary px-9 py-4 text-base font-semibold text-white shadow-xl shadow-secondary/40 ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:bg-secondary-dark hover:shadow-2xl hover:shadow-secondary/50'
            >
              {/* Destello diagonal al pasar el cursor: solo transform, sin repintar. */}
              <span
                aria-hidden='true'
                className='absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%]'
              />
              <FaPenToSquare size={16} className='relative shrink-0' />
              <span className='relative'>{t.cta}</span>
            </button>

            {stepsHref && (
              <p className='mt-5'>
                <a
                  href={stepsHref}
                  className='group inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors hover:text-secondary-light'
                >
                  {t.verPasos}
                  <FaArrowRight
                    size={11}
                    className='transition-transform group-hover:translate-x-0.5'
                  />
                </a>
              </p>
            )}
          </div>
        </div>
      </Reveal>

      <PreinscripcionModal
        open={open}
        onClose={() => setOpen(false)}
        careers={careers}
        defaultCareer={defaultCareer}
        t={t}
      />
    </section>
  );
}
