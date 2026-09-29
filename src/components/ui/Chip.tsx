import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "tap-target inline-flex h-[43px] shrink-0 items-center justify-center gap-2 rounded-pill px-4 whitespace-nowrap type-label-m transition-colors focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden";

const chipClasses = (active: boolean) =>
  `${base} ${active ? "bg-secondary-400 text-neutral-950" : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"}`;

type ChipLinkProps = ComponentProps<typeof Link> & { active?: boolean };
type ChipButtonProps = Omit<ComponentProps<"button">, "aria-pressed"> & { href?: undefined; active?: boolean };

/**
 * Filter chip. With `href` it renders a link marked `aria-current` when active (URL-state filters, D2);
 * without one it renders a toggle button with `aria-pressed`.
 */
export default function Chip(props: ChipLinkProps | ChipButtonProps) {
  if (props.href !== undefined) {
    const { active = false, className = "", ...rest } = props;
    return <Link aria-current={active ? "true" : undefined} className={`${chipClasses(active)} ${className}`} {...rest} />;
  }
  const { active = false, className = "", type = "button", ...rest } = props;
  return <button type={type} aria-pressed={active} className={`${chipClasses(active)} ${className}`} {...rest} />;
}
