import type { ComponentProps, CSSProperties } from "react";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/cn";

type BlueBandProps = Omit<ComponentProps<"section">, "style"> & {
  height?: number;
  headerVariant?: "default" | "auth";
  clip?: boolean;

  zoom?: boolean;
};

export default function BlueBand({
  height,
  headerVariant,
  clip = true,
  zoom = false,
  className,
  children,
  ...props
}: BlueBandProps) {
  const style = height
    ? ({ "--band-h": `${height}px` } as CSSProperties)
    : undefined;
  const bandClasses = cn(
    "relative bg-blueprint",
    height ? "xl:min-h-(--band-h)" : undefined,
    className,
  );

  if (zoom) {
    return (
      <section
        className={cn(
          "@container relative bg-primary-800",
          clip && "overflow-hidden",
        )}
        style={style}
        {...props}
      >
        <div className={cn(bandClasses, "min-[1440px]:zoom-frame")}>
          <Header variant={headerVariant} />
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(bandClasses, clip && "overflow-hidden")}
      style={style}
      {...props}
    >
      <Header variant={headerVariant} />
      {children}
    </section>
  );
}
