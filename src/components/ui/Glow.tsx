type GlowProps = {
  /** A Figma glow SVG from public/images/svg/ (it carries its own blur filter). */
  src: string;
  x: number;
  y: number;
  /** Width in px; also the height unless `height` is given. */
  size: number;
  height?: number;
  className?: string;
};

/** A soft background glow placed absolutely in the parent's (Figma frame) coordinates. */
export default function Glow({ src, x, y, size, height = size, className = "" }: GlowProps) {
  return (
    // A plain <img>: the SVG's filter must render as-is, and next/image adds nothing for vectors.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      width={size}
      height={height}
      className={`pointer-events-none absolute max-w-none select-none ${className}`}
      style={{ left: x, top: y, width: size, height }}
    />
  );
}
