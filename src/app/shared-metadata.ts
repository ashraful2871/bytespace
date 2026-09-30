import type { Metadata } from "next";
import { getCourse } from "@/data/courses";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
);

export const siteName = "ByteSpace";

export const defaultTitle = `${siteName} - Get Access to Hundreds of Courses`;

export const siteDescription =
  "Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.";

type PageMetadataOptions = {
  title?: string;
  description: string;
  path: string;
};

export function pageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;

  return {
    ...(title && { title: { absolute: fullTitle } }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary", title: fullTitle, description },
  };
}

export async function courseMetadata(
  params: Promise<{ slug: string }>,
  tab?: "Lessons" | "Reviews",
) {
  const course = getCourse((await params).slug);
  if (!course) return {};

  return pageMetadata({
    title: tab ? `${tab}: ${course.fullTitle}` : course.fullTitle,
    description: course.subtitle,
    path: tab
      ? `/courses/${course.slug}/${tab.toLowerCase()}`
      : `/courses/${course.slug}`,
  });
}
