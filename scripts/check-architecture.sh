#!/usr/bin/env bash
#
# The architectural rules that types cannot express, checked as text.
#
# Each one protects a property claimed in docs/ARCHITECTURE.md. They run in CI
# and locally via `pnpm check:arch`, because a rule nobody enforces is a rule
# that quietly stops being true.

set -uo pipefail
cd "$(dirname "$0")/.."

failed=0

fail() {
  echo "FAIL  $1"
  shift
  printf '      %s\n' "$@"
  failed=1
}

pass() { echo "ok    $1"; }

# Matches a pattern in real code only. Comments in this project explain the
# rules themselves ("this component never calls getCollection"), so a naive
# grep flags the documentation as a violation.
code_matches() {
  grep -rnE "$1" "${@:2}" 2>/dev/null | awk '
    {
      line = $0
      sub(/^[^:]*:[0-9]+:/, "", line)      # drop the file:line prefix
      sub(/^[ \t]+/, "", line)             # drop leading indentation
      if (line !~ /^(\/\/|\*|\/\*|#|<!--)/) print
    }'
}

files_with_code() { code_matches "$@" | cut -d: -f1 | sort -u; }

# 1. No UI framework. Everything interactive on this site — the menu, the
#    scroll reveals, the language switcher — is small enough to be plain
#    JavaScript. A .tsx or .jsx file means one crept back in.
offenders=$(find src \( -name '*.tsx' -o -name '*.jsx' \) || true)
if [ -n "$offenders" ]; then
  fail "a framework component appeared" $offenders \
    "This site ships no framework runtime. See docs/ARCHITECTURE.md."
else
  pass "no framework components"
fi

# 2. Sections and layouts take props; only pages and the query layer fetch.
offenders=$(files_with_code 'getCollection\(' src --include='*.astro' --include='*.ts' \
  | grep -v '^src/pages/' | grep -v '^src/content/queries.ts$' || true)
if [ -n "$offenders" ]; then
  fail "getCollection outside src/pages/ and src/content/queries.ts" $offenders
else
  pass "getCollection confined to pages and the query layer"
fi

# 3. Astro 7 renders Markdown with Sätteri. Reintroducing the unified pipeline
#    silently forfeits the faster one, so it must be a deliberate act.
offenders=$(files_with_code '@astrojs/markdown-remark' src astro.config.ts || true)
if [ -n "$offenders" ]; then
  fail "the remark pipeline was reintroduced" $offenders
else
  pass "Markdown stays on the Sätteri pipeline"
fi

# 4. The kernels stay pure, so they remain testable without Astro.
offenders=$(files_with_code 'from "(astro:|@/components)' src/i18n src/content/schemas.ts || true)
if [ -n "$offenders" ]; then
  fail "a kernel imported Astro or a component" $offenders
else
  pass "src/i18n and src/content/schemas.ts stay dependency-free"
fi

# 5. User-facing copy comes from the dictionary via t(), never read directly.
offenders=$(files_with_code 'ui\[' src/components src/layouts || true)
if [ -n "$offenders" ]; then
  fail "a component read the dictionary directly instead of using t()" $offenders
else
  pass "components translate through useTranslations"
fi

# 6. The site origin lives in config, so `pnpm setup` can rewrite it. A URL
#    hardcoded in a component would survive setup silently and ship someone
#    else's domain to production.
#
#    Allowed: the two XML namespaces that are identifiers rather than
#    addresses — w3.org for SVG, schema.org for JSON-LD. Tests are excluded
#    because their fixtures are not shipped markup.
offenders=$(code_matches 'https?://' src/components src/layouts src/pages \
  --include='*.astro' --include='*.ts' --include='*.tsx' \
  | grep -vE '(www\.w3\.org|schema\.org)' \
  | grep -vE '\.test\.(ts|tsx):' \
  | cut -d: -f1 | sort -u || true)
if [ -n "$offenders" ]; then
  fail "a URL was hardcoded outside src/config/site.ts" $offenders \
    "pnpm setup rewrites the origin in config; it cannot find it here."
else
  pass "the site origin stays in config"
fi

# 7. Lime is a surface, not a text colour. On white it measures 2.06:1 at the
#    step we use as a fill, and still fails at 3.96:1 four steps darker. Only
#    two tokens are legal as text: accent-text on light grounds, and
#    accent-on-dark on the near-black one. Everything else is a contrast bug
#    that looks fine to whoever wrote it.
#
#    The two legal tokens are blanked out before the search, so a line using
#    only those has nothing left to match.
offenders=$(code_matches 'text-(lime-[0-9]|accent)' src \
  --include='*.astro' --include='*.ts' --include='*.css' \
  | sed 's/text-accent-text//g; s/text-accent-on-dark//g' \
  | grep -E 'text-(lime-[0-9]|accent)' \
  | cut -d: -f1 | sort -u || true)
if [ -n "$offenders" ]; then
  fail "lime used as a text colour" $offenders \
    "Use text-accent-text on light, or text-accent-on-dark on the dark field."
else
  pass "lime stays a surface, never text"
fi

# --- Outstanding placeholders -------------------------------------------------
#
# Anything the site is still faking: an image standing in for a photograph that
# has not been supplied, or copy waiting to be written. These are marked at the
# point of use so they can be counted rather than remembered.
#
#   TODO(asset):      a file that is still missing
#   TODO(content):    words that are still missing
#   data-placeholder  an element rendering a grey block instead of real media
#
# This reports and does not fail, so a half-finished site is still reviewable.
# Setting LAUNCH=true turns it into an error, which is what makes it impossible
# to put a grey box in front of the public.

# Plain grep, not code_matches: these markers live *in* comments, which is
# exactly what code_matches filters out.
placeholder_hits=$(grep -rn 'TODO(asset):\|TODO(content):\|data-placeholder' \
  src public 2>/dev/null | grep -v '\.test\.' || true)

echo
if [ -n "$placeholder_hits" ]; then
  n_asset=$(printf '%s\n' "$placeholder_hits" | grep -c 'TODO(asset):' || true)
  n_content=$(printf '%s\n' "$placeholder_hits" | grep -c 'TODO(content):' || true)
  n_media=$(printf '%s\n' "$placeholder_hits" | grep -c 'data-placeholder' || true)

  if [ "${LAUNCH:-}" = "true" ]; then
    fail "placeholders present: ${n_asset} files, ${n_content} strings, ${n_media} images" \
      "LAUNCH=true does not allow placeholder content."
  else
    echo "note  placeholders outstanding: ${n_asset} files · ${n_content} strings · ${n_media} images"
  fi

  printf '%s\n' "$placeholder_hits" | sed 's/^/      /' | cut -c1-120
else
  pass "no placeholders outstanding"
fi

echo
if [ "$failed" -ne 0 ]; then
  echo "Architecture check failed. See docs/ARCHITECTURE.md for the rationale."
  exit 1
fi
echo "Architecture check passed."
