import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type DropdownProps = {
  summary: ReactNode;
  summaryClassName: string;
  panelClassName?: string;
  name?: string;
  className?: string;
  children: ReactNode;
};

export default function Dropdown({
  summary,
  summaryClassName,
  panelClassName = "left-0",
  name,
  className,
  children,
}: DropdownProps) {
  return (
    <details name={name} className={cn("group relative", className)}>
      <summary
        className={cn(
          "cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden",
          summaryClassName,
        )}
      >
        {summary}
      </summary>
      <ul
        className={cn(
          "absolute top-full z-30 mt-2 flex min-w-full flex-col rounded-float border border-neutral-200 bg-white p-2 text-neutral-950 shadow-[0_12px_32px_rgb(4_8_25/0.12)]",
          panelClassName,
        )}
      >
        {children}
      </ul>
    </details>
  );
}

type DropdownLinkProps = ComponentProps<typeof Link> & { active?: boolean };

export function DropdownLink({
  active = false,
  className,
  ...props
}: DropdownLinkProps) {
  return (
    <li>
      <Link
        aria-current={active ? "true" : undefined}
        className={cn(
          "flex min-h-11 items-center rounded-thumb px-3 py-2 type-body-m transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:outline-hidden aria-[current]:bg-secondary-400/30 aria-[current]:font-medium",
          className,
        )}
        {...props}
      />
    </li>
  );
}
