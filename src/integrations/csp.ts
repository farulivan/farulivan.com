/**
 * Fills the Content-Security-Policy in dist/_headers with the hash of every
 * inline script the build wrote.
 *
 * Astro inlines small scripts straight into the page, and a policy without
 * 'unsafe-inline' allows an inline script only by its hash. Those hashes
 * change whenever the script does, so they cannot be written by hand: one
 * edited component and the policy would refuse its script. Instead
 * public/_headers holds the policy with a placeholder where the hashes go,
 * and this fills it in from the files that are actually about to ship.
 *
 * Astro's own `security.csp` was the first choice and does not fit. It writes
 * the policy into a meta tag, which can only enforce: it cannot report-only
 * and cannot set frame-ancestors. It also does not support Shiki, which the
 * code blocks use.
 */
import { createHash } from "node:crypto"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

import type { AstroIntegration } from "astro"

/** Where the hashes go in public/_headers. */
export const HASHES_PLACEHOLDER = "{{inline-script-hashes}}"

/** Cloudflare ignores a _headers line longer than this. */
export const MAX_HEADERS_LINE = 2000

/**
 * The types a browser runs. Anything else, like the JSON-LD block, is data,
 * and a policy does not govern it.
 */
const EXECUTABLE_TYPES = new Set([
  "",
  "module",
  "text/javascript",
  "application/javascript",
])

/**
 * A script element: its attributes, then its text. The text ends where the
 * browser ends it, at `</script` followed by whitespace, a slash or `>`, so
 * `</script >` and `</script foo>` close it too. Matching only `</script>`
 * would run on past a script ended any other way and hash the wrong text.
 */
const SCRIPT_ELEMENT = /<script\b([^>]*)>([\s\S]*?)<\/script(?=[\s/>])[^>]*>/gi

/**
 * One `'sha256-…'` source per inline script the browser would run, in page
 * order. The hash covers the text between the tags byte for byte, exactly as
 * the browser hashes it, so a single extra newline is a different hash.
 */
export function inlineScriptHashes(html: string): string[] {
  const hashes: string[] = []
  for (const [, attributes, body] of html.matchAll(SCRIPT_ELEMENT)) {
    if (/\bsrc\s*=/i.test(attributes)) continue
    const type =
      /\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attributes)?.[1]?.toLowerCase() ??
      ""
    if (!EXECUTABLE_TYPES.has(type)) continue
    const digest = createHash("sha256").update(body, "utf8").digest("base64")
    hashes.push(`'sha256-${digest}'`)
  }
  return hashes
}

/**
 * The _headers file with the placeholder replaced by the hashes, deduplicated
 * and sorted so the same build always writes the same file. Throws rather
 * than ship a policy that would refuse the site's own scripts: when the
 * placeholder is gone, or when the line outgrows what Cloudflare reads.
 */
export function fillHashes(headers: string, hashes: Iterable<string>): string {
  if (!headers.includes(HASHES_PLACEHOLDER)) {
    throw new Error(
      `public/_headers has no ${HASHES_PLACEHOLDER} placeholder, so the Content-Security-Policy would allow none of the site's inline scripts.`
    )
  }
  const sources = [...new Set(hashes)].sort().join(" ")
  const filled = headers.replaceAll(HASHES_PLACEHOLDER, () => sources)
  const tooLong = filled
    .split("\n")
    .find((line) => line.length > MAX_HEADERS_LINE)
  if (tooLong) {
    throw new Error(
      `A line in _headers is ${tooLong.length} characters, over Cloudflare's limit of ${MAX_HEADERS_LINE}, and it would be ignored: ${tooLong.slice(0, 80)}…`
    )
  }
  return filled
}

export function cspHashes(): AstroIntegration {
  return {
    name: "csp-hashes",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const root = fileURLToPath(dir)
        const pages = (await readdir(root, { recursive: true })).filter(
          (file) => file.endsWith(".html")
        )
        const hashes = new Set<string>()
        for (const page of pages) {
          const html = await readFile(join(root, page), "utf8")
          for (const hash of inlineScriptHashes(html)) hashes.add(hash)
        }
        const path = join(root, "_headers")
        await writeFile(path, fillHashes(await readFile(path, "utf8"), hashes))
        logger.info(
          `${hashes.size} inline script hashes from ${pages.length} pages written to the Content-Security-Policy`
        )
      },
    },
  }
}
