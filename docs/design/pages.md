# Pages — farulivan.com

> Section order, layout and content slots per page. Components are `C1`–`C10`
> from [components.md](components.md).
>
> **Purpose: employer-facing.** I am looking for a role. Every page carries a
> clear seniority signal, and the CV is never more than one click away. Copy is
> framed as *what was built and what it did*, not *technologies I have touched*.

**Five pages.** Homepage is a long index of teaser sections; each feeds a real
page.

```
/            Home
/work        Work index → /work/[slug]
/about       About + experience timeline
/writing     Writing index → /writing/[slug]
/contact     Contact
```

---

## Home

A long index. Every section is a teaser that leads somewhere.

| # | Section | Field | Components | Notes |
|---|---|---|---|---|
| 1 | Hero | `--paper` | wordmark `mark-hero` + standfirst | M1 stroke-draw. Standfirst aligns to the wordmark's left edge (20%). |
| 2 | Positioning | `--paper` | `--t-display-m` statement | One sentence on what I build and for whom. Seniority signal lives here. |
| 3 | Stack | `--paper` | C9 | Row-band parallax. |
| 4 | Selected work | `--surface` | C4 + C5 ×3 | Three projects only. Leads to `/work`. |
| 5 | Experience | `--paper` | C4 + C8 (compressed) | Three most recent roles. Leads to `/about`. |
| 6 | Writing | `--accent-field` | C4 + C6 | Latest three posts as a hairline table. **Lime field, `--ink` text.** |
| 7 | Footer | `--surface-invert` | C10 | Static full-bleed wordmark. Carries the email and the CV. |

**Field rhythm:** paper → paper → paper → surface → paper → **lime** → **black**.
Lime appears exactly once, and black exactly once, both at the end where the page
is asking for something. Colour is a signal here, not decoration.

**Changed during build.** A separate contact band sat between the lime one and
the footer, on its own black field. The footer became a black field after these
specs were written and already carries the email and the CV, so that band put two
black fields back to back and asked twice for the same thing. It is gone, and the
footer is the black one. Every route to contact the page had, it still has: the
menu, the email, the download.

### Hero detail

```
wordmark:    81.36%, right: -1.36%, bottom: 26%  — one value at every width
standfirst:  var(--t-display-s), left edge at 20% — same as the wordmark
scroll cue:  bottom-left at var(--page-margin), --t-micro, --ink-muted
             deliberately OUTSIDE the 20% alignment, so it reads as chrome
```

The hero is `100vh` on desktop, `min(72vh, 640px)` on mobile — short enough that
section 2 is visible on first scroll.

> **Changed during build: the scroll cue.** It sits at the bottom right, where it
> was first built, at `--t-label` in `--ink-muted` (5.10:1) with the chevron. It
> shipped in the footer's muted grey at 60%, about 1.6:1 on white, and was close
> to invisible.
>
> It is hidden below 768. There the descriptor wraps to three lines or more and
> runs into that corner, and a phone hero is scrolled by habit anyway.

> **Changed during build: the hero says who, what, availability and where the
> CV is.** From the top, all on the 20% axis:
>
> ```
> availability:  a badge: 1px --rule outline on --paper around the words at
>                --t-label, uppercase, --ink, with lime light pulsing out
>                from the pill's edge every 2.5s. Hover fills the inner
>                field with --accent-field.
>                A third of the way down on a desktop.
> wordmark:      81.36% wide, left edge at 20%, as before
> descriptor:    the line under the lettering, still typing its own markup
>                and swapping to the sentence
> calls to act:  dark pill "Download my CV" with "PDF, 108 KB" under it,
>                light pill "Email me". Side by side from 768, stacked
>                and full width below it.
> ```
>
> **The descriptor keeps its loop,** against the review's call to retire it
> and the rule that nothing loops. It is the one thing in the hero with a
> sense of humour, and with the availability line and the calls to action
> beside it the hero no longer depends on it to say what I do. Both states
> share one box, so the buttons under it never move as it swaps. It stops off
> screen and never runs under reduced motion. The markup it types is the
> line's real class list, so it changed with the layout.
>
> **The availability line is a badge** that glows, so it reads as a status.
> The whole pill gives off a pulse of lime light: a ring and a blur that leave
> its edge and fade. The lime field under the words (ink on lime, 12:1) only
> comes in on hover; at rest, glow and field together were too heavy.
> The pulse is the second exception to "nothing loops", and it is gone under
> reduced motion too. Its corners are concentric, the inner field at the
> panel radius and the outline that plus 4px, so where a phone wraps the
> words both soften into the same rounded box.
>
> **Everything is in normal flow and the hero grows to hold it.** The wordmark
> was pinned at `bottom: 26%` and the descriptor at 77% of the hero's height.
> That holds for a name and one line, not for four blocks: on a phone they
> landed on each other instead of pushing the hero taller. The lettering and
> everything under it now sit at the bottom of the hero, and the space above
> them is what gives way first on a short screen. The crop is untouched (see
> [wordmark.md](wordmark.md)). The heights above are now floors: the full
> screen from 1024, `max(min(72vh, 640px), 560px)` below it.
>
> **The scroll cue stays,** against the review's call to remove it once the
> hero had calls to action. It is as described in the note above: bottom
> right, hidden below 768, fading out as the page scrolls.
>
> The CV's format and size sit under the pill rather than inside it. In one
> pill the two do not fit a phone's axis, and the footer already says it this
> way. The label is "Download my CV", the same words the CV has everywhere
> else on the site.

---

## Work

### Index

C4 header, then **C6 hairline table** listing everything, then C5 rows for the
three featured projects.

```
columns: NN · PROJECT · ROLE · STACK · YEAR
```

Table first, then featured rows — an employer scanning for a specific technology
finds it in the table; someone browsing gets the visual rows.

### `/work/[slug]` — case study

| # | Block | Notes |
|---|---|---|
| 1 | Title | `--t-display-l`, project name |
| 2 | Meta bar | Role · Team size · Duration · Stack — C6 styling, single row |
| 3 | Lead image | plate on a full-bleed stage band (changed during build, see below) |
| 4 | The problem | `--t-read` prose, `--measure` |
| 5 | What I built | `--t-read` prose + inline images |
| 6 | Outcome | **numbers where they exist** — `--t-display-s` figures with `--t-label` captions |
| 7 | Stack detail | C6 table |
| 8 | Next project | C5 row |

> Section 6 is the one that matters for a job search. If a project has no
> measurable outcome, say what changed qualitatively — never omit the block.

> **Changed during build: the lead image is a plate, not a full-bleed
> picture.** A grey stage band runs edge to edge, and each capture is mounted on
> it at its own proportions, edged with a 1px hairline. Each is capped at two
> thirds of its width in pixels (`screenshotMaxWidth` in `src/lib/screenshot.ts`).
> No plate is wider than 1,120px, however sharp the capture. Two or more share
> the row.
>
> Full bleed assumed captures that did not exist. The first screenshots were 1×,
> so at the full width of a 1440 window on a 2× screen each pixel was stretched
> to nearly three and the type in them went soft. The band needs no pixels, so
> it keeps the edge-to-edge moment the picture can no longer carry. A sharper
> capture lifts its own cap with no code change, up to the 1,120 ceiling, which
> keeps a 2× capture a plate rather than a banner.

> **Changed during build: results first.** The outcome figures and the links
> moved to the top of the page:
>
> ```
> header:   title, summary, then the facts table with the live and source
>           links beside it as light pills (under it on a phone)
> results:  every outcome figure at --t-display-s over a --t-label caption,
>           one row of up to four columns, two to a row on a phone
> ...       lead image, the story
> outcome:  the sentence only, at the end
> next:     the next project's row
> ```
>
> The figures sat after about 2,500px of prose at 32px, and four of them
> wrapped three and one. The links were a half-width empty box at the very
> bottom. The links block is gone. The pills open in a new tab and say so to
> a screen reader, as every external link on the site does.

---

## About

| # | Section | Field | Components |
|---|---|---|---|
| 1 | Title | `--paper` | `--t-display-l` |
| 2 | Bio | `--paper` | `--t-read`, `--measure`, 3–4 paragraphs |
| 3 | Portrait | `--paper` | full-bleed image, M2 |
| 4 | Experience | `--paper` | **C8 staircase timeline** |
| 5 | Capabilities | `--surface` | C6 table — grouped by domain |
| 6 | CV | `--accent-field` | C7 — `DOWNLOAD CV — PDF` |

The staircase timeline is the centrepiece. Each row: year, index, role, company,
and two lines on what shipped.

> **Changed during build: the portrait is not full bleed.** It sits in the left
> column under the standfirst, beside the bio, and above the bio on a phone. It
> is a 4:5 crop, never more than 360px wide, in monochrome (greyscale, contrast
> 1.05), with square corners and no reveal.
>
> The only photograph is a 720 square, which cannot fill a 16:9 band across a
> window without going soft. A 4:5 crop of it is 576 × 720, so at 360px it has
> 1.6 pixels for every one drawn, inside the two-thirds rule the screenshots
> are held to. Monochrome, because its warm wood and navy compete with the one
> lime on the page. Square, because it is content rather than a panel. It has
> no cell dissolve, the same as the screenshots, which have never had one.

---

## Writing

**This is why `--t-read` (17px / 1.6 / weight 400) exists.** Design-led sites
routinely set body copy at 13–14px with line-height near 1.0. That is unreadable
for articles. Prose on this site does not use `--t-ui`.

### Index
C4 header + C6 table: `DATE · TITLE · TOPIC · READ TIME`. Newest first.

### `/writing/[slug]`

```
title:      var(--t-display-m)
meta:       date · read time — var(--t-label), --ink-muted
body:       var(--t-read), max-width var(--measure), left-aligned
h2:         var(--t-h-l), margin-top var(--s-8)
h3:         var(--t-h-m), margin-top var(--s-6)
code:       var(--surface) block, --r-none, --t-ui, horizontal scroll inside
            its own container — the page body never scrolls sideways
blockquote: 3px --accent left border, --s-5 padding, --ink
images:     full --measure width, --r-none, caption at --t-micro --ink-muted
```

Prose is a single column. No sidebars, no floating TOC — at this length it is
noise.

---

## Contact

Short page, one job.

| # | Block | Field |
|---|---|---|
| 1 | Statement | `--paper` — `--t-display-m`, one line on what I'm looking for |
| 2 | Direct | `--paper` — email as a large link at `--t-display-s` |
| 3 | Elsewhere | `--paper` — C6 table: GitHub · LinkedIn · X |
| 4 | CV | `--accent-field` — C7, `DOWNLOAD CV — PDF, 240KB` |

**Changed during build.** This block was specified on `--surface-invert`. The
footer became a full black field after these specs were written, so a black band
here would sit directly on top of another one — and the footer already carries
the same download. It is on lime instead, which keeps this the moment the page
asks for something without repeating the field below it.

**No contact form.** An email link is more likely to be used, needs no backend,
no spam handling and no privacy policy. If a form is added later it needs a
written justification.

---

## Responsive

Three breakpoints. Below `768px` everything is one column.

| | `<768px` | `768–1024px` | `>1024px` |
|---|---|---|---|
| grid | 4 col | 8 col | 12 col |
| wordmark | `81.36%` | `81.36%` | `81.36%` |
| nav | mark + pill | + descriptor | all 4 zones |
| C5 project row | stacked | stacked | 2 col |
| C6 table | stacked blocks | table | table |
| C8 timeline step | 24px | 48px | 72px |

The `--page-margin` and the full-bleed treatments are preserved at every
breakpoint. That is what keeps the poster feeling on a phone.

---

## Content I need to supply

Blocking the build. Tracked in [handover.md](handover.md).

- [ ] Positioning sentence (Home §2) and the nav descriptor line
- [ ] 3 featured projects — name, role, team size, duration, stack, problem, what was built, **outcome**
- [ ] Full project list for the Work table
- [ ] Bio, 3–4 paragraphs
- [ ] Experience: year, role, company, 2 lines each
- [ ] Capabilities, grouped by domain
- [ ] CV as PDF
- [ ] Portrait photograph
- [ ] Project screenshots — **capture recipe in handover.md**
- [ ] At least 2 posts before Writing ships publicly
