# Architecture

Technical design for astro-origin. What is planned next is in [ROADMAP.md](./ROADMAP.md).

## The one idea

**Content is typed, schema-validated data at the bottom of the stack. Components render it and never author it.**

Everything else follows. The _content boundary_ — the loader in `src/content.config.ts` — plays the role a network boundary plays in a client/server app: swapping Markdown files for a CMS is a change to the loader lines and nothing else. No schema moves, no component moves, no page moves.

Two pure modules sit underneath everything and are the reason the rest can stay thin:

| Kernel                   | Guarantees                                                                                                                             | Enforced at                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `src/content/schemas.ts` | Content is well-formed: SEO-legal title and description lengths, an `alt` for every image, an annual price never above the monthly one | **build time** — a bad post fails `pnpm build`           |
| `src/i18n/ui.ts`         | Every locale defines every string                                                                                                      | **typecheck** — a missing translation fails `pnpm check` |

Neither imports Astro, React, or a component. Both are unit-tested without a DOM.

## Tech stack

| Choice                                  | Why                                                                                                                                   |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Astro 7                                 | Zero JS by default, file-based routing, built-in i18n; the Rust compiler and Vite 8 / Rolldown make builds fast without extra tooling |
| Node 22.12+ / pnpm 11                   | Astro's supported runtime. Bun was evaluated and rejected — see below                                                                 |
| TypeScript 6.0                          | `@astrojs/check` supports `^5 \|\| ^6` and typescript-eslint declares `<6.1.0`; TS 7 satisfies neither                                |
| Tailwind CSS v4 via `@tailwindcss/vite` | `@astrojs/tailwind` is deprecated; the Vite plugin is the supported path                                                              |
| `@tailwindcss/typography`               | Styles the HTML that Markdown generates — the one place utility classes cannot reach                                                  |
| React 19 (one island)                   | An escape hatch for genuine interactivity, deliberately used exactly once                                                             |
| Zod 4 via `astro/zod`                   | Astro bundles its own Zod; a separate install causes version skew that breaks `defineCollection`                                      |
| Vitest 4 + Container API                | The only supported way to render `.astro` components in a test                                                                        |
| MDX, sitemap, RSS                       | Official integrations                                                                                                                 |

### Why not Bun

Bun was the default expectation. Two findings changed it:

1. Astro's documentation carries a standing caution that _"using Bun with Astro may reveal rough edges. Some integrations may not work as expected."_
2. `bun test` cannot compile `.astro` files at all. Astro's only supported component-test path is Vitest + `getViteConfig()` + the Container API — so Bun would have produced a mixed toolchain regardless of the package manager.

Astro 7 also moved the compiler to Rust and the bundler to Rolldown, so Bun's remaining advantage was install speed alone. Node plus pnpm costs nothing and is the configuration Astro tests against.

### Astro 7 renders Markdown with Sätteri, not remark

This is the single largest trap in the project. **Astro 7 replaced the remark/rehype pipeline with Sätteri, a native Rust processor with its own AST, and Sätteri does not run remark or rehype plugins.** `@astrojs/markdown-remark` is no longer installed by default.

Almost every "add reading time to Astro" article online is a remark plugin and will silently do nothing here. The three plugins in `src/mdast/` are Sätteri mdast plugins. Reintroducing the unified pipeline is possible but forfeits the faster one, so `scripts/check-architecture.sh` fails the build if `@astrojs/markdown-remark` reappears.

## Layered model

Dependencies point one way only.

```
┌──────────────────────────────────────────────────────────────┐
│ Pages      src/pages/[...lang]/**   resolve locale, query    │
│                                     content, set SEO         │
├──────────────────────────────────────────────────────────────┤
│ Layouts    src/layouts/**           <html lang> + theme,     │
│                                     head, fonts              │
├──────────────────────────────────────────────────────────────┤
│ Sections   src/components/sections/ page blocks — props in,  │
│                                     HTML out, zero queries   │
├──────────────────────────────────────────────────────────────┤
│ UI         src/components/ui/       primitives               │
│ Islands    src/components/islands/  the ONLY .tsx            │
├──────────────────────────────────────────────────────────────┤
│ Schemas    src/content/schemas.ts   pure Zod    ← kernel 1   │
│ i18n       src/i18n/{ui,utils}.ts   pure TS     ← kernel 2   │
│ Config     src/config/site.ts       `as const`               │
│ Lib        src/lib/                 cn(), formatters         │
└──────────────────────────────────────────────────────────────┘
        ↕ content boundary (the loader)
┌──────────────────────────────────────────────────────────────┐
│ Query      src/content/queries.ts   locale + fallback rules  │
│ Content    src/content/**           Markdown / MDX / JSON    │
│ Build-time src/mdast/**             Sätteri enrichment       │
└──────────────────────────────────────────────────────────────┘
```

### The rules

Five rules, all checked mechanically by `pnpm check:arch`:

1. **`.tsx` only inside `src/components/islands/`.** Everything else is `.astro` and ships no JavaScript.
2. **`getCollection` only in `src/pages/**` and `src/content/queries.ts`.** Sections receive props, which is what keeps them renderable in a test without a build.
3. **The Markdown pipeline stays on Sätteri.**
4. **The kernels import neither `astro:*` nor components.**
5. **Components translate through `useTranslations`,** never by reading the dictionary directly.

The checker ignores comments, so prose describing a rule is not mistaken for a violation of it.

### Deliberately not doing

Every absent abstraction is a decision:

- **No state library, no Nano Stores.** There is one island. A store would be an abstraction with a single consumer.
- **No `astro-seo` package.** `src/components/Seo.astro` is a dozen tags whose exact contents matter; owning them beats configuring someone else's, the same reasoning that put shadcn/ui components inside the sibling repo.
- **No icon package.** `src/components/ui/Icon.astro` is a typed record of SVG paths. A compile-time assertion ties it to the content schema, so a feature cannot name an icon nobody drew.
- **No SSR adapter.** The site is `output: "static"`. Forms, API routes and captcha verification are all one adapter away, and none of them are needed to render a landing page.
- **No `paginate()` helper.** It puts page 1 at `/blog/1`; we want `/blog`. The arithmetic in `src/lib/pagination.ts` is shorter than the workaround would have been.

## i18n

```js
i18n: { locales: ["en", "id"], defaultLocale: "en", routing: { prefixDefaultLocale: false } }
```

English is unprefixed (`/blog`), Indonesian is prefixed (`/id/blog`). Every route is written **once**, using a single `[...lang]` rest parameter whose `getStaticPaths` emits `lang: undefined` for the default locale — which is what makes Astro generate the unprefixed path. The docs explicitly permit one rest parameter alongside named ones (`[...locale]/[slug].astro`); only two rest parameters in one path are forbidden.

```
src/pages/
  [...lang]/index.astro              → /            /id/
  [...lang]/blog/index.astro         → /blog        /id/blog
  [...lang]/blog/page/[page].astro   → /blog/page/2 /id/blog/page/2
  [...lang]/blog/[slug].astro        → /blog/x      /id/blog/x
  [...lang]/rss.xml.ts               → /rss.xml     /id/rss.xml
  404.astro
```

`blog/page/[page]` wins over `blog/[slug]` because a static segment outranks a dynamic one, so pagination and post URLs cannot collide.

**Translation lookup.** `en` is the source of truth for which keys exist; `TranslationKey` is derived from it and `id` is typed `Record<TranslationKey, string>`. A missing or misspelled key is a compile error. This is the same trick the sibling project uses for `satisfies Record<OrderStatus, string>` on its badge variants: make the illegal state unrepresentable rather than defend against it.

**Untranslated content.** Articles are linked across locales by `translationKey`, which is also the URL slug. When a locale has no translation, `getPosts` returns the default-locale entry flagged `isFallback`, and the page renders it with a visible note. Never a 404, never a silent language switch.

**Language picker.** `switchLocalePath` swaps the prefix and keeps the rest of the path, so switching language from an article lands on that article — the bug in most hand-rolled switchers is dumping the reader on the home page.

## Theme

Light / dark / system, with the choice on `<html data-theme-choice>` and a `dark` class driving Tailwind's `@custom-variant dark`.

The **only** thing that must be inline is the resolver: a small blocking script in `<head>` reads `localStorage`, falls back to `prefers-color-scheme`, and sets the class before the first paint. An external or deferred script guarantees a flash of the wrong theme. `color-scheme` is set alongside so native scrollbars and form controls match.

`ThemeToggle.astro` is plain `<script>`, not an island — a class toggle and a storage write need no framework. Which icon shows is decided by CSS from the `data-theme-choice` attribute, so the script never touches the DOM beyond one attribute.

## Islands policy

Reach for an island only when one piece of state drives derived output that plain DOM manipulation would make worse.

- **`<script>` in `.astro`** — theme toggle, mobile nav. The language picker and FAQ accordion need no script at all (real links; native `<details>`).
- **React island** — `PricingToggle.tsx`, hydrated `client:visible`. One state (billing period) recomputes prices across every card.

Two properties keep it honest: prices arrive **pre-formatted** from the page, so no `Intl` logic ships and `src/lib/format.ts` stays the only place money is formatted; and every string arrives as a prop, so the island never imports the dictionary and no translation data ships twice. Astro renders it to HTML at build time, so the pricing table is in the source for crawlers and readable with JavaScript disabled.

Measured result: blog pages reference **zero** JavaScript files. Landing pages reference exactly one island, fetched only if the reader scrolls to it.

## Dates, and the shallow-clone problem

`src/mdast/modified-time.ts` derives a `lastModified` timestamp from `git log`. It is a **fallback only**, because hosts that shallow-clone resolve `git log` to a valid but wrong commit — and Vercel clones at depth 2 without offering a way to change it.

Precedence lives in one function, `resolvePostDate`:

1. frontmatter `updatedDate` — authoritative, portable, correct everywhere
2. the git timestamp — accurate locally and in CI (which checks out with `fetch-depth: 0`)
3. `pubDate`

An "update" older than publication is ignored, since that is exactly what a shallow clone produces.

## Testing

- **Kernels (most of the suite).** Schema acceptance and rejection, dictionary parity and placeholder-token matching, locale path round-tripping, date precedence, pagination arithmetic. Pure functions, no DOM.
- **`.astro` components.** Astro's Container API renders to a string with no browser and no dev server — possible only because these components are props-in/HTML-out.
- **The island.** Testing Library on happy-dom, opted into per-file with a `// @vitest-environment happy-dom` docblock.

Testing Library's auto-cleanup only registers when the test framework's globals are enabled; this project imports `describe`/`it`/`expect` explicitly, so `src/test/setup.ts` wires `cleanup` by hand, guarded on `document` so node-environment tests can share the same setup file.

## Accessibility

Verified by a Lighthouse budget in CI that asserts **accessibility = 1.00**, not merely "good". Two real defects were caught this way and fixed: post titles rendering `<h3>` directly under the page `<h1>` (a skipped level), and disabled pagination rendering `<a>` without `href` (not a link at all, invisible to keyboards and crawlers).

The disabled pagination control is now **omitted** rather than dimmed — a greyed-out label bright enough to meet the 4.5:1 contrast floor cannot also look disabled, so the honest answer is not to render it.

Elsewhere: a skip link; `<html lang>` per locale; `hreflang` alternates plus `x-default`; native `<details>` for the FAQ; a labelled `radiogroup` for billing period; `hidden` (not a display class) for the closed mobile nav so it leaves the tab order; external links announced with a translated screen-reader note and marked with an icon, so the cue is never color alone; `prefers-reduced-motion` respected.

## Bugs found by driving the site in a real browser

Static checks — types, lint, unit tests, even a Lighthouse budget — all passed while six real defects were live. Each is worth knowing because none of them failed loudly.

| Symptom                                      | Cause                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Three theme icons showing at once            | `Icon.astro` declared only `name`, `class` and `label`, so it silently dropped the `data-theme-icon` hook. The CSS that shows one icon and hides the others matched nothing. Now typed as `HTMLAttributes<"svg">` and covered by a test.                                                                                                                       |
| Every blog card linked to the same post      | `PostList` set `li { position: relative }` in a scoped style, but the `<li>` is rendered by `Card` — a different component, a different scope. The rule never applied, so each card's `after:inset-0` overlay sized itself against a distant ancestor and the last one covered the page. `relative` now sits on the Card itself.                               |
| Anchor links set the hash but never scrolled | `scroll-behavior: smooth` on `html`. A smooth scroll is cancelled by anything that interrupts it — a font swapping in, an island hydrating, the browser's own scroll on load. Removed; native instant jumps always land. This also fixed `client:visible`, which had never fired because the page stayed at the top and the pricing section was never in view. |
| The pricing island crashed in `astro dev`    | Vite pre-bundled React into a different module instance than react-dom's renderer used, so the hooks dispatcher was null: _"Cannot read properties of null (reading 'useState')"_. Hydration died and wiped the server-rendered table. Fixed with `resolve.dedupe`. Production bundling was never affected, which is why the build looked fine.                |
| `/id/` and `/id/#pricing`                    | `localizePath` produced a trailing slash for the locale root while the site is `trailingSlash: "never"`, and it had no notion of a hash. It is now hash- and query-aware, and the Header no longer has to split hashes off by hand.                                                                                                                            |
| Links to invented addresses                  | Pricing and social links pointed at `app.example.com` and a fictional GitHub repo. Placeholders are now `/#`, and the footer decides on the value whether to apply external-link treatment, so a placeholder never announces a new tab that will not open.                                                                                                     |

The lesson worth keeping: every one of these lived in the gap between "the code is correct" and "the page behaves". A type checker cannot know that a scoped CSS rule targets an element another component owns.

## Conventions

- **Business rules** live in `src/content/schemas.ts`; app configuration in `src/config/site.ts` (`as const`); copy in `src/i18n/ui.ts`. No magic numbers inline.
- **Types**: `interface` for object shapes, `type` for unions and derivations. Component props are declared in the component file.
- **A prop named `as` breaks Astro's implicit `Props` binding** (it is a TypeScript keyword), cascading into implicit-`any` errors in unrelated files. Astro's documented `Polymorphic<{ as: Tag }>` helper was tried and hits the same class of problem in 7.2.10: it type-checks in isolation, but breaks Props binding in consuming components. Polymorphic components use `tag`, and forward attributes explicitly.
- **No angle-bracket tag names in `.astro` frontmatter comments.** A JSDoc block containing `<section>` can panic the `.astro` to TSX transform (`slice bounds out of range`); the file then compiles to nothing and every importer reports "is not a module". Prose descriptions only.
- **Page props come from `InferGetStaticPropsType<typeof getStaticPaths>`,** never an `Astro.props as {...}` cast — a cast asserts rather than checks, and the inferred type here is exactly as narrow (`"en" | "id"`).
- **`pnpm build` runs `astro check` first.** `astro build` transpiles without type checking, so a type error would otherwise build cleanly; `build:fast` skips it for local iteration. Cloudflare's build runs all of `pnpm verify`, which includes it (see "Hosting").
- **Comments explain why, never what.**

## Performance and scale

At this size, rendering is free. The shape holds as content grows: pages are static files, so a hundred posts change build time and nothing else. The next steps at real scale would be moving reading-time computation into the loader (rather than calling `render()` per row for the list), and code-splitting if a second island ever appears.

For a third locale: add it to `LOCALES`, add a dictionary object, and add content. No route, component, or page changes — which is the property the `[...lang]` structure was chosen to give.

## Hosting

The site is a Cloudflare Worker that serves only files: `farulivan` in the dashboard, answering at `farulivan.com`. There is no Worker script, so no request runs code, and Cloudflare neither charges for nor limits requests for static files. `wrangler.jsonc` says what is served and where, and `public/_headers` sets the response headers. Both carry their reasons as comments.

### How a change goes live

Cloudflare builds every push to the repository itself (Workers Builds).

- **A merge to `main`** runs `pnpm verify`, then `wrangler deploy`. Running the whole gate again, rather than only `pnpm build`, is deliberate. The ruleset on `main` does not require a branch to be up to date before it merges, so two pull requests that each passed CI can merge into a `main` that does not. This way the commit that goes live is the commit that was checked. The `LAUNCH=true` build variable makes `check:arch` refuse a placeholder, so a grey box cannot reach production either.
- **Any other branch** runs `pnpm verify`, then `wrangler preview`. That puts the branch at an address of its own on `workers.dev`, which Cloudflare links from the pull request. Those addresses are public and carry `X-Robots-Tag: noindex`.

### Settings that live only in the dashboard

Workers & Pages → `farulivan` → Settings → Builds. Nothing in the repository records these, so this table is the record:

| Setting               | Value                                               |
| --------------------- | --------------------------------------------------- |
| Git repository        | `farulivan/farulivan.com`, production branch `main` |
| Build command         | `pnpm verify`                                       |
| Deploy command        | `pnpm exec wrangler deploy`                         |
| Preview command       | `pnpm exec wrangler preview`                        |
| Root directory        | _(blank)_                                           |
| Build variable        | `LAUNCH` = `true`                                   |
| Enable Preview Builds | on                                                  |

Cloudflare's builder takes Node from `.nvmrc` and pnpm from `packageManager` in `package.json`, through Corepack. A new default on Cloudflare's side therefore cannot change the build without a commit saying so. If a build log ever shows a pnpm other than the pinned one, turn Cloudflare's own install off with the build variable `SKIP_DEPENDENCY_INSTALL` = `1`, and start the build command with `corepack pnpm install --frozen-lockfile &&`.

### Serving the build the way Cloudflare does

`pnpm preview` is Astro's server, which knows nothing of `_headers`, `.assetsignore` or the trailing-slash setting. To see the site as Cloudflare will serve it:

```bash
pnpm build && pnpm exec wrangler dev
```

### What the domain adds

Two settings of the `farulivan.com` zone put a script on every page served from it, this site included. They are Cloudflare's: nothing in this repository turns them on or off. Lighthouse CI never sees either, because it audits the local build.

- **Web Analytics** loads a beacon from `static.cloudflareinsights.com` and reports each page view to `/cdn-cgi/rum`. It sets no cookie.
- **The bot check** (JavaScript Detections, always on with Bot Fight Mode) is an inline script that loads `/cdn-cgi/challenge-platform/` and keeps its result in a `cf_clearance` cookie. It also strips the `ETag` from every page it is added to. A browser therefore cannot ask whether a page changed and get a 304 back, and downloads the page again on each visit. Files under `/_astro/` are untouched, and so are the CV and the icons, which keep their `ETag`.

HSTS also comes from the zone, with preload, which is why `_headers` does not send it.

### Content-Security-Policy

The policy lives in `public/_headers` as `Content-Security-Policy-Report-Only`. In that mode the browser logs what the policy would refuse in the DevTools console, and refuses nothing. It stays report-only until the console has been read on the live site. That is the only place the two scripts above appear; neither `workers.dev` previews nor `wrangler dev` get them.

**Inline scripts are allowed by hash, never by `'unsafe-inline'`.** Astro inlines small scripts into the page, and a hash changes whenever its script does, so a hash is never written by hand. `public/_headers` holds a placeholder where they go, and `src/integrations/csp.ts` fills it in after every build with the hash of every inline script in `dist/`. The build fails if the placeholder has gone, or if the line grows past the 2,000 characters Cloudflare reads. Astro's own `security.csp` does not fit: it writes a meta tag, which can neither report-only nor set `frame-ancestors`, and it does not support Shiki.

**Styles are allowed inline.** Shiki colours every code token with a `style` attribute, hundreds of them, and a hash cannot cover an attribute. A stylesheet can do far less than a script.

**Expected in the console:** a refused inline script from the bot check on every page. It carries a different ray ID on every request, so no hash can allow it, and its hash in the message changes on every reload, which is how to tell it apart. Only a nonce made fresh for each request could allow it, and a site with no Worker code cannot make one. Refusing it matters only to firewall rules that read `cf.bot_management.js_detection.passed`, and the zone has none. Anything else in the console is a real finding.

**To start enforcing,** rename the header to `Content-Security-Policy`. Before that, open every kind of page in both languages with the console open: the homepage, the work index, a case study, the writing index, a post with a code block, about, contact and the 404, plus `cv.pdf`. Once it enforces, the bot check's script is refused for real. That is harmless here; the alternative, `'unsafe-inline'`, would switch the policy off for scripts.

**Anything new from another host** needs its origin in the matching directive: a script in `script-src`, a stylesheet in `style-src`, an image or font in `default-src` (or a directive of its own). Otherwise it is reported now and blocked once the policy enforces. A new inline script needs nothing; the next build hashes it.

### Rolling back

Workers & Pages → `farulivan` → Deployments: pick an earlier version and roll back to it, or run `pnpm exec wrangler rollback`. Either puts the old files back at once, without a build. Revert the commit as well, or the next merge deploys it again.
