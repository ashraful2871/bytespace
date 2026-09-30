import Image from "next/image";
import Link from "next/link";
import { SignalCellularAltIcon, StarRateIcon } from "@/components/icons";
import AvatarStack from "@/components/ui/AvatarStack";
import Pill from "@/components/ui/Pill";
import { learnerAvatars, type Course } from "@/data/courses";
import { cn } from "@/lib/cn";

type CourseCardProps = {
  course: Course;
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
    price: "leading-[1.2]",
    currency: "font-semibold",
  },
  relaxed: {
    title: "",
    byline: "type-body-xs leading-5",
    level: "type-label-xs",
    rating: "type-label-l leading-7",
    star: "text-secondary-400",
    bubble: "dark",
    body: "pb-[15px]",
    price: "leading-6",
    currency: "font-medium",
  },
} as const;

export default function CourseCard({
  course,
  variant = "default",
  className,
}: CourseCardProps) {
  const v = variants[variant];
  const stats = [
    `${course.lessons} Lessons`,
    course.duration,
    `${course.comments} Comments`,
  ];

  return (
    <article
      className={cn(
        "isolate min-w-0 overflow-clip rounded-card border border-neutral-200 bg-white ring-neutral-950 ring-offset-2 transition-colors hover:border-neutral-300 has-[a:focus-visible]:ring-2",
        className,
      )}
    >
      <div className={cn("relative px-[15px] pt-[15px]", v.body)}>
        <div className="@container relative aspect-[341/195] overflow-hidden rounded-thumb bg-neutral-800">
          <Image
            src={course.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 341px, (min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
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
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3
                className={cn("truncate type-heading-xs text-black", v.title)}
              >
                <Link
                  href={`/courses/${course.slug}`}
                  className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-hidden"
                >
                  {course.title}
                </Link>
              </h3>
              <p className={cn("text-body", v.byline)}>
                by <span className="text-primary-800">{course.author}</span>
              </p>
            </div>
            <p
              className={cn(
                "mr-px flex shrink-0 items-center text-body",
                v.rating,
              )}
            >
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

          <p className="flex items-end">
            <span
              className={cn(
                "font-poppins text-xl font-semibold text-primary-800",
                v.price,
              )}
            >
              <span className={v.currency}>$</span>
              {course.price}
            </span>
            <span className="type-body-xs text-body">/lifetime</span>
          </p>
        </div>
      </div>
    </article>
  );
}
