export type Creator = {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  blurb: string;
  bio: string[];
  avatar: string;
  avatarSm: string;
  products: number;
  followers: number;
};

export const creators: Creator[] = [
  {
    slug: "purepearl-studio",
    name: "PurePearl Studio",
    role: "Professional Creator",
    tagline: "Passionate UI/UX, Web designer",
    blurb:
      "Ready to Dive In? Enroll Now and Start Building Your Digital Future!",
    bio: [
      "Welcome to the creative world of [Creator's Name]. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!",
      "ive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.",
    ],
    avatar: "/images/creators/creator-purepearl.webp",
    avatarSm: "/images/creators/creator-sm.webp",
    products: 3,
    followers: 12,
  },
];

export function getCreator(slug: string): Creator | undefined {
  return creators.find((creator) => creator.slug === slug);
}
