export type Level = "Beginner" | "Intermediate" | "Advanced";

export type IncludeIcon =
  | "article"
  | "videocam"
  | "workspace-premium"
  | "support-agent";

export type Review = {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  ago: string;
  text: string;
};

export type Course = {
  slug: string;
  title: string;
  fullTitle: string;
  subtitle: string;
  author: string;
  creatorSlug: string;
  category: string;
  image: string;
  rating: number;
  level: Level;
  price: number;
  lessons: number;
  duration: string;
  comments: number;
  learners: number;
  reviewsCount: number;
  students: number;
  description: string[];
  sneakPeek: string[];
  keyPoints: string[];
  curriculum: {
    lessons: number;
    hours: number;
    preview: { no: number; title: string; minutes: number }[];
    more: number;
  };
  includes: { icon: IncludeIcon; label: string }[];
  modulesIntro: string;
  modules: { title: string; description: string }[];
  lessonContent: string;
  progressText: string;
  reviewsIntro: string;
  ratingSummary: {
    average: number;
    breakdown: [number, number, number, number, number];
  };
  reviews: Review[];
};

export type Category = {
  slug: string;
  label: string;
};

const category = (label: string): Category => ({
  slug: label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
  label,
});

export const categoryRows: Category[][] = [
  [
    "Featured",
    "Music",
    "Drawing & Painting",
    "Marketing",
    "Animation",
    "Social Media",
    "UI/UX Design",
    "Creative Marketing",
  ],
  [
    "Digital Illustration",
    "Film & Video",
    "Crafts",
    "Freelance & Entrepreneurship",
    "Graphic Design",
    "Photography",
  ],
  ["Productivity", "Web Development", "Data Science", "Cooking"],
].map((row) => row.map(category));

export const categories: Category[] = categoryRows.flat();

export const searchCategories: Category[] = [
  ...categoryRows[0],
  ...categories.filter((c) => c.slug === "cooking"),
];

export const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];

export const learningPaths = [
  { slug: "design", label: "Design", icon: "design" },
  { slug: "development", label: "Development", icon: "development" },
  { slug: "it-and-software", label: "IT & Software", icon: "it" },
  { slug: "business", label: "Business", icon: "business" },
  { slug: "marketing", label: "Marketing", icon: "marketing" },
  { slug: "photography", label: "Photography", icon: "photography" },
] as const;

const pathCategories: Record<string, string[]> = {
  design: [
    "ui-ux-design",
    "graphic-design",
    "digital-illustration",
    "drawing-and-painting",
    "animation",
  ],
  development: ["web-development"],
  "it-and-software": ["data-science", "web-development"],
  business: ["freelance-and-entrepreneurship", "productivity"],
  marketing: ["marketing", "creative-marketing", "social-media"],
  photography: ["photography", "film-and-video"],
};

export const learnerAvatars = [1, 2, 3, 4].map(
  (n) => `/images/avatars/learner-${n}.webp`,
);

export const happyStudentAvatars = [1, 2, 3, 4, 5, 6, 7].map(
  (n) => `/images/avatars/happy-${n}.webp`,
);

const card = {
  author: "purepearl studio",
  creatorSlug: "purepearl-studio",
  rating: 4.5,
  level: "Beginner",
  price: 25,
  lessons: 17,
  duration: "2 hours 16 mins",
  comments: 59,
  learners: 26,
} as const;

const detail = {
  subtitle: "Unlock the Power of Digital Creation with Expert Guidance",
  reviewsCount: 172,
  students: 199,
  description: [
    `Embark on an enlightening exploration into the world of digital creation with our comprehensive course, "Build Digital Assets: A Comprehensive Guide." This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.`,
    "In the initial modules, you'll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.",
    "As you progress through the course, you'll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.",
  ],
  sneakPeek: [1, 2, 3, 4].map((n) => `/images/course/sneak-${n}.webp`),
  keyPoints: [
    "Foundational Concepts",
    "Design Principles Mastery",
    "Advanced Techniques in Digital Creation",
    "Project Showcase and Critique",
    "Optimizing for Various Platforms",
    "Digital Asset Management Best Practices",
    "Monetization Strategies",
    "Capstone Project: Building Your Portfolio",
  ],
  curriculum: {
    lessons: 112,
    hours: 24,
    preview: [
      { no: 1, title: "Introduction to Digital Assets", minutes: 12 },
      { no: 2, title: "Design Principles for Impacts", minutes: 21 },
      { no: 3, title: "Advanced Techniques in Digital Creation", minutes: 16 },
    ],
    more: 99,
  },
  includes: [
    { icon: "article", label: "Learning Resources" },
    { icon: "videocam", label: "Quality Lesson Videos" },
    { icon: "workspace-premium", label: "Certificate of Completion" },
    { icon: "support-agent", label: "Private Consultation" },
  ],
  modulesIntro:
    "Immerse yourself in the course content as we break down each module into comprehensive lessons, providing practical insights and hands-on experiences.",
  modules: [
    {
      title: "Module 1: Introduction to Digital Assets",
      description:
        "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
    },
    {
      title: "Module 2: Design Principles for Impact",
      description:
        "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
    },
    {
      title: "Module 4: User-Centric Design Strategies",
      description:
        "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
    },
    {
      title: "Module 5: Interactive Media and Engagement",
      description:
        "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
    },
    {
      title: "Module 6: Project Showcase and Critique",
      description:
        "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
    },
    {
      title: "Module 7: Optimizing Digital Assets for Various Platforms",
      description:
        "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
    },
  ],
  lessonContent:
    "Engage with each lesson through captivating video content, detailed textual explanations, and interactive elements. Download resources, complete assignments, and test your understanding with quizzes.",
  progressText:
    "Witness your growth as you complete lessons, with an intuitive progress tracking feature guiding you through your learning journey.",
  reviewsIntro:
    "Discover what our learners have to say about their experience with 'Build Digital Assets: A Comprehensive Guide.' Read reviews and ratings from individuals who have embarked on the transformative journey of mastering digital asset creation.",
  ratingSummary: { average: 4.7, breakdown: [720, 120, 21, 12, 16] },
  reviews: [
    {
      name: "PurePearl Studio",
      role: "UI/UX Designer",
      avatar: "/images/avatars/reviewer-1.webp",
      rating: 5,
      ago: "a year ago",
      text: `"The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!"`,
    },
    {
      name: "Albert Flores",
      role: "UI/UX Designer",
      avatar: "/images/avatars/reviewer-2.webp",
      rating: 5,
      ago: "a year ago",
      text: "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!",
    },
    {
      name: "Cody Fisher",
      role: "UI/UX Designer",
      avatar: "/images/avatars/reviewer-3.webp",
      rating: 5,
      ago: "a year ago",
      text: "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.",
    },
    {
      name: "Brooklyn Simmons",
      role: "UI/UX Designer",
      avatar: "/images/avatars/reviewer-4.webp",
      rating: 5,
      ago: "a year ago",
      text: "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.",
    },
  ],
} satisfies Partial<Course>;

type Seed = Pick<Course, "slug" | "title" | "category" | "image"> & {
  fullTitle?: string;
};

const seeds: Seed[] = [
  {
    slug: "learn-figma-from-basic",
    title: "Learn Figma from Basic",
    category: "ui-ux-design",
    image: "/images/courses/course-1.webp",
  },
  {
    slug: "build-digital-asset",
    title: "Build Digital Asset",
    fullTitle: "Build Digital Asset: A Comprehensive Guide",
    category: "graphic-design",
    image: "/images/courses/course-2.png",
  },
  {
    slug: "the-power-of-big-data",
    title: "the Power of Big Data",
    category: "data-science",
    image: "/images/courses/course-3.png",
  },
  {
    slug: "balancing-productivity-and-wellbeing",
    title: "Balancing Productivity and Wellbeing",
    category: "productivity",
    image: "/images/courses/course-4.png",
  },
  {
    slug: "mastering-money-management",
    title: "Mastering Money Management",
    category: "freelance-and-entrepreneurship",
    image: "/images/courses/course-5.png",
  },
  {
    slug: "from-idea-to-startup-success",
    title: "From Idea to Startup Success",
    category: "freelance-and-entrepreneurship",
    image: "/images/courses/course-6.png",
  },
];

export const courses: Course[] = seeds.map(({ fullTitle, ...seed }) => ({
  ...card,
  ...detail,
  ...seed,
  fullTitle: fullTitle ?? seed.title,
}));

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

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
  return search ? `/courses?${search}` : "/courses";
}

const CATALOGUE_REPEAT = 15;

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

export function listCourses({
  q,
  category,
  level,
  sort,
  page = 1,
  perPage = 18,
}: CourseQuery = {}) {
  const query = q?.trim().toLowerCase();
  const categoryLabel = (slug: string) =>
    categories.find((c) => c.slug === slug)?.label ?? "";

  let matches = courses.filter(
    (course) =>
      (!query ||
        [
          course.title,
          course.fullTitle,
          course.author,
          categoryLabel(course.category),
        ].some((field) => field.toLowerCase().includes(query))) &&
      (!category || inCategory(course, category)) &&
      (!level || course.level.toLowerCase() === level.toLowerCase()),
  );

  const sorter = sorters[sort as Sort];
  if (sorter) matches = matches.toSorted(sorter);

  const filtered = Boolean(
    query || (category && category !== "featured") || level,
  );
  const pool = (
    filtered
      ? [matches]
      : Array.from({ length: CATALOGUE_REPEAT }, () => matches)
  ).flatMap((run, r) =>
    run.map((course) => ({ id: `${course.slug}-${r}`, course })),
  );

  const pageCount = Math.max(1, Math.ceil(pool.length / perPage));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), pageCount);

  return {
    items: pool.slice((current - 1) * perPage, current * perPage),
    total: pool.length,
    page: current,
    pageCount,
    perPage,
  };
}
