export type Course = {
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

/** Category chips, grouped into the three rows used by the desktop layout. */
export const categoryRows = [
  ["Featured", "Music", "Drawing & Painting", "Marketing", "Animation", "Social Media", "UI/UX Design", "Creative Marketing"],
  ["Digital Illustration", "Film & Video", "Crafts", "Freelance & Entrepreneurship", "Graphic Design", "Photography"],
  ["Productivity", "Web Development", "Data Science", "Cooking"],
];

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

export const courses: Course[] = [
  { ...defaults, title: "Learn Figma from Basic", image: "/images/courses/course-1.png" },
  { ...defaults, title: "Build Digital Asset", image: "/images/courses/course-2.png" },
  { ...defaults, title: "the Power of Big Data", image: "/images/courses/course-3.png" },
  { ...defaults, title: "Balancing Productivity and Wellbeing", image: "/images/courses/course-4.png" },
  { ...defaults, title: "Mastering Money Management", image: "/images/courses/course-5.png" },
  { ...defaults, title: "From Idea to Startup Success", image: "/images/courses/course-6.png" },
];

export const learnerAvatars = [1, 2, 3, 4].map((n) => `/images/avatars/learner-${n}.png`);

export const happyStudentAvatars = [1, 2, 3, 4, 5, 6, 7].map((n) => `/images/avatars/happy-${n}.webp`);

export const learningPaths = [
  { label: "Design", icon: "/images/categories/design.png" },
  { label: "Development", icon: "/images/categories/development.png" },
  { label: "IT & Software", icon: "/images/categories/it-software.png" },
  { label: "Business", icon: "/images/categories/business.png" },
  { label: "Marketing", icon: "/images/categories/marketing.png" },
  { label: "Photography", icon: "/images/categories/photography.png" },
];
