import { StarIcon } from "@/components/icons";

type RatingStarsProps = {
  /** 0–5; fractions fill part of a star. */
  value: number;
  size?: number;
  /** Space between stars in px (Figma uses 4 everywhere). */
  gap?: number;
  /** Colour of the filled stars; the empty ones sit underneath in a muted tone. */
  tone?: "lime" | "blue" | "dark";
  className?: string;
};

const tones = {
  lime: "text-secondary-400",
  blue: "text-primary-800",
  dark: "text-neutral-700",
};

const stars = (size: number, gap: number) => (
  <span className="flex" style={{ gap }}>
    {Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} size={size} className="shrink-0" />
    ))}
  </span>
);

export default function RatingStars({ value, size = 24, gap = 4, tone = "lime", className = "" }: RatingStarsProps) {
  const v = Math.min(5, Math.max(0, value));
  // Whole stars plus the fraction of the next one, so the gaps don't skew partial values.
  const fill = Math.floor(v) * (size + gap) + (v % 1) * size;

  return (
    <span role="img" aria-label={`Rated ${value} out of 5`} className={`relative inline-flex ${className}`}>
      <span className="text-neutral-100">{stars(size, gap)}</span>
      <span className={`absolute inset-y-0 left-0 overflow-hidden ${tones[tone]}`} style={{ width: fill }}>
        {stars(size, gap)}
      </span>
    </span>
  );
}
