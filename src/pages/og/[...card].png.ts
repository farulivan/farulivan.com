/**
 * Every link-preview card, written out as a PNG when the site builds: one per
 * language for the home page, and one for each case study and each post in
 * each language. `ogImagePath` names them, and the layouts point at them.
 */
import type { APIRoute, InferGetStaticPropsType } from "astro"

import { siteConfig } from "@/config/site"
import { getPostRoutes, getProjectRoutes } from "@/content/queries"
import { LOCALES } from "@/content/schemas"
import { useTranslations } from "@/i18n/utils"
import { formatDate } from "@/lib/format"
import { homeCard, postCard, projectCard, stageImage } from "@/lib/og"

export async function getStaticPaths() {
  const [projects, posts] = await Promise.all([
    getProjectRoutes(),
    getPostRoutes(),
  ])
  return [
    ...LOCALES.map((lang) => ({
      params: { card: lang },
      props: { kind: "home" as const, lang },
    })),
    ...projects.map(({ lang, slug, project }) => ({
      params: { card: `${lang}/work/${slug}` },
      props: { kind: "project" as const, lang, project },
    })),
    ...posts.map(({ lang, slug, post }) => ({
      params: { card: `${lang}/writing/${slug}` },
      props: { kind: "post" as const, lang, post },
    })),
  ]
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>

/* The address as it is said aloud, without the scheme. */
const domain = new URL(siteConfig.url).host

/*
 * Where an image's source file is. Astro keeps it on the image's metadata,
 * out of sight, for exactly this: reading the original at build time.
 */
function sourceFile(image: ImageMetadata): string {
  const path: unknown = Reflect.get(image, "fsPath")
  if (typeof path !== "string") {
    throw new Error(`No source file recorded for ${image.src}`)
  }
  return path
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const t = useTranslations(props.lang)

  let png: Buffer
  if (props.kind === "home") {
    png = await homeCard({
      availability: t("home.availability"),
      name: "farul.ivan",
      role: t("site.descriptor"),
      domain,
    })
  } else if (props.kind === "project") {
    const { data } = props.project.entry
    // The phone crop where there is one: it is framed on the headline, which
    // is what reads at the size a card shows it.
    const shot = data.screenshots[0]
    png = await projectCard({
      kicker: `${t("og.caseStudy")} · ${String(props.project.number).padStart(2, "0")}`,
      title: data.title,
      figure: data.outcome.figures[0],
      image: shot
        ? await stageImage(sourceFile(shot.phone ?? shot.src))
        : undefined,
      domain,
    })
  } else {
    const { data } = props.post.entry
    png = await postCard({
      kicker: t("home.writingLabel"),
      title: data.title,
      date: t("writing.published", {
        date: formatDate(data.pubDate, props.lang),
      }),
      domain,
    })
  }

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  })
}
