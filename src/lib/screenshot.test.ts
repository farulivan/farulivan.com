import { describe, expect, it } from "vitest"

import {
  SCREENSHOT_DENSITY,
  SCREENSHOT_MAX_WIDTH,
  screenshotMaxWidth,
} from "./screenshot"

describe("screenshotMaxWidth", () => {
  it("allows two thirds of a 1x capture's width", () => {
    expect(SCREENSHOT_DENSITY).toBe(1.5)
    expect(screenshotMaxWidth(1038)).toBe(692)
    expect(screenshotMaxWidth(1603)).toBe(1069)
  })

  it("stops a sharp capture at the ceiling rather than letting it fill the band", () => {
    expect(SCREENSHOT_MAX_WIDTH).toBe(1120)
    expect(screenshotMaxWidth(2880)).toBe(1120)
    expect(screenshotMaxWidth(1708)).toBe(1120)
  })

  it("rounds to a whole pixel", () => {
    expect(Number.isInteger(screenshotMaxWidth(1552))).toBe(true)
  })
})
