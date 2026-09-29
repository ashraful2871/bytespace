type GlowProps = {
  /** lime: secondary-500 · blue: primary-800. */
  tone: "lime" | "blue";
  /** The Figma ellipse's fill opacity. */
  opacity: number;
  /** The ellipse's box in the parent's (Figma frame) coordinates; `size` is its diameter. */
  x: number;
  y: number;
  size: number;
  className?: string;
};

const colors = { lime: "var(--color-secondary-500)", blue: "var(--color-primary-800)" };

// Every Figma glow ellipse has the same radial fill: alpha 1 / 0.23 / 0.06 / 0 at 0 / 53 / 75 / 100%.
const stops = [
  [1, 0],
  [0.23, 53],
  [0.06, 75],
] as const;

/**
 * A soft background glow, drawn as a CSS radial gradient on the ellipse's box. The Figma layer also has a 20px blur,
 * which is left out: the fill already fades to 0 at its edge, and a blur filter (or the blurred SVG export) is
 * expensive to paint while scrolling.
 */
export default function Glow({ tone, opacity, x, y, size, className = "" }: GlowProps) {
  const gradient = stops
    .map(([alpha, at]) => `color-mix(in srgb, ${colors[tone]} ${+(alpha * opacity * 100).toFixed(2)}%, transparent) ${at}%`)
    .join(", ");

  return (
    <div
      className={`pointer-events-none absolute ${className}`}
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
