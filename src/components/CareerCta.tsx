import { FaWhatsapp } from 'react-icons/fa6';
import Reveal from './Reveal';
import SectionGlow from './SectionGlow';

interface Props {
  nombre: string;
}

export default function CareerCta({ nombre }: Props) {
  return (
    <section className="relative bg-surface px-6 py-16 text-center">
      <Reveal className="relative mx-auto max-w-6xl">
        <SectionGlow />
        <h2 className="mb-6 text-3xl text-primary-dark">¿Quieres estudiar {nombre}?</h2>
        <a
          href="https://wa.me/59164849322"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-secondary-dark"
        >
          <FaWhatsapp /> Habla con un asesor
        </a>
      </Reveal>
    </section>
  );
}
