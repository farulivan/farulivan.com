import { describe, expect, it } from "vitest"

import { cn } from "./utils"

/**
 * These pin down the one thing about `cn` that is not obvious: it has to be
 * told what this project's type sizes are called, or it mistakes them for
 * colours.
 */
describe("cn", () => {
  it("keeps a colour and a type size together", () => {
    // The failure this guards against is silent: tailwind-merge files every
    // `text-*` class under one heading unless told otherwise, so one of these
    // simply disappears and the element renders in the wrong colour.
    expect(cn("text-ink", "text-label")).toBe("text-ink text-label")
    expect(cn("text-label", "text-ink")).toBe("text-label text-ink")
    expect(cn("text-ink-muted", "text-micro")).toBe("text-ink-muted text-micro")
    expect(cn("text-h-l", "text-ink-invert")).toBe("text-h-l text-ink-invert")
  })

  it("still lets a later size replace an earlier one", () => {
    expect(cn("text-display-s", "text-display-l")).toBe("text-display-l")
    expect(cn("text-ui", "text-read")).toBe("text-read")
  })

  it("still lets a later colour replace an earlier one", () => {
    expect(cn("text-ink", "text-ink-muted")).toBe("text-ink-muted")
  })

  it("drops duplicates", () => {
    expect(cn("text-ui", "text-ui")).toBe("text-ui")
  })
})
