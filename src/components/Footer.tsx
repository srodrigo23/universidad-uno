import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaLocationDot } from 'react-icons/fa6';
import { BO, BR } from 'country-flag-icons/react/3x2';
import Reveal from './Reveal';

interface Props {
  t: {
    tagline: string;
    contactTitle: string;
    advisorBolivia: string;
    advisorBrasil: string;
    addressLabel: string;
    followTitle: string;
    rights: string;
  };
}

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/UNOCBBA', icon: FaFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/unocochabamba/', icon: FaInstagram },
  { label: 'TikTok', href: 'https://www.tiktok.com/@universidadunocbba', icon: FaTiktok },
];

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Calle Junín entre Calle de la Reza y Calle La Paz, Cochabamba, Bolivia'
)}`;

export default function Footer({ t }: Props) {
  const whatsappContacts = [
    { country: 'Bolivia', Flag: BO, label: t.advisorBolivia, phone: '64849322', href: 'https://wa.me/59164849322' },
    { country: 'Brasil', Flag: BR, label: t.advisorBrasil, phone: '64847741', href: 'https://wa.me/59164847741' },
  ];

  return (
    <footer id="contacto" className="mt-16 bg-primary-dark text-slate-300">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <img
            src="/logo/LogotipoOriginalVersiones/recortado/LogotipoNegativoCompleto.png"
            alt="Universidad Privada UNO · Cochabamba"
            width={127}
            height={80}
            className="h-16 w-auto md:h-20"
          />
          <p className="mt-2 font-semibold text-white">Universidad Privada UNO · Subsede Cochabamba</p>
          <p className="mt-2 text-sm">{t.tagline}</p>
        </div>

        <div>
          <h3 className="mb-4 text-base font-semibold text-white">{t.contactTitle}</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {whatsappContacts.map(({ country, Flag, label, phone, href }) => (
              <li key={country}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-2 hover:text-secondary-light"
                >
                  <Flag title={country} className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover" /> {label} —{' '}
                  <FaWhatsapp className="shrink-0" /> {phone}
                </a>
              </li>
            ))}
            <li>
              <a href={mapsHref} target="_blank" rel="noopener" className="flex items-start gap-2 hover:text-secondary-light">
                <FaLocationDot className="mt-0.5 shrink-0" /> {t.addressLabel}: Calle Junín entre J. de la Reza y Calle La Paz
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base font-semibold text-white">{t.followTitle}</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-secondary-light">
                  <Icon className="shrink-0" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="border-t border-white/10 px-6 py-5">
        <p className="mx-auto max-w-6xl text-xs text-slate-400">
          © {new Date().getFullYear()} Universidad Privada UNO — Subsede Cochabamba. {t.rights}
        </p>
      </div>
    </footer>
  );
}
