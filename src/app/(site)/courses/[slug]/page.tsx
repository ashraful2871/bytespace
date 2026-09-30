import Image from "next/image";
import { notFound } from "next/navigation";
import CourseSection from "@/components/course/CourseSection";
import { CheckCircleIcon } from "@/components/icons";
import { getCourse } from "@/data/courses";

export default async function CourseAboutPage({
  params,
}: PageProps<"/courses/[slug]">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  return (
    <>
      <CourseSection id="description" title="Description">
        <div className="flex flex-col gap-[26px]">
          {course.description.map((paragraph) => (
            <p key={paragraph} className="type-paragraph text-neutral-700">
              {paragraph}
            </p>
          ))}
        </div>
      </CourseSection>

      <CourseSection id="sneak-peek" title="Sneak Peak">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {course.sneakPeek.map((image) => (
            <li
              key={image.src}
              className="relative aspect-[169/125] overflow-hidden rounded-thumb bg-neutral-100 xl:aspect-auto xl:h-[125px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 169px, (min-width: 640px) 22vw, 45vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </CourseSection>

      <CourseSection id="key-points" title="Key Points">
        <ul className="flex flex-col gap-3">
          {course.keyPoints.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 type-paragraph text-neutral-700"
            >
              <CheckCircleIcon className="shrink-0 text-primary-800" />
              {point}
            </li>
          ))}
        </ul>
      </CourseSection>
    </>
  );
}
