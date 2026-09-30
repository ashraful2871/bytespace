import Link from "next/link";
import type { ComponentProps } from "react";

/** The chip's classes, split so a pathname-aware link (the course tabs' NavLink) can apply the active state itself. */
export const chipStyles = {
  base: "tap-target inline-flex shrink-0 items-center justify-center rounded-pill px-4 whitespace-nowrap type-label-m transition-colors focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden",
  /** md is the 43px text chip; lg is the 48px icon chip (the Reviews star filters, a 4px icon–label gap). */
  sizes: { md: "h-[43px] gap-2", lg: "h-12 gap-1" },
  active: "bg-secondary-400 text-neutral-950",
  inactive: "bg-neutral-50 text-neutral-700 hover:bg-neutral-100",
};

type ChipSize = keyof typeof chipStyles.sizes;

const chipClasses = (active: boolean, size: ChipSize) =>
  `${chipStyles.base} ${chipStyles.sizes[size]} ${active ? chipStyles.active : chipStyles.inactive}`;

type ChipLinkProps = ComponentProps<typeof Link> & { active?: boolean; size?: ChipSize };
type ChipButtonProps = Omit<ComponentProps<"button">, "aria-pressed"> & {
  href?: undefined;
  active?: boolean;
  size?: ChipSize;
};

/**
 * Filter chip. With `href` it renders a link marked `aria-current` when active (URL-state filters, D2);
 * without one it renders a toggle button with `aria-pressed`.
 */
export default function Chip(props: ChipLinkProps | ChipButtonProps) {
  if (props.href !== undefined) {
    const { active = false, size = "md", className = "", ...rest } = props;
    return (
      <Link aria-current={active ? "true" : undefined} className={`${chipClasses(active, size)} ${className}`} {...rest} />
    );
  }
  const { active = false, size = "md", className = "", type = "button", ...rest } = props;
  return <button type={type} aria-pressed={active} className={`${chipClasses(active, size)} ${className}`} {...rest} />;
}
