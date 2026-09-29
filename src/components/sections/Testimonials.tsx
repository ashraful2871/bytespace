import Image from "next/image";
import Glow from "@/components/ui/Glow";
import { testimonials } from "@/data/testimonials";

// Figma 34:1175 Testimonials_Frame: 1440×784 (74 top, 57 bottom). The 1204-wide content frame starts at x=118,
// 2px outside the 1200 column on each side, so the three 374px cards are 41 apart.
export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/* The glow SVGs carry a 40px blur bleed, so each native box sits 40px up-left of its Figma ellipse
        (right 842,-241 · centre 395,-138 · left -442,149). Later ones paint on top, as in Figma. */}
      <div aria-hidden className="design-stage">
        <Glow src="/images/svg/testimonials-glow-right.svg" x={802} y={-281} size={1217} />
        <Glow src="/images/svg/testimonials-glow-center.svg" x={355} y={-178} size={752} />
        <Glow src="/images/svg/testimonials-glow-left.svg" x={-482} y={109} size={1217} />
      </div>

      <div className="relative container-page py-16 md:pt-[74px] md:pb-[57px]">
        <div className="flex flex-col gap-12 md:gap-[72px] lg:-mx-0.5">
          {/* Figma 34:1177: 577 + 43 + 580 = 1200. Below 1200 both shrink, the title no further than its two lines. */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-[43px]">
            <h2 className="max-w-[577px] type-heading-m text-black max-md:text-[30px]/[1.25] md:leading-[53px] lg:flex-[0_1_577px] lg:min-w-[480px]">
              Discover What Our Community Is Saying
            </h2>
            <p className="type-body-l text-body max-md:text-base md:leading-[29px] lg:flex-[0_1_580px]">
              At ByteSpace, our vibrant community of learners and creators is at the heart of what we do. Hear directly
              from those who have experienced the transformative journey of learning and creating on our platform.
              Explore testimonials that reflect the diverse perspectives of enthusiastic learners and accomplished
              creators.
            </p>
          </div>

          {/* Figma 34:1182: items-start, so each card is as tall as its quote. */}
          <ul className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-[41px]">
            {testimonials.map((t) => (
              <li key={t.name}>
                <figure className="flex flex-col gap-6 rounded-card bg-white p-6">
                  <figcaption className="flex flex-col gap-6">
                    <Image src={t.avatar} alt="" width={80} height={80} className="size-20 rounded-full object-cover" />
                    <div>
                      <p className="type-heading-xs text-black">{t.name}</p>
                      <p className="type-body-l text-primary-800 md:leading-[29px]">{t.role}</p>
                    </div>
                  </figcaption>
                  {/* Straight quotes, as in Figma. */}
                  <blockquote className="type-body-l text-body max-md:text-base md:leading-[29px]">
                    &quot;{t.quote}&quot;
                  </blockquote>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
