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
- **A mixed sentence beats a stiff one.** When an action or idea comes out
  awkward in Indonesian, keep the English word inside the Indonesian
  sentence, the way engineers here talk: di-rollback, di-retry, behavior,
  follow-up, request, approval, default. "Saya hanya memakainya untuk aksi
  yang dampaknya kecil kalau ternyata harus di-rollback" reads naturally;
  a fully Indonesian version of it doesn't.
- **No money words for a trade-off.** English says a choice "costs" something,
  that a fix is "cheap" or a mistake "expensive", and that you "pay" for a
  decision. In Indonesian, harga, membayar, murah, mahal and selisih read as
  translation. Name the thing itself: trade-off, konsekuensi, "dampaknya
  kecil", "akibatnya serius", "lebih mudah dijawab".
- **Rephrase English's generic "you".** "It changes what you build. You can't
  ship…" becomes three "kamu" in two sentences if translated. Say it
  impersonally instead ("Komponen tidak bisa dirilis dulu…"). Keep "kamu" for
  the reader being addressed, as in the contact line.
- **Things don't act like people.** English lets data "arrive", a limit "be
  real", a token sit "one bug away" and a payment confirmation "choose".
  Indonesian says what actually happens: "data dari API", "ada batas yang
  jelas", "cukup satu bug untuk…", "untuk konfirmasi pembayaran, pilihannya…".
- **Name the thing once the reader knows it.** If the paragraph before
  introduced `localStorage` or an HttpOnly cookie, say "token di
  `localStorage`", not "token yang bisa dibaca script apa pun".
- **Indonesian number formatting** in Indonesian copy: 3.000+ and 0,8 GB. The
  values are the English ones.
- **The same word for the same thing, on every page:**
  - "bahasa Indonesia" and "bahasa Inggris" in running text, with a lower-case
    b. The language switch keeps "Bahasa Indonesia" as the language's name.
  - "link", not "tautan".
  - "React biasa" for plain React, not "React vanilla".
  - "dirilis" for shipped ("Kedua frontend sudah dirilis"), not a bare "rilis".
  - "trade-off" for what a decision costs, never "harga".
  - "terbaru" for the latest thing, not "terakhir", which can read as the
    last one ever.
  - "Hak cipta dilindungi undang-undang" for "All rights reserved".
- **One "keduanya", one "untuk" per sentence.** A second one usually means
  the sentence wants restructuring, not a synonym.
- **The test for every line:** would an Indonesian engineer write it this
  way, or does it sound translated?

#### Before and after

Real lines from the site, as they were and as they read now. They show the
rules above better than the rules do.

| Before                                                                                     | After                                                                                                      |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| saya hanya berani membuat janji itu kalau harga mengingkarinya murah                       | saya hanya memakainya untuk aksi yang dampaknya kecil kalau ternyata harus di-rollback                     |
| Keputusan teknis yang pernah saya ambil, dan harga yang harus dibayar untuk masing-masing. | Keputusan teknis yang pernah saya ambil, dan trade-off di balik masing-masing.                             |
| Branded type tidak gratis, dan harganya dibayar di batas-batas sistem.                     | Branded type juga punya trade-off, dan letaknya di batas-batas sistem.                                     |
| …dan tidak pernah membayar selisihnya.                                                     | …dan tidak ada utang yang harus dilunasi nanti.                                                            |
| Cancel dan Reject tidak bisa di-undo, jadi keduanya tidak berpura-pura.                    | Cancel dan Reject tidak bisa di-undo, jadi keduanya tidak dibuat seolah-olah langsung berhasil.            |
| UI dan API tidak mungkin berbeda pendapat soal…                                            | hasil UI dan API selalu sama, baik soal… maupun…                                                           |
| Demo controls di header mencabut keduanya                                                  | Lewat demo controls di header, kedua kondisi itu bisa dihilangkan                                          |
| dua cara yang memalukan                                                                    | dua cara yang sama-sama mengganggu                                                                         |
| Token… hanya berjarak satu bug cross-site scripting dari jatuh ke tangan orang lain        | Token di `localStorage` bisa dibaca oleh script apa pun di halaman, jadi satu bug cross-site scripting saja sudah cukup untuk mencurinya |
| …dengan React Server Components, memang di sanalah tempatnya.                              | Untungnya, dengan React Server Components, itu memang sudah jadi cara kerja default-nya.                   |
| ## Dibangun untuk sengaja dirusak                                                          | ## Bisa diuji dalam kondisi terburuk                                                                       |
| …dan staf baru tahu saat ada tombol yang gagal (reads as "new staff")                      | …dan yang pertama kali merasakannya adalah staf, lewat tombol yang gagal                                   |
| Kamu tidak bisa merilis komponennya dulu… jadi kamu memilih…                               | Komponen tidak bisa dirilis dulu lalu kontrasnya diperbaiki belakangan, jadi versi yang aksesibel dipilih… |

Interface labels quoted in a story (Acknowledge, Cancel, "Needs attention")
stay in English in the Indonesian copy, because that is what the screenshots
and the live app show.

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
