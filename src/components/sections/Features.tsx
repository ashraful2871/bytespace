import Image from "next/image";
import { CheckCircleIcon } from "@/components/icons";
import CourseCard from "@/components/ui/CourseCard";
import FloatingCard from "@/components/ui/FloatingCard";
import FloatShadow from "@/components/ui/FloatShadow";
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

const creatorPerks = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

const heading = "type-heading-m text-neutral-950 max-md:text-[30px]/[1.25]";
const body = "type-body-m text-neutral-700 md:type-body-l";

export default function Features() {
  return (
    <section className="@container relative overflow-hidden bg-surface">
      <div className="relative lg:zoom-frame">
        <div aria-hidden className="design-stage">
          <Glow tone="blue" opacity={0.24} x={722} y={789} size={1137} />
          <Glow tone="lime" opacity={0.4} x={-152} y={-465} size={1137} />
          <Glow tone="blue" opacity={0.16} x={-508} y={184} size={1137} />
          <Glow tone="blue" opacity={0.08} x={811} y={-457} size={1137} />
          <Glow tone="lime" opacity={0.6} x={-287} y={946} size={672} />
        </div>

        <div className="relative container-page py-16 md:py-[120px] lg:max-w-none lg:px-[120px]">
          <div className="flex flex-col gap-16 md:gap-[72px] lg:mr-[-59px] lg:ml-px">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-[63px]">
              <div className="flex min-w-0 flex-col gap-6 md:gap-10 lg:w-[574px] lg:shrink-0">
                <h2 className={`max-w-[577px] ${heading}`}>
                  Your Path to Professional Growth Starts Here!
                </h2>
                <p className={`max-w-[477px] ${body}`}>
                  Explore our curated selection of courses tailored to enhance
                  your capabilities and accelerate your career journey. Whether
                  you are looking to sharpen specific skills, gain industry
                  expertise, or embark on a new career path entirely, we have
                  the resources you need.
                </p>
                <dl className="flex items-end gap-14">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse">
                      <dt className={body}>{stat.label}</dt>
                      <dd className="type-display-xs text-primary-800">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <PathVisual />
            </div>

            <div className="flex flex-col gap-10 lg:mr-[58px] lg:flex-row-reverse lg:items-center lg:gap-[79px]">
              <div className="flex min-w-0 flex-col gap-6 md:gap-10 lg:w-[580px] lg:shrink-0">
                <h2 className={`max-w-[391px] ${heading}`}>
                  Create &amp; Manage Courses Easily.
                </h2>
                <p className={`max-w-[574px] ${body}`}>
                  <strong className="font-bold text-neutral-950">
                    ByteSpace
                  </strong>{" "}
                  supports individuals or entities in the creation, publication,
                  and administration of educational courses.
                </p>
                <ul className="flex flex-col gap-4">
                  {creatorPerks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-end gap-2 type-label-l text-neutral-950"
                    >
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

function PathVisual() {
  return (
    <div
      aria-hidden
      inert
      className="relative h-[552px] w-[621px] shrink-0 self-center [zoom:0.5] sm:[zoom:0.9] md:[zoom:1]"
    >
      <CourseCard
        course={courses[0]}
        variant="relaxed"
        className="absolute top-0 left-0 w-[373px]"
      />
      <FloatShadow
        src="/images/hero/student-shadow.webp"
        x={0}
        y={12}
        width={577}
        height={540}
      />
      <Image
        src="/images/hero/student.webp"
        alt=""
        width={577}
        height={540}
        className="absolute top-3 left-0 h-[540px] w-[577px] max-w-none object-cover"
      />
      <ProgressCard
        variant="relaxed"
        className="absolute top-[213px] left-[345px]"
      />
      <Ornament shape="spring-b" tint="lime" size={215} x={404} y={67} />
    </div>
  );
}

function CreatorVisual() {
  return (
    <div
      aria-hidden
      className="relative h-[596px] w-[541px] shrink-0 self-center [zoom:0.58] sm:[zoom:1]"
    >
      <FloatingCard tone="blue" className="absolute top-11 left-0 w-[232px]">
        <div>
          <p className="type-label-m">Total Revenue</p>
          <p className="text-[10px]/[1.2]">July 1-28</p>
        </div>
        <div className="flex w-[200px] items-center justify-between">
          <p className="type-heading-s">$120.29</p>
          <Pill>+12$</Pill>
        </div>
        <ProgressBar
          value={56}
          label="Revenue goal"
          track="white"
          className="w-[200px]"
        />
      </FloatingCard>

      <FloatingCard
        tone="blue"
        className="absolute top-[194px] left-0 w-[134px]"
      >
        <div>
          <p className="type-label-m">Year to Date</p>
          <p className="text-[10px]/[1.2]">2023</p>
        </div>
        <p className="type-heading-s whitespace-nowrap">$1,200.38</p>
        <Pill className="self-start">+12$</Pill>
      </FloatingCard>

      <FloatShadow
        src="/images/features/creator-photo-shadow.webp"
        x={28}
        y={0}
        width={435}
        height={596}
      />
      {/* The photo is larger than its frame and cropped, as in the design. */}
      <div className="absolute top-0 left-7 h-[596px] w-[435px] overflow-hidden">
        <Image
          src="/images/features/creator-photo.webp"
          alt=""
          width={683}
          height={683}
          sizes="683px"
          className="absolute top-0 left-[-28.51%] h-[114.6%] w-[157.01%] max-w-none"
        />
      </div>

      <HappyStudentsCard
        variant="relaxed"
        className="absolute top-[413px] left-[283px]"
      />
      <Ornament shape="spring-a" tint="lime" size={215} x={303} y={114} />
    </div>
  );
}
