# MUSA — Work Page & Admin CMS Specification

**Purpose:** A growing grid of 240+ film, game, TV, and music titles produced by MUSA, with a simple JSON-based CMS for non-technical content management.

---

## 1. FILES TO CREATE

| File | Purpose |
|---|---|
| `work.html` | Public-facing Work page — poster grid with filters, hover states, IMDb links |
| `works.json` | Data file — single source of truth for all titles (240 entries pre-populated) |
| `admin.html` | Content management UI — form to add new titles, drag-and-drop image, downloadable output |
| `assets/images/work/{year}/` | Poster images organized by year folder (233 images, .webp format) |

---

## 2. WORK PAGE (`work.html`)

### Design
- Matches MUSA site: dark background (`#0E0E10`), gold accents (`#B8895A`), Inter + Playfair Display fonts
- Same header/nav, footer, mobile menu, sticky CTA as all other pages
- Tailwind CSS v3.4.17 via CDN (same as all other pages)

### Layout

#### Hero Section
- Background: dark gradient or subtle image
- Breadcrumb: Home > Work
- Headline: `"Our Work"` (Playfair Display serif)
- Subtitle: `"240+ titles across film, television, video games, and music — recorded in Prague since 2004."`
- Stat strip: title count, year range, etc.

#### Filter Bar (optional, can add later)
- Category filters: All / Film / Game / TV / Music
- Year range filter
- Sticky on scroll

#### Poster Grid
- **5 columns** on desktop (≥1280px)
- **4 columns** on large tablet (≥1024px)
- **3 columns** on tablet (≥768px)
- **2 columns** on mobile (<768px)
- Responsive gap: `gap-4` on mobile, `gap-6` on desktop
- Each card is an `<a>` tag linking to the title's IMDb page (opens in new tab)

#### Grid Ordering
- Sorted by year descending (newest first), then alphabetically within each year
- New titles added to the top of `works.json` array appear at position 0 (top-left)
- All subsequent titles shift right, wrapping to the next row

#### Poster Card Design
- Aspect ratio: `aspect-[2/3]` (standard movie poster)
- Rounded corners: `rounded-lg`
- Border: `border border-white/10`
- Background: `bg-dark-800` (fallback for missing images)
- Overflow hidden

#### Poster Card Hover State
- Image: `group-hover:scale-105` with `transition-transform duration-500`
- Light overlay: `bg-white/0 group-hover:bg-white/10 transition-all duration-300`
- Gold border: `hover:border-musa-gold/40`
- Title overlay appears at bottom: title + year on a dark gradient
- Subtle upward translate: `hover:-translate-y-1`

#### Poster Card Info Overlay (on hover)
- Position: absolute bottom
- Background: `bg-gradient-to-t from-black/80 via-black/40 to-transparent`
- Title: white, `font-serif`, `text-lg`
- Year: `text-musa-gold`, `text-sm`, `uppercase tracking-widest`
- IMDb icon: small gold icon in corner

#### Missing Poster Fallback
- Show title text centered on `bg-dark-700` background
- Gold border accent
- Film strip or clapperboard icon placeholder

#### Scroll Animation
- `.reveal` class on cards with staggered delays per row
- IntersectionObserver (threshold 0.15), same as other MUSA pages

#### Pagination / Load More
- Initially show first 50 titles
- "Load More" button at bottom (gold outline style matching MUSA CTAs)
- Loads next 50 titles on click
- Counter: "Showing X of Y titles"

### Footer
- Same footer as index.html (5-column grid, company info, services, resources, social icons)

---

## 3. DATA FILE (`works.json`)

### Structure
```json
[
  {
    "title": "Barry & Me",
    "year": "2026",
    "imdb_id": "tt36230671",
    "imdb_link": "https://www.imdb.com/title/tt36230671/",
    "poster": "2026/tt36230671_Barry _ Me.webp",
    "category": "film"
  }
]
```

### Fields
| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Display title |
| `year` | string | yes | Release year or "unknown" |
| `imdb_id` | string | yes | IMDb title ID (e.g. `tt36230671`) |
| `imdb_link` | string | yes | Full IMDb URL |
| `poster` | string | no | Relative path within `assets/images/work/` (e.g. `2026/filename.webp`) |
| `category` | string | no | One of: `film`, `game`, `tv`, `music` (default: `film`) |

### Ordering
- Array is pre-sorted: newest year first, then alphabetical within year
- New entries go to position 0 (top of array)
- The page renders entries in array order — no client-side re-sorting needed

---

## 4. ADMIN PAGE (`admin.html`)

### Purpose
A user-friendly interface for a non-technical person to add new titles to the Work page. Matches MUSA dark design for visual consistency.

### Layout

#### Header
- MUSA logo
- Page title: "Work Page — Content Manager"
- Brief instruction text explaining what this page does

#### "Add New Title" Form
All fields clearly labeled with placeholder examples:

| Field | Input Type | Label | Placeholder / Help |
|---|---|---|---|
| Title | text input | "Title" | "e.g. The Dark Knight" |
| Year | dropdown select | "Year" | Options: 2004–2030 + "Unknown" |
| Category | dropdown select | "Category" | Options: Film, Game, TV Series, Music |
| IMDb URL | text input | "IMDb Link" | "Paste the full IMDb URL, e.g. https://www.imdb.com/title/tt0468569/" |
| Poster Image | drag-and-drop zone | "Poster Image" | "Drag & drop your poster image here, or click to browse" |

#### IMDb URL Auto-Processing
- When user pastes a full IMDb URL, the system auto-extracts the `tt` ID
- Shows confirmation: "IMDb ID detected: tt0468569"
- Validates format (must start with `tt` followed by digits)

#### Image Drag-and-Drop Zone
- Large dashed-border area with icon and text
- Accepts: .webp, .jpg, .png
- Shows image preview thumbnail after drop
- Auto-generates the correct filename: `{imdb_id}_{title}.webp`
- Shows the target folder path: `assets/images/work/{year}/`

#### "Generate" Button
- Gold MUSA-style button
- On click, produces two downloadable outputs:

#### Output Section (appears after Generate)
Clearly labeled with numbered steps:

**Step 1 — Download the updated data file**
- Button: "Download works.json"
- Downloads the complete `works.json` with the new entry inserted at position 0

**Step 2 — Download the poster image**
- Button: "Download poster image"
- Downloads the image renamed to `{imdb_id}_{title}.webp`

**Step 3 — Upload instructions**
- Clear numbered list with folder paths:
  1. "Replace `works.json` in your website root folder"
  2. "Place the poster image in `assets/images/work/{year}/`"
  3. "Upload both files to your server (via FTP or push to GitHub)"
  4. "The Work page will update automatically"

#### Existing Titles Table
- Below the form
- Loads and displays all entries from `works.json`
- Columns: Poster (thumbnail), Title, Year, Category, IMDb Link
- Sortable by year
- Search/filter box
- Shows total count

### Technical Notes
- Pure HTML + vanilla JavaScript (no frameworks, no server)
- Loads `works.json` via `fetch()` on page load
- All processing happens in the browser
- Image conversion to .webp handled client-side via Canvas API
- The admin page can be accessed locally or on the live site

---

## 5. POSTER IMAGES

### Source
- 233 images already exist in `/Volumes/2TB_RECPIC/2026 _Musa_Web/Photos/Work/images_webp/`
- Organized by year folders: `2004/`, `2005/`, ... `2026/`, `unknown_year/`

### Destination
- Copy to `assets/images/work/` maintaining the year folder structure
- Example: `assets/images/work/2026/tt36230671_Barry _ Me.webp`

### Naming Convention
- Format: `{imdb_id}_{title}.webp`
- Example: `tt0468569_The Dark Knight.webp`
- The admin page auto-generates this filename

### Missing Posters (7 titles)
These titles have no poster image:
- Cinema of Sleep (2021) - tt10293932
- My Enemy, My Brother (2017) - tt6158630
- Bad Hair Day (2015) - tt3856042
- Fargo (2014) - tt2802850
- Ensemble, nous allons vivre... (2010) - tt1466569
- Terre de lumière (2008) - tt1165961
- Daisy (unknown) - tt32205875

These will display the text-based fallback card.

---

## 6. JAVASCRIPT ARCHITECTURE

### work.html — Rendering Engine
```
1. Fetch works.json
2. Parse JSON array
3. Render poster cards into grid container
4. Apply .reveal animation classes with staggered delays
5. Initialize IntersectionObserver for scroll animations
6. Bind "Load More" button (show next 50)
7. Optional: bind filter buttons
```

### admin.html — CMS Engine
```
1. Fetch current works.json
2. Display existing titles in table
3. Form submission:
   a. Validate all required fields
   b. Extract IMDb ID from pasted URL
   c. Process dropped image (resize, convert to webp via Canvas)
   d. Create new entry object
   e. Insert at position 0 of array
   f. Generate downloadable works.json blob
   g. Generate downloadable image blob
   h. Show download buttons and instructions
```

---

## 7. NAV LINK UPDATE

Update the Work link in navigation across all pages:
- Current: `href="#work"` (anchor to homepage section)
- New: `href="work.html"` (link to dedicated Work page)

Files to update:
- `index.html` (desktop nav + mobile nav)
- `venues.html`
- `services-album.html`
- `services-film-game.html`
- `services-remote.html`
- `services-concierge.html`
- `orchestra.html`

---

## 8. BUILD ORDER

1. Create `works.json` from Excel data (pre-populated, 240 entries)
2. Copy poster images to `assets/images/work/`
3. Build `work.html` (grid page with hover states, load-more, animations)
4. Build `admin.html` (CMS form with drag-and-drop, downloads, instructions)
5. Update nav links across all pages (`#work` → `work.html`)
6. Test in browser

---

## 9. HOSTING COMPATIBILITY

This setup works on:
- **Vercel** — auto-deploys from GitHub, serves static files
- **FTP server** — user uploads files manually
- **Any static hosting** — Netlify, GitHub Pages, etc.

No server-side code required. Everything runs in the browser.
