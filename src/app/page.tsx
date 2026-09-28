import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Courses from "@/components/Courses";
import LearningPaths from "@/components/LearningPaths";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <Brands />
      <Courses />
      <LearningPaths />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}
