import { SearchIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type SearchFieldProps = {
  placeholder: string;
  defaultValue?: string;
  className?: string;
};

export default function SearchField({
  placeholder,
  defaultValue,
  className,
}: SearchFieldProps) {
  return (
    <label
      className={cn(
        "flex h-[52px] items-center gap-2 rounded-pill bg-white px-6 text-neutral-400 focus-within:ring-2 focus-within:ring-secondary-400",
        className,
      )}
    >
      <SearchIcon className="shrink-0" />
      <span className="sr-only">Search courses</span>
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent type-body-l text-neutral-950 outline-hidden placeholder:text-neutral-500"
      />
    </label>
  );
}
