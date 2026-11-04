/**
 * The icon registry.
 *
 * Icons are markup, not a dependency: this site needs a handful of them, and an
 * icon package would ship a runtime — or a build step — to solve a problem a
 * typed record already solves.
 *
 * A module rather than the component's own frontmatter, because a `.astro`
 * file may not export values. Keeping the data here lets a test walk every
 * entry instead of naming one and trusting the rest, and it puts the data in
 * TypeScript where the rest of this project's data lives.
 *
 * Paths are drawn on a 24×24 grid and stroked by the component, so they carry
 * no fill or stroke of their own unless the shape needs one.
 */
export const ICONS = {
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  /*
   * The menu control. Two filled dots drawn horizontally; whoever uses it
   * turns the whole pair to stand them upright. Filled rather than stroked so
   * they hold their shape at this size.
   */
  dots: '<circle cx="6.6" cy="12" r="2.6" fill="currentColor" stroke="none"/><circle cx="17.4" cy="12" r="2.6" fill="currentColor" stroke="none"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  /* Two sheets, one over the other: the address, and the copy of it. */
  copy: '<rect width="13" height="13" x="8" y="8" rx="2"/><path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
} as const

export type IconName = keyof typeof ICONS

/** Every name in the registry, so a test can walk them without a second list. */
export const ICON_NAMES = Object.keys(ICONS) as IconName[]
