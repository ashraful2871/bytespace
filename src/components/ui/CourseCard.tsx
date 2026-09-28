import Image from "next/image";
import { ChartNoAxesColumnIncreasing, Star } from "lucide-react";
import AvatarStack from "@/components/ui/AvatarStack";
import { learnerAvatars, type Course } from "@/data/courses";

type CourseCardProps = {
  course: Course;
  className?: string;
};

export default function CourseCard({ course, className = "" }: CourseCardProps) {
  const stats = [
    `${course.lessons} Lessons`,
    course.duration,
    `${course.comments} Comments`,
  ];

  return (
    <article
      className={`min-w-0 rounded-[20px] border border-neutral-200 bg-white p-[15px] pb-[19px] ${className}`}
    >
      <div className="relative aspect-[341/195] overflow-hidden rounded-[10px]">
        <Image
          src={course.image}
          alt=""
          fill
          sizes="(min-width: 1248px) 341px, (min-width: 768px) 30vw, 90vw"
          className="object-cover"
        />
        <ul className="absolute inset-x-2 bottom-3 flex justify-between gap-1 sm:inset-x-[13px] sm:bottom-5 sm:gap-2">
          {stats.map((stat) => (
            <li
              key={stat}
              className="flex h-[26px] items-center rounded-full bg-white/45 px-2 text-[11px] whitespace-nowrap sm:px-3 sm:text-xs text-neutral-700 backdrop-blur-[6px]"
            >
              {stat}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[17px] flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-poppins text-xl leading-[30px] font-semibold tracking-[-0.01em] text-black">
            {course.title}
          </h3>
          <p className="text-xs leading-4 text-body">
            by <span className="text-primary-800">{course.author}</span>
          </p>
        </div>
        <p className="flex shrink-0 items-center gap-[5px] pt-1.5 text-lg leading-6 text-body">
          {course.rating}
          <Star aria-hidden className="size-5 fill-[#d3d3d3] text-[#d3d3d3]" />
          <span className="sr-only">rating</span>
        </p>
      </div>

      <div className="mt-[17px] flex items-center gap-3">
        <span className="flex h-8 items-center gap-[7px] rounded-full bg-neutral-50 pr-2.5 pl-3.5 text-[13px] text-neutral-700">
          <ChartNoAxesColumnIncreasing aria-hidden className="size-4" strokeWidth={2.5} />
          {course.level}
        </span>
        <AvatarStack
          avatars={learnerAvatars}
          more={`${course.learners}+`}
          size={32}
          step={24}
        />
      </div>

      <p className="mt-[17px] leading-none text-body">
        <span className="text-xl leading-6 font-bold text-primary-800">${course.price}</span>
        <span className="text-xs">/lifetime</span>
      </p>
    </article>
  );
}
