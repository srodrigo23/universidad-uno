import { COCHABAMBA_D, COCHABAMBA_VIEW_BOX } from '../data/mapaBolivia';

interface Props {
  className?: string;
}

/** Silueta suelta del departamento. Sin animación ni JS: solo textura de marca. */
export default function CochabambaWatermark({ className = '' }: Props) {
  return (
    <svg
      viewBox={COCHABAMBA_VIEW_BOX}
      aria-hidden='true'
      className={`pointer-events-none ${className}`}
    >
      <path d={COCHABAMBA_D} fill='currentColor' />
    </svg>
  );
}
