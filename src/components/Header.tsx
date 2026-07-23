import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { AnimatePresence, motion } from 'motion/react';

const navItems = [
  { href: '/#mision-vision', label: 'Misión y Visión' },
  { href: '/#historia', label: 'Historia' },
  { href: '/#carreras', label: 'Carreras' },
  { href: '/#faq', label: 'Preguntas frecuentes' },
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-2">
          <a href="/" className="flex items-center">
            <img
              src="/logo/LogotipoOriginalVersiones/recortado/LogotipoOriginalCompleto.png"
              alt="Universidad Privada UNO · Cochabamba"
              width={101}
              height={64}
              className="h-14 w-auto sm:h-16"
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
      </header>

      {/* Backdrop y drawer viven fuera del header: el backdrop-blur del header lo
          convertiría en el contenedor de posicionamiento de sus hijos "fixed",
          rompiendo el layout de pantalla completa del drawer. */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            <motion.nav
              key="drawer"
              className="fixed top-0 right-0 z-40 h-full w-72 max-w-[80vw] bg-primary-dark shadow-2xl md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <motion.ul
                className="flex flex-col gap-1 px-6 pt-20 pb-6"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {navItems.map((item) => (
                  <motion.li key={item.href} variants={itemVariants}>
                    <a
                      href={item.href}
                      className="block py-3 text-sm font-semibold text-white hover:text-secondary-light"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
