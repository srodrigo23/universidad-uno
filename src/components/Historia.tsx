import { FaLandmark } from 'react-icons/fa6';
import Reveal from './Reveal';

const parrafos = [
  'La Universidad Nacional del Oriente, fundada en el año 1999 e iniciando actividades académicas en la gestión 2000 en la ciudad de Santa Cruz de la Sierra, nace con el firme propósito de contribuir a la formación de profesionales íntegros y comprometidos con el desarrollo del país. Desde sus inicios, respaldada por la Resolución Ministerial Nº 203/99 emitida el 22 de junio de 1999 por el Ministerio de Educación, la institución fue ampliando progresivamente su cobertura académica y territorial, consolidando su presencia en diferentes regiones de Bolivia.',
  'En el marco de este crecimiento sostenido y respondiendo a las demandas educativas del eje central del país, se crea la Sub sede Cochabamba como la sede más reciente de la Universidad Nacional del Oriente, autorizada legalmente mediante la Resolución Ministerial Nº 0164/2023. Esta resolución respalda su funcionamiento y consolida su compromiso con la excelencia académica y la expansión institucional.',
  'La Sub sede Cochabamba inicia sus actividades con una propuesta académica orientada a las necesidades del contexto regional, ofreciendo programas a nivel Licenciatura en áreas estratégicas como Ciencias de la Salud, Ciencias Empresariales y otras disciplinas que responden a la realidad profesional actual. Entre sus principales carreras se encuentran Enfermería, Fisioterapia y Kinesiología, Medicina, Derecho y Administración y Dirección de Empresas que fortalecen el perfil profesional de los estudiantes.',
  'Desde Cochabamba, la Universidad Nacional del Oriente reafirma su compromiso con la formación científica, ética y humanista, promoviendo una educación de calidad, el uso de herramientas tecnológicas actualizadas y la vinculación con la sociedad. Autoridades, docentes y personal administrativo trabajan de manera articulada para consolidar una comunidad académica dinámica, inclusiva y comprometida con el desarrollo regional y nacional.',
  'La creación de la Sub sede Cochabamba representa no solo la expansión territorial de la Universidad, sino también la consolidación de una visión institucional orientada al crecimiento sostenible, la innovación académica y la contribución activa al progreso de nuestra querida Bolivia.',
];

export default function Historia() {
  return (
    <section id="historia" className="bg-surface px-6 py-16">
      <Reveal className="mx-auto max-w-6xl">
        <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide text-secondary uppercase">
          <FaLandmark /> Nuestra historia
        </p>
        <h2 className="mb-6 text-3xl text-primary-dark">Reseña histórica</h2>
        <div className="max-w-3xl space-y-4">
          {parrafos.map((p) => (
            <p key={p.slice(0, 24)} className="text-slate-600">
              {p}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
