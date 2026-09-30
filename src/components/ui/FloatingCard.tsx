import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type FloatingCardProps = {
  tone?: "white" | "blue" | "lime";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const tones = {
  white: "bg-white text-neutral-950",
  blue: "bg-primary-800 text-neutral-50",
  lime: "bg-secondary-400 text-neutral-950",
};

export default function FloatingCard({
  tone = "white",
  className,
  style,
  children,
}: FloatingCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-float p-4",
        tones[tone],
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
