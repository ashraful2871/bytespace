import Image from "next/image";
import Link from "next/link";
import { SignalCellularAltIcon, StarRateIcon } from "@/components/icons";
import AvatarStack from "@/components/ui/AvatarStack";
import Pill from "@/components/ui/Pill";
import { learnerAvatars, type Course } from "@/data/courses";

type CourseCardProps = {
  course: Course;
  /** default: the Home grid card (13:249) · relaxed: looser line heights and a dark bubble (Features, Auth). */
  variant?: "default" | "relaxed";
  className?: string;
};

const variants = {
  default: {
    title: "leading-[1.2]",
    byline: "type-body-xs",
    level: "type-label-xs leading-[1.2]",
    rating: "type-body-l",
    star: "text-neutral-200",
    bubble: "lime",
    body: "pb-5",
  },
  relaxed: {
    title: "",
    byline: "type-body-xs leading-5",
    level: "type-label-xs",
    rating: "type-label-l leading-7",
    // Lime on the auth collage (49:282); the Features copy's star is hidden under the student photo.
    star: "text-secondary-400",
    bubble: "dark",
    // Figma 49:41: a 136px body (price row 24) and 16px below it, so the card is 384 like the default one.
    body: "pb-[15px]",
  },
} as const;

/**
 * 373 × 384 course card. The title link is stretched over the whole card (above the positioned avatars, inside the
 * card's own stacking context), so the card is one click target.
 */
export default function CourseCard({ course, variant = "default", className = "" }: CourseCardProps) {
  const v = variants[variant];
  const stats = [`${course.lessons} Lessons`, course.duration, `${course.comments} Comments`];

  return (
    <article
      className={`isolate min-w-0 overflow-clip rounded-card border border-neutral-200 bg-white transition-colors ring-neutral-950 ring-offset-2 hover:border-neutral-300 has-[a:focus-visible]:ring-2 ${className}`}
    >
      <div className={`relative px-[15px] pt-[15px] ${v.body}`}>
        <div className="@container relative aspect-[341/195] overflow-hidden rounded-thumb bg-[#443131]">
          <Image
            src={course.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 341px, (min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
          {/* Figma places the pills at top 150; bottom 13 is the same point and holds when the thumbnail shrinks.
              Below a 335px thumbnail the pills tighten so the row stays on one line down to ~294px (375px screens). */}
          <ul className="absolute right-2 bottom-[13px] left-[13px] flex flex-wrap gap-3 @max-[335px]:left-2 @max-[335px]:gap-1.5">
            {stats.map((stat) => (
              <li key={stat}>
                <Pill variant="glass" className="@max-[335px]:px-2">
                  {stat}
                </Pill>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[21px] flex flex-col gap-4">
          {/* Figma puts the rating at (305,231): the top-right corner of the body. */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className={`truncate type-heading-xs text-black ${v.title}`}>
                <Link
                  href={`/courses/${course.slug}`}
                  className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-hidden"
                >
                  {course.title}
                </Link>
              </h3>
              <p className={`text-body ${v.byline}`}>
                by <span className="text-primary-800">{course.author}</span>
              </p>
            </div>
            <p className={`mr-px flex shrink-0 items-center text-body ${v.rating}`}>
              {course.rating}
              <StarRateIcon size={24} className={v.star} />
              <span className="sr-only">out of 5</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 rounded-pill bg-neutral-50 px-3 py-1.5 text-neutral-700">
              <SignalCellularAltIcon size={20} />
              <span className={v.level}>{course.level}</span>
            </span>
            <AvatarStack
              avatars={learnerAvatars}
              more={`${course.learners}+`}
              moreLabel="learners"
              size={32}
              step={24}
              bubble={v.bubble}
            />
          </div>

          {variant === "relaxed" ? (
            <p className="flex items-end font-poppins text-xl leading-6 text-primary-800">
              <span className="font-medium">$</span>
              <span className="font-semibold">{course.price}</span>
              <span className="type-body-xs text-body">/lifetime</span>
            </p>
          ) : (
            <p className="flex items-end">
              <span className="font-poppins text-xl leading-[1.2] font-semibold text-primary-800">${course.price}</span>
              <span className="type-body-xs text-body">/lifetime</span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
