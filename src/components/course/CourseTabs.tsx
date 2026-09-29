import NavLink from "@/components/layout/NavLink";
import { chipStyles } from "@/components/ui/Chip";

/** About, Lessons and Reviews as chip links; NavLink marks the current tab with `aria-current="page"`. */
export default function CourseTabs({ slug }: { slug: string }) {
  const base = `/courses/${slug}`;
  const tabs = [
    { label: "About", href: base },
    { label: "Lessons", href: `${base}/lessons` },
    { label: "Reviews", href: `${base}/reviews` },
  ];

  return (
    <nav aria-label="Course sections">
      <ul className="flex gap-4">
        {tabs.map((tab) => (
          <li key={tab.href}>
            <NavLink
              link={tab}
              scroll={false}
              className={chipStyles.base}
              activeClassName={chipStyles.active}
              inactiveClassName={chipStyles.inactive}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
