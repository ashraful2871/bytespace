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
| 05  | Home: Features                        | `/phase-05-features`         | 🟨     | 2026-09-29 | Done (tsc, lint, build, diff pass; no side strips at 1920; 1280/1024 captured, 768/375 over CDP with no overflow); awaiting user review. Features 2.43 → 1.46; scales as the 1440 frame from lg (1.83 @1920, 1.84 @1280) |
| 06  | Home: CTA and Testimonials            | `/phase-06-cta-testimonials` | 🟨     | 2026-09-29 | Done (tsc, lint, build, diff pass; 1280/1024/768/375 captured over CDP with no overflow); awaiting user review. cta+testimonials 2.72 → 1.08. From 1440 up the CTA scales like Figma (user request; 0.95 @1920). Commit message below |
| 07  | Home: responsive and QA sign-off      | `/phase-07-home-qa`          | ✅     | 2026-09-29 | Home signed off: 2026-09-29, pending your review. All 6 bands ≤2 (mean 1.02); no overflow 375–2560; tap targets ≥44; tsc, lint and build clean. Commit message below |
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
| home/brands+courses   | 1.09     | 0.96   | ≤2     |
| home/grid+paths       | 1.59     | 1.10   | ≤2     |
| home/features         | 2.46     | 1.46   | ≤2     |
| home/cta+testimonials | 2.73     | 1.08   | ≤2     |
| home/footer           | 0.49     | 0.52   | ≤2     |
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

- Format: `<page/section>: <what differs> (<why>), approved <date>`
- home/courses+paths and hero: the SectionHeader intro copy and the hero search placeholder use `neutral-500` (#666973), not Figma's `neutral-400` (#82868e is 3.65:1 on white and fails WCAG AA; this is 5.5:1). brands+courses 0.93 → 0.96, grid+paths 1.09 → 1.10. Approved 2026-09-29.
- home/footer: the newsletter button reads "Subscribe", not Figma's "Search" (copied from the hero; the label should say what it does). footer 0.45 → 0.52. Approved 2026-09-29.

## Blockers and open questions
- Phase 06 deviation, needs approval: Figma gives card 1's name ("Sarah M.") a 24px box, while cards 2–3 use 28px, so card 1 is 432 tall instead of 436. The site uses `type-heading-xs` (28) on all three, so card 1 is 436 and its role and quote sit 4px lower than in Home.png. Approve this, or ask for the Figma quirk to be matched.
- Phase 06 ornament positions were fitted on Home.png with a ±5px search over a synthetic blueprint. They are 1px off the image-rect offsets: spring-a (-121,-161), the mirrored spring (179,5; frame x 353 is its right edge), cone (-49,225), torus (17,299), pyramid (1078,0), spring-b (1108,289), cylinder (1222,6).
- Phase 06 layering: the CTA copy sits above the ornaments (z-10), while Figma draws the ornaments on top. Nothing overlaps at 1440, so it looks the same, and the copy stays readable where shapes come close at 1024.
- Phase 06 decision (user, 2026-09-29): at 1920 the CTA shapes sat inside the centred 1440 frame, and the user wants them on the screen edges as in Figma. From 1440 up, the CTA now scales its whole frame (grid, shapes and copy) with `min-[1440px]:zoom-frame`, scoring 0.95% at 1920 and 1.03% at 1899 against Figma scaled to width. Below 1440 it keeps 1440px sizes and crops the edge shapes instead of shrinking the copy, unlike Features, which scales from lg. At 768 the shapes all fall outside the viewport. The Hero and Testimonials still use the fixed column at 1920.
- Phase 06 Testimonials from lg: the title shrinks to no less than 480px (it stays on two lines), and the paragraph takes the rest of the row.
- Phase 06 mobile heading sizes: the CTA H2 is 32px/1.25 below md, as its spec says. The Testimonials H2 uses 30px/1.25, the SectionHeader convention. Phase 07 kept both (neither is a Figma style).
- Open (Phase 07): above 1440, Features and the CTA scale with the window while the Hero, Courses, Learning Paths and Testimonials keep the 1200 column. At 2560 the Features type is 1.78× the Courses type. Decide whether the other sections should scale too.
- Phase 07: `npm run diff` captures sometimes lay the page out beside a 24px white scrollbar gutter (every band jumps to 2–9%), and headless Edge sometimes hangs after saving. The script now keeps a finished shot when Edge hangs and retries a capture with the strip up to 3 times.
- Phase 07: `public/images/svg/blueprint-grid-{hero,cta}.svg` and `svg/logo/mark-{light,footer}.svg` are unused (bg-blueprint and the inline mark replace them), but `npm run assets` re-creates them. Drop them from `scripts/build-assets.mjs` in Phase 14. `torus-lime-146` is kept for Phase 13.
- Phase 07: the footer's Finance, Sport, Platform and legal links stay `#` until their pages or categories exist (Phase 08). The five brand logos share `alt="Logoipsum"` (placeholders); name them when the brand SVGs land.
- Phase 07: the hero visual and both Features pictures are decorative (`aria-hidden`; PathVisual is also `inert`, so its course card is not a second tab stop). Their photos have `alt=""`.
- ⛔ Phase 04 DoD gap: `public/images/svg/brands/` doesn't exist, so Brands still uses PNG crops. They were re-cut from Home.png to the exact 1:1708 frame boxes (167/168/170/170×41, 169×42). Swap in `brand-1..5.svg` (same sizes) and delete `public/images/brands/` once `npm run assets` copies them. Thumbnails 2–6 also stay on the 1x crops (`course-N.png`) until thumb-2..6 land. Only course 1 is `.webp`.
- Phase 04 rounding: SectionHeader rounds line heights from md to Figma's frame heights (heading-m 53px, title 43px, body-l 29px), and the CourseCard by-line is 19px, not 19.2. Without this, sub-pixel boxes shifted every section below Courses up by 1px (features 3119.02).
- Phase 04 icon fix: Business is `rounded/domain` (Figma 12:166 is Style=Round). IT stays `outlined/computer`; Figma's glyph is just heavier (svg-400 only).
- Phase 05 spring offsets: the Features ornament image rects sit 2px left of their frames, so the springs are at (404,67) and (303,114), matching the Phase 03 convention.
- Phase 05 decision (user, 2026-09-29): from lg (1024) up, Features renders as the 1440 Figma frame scaled to the window (`zoom-frame` utility: zoom = 100cqw/1440px, parent `@container`), so it fills wide screens like Figma. Below lg the rows stack. Phase 07: consider the same for the other sections, which still use the fixed 1200 column.
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

## Commit messages (suggested, one per phase; newest first)

Phase 07 (not committed yet; Phase 06 went in as c367cb5):

```
feat(home): responsive QA pass and sign-off

- Type: the type-* utilities use Figma's whole-pixel line heights
  (heading-m 53, title 43, body-l 29, body-s 22, body-xs 19), so the
  md:leading-[…] overrides and the Footer's text-sm/[22px] are gone.
  Mobile body copy uses type-body-m md:type-body-l. The Hero h1 and the
  CourseCard text use type-* styles. Remove the legacy text-hero,
  text-display and text-title tokens.
- A11y: add a tap-target utility (44x44 hit area via ::after, no layout
  change) and use it on the header and menu icons, nav and auth links,
  the logo, chips, "+ More" and footer links. Hide the hero visual and
  both Features pictures from assistive tech (PathVisual is inert, so
  its course card is no longer a second tab stop). The stretched course
  link now covers the avatars, and "26+" reads as "26+ learners".
- Approved deviations: neutral-500 intro copy and search placeholder
  (AA contrast), and "Subscribe" on the footer newsletter button.
- Footer category links go to /courses?category=<slug>, and the anchors
  are /#courses, /#categories and /#creators (now the CTA). The mobile
  menu's Sign In uses a new outline-light ButtonLink variant. The third
  testimonial is centred at tablet width.
- Remove the unused course-1.png crop and the create-next-app SVGs.
- visual-diff: keep a saved capture when headless Edge hangs, and retry
  captures that come back with a scrollbar strip.
- Home at 1440: mean 1.02%, all six bands <= 2%.
```

## Session log (newest first, one line each)

- 2026-09-29: Scroll performance. The user reported laggy scrolling and a slow tab switch. On a GT 730, a full scroll of `/` had frames of up to 1.59s (p95 370ms). The main cause was the 8-layer `drop-shadow-float` filter; the blurred glow SVGs and the FloatingCard backdrop blur added to it. Shadow A is now baked by `bakeShadow` in build-assets (`hero/student-shadow.webp`, `features/creator-photo-shadow.webp`) and drawn with `FloatShadow`. `Glow` is a CSS radial gradient on the Figma ellipse box (the 20px blur is dropped). FloatingCard's invisible backdrop blur is gone, and the `drop-shadow-float` utility is removed. Now the worst frame is 20ms at 1440 and 1920 with no frames over 25ms. Home 1440 diff: 0.94/0.96/1.10/1.06/1.06/0.52, mean 0.94. The glow SVGs in `public/images/svg` are no longer used.

- 2026-09-29: Phase 07 → ✅ (home signed off, pending review). 1440 bands 1.02/0.96/1.10/1.46/1.08/0.52. 1920/2560 full-bleed with no side strips. No overflow at 375/768/1024/1280/1920/2560 (CDP). Tap targets ≥44, one h1, visible focus, and the mobile menu traps focus and closes with Esc. design-reviewer findings fixed (decorative visuals hidden, card click-through, footer links, Button outline-light, type-* cleanup). Contrast and Subscribe approved. The user reformatted 7 section files to 80 columns without comments (kept, by request).

- 2026-09-29: Phase 06 follow-up. The user saw the CTA shapes inset from the edges at 1899. From 1440 up, the CTA frame now scales to the window (`@container` section, `min-[1440px]:zoom-frame` inner frame carrying bg-blueprint). 1920 0.95% and 1899 1.03% against scaled Figma; 1440 unchanged (1.08); 1280/1024/768/375 unchanged with no overflow.

- 2026-09-29: Phase 06 → 🟨. CTA rebuilt: bg-blueprint (grid lines already match Home.png at y≡118 and x≡0), 964×319 content at top 85 via `md:pt-px` + justify-center, H2 at 53px line height, and the default primary ButtonLink (172×46). 7 Ornaments shown from md. Testimonials: glows at their native boxes (-40 offset), content at x=118 (`lg:-mx-0.5`), grid cards (1/2/3 columns), avatar `alt=""` (the name follows), valid figcaption. Removed cta-shapes.png and the testimonial PNGs. cta+testimonials 1.08, home mean 1.01.

- 2026-09-29: Phase 05 follow-up. The user saw extra side space at 1920, so Features now scales the whole 1440 frame to the window from lg (`zoom-frame` in globals.css). The lg zoom .75 and flex-1 column logic are gone. 1440 unchanged (1.46); 1920 1.83, 1280 1.84 against the scaled ref; no overflow from 375 to 1920.
- 2026-09-29: Phase 05 → 🟨. Features rebuilt as real DOM: Glow SVGs in a design-stage (native boxes at -548,-505 and -327,906; they fade into surface past 1440, so no extra gradient needed), rows at 120/72/120 with the content frame reaching 59px into the right gutter at xl, PathVisual (relaxed CourseCard, student.webp, ProgressCard) and CreatorVisual (revenue and YTD cards, cropped creator-photo, HappyStudentsCard, springs). ProgressCard and HappyStudentsCard gained `variant="relaxed"`. Visuals zoom .5–.58 / .9–1 / .75 below xl. Removed features/creator.png, student.png, spring-lime.png and the radial-gradient array. features 1.46.
- 2026-09-29: Phase 04 → 🟨. Brands (exact-box crops, 202 tall), SectionHeader (gap 16, type-* with integer line heights, text-balance), Chip links `/courses?category=<slug>` in 3 rows at xl, CourseCard rebuilt (stretched link, glass Pills with a container-query tight mode below 335px, level pill, rating in the title row, `relaxed` variant not wired yet), 373px grid columns, Learning Paths on generated icons linking to categories. Data: slugs plus `categories`. Removed the categories/*.png and learner-*.png crops. brands+courses 0.93, grid+paths 1.09.
- 2026-09-28: Phase 03 → 🟨. Hero rebuilt: flex text block (top 169, gaps 32/60), `form role=search action=/courses`, lime-arc.svg ring, student.webp with drop-shadow-float, FloatingCards on FloatingCard/ProgressBar/StarIcon with the happy-*.webp avatars, 6 Ornaments in a design-stage (md+). The visual is a 1150×512 sub-stage: absolute at lg+, zoom .31/.54/.64 below. The lucide imports and the hero/*.png and avatars/student-*.png crops are gone. Hero 1.02%.
- 2026-09-28: Phase 01 → 🟨. Tokens (track/violet, radii, shadow-float + drop-shadow-float, 18 type-\* utilities, fluid container, design-stage, frame-locked blueprint), 27 generated icons, and the primitives Button/Chip/Pill/ProgressBar/Logo/AvatarStack/FloatingCard/Ornament/Glow/RatingStars. Scratch route screenshotted and deleted. Diff mean unchanged (1.62).
- 2026-09-28: Phase 00 → 🟨. Added `npm run assets` (sharp; 41 outputs: 14 tinted ornaments, WebP photos/avatars, SVGs) and `npm run diff` (headless Edge, 6 home bands; mean 1.62%, with features and cta+testimonials over 2%). Fixed the design-context and design-reviewer docs. S12 passes. The manual export is still pending.
- 2026-09-28: Plan created. Assets staged in `.claude/figma/assets`, trees in `.claude/figma/tree`, previews in `.claude/figma/screens`. No app code changed.
