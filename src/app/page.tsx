import Hero from "@/components/sections/Hero";
import Brands from "@/components/sections/Brands";
import Courses from "@/components/sections/Courses";
import LearningPaths from "@/components/sections/LearningPaths";
import Features from "@/components/sections/Features";
import CreatorCta from "@/components/sections/CreatorCta";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";
import { pageMetadata, siteDescription } from "@/app/shared-metadata";

export const metadata = pageMetadata({ description: siteDescription, path: "/" });

export default function Home() {
  return (
    <>
      <main className="flex flex-col">
        <Hero />
        <Brands />
        <Courses />
        <LearningPaths />
        <Features />
        <CreatorCta />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
