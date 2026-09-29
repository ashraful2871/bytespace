import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlueBand from "@/components/layout/BlueBand";
import Footer from "@/components/layout/Footer";
import NavLink from "@/components/layout/NavLink";
import { courses, getCourse } from "@/data/courses";

// Every course is prerendered; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const course = getCourse((await params).slug);
  return course ? { title: course.fullTitle, description: course.subtitle } : {};
}

/** Course detail shell shared by the About, Lessons and Reviews tabs. */
export default async function CourseLayout({ children, params }: LayoutProps<"/courses/[slug]">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  const base = `/courses/${course.slug}`;
  const tabs = [
    { label: "About", href: base },
    { label: "Lessons", href: `${base}/lessons` },
    { label: "Reviews", href: `${base}/reviews` },
  ];

  return (
    <>
      <main className="flex flex-col">
        <BlueBand height={957}>
          <div className="container-page flex flex-col gap-6 pt-10 pb-16 text-white md:pt-[52px]">
            <div className="flex flex-col gap-2">
              <h1 className="type-title max-md:text-[30px]/[1.25]">{course.fullTitle}</h1>
              <p className="type-body-l text-neutral-100">{course.subtitle}</p>
            </div>
            <p className="type-body-s">by {course.author}</p>
          </div>
        </BlueBand>

        <div className="container-page flex flex-col gap-10 py-16">
          <nav aria-label="Course sections">
            <ul className="flex gap-4">
              {tabs.map((tab) => (
                <li key={tab.href}>
                  <NavLink
                    link={tab}
                    className="block rounded-pill px-4 py-3 type-label-m transition-colors"
                    activeClassName="bg-primary-800 text-white"
                    inactiveClassName="text-body hover:bg-neutral-50"
                  />
                </li>
              ))}
            </ul>
          </nav>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
