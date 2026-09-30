import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import {
  defaultTitle,
  siteDescription,
  siteName,
  siteUrl,
} from "@/app/shared-metadata";

// Only the weights the type-* styles in globals.css use.
const poppins = Poppins({
  variable: "--font-poppins-family",
  subsets: ["latin"],
  weight: ["500", "600"],
});

// Satoshi isn't on Google Fonts, so it's self-hosted (Fontshare, ITF Free Font License).
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
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${satoshi.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
