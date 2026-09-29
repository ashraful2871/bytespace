import { notFound } from "next/navigation";
import Placeholder from "@/components/ui/Placeholder";
import { getCourse } from "@/data/courses";

export default async function CourseAboutPage({ params }: PageProps<"/courses/[slug]">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  return (
    <section aria-labelledby="about-heading" className="flex flex-col gap-6">
      <h2 id="about-heading" className="type-heading-xs text-ink">
        Description
      </h2>
      {course.description.map((paragraph) => (
        <p key={paragraph.slice(0, 32)} className="type-body-m text-body">
          {paragraph}
        </p>
      ))}
      <Placeholder phase="10">Sneak Peek, Key Points and the sidebar.</Placeholder>
    </section>
  );
}
