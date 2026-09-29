import Link from "next/link";
import Chip from "@/components/ui/Chip";
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
              <br className="max-sm:hidden" /> Build Your Skills
            </>
          }
          description="At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life."
        />

        {/* From xl the chips sit in the design's three centred rows (21px apart); below that they wrap freely. */}
        <nav
          id="categories"
          aria-label="Course categories"
          className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-3 md:mt-[42px] xl:flex-col xl:items-center xl:gap-y-[21px]"
        >
          {categoryRows.map((row, rowIndex) => (
            <ul key={rowIndex} className="contents xl:flex xl:gap-4">
              {row.map((category) => (
                <li key={category.slug}>
                  <Chip href={`/courses?category=${category.slug}`} active={category.slug === "featured"}>
                    {category.label}
                  </Chip>
                </li>
              ))}
              {rowIndex === categoryRows.length - 1 && (
                <li className="flex items-center">
                  <Link href="/courses" className="type-label-m text-primary-800 hover:underline">
                    + More
                  </Link>
                </li>
              )}
            </ul>
          ))}
        </nav>

        <div className="mt-12 grid gap-6 md:mt-[77px] md:grid-cols-2 xl:grid-cols-[repeat(3,minmax(0,373px))] xl:gap-10">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
