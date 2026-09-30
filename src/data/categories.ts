export type Category = {
  slug: string;
  label: string;
};

function toCategory(label: string): Category {
  const slug = label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return { slug, label };
}

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
].map((row) => row.map(toCategory));

export const categories: Category[] = categoryRows.flat();

export const searchCategories: Category[] = [
  ...categoryRows[0],
  ...categories.filter((category) => category.slug === "cooking"),
];

export const learningPaths = [
  { slug: "design", label: "Design", icon: "design" },
  { slug: "development", label: "Development", icon: "development" },
  { slug: "it-and-software", label: "IT & Software", icon: "it" },
  { slug: "business", label: "Business", icon: "business" },
  { slug: "marketing", label: "Marketing", icon: "marketing" },
  { slug: "photography", label: "Photography", icon: "photography" },
] as const;

export type LearningPathIcon = (typeof learningPaths)[number]["icon"];

export const pathCategories: Record<string, string[]> = {
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

export function getCategoryLabel(slug: string) {
  return categories.find((category) => category.slug === slug)?.label ?? "";
}
