import { describe, expect, it } from "vitest"

import { cn } from "./utils"

/**
 * These pin down the one thing about `cn` that is not obvious: it has to be
 * told what this project's scales are called, or it does not recognise a
 * conflict and quietly keeps both classes.
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
    expect(cn("text-body", "text-ink")).toBe("text-body text-ink")
  })

  it("still lets a later size replace an earlier one", () => {
    expect(cn("text-display-s", "text-display-l")).toBe("text-display-l")
    expect(cn("text-ui", "text-read")).toBe("text-read")
    expect(cn("text-ui", "text-body")).toBe("text-body")
  })

  it("still lets a later colour replace an earlier one", () => {
    expect(cn("text-ink", "text-ink-muted")).toBe("text-ink-muted")
  })

  it("lets a caller replace a width the component set", () => {
    // `max-w-none` is Tailwind's own name and `max-w-measure` is ours, so
    // without help these are two unrelated classes and the stylesheet decides.
    // That shipped once: prose ran the full width of the page.
    expect(cn("max-w-none", "max-w-measure")).toBe("max-w-measure")
    expect(cn("max-w-measure", "max-w-none")).toBe("max-w-none")
  })

  it("recognises the renamed scales as scales", () => {
    expect(cn("p-5", "p-page-margin")).toBe("p-page-margin")
    expect(cn("rounded-panel", "rounded-control")).toBe("rounded-control")
    expect(cn("font-body", "font-label")).toBe("font-label")
    expect(cn("ease-state", "ease-reveal")).toBe("ease-reveal")
    expect(cn("size-tap", "size-9")).toBe("size-9")
  })

  it("merges the named durations with Tailwind's numbered ones", () => {
    expect(cn("duration-fast", "duration-slow")).toBe("duration-slow")
    expect(cn("duration-fast", "duration-200")).toBe("duration-200")
    expect(cn("duration-200", "duration-mid")).toBe("duration-mid")
  })

  it("drops duplicates", () => {
    expect(cn("text-ui", "text-ui")).toBe("text-ui")
  })
})
