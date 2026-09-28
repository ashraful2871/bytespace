import Image from "next/image";
import CourseCard from "@/components/ui/CourseCard";
import { ProgressCard } from "@/components/ui/FloatingCards";
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

/** Soft lime/blue glows behind the section, placed on the 1440px design frame. */
const glow = [
  "radial-gradient(ellipse 430px 360px at 410px 110px, rgb(212 251 32 / 0.46), rgb(212 251 32 / 0.2) 45%, transparent 100%)",
  "radial-gradient(ellipse 560px 460px at 1440px 90px, rgb(0 59 226 / 0.08), transparent 100%)",
  "radial-gradient(ellipse 420px 560px at 0px 790px, rgb(0 59 226 / 0.13), rgb(0 59 226 / 0.06) 50%, transparent 100%)",
  "radial-gradient(ellipse 330px 330px at 0px 1300px, rgb(212 251 32 / 0.6), rgb(212 251 32 / 0.25) 50%, transparent 100%)",
  "radial-gradient(ellipse 520px 440px at 1330px 1380px, rgb(0 59 226 / 0.22), rgb(0 59 226 / 0.08) 55%, transparent 100%)",
].join(", ");

export default function Features() {
  return (
    <section id="creators" className="relative overflow-hidden bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 w-[1440px] -translate-x-1/2"
        style={{ backgroundImage: glow }}
      />

      <div className="relative container-page pt-16 pb-16 lg:pt-[120px] lg:pb-[60px]">
        {/* Your path to growth */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-0">
          <div className="lg:w-[560px] lg:pt-[74px]">
            <h2 className="font-poppins text-[32px]/[1.25] font-semibold text-neutral-950 md:text-display">
              Your Path to Professional Growth Starts Here!
            </h2>
            <p className="mt-6 max-w-[475px] text-base leading-[1.6] text-neutral-700 md:mt-[41px] md:text-lg md:leading-[29px]">
              Explore our curated selection of courses tailored to enhance your capabilities and
              accelerate your career journey. Whether you are looking to sharpen specific skills,
              gain industry expertise, or embark on a new career path entirely, we have the
              resources you need.
            </p>
            <dl className="mt-8 flex gap-14 md:mt-[41px]">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-[3px]">
                  <dt className="text-lg leading-6 text-neutral-700">{stat.label}</dt>
                  <dd className="text-4xl leading-[42px] font-medium text-primary-800">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <PathVisual />
        </div>

        {/* Create & manage */}
        <div className="mt-16 flex flex-col-reverse gap-12 lg:mt-[108px] lg:flex-row lg:items-start lg:gap-0">
          <Image
            src="/images/features/creator.png"
            alt="Creator with a tablet next to revenue, year-to-date and happy-students cards"
            width={600}
            height={640}
            className="mx-auto w-full max-w-[600px] lg:w-[480px] xl:w-[600px] [mask-image:linear-gradient(to_right,transparent,#000_20px,#000_calc(100%-36px),transparent),linear-gradient(to_bottom,transparent,#000_24px,#000_calc(100%-40px),transparent)] [mask-composite:intersect] lg:mr-0 lg:-ml-5 lg:shrink-0"
          />
          <div className="lg:ml-[41px] lg:pt-[89px]">
            <h2 className="font-poppins text-[32px]/[1.25] font-semibold text-neutral-950 md:text-display">
              Create &amp; Manage
              <br className="hidden md:block" /> Courses Easily.
            </h2>
            <p className="mt-6 max-w-[560px] text-base leading-[1.6] text-neutral-700 md:mt-10 md:text-lg md:leading-[29px]">
              <strong className="font-bold text-neutral-950">ByteSpace</strong> supports individuals
              or entities in the creation, publication, and administration of educational courses.
            </p>
            <ul className="mt-8 space-y-4 md:mt-[39px]">
              {creatorPerks.map((perk) => (
                <li key={perk} className="flex items-center gap-[11px] text-lg leading-6 font-medium text-neutral-950">
                  <CheckBadge />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Course card with the student and progress card layered on top (606 × 532 on desktop). */
function PathVisual() {
  return (
    <div className="relative mx-auto h-[532px] w-[606px] shrink-0 [zoom:0.55] sm:[zoom:0.9] md:[zoom:1] lg:mr-[-15px] lg:[zoom:0.7] xl:[zoom:1] lg:ml-auto">
      <CourseCard course={courses[0]} className="absolute top-0 left-[30px] w-[373px]" />
      {/* soft contact shadow under the cut-off photo */}
      <div
        aria-hidden
        className="absolute top-[515px] left-[185px] h-[70px] w-[340px] rounded-full bg-black/55 blur-[30px]"
      />
      <Image
        src="/images/features/student.png"
        alt=""
        width={740}
        height={549}
        className="absolute top-1 left-0 max-w-none"
      />
      <ProgressCard className="absolute top-[220px] left-[374px]" />
      <Image
        src="/images/features/spring-lime.png"
        alt=""
        width={125}
        height={163}
        className="absolute top-[92px] left-[480px]"
      />
    </div>
  );
}

function CheckBadge() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="size-5 shrink-0 text-primary-800">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path
        d="m5.8 10.3 2.8 2.8 5.6-5.8"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
