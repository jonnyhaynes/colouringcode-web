# Claude Code context for Colouring Code

This file orients Claude Code on this repo. Keep it lean -- it points, it doesn't
explain. Substantive design and rationale live in `/docs`; read those before any
non-trivial change. A bloated CLAUDE.md is a smell: if a section wants more than a
few lines, move it to its own doc under `/docs` and link it.

## What this is

Next.js marketing site for Colouring Code, mid-overhaul from a single holding page
into a small multi-page agency site. See `docs/plans/site-overhaul.md` for the plan
and its phases.

See `README.md` for status and `docs/dev-workflow.md` for how we build here.

## Stack

**Next.js 16 (App Router) + React 19, TypeScript, npm.** Pages live under `app/`
(`app/layout.tsx`, `app/page.tsx`), styled with Tailwind-style utility classes in
`styles/app.css`; deployed on Vercel. Strict TypeScript (avoid `any`). No test
suite is set up yet; lint with ESLint (`npm run lint`) and type-check with
`tsc --noEmit`.

> **In flight (Phase 0):** `styles/app.css` is still a hand-committed Tailwind
> snapshot, not a real build — PR 2 replaces it with a Tailwind 4 build. TypeScript is
> pinned to 6.x, not 7, because typescript-eslint does not yet support TS 7
> (typescript-eslint#10940).

## Load-bearing principles

These shape the code. Don't change them without a deliberate, flagged decision.

- **It's a static marketing site.** No backend, no database, no auth. No API routes —
  the `create-next-app` scaffolding (`pages/api/hello.ts`) was removed in Phase 0.
- **The site must stay fast and self-contained.** No runtime data fetching. Client-side
  JS is governed by a measured budget set in Phase 1 and enforced in CI, per the plan —
  not a blanket prohibition.
- **Contact details and analytics IDs in `app/` are real and live** (phone, email,
  GA tag `G-SMKSXYK49K`). Don't alter or invent them.

## Scope boundaries

What this project is **not**, and shouldn't drift towards. If a request would drift
here, push back before building.

- Not a full web app -- no user accounts, dashboards, or dynamic content.
- Not a CMS -- content lives in the JSX, edited in code, not managed at runtime.
- Not a blog or multi-page site unless deliberately expanded.

## How we work (the short version)

Full process: `docs/dev-workflow.md`. The non-negotiables:

- **Plan first.** For non-trivial work, produce an implementation plan saved to
  `docs/plans/<ticket>.md` and have a human approve it before writing code. The
  plan is what gets reviewed, not the first code.
- **A human reviews and merges every PR.** Claude opens the PR and gets CI green; a
  named person reviews the diff against the plan and merges. Claude never merges.
- **Never put secrets, credentials, or client data into the model.** If unsure,
  it's out of bounds until you've asked.
- **Mark AI-assisted work.** Prefix AI-assisted PR titles `[ai-assisted]`, reference
  the approved plan doc, and end the description with a `Manually reviewed by <name>`
  line. Keep the `Co-Authored-By` trailer on commits.

## Documents

Source of truth lives in `/docs`. Read the relevant doc before responding:

- `docs/dev-workflow.md` -- how we build (the loop + standing conventions)
- _Add requirements, tech design, and policy docs here as they appear._

## Working style

- Push back where appropriate rather than agreeing reflexively.
- When changing a load-bearing principle or scope boundary, flag it explicitly
  rather than slipping it in.
- Prefer pointing at a doc section over reproducing its content here.

## Raising pull requests

This project uses **GitHub**. Raise PRs with the `gh` CLI (or the REST API):

- Repo: `jonnyhaynes/colouringcode-web` · Target branch: `main`.
- Push the branch (`git push -u origin <branch>`), then `gh pr create`.
- **Mark AI-assisted PRs:** prefix the title `[ai-assisted]` (or add an `ai-assisted`
  label), reference the approved plan doc (`docs/plans/<ticket>.md`) in the body, and
  end it with a `Manually reviewed by <name>` line confirming the diff was read.
- Keep the `Co-Authored-By` trailer on commits. **A human merges** once CI is green
  and the diff has been reviewed against the plan.
**Issue tracker: GitHub Issues.** One issue = one unit of work; acceptance criteria
are the test contract. Reference the issue in the branch name and PR, and close it from
the PR (`Closes #NN`) once merged.
