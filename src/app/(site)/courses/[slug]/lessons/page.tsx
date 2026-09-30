import { notFound } from "next/navigation";
import { courseMetadata } from "@/app/shared-metadata";
import CourseSection from "@/components/course/CourseSection";
import { VideocamIcon } from "@/components/icons";
import ProgressBar from "@/components/ui/ProgressBar";
import { getCourse } from "@/data/courses";

const PROGRESS = 55;

export function generateMetadata({
  params,
}: PageProps<"/courses/[slug]/lessons">) {
  return courseMetadata(params, "Lessons");
}

export default async function CourseLessonsPage({
  params,
}: PageProps<"/courses/[slug]/lessons">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  return (
    <>
      <CourseSection id="modules" title="Explore the Modules">
        <p className="type-paragraph text-neutral-700">{course.modulesIntro}</p>
      </CourseSection>

      <CourseSection id="lesson-list" title="Lesson List">
        <ul className="flex flex-col gap-6">
          {course.modules.map((module) => (
            <li key={module.title} className="flex items-start gap-[13px]">
              <span className="mt-0.5 flex size-14 shrink-0 items-center justify-center rounded-float bg-secondary-400 text-neutral-950 md:size-[72px]">
                <VideocamIcon className="size-8 md:size-10" />
              </span>
              <div className="flex min-w-0 flex-col gap-1">
                <h3 className="type-label-m leading-[19px] text-neutral-950">
                  {module.title}
                </h3>
                <p className="type-paragraph text-neutral-700">
                  {module.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CourseSection>

      <CourseSection id="lesson-content" title="Lesson Content">
        <p className="type-paragraph text-neutral-700">
          {course.lessonContent}
        </p>
      </CourseSection>

      <CourseSection id="progress" title="Lesson Progress Tracking">
        <p className="type-paragraph text-neutral-700">{course.progressText}</p>
        <div className="flex flex-col gap-2 rounded-float border border-neutral-200 p-[15px]">
          <p className="type-label-s leading-[17px] text-neutral-950">
            Learning Progress
          </p>
          <p className="type-title text-neutral-950">{PROGRESS}%</p>
          <ProgressBar
            value={PROGRESS}
            label="Learning progress"
            track="muted"
          />
        </div>
      </CourseSection>
    </>
  );
}
