import Image from "next/image";

const PAD = { left: 64, top: 40, right: 160, bottom: 184 };

type FloatShadowProps = {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function FloatShadow({
  src,
  x,
  y,
  width,
  height,
}: FloatShadowProps) {
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
