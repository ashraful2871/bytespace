export type NavLink = {
  label: string;
  href: string;
  /** Path prefix that marks the link as current; without it the pathname must equal `href`. */
  match?: string;
};

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses", match: "/courses" },
  { label: "Creators", href: "/creators/purepearl-studio", match: "/creators" },
];

export const authNav: NavLink[] = [
  { label: "Sign In", href: "/login" },
  { label: "Join Us", href: "/signup" },
];

export function isCurrent(pathname: string, link: NavLink) {
  return link.match ? pathname === link.match || pathname.startsWith(`${link.match}/`) : pathname === link.href;
}

/** Footer link columns. The headings are invisible in the design; they only offset columns 1 and 3. */
export const footerColumns: { heading?: string; links: NavLink[] }[] = [
  {
    heading: "Browse",
    links: [
      { label: "Featured Courses", href: "#courses" },
      { label: "Featured Categories", href: "#categories" },
      { label: "Business", href: "#" },
      { label: "IT", href: "#" },
      { label: "Design", href: "#" },
    ],
  },
  {
    links: [
      { label: "Development", href: "#" },
      { label: "Marketing", href: "#" },
      { label: "Photography", href: "#" },
      { label: "Finance", href: "#" },
      { label: "Sport", href: "#" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Become a Creator", href: "#creators" },
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
