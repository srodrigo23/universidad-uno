import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaLocationDot } from 'react-icons/fa6';

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/UNOCBBA', icon: FaFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/unocochabamba/', icon: FaInstagram },
  { label: 'TikTok', href: 'https://www.tiktok.com/@universidadunocbba', icon: FaTiktok },
];

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Calle Junín entre Calle de la Reza y Calle La Paz, Cochabamba, Bolivia'
)}`;

export default function Footer() {
  return (
    <footer id="contacto" className="mt-16 bg-primary-dark text-slate-300">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <span className="font-heading text-2xl font-extrabold text-white">UNO</span>
          <p className="mt-2 font-semibold text-white">Universidad Privada UNO · Subsede Cochabamba</p>
          <p className="mt-2 text-sm">
            Formando profesionales competentes, éticos y líderes para el desarrollo de Bolivia.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-base font-semibold text-white">Contacto</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                href="https://wa.me/59164849322"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 hover:text-secondary-light"
              >
                <FaWhatsapp className="shrink-0" /> Asesor(a) Bolivia — 64849322
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/59164847741"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 hover:text-secondary-light"
              >
                <FaWhatsapp className="shrink-0" /> Asesor Brasil — 64847741
              </a>
            </li>
            <li>
              <a href={mapsHref} target="_blank" rel="noopener" className="flex items-start gap-2 hover:text-secondary-light">
                <FaLocationDot className="mt-0.5 shrink-0" /> Edificio Central: Calle Junín entre J. de la Reza y Calle La Paz
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base font-semibold text-white">Síguenos</h3>
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
      </div>

      <div className="border-t border-white/10 px-6 py-5">
        <p className="mx-auto max-w-6xl text-xs text-slate-400">
          © {new Date().getFullYear()} Universidad Privada UNO — Subsede Cochabamba. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
