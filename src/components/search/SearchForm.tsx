import Form from "next/form";
import { KeyboardArrowDownIcon } from "@/components/icons";
import SearchField from "@/components/search/SearchField";
import Dropdown, { DropdownLink } from "@/components/ui/Dropdown";
import { creatorsHref } from "@/data/navigation";
import { coursesHref, type CourseQuery } from "@/lib/course-search";

const keptFilters = ["category", "level", "sort"] as const;

export default function SearchForm({ query }: { query: CourseQuery }) {
  return (
    <div className="flex w-full max-w-[624px] flex-col gap-4 sm:flex-row sm:items-start">
      <Form action="/courses" role="search" className="sm:flex-1">
        <SearchField placeholder="Search" defaultValue={query.q} />
        {keptFilters.map((key) =>
          query[key] ? (
            <input key={key} type="hidden" name={key} value={query[key]} />
          ) : null,
        )}
      </Form>

      <Dropdown
        name="search-scope"
        summary={
          <>
            Courses
            <KeyboardArrowDownIcon className="transition-transform group-open:rotate-180 motion-reduce:transition-none" />
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
