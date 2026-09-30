import Chip from "@/components/ui/Chip";
import { searchCategories } from "@/data/categories";
import { coursesHref, type CourseQuery } from "@/lib/course-search";

export default function CategoryTabs({
  query,
  className,
}: {
  query: CourseQuery;
  className?: string;
}) {
  const current = query.category || "featured";

  return (
    <nav aria-label="Categories" className={className}>
      <ul className="-mx-(--gutter) -my-1 flex snap-x snap-mandatory scroll-px-(--gutter) gap-4 overflow-x-auto px-(--gutter) py-1 [scrollbar-width:none] xl:mx-0 xl:justify-between xl:overflow-visible xl:px-0">
        {searchCategories.map((category) => (
          <li key={category.slug} className="snap-start">
            <Chip
              href={coursesHref(query, { category: category.slug })}
              active={category.slug === current}
            >
              {category.label}
            </Chip>
          </li>
        ))}
      </ul>
    </nav>
  );
}
