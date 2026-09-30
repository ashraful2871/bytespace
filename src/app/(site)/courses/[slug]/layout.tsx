import { notFound } from "next/navigation";
import { courseMetadata } from "@/app/shared-metadata";
import CourseHeader from "@/components/course/CourseHeader";
import CourseSidebar from "@/components/course/CourseSidebar";
import CourseTabs from "@/components/course/CourseTabs";
import CourseVideo from "@/components/course/CourseVideo";
import Header from "@/components/layout/Header";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { courses, getCourse } from "@/data/courses";
import { getCreator } from "@/data/creators";

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: LayoutProps<"/courses/[slug]">) {
  return courseMetadata(params);
}

const mainColumn = "lg:w-[calc(100%-400px)]";

export default async function CourseLayout({
  children,
  params,
}: LayoutProps<"/courses/[slug]">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  return (
    <div className="grid grid-cols-[minmax(var(--gutter),1fr)_minmax(0,1200px)_minmax(var(--gutter),1fr)] pb-16 lg:grid-rows-[auto_auto_auto_1fr]">
      <div
        aria-hidden
        className="col-span-full row-span-3 row-start-1 -mb-[62px] bg-blueprint"
      />
      <div className="col-span-full row-start-1">
        <ScrollToTop />
        <Header />
      </div>

      <CourseHeader course={course} className="col-start-2 row-start-2" />
      <CourseVideo
        title={course.fullTitle}
        className={`col-start-2 row-start-3 mt-8 lg:mt-[59px] ${mainColumn} xl:ml-[5px] xl:w-[min(720px,calc(100%-460px))]`}
      />
      <CourseSidebar
        course={course}
        creator={getCreator(course.creatorSlug)}
        className="relative z-10 col-start-2 row-start-4 mt-6 self-start lg:row-span-2 lg:row-start-3 lg:mt-[59px] lg:w-[360px] lg:justify-self-end xl:w-[412px]"
      />

      <div
        className={`col-start-2 row-start-5 mt-12 flex min-w-0 flex-col gap-10 lg:row-start-4 lg:mt-[140px] ${mainColumn} xl:w-[min(725px,calc(100%-460px))]`}
      >
        <CourseTabs slug={course.slug} />
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}
