import Image from "next/image";
import { cn } from "@/lib/cn";

type OrnamentProps = {
  shape:
    | "spring-a"
    | "spring-b"
    | "torus"
    | "pyramid"
    | "cylinder"
    | "cta-cone";
  tint: "lime" | "white";
  size: number;
  x: number;
  y: number;
  mirrored?: boolean;
  className?: string;
};

export default function Ornament({
  shape,
  tint,
  size,
  x,
  y,
  mirrored = false,
  className,
}: OrnamentProps) {
  return (
    <Image
      src={`/images/ornaments/${shape}-${tint}-${size}${mirrored ? "-flip" : ""}.webp`}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={cn(
        "pointer-events-none absolute max-w-none select-none",
        className,
      )}
      style={{ left: x, top: y, width: size, height: size }}
    />
  );
}
