import Link from "next/link";
import CourseCard from "@/components/ui/CourseCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { categoryRows, courses } from "@/data/courses";

export default function Courses() {
  return (
    <section id="courses" className="scroll-mt-6 bg-white pt-16 md:pt-[72px]">
      <div className="container-page">
        <SectionHeader
          title={
            <>
              Discover Your Passion,
              <br /> Build Your Skills
            </>
          }
          description="At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life."
        />

        {/* On desktop the chips sit in the three rows from the design; on small screens they wrap freely. */}
        <div
          id="categories"
          className="mt-10 flex flex-wrap justify-center gap-3 md:mt-[43px] xl:flex-col xl:items-center xl:gap-5"
        >
          {categoryRows.map((row, rowIndex) => (
            <ul key={rowIndex} className="contents xl:flex xl:gap-4">
              {row.map((category) => {
                const active = category === "Featured";
                return (
                  <li key={category}>
                    <button
                      type="button"
                      aria-pressed={active}
                      className={`h-10 rounded-full px-4 text-sm md:h-11 md:px-[18px] md:text-base whitespace-nowrap transition-colors ${
                        active
                          ? "bg-secondary-400 text-neutral-950"
                          : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                );
              })}
              {rowIndex === categoryRows.length - 1 && (
                <li className="flex items-center">
                  <Link href="#categories" className="text-base text-primary-800 hover:underline">
                    + More
                  </Link>
                </li>
              )}
            </ul>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:mt-[76px] md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
          {courses.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
