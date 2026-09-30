import type { IconProps } from "./types";

export function SortIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M120-240v-60h240v60H120Zm0-210v-60h480v60H120Zm0-210v-60h720v60H120Z" />
    </svg>
  );
}
