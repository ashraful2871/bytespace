import type { Metadata } from "next";
import { pageMetadata } from "@/app/shared-metadata";
import BlueBand from "@/components/layout/BlueBand";
import CategoryTabs from "@/components/search/CategoryTabs";
import FilterBar from "@/components/search/FilterBar";
import NoResults from "@/components/search/NoResults";
import Pagination from "@/components/search/Pagination";
import SearchForm from "@/components/search/SearchForm";
import CourseGrid from "@/components/ui/CourseGrid";
import {
  coursesHref,
  listCourses,
  parseCourseQuery,
} from "@/lib/course-search";

export const metadata: Metadata = pageMetadata({
  title: "Find Your Next Course",
  description: "Search ByteSpace courses by topic, category and level.",
  path: "/courses",
});

export default async function CoursesPage({
  searchParams,
}: PageProps<"/courses">) {
  const query = parseCourseQuery(await searchParams);
  const { items, total, page, pageCount } = listCourses(query);

  const stateKey = coursesHref(query, { page });

  const resultsLabel = total
    ? `${total} ${total === 1 ? "course" : "courses"}, page ${page} of ${pageCount}`
    : "No courses found";

  return (
    <>
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
          {resultsLabel}
        </h2>
        <FilterBar key={stateKey} query={query} />
        <CategoryTabs query={query} className="mt-6 md:mt-8" />

        {items.length > 0 ? (
          <>
            <CourseGrid courses={items} className="mt-8 md:mt-[77px]" />
            <Pagination
              query={query}
              page={page}
              pageCount={pageCount}
              className="mt-12 md:mt-[72px]"
            />
          </>
        ) : (
          <NoResults clearHref="/courses" className="mt-16 md:mt-[77px]" />
        )}
      </section>
    </>
  );
}
