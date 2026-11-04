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

  it("passes a download filename through, so the CV saves under a real name", async () => {
    const html = await render({
      label: "Download my CV",
      href: "/cv.pdf",
      download: "farul-ivan-cv.pdf",
    })
    expect(html).toContain('download="farul-ivan-cv.pdf"')
  })

  it("opens a link that leaves the site in a new tab, and says so to a screen reader only", async () => {
    const html = await render({
      label: "Visit the live site",
      href: "https://example.com",
      externalLabel: "(opens in a new tab)",
    })
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
    expect(html).toContain(
      'aria-label="Visit the live site (opens in a new tab)"'
    )
    expect(html).toContain('data-text="Visit the live site"')
  })
})
