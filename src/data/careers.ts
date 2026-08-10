import enfermeriaImg from '../assets/images/enfermeria/enf-enseniando-presion.webp';
import medicinaImg from '../assets/images/medicina/med-laboratorio.webp';
import fisioImg from '../assets/images/fisio/fisio-area-fisio.webp';
import derechoImg from '../assets/images/derecho/derecho-juicio.webp';
import adminImg from '../assets/images/admin/admin-laboratorio-de-comp.webp';

import enfermeriaHeroImg from '../assets/images/enfermeria/enf-enseniando-ecografia.webp';
import medicinaHeroImg from '../assets/images/medicina/med-un-medico.webp';
import fisioHeroImg from '../assets/images/fisio/fisio-dos-estudiantes.webp';

export type Valor = string | { titulo: string; descripcion: string };
export type CompetenciaGrupo = { titulo: string; items: string[] };

export interface CareerContent {
  nombre: string;
  resumen: string;
  mision: string;
  vision: string;
  campoLaboralTitulo: string;
  campoLaboral: string[];
  competencias?: CompetenciaGrupo[];
  valores: Valor[];
}

export interface Career {
  slug: string;
  /** Nombre base de los archivos en public/video/optimized; no siempre coincide con `slug`. */
  videoSlug: string;
  image: ImageMetadata;
  heroImage: ImageMetadata;
  es: CareerContent;
  pt: CareerContent;
}

export interface CareerVideo {
  src: string;
  preview: string;
  poster: string;
}

export function careerVideo(videoSlug: string): CareerVideo {
  return {
    src: `/video/optimized/complete/${videoSlug}.mp4`,
    preview: `/video/optimized/loop/${videoSlug}-preview.mp4`,
    poster: `/video/optimized/poster/${videoSlug}.jpg`,
  };
}

export const careers: Career[] = [
  {
    slug: 'enfermeria',
    videoSlug: 'enfermeria',
    image: enfermeriaImg,
    heroImage: enfermeriaHeroImg,
    es: {
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
    pt: {
      nombre: 'Enfermagem',
      resumen:
        'O Curso de Enfermagem forma profissionais competentes com sólida base científica, técnica e humanística, capazes de prestar cuidado integral à pessoa, à família e à comunidade nos diferentes níveis de atenção. Desenvolve competências em promoção, prevenção, recuperação e reabilitação da saúde, integrando pesquisa aplicada e inovação em serviços de saúde. Da mesma forma, fortalece capacidades empreendedoras voltadas à criação e gestão de serviços de saúde sustentáveis com impacto social.',
      mision:
        'Formar Licenciadas e Licenciados em Enfermagem com competências científicas, técnicas, éticas e humanísticas, capazes de prestar atenção integral de qualidade à pessoa, à família e à comunidade, desenvolver pesquisa aplicada e promover iniciativas inovadoras em serviços de saúde, contribuindo para o fortalecimento do sistema sanitário e o desenvolvimento social.',
      vision:
        'Constituir-se em um Curso referência na formação por competências em Enfermagem, reconhecido por sua excelência acadêmica, inovação no cuidado, pesquisa aplicada e pela formação de profissionais empreendedores capazes de projetar, gerir e liderar serviços de saúde sustentáveis, com impacto social em nível departamental e nacional.',
      campoLaboralTitulo: 'Campo de atuação',
      campoLaboral: [
        'Atenção integral em hospitais de segundo e terceiro nível do setor público e privado.',
        'Atenção em centros de saúde de primeiro nível com enfoque preventivo e comunitário.',
        'Docência universitária e técnica, além de capacitação e formação de pessoal de saúde.',
        'Pesquisa em saúde por meio do desenvolvimento de estudos científicos e projetos aplicados.',
        'Administração e gestão de serviços sanitários, incluindo chefia de enfermagem e gestão de recursos humanos.',
        'Saúde ocupacional em empresas e indústrias públicas e privadas.',
        'Projeto e gestão de serviços especializados em atenção geriátrica.',
        'Criação e administração de consultório de enfermagem integral.',
        'Gestão de serviços pré-hospitalares e transporte sanitário, conforme a normativa vigente.',
        'Assessoria e consultoria em gestão do cuidado, biossegurança e qualidade em serviços de saúde.',
      ],
      valores: [
        'Humanismo',
        'Ética profissional',
        'Vocação de serviço',
        'Responsabilidade social',
        'Respeito à dignidade humana',
        'Empatia',
        'Solidariedade',
        'Trabalho em equipe',
        'Liderança',
        'Compromisso com a qualidade',
      ],
    },
  },
  {
    slug: 'medicina',
    videoSlug: 'medicina',
    image: medicinaImg,
    heroImage: medicinaHeroImg,
    es: {
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
    pt: {
      nombre: 'Medicina',
      resumen:
        'O Curso de Medicina da Universidade Privada UNO – Subsede Cochabamba forma médicos integrais com sólida base científica, ética e humanista, capazes de realizar anamnese, diagnóstico, tratamento e prevenção com enfoque social para o país. Inspirado em modelos acadêmicos de excelência, integra docência, pesquisa e prática clínica, promovendo liderança, compromisso comunitário e melhoria contínua. Medicina UNO: "vocação que salva vidas e deixa marca".',
      mision:
        'Formar médicos cirurgiões íntegros, com excelência científica, ética e compromisso social, capazes de responder às necessidades de saúde com enfoque humanista, pensamento crítico e vocação de serviço, promovendo pesquisa e melhoria contínua.',
      vision:
        'Ser um Curso de Medicina referência na região, reconhecido por sua qualidade acadêmica e por formar profissionais líderes, comprometidos com a saúde comunitária, a inovação e a transformação social.',
      campoLaboralTitulo: 'Campo de atuação',
      campoLaboral: [
        'Atenção médica integral em redes públicas e privadas de saúde.',
        'Atenção clínica e cirúrgica com excelência ética e científica.',
        'Serviço comunitário focado em prevenção e promoção da saúde.',
        'Pesquisa médica orientada a transformar realidades sanitárias.',
        'Docência universitária e formação de novas gerações.',
        'Gestão estratégica em instituições e sistemas de saúde.',
        'Inovação e tecnologia aplicada ao diagnóstico e tratamento.',
        'Desenvolvimento clínico e farmacovigilância na indústria farmacêutica.',
        'Especialização médica e formação continuada avançada.',
        'Consultoria e assessoramento técnico em políticas sanitárias.',
      ],
      valores: [
        {
          titulo: 'Centralidade na pessoa',
          descripcion:
            'A formação médica orienta-se pelo respeito irrestrito à vida, à dignidade e à integridade do ser humano em todas as suas dimensões.',
        },
        {
          titulo: 'Ética e deontologia médica',
          descripcion:
            'Atuação profissional baseada em princípios morais, responsabilidade legal e compromisso com a confidencialidade e a justiça sanitária.',
        },
        {
          titulo: 'Vocação de serviço',
          descripcion: 'Disposição permanente para o cuidado do paciente e a atenção solidária às necessidades da comunidade.',
        },
        {
          titulo: 'Responsabilidade social e compromisso comunitário',
          descripcion: 'Participação ativa na promoção, prevenção e melhoria da saúde coletiva.',
        },
        {
          titulo: 'Excelência científica',
          descripcion: 'Busca constante de atualização, rigor acadêmico e prática sustentada em evidências.',
        },
        {
          titulo: 'Pesquisa e inovação',
          descripcion: 'Desenvolvimento do pensamento científico como ferramenta para transformar realidades sanitárias.',
        },
        {
          titulo: 'Liderança colaborativa',
          descripcion: 'Trabalho interdisciplinar orientado a resultados, com capacidade de condução ética e técnica.',
        },
        {
          titulo: 'Humanismo médico',
          descripcion: 'Empatia, sensibilidade e compreensão integral do paciente em seu contexto biológico, psicológico e social.',
        },
        {
          titulo: 'Melhoria contínua',
          descripcion: 'Avaliação permanente do desempenho profissional e abertura à aprendizagem ao longo da vida.',
        },
        {
          titulo: 'Compromisso institucional',
          descripcion:
            'Identificação com os princípios e a missão da Universidade Privada UNO, projetando qualidade e prestígio acadêmico.',
        },
      ],
    },
  },
  {
    slug: 'fisioterapia-kinesiologia',
    videoSlug: 'fisio',
    image: fisioImg,
    heroImage: fisioHeroImg,
    es: {
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
    pt: {
      nombre: 'Fisioterapia e Cinesiologia',
      resumen:
        'O Curso de Fisioterapia e Cinesiologia da Universidade UNO é parte integrante de nossa Faculdade de Ciências da Saúde e é ministrado sob o inovador modelo de Educação Baseada em Competências (EBC). Esse enfoque pedagógico garante que nossos estudantes não apenas adquiram conhecimentos teóricos de vanguarda, mas também desenvolvam as habilidades, destrezas e atitudes necessárias para resolver com sucesso os problemas reais da sociedade no âmbito da saúde e do movimento corporal humano. Nosso programa foi projetado para responder às demandas de um ambiente globalizado e em constante mudança, formando profissionais éticos, humanistas e com um profundo compromisso social.',
      mision:
        'O Curso de Fisioterapia e Cinesiologia tem como missão formar profissionais íntegros e socialmente comprometidos, com uma sólida base científica, técnica e humanística. Por meio de um enfoque no estudo do Movimento Corporal Humano, buscamos desenvolver competências para a promoção da saúde, a prevenção, o diagnóstico fisioterapêutico, a recuperação e a reabilitação integral das pessoas e das comunidades. Comprometemo-nos a gerar ambientes de aprendizagem interdisciplinares e inovadores, que fomentem a pesquisa aplicada e a vinculação com o meio.',
      vision:
        'Ser um programa de excelência reconhecido nacional e internacionalmente por sua liderança na formação de fisioterapeutas cinesiólogos com um profundo sentido humano e uma alta qualidade acadêmica e científica. Seremos uma referência na geração e transferência de conhecimento por meio da pesquisa inovadora na área do Movimento Corporal Humano, respondendo de maneira prioritária às necessidades de nossa zona de influência e do país.',
      campoLaboralTitulo: 'Campo ocupacional',
      campoLaboral: [
        'Instituições de saúde (hospitais, clínicas, centros de reabilitação).',
        'Atenção primária e programas comunitários de saúde.',
        'Consultoria privada.',
        'Clubes esportivos e centros de condicionamento físico.',
        'Instituições educacionais e de pesquisa.',
        'Docência universitária e gestão de serviços de saúde.',
      ],
      competencias: [
        {
          titulo: 'Clínica assistencial',
          items: [
            'Avaliar, diagnosticar e intervir nas alterações do movimento corporal humano nas diferentes etapas da vida.',
            'Aplicar agentes físicos e técnicas cinésicas com critério científico, para a recuperação, habilitação e reabilitação da pessoa, melhorando sua funcionalidade e qualidade de vida.',
          ],
        },
        {
          titulo: 'Promoção e prevenção',
          items: [
            'Projetar e executar programas de promoção da saúde e prevenção da doença, voltados à manutenção e otimização do movimento corporal humano em indivíduos e coletividades.',
            'Atuar como agente educativo em saúde, fomentando estilos de vida saudáveis e o autocuidado na comunidade.',
          ],
        },
        {
          titulo: 'Investigativa',
          items: [
            'Gerar e aplicar conhecimentos científicos por meio da pesquisa formativa e aplicada, contribuindo para o desenvolvimento da disciplina.',
            'Participar ativamente de grupos e projetos de pesquisa que abordem o movimento corporal humano a partir de perspectivas integradoras.',
          ],
        },
        {
          titulo: 'Gestão e liderança',
          items: [
            'Gerir e administrar serviços de fisioterapia e cinesiologia com qualidade, eficiência e cordialidade.',
            'Exercer uma liderança transformadora em equipes interdisciplinares, tomando decisões fundamentadas para contribuir com o bem-estar coletivo.',
          ],
        },
        {
          titulo: 'Ético-humanística',
          items: [
            'Desempenhar sua profissão com honestidade, responsabilidade e sentido humano, respeitando a diversidade e a dignidade das pessoas.',
            'Agir com coerência entre o pensamento, a palavra e a ação, sob princípios que promovam a justiça, a paz e o cuidado com o meio ambiente.',
          ],
        },
      ],
      valores: [
        {
          titulo: 'Ética e honestidade',
          descripcion:
            'Atuamos com retidão, transparência e probidade em todos os âmbitos, respeitando a propriedade intelectual e priorizando o bem-estar das pessoas e da sociedade.',
        },
        {
          titulo: 'Sentido humano e social',
          descripcion:
            'Reconhecemos a dignidade da pessoa como centro de nosso trabalho, com firme compromisso com a justiça social e a equidade.',
        },
        {
          titulo: 'Responsabilidade e compromisso com a excelência',
          descripcion:
            'Formamo-nos e nos atualizamos continuamente para alcançar os mais altos padrões de qualidade na docência, na pesquisa e na atenção.',
        },
        {
          titulo: 'Liderança e inovação',
          descripcion:
            'Promovemos uma liderança transformadora com capacidade de trabalho interdisciplinar e busca de soluções inovadoras.',
        },
        {
          titulo: 'Respeito pela vida e pelo meio ambiente',
          descripcion:
            'Comprometemo-nos com a sustentabilidade ambiental, entendendo a saúde humana como inerentemente ligada à saúde do planeta.',
        },
      ],
    },
  },
  {
    slug: 'derecho',
    videoSlug: 'derecho',
    image: derechoImg,
    heroImage: derechoImg,
    es: {
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
    pt: {
      nombre: 'Direito',
      resumen:
        'O Curso de Direito da Universidade Nacional do Oriente Cochabamba forma profissionais com sólida preparação jurídica, ética e humanista. Promove o estudo integral do ordenamento jurídico boliviano, a pesquisa científica e a prática forense, fortalecendo competências em litigação, assessoria jurídica e resolução de conflitos. Seu enfoque está voltado ao serviço à sociedade, à justiça e ao respeito aos direitos fundamentais.',
      mision:
        'O Curso de Direito tem como missão formar profissionais íntegros, críticos e comprometidos com a justiça, por meio de uma sólida formação jurídica, científica e humanista. Promove a pesquisa, a prática forense e o enfoque por competências, contribuindo para o fortalecimento do Estado de Direito e o serviço responsável à sociedade.',
      vision:
        'Ser um Curso de Direito líder em nível regional e nacional, reconhecido pela excelência acadêmica, pela qualidade na formação jurídica e pela produção investigativa, formando profissionais éticos e competentes que contribuam para a transformação social e o desenvolvimento jurídico do país.',
      campoLaboralTitulo: 'Campo laboral',
      campoLaboral: [
        'Exercício livre da advocacia nas áreas civil, penal, agrária e trabalhista.',
        'Assessoria jurídica em empresas públicas e privadas.',
        'Função pública em ministérios, prefeituras e governos departamentais.',
        'Carreira judicial como juiz, escrivão ou auxiliar.',
        'Ministério Público como promotor ou assistente jurídico.',
        'Defensoria pública e patrocínio em casos sociais.',
        'Consultoria em direito tributário e financeiro.',
        'Docência universitária e pesquisa jurídica.',
        'Organismos internacionais e defesa dos direitos humanos.',
        'Serviços notariais e funções em registros públicos.',
      ],
      valores: [
        'Ética profissional e probidade.',
        'Vocação de serviço e solidariedade.',
        'Respeito pela dignidade humana.',
        'Compromisso com a justiça e a verdade.',
        'Responsabilidade social e comunitária.',
        'Pensamento crítico e rigor científico.',
        'Honestidade e transparência.',
        'Liderança e trabalho em equipe.',
        'Defesa dos direitos fundamentais.',
        'Respeito ao Estado de Direito.',
      ],
    },
  },
  {
    slug: 'administracion-empresas',
    videoSlug: 'administracion',
    image: adminImg,
    heroImage: adminImg,
    es: {
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
    pt: {
      nombre: 'Administração e Direção de Empresas',
      resumen:
        'O Curso de Administração e Direção de Empresas forma profissionais com sólida preparação científica, técnica e humanística, capazes de gerir e dirigir organizações públicas e privadas com eficiência e visão estratégica. A formação integra conhecimentos em finanças, marketing, gestão de talentos humanos, operações e planejamento estratégico, articulando teoria e prática para uma adequada tomada de decisões gerenciais.',
      mision:
        'O Curso de Administração e Direção de Empresas da Universidade Nacional do Oriente tem como missão formar profissionais líderes, éticos e empreendedores, com sólida preparação científica, técnica e humanística, capazes de planejar, organizar, dirigir e controlar organizações públicas e privadas, contribuindo para o desenvolvimento sustentável da região e do país.',
      vision:
        'Ser um curso de referência em nível regional e nacional na formação de profissionais em Administração e Direção de Empresas, reconhecido por sua excelência acadêmica, enfoque por competências, vinculação com o setor produtivo e compromisso com o desenvolvimento econômico e social.',
      campoLaboralTitulo: 'Campo laboral',
      campoLaboral: [
        'Direção e gestão estratégica em empresas públicas e privadas.',
        'Administração financeira e controle de recursos organizacionais.',
        'Gestão de talentos humanos e liderança de equipes de trabalho.',
        'Planejamento e execução de projetos empresariais sustentáveis.',
        'Criação e desenvolvimento de empreendimentos inovadores.',
        'Consultoria e assessoramento em gestão e estratégia empresarial.',
        'Direção comercial, marketing e posicionamento competitivo.',
        'Administração em entidades estatais e organismos públicos.',
        'Gestão de operações, logística e melhoria de processos.',
        'Docência e pesquisa no âmbito da gestão empresarial.',
      ],
      valores: [
        'Ética profissional na gestão e na tomada de decisões empresariais.',
        'Responsabilidade social e compromisso com o desenvolvimento sustentável.',
        'Liderança participativa orientada a resultados e trabalho em equipe.',
        'Transparência e honestidade na administração organizacional.',
        'Inovação e criatividade na solução de problemas empresariais.',
        'Compromisso com a excelência acadêmica e a melhoria contínua.',
        'Respeito pela dignidade humana e pela diversidade organizacional.',
        'Espírito empreendedor com visão estratégica e competitiva.',
        'Disciplina e responsabilidade no exercício profissional.',
      ],
    },
  },
];
