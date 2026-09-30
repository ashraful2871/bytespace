import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export const chipStyles = {
  base: "tap-target inline-flex shrink-0 items-center justify-center rounded-pill px-4 whitespace-nowrap type-label-m transition-colors focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden",
  sizes: { md: "h-[43px] gap-2", lg: "h-12 gap-1" },
  active: "bg-secondary-400 text-neutral-950",
  inactive: "bg-neutral-50 text-neutral-700 hover:bg-neutral-100",
};

type ChipSize = keyof typeof chipStyles.sizes;

function chipClasses(active: boolean, size: ChipSize, className?: string) {
  return cn(
    chipStyles.base,
    chipStyles.sizes[size],
    active ? chipStyles.active : chipStyles.inactive,
    className,
  );
}

type ChipLinkProps = ComponentProps<typeof Link> & {
  active?: boolean;
  size?: ChipSize;
};
type ChipButtonProps = Omit<ComponentProps<"button">, "aria-pressed"> & {
  href?: undefined;
  active?: boolean;
  size?: ChipSize;
};

export default function Chip(props: ChipLinkProps | ChipButtonProps) {
  if (props.href !== undefined) {
    const { active = false, size = "md", className, ...rest } = props;
    return (
      <Link
        aria-current={active ? "true" : undefined}
        className={chipClasses(active, size, className)}
        {...rest}
      />
    );
  }

  const {
    active = false,
    size = "md",
    className,
    type = "button",
    ...rest
  } = props;
  return (
    <button
      type={type}
      aria-pressed={active}
      className={chipClasses(active, size, className)}
      {...rest}
    />
  );
}
