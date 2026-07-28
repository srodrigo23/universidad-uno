import { motion } from 'motion/react';
import { FaArrowRight } from 'react-icons/fa6';

interface Props {
  href: string;
  nombre: string;
  resumen: string;
  badge: string;
  cta: string;
  index?: number;
}

export default function CareerCard({ href, nombre, resumen, badge, cta, index = 0 }: Props) {
  const excerpt = resumen.length > 160 ? `${resumen.slice(0, 160).trimEnd()}…` : resumen;

  return (
    <motion.a
      href={href}
      className="flex flex-col gap-2 rounded-2xl border border-t-4 border-slate-200 border-t-secondary bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-xs font-bold tracking-wide text-secondary uppercase">{badge}</span>
      <h3 className="text-lg text-primary-dark">{nombre}</h3>
      <p className="text-sm text-slate-600">{excerpt}</p>
      <span className="mt-auto flex items-center gap-1.5 pt-2 font-bold text-primary">
        {cta} <FaArrowRight size={12} />
      </span>
    </motion.a>
  );
}
