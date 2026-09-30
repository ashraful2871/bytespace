import type { IconProps } from "./types";

export function ChevronRightIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z" />
    </svg>
  );
}
