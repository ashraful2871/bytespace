import Image from "next/image";
import { cn } from "@/lib/cn";

type AvatarStackProps = {
  avatars: string[];
  more: string;
  moreLabel?: string;
  size: number;
  step: number;
  bubble?: "lime" | "dark";
  className?: string;
  bubbleClassName?: string;
};

const bubbles = {
  lime: "bg-secondary-400 text-neutral-950",
  dark: "bg-neutral-950 text-white",
};

export default function AvatarStack({
  avatars,
  more,
  moreLabel,
  size,
  step,
  bubble = "lime",
  className,
  bubbleClassName,
}: AvatarStackProps) {
  const overlap = size - step;
  const text =
    bubbleClassName ??
    (size >= 40 ? "text-xs/[1.5] font-bold" : "type-label-xs");

  return (
    <div className={cn("flex items-center", className)}>
      {avatars.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={size}
          height={size}
          className="relative shrink-0 rounded-full object-cover"
          style={{
            width: size,
            height: size,
            marginLeft: i === 0 ? 0 : -overlap,
          }}
        />
      ))}
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-full",
          bubbles[bubble],
          text,
        )}
        style={{ width: size, height: size, marginLeft: -overlap }}
      >
        {more}
        {moreLabel && <span className="sr-only"> {moreLabel}</span>}
      </span>
    </div>
  );
}
