import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { describe, expect, it } from "vitest"

import Icon from "./Icon.astro"
import { ICON_NAMES } from "./icons"

const render = async (props: Record<string, unknown>) => {
  const container = await AstroContainer.create()
  return container.renderToString(Icon, { props })
}

describe("Icon", () => {
  // Walks the registry rather than naming one icon, so an entry added later
  // with a typo in its path data fails here instead of rendering an empty box.
  it.each(ICON_NAMES)("draws %s", async (name) => {
    const html = await render({ name })
    expect(html).toContain("<svg")
    expect(html).toMatch(/<(path|circle)/)
  })

  it("is hidden from assistive tech unless given a label", async () => {
    expect(await render({ name: "menu" })).toContain('aria-hidden="true"')

    const labelled = await render({ name: "menu", label: "Open menu" })
    expect(labelled).toContain('aria-label="Open menu"')
    expect(labelled).toContain('role="img"')
    expect(labelled).not.toContain("aria-hidden")
  })

  it("forwards data attributes to the rendered SVG", async () => {
    // Regression test. Icon used to accept only `name`, `class` and `label`
    // and silently dropped everything else, so a `data-` hook a component
    // relied on never reached the DOM and the CSS keyed to it matched
    // nothing. Nothing failed loudly; it just looked broken.
    const html = await render({ name: "close", "data-menu-icon": "closed" })
    expect(html).toContain('data-menu-icon="closed"')
  })

  it("keeps the caller's class", async () => {
    expect(await render({ name: "check", class: "size-4" })).toContain("size-4")
  })
})
