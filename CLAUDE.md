# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

`next dev` generates and maintains AGENTS.md, so put project notes in this file instead. Next.js is **16.3.6** with React 19.2. Read `node_modules/next/dist/docs/` before using any Next.js API.

## Commands

npm is the package manager (`package-lock.json`).

- `npm run dev` starts the dev server on http://localhost:3000
- `npm run build` runs a production build, which also type-checks
- `npm run lint` runs ESLint 9 flat config (`eslint.config.mjs`: next core-web-vitals + typescript)
- `npx tsc --noEmit` type-checks without building

There is no test framework or test script yet.

A hook (`.claude/hooks/lint-edited.mjs`) runs ESLint with `--max-warnings 0` on every file under `src/` that Claude writes or edits, and it blocks until the problems are fixed. Use the `/new-section` skill to scaffold sections and the `design-reviewer` agent to audit them. The context commands are `/prime` (start of session), `/catchup` (after `/clear`), `/design-context [Section]` (before UI work), `/handoff` (end of session; writes the gitignored file `.claude/context/handoff.md`) and `/update-context` (records lessons in this file).

## Architecture

ByteSpace is the marketing landing page for a learning platform, built to match the Figma export `src/asset/Home.png` (a 1440px frame; `Hero_Frame.png` is the hero close-up). It currently has a single route, built with the App Router under `src/`.

- `src/app/page.tsx` stacks the sections: Hero (which renders the Header) → Brands → Courses → LearningPaths → Features → CreatorCta → Testimonials, then the Footer.
- `src/components/sections/` holds the page sections, `src/components/layout/` the Header and Footer, and `src/components/ui/` the reusable pieces (Button/ButtonLink, CourseCard, AvatarStack, FloatingCards, SectionHeader, Logo).
- Content lives in `src/data/` (courses, categories, learning paths, testimonials, nav links). There is no API.
- Components are Server Components except `layout/NavLink` (sets `aria-current` from the pathname) and `layout/MobileNav` (the <768 menu, a modal `<dialog>`). Chips, forms and buttons are static markup for now. You need a `"use client"` boundary before adding state or event handlers.
- `layout/BlueBand` is the blue top band of every page: it renders the Header (`headerVariant="auth"` shows only the logo mark) plus its children. The Hero uses it.
- Images are in `public/images/`. The hero shapes, student photo and logo are the Figma exports from `src/asset/`. Course thumbnails, avatars, brand logos, category icons, the creator illustration and `cta-shapes.png` were cropped from `Home.png` at 1x, so replace them with proper Figma exports (same file names) when those are available.
- The decorative compositions (the hero visual and `PathVisual` in Features) use fixed px positions measured on the 1440 frame and scale down with CSS `zoom` at smaller breakpoints.
- `/login`, `/signup` and `/contact` are linked but don't exist yet.
- The import alias `@/*` maps to `src/*`.

## Styling

Tailwind CSS v4 has no `tailwind.config`. The design tokens live in `src/app/globals.css` under `@theme inline`:

- Palettes: `primary-*` (the design's blue is `primary-800` #003be2), `secondary-*` (lime: `secondary-400` #d4fb20 for buttons and chips, `secondary-500` for the hero arc) and `neutral-*`. The text roles are `text-ink` (#040819 section titles), `text-body` (#4f4f4f) and `bg-surface` (#fafafa). Use these instead of arbitrary hex values.
- Type scale: `text-hero` (72/85), `text-display` (44/53) and `text-title` (36/44), all with the design's -1% tracking. For the mobile size, use the `text-[30px]/[1.25]` shorthand. A separate `leading-*` class sets `--tw-leading`, which overrides the token's line height at `md:`.
- Fonts: Satoshi (body) is self-hosted from `src/app/fonts/` through `next/font/local`, and Poppins (headings, `font-poppins`) comes from `next/font/google`. Both are wired in `layout.tsx` as `--font-satoshi-family` and `--font-poppins-family`.
- Layout utilities: `container-page` (a 1200px column plus 24px gutters), `bg-blueprint` (the blue band with its 120px grid) and `zoom-frame` (a 1440px Figma frame scaled to its `@container` parent's width; Features uses it from `lg`).
