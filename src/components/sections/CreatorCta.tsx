import { ButtonLink } from "@/components/ui/Button";

export default function CreatorCta() {
  return (
    <section className="relative overflow-hidden bg-primary-800 bg-[url(/images/cta-shapes.png)] bg-cover bg-center bg-no-repeat">
      <div className="container-page py-20 text-center md:flex md:h-[488px] md:flex-col md:items-center md:pt-[77px] md:pb-0">
        <h2 className="mx-auto max-w-[600px] font-poppins text-[32px]/[1.25] font-semibold text-white md:text-display">
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="mx-auto mt-6 max-w-[970px] text-base leading-[1.6] text-neutral-50 md:mt-[49px] md:text-lg md:leading-[29px]">
          Experience the collaboration of numerous creators and an expanding selection of courses.
          Register now and become a part of a community comprising over 10,000 local and
          international creators. Utilize our Course Editor, and showcase your expertise by
          publishing your finest course on the ByteSpace Course Library.
        </p>
        <ButtonLink href="/signup" className="mt-8 px-[26px] md:mt-10">
          Join as Creator
        </ButtonLink>
      </div>
    </section>
  );
}
