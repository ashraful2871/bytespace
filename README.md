# ByteSpace

The marketing site for ByteSpace, an online learning platform, built from the Figma design with Next.js (App Router),
React 19 and Tailwind CSS v4.

## Pages

- `/`: landing page (hero, brands, courses, learning paths, features, creator call to action, testimonials)
- `/courses`: course search with a text query, filters, sorting and pagination, all kept in the URL
- `/courses/[slug]`: course details, with About, Lessons and Reviews tabs
- `/creators/[slug]`: creator profile with their courses
- `/login` and `/signup`
- a custom 404 page

There's no backend yet. Course data lives in `src/data`, and the forms only use the browser's built-in validation.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Script          | What it does                                    |
| --------------- | ----------------------------------------------- |
| `npm run dev`   | Development server                              |
| `npm run build` | Production build (also type-checks)             |
| `npm run start` | Serves the production build                     |
| `npm run lint`  | ESLint                                          |
| `npm run icons` | Regenerates `src/components/icons` from Material Symbols |
| `npm run assets`| Rebuilds `public/images` from the exported Figma assets  |

## Project structure

```
src/
  app/
    (site)/         pages that share the footer: home, courses, creators
    (auth)/         login and signup, full screen without a footer
    shared-metadata.ts   title / description / Open Graph helper used by every route
    sitemap.ts, robots.ts
  components/
    sections/       the landing page sections
    layout/         header, footer, mobile menu, the blue page band
    ui/             reusable building blocks (Button, Chip, CourseCard, Dropdown, ...)
    course/         course detail page parts
    search/         search form, filters, pagination
    auth/, creator/
    icons/          generated SVG icon components
  data/             static content: courses, categories, creators, navigation
  lib/              helpers: course search and URL building, `cn()` for class names
```

A few choices worth knowing about:

- **Server Components by default.** Only `NavLink` (active link state), `MobileNav` (the menu dialog) and
  `ScrollToTop` run on the client. The search filters are plain links, and the dropdowns are native `<details>`
  elements, so they work without JavaScript.
- **URL state.** Search, filters, sort and page all live in the query string, so every result page can be linked
  and shared, and the back button works.
- **Static generation.** Course and creator pages are prerendered with `generateStaticParams`; unknown slugs return
  a 404.
- **Design tokens** (colours, radii, the Figma text styles as `type-*` utilities) are defined in
  `src/app/globals.css` with Tailwind's `@theme`.
- **Scroll performance.** The decorative shadows and glows are pre-rendered images and CSS gradients rather than
  `filter: blur()`, which was noticeably slow to repaint while scrolling on low-end GPUs.

## Deployment

Deployed on Vercel. Set `NEXT_PUBLIC_SITE_URL` to the production URL so canonical links, Open Graph URLs and the
sitemap point at the right domain.
