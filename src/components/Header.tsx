import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const navItems = [
  { href: '/#mision-vision', label: 'Misión y Visión' },
  { href: '/#historia', label: 'Historia' },
  { href: '/#carreras', label: 'Carreras' },
  { href: '/#faq', label: 'Preguntas frecuentes' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <a href="/" className="flex flex-col leading-tight">
          <span className="font-heading text-2xl font-extrabold text-primary">UNO</span>
          <span className="font-body text-[0.7rem] font-light tracking-wide text-slate-500">
            Universidad Privada UNO · Cochabamba
          </span>
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
          className="inline-flex items-center justify-center rounded-md p-2 text-primary md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-2 text-sm font-semibold text-slate-700 hover:text-primary"
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
              >
                Admisiones
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
