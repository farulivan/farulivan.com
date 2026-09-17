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
  "site.title": "Farul Ivan · Frontend engineer · end to end",
  "site.descriptor": "Frontend engineer\u00a0· end to end",
  "site.description":
    "Three years as the sole frontend engineer on a production fintech platform, and deliberately growing into the backend.",

  // Navigation
  "nav.home": "Home",
  "nav.work": "Work",
  "nav.about": "About",
  "nav.writing": "Writing",
  "nav.contact": "Contact",
  "nav.openMenu": "Menu",
  "nav.closeMenu": "Close",
  "nav.homeLink": "Farul Ivan, home",
  "nav.menuLabel": "Site",

  // Home
  "home.scrollCue": "Scroll down",

  // Page titles. The bodies are placeholders until the real content lands.
  "work.title": "Work",
  "about.title": "About",
  "contact.title": "Contact",

  // Home sections. Each one is a teaser that leads somewhere real.
  "home.positioning":
    "I own what I build, from architecture decisions to production, and I don't stop at the frontend when a feature needs more.",
  "home.stackLabel": "What I do",
  "home.stackDescription":
    "I work end to end on web products: the interface people touch, the API contracts behind it, and the tests and pipelines that keep both honest. Three years of that as the only frontend engineer on a production platform.",
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

  "writing.allLabel": "All posts",
  "writing.allDescription": "Everything published, newest first.",
  "writing.col.date": "Date",
  "writing.col.title": "Title",
  "writing.col.topic": "Topic",
  "writing.col.readTime": "Read",

  // About
  "about.subtitle":
    "Three years of sole ownership on a production platform, and a deliberate push into everything around it.",
  "about.bio.1":
    "For three years I was the sole frontend engineer at a fintech startup, Nabitu. I built the product from an early MVP to a full production rewrite: seventy pages, real users, real stakes. There was no one else on frontend, so I ended up owning far more than the UI, working directly with backend, product and the CEO to ship things that actually worked.",
  "about.bio.2":
    "These days I am deliberately growing beyond the frontend. I finished a backend path in Go and TypeScript, and I build and run my own production systems, including a WhatsApp bot my family uses every day. I also work with AI tools like Claude Code daily. Not as a shortcut, but as a real part of how I think through problems.",
  "about.bio.3":
    "My path here was not a straight line. I studied architecture before moving into software, which is probably why I still care about structure and the small details most people do not notice. These days that shows up in how I write code rather than in anything I draw.",
  "about.portraitLabel": "Portrait photograph",
  "about.historyLabel": "History",
  "about.historyDescription":
    "Fifteen years of it, from university to the last thing I shipped.",
  "about.capabilitiesLabel": "Capabilities",
  "about.capabilitiesDescription":
    "Grouped by how deep it actually goes, because a flat list of tools says nothing about which of them I would want to be woken up about.",
  "about.col.domain": "Area",
  "about.col.items": "What that covers",
  "about.col.note": "How deep it goes",
  "about.present": "Present",
  "about.education": "Education",
  "about.nowLabel": "Now",
  "about.nowDescription":
    "What I am working on getting better at, at the moment.",
  "about.now":
    "System design, retrieval-augmented generation, and the workflows for directing AI agents rather than being directed by them.",

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
  "project.contents": "Contents",
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

  // Footer
  "footer.menu": "Menu",
  "footer.social": "Social",
  "footer.contact": "Contact",
  "footer.rights": "© Farul Ivan {year} • All rights reserved.",

  // The CV download states its format and size, so nobody has to guess what
  // the link will do before clicking it.
  "cv.download": "Download my CV",
  "cv.short": "My CV",
  "cv.detail": "{format}, {size}",

  // Writing
  "writing.title": "Writing",
  "writing.subtitle":
    "Notes on building for the web. What worked, and what did not.",
  "writing.readingTime": "{minutes} min read",
  "writing.published": "Published {date}",
  "writing.updated": "Updated {date}",
  "writing.backToIndex": "Back to writing",
  "writing.contents": "Contents",
  "writing.empty": "Nothing published yet.",
  "writing.untranslated":
    "This post is not available in your language yet. Showing the English version.",

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
  "site.title": "Farul Ivan · Frontend engineer · dari awal sampai produksi",
  "site.descriptor": "Frontend engineer\u00a0· dari awal sampai produksi",
  "site.description":
    "Tiga tahun sebagai satu-satunya frontend engineer di platform fintech produksi, dan sedang menumbuhkan sisi backend dengan sengaja.",

  "nav.home": "Beranda",
  "nav.work": "Karya",
  "nav.about": "Tentang",
  "nav.writing": "Tulisan",
  "nav.contact": "Kontak",
  "nav.openMenu": "Menu",
  "nav.closeMenu": "Tutup",
  "nav.homeLink": "Farul Ivan, beranda",
  "nav.menuLabel": "Situs",

  "home.scrollCue": "Gulir ke bawah",

  "work.title": "Karya",
  "about.title": "Tentang",
  "contact.title": "Kontak",

  // Home sections. Each one is a teaser that leads somewhere real.
  "home.positioning":
    "Saya memiliki apa yang saya bangun, dari keputusan arsitektur sampai produksi, dan saya tidak berhenti di frontend saat sebuah fitur butuh lebih.",
  "home.stackLabel": "Yang saya kerjakan",
  "home.stackDescription":
    "Saya mengerjakan produk web dari hulu ke hilir: antarmuka yang disentuh orang, kontrak API di belakangnya, serta pengujian dan pipeline yang menjaga keduanya tetap jujur. Tiga tahun sebagai satu-satunya frontend engineer di platform produksi.",
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

  "writing.allLabel": "Semua tulisan",
  "writing.allDescription": "Semua yang sudah terbit, dari yang terbaru.",
  "writing.col.date": "Tanggal",
  "writing.col.title": "Judul",
  "writing.col.topic": "Topik",
  "writing.col.readTime": "Baca",

  // About
  "about.subtitle":
    "Tiga tahun memegang sendiri sebuah platform produksi, dan dorongan sengaja ke semua yang ada di sekitarnya.",
  "about.bio.1":
    "Selama tiga tahun saya satu-satunya frontend engineer di startup fintech, Nabitu. Saya membangun produknya dari MVP awal sampai penulisan ulang produksi penuh: tujuh puluh halaman, pengguna nyata, taruhan nyata. Tak ada orang lain di frontend, jadi saya memegang jauh lebih banyak daripada UI, bekerja langsung dengan backend, produk, dan CEO untuk merilis hal yang benar-benar jalan.",
  "about.bio.2":
    "Belakangan saya sengaja tumbuh melewati frontend. Saya menyelesaikan jalur backend dengan Go dan TypeScript, dan saya membangun serta menjalankan sistem produksi saya sendiri, termasuk bot WhatsApp yang dipakai keluarga saya setiap hari. Saya juga memakai alat AI seperti Claude Code setiap hari. Bukan sebagai jalan pintas, tapi sebagai bagian nyata dari cara saya memikirkan masalah.",
  "about.bio.3":
    "Jalan saya ke sini tidak lurus. Saya belajar arsitektur sebelum pindah ke perangkat lunak, yang mungkin alasannya saya masih peduli pada struktur dan detail kecil yang tak diperhatikan kebanyakan orang. Sekarang itu muncul di cara saya menulis kode, bukan di gambar apa pun.",
  "about.portraitLabel": "Foto potret",
  "about.historyLabel": "Riwayat",
  "about.historyDescription":
    "Lima belas tahun, dari bangku kuliah sampai hal terakhir yang saya rilis.",
  "about.capabilitiesLabel": "Kemampuan",
  "about.capabilitiesDescription":
    "Dikelompokkan menurut seberapa dalam sebenarnya, karena daftar perkakas yang datar tak menjelaskan mana yang benar-benar saya kuasai.",
  "about.col.domain": "Bidang",
  "about.col.items": "Cakupannya",
  "about.col.note": "Seberapa dalam",
  "about.present": "Sekarang",
  "about.education": "Pendidikan",
  "about.nowLabel": "Sekarang",
  "about.nowDescription":
    "Yang sedang saya usahakan untuk lebih baik, saat ini.",
  "about.now":
    "Desain sistem, retrieval-augmented generation, dan cara mengarahkan agen AI alih-alih diarahkan olehnya.",

  // Work index and case studies
  "work.subtitle":
    "Proyek pilihan, dengan tujuan pengerjaannya dan apa yang berubah setelah rilis.",
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
  "project.contents": "Daftar isi",
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

  "footer.menu": "Menu",
  "footer.social": "Sosial",
  "footer.contact": "Kontak",
  "footer.rights": "© Farul Ivan {year} • Seluruh hak cipta dilindungi.",

  "cv.download": "Unduh CV saya",
  "cv.short": "CV saya",
  "cv.detail": "{format}, {size}",

  "writing.title": "Tulisan",
  "writing.subtitle":
    "Catatan membangun untuk web. Yang berhasil, dan yang tidak.",
  "writing.readingTime": "{minutes} menit baca",
  "writing.published": "Terbit {date}",
  "writing.updated": "Diperbarui {date}",
  "writing.backToIndex": "Kembali ke tulisan",
  "writing.contents": "Daftar isi",
  "writing.empty": "Belum ada tulisan.",
  "writing.untranslated":
    "Tulisan ini belum tersedia dalam bahasa Anda. Menampilkan versi Inggris.",

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
