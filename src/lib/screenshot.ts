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
 *
 * It only lifts so far. A 2× capture is 2,880 pixels across, which the rule
 * above would let run to 1,920 — the full width of the band on any laptop, at
 * which point the picture stops being a plate on a stage and is a banner
 * again. 1,120 leaves the stage showing around it at 1440, and it is where
 * the sharpest 1× capture already stopped, so a page does not change shape
 * when its picture is replaced with a sharper one.
 */

/** Source pixels per CSS pixel at the widest a screenshot may be shown. */
export const SCREENSHOT_DENSITY = 1.5

/** No screenshot is shown wider than this, however sharp the capture. */
export const SCREENSHOT_MAX_WIDTH = 1120

/** The widest, in CSS pixels, a capture this many pixels across may appear. */
export function screenshotMaxWidth(pixelWidth: number): number {
  return Math.min(
    Math.round(pixelWidth / SCREENSHOT_DENSITY),
    SCREENSHOT_MAX_WIDTH
  )
}
