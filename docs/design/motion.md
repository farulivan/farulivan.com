# Motion — farulivan.com

> Engineers get motion wrong when a spec says "fades in nicely". Every animation
> here has durations, stagger, easing and a reduced-motion path. Primitives are
> in [foundations.md §6](foundations.md).

**Global rule.** Every animation below has a `prefers-reduced-motion: reduce`
branch that renders the **final state immediately**. Not a shorter animation —
the final state. This is a build requirement.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
```
That blanket rule is the floor. The named animations below each need their own
explicit final-state handling on top of it.

---

## M1 · The intro stroke-draw ⭐

The site's opening moment. Runs once per page load, on the **homepage hero
wordmark only**.

### It must not gate the page

Nav, layout and content render on the first paint. The wordmark animates **in
place**, inside an element that already occupies its final size.

> A preloader that gates the page can stall indefinitely and leave the whole
> site blank while every asset returns HTTP 200. Nothing is missing; the gate
> simply never opens, and there is no error to debug. **There is no loading
> overlay on this site.** If the animation never runs, the page is still
> complete.

### Two layers

| Layer | State | Purpose |
|---|---|---|
| `.mark__ghost` | static, `--ink` at 12%, visible from frame 0 | reserves the exact final width → **zero layout shift** |
| `.mark__draw` | filled glyphs, revealed through a mask | the final letterform |
| `#wipe rect` | `scaleX(0→1)` per glyph, staggered | the writing |

> **The animated thing is the mask, not the letter.** Stroking a glyph *outline*
> and animating dashoffset traces the letter's perimeter — rendered, it produces
> hollow colouring-book letters, not writing. A per-glyph wipe mask unveils the
> real filled glyph. See [wordmark.md §5](wordmark.md).

### Timing

```
per-glyph draw:   420ms
stagger:          55ms per glyph, left to right
glyphs:           10  (f a r u l . i v a n)
total:            420 + (9 × 55) = 915ms   ≈ --d-draw
easing:           --e-draw  cubic-bezier(0.4, 0, 0.2, 1)
start delay:      120ms after first paint
fill swap:        each glyph switches stroke→fill on its own completion, 90ms --e-out
```

```css
.mark__draw path { fill: var(--ink); }     /* the real glyph, always filled */

#wipe rect {
  transform-box: fill-box;
  transform-origin: left center;
  transform: scaleX(0);
  animation: wipe 420ms var(--e-draw) forwards;
  animation-delay: calc(var(--i) * 55ms + 120ms);
}
@keyframes wipe { to { transform: scaleX(1); } }
```

Rect geometry comes from the glyph ink bounds emitted by the build script — no
runtime measurement, nothing to measure with `getTotalLength()`.

### Reduced motion

`.mark__draw` renders unmasked (`mask: none`) and complete on first paint;
`.mark__ghost` is hidden. No mask, no delay, no stagger.

### Runs once

Set a `sessionStorage` flag. Returning to the homepage within a session shows the
finished wordmark immediately. The intro is a greeting, not a toll gate.

---

## M2 · The cell dissolve

Reveal treatment for project screenshots and large media.

The image resolves out of a mosaic of square cells, with cells dropping out
along the **edge** while the centre is already solid. That edge-bias is what
makes it read as decoding rather than as a fade.

```
grid:       12 columns × derived rows (cells stay roughly square)
cell anim:  260ms opacity 0→1, --e-out
stagger:    edge-biased — cells nearest the image border go last
            delay = (normalisedDistanceFromCentre) × 340ms
total:      ~600ms
trigger:    IntersectionObserver, 25% visible, once
```

**The image must be legible throughout.** The dissolve resolves; it does not gate
content. The underlying `<img>` is always in the DOM at full opacity — the cells
are an overlay that clears. If the effect fails, the image is simply there.

### Reduced motion
No overlay. The image renders normally.

---

## M3 · Scroll reveals

Everything else that enters on scroll.

```
transform:  translateY(24px) → 0
opacity:    0 → 1
duration:   --d-slow (500ms)
easing:     --e-out
stagger:    60ms between siblings, max 6 steps then no further delay
trigger:    IntersectionObserver, 15% visible, once
```

Never animate more than 6 items in a stagger — beyond that the last item feels
broken rather than choreographed.

### Reduced motion
Elements render in final position. No transform, no opacity animation.

---

## M4 · Menu open / close

```
panel:      translateX(8px) + opacity 0 → 0, 1     --d-mid, --e-out
links:      stagger 40ms, translateY(12px) → 0
tilt:       static 1.4deg — NOT animated
button:     label MENU→CLOSE, icon •• → ⋮          --d-fast, --e-inout
            no change in pill size or fill
```

The pill morphs both halves at once and does **not** resize. Any layout shift
here reads as a bug.

**Required behaviour beyond the animation:** focus moves into the panel on open,
is trapped while open, returns to the trigger on close; `Escape` closes;
`aria-expanded` on the trigger.

### Reduced motion
Panel appears and disappears with no transform and no stagger. Opacity only.

---

## M5 · Hover states

```
links:        colour --d-fast --e-inout; underline offset animates, not colour alone
pill labels:  slide-and-swap (overflow hidden, translateY 100%→0) --d-fast
project rows: background → --surface, --d-fast
              screenshot scales 1 → 1.02, --d-mid --e-out
CTA boxes:    border --rule → --rule-strong, --d-fast
```

**All hover states must have a non-hover equivalent.** Touch and keyboard users
get the same information — never put content behind `:hover` alone.

---

## M6 · Smooth scroll

**No smooth-scroll library.**

Native scrolling is already smooth, hijacking it breaks scroll-anchoring and
find-in-page, and it is a runtime dependency for something the browser does
correctly. Use `scroll-behavior: smooth` on anchor jumps only, and respect
reduced motion.

---

## Motion budget

| Animation | Runs |
|---|---|
| M1 intro draw | once per session, homepage only |
| M2 cell dissolve | once per image, on first view |
| M3 scroll reveal | once per element |
| M4 menu | on interaction |
| M5 hover | on interaction |

**Nothing loops. Nothing autoplays. Nothing repeats on re-scroll.** A portfolio
that keeps moving while you read it is harder to read. The site writes its name
once at the top and sets the same word *still* at the bottom. One draw per visit
is a signature; two is a tic.
