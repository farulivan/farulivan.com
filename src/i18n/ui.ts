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
  "site.descriptor": "Frontend engineer\u00a0· end\u00a0to\u00a0end",
  "site.description":
    "Three years as the sole frontend engineer on a production fintech platform, now growing into the backend.",

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

  // Home. The hero says who, what, that I am looking, and how to reach me.
  "home.availability":
    "Open to frontend and full-stack roles\u00a0· Remote or Indonesia\u00a0· UTC+7",
  "home.emailCta": "Email me",
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
    "I work end to end on web products: the interface people touch, the API contracts behind it, and the tests and pipelines that keep both honest.",
  "home.workLabel": "Selected work",
  "home.workDescription":
    "Three projects, with what they were for and what changed once they shipped.",
  "home.workCta": "See all work",
  "home.experienceLabel": "Experience",
  "home.experienceDescription": "The three most recent.",
  "home.experienceCta": "Read the full history",
  "home.writingLabel": "Writing",
  "og.caseStudy": "Case study",
  "home.writingDescription": "Decisions I've made, and what each one cost.",
  "home.writingCta": "Read everything",

  "writing.allLabel": "All posts",
  "writing.allDescription": "Everything published, newest first.",
  "writing.col.date": "Date",
  "writing.col.title": "Title",
  "writing.col.topic": "Topic",
  "writing.col.readTime": "Read",

  // About
  "about.subtitle":
    "From architecture school to frontend engineering, and now into the backend.",
  "about.bio.1":
    "For three years I was the only frontend engineer at Nabitu and Zeed Sharia, two shariah investment platforms. I built their frontends from scratch in plain React, then rebuilt them in Next.js: over a hundred pages in all, now used by more than 3,000 investors. Being the only one meant owning far more than the UI. I worked directly with backend, product and leadership, and learned the Laravel backend well enough to find where a bug lived before taking it to the engineer who owned it.",
  "about.bio.2":
    "These days I'm growing past the frontend. I finished Boot.dev's backend developer path in both Go and TypeScript, and I build and run my own production systems, including a WhatsApp bot my family uses every day. AI tools like Claude Code are part of how I work through a problem, not a way around it.",
  "about.bio.3":
    "My route here wasn't a straight line. I studied architecture and spent five years in fire protection engineering, until COVID-19 hit that industry hard and freelance 3D visualisation couldn't become my main career. So I looked for a skill I could learn from home for very little, and a career I could mostly do from home. After trying data analysis and mobile development, I stayed with frontend: my design training still counted there, and it's what I enjoyed most. That training is probably why I still care about structure and the small details most people don't notice.",
  "about.portraitAlt": "A portrait of Farul Ivan.",
  "about.historyLabel": "History",
  "about.historyDescription":
    "From architecture school in 2011 to the last thing I shipped.",
  "about.beforeSoftware": "Before software",
  "about.capabilitiesLabel": "Capabilities",
  "about.capabilitiesDescription":
    "Grouped by how deep it goes, because a flat list of tools says nothing about which of them I'd want to be woken up about.",
  "about.col.domain": "Area",
  "about.col.items": "What that covers",
  "about.col.note": "How deep it goes",
  "about.present": "Present",
  "about.education": "Education",
  "about.nowLabel": "Now",
  "about.nowDescription": "What I'm getting better at right now.",
  "about.now":
    "System design, retrieval-augmented generation, and the workflows for directing AI agents rather than being directed by them.",

  // Work index and case studies
  "work.subtitle":
    "Work for an employer and a client, a bot for my family and me, and a site for an imagined studio, built only for this portfolio.",
  "work.allLabel": "All projects",
  "work.allDescription": "Every project, in the order I'd show them.",
  "work.featuredLabel": "Selected work",
  "work.featuredDescription": "The three I'd start with, in more detail.",
  "work.col.index": "#",
  "work.col.project": "Project",
  "work.col.role": "Role",
  "work.col.stack": "Stack",
  "work.col.year": "Year",
  "work.empty": "No projects published yet.",

  "project.backToIndex": "Back to work",
  "project.readCaseStudy": "Read the case study",
  "project.role": "Role",
  "project.contents": "Contents",
  "project.team": "Team",
  "project.duration": "Duration",
  "project.year": "Year",
  "project.stack": "Stack",
  "project.outcomeLabel": "Outcome",
  "project.live": "Visit the live site",
  "project.visit": "Visit {name}",
  "project.source": "Read the source",
  "project.nextLabel": "Next project",
  "project.nextDescription": "One more, in the same detail.",
  "project.untranslated":
    "This case study hasn't been translated yet, so you're reading the English version.",

  // Contact
  "contact.statement":
    "I am looking for a role where the front end is treated as engineering.",
  "contact.directLabel": "Direct",
  "contact.directDescription":
    "If that is what you are building, I would like to hear about it. Email reaches me fastest, and I reply to everything.",
  "contact.elsewhereLabel": "Elsewhere",
  "contact.elsewhereDescription":
    "The same person, in the places you would expect.",
  "contact.copyEmail": "Copy email",
  "contact.copied": "Copied",
  "contact.copyFailed": "Couldn't copy it",
  "contact.practicalLabel": "Practicalities",
  "contact.col.roles": "Roles",
  "contact.col.location": "Location",
  "contact.col.start": "Earliest start",
  "contact.col.replies": "Replies",
  "contact.roles": "Frontend and full-stack",
  "contact.location": "Remote or Indonesia, UTC+7",
  "contact.start": "Immediately",
  "contact.replies": "Within one working day",
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

  "home.availability":
    "Terbuka untuk peran frontend dan full-stack\u00a0· Remote atau di Indonesia\u00a0· UTC+7",
  "home.emailCta": "Kirim email",
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
    "Tiga proyek, dengan tujuannya dan apa yang berubah setelah rilis.",
  "home.workCta": "Lihat semua karya",
  "home.experienceLabel": "Pengalaman",
  "home.experienceDescription": "Tiga peran terakhir.",
  "home.experienceCta": "Baca riwayat lengkapnya",
  "home.writingLabel": "Tulisan",
  "og.caseStudy": "Studi kasus",
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
    "Selama tiga tahun saya satu-satunya frontend engineer di startup fintech, Nabitu. Saya membangun produknya dari MVP awal sampai penulisan ulang produksi penuh: lebih dari seratus halaman, pengguna nyata, taruhan nyata. Tak ada orang lain di frontend, jadi saya memegang jauh lebih banyak daripada UI, bekerja langsung dengan backend, produk, dan CEO untuk merilis hal yang benar-benar jalan.",
  "about.bio.2":
    "Belakangan saya sengaja tumbuh melewati frontend. Saya menyelesaikan jalur backend dengan Go dan TypeScript, dan saya membangun serta menjalankan sistem produksi saya sendiri, termasuk bot WhatsApp yang dipakai keluarga saya setiap hari. Saya juga memakai alat AI seperti Claude Code setiap hari. Bukan sebagai jalan pintas, tapi sebagai bagian nyata dari cara saya memikirkan masalah.",
  "about.bio.3":
    "Jalan saya ke sini tidak lurus. Saya belajar arsitektur sebelum pindah ke perangkat lunak, yang mungkin alasannya saya masih peduli pada struktur dan detail kecil yang tak diperhatikan kebanyakan orang. Sekarang itu muncul di cara saya menulis kode, bukan di gambar apa pun.",
  "about.portraitAlt": "Potret Farul Ivan.",
  "about.historyLabel": "Riwayat",
  "about.historyDescription":
    "Dari kuliah arsitektur pada 2011 sampai hal terakhir yang saya rilis.",
  "about.beforeSoftware": "Sebelum beralih ke software",
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
  "work.col.index": "#",
  "work.col.project": "Proyek",
  "work.col.role": "Peran",
  "work.col.stack": "Teknologi",
  "work.col.year": "Tahun",
  "work.empty": "Belum ada proyek yang diterbitkan.",

  "project.backToIndex": "Kembali ke karya",
  "project.readCaseStudy": "Baca studi kasusnya",
  "project.role": "Peran",
  "project.contents": "Daftar isi",
  "project.team": "Tim",
  "project.duration": "Durasi",
  "project.year": "Tahun",
  "project.stack": "Teknologi",
  "project.outcomeLabel": "Hasil",
  "project.live": "Kunjungi situsnya",
  "project.visit": "Kunjungi {name}",
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
  "contact.copyEmail": "Salin email",
  "contact.copied": "Sudah disalin",
  "contact.copyFailed": "Gagal menyalin",
  "contact.practicalLabel": "Hal praktis",
  "contact.col.roles": "Peran",
  "contact.col.location": "Lokasi",
  "contact.col.start": "Mulai paling cepat",
  "contact.col.replies": "Balasan",
  "contact.roles": "Frontend dan full-stack",
  "contact.location": "Remote atau di Indonesia, UTC+7",
  "contact.start": "Segera",
  "contact.replies": "Dalam satu hari kerja",
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
