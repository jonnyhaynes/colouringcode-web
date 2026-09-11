# Plan: Agency site overhaul

Status: **Draft — awaiting human approval** (`docs/dev-workflow.md`, step 2)

Supersedes the single-page scope in `CLAUDE.md`. See [Principles this changes](#principles-this-changes).

---

## Goal

Turn the one-screen holding page into a small, excellent agency site: four pages plus
legal, modern and interactive, WCAG 2.2 AA enforced in CI, and technically exemplary
enough to serve as the proof for the SEO and performance services it sells.

**The live site must not go down at any point.** Delivered in sequential phases, each a
branch with its own Vercel preview URL, reviewed and merged before the next begins.
`main` stays deployable throughout.

---

## Decisions (agreed, 2026-07-30)

| Decision | Choice |
| --- | --- |
| Foundation | Rebuild in place as Phase 0. No fresh repo, no cutover moment. |
| Interaction ceiling | Decided in Phase 1 from live prototypes, not assumed now. |
| Content | MDX in the repo where content is long-form. No CMS. |
| Rollout | Preview deploys, phased merges, strictly sequential — one PR at a time. |
| Site size | Four pages plus legal. No blog, no careers, no per-project case study pages. |
| Accessibility | WCAG 2.2 AA, enforced in CI. |
| Contact | `mailto:` and phone only. No form, no backend, no secrets. |
| SEO | Exemplary — the site is the portfolio piece. Lighthouse gated in CI. |
| Copy | Claude drafts, Jonny approves, before any page is built. |
| Case studies | Two client projects plus one labelled experiment. No imagery — typographic treatment. |
| Client names | Named only for Colouring Code's own work. Prior work described by sector, never named. |

### Target stack (versions verified 2026-07-30)

Next.js **16.2.12** (App Router) · React **19.2.8** · TypeScript **7.0.2** ·
Tailwind CSS **4.3.3** · Vitest **4.1.10** · `@axe-core/playwright` for a11y gating.

TypeScript 7 is the Go-based compiler — materially faster `tsc --noEmit`, which makes
type-checking a cheap CI gate rather than a slow one.

---

## Current state (audited)

1. **Next 12.1.6, Pages Router, React 18.1.** Four majors behind.
2. **There is no Tailwind build.** `styles/app.css` is a hand-committed 8.6 KB *static
   snapshot* of Tailwind output plus a few bespoke rules. Any new utility class written
   today is silently inert. This is the single biggest blocker to a multi-page design
   system and the main justification for Phase 0.
3. **One page, 67 lines.** Nav (live phone + email), hero (`Want more?` / "Award-winning
   pixel-crafting for the digital world."), footer with the Yorkshire rose.
4. **`public/img/logo.svg` is unreferenced** — and it is the brand idea: the letterforms
   **CC** with `bg.jpg` clipped inside them. *The image colours the letters. Colouring
   Code.* This becomes the spine of the redesign, not just a logo.
5. **Dead weight:** `public/js/app.js` (86 KB, unreferenced bundle from a previous build),
   `public/js/app.js.LICENSE.txt`, `pages/api/hello.ts`, `public/web.config`,
   `tsconfig.tsbuildinfo` (committed build artefact).
6. **Fonts load from Google** — third-party request on the critical path. Self-host.
7. **No tests, no test CI gate.** Lint and `tsc` only.
8. `docs/plans/animated-clouds.md` describes gradient wisps; **what shipped is an
   `feTurbulence` fractal-noise layer** animating `background-position`. The doc is stale;
   the implementation is better. Note it, don't re-litigate it.

---

## Creative direction

### Voice: Yorkshire digital superheroes

Heroic scale, plain northern speech. Big claims stated simply, then undercut with
dryness. `Want more?` is already in this voice — it is the reference tone.

- **Do:** short declarative sentences. Confidence without swagger. Concrete outcomes over
  adjectives. Dry humour as the release valve after a bold claim. "We" not "the team at
  Colouring Code is pleased to announce".
- **Don't:** comic-book pastiche — no POW/BAM, no capes, no spandex, no "we're not just an
  agency". Never write the word "superheroes" on the site. It is the *posture*, not the
  copy.
- **Structural use of the metaphor, at roughly 10% strength:** origin story (Studio),
  what we're good at (Services), who we've helped (roster). If a section only works
  because of the metaphor, the section is wrong.

**Named risk:** "superheroes" tips into cringe faster than any other agency framing. The
Yorkshire deflation is the antidote and must be present on every page. Phase 1 tests this
in real copy before it is committed to.

### Visual: the palette, not the wallpaper

Theme is **`bg.jpg`'s palette plus photo-in-letterform**, not the photograph repeated on
every page. Home gets the full mountain-scape. Internal pages get a condensed treatment —
ridgeline band, cropped strip, or photo-filled headings — over solid near-black.

Palette read from `public/img/bg.jpg` (2800×1920):

| Role | Value |
| --- | --- |
| Deep sky | `#0d3f4a` → `#17727d` teal |
| Sunset glow | `#ff6a45` → `#f4785c` coral |
| Hot core | `#ff8a3d` amber |
| Snow | `#e6eaee` |
| Ridge / ground | `#241d1b` → near-black |

Contrast ratios to be verified against AA in Phase 2; the coral on near-black needs
checking at small sizes and may be display-only.

**Typography** is decided in Phase 1. Big Shoulders Display is currently applied to `h1`
only and Jonny was unaware of it, so it is *not* treated as load-bearing — but a condensed
poster face suits the voice, so it starts as the front-runner. Whatever is chosen is
self-hosted.

**Yorkshire rose** (`components/YorkshireRose.tsx`) stays. It is the Yorkshire half of the
positioning, made visible. Note its `--color-background: #000` hack assumes a near-black
backdrop — it needs revisiting for any lighter surface.

### Services (12, three pillars)

- **Build** — web development · app development · e-commerce · design & UI/UX
- **Grow** — SEO · performance & Core Web Vitals · accessibility audits & remediation ·
  analytics & measurement
- **Advise** — AI-assisted delivery & integration · technical consultancy & architecture
  review · discovery & product strategy · training & team enablement

**AI-assisted delivery is the lead differentiator.** This repo's own workflow — plan-doc
approval gates, human merge, versioned guardrails in `.claude/`, acceptance criteria as
the test contract — is evidence most agencies claiming "AI-powered" cannot produce.
Phase 1 copy should lead with it.

Accessibility auditing is the second-strongest offer: the site's own CI-gated AA
compliance is the credential, and EAA pressure makes it a live market.

---

## Site map

```
/                Home
                 ├─ Mountain hero, photo-in-letterform
                 ├─ Positioning: what we do, for whom
                 ├─ Three pillars: build · grow · advise
                 ├─ Outcome claims band (numbers, set large)
                 ├─ Selected work (3 teasers → /work)
                 └─ Contact CTA

/work            Two strands, one page. Typographic entries:
                 problem, approach, outcome, stack. No screenshots.
                 ├─ Work — Sitwell CC, Meliora (client, named)
                 ├─ Experiments — SkillSwap (ours, labelled)
                 └─ Sector descriptors, as text

/studio          Who we are · Yorkshire · how we work ·
                 the twelve services in depth

/contact         Phone, email, where we are

/privacy         ┐
/accessibility   ┘ lightweight, required by the AA claim
/404             styled
```

No `/work/[slug]`. No MDX pipeline built speculatively — it arrives in Phase 4 only if
`/studio` and `/work` genuinely need long-form authoring.

---

## Phases

Strictly sequential. Each phase is one or more PRs on a branch, reviewed on its preview
URL, merged before the next phase starts. Every PR: `[ai-assisted]` title, references this
doc, `Manually reviewed by Jonny Haynes`, `Co-Authored-By` trailer kept.

### Phase 0 — Foundation (no visual change)

Migrate Next 12 Pages Router → Next 16 App Router. React 19, TypeScript 7, real Tailwind 4
build. Vitest + Playwright + `@axe-core/playwright`. Self-host the display font. Delete the
dead files listed above. Update `CLAUDE.md` and `README.md` to the new scope. Extend CI:
lint, `tsc --noEmit`, tests, axe, Lighthouse budget.

*Acceptance:* the deployed home page is **visually identical** to today at 375/768/1440
widths (screenshot diff). Lint, types, tests, axe, build all green. Lighthouse scores no
worse than current. No new runtime dependencies beyond the toolchain.

*Why first:* until the CSS build is real, every later phase is fighting the foundation.

### Phase 1 — Direction (prototypes + copy, no production pages)

Two or three distinct visual/interaction prototypes on preview URLs, spanning the ceiling
question: CSS-first, motion-library, and one deliberately ambitious option. Alongside them,
drafted positioning, voice samples and page copy for all four pages.

*Deliverables:* `docs/design-system.md` (chosen direction, typography, palette with
verified contrast ratios, motion rules, interaction budget) and `docs/copy.md`, both
approved by Jonny. Prototype code is throwaway and does not merge to `main`.

*Acceptance:* one direction chosen from something Jonny has seen and used in a browser.
Copy passes the cringe test — the superhero posture reads as confidence, not costume.
An explicit JS budget is written down and becomes a CI gate in Phase 2.

*This phase's output is a document, not a feature.* Do not skip to code.

### Phase 2 — Design system

Tokens (colour, type scale, spacing, motion). Layout primitives. Site shell: nav, footer,
skip link, focus management across route changes. Page transitions. The photo-in-letterform
component. `prefers-reduced-motion` honoured throughout by construction, not retrofit.
A `noindex` `/styleguide` route rendering every component and state.

*Acceptance:* every token and component in the approved design doc exists and is exercised
on `/styleguide`. Keyboard-complete. Zero axe violations. Reduced-motion verified. JS
budget from Phase 1 enforced in CI. Home page still renders unchanged — the shell is built
but not yet applied.

### Phase 3 — Home

The awe-inspiring one, built entirely from Phase 2 primitives and Phase 1 copy. Hero,
positioning, three pillars, work teasers, client roster, contact CTA.

*Acceptance:* matches the approved direction. AA, keyboard-complete, reduced-motion. CWV
in the green on throttled mobile. Metadata, Open Graph, structured data (`Organization`,
`LocalBusiness`). Live contact details and the GA4 tag preserved exactly.

### Phase 4 — Work, Studio, Contact

Three pages. Four typographic project entries with no dependency on imagery. Client roster.
Twelve services across three pillars on `/studio`. MDX introduced here only if the
long-form content genuinely needs it.

*Acceptance:* per-page metadata and structured data. AA and CWV green on each. Internal
pages use the condensed visual treatment, not the full hero. No placeholder content
reaches `main`.

### Phase 5 — Legal, 404 and hardening

`/privacy`, `/accessibility` (a real statement naming the standard, known limitations and
a contact route), styled `/404`. Full audit pass: manual screen-reader run, keyboard-only
run, Lighthouse on every route, `sitemap.xml`, `robots.txt`, canonical URLs, OG images.

*Acceptance:* Lighthouse 100 on accessibility and best-practices for every route,
performance and SEO ≥ 95. Zero axe violations sitewide. Screen-reader pass documented in
the PR. The accessibility statement is true.

---

## Zero-downtime strategy

1. `main` is the production branch and must always deploy cleanly.
2. Every phase is a feature branch with a Vercel preview URL, reviewed live.
3. Phase 0 is visually a no-op, so the riskiest change ships behind a screenshot diff.
4. Phases 3–5 add or replace pages one PR at a time. No stage where the site is half-built
   in production.
5. Rollback is a Vercel instant rollback to the previous production deployment. No DNS
   changes, no domain moves, no staging cutover at any point.

---

## Principles this changes

`CLAUDE.md` currently says the project is *not* a multi-page site and forbids heavy
client-side frameworks. This plan changes both, deliberately:

- **"Single-page marketing site" → small multi-page agency site.** Explicit.
- **"No heavy client-side frameworks"** — retained in spirit as a *measured JS budget* set
  in Phase 1 and enforced in CI, rather than a prohibition. If Phase 1 chooses the
  ambitious option, the tension with the exemplary-SEO commitment must be resolved in
  favour of SEO, and that trade-off recorded in `docs/design-system.md`.
- **"Not a CMS"** — unchanged. MDX in git is not a CMS.
- **"No backend"** — unchanged. No contact form, no API routes, no secrets.
- **Live contact details and the GA4 tag** — unchanged and untouchable.

`CLAUDE.md` and `README.md` are updated in Phase 0 so the guardrails match reality.

---

## Risks

| Risk | Mitigation |
| --- | --- |
| Next 12 → 16 migration breaks the live page | Phase 0 is a visual no-op gated by screenshot diff; instant Vercel rollback available. |
| "Awe-inspiring" fights "exemplary SEO/CWV" | JS budget agreed in Phase 1, enforced in CI. SEO wins ties. |
| Superhero voice reads as cringe | Tested in real copy in Phase 1, before any page is built. Yorkshire deflation on every page. |
| Two client projects plus a PoC looks thin | Two labelled strands — Work and Experiments. SkillSwap reframed as the demonstration of AI-assisted delivery. Sector descriptors carry breadth. |
| A PoC read as client work damages trust | "Experiments" strand explicitly labelled. Never mixed into the client line-up. |
| ~~SkillSwap is client-rendered on a site selling SEO~~ | **Resolved 2026-09-11: SkillSwap is now server-rendered.** SEO and performance claims may reference it. |
| "Five days" read as a production delivery promise | Claim visibly scoped to a PoC and paired with the quality gates, not just the speed. |
| "AI built it" reading invites accountability doubts | Credit the process, not the tool. One developer shipped it; the process made that possible. |
| Coral on near-black fails AA at small sizes | Contrast ratios verified in Phase 2; coral may be display-only. |
| Scope creep back towards a blog / case study pages | Explicitly out of scope below. Any addition needs a new plan doc. |
| Rewriting content Jonny hasn't approved | No page is built before `docs/copy.md` is approved in Phase 1. |
| Implying engagements that weren't Colouring Code's | **Designed out.** Names only for own work; prior work described, never named. No logos, no trademark permission needed. |
| Outcome claims can't be substantiated if challenged | Claim ledger in `docs/copy.md` — every claim has evidence and a source, or it doesn't ship. |
| Unbackable health claim (ASA exposure) | "Clinically approved by NHS experts" cut. Verb pivoted from `approved by` to `built for`. Wording confirmed with Jonny in Phase 1. |
| Unnamed descriptors read as evasive under NDA | Jonny flags any confidential engagement; it is dropped or broadened to sector only. |
| Losing the named Yorkshire cluster weakens local positioning | Geography folded into descriptors where non-identifying; Yorkshire leans on studio location and the two named client case studies. |
| Anonymous team + anonymous clients reads as evasive | Site must not be anonymous in aggregate. Counterweights: real contact details, named location, two named clients, one linkable live product. Phase 1 checks the finished copy for this explicitly. |
| A client name leaks via a doc, diff, PR or prompt | Documentation rule: only Sitwell CC, Meliora and SkillSwap are ever written down. Framing-only names are not recorded anywhere. |
| E-commerce service claimed with no evidence | Flagged as an open item. Either evidence it or Phase 1 softens/drops it. |

---

## Team, work and clients (confirmed 2026-07-30)

### The team — three people, all three disciplines

| Role | Discipline |
| --- | --- |
| Full-stack developer | Front-end leaning |
| Digital Designer | UI/UX, vast experience |
| Full-stack developer | Back-end leaning |

Combined over 50 years experience. 

This is a genuinely strong story and Phase 1 copy should lead on it: **design, front-end
and back-end covered by three senior people and nobody else.** No account layer, no
juniors learning on the client's budget, no handoff between agencies. The Yorkshire
deflation writes itself — small team, no faff.

It also validates **design & UI/UX** as a real service rather than an aspiration.

**Decided 2026-07-31: no individual names or photos on `/studio`.** The team is presented by
role and discipline only. This is consistent with the no-client-names decision and keeps the
page maintainable if the team changes.

- **Upside:** "50 years, three disciplines, three people" is a stronger unit of persuasion
  than three bios a prospect skims. It also means `/studio` needs no photography — which
  matters, given there are no assets.
- **Cost, stated plainly:** an anonymous team page is unusual for an agency and can read as
  evasive, especially alongside anonymous clients. **The site must not be anonymous in
  aggregate.** The counterweights are real contact details, a named physical location, the
  two named client case studies and a linkable live product. Phase 1 must check the
  finished copy for this specifically: *does the whole site feel like it's hiding?*
- **"Over 50 years combined" is a claim** and goes in the ledger like any other.

### Case studies (`/work`) — three entries, two strands

**Client work** (named, because Colouring Code owns it):

1. **Sitwell CC** — South Yorkshire's biggest cycling club. **A full brief:** branding,
   social media, website, kit design, print materials and expo work.
2. **Meliora** — a kitchen, bedroom and bathroom company. **Current engagement: IT
   consultancy.**

**Experiment** (labelled as such, not passed off as client work):

3. **SkillSwap** — "Neighbourhood Skill Exchange", a self-initiated proof of concept
   letting neighbours trade skills. Live at **`https://skillswap.colouringcode.com`**
   (moved to a real subdomain 2026-07-31 — done, no longer a Phase 0 task).
   **Built by one person in five days.**

#### The thinness problem, stated plainly

Two client projects and one PoC is thin for a dedicated `/work` page, and slipping an
unlabelled proof of concept into a line-up of client work is exactly what a sharp prospect
notices. Do not do that.

**Instead, make SkillSwap the demonstration of the lead differentiator.** It is the only
artefact on the site that can *show* AI-assisted delivery rather than assert it — and the
numbers are the whole point:

> **One person. Five days. Idea to live product.**

That survives the editorial rule on numbers alone, needs no client permission, no NDA check
and no imagery, and it is a claim almost no agency can match. It is the single strongest
sentence available to this site. Lead the AI-assisted delivery pillar with it.

Two strands on one page, clearly separated: **Work** (client, named) and **Experiments**
(ours, labelled). Honest, and the experiment earns its place on merit.

#### Two cautions on the five-day claim

1. **Set the expectation, or it sets itself.** A prospect reading "five days" may expect
   their production build in a week. The claim must be visibly scoped to a proof of
   concept, and paired with what the process does on real client work — quality gates,
   review, tests — not just speed. Phase 1 copy: state the speed, then immediately state
   what it doesn't mean.
2. **Credit the process, not the robot.** The claim is "our process let one developer ship
   in five days", not "AI built it". The former is defensible and differentiating; the
   latter invites the question of who is accountable for the code, which is precisely the
   anxiety this pillar exists to answer.

#### Notes

- **`CC` is Cycling Club, not Cricket Club.** Sitwell also reinforces the Yorkshire
  positioning while being a project Colouring Code can name — which matters more now that
  prior work is unnamed.
- **Sitwell is the strongest case study and should lead `/work`.** A full brief across
  branding, social, website, kit design, print and expo is the only entry that evidences
  the whole studio — design *and* build *and* brand — on one client. It is also the answer
  to "are you just developers?", which is the objection a design-and-build agency most
  needs to close. Structure it as a range piece: one client, seven disciplines.
- **Meliora evidences technical consultancy, not e-commerce.** *(Corrected 2026-07-31 — an
  earlier draft assumed a retail build.)* The client sells kitchens; the engagement is IT
  consulting. Meliora therefore proves the **Advise** pillar — ongoing trusted-adviser work
  — not the e-commerce service.
- **Consequence: e-commerce has no evidence.** Of the twelve services, e-commerce is now
  claimed with nothing behind it. Either Jonny can point at prior unnamed work that
  supports it, or Phase 1 should soften or drop it rather than list a service the site
  can't stand behind. **This is the kind of gap the claim ledger exists to catch.**
- **Meliora also shows retention.** "Currently consulting" means a live, ongoing
  relationship — worth stating, since continuing engagements are stronger evidence than
  completed ones.
- **SkillSwap is server-rendered (resolved 2026-09-11).** Jonny has shipped server
  rendering, so the earlier liability is gone: a prospect who views source now sees real
  content. The constraint is lifted — Phase 1 copy may hang SEO and performance claims on
  SkillSwap alongside the delivery-speed and product-artefact framing.

No imagery available, so each is a typographic entry: problem, approach, outcome, stack.
Phase 1 drafts these from a short brief per project — what the client needed, what was
built, what changed as a result, and what it was built with. Outcomes with numbers are
worth chasing even roughly; "faster" is weak, "3× faster checkout" sells.

### Credibility: two devices, one honest line between them

**The structural decision (agreed 2026-07-31): names are reserved for Colouring Code's own
work. Everything the team delivered elsewhere is described, never named.**

| Device | What it is | Named? | Where |
| --- | --- | --- | --- |
| Case studies | Colouring Code's own projects | **Yes** — we own them | `/work` |
| Outcome claims | What the team's work has achieved | No — numbers and facts | Home, large |
| Sector descriptors | Who the team has built for, elsewhere | **No** — described by type | `/work`, `/studio` |

This is honest by construction. No sentence anywhere implies a Colouring Code engagement
that wasn't one, and no client logo or trademark is used without permission. The
attribution risk that dominated the previous draft is designed out rather than mitigated.

#### The editorial rule

> **Every claim carries a number or a concrete specific. Adjectives never do the work.**

(Revised from "a number or a proper noun" — proper nouns are no longer available for prior
work, so specificity has to come from the fact itself.)

| Draft claim | Verdict |
| --- | --- |
| "Apps with 1 million global downloads" | **Strong** — number. Confirm which app(s) and the source. |
| "Clinically approved by NHS experts" | **Cut as written** — unbackable endorsement claim. See below. |
| "Winning national awards" | **Weak** — no number, no specific. Name the awards and years, or cut. |
| "A leading budget retailer" | **Weak** — "leading" is an adjective doing a fact's job. Needs a scale fact. |
| "One person. Five days. Idea to live product." | **Strong** — two numbers, verifiable, linkable. |

"Award-winning" already appears on the current site and carries no information. It does not
survive this rule and comes off in Phase 3.

#### Claim ledger (Phase 1 deliverable)

`docs/copy.md` must include a table of every public claim with its evidence and source, so
any claim can be defended if challenged and re-verified when it ages. A claim without a
ledger entry does not ship.

#### The NHS claim — resolved

"Clinically approved by NHS experts" is cut. It is an endorsement claim Jonny has confirmed
he cannot evidence, it is regulatory-adjacent (ASA CAP 3.7 substantiation, 12.1 health), and
it is the only sentence on the site with real exposure. Publishing an unbackable health
claim on a site whose entire pitch is rigour would also undercut the differentiator on the
same page.

**The fix is to pivot the verb.** `approved by` claims endorsement and needs proof;
`built for` / `held to` / `used alongside` describe the context and need only the
engagement. Same halo, evidence bar drops to "we did the work".

**Working wording, pending confirmation:**

> **We built the NHS-backed platform that helps young people manage type 1 diabetes.**

Claims no endorsement of Colouring Code, names no client, and describes what the product
*does* — which lands harder than a brand name would. The NHS relationship belongs to the
client and is reported, not borrowed.

**Apply the attribution formula:** unless this was a Colouring Code engagement, the wording
is *"members of our team built the NHS-backed platform that helps young people manage type 1
diabetes"* — framed once by the section heading rather than inline, per the rule above.

**Supporting line, needs no substantiation beyond the work itself:**

> **Our work has to survive clinical review, accessibility audits and police procurement.**

Describes the bar the team works to. "Police procurement" and "clinical review" in one
sentence tells a buyer more about standards than any award would.

### Sector descriptors (replaces the named roster)

**Documentation rule (agreed 2026-07-31): the only client names permitted anywhere — this
plan, `docs/copy.md`, the claim ledger, commit messages, PR descriptions or the site — are
the three real projects: Sitwell CC, Meliora and SkillSwap.** Every other engagement exists
only as an anonymous descriptor. Names used purely for framing are not recorded at all, so
there is nothing to leak from a document, a diff or a prompt.

#### The attribution formula (agreed 2026-07-31)

All prior work is attributed with one standard construction:

> **members of our team have built / designed / delivered…**

Accurate for every case — it claims nothing for Colouring Code as an entity, nothing about
who invoiced, and nothing about the whole team having worked on any single thing. One
formula, applied consistently, removes the need to make a judgement call per claim.

**But state it once, not eleven times.** Repeating the hedge on every line would make the
section read as passive and defensive — the opposite of the plain, direct voice. Frame it
once at the head of the section, then let the list run clean:

> Before Colouring Code, members of our team designed and built for:
>
> A global graphics-chip designer. A UK police force. …

Same honesty, none of the throat-clearing. **Rule: attribution is framed once per section,
never per item.**

#### Descriptors

Prior work is described, not named. Draft descriptors — **each to be confirmed with Jonny
before copy**, since getting a client's own sector wrong in public is worse than silence:

| Public descriptor | Note |
| --- | --- |
| A global graphics-chip designer | |
| A global PC manufacturer | |
| A UK police force | |
| One of Britain's biggest shopping centres | |
| An NHS-backed platform for young people with type 1 diabetes | |
| A local-authority museums service | |
| A national heritage charity | |
| A construction-products manufacturer | |
| A UK insurance broker | |
| A major UK business park | |
| **Packaging design for a leading budget retailer** | Added 2026-07-31 |

**On the packaging entry:** "leading" is an adjective doing the work of a fact, which fails
the editorial rule. Prefer something concrete — *"one of the UK's largest discount
retailers"*, or a scale fact if one is available (number of stores, shelf reach). Jonny to
supply.

**It is also the only non-digital discipline on the list, and that is an asset.** Together
with Sitwell's kit design, print and expo work, packaging supports a *design studio that
also builds* positioning rather than a dev shop that dabbles in design. It is the strongest
available evidence for the design & UI/UX service, which otherwise rests on Sitwell alone.
Phase 1 should use it deliberately, not bury it at the end of a list.

#### Why this is not weaker than logos

- **Range becomes the claim, replacing recognition.** Ten sectors — policing, health,
  heritage, retail, construction, insurance, enterprise tech, local government — is a
  stronger statement about a three-person team than ten logos a prospect half-recognises.
- **Descriptors communicate more than names do.** Several of these clients are B2B
  manufacturers no prospect would recognise. Everyone understands "a construction-products
  manufacturer".
- **It is the strongest lead-in to the accessibility offer.** Health and public-sector work
  is where AA compliance is non-negotiable; the descriptor list evidences that the team
  already works to that bar.
- **It doesn't date.** A logo grid ages; "a UK police force" doesn't.

#### Draft treatment

> Eleven organisations. Three people.
>
> Before Colouring Code, members of our team designed and built for:
>
> A global graphics-chip designer. A UK police force. An NHS-backed diabetes platform.
> One of Britain's biggest shopping centres. A national heritage charity. A
> construction-products manufacturer. A local-authority museums service. A UK insurance
> broker. A global PC manufacturer. A major UK business park. Packaging for one of the UK's
> largest discount retailers.

Note the count is **organisations**, not sectors — accurate, and it still lands. Verify the
number against the final confirmed list before it ships; a wrong count is a small lie in the
one place a reader can check.

#### Trade-off, stated plainly

Descriptors lose the de-risking that a verifiable name provides — a household-name brand
checks out on sight; "a global graphics-chip designer" asks for trust. Range is the
mitigation, and the honesty of the named/unnamed split is worth more than the borrowed
authority.

**One caution:** a thin descriptor does not protect confidentiality. Some of these are
narrow enough to identify the client with one search. That is fine here — the goal is
avoiding an *endorsement* implication, not concealing identity. But if any engagement is
genuinely under NDA, a thin descriptor is the worst of both: still identifiable, and it
reads as evasive. Jonny to flag any such engagement so it is broadened to sector only or
dropped.

#### What is lost, and what replaces it

Several of these engagements were South Yorkshire organisations, which made the roster
direct evidence for the Yorkshire positioning. Unnamed, that evidence weakens. **Replace it
with geography in the descriptors themselves** where true and non-identifying ("a Yorkshire
museums service" is fine; anything that narrows to a single named body is not), and lean the
Yorkshire positioning on the studio's own location and the two named client case studies
instead. Phase 1 copy to resolve.

### Analytics

Keep GA4 `G-SMKSXYK49K` exactly as-is. **Add Vercel Analytics and Speed Insights**
(confirmed) — real-user Core Web Vitals data, which is both useful and consistent with
selling performance work. Wired in Phase 0; check the JS weight against the Phase 1 budget.

## Open items (do not block approval of this plan)

1. ~~**SkillSwap server-rendering**~~ — **Resolved 2026-09-11.** Server-rendered; SEO and
   performance claims may reference SkillSwap. *(Domain and build-time numbers: resolved.)*
2. **A short brief for Sitwell CC and Meliora** (a paragraph each is enough) before Phase 1
   copy — what they needed, what was delivered, what changed as a result.
3. **Confirm the eleven sector descriptors** and the final count, and flag any engagement
   under NDA so its descriptor is broadened or dropped. Includes a concrete scale fact to
   replace "leading" in the budget-retailer descriptor.
4. **Evidence for each outcome claim** — which app hit a million downloads and where that
   figure comes from; which awards, which categories, which years; the accurate NHS wording
   and whether it is "we built" or "our team built"; the basis for "over 50 years combined".
   Needed for the claim ledger before Phase 1 copy ships.
5. **Does e-commerce have any evidence?** With Meliora reclassified as consultancy, nothing
   backs it. Either point at prior unnamed work or Phase 1 softens or drops the service.
   *(Design & UI/UX is now covered — Sitwell plus the packaging work.)*
6. **Timeline.** No deadline stated. Sequential phases mean the pace is set by review
   turnaround.
7. **Reviewer.** Assumed Jonny Haynes throughout.

---

## Out of scope

Blog / journal. Careers page. Per-project case study pages (`/work/[slug]`). Contact form
or any backend. CMS. User accounts. Multi-language. WebGL unless Phase 1 explicitly
chooses it and the JS budget survives it. Any change to phone number, email address or the
GA4 tag.

---

## Sequencing

1. Jonny approves this plan.
2. File six GitHub issues, one per phase, acceptance criteria copied in as the test
   contract.
3. Work Phase 0 through the `docs/dev-workflow.md` loop. Merge.
4. Repeat per phase. Re-read this doc at the start of each; amend it by PR if a phase
   changes a decision.
