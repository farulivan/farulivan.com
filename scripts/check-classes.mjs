#!/usr/bin/env node
/**
 * Finds classes in the built HTML that no rule anywhere styles.
 *
 * A misspelt utility is not an error in Tailwind — it is simply not a utility,
 * so nothing is generated and the element keeps whatever it had. That failure
 * is invisible: the class is right there in the markup, and the page looks
 * plausible because the property it should have set had a sensible default.
 *
 * It has already bitten this project four times. `--spacing` is switched off
 * here so that only the design's own steps exist, which quietly took `p-0`,
 * `top-0` and `inset-x-0` with it — a fixed bar with `inset-x-0` still sat at
 * the top left, so it looked pinned while it was only ever un-positioned.
 * `py-28` and `py-16` were steps on the scale this project replaced. And a
 * class list that had been edited down ended in a bare `prose-headings:`.
 *
 * Runs after the build, because the answer is in the output rather than the
 * source: what matters is whether the stylesheet the reader downloads has a
 * rule for every class the HTML they downloaded is wearing.
 */
import { readdir, readFile } from "node:fs/promises"
import { join, relative } from "node:path"
import { exit } from "node:process"

const DIST = "dist"

/**
 * Classes put on the page by something other than a stylesheet, which would
 * otherwise be reported forever. Shiki labels every code block and every line
 * inside it, then colours them with inline styles.
 */
const NOT_OURS = new Set([
  "astro-code-themes",
  "github-dark-high-contrast",
  "github-light-high-contrast",
  "line",
])

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else yield path
  }
}

let css = ""
/** class name → the files wearing it */
const used = new Map()

for await (const path of walk(DIST)) {
  if (path.endsWith(".css")) {
    css += await readFile(path, "utf8")
    continue
  }
  if (!path.endsWith(".html")) continue

  const html = await readFile(path, "utf8")

  // Astro inlines small stylesheets, so a component's own rules can be here
  // rather than in a .css file.
  for (const [, block] of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
    css += block
  }

  for (const [, list] of html.matchAll(/class="([^"]*)"/g)) {
    for (const name of decode(list).split(/\s+/)) {
      if (!name || NOT_OURS.has(name)) continue
      const seen = used.get(name)
      if (seen) seen.add(path)
      else used.set(name, new Set([path]))
    }
  }
}

/** The five entities an attribute value can carry. */
function decode(text) {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
}

// Class selectors as they appear in the stylesheet, with CSS's backslash
// escaping undone so `.px-\[2px\]` matches the `px-[2px]` in the markup.
const defined = new Set(
  [...css.matchAll(/\.((?:\\.|[A-Za-z0-9_-])+)/g)].map(([, name]) =>
    name.replace(/\\(.)/g, "$1")
  )
)

const dead = [...used].filter(([name]) => !defined.has(name)).sort()

if (dead.length === 0) {
  console.log(
    `ok    every one of the ${used.size} classes in the built HTML has a rule`
  )
  exit(0)
}

console.error(`\nFAIL  ${dead.length} class(es) with no rule behind them:\n`)
for (const [name, files] of dead) {
  const where = [...files]
    .slice(0, 3)
    .map((f) => relative(DIST, f))
    .join(", ")
  console.error(`  ${name}`)
  console.error(
    `      ${where}${files.size > 3 ? ` and ${files.size - 3} more` : ""}`
  )
}
console.error(
  "\n  Either the class is misspelt, or it is built from a theme value this" +
    "\n  project does not define. Check src/styles/global.css before assuming" +
    "\n  the utility exists.\n"
)
exit(1)
