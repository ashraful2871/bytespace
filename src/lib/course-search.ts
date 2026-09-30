import { getCategoryLabel, pathCategories } from "@/data/categories";
import { courses, type Course } from "@/data/courses";

export const sortOptions = [
  { value: "relevant", label: "Most relevant" },
  { value: "popular", label: "Most popular" },
  { value: "rating", label: "Highest rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

export type Sort = (typeof sortOptions)[number]["value"];

export type CourseQuery = {
  q?: string;
  category?: string;
  level?: string;
  sort?: string;
  page?: number;
  perPage?: number;
  creator?: string;
};

type SearchParams = Record<string, string | string[] | undefined>;

export function parseCourseQuery(params: SearchParams): CourseQuery {
  const first = (key: string) => {
    const value = params[key];
    return (Array.isArray(value) ? value[0] : value) || undefined;
  };

  return {
    q: first("q"),
    category: first("category"),
    level: first("level"),
    sort: first("sort"),
    page: Number(first("page")) || 1,
  };
}

export function coursesHref(
  query: CourseQuery,
  patch: Partial<CourseQuery> = {},
  pathname = "/courses",
) {
  const { q, category, level, sort, page } = {
    ...query,
    page: undefined,
    ...patch,
  };

  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category && category !== "featured") params.set("category", category);
  if (level) params.set("level", level);
  if (sort && sort !== "relevant") params.set("sort", sort);
  if (page && page > 1) params.set("page", String(page));

  const search = params.toString();
  return search ? `${pathname}?${search}` : pathname;
}

const sorters: Record<Sort, ((a: Course, b: Course) => number) | null> = {
  relevant: null,
  popular: (a, b) => b.students - a.students,
  rating: (a, b) => b.rating - a.rating,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
};

function inCategory(course: Course, slug: string) {
  return (
    slug === "featured" ||
    course.category === slug ||
    (pathCategories[slug]?.includes(course.category) ?? false)
  );
}

function matchesText(course: Course, text: string) {
  return [
    course.title,
    course.fullTitle,
    course.author,
    getCategoryLabel(course.category),
  ].some((field) => field.toLowerCase().includes(text));
}

const CATALOGUE_REPEAT = 15;

export function listCourses({
  q,
  category,
  level,
  sort,
  page = 1,
  perPage = 18,
  creator,
}: CourseQuery = {}) {
  const text = q?.trim().toLowerCase();

  let matches = courses.filter(
    (course) =>
      (!text || matchesText(course, text)) &&
      (!category || inCategory(course, category)) &&
      (!level || course.level.toLowerCase() === level.toLowerCase()) &&
      (!creator || course.creatorSlug === creator),
  );

  const sorter = sorters[sort as Sort];
  if (sorter) matches = matches.toSorted(sorter);

  const isFiltered = Boolean(
    text || (category && category !== "featured") || level || creator,
  );
  const results = isFiltered
    ? matches
    : Array.from({ length: CATALOGUE_REPEAT }, () => matches).flat();

  const pageCount = Math.max(1, Math.ceil(results.length / perPage));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), pageCount);

  return {
    items: results.slice((current - 1) * perPage, current * perPage),
    total: results.length,
    page: current,
    pageCount,
  };
}
