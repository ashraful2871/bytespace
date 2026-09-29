import { notFound } from "next/navigation";
import Placeholder from "@/components/ui/Placeholder";
import { getCourse } from "@/data/courses";

export default async function CourseLessonsPage({ params }: PageProps<"/courses/[slug]/lessons">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  return (
    <section aria-labelledby="lessons-heading" className="flex flex-col gap-6">
      <h2 id="lessons-heading" className="type-heading-xs text-ink">
        Explore the Modules
      </h2>
      <ol className="flex flex-col gap-3 type-body-m text-body">
        {course.modules.map((module) => (
          <li key={module.title}>{module.title}</li>
        ))}
      </ol>
      <Placeholder phase="11">Module cards, lesson content and progress.</Placeholder>
    </section>
  );
}
