import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlueBand from "@/components/layout/BlueBand";
import Footer from "@/components/layout/Footer";
import FilterBar from "@/components/search/FilterBar";
import { Button, ButtonLink } from "@/components/ui/Button";
import CourseCard from "@/components/ui/CourseCard";
import { coursesHref, listCourses, parseCourseQuery } from "@/data/courses";
import { creators, getCreator } from "@/data/creators";

// Every creator is prerendered; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return creators.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/creators/[slug]">): Promise<Metadata> {
  const creator = getCreator((await params).slug);
  return creator ? { title: creator.name, description: creator.tagline } : {};
}

// Figma 60:1878 at 1440: band 0–592 (profile at 172, stats row at 464), filter bar at 654, a 6-card grid at 742
// and the footer at 1611. The filter bar links back to this page, filtering the creator's courses.
export default async function CreatorPage({ params, searchParams }: PageProps<"/creators/[slug]">) {
  const creator = getCreator((await params).slug);
  if (!creator) notFound();

  const pathname = `/creators/${creator.slug}`;
  const query = parseCourseQuery(await searchParams);
  const { items } = listCourses({ ...query, page: 1, creator: creator.slug });
  // Remounts the <details> menus on every navigation, so they close and show the new filters.
  const stateKey = coursesHref(query, {}, pathname);

  const stats = [
    { value: creator.products, label: creator.products === 1 ? "Product" : "Products" },
    { value: creator.followers, label: creator.followers === 1 ? "Follower" : "Followers" },
  ];

  return (
    <>
      <main className="flex flex-col">
        <BlueBand height={592}>
          <div className="container-page pt-10 pb-16 md:pt-[52px]">
            <div className="flex flex-col gap-10 xl:ml-0.5">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <Image
                    src={creator.avatar}
                    alt=""
                    width={96}
                    height={96}
                    preload
                    className="size-24 shrink-0 rounded-float object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2 md:items-start">
                      <h1 className="type-title text-white max-md:text-[30px]/[1.25]">{creator.name}</h1>
                      <span className="rounded-pill bg-secondary-400 px-6 py-2 type-label-m text-neutral-950">
                        Creator
                      </span>
                    </div>
                    <p className="type-body-m text-neutral-50 md:type-body-l">{creator.tagline}</p>
                  </div>
                </div>
                <div className="type-body-m text-neutral-50 md:type-body-l">
                  {creator.bio.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <ul className="flex flex-wrap gap-4">
                  {stats.map(({ value, label }) => (
                    <li
                      key={label}
                      className="flex h-[46px] items-center gap-2 rounded-pill bg-white px-6 type-label-l text-neutral-950"
                    >
                      <span className="text-primary-800">{value}</span>
                      {label}
                    </li>
                  ))}
                </ul>
                {/* Static until there are accounts. */}
                <Button>Follow</Button>
              </div>
            </div>
          </div>
        </BlueBand>

        <section
          id="courses"
          aria-labelledby="courses-heading"
          className="container-page scroll-mt-6 pt-12 pb-16 md:pt-[62px] md:pb-[61px]"
        >
          <h2 id="courses-heading" className="sr-only">
            Courses by {creator.name}
          </h2>
          <FilterBar key={stateKey} query={query} pathname={pathname} />

          {items.length ? (
            <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2 xl:grid-cols-[repeat(3,minmax(0,373px))] xl:gap-10">
              {items.map(({ id, course }) => (
                <CourseCard key={id} course={course} />
              ))}
            </div>
          ) : (
            <div className="mt-16 flex flex-col items-center gap-6 py-16 text-center md:mt-10">
              <p className="type-body-l text-ink">No courses found</p>
              <ButtonLink href={pathname} variant="outline">
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
