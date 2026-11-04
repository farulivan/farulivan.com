# Design — farulivan.com

Design notes for my personal site. I am **Farul Ivan**, a fullstack and
frontend web engineer.

**Purpose:** employer-facing portfolio. I am looking for a role, so every
page carries a seniority signal and the CV is never more than one click away.

**Stack:** Astro. **Typeface:** Lexend. **Ink:** `#1D1D1D` on `#FFFFFF`.
**Accent:** Lime.

---

## The specs

Read in this order.

| Doc | What it settles |
|---|---|
| **[foundations.md](foundations.md)** | Tokens — colour, type, space, grid, radius, motion primitives — as paste-ready CSS. Includes the accessibility floor. |
| **[wordmark.md](wordmark.md)** | How `farul.ivan` is generated from Lexend, the crop rule, the three variants. Unblocks the hero and footer. |
| **[motion.md](motion.md)** | The five animations with real durations, stagger and easing, each with a reduced-motion path. |
| **[components.md](components.md)** | C1–C10: anatomy, all five states, responsive, a11y. |
| **[pages.md](pages.md)** | Section order and layout per page, plus the content I still owe. |
| **[handover.md](handover.md)** | Build order, Astro structure, screenshot recipe, definition of done, watch list. |
| **[review-2026-11.md](review-2026-11.md)** | Design review of the built site, November 2026: what to change next, in priority order, and which specs it overrides. Read before starting new UI work. |

---

## The direction, in four decisions

| | Resolved as |
|---|---|
| Type | **Lexend, light system** — 300 display / 400 prose / 500 labels |
| Ground | **White base, lime and black as section fields** |
| Radius | **Functional:** `999px` controls, `16px` panels, `0` structure |
| Feel | Quiet Swiss ground, poster moments |

**The weight question was decided by a constraint, not taste.** The wordmark's
stroke-draw needs a monoline letterform. Lexend is verified monoline at `wght`
100–300 and loses it above 600. That forces the wordmark light, and the rest of
the system follows it down. Full reasoning in [foundations.md](foundations.md).

---

## Working conventions

- Every value in these docs is **measured** — a computed style or a rendered
  result — not estimated, and the viewport it was measured at is stated.
- Accessibility objections are raised at the point where a choice is made, not
  deferred to an audit at the end.
- Contrast ratios are written inline so nothing has to be re-derived during
  build.

---

## Deliberately deferred

Not gaps — decisions taken to leave for later.

- **Dark mode.** The token set includes `--surface-invert` and `--ink-invert` so
  it stays reachable, but a full dark palette needs the lime scale re-checked
  against dark grounds. Lime-400 and 500 both pass as text on `#0A0A0A` (11.48
  and 9.60), so the foundation exists when we want it.
- Analytics, OG image generation, RSS for Writing.
