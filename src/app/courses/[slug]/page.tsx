import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircleIcon } from "@/components/icons";
import { getCourse } from "@/data/courses";

// Figma 55:4125: 725 wide, 24px between every heading and its content. The 16px copy sits on 26px lines.
const heading = "type-heading-xs leading-[1.2] text-neutral-950";
const body = "type-body-m leading-[26px] text-neutral-700";

export default async function CourseAboutPage({ params }: PageProps<"/courses/[slug]">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="description-heading" className="flex flex-col gap-6">
        <h2 id="description-heading" className={heading}>
          Description
        </h2>
        {/* One Figma text box with a blank line between paragraphs. */}
        <div className="flex flex-col gap-[26px]">
          {course.description.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className={body}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* "Sneak Peak" is Figma's spelling (55:4128). */}
      <section aria-labelledby="sneak-heading" className="flex flex-col gap-6">
        <h2 id="sneak-heading" className={heading}>
          Sneak Peak
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {course.sneakPeek.map((image) => (
            <li key={image.src} className="relative aspect-[169/125] overflow-hidden xl:aspect-auto xl:h-[125px] rounded-thumb bg-neutral-100">
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
      </section>

      <section aria-labelledby="key-points-heading" className="flex flex-col gap-6">
        <h2 id="key-points-heading" className={heading}>
          Key Points
        </h2>
        <ul className="flex flex-col gap-3">
          {course.keyPoints.map((point) => (
            <li key={point} className={`flex items-start gap-2 ${body}`}>
              <CheckCircleIcon className="shrink-0 text-primary-800" />
              {point}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
