import { ButtonLink } from "@/components/ui/Button";
import Ornament from "@/components/ui/Ornament";

const ornaments = [
  { shape: "spring-a", tint: "lime", size: 385, x: -121, y: -161 },
  { shape: "spring-a", tint: "white", size: 175, x: 179, y: 5, mirrored: true },
  { shape: "cta-cone", tint: "white", size: 188, x: -49, y: 225 },
  { shape: "torus", tint: "lime", size: 342, x: 17, y: 299 },
  { shape: "pyramid", tint: "lime", size: 188, x: 1078, y: 0 },
  { shape: "spring-b", tint: "lime", size: 330, x: 1108, y: 289 },
  { shape: "cylinder", tint: "white", size: 370, x: 1222, y: 6 },
] as const;

export default function CreatorCta() {
  return (
    <section
      id="creators"
      className="@container relative overflow-hidden bg-primary-800"
    >
      <div className="relative bg-blueprint md:h-[488px] min-[1440px]:zoom-frame">
        <div aria-hidden className="design-stage hidden md:block">
          {ornaments.map((ornament) => (
            <Ornament key={`${ornament.shape}-${ornament.x}`} {...ornament} />
          ))}
        </div>

        <div className="relative z-10 container-page flex h-full flex-col items-center justify-center gap-10 py-20 text-center md:pt-px md:pb-0">
          <h2 className="max-w-[710px] type-heading-m text-neutral-50 max-md:text-[32px]/[1.25]">
            Unlock Your Potential as a Creator with ByteSpace
          </h2>
          <p className="max-w-[964px] type-body-m text-neutral-50 md:type-body-l">
            Experience the collaboration of numerous creators and an expanding
            selection of courses. Register now and become a part of a community
            comprising over 10,000 local and international creators. Utilize our
            Course Editor, and showcase your expertise by publishing your finest
            course on the ByteSpace Course Library.
          </p>
          <ButtonLink href="/signup">Join as Creator</ButtonLink>
        </div>
      </div>
    </section>
  );
}
