import type { Metadata } from "next";
import BlueBand from "@/components/layout/BlueBand";
import Footer from "@/components/layout/Footer";
import CategoryTabs from "@/components/search/CategoryTabs";
import FilterBar from "@/components/search/FilterBar";
import Pagination from "@/components/search/Pagination";
import SearchForm from "@/components/search/SearchForm";
import { ButtonLink } from "@/components/ui/Button";
import CourseCard from "@/components/ui/CourseCard";
import { coursesHref, listCourses, parseCourseQuery } from "@/data/courses";

export const metadata: Metadata = {
  title: "Find Your Next Course",
  description: "Search ByteSpace courses by topic, category and level.",
};

// Figma 55:117 at 1440: band 0–360 (title at 164), filter bar at 432, chips at 512, an 18-card grid at 632,
// pagination at 3208 and the footer at 3328.
export default async function CoursesPage({
  searchParams,
}: PageProps<"/courses">) {
  const query = parseCourseQuery(await searchParams);
  const { items, total, page, pageCount } = listCourses(query);
  // Remounts the search field and the <details> menus on every navigation, so they show the new URL and close.
  const stateKey = coursesHref(query, { page });

  return (
    <>
      <main className="flex flex-col">
        <BlueBand height={360} clip={false}>
          <div
            key={stateKey}
            className="container-page flex flex-col items-center gap-8 pt-6 pb-12 text-center md:pt-11 xl:pb-[69px]"
          >
            <h1 className="type-title text-white max-md:text-[30px]/[1.25]">
              Find Your Next Course
            </h1>
            <SearchForm query={query} />
          </div>
        </BlueBand>

        <section
          id="results"
          aria-labelledby="results-heading"
          className="container-page scroll-mt-6 pt-12 pb-16 md:pt-[72px] md:pb-[72px]"
        >
          <h2 id="results-heading" className="sr-only">
            {total
              ? `${total} ${total === 1 ? "course" : "courses"}, page ${page} of ${pageCount}`
              : "No courses found"}
          </h2>
          <FilterBar key={stateKey} query={query} />
          <CategoryTabs query={query} className="mt-6 md:mt-8" />

          {items.length ? (
            <>
              <div className="mt-8 grid gap-6 md:mt-[77px] md:grid-cols-2 xl:grid-cols-[repeat(3,minmax(0,373px))] xl:gap-10">
                {items.map(({ id, course }) => (
                  <CourseCard key={id} course={course} />
                ))}
              </div>
              <Pagination
                query={query}
                page={page}
                pageCount={pageCount}
                className="mt-12 md:mt-[72px]"
              />
            </>
          ) : (
            <div className="mt-16 flex flex-col items-center gap-6 py-16 text-center md:mt-[77px]">
              <p className="type-body-l text-ink">No courses found</p>
              <ButtonLink href="/courses" variant="outline">
                Clear filters
              </ButtonLink>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
