import Image from "next/image";
import Link from "next/link";
import type { MouseEventHandler } from "react";
import { cn } from "@/lib/cn";

type LogoProps = {
  variant?: "light" | "dark" | "mark";
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

function Mark() {
  return (
    <svg
      viewBox="0 0 28.875 31.5"
      width={28.875}
      height={31.5}
      fill="currentColor"
      aria-hidden
      className="shrink-0 text-secondary-400"
    >
      <path d="M10.5 10.5C10.5 4.70101 5.79899 0 0 0V21C0 26.799 4.70101 31.5 10.5 31.5V10.5Z" />
      <path d="M18.375 10.5C24.174 10.5 28.875 15.201 28.875 21H21C15.201 21 10.5 16.299 10.5 10.5L18.375 10.5Z" />
      <path d="M18.375 31.5C24.174 31.5 28.875 26.799 28.875 21H21C15.201 21 10.5 25.701 10.5 31.5L18.375 31.5Z" />
    </svg>
  );
}

export default function Logo({
  variant = "light",
  className,
  onClick,
}: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="ByteSpace home"
      className={cn("inline-flex shrink-0 tap-target", className)}
    >
      {variant === "mark" ? (
        <Mark />
      ) : (
        <Image
          src={
            variant === "light" ? "/images/logo.png" : "/images/logo-dark.png"
          }
          alt=""
          width={171}
          height={37}
        />
      )}
    </Link>
  );
}
