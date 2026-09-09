# Working in this repository

Read [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) before making structural changes. The short version and the traps are below.

## Commands

```bash
pnpm dev         # dev server
pnpm setup       # rewrite the placeholder identity (takes --name= --url= --repo=)
pnpm verify      # everything CI runs
pnpm check       # astro check on its own
pnpm check:arch  # just the layering rules
pnpm build       # runs `astro check` first, then builds
pnpm build:fast  # skips the type check, for quick local iteration
```

`build` type-checks first on purpose: `astro build` transpiles without checking types, and Netlify runs `pnpm build`, so without it a type error could reach production.

When starting the dev server for a long-running task, use `astro dev --background`, then `astro dev stop` / `status` / `logs`.

## Rules enforced by `pnpm check:arch`

1. No `.tsx` or `.jsx` anywhere. This site ships no framework runtime; everything interactive is a few lines of plain JavaScript in the component that needs it.
2. `getCollection` only in `src/pages/**` and `src/content/queries.ts` — sections take props.
3. The Markdown pipeline stays on Sätteri; do not install `@astrojs/markdown-remark`.
4. `src/i18n/*` and `src/content/schemas.ts` import nothing from Astro or components.
5. Components translate through `useTranslations`, never by reading `ui[...]` directly.
6. No URL outside `src/config/site.ts`, so the origin has one home.
7. Lime is never a text colour. It is 2.06:1 on white. Only `text-accent-text` is legal on a light ground and only `text-accent-on-dark` on the dark one.

It also prints what is still a placeholder — `TODO(asset):`, `TODO(content):` and `data-placeholder` — as a note rather than a failure, so an unfinished site stays reviewable. `LAUNCH=true pnpm check:arch` turns that note into an error, which is what stops a grey box reaching production.

## Traps

- **Astro 7 uses Sätteri, not remark.** Remark/rehype plugins do not run. Write Sätteri mdast plugins (see `src/mdast/`).
- **Never name a prop `as`.** It is a TS keyword and silently breaks Astro's `Props` binding, producing implicit-`any` errors in _unrelated_ files. Use `tag`. Astro's documented `Polymorphic<{ as: Tag }>` helper hits the same problem in 7.2.10, one level removed — it type-checks in isolation but breaks Props binding in the components that consume it. `Container.astro` records the full finding.
- **A `{/* */}` comment inside an attribute list swallows the template.**
  Putting one between a component's props parses as an expression attribute
  and consumes the rest of the file. It surfaces as "declared but never read"
  for every import, which points at the imports rather than the comment. Put
  the comment in the frontmatter.
- **Keep angle-bracket tag names out of `.astro` frontmatter comments.** Writing `<section>` in a JSDoc block there can panic the `.astro` to TSX transform (`slice bounds out of range`), after which every importing file reports "is not a module". Write "a section element" instead.
- **Import Zod from `astro/zod`,** never a separate `zod` install — two copies break `defineCollection`.
- **TypeScript stays on 6.0.x.** `@astrojs/check` and typescript-eslint both reject TS 7 today.
- **Adding a string?** Add it to `en` in `src/i18n/ui.ts` first; typecheck will then demand the Indonesian one.

- **Tailwind v4 registers `prose` as a utility.** Typography's
  `.prose :where(pre)` therefore lands in the utilities layer and outranks
  anything in `@layer components`, no matter how specific — `:where()`
  contributes no specificity, so a bare `.astro-code` ties and loses on
  source order. The Shiki rules in `global.css` sit outside every layer for
  exactly this reason. Check the cascade layer before adding specificity.
- **The Lighthouse budget asserts accessibility at exactly 1.00**, and it
  audits every page the build produces, in both locales. One token color in
  one code block is enough to fail it: `github-light`'s comment is #6A737D on
  white, which is 4.4:1. Use the `-high-contrast` Shiki themes.
- **Preload every font that sets real text.** Leaving a face that sets visible
  text out of the preload cost 0.137 CLS on post pages, as the fallback metrics
  gave way. Lexend is the only webfont here and it is preloaded; code blocks use
  the reader's own monospace, so there is nothing else to load.

## Behavior traps (all previously shipped as bugs)

- **A scoped `<style>` cannot reach an element another component renders.** Styling a `<Card tag="li">` from its parent silently does nothing; pass the class instead.
- **Astro components forward nothing you did not declare.** A component typed with three props drops every other attribute without warning. Extend `HTMLAttributes<...>`.
- **Do not add `scroll-behavior: smooth`.** It cancels on any interruption and leaves anchor links setting the hash without moving the page — which also stops `client:visible` islands from ever hydrating.
- **Route to `/#` for anything without a real destination.** Never invent a plausible URL.

## Where things live

| Want to change                 | Edit                     |
| ------------------------------ | ------------------------ |
| Name, URL, nav, links, CV      | `src/config/site.ts`     |
| Any user-facing string         | `src/i18n/ui.ts`         |
| Case studies and posts         | `src/content/`           |
| Colours, type, spacing, motion | `src/styles/global.css`  |
| What counts as valid content   | `src/content/schemas.ts` |

## Commits and pull requests

Commit subjects follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/),
lowercase type:

```
feat: add the wordmark and its intro animation
fix: stop the homepage title repeating the site name
chore: pin the Node version for Netlify
docs: record why lime is never a text colour
refactor: pull the locale fallback into one helper
```

Common types: `feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `test`, `ci`,
`build`, `style`.

Pull request titles use `[Feat] Sentence case title`, with the same word as the
commit type. Bodies follow [the template](.github/PULL_REQUEST_TEMPLATE.md).

Nothing enforces this — it is two people and every change is reviewed — so
getting it wrong costs a comment, not a failed build.

## Writing style

Comments, commit messages and pull request bodies have to make sense to someone
who has never read `docs/design/`. No section numbers, no component codes, no
shorthand. Write "the project row", not "C5". Write "the crop hides the same
fraction of the same letter at every width", not "see the crop rule".

Say why, not what. The diff already says what.
