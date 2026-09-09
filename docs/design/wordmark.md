# Wordmark — `farul.ivan`

> The single most important asset on the site. It appears in three places at
> three scales, and one of them animates. Getting its production right unblocks
> [motion.md](motion.md) and the hero and footer specs in [pages.md](pages.md).

---

## 1. Why it is an SVG and not text

Three independent reasons, each sufficient on its own:

1. **The crop rule needs it.** The hero wordmark is `81.36%` wide, anchored
   `right: -1.36%` (see §4). Live text at that width *reflows* — the glyphs do not
   scale, so the crop lands on a different part of a different letter at every
   viewport width and the composition falls apart between breakpoints. An SVG
   scales as one object, so the cut is always in the same place.
2. **The stroke-draw needs paths.** You cannot animate `stroke-dashoffset` on a
   text node.
3. **It removes a font-loading race.** The wordmark is the first thing on screen;
   it must not wait on a webfont or flash a fallback.

---

## 2. Generating it from Lexend

**Set at `wght` 500.** An earlier note capped this at 300 so the letters could
be drawn stroke by stroke. That technique was rejected during build, and the
animation uncovers filled letters instead, which does not care how thick they
are.

```
text:      farul.ivan
weight:    500
tracking:  -0.045em   (matches --t-display-l)
case:      lowercase, exactly as written
```

Pipeline — run once, commit the output, do not generate at build time:

```bash
# 1. set the text in Lexend 300 and convert glyphs to outlines
# 2. export SVG with no transforms baked into a wrapper <g>
# 3. run through SVGO, keeping path data and viewBox
# 4. author the skeleton paths (see below) over the outlines
# 5. commit both sets to src/assets/wordmark/
```

### ⚠️ Do not stroke the outline paths

**Converting text to outlines gives you the *contour* of each glyph.** Stroking a
contour and animating `stroke-dashoffset` traces the letter's perimeter — up one
side and back down the other — and draws counters (the bowls of `a`, `u`, `o`) as
separate closed loops.

**Verified by rendering it:** the result is hollow, colouring-book letters. It is
not writing. See §5 for what to do instead.

### Output requirements

- **One `<path>` per glyph**, filled, `id` `outline-0` … `outline-9` in reading
  order. The reveal staggers per glyph, so merged paths make it impossible.
- **`viewBox` set tight to the letterforms**, no padding. Padding breaks the crop
  arithmetic in §4.
- **No `width`/`height` attributes.** Size is controlled by CSS.
- **`preserveAspectRatio="xMinYMid meet"`** — the crop cuts from the right, so the
  left edge is the anchor.
- **No `fill` in the markup.** Fill comes from CSS so the three variants can
  differ.

### The dot is an asset

`farul.ivan` has ten glyphs, and the period is the tenth-to-last thing drawn
before `ivan`. It gives the animation a natural beat, the way a trailing mark
does on any wordmark. Do not let the export merge the period into an adjacent
glyph.

---

## 3. The three variants

| Variant | Where | Size | Fill | Animated |
|---|---|---|---|---|
| `mark-nav` | nav, top-left | 22px cap height | `--ink` | no |
| `mark-hero` | homepage hero | `81.36%`, cropped | `--ink` | rises into place |
| `mark-footer` | footer, every page | full content width | `--ink` | no |

**`mark-nav` must always show the complete, uncropped word.** This is a hard
requirement, not a style choice: the hero wordmark is cut off mid-letter, and it
only reads as a deliberate composition because the reader has already been told
the word by the nav directly above it. A cropped wordmark only works when the
full word is legible elsewhere on the same screen. If the nav mark is ever hidden
on a breakpoint where the hero is cropped, the hero becomes a puzzle.

---

## 4. The crop rule (hero only)

> **A −13% crop does not transfer here — verified, not assumed.** That figure
> suits a 5-glyph mark at aspect ≈3.9:1. `farul.ivan` is 10 glyphs at **aspect
> 5.15:1**, so the same rule cuts far deeper into the word. Rendered at 93vw /
> −13%, the cut lands at **87% of the mark: the entire `n` disappears and the
> site reads `farul.iva`.** That looks like a truncation bug, not a composition.

Derived from the real Lexend outlines and rendered at 375 / 768 / 1200px:

```css
.mark-hero {
  position: absolute;
  width: 81.36%;            /* same at every breakpoint */
  right: -1.36%;            /* both percentages of the same box */
  bottom: 26%;
}
```

**Measured result — identical at all three widths:**

| viewport | left edge | overflow | cut at | mark height |
|---|---|---|---|---|
| 375px | 20.00% | 3.8% | 95.47% | 61px |
| 768px | 20.00% | 3.8% | 95.47% | 125px |
| 1200px | 20.00% | 3.8% | 95.47% | 195px |

The cut lands on the right stem of the `n`. The full name stays readable, and the
left edge sits at exactly 20% so the standfirst can share it.

> **Why one value, not two.** Holding a fixed −13% would force two widths
> (`85vw` and `93vw`). Holding the cut at 95.5% instead lets a single width work
> at every breakpoint, which is simpler and removes a breakpoint bug.

**The crop is a percentage, not a pixel overflow.** The same fraction of the same
letter is always missing, which is why it reads as composed rather than broken.
Do not convert this to a fixed pixel offset at any breakpoint.

**The hero standfirst aligns to the wordmark's left edge (20%)** — that shared
alignment is what stops the two elements reading as unrelated objects.

If the wordmark text ever changes, re-derive: the rule is
`width = 0.80 / cutFraction`, `right = width − 0.80`, holding the left edge at
20%. At `cutFraction = 0.9833` that gives 81.36% / −1.36%, which leaves 85% of
the `n` standing.

> **Do not cut deeper than this.** At `cutFraction = 0.955` the `n` loses its
> right-hand stem, and what remains — a stem and an arch — is an `r`. Rendered,
> the name reads as a different name. Verified by building it.

---

## 5. Structure for the animation

**Technique: a per-glyph wipe mask.** Each glyph is unveiled left-to-right by a
rectangle scaling in `X`, staggered across the word. What you see is always the
**real filled glyph** — the mask only controls how much of it is visible, so the
final state is pixel-identical to static text with nothing to reconcile.

**This needs no hand-authored assets.** The mask rectangles are generated from the
glyph ink bounds already in `layout.json`. Verified working against the real
Lexend outlines.

```html
<svg class="mark mark-hero" viewBox="0 0 3884 754.6" aria-hidden="true"
     preserveAspectRatio="xMinYMid meet">
  <defs>
    <mask id="wipe" maskUnits="userSpaceOnUse">
      <!-- one rect per glyph, spanning its ink bounds ±8 units -->
      <rect style="--i:0" x="…" y="-40" width="…" height="834" fill="#fff"/>
      …
    </mask>
  </defs>

  <g class="mark__ghost">                  <!-- static, from frame 0, 12% ink -->
    <path d="…"/> …
  </g>
  <g class="mark__draw" mask="url(#wipe)"> <!-- the same paths, full ink -->
    <path id="outline-0" d="…"/> …
  </g>
</svg>
```

- **The ghost is what prevents layout shift.** It occupies the exact final width
  from the first frame. It is not decoration.
- Ghost fill: `color-mix(in srgb, var(--ink) 12%, transparent)`.
- Rects extend ±8 units horizontally and well past the cap height vertically, so
  no glyph edge is clipped by its own mask.

> **Optional upgrade, not required.** A true pen-stroke feel comes from animating
> stroked *centrelines* rather than a mask — that is why hand-drawn intros appear
> stem-first. It needs a hand-authored centreline per glyph, about an hour of
> vector work,
> stroked at ≈`1.8 ×` the measured stem of **75.6 units**, round caps and joins.
> Ship the wipe first. Upgrade only if the wipe reads too mechanical in context.

---

## 6. Accessibility

```html
<h1 class="sr-only">Farul Ivan — Frontend &amp; Fullstack Engineer</h1>
<svg class="mark mark-hero" aria-hidden="true">…</svg>
```

The wordmark is **decorative in every variant**. The real heading is text, always
present, always in the DOM, never dependent on the animation completing. The nav
mark is a link and takes an accessible name via `aria-label="Farul Ivan — home"`.

Under `prefers-reduced-motion: reduce`, `mark-hero` renders in its final filled
state on the first paint with no draw.
