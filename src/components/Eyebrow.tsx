import type { IconType } from 'react-icons';

interface Props {
  icon: IconType;
  label: string;
}

export default function Eyebrow({ icon: Icon, label }: Props) {
  return (
    <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide text-secondary uppercase">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10">
        <Icon size={12} />
      </span>
      {label}
    </p>
  );
}
