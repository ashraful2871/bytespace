import type { ReactNode } from "react";
import BlueBand from "@/components/layout/BlueBand";

/**
 * Login and signup: one full-screen blueprint band with the logo mark and no footer. From md the whole band scales
 * to fit the window height, so the page never scrolls: the screen is 944px tall from lg (the card ends at 904) and
 * 1082px stacked (header 120, copy 98, gap 40, card 784, 40 below). Phones keep their natural height and scroll.
 */
export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="flex flex-1 flex-col">
      <BlueBand headerVariant="auth" className="flex-1 md:fit-height md:[--fit-h:1082px] lg:[--fit-h:944px]">
        {children}
      </BlueBand>
    </main>
  );
}
