import { describe, expect, it } from "vitest"

import {
  firstSentence,
  formatDate,
  formatDateShort,
  formatMonths,
  formatYears,
  resolvePostDate,
  toDateAttribute,
} from "./format"

describe("resolvePostDate", () => {
  const pubDate = new Date("2026-01-10T00:00:00Z")

  it("shows the publication date when nothing newer exists", () => {
    expect(resolvePostDate({ pubDate })).toEqual({
      date: pubDate,
      kind: "published",
    })
  })

  it("prefers explicit frontmatter over the git timestamp", () => {
    // This precedence is the whole point: hosts that shallow-clone (Vercel
    // clones at depth 2 and will not let you change it) resolve `git log` to
    // the wrong commit, so an author's explicit date has to win.
    const updatedDate = new Date("2026-03-01T00:00:00Z")
    const result = resolvePostDate({
      pubDate,
      updatedDate,
      lastModified: "2026-09-09T00:00:00Z",
    })
    expect(result).toEqual({ date: updatedDate, kind: "updated" })
  })

  it("falls back to the git timestamp when frontmatter is absent", () => {
    const result = resolvePostDate({
      pubDate,
      lastModified: "2026-02-02T00:00:00Z",
    })
    expect(result.kind).toBe("updated")
    expect(result.date.toISOString()).toBe("2026-02-02T00:00:00.000Z")
  })

  it("ignores an update that predates publication", () => {
    // A shallow clone reports the checkout commit, which is frequently older
    // than the post. Showing "Updated" with an earlier date is worse than
    // showing nothing.
    const result = resolvePostDate({
      pubDate,
      lastModified: "2020-01-01T00:00:00Z",
    })
    expect(result).toEqual({ date: pubDate, kind: "published" })
  })

  it("ignores an unparseable git timestamp", () => {
    const result = resolvePostDate({ pubDate, lastModified: "not a date" })
    expect(result).toEqual({ date: pubDate, kind: "published" })
  })
})

describe("date formatting", () => {
  const date = new Date("2026-03-05T12:00:00Z")

  it("renders in the active locale", () => {
    expect(formatDate(date, "en")).toContain("March")
    expect(formatDate(date, "id")).toContain("Maret")
  })

  it("has a short form for list rows", () => {
    expect(formatDateShort(date, "en")).toMatch(/Mar/)
  })

  it("emits a machine-readable datetime attribute", () => {
    expect(toDateAttribute(date)).toBe("2026-03-05")
  })
})

describe("formatYears", () => {
  it("shortens a span to one readable range", () => {
    expect(formatYears({ start: "2023-02", end: "2026-01" })).toBe("2023–26")
  })

  it("prints a single year once, not as a range onto itself", () => {
    expect(formatYears({ start: "2024-11", end: "2024-12" })).toBe("2024")
    expect(formatYears({ start: "2021" })).toBe("2021")
  })

  it("leaves a current role open-ended", () => {
    expect(formatYears({ start: "2023-02", ongoing: true })).toBe("2023–")
  })
})

describe("formatMonths", () => {
  it("names both ends", () => {
    expect(
      formatMonths({ start: "2023-02", end: "2026-01" }, "en", "Present")
    ).toBe("Feb 2023 – Jan 2026")
  })

  it("says present rather than inventing an end", () => {
    expect(
      formatMonths({ start: "2024-11", ongoing: true }, "en", "Present")
    ).toBe("Nov 2024 – Present")
  })

  it("takes the word for present from the caller, so it can be translated", () => {
    expect(
      formatMonths({ start: "2024-11", ongoing: true }, "id", "Sekarang")
    ).toContain("Sekarang")
  })

  it("returns nothing when a month is not known", () => {
    // The row then shows its years and no detail line, rather than a month
    // somebody guessed to fill the space.
    expect(formatMonths({ start: "2021" }, "en", "Present")).toBeUndefined()
    expect(
      formatMonths({ start: "2023-02", end: "2026" }, "en", "Present")
    ).toBeUndefined()
  })

  it("is not moved onto the previous month by a timezone", () => {
    expect(formatMonths({ start: "2026-01" }, "en", "Present")).toBe("Jan 2026")
  })
})

describe("firstSentence", () => {
  it("keeps the opening sentence and drops its full stop", () => {
    expect(
      firstSentence("Where I live. Three years of it as the only person.")
    ).toBe("Where I live")
  })

  it("does not end a sentence at a stop inside a word or a number", () => {
    expect(firstSentence("Mostly Next.js, about 3.5 years. Then Go.")).toBe(
      "Mostly Next.js, about 3.5 years"
    )
  })

  it("returns a single sentence without its stop", () => {
    expect(firstSentence("Growing, deliberately.")).toBe(
      "Growing, deliberately"
    )
  })

  it("returns text with no stop as it was", () => {
    expect(firstSentence("I direct it")).toBe("I direct it")
  })
})
