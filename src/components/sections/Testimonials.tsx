import Image from "next/image";
import Glow from "@/components/ui/Glow";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div aria-hidden className="design-stage">
        <Glow tone="lime" opacity={0.4} x={842} y={-241} size={1137} />
        <Glow tone="lime" opacity={0.6} x={395} y={-138} size={672} />
        <Glow tone="blue" opacity={0.24} x={-442} y={149} size={1137} />
      </div>

      <div className="relative container-page py-16 md:pt-[74px] md:pb-[57px]">
        <div className="flex flex-col gap-12 md:gap-[72px] lg:-mx-0.5">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-[43px]">
            <h2 className="max-w-[577px] type-heading-m text-black max-md:text-[30px]/[1.25] lg:flex-[0_1_577px] lg:min-w-[480px]">
              Discover What Our Community Is Saying
            </h2>
            <p className="type-body-m text-body md:type-body-l lg:flex-[0_1_580px]">
              At ByteSpace, our vibrant community of learners and creators is at
              the heart of what we do. Hear directly from those who have
              experienced the transformative journey of learning and creating on
              our platform. Explore testimonials that reflect the diverse
              perspectives of enthusiastic learners and accomplished creators.
            </p>
          </div>

          <ul className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-[41px]">
            {testimonials.map((t) => (
              <li
                key={t.name}
                className="md:max-lg:last:col-span-2 md:max-lg:last:mx-auto md:max-lg:last:w-[calc(50%-12px)]"
              >
                <figure className="flex flex-col gap-6 rounded-card bg-white p-6">
                  <figcaption className="flex flex-col gap-6">
                    <Image
                      src={t.avatar}
                      alt=""
                      width={80}
                      height={80}
                      className="size-20 rounded-full object-cover"
                    />
                    <div>
                      <p className="type-heading-xs text-black">{t.name}</p>
                      <p className="type-body-m text-primary-800 md:type-body-l">
                        {t.role}
                      </p>
                    </div>
                  </figcaption>
                  <blockquote className="type-body-m text-body md:type-body-l">
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
