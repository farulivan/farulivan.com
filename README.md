# farulivan.com

Personal portfolio site. Static Astro, English and Indonesian, built from the
design specs in [`docs/design/`](docs/design/).

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

## Commands

|                   |                                                            |
| ----------------- | ---------------------------------------------------------- |
| `pnpm dev`        | Dev server                                                 |
| `pnpm build`      | Typecheck, then build to `dist/`                           |
| `pnpm preview`    | Serve the built site                                       |
| `pnpm test`       | Unit tests                                                 |
| `pnpm lint`       | ESLint                                                     |
| `pnpm format`     | Prettier, writing in place                                 |
| `pnpm check:arch` | The architecture rules described in `docs/ARCHITECTURE.md` |
| `pnpm verify`     | Everything CI runs, in the same order                      |

Run `pnpm verify` before pushing. It is the same gate as CI, so a green run
locally means a green run there.

## How it is put together

- **Pages** live in `src/pages/[...lang]/`. One file per route emits both
  languages: English is unprefixed (`/work`) and Indonesian is prefixed
  (`/id/work`).
- **Copy** lives in `src/i18n/ui.ts`. English defines which keys exist and
  Indonesian is typed as a complete set of them, so a missing translation fails
  to compile rather than rendering a blank button.
- **Content** lives in `src/content/`, validated by the schemas in
  `src/content/schemas.ts`. Pages read it through `src/content/queries.ts`,
  which is the only module besides pages allowed to touch the content layer.
- **Design tokens** live in `src/styles/global.css`. Colours, type sizes,
  spacing and easing all come from there and nowhere else.

More detail in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
