import type { IconProps } from "./types";

export function KeyboardArrowDownIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z" />
    </svg>
  );
}
