import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * `cn()` joins class names and drops the earlier of any two that conflict, so
 * a component's own classes can be overridden by the caller's.
 *
 * Deciding what "conflict" means is the part that needs help. tailwind-merge
 * does not read the stylesheet — it works from a built-in table of what
 * Tailwind's own class names mean — and this project renames nearly every
 * scale. Left to itself it does not know that `text-label` is a size and
 * `text-ink` is a colour, or that `max-w-measure` is a width at all, so it
 * keeps both of a conflicting pair and the winner is decided by the order the
 * two rules happen to sit in the stylesheet. That is a value silently
 * disappearing from an element with no error anywhere, and it has happened
 * twice: buttons rendered their label in ink on an ink field, and prose ran the
 * full width of the page because `max-w-none` outlived the `max-w-measure`
 * meant to replace it.
 *
 * Naming the scales fixes the whole family at once. Anything not listed here
 * still falls back to Tailwind's own table, which is correct for everything we
 * did not rename.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      /** The nine type sizes. Everything else beginning `text-` is a colour. */
      text: [
        "display-l",
        "display-m",
        "display-s",
        "h-l",
        "h-m",
        "read",
        "ui",
        "label",
        "micro",
      ],
      /** Named steps. The numbered ones are read as numbers already. */
      spacing: ["page-margin", "gutter", "tap", "control"],
      container: ["measure"],
      radius: ["control", "panel"],
      "font-weight": ["mark", "display", "body", "label", "emph"],
      ease: ["reveal", "state", "draw"],
    },
    classGroups: {
      /*
       * Durations are utilities rather than theme values — Tailwind themes
       * easing but not duration — so they have to be named as a class group.
       */
      duration: [{ duration: ["fast", "mid", "slow"] }],
    },
  },
})

/** Joins class names, with later ones replacing earlier ones they conflict with. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
