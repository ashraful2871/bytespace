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
| 08  | Data model, routing and 404           | `/phase-08-routes`           | 🟨     | 2026-09-29 | Done (tsc, lint, build: 18 course + 1 creator routes SSG; unknown slugs 404; no overflow at 375); awaiting user review. 404 1.49 vs the scaled preview |
| 09  | Search page `/courses`                | `/phase-09-search`           | 🟨     | 2026-09-29 | Done (tsc, lint, build; every block lands on its Figma y, page 3853 tall; no overflow at 375/768/1024 with any menu open); awaiting user review. 2.12 vs the scaled preview |
| 10  | Course detail shell and About         | `/phase-10-course-about`     | 🟨     | 2026-09-30 | Done (tsc, lint, build; every block lands on its Figma y except the D3 tabs; no overflow at 375/768/1024/1280; tabs keep the layout mounted); awaiting user review. 2.92 with D3, 1.51 at Figma's tab offset (scaled preview). Images are preview stand-ins |
| 11  | Lessons and Reviews tabs              | `/phase-11-course-tabs`      | 🟨     | 2026-09-30 | Done (tsc, lint, build; every block lands on its tree y, 1px up from the Phase 10 band edge; no overflow at 375/768/1024/1280; `?rating=n` filters server-side); awaiting user review. Lessons 1.71, Reviews 1.75 (scaled previews) |
| 12  | Creator profile                       | `/phase-12-creator`          | 🟨     | 2026-09-30 | Done (tsc, lint, build; every block lands on its tree y, page 2136 tall, footer at 1611; no overflow at 375/768/1024; the filter bar filters the creator's courses); awaiting user review. 1.46 (scaled preview). Avatar is a preview stand-in |
| 13  | Auth: Login and Register              | `/phase-13-auth`             | ⬜     |            |                                                                                                                                 |
| 14  | Final QA and hardening                | `/phase-14-final-qa`         | ⬜     |            |                                                                                                                                 |

## Visual diff scores (mean % difference at 1440; target ≤ 2%)

| Page / section        | Baseline | Latest | Status |
| --------------------- | -------- | ------ | ------ |
| home/hero             | 1.35     | 1.02   | ≤2     |
| home/brands+courses   | 1.09     | 0.96   | ≤2     |
| home/grid+paths       | 1.59     | 1.17   | ≤2     |
| home/features         | 2.46     | 1.46   | ≤2     |
| home/cta+testimonials | 2.73     | 1.08   | ≤2     |
| home/footer           | 0.49     | 0.52   | ≤2     |
| search                |          | 2.12\* | ≈2     |
| course/about          |          | 2.92\* | ≤2 ex-D3 (1.51) |
| course/lessons        |          | 1.71* | ≤2     |
| course/reviews        |          | 1.75* | ≤2     |
| creator               |          | 1.46\* | ≤2     |
| login                 |          |        |        |
| signup                |          |        |        |
| 404                   |          | 1.49\* | ≤2     |

\* Scored against the 598px previews scaled to 1440 (`--ref`): `screens/not-found.png` ×1.237 and `screens/search.png` ×2.408 (the blur of a 2.4× upscale costs most of search's 2.12; its geometry matches the tree to the pixel). course/about uses the 848px `screens/course-details.png` ×1.698: 2.92 as built, where the D3 tab shift doubles everything below y=1020, and 1.51 with the tabs temporarily at Figma's 63px offset (the DoD's "excluding D3" score). course/lessons and course/reviews use `screens/course-lessons.png` (800px, ×1.8) and `screens/course-reviews.png` (669px, ×2.152), both with D3 already in Figma. creator uses the 1079px `screens/creator-profile.png` ×1.335 (run `--url` and `--ref` from PowerShell: Git Bash rewrites `/creators/...` into a Windows path). The `screens/1440/*` exports don't exist yet. Re-score once they do.

## Decisions (from design_plan.md §9; record changes here)

- D1 fluid gutter: default yes · D2 URL state: yes · D3 tabs y=78: yes · D4 Share clamp: yes · D5 no sticky: yes · D6 native validation: yes · D7 material-symbols devDep: yes · D8 gitignore raw assets: yes

## Approved deviations from Figma

- Format: `<page/section>: <what differs> (<why>), approved <date>`
- home/courses+paths and hero: the SectionHeader intro copy and the hero search placeholder use `neutral-500` (#666973), not Figma's `neutral-400` (#82868e is 3.65:1 on white and fails WCAG AA; this is 5.5:1). brands+courses 0.93 → 0.96, grid+paths 1.09 → 1.10. Approved 2026-09-29.
- home/footer: the newsletter button reads "Subscribe", not Figma's "Search" (copied from the hero; the label should say what it does). footer 0.45 → 0.52. Approved 2026-09-29.
- course/about (D3): the tab row sits 78px below the band (y=1035), not Figma's 63 (y=1020), to match Lessons and Reviews. Everything below moves 15px down, so the footer is at 2207 and the page is 2732 tall. Diff 1.51 → 2.92 against the scaled preview. Approved as D3.

## Blockers and open questions
- Phase 12 open (copywriter): the creator bio is kept verbatim from Figma (60:2185): it says "Welcome to the creative world of [Creator's Name]" (an unfilled placeholder) and the second paragraph starts "ive into" (a lowercase "Dive" missing its D). Supply the final bio for PurePearl Studio.
- Phase 12 open (owner): the stats pill says "3 Products" (Figma), but the grid under it shows 6 courses by this creator. Should the count come from the course list, or are "products" something other than courses?
- Phase 12 notes: the FilterBar takes a `pathname` (default `/courses`), and `coursesHref` takes it as a third argument, so on the profile the menus link to `/creators/<slug>?level=…` and filter only that creator's courses (`listCourses({ creator })`, not a URL parameter; it counts as a filter, so the list isn't repeated to fill pages). This makes `/creators/[slug]` dynamic (ƒ); unknown slugs still 404. There's no pagination, and an empty filter (`?level=advanced`) shows "No courses found" with Clear filters. Follow is a static `<button>` until there are accounts. The avatar is `alt=""` (the h1 beside it names the creator). Below 640 the avatar stacks over the name, the badge wraps under the name, and the tagline and bio drop to `type-body-m`.
- ⛔ Phase 12 stand-in: `public/images/creators/creator-purepearl.webp` is cut from the 1079px creator preview (72px → 192px, soft; its blue corners sit under the 16px radius). `npm run assets` overwrites it once the manual export lands.
- Phase 12 aside: `course/CourseVideo` still passes `priority` to `next/image`, which Next 16 deprecates in favour of `preload`. Swap it in Phase 14.
- Phase 11 open (owner): the Lesson List numbers the modules 1, 2, 4, 5, 6, 7 (no Module 3), kept exactly as in Figma (60:628–60:658). The titles carry the numbers, so the list isn't an `<ol>`. Add a Module 3 or renumber?
- Phase 11 open (owner): every rating-breakdown row draws five filled stars (Figma 60:1303…60:1347), so the 1-star row looks like the 5-star row. Screen readers hear "5-star ratings: 720" … "1-star ratings: 16". Suggest n filled stars per row (the rest in neutral-100).
- Phase 11 deviations, need approval: (1) review card 1 uses 26px lines like cards 2–4 (Figma gives its role and quote 24px lines, so it's 276 tall, not 282); cards 2–4 and the footer sit 6px lower. (2) The breakdown bars are count ÷ total (81, 13.5, 2.4, 1.3, 1.8%); Figma's fills are hand-drawn (about 92, 37, 9, 3, 5%). (3) The footer sits 64px below the tab content on all three tabs (About's gap); Figma has 83 on Lessons (2358) and 91 on Reviews (2924), so ours are at 2338 and 2902. (4) The tab column is 725 wide on every tab (About's width, set by the shared layout); Lessons and Reviews are 723 in Figma, so their cards are 2px wider. (5) Reviewer role and "a year ago" use `neutral-400` as in Figma and the sidebar (3.65:1, below AA); switch to `neutral-500` like the approved intro copy?
- Phase 11 spec corrections (sampled on the previews): (1) the stars on the breakdown rows, review cards and filter chips are `neutral-700` (#4b4c53), not `neutral-950`. (2) The star filter chips are the inactive chip fill (`neutral-50`), not outline pills. (3) The bar and progress tracks are `neutral-100` (#e5e6e8), so `ProgressBar` gained `track="muted"`. (4) The copy sits on 26px lines as on About (intro 52/78, module description 52, quote 78). The name is `type-label-l` on 22px, "Learning Progress" and "Ratings" `type-label-s` on 17px, module titles `type-label-m` on 19px. (5) Figma's header row puts the stars inside the reviewer column (avatar row, 24, stars); the card is avatar row → stars → quote, 24 apart.
- Phase 11 notes: `Chip` has `size="lg"` (48 tall, 4px gap) for the star filters, and `chipStyles.sizes` holds the heights. `RatingStars` takes a `gap` (default 4, Figma's) and `tone="dark"`, and its partial fill skips the gaps. The Reviews route is now dynamic (ƒ) because it reads `?rating`. The summary card stacks below a 576px column (container query; 1024 stacks, 1280 doesn't) and its stars drop to 16px under 384. The filter chips scroll sideways (full-bleed while the layout stacks). "Learning Progress" 55% is a constant in the Lessons page until there are learner accounts. Empty filters (`?rating=4`: every seed review is 5-star) show "No 4-star reviews yet."
- ⛔ Phase 11 stand-ins: `public/images/avatars/reviewer-1..4.webp` are cut from the 669px Reviews preview (2.15× upscale, soft). `npm run assets` overwrites them once the manual export lands. The `Placeholder` component is still used by login and signup.
- Tooling: `node_modules` was installed with bun (untracked `bun.lockb`, `.exe`/`.bunx` shims), so `npx tsc` fetches the wrong package. Run `node node_modules/typescript/bin/tsc --noEmit` (or `npm run build`) until it's reinstalled with npm.
- Phase 09 deviations, need approval: (1) pagination is centred (564–876) as the spec says, but Figma's box sits at x=588, 25px right of centre. (2) At page 1, Prev (and Next on the last page) is a grey (`neutral-300`), non-link arrow; Figma draws Prev dark on page 1. (3) The search placeholder uses `neutral-500`, following the approved hero deviation (Figma `neutral-400`). (4) The current page number follows Figma in `neutral-300` (#abaeb5, about 2.2:1 on white, below AA). It's announced as `aria-current="page"`, but confirm that the owner wants the grey number and not a highlighted one.
- Phase 09 spec correction: the page numbers are `type-heading-xs` (Poppins 600 20/28; Figma boxes are 28 tall, and "2" is 12 wide), not `type-body-l`. The filter buttons use a 4px icon–label gap (Figma 55:170: icon at 16, label at 44), not the Button's 8, so they're written out in `FilterBar`, not `buttonClasses`.
- Phase 09 menus: Filter lists the learning paths plus Clear filters, Level offers Any/Beginner/Intermediate/Advanced, Category lists all 18 categories, and Sort lists the `sortOptions`. The band's lime "Courses" menu is a search scope (Courses and Creators, where Creators goes to the one creator page, as in the header). They are native `<details name=…>` (one open at a time, no JS), and the page keys them on the URL so they close after a navigation. Clicking outside or pressing Esc doesn't close them (static v1). Revisit with a client menu in Phase 14 if wanted.
- Phase 09 data: `?category=featured` now returns the full 90-course catalogue (it used to give the 6 filtered seeds, so Home's Featured chip landed on one page). `coursesHref(query, patch)` builds every search link, resets the page on any filter change and leaves out the defaults. Filters return unique seed matches, so `?category=music&page=2` renders the empty state (Music active, Clear filters). No seed is in Music, and only the unfiltered catalogue has more than one page.
- Phase 09: `BlueBand` has a `clip` prop (default true). Search turns it off so the Courses menu can open past the band's bottom edge.
- Phase 08 deviation, needs approval: the 404 numeral is Poppins 600 at **460px** (clamp(160px, 32vw, 460px)) with 0.02em tracking in its 480px box, not the spec's ~400px. On the screenshot the glyphs measure 882 wide with their top at y=225. At 400px they were 752 wide (diff 3.65 → 1.49).
- Phase 10 spec corrections (measured over CDP and on the preview): (1) the 16px copy (lesson minutes, "99 more videos", enroll and creator copy, includes, the About paragraphs and key points) sits on **26px** lines (Figma boxes 26/52, description 416 = 16 × 26), so it's `type-body-m leading-[26px]`, not body-m's 24. (2) The subtitle is **Poppins 500 20/24** (renders 577 wide against Figma's 571; Satoshi label-xl is 527, even 700 is 544). (3) Share's label is **16px on a 24px line** (Figma 42×24; label-l renders 46), so the button is 122 wide. (4) "See Full Profile" is `type-label-m` (19 tall, renders 107 wide as in Figma), not label-s, in `neutral-700`. (5) The title isn't capped at 769: Poppins renders it at 775 and it wrapped. (6) The play button isn't centred: Figma's 104px square is at (323,203) in the video, centred at 52.1% × 53.2%, with a 48px white circle. (7) The includes icons are `topic`, `videocam`, `badge` and `connect_without_contact` (matched on the preview; the plan's article, workspace_premium and support_agent are gone from the icon list). (8) The About paragraphs are 26px apart (a blank line in one text box).
- Phase 10 geometry: the course shell is one full-bleed grid (`courses/[slug]/layout.tsx`). The band spans the Header, title block and video rows with `-mb-[62px]`, so it ends 62 below the video at every width (957 at 1440). The last row is `1fr`, so the sidebar (spanning the video and tab rows) never stretches the video row. The title block sits at x=122 and the video at x=125 (`xl:ml-0.5`, `xl:ml-[5px]`), as in Figma. Share hangs 85px past the column from 1440 (D4). The card uses `p-[39px]` inside its 1px border, so its content is at Figma's 40. Below lg it stacks header, video, sidebar (24 below the video, straddling the band edge), tabs and content.
- Phase 10 copy kept verbatim from Figma, flagged for the owner: "This course include", "Sneak Peak", and the creator blurb in the sidebar repeats the enroll copy (`creator.blurb`).
- Phase 10 stubs: Share is a static `<button>` (it needs a client handler: navigator.share or copy link), the play button has no player, and Enroll Now links to `/signup`. The tabs use `scroll={false}`, so switching tabs keeps the scroll position.
- ⛔ Phase 10 stand-ins: `public/images/course/video-thumb.webp`, `course/sneak-1..4.webp` and `creators/creator-sm.webp` are cut from the 848px preview (1.7× upscale, soft). The video crop has Figma's play button baked in, so a second square shows under the live one below 1440. `npm run assets` overwrites all six once the manual export lands.
- Phase 08 open, resolved 2026-09-30 (user): course 2 moves to **4.8 and Intermediate** everywhere (the detail header's values), so Home card 2 changed (grid+paths 1.10 → 1.17, home mean 0.95). The Reviews tab still says 4.7 (`ratingSummary.average`).
- Phase 08 copy kept verbatim from Figma, flagged for the owner: the creator bio has "[Creator's Name]" and "ive into" (missing D), the modules skip Module 3, the first review is wrapped in straight quotes, and the tab reads "Lesson" on one screen and "Lessons" on another (the site uses "Lessons").
- Phase 08 data notes: `?category=` accepts a chip slug, a learning-path slug (mapped to chip slugs in `pathCategories`) or `featured` (everything). With no filter, `listCourses` repeats the 6 seeds 15× to fill Figma's 5 pages of 18. Filters return unique matches. `metadataBase` reads `NEXT_PUBLIC_SITE_URL` (falls back to localhost:3000), so set it on deploy. The creator, reviewer and sneak-peek image paths point at `npm run assets` outputs that wait on the manual export.
- Phase 08 skeletons: `ui/Placeholder` marks unbuilt bodies. Delete it once Phases 09–13 replace every use. The course layout owns the band and the tab nav (`NavLink`, `aria-current`), and each tab page is only its tab body. `(auth)/layout` owns the full-screen band (auth header, no footer).
- Phase 08 tip: stopping a background `npx next start` can leave the `next` child listening. It then serves the old build's HTML against new chunks (a 37.9% diff). Free the port (`netstat -ano`, then Stop-Process) before restarting.
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
- Unconfirmed icon guesses (outlined Symbols; check against the full-res screens): filter_alt, category, sort, chevron_left/right, keyboard_arrow_down, share, play_arrow (filled), group, menu, close. Phase 10 matched topic, videocam, badge and connect_without_contact on the course preview.
- ⛔ Waiting on the manual export: `DesignIcon` falls back to `design_services` until `icon-design.svg` lands, `FacebookIcon`/`GoogleIcon` aren't generated yet, and `Logo` light/dark still use the PNGs (only `mark` is inline SVG). Re-run `npm run icons` and swap the Logo wordmark once they exist.
- Phase 01 spec fix: `bg-blueprint` uses `calc(50% - 660px)`, not `50% - 720px`. A background-position percentage is relative to (width − 120px tile), so −660 puts the lines at frame x=0 mod 120 (checked at 1440 → 0 and 1920 → 240).
- `.gitignore` ends with a blanket `.claude` (a user change), which also ignores the commands, agents, hooks and figma kit. Confirm this is intended.

## Commit messages (suggested, one per phase; newest first)

Phase 12 (not committed yet):

```
feat(creator): build the creator profile page

- Band: 96px avatar, the name with a lime Creator badge, the tagline,
  the Figma bio (placeholder and "ive" kept for the copywriter), white
  Products and Followers pills, and a static Follow button. The
  identity row stacks below 640 and the actions wrap.
- Body: the search FilterBar and the creator's courses in 3/2/1
  columns, with an empty state. FilterBar and coursesHref take a
  pathname, so the menus filter this page; listCourses gains a creator
  filter.
- Every block lands on its Figma y at 1440 (page 2136, footer at
  1611); 1.46% against the scaled preview.
- Stand-in avatar cut from the Figma preview until the manual export.
```

Phase 11 (not committed yet):

```
feat(course): build the Lessons and Reviews tabs

- Lessons: Explore the Modules, the lesson list (lime 72px videocam
  tiles, title and description; Figma's 1, 2, 4–7 numbering kept),
  Lesson Content, and Lesson Progress Tracking with a 55% progress card.
- Reviews: What Learners Are Saying, a rating summary card (lime 4.7
  and five bar/star/count rows; stacks under a 576px column), rating
  filter chips (All plus 5–1, ?rating=n links with aria-current,
  filtered on the server, with an empty state), and four review cards.
- UI: Chip gains size="lg" (48px icon chip), RatingStars a 4px gap and
  a dark tone, ProgressBar a neutral-100 track.
- Stand-in reviewer avatars cut from the Figma preview until the manual
  export.
- 1.71% (Lessons) and 1.75% (Reviews) against the scaled previews.
```

Phase 10 (not committed yet):

```
feat(course): build the course detail shell and About tab

- Shell: one full-bleed grid in courses/[slug]/layout. The blueprint
  band ends 62px below the video at every width (957 at 1440), the
  412px sidebar (360 below xl) spans the video and tab rows, and the
  layout stacks below lg. Tabs are chip NavLinks with aria-current,
  78px below the band (D3), and keep the layout mounted.
- Header: title, Poppins 500 subtitle, creator by-line link, level,
  rating and students badges, and a lime Share button that hangs to
  x=1405 from 1440 (D4).
- Video poster with a Play preview button at Figma's position; the
  sidebar has the curriculum preview, price and Enroll Now, includes
  and the creator with See Full Profile.
- About: Description, Sneak Peak (4 images) and Key Points.
- Data: course 2 is 4.8 and Intermediate (the detail header's values),
  sneak peek images carry alt text, plus enrollText and creator.blurb.
- Icons: topic and badge replace article, workspace_premium and
  support_agent. Chip exports chipStyles for the tabs.
- Stand-in images cut from the Figma preview until the manual export.
- 1.51% against the scaled preview at Figma's tab offset, 2.92% with D3.
```

Phase 09 (not committed yet):

```
feat(search): build the /courses search page

- Band: "Find Your Next Course", a GET search form (next/form, q plus
  the active filters as hidden fields) and a lime "Courses" scope menu.
  BlueBand gains a clip prop so the menu can open past the band.
- Filter bar: Filter (learning paths), Level, Category and Sort menus
  on native <details> (ui/Dropdown), all links to URL state. Nine
  category chips spread over the column from xl, and a snapping
  full-bleed scroller below it.
- Results: 18 CourseCards in 3/2/1 columns, pagination with
  aria-current and a #results jump, and an empty state with Clear
  filters.
- Data: coursesHref builds the search URLs; ?category=featured is the
  full catalogue; searchCategories holds the chip row.
- Every block lands on its Figma y at 1440 (page 3853 tall); 2.12%
  against the scaled preview.
```

Phase 08 (not committed yet):

```
feat(routes): data model, route skeletons and the 404 page

- Data: extend Course with the detail, lessons and reviews copy from
  Figma (course 2's copy is shared by all six), add creators.ts, and
  add getCourse, getCreator, listCourses (q, category or learning path,
  level, sort, 18 per page; the unfiltered catalogue repeats the seeds
  to fill 5 pages) and parseCourseQuery.
- Routes: /courses, /courses/[slug] (a layout with the band and tabs,
  plus About, Lessons and Reviews), /creators/[slug], and an (auth)
  group for /login and /signup without a footer. Course and creator
  routes are statically generated, and unknown slugs return 404.
- Metadata: metadataBase and a "%s | ByteSpace" title template.
- 404: blueprint band, a 460px lime-to-blue "404" behind the copy, and
  a Back to Home button (1.49% against the scaled Figma preview).
- Footer: "Become a Creator" links to /signup.
```

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

- 2026-09-30: Phase 11 → 🟨. Lessons and Reviews tab bodies. At 1440 over CDP: Lessons headings 1118/1242/1884/2034, module rows 99 apart from 1290 (tiles at +2), progress card (120,2158) 725×116, footer 2338. Reviews: summary (120,1268) 725×226 with the lime box at (160,1311) and rows at (313,1308) (bar 282, stars at 611, count at 763), chips at 1566, cards at 1638/1944/2250/2556 (282 each), footer 2902. 375/768/1024/1280 have no overflow. Diffs 1.71/1.75 against the scaled previews.
- 2026-09-30: Phase 10 → 🟨. The course shell and About are built: `components/course/{CourseHeader,CourseVideo,CourseSidebar,CourseTabs}`, with the grid layout and the About page. At 1440 over CDP: title (122,172), badges at 317, Share 1284–1405, video (125,416) 720×479, band 957, sidebar (908,416) 412×959 with sections at 456/704/912/1124 (avatar 1148), tabs 1035 (D3), About headings 1118/1606/1803, footer 2207. 1280: sidebar 412, video 692. 1024: sidebar 360, band 825. 768 and 375 stack with no overflow, and the video is 16:10 on phones. Tab clicks keep the same `<aside>` node and move `aria-current`. The About route no longer uses `Placeholder`. Course 2 is now 4.8/Intermediate (user decision).

- 2026-09-29: Phase 09 → 🟨. `/courses` built: SearchForm, FilterBar, CategoryTabs and Pagination (`src/components/search/`), `ui/Dropdown` (details menu), `coursesHref`/`searchCategories`, the featured fix, and BlueBand `clip`. At 1440 over CDP: h1 164, input (408,239) 462×52, filters at 432, chips 512, grid 632–3136, pagination 3208, footer 3328, height 3853. 2.12 against `screens/search.png` ×2.408. No overflow at 375/768/1024 with each menu open. The flow was checked in headless Edge: page 3 → Beginner → UI/UX chip → back/back/forward restores state, the search keeps the filters, and Clear filters works. The route no longer uses `Placeholder`.

- 2026-09-29: Phase 08 → 🟨. Data: `Course` extended (fullTitle, subtitle, creatorSlug, category, reviewsCount, students, description, sneakPeek, keyPoints, curriculum, includes, modulesIntro, modules, lessonContent, progressText, reviewsIntro, ratingSummary, reviews) with the shared detail copy from the Figma trees, plus `creators.ts` and `getCourse`/`getCreator`/`listCourses`/`parseCourseQuery`. Routes: `/courses` (awaits searchParams, dynamic), the `/courses/[slug]` layout + About/Lessons/Reviews (SSG, `dynamicParams=false`, notFound, metadata), `/creators/[slug]`, and `(auth)` login/signup. Root title template "%s \| ByteSpace" + metadataBase. Footer "Become a Creator" → /signup. 404 built: 1.49 against the scaled preview, glyph within 1px of Figma; no overflow at 375 on any new route.

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
