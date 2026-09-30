import { cn } from "@/lib/cn";

type GlowProps = {
  tone: "lime" | "blue";
  opacity: number;
  x: number;
  y: number;
  size: number;
  className?: string;
};

const colors = {
  lime: "var(--color-secondary-500)",
  blue: "var(--color-primary-800)",
};

const stops = [
  [1, 0],
  [0.23, 53],
  [0.06, 75],
] as const;

export default function Glow({
  tone,
  opacity,
  x,
  y,
  size,
  className,
}: GlowProps) {
  const gradient = stops
    .map(
      ([alpha, at]) =>
        `color-mix(in srgb, ${colors[tone]} ${+(alpha * opacity * 100).toFixed(2)}%, transparent) ${at}%`,
    )
    .join(", ");

  return (
    <div
      className={cn("pointer-events-none absolute", className)}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundImage: `radial-gradient(circle closest-side, ${gradient}, transparent)`,
      }}
    />
  );
}
