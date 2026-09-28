import Image from "next/image";

const brands = [1, 2, 3, 4, 5].map((n) => `/images/brands/logo-${n}.png`);

export default function Brands() {
  return (
    <section aria-label="Trusted by" className="bg-neutral-50 py-12 md:py-[76px]">
      <ul className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:gap-x-[65px]">
        {brands.map((src) => (
          <li key={src}>
            <Image src={src} alt="Logoipsum" width={176} height={50} className="h-10 w-auto md:h-[50px]" />
          </li>
        ))}
      </ul>
    </section>
  );
}
