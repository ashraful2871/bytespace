import type { ReactNode } from "react";
import BlueBand from "@/components/layout/BlueBand";

/**
 * Login and signup: one full-screen blue band with just the logo mark and no footer. From md the screen scales down
 * to fit the window height so it never scrolls. --fit-h is the screen's natural height: 944px side by side (lg) and
 * 1082px stacked. Phones keep their natural height and scroll.
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
