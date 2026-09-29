import Image from "next/image";
import { CheckCircleIcon } from "@/components/icons";
import CourseCard from "@/components/ui/CourseCard";
import FloatingCard from "@/components/ui/FloatingCard";
import { HappyStudentsCard, ProgressCard } from "@/components/ui/FloatingCards";
import Glow from "@/components/ui/Glow";
import Ornament from "@/components/ui/Ornament";
import Pill from "@/components/ui/Pill";
import ProgressBar from "@/components/ui/ProgressBar";
import { courses } from "@/data/courses";

const stats = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16", label: "Creators" },
];

const creatorPerks = ["Share Your Expertise", "Monetize Your Passion", "Flexibility and Autonomy", "Build a Community"];

// From md the line heights are rounded to Figma's frame heights (106 / 145 / 58), as in SectionHeader.
const heading = "type-heading-m text-neutral-950 max-md:text-[30px]/[1.25] md:leading-[53px]";
const body = "type-body-l text-neutral-700 max-md:text-base md:leading-[29px]";

// Figma 34:1159 Frame 15: 1440×1460. From lg the section is that frame, laid out in 1440 px and scaled to the
// window with `zoom-frame` (0.71 at 1024, 1.33 at 1920), so it looks like Figma at every desktop width. Below lg
// the rows stack. The content frame is 1258 wide at x=121: the rows reach 59px into the right gutter, row 1
// fills it (574 + 63 + 621) and row 2 is 1200 (541 + 79 + 580).
export default function Features() {
  return (
    <section id="creators" className="@container relative overflow-hidden bg-surface">
      <div className="relative lg:zoom-frame">
        {/* The glow SVGs carry a 40px blur bleed, so each sits 40/39px up-left of its Figma box. Their
          gradients fade to nothing, and the section clips them. */}
        <div aria-hidden className="design-stage">
          <Glow src="/images/svg/features-glows.svg" x={-548} y={-505} size={2536} height={2471} />
          <Glow src="/images/svg/features-glow-left.svg" x={-327} y={906} size={752} />
        </div>

        <div className="relative container-page py-16 md:py-[120px] lg:max-w-none lg:px-[120px]">
          <div className="flex flex-col gap-16 md:gap-[72px] lg:mr-[-59px] lg:ml-px">
            {/* Figma 34:1157 */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-[63px]">
              <div className="flex min-w-0 flex-col gap-6 md:gap-10 lg:w-[574px] lg:shrink-0">
                <h2 className={`max-w-[577px] ${heading}`}>Your Path to Professional Growth Starts Here!</h2>
                <p className={`max-w-[477px] ${body}`}>
                  Explore our curated selection of courses tailored to enhance your capabilities and accelerate your
                  career journey. Whether you are looking to sharpen specific skills, gain industry expertise, or embark
                  on a new career path entirely, we have the resources you need.
                </p>
                <dl className="flex items-end gap-14">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse">
                      <dt className={body}>{stat.label}</dt>
                      <dd className="type-display-xs text-primary-800">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <PathVisual />
            </div>

            {/* Figma 34:1158: the visual is on the left from lg, and after the text when stacked. */}
            <div className="flex flex-col gap-10 lg:mr-[58px] lg:flex-row-reverse lg:items-center lg:gap-[79px]">
              <div className="flex min-w-0 flex-col gap-6 md:gap-10 lg:w-[580px] lg:shrink-0">
                <h2 className={`max-w-[391px] ${heading}`}>Create &amp; Manage Courses Easily.</h2>
                <p className={`max-w-[574px] ${body}`}>
                  <strong className="font-bold text-neutral-950 md:leading-7">ByteSpace</strong> supports individuals or
                  entities in the creation, publication, and administration of educational courses.
                </p>
                <ul className="flex flex-col gap-4">
                  {creatorPerks.map((perk) => (
                    <li key={perk} className="flex items-end gap-2 type-label-l text-neutral-950">
                      <CheckCircleIcon className="shrink-0 text-primary-800" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              <CreatorVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Figma 34:1155: 621×552. The course card, the student cut-out, the progress card and a spring, placed in
 * the visual's own coordinates and scaled with `zoom` below md.
 */
function PathVisual() {
  return (
    <div className="relative h-[552px] w-[621px] shrink-0 self-center [zoom:0.5] sm:[zoom:0.9] md:[zoom:1]">
      <CourseCard course={courses[0]} variant="relaxed" className="absolute top-0 left-0 w-[373px]" />
      <Image
        src="/images/hero/student.webp"
        alt=""
        width={577}
        height={540}
        className="absolute top-3 left-0 h-[540px] w-[577px] max-w-none object-cover drop-shadow-float"
      />
      <ProgressCard variant="relaxed" className="absolute top-[213px] left-[345px]" />
      {/* Figma's image rect sits 2px left of its 406,67 frame. */}
      <Ornament shape="spring-b" tint="lime" size={215} x={404} y={67} />
    </div>
  );
}

/**
 * Figma 34:1156: 541×596. Bottom to top: the revenue and year-to-date cards, the creator photo, the Happy
 * Students card and a spring.
 */
function CreatorVisual() {
  return (
    <div className="relative h-[596px] w-[541px] shrink-0 self-center [zoom:0.58] sm:[zoom:1]">
      <FloatingCard tone="blue" className="absolute top-11 left-0 w-[232px]">
        <div>
          <p className="type-label-m">Total Revenue</p>
          <p className="text-[10px]/[1.2]">July 1-28</p>
        </div>
        <div className="flex w-[200px] items-center justify-between">
          <p className="type-heading-s">$120.29</p>
          <Pill>+12$</Pill>
        </div>
        <ProgressBar value={56} label="Revenue goal" track="white" className="w-[200px]" />
      </FloatingCard>

      <FloatingCard tone="blue" className="absolute top-[194px] left-0 w-[134px]">
        <div>
          <p className="type-label-m">Year to Date</p>
          <p className="text-[10px]/[1.2]">2023</p>
        </div>
        <p className="type-heading-s whitespace-nowrap">$1,200.38</p>
        <Pill className="self-start">+12$</Pill>
      </FloatingCard>

      {/* Figma 34:1011: the image fill is cropped inside a 435×596 frame. */}
      <div className="absolute top-0 left-7 h-[596px] w-[435px] overflow-hidden drop-shadow-float">
        <Image
          src="/images/features/creator-photo.webp"
          alt="Creator with headphones holding a tablet"
          width={683}
          height={683}
          sizes="683px"
          className="absolute top-0 left-[-28.51%] h-[114.6%] w-[157.01%] max-w-none"
        />
      </div>

      <HappyStudentsCard variant="relaxed" className="absolute top-[413px] left-[283px]" />
      <Ornament shape="spring-a" tint="lime" size={215} x={303} y={114} />
    </div>
  );
}
