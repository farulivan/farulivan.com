import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { describe, expect, it } from "vitest"

import Pill from "./Pill.astro"

const render = async (props: Record<string, unknown>) => {
  const container = await AstroContainer.create()
  return container.renderToString(Pill, { props })
}

describe("Pill", () => {
  it("renders a button unless given somewhere to go", async () => {
    const html = await render({ label: "Menu" })
    expect(html).toContain("<button")
    expect(html).toContain('type="button"')
  })

  it("renders a real link when given href, with no button type on it", async () => {
    const html = await render({ label: "Home", href: "/" })
    expect(html).toContain("<a")
    expect(html).toContain('href="/"')
    expect(html).not.toContain("<button")
    expect(html).not.toContain("type=")
  })

  it("names itself on the element, since the visible text is hidden from assistive tech", async () => {
    const html = await render({ label: "Menu" })
    expect(html).toContain('aria-label="Menu"')
    expect(html).toContain('aria-hidden="true"')
  })

  // The menu pill sheds its words on a phone and keeps the circle. A call to
  // action in the middle of a page cannot, or a phone sees an unlabelled arrow.
  it("drops its text on the narrowest screens unless told to keep it", async () => {
    expect(await render({ label: "Menu" })).toContain("max-[479px]:hidden")
    expect(
      await render({ label: "Home", href: "/", keepLabel: true })
    ).not.toContain("max-[479px]:hidden")
  })

  it("passes the language of a link through to the anchor", async () => {
    const html = await render({
      label: "Ke halaman utama",
      href: "/id",
      lang: "id",
      hreflang: "id",
    })
    expect(html).toContain('lang="id"')
    expect(html).toContain('hreflang="id"')
  })
})
