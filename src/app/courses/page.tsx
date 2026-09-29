import type { Metadata } from "next";
import BlueBand from "@/components/layout/BlueBand";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/ui/CourseCard";
import Placeholder from "@/components/ui/Placeholder";
import { listCourses, parseCourseQuery } from "@/data/courses";

export const metadata: Metadata = {
  title: "Find Your Next Course",
  description: "Search ByteSpace courses by topic, category and level.",
};

export default async function CoursesPage({ searchParams }: PageProps<"/courses">) {
  const { items, total, page, pageCount } = listCourses(parseCourseQuery(await searchParams));

  return (
    <>
      <main className="flex flex-col">
        <BlueBand height={360}>
          <div className="container-page pt-10 pb-16 md:pt-[52px]">
            <h1 className="type-title text-white max-md:text-[30px]/[1.25]">Find Your Next Course</h1>
          </div>
        </BlueBand>

        <div className="container-page flex flex-col gap-10 py-16">
          <Placeholder phase="09">
            {total} courses · page {page} of {pageCount}
          </Placeholder>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[repeat(3,minmax(0,373px))] xl:gap-10">
            {items.map(({ id, course }) => (
              <CourseCard key={id} course={course} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
