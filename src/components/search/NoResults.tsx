import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type NoResultsProps = {
  clearHref: string;
  className?: string;
};

export default function NoResults({ clearHref, className }: NoResultsProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-6 py-16 text-center",
        className,
      )}
    >
      <p className="type-body-l text-ink">No courses found</p>
      <ButtonLink href={clearHref} variant="outline">
        Clear filters
      </ButtonLink>
    </div>
  );
}
