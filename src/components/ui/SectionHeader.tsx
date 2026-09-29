import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: ReactNode;
  description: ReactNode;
  /** "display" = 44px two-line titles (heading-m), "title" = 36px single-line titles. */
  size?: "display" | "title";
  className?: string;
};

const titles = {
  display: "type-heading-m",
  title: "type-title",
};

/** Centred section title + intro copy (16px apart), as used by Courses and Learning Paths. */
export default function SectionHeader({ title, description, size = "display", className = "" }: SectionHeaderProps) {
  return (
    <div className={`mx-auto flex flex-col items-center gap-4 text-center ${className}`}>
      <h2 className={`text-balance text-ink max-md:text-[30px]/[1.25] ${titles[size]}`}>{title}</h2>
      <p className="max-w-[917px] type-body-m text-neutral-500 md:type-body-l">{description}</p>
    </div>
  );
}
