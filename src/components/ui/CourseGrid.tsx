import CourseCard from "@/components/ui/CourseCard";
import type { Course } from "@/data/courses";
import { cn } from "@/lib/cn";

type CourseGridProps = {
  courses: Course[];
  className?: string;
};

export default function CourseGrid({ courses, className }: CourseGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6 md:grid-cols-2 xl:grid-cols-[repeat(3,minmax(0,373px))] xl:gap-10",
        className,
      )}
    >
      {courses.map((course, index) => (
        <CourseCard key={`${course.slug}-${index}`} course={course} />
      ))}
    </div>
  );
}
