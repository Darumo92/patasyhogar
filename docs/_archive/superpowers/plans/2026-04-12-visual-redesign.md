# Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full visual redesign of patasyhogar.com — "Warm Modern + Bold" direction with new color palette, simplified typography, restructured homepage, and removal of deprecated components.

**Architecture:** CSS-first redesign. Replace all CSS custom properties, remove Plus Jakarta Sans font (Inter only), restructure homepage Astro page, simplify header/footer, reskin affiliate components. No changes to content logic, MDX, schema markup, or build pipeline (except CSP hashes auto-regenerated on build).

**Tech Stack:** Astro 5, plain CSS with custom properties, self-hosted Inter font (woff2)

**Spec:** `docs/superpowers/specs/2026-04-12-visual-redesign-design.md`

---

### Task 1: Update CSS custom properties (design tokens)

**Files:**
- Modify: `src/styles/global.css:43-92` (light mode `:root`)
- Modify: `src/styles/global.css:102-117` (dark mode `[data-theme="dark"]`)

- [ ] **Step 1: Replace light mode custom properties**

Replace the entire `:root` block (lines 43-92) with the new token system. Key changes:
- Colors: esmeralda (#059669) → verde bosque (#2d4a35/#3d6b4a/#4a8c5c scale)
- Add lavender scale for gato/informativos
- Dog color: #ea580c → #c2662d (terracota)
- Cat color: #7c3aed → #6b4d8a (lavanda)
- Neutrals: warm stone tones → pure neutrals (#1a1a1a, #777, #999, #e2e2e2, #f8f8f8)
- Background: #fafaf9 → #fff (base), #f5f5f4 → #f8f8f8 (muted)
- Border radius: 10/14/18/22px → 8/12/16px + 99px pill
- Typography: remove `--font-display` (Plus Jakarta Sans), keep only `--font-sans` as Inter
- Shadows: adjust values to new spec

```css
:root {
  /* Green scale (primary) */
  --green-900: #1a2e1f;
  --green-800: #2d4a35;
  --green-700: #3d6b4a;
  --green-600: #4a8c5c;
  --green-500: #5baa6e;
  --green-400: #7cc48d;
  --green-300: #a8d8b4;
  --green-100: #edf5ef;
  --green-50: #f5faf6;

  /* Lavender scale (cat / informativos) */
  --lavender-600: #6b4d8a;
  --lavender-500: #8b6aaf;
  --lavender-400: #a88bc7;
  --lavender-300: #c9b5dd;
  --lavender-100: #f3eef8;
  --lavender-50: #f9f6fc;

  /* Animal colors */
  --dog-color: #c2662d;
  --dog-bg: #fdf0e6;
  --cat-color: #6b4d8a;
  --cat-bg: #f3eef8;

  /* Neutrals */
  --neutral-950: #0f0f0f;
  --neutral-900: #1a1a1a;
  --neutral-800: #2a2a2a;
  --neutral-700: #444;
  --neutral-500: #777;
  --neutral-400: #999;
  --neutral-300: #bbb;
  --neutral-200: #e2e2e2;
  --neutral-100: #f0f0f0;
  --neutral-50: #f8f8f8;
  --white: #fff;

  /* Semantic aliases (for backward compat with existing class references) */
  --color-primary: var(--green-700);
  --color-primary-dark: var(--green-800);
  --color-primary-light: var(--green-400);
  --color-secondary: var(--lavender-600);
  --color-bg: var(--white);
  --color-bg-card: var(--white);
  --color-bg-muted: var(--neutral-50);
  --color-text: var(--neutral-900);
  --color-text-muted: var(--neutral-500);
  --color-text-light: var(--neutral-400);
  --color-border: var(--neutral-200);
  --color-border-dark: var(--neutral-300);

  /* Typography — Inter only */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 99px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.08);

  /* Transitions */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-instant: 100ms;
  --duration-fast: 160ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --transition: var(--duration-normal) var(--ease-out);
}
```

- [ ] **Step 2: Replace dark mode custom properties**

Replace the `[data-theme="dark"]` block (lines 102-117) with new dark mode tokens:

```css
:root[data-theme="dark"] {
  --green-800: #7cc48d;
  --green-700: #5baa6e;
  --green-600: #4a8c5c;
  --green-400: #3d6b4a;
  --green-100: #1a2e1f;
  --green-50: #152318;

  --lavender-600: #a88bc7;
  --lavender-400: #6b4d8a;
  --lavender-100: #2a1f35;
  --lavender-50: #1f1828;

  --dog-color: #e8955e;
  --dog-bg: #2e1f14;
  --cat-color: #a88bc7;
  --cat-bg: #2a1f35;

  --neutral-950: #f0f0f0;
  --neutral-900: #f0f0f0;
  --neutral-800: #ccc;
  --neutral-700: #aaa;
  --neutral-500: #999;
  --neutral-400: #666;
  --neutral-300: #444;
  --neutral-200: #2a2a2a;
  --neutral-100: #1f1f1f;
  --neutral-50: #1a1a1a;
  --white: #0f0f0f;

  --color-primary: var(--green-700);
  --color-primary-dark: var(--green-800);
  --color-primary-light: var(--green-400);
  --color-secondary: var(--lavender-600);
  --color-bg: var(--white);
  --color-bg-card: var(--neutral-50);
  --color-bg-muted: var(--neutral-100);
  --color-text: var(--neutral-900);
  --color-text-muted: var(--neutral-500);
  --color-text-light: var(--neutral-400);
  --color-border: var(--neutral-200);
  --color-border-dark: var(--neutral-300);
}
```

- [ ] **Step 3: Search and replace old token references**

Search `global.css` for any direct color references that bypass custom properties (e.g., hardcoded `#059669`, `#f97316`, `#7c3aed`, `#ea580c`, `#fafaf9`, `#f5f5f4`, `#1c1917`, `#57534e`, `#78716c`, `#e7e5e4`, `#d6d3d1`). Replace each with the appropriate new custom property or new hex value.

Also search for `--font-display` or `Plus Jakarta Sans` references in global.css and replace with `var(--font-sans)`.

Run: `grep -n "Plus Jakarta\|font-display\|#059669\|#f97316\|#7c3aed\|#ea580c\|#fafaf9\|#f5f5f4" src/styles/global.css`

Replace all occurrences to use new tokens.

- [ ] **Step 4: Verify site builds**

Run: `npm run build`
Expected: Build succeeds. Styles may look broken at this stage (expected — components still reference old structure).

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css
git commit -m "style: replace design tokens — verde bosque + lavanda palette, Inter only"
```

---

### Task 2: Remove Plus Jakarta Sans font

**Files:**
- Modify: `src/layouts/Base.astro:38-41` (preload tags)
- Delete: `public/fonts/plus-jakarta-sans-700.woff2`
- Delete: `public/fonts/plus-jakarta-sans-800.woff2`
- Modify: `src/styles/global.css` (any @font-face for Plus Jakarta Sans)

- [ ] **Step 1: Remove preload tag from Base.astro**

In `src/layouts/Base.astro`, find and remove the preload link for Plus Jakarta Sans (around line 41):
```html
<link rel="preload" href="/fonts/plus-jakarta-sans-800.woff2" as="font" type="font/woff2" crossorigin />
```

Also check for any other Plus Jakarta Sans preload/prefetch tags.

- [ ] **Step 2: Remove @font-face declarations from global.css**

Search for `@font-face` blocks referencing Plus Jakarta Sans in `global.css` and remove them entirely. Run:
`grep -n "Plus Jakarta\|plus-jakarta" src/styles/global.css`

Remove all matching @font-face blocks.

- [ ] **Step 3: Replace all font-family references**

Any CSS rule using `var(--font-display)` or `'Plus Jakarta Sans'` directly should be replaced with `var(--font-sans)` (Inter). Run:
`grep -rn "font-display\|Plus Jakarta" src/`

- [ ] **Step 4: Delete font files**

```bash
rm public/fonts/plus-jakarta-sans-700.woff2 public/fonts/plus-jakarta-sans-800.woff2
```

- [ ] **Step 5: Verify and commit**

Run: `npm run build`
Expected: Build succeeds, no font 404 errors in output.

```bash
git add -A
git commit -m "perf: remove Plus Jakarta Sans — Inter only for all typography"
```

---

### Task 3: Remove deprecated components

**Files:**
- Modify: `src/pages/index.astro` (remove PetQuiz, TrustBar, SeasonalBanner imports/usage)
- Modify: `src/styles/global.css` (remove trust-bar ~614-658, seasonal-banner ~521-608, newsletter-section ~664-722 styles)
- Delete: `src/components/PetQuiz.astro`
- Delete: `src/components/TrustBar.astro`
- Delete: `src/pages/actualizaciones.astro`
- Modify: `src/components/Footer.astro` (remove newsletter form section)

- [ ] **Step 1: Remove imports and usage from index.astro**

In `src/pages/index.astro`:
1. Remove import of `PetQuiz`
2. Remove import of `TrustBar`
3. Remove the `<TrustBar />` component usage (~line 175)
4. Remove the `<PetQuiz>` component usage (~lines 178-182)
5. Remove the seasonal banner HTML block (~lines 185-205)
6. Remove the newsletter section HTML (~lines 269-302)

Keep: Hero, Categories, Articles sections (they will be restructured in Task 5).

- [ ] **Step 2: Remove CSS for deprecated sections from global.css**

Remove these CSS blocks from `global.css`:
- `.trust-bar` section (~lines 614-658)
- `.seasonal-banner` section (~lines 521-608)
- `.newsletter-section` and `.newsletter-form-hero` (~lines 664-722)

Also remove any dark mode variants for these sections (search in lines 1657-1847).

- [ ] **Step 3: Remove newsletter from Footer.astro**

In `src/components/Footer.astro`:
- Remove the `.footer-newsletter` HTML section (~lines 69-93)
- Remove the corresponding client-side JS for newsletter form submission (~lines 109-154)
- Keep: brand, navigation links, affiliate notice, copyright

Also remove `.footer-newsletter` styles from `global.css` (~lines 1369-1456).

- [ ] **Step 4: Delete component files and actualizaciones page**

```bash
rm src/components/PetQuiz.astro
rm src/components/TrustBar.astro
rm src/pages/actualizaciones.astro
```

- [ ] **Step 5: Verify and commit**

Run: `npm run build`
Expected: Build succeeds. Homepage will look bare (expected — Task 5 rebuilds it).

```bash
git add -A
git commit -m "refactor: remove Quiz, TrustBar, SeasonalBanner, newsletter footer, actualizaciones page"
```

---

### Task 4: Redesign Header

**Files:**
- Modify: `src/components/Header.astro` (simplify structure + JS)
- Modify: `src/styles/global.css:241-270` (header styles)
- Delete: `src/components/LogoIcon.astro` (no longer used)

- [ ] **Step 1: Rewrite Header.astro HTML**

Replace the entire Header.astro template with the new minimal structure:

```astro
---
const currentPath = Astro.url.pathname;
const isActive = (path: string) => currentPath.startsWith(path);
---

<header class="header">
  <div class="header-inner">
    <a class="logo" href="/">patas<span>&amp;</span>hogar</a>
    <nav class="nav-links" aria-label="Navegación principal">
      <a class="nav-link dog" href="/perros/" aria-current={isActive('/perros/') ? 'page' : undefined}>Perros</a>
      <a class="nav-link cat" href="/gatos/" aria-current={isActive('/gatos/') ? 'page' : undefined}>Gatos</a>
      <a class="nav-link" href="/cuidados/" aria-current={isActive('/cuidados/') ? 'page' : undefined}>Cuidados</a>
      <div class="nav-sep" aria-hidden="true"></div>
      <a class="nav-icon" href="/buscar/" aria-label="Buscar">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </a>
      <button class="nav-icon" id="theme-toggle" aria-label="Cambiar tema">
        <svg class="icon-sun" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        <svg class="icon-moon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
    </nav>
    <button class="hamburger" id="hamburger" aria-label="Menú" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
  <nav class="mobile-menu" id="mobile-menu" aria-label="Menú móvil">
    <a class="mobile-link dog" href="/perros/">Perros</a>
    <a class="mobile-link cat" href="/gatos/">Gatos</a>
    <a class="mobile-link" href="/cuidados/">Cuidados</a>
    <div class="mobile-sep"></div>
    <a class="mobile-link" href="/alimentacion/">Alimentación</a>
    <a class="mobile-link" href="/higiene/">Higiene</a>
    <a class="mobile-link" href="/paseo/">Paseo</a>
    <a class="mobile-link" href="/juguetes/">Juguetes</a>
    <a class="mobile-link" href="/hogar/">Hogar</a>
    <div class="mobile-sep"></div>
    <a class="mobile-link" href="/buscar/">Buscar</a>
  </nav>
</header>

<script>
  // Theme toggle
  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    menu?.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });
</script>
```

- [ ] **Step 2: Replace header CSS in global.css**

Replace the header styles block (~lines 241-270 and any related header styles scattered throughout the file, including dark mode variants) with:

```css
/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
}
[data-theme="dark"] .header {
  background: rgba(15, 15, 15, 0.85);
}
.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
}
.logo {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text);
  text-decoration: none;
}
.logo span { color: var(--neutral-400); }
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.nav-link {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-pill);
  text-decoration: none;
  color: var(--neutral-700);
  transition: all var(--duration-fast) var(--ease-out);
}
.nav-link:hover { background: var(--neutral-100); color: var(--color-text); }
.nav-link.dog { color: var(--dog-color); }
.nav-link.dog:hover { background: var(--dog-bg); }
.nav-link.cat { color: var(--cat-color); }
.nav-link.cat:hover { background: var(--cat-bg); }
.nav-link[aria-current="page"] { font-weight: 700; }
.nav-sep {
  width: 1px;
  height: 20px;
  background: var(--color-border);
  margin: 0 0.25rem;
}
.nav-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--neutral-500);
  text-decoration: none;
  transition: all var(--duration-fast) var(--ease-out);
}
.nav-icon:hover { background: var(--neutral-100); color: var(--color-text); }

/* Theme toggle icons */
[data-theme="dark"] .icon-sun { display: none; }
[data-theme="light"] .icon-moon, :root:not([data-theme]) .icon-moon { display: none; }

/* Hamburger — mobile only */
.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--color-text);
  transition: all var(--duration-normal) var(--ease-out);
}
.hamburger[aria-expanded="true"] span:nth-child(1) { transform: rotate(45deg) translate(3px, 5px); }
.hamburger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.hamburger[aria-expanded="true"] span:nth-child(3) { transform: rotate(-45deg) translate(3px, -5px); }

/* Mobile menu */
.mobile-menu {
  display: none;
  padding: 0.5rem 1.5rem 1rem;
  border-bottom: 1px solid var(--color-border);
}
.mobile-menu.open { display: block; }
.mobile-link {
  display: block;
  padding: 0.6rem 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
}
.mobile-link.dog { color: var(--dog-color); }
.mobile-link.cat { color: var(--cat-color); }
.mobile-sep {
  height: 1px;
  background: var(--color-border);
  margin: 0.25rem 0;
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
}
@media (min-width: 769px) {
  .mobile-menu { display: none !important; }
}
```

- [ ] **Step 3: Remove old dropdown/nav CSS and dark mode variants**

Search for and remove all CSS related to the old header structure:
- `.nav-dropdown`, `.nav-dropdown-menu`, `.nav-dropdown-trigger` rules
- Old `.logo-icon`, `.logo-text` rules
- Old header dark mode overrides in the dark mode section (~lines 1657-1847)
- Any `IconCategory` or dropdown keyboard-nav related styles

Run: `grep -n "nav-dropdown\|logo-icon\|logo-text\|nav-dropdown-menu" src/styles/global.css`

- [ ] **Step 4: Delete LogoIcon.astro**

```bash
rm src/components/LogoIcon.astro
```

Remove any imports of LogoIcon from other files:
`grep -rn "LogoIcon" src/`

- [ ] **Step 5: Verify and commit**

Run: `npm run build`
Expected: Build succeeds. Header renders with new minimal structure.

```bash
git add -A
git commit -m "style: redesign header — minimal nav with animal-first links"
```

---

### Task 5: Restructure Homepage

**Files:**
- Rewrite: `src/pages/index.astro`
- Modify: `src/styles/global.css` (add new homepage section styles, remove old hero styles)

- [ ] **Step 1: Rewrite index.astro**

Replace the entire `src/pages/index.astro` with the new homepage structure. The page should:

1. Import `Base`, `ArticleCard`, `CategoryIcon`
2. Query articles: featured (`destacado: true`), latest comparativas, latest informativos
3. Count articles per category
4. Render sections: Hero → Featured → Categories → Latest Comparativas → Guides → Newsletter

```astro
---
import Base from '../layouts/Base.astro';
import ArticleCard from '../components/ArticleCard.astro';
import { getCollection } from 'astro:content';

const allArticles = await getCollection('articulos');
const published = allArticles.filter(a => a.data.status !== 'draft');
const comparativas = published
  .filter(a => (a.data.tipo || 'comparativa') === 'comparativa')
  .sort((a, b) => new Date(b.data.fecha).getTime() - new Date(a.data.fecha).getTime());
const informativos = published
  .filter(a => a.data.tipo === 'informativo')
  .sort((a, b) => new Date(b.data.fecha).getTime() - new Date(a.data.fecha).getTime());

const featured = published.find(a => a.data.destacado);
const latestComparativas = comparativas.filter(a => a.slug !== featured?.slug).slice(0, 6);
const latestInformativos = informativos.slice(0, 4);

const categories = [
  { slug: 'alimentacion', name: 'Alimentación', emoji: '🍖' },
  { slug: 'higiene', name: 'Higiene', emoji: '🛁' },
  { slug: 'paseo', name: 'Paseo', emoji: '🚶' },
  { slug: 'juguetes', name: 'Juguetes', emoji: '🎾' },
  { slug: 'hogar', name: 'Hogar', emoji: '🏠' },
];
const categoryCounts = Object.fromEntries(
  categories.map(c => [c.slug, comparativas.filter(a => a.data.categoria === c.slug).length])
);

const totalGuides = published.length;

function getArticleUrl(article: any) {
  if (article.data.tipo === 'informativo') return `/cuidados/${article.slug}/`;
  return `/${article.data.categoria}/${article.slug}/`;
}

function readingTime(body: string) {
  return Math.ceil(body.split(/\s+/).length / 200);
}
---

<Base
  titulo="Patas y Hogar — Guías y comparativas para perros y gatos"
  descripcion="Comparativas honestas de productos para perros y gatos. Analizamos cada producto para que elijas bien."
>
  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <p class="hero-label">+{totalGuides} guías comparativas verificadas</p>
      <h1 class="hero-title">Lo mejor para<br>tu mascota.</h1>
      <p class="hero-subtitle">Comparativas honestas, sin relleno. Analizamos cada producto para que tú elijas bien.</p>
      <div class="hero-ctas">
        <a href="/perros/" class="hero-cta dog">Busco para perro</a>
        <a href="/gatos/" class="hero-cta cat">Busco para gato</a>
      </div>
    </div>
  </section>

  <!-- Featured Article -->
  {featured && (
    <section class="featured">
      <div class="container">
        <a href={getArticleUrl(featured)} class="featured-card">
          <div class="featured-img">
            {featured.data.imagen ? (
              <img src={featured.data.imagen} alt={featured.data.imagenAlt || featured.data.titulo} width="800" height="400" loading="eager" />
            ) : (
              <div class="featured-placeholder"></div>
            )}
          </div>
          <div class="featured-body">
            <span class="featured-badge">{featured.data.categoria}</span>
            <h2>{featured.data.titulo}</h2>
            <p>{featured.data.descripcion}</p>
            <span class="featured-link">Leer guía →</span>
          </div>
        </a>
      </div>
    </section>
  )}

  <!-- Categories -->
  <section class="categories">
    <div class="container">
      <div class="section-header">
        <h2>Categorías</h2>
        <a href="/articulos/">Ver todas →</a>
      </div>
      <div class="categories-grid">
        {categories.map(cat => (
          <a href={`/${cat.slug}/`} class="cat-card">
            <div class="cat-icon">{cat.emoji}</div>
            <h3>{cat.name}</h3>
            <span>{categoryCounts[cat.slug]} guías</span>
          </a>
        ))}
      </div>
    </div>
  </section>

  <!-- Latest Comparativas -->
  <section class="articles">
    <div class="container">
      <div class="section-header">
        <h2>Últimas comparativas</h2>
        <a href="/articulos/">Ver todas →</a>
      </div>
      <div class="articles-grid">
        {latestComparativas.map(article => (
          <ArticleCard article={article} />
        ))}
      </div>
    </div>
  </section>

  <!-- Guides (Informativos) -->
  <section class="guides">
    <div class="container">
      <div class="section-header">
        <h2>Guías de cuidados</h2>
        <a href="/cuidados/">Ver todas →</a>
      </div>
      <div class="guides-grid">
        {latestInformativos.map(article => (
          <a href={getArticleUrl(article)} class="guide-card">
            <div class="guide-icon">{article.data.tags?.[0] === 'salud' ? '🩺' : '📖'}</div>
            <div class="guide-info">
              <h3>{article.data.titulo}</h3>
              <span>{article.data.categoria} · {readingTime(article.body || '')} min lectura</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>

  <!-- Newsletter -->
  <section class="container">
    <div class="newsletter">
      <h2>Nuevas guías en tu email</h2>
      <p>Sin spam. Solo cuando publicamos algo que merece la pena.</p>
      <form class="newsletter-form" id="newsletter-form">
        <input type="email" placeholder="tu@email.com" required />
        <button type="submit">Suscribir</button>
      </form>
    </div>
  </section>
</Base>

<script>
  const form = document.getElementById('newsletter-form') as HTMLFormElement;
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector('input') as HTMLInputElement;
    const btn = form.querySelector('button') as HTMLButtonElement;
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: input.value }),
      });
      if (res.ok) {
        btn.textContent = '✓ Suscrito';
        input.value = '';
      } else {
        btn.textContent = 'Error';
        setTimeout(() => { btn.textContent = 'Suscribir'; btn.disabled = false; }, 2000);
      }
    } catch {
      btn.textContent = 'Error';
      setTimeout(() => { btn.textContent = 'Suscribir'; btn.disabled = false; }, 2000);
    }
  });
</script>
```

Note: The ArticleCard component may need adjustments (Task 6). The guide-icon emoji selection will need refinement based on actual article tags — this is a simplified version. Adjust the logic to match the existing tag/category system.

- [ ] **Step 2: Add new homepage CSS to global.css**

Remove old `.hero` styles (~lines 387-510) and replace with new hero + homepage section styles. Add the following blocks:

```css
/* ===== HOMEPAGE ===== */

/* Hero */
.hero { padding: 3.5rem 0 2rem; text-align: center; }
.hero-label {
  font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.1em; color: var(--green-600); margin-bottom: 0.75rem;
}
.hero-title {
  font-size: clamp(2rem, 5vw, 3rem); font-weight: 900;
  letter-spacing: -0.04em; line-height: 1.08;
  color: var(--neutral-950); margin-bottom: 0.75rem;
}
.hero-subtitle {
  font-size: 1.05rem; color: var(--neutral-500);
  max-width: 500px; margin: 0 auto 1.5rem; line-height: 1.5;
}
.hero-ctas { display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; }
.hero-cta {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.85rem; font-weight: 700; padding: 0.7rem 1.5rem;
  border-radius: var(--radius-pill); text-decoration: none;
  transition: all var(--duration-normal) var(--ease-out);
}
.hero-cta.dog { background: var(--dog-bg); color: var(--dog-color); border: 1.5px solid rgba(194,102,45,0.2); }
.hero-cta.dog:hover { background: #fbe3d0; transform: translateY(-1px); box-shadow: var(--shadow-md); }
.hero-cta.cat { background: var(--cat-bg); color: var(--cat-color); border: 1.5px solid rgba(107,77,138,0.2); }
.hero-cta.cat:hover { background: #ebe0f3; transform: translateY(-1px); box-shadow: var(--shadow-md); }

/* Featured article */
.featured { padding: 0 0 4rem; }
.featured-card {
  display: grid; grid-template-columns: 1.2fr 1fr; gap: 0;
  background: var(--color-bg-muted); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); overflow: hidden;
  text-decoration: none; color: inherit;
  transition: all var(--duration-normal) var(--ease-out);
}
.featured-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
.featured-img { aspect-ratio: 16/10; overflow: hidden; }
.featured-img img { width: 100%; height: 100%; object-fit: cover; }
.featured-placeholder {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, var(--green-100), var(--lavender-100));
}
.featured-body { padding: 2rem; display: flex; flex-direction: column; justify-content: center; }
.featured-badge {
  font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.06em; color: var(--green-600); margin-bottom: 0.75rem;
}
.featured-body h2 {
  font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em;
  line-height: 1.2; color: var(--color-text); margin-bottom: 0.5rem;
}
.featured-body p { font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 1rem; }
.featured-link { font-size: 0.8rem; font-weight: 700; color: var(--green-700); }
.featured-card:hover .featured-link { text-decoration: underline; }

/* Section header */
.section-header {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 1.5rem;
}
.section-header h2 { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.02em; color: var(--color-text); }
.section-header a {
  font-size: 0.8rem; font-weight: 600; color: var(--neutral-400); text-decoration: none;
}
.section-header a:hover { color: var(--green-700); }

/* Categories grid */
.categories { padding: 0 0 4rem; }
.categories-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem; }
.cat-card {
  background: var(--color-bg-muted); border: 1px solid var(--color-border);
  border-radius: var(--radius-md); padding: 1.25rem 1rem;
  text-align: center; text-decoration: none; color: var(--color-text);
  transition: all var(--duration-normal) var(--ease-out);
}
.cat-card:hover { border-color: var(--green-400); background: var(--green-50); transform: translateY(-2px); box-shadow: var(--shadow-md); }
.cat-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
.cat-card h3 { font-size: 0.8rem; font-weight: 700; margin-bottom: 0.15rem; }
.cat-card span { font-size: 0.7rem; color: var(--neutral-400); }

/* Articles grid */
.articles { padding: 0 0 4rem; }
.articles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }

/* Guides grid */
.guides { padding: 0 0 4rem; }
.guides-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.guide-card {
  display: flex; align-items: center; gap: 1rem;
  padding: 1rem 1.25rem; background: var(--color-bg-muted);
  border: 1px solid var(--color-border); border-radius: var(--radius-md);
  text-decoration: none; color: inherit;
  transition: all var(--duration-normal) var(--ease-out);
}
.guide-card:hover { border-color: var(--lavender-400); background: var(--lavender-50); transform: translateY(-1px); box-shadow: var(--shadow-sm); }
.guide-icon {
  font-size: 1.5rem; flex-shrink: 0;
  width: 48px; height: 48px; border-radius: var(--radius-sm);
  background: var(--lavender-100); display: flex; align-items: center; justify-content: center;
}
.guide-info h3 { font-size: 0.85rem; font-weight: 700; color: var(--color-text); margin-bottom: 0.1rem; }
.guide-info span { font-size: 0.7rem; color: var(--neutral-400); }

/* Newsletter */
.newsletter {
  background: var(--color-bg-muted); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: 2.5rem; text-align: center;
  margin-bottom: 4rem;
}
.newsletter h2 { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.02em; color: var(--color-text); margin-bottom: 0.3rem; }
.newsletter p { font-size: 0.85rem; color: var(--neutral-500); margin-bottom: 1.25rem; }
.newsletter-form { display: flex; justify-content: center; gap: 0.5rem; max-width: 420px; margin: 0 auto; }
.newsletter-form input {
  flex: 1; padding: 0.65rem 1rem; border: 1px solid var(--color-border);
  border-radius: var(--radius-pill); font-size: 0.85rem;
  background: var(--color-bg); color: var(--color-text); outline: none;
}
.newsletter-form input:focus { border-color: var(--green-400); }
.newsletter-form button {
  padding: 0.65rem 1.5rem; border: none;
  background: var(--green-800); color: white;
  border-radius: var(--radius-pill); font-size: 0.8rem; font-weight: 700;
  cursor: pointer; transition: all var(--duration-fast) var(--ease-out);
}
.newsletter-form button:hover { background: var(--green-700); }

/* Responsive */
@media (max-width: 768px) {
  .featured-card { grid-template-columns: 1fr; }
  .featured-body { padding: 1.5rem; }
  .categories-grid { grid-template-columns: repeat(3, 1fr); }
  .articles-grid { grid-template-columns: 1fr; }
  .guides-grid { grid-template-columns: 1fr; }
  .newsletter-form { flex-direction: column; }
}
```

- [ ] **Step 3: Remove old homepage CSS**

Remove these old CSS blocks from global.css:
- Old `.hero` styles (~lines 387-510): `.hero`, `.hero-title`, `.hero-subtitle`, `.hero-stats`, `.hero-cta`, `.hero-meta`
- Old `.categories-grid` and `.category-card` styles (~lines 739-812) — replaced by new `.cat-card`
- Dark mode variants for removed sections

- [ ] **Step 4: Verify and commit**

Run: `npm run build`
Expected: Build succeeds. Homepage renders with new structure.

```bash
git add -A
git commit -m "feat: restructure homepage — hero, featured, categories, guides, newsletter"
```

---

### Task 6: Reskin ArticleCard

**Files:**
- Modify: `src/components/ArticleCard.astro`
- Modify: `src/styles/global.css` (article card styles ~lines 814-955)

- [ ] **Step 1: Update ArticleCard.astro template**

Review the existing ArticleCard.astro component and update the HTML structure to match the new design:
- Image container with 16/9 aspect ratio
- Animal badge pill (top-right of image, frosted glass background)
- Category label (uppercase, small, green-600)
- Title (0.95rem, 800 weight)
- Excerpt (2-line clamp)
- Meta row: date + reading time pill (green background)

Keep the same props interface and data attributes for animal filtering.

- [ ] **Step 2: Update article card CSS in global.css**

Replace the existing `.article-card` block (~lines 814-955) with new styles:

```css
/* Article Card */
.article-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-bg-card);
  transition: all var(--duration-normal) var(--ease-out);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
}
.article-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--neutral-300);
}
.article-card-image {
  aspect-ratio: 16/9;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, var(--green-100), var(--lavender-100));
}
.article-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}
.article-card:hover .article-card-image img { transform: scale(1.03); }
.article-card-animal {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
}
.article-card-animal.dog { color: var(--dog-color); }
.article-card-animal.cat { color: var(--cat-color); }
.article-card-body {
  padding: 1rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.article-card-cat {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--green-600);
  margin-bottom: 0.3rem;
}
.article-card-title {
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: var(--color-text);
  margin-bottom: 0.35rem;
}
.article-card-excerpt {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.article-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--neutral-100);
  font-size: 0.7rem;
  color: var(--neutral-400);
}
.article-card-reading-time {
  font-weight: 600;
  color: var(--green-600);
  background: var(--green-100);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-pill);
}
```

- [ ] **Step 3: Verify and commit**

Run: `npm run build`

```bash
git add -A
git commit -m "style: reskin ArticleCard — new palette, clean layout"
```

---

### Task 7: Reskin article prose and affiliate components

**Files:**
- Modify: `src/styles/global.css` (prose ~1047-1138, affiliate buttons ~1144-1244, breadcrumb ~967-987)
- Modify: `src/components/ComparisonTable.astro` (scoped styles ~470+)
- Modify: `src/components/TopPick.astro` (scoped styles ~116-337)

- [ ] **Step 1: Update prose styles in global.css**

In the `.prose` section (~lines 1047-1138):
- Change font-family references to `var(--font-sans)` if they use `var(--font-display)`
- H2: remove `border-bottom` rule, add `margin-top: 2.5rem`
- H2/H3: update font-weight and letter-spacing to match spec (800/-0.02em and 700/-0.01em)
- Links: change color from esmeralda to `var(--green-700)`
- Blockquote border: change to `var(--green-700)`

- [ ] **Step 2: Update affiliate button styles in global.css**

In the `.affiliate-button` section (~lines 1144-1244):
- Change generic button background from esmeralda to `var(--green-800)`
- Keep Amazon (#ff9900), Zooplus (#00473e), Tiendanimal (#00632E) unchanged
- Update border-radius references to `var(--radius-pill)`

- [ ] **Step 3: Update breadcrumb styles**

In the `.breadcrumb` section (~lines 967-987):
- Update colors to use `var(--color-text-muted)` and `var(--green-700)` for links

- [ ] **Step 4: Reskin ComparisonTable scoped styles**

In `src/components/ComparisonTable.astro` (scoped styles starting ~line 470):
- Update border colors to `var(--color-border)`
- Update shadow to `var(--shadow-sm)`
- Update border-radius to `var(--radius-md)`
- Update accent colors from esmeralda to green-700/green-800
- Update font-family from `var(--font-display)` to `var(--font-sans)` where present

- [ ] **Step 5: Reskin TopPick scoped styles**

In `src/components/TopPick.astro` (scoped styles ~lines 116-337):
- Same changes as ComparisonTable: borders, shadows, radius, accent colors, font-family

- [ ] **Step 6: Verify and commit**

Run: `npm run build`

```bash
git add -A
git commit -m "style: reskin prose, affiliate buttons, ComparisonTable, TopPick"
```

---

### Task 8: Update Footer

**Files:**
- Modify: `src/components/Footer.astro`
- Modify: `src/styles/global.css` (footer ~1290-1468)

- [ ] **Step 1: Simplify Footer.astro**

Update the footer template:
- Remove LogoIcon import if present
- Logo as text: `patas<span>&</span>hogar` (same as header)
- Keep: brand description, category links, explore links, legal links
- Keep: affiliate notice
- Keep: copyright
- Remove: newsletter form (already removed in Task 3)
- Layout: 4 columns (brand 2fr, categories 1fr, explore 1fr, legal 1fr)

- [ ] **Step 2: Update footer CSS**

Replace footer styles in global.css (~lines 1290-1468) with updated styles using new tokens:
- Border-top: 1px solid var(--color-border)
- Link colors: var(--color-text-muted), hover: var(--green-700)
- Heading: 0.7rem uppercase, var(--neutral-400)
- Copyright: 0.75rem, var(--neutral-400)
- Affiliate notice: var(--green-100) background with border
- 4-column grid on desktop, 2 columns on tablet, 1 on mobile

- [ ] **Step 3: Verify and commit**

Run: `npm run build`

```bash
git add -A
git commit -m "style: simplify footer — 4 columns, no newsletter, text logo"
```

---

### Task 9: Update category, animal, and cuidados pages

**Files:**
- Modify: `src/pages/[categoria].astro` (or equivalent category page)
- Modify: `src/pages/perros.astro`
- Modify: `src/pages/gatos.astro`
- Modify: `src/pages/cuidados/index.astro` (or equivalent)
- Modify: `src/pages/articulos.astro`
- Modify: `src/components/AnimalFilter.astro` (scoped styles ~56-116)

- [ ] **Step 1: Update AnimalFilter scoped styles**

In `src/components/AnimalFilter.astro`:
- Update pill styles to use new tokens: radius-pill, dog-color/dog-bg, cat-color/cat-bg
- Active state: filled background with animal color
- Default: neutral-50 background, neutral-500 text

- [ ] **Step 2: Review and update category pages**

Check each category/animal/listing page for:
- Font references (switch any --font-display to --font-sans)
- Color references (switch to new token names)
- Hero/header sections (simplify to bold h1 + subtitle + count)

These pages likely inherit most styling from global.css and use ArticleCard/AnimalFilter components that are already updated. Focus on any page-specific inline styles or classes.

- [ ] **Step 3: Verify and commit**

Run: `npm run build`

```bash
git add -A
git commit -m "style: update category, animal, and listing pages"
```

---

### Task 10: Update dark mode overrides

**Files:**
- Modify: `src/styles/global.css` (dark mode section ~1657-1847)

- [ ] **Step 1: Clean up dark mode CSS**

The dark mode custom properties were already updated in Task 1. Now clean up the component-level dark mode overrides (~lines 1657-1847):

- Remove overrides for deleted components (quiz, trust-bar, seasonal-banner, old newsletter)
- Update remaining overrides to reference new token names where they use hardcoded colors
- Ensure header glass background uses `rgba(15, 15, 15, 0.85)`
- Ensure `.hero-cta.dog:hover` and `.hero-cta.cat:hover` have appropriate dark mode colors
- Test that affiliate button colors remain readable in dark mode

- [ ] **Step 2: Verify dark mode visually**

Run: `npm run build && npm run preview`

Open the site in browser, toggle dark mode, and check:
- Header glass effect
- Hero text contrast
- Card backgrounds and borders
- Article prose readability
- Affiliate button visibility
- Footer contrast

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: clean up dark mode overrides for new design system"
```

---

### Task 11: Clean up unused CSS and final build

**Files:**
- Modify: `src/styles/global.css` (remove dead CSS)
- Modify: `src/layouts/Base.astro` (verify font preloads)

- [ ] **Step 1: Remove all dead CSS**

Search for orphaned CSS classes that reference deleted components:
```bash
grep -n "quiz\|pet-quiz\|trust-bar\|seasonal\|newsletter-section\|nav-dropdown\|logo-icon\|logo-text\|category-card\|category-icon\|category-info" src/styles/global.css
```

Remove all matching rules. Also remove:
- Old `.hero-stats`, `.hero-meta` rules
- Old `.newsletter-form-hero` rules
- References to `--font-display`
- Any `--radius-xl` or `--shadow-xl` references (removed from token system)

- [ ] **Step 2: Verify font preloads in Base.astro**

Check `src/layouts/Base.astro`:
- Inter fonts should still be preloaded
- Plus Jakarta Sans preload should be gone (removed in Task 2)
- No references to deleted components in the layout

- [ ] **Step 3: Run final build**

```bash
npm run build
```

This will:
1. Build all pages
2. Auto-regenerate CSP hashes via `scripts/update-csp-hashes.mjs`
3. Update `public/_headers` and `dist/_headers`

Expected: Clean build with no warnings about missing components or fonts.

- [ ] **Step 4: Preview and visual check**

```bash
npm run preview
```

Open in browser and check:
- Homepage: all 6 sections render correctly
- Header: minimal nav, responsive hamburger
- Article page: prose styling, ComparisonTable, TopPick, AffiliateButton
- Category page: grid + animal filter
- /perros/ and /gatos/ landing pages
- /cuidados/ listing page
- Dark mode: toggle and verify all pages
- Mobile: responsive layout, bottom nav

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: clean up dead CSS, verify build with new design system"
```
