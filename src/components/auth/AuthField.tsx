import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type AuthFieldProps = Omit<ComponentProps<"input">, "id"> & {
  id: string;
  label: string;
};

export default function AuthField({
  id,
  label,
  className,
  ...props
}: AuthFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="type-label-s leading-[17px] text-neutral-950"
      >
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
