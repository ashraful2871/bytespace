import { notFound } from "next/navigation";
import Placeholder from "@/components/ui/Placeholder";
import { getCourse } from "@/data/courses";

export default async function CourseReviewsPage({ params }: PageProps<"/courses/[slug]/reviews">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  const { average, breakdown } = course.ratingSummary;
  const count = breakdown.reduce((sum, n) => sum + n, 0);

  return (
    <section aria-labelledby="reviews-heading" className="flex flex-col gap-6">
      <h2 id="reviews-heading" className="type-heading-xs text-ink">
        What Learners Are Saying
      </h2>
      <p className="type-body-m text-body">
        Rated {average} from {count} ratings · {course.reviews.length} reviews
      </p>
      <Placeholder phase="11">Rating summary, filters and review cards.</Placeholder>
    </section>
  );
}
