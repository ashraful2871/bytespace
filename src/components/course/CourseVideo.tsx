import Image from "next/image";
import { PlayArrowIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export default function CourseVideo({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-card bg-neutral-200 md:aspect-[720/479]",
        className,
      )}
    >
      <Image
        src="/images/course/video-thumb.webp"
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 1280px) 720px, (min-width: 1024px) 60vw, 100vw"
        className="object-cover"
      />
      <button
        type="button"
        aria-label={`Play preview: ${title}`}
        className="absolute top-[53.2%] left-[52.1%] grid size-16 -translate-1/2 place-items-center rounded-float bg-neutral-950/30 transition-colors hover:bg-neutral-950/45 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-hidden md:size-[104px]"
      >
        <span className="grid size-10 place-items-center rounded-full bg-white text-neutral-500 md:size-12">
          <PlayArrowIcon size={28} />
        </span>
      </button>
    </div>
  );
}
