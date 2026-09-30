import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <main className="flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
