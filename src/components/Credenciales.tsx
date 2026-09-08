import { FaShieldHalved } from 'react-icons/fa6';
import { BO, BR } from 'country-flag-icons/react/3x2';
import Reveal from './shared/Reveal';
import Eyebrow from './Eyebrow';
import SectionGlow from './SectionGlow';
import CochabambaWatermark from './CochabambaWatermark';

/** Misma correspondencia idioma-bandera que usa el conmutador del header. */
const FLAGS: Record<string, typeof BO> = { BO, BR };

interface Props {
  t: {
    eyebrow: string;
    title: string;
    subtitle: string;
    /** Cada dato trae `value` (texto) o `flags` (códigos de país), nunca los dos. */
    items: { value?: string; flags?: string[]; label: string; detail: string }[];
  };
}

export default function Credenciales({ t }: Props) {
  return (
    <section className='relative overflow-hidden px-6 py-16'>
      <CochabambaWatermark className='absolute -top-24 -right-28 -z-10 h-[150%] text-primary opacity-[0.055] sm:-right-16' />
      <div className='relative mx-auto max-w-6xl'>
        <SectionGlow />
        <Reveal>
          <Eyebrow icon={FaShieldHalved} label={t.eyebrow} />
          <h2 className='mb-3 text-3xl text-primary-dark'>{t.title}</h2>
          <p className='mb-10 max-w-2xl text-slate-600'>{t.subtitle}</p>
        </Reveal>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {t.items.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.08}
              className='border-l-2 border-secondary/30 pl-5'
            >
              {item.flags ? (
                /* Las banderas son decorativas: el idioma ya lo dice la etiqueta de debajo.
                   min-h-8 iguala la altura de la línea de los datos de texto. */
                <p className='flex min-h-8 items-center gap-2'>
                  {item.flags.map((code) => {
                    const Flag = FLAGS[code];
                    if (!Flag) return null;

                    return (
                      <Flag
                        key={code}
                        aria-hidden='true'
                        className='h-6 w-9 shrink-0 rounded-[3px] object-cover shadow-sm ring-1 ring-black/10'
                      />
                    );
                  })}
                </p>
              ) : (
                <p className='min-h-8 text-2xl font-extrabold text-primary'>{item.value}</p>
              )}
              <p className='mt-1 text-sm font-semibold text-primary-dark'>{item.label}</p>
              <p className='mt-1.5 text-sm text-slate-600'>{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
