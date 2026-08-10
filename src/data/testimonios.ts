import mariaCelyne from '../assets/images/testimonios/maria-celyne.webp';
import mariaEduarda from '../assets/images/testimonios/maria-eduarda.webp';
import mikaelleEpaminondas from '../assets/images/testimonios/mikaelle-epaminondas.webp';
import samuelSedris from '../assets/images/testimonios/samuel-sedris.webp';

export type Nacionalidad = 'BO' | 'BR';

export interface Testimonio {
  nombre: string;
  /** Se muestra siempre en su idioma original, sin traducir. */
  testimonio: string;
  pais: Nacionalidad;
  /** Recorte sin fondo; si falta, la tarjeta cae a las iniciales. */
  foto?: ImageMetadata;
}

export const paisLabels: Record<Nacionalidad, string> = {
  BO: 'Bolivia',
  BR: 'Brasil',
};

export const testimonios: Testimonio[] = [
  {
    nombre: 'Daniela Saraí Pacsi Zamorano',
    testimonio: 'En la UNO nos inspira a crecer y a transformar el futuro.',
    pais: 'BO',
  },
  {
    nombre: 'Nuria Gisela Pórcel Villarroel',
    testimonio: 'La UNO nos une para crecer.',
    pais: 'BO',
  },
  {
    nombre: 'Alejandra Borda Villagomez',
    testimonio:
      'La universidad forma conocimientos, en la UNO impulsan nuestros conocimientos y construimos nuestro futuro.',
    pais: 'BO',
  },
  {
    nombre: 'Nataly Gabriela Roman Erayzo',
    testimonio: 'Con estudio y convicción, brillamos.',
    pais: 'BO',
  },
  {
    nombre: 'Samuel Sedris',
    testimonio:
      'Durante muito tempo achei que o sonho de vestir um jaleco branco fosse grande demais para mim. Vieram as dúvidas, os desafios e os momentos em que pensei em desistir. Mas a UNO me mostrou que sonhos não existem para ficar guardados, existem para serem vividos. Hoje, cada aula me lembra que todo esforço valeu a pena. Não estou apenas estudando Medicina; estou construindo a vida que sempre imaginei. A UNO não me deu apenas uma oportunidade, ela me ajudou a acreditar que eu era capaz de transformar um sonho em realidade.',
    pais: 'BR',
    foto: samuelSedris,
  },
  {
    nombre: 'Maria Celyne',
    testimonio:
      'Sou brasileira e estudar Medicina sempre foi o maior objetivo da minha vida. Muitas vezes pensei em desistir porque não via uma oportunidade que coubesse na minha realidade. Foi então que encontrei a UNO. Aqui fui acolhida, fiz amizades e encontrei Doutores que realmente se preocupam com nossa formação. Hoje tenho orgulho de dizer que estou realizando meu sonho. A UNO acreditou em mim e me deu a chance de construir o meu futuro.',
    pais: 'BR',
    foto: mariaCelyne,
  },
  {
    nombre: 'Maria Eduarda',
    testimonio:
      'Se alguém tivesse me perguntado há alguns anos se eu acreditava que estaria cursando Medicina, eu diria que era apenas um sonho. Hoje essa é a minha realidade. A UNO abriu as portas para que eu pudesse conquistar aquilo que sempre desejei. Estudar aqui mudou minha vida e me fez acreditar que, quando surge a oportunidade certa, tudo pode acontecer. Tenho muito orgulho de representar os brasileiros que vieram em busca de um futuro melhor e encontraram na UNO a chance de realizar esse grande sonho.',
    pais: 'BR',
    foto: mariaEduarda,
  },
  {
    nombre: 'Mikaelle Epaminondas',
    testimonio:
      'Às vezes eu ainda nem acredito que estou vivendo esse sonho. Sempre quis estudar Medicina, mas parecia algo tão distante da minha realidade. Hoje, quando visto o jaleco e entro na sala de aula, meu coração transborda de gratidão. A UNO me deu a oportunidade que eu tanto procurava e mudou a minha história. Sei que ainda tenho um longo caminho pela frente, mas agora tenho a certeza de que estou exatamente onde sempre sonhei estar. Obrigada, UNO, por fazer parte da realização do meu maior sonho.',
    pais: 'BR',
    foto: mikaelleEpaminondas,
  },
];
