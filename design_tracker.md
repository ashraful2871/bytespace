# ByteSpace design implementation tracker

> Read this at the start of each session, and update it at the end. Keep entries to one line each.
> Legend: ⬜ todo · 🟨 in progress · ✅ done (lint, tsc and diff pass; user reviewed) · ⛔ blocked
> Run the next phase with `/design-next`, or run one directly with `/phase-NN-…`. The full plan is in `design_plan.md` (reference only).

## Phase status

| #   | Phase                                 | Command                      | Status | Date       | Notes                                                                                                                           |
| --- | ------------------------------------- | ---------------------------- | ------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 00  | Setup, assets and baseline            | `/phase-00-setup`            | 🟨     | 2026-09-28 | Tooling, docs and baseline done. Waiting on the manual Figma export (all of step A is missing), then re-run `npm run assets`    |
| 01  | Design tokens and UI primitives       | `/phase-01-tokens`           | 🟨     | 2026-09-28 | Done (tsc, lint, build, diff pass); awaiting user review. Logo wordmark and Facebook/Google icons wait on the manual export     |
| 02  | Shell: Header, MobileNav, Footer      | `/phase-02-shell`            | 🟨     | 2026-09-28 | Done (tsc, lint, build, diff pass; keyboard and 375 checked over CDP); awaiting user review. Header strip (y 0–120) 0.41 → 0.37 |
| 03  | Home: Hero                            | `/phase-03-hero`             | 🟨     | 2026-09-28 | Done (tsc, lint, build, diff pass; offsets ≤2px; 1280/1024/768/375 checked over CDP); awaiting user review. Hero 1.35 → 1.02 |
| 04  | Home: Brands, Courses, Learning Paths | `/phase-04-courses`          | 🟨     | 2026-09-29 | Done (tsc, lint, build, diff pass; sections land on exact Figma y; 1280/1024/768/375 checked over CDP); awaiting user review. Brands still on crops (no SVG export) |
| 05  | Home: Features                        | `/phase-05-features`         | ⬜     |            |                                                                                                                                 |
| 06  | Home: CTA and Testimonials            | `/phase-06-cta-testimonials` | ⬜     |            |                                                                                                                                 |
| 07  | Home: responsive and QA sign-off      | `/phase-07-home-qa`          | ⬜     |            |                                                                                                                                 |
| 08  | Data model, routing and 404           | `/phase-08-routes`           | ⬜     |            |                                                                                                                                 |
| 09  | Search page `/courses`                | `/phase-09-search`           | ⬜     |            |                                                                                                                                 |
| 10  | Course detail shell and About         | `/phase-10-course-about`     | ⬜     |            |                                                                                                                                 |
| 11  | Lessons and Reviews tabs              | `/phase-11-course-tabs`      | ⬜     |            |                                                                                                                                 |
| 12  | Creator profile                       | `/phase-12-creator`          | ⬜     |            |                                                                                                                                 |
| 13  | Auth: Login and Register              | `/phase-13-auth`             | ⬜     |            |                                                                                                                                 |
| 14  | Final QA and hardening                | `/phase-14-final-qa`         | ⬜     |            |                                                                                                                                 |

## Visual diff scores (mean % difference at 1440; target ≤ 2%)

| Page / section        | Baseline | Latest | Status |
| --------------------- | -------- | ------ | ------ |
| home/hero             | 1.35     | 1.02   | ≤2     |
| home/brands+courses   | 1.09     | 0.93   | ≤2     |
| home/grid+paths       | 1.59     | 1.09   | ≤2     |
| home/features         | 2.46     | 2.43   | over   |
| home/cta+testimonials | 2.73     | 2.72   | over   |
| home/footer           | 0.49     | 0.45   | ≤2     |
| search                |          |        |        |
| course/about          |          |        |        |
| course/lessons        |          |        |        |
| course/reviews        |          |        |        |
| creator               |          |        |        |
| login                 |          |        |        |
| signup                |          |        |        |
| 404                   |          |        |        |

## Decisions (from design_plan.md §9; record changes here)

- D1 fluid gutter: default yes · D2 URL state: yes · D3 tabs y=78: yes · D4 Share clamp: yes · D5 no sticky: yes · D6 native validation: yes · D7 material-symbols devDep: yes · D8 gitignore raw assets: yes

## Approved deviations from Figma

- (none yet). Format: `<page/section>: <what differs> (<why>), approved <date>`

## Blockers and open questions
- ⛔ Phase 04 DoD gap: `public/images/svg/brands/` doesn't exist, so Brands still uses PNG crops. They were re-cut from Home.png to the exact 1:1708 frame boxes (167/168/170/170×41, 169×42). Swap in `brand-1..5.svg` (same sizes) and delete `public/images/brands/` once `npm run assets` copies them. Thumbnails 2–6 also stay on the 1x crops (`course-N.png`) until thumb-2..6 land. Only course 1 is `.webp`.
- Phase 04 rounding: SectionHeader rounds line heights from md to Figma's frame heights (heading-m 53px, title 43px, body-l 29px), and the CourseCard by-line is 19px, not 19.2. Without this, sub-pixel boxes shifted every section below Courses up by 1px (features 3119.02).
- Phase 04 icon fix: Business is `rounded/domain` (Figma 12:166 is Style=Round). IT stays `outlined/computer`; Figma's glyph is just heavier (svg-400 only).
- Phase 04 tip: after replacing a file in `public/images` under the same name, delete `.next/dev/cache/images`. Otherwise the dev image optimizer keeps serving the old file (the brand crops rendered at the old 176×50 ratio).

- Figma MCP call limit reached on the Starter plan (2026-09-28). Phases must work from pre-captured specs and manual exports.
- ⛔ Manual Figma export not done yet (`.claude/figma/assets/manual/` and `.claude/figma/screens/1440/` are missing). Missing: the 1440 refs for every non-home page (`npm run diff <page>` exits until they exist) · logo-light/dark.svg · brand-1..5.svg · icon-design/facebook/google.svg · thumb-2..6 · video-thumb · sneak-1..4 · creator-purepearl/creator-sm · reviewer-1..4 · auth-\*. `npm run assets` picks them up once they are saved.
- ⛔ Auth ornaments are unconfirmed: `torus-lime-146` was built from the guessed render (the pyramid-lime-188 guess reuses the CTA file), and the auth "spring?" 175 white was skipped (it's unclear whether it's spring-a or spring-b). Confirm with `auth-*` in Phase 13.
- Phase 03 ornament positions are measured on Home.png, not the README frame values: each Figma image rect sits 2–4px left of its frame, so the positions are spring-a lime (-122,221), torus (14,681), pyramid (1104,464), cylinder (1227,221) and spring-b (1124,672). The mirrored spring's frame x (358) is its right edge after the flip, so it sits at (184,477). Apply the same offsets to the CTA ornaments in Phase 06.
- Phase 03 spec corrections from Home.png: the Happy Students star is lime (`secondary-400`), not `primary-800`, and "55%" matches Poppins 500 better than 600 (4px wider at 600).
- Home.png draws one blueprint grid line at y=604 (left side) where the 120px grid puts it at 598. This is a Figma grid irregularity, and the site keeps the regular grid.
- Ornament files are `public/images/ornaments/<shape>-<lime|white>-<size>[-flip].webp`. Mirrored ones are baked with the `-flip` suffix, so `Ornament` maps `mirrored` → `-flip` (no CSS flip).
- S12 verified 2026-09-28: `/` at 375px (headless Edge CDP mobile emulation) has scrollWidth 375 and no horizontal scroll. Two full-bleed `left-1/2` glow layers (right edge 908) and one `img.max-w-none` extend past the viewport but are clipped by their ancestors.
- Phase 01 icon picks (`npm run icons`; the list is in `scripts/build-icons.mjs`). Matched to `public/images/categories/*.png`: Business → `domain` (not business_center), Marketing → `connect_without_contact` (not campaign), Photography → `photo_camera_front` (not photo_camera), IT → `computer`. Material Symbols has no `developer_mode`, so `DeveloperModeIcon` uses the Figma export. Figma's rating and 16px stars are solid and round-cornered, so both use `rounded/*-fill`.
- Unconfirmed icon guesses (outlined Symbols; check against the full-res screens in Phases 09–10): filter_alt, category, sort, chevron_left/right, keyboard_arrow_down, share, play_arrow (filled), videocam, group, article, workspace_premium, support_agent, menu, close.
- ⛔ Waiting on the manual export: `DesignIcon` falls back to `design_services` until `icon-design.svg` lands, `FacebookIcon`/`GoogleIcon` aren't generated yet, and `Logo` light/dark still use the PNGs (only `mark` is inline SVG). Re-run `npm run icons` and swap the Logo wordmark once they exist.
- Phase 01 spec fix: `bg-blueprint` uses `calc(50% - 660px)`, not `50% - 720px`. A background-position percentage is relative to (width − 120px tile), so −660 puts the lines at frame x=0 mod 120 (checked at 1440 → 0 and 1920 → 240).
- `.gitignore` ends with a blanket `.claude` (a user change), which also ignores the commands, agents, hooks and figma kit. Confirm this is intended.

## Session log (newest first, one line each)

- 2026-09-29: Phase 04 → 🟨. Brands (exact-box crops, 202 tall), SectionHeader (gap 16, type-* with integer line heights, text-balance), Chip links `/courses?category=<slug>` in 3 rows at xl, CourseCard rebuilt (stretched link, glass Pills with a container-query tight mode below 335px, level pill, rating in the title row, `relaxed` variant not wired yet), 373px grid columns, Learning Paths on generated icons linking to categories. Data: slugs plus `categories`. Removed the categories/*.png and learner-*.png crops. brands+courses 0.93, grid+paths 1.09.
- 2026-09-28: Phase 03 → 🟨. Hero rebuilt: flex text block (top 169, gaps 32/60), `form role=search action=/courses`, lime-arc.svg ring, student.webp with drop-shadow-float, FloatingCards on FloatingCard/ProgressBar/StarIcon with the happy-*.webp avatars, 6 Ornaments in a design-stage (md+). The visual is a 1150×512 sub-stage: absolute at lg+, zoom .31/.54/.64 below. The lucide imports and the hero/*.png and avatars/student-*.png crops are gone. Hero 1.02%.
- 2026-09-28: Phase 01 → 🟨. Tokens (track/violet, radii, shadow-float + drop-shadow-float, 18 type-\* utilities, fluid container, design-stage, frame-locked blueprint), 27 generated icons, and the primitives Button/Chip/Pill/ProgressBar/Logo/AvatarStack/FloatingCard/Ornament/Glow/RatingStars. Scratch route screenshotted and deleted. Diff mean unchanged (1.62).
- 2026-09-28: Phase 00 → 🟨. Added `npm run assets` (sharp; 41 outputs: 14 tinted ornaments, WebP photos/avatars, SVGs) and `npm run diff` (headless Edge, 6 home bands; mean 1.62%, with features and cta+testimonials over 2%). Fixed the design-context and design-reviewer docs. S12 passes. The manual export is still pending.
- 2026-09-28: Plan created. Assets staged in `.claude/figma/assets`, trees in `.claude/figma/tree`, previews in `.claude/figma/screens`. No app code changed.
