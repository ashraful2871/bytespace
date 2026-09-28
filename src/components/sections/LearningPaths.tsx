import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { learningPaths } from "@/data/courses";

export default function LearningPaths() {
  return (
    <section className="bg-white pt-16 pb-20 md:pt-[72px] md:pb-[120px]">
      <div className="container-page">
        <SectionHeader
          title="Explore Diverse Learning Paths at Bytespace"
          size="title"
          description="At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories."
        />

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-[68px] lg:grid-cols-6 lg:gap-10">
          {learningPaths.map((path) => (
            <li key={path.label}>
              <Link
                href="#courses"
                className="flex aspect-square flex-col items-center rounded-[20px] border border-neutral-200 bg-white pt-[35px] text-xl leading-6 text-neutral-950 transition-colors hover:border-primary-800"
              >
                <Image src={path.icon} alt="" width={60} height={60} className="rounded-full" />
                <span className="mt-3">{path.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
