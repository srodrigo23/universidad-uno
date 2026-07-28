import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { AnimatePresence, motion } from 'motion/react';
import { BO, BR } from 'country-flag-icons/react/3x2';

type Locale = 'es' | 'pt';

interface Props {
  locale: Locale;
  switchHref: string;
  t: {
    nav: {
      misionVision: string;
      historia: string;
      carreras: string;
      faq: string;
    };
    openMenu: string;
    closeMenu: string;
  };
}

const localeLabels: Record<Locale, string> = { es: 'ES', pt: 'PT' };
const localeFlags: Record<Locale, typeof BO> = { es: BO, pt: BR };

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

export default function Header({ locale, switchHref, t }: Props) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const homeHref = locale === 'es' ? '/' : '/pt/';
  const otherLocale: Locale = locale === 'es' ? 'pt' : 'es';
  const OtherFlag = localeFlags[otherLocale];

  const navItems = [
    { id: 'mision-vision', href: `${homeHref}#mision-vision`, label: t.nav.misionVision },
    { id: 'historia', href: `${homeHref}#historia`, label: t.nav.historia },
    { id: 'carreras', href: `${homeHref}#carreras`, label: t.nav.carreras },
    { id: 'faq', href: `${homeHref}#faq`, label: t.nav.faq },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-2">
          <a href={homeHref} className="flex items-center">
            <img
              src="/logo/LogotipoOriginalVersiones/recortado/LogotipoOriginalCompleto.png"
              alt="Universidad Privada UNO · Cochabamba"
              width={101}
              height={64}
              className="h-14 w-auto sm:h-16"
            />
          </a>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`relative pb-1 text-sm font-semibold transition-colors ${
                        isActive ? 'text-primary' : 'text-slate-700 hover:text-primary'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-underline"
                          className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-secondary"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={switchHref}
                  className="flex items-center gap-1.5 rounded-full border border-slate-300 px-2.5 py-1 text-xs font-bold tracking-wide text-slate-500 hover:border-primary hover:text-primary"
                >
                  <OtherFlag aria-hidden="true" className="h-3 w-4 shrink-0 rounded-[1px] object-cover" />
                  {localeLabels[otherLocale]}
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href={switchHref}
              className="flex items-center gap-1.5 rounded-full border border-slate-300 px-2.5 py-1 text-xs font-bold tracking-wide text-slate-500 hover:border-primary hover:text-primary"
            >
              <OtherFlag aria-hidden="true" className="h-3 w-4 shrink-0 rounded-[1px] object-cover" />
              {localeLabels[otherLocale]}
            </a>
            <button
              type="button"
              className="relative z-50 inline-flex items-center justify-center rounded-md p-2 text-primary"
              aria-label={open ? t.closeMenu : t.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>
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
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.li key={item.href} variants={itemVariants}>
                      <a
                        href={item.href}
                        className={`flex items-center gap-2 py-3 text-sm font-semibold transition-colors ${
                          isActive ? 'text-secondary-light' : 'text-white hover:text-secondary-light'
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-light transition-opacity ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                        {item.label}
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
