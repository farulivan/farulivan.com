# Handover — farulivan.com

> Build order, project structure, and what is blocked on what.
> Read [foundations.md](foundations.md) first, then this.

**Stack: Astro.** Static output, near-zero client JS by default, content
collections for projects and writing. This site is type and motion with almost
nothing interactive — Astro ships no framework runtime for that, which matters
when the hero animation is the first paint.

**Note:** a stale `.astro/` cache from an unrelated project was removed from this
repo during design. Starting clean.

---

## 1. Project structure

```
src/
  assets/
    fonts/lexend-var.woff2          ← subset + converted from raw-assets/
    wordmark/
      mark.svg                      ← 10 paths, ids g-0…g-9, built once
  components/
    Nav.astro            Pill.astro         MenuCard.astro
    SectionHeader.astro  ProjectRow.astro   DataTable.astro
    CtaBox.astro         TimelineRow.astro  StackBand.astro
    Footer.astro         Wordmark.astro
  content/
    projects/*.md        writing/*.md       experience/*.md
  layouts/
    Base.astro           Article.astro
  pages/
    index.astro          work/index.astro   work/[slug].astro
    about.astro          writing/index.astro writing/[slug].astro
    contact.astro
  styles/
    tokens.css           ← paste from foundations.md §7
    base.css             type.css
scripts/
  build-wordmark.mjs     ← generates mark.svg + per-path --len
```

### Content collection schemas

```ts
// projects
{ title, slug, year, role, teamSize?, duration?, stack: string[],
  featured: boolean, order: number,
  screenshot?: image(),          // optional — C5b variant when absent
  problem, built, outcome,       // outcome required; see pages.md
  liveUrl?, sourceUrl? }

// writing
{ title, slug, date, topic, readTime, draft: boolean }

// experience
{ year, role, company, description, order }
```

`screenshot` is **optional by design** — screenshots are still being captured,
and the C5b no-image variant must render correctly in the meantime.

---

## 2. Font pipeline

Source: `raw-assets/fonts/Lexend/Lexend-VariableFont_wght.ttf` (OFL, variable,
`wght` 100–900, **no italic**).

```bash
# subset to latin + punctuation, convert to woff2, keep the wght axis
pyftsubset Lexend-VariableFont_wght.ttf \
  --unicodes="U+0000-00FF,U+2018-201D,U+2013-2014,U+2026" \
  --layout-features="kern,liga" \
  --flavor=woff2 --output-file=lexend-var.woff2
```

```css
@font-face {
  font-family: 'Lexend';
  src: url('/fonts/lexend-var.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}
```

Preload it in `<head>`. One file covers every weight.

---

## 3. Screenshot capture recipe

Projects are live but unshot. Capture before the Work page can ship as designed.

```
viewport:     1440 × 900, dpr 2  → 2880 × 1800 source
crop:         16:10 from the top of the page
chrome:       none — no browser frame, no URL bar
state:        real content, logged in where needed. No lorem, no empty states.
format:       AVIF primary, WebP fallback, via Astro's <Picture>
widths:       640, 1024, 1600
treatment:    none. No mockup frames, no perspective, no drop shadows.
              Nothing on this site carries a shadow; screenshots are no exception.
naming:       {project-slug}.png → src/content/projects/_images/
```

For anything NDA-covered, do not blur or redact — use the **C5b no-image
variant**. A blurred screenshot looks like a mistake; a type block looks
deliberate.

---

## 4. Build order

Sequenced so nothing is blocked behind unfinished content.

### Phase 1 — foundations *(no content needed)*
1. Astro scaffold, `tokens.css` pasted from foundations §7
2. Font pipeline + preload
3. `base.css`, `type.css`, the `--t-read` prose styles
4. `Base.astro` with skip link, `sr-only` h1 pattern, reduced-motion block

### Phase 2 — the wordmark *(unblocks hero and footer)*
5. **The wordmark SVG already exists** — `raw-assets/wordmark/farul-ivan-300.svg`,
   generated from the real font with the scripts beside it. Copy it in; do not
   redraw it.
6. `Wordmark.astro` with three variants, ghost + wipe-masked draw layer
7. M1 wipe reveal + reduced-motion + session flag
8. ~~Verify the crop~~ — **resolved during design.** `width: 83.8vw; right: -3.8%`,
   one value at every breakpoint. Rendered and measured at 375 / 768 / 1200: left
   edge 20.00%, cut at 95.47%, every time. See
   [wordmark.md §4](wordmark.md).

### Phase 3 — chrome
9. `Nav.astro` + `Pill.astro` (all five states)
10. `MenuCard.astro` — identical across breakpoints, focus trap, Escape
11. `Footer.astro`

### Phase 4 — content components
12. `SectionHeader`, `DataTable`, `CtaBox`
13. `ProjectRow` — **both variants**, C5b first so the list works without images
14. `TimelineRow`, `StackBand`

### Phase 5 — pages
15. Home, Work index, About, Contact
16. `work/[slug]`, `writing/[slug]`, Writing index

### Phase 6 — motion + polish
17. M2 cell dissolve, M3 scroll reveals
18. Full reduced-motion pass
19. Accessibility audit against foundations §8

---

## 5. Definition of done

Per component:

- [ ] All five states implemented (default / hover / focus-visible / active / disabled)
- [ ] Keyboard reachable and operable; visible focus at 2px + 2px offset
- [ ] Renders correctly at 375 / 768 / 1024 / 1440 / 1920
- [ ] `prefers-reduced-motion` path renders the final state
- [ ] No hover-only content
- [ ] Contrast verified against foundations §2 — **especially anything on lime**

Per page:

- [ ] One `<h1>`, correct heading order, no skipped levels
- [ ] Page body never scrolls horizontally (code and tables scroll internally)
- [ ] Lighthouse ≥95 performance, 100 accessibility
- [ ] Works with JS disabled — content is present; only motion is lost

---

## 6. Watch list

Things most likely to go wrong:

| Risk | Guard |
|---|---|
| **Stroking glyph outlines.** Rendered, it gives hollow colouring-book letters — not writing. | Per-glyph wipe mask over the filled glyph. Never stroke the outlines. |
| **Reaching for a −13% crop.** At 10 glyphs it eats the whole `n`. | `83.8vw / −3.8%`. Re-derive if the text ever changes. |
| **An intro that gates the page.** A preloader can stall indefinitely with every asset at HTTP 200 and leave the site blank. | No overlay. The wordmark animates in place over content that has already rendered. |
| **The crop becoming a pixel value.** It is `right: -13%` at every width. | Test at four widths; the same fraction of the same letter must be missing. |
| **Lime used as text.** Lime-500 is 2.06:1 on white. | Lint for lime on light backgrounds. Only `--accent-text` (lime-800) is permitted. |
| **`--ink-muted` on a lime field** — 3.65:1. | On lime, text is `--ink` or nothing. |
| **Prose set at `--t-ui`.** Common on display-led sites, and wrong for articles. | Prose is `--t-read`, 17px / 1.6 / 400. |
| **The mobile menu becoming a different component.** | Same fill, radius, padding, type size, weight, tracking and tilt. Only width and anchor change. |
| **The footer wordmark animating.** | It is static. One draw per visit. |
| **Smooth-scroll libraries.** Tempting, and never worth it. | Native scrolling. See motion.md M6. |

---

## 7. Open items

**Blocked on content from Farul** — the full list is in
[pages.md](pages.md#content-farul-needs-to-supply). The critical path is the
positioning sentence, three featured projects with outcomes, and the CV.

**Resolved during design, no longer open:** the crop geometry and the draw
technique were both prototyped against the real font. See the Phase 2 notes.

**Deliberately deferred:**

- Dark mode. The system has `--surface-invert` and `--ink-invert` so it is
  reachable, but a full dark palette needs the lime scale re-checked against dark
  grounds — lime-400 and 500 both pass as text on `#0A0A0A` (11.48 and 9.60), so
  the foundation exists when we want it.
- Analytics, OG image generation, RSS for Writing.
