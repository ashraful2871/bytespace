import Image from "next/image";
import { testimonials } from "@/data/testimonials";

const glow = [
  "radial-gradient(ellipse 330px 300px at 720px 200px, rgb(212 251 32 / 0.6), rgb(212 251 32 / 0.25) 50%, transparent 100%)",
  "radial-gradient(ellipse 360px 420px at 1440px 290px, rgb(212 251 32 / 0.45), rgb(212 251 32 / 0.15) 55%, transparent 100%)",
  "radial-gradient(ellipse 460px 420px at 90px 760px, rgb(0 59 226 / 0.23), rgb(0 59 226 / 0.08) 55%, transparent 100%)",
].join(", ");

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 w-[1440px] -translate-x-1/2"
        style={{ backgroundImage: glow }}
      />

      <div className="relative container-page pt-16 pb-16 md:pt-[74px] md:pb-[61px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="font-poppins text-[32px]/[1.25] font-semibold text-black md:text-display lg:mt-10">
            Discover What Our
            <br className="hidden md:block" /> Community Is Saying
          </h2>
          <p className="text-base leading-[1.6] text-body md:text-lg md:leading-[29px] lg:w-[582px]">
            At ByteSpace, our vibrant community of learners and creators is at the heart of what we
            do. Hear directly from those who have experienced the transformative journey of
            learning and creating on our platform. Explore testimonials that reflect the diverse
            perspectives of enthusiastic learners and accomplished creators.
          </p>
        </div>

        <ul className="mt-12 grid items-start gap-6 md:mt-[71px] md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="rounded-[20px] bg-white p-6">
                <Image src={t.avatar} alt={t.name} width={80} height={80} className="rounded-full" />
                <figcaption className="mt-[25px]">
                  <p className="font-poppins text-xl leading-[30px] font-semibold text-black">{t.name}</p>
                  <p className="text-lg leading-6 text-primary-800">{t.role}</p>
                </figcaption>
                <blockquote className="mt-[22px] text-lg leading-[29px] text-body">
                  &quot;{t.quote}&quot;
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
