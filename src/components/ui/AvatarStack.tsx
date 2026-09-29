import Image from "next/image";

type AvatarStackProps = {
  avatars: string[];
  /** Label shown in the bubble at the end of the stack, e.g. "26+". */
  more: string;
  size: number;
  /** Horizontal distance between avatar centres. */
  step: number;
  /** lime: default · dark: the black bubble with white text (Features card). */
  bubble?: "lime" | "dark";
  className?: string;
  /** Overrides the bubble's default text style (label-xs for small stacks, 12px Bold/1.5 from 40px up). */
  bubbleClassName?: string;
};

const bubbles = {
  lime: "bg-secondary-400 text-neutral-950",
  dark: "bg-neutral-950 text-white",
};

export default function AvatarStack({
  avatars,
  more,
  size,
  step,
  bubble = "lime",
  className = "",
  bubbleClassName,
}: AvatarStackProps) {
  const overlap = size - step;
  // "26+" on the 32px course-card stack is label-xs; "2K+" on the 43px stacks is 12px Bold/1.5.
  const text = bubbleClassName ?? (size >= 40 ? "text-xs/[1.5] font-bold" : "type-label-xs");

  return (
    <div className={`flex items-center ${className}`}>
      {avatars.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={size}
          height={size}
          className="relative shrink-0 rounded-full object-cover"
          style={{ width: size, height: size, marginLeft: i === 0 ? 0 : -overlap }}
        />
      ))}
      <span
        className={`relative flex shrink-0 items-center justify-center rounded-full ${bubbles[bubble]} ${text}`}
        style={{ width: size, height: size, marginLeft: -overlap }}
      >
        {more}
      </span>
    </div>
  );
}
