import { StarIcon } from "@/components/icons";
import type { Course } from "@/data/courses";

type RatingSummaryProps = Course["ratingSummary"];

export default function RatingSummary({
  average,
  breakdown,
}: RatingSummaryProps) {
  const total = breakdown.reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex flex-col items-center gap-6 rounded-card border border-neutral-200 p-6 @xl:flex-row @xl:p-[39px]">
      <p className="flex h-[140px] w-[129px] shrink-0 flex-col items-center justify-center rounded-float bg-secondary-400 text-neutral-950">
        <span className="type-label-s leading-[17px]">Ratings</span>
        <span className="type-title">
          {average}
          <span className="sr-only"> out of 5</span>
        </span>
      </p>

      <ul
        aria-label="Ratings breakdown"
        className="flex w-full min-w-0 flex-col gap-1 @xl:max-w-[490px] @xl:flex-1"
      >
        {breakdown.map((count, index) => (
          <li key={index} className="flex h-[26px] items-center gap-4">
            <span
              aria-hidden
              className="h-2 min-w-0 flex-1 overflow-hidden rounded-pill bg-neutral-100"
            >
              <span
                className="block h-full rounded-pill bg-secondary-400"
                style={{ width: `${(count / total) * 100}%` }}
              />
            </span>
            <span aria-hidden className="flex gap-1 text-neutral-700">
              {Array.from({ length: 5 }, (_, star) => (
                <StarIcon key={star} className="size-4 shrink-0 @sm:size-6" />
              ))}
            </span>
            <span className="w-10 shrink-0 text-right type-paragraph text-neutral-700">
              <span className="sr-only">{5 - index}-star ratings: </span>
              {count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
