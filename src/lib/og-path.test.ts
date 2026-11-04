import { describe, expect, it } from "vitest"

import { ogImagePath } from "./og-path"

describe("ogImagePath", () => {
  it("gives each language a home card", () => {
    expect(ogImagePath("en")).toBe("/og/en.png")
    expect(ogImagePath("id")).toBe("/og/id.png")
  })

  it("gives a case study or a post a card of its own", () => {
    expect(ogImagePath("en", { section: "work", slug: "nabitu" })).toBe(
      "/og/en/work/nabitu.png"
    )
    expect(
      ogImagePath("id", { section: "writing", slug: "at-most-once" })
    ).toBe("/og/id/writing/at-most-once.png")
  })
})
