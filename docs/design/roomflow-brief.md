# Roomflow: brief for the case study copy

Roomflow is on the site as the second featured project, with its screenshots,
facts, links and placeholder lines in place. The story is still missing, in
both languages. This page is the brief for writing it: the prompt I start the
copy session with, how the project is framed, what the case study has to
prove, and the facts it can use, each one checked against the repository.

The voice, the length limits and the Indonesian rules are in
[copy-handoff.md](./copy-handoff.md), and they all apply here. This page only
adds what is specific to Roomflow. Once the copy has landed, this page is
deleted, because by then its facts live in the case study.

## The prompt

```text
Act as a senior copywriter for this repository: my portfolio, which I use to
find frontend and full-stack roles. Write the Roomflow case study, the story
in English and then in Indonesian, and improve the placeholder lines already
in its frontmatter.

- Read AGENTS.md, then docs/design/copy-handoff.md, then
  docs/design/roomflow-brief.md. The last one holds the framing, the
  argument and every fact the story can use.
- Read the Roomflow repository's README and docs/ARCHITECTURE.md
  (github.com/farulivan/roomflow) and try the live demo before writing.
- Start with an outline: the headings and one line on what each section
  says. Stop there and let me choose before writing the prose.
- The voice is mine, in the first person. Never invent a fact. Every number
  in the story is from the brief or the repository; ask me about anything
  else.
- One PR for the English and one for the Indonesian, branched from main.
  Stop after each so I can review it.
- Run `pnpm verify` on every PR, then ask me for a visual review of
  /work/roomflow and /id/work/roomflow.
- Stay in copy. If a better line needs a design change, say so and leave
  the change to me.
```

## How it is framed

Roomflow started as a take-home assignment in a hiring process.

- Say that once, early, in one sentence, and move on. It explains why a
  hotel dashboard exists with no hotel behind it.
- Never name the company, and never quote or paraphrase the assignment.
- Never say the project goes "beyond the brief", or anything like it. I don't
  have a record of which parts the assignment asked for and which I added, so
  that line can't be written honestly. It isn't needed: the case study is
  about the decisions, and every decision in it is mine.
- The three hotels (Harborline Hotel, Cedarfall Lodge, Saltmarsh House) and
  every guest are fictional. They must never read as clients or users.

## What it has to prove

The reader is someone hiring for a frontend or full-stack role. The other
case studies already cover a lot: Nabitu shows scale and three years of
ownership, but its code can't be shown. The WhatsApp bot shows backend depth,
Norven shows quality gates on a static site, and the hospital shows a
handover.

Roomflow is the only one where the reader can open both the running app and
the code. What it shows is judgement about application state: server state,
optimistic updates and when not to use them, the URL as the place view state
lives, failure states, keeping tenants apart, and one set of business rules
shared by the interface and the API. It is also the only project the reader
can break on purpose, from the demo controls in its header.

## The story

A suggested spine. Each `##` heading is an entry in the case study's contents
list, so five to seven of them reads well. The headings are working titles.
Under each are the facts that section can use, and where they come from in
the Roomflow repository.

1. **What it is, and how to try it.** One console for guest requests (room
   service, housekeeping, laundry, extra beds, spa) across three hotels, with
   the late ones flagged. A hotel switcher scopes everything, and the hotel is
   in the URL, so a shared link opens the right one. Sign in with "Use demo
   account". The API is a mock running in the browser, and a reload resets
   the data. The take-home sentence goes here.
2. **One set of rules on both sides of the wire.** `src/domain` is plain
   TypeScript that imports nothing, not even React. One typed transition map
   (`src/domain/order-status.ts`) decides which status changes are legal. The
   interface renders only the actions the map allows, and the mock API
   answers 422 to anything else. A test keeps the list of actions and the map
   in agreement. The mock server reuses the same domain functions for
   filtering and metrics, so the two sides of the wire can't disagree.
3. **Optimistic, except where it can't be.** Acknowledge, Start and Complete
   update at once, because they are easy to retry and staff do them all day.
   If the server refuses, only that order goes back, so a change made to
   another order in the meantime survives, and a toast says what was
   reverted. Cancel and Reject can't be undone, so they don't pretend: the
   dialog waits for the server, shows a failure inside itself, and keeps the
   reason that was typed (`src/features/orders/mutations.ts`).
4. **A declined card never holds up a tray.** In a hotel, serving an order
   and getting paid for it are separate jobs, often done by different people.
   So a failed payment never blocks service: taking the order on asks once,
   so nobody does it unaware, and "Mark payment collected" ends the follow-up
   whenever the money comes in. Until then the order stays in "Needs
   attention" (`src/domain/payment.ts`). This is the section where the
   product thinking shows, so it deserves room.
5. **Nothing in progress gets interrupted.** A new order arrives as a toast
   that doesn't take focus, with a View button. The drawer is tied to the
   order ID in the URL, not to a row, and the cancel dialog keeps its own
   copy of the order, so a background refresh that moves a row doesn't close
   it. Search, filters, sort and page all live in the URL, so a filtered view
   can be shared. Typing replaces the history entry and a filter change adds
   one, so Back undoes filters, not keystrokes.
6. **Built to be broken on purpose.** The demo controls add a slow network
   (about 2 s per request), make every request fail, or send a new order.
   Every data view has four states: loading (skeletons in the final layout),
   empty (no orders yet is told apart from nothing matching the filters),
   error with a retry, and success. A failed background refresh keeps the data
   on screen with a notice saying how old it is. The mock sits at the network
   boundary (MSW), so replacing it with a real API is four steps, and the
   query hooks, components and domain don't change.
   - Name the trade-offs. Deliberately left out: a global state library (the
     query cache and the URL hold all the state) and row virtualisation (a
     page is 10 rows).
   - Still needed before production: real authentication with per-hotel
     roles on the server, and a push channel instead of 30-second polling.
7. **Outcome.** Either a closing section headed exactly "Outcome" ("Hasil" in
   Indonesian), or none, in which case the frontmatter's `outcome.summary` is
   printed under that heading. See the structure rules in the copy handoff.

On AI: the repository's README has a "Working with AI" section saying I build
with Claude Code, set the direction myself, and review, run and test every
change. If the story mentions it, one sentence is enough, consistent with the
capabilities note: I direct it, I review everything it writes, and I'm
responsible for what ships.

## Figures

The first figure is the one on the link-preview card, and project rows show
the first two, so the strongest goes first. All of these are checked:

| Value         | What it counts                                                     | Source                                   |
| ------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| 4             | States on every data view: loading, empty, error, success         | ARCHITECTURE.md, "Error handling"        |
| 1             | Transition map, shared by the interface and the mock API          | `src/domain/order-status.ts`             |
| 89            | Test blocks in 17 files, counted on 2026-11-09. More run, because several are parameterised; `bun test` prints the exact count | `*.test.ts`, `*.test.tsx` |
| 10 to 30 min  | SLA targets per service, room service shortest and laundry longest | `src/domain/sla.ts`                      |
| 3             | Hotels, each kept apart down to the 404                            | `src/mocks/db.ts`, `src/mocks/db.test.ts` |

The test count is small next to the WhatsApp bot's 600+, so it shouldn't
lead, and if it is used at all it should be the number `bun test` prints. The
placeholders use 4 and 1.

## What is already there

These are placeholder lines, plain and factual, written so the page could ship
complete. All of them are open to rewriting:

- `summary`, `outcome.summary` and the two figure captions, in both files
- the screenshot `alt` text and captions ("Dashboard", "Order drawer")
- in `src/i18n/ui.ts`, the work page subtitle (`work.subtitle`), which now
  mentions "a take-home from a hiring process", and "Four projects" in
  `home.workDescription` and `work.featuredDescription`, in both languages

Not decided yet: whether the facts table gets a duration. Without one it shows
the year, 2026. The repository was created on 20 October 2026 and has a
roadmap, so "Oct 2026 – ongoing" is likely, but it waits for my confirmation.

Left for later: a post on optimistic updates against confirmed ones, linked
from section 3 with "The longer version", the way the WhatsApp bot's case
study links its posts.
