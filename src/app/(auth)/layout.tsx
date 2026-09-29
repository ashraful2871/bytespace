import type { ReactNode } from "react";
import BlueBand from "@/components/layout/BlueBand";

/** Login and signup: one full-screen blueprint band with the logo mark and no footer. */
export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="flex flex-1 flex-col">
      <BlueBand height={1024} headerVariant="auth" className="flex-1">
        {children}
      </BlueBand>
    </main>
  );
}
