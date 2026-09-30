import Image from "next/image";
import RatingStars from "@/components/ui/RatingStars";
import type { Review } from "@/data/courses";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex flex-col gap-6 rounded-card border border-neutral-200 p-6 md:p-[39px]">
      <header className="flex items-start gap-3">
        <Image
          src={review.avatar}
          alt=""
          width={52}
          height={52}
          className="size-[52px] shrink-0 rounded-full bg-neutral-100 object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-4">
            <h3 className="type-label-l leading-[22px] text-neutral-950">
              {review.name}
            </h3>
            <p className="-mb-1 type-paragraph text-neutral-400">
              {review.ago}
            </p>
          </div>
          <p className="type-paragraph text-neutral-400">{review.role}</p>
        </div>
      </header>

      <RatingStars value={review.rating} tone="dark" />

      <blockquote className="type-paragraph text-neutral-700">
        <p>{review.text}</p>
      </blockquote>
    </article>
  );
}
