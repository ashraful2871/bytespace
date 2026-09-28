import { StarIcon } from "@/components/icons";
import AvatarStack from "@/components/ui/AvatarStack";
import FloatingCard from "@/components/ui/FloatingCard";
import ProgressBar from "@/components/ui/ProgressBar";
import { happyStudentAvatars } from "@/data/courses";

type PositionProps = { className?: string };

// Figma 46:126: 208×70, title and meta row stacked with no gap.
export function TopicCard({ className = "" }: PositionProps) {
  return (
    <FloatingCard className={className}>
      <div>
        <p className="type-label-m">UI/UX Design</p>
        <p className="flex items-center gap-2 type-body-xs text-neutral-400">
          <span>200 Courses</span>
          <span aria-hidden className="text-[10px]/[1.5]">
            •
          </span>
          <span>1000+ Students</span>
        </p>
      </div>
    </FloatingCard>
  );
}

// Figma 1:1797: 232×131 with a 200×8 bar. "55%" is Poppins 500, which matches Home.png better than 600.
// Figma draws the bar a little ahead of the label (112px of 200), hence the separate `barValue`.
export function ProgressCard({
  value = 55,
  barValue = 56,
  className = "",
}: PositionProps & { value?: number; barValue?: number }) {
  return (
    <FloatingCard className={`w-[232px] ${className}`}>
      <p className="type-label-s">Learning Progress</p>
      <p className="w-[200px] font-poppins text-5xl/[1.2] font-medium tracking-[-0.01em]">{value}%</p>
      <ProgressBar value={barValue} label="Learning progress" className="w-[200px]" />
    </FloatingCard>
  );
}

// Figma 1:1821: 258×121; seven 43px avatars on a 27px step plus the "2K+" bubble.
export function HappyStudentsCard({ className = "" }: PositionProps) {
  return (
    <FloatingCard className={`w-[258px] ${className}`}>
      <div>
        <p className="type-label-m">Happy Students</p>
        <p className="flex items-center text-xs/[1.6]">
          4.5&nbsp;<span className="text-neutral-400">(240)</span>
          <StarIcon size={16} className="text-secondary-400" />
          <span className="sr-only">average rating from 240 reviews</span>
        </p>
      </div>
      <AvatarStack avatars={happyStudentAvatars} more="2K+" size={43} step={27} />
    </FloatingCard>
  );
}
