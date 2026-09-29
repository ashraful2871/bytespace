import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: ReactNode;
  description: ReactNode;
  /** "display" = 44px two-line titles (heading-m), "title" = 36px single-line titles. */
  size?: "display" | "title";
  className?: string;
};

// From md the line heights are rounded to Figma's frame heights (106 / 43 / 58 instead of 105.6 / 43.2 / 57.6),
// so the sections below land on whole pixels.
const titles = {
  display: "type-heading-m md:leading-[53px]",
  title: "type-title md:leading-[43px]",
};

/** Centred section title + intro copy (16px apart), as used by Courses and Learning Paths. */
export default function SectionHeader({ title, description, size = "display", className = "" }: SectionHeaderProps) {
  return (
    <div className={`mx-auto flex flex-col items-center gap-4 text-center ${className}`}>
      <h2 className={`text-balance text-ink max-md:text-[30px]/[1.25] ${titles[size]}`}>{title}</h2>
      <p className="max-w-[917px] type-body-l text-neutral-400 max-md:text-base md:leading-[29px]">{description}</p>
    </div>
  );
}
