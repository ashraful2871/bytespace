# ByteSpace: Pixel-Perfect Implementation Plan

> **Status:** Draft for review (2026-09-28). No application code has been changed yet.
> **Goal:** a 1:1 build of the Figma file at 1440px, with a responsive layout that doesn't break below or above that width.
> **Figma:** `FKLQ5Aakayoefn5fs8OKix` (page `0:1 Design`), <https://www.figma.com/design/FKLQ5Aakayoefn5fs8OKix>
> **How to run it:** one phase per session. Type `/design-next` (or `/phase-NN-…`). Progress is tracked in [`design_tracker.md`](design_tracker.md).

---

## 1. How this plan saves tokens (read once)

| Layer | File | When it is read |
|---|---|---|
| Master plan (this file) | `design_plan.md` | Only for review or re-planning. **Implementation sessions don't read it.** |
| Tracker | `design_tracker.md` | At the start and end of every session (small). |
| Phase brief | `.claude/commands/phase-NN-*.md` | The one phase being worked on. It is self-contained: scope, exact specs, steps and a Definition of Done. |
| Figma geometry | `.claude/figma/tree/<page>.txt` | Only the page that phase touches. It holds node IDs, x/y/w/h and all text content. |
| Figma visuals | `.claude/figma/screens/<page>.png` and `src/asset/Home.png` | The visual target, read once per phase. |
| Figma assets | `.claude/figma/assets/**` | Staging only. Phase 00 moves the processed assets into `public/`. |

**Figma MCP is rate-limited.** The Starter plan returned *"You've reached the Figma MCP tool call limit"* during planning. Every spec needed was captured before the limit hit and written into the phase briefs. **Phases must not call Figma MCP.** Anything still missing comes from a **manual Figma export** (no API cost), listed in Phase 00.

---

## 2. Sources of truth (priority order)

1. **Figma frame values:** the numbers written into each phase brief. They were extracted from `get_design_context` and `get_metadata`.
2. **`.claude/figma/tree/*.txt`:** exact geometry and copy for every page.
3. **Reference renders:** `src/asset/Home.png` (full-res 1440×6377) and the `.claude/figma/screens/*.png` previews (low-res). Full-res PNGs for the other pages come from the Phase 00 manual export.
4. The existing code is **not** a source of truth. Where it differs from 1–3, 1–3 wins.

**Figma layers that must NOT be built:** hidden nodes (such as `12:169 Group 1` in the hero and the hidden ornaments on detail bands), and the off-canvas `11:21 Categories_Cards_Frame` at x=-1624.

---

## 3. Audit: current build vs Figma (evidence-based)

The home page was rendered headless at 1440, 1920, 1280, 1024 and 390, and compared side by side with `Home.png`.

### 3.1 Systemic issues
| # | Issue | Evidence | Fix phase |
|---|---|---|---|
| S1 | **Side strips on wide screens.** The Features, Testimonials and CTA backgrounds (glows, shapes) sit in a fixed 1440px box, so at 1920 the band shows hard white or flat edges left and right. | 1920 capture | 01, 05, 06, 07 |
| S2 | **Cramped gutters below 1440.** `container-page` uses a fixed 24px gutter, so at 1024–1366 the content almost touches the edges. The design breathes at 120px. | 1280 and 1024 captures | 01 |
| S3 | **Flattened composites used as backgrounds.** The CTA is `cta-shapes.png` with `bg-cover`, and the Features creator visual is one cropped PNG (`creator.png`). Neither is real DOM. | code | 05, 06 |
| S4 | **Assets are 1x crops of `Home.png`.** Thumbnails, avatars, brand logos, category icons and the student cut-outs look blurry on retina, and the student cut-out has a hard crop edge in Features. | code and 1440 diff | 00 |
| S5 | **Icons substituted.** The code uses lucide `Search`, `ShoppingBag`, `Star` and `ChartNoAxes…` plus a hand-drawn check. Figma uses **Material Symbols** (Outlined, Filled or Round). | Figma component descriptions | 01 |
| S6 | **Logo is a 1x PNG.** Figma draws it as a vector mark plus the wordmark in *Clash Display Bold 24*. | Figma | 00, 01 |
| S7 | **Type tokens drift.** The hero line height is 85px where Figma has 1.2 (86.4). "55%" is Medium where Figma is SemiBold. Stat numbers are Satoshi where Figma is Poppins Medium 36/44. The card title line height is 30 where Figma has 24/28. The card price is Satoshi Bold where Figma is Poppins SemiBold. | Figma styles | 01, 03–06 |
| S8 | **Radii drift.** Cards and testimonials use 20px where Figma has 24. Thumbnails use 10 where Figma has 12. Floating cards need 16. | Figma | 01, 04, 06 |
| S9 | **Hero arc is a ring, not a disc.** Figma is an SVG circle r414.5 with a 320px stroke in `#CBFC01`, top 582. | `assets/hero/lime-arc.svg` | 03 |
| S10 | **Box-shadow on transparent cut-outs.** Figma effect "A" is 8 stacked drop shadows. On PNG cut-outs it must be `filter: drop-shadow(...)`, never `box-shadow`. | Figma effect `A` | 01, 03, 05 |
| S11 | **8 of 9 pages missing.** Search, Course Details (About/Lessons/Reviews), Creator Profile, Login, Register and 404 don't exist, and the `/login`, `/signup` and `/contact` links are dead. | Figma | 08–13 |
| S12 | **Possible mobile overflow at 390px.** The headless capture clips on the right. This may be headless Chrome's minimum-width artifact, so it must be verified in DevTools device mode. | 390 capture | 00, 07 |

### 3.2 Home section deltas (at 1440)
| Section | Figma node | Deltas to fix |
|---|---|---|
| Header | `1:1778` | SVG logo at (122,35). Nav centered at 50% with a 24 gap (Home is Label M, the others Body 16/1.6). Right group at right 120, top 48. Material icons. |
| Hero | `1:1695` | Ring arc. Student image 578×541 at top 512 with drop-shadow A. Cards at exact coordinates. 6 ornaments rebuilt from renders with hard-light tint. |
| Brands | `1:1794` | Logos are **41–42px** tall (code has 50) and should be SVG. Row at x154, width 1132. |
| Courses | `12:101`, `21:33/56/63`, `33:683` | Title `#040819`. Chip rows at y 1520/1584/1648 (pitch 64, gap 16). Grid starts 77 below the chips. CourseCard rebuild (radius, chip placement, fonts). |
| Paths | `34:684`, `34:725` | Title 36/1.2 SemiBold. Card = lime 60px circle with a 36px Material icon, plus Label XL. No PNG crops. |
| Features | `34:1159` | Real composition: cards, photo, springs, SVG glows full-bleed. Stats in Poppins Medium 36/44. 24px `check_circle` icons. |
| CTA | `34:1161` | Real DOM: grid SVG, 7 tinted ornaments, content vertically centered with a 40 gap. |
| Testimonials | `34:1175` | Radius 24, card gap 41, title row `items-end` with gap 43, 3 SVG glows full-bleed. |
| Footer | `34:1256` | pt 71, gap 130, nav gap 92, invisible column headings (48px offset), link gap 16, input 376×52. |

---

## 4. Design system (single source in `src/app/globals.css`)

### 4.1 Color tokens (Figma name → Tailwind token)
| Figma variable | Hex | Token |
|---|---|---|
| Persian Blue/800 | `#003BE2` | `primary-800` (brand band, links, prices) |
| Electric Lime/400 | `#D4FB20` | `secondary-400` (buttons, chips, fills) |
| Electric Lime/500 | `#CBFC01` | `secondary-500` (hero ring, glows, "+12$" badge) |
| Shuttle Gray/50…950 | `#F5F5F6` … `#242528` | `neutral-50…950` (already matching) |
| Black/700 | `#4F4F4F` | `body` |
| Black/950 | `#000000` | `black` |
| (title) | `#040819` | `ink` |
| (surface) | `#FAFAFA` | `surface` |
| (progress track) | `#F6F6F6` | **add** `track` |
| Electric Violet/600, /950 | `#7F30F7`, `#300B6A` | **add** `violet-600`, `violet-950` (reserved) |

### 4.2 Text styles, as composite utilities (`@utility type-*`)
Figma's "letterSpacing -1" is **-1%**, which is `-0.01em`.
| Utility | Font | Size / line height | Weight | Tracking |
|---|---|---|---|---|
| `type-heading-l` | Poppins | 72 / 1.2 | 600 | -1% |
| `type-heading-m` | Poppins | 44 / 1.2 | 600 | -1% |
| `type-display-s` | Poppins | 44 / 52px | 500 | -1% |
| `type-display-xs` | Poppins | 36 / 44px | 500 | -1% |
| `type-heading-s` | Poppins | 24 / 32px | 600 | -1% |
| `type-heading-xs` | Poppins | 20 / 28px | 600 | -1% |
| `type-body-l` / `-m` / `-s` / `-xs` | Satoshi | 18/1.6 · 16/24px · 14/1.6 · 12/1.6 | 400 | 0 |
| `type-label-xl` / `-l` / `-m` / `-s` / `-xs` | Satoshi | 20/1.2 · 18/1.2 · 16/1.2 · 14/1.2 · 12/20px | 500 | 0 |

Detail pages also use 36/1.2 SemiBold for page titles (`type-title`), which is derived from the 43px text boxes.

### 4.3 Effects, radii and layout
- `--shadow-float` (Figma effect **A**) is 8 layers. Use it as `shadow-float` for boxes and `drop-shadow-float` (filter) for cut-out images.
- Radii: card **24**, thumbnail **12**, floating card **16**, chips and buttons **24** (pill), avatar full.
- **Container (decision D1):** `max-width: 1200px` content with a fluid gutter `clamp(1.5rem, 5vw, 7.5rem)`. That gives exactly 120 at 1440, 64 at 1280 and 24 on mobile.
- **Design frame (`design-frame`):** decorations use a centered 1440×H stage (`left:50%; translate:-50%`) so Figma x/y apply 1:1. Full-bleed colors and glows are painted outside that stage so there are **no side strips** at ≥1441px.
- **Blue band (`bg-blueprint`):** the `#003BE2` background plus the Figma grid (2px white lines at 12%, 120px pitch). It is replaced by the exact SVG for parity.
- **Scaling decorations:** the 1440 compositions (hero visual, feature visuals, auth collage) scale with CSS `zoom` at defined breakpoints, as now, with the steps documented in each phase.

### 4.4 Breakpoint contract
| Viewport | Behavior |
|---|---|
| ≥1440 | **Pixel-perfect** to Figma. Wider screens get full-bleed backgrounds and the content stays centered at 1200. |
| 1024–1439 | Same layout, fluid gutters, decorations scale via `zoom`. |
| 768–1023 | Two-column grids, stacked feature rows, and a hamburger menu. |
| <768 | Single column, no horizontal scroll at **375px**. Decorative ornaments are hidden or reduced. |

---

## 5. Architecture

### 5.1 Routes (App Router, Next 16: `params` and `searchParams` are Promises, so await them)
```
src/app/
  layout.tsx                      fonts, metadataBase, <body>
  page.tsx                        Home                 (Figma 1:1067)
  not-found.tsx                   404                  (63:252)
  courses/page.tsx                Search / catalogue   (55:117)  ?q&category&level&sort&page
  courses/[slug]/layout.tsx       Course hero band + video + sidebar + tabs
  courses/[slug]/page.tsx         About tab            (55:4066)
  courses/[slug]/lessons/page.tsx Lessons tab          (60:102)
  courses/[slug]/reviews/page.tsx Reviews tab          (60:681)
  creators/[slug]/page.tsx        Creator profile      (60:1878)
  (auth)/layout.tsx               full-screen blueprint split layout (no footer)
  (auth)/login/page.tsx           Login                (49:195)
  (auth)/signup/page.tsx          Register             (47:351)
```
- Filters, tabs and pagination are **links with URL state** (`searchParams`, nested routes), so pages stay Server Components. `"use client"` is only used for the mobile menu and any later form enhancements.
- Every page gets `generateMetadata` and `generateStaticParams` for its slugs.

### 5.2 Components
```
src/components/
  layout/   Header (variants: site | auth), MobileNav (client), Footer, BlueBand
  ui/       Button/ButtonLink (primary | outline | white; lg 46 | md 40 | sm 35), Chip, Pill,
            Icon/* (Material Symbols as typed TSX), Logo (SVG), CourseCard, AvatarStack,
            ProgressBar, RatingStars, FloatingCard (Topic, Progress, HappyStudents, Revenue, YearToDate),
            Ornament (tinted 3D render), Glow (SVG blur ellipse), SectionHeader, Tabs (link),
            FilterBar, Pagination, TextField
  sections/ home/*  course/*  creator/*  auth/*
src/data/   courses.ts (slug, lessons, reviews, sneak peek), creators.ts, categories.ts, navigation.ts
```

### 5.3 Asset pipeline
- `scripts/build-assets.mjs` (Phase 00) uses `sharp`, which already ships with Next.
  1. **Ornaments:** takes the 2500² renders in `.claude/figma/assets/ornaments/`, resizes each to 2× its display size, and applies the Figma tint (a solid `#D4FB20` or `#F5F5F6` layer with `blend: 'hard-light'`, masked by the render's alpha). Output is `public/images/ornaments/<shape>-<tint>-<size>.webp`.
  2. **Photos and avatars:** converted to WebP at 2×.
- **SVGs** (grid, glows, arc, logo, brand logos) are copied to `public/images/svg/`. Icons become TSX components.
- `next/image` is used everywhere, with explicit `width`/`height`, `sizes` and `preload` only for the hero LCP image.

### 5.4 QA tooling
`scripts/visual-diff.mjs` (Phase 00, no new dependencies) runs Edge or Chrome headless at 1440 and outputs `current.png`. It computes a per-section mean pixel difference against the reference with `sharp`, and writes side-by-side and diff PNGs to `.claude/figma/diff/` (gitignored).
- **Pass bar per section:** ≤ 2% mean difference, and no structural offset > 2px on text baselines or boxes. Font antialiasing noise is expected.

---

## 6. Phases

| # | Phase | Output | Depends on |
|---|---|---|---|
| 00 | Setup, assets and baseline | asset pipeline, visual-diff script, manual export checklist, fixed stale docs, baseline scores | — |
| 01 | Design tokens and UI primitives | globals.css tokens, `type-*`, container, icons, Logo, Button, Chip, Pill, ProgressBar, Ornament, Glow, BlueBand | 00 |
| 02 | Shell: Header, MobileNav, Footer | shared across all pages | 01 |
| 03 | Home: Hero | exact hero | 02 |
| 04 | Home: Brands, Courses, Learning Paths | CourseCard rebuild | 01 |
| 05 | Home: Features | real composition | 04 |
| 06 | Home: CTA and Testimonials | real DOM CTA, glows | 01 |
| 07 | Home: responsive and QA sign-off | 1920 / 1440 / 1280 / 1024 / 768 / 390 | 03–06 |
| 08 | Data model, routing and 404 | typed data, routes, `not-found` | 02 |
| 09 | Search page `/courses` | filters, chips, grid, pagination | 04, 08 |
| 10 | Course detail shell and About tab | band, video, sidebar, tabs | 08 |
| 11 | Lessons and Reviews tabs | module list, rating summary, reviews | 10 |
| 12 | Creator profile | band, stats, filtered grid | 09 |
| 13 | Auth: Login and Register | split layout, forms, collage | 01, 08 |
| 14 | Final QA and hardening | a11y, performance, SEO, cross-browser, cleanup, docs | all |

**Rules for every phase**
1. Read only what the phase brief lists. Don't open unrelated components.
2. Use tokens and `type-*` utilities, with no raw hex. An arbitrary `[..px]` value is allowed **only** for Figma geometry that has no token.
3. Before editing a Next.js API, read the matching doc in `node_modules/next/dist/docs/` (project rule).
4. Finish with `npm run lint`, `npx tsc --noEmit`, the visual diff (UI phases), and a tracker update.
5. **Never commit.** The user commits after reviewing each phase.

---

## 7. Definition of Done (whole project)
- All 9 Figma frames implemented. Each section is ≤ 2% mean difference at 1440, or has a logged, user-approved deviation in the tracker.
- No horizontal scroll from 375 to 2560px, and no side strips on wide screens.
- Lighthouse (desktop): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Keyboard-navigable with visible focus. Icon-only controls have labels, and headings follow order.
- `npm run build` passes, and lint is clean at `--max-warnings 0`.
- No temporary Figma URLs remain in the code, and all assets are local, optimized and 2× for raster images.
- CLAUDE.md is updated via `/update-context`, and the stale 1x-crop notes are removed.

## 8. Risks and mitigations
| Risk | Mitigation |
|---|---|
| Figma MCP limit blocks new specs | Specs are pre-captured, with manual exports (Phase 00) and `.claude/figma/tree` geometry. |
| Clash Display (logo font) isn't installed | The logo ships as an outlined SVG, so no font is needed. |
| Some photos in Figma are low-res (hero student source is 516×483, shown at 578×541) | Use the best available source. Flag for the designer; don't upscale artificially. |
| Material icon names are unconfirmed for some category icons | Phase 01 checklist: confirm each in the Figma layer panel, with the PNG crops as fallback. |
| Headless screenshot noise | Section-level thresholds, and review the side-by-side output, not just the number. |

## 9. Decisions for review (defaults apply unless changed)
| ID | Decision | Default |
|---|---|---|
| D1 | Fluid container gutter `clamp(24px, 5vw, 120px)` | **Yes** |
| D2 | Tabs and filters as URL state (links), not client state | **Yes** |
| D3 | Detail page tab row sits at y=63 (About) or y=78 (Lessons, Reviews) in Figma, a 15px inconsistency | Normalize to **78**, logged as a deviation |
| D4 | The Course Details "Share" button sits outside the 1200 column in Figma (right edge at x=1405) | Keep it exact at ≥1440 and clamp it into the column below that |
| D5 | Course sidebar `position: sticky` on scroll (not in Figma) | **No** (static, as designed) |
| D6 | Auth forms: native HTML validation only, with no backend | **Yes** |
| D7 | Add `@material-symbols/svg-400` (Apache-2.0) as a devDependency to generate exact icon TSX | **Yes** |
| D8 | Add `.claude/figma/assets/` (about 9 MB of raw renders) and `.claude/figma/diff/` to `.gitignore` after Phase 00 processes them | **Yes** |
