import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CourseSectionProps = {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
};

export default function CourseSection({
  id,
  title,
  className,
  children,
}: CourseSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className={cn("flex flex-col gap-6", className)}
    >
      <h2
        id={headingId}
        className="type-heading-xs leading-[1.2] text-neutral-950"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
