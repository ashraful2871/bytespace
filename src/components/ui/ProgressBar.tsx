type ProgressBarProps = {
  /** 0–100; values outside are clamped. */
  value: number;
  /** Accessible name, e.g. "Learning progress". */
  label: string;
  /** Use "white" on the blue bands, where the default grey track disappears; "muted" is the course pages' neutral-100. */
  track?: keyof typeof tracks;
  className?: string;
};

const tracks = {
  default: "bg-track",
  white: "bg-white",
  muted: "bg-neutral-100",
};

export default function ProgressBar({ value, label, track = "default", className = "" }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-2 overflow-hidden rounded-pill ${tracks[track]} ${className}`}
    >
      <div className="h-full rounded-pill bg-secondary-400" style={{ width: `${pct}%` }} />
    </div>
  );
}
