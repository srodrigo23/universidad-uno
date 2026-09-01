import { useState } from 'react';
import { FaPenToSquare } from 'react-icons/fa6';
// import Reveal from './shared/Reveal';
import SectionGlow from './SectionGlow';
import PreinscripcionModal, {
  type CareerOption,
} from './modals/PreinscripcionModal';

interface Props {
  /** Título de la sección; en las rutas de carrera llega ya interpolado. */
  titulo: string;
  careers: CareerOption[];
  /** Preselecciona la carrera cuando el bloque vive dentro de su ruta. */
  defaultCareer?: string;
  t: {
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

export default function PreinscripcionCta({
  titulo,
  careers,
  defaultCareer,
  t,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section id='preinscripcion' className='relative px-6 py-16 text-center'>
      {/* <Reveal className="relative mx-auto max-w-6xl"> */}
      <div className='relative mx-auto max-w-6xl'>
        <SectionGlow />
        <h2 className='mb-6 text-3xl text-primary-dark'>{titulo}</h2>
        <button
          type='button'
          onClick={() => setOpen(true)}
          // onClick={() => console.log('gg')}
          className='inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-secondary/30 transition hover:-translate-y-px hover:bg-secondary-dark cursor-pointer'
        >
          <FaPenToSquare size={14} /> {t.cta}
        </button>
        {/* </Reveal> */}
      </div>

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
