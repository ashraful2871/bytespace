import type { ReactNode } from "react";
import {
  CategoryIcon,
  FilterAltIcon,
  SignalCellularAltIcon,
  SortIcon,
} from "@/components/icons";
import Dropdown, { DropdownLink } from "@/components/ui/Dropdown";
import { categories, learningPaths } from "@/data/categories";
import { levels } from "@/data/courses";
import {
  coursesHref,
  sortOptions,
  type CourseQuery,
} from "@/lib/course-search";
import { cn } from "@/lib/cn";

type FilterBarProps = {
  query: CourseQuery;
  pathname?: string;
};

export default function FilterBar({
  query,
  pathname = "/courses",
}: FilterBarProps) {
  const href = (patch: Partial<CourseQuery>) =>
    coursesHref(query, patch, pathname);

  const level = levels.find(
    (l) => l.toLowerCase() === query.level?.toLowerCase(),
  );
  const category = categories.find(
    (c) => c.slug === query.category && c.slug !== "featured",
  );
  const sort =
    sortOptions.find((option) => option.value === query.sort) ?? sortOptions[0];
  const isFeatured = !query.category || query.category === "featured";

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
      <div className="relative flex min-w-0 flex-wrap gap-2 sm:gap-4">
        <FilterMenu
          icon={<FilterAltIcon />}
          label="Filter"
          panelClassName="sm:w-60"
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
        </FilterMenu>

        <FilterMenu
          icon={<SignalCellularAltIcon />}
          label="Level"
          value={level}
          panelClassName="sm:w-52"
        >
          <DropdownLink href={href({ level: undefined })} active={!level}>
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
        </FilterMenu>

        <FilterMenu
          icon={<CategoryIcon />}
          label="Category"
          value={category?.label}
          panelClassName="max-h-[min(60vh,28rem)] overflow-y-auto sm:grid sm:w-[30rem] sm:grid-cols-2"
        >
          {categories.map((c) => (
            <DropdownLink
              key={c.slug}
              href={href({ category: c.slug })}
              active={
                c.slug === "featured" ? isFeatured : c.slug === query.category
              }
            >
              {c.label}
            </DropdownLink>
          ))}
        </FilterMenu>
      </div>

      <FilterMenu
        icon={<SortIcon />}
        label="Sort"
        value={sort.label}
        align="right"
        panelClassName="w-56"
      >
        {sortOptions.map((option) => (
          <DropdownLink
            key={option.value}
            href={href({ sort: option.value })}
            active={option.value === sort.value}
          >
            {option.label}
          </DropdownLink>
        ))}
      </FilterMenu>
    </div>
  );
}

const trigger =
  "flex h-12 items-center gap-1 rounded-pill border border-neutral-200 bg-white px-3 type-label-m whitespace-nowrap text-neutral-950 transition-colors hover:bg-neutral-50 group-open:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden sm:px-4";

type FilterMenuProps = {
  icon: ReactNode;
  label: string;
  value?: string;
  align?: "left" | "right";
  panelClassName?: string;
  children: ReactNode;
};

function FilterMenu({
  icon,
  label,
  value,
  align = "left",
  panelClassName,
  children,
}: FilterMenuProps) {
  return (
    <Dropdown
      name="course-filters"
      className={align === "left" ? "max-sm:static" : undefined}
      summaryClassName={trigger}
      panelClassName={cn(
        align === "left"
          ? "max-sm:inset-x-0 sm:left-0"
          : "left-0 sm:right-0 sm:left-auto",
        panelClassName,
      )}
      summary={
        <>
          {icon}
          {value ? (
            <span className="max-w-28 truncate sm:max-w-none">
              <span className="sr-only">{label}: </span>
              {value}
            </span>
          ) : (
            label
          )}
        </>
      }
    >
      {children}
    </Dropdown>
  );
}
