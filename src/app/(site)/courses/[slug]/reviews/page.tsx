import { notFound } from "next/navigation";
import { courseMetadata } from "@/app/shared-metadata";
import CourseSection from "@/components/course/CourseSection";
import RatingSummary from "@/components/course/RatingSummary";
import ReviewCard from "@/components/course/ReviewCard";
import { StarIcon } from "@/components/icons";
import Chip from "@/components/ui/Chip";
import { getCourse } from "@/data/courses";

const RATINGS = [5, 4, 3, 2, 1];

function parseRating(value: string | string[] | undefined) {
  const rating = Number(Array.isArray(value) ? value[0] : value);
  return RATINGS.includes(rating) ? rating : undefined;
}

export function generateMetadata({
  params,
}: PageProps<"/courses/[slug]/reviews">) {
  return courseMetadata(params, "Reviews");
}

export default async function CourseReviewsPage({
  params,
  searchParams,
}: PageProps<"/courses/[slug]/reviews">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  const rating = parseRating((await searchParams).rating);
  const reviews = rating
    ? course.reviews.filter((review) => review.rating === rating)
    : course.reviews;
  const reviewsPath = `/courses/${course.slug}/reviews`;

  return (
    <>
      <CourseSection
        id="reviews"
        title="What Learners Are Saying"
        className="@container"
      >
        <p className="type-paragraph text-neutral-700">{course.reviewsIntro}</p>
        <RatingSummary {...course.ratingSummary} />
      </CourseSection>

      <CourseSection id="individual-reviews" title="Individual Reviews:">
        <nav aria-label="Filter reviews by rating">
          <ul className="-my-1 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto py-1 [scrollbar-width:none] max-lg:-mx-(--gutter) max-lg:scroll-px-(--gutter) max-lg:px-(--gutter) lg:-mx-1 lg:px-1">
            <li className="snap-start">
              <Chip href={reviewsPath} scroll={false} active={!rating}>
                All rating
              </Chip>
            </li>
            {RATINGS.map((stars) => (
              <li key={stars} className="snap-start">
                <Chip
                  href={`${reviewsPath}?rating=${stars}`}
                  scroll={false}
                  active={rating === stars}
                  size="lg"
                  aria-label={`${stars} stars`}
                >
                  <StarIcon />
                  {stars}
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
          <p className="type-paragraph text-neutral-700">
            No {rating}-star reviews yet.
          </p>
        )}
      </CourseSection>
    </>
  );
}
