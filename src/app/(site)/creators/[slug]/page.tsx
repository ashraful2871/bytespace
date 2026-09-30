import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/app/shared-metadata";
import CreatorProfile from "@/components/creator/CreatorProfile";
import BlueBand from "@/components/layout/BlueBand";
import FilterBar from "@/components/search/FilterBar";
import NoResults from "@/components/search/NoResults";
import CourseGrid from "@/components/ui/CourseGrid";
import { creators, getCreator } from "@/data/creators";
import {
  coursesHref,
  listCourses,
  parseCourseQuery,
} from "@/lib/course-search";

export const dynamicParams = false;

export function generateStaticParams() {
  return creators.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/creators/[slug]">): Promise<Metadata> {
  const creator = getCreator((await params).slug);
  if (!creator) return {};

  return pageMetadata({
    title: creator.name,
    description: creator.tagline,
    path: `/creators/${creator.slug}`,
  });
}

export default async function CreatorPage({
  params,
  searchParams,
}: PageProps<"/creators/[slug]">) {
  const creator = getCreator((await params).slug);
  if (!creator) notFound();

  const pathname = `/creators/${creator.slug}`;
  const query = parseCourseQuery(await searchParams);
  const { items } = listCourses({ ...query, page: 1, creator: creator.slug });

  return (
    <>
      <BlueBand height={592}>
        <CreatorProfile creator={creator} />
      </BlueBand>

      <section
        id="courses"
        aria-labelledby="courses-heading"
        className="container-page scroll-mt-6 pt-12 pb-16 md:pt-[62px] md:pb-[61px]"
      >
        <h2 id="courses-heading" className="sr-only">
          Courses by {creator.name}
        </h2>
        <FilterBar
          key={coursesHref(query, {}, pathname)}
          query={query}
          pathname={pathname}
        />

        {items.length > 0 ? (
          <CourseGrid courses={items} className="mt-8 md:mt-10" />
        ) : (
          <NoResults clearHref={pathname} className="mt-16 md:mt-10" />
        )}
      </section>
    </>
  );
}
