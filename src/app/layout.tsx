import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { siteDescription, siteName, siteUrl } from "@/app/shared-metadata";

// Headings use 600, the display styles and the subtitle 500 (type-* in globals.css).
const poppins = Poppins({
  variable: "--font-poppins-family",
  subsets: ["latin"],
  weight: ["500", "600"],
});

// Satoshi (Fontshare, ITF Free Font License), self-hosted so it never falls back. Body 400, labels 500, bold 700.
const satoshi = localFont({
  variable: "--font-satoshi-family",
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700" },
  ],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteName} - Get Access to Hundreds of Courses`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${satoshi.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
