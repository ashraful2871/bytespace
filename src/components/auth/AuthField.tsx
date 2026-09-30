import type { ComponentProps } from "react";

type AuthFieldProps = Omit<ComponentProps<"input">, "id"> & {
  id: string;
  label: string;
};

/**
 * Figma 47:369: a label-s label, 8px, then a 453×52 input (1px neutral-200 border, 12px radius, 24px inset,
 * body-l). The placeholder is neutral-500, following the approved hero search deviation (Figma neutral-400).
 */
export default function AuthField({ id, label, className = "", ...props }: AuthFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="type-label-s leading-[17px] text-neutral-950">
        {label}
      </label>
      <input
        id={id}
        className="h-[52px] w-full min-w-0 rounded-thumb border border-neutral-200 bg-white px-6 type-body-l text-neutral-950 transition-colors outline-hidden placeholder:text-neutral-500 hover:border-neutral-300 focus-visible:border-primary-800 focus-visible:ring-2 focus-visible:ring-primary-800/20"
        {...props}
      />
    </div>
  );
}
