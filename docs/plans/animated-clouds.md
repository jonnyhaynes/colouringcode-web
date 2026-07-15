# Plan: Overlay drifting clouds on the hero background

Status: **Draft — awaiting human approval** (dev-workflow.md, step 2)

## Goal

Add slow, subtle cloud movement to the hero background so it feels alive, without
touching the existing photograph.

## Problem / current state

The background is a single flattened photograph, `public/img/bg.jpg` (~220 KB,
2800×1920), applied to `body` in `styles/app.css`:

```css
body{background-image:url(/img/bg.jpg);background-size:cover;background-repeat:no-repeat;background-position:50%}
```

Sky, sunset clouds, and mountains all share pixels. The clouds cannot be peeled off
in code, and splitting the photo needs generative inpainting (no such tooling
available here — an ImageMagick attempt confirmed it produces grey mist over a plate
that still contains the original static clouds). So we do **not** cut the photo.

## Approach (decided): overlay CSS-generated clouds

Leave `bg.jpg` exactly as it is. Add a decorative layer of **CSS-generated cloud
wisps** (soft `radial-gradient` blobs, blurred) positioned over the **upper teal
sky** and drift them horizontally with a pure-CSS animation.

Why upper sky only: the photo's own baked-in orange clouds sit along the ridgeline.
Drifting new clouds there would clash (one moving set, one static set). Keeping the
new wisps up in the clear teal band reads as natural high cloud passing above the
static scene, not a contradiction.

Why CSS gradients rather than image assets: no new files, nothing to source or
optimise, no palette-match risk, trivially tunable, and it can be built and verified
end-to-end here with no external tooling. Keeps the page fast and self-contained.

## Code changes

Small and contained. `bg.jpg` stays on `body`. We add one decorative overlay layer
above the background photo but behind the content.

### 1. `pages/index.tsx`

Add a fixed, full-viewport decorative cloud layer as the first child inside the root
`<div>` (before `<header>`):

```tsx
<div className="clouds" aria-hidden="true" />
```

- `aria-hidden` — purely decorative, kept out of the a11y tree.
- The root `<div>` already establishes the content; the clouds layer sits behind it
  via `z-index`. Add `relative` + `z-index` to `header`/`main`/`footer` (or a wrapper)
  only if stacking requires it so text stays above the clouds.

### 2. `styles/app.css`

Leave the `body` background rule untouched. Add the cloud layer + drift animation:

```css
.clouds{position:fixed;inset:0;z-index:0;pointer-events:none;
  /* a few soft wisps confined to the upper sky via gradient positions */
  background-image:
    radial-gradient(60% 40% at 20% 22%, rgba(255,255,255,0.10), transparent 60%),
    radial-gradient(50% 35% at 55% 15%, rgba(255,255,255,0.08), transparent 60%),
    radial-gradient(70% 45% at 80% 25%, rgba(255,255,255,0.07), transparent 60%);
  background-repeat:no-repeat;
  filter:blur(8px);
  will-change:transform;
  animation:cloud-drift 120s linear infinite alternate}
@keyframes cloud-drift{from{transform:translateX(-4%)}to{transform:translateX(4%)}}
@media (prefers-reduced-motion:reduce){.clouds{animation:none}}
```

The content sits above the clouds. Because `body` holds the photo and `.clouds` is
`z-index:0`, give the content wrapper a higher stacking context if text ever dips
behind the wisps (it shouldn't — wisps are faint and high in the frame).

Tunables to settle during build (against the real page): number/size/position of the
wisps, opacity (keep faint — this must not look like fog over the photo), blur
radius, drift distance (`±4%`) and duration (`120s`). Start extremely subtle; real
high cloud barely moves.

### Accessibility / performance

- `prefers-reduced-motion: reduce` disables the drift (required for background motion).
- `transform`-only animation → GPU-composited, no layout/paint thrash.
- No new dependencies, no image files, no JS. Pure CSS.

## Out of scope

- No change to `bg.jpg`, content, contact details, GA tag, or layout.
- No photo splitting / inpainting / cloud image assets.
- No parallax / scroll effects (single-screen page).
- No procedural canvas/WebGL.

## Acceptance criteria

1. The hero looks like the current photo with faint clouds drifting slowly across the
   **upper sky** — subtle enough that a first glance reads "same photo, but alive,"
   not "fog added."
2. Drift is slow, continuous, and never exposes a hard edge or obvious repeat.
3. With `prefers-reduced-motion: reduce`, the clouds are static.
4. Text / nav / footer remain fully legible; clouds never sit distractingly behind text.
5. `npm run lint` and `tsc --noEmit` pass; no new deps, no runtime data fetching.

## Risks

- **Looks like fog, not clouds.** Faint gradients over a photo can read as haze.
  Mitigation: keep opacity low, confine to upper sky, tune live; if CSS wisps can't
  look convincing, fall back to a supplied transparent cloud PNG (deferred).
- **Text legibility / stacking.** Mitigation: verify content stays above the layer at
  mobile and desktop widths.

## Sequencing

1. Human approves this plan.
2. File the issue with the acceptance criteria above.
3. Branch, add the `.clouds` layer + animation, tune live against the running page.
4. Verify legibility + reduced-motion; lint + type-check green.
5. Open `[ai-assisted]` PR referencing this doc; human review + merge.
