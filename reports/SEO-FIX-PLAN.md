# MUSA.cz SEO Fix Plan — Critical Issues Only

Based on SEORadar analysis (2026-10-07) and MUSA SEO/AI Search Audit.

---

## VYSOKÁ / HIGH PRIORITY

### 1. A1 — Canonical & og:url point to a redirecting address
**Status:** All 13 pages have `canonical` and `og:url` pointing to `https://musa.cz/…` (no www).
That address 308-redirects to `https://www.musa.cz/`. Two conflicting signals.

**What to fix:**
- Change all `canonical` and `og:url` to `https://www.musa.cz/…` on all 13 pages
- Change `index.html` canonical from `https://musa.cz` → `https://www.musa.cz/`
- Change 39 internal `href="index.html"` links → `href="/"`  (logo, nav, footer)
- Estimated: 30 min

---

### 2. B2 — Zero structured data (JSON-LD) across all 13 pages
**Status:** No `application/ld+json` block found anywhere. "Musa" is ambiguous (plant genus, surname).
Machines cannot identify the company, founder, or FAQ content.

**What to fix:**
- Add JSON-LD `@graph` to homepage: ProfessionalService, Person (Petr Pycha), WebSite, FAQPage
- Add slimmer JSON-LD to all other pages: ProfessionalService + WebSite
- Estimated: 1–2 hours

---

### 3. B1 — Work archive and Blog load via JavaScript only
**Status:** `work.html` shows "0 Titles" in HTML; `works.json` has 393 records.
`blog.html` shows "No posts yet" in HTML; `posts.json` has 4 posts.
Crawlers that don't run JS see empty pages.

**What to fix:**
- Pre-render works list into `work.html` at build time (build script)
- Pre-render blog posts into `blog.html` at build time
- Estimated: 0.5–1 day

---

### 4. C1 — Hero videos total 54.5 MB
**Status:** 4 WebM files: 18.5 + 9.2 MB (desktop) + 17.5 + 9.2 MB (mobile) = 54.5 MB.
All four fetched on page load. No `poster`, no `preload="none"` on second video.

**What to fix:**
- Re-encode to 1280×720 (desktop) / 720×1280 (mobile), target 1.5–3 MB each
- Add `poster` frame image to all videos
- Set `preload="none"` on second video in each pair
- Estimated: 0.5–1 day (requires video editor + dev)

---

## STŘEDNÍ / MEDIUM PRIORITY (included because quick wins)

### 5. A2 — Missing robots.txt and sitemap.xml
**Status:** Both return 404. Web has 13 public pages, all interlinked, so crawlers find them.
But sitemap needed for Search Console, and robots.txt for AI crawler policy.

**What to fix:**
- Create `robots.txt` with sitemap reference and AI crawler allow rules
- Create `sitemap.xml` with all 13 public pages (exclude admin.html)
- Estimated: 30 min

---

### 6. E1 — Admin page publicly linked from footer
**Status:** Every page footer has a lock icon linking to `admin.html` (Content Manager).
Page has `noindex` but the link exposes it to anyone.

**What to fix:**
- Remove the admin link from all footers
- Estimated: 15 min (link appears in shared footer markup)

---

### 7. C4 — Missing CTA background image (404)
**Status:** `assets/images/orchestra-wide.jpg` returns 404. Used as background of
"Ready When You Are" CTA section on 8+ pages. Also `studio-control-room.jpg` (404, unused).

**What to fix:**
- Supply or remove `orchestra-wide.jpg` reference
- Remove `studio-control-room.jpg` from tailwind config
- Estimated: 15 min

---

### 8. D1 — No og:image on any page
**Status:** Zero `og:image` or `twitter:image` tags found. Links shared on LinkedIn/Slack/WhatsApp
show no preview image despite using `summary_large_image` card type.

**What to fix:**
- Create 1200×630 OG image
- Add `og:image`, `og:image:alt`, `og:site_name`, `twitter:image` to all pages
- Estimated: 1 hour (needs graphic + dev)

---

### 9. D2 — No favicon
**Status:** No `<link rel="icon">`, `/favicon.ico` returns 404. No apple-touch-icon, no theme-color.

**What to fix:**
- Create favicon from logo (SVG + PNG 180×180 + ICO 32×32)
- Add `<link rel="icon">`, `<link rel="apple-touch-icon">`, `<meta name="theme-color">`
- Estimated: 1 hour (needs graphic + dev)

---

### 10. E2 + C5 — Missing security headers and cache headers (vercel.json)
**Status:** `vercel.json` only sets function timeout. No cache headers (all assets max-age=0),
no security headers (X-Frame-Options, Referrer-Policy, X-Content-Type-Options).

**What to fix:**
- Expand `vercel.json` with headers config for assets cache and security
- Estimated: 30 min

---

## Implementation Order

| Step | ID | Task | Est. | Status |
|------|-----|------|------|--------|
| 1 | A1 | Fix canonical + og:url + index.html links | 30 min | DONE |
| 2 | A2 | Create robots.txt + sitemap.xml | 30 min | DONE |
| 3 | E1 | Remove admin footer link | 15 min | DONE |
| 4 | B2 | Add JSON-LD structured data | 1–2 h | DONE |
| 5 | C4 | Fix missing CTA background + remove studio-control-room.jpg 404 | 15 min | DONE |
| 6 | E2+C5 | vercel.json headers + cache | 30 min | DONE |
| 7 | D1 | Add og:image + twitter:image | 1 h | DONE |
| 8 | D2 | Add favicon + apple-touch-icon + theme-color | 1 h | DONE |
| 9 | B1 | Pre-render Work + Blog (build script) | 0.5–1 d | DONE |
| 10 | C1 | Re-encode hero videos (needs editor) | 0.5–1 d | USER |
| 11 | F2 | Fix "an Golden Globe" typo | 10 min | DONE |
| 12 | C3 | Add width/height/lazy-loading to images | 30 min | DONE |
| 13 | F1 | Fix heading hierarchy, add `<main>`, shorten meta descriptions | 1 h | DONE |
| 14 | F3 | Add BreadcrumbList JSON-LD to all subpages | 30 min | DONE |
