import { StarIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

const tones = {
  lime: "text-secondary-400",
  blue: "text-primary-800",
  dark: "text-neutral-700",
};

type RatingStarsProps = {
  value: number;
  size?: number;
  gap?: number;
  tone?: keyof typeof tones;
  className?: string;
};

function FiveStars({ size, gap }: { size: number; gap: number }) {
  return (
    <span className="flex" style={{ gap }}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} size={size} className="shrink-0" />
      ))}
    </span>
  );
}

export default function RatingStars({
  value,
  size = 24,
  gap = 4,
  tone = "lime",
  className,
}: RatingStarsProps) {
  const rating = Math.min(5, Math.max(0, value));
  const filledWidth = Math.floor(rating) * (size + gap) + (rating % 1) * size;

  return (
    <span
      role="img"
      aria-label={`Rated ${value} out of 5`}
      className={cn("relative inline-flex", className)}
    >
      <span className="text-neutral-100">
        <FiveStars size={size} gap={gap} />
      </span>
      <span
        className={cn("absolute inset-y-0 left-0 overflow-hidden", tones[tone])}
        style={{ width: filledWidth }}
      >
        <FiveStars size={size} gap={gap} />
      </span>
    </span>
  );
}
