import Image from "next/image";

const brands = [
  { src: "/images/brands/logo-1.png", width: 167, height: 41 },
  { src: "/images/brands/logo-2.png", width: 168, height: 41 },
  { src: "/images/brands/logo-3.png", width: 170, height: 41 },
  { src: "/images/brands/logo-4.png", width: 170, height: 41 },
  { src: "/images/brands/logo-5.png", width: 169, height: 42 },
];

export default function Brands() {
  return (
    <section aria-label="Trusted by" className="bg-neutral-50 py-12 md:py-20">
      <ul className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-10 lg:flex-nowrap lg:gap-x-4 lg:justify-between xl:max-w-[1132px] xl:px-0">
        {brands.map((brand) => (
          <li key={brand.src}>
            <Image
              src={brand.src}
              alt="Logoipsum"
              width={brand.width}
              height={brand.height}
              className="block max-md:h-8 max-md:w-auto"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
