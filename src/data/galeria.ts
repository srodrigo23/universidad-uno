import labComputo from '../assets/images/admin/admin-compu-todos.webp';
import primerosAuxilios from '../assets/images/enfermeria/enf-enseniando-primeros-auxilios.webp';
import electrocardiograma from '../assets/images/medicina/med-electrocardiograma.webp';
import claseMedicina from '../assets/images/medicina/med-enseniando-a-grupo.webp';
import areaRecreacional from '../assets/images/estudiantes/estudiante-jugando-area-recreacional.webp';
import pinpon from '../assets/images/estudiantes/estudiantes-jugando-pinpon.webp';

export interface GaleriaFoto {
  image: ImageMetadata;
  /** El alt describe la escena, no la carrera: es texto alternativo, no un pie de foto. */
  alt: { es: string; pt: string };
}

export const galeria: GaleriaFoto[] = [
  {
    image: labComputo,
    alt: {
      es: 'Estudiantes trabajando en el laboratorio de computación de la Universidad Privada UNO Cochabamba',
      pt: 'Estudantes trabalhando no laboratório de informática da Universidade Privada UNO Cochabamba',
    },
  },
  {
    image: primerosAuxilios,
    alt: {
      es: 'Docente enseñando maniobras de primeros auxilios a estudiantes de Enfermería',
      pt: 'Docente ensinando manobras de primeiros socorros a estudantes de Enfermagem',
    },
  },
  {
    image: electrocardiograma,
    alt: {
      es: 'Estudiantes practicando la toma de un electrocardiograma en el laboratorio de Medicina',
      pt: 'Estudantes praticando a realização de um eletrocardiograma no laboratório de Medicina',
    },
  },
  {
    image: claseMedicina,
    alt: {
      es: 'Clase práctica de Medicina con un docente y un grupo de estudiantes',
      pt: 'Aula prática de Medicina com um docente e um grupo de estudantes',
    },
  },
  {
    image: areaRecreacional,
    alt: {
      es: 'Estudiantes compartiendo en el área recreativa del campus',
      pt: 'Estudantes convivendo na área recreativa do campus',
    },
  },
  {
    image: pinpon,
    alt: {
      es: 'Estudiantes jugando tenis de mesa en un espacio de encuentro del campus',
      pt: 'Estudantes jogando tênis de mesa em um espaço de convivência do campus',
    },
  },
];
