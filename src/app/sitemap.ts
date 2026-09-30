import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/shared-metadata";
import { courses } from "@/data/courses";
import { creators } from "@/data/creators";

// Every indexable page: the catalogue and its filtered views share one canonical (/courses), so only the base is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteUrl).href;
  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/courses"), changeFrequency: "daily", priority: 0.9 },
    ...courses.flatMap(({ slug }) => [
      { url: url(`/courses/${slug}`), changeFrequency: "weekly" as const, priority: 0.8 },
      { url: url(`/courses/${slug}/lessons`), changeFrequency: "weekly" as const, priority: 0.6 },
      { url: url(`/courses/${slug}/reviews`), changeFrequency: "weekly" as const, priority: 0.6 },
    ]),
    ...creators.map(({ slug }) => ({
      url: url(`/creators/${slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: url("/login"), changeFrequency: "yearly", priority: 0.3 },
    { url: url("/signup"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
