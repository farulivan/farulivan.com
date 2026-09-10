import { describe, expect, it } from "vitest"

import {
  getLangFromPath,
  isLocale,
  langParam,
  localizePath,
  stripLocale,
  switchLocalePath,
  useTranslations,
} from "./utils"

describe("getLangFromPath", () => {
  it("reads a prefixed locale", () => {
    expect(getLangFromPath("/id/writing")).toBe("id")
    expect(getLangFromPath("/id")).toBe("id")
  })

  it("treats an unprefixed path as the default locale", () => {
    expect(getLangFromPath("/")).toBe("en")
    expect(getLangFromPath("/writing")).toBe("en")
  })

  it("does not mistake an ordinary first segment for a locale", () => {
    // The bug this guards: a future page at /it/... or a slug that happens to
    // look like a language code silently switching the site's language.
    expect(getLangFromPath("/writing/id")).toBe("en")
    expect(getLangFromPath("/index")).toBe("en")
  })
})

describe("localizePath", () => {
  it("leaves the default locale unprefixed", () => {
    expect(localizePath("/writing", "en")).toBe("/writing")
    expect(localizePath("/", "en")).toBe("/")
  })

  it("prefixes other locales", () => {
    expect(localizePath("/writing", "id")).toBe("/id/writing")
    // No trailing slash: the site is configured trailingSlash: "never".
    expect(localizePath("/", "id")).toBe("/id")
  })

  it("normalizes duplicate and missing slashes", () => {
    expect(localizePath("writing", "id")).toBe("/id/writing")
    expect(localizePath("//writing//", "en")).toBe("/writing")
  })
})

describe("switchLocalePath", () => {
  it("keeps the reader on the same page", () => {
    // The classic bug in hand-rolled language switchers is dumping the reader
    // on the home page; this is the test that stops it coming back.
    expect(switchLocalePath("/writing/my-post", "id")).toBe(
      "/id/writing/my-post"
    )
    expect(switchLocalePath("/id/writing/my-post", "en")).toBe(
      "/writing/my-post"
    )
  })

  it("round-trips", () => {
    const original = "/writing/page/2"
    expect(switchLocalePath(switchLocalePath(original, "id"), "en")).toBe(
      original
    )
  })
})

describe("stripLocale", () => {
  it("removes only a leading locale segment", () => {
    expect(stripLocale("/id/writing")).toBe("/writing")
    expect(stripLocale("/writing")).toBe("/writing")
    expect(stripLocale("/writing/id")).toBe("/writing/id")
  })
})

describe("langParam", () => {
  it("is undefined for the default locale so the route stays unprefixed", () => {
    expect(langParam("en")).toBeUndefined()
    expect(langParam("id")).toBe("id")
  })
})

describe("isLocale", () => {
  it("rejects anything not declared", () => {
    expect(isLocale("en")).toBe(true)
    expect(isLocale("fr")).toBe(false)
    expect(isLocale(undefined)).toBe(false)
    expect(isLocale(42)).toBe(false)
  })
})

describe("useTranslations", () => {
  it("returns the string for the active locale", () => {
    expect(useTranslations("en")("nav.writing")).toBe("Writing")
    expect(useTranslations("id")("nav.writing")).toBe("Tulisan")
  })

  it("substitutes placeholders", () => {
    expect(useTranslations("en")("writing.readingTime", { minutes: 4 })).toBe(
      "4 min read"
    )
    expect(
      useTranslations("id")("pagination.status", { current: 2, total: 5 })
    ).toBe("Halaman 2 dari 5")
  })

  it("leaves an unsupplied placeholder intact rather than printing undefined", () => {
    expect(useTranslations("en")("writing.readingTime")).toBe(
      "{minutes} min read"
    )
  })
})

describe("localizePath with hashes and queries", () => {
  it("keeps an in-page anchor attached without a stray slash", () => {
    // "/id/#pricing" is what naive joining produces, and it appeared on every
    // Indonesian page's hero and closing call to action.
    expect(localizePath("/#pricing", "id")).toBe("/id#pricing")
    expect(localizePath("/#pricing", "en")).toBe("/#pricing")
  })

  it("handles an anchor on a nested path", () => {
    expect(localizePath("/writing#top", "id")).toBe("/id/writing#top")
    expect(localizePath("/writing#top", "en")).toBe("/writing#top")
  })

  it("preserves a query string", () => {
    expect(localizePath("/writing?tag=process", "id")).toBe(
      "/id/writing?tag=process"
    )
  })

  it("still returns the bare root", () => {
    expect(localizePath("/", "en")).toBe("/")
    expect(localizePath("/", "id")).toBe("/id")
  })
})
