import Link from "next/link";
import { ShoppingBagIcon } from "@/components/icons";
import Logo from "@/components/ui/Logo";
import MobileNav from "@/components/layout/MobileNav";
import NavLink from "@/components/layout/NavLink";
import { authNav, mainNav } from "@/data/navigation";

type HeaderProps = {
  /** default: logo, nav, auth links and cart · auth: the logo mark only (login and signup screens). */
  variant?: "default" | "auth";
};

const link =
  "rounded-sm transition-colors hover:text-secondary-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-400";

// Figma 1:1778: a transparent 120px bar with top-aligned items: logo y=35, auth group y=48, and the nav
// (the active item is 16/1.2, the rest 16/1.6, so it sits higher). Figma puts the nav box at y=47, but
// Home.png renders its glyphs 2px lower than a browser does at 47, so it is placed at 49.
export default function Header({ variant = "default" }: HeaderProps) {
  if (variant === "auth") {
    return (
      <header className="relative z-20">
        <div className="container-page h-[120px] pt-[35px]">
          <Logo variant="mark" className={`ml-0.5 ${link}`} />
        </div>
      </header>
    );
  }

  return (
    <header className="relative z-20 text-neutral-50">
      <div className="container-page grid h-[120px] grid-cols-[1fr_auto] items-start md:grid-cols-[1fr_auto_1fr]">
        <Logo className={`mt-[35px] ml-0.5 justify-self-start ${link}`} />

        <nav aria-label="Main" className="mt-[49px] hidden md:block">
          <ul className="flex items-start gap-6">
            {mainNav.map((item) => (
              <li key={item.label}>
                <NavLink
                  link={item}
                  className={`block ${link}`}
                  activeClassName="type-label-m"
                  inactiveClassName="text-base/[1.6]"
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex items-center justify-end gap-6 type-body-m">
          {authNav.map((item) => (
            <Link key={item.label} href={item.href} className={`hidden md:inline ${link}`}>
              {item.label}
            </Link>
          ))}
          <Link href="#" aria-label="Cart" className={`flex ${link}`}>
            <ShoppingBagIcon />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
