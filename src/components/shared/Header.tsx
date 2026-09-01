import { useEffect, useRef, useState } from 'react';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { AnimatePresence, motion } from 'motion/react';
import { BO, BR } from 'country-flag-icons/react/3x2';

type Locale = 'es' | 'pt';

export interface CareerLink {
  slug: string;
  nombre: string;
}

interface Props {
  locale: Locale;
  switchHref: string;
  currentPath: string;
  careerLinks: CareerLink[];
  t: {
    nav: {
      misionVision: string;
      sobreNosotros: string;
      carreras: string;
      faq: string;
    };
    verTodasCarreras: string;
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

/** Escalonado propio para la sublista de carreras: reusar listVariants recompondría
    su delayChildren sobre el retraso del padre y las carreras entrarían tarde. */
const subListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const CLOSE_DELAY_MS = 140;

export default function Header({ locale, switchHref, currentPath, careerLinks, t }: Props) {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const wrapperRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const homeHref = locale === 'es' ? '/' : '/pt/';
  const otherLocale: Locale = locale === 'es' ? 'pt' : 'es';
  const OtherFlag = localeFlags[otherLocale];

  const pillClass = scrolled
    ? 'border-slate-300 text-slate-500 hover:border-primary hover:text-primary'
    : 'border-white/40 text-white hover:border-secondary-light hover:text-secondary-light';

  const sobreNosotrosHref = locale === 'es' ? '/sobre-nosotros' : '/pt/sobre-nosotros';
  const careersBase = locale === 'es' ? '/carreras' : '/pt/carreras';
  const normalizedPath = currentPath.replace(/\/$/, '');
  const isCareerRoute = normalizedPath.startsWith(`${careersBase}/`);

  const navItems = [
    { id: 'mision-vision', href: `${sobreNosotrosHref}#mision-vision`, label: t.nav.misionVision, isRoute: false },
    { id: 'carreras', href: `${homeHref}#carreras`, label: t.nav.carreras, isRoute: false },
    { id: 'sobre-nosotros', href: sobreNosotrosHref, label: t.nav.sobreNosotros, isRoute: true },
    { id: 'faq', href: `${sobreNosotrosHref}#faq`, label: t.nav.faq, isRoute: false },
  ];

  const isItemActive = (item: (typeof navItems)[number]) => {
    if (item.id === 'carreras') return isCareerRoute || activeSection === 'carreras';
    return item.isRoute ? normalizedPath === item.href && activeSection === null : activeSection === item.id;
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      // No cerrar bajo el cursor si alguien navegó al panel con el teclado.
      if (panelRef.current?.contains(document.activeElement)) return;
      setDropdownOpen(false);
    }, CLOSE_DELAY_MS);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setDropdownOpen(false);
      triggerRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setDropdownOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const sections = navItems
      .filter((item) => !item.isRoute)
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

  const linkClass = (isActive: boolean) =>
    `relative pb-1 text-sm font-semibold transition-colors ${
      scrolled
        ? isActive
          ? 'text-primary'
          : 'text-slate-700 hover:text-primary'
        : isActive
          ? 'text-secondary-light'
          : 'text-white hover:text-secondary-light'
    }`;

  const activeUnderline = (
    <motion.span
      layoutId="nav-active-underline"
      className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-secondary"
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
    />
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
          scrolled ? 'border-slate-200 bg-white/90 backdrop-blur' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-2">
          <a href={homeHref} className="flex items-center">
            <img
              src={
                scrolled
                  ? '/logo/LogotipoOriginalVersiones/recortado/LogotipoOriginalCompleto.png'
                  : '/logo/LogotipoOriginalVersiones/recortado/LogotipoNegativoCompleto.png'
              }
              alt="Universidad Privada UNO · Cochabamba"
              width={101}
              height={64}
              className="h-14 w-auto sm:h-16"
            />
          </a>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = isItemActive(item);

                if (item.id === 'carreras') {
                  return (
                    <li
                      key={item.href}
                      ref={wrapperRef}
                      className="relative"
                      onPointerEnter={(event) => {
                        if (event.pointerType !== 'mouse') return;
                        cancelClose();
                        setDropdownOpen(true);
                      }}
                      onPointerLeave={(event) => {
                        if (event.pointerType !== 'mouse') return;
                        scheduleClose();
                      }}
                    >
                      <button
                        type="button"
                        ref={triggerRef}
                        aria-expanded={dropdownOpen}
                        aria-controls="nav-carreras-panel"
                        onClick={() => setDropdownOpen((v) => !v)}
                        className={`${linkClass(isActive)} inline-flex items-center gap-1`}
                      >
                        {item.label}
                        <HiChevronDown
                          aria-hidden="true"
                          className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                        />
                        {isActive && activeUnderline}
                      </button>

                      <AnimatePresence>
                        {dropdownOpen && (
                          <div className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3">
                            <motion.div
                              ref={panelRef}
                              id="nav-carreras-panel"
                              initial={{ opacity: 0, y: -8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.98 }}
                              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                              className="w-64 origin-top overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-primary-dark/15"
                            >
                              <ul>
                                <li>
                                  <a
                                    href={item.href}
                                    onClick={() => setDropdownOpen(false)}
                                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface"
                                  >
                                    {t.verTodasCarreras}
                                  </a>
                                </li>
                                <li aria-hidden="true" className="mx-3 my-1 h-px bg-slate-200" />
                                {careerLinks.map((career) => {
                                  const href = `${careersBase}/${career.slug}`;
                                  const isCurrent = normalizedPath === href;
                                  return (
                                    <li key={career.slug}>
                                      <a
                                        href={href}
                                        aria-current={isCurrent ? 'page' : undefined}
                                        onClick={() => setDropdownOpen(false)}
                                        className={`block rounded-xl px-3 py-2 text-sm transition-colors hover:bg-surface hover:text-primary ${
                                          isCurrent
                                            ? 'bg-surface font-semibold text-primary'
                                            : 'font-medium text-slate-600'
                                        }`}
                                      >
                                        {career.nombre}
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <a href={item.href} className={linkClass(isActive)}>
                      {item.label}
                      {isActive && activeUnderline}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={switchHref}
                  className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold tracking-wide transition-colors ${pillClass}`}
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
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold tracking-wide transition-colors ${pillClass}`}
            >
              <OtherFlag aria-hidden="true" className="h-3 w-4 shrink-0 rounded-[1px] object-cover" />
              {localeLabels[otherLocale]}
            </a>
            <button
              type="button"
              className={`relative z-50 inline-flex items-center justify-center rounded-md p-2 transition-colors ${
                scrolled ? 'text-primary' : 'text-white'
              }`}
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
              className="fixed top-0 right-0 z-40 h-full w-72 max-w-[80vw] overflow-y-auto overscroll-contain bg-primary-dark shadow-2xl md:hidden"
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
                  const isActive = isItemActive(item);
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

                      {item.id === 'carreras' && (
                        <motion.ul
                          variants={subListVariants}
                          aria-label={item.label}
                          className="mt-0.5 mb-2 ml-0.5 flex flex-col gap-0.5 border-l border-white/20 pl-4"
                        >
                          {careerLinks.map((career) => {
                            const href = `${careersBase}/${career.slug}`;
                            const isCurrent = normalizedPath === href;
                            return (
                              <motion.li key={career.slug} variants={itemVariants}>
                                <a
                                  href={href}
                                  aria-current={isCurrent ? 'page' : undefined}
                                  onClick={() => setOpen(false)}
                                  className={`block py-2 text-[13px] transition-colors hover:text-secondary-light ${
                                    isCurrent ? 'font-semibold text-secondary-light' : 'font-medium text-white/70'
                                  }`}
                                >
                                  {career.nombre}
                                </a>
                              </motion.li>
                            );
                          })}
                        </motion.ul>
                      )}
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
