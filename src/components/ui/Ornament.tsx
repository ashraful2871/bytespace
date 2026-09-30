import Image from "next/image";

type OrnamentProps = {
  shape: "spring-a" | "spring-b" | "torus" | "pyramid" | "cylinder" | "cta-cone";
  tint: "lime" | "white";
  /** Display size in px (square); also part of the file name, e.g. torus-lime-342.webp. */
  size: number;
  /** Position in the parent's coordinates (usually a `design-stage`, i.e. the 1440 frame). */
  x: number;
  y: number;
  /** Uses the baked `-flip` file; ornaments are never flipped with CSS. */
  mirrored?: boolean;
  className?: string;
};

/** A tinted 3D shape from public/images/ornaments/, placed absolutely in Figma coordinates. */
export default function Ornament({ shape, tint, size, x, y, mirrored = false, className = "" }: OrnamentProps) {
  return (
    <Image
      src={`/images/ornaments/${shape}-${tint}-${size}${mirrored ? "-flip" : ""}.webp`}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={`pointer-events-none absolute max-w-none select-none ${className}`}
      style={{ left: x, top: y, width: size, height: size }}
    />
  );
}
