"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { isCurrent, type NavLink as NavLinkData } from "@/data/navigation";
import { cn } from "@/lib/cn";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "href" | "className"> & {
  link: NavLinkData;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
};

export default function NavLink({
  link,
  className,
  activeClassName,
  inactiveClassName,
  ...props
}: NavLinkProps) {
  const current = isCurrent(usePathname(), link);

  return (
    <Link
      href={link.href}
      aria-current={current ? "page" : undefined}
      className={cn(className, current ? activeClassName : inactiveClassName)}
      {...props}
    >
      {link.label}
    </Link>
  );
}
