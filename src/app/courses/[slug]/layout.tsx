import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseHeader from "@/components/course/CourseHeader";
import CourseSidebar from "@/components/course/CourseSidebar";
import CourseTabs from "@/components/course/CourseTabs";
import CourseVideo from "@/components/course/CourseVideo";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { courses, getCourse } from "@/data/courses";
import { getCreator } from "@/data/creators";
import { pageMetadata } from "@/app/shared-metadata";

// Every course is prerendered; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const course = getCourse((await params).slug);
  return course
    ? pageMetadata({ title: course.fullTitle, description: course.subtitle, path: `/courses/${course.slug}` })
    : {};
}

// Left column width beside the sidebar (360 + 40 gap below xl, 412 + 48 from xl, capped at Figma's 720/725).
const main = "lg:w-[calc(100%-400px)]";

/**
 * Course detail shell shared by the About, Lessons and Reviews tabs (Figma 55:4066). One full-bleed grid holds the
 * page top: the band spans the Header, the title block and the video row and ends 62px below the video (957 at
 * 1440), so it follows the video at every width. The sidebar spans the video row and the tab row (the last row is
 * 1fr, so the sidebar's height never stretches the video row) and hangs over the white area. It's static (D5).
 * Figma puts the About tabs 63px below the band and the Lessons and Reviews tabs 78px below; all three use 78 (D3).
 */
export default async function CourseLayout({ children, params }: LayoutProps<"/courses/[slug]">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  return (
    <>
      <main className="grid grid-cols-[minmax(var(--gutter),1fr)_minmax(0,1200px)_minmax(var(--gutter),1fr)] pb-16 lg:grid-rows-[auto_auto_auto_1fr]">
        <div aria-hidden className="col-span-full row-span-3 row-start-1 -mb-[62px] bg-blueprint" />
        <div className="col-span-full row-start-1">
          <ScrollToTop />
          <Header />
        </div>

        <CourseHeader course={course} className="col-start-2 row-start-2" />
        <CourseVideo
          title={course.fullTitle}
          className={`col-start-2 row-start-3 mt-8 lg:mt-[59px] ${main} xl:ml-[5px] xl:w-[min(720px,calc(100%-460px))]`}
        />
        <CourseSidebar
          course={course}
          creator={getCreator(course.creatorSlug)}
          className="relative z-10 col-start-2 row-start-4 mt-6 self-start lg:row-span-2 lg:row-start-3 lg:mt-[59px] lg:w-[360px] lg:justify-self-end xl:w-[412px]"
        />

        <div
          className={`col-start-2 row-start-5 mt-12 flex min-w-0 flex-col gap-10 lg:row-start-4 lg:mt-[140px] ${main} xl:w-[min(725px,calc(100%-460px))]`}
        >
          <CourseTabs slug={course.slug} />
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
