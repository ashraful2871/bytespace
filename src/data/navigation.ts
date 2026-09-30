export type NavLink = {
  label: string;
  href: string;
  match?: string;
};

export const creatorsHref = "/creators/purepearl-studio";

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses", match: "/courses" },
  { label: "Creators", href: creatorsHref, match: "/creators" },
];

export const authNav: NavLink[] = [
  { label: "Sign In", href: "/login" },
  { label: "Join Us", href: "/signup" },
];

export function isCurrent(pathname: string, link: NavLink) {
  return link.match
    ? pathname === link.match || pathname.startsWith(`${link.match}/`)
    : pathname === link.href;
}

export const footerColumns: { heading?: string; links: NavLink[] }[] = [
  {
    heading: "Browse",
    links: [
      { label: "Featured Courses", href: "/#courses" },
      { label: "Featured Categories", href: "/#categories" },
      { label: "Business", href: "/courses?category=business" },
      { label: "IT", href: "/courses?category=it-and-software" },
      { label: "Design", href: "/courses?category=design" },
    ],
  },
  {
    links: [
      { label: "Development", href: "/courses?category=development" },
      { label: "Marketing", href: "/courses?category=marketing" },
      { label: "Photography", href: "/courses?category=photography" },
      { label: "Finance", href: "#" },
      { label: "Sport", href: "#" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Become a Creator", href: "/signup" },
      { label: "Affiliate Program", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Help", href: "#" },
      { label: "About", href: "#" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookies Settings", href: "#" },
];
