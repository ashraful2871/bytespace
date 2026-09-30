# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

`next dev` generates and maintains AGENTS.md, so put project notes in this file instead. Next.js is **16.3.6** with React 19.2. Read `node_modules/next/dist/docs/` before using any Next.js API.

## Commands

npm is the package manager (`package-lock.json`).

- `npm run dev` starts the dev server on http://localhost:3000
- `npm run build` runs a production build, which also type-checks
- `npm run lint` runs ESLint 9 flat config (`eslint.config.mjs`: next core-web-vitals + typescript)
- `npx tsc --noEmit` type-checks without building. While `node_modules` is a bun install, `npx tsc` fetches the wrong package: use `node node_modules/typescript/bin/tsc --noEmit`
- `npm run diff <page> [--ref file] [--url path]` screenshots a page in headless Edge and scores it against the Figma reference, band by band (`scripts/visual-pages.json`; `BASE_URL` picks the server, default :3000). Target ≤ 2% per band. In Git Bash set `MSYS_NO_PATHCONV=1` so `--url /creators/...` isn't rewritten
- `npm run assets` rebuilds `public/images` from the Figma kit in `.claude/figma/assets` (tinted 2× ornaments, WebP photos, baked shadows); `npm run icons` regenerates `src/components/icons` from Material Symbols (list in `scripts/build-icons.mjs`)

There is no test framework or test script yet.

A hook (`.claude/hooks/lint-edited.mjs`) runs ESLint with `--max-warnings 0` on every file under `src/` that Claude writes or edits, and it blocks until the problems are fixed. Use the `/new-section` skill to scaffold sections and the `design-reviewer` agent to audit them. The context commands are `/prime` (start of session), `/catchup` (after `/clear`), `/design-context [Section]` (before UI work), `/handoff` (end of session; writes the gitignored file `.claude/context/handoff.md`) and `/update-context` (records lessons in this file).

## Architecture

ByteSpace is the site for a learning platform, built to match 9 Figma frames (1440 wide; `src/asset/Home.png` is the full-res Home, the others are previews in `.claude/figma/screens/`). App Router under `src/`. Progress, decisions and approved deviations from Figma are in `design_tracker.md`.

- Routes: `/` (Home), `/courses` (search: URL state `q`, `category`, `level`, `sort`, `page`), `/courses/[slug]` with the About, `lessons` and `reviews` (`?rating=n`) tabs under one layout, `/creators/[slug]`, `(auth)/login` and `(auth)/signup` (no footer), `not-found`, plus `sitemap.ts` and `robots.ts`.
- Metadata: every route calls `pageMetadata()` from `src/app/shared-metadata.ts` (absolute title, description, canonical, Open Graph). A segment's `openGraph` replaces its parent's, so don't set partial metadata by hand. Set `NEXT_PUBLIC_SITE_URL` on deploy (canonical, OG and sitemap URLs fall back to localhost:3000).

- `src/app/page.tsx` stacks the sections: Hero (which renders the Header) → Brands → Courses → LearningPaths → Features → CreatorCta → Testimonials, then the Footer.
- `src/components/sections/` holds the Home sections, `layout/` the shell (Header, Footer, BlueBand, MobileNav, NavLink), `ui/` the primitives (Button/ButtonLink, Chip, Pill, CourseCard, Dropdown, FloatingCard(s), Ornament, Glow, FloatShadow, RatingStars, ProgressBar, SectionHeader, Logo), and `course/`, `search/` and `auth/` the page parts. `icons/` is generated.
- Content lives in `src/data/` (courses with the detail/lesson/review copy, creators, categories, learning paths, testimonials, nav links) with `getCourse`, `getCreator`, `listCourses`, `parseCourseQuery` and `coursesHref`. There is no API; forms are native (`action="#"`) and Share, Follow and the social logins are static until there is a backend.
- Components are Server Components except `layout/NavLink` (sets `aria-current` from the pathname) `layout/MobileNav` (the <768 menu, a modal `<dialog>`) and `layout/ScrollToTop` (in the course layout: Next skips its scroll-to-top when the new page segment's top edge is already on screen, and the tab content starts ~1100px down). `<html>` carries `data-scroll-behavior="smooth"` so Next turns off the smooth scrolling in `globals.css` during page changes. The search menus are native `<details>`, not client code. You need a `"use client"` boundary before adding state or event handlers.
- `layout/BlueBand` is the blue top band of every page: it renders the Header (`headerVariant="auth"` shows only the logo mark) plus its children. The Hero uses it.
- Images are in `public/images/`, built by `npm run assets`. Some are stand-ins until the manual Figma export lands; the tracker lists them, and re-running `npm run assets` replaces them.
- Images: only the hero student uses `preload`. React 19 emits a preload link for every non-lazy `<img>`, so leave other images lazy (the `next/image` default), and don't put `var()` in `sizes`. Fonts load only the weights in use: Poppins 500/600 and Satoshi 400/500/700.
- The decorative compositions (the hero visual and `PathVisual` in Features) use fixed px positions measured on the 1440 frame and scale down with CSS `zoom` at smaller breakpoints.
- `/contact`, the legal pages and the Finance/Sport categories are still `#` links in `data/navigation.ts`.
- The import alias `@/*` maps to `src/*`.

## Styling

Tailwind CSS v4 has no `tailwind.config`. The design tokens live in `src/app/globals.css` under `@theme inline`:

- Palettes: `primary-*` (the design's blue is `primary-800` #003be2), `secondary-*` (lime: `secondary-400` #d4fb20 for buttons and chips, `secondary-500` for the hero arc) and `neutral-*`. The text roles are `text-ink` (#040819 section titles), `text-body` (#4f4f4f) and `bg-surface` (#fafafa). Use these instead of arbitrary hex values.
- Type scale: the Figma text styles are the `type-*` utilities in `globals.css` (`type-heading-l` 72 down to `type-label-xs` 12). Each one sets family, size, line height, weight and tracking. The styles the page lines up on use whole-pixel line heights, as Figma does (`type-heading-m` 53, `type-title` 43, `type-body-l` 29, `type-body-s` 22, `type-body-xs` 19). Switch styles with variants (`type-body-m md:type-body-l`). Mobile headings have no Figma style, so they use the `max-md:text-[30px]/[1.25]` shorthand (32px in the CTA). Use arbitrary `text-[…]` and `leading-[…]` values only where no style exists.
- Fonts: Satoshi (body) is self-hosted from `src/app/fonts/` through `next/font/local`, and Poppins (headings, `font-poppins`) comes from `next/font/google`. Both are wired in `layout.tsx` as `--font-satoshi-family` and `--font-poppins-family`.
- Layout utilities: `container-page` (a 1200px column plus fluid gutters, 24px on phones to 120px), `bg-blueprint` (the blue band with its 120px grid), `zoom-frame` (a 1440px Figma frame scaled to its `@container` parent's width; Features uses it from `lg`, the CTA from 1440), `tap-target` (grows a small control's hit area to 44×44 with an `::after`, without changing the layout; the element becomes `relative`), `fit-height` (zooms a screen to fit `100dvh` of `--fit-h`; the auth pages from md) and `design-stage` (a stage in Figma frame coordinates for absolutely placed art).
- Motion: only color transitions plus a chevron flip. Smooth anchor scrolling and any transform animation are gated on `prefers-reduced-motion` (`motion-reduce:transition-none`).
- Scroll performance: don't use CSS `filter` (such as `drop-shadow()` or `blur()`), `backdrop-filter` or blurred SVG images for decoration. Chrome redoes them on every scroll frame, and on the owner's GPU (GeForce GT 730) they caused frames of up to 1.6s and a slow return when switching back to the tab. Shadows under cut-outs are baked by `npm run assets` (`bakeShadow`, Figma Shadow A) and drawn with `ui/FloatShadow`. Glows are CSS radial gradients (`ui/Glow`). The one exception is the glass `Pill`'s 4px backdrop blur, measured at about 0.1ms a frame. To measure, scroll the page in headless Chrome over CDP (`Input.synthesizeScrollGesture`) and record the requestAnimationFrame deltas.
