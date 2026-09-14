import { describe, expect, it } from "vitest"

import {
  capabilitySchema,
  experienceSchema,
  postSchema,
  projectSchema,
  LOCALES,
} from "./schemas"

/**
 * The kernel's tests. They pin down the rules that both the build and the UI
 * depend on, and they need no Astro, no DOM and no build to run.
 *
 * `image()` is supplied by Astro at build time, so it is stubbed here with a
 * schema that accepts anything — these tests are about the surrounding rules,
 * and image resolution is Astro's job, not ours.
 */
import { z } from "astro/zod"

const image = () => z.any() as never
const post = postSchema({ image })

const validPost = {
  lang: "en",
  translationKey: "hello",
  title: "A reasonable title",
  description:
    "A description comfortably inside the fifty-to-one-hundred-sixty character window search engines display.",
  pubDate: "2026-01-15",
}

describe("postSchema", () => {
  it("accepts a well-formed post and coerces the date", () => {
    const result = post.parse(validPost)
    expect(result.pubDate).toBeInstanceOf(Date)
    expect(result.pubDate.getUTCFullYear()).toBe(2026)
  })

  it("defaults draft to false and tags to an empty list", () => {
    const result = post.parse(validPost)
    expect(result.draft).toBe(false)
    expect(result.tags).toEqual([])
  })

  it("rejects a description below the SEO minimum", () => {
    expect(() =>
      post.parse({ ...validPost, description: "Too short." })
    ).toThrow()
  })

  it("rejects a description above the SEO maximum", () => {
    expect(() =>
      post.parse({ ...validPost, description: "x".repeat(161) })
    ).toThrow()
  })

  it("rejects a title longer than search engines will show", () => {
    expect(() => post.parse({ ...validPost, title: "x".repeat(71) })).toThrow()
  })

  it("rejects an unknown locale", () => {
    expect(() => post.parse({ ...validPost, lang: "fr" })).toThrow()
  })

  it("requires a translationKey, since URLs and hreflang are built from it", () => {
    expect(() => post.parse({ ...validPost, translationKey: "" })).toThrow()
  })

  it("requires alt text whenever a hero image is present", () => {
    expect(() =>
      post.parse({ ...validPost, hero: { src: "./a.png" } })
    ).toThrow()
    expect(() =>
      post.parse({ ...validPost, hero: { src: "./a.png", alt: "" } })
    ).toThrow()
    expect(
      post.parse({ ...validPost, hero: { src: "./a.png", alt: "A chart" } })
    ).toBeTruthy()
  })
})

describe("LOCALES", () => {
  it("lists the default locale first, which the fallback logic relies on", () => {
    expect(LOCALES[0]).toBe("en")
  })
})

const project = projectSchema({ image })

const validProject = {
  lang: "en",
  translationKey: "example-project",
  title: "Example Project",
  summary:
    "A short sentence about the project, comfortably inside the length the schema allows.",
  year: 2025,
  role: "Lead frontend engineer",
  stack: ["TypeScript", "React"],
  order: 1,
  outcome: { summary: "Support tickets asking for a report fell away." },
}

describe("projectSchema", () => {
  it("accepts a project with no screenshot, since some work never gets one", () => {
    const result = project.parse(validProject)
    expect(result.screenshot).toBeUndefined()
  })

  it("defaults featured to false and the outcome figures to an empty list", () => {
    const result = project.parse(validProject)
    expect(result.featured).toBe(false)
    expect(result.outcome.figures).toEqual([])
  })

  it("rejects a project with no outcome, which is the point of the block", () => {
    const withoutOutcome: Record<string, unknown> = { ...validProject }
    delete withoutOutcome.outcome
    expect(() => project.parse(withoutOutcome)).toThrow()
  })

  it("rejects an outcome that has figures but no sentence", () => {
    expect(() =>
      project.parse({
        ...validProject,
        outcome: { figures: [{ value: "-64%", caption: "Support tickets" }] },
      })
    ).toThrow()
  })

  it("keeps outcome figures as text, because they are not all the same quantity", () => {
    const result = project.parse({
      ...validProject,
      outcome: {
        summary: "Faster, and fewer of them.",
        figures: [
          { value: "1.1s", caption: "Time to first report" },
          { value: "3×", caption: "Reports run per day" },
        ],
      },
    })
    expect(result.outcome.figures.map((f) => f.value)).toEqual(["1.1s", "3×"])
  })

  it("requires at least one thing in the stack", () => {
    expect(() => project.parse({ ...validProject, stack: [] })).toThrow()
  })

  it("rejects a live URL that is not a URL", () => {
    expect(() =>
      project.parse({ ...validProject, liveUrl: "example.com" })
    ).toThrow()
  })
})

describe("experienceSchema", () => {
  const validRole = {
    lang: "en",
    translationKey: "current",
    year: 2024,
    role: "Senior Frontend Engineer",
    company: "A payments company",
    description: "Led the rebuild of the merchant console.",
    order: 1,
  }

  it("accepts a well-formed role", () => {
    expect(experienceSchema.parse(validRole).year).toBe(2024)
  })

  it("rejects a description longer than the two lines the row is drawn at", () => {
    expect(() =>
      experienceSchema.parse({ ...validRole, description: "x".repeat(241) })
    ).toThrow()
  })
})

describe("capabilitySchema", () => {
  const validGroup = {
    lang: "en",
    translationKey: "craft",
    domain: "Interface",
    items: ["TypeScript", "React"],
    order: 1,
  }

  it("accepts a well-formed group", () => {
    expect(capabilitySchema.parse(validGroup).items).toHaveLength(2)
  })

  it("rejects a domain with nothing under it", () => {
    expect(() => capabilitySchema.parse({ ...validGroup, items: [] })).toThrow()
  })
})
