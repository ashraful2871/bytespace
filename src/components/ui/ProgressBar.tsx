type ProgressBarProps = {
  /** 0–100; values outside are clamped. */
  value: number;
  /** Accessible name, e.g. "Learning progress". */
  label: string;
  /** Use "white" on the blue bands, where the default grey track disappears. */
  track?: "default" | "white";
  className?: string;
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
      className={`h-2 overflow-hidden rounded-pill ${track === "white" ? "bg-white" : "bg-track"} ${className}`}
    >
      <div className="h-full rounded-pill bg-secondary-400" style={{ width: `${pct}%` }} />
    </div>
  );
}
