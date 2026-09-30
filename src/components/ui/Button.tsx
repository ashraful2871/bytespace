import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "outline-light" | "white";
type Size = "lg" | "md" | "sm";

type StyleProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-pill whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-secondary-400 text-neutral-950 hover:bg-secondary-300",
  outline:
    "border border-neutral-200 bg-white text-neutral-950 hover:bg-neutral-50",
  "outline-light": "border border-white/40 text-neutral-50 hover:bg-white/10",
  white: "bg-white text-neutral-950 hover:bg-neutral-50",
};

const sizes: Record<Size, string> = {
  lg: "h-[46px] px-6 py-3 type-label-l",
  md: "h-12 px-4 type-label-m [&_svg]:size-6",
  sm: "h-10 px-6 type-label-m",
};

const defaultSize: Record<Variant, Size> = {
  primary: "lg",
  outline: "md",
  "outline-light": "lg",
  white: "sm",
};

export function buttonClasses({
  variant = "primary",
  size,
  fullWidth = false,
}: StyleProps = {}) {
  return cn(
    base,
    variants[variant],
    sizes[size ?? defaultSize[variant]],
    fullWidth && "w-full",
  );
}

type ButtonProps = ComponentProps<"button"> & StyleProps;

export function Button({
  variant,
  size,
  fullWidth,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonClasses({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & StyleProps;

export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonClasses({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
}
