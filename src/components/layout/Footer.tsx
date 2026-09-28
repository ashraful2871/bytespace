import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { footerColumns, legalLinks } from "@/data/navigation";

const link = "rounded-sm transition-colors hover:text-primary-800";

// Figma lays body-s and body-xs out on whole-pixel line boxes (22 and 19, not 22.4 and 19.2); the extra
// fraction drifts the 5-row link columns by 2px, so the footer sets them explicitly.
const bodyS = "text-sm/[22px]";
const bodyXs = "text-xs/[19px]";

// Figma 34:1256: 525px tall at 1440 (1px line + 70 + nav row 234 + 130 + copyright 42 + 48).
export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-white text-neutral-950">
      <div className="container-page flex flex-col gap-16 pt-14 pb-12 lg:gap-[130px] lg:pt-[70px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-12 xl:gap-[92px]">
          <div className="flex flex-col gap-[45px] lg:max-w-[528px] lg:flex-1">
            <div className="flex flex-col gap-4">
              <Logo variant="dark" className="self-start" />
              <p className={bodyS}>
                Stay Up to date with our latest features and releases by joining our newsletter.
              </p>
            </div>

            <form action="#" className="flex flex-col gap-6 lg:max-w-[504px]">
              <div className="flex items-start gap-3 sm:gap-6">
                <label className="min-w-0 flex-1">
                  <span className="sr-only">Email address</span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="h-[52px] w-full rounded-full border border-neutral-200 px-6 type-body-m text-neutral-950 outline-hidden placeholder:text-neutral-950 focus-visible:border-primary-800 focus-visible:ring-2 focus-visible:ring-primary-800/20"
                  />
                </label>
                <Button type="submit">Search</Button>
              </div>
              <p className={bodyXs}>
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:flex lg:w-[500px] lg:shrink-0 lg:items-end lg:gap-6 xl:w-[580px] xl:gap-10"
          >
            {footerColumns.map((column, i) => (
              <div key={i} className="flex flex-col gap-6 lg:flex-1 xl:w-[167px] xl:flex-none">
                {column.heading && (
                  <p aria-hidden className="hidden type-body-m text-transparent select-none lg:block">
                    {column.heading}
                  </p>
                )}
                <ul className={`flex flex-col gap-4 ${bodyS}`}>
                  {column.links.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className={link}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-[22px]">
          <div aria-hidden className="h-px bg-neutral-100" />
          <div className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${bodyXs}`}>
            <p className="lg:w-[460px]">@ 2023 ByteSpace. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
