import { FaBriefcase, FaCircleCheck } from 'react-icons/fa6';

interface Props {
  titulo: string;
  items: string[];
}

export default function CampoLaboral({ titulo, items }: Props) {
  return (
    <section className="bg-surface px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide text-secondary uppercase">
          <FaBriefcase /> Oportunidades
        </p>
        <h2 className="mb-6 text-3xl text-primary-dark">{titulo}</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.slice(0, 24)} className="flex items-start gap-2 text-slate-600">
              <FaCircleCheck className="mt-0.5 shrink-0 text-secondary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
