"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { isCurrent, type NavLink as NavLinkData } from "@/data/navigation";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "href" | "className"> & {
  link: NavLinkData;
  className?: string;
  /** Replaces `inactiveClassName` while the link matches the current pathname. */
  activeClassName?: string;
  inactiveClassName?: string;
};

/** A nav link that sets `aria-current="page"` from the pathname, so the Header can stay a Server Component. */
export default function NavLink({ link, className = "", activeClassName = "", inactiveClassName = "", ...props }: NavLinkProps) {
  const current = isCurrent(usePathname(), link);

  return (
    <Link
      href={link.href}
      aria-current={current ? "page" : undefined}
      className={`${className} ${current ? activeClassName : inactiveClassName}`}
      {...props}
    >
      {link.label}
    </Link>
  );
}
