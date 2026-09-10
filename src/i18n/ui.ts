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
  "site.title": "Farul Ivan — Frontend & Fullstack Engineer",
  "site.descriptor": "Frontend & Fullstack Engineer",
  // TODO(content): replace with the real positioning sentence.
  "site.description":
    "Frontend and fullstack engineer. I build web products that stay fast and maintainable as they grow.",

  // Navigation
  "nav.main": "Primary",
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
  "page.comingSoon": "This page is still being written.",

  // About
  "about.subtitle":
    "Nine years of building web products, most of them the kind that have to keep working after launch.",
  // TODO(content): four real paragraphs. These are the right length, not the
  // right words.
  "about.bio.1":
    "I build web products, mostly the front end and enough of the back end to know why the front end is slow. Nine years of it, across a payments company, a logistics operator and a studio that shipped for other people.",
  "about.bio.2":
    "The work I am proudest of is rarely the work that looks impressive in a screenshot. It is the reporting query that stopped taking eleven seconds, the form that finally filled itself in correctly, the release that nobody noticed because nothing broke.",
  "about.bio.3":
    "I care about the parts of a codebase that decide how it ages: where the boundaries are, what the types promise, whether a new person can find the thing they came for. Speed matters, and so does the second year.",
  "about.bio.4":
    "I write in English and Indonesian, review code carefully, and would rather ask a question early than build the wrong thing well.",
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
  "project.stackLabel": "Built with",
  "project.stackDescription":
    "The tools this was made from, and what each was for.",
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
  "footer.builtWith": "Built with Astro",

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
  "writing.allPosts": "All posts",
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
  "site.title": "Farul Ivan — Frontend & Fullstack Engineer",
  "site.descriptor": "Frontend & Fullstack Engineer",
  "site.description":
    "Frontend dan fullstack engineer. Saya membangun produk web yang tetap cepat dan mudah dirawat seiring pertumbuhannya.",

  "nav.main": "Utama",
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
  "page.comingSoon": "Halaman ini masih dalam penulisan.",

  // About
  "about.subtitle":
    "Sembilan tahun membangun produk web, sebagian besar jenis yang harus tetap jalan setelah rilis.",
  "about.bio.1":
    "Saya membangun produk web, terutama sisi depan dan cukup banyak sisi belakang untuk paham kenapa sisi depannya lambat. Sudah sembilan tahun, di sebuah perusahaan pembayaran, operator logistik, dan studio yang mengerjakan produk orang lain.",
  "about.bio.2":
    "Pekerjaan yang paling saya banggakan jarang terlihat mengesankan dalam tangkapan layar. Bentuknya kueri laporan yang tak lagi butuh sebelas detik, formulir yang akhirnya terisi dengan benar, rilis yang tak disadari siapa pun karena tak ada yang rusak.",
  "about.bio.3":
    "Saya peduli pada bagian basis kode yang menentukan bagaimana ia menua: di mana batasnya, apa yang dijanjikan tipenya, apakah orang baru bisa menemukan yang ia cari. Kecepatan itu penting, dan tahun kedua juga.",
  "about.bio.4":
    "Saya menulis dalam bahasa Inggris dan Indonesia, mengulas kode dengan teliti, dan lebih suka bertanya lebih awal daripada membangun hal yang salah dengan rapi.",
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
  "project.stackLabel": "Dibangun dengan",
  "project.stackDescription":
    "Perkakas yang dipakai, dan untuk apa masing-masing.",
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
  "footer.builtWith": "Dibuat dengan Astro",

  "cv.see": "Lihat resume saya",
  "cv.detail": "{format}, {size}",

  "writing.title": "Tulisan",
  "writing.subtitle":
    "Catatan membangun untuk web — yang berhasil, dan yang tidak.",
  "writing.readingTime": "{minutes} menit baca",
  "writing.published": "Terbit {date}",
  "writing.updated": "Diperbarui {date}",
  "writing.backToIndex": "Kembali ke tulisan",
  "writing.allPosts": "Semua tulisan",
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
