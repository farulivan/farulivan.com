# Copy handoff

<!-- cspell:ignore Tersalin udah -->

The November 2026 design review is built and merged. What is left is the
words: a review of every line on the site, in both languages, and the
Indonesian that was never written.

This page is the brief for that work. It holds the prompt I start the copy
session with, where every piece of copy lives, the limits the design puts on
it, the voice each language is written in, and the list of what is missing in
Indonesian.

## The prompt

```text
Act as a senior copywriter for this repository: my portfolio, which I use to
find frontend and full-stack roles. Review and improve every piece of copy on
the site, in English and Indonesian, and write the Indonesian that is missing.

- Read AGENTS.md, then docs/design/copy-handoff.md. The second holds the
  design limits the copy has to fit, where every string lives, and the list
  of missing Indonesian.
- Start with an audit, not edits. Go through the site page by page (home,
  work and each case study, about, writing and each post, contact, the 404,
  and the link-preview cards) and list what you would change and why,
  grouped by page. Stop there and let me choose what to do.
- The voice is mine, in the first person. Never invent a fact, a number, a
  client, a date or a result. When a line needs a fact I have not given, ask
  me. The figures (3,000+ investors, 100+ pages, 600+ tests and the rest) are
  mine to change, not yours.
- One concern per PR, branched from main: for example the English copy of
  one page, or the Indonesian story of one case study. Stop after each PR so
  I can review it before you start the next.
- English first, then Indonesian. The Indonesian should read as if an
  Indonesian engineer wrote it, not as a word-for-word translation. Terms
  engineers here say in English (frontend, deploy, pull request, codebase)
  stay in English.
- Commits, PR titles and PR bodies are in my voice too, in the first person.
- Run `pnpm verify` on every PR. It checks the length limits and the spelling
  in both languages. Then ask me for a visual review of the pages the PR
  touches. Do not run Lighthouse locally; CI runs it after merge.
- Stay in copy. Layout, type, colour and code are out of scope. If a better
  line needs a design change, say so and leave the change to me.
```

## Where the copy lives

| Copy                                                                                 | File                                                     |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Interface strings: navigation, page titles, section headings and descriptions, buttons, the hero, contact | `src/i18n/ui.ts`, the `en` block first, then `id` |
| Case studies: title, summary, facts, figures, screenshot alt text, the story         | `src/content/projects/en/*.mdx`, `src/content/projects/id/*.mdx` |
| The career timeline                                                                  | `src/content/experience/en/*.md`, `src/content/experience/id/*.md` |
| Capabilities: the about-page table and the home page's stack band                    | `src/content/capabilities.json`                          |
| Posts                                                                                | `src/content/writing/en/*.mdx`, with no Indonesian folder yet |
| Name, links, CV details                                                              | `src/config/site.ts`                                     |

An Indonesian entry is linked to its English one by `translationKey`: the
same key in both files, with `lang: "id"` in the Indonesian one. A new
Indonesian post is a new file in `src/content/writing/id/` carrying the
English post's key.

## Limits the design sets

### Lengths

`pnpm verify` refuses copy past these:

- **Case-study and post titles:** 70 characters. They are set at display size,
  and the link-preview cards have room for about three lines of them.
- **Case-study summaries and post descriptions:** 50 to 160 characters. They
  appear on the project rows, under the case-study title, in search results
  and on the preview cards.
- **Timeline descriptions:** 240 characters, which the row draws as two lines.
- **Capability notes:** 160 characters. The first sentence is also the small
  tag in front of each row of the home page's stack band ("Where I live",
  "Growing, deliberately"), so it works best as a few words. A longer one
  wraps the tag to two lines on a phone, as the craft note's does now.

These are not checked, but the layout depends on them:

- **Figures:** the value is set large ("3,000+", "<$1"), and the caption is a
  small uppercase label, so both stay short. Project rows show the first two
  figures, and the preview card shows the first, so the strongest goes first.
- **The availability line** (`home.availability`) fits one line on a laptop.
  The Indonesian one already takes two lines on its preview card; it should
  not grow.
- **The descriptor** (`site.descriptor`) is typed out under the name in the
  hero and is the page's heading. One short line.
- **The home statement** (`home.positioning`) runs to about three lines at
  display size.
- **Section-heading descriptions** sit in the right half of the page and read
  best at two or three lines.
- **Non-breaking spaces** (` `) in `ui.ts` hold phrases together, such as
  "end to end" and each " · " separator. They stay where they are, and new
  lines built with " · " use them the same way.

### Structure

- **Every case-study story ends on its outcome**, under a heading that reads
  exactly "Outcome", or "Hasil" in Indonesian. A story without one gets the
  frontmatter's `outcome.summary` under that heading, so writing one is a
  choice, not a requirement. Two headings with other wording would print the
  outcome twice.
- **The `##` headings of a story are its contents list.** On a post the list
  only appears at four or more of them, or six or more minutes of reading, so
  adding or merging sections changes the layout.

### Rules

- **The voice is mine.** First person. Never "he" or "Farul" about me in the
  copy, and "you" for the reader only where it is natural; "a visitor" or a
  rephrase usually reads better.
- **No invented facts.** Every number, client, date and result is real. A gap
  is a question for me, not a line to fill.
- **English first, then Indonesian.** The type check fails until a new English
  string has its Indonesian one.
- **The Indonesian spell check uses a dictionary.** A word outside it fails the
  build: "Tersalin" did, and "Sudah disalin" passes. A real word the
  dictionary lacks goes into `cspell.json`; a made-up one gets rewritten.

## Voice

I settled these at the start of the copy review. They hold for every line
written after it, in the interface, the case studies and the posts alike.

### English

- **Contractions, everywhere.** I'm, don't, didn't. The site is me talking
  about my work, and the expanded forms made it read stiffer than I talk.
- **"frontend", one word,** as a noun and as an adjective. Not "front end",
  not "front-end".
- **British spelling.** The spell check runs en-GB.
- **Say each fact once, where it does the most work.** "Three years as the
  only frontend engineer" is the strongest thing I can say, and it lost its
  weight by appearing on every page, sometimes twice in a sentence.

### Indonesian

Bahasa Indonesia that is too baku reads strangely on a personal portfolio.
The register is casual but professional: the way an Indonesian engineer
writes on LinkedIn or on a good tech blog. Casual does not mean terse, and it
does not mean slang.

- **"saya" for me, "kamu" or "-mu" for the reader.** Never "Anda".
- **Warm, complete sentences.** This is the line the rest is held against:

  > Kalau itu yang sedang dibangun oleh timmu, saya akan senang mendengar
  > lebih banyak tentangnya. Email adalah cara terbaik untuk menghubungi saya,
  > dan saya selalu berusaha membalas setiap pesan yang masuk.

- **Rewrite from the meaning, not from the English sentence.** Restructure
  freely: split a long sentence, put the topic first, turn a noun phrase back
  into the verb it hides. Choose the word the context needs, not the
  dictionary's first match. "I own what I build" is not "saya memiliki",
  which means to possess, and "where I live" is not "tempat saya tinggal",
  which is an address.
- **A flat English claim can soften where Indonesian would.** "I reply to
  everything" becomes "saya selalu berusaha membalas setiap pesan". The facts
  underneath stay the same.
- **No bureaucratic Indonesian:** "merupakan", "adapun", "dalam rangka",
  "yang mana", "guna", "tersebut" at every turn, "sebuah" in front of every
  noun.
- **No slang particles or chat spellings:** "sih", "dong", "kok", "banget",
  "udah", "gue". A recruiter has to be able to forward the page.
- **English for what engineers here say in English:** frontend, backend,
  deploy, pull request, codebase, scheduler, test, review, outage,
  performance budget, end-to-end. Translating them reads like a textbook.
- **Indonesian number formatting** in Indonesian copy: 3.000+ and 0,8 GB. The
  values are the English ones.
- **The test for every line:** would an Indonesian engineer write it this
  way, or does it sound translated?

## Indonesian coverage

Nothing is missing any more. Since the copy review in November 2026, every
interface string, case study and post exists in both languages, and the
Indonesian was written from the English's meaning rather than translated
from it.

A new case study or post is written in English first. Its Indonesian file
goes in `src/content/projects/id/` or `src/content/writing/id/` under the
same file name, with the English entry's `translationKey` and
`lang: "id"`. Until that file exists, the Indonesian site shows the English
under a note saying so (`project.untranslated`, `writing.untranslated`).

The Indonesian spell check will flag real affixed words the base dictionary
lacks (datanya, pengingat, kodemu). Those go in `cspell-id.txt`; a word that
isn't real gets rewritten instead.
