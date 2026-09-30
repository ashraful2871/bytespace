import type { IconProps } from "./types";

export function PlayArrowIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M320-203v-560l440 280-440 280Z" />
    </svg>
  );
}
