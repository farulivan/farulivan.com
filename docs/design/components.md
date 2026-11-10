# Components — farulivan.com

> Anatomy, states, responsive behaviour and accessibility for every component.
> Tokens are from [foundations.md](foundations.md); animation numbers from
> [motion.md](motion.md).
>
> **Every interactive component must specify all five states** — default, hover,
> focus-visible, active, disabled. A component spec without them is incomplete.

---

## C1 · Nav

Fixed, always visible on desktop. Four zones on the 12-column grid.

```
┌────────────────────────────────────────────────────────────────┐
│ [mark-nav]   farul.ivan    Frontend & Fullstack     [pills]    │
│  0%          25%           50%                       right     │
└────────────────────────────────────────────────────────────────┘
```

```
padding:     var(--s-6) var(--page-margin)
position:    fixed; inset-inline: 0; top: 0
pointer-events: none          ← on the <header>
             auto             ← on every child
```

> The `pointer-events` split matters: the bar spans the full width but never
> steals clicks from the hero beneath it.

**Zone 3 is a permanent one-line descriptor** (`Frontend & Fullstack Engineer`).
A descriptor kept in the nav at all times is free, constant positioning. Since
this site is employer-facing, this line is doing real work; treat it as content,
not decoration.

**Responsive.** Below `768px`, zones 2 and 3 drop; mark + menu pill only. The
mark **never** drops — the hero crop depends on it ([wordmark.md §3](wordmark.md)).

> **Changed during build: the language switch shows both.** It showed only
> the current language, "EN", while linking to the other, so it said one
> thing and did another. It reads "EN · ID" in the same 44px pill, the current
> one in `--ink` and the other muted, which turns ink on hover.

> **Changed during build: the controls hide while you read.** "Always visible"
> put the language and menu pills on top of headings and prose on every long
> page, and on a phone nearly all the time. Past the point where the mark
> leaves, they leave too on the way down and come back on the first scroll
> up, after 8px of travel either way. They stay while the menu is open or
> while one of them has keyboard focus, and move without a transition under
> reduced motion. The CV is in the menu, so it is one upward flick away.

**A11y.** `<header>` + `<nav aria-label="Primary">`. Skip link is the first
focusable element on the page.

---

## C2 · Pill button

Two variants of one component.

```
        ┌──────────────────────────────┐
        │  LABEL              ( ◯ )    │   height 56px
        └──────────────────────────────┘   circle 44px, 6px shell
```

| | Light | Dark |
|---|---|---|
| fill | `--surface` | `--ink` |
| label | `--ink` | `--paper` |
| circle | `--paper` | `#2E2E2E` |

```
height:        56px
shell padding: 6px            (56 − 44 = 12, split)
circle:        44px           ← also the minimum touch target
radius:        var(--r-control)
label:         var(--t-label), --w-label, uppercase
label padding: 0 var(--s-6) 0 var(--s-7)    ← asymmetric, optically centres
                                              the label against the right circle
```

> **The circle fill is a *step* from the pill fill**, never the same and never
> pure contrast. It makes the button read as a control seated in a housing.

**States**

| State | Change |
|---|---|
| default | as above |
| hover | label slide-and-swaps (M5); circle fill lightens one step |
| focus-visible | `--focus-ring` 2px, 2px offset, outside the pill |
| active | scale `0.98`, `--d-fast` |
| disabled | `--ink-faint` label, no hover, `cursor: not-allowed`, `aria-disabled` |

**Responsive.** Label may hide below `480px`, leaving the circle alone — if it
does, the button **must** keep an `aria-label`.

---

## C3 · Menu card

One component, two anchors. **Identical on mobile and desktop** except width and
vertical anchor — this is the point of the pattern, not an implementation detail.

```
fill:     --surface
radius:   var(--r-panel)
padding:  var(--s-7) var(--s-5)
tilt:     rotate(1.4deg)     ← static, never animated
anchor:   desktop  fixed, right: 0, top: 0,   width 480px
          mobile   fixed, right: 0, top: 72px, width 100%
links:    var(--t-display-s) / --w-display / −0.055em
          row height 88px, padding var(--s-4) var(--s-5), radius var(--r-panel)
```

**Link type size, weight, tracking, fill, radius and tilt do not change between
breakpoints.** Only width and anchor. Do not scale the type down on mobile.

> The 1.4° tilt is what stops the card reading as a system dropdown — it looks
> placed by hand. More would look like a bug; less would do nothing.

**Overflow.** The card's corner may bleed past the right edge by roughly 60px —
this echoes the hero crop and makes the two read as one system. **Links
must stay fully inside.** Crop decoration, never interaction.

**States** — per link: hover fills the row with `--paper` and reveals a trailing
arrow; focus-visible ring inside the row; active scales 0.99.

**A11y.** `aria-expanded` on the trigger; focus moves in on open and is trapped;
`Escape` closes and returns focus to the trigger; the card is `inert` when closed.

---

## C4 · Section header

The repeating skeleton. Opens every major section.

```
┌──────────────────────┬─────────────────────────────────────────┐
│ ■ SELECTED WORK      │ One sentence describing the section.    │
│ (col 1–3)            │ (col 5–8)                               │
└──────────────────────┴─────────────────────────────────────────┘
```

```
label:  var(--t-label), --w-label, uppercase, --ink
        ■ marker: 8px square, --ink, margin-right var(--s-2)
desc:   var(--t-ui), --w-body, --ink-muted, max 2 lines
rule:   1px --rule below, full bleed, margin-top var(--s-5)
```

On a lime field the description is `--ink`, **not** `--ink-muted` — see the
foundations lime rule (3.65:1 fails).

> **Changed during build: the description starts at column 7, set left.** It
> was flush right in the last four columns, so the long ones ran to five lines
> with a ragged left edge. It now spans columns 7 to 12 at `--text-body`, set
> left like every other paragraph, which fits the long ones in two or three
> lines. Every description starts on the same line, the one the timeline's
> details hang from.

---

## C5 · Project row

The core of the Work page.

```
┌───────────────────────────┬───────────────────────────────────┐
│                           │  01                        2025   │
│    [ screenshot ]         │  Project Name                     │
│    col 1–6, 16:10         │  Role · Stack · Outcome           │
│                           │  Short description, 2–3 lines.    │
│                           │  [ CASE STUDY ]  [ LIVE ]         │
└───────────────────────────┴───────────────────────────────────┘
```

```
grid:        2 columns, var(--gutter)
image:       16:10, radius --r-none, cell-dissolve reveal (M2)
index:       var(--t-micro), --ink-muted
title:       var(--t-h-l), --w-display
meta:        var(--t-label), uppercase, --ink-muted
description: var(--t-ui), --w-body
separator:   1px --rule between rows, full bleed
```

**Rows alternate image side** (odd left, even right) to stop the list marching.

> **Changed during build: the row leads with proof.** Under the title:
>
> ```
> role:        var(--text-ui), --ink, on its own line
> stack:       var(--t-micro), uppercase, muted, five items at most
> summary:     var(--text-body)
> figures:     the first two outcome figures, value at var(--t-h-l) weight
>              300 over a var(--t-micro) muted caption. Two equal columns
>              on a phone, a row from 640.
> affordance:  var(--t-label) "Read the case study", with an arrow that moves
>              4px towards it on hover and focus
> ```
>
> Role and stack shared one uppercase line that wrapped to two and read as one
> block of tools. The outcome figures were only ever at the bottom of the case
> study, so nobody skimming the list saw a number. The content now puts each
> project's strongest figures first, since the row shows two. The whole row is
> still the one link; the affordance only says so.

### C5b · No-image variant

Required — some work is NDA-private, so the list must stay coherent when a
project has no images.

The image cell is replaced by a **type block on `--surface`** at the same aspect
ratio: project name at `--t-display-s`, stack list at `--t-label` beneath. Same
cell size, same rhythm, no gap in the grid. Never render an empty box or a
placeholder icon.

**States.** Whole row is a link. Hover: row background → `--surface`, image
scales 1.02. Focus-visible: ring around the whole row, not the image.

> **Changed during build: the screenshot sits on a stage.** The image cell is
> now a flat field one step off the section (`--color-section-stage`: grey on
> white, white on grey and lime). The capture is mounted on it, inset by an even
> 5% margin and edged with a 1px `--rule` hairline. The cell keeps its 16:10
> outline, so the list's rhythm does not change. The inset frame is a little
> wider than 16:10, so the capture is cropped from the top and loses only its
> bottom fifteenth. The no-image variant sits on the same stage instead of on
> `--surface`, which vanished on the grey band.
>
> Two problems drove it. A capture of a white website, run to the cell's edges
> on a white page, had no edge at all. And the captures available are 1×
> screenshots, about 1,000 to 1,700 pixels across, which do not have the
> pixels to fill a cell edge to edge on a 2× screen.
>
> **Hover changed with it.** The row's grey fill did nothing on the home page's
> grey band, and on white it washed the grey stage into the row. Hover is now the
> picture zooming 1.02 inside its frame, plus an underline on the title.
> Focus-visible is unchanged: a ring around the whole row.

> **Changed during build: the index is the project's number, not the row's.**
> It is the project's place in the full list, the same number the work table
> prints in its NN column, so a project keeps one number everywhere it appears.
> Three of the four projects are selected, which makes the selected rows read
> 01, 02, 04, and the next-project row at the foot of a case study prints the
> number of the project it leads to.
>
> Counting each list on its own put the same project under two numbers on one
> page: Norven was 04 in the table and 03 in the rows under it. The
> next-project row had the opposite fault and printed 01 on every case study.

> **Changed after launch: no number at all.** Numbering each project by its
> place in the full list kept the numbers consistent, but the selected rows
> then read 01, 02, 04, and people took the gap for a ranking with something
> missing. The row now opens on the title. The work table drops its NN column
> and the case-study share card drops the number from its kicker. The order the
> author sets is unchanged.
>
> The number also named the screenshot for the page transition, so the picture
> in a row could grow into the plate on its case study. The slug names it now.
> It is just as stable and unique on a page, and it doesn't move when the order
> changes.

---

## C6 · Hairline data table

**A hairline table is the right form for any dense, scannable index.** Used here
for the Work index, the Writing index, and the Experience list.

```
┌────┬──────────────────────────┬─────────────┬──────────┬────────┐
│ NN │ TITLE                    │ ROLE        │ STACK    │  YEAR  │
├────┼──────────────────────────┼─────────────┼──────────┼────────┤
```

```
header:  var(--t-micro), uppercase, --ink-muted
cell:    var(--t-ui), --ink
title:   var(--t-h-m), --w-body
rule:    1px --rule between rows; header rule --rule-strong
row pad: var(--s-5) 0
bleed:   full width to var(--page-margin)
```

**Responsive.** Below `768px` the table becomes stacked blocks — each row a card
with its column labels inline as `--t-micro` above each value. Never
horizontally scroll a table of links.

**A11y.** Real `<table>` with `<th scope="col">`. If rows are links, the link
wraps the title cell, not the row.

> **Changed after launch: the work table has no NN column.** It starts on the
> title, for the reason given under the project row. That column was the only
> one hidden when the table stacks, so the table no longer has an option to
> hide a column.

---

## C7 · CTA box

Confidence through emptiness.

```
┌───────────────────────────────────┐
│                                   │
│           GET IN TOUCH            │   min-height 120px
│                                   │
└───────────────────────────────────┘
```

```
border:      var(--border)
radius:      var(--r-none)
min-height:  120px
label:       var(--t-label), uppercase, --w-label, centred
fill:        none
```

**States.** Hover: border → `--rule-strong`, fill → `--surface`.
Focus-visible: `--focus-ring`, offset. Active: scale 0.995.

**Responsive.** Full width, stacked, and **keeps its height** — do not let these
collapse into ordinary buttons on mobile. That restraint is the pattern.

---

## C8 · Timeline row (staircase)

Used on **About** for the career timeline — directly relevant now that the site
is employer-facing.

```
2019  ( 01 )
  ────────────────────────────────────────────────
   2021  ( 02 )
     ────────────────────────────────────────────
      2023  ( 03 )
```

```
year:    var(--t-display-l), --w-display
index:   var(--t-micro), uppercase, --ink-muted, superscript
step:    each row indents by 72px × index
rule:    1px --rule, full bleed, one per row
detail:  right column — role, company, 2-line description at --t-ui
```

**Responsive.** Below `768px` the indent step drops to `24px` — the staircase
survives but does not push content off screen. Do not remove it entirely; the
stagger is the pattern.

> **Changed during build: only the years step.** The whole row used to
> indent, so on About's seven rows the detail column narrowed row by row and
> the last slid under the menu control. The years now step and the detail
> column stays on column 7. The depth is 35% of the years' own column rather
> than a length, because the years and the column both scale with the window.
> That leaves at least 58px between the bottom row's dates and its details
> from 375 to 1920.
>
> On About, the rows from before the move into software (the visualisation
> studio, fire protection and the architecture degree) sit under a quiet
> `--t-label` heading, "Before software". Experience entries carry a
> `beforeSoftware` flag for it.

---

## C9 · Tech stack band

A scroll-driven band of large type for the stack.

**Vertical fret-like rules are explicitly rejected.** What we keep is the
underlying idea: *a scale the words are positioned against*, so horizontal
position reads as meaningful rather than arbitrary.

**Chosen device: row-band parallax.**

```
rows:      3–4 full-width rows, one per stack group
type:      var(--t-display-m), --w-display, uppercase
rule:      1px --rule between rows — HORIZONTAL only, no vertical rules
motion:    each row translates X at its own rate on scroll
           row n: translateX(scrollProgress × (n odd ? -1 : 1) × 8%)
overflow:  hidden on the band; rows may extend past both edges
```

This keeps the family resemblance to C8's staircase (horizontal rules, offset per
row) without borrowing the fret grid.

> **Changed during build: the tools are read, not glanced at.** The domain
> stays at display size. Under it, on its left edge, the tools are set at
> `--text-body` in `--ink` and sentence case, led by a `--t-label` tag: the
> first sentence of the group's depth note, as the about page prints it in
> full ("Where I live", "Growing, deliberately"). They used to be 13px muted
> capitals that ran on after the word on some rows and wrapped under it on
> others. The word wraps on a phone instead of being cut to "CRAFT AND PRA".

**Reduced motion.** Rows sit at their mid position, static.

**A11y.** The stack is a real `<ul>`. The parallax is presentational; the list is
readable and in the DOM regardless.

---

## C10 · Footer

Appears on every page.

```
┌──────────────────────────────────────────────────────────────┐
│ [mark]                                                       │
│                    MENU        SOCIAL       CONTACT          │
│                    Work        GitHub       hi@farulivan.com │
│                    About       LinkedIn                      │
│                    Writing     X            CV               │
│                                             Download PDF     │
│                                                              │
│  farul.ivan                          ← full content width    │
└──────────────────────────────────────────────────────────────┘
```

```
padding:  var(--s-9) var(--page-margin) var(--page-margin)
field:    --surface-invert, with --ink-invert text
columns:  menu on the left margin, social and contact hard right
labels:   var(--t-micro), uppercase, --ink-invert-muted
menu:     var(--t-h-l), no label above it
links:    var(--t-ui), --ink-invert, row pitch 28px
wordmark: mark-footer, full content width, bottom-flush, STATIC
rights:   below the wordmark, --t-micro, --ink-invert-muted
```

> **Changed after the specification was written.** This originally kept every
> column in the right half, with the left one empty apart from a small mark on
> the margin, on the reasoning that dense content in half the space reads as
> calm rather than crowded.
>
> That held while the footer was ink on paper and the menu was set at reading
> size. Inverting it to a black field and setting the menu at heading size
> changed the arithmetic: a black empty half is much heavier than a white one,
> and it stopped reading as restraint and started reading as a hole. The menu
> now holds the left edge instead, which keeps the band weighted rather than
> evenly divided.

> **The footer wordmark does not animate.** The site opens by writing the name
> and closes with the same name set huge and still. One draw per visit.

**Employer-facing addition:** the CV download lives here and in Contact. Label
it with format and size — `CV — PDF, 240KB`.

> **Changed during build: the CV control is the light pill.** It was a square
> outlined box, the only one on the site, so it read as a different kind of
> thing. It is now the same pill the hero's CV uses, light on the black field,
> with a paper focus ring and its format and size under it.

**Responsive.** Below `768px`, columns stack full-width; the wordmark stays
full-bleed and bottom-flush.
