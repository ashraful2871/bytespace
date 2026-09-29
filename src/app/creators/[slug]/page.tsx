import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlueBand from "@/components/layout/BlueBand";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/ui/CourseCard";
import Placeholder from "@/components/ui/Placeholder";
import { courses } from "@/data/courses";
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

export default async function CreatorPage({ params }: PageProps<"/creators/[slug]">) {
  const creator = getCreator((await params).slug);
  if (!creator) notFound();

  const creatorCourses = courses.filter((course) => course.creatorSlug === creator.slug);

  return (
    <>
      <main className="flex flex-col">
        <BlueBand height={592}>
          <div className="container-page flex flex-col gap-6 pt-10 pb-16 text-white md:pt-[52px]">
            <div className="flex flex-col gap-2">
              <h1 className="type-title max-md:text-[30px]/[1.25]">{creator.name}</h1>
              <p className="type-body-l text-neutral-100">{creator.tagline}</p>
            </div>
            <p className="type-body-s">
              {creator.products} Products · {creator.followers} Followers
            </p>
          </div>
        </BlueBand>

        <div className="container-page flex flex-col gap-10 py-16">
          <Placeholder phase="12">Profile band, stats and the filter bar.</Placeholder>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[repeat(3,minmax(0,373px))] xl:gap-10">
            {creatorCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
