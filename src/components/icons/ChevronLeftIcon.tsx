import type { IconProps } from "./types";

export function ChevronLeftIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z" />
    </svg>
  );
}
