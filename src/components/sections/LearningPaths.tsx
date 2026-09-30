import Link from "next/link";
import type { ComponentType } from "react";
import {
  ComputerIcon,
  ConnectWithoutContactIcon,
  DesignIcon,
  DeveloperModeIcon,
  DomainIcon,
  PhotoCameraFrontIcon,
  type IconProps,
} from "@/components/icons";
import SectionHeader from "@/components/ui/SectionHeader";
import { learningPaths, type LearningPathIcon } from "@/data/categories";

const icons: Record<LearningPathIcon, ComponentType<IconProps>> = {
  design: DesignIcon,
  development: DeveloperModeIcon,
  it: ComputerIcon,
  business: DomainIcon,
  marketing: ConnectWithoutContactIcon,
  photography: PhotoCameraFrontIcon,
};

export default function LearningPaths() {
  return (
    <section className="bg-white pt-16 pb-20 md:pt-[72px] md:pb-[120px]">
      <div className="container-page">
        <SectionHeader
          title="Explore Diverse Learning Paths at Bytespace"
          size="title"
          description="At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories."
        />

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:mt-[68px] lg:grid-cols-6 xl:-mx-px xl:gap-10">
          {learningPaths.map((path) => {
            const Icon = icons[path.icon];
            return (
              <li key={path.slug}>
                <Link
                  href={`/courses?category=${path.slug}`}
                  className="flex aspect-square flex-col items-center justify-center gap-3 rounded-card border border-neutral-200 bg-white text-center type-label-xl text-neutral-950 transition-colors hover:border-primary-800 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                >
                  <span className="rounded-full bg-secondary-400 p-3">
                    <Icon size={36} />
                  </span>
                  {path.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
