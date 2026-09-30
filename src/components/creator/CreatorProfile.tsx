import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { Creator } from "@/data/creators";

function plural(count: number, word: string) {
  return count === 1 ? word : `${word}s`;
}

export default function CreatorProfile({ creator }: { creator: Creator }) {
  const stats = [
    { value: creator.products, label: plural(creator.products, "Product") },
    { value: creator.followers, label: plural(creator.followers, "Follower") },
  ];

  return (
    <div className="container-page pt-10 pb-16 md:pt-[52px]">
      <div className="flex flex-col gap-10 xl:ml-0.5">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Image
              src={creator.avatar}
              alt=""
              width={96}
              height={96}
              className="size-24 shrink-0 rounded-float object-cover"
            />
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2 md:items-start">
                <h1 className="type-title text-white max-md:text-[30px]/[1.25]">
                  {creator.name}
                </h1>
                <span className="rounded-pill bg-secondary-400 px-6 py-2 type-label-m text-neutral-950">
                  Creator
                </span>
              </div>
              <p className="type-body-m text-neutral-50 md:type-body-l">
                {creator.tagline}
              </p>
            </div>
          </div>

          <div className="type-body-m text-neutral-50 md:type-body-l">
            {creator.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-4">
            {stats.map(({ value, label }) => (
              <li
                key={label}
                className="flex h-[46px] items-center gap-2 rounded-pill bg-white px-6 type-label-l text-neutral-950"
              >
                <span className="text-primary-800">{value}</span>
                {label}
              </li>
            ))}
          </ul>
          <Button>Follow</Button>
        </div>
      </div>
    </div>
  );
}
