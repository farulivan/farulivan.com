import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * The nine type sizes, exactly as they are named in the theme.
 *
 * They have to be declared here as well, because tailwind-merge does not read
 * the stylesheet — it works from a built-in table of what Tailwind's own class
 * names mean. Left to itself it files every `text-*` class under one heading,
 * decides `text-ink` and `text-label` are the same kind of thing, and keeps
 * only the last one. That is a colour silently vanishing from an element, with
 * no error anywhere.
 *
 * Naming the sizes is enough: everything else beginning `text-` is then
 * understood to be a colour, and the two can coexist.
 */
const TYPE_SIZES = [
  "display-l",
  "display-m",
  "display-s",
  "h-l",
  "h-m",
  "read",
  "ui",
  "label",
  "micro",
] as const

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...TYPE_SIZES] }],
    },
  },
})

/** Joins class names, with later ones replacing earlier ones they conflict with. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
