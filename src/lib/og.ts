/**
 * Link-preview cards, drawn at build time.
 *
 * In a job search the preview LinkedIn, Slack or an email client draws for a
 * link is often the first thing anyone sees of the site. Every page used to
 * share one picture of the monogram, with no role and nothing about the page.
 * Each page now gets a 1200×630 card in Lexend and the site's colours: who and
 * what on the home card, the title, the lead figure and the work itself on a
 * case study, the title and date on a post.
 *
 * Drawn with Satori, which lays out plain element objects and turns the text
 * into outlines, so the result does not depend on what fonts the build
 * machine has, then rasterised with sharp, which the image pipeline already
 * uses. Both run only while the site builds. Nothing here reaches a browser.
 *
 * Plain objects rather than JSX: the site has no `.tsx` anywhere, and three
 * small layouts do not need it.
 */
import { readFile } from "node:fs/promises"
import { join } from "node:path"

import satori from "satori"
import sharp from "sharp"

import { OG_HEIGHT, OG_WIDTH } from "./og-size"

/*
 * The palette as hex. The renderer reads neither custom properties nor
 * oklch, so these are copied from the tokens in global.css: paper, ink, the
 * muted ink, the surface grey, the hairline and lime-300.
 */
const color = {
  paper: "#ffffff",
  ink: "#1d1d1d",
  muted: "#6e6e6e",
  surface: "#f5f5f5",
  rule: "rgba(29, 29, 29, 0.15)",
  lime: "#bbf451",
}

/* The page margin, at the size of the card rather than of a window. */
const MARGIN = 64

type Style = Record<string, string | number>
type Child = Element | string
interface Element {
  type: string
  key: null
  props: {
    style?: Style
    src?: string
    width?: number
    height?: number
    children?: Child[]
  }
}

function el(
  type: string,
  style: Style,
  ...children: (Child | false | undefined)[]
): Element {
  return {
    type,
    key: null,
    props: {
      style,
      children: children.filter((child): child is Child => Boolean(child)),
    },
  }
}

/* Lexend at the three weights the cards use, read once per build. */
const WEIGHTS = [300, 400, 500] as const
let fonts:
  | Promise<{ name: string; data: Buffer; weight: (typeof WEIGHTS)[number] }[]>
  | undefined

function loadFonts() {
  fonts ??= Promise.all(
    WEIGHTS.map(async (weight) => ({
      name: "Lexend",
      weight,
      data: await readFile(
        join(
          process.cwd(),
          "node_modules/@fontsource/lexend/files",
          `lexend-latin-${weight}-normal.woff`
        )
      ),
    }))
  )
  return fonts
}

async function toPng(tree: Element): Promise<Buffer> {
  const svg = await satori(tree, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: (await loadFonts()).map((font) => ({ ...font, style: "normal" })),
  })
  return sharp(Buffer.from(svg)).png().toBuffer()
}

/* Small uppercase type with open tracking: the site's label. */
const labelType: Style = {
  fontSize: 22,
  fontWeight: 500,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
}

/* The filled square and a label, as every section header on the site. */
function label(text: string): Element {
  return el(
    "div",
    { display: "flex", alignItems: "center", gap: 14, ...labelType },
    el("div", { width: 12, height: 12, backgroundColor: color.ink }),
    text
  )
}

/*
 * The card's ground, and a box inset from it by the margin that holds the
 * layout. Inset rather than padded: the renderer adds padding outside a
 * box's width, so a padded 1200 came out 1328 wide and the bottom row and
 * the right edge of every card fell off the canvas.
 */
function canvas(
  background: string,
  layout: Style,
  ...children: (Element | false | undefined)[]
): Element {
  return el(
    "div",
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      display: "flex",
      position: "relative",
      backgroundColor: background,
      color: color.ink,
      fontFamily: "Lexend",
    },
    el(
      "div",
      {
        position: "absolute",
        top: MARGIN,
        right: MARGIN,
        bottom: MARGIN,
        left: MARGIN,
        display: "flex",
        ...layout,
      },
      ...children
    )
  )
}

/* A column with its first child at the top and its last at the foot. */
const spread: Style = {
  flexDirection: "column",
  justifyContent: "space-between",
}

/** Who, what, and whether I am available: the card for the home page. */
export function homeCard(card: {
  availability: string
  name: string
  role: string
  domain: string
}): Promise<Buffer> {
  return toPng(
    canvas(
      color.paper,
      spread,
      // The availability as the hero's pill, in the lime it fills with there.
      el(
        "div",
        { display: "flex" },
        el(
          "div",
          {
            display: "flex",
            padding: "14px 26px",
            borderRadius: 999,
            backgroundColor: color.lime,
            ...labelType,
          },
          card.availability
        )
      ),
      el(
        "div",
        { display: "flex", flexDirection: "column", gap: 24 },
        el(
          "div",
          {
            fontSize: 176,
            fontWeight: 400,
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
          },
          card.name
        ),
        el(
          "div",
          { fontSize: 44, fontWeight: 300, color: color.muted },
          card.role
        )
      ),
      el(
        "div",
        { display: "flex", color: color.muted, ...labelType },
        card.domain
      )
    )
  )
}

/**
 * The capture as the card shows it: 16:10, cut from the top, at twice the
 * size it is drawn so it stays sharp on a 2× screen, as a data URL.
 */
export async function stageImage(path: string): Promise<string> {
  const data = await sharp(path)
    .resize(888, 555, { fit: "cover", position: "top" })
    .jpeg({ quality: 82 })
    .toBuffer()
  return `data:image/jpeg;base64,${data.toString("base64")}`
}

/** A case study: what it is, the number it is proudest of, and the work. */
export function projectCard(card: {
  kicker: string
  title: string
  figure?: { value: string; caption: string } | undefined
  image?: string | undefined
  domain: string
}): Promise<Buffer> {
  const story = el(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flex: 1,
    },
    label(card.kicker),
    el(
      "div",
      { display: "flex", flexDirection: "column", gap: 36 },
      el(
        "div",
        {
          fontSize: 68,
          fontWeight: 300,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        },
        card.title
      ),
      card.figure &&
        el(
          "div",
          { display: "flex", flexDirection: "column", gap: 10 },
          el(
            "div",
            { fontSize: 88, fontWeight: 300, lineHeight: 1 },
            card.figure.value
          ),
          el("div", { color: color.muted, ...labelType }, card.figure.caption)
        )
    ),
    el(
      "div",
      { display: "flex", color: color.muted, ...labelType },
      card.domain
    )
  )

  // The capture mounted on the grey stage, edged with a hairline, as on the site.
  const stage = card.image
    ? el(
        "div",
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 500,
          backgroundColor: color.surface,
        },
        {
          type: "img",
          key: null,
          props: {
            src: card.image,
            width: 444,
            height: 278,
            style: { border: `1px solid ${color.rule}` },
          },
        }
      )
    : undefined

  return toPng(canvas(color.paper, { gap: 56 }, story, stage))
}

/**
 * A post, on the lime field the writing sits on at the foot of the home
 * page: what it is called and when it was written.
 */
export function postCard(card: {
  kicker: string
  title: string
  date: string
  domain: string
}): Promise<Buffer> {
  return toPng(
    canvas(
      color.lime,
      spread,
      label(card.kicker),
      el(
        "div",
        {
          fontSize: 84,
          fontWeight: 300,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          maxWidth: 1000,
        },
        card.title
      ),
      el(
        "div",
        { display: "flex", justifyContent: "space-between", ...labelType },
        el("div", { display: "flex" }, card.date),
        el("div", { display: "flex" }, card.domain)
      )
    )
  )
}
