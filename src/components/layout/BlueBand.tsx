import type { ComponentProps, CSSProperties } from "react";
import Header from "@/components/layout/Header";

type BlueBandProps = Omit<ComponentProps<"section">, "style"> & {
  /** The band's Figma height at 1440 (Home 1024, Search 360, Course 957, Creator 592, 404 957). Applied as a min-height from `xl`. */
  height?: number;
  headerVariant?: "default" | "auth";
  /** Clips the band's ornaments at its edges. Turn it off when a menu has to open past the band (Search). */
  clip?: boolean;
};

/** The blue blueprint band at the top of every page, with the Header over it. */
export default function BlueBand({ height, headerVariant, clip = true, className = "", children, ...props }: BlueBandProps) {
  return (
    <section
      className={`relative bg-blueprint ${clip ? "overflow-hidden" : ""} ${height ? "xl:min-h-(--band-h)" : ""} ${className}`}
      style={height ? ({ "--band-h": `${height}px` } as CSSProperties) : undefined}
      {...props}
    >
      <Header variant={headerVariant} />
      {children}
    </section>
  );
}
