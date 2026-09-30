import Link from "next/link";
import type { ReactNode } from "react";
import CourseCard from "@/components/ui/CourseCard";
import { HappyStudentsCard } from "@/components/ui/FloatingCards";
import Ornament from "@/components/ui/Ornament";
import { courses } from "@/data/courses";
import { cn } from "@/lib/cn";

type AuthScreenProps = {
  /** The large line at the top left, e.g. "Sign in with ease". */
  tagline: string;
  intro: string;
  /** The contents of the white form card. */
  children: ReactNode;
};

/**
 * The shared login/signup screen: copy and artwork on the left, the form card on the right. Below lg the artwork
 * is hidden and the card sits under the copy. From md the card has a fixed height, which the auth layout relies on
 * to scale the screen to the window (keep its --fit-h values in step if that changes).
 */
export default function AuthScreen({ tagline, intro, children }: AuthScreenProps) {
  return (
    <div className="container-page flex flex-col gap-10 pb-16 md:pb-10 lg:flex-row lg:items-start lg:gap-0">
      <div className="@container min-w-0 lg:flex-1 lg:pr-10 xl:pr-0">
        {/* The min-height keeps the artwork at the same height on both pages. */}
        <div className="mx-auto flex max-w-[579px] flex-col gap-4 text-white lg:mx-0 lg:ml-0.5 lg:min-h-[127px] lg:max-w-[475px]">
          <p className="type-heading-xs leading-[1.2]">{tagline}</p>
          <p className="type-body-m text-neutral-50 md:type-body-l">{intro}</p>
        </div>
        <AuthArtwork />
      </div>

      <div className="relative mx-auto w-full max-w-[579px] rounded-card bg-white px-6 py-10 sm:px-[63px] sm:pt-[61px] md:h-[784px] md:pb-0 lg:mx-0 lg:shrink-0">
        {children}
      </div>
    </div>
  );
}

/**
 * Course cards and shapes arranged like a product shot. It shrinks with its column once that's narrower than
 * 621px. Purely decorative, so it's hidden from screen readers and made inert (the cards contain links).
 */
function AuthArtwork() {
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
      <Ornament shape="torus" tint="lime" size={146} x={52} y={15} />
      <Ornament shape="pyramid" tint="lime" size={188} x={-2} y={397} />
      <Ornament shape="spring-a" tint="white" size={175} x={374} y={321} mirrored />
    </div>
  );
}

/** The small eyebrow line above the page's h1. */
export function AuthHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <hgroup className="flex flex-col">
      <p className="type-body-l text-primary-800">{eyebrow}</p>
      <h1 className="type-heading-m text-neutral-950 max-md:text-[30px]/[1.25]">{title}</h1>
    </hgroup>
  );
}

type AuthSwitchProps = {
  prompt: string;
  href: string;
  label: string;
  className?: string;
};

/** The line under the form that links to the other auth page: "Already have an account? Login". */
export function AuthSwitch({ prompt, href, label, className }: AuthSwitchProps) {
  return (
    <p className={cn("text-center type-paragraph text-neutral-700", className)}>
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
