import { useEffect, useRef, useState } from 'react';
import { useForm, type UseFormRegisterReturn } from 'react-hook-form';
import { HiX } from 'react-icons/hi';
import { FaCircleCheck, FaPaperPlane } from 'react-icons/fa6';
import { BO, BR } from 'country-flag-icons/react/3x2';
import { AnimatePresence, motion } from 'motion/react';

export interface CareerOption {
  slug: string;
  nombre: string;
}

const prefixes = [
  { code: '+591', label: 'Bolivia', Flag: BO },
  { code: '+55', label: 'Brasil', Flag: BR },
];

// À-ÿ cubre acentos y ñ/Ñ; el guion va último para que sea literal dentro de la clase.
const LETTERS_RE = /^[A-Za-zÀ-ÿ\s'-]{2,}$/;
const PHONE_RE = /^[0-9]{6,15}$/;
// type="email" acepta "a@b"; esto exige además un dominio con punto y TLD.
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/;

const stripNonLetters = (value: string) => value.replace(/[^A-Za-zÀ-ÿ\s'-]/g, '');
const stripNonDigits = (value: string) => value.replace(/\D/g, '');
const stripSpaces = (value: string) => value.replace(/\s/g, '');

interface FormValues {
  nombres: string;
  apellidos: string;
  prefijo: string;
  celular: string;
  correo: string;
  carrera: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  careers: CareerOption[];
  defaultCareer?: string;
  t: {
    title: string;
    subtitle: string;
    nombres: string;
    apellidos: string;
    celular: string;
    correo: string;
    carrera: string;
    carreraPlaceholder: string;
    prefijo: string;
    submit: string;
    close: string;
    successTitle: string;
    successText: string;
    requerido: string;
    hintLetras: string;
    hintCelular: string;
    hintCorreo: string;
  };
}

export default function PreinscripcionModal({ open, onClose, careers, defaultCareer, t }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      nombres: '',
      apellidos: '',
      prefijo: prefixes[0].code,
      celular: '',
      correo: '',
      carrera: defaultCareer ?? '',
    },
  });

  const activePrefix = prefixes.find((item) => item.code === watch('prefijo')) ?? prefixes[0];

  useEffect(() => {
    if (!open) return;

    const opener = document.activeElement as HTMLElement | null;
    // Reabrir tras enviar debe permitir otra carga, no dejar el formulario sucio.
    setSubmitted(false);
    reset();
    setFocus('nombres');

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open, onClose, reset, setFocus]);

  useEffect(() => {
    if (submitted) closeRef.current?.focus();
  }, [submitted]);

  const onSubmit = (values: FormValues) => {
    console.log('Preinscripción', values);
    setSubmitted(true);
  };

  /** Filtra caracteres inválidos al escribir y al pegar, antes de que RHF registre el valor. */
  const filtered = (registration: UseFormRegisterReturn, clean: (value: string) => string) => ({
    ...registration,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = clean(event.target.value);
      // Sólo reasignamos si cambió, para no mover el cursor al final mientras se escribe.
      if (next !== event.target.value) event.target.value = next;
      return registration.onChange(event);
    },
  });

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border px-3 py-2.5 text-sm text-primary-dark transition-colors outline-none placeholder:text-slate-400 focus:ring-2 ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/25'
        : 'border-slate-300 focus:border-secondary focus:ring-secondary/30'
    }`;
  const labelClass = 'mb-1.5 block text-xs font-semibold tracking-wide text-slate-600 uppercase';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={t.title}
        >
          <motion.div
            className="relative my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              ref={closeRef}
              onClick={onClose}
              aria-label={t.close}
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-primary-dark"
            >
              <HiX size={20} />
            </button>

            {submitted ? (
              <div className="py-6 text-center">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <FaCircleCheck size={28} />
                </span>
                <h2 className="mb-2 text-2xl text-primary-dark">{t.successTitle}</h2>
                <p className="mx-auto max-w-sm text-slate-600">{t.successText}</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-secondary-dark"
                >
                  {t.close}
                </button>
              </div>
            ) : (
              <>
                <h2 className="mb-1 pr-8 text-2xl text-primary-dark">{t.title}</h2>
                <p className="mb-6 text-sm text-slate-600">{t.subtitle}</p>

                {/* noValidate: los mensajes los da RHF, si no el navegador interrumpe con su propio globo. */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="pre-nombres">
                        {t.nombres}
                      </label>
                      <input
                        id="pre-nombres"
                        type="text"
                        autoComplete="given-name"
                        aria-invalid={!!errors.nombres}
                        aria-describedby={errors.nombres ? 'pre-nombres-error' : undefined}
                        className={fieldClass(!!errors.nombres)}
                        {...filtered(
                          register('nombres', {
                            required: t.requerido,
                            pattern: { value: LETTERS_RE, message: t.hintLetras },
                          }),
                          stripNonLetters
                        )}
                      />
                      <FieldError id="pre-nombres-error" message={errors.nombres?.message} />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="pre-apellidos">
                        {t.apellidos}
                      </label>
                      <input
                        id="pre-apellidos"
                        type="text"
                        autoComplete="family-name"
                        aria-invalid={!!errors.apellidos}
                        aria-describedby={errors.apellidos ? 'pre-apellidos-error' : undefined}
                        className={fieldClass(!!errors.apellidos)}
                        {...filtered(
                          register('apellidos', {
                            required: t.requerido,
                            pattern: { value: LETTERS_RE, message: t.hintLetras },
                          }),
                          stripNonLetters
                        )}
                      />
                      <FieldError id="pre-apellidos-error" message={errors.apellidos?.message} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="pre-celular">
                      {t.celular}
                    </label>
                    <div className="flex gap-2">
                      <span className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-300 px-3 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/30">
                        <activePrefix.Flag
                          aria-hidden="true"
                          className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover"
                        />
                        <select
                          aria-label={t.prefijo}
                          className="bg-transparent py-2.5 text-sm font-semibold text-primary-dark outline-none"
                          {...register('prefijo')}
                        >
                          {prefixes.map((item) => (
                            <option key={item.code} value={item.code}>
                              {item.code}
                            </option>
                          ))}
                        </select>
                      </span>
                      <input
                        id="pre-celular"
                        type="tel"
                        inputMode="numeric"
                        maxLength={15}
                        autoComplete="tel-national"
                        aria-invalid={!!errors.celular}
                        aria-describedby={errors.celular ? 'pre-celular-error' : undefined}
                        className={fieldClass(!!errors.celular)}
                        {...filtered(
                          register('celular', {
                            required: t.requerido,
                            pattern: { value: PHONE_RE, message: t.hintCelular },
                          }),
                          stripNonDigits
                        )}
                      />
                    </div>
                    <FieldError id="pre-celular-error" message={errors.celular?.message} />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="pre-correo">
                      {t.correo}
                    </label>
                    <input
                      id="pre-correo"
                      type="email"
                      autoComplete="email"
                      aria-invalid={!!errors.correo}
                      aria-describedby={errors.correo ? 'pre-correo-error' : undefined}
                      className={fieldClass(!!errors.correo)}
                      {...filtered(
                        register('correo', {
                          required: t.requerido,
                          pattern: { value: EMAIL_RE, message: t.hintCorreo },
                        }),
                        stripSpaces
                      )}
                    />
                    <FieldError id="pre-correo-error" message={errors.correo?.message} />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="pre-carrera">
                      {t.carrera}
                    </label>
                    <select
                      id="pre-carrera"
                      aria-invalid={!!errors.carrera}
                      aria-describedby={errors.carrera ? 'pre-carrera-error' : undefined}
                      className={`${fieldClass(!!errors.carrera)} bg-white`}
                      {...register('carrera', { required: t.requerido })}
                    >
                      <option value="" disabled>
                        {t.carreraPlaceholder}
                      </option>
                      {careers.map((career) => (
                        <option key={career.slug} value={career.slug}>
                          {career.nombre}
                        </option>
                      ))}
                    </select>
                    <FieldError id="pre-carrera-error" message={errors.carrera?.message} />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-secondary/30 transition hover:-translate-y-px hover:bg-secondary-dark disabled:pointer-events-none disabled:opacity-60"
                  >
                    <FaPaperPlane size={13} />
                    {t.submit}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
      {message}
    </p>
  );
}
