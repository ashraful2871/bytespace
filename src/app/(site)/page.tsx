import { pageMetadata, siteDescription } from "@/app/shared-metadata";
import Brands from "@/components/sections/Brands";
import Courses from "@/components/sections/Courses";
import CreatorCta from "@/components/sections/CreatorCta";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import LearningPaths from "@/components/sections/LearningPaths";
import Testimonials from "@/components/sections/Testimonials";

export const metadata = pageMetadata({
  description: siteDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      <Courses />
      <LearningPaths />
      <Features />
      <CreatorCta />
      <Testimonials />
    </>
  );
}
