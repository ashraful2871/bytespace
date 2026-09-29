import type { Metadata } from "next";
import BlueBand from "@/components/layout/BlueBand";
import Footer from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

// Figma 63:252. The "404" box is 920×480 at y=160, but its glyphs measure as Poppins 600 at 460px (882 wide, top at
// y=225), so the numeral is 460px with a 480px line box, nudged 5.5px down. The copy block (935 wide at y=521) then
// overlaps it by 124.5px. Both offsets are fractions of the font size, so they scale with it. The lime fades out as
// sampled from the screenshot: solid to 20%, 85% at 50%, gone just past the box.
export default function NotFound() {
  return (
    <>
      <main className="flex flex-col">
        <BlueBand height={957} className="mb-[3px]">
          <div className="container-page flex flex-col items-center pt-10 pb-16 text-center [--numeral:clamp(160px,32vw,460px)] md:pb-[125px]">
            <p
              aria-hidden
              className="bg-linear-to-b from-secondary-400 from-20% via-secondary-400/85 via-50% to-secondary-400/0 to-110% bg-clip-text font-poppins mt-[calc(var(--numeral)*0.012)] text-(length:--numeral) leading-[1.0435] -me-[0.02em] font-semibold tracking-[0.02em] whitespace-nowrap text-transparent select-none"
            >
              404
            </p>

            <div className="relative z-10 -mt-[calc(var(--numeral)*0.2707)] flex max-w-[935px] flex-col items-center gap-8">
              <h1 className="type-heading-l text-white max-md:text-balance max-md:text-[40px]/[1.2]">
                The page you are looking for doesn’t exist
              </h1>
              <p className="type-body-m text-neutral-100 md:type-body-l">
                Try to use a correct url or go back to homepage to start again
              </p>
              <ButtonLink href="/">Back to Home</ButtonLink>
            </div>
          </div>
        </BlueBand>
      </main>
      <Footer />
    </>
  );
}
