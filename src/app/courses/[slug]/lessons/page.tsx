import { notFound } from "next/navigation";
import { VideocamIcon } from "@/components/icons";
import ProgressBar from "@/components/ui/ProgressBar";
import { getCourse } from "@/data/courses";

// Figma 60:624: 723 wide, one column with 24px between every heading, paragraph and block. The 16px copy sits on
// 26px lines, as on the About tab.
const heading = "type-heading-xs leading-[1.2] text-neutral-950";
const body = "type-body-m leading-[26px] text-neutral-700";

// Figma's demo value; there are no learner accounts yet.
const progress = 55;

export default async function CourseLessonsPage({ params }: PageProps<"/courses/[slug]/lessons">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="modules-heading" className="flex flex-col gap-6">
        <h2 id="modules-heading" className={heading}>
          Explore the Modules
        </h2>
        <p className={body}>{course.modulesIntro}</p>
      </section>

      <section aria-labelledby="lesson-list-heading" className="flex flex-col gap-6">
        <h2 id="lesson-list-heading" className={heading}>
          Lesson List
        </h2>
        {/* Figma numbers the modules 1, 2, 4, 5, 6, 7; the titles carry the numbers, so the list isn't renumbered. */}
        <ul className="flex flex-col gap-6">
          {course.modules.map((module) => (
            <li key={module.title} className="flex items-start gap-[13px]">
              {/* Figma 60:629: 72×72 at y=2 in the 75px row; 56 on phones, where the copy runs to 5+ lines. */}
              <span className="mt-0.5 flex size-14 shrink-0 items-center justify-center rounded-float bg-secondary-400 text-neutral-950 md:size-[72px]">
                <VideocamIcon className="size-8 md:size-10" />
              </span>
              <div className="flex min-w-0 flex-col gap-1">
                <h3 className="type-label-m leading-[19px] text-neutral-950">{module.title}</h3>
                <p className={body}>{module.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="lesson-content-heading" className="flex flex-col gap-6">
        <h2 id="lesson-content-heading" className={heading}>
          Lesson Content
        </h2>
        <p className={body}>{course.lessonContent}</p>
      </section>

      <section aria-labelledby="progress-heading" className="flex flex-col gap-6">
        <h2 id="progress-heading" className={heading}>
          Lesson Progress Tracking
        </h2>
        <p className={body}>{course.progressText}</p>
        {/* Figma 60:668: 723×116 with 16px padding inside the 1px border. */}
        <div className="flex flex-col gap-2 rounded-float border border-neutral-200 p-[15px]">
          <p className="type-label-s leading-[17px] text-neutral-950">Learning Progress</p>
          <p className="type-title text-neutral-950">{progress}%</p>
          <ProgressBar value={progress} label="Learning progress" track="muted" />
        </div>
      </section>
    </div>
  );
}
