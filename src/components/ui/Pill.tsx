import type { ReactNode } from "react";

type PillProps = {
  /** lime: small badge (e.g. "New") · glass: frosted course-card stat. */
  variant?: "lime" | "glass";
  className?: string;
  children: ReactNode;
};

const variants = {
  lime: "bg-secondary-500 px-2 py-0.5 text-[10px]/[20px] font-medium text-neutral-950",
  glass: "gap-1 bg-track/60 px-3 py-1.5 type-label-xs text-body backdrop-blur-[4px]",
};

export default function Pill({ variant = "lime", className = "", children }: PillProps) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-pill whitespace-nowrap ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
