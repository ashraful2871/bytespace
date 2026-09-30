import type { ComponentProps, CSSProperties } from "react";
import Header from "@/components/layout/Header";

type BlueBandProps = Omit<ComponentProps<"section">, "style"> & {
  /** The band's Figma height at 1440 (Home 1024, Search 360, Course 957, Creator 592, 404 957). Applied as a min-height from `xl`. */
  height?: number;
  headerVariant?: "default" | "auth";
  /** Clips the band's ornaments at its edges. Turn it off when a menu has to open past the band (Search). */
  clip?: boolean;
  /** From 1440 up, scales the whole band (grid, Header, content) with the window, so the edge art stays on the
      screen edges as in Figma. `className` then goes to the scaled layer. */
  zoom?: boolean;
};

/** The blue blueprint band at the top of every page, with the Header over it. */
export default function BlueBand({ height, headerVariant, clip = true, zoom = false, className = "", children, ...props }: BlueBandProps) {
  const style = height ? ({ "--band-h": `${height}px` } as CSSProperties) : undefined;
  const band = `relative bg-blueprint ${height ? "xl:min-h-(--band-h)" : ""} ${className}`;
  const overflow = clip ? "overflow-hidden" : "";

  if (zoom) {
    return (
      <section className={`@container relative bg-primary-800 ${overflow}`} style={style} {...props}>
        <div className={`${band} min-[1440px]:zoom-frame`}>
          <Header variant={headerVariant} />
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className={`${band} ${overflow}`} style={style} {...props}>
      <Header variant={headerVariant} />
      {children}
    </section>
  );
}
