import type { IconProps } from "./types";

export function SignalCellularAltIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M200-160v-240h100v240H200Zm250 0v-440h100v440H450Zm250 0v-640h100v640H700Z" />
    </svg>
  );
}
