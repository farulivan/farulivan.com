/**
 * How wide a screenshot is allowed to be shown.
 *
 * A capture of a website is only as sharp as the screen it was taken on, and
 * most are taken at 1× — about 1,000 to 1,700 pixels across. Laid across a
 * 1440 window on a 2× screen, that is every pixel stretched to nearly three,
 * and the text inside the picture goes soft in a way that reads as careless
 * rather than as low resolution.
 *
 * So a screenshot is never shown wider than two thirds of its own width in
 * pixels. On a 2× screen that is a stretch of a third, which is about where
 * type in a capture of an interface stops looking crisp; on a 1× screen it is
 * sharper than the source. The cap follows the file, so a sharper capture
 * lifts it with no change here.
 */

/** Source pixels per CSS pixel at the widest a screenshot may be shown. */
export const SCREENSHOT_DENSITY = 1.5

/** The widest, in CSS pixels, a capture this many pixels across may appear. */
export function screenshotMaxWidth(pixelWidth: number): number {
  return Math.round(pixelWidth / SCREENSHOT_DENSITY)
}
