interface Props {
  /** Color de la sección que sigue, para que el degradado aterrice en él. */
  color?: string;
}

/** Difuminado inferior que funde el hero con la siguiente sección. */
export default function HeroBottomFade({ color = '#fff' }: Props) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
      style={{
        backgroundImage: `linear-gradient(to top, ${color} 0%, color-mix(in srgb, ${color} 45%, transparent) 45%, transparent 100%)`,
      }}
    />
  );
}
