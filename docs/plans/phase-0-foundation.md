# Plan: Phase 0 — Foundation

Status: **Draft — awaiting human approval** (`docs/dev-workflow.md`, step 2)

Sub-plan of [`site-overhaul.md`](./site-overhaul.md) → Phase 0. Read that first for scope,
zero-downtime strategy and acceptance criteria. This doc is the build slice only.

---

## Goal

Replace the plumbing without changing a pixel. Migrate Next 12 Pages Router → Next 16 App
Router, React 19, TypeScript 7, a **real Tailwind 4 build**, and a test/CI harness. Delete
the dead files. Update the guardrail docs to the new scope.

**Hard constraint:** the deployed home page is visually identical to today at 375 / 768 /
1440 widths. That is the phase's whole risk, and every PR below preserves it.

---

## Why this is more than a version bump

`styles/app.css` is a hand-committed static snapshot of Tailwind output, not a build. The
entire page (`pages/index.tsx`, 67 lines) renders from those frozen classes. Switching to a
real Tailwind 4 build has to reproduce that output exactly — Tailwind 4's reset and defaults
differ from the snapshot, so "turn the build on" is where the pixel risk actually lives, not
the Next upgrade.

---

## Versions (re-verified against npm, 2026-09-11)

The parent plan's July pins were stale. Live stable today:

| Package | Plan (Jul) | Live (Sep 11) | Use |
| --- | --- | --- | --- |
| next | 16.2.12 | **16.3.4** | 16.3.4 |
| react / react-dom | 19.2.8 | **19.3.0** | 19.3.0 |
| typescript | 7.0.2 | 7.0.2 | 7.0.2 |
| tailwindcss / @tailwindcss/postcss | 4.3.3 | 4.3.3 | 4.3.3 |
| vitest | 4.1.10 | **5.0.0** | 5.0.0 |
| @axe-core/playwright | — | 4.13.0 | 4.13.0 |
| @playwright/test | — | 1.63.0 | 1.63.0 |
| eslint-config-next | 12.1.6 | **16.3.4** | 16.3.4 |

Pin exact versions in `package.json`. Confirm each installs cleanly before relying on it.

---

## The three PRs

Sequential. Each is `[ai-assisted]`, references this doc + the parent, ends with
`Manually reviewed by Jonny Haynes`, keeps the `Co-Authored-By` trailer. Each merges before
the next starts. `main` stays deployable throughout.

### PR 1 — Framework upgrade + dead-file cleanup

**Branch:** `feature/phase-0-framework`

- Bump `next` 16.3.4, `react`/`react-dom` 19.3.0, `typescript` 7.0.2, `eslint-config-next`
  16.3.4, and `@types/*` to matching majors.
- Migrate Pages Router → App Router: `pages/_app.tsx` + `pages/index.tsx` → `app/layout.tsx`
  + `app/page.tsx`. Port `<Head>` contents to the App Router `metadata` export (and keep the
  GA `<Script>` via `next/script` in the layout). **GA4 tag `G-SMKSXYK49K`, phone and email
  stay byte-identical.**
- Delete dead files: `public/js/app.js`, `public/js/app.js.LICENSE.txt`, `pages/api/hello.ts`
  (whole `pages/api/`), `public/web.config`, `tsconfig.tsbuildinfo` (and add to
  `.gitignore`). **Keep `public/img/logo.png`** — Jonny uses it on social media (confirmed
  2026-09-11). Unreferenced by the site, but retained deliberately.
- Update `CLAUDE.md` + `README.md`: Pages→App Router, Next 12→16, scope single-page→
  multi-page-in-progress. Point at the parent plan.

**Acceptance:** `next build` green, `tsc --noEmit` green, `next lint` green. Page renders and
still looks right locally. Styling is untouched (still the snapshot CSS — that migrates in
PR 2). GA tag / phone / email verified unchanged in the diff.

**Risk note:** App Router still ships the *snapshot* `app.css` in this PR — imported globally
in `app/layout.tsx`. This keeps PR 1 purely structural so any visual drift here is a real bug,
not expected churn.

### PR 2 — Real Tailwind build + self-hosted font

**Branch:** `feature/phase-0-tailwind`

- Add `tailwindcss` + `@tailwindcss/postcss` 4.3.3, PostCSS config, a real
  `app/globals.css` with `@import "tailwindcss"` and the handful of bespoke rules from the
  old snapshot (the `.clouds` `feTurbulence` layer, `.content`, YorkshireRose bits).
- Delete the static `styles/app.css` snapshot once the build reproduces it.
- Self-host **Big Shoulders Display** (400/700) via `next/font/local` — drop the two
  `fonts.googleapis.com` / `fonts.gstatic.com` links. Removes a critical-path third-party
  request.
- **Reconcile Tailwind 4 reset vs the snapshot** so output is pixel-identical. Expect to
  hand-tune where v4 defaults differ (preflight, default font stack, spacing).

**Acceptance:** screenshot diff vs current production at 375 / 768 / 1440 is clean (the
phase's headline gate). `.clouds` animation still runs. Font renders identically, now
self-hosted. Build/types/lint green.

### PR 3 — Test + CI quality gates

**Branch:** `feature/phase-0-ci`

- Vitest 5.0.0 — one smoke test (page renders, GA tag present, contact links intact) so the
  harness exists and is wired.
- Playwright 1.63.0 + `@axe-core/playwright` 4.13.0 — one e2e axe run over `/` asserting
  zero violations.
- **Vercel Analytics + Speed Insights** (confirmed 2026-09-11 — add in this PR). Wire
  `@vercel/analytics` and `@vercel/speed-insights` into `app/layout.tsx`. Small client JS;
  the screenshot diff must stay clean after adding them.
- Lighthouse budget in CI — assert scores no worse than a baseline captured from **current
  production** (confirmed 2026-09-11), so the bar is "no worse than the live holding page".
- GitHub Actions workflow running lint, `tsc --noEmit`, Vitest, Playwright+axe, Lighthouse,
  build on every PR to `main`.
- Add `test` / `test:e2e` scripts to `package.json`.

**Acceptance:** all gates green in CI on a real PR. Zero axe violations on `/`. Lighthouse ≥
baseline. Screenshot diff still clean.

---

## Out of scope for Phase 0

No visual redesign, no new pages, no content changes, no MDX, no design tokens. (Vercel
Analytics + Speed Insights are now in PR 3, per the confirmed answer above.)

---

## Resolved before build (2026-09-11)

1. **`public/img/logo.png` (416 KB)** — **keep.** Used on social media, not by the site.
2. **Vercel Analytics** — **add in PR 3**, gated on the screenshot diff staying clean.
3. **Lighthouse baseline** — **capture from current production.**
