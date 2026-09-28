import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: ReactNode;
  description: ReactNode;
  /** "display" = 44px two-line titles, "title" = 36px single-line titles. */
  size?: "display" | "title";
  className?: string;
};

/** Centred section title + intro copy, as used by Courses and Learning Paths. */
export default function SectionHeader({ title, description, size = "display", className = "" }: SectionHeaderProps) {
  return (
    <div className={`mx-auto text-center ${className}`}>
      <h2
        className={`font-poppins text-[30px]/[1.25] font-semibold tracking-[-0.01em] text-ink ${
          size === "display" ? "md:text-display" : "md:text-title"
        }`}
      >
        {title}
      </h2>
      <p
        className="mx-auto mt-4 max-w-[920px] text-base leading-[1.6] text-neutral-400 md:mt-[15px] md:text-lg md:leading-[29px]"
      >
        {description}
      </p>
    </div>
  );
}
