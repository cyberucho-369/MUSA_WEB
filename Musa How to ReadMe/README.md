# MUSA Website -- AI Coding Agent Reference

This document describes the language, techniques, and patterns used to build the MUSA website so an AI coding agent can accurately recreate or extend it.

---

## Tech Stack Overview

- **HTML5** -- static `.html` files, no build tools, no frameworks, no bundler
- **Tailwind CSS v3.4.17** -- loaded via CDN `<script>` tag (NOT a PostCSS/CLI build)
- **Vanilla JavaScript** -- inline `<script>` blocks at the bottom of each page, no external JS files
- **Google Fonts** -- Inter (body) + Playfair Display (headings)
- **No npm / node_modules / package.json** -- the entire site is flat HTML files you can open in a browser or serve from any static host

---

## Project Structure

```
MUSA_WEB/
  index.html                  -- Homepage (main landing page)
  services-film-game.html     -- Service page: Film & Game Scoring
  services-remote.html        -- Service page: Remote Scoring Sessions
  services-album.html         -- Service page: Album Production
  services-concierge.html     -- Service page: Production Concierge
  assets/
    images/                   -- .webp and .jpg images
    logos/logo_Musa.png       -- Main logo (PNG)
    videos/                   -- .webm background loop videos (VP9 codec)
  Variant/                    -- Alternate homepage variant (not in production)
  Readme/                     -- Previous readme
  src/                        -- Empty (leftover directory, not used)
```

---

## Tailwind Configuration (CRITICAL)

Tailwind is loaded as a **CDN play script**, NOT as a PostCSS build. Every page has this identical `<script>` block in `<head>`:

```html
<script src="https://cdn.tailwindcss.com/3.4.17"></script>
<script>
    tailwind.config = {
        theme: {
            extend: {
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    serif: ['Playfair Display', 'serif'],
                },
                colors: {
                    musa: {
                        gold: '#B8895A',
                        'gold-light': '#D4A96A',
                        'gold-dark': '#96703F',
                        parchment: '#F5EFE6',
                        charcoal: '#0E0E10',
                        grey: '#7A7B7E',
                        'text-light': '#EDE9E2',
                        'text-dark': '#1A1A1C',
                    },
                    dark: {
                        900: '#0E0E10',
                        800: '#161618',
                        700: '#222226',
                        600: '#2E2E33',
                    }
                },
                backgroundImage: {
                    'studio-pattern': "linear-gradient(to right, rgba(14,14,16,0.95) 0%, rgba(14,14,16,0.3) 100%), url('assets/images/studio-control-room.jpg')",
                    'cta-pattern': "linear-gradient(to top, rgba(14,14,16,1) 0%, rgba(14,14,16,0.3) 100%), url('assets/images/orchestra-wide.jpg')",
                }
            }
        }
    }
</script>
```

### Watch Out For

- **This config MUST be duplicated in every HTML file.** There is no shared config file. If you add a new page, copy the full `tailwind.config` block.
- Custom color names like `musa-gold`, `dark-900`, `musa-text-light` are defined here -- they won't work without this config.
- The CDN version supports arbitrary values like `shadow-[0_0_20px_rgba(184,137,90,0.3)]` and opacity modifiers like `bg-dark-900/30`.

---

## Color Palette (exact hex values)

| Token | Hex | Usage |
|---|---|---|
| `musa-gold` | `#B8895A` | Primary accent, buttons, highlights |
| `musa-gold-light` | `#D4A96A` | Lighter accent variant |
| `musa-gold-dark` | `#96703F` | Hover states for gold buttons |
| `musa-parchment` | `#F5EFE6` | Light background (rarely used) |
| `musa-charcoal` | `#0E0E10` | Same as dark-900 |
| `musa-grey` | `#7A7B7E` | Subtle text |
| `musa-text-light` | `#EDE9E2` | Default body text color |
| `musa-text-dark` | `#1A1A1C` | Text on light backgrounds |
| `dark-900` | `#0E0E10` | Page background |
| `dark-800` | `#161618` | Alternate section background |
| `dark-700` | `#222226` | Card backgrounds, icon containers |
| `dark-600` | `#2E2E33` | Decorative large numbers |

---

## Typography

- **Body font:** `font-sans` = Inter (weights 300, 400, 500, 600)
- **Headings font:** `font-serif` = Playfair Display (weights 400-700, also italic)
- Both loaded via Google Fonts with `display=swap`
- Body text is typically `text-zinc-300` or `text-zinc-400`, size `text-sm` with `font-light`
- Section headings are `text-4xl md:text-5xl font-serif text-white`
- Subheadings use `text-musa-gold text-sm font-bold tracking-[0.2em] uppercase` with a gold line accent

---

## Page Architecture (common to ALL pages)

Every page follows this exact structure:

```
<html lang="en" class="scroll-smooth">
<head>
    <!-- SEO: title, meta description, og:tags, twitter:card, canonical -->
    <!-- Tailwind CDN + config -->
    <!-- Google Fonts -->
    <!-- Custom <style> block -->
</head>
<body class="bg-dark-900 text-musa-text-light antialiased selection:bg-musa-gold selection:text-black">
    <!-- HEADER (fixed, with glassmorphism) -->
    <!-- HERO SECTION -->
    <!-- CONTENT SECTIONS (alternating bg-dark-900 / bg-dark-800) -->
    <!-- FAQ SECTION (on most pages) -->
    <!-- FINAL CTA SECTION -->
    <!-- FOOTER -->
    <!-- MOBILE STICKY CTA -->
    <!-- INLINE JAVASCRIPT -->
</body>
</html>
```

---

## Section-by-Section Techniques

### 1. HEADER (Fixed Navigation Bar)

```html
<header class="fixed w-full top-0 z-50 transition-all duration-300 bg-gradient-to-b from-dark-900/90 to-transparent backdrop-blur-sm border-b border-white/5">
```

**Techniques:**
- Fixed position with `z-50`
- Glassmorphism effect: `backdrop-blur-sm` + semi-transparent background `from-dark-900/90 to-transparent`
- Desktop nav hidden on mobile: `hidden lg:flex`
- Mobile hamburger button toggles between open (three lines) and close (X) SVG icons using JS class toggling

**Mobile Menu:**
- Uses `hidden` class toggled via JavaScript
- Glassmorphism panel: `bg-dark-900/30 backdrop-blur-xl border-t border-musa-gold/20`
- The mobile menu has the same nav links + a "Request a Quote" CTA button

**Watch Out For:**
- The hamburger/X toggle works by swapping `hidden`/`block` classes on two separate SVG elements (`#menu-icon-open` and `#menu-icon-close`)
- Service pages link back to homepage sections with `index.html#services` format
- The currently active nav item on service pages uses `text-musa-gold` instead of `text-zinc-400`

### 2. HERO SECTION

**Homepage Hero:**
- Full-viewport height: `min-h-screen`
- Background: autoplay muted loop `<video>` with separate desktop (16:9) and mobile (9:16) `.webm` files
- Gradient overlay: `bg-gradient-to-b from-dark-900/40 via-dark-900/60 to-dark-900/90`
- Entrance animations: `.fade-in-up` CSS class with staggered delays (`.delay-100`, `.delay-200`, etc.)
- Two CTA buttons: primary gold filled + secondary transparent bordered

**Service Page Heroes:**
- Shorter: `min-h-[75vh]`
- Background: static `<img>` (not video) with `opacity-45` and gradient overlay
- Include a breadcrumb nav at the top
- Stat strip at the bottom with separate desktop (flex row) and mobile (grid) layouts
- Gold accent line pattern: `<div class="w-12 h-px bg-musa-gold"></div>` next to section labels

**Watch Out For:**
- Videos use `playsinline` attribute (required for iOS autoplay)
- The `<video>` tags use `md:block`/`md:hidden` to swap between desktop/mobile versions
- Hero content is positioned with `relative z-10` above the absolutely-positioned video/image background

### 3. TRUST STRIP / TICKER (Homepage only)

A horizontally scrolling marquee of film/game titles at the bottom of the hero.

**Technique:**
- CSS-only infinite scroll animation using `@keyframes ticker-scroll` with `translate3d(-50%, 0, 0)`
- Content is **duplicated** (Set 1 + Set 2 with `aria-hidden="true"`) for seamless loop
- Hardware-accelerated: `will-change: transform; backface-visibility: hidden; transform: translate3d(0, 0, 0)`
- Pauses on hover: `.ticker-track:hover { animation-play-state: paused; }`
- Fixed "Featured On" label with `flex-shrink-0` sits to the left of the scrolling area
- Fade edges using absolutely positioned gradient divs on left/right

**Watch Out For:**
- The content inside the ticker must be EXACTLY duplicated for seamless looping
- Uses `&amp;` for ampersand characters in HTML entities
- Gold bullet separators: `<span class="text-musa-gold/40">&#x2022;</span>`

### 4. THREE PILLARS / KEY BENEFITS (Grid Cards)

**Technique:**
- Responsive grid: `grid-cols-1 md:grid-cols-3` (homepage) or `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (service pages)
- Each card has an icon in a circular/square container, title, and description
- Hover effects: border color change (`hover:border-musa-gold/40`), icon background change, text color transition
- Top gold bar animation on hover: `absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-musa-gold-dark to-musa-gold transform -translate-y-full group-hover:translate-y-0`
- Uses Tailwind `group` + `group-hover:` pattern for coordinated hover states

**Watch Out For:**
- Icons are inline SVGs (from Heroicons), NOT icon fonts or image files
- The "Included" badge on featured cards uses: `absolute top-0 right-0 bg-musa-gold text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest`
- Cards in service pages use `flex flex-col` with `flex-1` on the description and `mt-auto` on the bottom link to ensure even card heights

### 5. VALUE PROPOSITION (Text + Image)

**Technique:**
- Two-column layout: `grid-cols-1 lg:grid-cols-2`
- Portrait image with grayscale-to-color hover: `grayscale hover:grayscale-0 transition-all duration-700`
- Image overlay: gradient from bottom for text readability
- Decorative offset border: `absolute -bottom-3 -right-3 w-full h-full border border-musa-gold/20 rounded-xl pointer-events-none`

### 6. SERVICES GRID (Homepage)

**Technique:**
- 4-column grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Each service card is an `<a>` tag (entire card is clickable)
- "Most Popular" badge on the Remote Sessions card
- Featured card has gold border: `border-musa-gold/30` vs regular `border-white/5`
- Arrow chevron at bottom with "Explore" text using `flex items-center gap-2`

### 7. FEATURED WORK CAROUSEL (Homepage)

**Technique:**
- Horizontal scrollbar-less carousel: `flex gap-6 overflow-x-auto scroll-smooth` with `scrollbar-width: none`
- Prev/Next buttons control scroll position via JavaScript `scrollBy()`
- Each item is a link (`<a>`) to IMDB, `target="_blank" rel="noopener"`
- Images use `object-contain` and fixed height `h-[360px]`
- Hover: image scale `group-hover:scale-105` inside `overflow-hidden` container

**Mobile Behavior:**
- CSS scroll-snap: `scroll-snap-type: x mandatory` with `scroll-snap-align: center`
- Items are fixed-width on mobile: `min-width: 240px; max-width: 240px`
- Centering padding: `padding-left: calc(50vw - 120px)`

**Watch Out For:**
- The carousel scrollbar is hidden via BOTH `-webkit-scrollbar { display: none }` AND inline `scrollbar-width: none`
- Scroll amount differs by viewport: 256px on mobile, 400px on desktop

### 8. WHY PRAGUE (Numbered List)

**Technique:**
- Two-column layout with large decorative numbers (`text-6xl md:text-7xl font-serif text-dark-600`)
- Numbers change color on hover: `group-hover:text-musa-gold`
- Decorative circles in background: large absolutely-positioned `rounded-full border` elements with low opacity

### 9. TESTIMONIALS

**Technique:**
- 3-column grid of quote cards
- Large SVG quote mark icon with `opacity-50`
- Quote text in serif italic: `font-serif italic text-lg`
- Attribution at bottom with `flex flex-col justify-between` to push it down

### 10. FAQ ACCORDION

**Technique:**
- Pure CSS + inline `onclick` toggle (NOT a JS framework accordion)
- Each FAQ item: `<div class="faq-item" onclick="this.classList.toggle('active')">`
- Expand/collapse via CSS `max-height` transition:
  ```css
  .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.3s ease; }
  .faq-item.active .faq-answer { max-height: 200px; padding-top: 1rem; }
  ```
- Plus icon rotates to X: `.faq-item.active .faq-icon { transform: rotate(45deg); }`

**Watch Out For:**
- `max-height` value varies by page (200px on homepage, 220px on service pages) -- set it high enough for the longest answer
- The `+` icon is a text character, not an SVG

### 11. FINAL CTA SECTION

**Technique:**
- Full-width background image with parallax: `bg-cta-pattern bg-cover bg-center bg-fixed`
- Dark overlay: `bg-dark-900/80 backdrop-blur-sm`
- Large serif heading with glowing gold button: `shadow-[0_0_30px_rgba(184,137,90,0.3)] hover:shadow-[0_0_50px_rgba(184,137,90,0.6)]`
- Subtle lift on hover: `transform hover:-translate-y-1`

### 12. FOOTER

**Technique:**
- 5-column grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-5` with first column spanning 2
- Social icons are inline SVGs (LinkedIn, YouTube, Instagram, IMDb)
- Bottom bar with copyright, privacy/terms links, and social icons

### 13. MOBILE STICKY CTA

```html
<div class="fixed bottom-0 left-0 w-full md:hidden bg-dark-900/95 backdrop-blur-md border-t border-white/10 p-4 z-50">
```

- Only visible on mobile (`md:hidden`)
- Fixed to bottom of viewport
- Gold "Request a Quote" button spans full width

### 14. VIDEO MODAL (Homepage and Film/Game page)

**Technique:**
- Hidden by default: `class="hidden fixed inset-0 z-50"`
- Backdrop click closes: `onclick="closeVideoModal()"`
- Inner content stops propagation: `onclick="event.stopPropagation()"`
- YouTube embed: iframe `src` is set empty initially, populated on open, cleared on close (stops playback)
- Escape key listener: `document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeVideoModal(); })`

**Watch Out For:**
- The iframe `src` must be cleared when closing to stop video playback
- The open trigger uses `onclick` attribute referencing the modal by ID

---

## CSS Animation Techniques

### Fade-In-Up (Page Load)
Used in hero sections for staggered entrance:
```css
.fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
}
@keyframes fadeInUp {
    to { opacity: 1; transform: translateY(0); }
}
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
/* etc. */
```

### Scroll Reveal (IntersectionObserver)
Used for all content sections below the hero:
```css
.reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}
.reveal-delay-1 { transition-delay: 100ms; }
.reveal-delay-2 { transition-delay: 200ms; }
```
Triggered by JavaScript IntersectionObserver (threshold 0.15), which adds the `visible` class once and then unobserves:
```js
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

---

## JavaScript Patterns

All JS is vanilla, inline at the bottom of `<body>`. Each page includes:

1. **Mobile menu toggle** -- toggles `hidden` class on `#mobile-menu` and swaps hamburger/X icons
2. **Scroll-reveal observer** -- IntersectionObserver for `.reveal` elements (on every page)
3. **Carousel controls** (homepage only) -- `scrollBy()` on prev/next button click
4. **FAQ accordion** -- handled via inline `onclick="this.classList.toggle('active')"` (no separate JS)
5. **Video modal** (homepage + film-game page) -- open/close functions, YouTube iframe src management

**Watch Out For:**
- JavaScript uses `var` and `function` declarations (ES5-compatible style), not `const`/`let`/arrow functions
- Each script block is wrapped in an IIFE: `(function() { ... })();`
- There are NO external `.js` files -- everything is inline

---

## SEO / Meta Tags

Every page includes:
- Unique `<title>` and `<meta name="description">`
- Open Graph tags: `og:title`, `og:description`, `og:type`, `og:url`
- Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`
- Canonical URL: `<link rel="canonical" href="...">`
- Language: `<html lang="en">`

---

## Custom Scrollbar

Every page has this in `<style>`:
```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0E0E10; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #B8895A; }
```

---

## Image/Media Conventions

- **Format:** `.webp` for photos, `.jpg` for carousel credit posters, `.png` for logo
- **Video:** `.webm` files with VP9 codec, separate 16:9 (desktop) and 9:16 (mobile) versions
- **Paths:** All relative from root (`assets/images/...`, `assets/videos/...`, `assets/logos/...`)
- **Optimization:** Images use `object-cover` or `object-contain` with fixed dimensions

---

## Design Patterns to Replicate

1. **Alternating section backgrounds:** Sections alternate between `bg-dark-900` and `bg-dark-800` with `border-b border-white/5` dividers
2. **Gold accent line + label pattern:** `<div class="w-12 h-px bg-musa-gold"></div>` followed by uppercase tracked label in `text-musa-gold`
3. **Button styles:**
   - Primary: `bg-musa-gold hover:bg-musa-gold-dark text-black` with gold glow shadow
   - Secondary: `bg-transparent border border-white/30 hover:border-white text-white`
4. **Card hover pattern:** border brightens, top gold bar slides in, icon container changes color, title changes to gold -- all via Tailwind `group`/`group-hover:`
5. **Text selection styling:** `selection:bg-musa-gold selection:text-black` on `<body>`
6. **Smooth scroll:** `<html class="scroll-smooth">` for anchor link navigation

---

## Common Gotchas When Recreating

1. **Tailwind CDN config must be duplicated** in every HTML file -- there is no shared import
2. **No build step** -- do not add webpack, Vite, or PostCSS; the site works as flat HTML files
3. **Inline SVG icons** -- all icons are inline SVGs (mostly Heroicons outline style), not an icon library import
4. **Mobile-first considerations:**
   - Mobile sticky CTA at bottom with `md:hidden`
   - Hero videos swap between 16:9 and 9:16 versions
   - Carousel uses scroll-snap on mobile
   - Stat strips use grid layout on mobile, flex row on desktop
5. **Glassmorphism effect** requires both `backdrop-blur-*` AND a semi-transparent background (e.g., `bg-dark-900/30 backdrop-blur-xl`)
6. **The `fade-in-up` animation** fires on page load (for hero content only); `.reveal` animations fire on scroll (for everything else)
7. **FAQ max-height** must accommodate the tallest answer text or it will clip
8. **Carousel poster images** use `object-contain` (not `object-cover`) to preserve movie poster aspect ratios
9. **Font loading:** Google Fonts link includes `display=swap` and uses `preconnect` to both `fonts.googleapis.com` and `fonts.gstatic.com`
10. **Video autoplay:** requires `muted` + `playsinline` attributes for iOS compatibility
