# Static files

Served as-is at the site root.

## The icons

All drawn from `icon.png` in the uncommitted assets folder: the monogram, a disc
with the `f` cut out of it.

**They keep their transparency.** The letter and the corners are cut out rather
than painted, so the disc's colour is the only thing there is — and neither
colour works everywhere on its own. A black disc disappears on a dark ground; a
white one disappears on a light one. So the colour is chosen per file, by what
each one actually sits on:

| File                   | Disc  | Because                                                                                                                            |
| ---------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `favicon.svg`          | both  | The only one that can change with the reader's colour scheme, and browsers prefer it. It carries both and shows whichever matches. |
| `favicon.ico`          | black | The fallback for browsers with no SVG icon support, which is a small and mostly light-themed set.                                  |
| `apple-touch-icon.png` | white | iOS fills the transparency with black. A black disc there is a black square.                                                       |
| `icon-192`, `icon-512` | black | The manifest paints white behind them.                                                                                             |

`favicon.svg` holds two small pictures rather than a drawing, which is normally
the wrong way round. The sizes a favicon is drawn at are all smaller than the
pictures in it, so nothing is ever scaled up — but a drawing would still be
better: smaller, and sharp at the larger sizes a browser uses for a bookmark.

`og-default.png` is the monogram above the lettering, on paper. It is a card
rather than an icon, so it keeps its background: link previews are composited on
to whatever colour the platform uses, and several of them use black.

## Still missing

Nothing, unless the monogram turns up as a real drawing — see the note on
`favicon.svg` above.

`cv.pdf` is real and its size is stated in `src/config/site.ts`. Replacing it
means updating that number to match.
