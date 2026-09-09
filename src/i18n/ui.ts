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

  // Footer
  "footer.menu": "Menu",
  "footer.social": "Social",
  "footer.contact": "Contact",
  "footer.rights": "© {year} Farul Ivan",
  "footer.builtWith": "Built with Astro",

  // The CV download states its format and size, so nobody has to guess what
  // the link will do before clicking it.
  "cv.download": "Download CV",
  "cv.label": "CV — {format}, {size}",

  // Writing
  "blog.title": "Writing",
  "blog.subtitle":
    "Notes on building for the web — what worked, and what did not.",
  "blog.readingTime": "{minutes} min read",
  "blog.published": "Published {date}",
  "blog.updated": "Updated {date}",
  "blog.backToBlog": "Back to writing",
  "blog.allPosts": "All posts",
  "blog.empty": "Nothing published yet.",
  "blog.untranslated":
    "This post isn't available in your language yet — showing the English version.",

  // Pagination
  "pagination.label": "Writing pagination",
  "pagination.previous": "Previous",
  "pagination.next": "Next",
  "pagination.status": "Page {current} of {total}",

  // Language
  "lang.switch": "Change language",
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

  "footer.menu": "Menu",
  "footer.social": "Sosial",
  "footer.contact": "Kontak",
  "footer.rights": "© {year} Farul Ivan",
  "footer.builtWith": "Dibuat dengan Astro",

  "cv.download": "Unduh CV",
  "cv.label": "CV — {format}, {size}",

  "blog.title": "Tulisan",
  "blog.subtitle":
    "Catatan membangun untuk web — yang berhasil, dan yang tidak.",
  "blog.readingTime": "{minutes} menit baca",
  "blog.published": "Terbit {date}",
  "blog.updated": "Diperbarui {date}",
  "blog.backToBlog": "Kembali ke tulisan",
  "blog.allPosts": "Semua tulisan",
  "blog.empty": "Belum ada tulisan.",
  "blog.untranslated":
    "Tulisan ini belum tersedia dalam bahasa Anda — menampilkan versi Inggris.",

  "pagination.label": "Navigasi halaman tulisan",
  "pagination.previous": "Sebelumnya",
  "pagination.next": "Berikutnya",
  "pagination.status": "Halaman {current} dari {total}",

  "lang.switch": "Ubah bahasa",
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
