import Link from "next/link";
import { GroupIcon, ShareIcon, SignalCellularAltIcon, StarIcon } from "@/components/icons";
import type { Course } from "@/data/courses";

const badge =
  "inline-flex h-10 items-center gap-2 rounded-pill bg-white px-6 type-label-m text-neutral-950 [&_svg]:shrink-0 [&_svg]:text-primary-800";

/**
 * Figma 55:4183 at (122,172): title, subtitle, by-line and badges, with Share top-aligned on the right. Share's
 * right edge sits at x=1405, outside the 1200 column, from 1440 up (D4); below that it stays in the column.
 */
export default function CourseHeader({ course, className = "" }: { course: Course; className?: string }) {
  return (
    <div
      className={`flex flex-col gap-6 pt-10 text-white md:flex-row md:items-start md:justify-between md:pt-[52px] xl:ml-0.5 min-[1440px]:-mr-[85px] ${className}`}
    >
      <div className="flex min-w-0 flex-col">
        <h1 className="type-title max-md:text-[30px]/[1.25]">{course.fullTitle}</h1>
        {/* Poppins 500 20/24, not the spec's Satoshi label-xl: Figma's 571px box only fits Poppins (Satoshi is 527). */}
        <p className="mt-2 font-poppins text-xl/6 font-medium">{course.subtitle}</p>
        <p className="mt-6 type-label-l leading-[22px]">
          by{" "}
          <Link
            href={`/creators/${course.creatorSlug}`}
            className="rounded-sm text-secondary-400 transition-colors hover:text-secondary-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-400"
          >
            {course.author}
          </Link>
        </p>
        <ul className="mt-6 flex flex-wrap gap-4">
          <li className={badge}>
            <SignalCellularAltIcon />
            {course.level}
          </li>
          <li className={badge}>
            <StarIcon />
            <span>
              <span className="sr-only">Rated </span>
              {course.rating}
              <span className="sr-only"> out of 5</span> ({course.reviewsCount} reviews)
            </span>
          </li>
          <li className={badge}>
            <GroupIcon />
            {course.students} Students
          </li>
        </ul>
      </div>

      {/* Static for now: sharing needs a client handler (navigator.share or copy link). Figma's label is 16px on a
          24px line (55:4201 is 42×24), not the spec's label-l. */}
      <button
        type="button"
        className="inline-flex h-10 shrink-0 items-center gap-2 self-start rounded-pill bg-secondary-400 px-6 type-label-m leading-6 text-neutral-950 transition-colors hover:bg-secondary-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-800 focus-visible:outline-hidden"
      >
        <ShareIcon />
        Share
      </button>
    </div>
  );
}
