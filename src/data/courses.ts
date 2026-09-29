export type Course = {
  slug: string;
  title: string;
  author: string;
  image: string;
  rating: number;
  level: string;
  price: number;
  lessons: number;
  duration: string;
  comments: number;
  learners: number;
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

/** Category chips, grouped into the three rows used by the desktop layout. */
export const categoryRows: Category[][] = [
  ["Featured", "Music", "Drawing & Painting", "Marketing", "Animation", "Social Media", "UI/UX Design", "Creative Marketing"],
  ["Digital Illustration", "Film & Video", "Crafts", "Freelance & Entrepreneurship", "Graphic Design", "Photography"],
  ["Productivity", "Web Development", "Data Science", "Cooking"],
].map((row) => row.map(category));

export const categories: Category[] = categoryRows.flat();

const defaults = {
  author: "purepearl studio",
  rating: 4.5,
  level: "Beginner",
  price: 25,
  lessons: 17,
  duration: "2 hours 16 mins",
  comments: 59,
  learners: 26,
};

// Thumbnails 2–6 are 1x crops of Home.png until the manual export (thumb-2..6) becomes course-N.webp.
export const courses: Course[] = [
  { ...defaults, slug: "learn-figma-from-basic", title: "Learn Figma from Basic", image: "/images/courses/course-1.webp" },
  { ...defaults, slug: "build-digital-asset", title: "Build Digital Asset", image: "/images/courses/course-2.png" },
  { ...defaults, slug: "the-power-of-big-data", title: "the Power of Big Data", image: "/images/courses/course-3.png" },
  {
    ...defaults,
    slug: "balancing-productivity-and-wellbeing",
    title: "Balancing Productivity and Wellbeing",
    image: "/images/courses/course-4.png",
  },
  { ...defaults, slug: "mastering-money-management", title: "Mastering Money Management", image: "/images/courses/course-5.png" },
  { ...defaults, slug: "from-idea-to-startup-success", title: "From Idea to Startup Success", image: "/images/courses/course-6.png" },
];

export const learnerAvatars = [1, 2, 3, 4].map((n) => `/images/avatars/learner-${n}.webp`);

export const happyStudentAvatars = [1, 2, 3, 4, 5, 6, 7].map((n) => `/images/avatars/happy-${n}.webp`);

/** Learning-path cards. `icon` is a key into the icon map in `LearningPaths`. */
export const learningPaths = [
  { slug: "design", label: "Design", icon: "design" },
  { slug: "development", label: "Development", icon: "development" },
  { slug: "it-and-software", label: "IT & Software", icon: "it" },
  { slug: "business", label: "Business", icon: "business" },
  { slug: "marketing", label: "Marketing", icon: "marketing" },
  { slug: "photography", label: "Photography", icon: "photography" },
] as const;
