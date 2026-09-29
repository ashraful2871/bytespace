import type { CSSProperties, ReactNode } from "react";

type FloatingCardProps = {
  /** white: default card · blue: primary-800 card with light text. */
  tone?: "white" | "blue";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const tones = {
  white: "bg-white text-neutral-950",
  blue: "bg-primary-800 text-neutral-50",
};

/**
 * The card base used by the hero and Features compositions (content and position via props). Figma gives it a 10px
 * background blur, but both fills are opaque, so it would never show; it is left out because a backdrop-filter
 * re-blurs on every scroll frame.
 */
export default function FloatingCard({ tone = "white", className = "", style, children }: FloatingCardProps) {
  return (
    <div className={`flex flex-col gap-2 rounded-float p-4 ${tones[tone]} ${className}`} style={style}>
      {children}
    </div>
  );
}
