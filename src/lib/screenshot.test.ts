import { describe, expect, it } from "vitest"

import { SCREENSHOT_DENSITY, screenshotMaxWidth } from "./screenshot"

describe("screenshotMaxWidth", () => {
  it("allows two thirds of the capture's width", () => {
    expect(SCREENSHOT_DENSITY).toBe(1.5)
    expect(screenshotMaxWidth(1038)).toBe(692)
    expect(screenshotMaxWidth(1708)).toBe(1139)
  })

  it("lifts the cap when the capture is sharper", () => {
    expect(screenshotMaxWidth(2880)).toBe(1920)
  })

  it("rounds to a whole pixel", () => {
    expect(Number.isInteger(screenshotMaxWidth(1603))).toBe(true)
  })
})
