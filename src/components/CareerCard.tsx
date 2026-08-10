import { motion } from 'motion/react';
import { FaArrowRight } from 'react-icons/fa6';

interface Props {
  href: string;
  nombre: string;
  image: ImageMetadata;
  badge: string;
  cta: string;
  index?: number;
}

export default function CareerCard({ href, nombre, image, badge, cta, index = 0 }: Props) {
  return (
    <motion.a
      href={href}
      className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <img
        src={image.src}
        alt={nombre}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-primary-dark/15" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to top, var(--color-primary-dark) 0%, color-mix(in srgb, var(--color-primary-dark) 88%, transparent) 32%, color-mix(in srgb, var(--color-primary-dark) 15%, transparent) 65%, transparent 100%)',
        }}
      />
      <div className="relative flex flex-col gap-1 p-6">
        <span className="text-xs font-bold tracking-wide text-secondary-light uppercase">{badge}</span>
        <h3 className="text-xl text-white">{nombre}</h3>
        <span className="mt-2 flex items-center gap-1.5 text-sm font-bold text-white transition-colors group-hover:text-secondary-light">
          {cta} <FaArrowRight size={12} />
        </span>
      </div>
    </motion.a>
  );
}
