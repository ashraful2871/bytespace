import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  BadgeIcon,
  ConnectWithoutContactIcon,
  TopicIcon,
  VideocamIcon,
  type IconProps,
} from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import type { Course, IncludeIcon } from "@/data/courses";
import type { Creator } from "@/data/creators";

const includeIcons: Record<IncludeIcon, ComponentType<IconProps>> = {
  topic: TopicIcon,
  videocam: VideocamIcon,
  badge: BadgeIcon,
  consultation: ConnectWithoutContactIcon,
};

// Figma sets these 16px texts on a 26px line (box heights 26, 52), not type-body-m's 24.
const body = "type-body-m leading-[26px]";
const heading = "type-heading-xs leading-[1.2] text-neutral-950";

type CourseSidebarProps = { course: Course; creator?: Creator; className?: string };

/**
 * Figma 55:4206: the 412×959 card (360 wide below xl) with the curriculum preview, price, includes and creator.
 * Its sections sit 24 apart; the creator's divider is a 0px Figma line in the middle of a 48px gap.
 */
export default function CourseSidebar({ course, creator, className = "" }: CourseSidebarProps) {
  const { curriculum } = course;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <aside
      aria-label="Course summary"
      className={`flex flex-col gap-6 rounded-card border border-neutral-200 bg-white p-6 md:p-[39px] ${className}`}
    >
      <section aria-labelledby="curriculum-heading">
        <h2 id="curriculum-heading" className={heading}>
          {curriculum.lessons} Lessons ({curriculum.hours} hours)
        </h2>
        <ol className="mt-6 flex flex-col gap-3 pr-1.5">
          {curriculum.preview.map((lesson) => (
            <li key={lesson.no} className="flex items-start justify-between gap-4">
              <span className="flex gap-2 type-label-m text-neutral-950">
                <span className="w-6 shrink-0">{pad(lesson.no)}</span>
                <span className="max-w-[198px] leading-[19px]">{lesson.title}</span>
              </span>
              <span className={`shrink-0 text-primary-800 ${body}`}>{lesson.minutes} mins</span>
            </li>
          ))}
        </ol>
        <p className={`mt-3 text-neutral-700 ${body}`}>{curriculum.more} more videos</p>
      </section>

      <section aria-label="Enroll" className="flex flex-col gap-6">
        <p className={`text-neutral-700 ${body}`}>{course.enrollText}</p>
        <p className="flex items-end">
          <span className="font-poppins text-[32px]/[38px] font-semibold text-primary-800">${course.price}</span>
          <span className={`text-body ${body}`}>/lifetime</span>
        </p>
        <ButtonLink href="/signup" fullWidth>
          Enroll Now
        </ButtonLink>
      </section>

      {/* "include" is Figma's copy (55:4234). */}
      <section aria-labelledby="includes-heading" className="flex flex-col gap-6">
        <h2 id="includes-heading" className={heading}>
          This course include
        </h2>
        <ul className="flex flex-col gap-3">
          {course.includes.map(({ icon, label }) => {
            const Icon = includeIcons[icon];
            return (
              <li key={label} className={`flex items-start gap-2 text-neutral-700 ${body}`}>
                <Icon className="shrink-0 text-primary-800" />
                {label}
              </li>
            );
          })}
        </ul>
      </section>

      {creator && (
        <section
          aria-label="Creator"
          className="flex flex-col items-start gap-6 border-t border-neutral-100 pt-[23px]"
        >
          <div className="flex items-start gap-3">
            <Image
              src={creator.avatarSm}
              alt=""
              width={52}
              height={52}
              className="size-[52px] shrink-0 rounded-full bg-neutral-100 object-cover"
            />
            <div>
              <p className="type-label-l text-neutral-950">{creator.name}</p>
              <p className={`text-neutral-400 ${body}`}>{creator.role}</p>
            </div>
          </div>
          <p className={`text-neutral-700 ${body}`}>{creator.blurb}</p>
          <Link
            href={`/creators/${creator.slug}`}
            className="tap-target inline-flex rounded-pill border border-neutral-200 px-[15px] py-[7px] type-label-m leading-[19px] text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden"
          >
            See Full Profile
          </Link>
        </section>
      )}
    </aside>
  );
}
