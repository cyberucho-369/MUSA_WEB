# MUSA Prague — Website Documentation

> **Company:** MUSA, Ltd. — Petr Pycha  
> **Domain:** [musa.cz](https://musa.cz)  
> **Market:** Worldwide  
> **Last Updated:** 2026-06-17  

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Directory Structure](#3-directory-structure)
4. [Pages & Routing](#4-pages--routing)
5. [Design System](#5-design-system)
6. [Assets Inventory](#6-assets-inventory)
7. [Page Architecture — index.html (Homepage)](#7-page-architecture--indexhtml-homepage)
8. [Page Architecture — services-film-game.html](#8-page-architecture--services-film-gamehtml)
9. [Variant Page](#9-variant-page)
10. [Navigation & Sitemap](#10-navigation--sitemap)
11. [SEO Configuration](#11-seo-configuration)
12. [JavaScript Functionality](#12-javascript-functionality)
13. [Content Strategy Reference (musa_md)](#13-content-strategy-reference-musa_md)
14. [Key Business Information](#14-key-business-information)
15. [Credits & Portfolio](#15-credits--portfolio)
16. [Planned / Referenced Pages (Not Yet Built)](#16-planned--referenced-pages-not-yet-built)
17. [Development Notes](#17-development-notes)

---

## 1. Project Overview

MUSA is a **Prague-based orchestral recording agency** led by producer Petr Pycha. The website serves as the primary digital presence for attracting international composers, game studios, film producers, and record labels who need professional orchestral recording services.

### Core Value Proposition
> *"Hollywood-Grade Orchestral Scoring. Recorded in Prague."*

### Business Model
- **B2B service agency** — project-based revenue
- **Primary clients:** Composers, music producers, film/TV/game studios, record labels, advertising agencies
- **Pricing:** Bespoke, by-quote only — **no pricing is displayed publicly**
- **Primary conversion:** "Request a Quote" funnel

### Key Differentiators
- 30+ years of credits (Red Tails, Halo Wars, Mafia II, Final Fantasy, Civilization V/VI, Fargo, Vinland Saga, etc.)
- FILMharmonic Orchestra — proprietary contracted ensemble
- 100% buyout model — no residuals, no union complexity, total IP ownership
- Full-service delivery (orchestration, engineering, mixing, logistics, concierge)
- Prague cost advantage vs. London / LA
- Remote scoring sessions (fastest-growing service category)

---

## 2. Technology Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| **Framework** | Static HTML | No build system, no bundler — flat HTML files |
| **CSS Framework** | Tailwind CSS v3.4.17 | Loaded via CDN (`cdn.tailwindcss.com/3.4.17`) |
| **Fonts** | Google Fonts | `Inter` (sans) + `Playfair Display` (serif) |
| **JavaScript** | Vanilla JS | Inline `<script>` blocks at end of `<body>` |
| **Version Control** | Git | `.git/` present, `.gitignore` configured |
| **Deployment** | Unknown | Domain: `musa.cz` |

### Tailwind Configuration
Tailwind is configured inline via `<script>` blocks in each HTML file (no shared `tailwind.config.js`). This means **the Tailwind config is duplicated** across every HTML page. The config extends:

- **Custom fonts:** `sans: ['Inter']`, `serif: ['Playfair Display']`
- **Custom colors:** `musa.*` and `dark.*` palettes (see [Design System](#5-design-system))
- **Custom background images:** `studio-pattern`, `cta-pattern`

### .gitignore
```
._*
.DS_Store
__MACOSX
```

---

## 3. Directory Structure

```
MUSA_WEB/
├── .git/                          # Git repository
├── .gitignore                     # Ignore macOS metadata
├── index.html                     # Homepage (1,198 lines, 90 KB)
├── services-film-game.html        # Film & Game Scoring service page (666 lines, 48 KB)
├── musa_md                        # Master strategy/copy brief (1,057 lines, 47 KB) — plaintext MD
│
├── Readme/                        # 📂 This documentation folder
│   └── README.md                  # ← You are here
│
├── Variant/                       # Alternative/prototype pages
│   └── Musa_home_src_02.html      # Earlier homepage variant (690 lines, 56 KB)
│
├── assets/
│   ├── images/
│   │   ├── Orchestr_wide.jpg              # Orchestra wide shot (819 KB)
│   │   ├── Orchestr_wide02.webp           # Orchestra wide shot WebP (532 KB)
│   │   ├── Petr_Pycha Ai.webp             # Petr Pycha portrait — AI-generated (372 KB)
│   │   └── musa credits_homepage/         # Credit card images (15 JPGs)
│   │       ├── 01_red-tails.jpg           # (207 KB)
│   │       ├── 02_bad-lieutenant.jpg      # (170 KB)
│   │       ├── 03_the-beaver.jpg          # (163 KB)
│   │       ├── 04_the-factory.jpg         # (7 KB)
│   │       ├── 05_the-words.jpg           # (250 KB)
│   │       ├── 06_the-conspirator.jpg     # (158 KB)
│   │       ├── 07_dissidia.jpg            # (225 KB)
│   │       ├── 08_halo-wars.jpg           # (300 KB)
│   │       ├── 09_sarah-brightman-harem.jpg # (299 KB)
│   │       ├── 10_helloween.jpg           # (51 KB)
│   │       ├── 11_hostel.jpg              # (26 KB)
│   │       ├── 12_joss-stone.jpg          # (308 KB)
│   │       ├── 13_mafia-2.jpg             # (11 KB)
│   │       ├── 14_the-painted-veil.jpg    # (145 KB)
│   │       └── 15_celine-dion.jpg         # (43 KB)
│   │
│   ├── logos/
│   │   └── logo_Musa.png                  # Main MUSA logo (10 KB)
│   │
│   └── videos/
│       └── Musa_Webloop_01_4K_ProRess_16_9_VP9_1080_1920.webm  # Hero video (18.5 MB)
│
└── src/                           # Source directory (scaffolded but EMPTY)
    ├── app/                       # Empty
    ├── components/                # Empty
    ├── lib/                       # Empty
    └── styles/                    # Empty
```

> **Note:** The `src/` directory is entirely empty — all current implementation is in flat HTML files at the root level. The `src/` structure suggests a future migration to a component-based framework was planned but not executed.

---

## 4. Pages & Routing

### Currently Built Pages

| File | Page | Status | Size |
|------|------|--------|------|
| `index.html` | Homepage | ✅ Complete | 90 KB / 1,198 lines |
| `services-film-game.html` | Film & Game Scoring | ✅ Complete | 48 KB / 666 lines |

### Variant / Prototype

| File | Description | Status |
|------|-------------|--------|
| `Variant/Musa_home_src_02.html` | Earlier homepage prototype | ⚠️ Prototype — uses stock Unsplash images + amber color scheme instead of gold |

---

## 5. Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `musa-gold` | `#B8895A` | Primary accent — CTAs, highlights, icons, links |
| `musa-gold-light` | `#D4A96A` | Lighter gold variant |
| `musa-gold-dark` | `#96703F` | Darker gold — hover states, gradients |
| `musa-parchment` | `#F5EFE6` | Warm off-white (secondary background) |
| `musa-charcoal` | `#0E0E10` | Primary dark background |
| `musa-grey` | `#7A7B7E` | Muted text, accents |
| `musa-text-light` | `#EDE9E2` | Primary text on dark backgrounds |
| `musa-text-dark` | `#1A1A1C` | Text on light backgrounds |
| `dark-900` | `#0E0E10` | Deepest background |
| `dark-800` | `#161618` | Section alternate background |
| `dark-700` | `#222226` | Card / element backgrounds |
| `dark-600` | `#2E2E33` | Lighter dark surface |

### Typography

| Role | Font | Weights |
|------|------|---------|
| **Headlines / Display** | Playfair Display (serif) | 400, 500, 600, 700 + italic 400, 500 |
| **Body / UI** | Inter (sans-serif) | 300 (light), 400, 500, 600 |

### Spacing & Layout
- **Max content width:** `max-w-7xl` (80rem / 1280px)
- **Horizontal padding:** `px-6` (1.5rem)
- **Section padding:** `py-24` to `py-32` (6–8rem vertical)
- **Header height:** `h-24` (6rem)

### Animation System

| Class | Effect | Duration |
|-------|--------|----------|
| `.fade-in-up` | Fade in + translate up from 20px | 1s ease-out |
| `.delay-100` to `.delay-500` | Animation delay variants | 100–500ms |
| `.reveal` | Scroll-triggered fade in + translate up from 32px | 0.7s cubic-bezier |
| `.reveal-delay-1` to `.reveal-delay-4` | Staggered reveal delays | 100–400ms |
| `.ticker-track` | Infinite horizontal scroll ticker | 75s linear |

### UI Patterns
- **Gold accent line:** `w-12 h-px bg-musa-gold` — used above section labels
- **Section label:** `text-musa-gold text-sm font-bold tracking-[0.2em] uppercase`
- **CTA button (primary):** Gold bg, black text, glow shadow, tracking-widest uppercase
- **CTA button (secondary):** Transparent bg, white border, white text, uppercase
- **Card hover:** Border transitions from `white/5` to `musa-gold/50`
- **Top-bar accent on hover:** Gradient bar slides down from hidden position
- **FAQ accordion:** `max-height` transition with `+` icon rotating 45° on open

---

## 6. Assets Inventory

### Images (3 main + 15 credit cards)

| File | Type | Size | Used In |
|------|------|------|---------|
| `Orchestr_wide.jpg` | Hero/BG | 819 KB | Background patterns (referenced but not directly in current HTML) |
| `Orchestr_wide02.webp` | Hero/BG | 532 KB | `services-film-game.html` hero background |
| `Petr_Pycha Ai.webp` | Portrait | 372 KB | `index.html` value proposition section |
| `logo_Musa.png` | Logo | 10 KB | Header on all pages + footer |
| `musa credits_homepage/01-15_*.jpg` | Cards | 7–308 KB each | `index.html` credits carousel |

### Videos

| File | Type | Size | Used In |
|------|------|------|---------|
| `Musa_Webloop_01_4K_...VP9_1080_1920.webm` | Hero loop | 18.5 MB | `index.html` hero section background |

### Referenced But Missing Images
The Tailwind config references background images that are **not present** in the assets:
- `assets/images/studio-control-room.jpg` → used in `studio-pattern`
- `assets/images/orchestra-wide.jpg` → used in `cta-pattern`

---

## 7. Page Architecture — index.html (Homepage)

### Section Breakdown (top to bottom)

| # | Section | ID | Description |
|---|---------|-----|-------------|
| 1 | **Header** | — | Fixed nav with logo, nav links, "Request a Quote" CTA, mobile menu |
| 2 | **Hero** | — | Full-screen video bg, headline, subheadline, dual CTAs, ticker trust strip |
| 3 | **Three Pillars** | — | 3-column grid: World-Class Players / Global Service / End-to-End |
| 4 | **Value Proposition** | — | "The Producer's Orchestra" — 2-column with Petr Pycha portrait |
| 5 | **Services Grid** | `#services` | 4-column cards: Film & Game / Remote Sessions★ / Albums / Choir & Vocal |
| 6 | **Featured Work** | `#work` | Horizontal scrolling credits carousel with poster images |
| 7 | **Why Prague** | `#insights` | "Prague Sound. Composer Logic." — 3 numbered benefit blocks |
| 8 | **Testimonials** | — | 3-column testimonial cards (anonymous quotes) |
| 9 | **FAQ** | — | 5 collapsible FAQ items |
| 10 | **Final CTA** | `#quote` | "Ready When You Are." — parallax bg with CTA button |
| 11 | **Footer** | — | 5-column: Company info / Company links / Services links / Resources links + social icons |
| 12 | **Mobile Sticky CTA** | — | Fixed bottom bar on mobile with "Request a Quote" |

### Trust Strip (Hero Ticker) — Complete Credits List
The hero section features an infinite horizontal scrolling ticker with these titles (duplicated for seamless loop):

Life • Fargo • Vinland Saga • Violet Evergarden: The Movie • Civilization V • Made in Heaven • Civilization VI • Kingdom • S.T.A.L.K.E.R.: Shadow of Chernobyl • Warrior • Miracle in Cell No. 7 • Guns & Gulaabs • Merlin • Age of Empires III • Mafia II • Tokyo Revengers • Alice in Borderland • The Painted Veil • Even Mice Belong in Heaven • Jane Goodall: Reasons for Hope • Halo Wars • Flying Monsters 3D • Northern Limit Line • Firebird • Tin Man • The Wildest Dream • Apple Tree Yard • Valhalla: The Legend of Thor • EverQuest II • Paris 36 • In the Shadow • Star Trek: Prodigy • The Elder Scrolls Online • The Lost City of Z • Skater Girl • The Conspirator • The Beaver • The Immigrant • When Animals Dream • Red Tails • Bad Lieutenant • The Factory • The Words • Dissidia Final Fantasy • Sarah Brightman — Harem • Helloween • Hostel • Joss Stone • Celine Dion • Tunnel • Freaks • Last Chance Harvey • Enough Said

---

## 8. Page Architecture — services-film-game.html

### Section Breakdown

| # | Section | Description |
|---|---------|-------------|
| 1 | **Header** | Same as homepage (Services link highlighted in gold) |
| 2 | **Breadcrumb Hero** | Home > Services > Film & Game Scoring — with stats strip |
| 3 | **Key Benefits** | 6-card grid: Configuration / Film & Game Native / Remote / Venues / Lead Time / Buyout |
| 4 | **Video + Text** | YouTube placeholder + "The Session Experience" copy |
| 5 | **FAQ** | 5 collapsible questions specific to film/game scoring |
| 6 | **Final CTA** | "Ready When You Are." with dual CTAs |
| 7 | **Footer** | Same as homepage |

### Stats Strip
- **250+** Sessions Completed
- **30+** Years in Prague
- **100%** Buyout, No Residuals
- **2–6 wk** Typical Lead Time

---

## 9. Variant Page

`Variant/Musa_home_src_02.html` is an **earlier prototype** of the homepage with key differences:

| Aspect | Current `index.html` | Variant |
|--------|---------------------|---------|
| **Color scheme** | Custom gold `#B8895A` | Amber/yellow `#f59e0b` (Tailwind amber-500) |
| **Hero** | Local video background | Unsplash stock image background |
| **Images** | Local assets | Unsplash placeholders |
| **Logo** | `logo_Musa.png` image | Text-based "MUSA" with SVG icon |
| **Navigation links** | Points to `.html` files | Uses `#` anchors only |
| **Scroll animations** | IntersectionObserver `.reveal` | CSS-only `.fade-in-up` |
| **Services** | 4-card horizontal layout | 6-card 3×2 grid |
| **Credits** | Scrollable carousel with poster images | Grid with Unsplash stock images |
| **HTML attributes** | Standard | Contains `vid="N"` attributes (likely from AI builder) |

---

## 10. Navigation & Sitemap

### Main Navigation (Desktop)

| Label | Destination | Type |
|-------|-------------|------|
| About | `about.html` | Page link |
| Services | `#services` | Anchor on homepage |
| Orchestra | `#orchestra` | Anchor on homepage |
| Work | `#work` | Anchor on homepage |
| Insights | `#insights` | Anchor on homepage |
| For Composers | `composers.html` | Page link |
| **Request a Quote** | `quote.html` | CTA button |

### Footer Navigation

**Company:**
- Our Story → `about.html`
- The Team → `team.html`
- Orchestra & Venues → `orchestra.html`
- Awards & Press → `press.html`
- Contact → `contact.html`

**Services:**
- Live Recording → `services-orchestra.html`
- Remote Sessions → `services-remote.html`
- Choir & Vocal → `services-choir.html`
- Orchestration → `services-orchestration.html`
- Mixing & Mastering → `services-mixing.html`
- Production Concierge → `services-concierge.html`

**Resources:**
- Case Studies → `case-studies.html`
- Composer Insights → `insights.html`
- Tech Specs → `tech-specs.html`
- FAQ → `faq.html`
- For Composers → `composers.html`

**Legal:**
- Privacy Policy → `privacy.html`
- Terms of Service → `terms.html`

---

## 11. SEO Configuration

### Homepage Meta Tags

| Tag | Content |
|-----|---------|
| `<title>` | MUSA Prague — Orchestra Recording, Film Scoring & Remote Sessions |
| `meta description` | Record Hollywood-grade orchestra in Prague with MUSA & the FILMharmonic Orchestra. Full-service scoring, three decades of credits. Request a quote. |
| `og:title` | MUSA Prague — Orchestra Recording, Film Scoring & Remote Sessions |
| `og:type` | website |
| `og:url` | https://musa.cz |
| `twitter:card` | summary_large_image |
| `canonical` | https://musa.cz |

### Film & Game Page Meta Tags

| Tag | Content |
|-----|---------|
| `<title>` | Film & Game Score Recording Prague — Full Orchestra, Remote-Ready \| MUSA |
| `meta description` | Record your film or game score in Prague with MUSA. Full orchestra, conductors, engineers, complete buyout. Indie to major studio productions welcome. |
| `canonical` | https://musa.cz/services-film-game.html |

### Technical SEO Features
- ✅ `<html lang="en">` on all pages
- ✅ `scroll-smooth` class on `<html>`
- ✅ Proper `<meta viewport>` tags
- ✅ Open Graph tags (title, description, type, url)
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ❌ No `robots.txt` found
- ❌ No `sitemap.xml` found
- ❌ No structured data / JSON-LD schema
- ❌ No favicon configured

---

## 12. JavaScript Functionality

All JavaScript is inline at the bottom of `<body>`. No external JS files.

### Mobile Menu Toggle
```javascript
document.getElementById('mobile-menu-btn').addEventListener('click', function () {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});
```

### Credits Carousel Navigation
```javascript
var carousel = document.getElementById('credits-carousel');
var prev = document.getElementById('carousel-prev');
var next = document.getElementById('carousel-next');
var scrollAmount = 400;
prev.addEventListener('click', function () { carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });
next.addEventListener('click', function () { carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });
```

### Scroll-Triggered Reveal Animations
```javascript
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
```

### FAQ Accordion
FAQ items use inline `onclick="this.classList.toggle('active')"` to toggle the `.active` class, which triggers CSS transitions for `max-height` and icon rotation.

---

## 13. Content Strategy Reference (musa_md)

The file `musa_md` (47 KB) is a comprehensive **strategy & copy brief document** containing:

1. **Executive Summary** — Market analysis, positioning, top priorities
2. **Company Analysis** — Services, business model, USP, strengths, weaknesses
3. **Ideal Customers & Personas** — 3 detailed personas (Mid-Career Mike, Indie Game Studio Nadia, Library Music Larry)
4. **Customer Pain Points** — 12 ranked pain points (Trust & Clarity dominant)
5. **Competitor Analysis** — Synchron Stage, Smecky, Budapest Scoring, Scoring Berlin, CNSO, etc.
6. **SEO Strategy** — Full keyword research tables (high-intent, medium-difficulty, long-tail, local, FAQ, comparison)
7. **Website Structure** — Complete sitemap with rationale
8. **Full Website Copy** — Detailed copy for every planned page (Home, About, Services, Industries, Orchestra, Venues, Case Studies, Insights, For Composers, Quote, Contact)
9. **Visual & Brand Direction** — Aesthetic guidelines, color palette, typography, imagery direction
10. **Conversion Optimization** — CTA strategy, lead magnets, inquiry funnel
11. **90-Day Growth Plan** (referenced but may be in remaining lines)
12. **Website Generation Prompt** — AI-builder compatible prompt

> This file is the **single source of truth** for all copy, positioning, and strategy decisions.

---

## 14. Key Business Information

| Field | Value |
|-------|-------|
| **Company** | MUSA, Ltd. |
| **Founder/Producer** | Petr Pycha |
| **Address** | Skroupovo namesti 4, 130 00, Prague 3, Czech Republic |
| **Email** | info@musa.cz |
| **Phone** | +420 724 029 525 |
| **Orchestra** | FILMharmonic Orchestra (proprietary ensemble) |
| **Years Active** | 30+ years |
| **Sessions Completed** | 250+ |
| **IP Model** | 100% buyout — no residuals, no union complexity |
| **Typical Lead Time** | 2–6 weeks |
| **Copyright** | © 2026 MUSA, Ltd. |

### Recording Venues (Partner Studios)
1. **Smecky Music Studios** — Europe's most popular scoring stage since 1943
2. **CNSO Studios** — Newly refurbished large studio, 30 minutes from centre
3. **Rudolfinum / Dvořák Hall** — World-class classical acoustics
4. **Czech Television Music Studios** — Ideal for chamber and string overdubs

### Remote Session Technology
- Source-Connect Pro
- ListenTo
- Secure 4K multi-camera video
- Real-time talkback to conductor

---

## 15. Credits & Portfolio

### Featured Credits (from ticker + carousel + strategy doc)

**Films:**
Life, Fargo, Red Tails, Bad Lieutenant, The Conspirator, The Beaver, The Immigrant, The Painted Veil, The Lost City of Z, The Factory, The Words, Hostel, Warrior, Miracle in Cell No. 7, Skater Girl, Firebird, When Animals Dream, Northern Limit Line, Paris 36, In the Shadow, Last Chance Harvey, Enough Said, The Wildest Dream, Flying Monsters 3D

**TV/Streaming:**
Merlin, Apple Tree Yard, Vinland Saga, Tokyo Revengers, Alice in Borderland, Kingdom, Star Trek: Prodigy, Fargo, Tin Man, Made in Heaven, Guns & Gulaabs, Tunnel, Freaks

**Video Games:**
Civilization V, Civilization VI, S.T.A.L.K.E.R.: Shadow of Chernobyl, Age of Empires III, Mafia II, Halo Wars, EverQuest II, Dissidia Final Fantasy, The Elder Scrolls Online

**Anime:**
Violet Evergarden: The Movie, Vinland Saga, Tokyo Revengers, Alice in Borderland

**Artists/Albums:**
Sarah Brightman (Harem), Helloween, Joss Stone, Celine Dion

**Documentary:**
Jane Goodall: Reasons for Hope, Even Mice Belong in Heaven, Valhalla: The Legend of Thor

---

## 16. Planned / Referenced Pages (Not Yet Built)

These pages are **linked in navigation/footer** but do not yet exist as files:

| Page | File | Priority |
|------|------|----------|
| About / Our Story | `about.html` | High |
| The Team | `team.html` | High |
| Orchestra & Venues | `orchestra.html` | High |
| Awards & Press | `press.html` | Medium |
| Contact | `contact.html` | High |
| **Request a Quote** | `quote.html` | **Critical** |
| For Composers | `composers.html` | High |
| Remote Scoring Sessions | `services-remote.html` | **Critical** (highest-growth) |
| Live Recording | `services-orchestra.html` | High |
| Choir & Vocal | `services-choir.html` | Medium |
| Orchestration | `services-orchestration.html` | Medium |
| Mixing & Mastering | `services-mixing.html` | Medium |
| Production Concierge | `services-concierge.html` | Low |
| Case Studies | `case-studies.html` | High |
| Composer Insights | `insights.html` | Medium |
| Tech Specs | `tech-specs.html` | Medium |
| FAQ | `faq.html` | Medium |
| Privacy Policy | `privacy.html` | Low |
| Terms of Service | `terms.html` | Low |
| Prague Comparison Guide | `insights-prague-comparison.html` | Medium |

---

## 17. Development Notes

### Architecture Observations
1. **No build system** — Tailwind CSS loaded via CDN, no compilation step needed
2. **No shared config** — Tailwind config + custom CSS duplicated in every HTML file
3. **No shared components** — Header, footer, and CSS are copy-pasted between pages
4. **Empty `src/` directory** — Suggests a planned but unexecuted migration to a component framework
5. **Static hosting compatible** — Can be served from any static host (Netlify, Vercel, GitHub Pages, etc.)

### Consistency Issues
- The Variant page uses a different color scheme (amber `#f59e0b` vs. gold `#B8895A`)
- The Variant page uses Unsplash stock images while the main site uses local assets
- Background images referenced in Tailwind config (`studio-control-room.jpg`, `orchestra-wide.jpg`) are **missing** from the assets folder

### Potential Improvements
1. **Extract shared components** — Header/footer/scripts should be in reusable partials
2. **Centralize Tailwind config** — Move to a shared `tailwind.config.js` or use a proper build step
3. **Add missing meta files** — `robots.txt`, `sitemap.xml`, `favicon.ico`
4. **Add structured data** — JSON-LD schema for Organization, LocalBusiness, and Service
5. **Optimize video** — 18.5 MB hero video could benefit from adaptive bitrate/lazy loading
6. **Build remaining pages** — 20+ pages are linked but not yet created (see section 16)
7. **Add 404 page** — No error page exists

### File Size Summary
| Category | Total Size |
|----------|-----------|
| HTML pages | ~194 KB |
| Strategy doc (musa_md) | 47 KB |
| Images | ~3.3 MB |
| Video | 18.5 MB |
| Logo | 10 KB |
| **Total project** | **~22 MB** |

---

*This README was auto-generated by analyzing the complete MUSA_WEB project structure, HTML source code, assets, and strategy documentation.*
