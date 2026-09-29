import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { coursesHref, type CourseQuery } from "@/data/courses";

type PaginationProps = {
  query: CourseQuery;
  page: number;
  pageCount: number;
  window?: number;
  className?: string;
};

const arrow =
  "flex h-12 w-14 items-center justify-center rounded-pill border border-neutral-200 bg-white transition-colors focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden";

const RESULTS = "#results";

export default function Pagination({
  query,
  page,
  pageCount,
  window = 5,
  className = "",
}: PaginationProps) {
  if (pageCount < 2) return null;

  const first = Math.min(
    Math.max(1, page - Math.floor(window / 2)),
    Math.max(1, pageCount - window + 1),
  );
  const pages = Array.from(
    { length: Math.min(window, pageCount) },
    (_, i) => first + i,
  );
  const href = (n: number) => `${coursesHref(query, { page: n })}${RESULTS}`;

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-center gap-6 ${className}`}
    >
      {page > 1 ? (
        <Link
          href={href(page - 1)}
          rel="prev"
          aria-label="Previous page"
          className={`${arrow} text-neutral-950 hover:bg-neutral-50`}
        >
          <ChevronLeftIcon />
        </Link>
      ) : (
        <span aria-hidden className={`${arrow} text-neutral-300`}>
          <ChevronLeftIcon />
        </span>
      )}

      <ol className="flex items-center gap-6">
        {pages.map((n) => (
          <li key={n}>
            <Link
              href={href(n)}
              aria-current={n === page ? "page" : undefined}
              aria-label={`Page ${n}`}
              className="block tap-target rounded-sm type-heading-xs text-neutral-950 transition-colors hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 aria-[current]:text-neutral-300"
            >
              {n}
            </Link>
          </li>
        ))}
      </ol>

      {page < pageCount ? (
        <Link
          href={href(page + 1)}
          rel="next"
          aria-label="Next page"
          className={`${arrow} text-neutral-950 hover:bg-neutral-50`}
        >
          <ChevronRightIcon />
        </Link>
      ) : (
        <span aria-hidden className={`${arrow} text-neutral-300`}>
          <ChevronRightIcon />
        </span>
      )}
    </nav>
  );
}
