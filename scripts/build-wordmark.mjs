#!/usr/bin/env node
/**
 * Builds the wordmark SVG the site ships.
 *
 * Run by hand, and the output is committed:
 *
 *   node scripts/build-wordmark.mjs
 *
 * It reads the outlined lettering from raw-assets/, which is generated from the
 * real font and is not in this repository — a clone already has the finished
 * SVG and never needs to run this. Re-run it only if the lettering changes.
 *
 * The lettering is set at weight 500. An earlier note said never to go above
 * 300, because the letters had to stay an even thickness to be drawn stroke by
 * stroke. That technique was not used — the animation uncovers filled letters
 * instead — so the ceiling went with it.
 *
 * What it adds on top of the outlines is the machinery the intro animation
 * needs: one mask rectangle per letter, sized to that letter's ink, so each can
 * be uncovered on its own. Those rectangles are measured here rather than in
 * the browser, so nothing has to be computed at runtime.
 */
// cspell:ignore MLHVQZ -- the SVG path commands this lettering uses
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const SOURCE = join(root, "raw-assets/wordmark/farul-ivan-500.svg")
const OUTPUT = join(root, "src/assets/wordmark/mark.svg")

/** Breathing room around each letter, so a mask never clips its own glyph. */
const PAD_X = 8
/** The rectangles run well past the lettering vertically for the same reason. */
const PAD_Y = 40

/* ---------------------------------------------------------------- parsing */

/**
 * Horizontal extent of one path.
 *
 * The lettering uses only absolute moves, lines and quadratic curves. A curve's
 * control point often sits outside the shape it draws, so taking the control
 * point as the edge would give a box wider than the letter. Solving for where
 * the curve actually turns gives the true edge instead.
 */
function horizontalExtent(d) {
  const tokens = d.match(/[MLHVQZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? []
  let min = Infinity
  let max = -Infinity
  let x = 0
  let y = 0
  let command = ""
  let i = 0

  const see = (value) => {
    if (value < min) min = value
    if (value > max) max = value
  }

  /** Where a quadratic curve turns back on itself, if it does so mid-curve. */
  const quadraticTurn = (p0, p1, p2) => {
    const denominator = p0 - 2 * p1 + p2
    if (denominator === 0) return undefined
    const t = (p0 - p1) / denominator
    if (t <= 0 || t >= 1) return undefined
    const u = 1 - t
    return u * u * p0 + 2 * u * t * p1 + t * t * p2
  }

  const next = () => Number(tokens[i++])

  while (i < tokens.length) {
    const token = tokens[i]
    if (/[MLHVQZ]/i.test(token)) {
      command = token
      i++
      if (command === "Z" || command === "z") continue
    }

    switch (command) {
      case "M":
      case "L": {
        x = next()
        y = next()
        see(x)
        break
      }
      case "H": {
        x = next()
        see(x)
        break
      }
      case "V": {
        y = next()
        break
      }
      case "Q": {
        const cx = next()
        const cy = next()
        const nx = next()
        const ny = next()
        see(nx)
        const turn = quadraticTurn(x, cx, nx)
        if (turn !== undefined) see(turn)
        x = nx
        y = ny
        break
      }
      default:
        // Unknown command: consume one number so this cannot spin forever.
        i++
    }
  }

  if (min === Infinity) throw new Error("path contributed no coordinates")
  return { min, max }
}

/* ----------------------------------------------------------------- build */

const source = readFileSync(SOURCE, "utf8")

const viewBox = source.match(/viewBox="([^"]+)"/)?.[1]
if (!viewBox) throw new Error("no viewBox on the source SVG")
const [, , viewWidth, viewHeight] = viewBox.split(/\s+/).map(Number)

/*
 * The whole drawing sits inside one group that flips it upright and nudges it
 * to the left edge. The mask rectangles are placed outside that group, so the
 * same shift has to be applied to their coordinates by hand.
 */
const groupTransform = source.match(/<g transform="([^"]+)"/)?.[1]
const shiftX = Number(groupTransform?.match(/translate\(([-\d.]+)/)?.[1])
if (!Number.isFinite(shiftX))
  throw new Error("no group transform to account for")

const paths = [
  ...source.matchAll(
    /<path\s+id="(outline-\d+)"\s+data-char="([^"]*)"\s+transform="translate\(([-\d.]+)\s+[-\d.]+\)"\s+d="([^"]+)"/g
  ),
].map(([, id, char, tx, d]) => {
  const extent = horizontalExtent(d)
  const offset = Number(tx) + shiftX
  return {
    id,
    char,
    d,
    tx: Number(tx),
    left: extent.min + offset,
    right: extent.max + offset,
  }
})

if (paths.length === 0) throw new Error("no lettering found in the source SVG")

const rects = paths.map((glyph, index) => {
  const x = glyph.left - PAD_X
  const width = glyph.right - glyph.left + PAD_X * 2
  return `      <rect style="--i:${index}" x="${x.toFixed(2)}" y="${-PAD_Y}" width="${width.toFixed(2)}" height="${(viewHeight + PAD_Y * 2).toFixed(2)}" fill="#fff"/>`
})

const lettering = paths
  .map(
    (glyph) =>
      `      <path data-char="${glyph.char}" d="${glyph.d}" transform="translate(${glyph.tx.toFixed(2)} 0)"/>`
  )
  .join("\n")

const markup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="xMinYMid meet" aria-hidden="true">
  <defs>
    <mask id="wordmark-wipe" maskUnits="userSpaceOnUse">
${rects.join("\n")}
    </mask>
  </defs>
  <g class="mark__ghost">
    <g transform="${groupTransform}">
${lettering}
    </g>
  </g>
  <g class="mark__draw" mask="url(#wordmark-wipe)">
    <g transform="${groupTransform}">
${lettering}
    </g>
  </g>
</svg>
`

writeFileSync(OUTPUT, markup)

/* ---------------------------------------------------------------- report */

console.log(`wrote ${OUTPUT}`)
console.log(`  ${paths.length} letters · viewBox ${viewWidth} × ${viewHeight}`)
for (const [index, glyph] of paths.entries()) {
  const overlap =
    index > 0 && glyph.left - PAD_X < paths[index - 1].right + PAD_X
      ? "  ← mask overlaps the letter before it"
      : ""
  console.log(
    `  ${String(index).padStart(2)} ${JSON.stringify(glyph.char).padEnd(5)} ` +
      `${glyph.left.toFixed(1).padStart(8)} → ${glyph.right.toFixed(1).padStart(8)}${overlap}`
  )
}
