import { StarIcon } from "@/components/icons";
import AvatarStack from "@/components/ui/AvatarStack";
import FloatingCard from "@/components/ui/FloatingCard";
import ProgressBar from "@/components/ui/ProgressBar";
import { happyStudentAvatars } from "@/data/courses";
import { cn } from "@/lib/cn";

type CardProps = {
  className?: string;
  variant?: "default" | "relaxed";
};

export function TopicCard({ className }: Pick<CardProps, "className">) {
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

export function ProgressCard({
  value = 55,
  barValue = 56,
  variant = "default",
  className,
}: CardProps & { value?: number; barValue?: number }) {
  return (
    <FloatingCard className={cn("w-[232px]", className)}>
      <p className={cn("type-label-s", variant === "relaxed" && "leading-6")}>
        Learning Progress
      </p>
      <p className="w-[200px] font-poppins text-5xl/[1.2] font-medium tracking-[-0.01em]">
        {value}%
      </p>
      <ProgressBar
        value={barValue}
        label="Learning progress"
        className="w-[200px]"
      />
    </FloatingCard>
  );
}

export function HappyStudentsCard({
  variant = "default",
  tone = "white",
  className,
}: CardProps & { tone?: "white" | "lime" }) {
  const relaxed = variant === "relaxed";
  const lime = tone === "lime";

  return (
    <FloatingCard tone={tone} className={cn("w-[258px]", className)}>
      <div>
        <p className={cn("type-label-m", relaxed && "leading-6")}>
          Happy Students
        </p>
        <p
          className={cn(
            "flex items-center",
            relaxed ? "text-[10px]/[1.5]" : "type-body-xs",
          )}
        >
          <span className={relaxed ? "font-bold" : undefined}>4.5</span>&nbsp;
          <span className="text-neutral-400">(240)</span>
          <StarIcon
            size={16}
            className={lime ? "text-primary-800" : "text-secondary-400"}
          />
          <span className="sr-only">average rating from 240 reviews</span>
        </p>
      </div>
      <AvatarStack
        avatars={happyStudentAvatars}
        more="2K+"
        size={43}
        step={27}
        bubble={lime ? "dark" : "lime"}
      />
    </FloatingCard>
  );
}
