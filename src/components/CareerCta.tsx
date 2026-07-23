import { FaWhatsapp } from 'react-icons/fa6';

interface Props {
  nombre: string;
}

export default function CareerCta({ nombre }: Props) {
  return (
    <section className="bg-surface px-6 py-16 text-center">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-3xl text-primary-dark">¿Quieres estudiar {nombre}?</h2>
        <a
          href="https://wa.me/59164849322"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-primary-dark"
        >
          <FaWhatsapp /> Habla con un asesor
        </a>
      </div>
    </section>
  );
}
