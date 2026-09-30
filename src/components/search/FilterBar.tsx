import {
  CategoryIcon,
  FilterAltIcon,
  SignalCellularAltIcon,
  SortIcon,
} from "@/components/icons";
import Dropdown, { DropdownLink } from "@/components/ui/Dropdown";
import {
  categories,
  coursesHref,
  learningPaths,
  levels,
  sortOptions,
  type CourseQuery,
} from "@/data/courses";

const trigger =
  "flex h-12 items-center gap-1 rounded-pill border border-neutral-200 bg-white px-3 type-label-m whitespace-nowrap text-neutral-950 transition-colors hover:bg-neutral-50 group-open:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden sm:px-4";

const leftPanel = "max-sm:inset-x-0 sm:left-0";

type FilterBarProps = {
  query: CourseQuery;
  /** The page the menu links filter: the search page, or a creator profile. */
  pathname?: string;
};

export default function FilterBar({ query, pathname = "/courses" }: FilterBarProps) {
  const href = (patch: Partial<CourseQuery>) => coursesHref(query, patch, pathname);
  const level = levels.find(
    (l) => l.toLowerCase() === query.level?.toLowerCase(),
  );
  const category = categories.find(
    (c) => c.slug === query.category && c.slug !== "featured",
  );
  const sort =
    sortOptions.find((o) => o.value === query.sort) ?? sortOptions[0];

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
      <div className="relative flex gap-2 sm:gap-4">
        <Dropdown
          name="course-filters"
          className="max-sm:static"
          summary={
            <>
              <FilterAltIcon />
              Filter
            </>
          }
          summaryClassName={trigger}
          panelClassName={`${leftPanel} sm:w-60`}
        >
          {learningPaths.map((path) => (
            <DropdownLink
              key={path.slug}
              href={href({ category: path.slug })}
              active={query.category === path.slug}
            >
              {path.label}
            </DropdownLink>
          ))}
          <li className="my-1 border-t border-neutral-100" aria-hidden />
          <DropdownLink href={pathname}>Clear filters</DropdownLink>
        </Dropdown>

        <Dropdown
          name="course-filters"
          className="max-sm:static"
          summary={
            <>
              <SignalCellularAltIcon />
              {level ?? "Level"}
            </>
          }
          summaryClassName={trigger}
          panelClassName={`${leftPanel} sm:w-52`}
        >
          <DropdownLink
            href={href({ level: undefined })}
            active={!level}
          >
            Any level
          </DropdownLink>
          {levels.map((l) => (
            <DropdownLink
              key={l}
              href={href({ level: l.toLowerCase() })}
              active={l === level}
            >
              {l}
            </DropdownLink>
          ))}
        </Dropdown>

        <Dropdown
          name="course-filters"
          className="max-sm:static"
          summary={
            <>
              <CategoryIcon />
              {category?.label ?? "Category"}
            </>
          }
          summaryClassName={trigger}
          panelClassName={`${leftPanel} max-h-[min(60vh,28rem)] overflow-y-auto sm:grid sm:w-[30rem] sm:grid-cols-2`}
        >
          {categories.map((c) => (
            <DropdownLink
              key={c.slug}
              href={href({ category: c.slug })}
              active={
                c.slug === "featured"
                  ? !query.category || query.category === "featured"
                  : c.slug === query.category
              }
            >
              {c.label}
            </DropdownLink>
          ))}
        </Dropdown>
      </div>

      <Dropdown
        name="course-filters"
        summary={
          <>
            <SortIcon />
            {sort.label}
          </>
        }
        summaryClassName={trigger}
        panelClassName="left-0 w-56 sm:right-0 sm:left-auto"
      >
        {sortOptions.map((o) => (
          <DropdownLink
            key={o.value}
            href={href({ sort: o.value })}
            active={o.value === sort.value}
          >
            {o.label}
          </DropdownLink>
        ))}
      </Dropdown>
    </div>
  );
}
