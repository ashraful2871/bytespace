import type { Metadata } from "next";

// Set NEXT_PUBLIC_SITE_URL to the deployed origin so canonical, Open Graph and sitemap URLs resolve against it.
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

export const siteName = "ByteSpace";

export const siteDescription =
  "Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.";

/**
 * Title, description, canonical URL and Open Graph for one route. A segment's `openGraph` replaces its parent's
 * (metadata merges shallowly), so every route builds the whole object here. The title is absolute: a layout's plain
 * title (the course shell's) would otherwise drop the root "%s | ByteSpace" template from its tab pages.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Get Access to Hundreds of Courses`;
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
