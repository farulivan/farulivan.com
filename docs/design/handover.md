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

> **Changed during build: the treatment is a stage, and the size follows the
> pixels.** The captures that exist were taken at 1×, about 1,000 to 1,700
> pixels across, not at the 2× above. So every screenshot is shown mounted on a
> flat stage, one step off its section's field, with a 1px `--rule` hairline,
> and never wider than two thirds of its own width in pixels. That is a stretch
> of at most a third on a 2× screen.
>
> This is still no mockup and no shadow. A flat field and a hairline are the
> same structure the rest of the site is built from. The 2× recipe above still
> stands for future captures, and a sharper capture lifts its own cap
> automatically, up to 1,120px. Past that a plate starts to read as a banner.
> Crop at the end of the section you are showing, not at a fixed ratio, so the
> next section's background does not show as a strip along the bottom edge.

> **How the 2× captures were taken.** Nabitu, Zeed and Norven were recaptured
> on 2026-11-04 at 1440 × 900 with a device pixel ratio of 2, giving 2880 ×
> 1800. Norven is cut at its hero's edge, 2880 × 1714. A normal desktop browser
> on a 1× monitor cannot produce these, since its screenshots match the screen.
> Use headless Chrome:
>
> ```
> "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
>   --hide-scrollbars --force-device-scale-factor=2 --window-size=1440,900 \
>   --virtual-time-budget=4000 --screenshot=out.png https://norven.farulivan.com/
> ```
>
> Alternatively, use Chrome DevTools' device mode at 1440 × 900 with a pixel
> ratio of 2, then "Capture screenshot". **Nabitu defaults to Indonesian.** It
> keeps its language in `localStorage` under `nabitu-lang`, so set it to `en`
> and reload before capturing, or the picture will not match its alt text.
>
> **The hospital is captured from my local build, not the live site.** The
> live site now runs a different design from the one I built, so the
> capture comes from the project running at `localhost:3000`. It was taken at
> 1600 × 1000, the width where that layout is centred, giving 3200 × 2000.
>
> Two things have to be done before capturing:
>
> - Hide the Next.js dev badge (`nextjs-portal`).
> - Pin the hero image at its 1× size:
>   `img.dokter { width: 800px; max-width: 100%; height: auto }`.
>
> The second is needed because the image is a `next/image` with
> `width: auto; height: auto` and a `1x, 2x` srcset whose 2× file is the same
> 800 pixels. On any 2× screen the browser divides that by two, and the hero
> image shows at 400px instead of filling its 696px column. That is a bug in
> the hospital project, not something to reproduce in its portfolio picture.
>
> **The WhatsApp bot stays 1×.** It is an app window and there is no sharper
> capture. It is cut from the raw capture to the whole conversation, 1033 × 700:
> both replies complete, without the message bar and the scrollbar. Nothing is
> upscaled. Its plate stops at 689px, two thirds of its width, which is as large
> as its pixels allow.

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
8. ~~Verify the crop~~ — **resolved during design.** `width: 81.36%; right: -1.36%`,
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
| **Cutting the `n` too deep.** Past about 85% of it, the stem and arch that remain read as an `r`. | `81.36% / −1.36%`. Re-derive if the text ever changes. |
| **An intro that gates the page.** A preloader can stall indefinitely with every asset at HTTP 200 and leave the site blank. | There *is* an opening screen, added after the specs were written. It is dismissed by a CSS animation rather than by script, never waits on a load event, and ignores the pointer throughout. See motion.md. |
| **The crop becoming a pixel value.** It is `right: -13%` at every width. | Test at four widths; the same fraction of the same letter must be missing. |
| **Lime used as text.** Lime-500 is 2.06:1 on white. | Lint for lime on light backgrounds. Only `--accent-text` (lime-800) is permitted. |
| **`--ink-muted` on a lime field** — 3.65:1. | On lime, text is `--ink` or nothing. |
| **Prose set at `--t-ui`.** Common on display-led sites, and wrong for articles. | Prose is `--t-read`, 17px / 1.6 / 400. |
| **The mobile menu becoming a different component.** | Same fill, radius, padding, type size, weight, tracking and tilt. Only width and anchor change. |
| **The footer wordmark animating.** | It is static. One draw per visit. |
| **Smooth-scroll libraries.** Tempting, and never worth it. | Native scrolling. See motion.md M6. |

---

## 7. Open items

**Blocked on content I still owe** — the full list is in
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
