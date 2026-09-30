import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { coursesHref, type CourseQuery } from "@/lib/course-search";
import { cn } from "@/lib/cn";

type PaginationProps = {
  query: CourseQuery;
  page: number;
  pageCount: number;
  visiblePages?: number;
  className?: string;
};

export default function Pagination({
  query,
  page,
  pageCount,
  visiblePages = 5,
  className,
}: PaginationProps) {
  if (pageCount < 2) return null;

  const firstPage = Math.min(
    Math.max(1, page - Math.floor(visiblePages / 2)),
    Math.max(1, pageCount - visiblePages + 1),
  );
  const pages = Array.from(
    { length: Math.min(visiblePages, pageCount) },
    (_, i) => firstPage + i,
  );

  const pageHref = (n: number) => `${coursesHref(query, { page: n })}#results`;

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-6", className)}
    >
      <PageArrow
        direction="prev"
        href={page > 1 ? pageHref(page - 1) : undefined}
      />

      <ol className="flex items-center gap-6">
        {pages.map((n) => (
          <li key={n}>
            <Link
              href={pageHref(n)}
              aria-current={n === page ? "page" : undefined}
              aria-label={`Page ${n}`}
              className="block tap-target rounded-sm type-heading-xs text-neutral-950 transition-colors hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 aria-[current]:text-neutral-300"
            >
              {n}
            </Link>
          </li>
        ))}
      </ol>

      <PageArrow
        direction="next"
        href={page < pageCount ? pageHref(page + 1) : undefined}
      />
    </nav>
  );
}

const arrow =
  "flex h-12 w-14 items-center justify-center rounded-pill border border-neutral-200 bg-white transition-colors focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden";

function PageArrow({
  direction,
  href,
}: {
  direction: "prev" | "next";
  href?: string;
}) {
  const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon;

  if (!href) {
    return (
      <span aria-hidden className={cn(arrow, "text-neutral-300")}>
        <Icon />
      </span>
    );
  }

  return (
    <Link
      href={href}
      rel={direction}
      aria-label={direction === "prev" ? "Previous page" : "Next page"}
      className={cn(arrow, "text-neutral-950 hover:bg-neutral-50")}
    >
      <Icon />
    </Link>
  );
}
