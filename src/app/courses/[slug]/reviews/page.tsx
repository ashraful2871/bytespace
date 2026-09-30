import Image from "next/image";
import { notFound } from "next/navigation";
import { StarIcon } from "@/components/icons";
import Chip from "@/components/ui/Chip";
import RatingStars from "@/components/ui/RatingStars";
import { getCourse, type Course, type Review } from "@/data/courses";

// Figma 60:1291: 723 wide, 24px between every heading, paragraph and block. The 16px copy sits on 26px lines.
const heading = "type-heading-xs leading-[1.2] text-neutral-950";
const body = "type-body-m leading-[26px]";

const ratings = [5, 4, 3, 2, 1];

/** `?rating=n` for n in 1–5; anything else shows every review. */
function parseRating(value: string | string[] | undefined) {
  const n = Number(Array.isArray(value) ? value[0] : value);
  return ratings.includes(n) ? n : undefined;
}

export default async function CourseReviewsPage({ params, searchParams }: PageProps<"/courses/[slug]/reviews">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  const rating = parseRating((await searchParams).rating);
  const reviews = rating ? course.reviews.filter((review) => review.rating === rating) : course.reviews;
  const base = `/courses/${course.slug}/reviews`;

  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="reviews-heading" className="@container flex flex-col gap-6">
        <h2 id="reviews-heading" className={heading}>
          What Learners Are Saying
        </h2>
        <p className={`text-neutral-700 ${body}`}>{course.reviewsIntro}</p>
        <RatingSummary {...course.ratingSummary} />
      </section>

      <section aria-labelledby="individual-heading" className="flex flex-col gap-6">
        <h2 id="individual-heading" className={heading}>
          Individual Reviews:
        </h2>
        <nav aria-label="Filter reviews by rating">
          {/* Scrolls sideways when the column is narrower than the row (524px); full-bleed while the layout stacks. */}
          <ul className="-my-1 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto py-1 [scrollbar-width:none] max-lg:-mx-(--gutter) max-lg:scroll-px-(--gutter) max-lg:px-(--gutter) lg:-mx-1 lg:px-1">
            <li className="snap-start">
              <Chip href={base} scroll={false} active={!rating}>
                All rating
              </Chip>
            </li>
            {ratings.map((n) => (
              <li key={n} className="snap-start">
                <Chip href={`${base}?rating=${n}`} scroll={false} active={rating === n} size="lg" aria-label={`${n} stars`}>
                  <StarIcon />
                  {n}
                </Chip>
              </li>
            ))}
          </ul>
        </nav>
        {reviews.length > 0 ? (
          <ul className="flex flex-col gap-6">
            {reviews.map((review) => (
              <li key={review.name}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={`text-neutral-700 ${body}`}>No {rating}-star reviews yet.</p>
        )}
      </section>
    </div>
  );
}

/**
 * Figma 60:1294: the 723×226 card with the lime average (129×140) and a 490px column of five rows (bar, stars,
 * count). It stacks when its column is under 576px wide, and the stars drop to 16px under 384.
 */
function RatingSummary({ average, breakdown }: Course["ratingSummary"]) {
  const total = breakdown.reduce((sum, n) => sum + n, 0);

  return (
    <div className="flex flex-col items-center gap-6 rounded-card border border-neutral-200 p-6 @xl:flex-row @xl:p-[39px]">
      <p className="flex h-[140px] w-[129px] shrink-0 flex-col items-center justify-center rounded-float bg-secondary-400 text-neutral-950">
        <span className="type-label-s leading-[17px]">Ratings</span>
        <span className="type-title">
          {average}
          <span className="sr-only"> out of 5</span>
        </span>
      </p>
      <ul aria-label="Ratings breakdown" className="flex w-full min-w-0 flex-col gap-1 @xl:max-w-[490px] @xl:flex-1">
        {/* breakdown[0] counts the 5-star ratings. Figma draws five filled stars on every row. */}
        {breakdown.map((count, i) => (
          <li key={i} className="flex h-[26px] items-center gap-4">
            <span aria-hidden className="h-2 min-w-0 flex-1 overflow-hidden rounded-pill bg-neutral-100">
              <span className="block h-full rounded-pill bg-secondary-400" style={{ width: `${(count / total) * 100}%` }} />
            </span>
            <span aria-hidden className="flex gap-1 text-neutral-700">
              {ratings.map((n) => (
                <StarIcon key={n} className="size-4 shrink-0 @sm:size-6" />
              ))}
            </span>
            <span className={`w-10 shrink-0 text-right text-neutral-700 ${body}`}>
              <span className="sr-only">{5 - i}-star ratings: </span>
              {count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Figma 60:1373: 723 wide, 40px padding, the reviewer, stars and quote 24 apart. */
function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex flex-col gap-6 rounded-card border border-neutral-200 p-6 md:p-[39px]">
      <header className="flex items-start gap-3">
        <Image
          src={review.avatar}
          alt=""
          width={52}
          height={52}
          className="size-[52px] shrink-0 rounded-full bg-neutral-100 object-cover"
        />
        <div className="min-w-0 flex-1">
          {/* The time's 26px line hangs 4px below the 22px name (Figma 60:1387), so it doesn't push the role down. */}
          <div className="flex flex-wrap items-start justify-between gap-x-4">
            <h3 className="type-label-l leading-[22px] text-neutral-950">{review.name}</h3>
            <p className={`-mb-1 text-neutral-400 ${body}`}>{review.ago}</p>
          </div>
          <p className={`text-neutral-400 ${body}`}>{review.role}</p>
        </div>
      </header>
      <RatingStars value={review.rating} tone="dark" />
      <blockquote className={`text-neutral-700 ${body}`}>
        <p>{review.text}</p>
      </blockquote>
    </article>
  );
}
