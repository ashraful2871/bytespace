import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const titleSizes = {
  display: "type-heading-m",
  title: "type-title",
};

type SectionHeaderProps = {
  title: ReactNode;
  description: ReactNode;
  size?: keyof typeof titleSizes;
  className?: string;
};

export default function SectionHeader({
  title,
  description,
  size = "display",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mx-auto flex flex-col items-center gap-4 text-center",
        className,
      )}
    >
      <h2
        className={cn(
          "text-balance text-ink max-md:text-[30px]/[1.25]",
          titleSizes[size],
        )}
      >
        {title}
      </h2>
      <p className="max-w-[917px] type-body-m text-neutral-500 md:type-body-l">
        {description}
      </p>
    </div>
  );
}
