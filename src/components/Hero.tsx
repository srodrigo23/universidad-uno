import { FaWhatsapp, FaChevronDown } from 'react-icons/fa6';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-dark px-6 py-20 text-white">
      <Reveal className="mx-auto max-w-6xl">
        <p className="mb-2 text-xs font-bold tracking-widest text-secondary-light uppercase">Subsede Cochabamba</p>
        <h1 className="max-w-3xl text-4xl font-extrabold text-white sm:text-5xl">
          Formamos profesionales que transforman Bolivia
        </h1>
        <p className="mt-4 max-w-xl text-lg font-light text-white/85">
          Ciencia, ética y liderazgo con emprendedurismo, en base a la diversidad cultural, para contribuir al
          desarrollo de la sociedad.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://wa.me/59164849322"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-primary-dark transition hover:-translate-y-px hover:bg-secondary-light"
          >
            <FaWhatsapp /> Solicitar información
          </a>
          <a
            href="#carreras"
            className="inline-flex items-center gap-2 rounded-full border-2 border-secondary-light px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary-light hover:text-primary-dark"
          >
            Ver carreras <FaChevronDown />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
