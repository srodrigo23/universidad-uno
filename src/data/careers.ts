export type Valor = string | { titulo: string; descripcion: string };
export type CompetenciaGrupo = { titulo: string; items: string[] };

export interface Career {
  slug: string;
  nombre: string;
  resumen: string;
  mision: string;
  vision: string;
  campoLaboralTitulo: string;
  campoLaboral: string[];
  competencias?: CompetenciaGrupo[];
  valores: Valor[];
}

export const careers: Career[] = [
  {
    slug: 'enfermeria',
    nombre: 'Enfermería',
    resumen:
      'La Carrera de Enfermería forma profesionales competentes con sólida base científica, técnica y humanística, capaces de brindar cuidado integral a la persona, familia y comunidad en los diferentes niveles de atención. Desarrolla competencias en promoción, prevención, recuperación y rehabilitación de la salud, integrando investigación aplicada e innovación en servicios sanitarios. Asimismo, fortalece capacidades emprendedoras orientadas a la creación y gestión de servicios de salud sostenibles con impacto social.',
    mision:
      'Formar Licenciadas y Licenciados en Enfermería con competencias científicas, técnicas, éticas y humanísticas, capaces de brindar atención integral de calidad a la persona, la familia y la comunidad, desarrollar investigación aplicada y promover iniciativas innovadoras en servicios de salud, contribuyendo al fortalecimiento del sistema sanitario y al desarrollo social.',
    vision:
      'Constituirse en una Carrera referente en la formación por competencias en Enfermería, reconocida por su excelencia académica, innovación en el cuidado, investigación aplicada y por la formación de profesionales emprendedores capaces de diseñar, gestionar y liderar servicios de salud sostenibles, con impacto social a nivel departamental y nacional.',
    campoLaboralTitulo: 'Campo laboral',
    campoLaboral: [
      'Atención integral en hospitales de segundo y tercer nivel del sector público y privado.',
      'Atención en centros de salud del primer nivel con enfoque preventivo y comunitario.',
      'Docencia universitaria y técnica, así como capacitación y formación de personal en salud.',
      'Investigación en salud mediante el desarrollo de estudios científicos y proyectos aplicados.',
      'Administración y gestión de servicios sanitarios, incluyendo jefatura de enfermería y gestión de recursos humanos.',
      'Salud ocupacional en empresas e industrias públicas y privadas.',
      'Diseño y gestión de servicios especializados en atención geriátrica.',
      'Establecimiento y administración de consultorio de enfermería integral.',
      'Gestión de servicios prehospitalarios y traslado sanitario, conforme a normativa vigente.',
      'Asesoría y consultoría en gestión del cuidado, bioseguridad y calidad en servicios de salud.',
    ],
    valores: [
      'Humanismo',
      'Ética profesional',
      'Vocación de servicio',
      'Responsabilidad social',
      'Respeto a la dignidad humana',
      'Empatía',
      'Solidaridad',
      'Trabajo en equipo',
      'Liderazgo',
      'Compromiso con la calidad',
    ],
  },
  {
    slug: 'medicina',
    nombre: 'Medicina',
    resumen:
      'La Carrera de Medicina de la Universidad Privada UNO – Subsede Cochabamba forma médicos integrales con sólida base científica, ética y humanista, capaces de realizar anamnesis, diagnóstico, tratamiento y prevención con enfoque social para el país. Inspirada en modelos académicos de excelencia, integra docencia, investigación y práctica clínica, promoviendo liderazgo, compromiso comunitario y mejora continua. Medicina UNO: “vocación que salva vidas y deja huella”.',
    mision:
      'Formar médicos cirujanos íntegros, con excelencia científica, ética y compromiso social, capaces de responder a las necesidades de salud con enfoque humanista, pensamiento crítico y vocación de servicio, promoviendo investigación y mejora continua.',
    vision:
      'Ser una Carrera de Medicina referente en la región, reconocida por su calidad académica y por formar profesionales líderes, comprometidos con la salud comunitaria, la innovación y la transformación social.',
    campoLaboralTitulo: 'Campo laboral',
    campoLaboral: [
      'Atención médica integral en redes públicas y privadas de salud.',
      'Atención clínica y quirúrgica con excelencia ética y científica.',
      'Servicio comunitario enfocado en prevención y promoción de la salud.',
      'Investigación médica orientada a transformar realidades sanitarias.',
      'Docencia universitaria y formación de nuevas generaciones.',
      'Gestión estratégica en instituciones y sistemas de salud.',
      'Innovación y tecnología aplicada al diagnóstico y tratamiento.',
      'Desarrollo clínico y farmacovigilancia en industria farmacéutica.',
      'Especialización médica y formación continua avanzada.',
      'Consultoría y asesoramiento técnico en políticas sanitarias.',
    ],
    valores: [
      {
        titulo: 'Centralidad en la persona',
        descripcion:
          'La formación médica se orienta al respeto irrestricto por la vida, la dignidad y la integridad del ser humano en todas sus dimensiones.',
      },
      {
        titulo: 'Ética y deontología médica',
        descripcion:
          'Actuación profesional basada en principios morales, responsabilidad legal y compromiso con la confidencialidad y la justicia sanitaria.',
      },
      {
        titulo: 'Vocación de servicio',
        descripcion: 'Disposición permanente al cuidado del paciente y a la atención solidaria de las necesidades de la comunidad.',
      },
      {
        titulo: 'Responsabilidad social y compromiso comunitario',
        descripcion: 'Participación activa en la promoción, prevención y mejora de la salud colectiva.',
      },
      {
        titulo: 'Excelencia científica',
        descripcion: 'Búsqueda constante de actualización, rigurosidad académica y práctica sustentada en evidencia.',
      },
      {
        titulo: 'Investigación e innovación',
        descripcion: 'Desarrollo del pensamiento científico como herramienta para transformar realidades sanitarias.',
      },
      {
        titulo: 'Liderazgo colaborativo',
        descripcion: 'Trabajo interdisciplinario orientado a resultados, con capacidad de conducción ética y técnica.',
      },
      {
        titulo: 'Humanismo médico',
        descripcion: 'Empatía, sensibilidad y comprensión integral del paciente en su contexto biológico, psicológico y social.',
      },
      {
        titulo: 'Mejora continua',
        descripcion: 'Evaluación permanente del desempeño profesional y apertura al aprendizaje a lo largo de la vida.',
      },
      {
        titulo: 'Compromiso institucional',
        descripcion:
          'Identificación con los principios y la misión de la Universidad Privada UNO, proyectando calidad y prestigio académico.',
      },
    ],
  },
  {
    slug: 'fisioterapia-kinesiologia',
    nombre: 'Fisioterapia y Kinesiología',
    resumen:
      'La Carrera de Fisioterapia y Kinesiología de la Universidad UNO forma parte integral de nuestra Facultad de Ciencias de la Salud y se imparte bajo el innovador modelo de Educación Basada en Competencias (EBC). Este enfoque pedagógico garantiza que nuestros estudiantes no solo adquieran conocimientos teóricos de vanguardia, sino que desarrollen las habilidades, destrezas y actitudes necesarias para resolver con éxito los problemas reales de la sociedad en el ámbito de la salud y el movimiento corporal humano. Nuestro programa está diseñado para responder a las demandas de un entorno globalizado y cambiante, formando profesionales éticos, humanistas y con un profundo compromiso social.',
    mision:
      'La Carrera de Fisioterapia y Kinesiología tiene como misión formar profesionales íntegros y socialmente comprometidos, con una sólida base científica, técnica y humanística. A través de un enfoque en el estudio del Movimiento Corporal Humano, buscamos desarrollar competencias para la promoción de la salud, la prevención, el diagnóstico fisioterapéutico, la recuperación y la rehabilitación integral de las personas y las comunidades. Nos comprometemos a generar ambientes de aprendizaje interdisciplinarios e innovadores, que fomenten la investigación aplicada y la vinculación con el entorno.',
    vision:
      'Ser un programa de excelencia reconocido nacional e internacionalmente por su liderazgo en la formación de fisioterapeutas kinesiólogos con un profundo sentido humano y una alta calidad académica y científica. Seremos un referente en la generación y transferencia de conocimiento a través de la investigación innovadora en el área del Movimiento Corporal Humano, respondiendo de manera prioritaria a las necesidades de nuestra zona de influencia y del país.',
    campoLaboralTitulo: 'Campo ocupacional',
    campoLaboral: [
      'Instituciones de salud (hospitales, clínicas, centros de rehabilitación).',
      'Atención primaria y programas comunitarios de salud.',
      'Consultoría privada.',
      'Clubes deportivos y centros de acondicionamiento físico.',
      'Instituciones educativas y de investigación.',
      'Docencia universitaria y gestión de servicios de salud.',
    ],
    competencias: [
      {
        titulo: 'Clínica asistencial',
        items: [
          'Evaluar, diagnosticar e intervenir en las alteraciones del movimiento corporal humano en las distintas etapas de la vida.',
          'Aplicar agentes físicos y técnicas kinésicas con criterio científico, para la recuperación, habilitación y rehabilitación de la persona, mejorando su funcionalidad y calidad de vida.',
        ],
      },
      {
        titulo: 'Promoción y prevención',
        items: [
          'Diseñar y ejecutar programas de promoción de la salud y prevención de la enfermedad, orientados al mantenimiento y optimización del movimiento corporal humano en individuos y colectivos.',
          'Actuar como agente educativo en salud, fomentando estilos de vida saludables y el autocuidado en la comunidad.',
        ],
      },
      {
        titulo: 'Investigativa',
        items: [
          'Generar y aplicar conocimientos científicos a través de la investigación formativa y aplicada, contribuyendo al desarrollo de la disciplina.',
          'Participar activamente en grupos y proyectos de investigación que aborden el movimiento corporal humano desde perspectivas integradoras.',
        ],
      },
      {
        titulo: 'Gestión y liderazgo',
        items: [
          'Gestionar y administrar servicios de fisioterapia y kinesiología con calidad, eficiencia y calidez.',
          'Ejercer un liderazgo transformador en equipos interdisciplinarios, tomando decisiones fundamentadas para contribuir al bienestar colectivo.',
        ],
      },
      {
        titulo: 'Ético-humanística',
        items: [
          'Desempeñar su profesión con honestidad, responsabilidad y sentido humano, respetando la diversidad y la dignidad de las personas.',
          'Actuar con coherencia entre el pensamiento, la palabra y la acción, bajo principios que promuevan la justicia, la paz y el cuidado del medio ambiente.',
        ],
      },
    ],
    valores: [
      {
        titulo: 'Ética y honestidad',
        descripcion:
          'Actuamos con rectitud, transparencia y probidad en todos nuestros ámbitos, respetando la propiedad intelectual y anteponiendo el bienestar de las personas y la sociedad.',
      },
      {
        titulo: 'Sentido humano y social',
        descripcion:
          'Reconocemos la dignidad de la persona como centro de nuestra labor, con firme compromiso con la justicia social y la equidad.',
      },
      {
        titulo: 'Responsabilidad y compromiso con la excelencia',
        descripcion:
          'Nos formamos y actualizamos continuamente para alcanzar los más altos estándares de calidad en la docencia, la investigación y la atención.',
      },
      {
        titulo: 'Liderazgo e innovación',
        descripcion:
          'Promovemos un liderazgo transformador con capacidad de trabajo interdisciplinario y búsqueda de soluciones innovadoras.',
      },
      {
        titulo: 'Respeto por la vida y el medio ambiente',
        descripcion:
          'Nos comprometemos con la sostenibilidad ambiental, entendiendo la salud humana como inherentemente ligada a la salud del planeta.',
      },
    ],
  },
  {
    slug: 'derecho',
    nombre: 'Derecho',
    resumen:
      'La Carrera de Derecho de la Universidad Nacional del Oriente Cochabamba forma profesionales con sólida preparación jurídica, ética y humanista. Promueve el estudio integral del ordenamiento jurídico boliviano, la investigación científica y la práctica forense, fortaleciendo competencias en litigación, asesoría legal y resolución de conflictos. Su enfoque está orientado al servicio a la sociedad, la justicia y el respeto a los derechos fundamentales.',
    mision:
      'La Carrera de Derecho tiene como misión formar profesionales íntegros, críticos y comprometidos con la justicia, mediante una sólida formación jurídica, científica y humanista. Promueve la investigación, la práctica forense y el enfoque por competencias, contribuyendo al fortalecimiento del Estado de Derecho y al servicio responsable a la sociedad.',
    vision:
      'Ser una Carrera de Derecho líder a nivel regional y nacional, reconocida por la excelencia académica, la calidad en la formación jurídica y la producción investigativa, formando profesionales éticos y competentes que aporten a la transformación social y al desarrollo jurídico del país.',
    campoLaboralTitulo: 'Campo laboral',
    campoLaboral: [
      'Ejercicio libre de la abogacía en materia civil, penal, agrario y laboral.',
      'Asesoría jurídica en empresas públicas y privadas.',
      'Función pública en ministerios, alcaldías y gobernaciones.',
      'Carrera judicial como juez, secretario o auxiliar.',
      'Ministerio Público como fiscal o asistente legal.',
      'Defensa pública y patrocinio en casos sociales.',
      'Consultoría en derecho tributario y financiero.',
      'Docencia universitaria e investigación jurídica.',
      'Organismos internacionales y defensa de DD.HH.',
      'Notariado y funciones en registros públicos.',
    ],
    valores: [
      'Ética profesional y probidad.',
      'Vocación de servicio y solidaridad.',
      'Respeto por la dignidad humana.',
      'Compromiso con la justicia y la verdad.',
      'Responsabilidad social y comunitaria.',
      'Pensamiento crítico y rigor científico.',
      'Honestidad y transparencia.',
      'Liderazgo y trabajo en equipo.',
      'Defensa de los derechos fundamentales.',
      'Respeto al Estado de Derecho.',
    ],
  },
  {
    slug: 'administracion-empresas',
    nombre: 'Administración y Dirección de Empresas',
    resumen:
      'La Carrera de Administración y Dirección de Empresas forma profesionales con sólida preparación científica, técnica y humanística, capaces de gestionar y dirigir organizaciones públicas y privadas con eficiencia y visión estratégica. La formación integra conocimientos en finanzas, marketing, gestión del talento humano, operaciones y planificación estratégica, articulando teoría y práctica para una adecuada toma de decisiones gerenciales.',
    mision:
      'La Carrera de Administración y Dirección de Empresas de la Universidad Nacional del Oriente tiene como misión formar profesionales líderes, éticos y emprendedores, con sólida preparación científica, técnica y humanística, capaces de planificar, organizar, dirigir y controlar organizaciones públicas y privadas, contribuyendo al desarrollo sostenible de la región y del país.',
    vision:
      'Ser una carrera referente a nivel regional y nacional en la formación de profesionales en Administración y Dirección de Empresas, reconocida por su excelencia académica, enfoque por competencias, vinculación con el sector productivo y compromiso con el desarrollo económico y social.',
    campoLaboralTitulo: 'Campo laboral',
    campoLaboral: [
      'Dirección y gestión estratégica en empresas públicas y privadas.',
      'Administración financiera y control de recursos organizacionales.',
      'Gestión del talento humano y liderazgo de equipos de trabajo.',
      'Planificación y ejecución de proyectos empresariales sostenibles.',
      'Creación y desarrollo de emprendimientos innovadores.',
      'Consultoría y asesoramiento en gestión y estrategia empresarial.',
      'Dirección comercial, marketing y posicionamiento competitivo.',
      'Administración en entidades estatales y organismos públicos.',
      'Gestión de operaciones, logística y mejora de procesos.',
      'Docencia e investigación en el ámbito de la gestión empresarial.',
    ],
    valores: [
      'Ética profesional en la gestión y toma de decisiones empresariales.',
      'Responsabilidad social y compromiso con el desarrollo sostenible.',
      'Liderazgo participativo orientado a resultados y trabajo en equipo.',
      'Transparencia y honestidad en la administración organizacional.',
      'Innovación y creatividad en la solución de problemas empresariales.',
      'Compromiso con la excelencia académica y mejora continua.',
      'Respeto por la dignidad humana y la diversidad organizacional.',
      'Espíritu emprendedor con visión estratégica y competitiva.',
      'Disciplina y responsabilidad en el ejercicio profesional.',
    ],
  },
];
