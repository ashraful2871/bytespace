import Link from "next/link";
import type { ReactNode } from "react";
import CourseCard from "@/components/ui/CourseCard";
import { HappyStudentsCard } from "@/components/ui/FloatingCards";
import Ornament from "@/components/ui/Ornament";
import { courses } from "@/data/courses";

type AuthScreenProps = {
  /** The white line over the collage ("Sign up and come in"). */
  tagline: string;
  intro: string;
  /** The form card's content. */
  children: ReactNode;
};

/**
 * Login and Register (Figma 49:195, 47:351): the tagline and intro at (122,120), the collage below them and the
 * 579×784 form card at (741,120). Below lg the collage is hidden and the card is centred under the copy. From md
 * the card is always 784 tall and the bottom padding 40, so the auth layout knows the screen's height and can
 * scale it to fit the window (`fit-height`); keep its --fit-h values in step with these sizes.
 */
export default function AuthScreen({ tagline, intro, children }: AuthScreenProps) {
  return (
    <div className="container-page flex flex-col gap-10 pb-16 md:pb-10 lg:flex-row lg:items-start lg:gap-0">
      <div className="@container min-w-0 lg:flex-1 lg:pr-10 xl:pr-0">
        {/* 127px is Register's copy height, so the collage starts at y=305 on both pages. */}
        <div className="mx-auto flex max-w-[579px] flex-col gap-4 text-white lg:mx-0 lg:ml-0.5 lg:min-h-[127px] lg:max-w-[475px]">
          <p className="type-heading-xs leading-[1.2]">{tagline}</p>
          <p className="type-body-m text-neutral-50 md:type-body-l">{intro}</p>
        </div>
        <AuthCollage />
      </div>

      <div className="relative mx-auto w-full max-w-[579px] rounded-card bg-white px-6 py-10 sm:px-[63px] sm:pt-[61px] md:h-[784px] md:pb-0 lg:mx-0 lg:shrink-0">
        {children}
      </div>
    </div>
  );
}

/**
 * The collage is a 723×585 stage whose origin is Figma (97,305). It keeps its 1440 size while the column is at
 * least 621px wide (the space left of the card at 1440) and zooms down with the column below that. A picture of
 * the product, so it is hidden from assistive tech and inert (the cards hold links).
 */
function AuthCollage() {
  return (
    <div
      aria-hidden
      inert
      className="relative mt-[58px] -ml-[23px] hidden h-[585px] w-[723px] lg:block"
      style={{ zoom: "min(1, tan(atan2(100cqw, 621px)))" }}
    >
      <CourseCard course={courses[1]} variant="relaxed" className="absolute top-[89px] left-[25px] w-[373px]" />
      <CourseCard course={courses[2]} variant="relaxed" className="absolute top-0 left-[136px] w-[373px]" />
      <HappyStudentsCard variant="relaxed" tone="lime" className="absolute top-[435px] left-[251px]" />
      {/* Image rects sit 2px left of their Figma frames (as on Home). The spring is mirrored, so its frame x (645)
          is its right edge: it sits at 471, like the hero's mirrored spring. */}
      <Ornament shape="torus" tint="lime" size={146} x={52} y={15} />
      <Ornament shape="pyramid" tint="lime" size={188} x={-2} y={397} />
      <Ornament shape="spring-a" tint="white" size={175} x={374} y={321} mirrored />
    </div>
  );
}

/** The centred line under the form: "Already have an account? Login". */
export function AuthSwitch({ prompt, href, label, className = "" }: { prompt: string; href: string; label: string; className?: string }) {
  return (
    <p className={`text-center type-body-m leading-[26px] text-neutral-700 ${className}`}>
      {prompt}{" "}
      <Link
        href={href}
        className="tap-target rounded-sm text-primary-800 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-800"
      >
        {label}
      </Link>
    </p>
  );
}

/** "Create an Account" over the page's h1. */
export function AuthHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <hgroup className="flex flex-col">
      <p className="type-body-l text-primary-800">{eyebrow}</p>
      <h1 className="type-heading-m text-neutral-950 max-md:text-[30px]/[1.25]">{title}</h1>
    </hgroup>
  );
}
