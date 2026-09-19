# Static files

Served as-is at the site root.

## The icons

All drawn from `icon.png` in the uncommitted assets folder: the monogram, a
black disc with the `f` cut out of it.

They are set on white rather than left transparent. A black disc with clear
corners disappears against a dark browser tab, and iOS composites a transparent
`apple-touch-icon` onto black, which is the same disc on the same colour.

`og-default.png` is the monogram above the lettering, centred on paper. The
title and the description of a shared link come from the page itself, so the
picture only has to say whose page it is.

## Still missing

**`favicon.svg`.** Browsers prefer an SVG icon over the `.ico` where one exists,
and an SVG is also the only one of these that can carry its own dark-mode
colours. It needs the monogram as a drawing rather than as a picture of one;
until then the `.ico` serves every browser, and `BaseLayout` does not link an
SVG icon at all.

`cv.pdf` is real and its size is stated in `src/config/site.ts`. Replacing it
means updating that number to match.
