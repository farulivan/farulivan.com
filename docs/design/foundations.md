# Foundations — farulivan.com

> The single source of truth for tokens. Every value here is measured or
> computed, not estimated. Contrast ratios were calculated with the WCAG 2.x
> relative-luminance formula; each is stated inline so nothing has to be
> re-derived during build.

---

## 1. Register

Four questions had to be settled before anything else could be specified:

| Question | Decision | Why |
|---|---|---|
| Typeface | **Lexend**, one family | One family keeps the system coherent at every size. Lexend is variable (`wght` 100–900, **no italic**). |
| Weight | **Light system**, 300 display / 400 prose / 500 labels | Keeps the page quiet. The wordmark is the exception, at 500 — see below. |
| Ground | **White base**, with lime and black as *section fields* | A quiet white ground carrying flat colour-block sections. |
| Radius | **Functional, never decorative** | Resolves 0 vs 8 vs 24px — see §5. |

**The wordmark is set at 500. Superseded during build.** The ceiling of 300
existed for one reason: the letters had to stay an even thickness so they could
be drawn stroke by stroke. That technique was rejected — stroking a letter's
outline traces its perimeter and renders as a hollow colouring-book shape — and
the animation uncovers filled letters instead. Nothing about uncovering a letter
cares how thick it is, so the constraint went with the technique.

The rest of the system still runs light. The wordmark is the one place that does
not, and it is deliberate: it is the only thing on the page that has to hold its
own at 80% of the viewport width.

---

## 2. Colour

### Neutrals

```css
--paper:          #FFFFFF;
--ink:            #1D1D1D;   /* 16.86:1 on paper — AAA */
--ink-muted:      #6E6E6E;   /*  5.10:1 on paper — AA  */
--ink-faint:      #8A8A8A;   /*  3.45:1 — NON-TEXT / large only */
--surface:        #F5F5F5;   /* card + tile fill */
--rule:           rgba(29,29,29,0.15);
--rule-strong:    #1D1D1D;
--surface-invert: #0A0A0A;
--ink-invert:     #FFFFFF;   /* 19.80:1 on surface-invert — AAA */
--ink-invert-muted: #A8A8A8; /*  8.33:1 on surface-invert — AAA */
```

> **Why `#1D1D1D` and not `#000000`.** Both pass AAA, so contrast did not decide
> it. Pure black leaves no room for an inverted surface — if ink and the dark
> field are both `#000`, they are the same thing. At `#1D1D1D` we can set type on
> a `#0A0A0A` field and it still reads. Pure black also glares in long prose,
> and this site has a Writing section.

> **`#9A9A9A` is banned.** It is a common choice for label grey and it fails at
> **2.81:1**. Our floor for text is `--ink-muted` at 5.10:1.

### Lime

**This scale is frozen here.** It was sampled once and written down. There is no
live source to regenerate it from, so treat these eleven values as fixed.

```css
--lime-50:  #FBFDF9;   --lime-500: #92C35D;   /* base "Lime" */
--lime-100: #F4F9EE;   --lime-600: #7CB342;
--lime-200: #E2EFD4;   --lime-700: #618C34;
--lime-300: #CAE2B0;   --lime-800: #486826;
--lime-400: #ABD183;   --lime-900: #344A1B;
                       --lime-950: #17220C;
```

### 🚨 The lime rule — read before using any lime

**Lime is a surface. It is not a text colour.**

| Lime as text on white | ratio | |
|---|---|---|
| 500 `#92C35D` | **2.06** | fails badly |
| 600 `#7CB342` | 2.50 | fails |
| 700 `#618C34` | 3.96 | UI / large text only |
| 800 `#486826` | **6.40** | the only lime allowed as body text on white |

But as a **field with `--ink` on top**, lime is excellent:

| Field | `--ink` on it | |
|---|---|---|
| lime-300 `#CAE2B0` | 12.05 | AAA |
| lime-400 `#ABD183` | 9.78 | AAA |
| lime-500 `#92C35D` | 8.18 | AAA |

Two further rules that fall out of the numbers:

- **`--ink-muted` is not allowed on lime fields** — `#6E6E6E` on lime-300 is only
  3.65:1. On a lime field, text is `--ink` or nothing.
- **Lime inverts well.** It cannot be text on white, but lime-400 on
  `--surface-invert` is 11.48:1 and lime-500 is 9.60:1. On black fields, lime
  *is* available as text.

```css
--accent:        var(--lime-500);  /* FILL ONLY — never text on light */
--accent-field:  var(--lime-300);  /* full-section field */
--accent-text:   var(--lime-800);  /* the only lime permitted as text on light */
--accent-on-dark:var(--lime-400);  /* lime as text, on surface-invert only */
```

### Focus

```css
--focus-ring:     var(--ink);        /* on light + lime fields — 8.18:1 on lime-500 */
--focus-ring-alt: var(--paper);      /* on surface-invert — 19.80:1 */
--focus-width:    2px;
--focus-offset:   2px;
```

---

## 3. Typography

**Family:** Lexend. Variable `wght` axis only. Ship the variable `woff2`; the
static cuts in `raw-assets/fonts/Lexend/static/` are a fallback only.

```css
--font: 'Lexend', ui-sans-serif, system-ui, sans-serif;
```

### Weight by role — never by whim

| Token | Value | Used for |
|---|---|---|
| `--w-mark` | 500 | the wordmark **only** |
| `--w-display` | 300 | display sizes |
| `--w-body` | 400 | prose |
| `--w-label` | 500 | labels, nav, table headers, metadata |
| `--w-emph` | 600 | inline emphasis, active states |

> **Changed during build: headings in prose have a weight of their own,
> `--font-weight-heading` at 500.** They borrowed `--w-emph`, which made the
> h2s and h3s in case studies and posts the heaviest type on the site. At 500
> they still stand clear of 400 text and stay inside the light system.

### The ramp

Nine steps, each with a job. Display sizes are fluid; text sizes are fixed.

| Token | Size | LH | Tracking | Role |
|---|---|---|---|---|
| `--t-display-l` | `clamp(64px, 10.4vw, 150px)` | 0.88 | −0.045em | page titles, timeline years |
| `--t-display-m` | `clamp(48px, 6.7vw, 96px)` | 0.90 | −0.040em | section statements |
| `--t-display-s` | `clamp(32px, 3.9vw, 56px)` | 0.95 | −0.030em | large standfirsts |
| `--t-h-l` | `32px` | 1.10 | −0.020em | page sub-headings |
| `--t-h-m` | `21px` | 1.20 | −0.010em | project titles, table rows |
| `--t-read` | `17px` | **1.60** | 0 | **prose only** — Writing, case studies |
| `--t-ui` | `14px` | 1.40 | 0 | nav, footer links, table cells |
| `--t-label` | `13px` | 1.20 | +0.04em | labels, uppercase |
| `--t-micro` | `11px` | 1.20 | +0.06em | indices, timestamps, uppercase |

> **`--t-read` is a deliberate departure from the rest of the ramp.** Display-led
> sites routinely set body copy at 13–14px with line-height 1.0–1.2, which works
> when a section is two sentences long. It is unreadable for case studies and a
> Writing section. Prose gets 17px at 1.6 and weight 400. Do not use `--t-ui`
> for paragraphs.

> **Changed during build: a tenth step, `--text-body`, 16px at 1.5.** It is for
> the short persuasive copy outside prose: project summaries, timeline entries
> and section descriptions, the contact page's included. All of it sat at
> `--t-ui`, and 14px next to 300-weight display type at 96 to 150px read as
> small print. `--t-ui` stays for table cells, navigation, footer links and
> metadata, which keeps the About page's capability notes at 14px, since they
> are table cells. `--t-read` stays for long prose.

**Rule:** tracking tightens as size grows and loosens as it shrinks. Uppercase
always gets positive tracking; display never does.

---

## 4. Space & grid

4px base.

```css
--s-1: 4px;    --s-5: 24px;   --s-9:  96px;
--s-2: 8px;    --s-6: 32px;   --s-10: 128px;
--s-3: 12px;   --s-7: 48px;   --s-11: 192px;
--s-4: 16px;   --s-8: 64px;   --s-12: 256px;
```

```css
--page-margin: clamp(12px, 1vw, 20px);   /* ≈14px at 1440 */
--gutter:      clamp(16px, 1.5vw, 24px);
--cols:        12;
--measure:     68ch;   /* max line length for --t-read */
```

> **The page margin is small on purpose.** It is what lets the wordmark and media
> run edge to edge and keeps the poster feeling. It is used identically by the
> nav, the footer and the full-bleed wordmark — one value, three places.

---

## 5. Radius, borders, elevation

**Radius is functional, never decorative.** This resolves the 0 / 8 / 24px
question once:

```css
--r-control: 999px;  /* pills and circles — things you press */
--r-panel:   16px;   /* menu card, tiles, media containers */
--r-none:    0;      /* structure: project rows, tables, section fields, wordmark */
```

If it is a control, it is fully round. If it is a floating panel, 16px. If it is
structure or content, square. There is no fourth case.

```css
--border: 1px solid var(--rule);
--border-strong: 1px solid var(--rule-strong);
```

**No shadows. No gradients.** Depth comes from the field colour changing, not
from elevation.

---

## 6. Motion primitives

Full choreography is in [motion.md](motion.md). Primitives only here:

```css
--e-out:   cubic-bezier(0.22, 1, 0.36, 1);    /* reveals, entrances */
--e-inout: cubic-bezier(0.65, 0, 0.35, 1);    /* state changes, morphs */
--e-draw:  cubic-bezier(0.40, 0, 0.20, 1);    /* the stroke-draw */

--d-fast: 180ms;   --d-mid: 320ms;   --d-slow: 500ms;   --d-draw: 900ms;
```

**Every motion needs a `prefers-reduced-motion` path** that renders the final
state immediately. This is a build requirement, not a nicety.

---

## 7. Paste-ready token block

```css
:root {
  /* neutrals */
  --paper:#FFFFFF; --ink:#1D1D1D; --ink-muted:#6E6E6E; --ink-faint:#8A8A8A;
  --surface:#F5F5F5; --rule:rgba(29,29,29,.15); --rule-strong:#1D1D1D;
  --surface-invert:#0A0A0A; --ink-invert:#FFFFFF; --ink-invert-muted:#A8A8A8;

  /* lime */
  --lime-50:#FBFDF9;  --lime-100:#F4F9EE; --lime-200:#E2EFD4; --lime-300:#CAE2B0;
  --lime-400:#ABD183; --lime-500:#92C35D; --lime-600:#7CB342; --lime-700:#618C34;
  --lime-800:#486826; --lime-900:#344A1B; --lime-950:#17220C;
  --accent:var(--lime-500); --accent-field:var(--lime-300);
  --accent-text:var(--lime-800); --accent-on-dark:var(--lime-400);

  /* focus */
  --focus-ring:var(--ink); --focus-ring-alt:var(--paper);
  --focus-width:2px; --focus-offset:2px;

  /* type */
  --font:'Lexend',ui-sans-serif,system-ui,sans-serif;
  --w-mark:500; --w-display:300; --w-body:400; --w-label:500; --w-emph:600;
  --t-display-l:clamp(64px,10.4vw,150px); --t-display-m:clamp(48px,6.7vw,96px);
  --t-display-s:clamp(32px,3.9vw,56px);   --t-h-l:32px; --t-h-m:21px;
  --t-read:17px; --t-ui:14px; --t-label:13px; --t-micro:11px;

  /* space + grid */
  --s-1:4px;  --s-2:8px;  --s-3:12px; --s-4:16px; --s-5:24px; --s-6:32px;
  --s-7:48px; --s-8:64px; --s-9:96px; --s-10:128px; --s-11:192px; --s-12:256px;
  --page-margin:clamp(12px,1vw,20px); --gutter:clamp(16px,1.5vw,24px);
  --cols:12; --measure:68ch;

  /* shape */
  --r-control:999px; --r-panel:16px; --r-none:0;

  /* motion */
  --e-out:cubic-bezier(.22,1,.36,1); --e-inout:cubic-bezier(.65,0,.35,1);
  --e-draw:cubic-bezier(.4,0,.2,1);
  --d-fast:180ms; --d-mid:320ms; --d-slow:500ms; --d-draw:900ms;
}
```

---

## 8. Accessibility floor

Non-negotiable. Any change to these values must be re-checked against the table
in §2.

1. Body text meets **AA (4.5:1)**; `--ink-faint` is for non-text and large text only.
2. **Lime is never text on a light ground** except `--accent-text` (lime-800).
3. **`--ink-muted` never appears on a lime field** (3.65:1).
4. Focus is always visible: 2px ring, 2px offset, `--ink` on light and lime,
   `--paper` on `--surface-invert`. Never remove the outline without a replacement.
5. Every animation has a `prefers-reduced-motion` path rendering the final state.
6. The animated wordmark is **decorative**; the real page title lives in a proper
   heading. Ship a skip link.
7. Interactive targets are ≥44×44px.
