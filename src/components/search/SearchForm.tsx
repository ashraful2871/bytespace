import Form from "next/form";
import { KeyboardArrowDownIcon, SearchIcon } from "@/components/icons";
import Dropdown, { DropdownLink } from "@/components/ui/Dropdown";
import { coursesHref, type CourseQuery } from "@/data/courses";
import { mainNav } from "@/data/navigation";

const creatorsHref =
  mainNav.find((link) => link.label === "Creators")?.href ?? "/";

export default function SearchForm({ query }: { query: CourseQuery }) {
  const kept = (["category", "level", "sort"] as const).filter(
    (key) => query[key],
  );

  return (
    <div className="flex w-full max-w-[624px] flex-col gap-4 sm:flex-row sm:items-start">
      <Form action="/courses" role="search" className="sm:flex-1">
        <label className="flex h-[52px] items-center gap-2 rounded-pill bg-white px-6 text-neutral-400 focus-within:ring-2 focus-within:ring-secondary-400">
          <SearchIcon className="shrink-0" />
          <span className="sr-only">Search courses</span>
          <input
            type="search"
            name="q"
            defaultValue={query.q}
            placeholder="Search"
            className="w-full min-w-0 bg-transparent type-body-l text-neutral-950 outline-none placeholder:text-neutral-500"
          />
        </label>
        {kept.map((key) => (
          <input key={key} type="hidden" name={key} value={query[key]} />
        ))}
      </Form>

      <Dropdown
        name="search-scope"
        summary={
          <>
            Courses
            <KeyboardArrowDownIcon className="transition-transform group-open:rotate-180" />
          </>
        }
        summaryClassName="flex h-12 items-center justify-center gap-2 rounded-pill bg-secondary-400 px-6 type-label-l text-neutral-950 transition-colors hover:bg-secondary-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
        panelClassName="inset-x-0 sm:left-auto sm:w-48"
      >
        <DropdownLink href={coursesHref(query)} active>
          Courses
        </DropdownLink>
        <DropdownLink href={creatorsHref}>Creators</DropdownLink>
      </Dropdown>
    </div>
  );
}
