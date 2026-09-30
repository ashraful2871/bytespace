<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/images/logo.png" />
  <img src="public/images/logo-dark.png" alt="ByteSpace logo" height="37" />
</picture>

# ByteSpace

**A responsive marketing and course catalogue site for an online learning platform.**

Built from a Figma design with Next.js 16, React 19 and Tailwind CSS v4.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

[Features](#features) · [Tech stack](#tech-stack) · [Getting started](#getting-started) · [Project structure](#project-structure) · [Deployment](#deployment)

</div>

<br />

<p align="center">
  <img src="docs/preview.webp" alt="ByteSpace home page hero" width="900" />
</p>

## Table of contents

- [About](#about)
- [Features](#features)
- [Pages](#pages)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Architecture notes](#architecture-notes)
- [Design system](#design-system)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Author](#author)

## About

ByteSpace is the public website for a learning platform where students browse courses, follow learning paths and
discover creators. The project turns a nine-frame Figma design (1440 px wide) into a production-ready Next.js App
Router site that matches the design closely at desktop size and adapts down to phones.

There is no backend yet. Course, creator and testimonial content lives in typed data files under `src/data`, and the
forms use the browser's built-in validation.

## Features

- **Pixel-matched UI** built against the Figma frames, checked with a visual diff script that scores each page band by
  band
- **Fully responsive** layouts from 375 px phones to 1920 px desktops, with a modal mobile menu under 768 px
- **Course search** with a text query, category, level and sort filters, and pagination, all kept in the URL so every
  result page can be shared and the back button works
- **Course detail pages** with About, Lessons and Reviews tabs (reviews can be filtered by star rating)
- **Creator profiles** listing each creator's courses
- **Login and sign-up screens** with social login buttons
- **Server Components by default**, with only three small client components, so pages ship very little JavaScript
- **Works without JavaScript**: filters are links and dropdowns are native `<details>` elements
- **Static generation** of every course and creator page with `generateStaticParams`; unknown slugs return a 404
- **SEO ready**: per-page titles, descriptions, canonical URLs and Open Graph tags, plus a generated `sitemap.xml` and
  `robots.txt`
- **Accessible**: semantic landmarks, `aria-current` on active links, 44 × 44 px tap targets and reduced-motion support
- **Smooth scrolling on low-end GPUs**: shadows are pre-rendered images and glows are CSS gradients instead of
  `filter: blur()`

## Pages

| Route                       | Description                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| `/`                         | Landing page: hero, brands, courses, learning paths, features, creator call to action, testimonials |
| `/courses`                  | Course search with filters, sorting and pagination (`q`, `category`, `level`, `sort`, `page`)   |
| `/courses/[slug]`           | Course details: About tab                                                                        |
| `/courses/[slug]/lessons`   | Course details: Lessons tab with the module list                                                 |
| `/courses/[slug]/reviews`   | Course details: Reviews tab with a rating summary (`?rating=1..5`)                               |
| `/creators/[slug]`          | Creator profile with stats and their courses                                                     |
| `/login`, `/signup`         | Full-screen authentication pages                                                                 |
| any unknown URL             | Custom 404 page                                                                                  |

## Tech stack

| Category        | Tools                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org) (App Router, Turbopack)                                   |
| UI library      | [React 19](https://react.dev)                                                             |
| Language        | [TypeScript 5](https://www.typescriptlang.org)                                            |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com) with design tokens in CSS `@theme`             |
| Fonts           | Satoshi (self-hosted with `next/font/local`) and Poppins (`next/font/google`)              |
| Icons           | [Material Symbols](https://fonts.google.com/icons), generated into React components        |
| Image pipeline  | [sharp](https://sharp.pixelplumbing.com) for WebP conversion, tinting and baked shadows    |
| Linting         | ESLint 9 (flat config) with `eslint-config-next`                                          |
| Hosting         | [Vercel](https://vercel.com)                                                              |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 20.9 or later
- npm (the repository includes a `package-lock.json`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ashraful2871/bytespace.git
cd bytespace

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build   # builds and type-checks the app
npm run start   # serves the production build on port 3000
```

## Available scripts

| Command                            | Description                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------ |
| `npm run dev`                      | Starts the development server at `http://localhost:3000`                              |
| `npm run build`                    | Creates a production build (also runs the TypeScript check)                           |
| `npm run start`                    | Serves the production build                                                          |
| `npm run lint`                     | Runs ESLint over the project                                                         |
| `npm run icons`                    | Regenerates `src/components/icons` from Material Symbols                             |
| `npm run assets`                   | Rebuilds `public/images` from the exported Figma assets                              |
| `npm run diff <page> [--url path]` | Screenshots a page in headless Edge and compares it to the Figma reference, band by band |

## Environment variables

| Variable               | Required            | Description                                                                                   |
| ---------------------- | ------------------- | --------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | In production       | The public URL of the site, used for canonical links, Open Graph URLs and the sitemap. Falls back to `http://localhost:3000` |

Create a `.env.local` file for local overrides:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Project structure

```text
bytespace/
├── public/
│   └── images/               # optimised images generated by `npm run assets`
├── scripts/
│   ├── build-assets.mjs      # Figma export → WebP, tinted ornaments, baked shadows
│   ├── build-icons.mjs       # Material Symbols → React icon components
│   └── visual-diff.mjs       # screenshot vs. Figma comparison
└── src/
    ├── app/
    │   ├── (site)/           # pages with the footer: home, courses, creators
    │   ├── (auth)/           # login and sign-up, full screen without a footer
    │   ├── fonts/            # self-hosted Satoshi font files
    │   ├── globals.css       # Tailwind setup and design tokens
    │   ├── layout.tsx        # root layout, fonts and global metadata
    │   ├── not-found.tsx     # custom 404 page
    │   ├── shared-metadata.ts# title, description and Open Graph helpers
    │   ├── sitemap.ts
    │   └── robots.ts
    ├── components/
    │   ├── sections/         # landing page sections (Hero, Courses, Features, ...)
    │   ├── layout/           # Header, Footer, MobileNav, NavLink, BlueBand
    │   ├── ui/               # reusable primitives (Button, Chip, CourseCard, Dropdown, ...)
    │   ├── course/           # course detail page parts
    │   ├── search/           # search form, filter bar, pagination
    │   ├── creator/          # creator profile
    │   ├── auth/             # auth form fields and social login
    │   └── icons/            # generated SVG icon components
    ├── data/                 # static content: courses, categories, creators, testimonials, navigation
    └── lib/
        ├── course-search.ts  # filtering, sorting, pagination and URL building
        └── cn.ts             # class name helper
```

## Architecture notes

- **Route groups.** `(site)` renders `<main>` and the footer around every content page, and `(auth)` keeps the login
  and sign-up screens full screen. Pages return only their own content.
- **Server first.** Everything is a Server Component except `NavLink` (active link state), `MobileNav` (the menu
  dialog) and `ScrollToTop` (resets the scroll position when switching course tabs).
- **URL as state.** The search page reads its query, filters, sort order and page number from the query string
  through `parseCourseQuery` and builds links with `coursesHref`, so there is no client state to keep in sync.
- **Metadata.** Every route calls `pageMetadata()` from `src/app/shared-metadata.ts`, which sets an absolute title,
  description, canonical URL and Open Graph data in one place.
- **Images.** All images go through `next/image`. Only the hero image is preloaded; the rest load lazily.
- **Decorative compositions.** The hero visual and the Features illustration use positions measured on the 1440 px
  frame and scale down with CSS `zoom` on smaller screens.

## Design system

The design tokens live in `src/app/globals.css` under Tailwind's `@theme`, so there is no `tailwind.config` file.

| Token group   | Examples                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------- |
| Colours       | `primary-*` (brand blue `primary-800` #003be2), `secondary-*` (lime `secondary-400` #d4fb20), `neutral-*` |
| Text roles    | `text-ink` for titles, `text-body` for copy, `bg-surface` for light sections               |
| Typography    | `type-heading-l` (72 px) down to `type-label-xs` (12 px), each matching a Figma text style |
| Layout        | `container-page` (1200 px column with fluid gutters), `bg-blueprint`, `zoom-frame`, `tap-target` |

## Deployment

The site is deployed on [Vercel](https://vercel.com).

1. Import the repository into Vercel.
2. Add the `NEXT_PUBLIC_SITE_URL` environment variable with your production URL.
3. Deploy. Vercel detects Next.js and runs `npm run build` automatically.

Any other platform that supports Next.js works too: run `npm run build` and then `npm run start`.

## Roadmap

- [ ] Connect a backend and API for courses, users and enrolment
- [ ] Real authentication for the login, sign-up and social login buttons
- [ ] Working Share and Follow actions
- [ ] Contact and legal pages
- [ ] Finance and Sport course categories
- [ ] Automated tests

## Contributing

Contributions, issues and feature requests are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push the branch: `git push origin feature/your-feature`.
5. Open a pull request.

Please run `npm run lint` and `npm run build` before opening a pull request.

## Author

**Md. Ashraful Islam**

- GitHub: [@ashraful2871](https://github.com/ashraful2871)

<div align="center">

If you like this project, please give it a ⭐ on GitHub.

</div>
