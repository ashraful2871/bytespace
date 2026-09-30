import { cn } from "@/lib/cn";

const tracks = {
  default: "bg-track",
  white: "bg-white",
  muted: "bg-neutral-100",
};

type ProgressBarProps = {
  value: number;
  label: string;
  track?: keyof typeof tracks;
  className?: string;
};

export default function ProgressBar({
  value,
  label,
  track = "default",
  className,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "h-2 overflow-hidden rounded-pill",
        tracks[track],
        className,
      )}
    >
      <div
        className="h-full rounded-pill bg-secondary-400"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
