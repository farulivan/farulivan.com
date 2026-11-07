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
 * studies and posts — lives in `src/content/` and is written in both languages
 * too. An entry with no Indonesian file yet falls back to the English one,
 * under a note that says so.
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
  "writing.col.readTime": "Length",

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
    "Going deeper on the frontend, which is still my main craft. Growing into the backend, and into what a platform needs beyond the code: security, deployment, maintenance, and DevOps on AWS and Cloudflare. Looking toward mobile development. And keeping up with AI, to work faster while staying secure and accountable.",

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
    "I'm looking for a role where the frontend is treated as engineering, not decoration.",
  "contact.directLabel": "Direct",
  "contact.directDescription":
    "If that's what you're building, I'd like to hear about it. Email reaches me fastest, and I reply to everything.",
  "contact.elsewhereLabel": "Elsewhere",
  "contact.elsewhereDescription": "Code on GitHub, career on LinkedIn.",
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
  "footer.rights": "© {year} Farul Ivan\u00a0· All rights reserved.",

  // The CV download states its format and size, so nobody has to guess what
  // the link will do before clicking it.
  "cv.download": "Download my CV",
  "cv.short": "My CV",
  "cv.detail": "{format}, {size}",

  // Writing
  "writing.title": "Writing",
  "writing.subtitle":
    "Notes from building and running software, whenever a decision is worth writing down.",
  "writing.readingTime": "{minutes} min read",
  "writing.published": "Published {date}",
  "writing.updated": "Updated {date}",
  "writing.backToIndex": "Back to writing",
  "writing.contents": "Contents",
  "writing.empty": "Nothing published yet.",
  "writing.untranslated":
    "This post isn't available in your language yet, so you're reading the English version.",

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
  // The job title and "end to end" stay in English: that's how Indonesian
  // engineers say them.
  "site.title": "Farul Ivan · Frontend engineer · end to end",
  "site.descriptor": "Frontend engineer\u00a0· end\u00a0to\u00a0end",
  "site.description":
    "Tiga tahun sebagai satu-satunya frontend engineer di platform fintech yang sudah live, dan sekarang sedang mendalami backend.",

  "nav.home": "Beranda",
  "nav.work": "Proyek",
  "nav.about": "Tentang",
  "nav.writing": "Tulisan",
  "nav.contact": "Kontak",
  "nav.openMenu": "Menu",
  "nav.closeMenu": "Tutup",
  "nav.homeLink": "Farul Ivan, beranda",
  "nav.menuLabel": "Situs",

  "home.availability":
    "Terbuka untuk posisi frontend dan full-stack\u00a0· Remote atau di\u00a0Indonesia\u00a0· UTC+7",
  "home.emailCta": "Kirim email",
  "home.scrollCue": "Scroll ke bawah",

  "work.title": "Proyek",
  "about.title": "Tentang",
  "contact.title": "Kontak",

  // Home sections. Each one is a teaser that leads somewhere real.
  "home.positioning":
    "Yang saya bangun, saya pegang penuh: dari keputusan arsitektur sampai production. Kalau sebuah fitur butuh lebih, saya tidak berhenti di frontend.",
  "home.stackLabel": "Yang saya kerjakan",
  "home.stackDescription":
    "Saya mengerjakan produk web end to end: UI yang langsung dipakai pengguna, kontrak API di baliknya, sampai test dan pipeline yang menjaga keduanya tetap bisa diandalkan.",
  "home.workLabel": "Proyek pilihan",
  "home.workDescription":
    "Tiga proyek, lengkap dengan tujuannya dan apa yang berubah setelah dirilis.",
  "home.workCta": "Lihat semua proyek",
  "home.experienceLabel": "Pengalaman",
  "home.experienceDescription": "Tiga yang terbaru.",
  "home.experienceCta": "Lihat riwayat lengkapnya",
  "home.writingLabel": "Tulisan",
  "og.caseStudy": "Studi kasus",
  "home.writingDescription":
    "Keputusan teknis yang pernah saya ambil, dan harga yang harus dibayar untuk masing-masing.",
  "home.writingCta": "Baca semua tulisan",

  "writing.allLabel": "Semua tulisan",
  "writing.allDescription": "Semua yang sudah terbit, mulai dari yang terbaru.",
  "writing.col.date": "Tanggal",
  "writing.col.title": "Judul",
  "writing.col.topic": "Topik",
  "writing.col.readTime": "Waktu baca",

  // About
  "about.subtitle":
    "Dari kuliah arsitektur ke frontend engineering, dan sekarang merambah ke backend.",
  "about.bio.1":
    "Selama tiga tahun, saya menjadi satu-satunya frontend engineer di Nabitu dan Zeed Sharia, dua platform investasi syariah. Saya membangun frontend keduanya dari nol dengan React biasa, versi yang kini dipakai lebih dari 3.000 investor, lalu membangunnya ulang dengan Next.js. Kalau digabung, totalnya lebih dari seratus halaman. Sendirian di frontend, tanggung jawab saya jauh lebih luas dari sekadar UI. Saya bekerja langsung dengan tim backend, tim produk, dan manajemen. Saya juga mempelajari backend Laravel-nya sampai cukup paham untuk menemukan letak bug, sebelum membawanya ke engineer yang memegang bagian itu.",
  "about.bio.2":
    "Sekarang saya sedang memperluas kemampuan di luar frontend. Saya sudah menyelesaikan backend developer path di Boot.dev, baik untuk Go maupun TypeScript. Saya juga membangun dan menjalankan sistem production saya sendiri, termasuk bot WhatsApp yang dipakai keluarga saya setiap hari. Tools AI seperti Claude Code jadi bagian dari cara saya memecahkan masalah, bukan jalan pintas untuk menghindarinya.",
  "about.bio.3":
    "Jalan saya sampai ke sini tidak lurus. Saya kuliah arsitektur, lalu lima tahun bekerja di bidang proteksi kebakaran, sampai pandemi COVID-19 membuat industri itu terpuruk. Saya sempat mencoba freelance visualisasi 3D arsitektur, tapi pekerjaan itu sulit dijadikan karier utama. Jadi saya mencari keahlian yang bisa dipelajari dari rumah dengan biaya minim, dan karier yang sebagian besar bisa dijalani dari rumah juga. Setelah mencoba data analysis dan mobile development, akhirnya saya memilih frontend: latar belakang desain saya masih terpakai di sana, dan bidang inilah yang paling saya nikmati. Mungkin bekal itu juga yang membuat saya masih peduli pada struktur dan detail kecil yang sering luput dari perhatian orang.",
  "about.portraitAlt": "Potret Farul Ivan.",
  "about.historyLabel": "Riwayat",
  "about.historyDescription":
    "Dari kuliah arsitektur tahun 2011 sampai proyek terakhir yang saya rilis.",
  "about.beforeSoftware": "Sebelum beralih ke software",
  "about.capabilitiesLabel": "Kemampuan",
  "about.capabilitiesDescription":
    "Dikelompokkan menurut seberapa dalam saya menguasainya, karena sekadar daftar tools tidak menunjukkan mana yang siap saya tangani kalau ada masalah jam dua pagi.",
  "about.col.domain": "Bidang",
  "about.col.items": "Cakupan",
  "about.col.note": "Seberapa dalam",
  "about.present": "Sekarang",
  "about.education": "Pendidikan",
  "about.nowLabel": "Saat ini",
  "about.nowDescription": "Hal-hal yang sedang saya dalami.",
  "about.now":
    "Saya terus memperdalam frontend, yang masih jadi keahlian utama saya, sambil merambah backend dan semua yang dibutuhkan sebuah platform di luar kode: keamanan, deployment, maintenance, sampai DevOps di AWS dan Cloudflare. Saya juga mulai melirik mobile development. Dan saya terus mengikuti perkembangan AI, supaya bisa bekerja lebih cepat dan efisien, dengan hasil yang tetap aman dan bisa dipertanggungjawabkan.",

  // Work index and case studies
  "work.subtitle":
    "Proyek untuk perusahaan dan klien, bot untuk saya dan keluarga, serta situs studio rekaan yang saya bangun khusus untuk portofolio ini.",
  "work.allLabel": "Semua proyek",
  "work.allDescription":
    "Semua proyek, sesuai urutan yang ingin saya tunjukkan.",
  "work.featuredLabel": "Proyek pilihan",
  "work.featuredDescription":
    "Tiga proyek yang akan saya tunjukkan lebih dulu, dengan cerita yang lebih lengkap.",
  "work.col.index": "#",
  "work.col.project": "Proyek",
  "work.col.role": "Peran",
  "work.col.stack": "Tech stack",
  "work.col.year": "Tahun",
  "work.empty": "Belum ada proyek di sini.",

  "project.backToIndex": "Kembali ke proyek",
  "project.readCaseStudy": "Baca studi kasusnya",
  "project.role": "Peran",
  "project.contents": "Daftar isi",
  "project.team": "Tim",
  "project.duration": "Durasi",
  "project.year": "Tahun",
  "project.stack": "Tech stack",
  "project.outcomeLabel": "Hasil",
  "project.live": "Buka situsnya",
  "project.visit": "Buka {name}",
  "project.source": "Lihat kodenya",
  "project.nextLabel": "Proyek berikutnya",
  "project.nextDescription": "Satu lagi, dengan cerita yang sama lengkapnya.",
  "project.untranslated":
    "Studi kasus ini belum tersedia dalam bahasa Indonesia, jadi yang kamu baca adalah versi bahasa Inggrisnya.",

  // Contact
  "contact.statement":
    "Saya mencari posisi di tim yang melihat frontend sebagai pekerjaan engineering, bukan sekadar pemanis.",
  "contact.directLabel": "Hubungi langsung",
  "contact.directDescription":
    "Kalau itu yang sedang dibangun oleh timmu, saya akan senang mendengar lebih banyak tentangnya. Email adalah cara terbaik untuk menghubungi saya, dan saya selalu berusaha membalas setiap pesan yang masuk.",
  "contact.elsewhereLabel": "Di tempat lain",
  "contact.elsewhereDescription": "Kode di GitHub, riwayat karier di LinkedIn.",
  "contact.copyEmail": "Salin email",
  "contact.copied": "Sudah disalin",
  "contact.copyFailed": "Gagal menyalin",
  "contact.practicalLabel": "Info praktis",
  "contact.col.roles": "Posisi",
  "contact.col.location": "Lokasi",
  "contact.col.start": "Bisa mulai",
  "contact.col.replies": "Waktu balas",
  "contact.roles": "Frontend dan full-stack",
  "contact.location": "Remote atau di\u00a0Indonesia, UTC+7",
  "contact.start": "Segera",
  "contact.replies": "Dalam satu hari kerja",
  "contact.col.channel": "Platform",
  "contact.col.link": "Link",
  "contact.github": "GitHub",
  "contact.linkedin": "LinkedIn",

  "footer.menu": "Menu",
  "footer.social": "Media sosial",
  "footer.contact": "Kontak",
  "footer.rights":
    "© {year} Farul Ivan\u00a0· Hak cipta dilindungi undang-undang.",

  "cv.download": "Unduh CV saya",
  "cv.short": "CV saya",
  "cv.detail": "{format}, {size}",

  "writing.title": "Tulisan",
  "writing.subtitle":
    "Catatan dari pengalaman membangun dan menjalankan software, setiap kali ada keputusan yang layak dituliskan.",
  "writing.readingTime": "{minutes} menit baca",
  "writing.published": "Terbit {date}",
  "writing.updated": "Diperbarui {date}",
  "writing.backToIndex": "Kembali ke tulisan",
  "writing.contents": "Daftar isi",
  "writing.empty": "Belum ada tulisan.",
  "writing.untranslated":
    "Tulisan ini belum tersedia dalam bahasa Indonesia, jadi yang kamu baca adalah versi bahasa Inggrisnya.",

  "pagination.label": "Navigasi halaman tulisan",
  "pagination.previous": "Sebelumnya",
  "pagination.next": "Berikutnya",
  "pagination.status": "Halaman {current} dari {total}",

  "lang.switch": "Ganti ke {language}",
  "lang.en": "English",
  "lang.id": "Bahasa Indonesia",

  "a11y.skipToContent": "Langsung ke konten",
  "a11y.externalLink": "(membuka tab baru)",

  "notFound.title": "Halaman tidak ditemukan",
  "notFound.description":
    "Halaman ini tidak ada. Mungkin sudah dipindah, atau link-nya salah.",
  "notFound.home": "Ke beranda",
}

export const ui = { en, id } as const
