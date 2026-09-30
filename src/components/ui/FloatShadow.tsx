import Image from "next/image";

// How far the baked shadow reaches past the picture's box; scripts/build-assets.mjs pads the file by the same amounts.
const PAD = { left: 64, top: 40, right: 160, bottom: 184 };

type FloatShadowProps = {
  /** A shadow baked by `npm run assets` (bakeShadow), e.g. /images/hero/student-shadow.webp. */
  src: string;
  /** The picture's box in the parent's coordinates. */
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Figma Shadow A under a cut-out picture, as a pre-rendered image. Render it just before the picture, on the same
 * box. It replaces a chain of eight drop-shadow() filters, which Chrome re-blurs on every scroll frame.
 */
export default function FloatShadow({ src, x, y, width, height }: FloatShadowProps) {
  const w = width + PAD.left + PAD.right;
  const h = height + PAD.top + PAD.bottom;

  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={w}
      height={h}
      unoptimized
      className="pointer-events-none absolute max-w-none select-none"
      style={{ left: x - PAD.left, top: y - PAD.top, width: w, height: h }}
    />
  );
}
