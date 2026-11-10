# Copy handoff

<!-- cspell:ignore Tersalin udah -->

Where every piece of copy lives, the limits the design puts on it, and the
voice each language is written in. Read it before changing any copy, in
either language.

## Where the copy lives

| Copy                                                                                 | File                                                     |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Interface strings: navigation, page titles, section headings and descriptions, buttons, the hero, contact | `src/i18n/ui.ts`, the `en` block first, then `id` |
| Case studies: title, summary, facts, figures, screenshot alt text, the story         | `src/content/projects/en/*.mdx`, `src/content/projects/id/*.mdx` |
| The career timeline                                                                  | `src/content/experience/en/*.md`, `src/content/experience/id/*.md` |
| Capabilities: the about-page table and the home page's stack band                    | `src/content/capabilities.json`                          |
| Posts                                                                                | `src/content/writing/en/*.mdx`, `src/content/writing/id/*.mdx` |
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
- **The same word for the same thing, on every page:**
  - "bahasa Indonesia" and "bahasa Inggris" in running text, with a lower-case
    b. The language switch keeps "Bahasa Indonesia" as the language's name.
  - "link", not "tautan".
  - "React biasa" for plain React, not "React vanilla".
  - "dirilis" for shipped ("Kedua frontend sudah dirilis"), not a bare "rilis".
  - "harga" for what a decision costs, as the posts use it.
  - "Hak cipta dilindungi undang-undang" for "All rights reserved".
- **One "keduanya", one "untuk" per sentence.** A second one usually means
  the sentence wants restructuring, not a synonym.
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
