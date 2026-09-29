import Image from "next/image";
import Link from "next/link";
import type { MouseEventHandler } from "react";

type LogoProps = {
  /** light: on blue (header) · dark: on white (footer) · mark: the lime symbol only (28.875×31.5). */
  variant?: "light" | "dark" | "mark";
  /** Where the logo links to; pass null for a plain, unlinked logo. */
  href?: string | null;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

// The mark from Figma (1:1788 / 34:1262; both are identical).
function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28.875 31.5"
      width={28.875}
      height={31.5}
      fill="currentColor"
      aria-hidden
      className={`shrink-0 text-secondary-400 ${className}`}
    >
      <path d="M10.5 10.5C10.5 4.70101 5.79899 0 0 0V21C0 26.799 4.70101 31.5 10.5 31.5V10.5Z" />
      <path d="M18.375 10.5C24.174 10.5 28.875 15.201 28.875 21H21C15.201 21 10.5 16.299 10.5 10.5L18.375 10.5Z" />
      <path d="M18.375 31.5C24.174 31.5 28.875 26.799 28.875 21H21C15.201 21 10.5 25.701 10.5 31.5L18.375 31.5Z" />
    </svg>
  );
}

export default function Logo({ variant = "light", href = "/", className = "", onClick }: LogoProps) {
  // TODO(phase 00 manual export): swap the full-logo PNGs for the inline SVG with the outlined wordmark
  // (mark at 0,0, wordmark at +37,+7, 171×37 overall).
  const content =
    variant === "mark" ? (
      <Mark />
    ) : (
      <Image
        src={variant === "light" ? "/images/logo-light.png" : "/images/logo-dark.png"}
        alt=""
        width={171}
        height={37}
        preload={variant === "light"}
      />
    );

  if (href === null) {
    return (
      <span role="img" aria-label="ByteSpace" className={`inline-flex shrink-0 ${className}`}>
        {content}
      </span>
    );
  }

  return (
    <Link href={href} onClick={onClick} aria-label="ByteSpace home" className={`inline-flex shrink-0 tap-target ${className}`}>
      {content}
    </Link>
  );
}
