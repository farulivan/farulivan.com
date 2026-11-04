import type { Locale } from "../content/schemas"

/**
 * Where a page's link-preview card lives.
 *
 * Its own module, away from the renderer, so a layout can name the card
 * without pulling the drawing code into its build: the renderer brings a
 * layout engine and a font with it, and only the card endpoint needs those.
 *
 * A page with no card of its own (about, contact, the indexes) shares its
 * language's home card, which says who, what and whether I am available.
 */
export function ogImagePath(
  lang: Locale,
  page?: { section: "work" | "writing"; slug: string }
): string {
  return page
    ? `/og/${lang}/${page.section}/${page.slug}.png`
    : `/og/${lang}.png`
}
