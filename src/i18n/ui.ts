/**
 * The translation kernel.
 *
 * `en` is the source of truth for which keys exist; `TranslationKey` is
 * derived from it, and every other locale is typed as a complete
 * `Record<TranslationKey, string>`. Forgetting a translation is therefore a
 * *compile* error, caught before a single page renders — not a runtime
 * `undefined` that ships to production as a blank button.
 *
 * This module imports nothing, so it is trivially unit-testable.
 *
 * `{placeholder}` tokens are substituted by `useTranslations` in ./utils.ts.
 *
 * Scope: interface copy lives here in both languages. Long-form writing — case
 * studies and posts — lives in `src/content/` and is English-only for now, with
 * a per-entry fallback that says so.
 */

export const en = {
  // Site identity. The wordmark is decorative in every place it appears, so
  // this is the real page title and it is always in the document.
  "site.title": "Farul Ivan — Fullstack engineer, frontend-focused",
  "site.descriptor": "Fullstack engineer, frontend-focused",
  "site.description":
    "Fullstack engineer, frontend-focused. Three years as the only frontend engineer on a shariah investment platform — seventy pages, two brands.",

  // Navigation
  "nav.home": "Home",
  "nav.work": "Work",
  "nav.about": "About",
  "nav.writing": "Writing",
  "nav.contact": "Contact",
  "nav.openMenu": "Menu",
  "nav.closeMenu": "Close",
  "nav.homeLink": "Farul Ivan — home",
  "nav.menuLabel": "Site",

  // Home
  "home.scrollCue": "Scroll",

  // Page titles. The bodies are placeholders until the real content lands.
  "work.title": "Work",
  "about.title": "About",
  "contact.title": "Contact",

  // Home sections. Each one is a teaser that leads somewhere real.
  "home.positioning":
    "Seventy pages, two brands, three currencies, one frontend engineer.",
  "home.stackLabel": "What I work with",
  "home.stackDescription":
    "Grouped by what it is for. The full list is on the about page.",
  "home.workLabel": "Selected work",
  "home.workDescription":
    "Four projects, with what they were for and what changed once they shipped.",
  "home.workCta": "See all work",
  "home.experienceLabel": "Experience",
  "home.experienceDescription": "The three most recent roles.",
  "home.experienceCta": "Read the full history",
  "home.writingLabel": "Writing",
  "home.writingDescription":
    "Notes on decisions that were harder than they looked.",
  "home.writingCta": "Read everything",
  "home.contactLabel": "Get in touch",
  "home.contactDescription":
    "Open to a role where the front end is treated as engineering.",
  "home.getInTouch": "Send an email",

  "writing.allLabel": "All posts",
  "writing.allDescription": "Everything published, newest first.",
  "writing.col.date": "Date",
  "writing.col.title": "Title",
  "writing.col.topic": "Topic",
  "writing.col.readTime": "Read",

  // About
  "about.subtitle":
    "Nine years of building web products, most of them the kind that have to keep working after launch.",
  "about.bio.1":
    "I am a fullstack engineer with most of my depth on the front end. For three years I was the only frontend engineer on a shariah investment platform, which is the fastest way I know to learn what a codebase does to you when nobody else is holding it.",
  "about.bio.2":
    "Most of my work has been on surfaces where being wrong is expensive — money people have actually committed, appointments at a hospital. That makes you careful about failure states in a way a marketing page never will.",
  "about.bio.3":
    "The backend half is real but smaller. I have built and run a production TypeScript service with PostgreSQL behind it, and I have read enough Go and Laravel to argue usefully about an API contract rather than just consuming whatever arrives.",
  "about.bio.4":
    "I work in English and Indonesian, and I write things down — decision records, postmortems. A solo project forgets faster than a team does.",
  "about.portraitLabel": "Portrait photograph",
  "about.experienceLabel": "Experience",
  "about.experienceDescription":
    "Where the last nine years went, and what shipped in each of them.",
  "about.capabilitiesLabel": "Capabilities",
  "about.capabilitiesDescription":
    "Grouped by what it is for rather than listed by name, because a pile of tools says nothing about what you can do with them.",
  "about.col.domain": "Area",
  "about.col.items": "What that covers",
  "about.cvLabel": "Download CV",

  // Work index and case studies
  "work.subtitle":
    "Selected projects, with what the work was for and what changed once it shipped.",
  "work.allLabel": "All projects",
  "work.allDescription":
    "Everything worth listing, newest work first. Scan the stack column if you are looking for something in particular.",
  "work.featuredLabel": "Selected work",
  "work.featuredDescription":
    "Three projects in more detail. Each one has a case study behind it.",
  "work.col.index": "NN",
  "work.col.project": "Project",
  "work.col.role": "Role",
  "work.col.stack": "Stack",
  "work.col.year": "Year",
  "work.empty": "No projects published yet.",

  "project.backToIndex": "Back to work",
  "project.role": "Role",
  "project.team": "Team",
  "project.duration": "Duration",
  "project.year": "Year",
  "project.stack": "Stack",
  "project.outcomeLabel": "Outcome",
  "project.outcomeDescription":
    "What changed once it was in use. Numbers where they exist, and a plain sentence where they do not.",
  "project.linksLabel": "Links",
  "project.live": "Visit the live site",
  "project.source": "Read the source",
  "project.nextLabel": "Next project",
  "project.nextDescription": "Keep going through the work.",
  "project.untranslated":
    "This case study has not been translated yet, so you are reading the English version.",

  // Contact
  "contact.statement":
    "I am looking for a role where the front end is treated as engineering.",
  "contact.directLabel": "Direct",
  "contact.directDescription":
    "If that is what you are building, I would like to hear about it. Email reaches me fastest, and I reply to everything.",
  "contact.elsewhereLabel": "Elsewhere",
  "contact.elsewhereDescription":
    "The same person, in the places you would expect.",
  "contact.col.channel": "Channel",
  "contact.col.link": "Link",
  "contact.github": "GitHub",
  "contact.linkedin": "LinkedIn",
  "contact.cvLabel": "Download CV",

  // Footer
  "footer.menu": "Menu",
  "footer.social": "Social",
  "footer.contact": "Contact",
  "footer.rights": "© Farul Ivan {year} • All rights reserved.",

  // The CV download states its format and size, so nobody has to guess what
  // the link will do before clicking it.
  "cv.see": "See my resume",
  "cv.detail": "{format}, {size}",

  // Writing
  "writing.title": "Writing",
  "writing.subtitle":
    "Notes on building for the web — what worked, and what did not.",
  "writing.readingTime": "{minutes} min read",
  "writing.published": "Published {date}",
  "writing.updated": "Updated {date}",
  "writing.backToIndex": "Back to writing",
  "writing.empty": "Nothing published yet.",
  "writing.untranslated":
    "This post isn't available in your language yet — showing the English version.",

  // Pagination
  "pagination.label": "Writing pagination",
  "pagination.previous": "Previous",
  "pagination.next": "Next",
  "pagination.status": "Page {current} of {total}",

  // Language
  "lang.switch": "Switch to {language}",
  "lang.en": "English",
  "lang.id": "Bahasa Indonesia",

  // Accessibility helpers
  "a11y.skipToContent": "Skip to content",
  "a11y.externalLink": "(opens in a new tab)",

  // Not found
  "notFound.title": "Page not found",
  "notFound.description":
    "This page doesn't exist. It may have moved, or the link is wrong.",
  "notFound.home": "Go to the homepage",
} as const

export type TranslationKey = keyof typeof en

/**
 * Typed as `Record<TranslationKey, string>` on purpose: omit a key, or
 * misspell one, and this file fails to compile.
 */
export const id: Record<TranslationKey, string> = {
  "site.title": "Farul Ivan — Fullstack engineer, fokus frontend",
  "site.descriptor": "Fullstack engineer, fokus frontend",
  "site.description":
    "Fullstack engineer, fokus frontend. Tiga tahun sebagai satu-satunya frontend engineer di platform investasi syariah — tujuh puluh halaman, dua brand.",

  "nav.home": "Beranda",
  "nav.work": "Karya",
  "nav.about": "Tentang",
  "nav.writing": "Tulisan",
  "nav.contact": "Kontak",
  "nav.openMenu": "Menu",
  "nav.closeMenu": "Tutup",
  "nav.homeLink": "Farul Ivan — beranda",
  "nav.menuLabel": "Situs",

  "home.scrollCue": "Gulir",

  "work.title": "Karya",
  "about.title": "Tentang",
  "contact.title": "Kontak",

  // Home sections. Each one is a teaser that leads somewhere real.
  "home.positioning":
    "Tujuh puluh halaman, dua brand, tiga mata uang, satu frontend engineer.",
  "home.stackLabel": "Yang saya pakai",
  "home.stackDescription":
    "Dikelompokkan menurut kegunaannya. Daftar lengkapnya ada di halaman tentang.",
  "home.workLabel": "Karya pilihan",
  "home.workDescription":
    "Empat proyek, dengan tujuannya dan apa yang berubah setelah rilis.",
  "home.workCta": "Lihat semua karya",
  "home.experienceLabel": "Pengalaman",
  "home.experienceDescription": "Tiga peran terakhir.",
  "home.experienceCta": "Baca riwayat lengkapnya",
  "home.writingLabel": "Tulisan",
  "home.writingDescription":
    "Catatan tentang keputusan yang ternyata lebih sulit dari kelihatannya.",
  "home.writingCta": "Baca semuanya",
  "home.contactLabel": "Hubungi saya",
  "home.contactDescription":
    "Terbuka untuk peran di mana front end diperlakukan sebagai engineering.",
  "home.getInTouch": "Kirim email",

  "writing.allLabel": "Semua tulisan",
  "writing.allDescription": "Semua yang sudah terbit, dari yang terbaru.",
  "writing.col.date": "Tanggal",
  "writing.col.title": "Judul",
  "writing.col.topic": "Topik",
  "writing.col.readTime": "Baca",

  // About
  "about.subtitle":
    "Sembilan tahun membangun produk web, sebagian besar jenis yang harus tetap jalan setelah rilis.",
  "about.bio.1":
    "Saya fullstack engineer dengan kedalaman terbesar di sisi depan. Selama tiga tahun saya satu-satunya frontend engineer di platform investasi syariah — cara tercepat yang saya tahu untuk belajar apa yang dilakukan sebuah basis kode kepada Anda saat tak ada orang lain yang memegangnya.",
  "about.bio.2":
    "Sebagian besar pekerjaan saya ada di permukaan tempat kesalahan itu mahal — uang yang benar-benar sudah orang komitkan, janji temu di rumah sakit. Itu membuat Anda berhati-hati soal kondisi gagal dengan cara yang tak pernah dituntut halaman pemasaran.",
  "about.bio.3":
    "Bagian backend-nya nyata tapi lebih kecil. Saya pernah membangun dan menjalankan layanan TypeScript produksi dengan PostgreSQL di belakangnya, dan membaca cukup banyak Go dan Laravel untuk berdebat dengan berguna soal kontrak API, bukan sekadar memakai apa pun yang datang.",
  "about.bio.4":
    "Saya bekerja dalam bahasa Inggris dan Indonesia, dan saya menuliskan hal-hal — catatan keputusan, postmortem. Proyek sendirian lupa lebih cepat daripada tim.",
  "about.portraitLabel": "Foto potret",
  "about.experienceLabel": "Pengalaman",
  "about.experienceDescription":
    "Ke mana sembilan tahun terakhir pergi, dan apa yang dirilis di tiap tahapnya.",
  "about.capabilitiesLabel": "Kemampuan",
  "about.capabilitiesDescription":
    "Dikelompokkan menurut kegunaannya, bukan didaftar per nama, karena tumpukan perkakas tak menjelaskan apa pun soal hasilnya.",
  "about.col.domain": "Bidang",
  "about.col.items": "Cakupannya",
  "about.cvLabel": "Unduh CV",

  // Work index and case studies
  "work.subtitle":
    "Proyek pilihan, lengkap dengan tujuan pengerjaannya dan apa yang berubah setelah rilis.",
  "work.allLabel": "Semua proyek",
  "work.allDescription":
    "Semua yang layak dicantumkan, dari yang terbaru. Telusuri kolom teknologi jika Anda mencari sesuatu yang spesifik.",
  "work.featuredLabel": "Karya pilihan",
  "work.featuredDescription":
    "Tiga proyek dengan penjelasan lebih rinci. Masing-masing punya studi kasusnya sendiri.",
  "work.col.index": "NN",
  "work.col.project": "Proyek",
  "work.col.role": "Peran",
  "work.col.stack": "Teknologi",
  "work.col.year": "Tahun",
  "work.empty": "Belum ada proyek yang diterbitkan.",

  "project.backToIndex": "Kembali ke karya",
  "project.role": "Peran",
  "project.team": "Tim",
  "project.duration": "Durasi",
  "project.year": "Tahun",
  "project.stack": "Teknologi",
  "project.outcomeLabel": "Hasil",
  "project.outcomeDescription":
    "Apa yang berubah setelah dipakai. Ada angkanya bila memang terukur, dan satu kalimat jelas bila tidak.",
  "project.linksLabel": "Tautan",
  "project.live": "Kunjungi situsnya",
  "project.source": "Baca kodenya",
  "project.nextLabel": "Proyek berikutnya",
  "project.nextDescription": "Lanjut menelusuri karya lainnya.",
  "project.untranslated":
    "Studi kasus ini belum diterjemahkan, jadi yang Anda baca adalah versi Inggrisnya.",

  // Contact
  "contact.statement":
    "Saya mencari peran yang memperlakukan front end sebagai pekerjaan teknik.",
  "contact.directLabel": "Langsung",
  "contact.directDescription":
    "Jika itu yang sedang Anda bangun, saya ingin mendengarnya. Email paling cepat sampai, dan semua saya balas.",
  "contact.elsewhereLabel": "Di tempat lain",
  "contact.elsewhereDescription":
    "Orang yang sama, di tempat-tempat yang biasa.",
  "contact.col.channel": "Kanal",
  "contact.col.link": "Tautan",
  "contact.github": "GitHub",
  "contact.linkedin": "LinkedIn",
  "contact.cvLabel": "Unduh CV",

  "footer.menu": "Menu",
  "footer.social": "Sosial",
  "footer.contact": "Kontak",
  "footer.rights": "© Farul Ivan {year} • Seluruh hak cipta dilindungi.",

  "cv.see": "Lihat resume saya",
  "cv.detail": "{format}, {size}",

  "writing.title": "Tulisan",
  "writing.subtitle":
    "Catatan membangun untuk web — yang berhasil, dan yang tidak.",
  "writing.readingTime": "{minutes} menit baca",
  "writing.published": "Terbit {date}",
  "writing.updated": "Diperbarui {date}",
  "writing.backToIndex": "Kembali ke tulisan",
  "writing.empty": "Belum ada tulisan.",
  "writing.untranslated":
    "Tulisan ini belum tersedia dalam bahasa Anda — menampilkan versi Inggris.",

  "pagination.label": "Navigasi halaman tulisan",
  "pagination.previous": "Sebelumnya",
  "pagination.next": "Berikutnya",
  "pagination.status": "Halaman {current} dari {total}",

  "lang.switch": "Ganti ke {language}",
  "lang.en": "English",
  "lang.id": "Bahasa Indonesia",

  "a11y.skipToContent": "Lewati ke konten",
  "a11y.externalLink": "(terbuka di tab baru)",

  "notFound.title": "Halaman tidak ditemukan",
  "notFound.description":
    "Halaman ini tidak ada. Mungkin sudah dipindahkan, atau tautannya keliru.",
  "notFound.home": "Ke halaman utama",
}

export const ui = { en, id } as const
