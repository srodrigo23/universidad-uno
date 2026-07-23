import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const navItems = [
  { href: '/#mision-vision', label: 'Misión y Visión' },
  { href: '/#historia', label: 'Historia' },
  { href: '/#carreras', label: 'Carreras' },
  { href: '/#faq', label: 'Preguntas frecuentes' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-2">
        <a href="/" className="flex items-center">
          <img
            src="/logo/LogotipoOriginalVersiones/LogotipoOriginalCompleto.png"
            alt="Universidad Privada UNO · Cochabamba"
            className="h-16 w-auto sm:h-20"
          />
        </a>

        <nav className="hidden md:block">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm font-semibold text-slate-700 hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="https://wa.me/59164849322"
          target="_blank"
          rel="noopener"
          className="hidden whitespace-nowrap rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-primary-dark md:inline-flex"
        >
          Admisiones
        </a>

        <button
          type="button"
          className="relative z-50 inline-flex items-center justify-center rounded-md p-2 text-primary md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* right-side drawer */}
      <nav
        className={`fixed top-0 right-0 z-40 h-full w-72 max-w-[80vw] transform bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-1 px-6 pt-20 pb-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block py-3 text-sm font-semibold text-slate-700 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/59164849322"
              target="_blank"
              rel="noopener"
              className="mt-2 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Admisiones
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
