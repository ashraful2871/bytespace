import Image from "next/image";
import { SearchIcon } from "@/components/icons";
import BlueBand from "@/components/layout/BlueBand";
import { Button } from "@/components/ui/Button";
import { HappyStudentsCard, ProgressCard, TopicCard } from "@/components/ui/FloatingCards";
import Ornament from "@/components/ui/Ornament";

// Figma 46:79, in 1440 frame coordinates. Each Figma image rect sits 2–4px left of its frame, and the
// mirrored spring's frame x (358) is its right edge after the flip, so these are the positions measured
// on Home.png rather than the frame values.
const ornaments = [
  { shape: "spring-a", tint: "lime", size: 385, x: -122, y: 221 },
  { shape: "spring-a", tint: "white", size: 175, x: 184, y: 477, mirrored: true },
  { shape: "torus", tint: "white", size: 342, x: 14, y: 681 },
  { shape: "pyramid", tint: "white", size: 188, x: 1104, y: 464 },
  { shape: "cylinder", tint: "lime", size: 370, x: 1227, y: 221 },
  { shape: "spring-b", tint: "white", size: 330, x: 1124, y: 672 },
] as const;

// Figma 1:1695 Hero_Frame: 1440×1024. The text block starts at y=169 (49px under the 120px header).
export default function Hero() {
  return (
    <BlueBand height={1024} className="lg:min-h-(--band-h)">
      <div aria-hidden className="design-stage z-20 hidden md:block">
        {ornaments.map((ornament) => (
          <Ornament key={`${ornament.shape}-${ornament.x}`} {...ornament} />
        ))}
      </div>

      <div className="relative z-10 container-page flex flex-col items-center gap-10 pt-10 text-center md:gap-[60px] md:pt-[49px]">
        <div className="flex flex-col items-center gap-5 md:gap-8">
          <h1 className="max-w-[935px] font-poppins text-[40px]/[1.15] font-semibold tracking-[-0.01em] text-white md:type-heading-l">
            Get Access to Hundreds Courses Available
          </h1>
          <p className="type-body-l text-neutral-100 max-md:text-base lg:whitespace-nowrap">
            Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.
          </p>
        </div>

        <form role="search" action="/courses" className="flex w-full max-w-[581px] flex-col gap-4 sm:flex-row sm:items-start">
          <label className="flex h-[52px] items-center gap-2 rounded-pill bg-white px-6 py-3 text-neutral-400 focus-within:ring-2 focus-within:ring-secondary-400 sm:flex-1">
            <SearchIcon className="shrink-0" />
            <span className="sr-only">Search courses</span>
            <input
              type="search"
              name="q"
              placeholder="Course, topic, creator"
              className="w-full min-w-0 bg-transparent type-body-l text-neutral-950 outline-none placeholder:text-neutral-400"
            />
          </label>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <HeroVisual />
    </BlueBand>
  );
}

/**
 * The arc, student and cards as one 1150×512 sub-stage whose origin is frame (145,512). It is exact from
 * `lg` and scales down with `zoom` below; the section clips the arc and the student's bottom 29px.
 */
function HeroVisual() {
  return (
    <div className="relative mx-auto mt-6 h-[512px] w-[1150px] [zoom:0.31] sm:[zoom:0.54] md:[zoom:0.64] lg:absolute lg:top-[512px] lg:left-[calc(50%-575px)] lg:mt-0 lg:[zoom:1]">
      {/* Figma 1:1866: a ring (stroke 320), centred on the frame at left calc(50% - 0.5px). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/svg/lime-arc.svg"
        alt=""
        aria-hidden
        width={1149}
        height={1149}
        className="absolute top-[70px] left-0 max-w-none"
      />
      <Image
        src="/images/hero/student.webp"
        alt="Smiling student with headphones holding a laptop"
        width={578}
        height={541}
        preload
        className="absolute top-0 left-[286px] h-[541px] w-[578px] max-w-none object-cover drop-shadow-float"
      />
      <ProgressCard className="absolute top-[139px] left-[697px] max-sm:hidden" />
      <HappyStudentsCard className="absolute top-[325px] left-[183px] max-sm:hidden" />
      {/* The Topic card is the top layer in Figma, above the ornaments (no transform here, so z-30 reaches them). */}
      <TopicCard className="absolute top-[127px] left-[259px] z-30 max-sm:hidden" />
    </div>
  );
}
