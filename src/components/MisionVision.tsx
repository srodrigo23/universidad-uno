import { FaBullseye, FaEye } from 'react-icons/fa6';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';

export default function MisionVision() {
  return (
    <section id="mision-vision" className="px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        <Reveal className="rounded-2xl border border-t-4 border-slate-200 border-t-secondary bg-white p-7 shadow-sm">
          <Eyebrow icon={FaBullseye} label="Misión" />
          <p className="text-slate-600">
            Formar profesionales competentes, éticos, líderes con emprendedurismo en base a la diversidad
            cultural, la ciencia y la tecnología para contribuir al desarrollo de la sociedad.
          </p>
        </Reveal>
        <Reveal
          delay={0.12}
          className="rounded-2xl border border-t-4 border-slate-200 border-t-secondary bg-white p-7 shadow-sm"
        >
          <Eyebrow icon={FaEye} label="Visión" />
          <p className="text-slate-600">
            Ser líderes en educación superior, acreditados y reconocidos internacionalmente con la formación de
            profesionales de alta calidad, con responsabilidad social y bases sólidas en la investigación e
            innovación.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
