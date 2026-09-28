import { StarIcon } from "@/components/icons";

type RatingStarsProps = {
  /** 0–5; fractions fill part of a star. */
  value: number;
  size?: number;
  /** Colour of the filled stars; the empty ones sit underneath in a muted tone. */
  tone?: "lime" | "blue";
  className?: string;
};

const tones = {
  lime: "text-secondary-400",
  blue: "text-primary-800",
};

const stars = (size: number) =>
  Array.from({ length: 5 }, (_, i) => <StarIcon key={i} size={size} className="shrink-0" />);

export default function RatingStars({ value, size = 24, tone = "lime", className = "" }: RatingStarsProps) {
  const pct = (Math.min(5, Math.max(0, value)) / 5) * 100;

  return (
    <span role="img" aria-label={`Rated ${value} out of 5`} className={`relative inline-flex ${className}`}>
      <span className="flex text-neutral-100">{stars(size)}</span>
      <span className={`absolute inset-y-0 left-0 flex overflow-hidden ${tones[tone]}`} style={{ width: `${pct}%` }}>
        {stars(size)}
      </span>
    </span>
  );
}
