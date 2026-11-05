import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import {
  fillHashes,
  HASHES_PLACEHOLDER,
  inlineScriptHashes,
  MAX_HEADERS_LINE,
} from "./csp"

// The example in the CSP specification, so the hash is checked against a
// value worked out somewhere other than this code.
const SPEC_SCRIPT = "alert('Hello, world.');"
const SPEC_HASH = "'sha256-qznLcsROx4GACP2dm0UCKCzCG+HiZ1guq6ZZDob/Tng='"

describe("inlineScriptHashes", () => {
  it("hashes an inline script the way the browser does", () => {
    expect(inlineScriptHashes(`<script>${SPEC_SCRIPT}</script>`)).toEqual([
      SPEC_HASH,
    ])
  })

  it("hashes module scripts, which is how Astro inlines its own", () => {
    expect(
      inlineScriptHashes(`<script type="module">${SPEC_SCRIPT}</script>`)
    ).toEqual([SPEC_HASH])
  })

  it("hashes the exact text, whitespace included", () => {
    const [padded] = inlineScriptHashes(`<script>\n${SPEC_SCRIPT}\n</script>`)
    expect(padded).not.toBe(SPEC_HASH)
  })

  it("skips scripts loaded from a file, which 'self' or a host allows", () => {
    expect(
      inlineScriptHashes(`<script type="module" src="/_astro/a.js"></script>`)
    ).toEqual([])
  })

  it("skips JSON-LD, which the browser never runs", () => {
    expect(
      inlineScriptHashes(
        `<script type="application/ld+json">{"@type":"WebSite"}</script>`
      )
    ).toEqual([])
  })

  it.each([
    ["a space", "</script >"],
    ["a tab and a newline", "</script\t\n>"],
    ["an attribute", "</script foo>"],
    ["capitals", "</SCRIPT>"],
  ])(
    "ends the script where the browser does, at an end tag with %s",
    (_, end) => {
      const html = `<script>${SPEC_SCRIPT}${end}<p>after</p><script>b()</script>`
      expect(inlineScriptHashes(html)[0]).toBe(SPEC_HASH)
    }
  )

  it("does not end the script at a longer tag name", () => {
    const html = `<script>a = "</scripts>"; ${SPEC_SCRIPT}</script>`
    expect(inlineScriptHashes(html)).toHaveLength(1)
    expect(inlineScriptHashes(html)[0]).not.toBe(SPEC_HASH)
  })

  it("returns one hash per script, in page order", () => {
    const html = `<script>a()</script><p>text</p><script type="module">b()</script>`
    expect(inlineScriptHashes(html)).toHaveLength(2)
  })
})

describe("fillHashes", () => {
  const headers = `/*\n  Content-Security-Policy-Report-Only: script-src 'self' ${HASHES_PLACEHOLDER}\n`

  it("puts the hashes where the placeholder was, deduplicated and sorted", () => {
    const filled = fillHashes(headers, [
      "'sha256-b'",
      "'sha256-a'",
      "'sha256-b'",
    ])
    expect(filled).toContain("script-src 'self' 'sha256-a' 'sha256-b'\n")
    expect(filled).not.toContain(HASHES_PLACEHOLDER)
  })

  it("refuses a file that has lost its placeholder", () => {
    expect(() => fillHashes("/*\n  X-Frame-Options: DENY\n", [])).toThrow(
      /placeholder/
    )
  })

  it("refuses a line Cloudflare would ignore for its length", () => {
    const many = Array.from(
      { length: 60 },
      (_, i) => `'sha256-${"x".repeat(43)}${i}'`
    )
    expect(many.join(" ").length).toBeGreaterThan(MAX_HEADERS_LINE)
    expect(() => fillHashes(headers, many)).toThrow(/limit/)
  })
})

describe("public/_headers", () => {
  it("still has the placeholder the build fills in", () => {
    const file = readFileSync("public/_headers", "utf8")
    expect(file.split(HASHES_PLACEHOLDER)).toHaveLength(2)
  })
})
