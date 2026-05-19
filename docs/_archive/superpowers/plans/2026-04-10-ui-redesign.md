# UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar visualmente patasyhogar.com de principio a fin: nueva paleta de colores (emerald/stone), tipografía Plus Jakarta Sans, iconos SVG Lucide reemplazando todos los emojis, hero rediseñado, footer unificado, y componentes mejorados.

**Architecture:** Todo son cambios CSS en `global.css` + componentes Astro (`.astro`). No se añade JavaScript nuevo ni dependencias npm. Las fuentes se self-hostean como woff2. Los iconos son SVG inline (no icon font). El build command (`npm run build`) valida todo y actualiza CSP hashes automáticamente.

**Tech Stack:** Astro 5, CSS custom properties, SVG inline, woff2 self-hosted fonts.

**Spec:** `docs/superpowers/specs/2026-04-10-ui-redesign-design.md`

---

## Phase 1: Foundation

### Task 1: CSS design tokens — colores, radios, sombras

Actualizar TODAS las custom properties en `:root` y `[data-theme="dark"]` de global.css.

**Files:**
- Modify: `src/styles/global.css` (`:root` block lines 45-94, `[data-theme="dark"]` block)

- [ ] **Step 1: Reemplazar variables de color en `:root`**

En `src/styles/global.css`, buscar el bloque `:root {` y reemplazar las variables de color (líneas 46-65) con:

```css
  --color-primary: #059669;
  --color-primary-dark: #047857;
  --color-primary-light: #34d399;
  --color-secondary: #f97316;
  --color-accent: #f97316;
  --color-dog: #ea580c;
  --color-dog-dark: #c2410c;
  --color-cat: #7c3aed;
  --color-cat-dark: #6d28d9;

  --color-bg: #fafaf9;
  --color-bg-card: #ffffff;
  --color-bg-muted: #f5f5f4;

  --color-text: #1c1917;
  --color-text-muted: #57534e;
  --color-text-light: #78716c;

  --color-border: #e7e5e4;
  --color-border-dark: #d6d3d1;
```

- [ ] **Step 2: Actualizar radios**

Reemplazar las variables de radius:

```css
  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 18px;
  --radius-xl: 22px;
```

- [ ] **Step 3: Actualizar sombras**

Reemplazar las variables de shadow:

```css
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.1);
```

- [ ] **Step 4: Actualizar dark mode**

Buscar el bloque `[data-theme="dark"] {` y reemplazar sus variables:

```css
[data-theme="dark"] {
  --color-bg: #0c0a09;
  --color-bg-card: #1c1917;
  --color-bg-muted: #292524;

  --color-text: #fafaf9;
  --color-text-muted: #a8a29e;
  --color-text-light: #78716c;

  --color-border: #292524;
  --color-border-dark: #44403c;

  --color-primary: #34d399;
  --color-primary-dark: #059669;
  --color-primary-light: #065f46;
}
```

- [ ] **Step 5: Actualizar dark mode overrides**

Buscar `[data-theme="dark"] .header` y actualizar el background:

```css
[data-theme="dark"] .header {
  background: rgba(12, 10, 9, 0.85);
}
```

Buscar `[data-theme="dark"] .hero` y actualizar los colores del gradiente a tonos emerald/stone en vez de los actuales.

Buscar `[data-theme="dark"] .footer` (si existe) — será eliminado en Task 5 (footer redesign).

- [ ] **Step 6: Actualizar colores en `.affiliate-button` variants**

Buscar `.affiliate-button.amazon` y actualizar si los colores difieren. Los colores Amazon (#FF9900), Zooplus (#00473e → antes era #2d6e1f), Tiendanimal (#00632E) y sus hovers:

```css
.affiliate-button.zooplus {
  background: #00473e;
  color: #fff;
}

.affiliate-button.zooplus:hover {
  background: #003d35;
  color: #fff;
  box-shadow: 0 6px 20px rgba(0, 71, 62, 0.35);
}
```

- [ ] **Step 7: Verificar build**

Run: `npm run build`
Expected: Build exitoso, 795+ páginas.

- [ ] **Step 8: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(design-system): new color palette emerald/stone, updated radios and shadows"
```

---

### Task 2: Font swap — Plus Jakarta Sans reemplaza Outfit

**Files:**
- Create: `public/fonts/plus-jakarta-sans-latin.woff2`
- Create: `public/fonts/plus-jakarta-sans-latin-ext.woff2`
- Delete: `public/fonts/outfit-latin.woff2`
- Delete: `public/fonts/outfit-latin-ext.woff2`
- Modify: `src/styles/global.css` (@font-face blocks, `--font-display`)
- Modify: `src/layouts/Base.astro` (preload/prefetch)

- [ ] **Step 1: Descargar Plus Jakarta Sans woff2**

Descargar los archivos de Google Fonts API:

```bash
# Latin
curl -sL "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_d0n9QB_VIKg.woff2" -o public/fonts/plus-jakarta-sans-latin.woff2

# Latin-ext
curl -sL "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_d0n9Qx_VIKg.woff2" -o public/fonts/plus-jakarta-sans-latin-ext.woff2
```

Si las URLs de Google Fonts cambian, buscar la fuente en https://gwfh.mranftl.com/fonts/plus-jakarta-sans y descargar subset latin + latin-ext en woff2, weight 700-800.

- [ ] **Step 2: Actualizar @font-face en global.css**

Reemplazar los 2 bloques `@font-face` de Outfit (líneas 25-43 aprox) con:

```css
/* Self-hosted Plus Jakarta Sans - latin-ext */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 700 800;
  font-display: swap;
  src: url('/fonts/plus-jakarta-sans-latin-ext.woff2') format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* Self-hosted Plus Jakarta Sans - latin */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 700 800;
  font-display: swap;
  src: url('/fonts/plus-jakarta-sans-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

- [ ] **Step 3: Actualizar --font-display variable**

```css
  --font-display: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
```

- [ ] **Step 4: Actualizar Base.astro preload/prefetch**

En `src/layouts/Base.astro`, buscar las líneas de font loading (~línea 37-40):

Cambiar el prefetch de outfit a preload de jakarta:
```html
<link rel="preload" href="/fonts/plus-jakarta-sans-latin.woff2" as="font" type="font/woff2" crossorigin />
```

Eliminar la línea de prefetch de outfit-latin.woff2.

- [ ] **Step 5: Eliminar archivos Outfit**

```bash
rm public/fonts/outfit-latin.woff2 public/fonts/outfit-latin-ext.woff2
```

- [ ] **Step 6: Verificar build**

Run: `npm run build`
Expected: Build exitoso. Headings ahora usan Plus Jakarta Sans.

- [ ] **Step 7: Commit**

```bash
git add public/fonts/ src/styles/global.css src/layouts/Base.astro
git commit -m "feat(typography): swap Outfit for Plus Jakarta Sans — rounder, more playful display font"
```

---

### Task 3: IconCategory component

Nuevo componente que mapea categoría → SVG inline de Lucide. Elimina el uso de emojis para categorías en todo el sitio.

**Files:**
- Create: `src/components/IconCategory.astro`

- [ ] **Step 1: Crear el componente**

```astro
---
interface Props {
  category: string;
  size?: number;
  class?: string;
}

const { category, size = 24, class: className = '' } = Astro.props;

const icons: Record<string, string> = {
  alimentacion: `<path d="M15 11h.01"/><path d="M11 15h.01"/><path d="M16 16c1-1.5 3-2 4-3.5 2-3 .5-7-3-7.5"/><path d="M5 16c-1-1.5-3-2-4-3.5-2-3-.5-7 3-7.5"/><path d="M8.5 2c2 0 3 1 3.5 2"/><path d="M15.5 2c-2 0-3 1-3.5 2"/><path d="M3 21c0-3.5 2.5-6 5.5-7"/><path d="M21 21c0-3.5-2.5-6-5.5-7"/>`,
  higiene: `<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>`,
  paseo: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
  juguetes: `<line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/>`,
  hogar: `<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`,
  cuidados: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>`,
};

const svgContent = icons[category] || icons['cuidados'];
---

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  aria-hidden="true"
  set:html={svgContent}
/>
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: Build exitoso. El componente se importará en tareas siguientes.

- [ ] **Step 3: Commit**

```bash
git add src/components/IconCategory.astro
git commit -m "feat: add IconCategory component — SVG Lucide icons for all categories"
```

---

## Phase 2: Core Components

### Task 4: Header — logo SVG y nav icons

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/styles/global.css` (`.logo`, `.header` dark override)

- [ ] **Step 1: Leer Header.astro actual**

Leer el archivo completo para localizar: el logo markup (emoji/SVG), los nav links, el dropdown con emojis de categoría, y los iconos de search/theme toggle.

- [ ] **Step 2: Actualizar el logo**

Buscar el markup del logo. Reemplazar el icono emoji/SVG actual con un SVG paw-print de Lucide:

```html
<svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><circle cx="4" cy="8" r="2"/><circle cx="2" cy="16" r="2"/><path d="M15.8 13.3a1.5 1.5 0 0 0-2.2-.8 6 6 0 0 1-6.2 0 1.5 1.5 0 0 0-2.2.8l-.7 1.4A2 2 0 0 0 6.3 17h11.4a2 2 0 0 0 1.8-2.7Z"/></svg>
```

Actualizar el texto del logo: `Patas<span>&</span>Hogar` (usar `&` en vez de `y`).

- [ ] **Step 3: Reemplazar emojis en dropdown de categorías**

Buscar las entradas del dropdown de "Secciones" que usan emojis para categorías. Importar `IconCategory` y reemplazar cada emoji:

```astro
import IconCategory from './IconCategory.astro';
```

Cada link de categoría en el dropdown pasa de `🥣 Alimentación` a:
```astro
<IconCategory category="alimentacion" size={16} /> Alimentación
```

Repetir para: higiene, paseo, juguetes, hogar, cuidados.

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat(Header): SVG paw-print logo, category icons replace emojis in dropdown"
```

---

### Task 5: Footer — rediseño completo a light

**Files:**
- Modify: `src/components/Footer.astro`
- Modify: `src/styles/global.css` (sección FOOTER)

- [ ] **Step 1: Leer Footer.astro y CSS footer actuales**

Leer ambos archivos para entender la estructura completa.

- [ ] **Step 2: Actualizar CSS del footer**

Buscar la sección `/* FOOTER */` en global.css. Reemplazar el fondo oscuro por:

```css
.footer {
  background: var(--color-bg-muted);
  border-top: 2px solid var(--color-border);
  padding: 3rem 0 1.5rem;
  color: var(--color-text);
}
```

Actualizar `.footer a` para color `var(--color-text-muted)` con hover `var(--color-primary)`.

Actualizar `.footer-brand`, `.footer-col`, `.footer-grid` manteniendo el grid de 4 columnas.

Eliminar `[data-theme="dark"] .footer` override si existe (ya no necesario — hereda del dark mode global).

- [ ] **Step 3: Reemplazar emojis en Footer.astro**

Buscar las 9+ instancias de emoji y reemplazar con SVG inline de Lucide (16px):

| Emoji | Reemplazo SVG (Lucide icon name) |
|-------|--------------------------------|
| 🐶 | dog icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75z"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/></svg>` |
| 🐱 | cat icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.1 6.95-.33a4.52 4.52 0 0 1 .18 6.58L12 21 2.87 11.51a4.52 4.52 0 0 1 .18-6.58c1.92-1.77 5.17-1.67 6.95.33.65-.17 1.33-.26 2-.26z"/></svg>` |
| 📖 | `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>` (book) |
| 🔍 | `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>` (search) |
| 📚 | `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>` (book-text) |
| 📬 | `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>` (mail) |
| ⚠️ | `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>` (triangle-alert) |

Para los demás emojis (🏷️, 🔄, 📡), usar iconos Lucide equivalentes: tag, refresh-cw, rss.

- [ ] **Step 4: Actualizar newsletter form styling**

El input y botón del newsletter deben usar pill shape:

```css
.newsletter-input {
  border-radius: 100px;
  padding: 0.6rem 1rem;
  border: 1px solid var(--color-border-dark);
  background: var(--color-bg-card);
}

.newsletter-btn {
  border-radius: 100px;
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
}
```

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 6: Commit**

```bash
git add src/components/Footer.astro src/styles/global.css
git commit -m "feat(Footer): redesign to light stone background, SVG icons replace all emojis"
```

---

### Task 6: ArticleCard — badges SVG y placeholder

**Files:**
- Modify: `src/components/ArticleCard.astro`
- Modify: `src/styles/global.css` (`.article-card` section)

- [ ] **Step 1: Leer ArticleCard.astro**

Leer el archivo completo para localizar emojis de animal en badges y el placeholder sin imagen.

- [ ] **Step 2: Reemplazar emoji animal en badge**

Buscar donde se muestra el emoji de animal (🐶/🐱) en el badge. Reemplazar con SVG inline:

Para perro:
```html
<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75z"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/></svg>
```

Para gato: SVG del cat icon de Lucide (mismo patrón).

- [ ] **Step 3: Mejorar placeholder sin imagen**

Buscar `.article-card-image-placeholder`. En vez del emoji grande, usar un SVG del animal (perro o gato) centrado con fondo gradiente suave:

```css
.article-card-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 5%, var(--color-bg)) 0%, color-mix(in srgb, var(--color-primary) 10%, var(--color-bg)) 100%);
  color: var(--color-primary-light);
}
```

En el markup del placeholder, reemplazar el emoji por un SVG inline del animal (48px) con opacidad 0.3.

- [ ] **Step 4: Actualizar icono de reloj en meta**

Si hay un emoji de reloj (🕒) en los metadatos (reading time), reemplazar con SVG clock de Lucide (14px).

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 6: Commit**

```bash
git add src/components/ArticleCard.astro src/styles/global.css
git commit -m "feat(ArticleCard): SVG animal badges, improved placeholder gradient, clock icon"
```

---

### Task 7: StoreIcon + AffiliateButton — logos de tienda

**Files:**
- Modify: `src/components/StoreIcon.astro`
- Modify: `src/components/AffiliateButton.astro`

- [ ] **Step 1: Leer ambos componentes**

Leer StoreIcon.astro y AffiliateButton.astro para entender la interfaz actual.

- [ ] **Step 2: Actualizar StoreIcon con iconos de marca mejorados**

StoreIcon ya usa SVGs (no emojis). Actualizar los SVGs para que sean más reconocibles:

- **Amazon**: SVG sonrisa/flecha reconocible de Amazon
- **Zooplus**: SVG huella de pata (5 elipses: 4 dedos + pad central)
- **Tiendanimal**: SVG cara de mascota (orejas + cara, usando el dog icon de Lucide)

```astro
---
interface Props {
  tienda: 'amazon' | 'zooplus' | 'tiendanimal' | 'default';
  size?: number;
}

const { tienda, size = 16 } = Astro.props;
---

{tienda === 'amazon' && (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.045 18.02c.071-.116.186-.186.3-.186 3.6.72 7.08.72 10.68 0a.36.36 0 0 1 .36.18.36.36 0 0 1-.06.3c-1.8 2.16-4.56 3.36-7.38 3.36-1.44 0-2.88-.24-4.2-.72a.36.36 0 0 1-.18-.54l.48-.39z"/>
    <path d="M21.6 17.28c-.24-.36-.96-.42-1.44-.42-.48.06-.96.18-1.38.36-.18.06-.18-.06-.06-.18.66-.84.66-1.68.18-2.46-.6-1.02-1.8-1.44-3-1.08-.06 0-.12-.06-.06-.12 1.2-.54 2.58-.3 3.54.42.78.6 1.2 1.56 1.14 2.58 0 .36-.12.66-.36.9-.06.06-.18.06-.24 0l-.12-.12z"/>
  </svg>
)}

{tienda === 'zooplus' && (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <ellipse cx="12" cy="15" rx="3.5" ry="3"/>
    <ellipse cx="6" cy="11.5" rx="2.2" ry="2.8" transform="rotate(-10 6 11.5)"/>
    <ellipse cx="18" cy="11.5" rx="2.2" ry="2.8" transform="rotate(10 18 11.5)"/>
    <ellipse cx="8.5" cy="5.5" rx="2" ry="2.5" transform="rotate(-5 8.5 5.5)"/>
    <ellipse cx="15.5" cy="5.5" rx="2" ry="2.5" transform="rotate(5 15.5 5.5)"/>
  </svg>
)}

{tienda === 'tiendanimal' && (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/>
    <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>
    <path d="M8 14v.5"/><path d="M16 14v.5"/>
    <path d="M11.25 16.25h1.5L12 17l-.75-.75z"/>
    <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/>
  </svg>
)}

{tienda === 'default' && (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
  </svg>
)}
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 4: Commit**

```bash
git add src/components/StoreIcon.astro src/components/AffiliateButton.astro
git commit -m "feat(StoreIcon): improved brand-recognizable SVG icons for Amazon, Zooplus, Tiendanimal"
```

---

### Task 8: ComparisonTable — precios por tienda mejorados

**Files:**
- Modify: `src/components/ComparisonTable.astro`

- [ ] **Step 1: Leer ComparisonTable.astro**

Leer el archivo completo para localizar: la tabla de precios por tienda, los botones de ordenar, los badges, las estrellas de rating.

- [ ] **Step 2: Actualizar colores de tienda en filas de precio**

Buscar las clases de tienda en el component styles (`.store-amazon`, `.store-zooplus`, `.store-tiendanimal` o similar). Actualizar colores:

- Amazon: fondo `#fff8f0`, borde `#ffe4c4`, precio en `#c2410c`
- Zooplus: fondo `#f0fdf8`, borde `#d1fae5`, precio en `#00473e`
- Tiendanimal: fondo `#f0fdf4`, borde `#bbf7d0`, precio en `#00632E`

- [ ] **Step 3: Reemplazar emojis si existen**

Buscar emojis en el componente (🏆 para "Mejor opción" badge, estrellas, etc.). Reemplazar con SVG o texto plano.

El badge "Mejor opción" puede usar: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` (star icon) + texto.

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 5: Commit**

```bash
git add src/components/ComparisonTable.astro
git commit -m "feat(ComparisonTable): brand-colored store price rows, SVG badges replace emojis"
```

---

### Task 9: TopPick — nuevo estilo con logos tienda

**Files:**
- Modify: `src/components/TopPick.astro`

- [ ] **Step 1: Leer TopPick.astro**

Leer el archivo completo para localizar: el badge, la imagen del producto, los botones CTA por tienda.

- [ ] **Step 2: Actualizar estilos del badge**

Reemplazar el emoji 🏆 del badge por SVG trophy/star y actualizar fondo:

```css
.top-pick-badge {
  background: var(--color-primary);
  color: #fff;
  padding: 0.3rem 0.75rem;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 700;
}
```

- [ ] **Step 3: Actualizar fondo y borde del contenedor**

```css
.top-pick {
  background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 5%, var(--color-bg-card)) 0%, color-mix(in srgb, var(--color-primary) 10%, var(--color-bg-card)) 100%);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-xl);
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 5: Commit**

```bash
git add src/components/TopPick.astro
git commit -m "feat(TopPick): emerald gradient background, SVG badge, updated brand styling"
```

---

## Phase 3: Homepage

### Task 10: TrustBar component + Homepage restructure

**Files:**
- Create: `src/components/TrustBar.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css` (hero, trust-bar, sections)

- [ ] **Step 1: Crear TrustBar.astro**

```astro
---
---
<div class="trust-bar">
  <div class="container">
    <div class="trust-bar-inner">
      <div class="trust-bar-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        <span>Productos probados</span>
      </div>
      <div class="trust-bar-divider"></div>
      <div class="trust-bar-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
        <span>60+ guías detalladas</span>
      </div>
      <div class="trust-bar-divider"></div>
      <div class="trust-bar-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        <span>Sin publi encubierta</span>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Añadir CSS de TrustBar en global.css**

Añadir después de la sección HERO:

```css
/* TRUST BAR */
.trust-bar {
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--color-border);
}

.trust-bar-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.trust-bar-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text);
}

.trust-bar-item svg {
  color: var(--color-primary);
  flex-shrink: 0;
}

.trust-bar-item span {
  font-size: 0.85rem;
  font-weight: 600;
}

.trust-bar-divider {
  width: 1px;
  height: 20px;
  background: var(--color-border);
}

@media (max-width: 640px) {
  .trust-bar-inner {
    flex-direction: column;
    gap: 0.75rem;
  }
  .trust-bar-divider {
    display: none;
  }
}
```

- [ ] **Step 3: Rediseñar el hero en index.astro**

Leer `src/pages/index.astro` y reemplazar el hero section. El nuevo hero tiene:

- Fondo: gradiente emerald-50 → amber-50
- Layout: 2 columnas (texto izq + card destacado der)
- Kicker: "Guías y comparativas honestas" con icono heart SVG
- H1: "Encuentra lo mejor para tu mascota" (Plus Jakarta Sans, viene de --font-display)
- Subtítulo: texto descriptivo
- 2 CTAs: "Guías para perros" (color dog) + "Guías para gatos" (color cat) con SVG icons
- Card derecha: artículo destacado con imagen y badges

Actualizar el CSS de `.hero`:

```css
.hero {
  background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 4%, var(--color-bg)) 0%, color-mix(in srgb, var(--color-primary) 8%, var(--color-bg)) 50%, color-mix(in srgb, var(--color-secondary) 5%, var(--color-bg)) 100%);
  padding: 4rem 0;
  position: relative;
}
```

Eliminar los hero stats, gradiente texto, y dot pattern del fondo.

- [ ] **Step 4: Reemplazar emojis del hero**

Los CTAs del hero usan 🐶 y 🐱. Reemplazar con SVG inline de perro/gato (18px).

- [ ] **Step 5: Añadir TrustBar después del hero**

En index.astro, importar y colocar `<TrustBar />` después del hero, antes de categorías.

Eliminar la sección trust-section con las 3 cards grandes (`.trust-section`, `.trust-grid`, `.trust-card`).

- [ ] **Step 6: Separar artículos populares por animal**

Buscar la sección de artículos destacados. En vez de un solo grid mezclado, crear dos secciones:

```astro
<!-- Populares perros -->
<section class="section">
  <h2 class="section-title"><IconDog size={24} /> Populares para perros</h2>
  <div class="articles-grid">
    {perroArticles.slice(0, 3).map(a => <ArticleCard article={a} />)}
  </div>
  <a href="/perros" class="section-link">Ver todas las guías para perros →</a>
</section>

<!-- Populares gatos -->
<section class="section">
  <h2 class="section-title"><IconCat size={24} /> Populares para gatos</h2>
  <div class="articles-grid">
    {gatoArticles.slice(0, 3).map(a => <ArticleCard article={a} />)}
  </div>
  <a href="/gatos" class="section-link">Ver todas las guías para gatos →</a>
</section>
```

- [ ] **Step 7: Reemplazar emojis de categorías en homepage**

Buscar donde se renderizan los iconos de categoría en el grid de categorías. Importar `IconCategory` y usarlo en vez de emojis.

- [ ] **Step 8: Reemplazar emoji del newsletter**

Buscar 📋 y reemplazar con SVG clipboard de Lucide.

- [ ] **Step 9: Actualizar seasonal/trending emojis**

Buscar la sección seasonal. Los emojis estacionales (⚠️, 🛡️, ☀️, etc.) vienen de un objeto JS. Reemplazar el mapeo de iconos estacionales por SVGs de Lucide equivalentes. Esto puede estar en el script del componente o en el frontmatter. Actualizar el mapeo:

| Emoji | SVG Lucide |
|-------|-----------|
| ⚠️ | triangle-alert |
| 🛡️ | shield |
| ☀️ | sun |
| 🚗 | car |
| 🧥 | shirt |
| 🎁 | gift |
| ❄️ | snowflake |

- [ ] **Step 10: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 11: Commit**

```bash
git add src/components/TrustBar.astro src/pages/index.astro src/styles/global.css
git commit -m "feat(Homepage): new hero with featured article, TrustBar, separated dog/cat sections, all SVG icons"
```

---

### Task 11: PetQuiz + AnimalFilter + Bottom nav — SVG icons

**Files:**
- Modify: `src/components/PetQuiz.astro`
- Modify: `src/components/AnimalFilter.astro`
- Modify: `src/layouts/Base.astro` (bottom nav)

- [ ] **Step 1: PetQuiz — reemplazar emojis**

Leer `src/components/PetQuiz.astro`. Buscar las 8 instancias de emoji en `.quiz-option-icon`:

Reemplazar cada `<span class="quiz-option-icon">EMOJI</span>` con el SVG correspondiente (28px):

- 🐶 → SVG dog (Lucide)
- 🐱 → SVG cat (Lucide)
- 🥣 → IconCategory alimentacion
- 🪮 → IconCategory higiene
- 🦮 → IconCategory paseo
- 🧸 → IconCategory juguetes
- 🏠 → IconCategory hogar
- ❤️ → IconCategory cuidados

Importar `IconCategory` y usarlo para las categorías. Para perro/gato, usar SVG inline directo.

- [ ] **Step 2: AnimalFilter — reemplazar emojis**

Leer `src/components/AnimalFilter.astro`. Buscar 🐶 y 🐱 en los botones de filtro.

Reemplazar con SVG inline pequeño (14px) del perro/gato.

- [ ] **Step 3: Bottom nav — reemplazar emojis**

Leer `src/layouts/Base.astro`. Buscar la sección `.bottom-nav` con los items de navegación. Reemplazar emojis por SVGs de Lucide (20px):

- Home: `<svg>` house icon
- Perros: `<svg>` dog icon
- Gatos: `<svg>` cat icon
- Buscar: `<svg>` search icon

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 5: Commit**

```bash
git add src/components/PetQuiz.astro src/components/AnimalFilter.astro src/layouts/Base.astro
git commit -m "feat: SVG icons in PetQuiz, AnimalFilter, and bottom nav — zero emojis remaining"
```

---

## Phase 4: Pages + Cleanup

### Task 12: Páginas secundarias — SVG icons

**Files:**
- Modify: `src/pages/[categoria].astro`
- Modify: `src/pages/perros.astro`
- Modify: `src/pages/gatos.astro`
- Modify: `src/pages/buscar.astro`
- Modify: `src/pages/sobre-mi.astro` (si tiene emojis)
- Modify: `src/pages/contacto.astro` (si tiene emojis)

- [ ] **Step 1: Categoría page**

Leer `src/pages/[categoria].astro`. Buscar emojis en el header de categoría. Importar `IconCategory` y usarlo.

- [ ] **Step 2: Perros/Gatos pages**

Leer `src/pages/perros.astro` y `gatos.astro`. Buscar emojis de animal y categoría. Reemplazar con SVGs (mismo patrón que tareas anteriores). Importar `IconCategory` para los iconos de subcategoría.

- [ ] **Step 3: Search page**

Leer `src/pages/buscar.astro`. Reemplazar:
- 🔍 en el input → SVG search (20px)
- 🐾 en empty state → SVG paw-print (48px)
- 😿 en no-results → SVG search-x (48px)

- [ ] **Step 4: About y Contact**

Leer ambas páginas. Si hay emojis, reemplazar con SVGs.

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 6: Commit**

```bash
git add src/pages/
git commit -m "feat(pages): SVG icons in category, animal, search, about, and contact pages"
```

---

### Task 13: Dark mode polish

**Files:**
- Modify: `src/styles/global.css` (dark mode overrides section)

- [ ] **Step 1: Revisar dark mode overrides**

Leer la sección `[data-theme="dark"]` completa en global.css. Asegurar que todos los overrides usan los nuevos colores stone.

- [ ] **Step 2: Actualizar hero dark**

```css
[data-theme="dark"] .hero {
  background:
    radial-gradient(circle, color-mix(in srgb, var(--color-primary) 6%, transparent) 1px, transparent 1px),
    var(--color-bg);
  background-size: 28px 28px;
}

[data-theme="dark"] .hero::before {
  background: radial-gradient(ellipse, rgba(52, 211, 153, 0.06) 0%, transparent 70%);
}

[data-theme="dark"] .hero::after {
  background: radial-gradient(ellipse, rgba(249, 115, 22, 0.04) 0%, transparent 70%);
}
```

- [ ] **Step 3: Eliminar overrides obsoletos**

Eliminar overrides que ya no aplican con los nuevos colores (ej: `.footer` dark override si el footer ya es light).

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(dark-mode): stone-950 base, emerald-400 primary, updated all overrides"
```

---

### Task 14: Cleanup final — verificación cero emojis

**Files:**
- Read: todos los archivos modificados

- [ ] **Step 1: Buscar emojis residuales**

```bash
grep -rn "🐶\|🐱\|🥣\|🪮\|🦮\|🧸\|🏠\|❤️\|📖\|🔍\|📚\|📬\|⚠️\|🏷️\|🔄\|📡\|🐾\|😿\|📋\|🕒\|☀️\|❄️\|🎁\|🧥\|🚗\|🛡️" src/
```

Expected: CERO resultados en componentes y páginas. Pueden quedar en archivos de contenido MDX (eso es OK — los MDX son contenido editorial).

Si quedan emojis en componentes/páginas, corregirlos.

- [ ] **Step 2: Buscar references a Outfit**

```bash
grep -rn "Outfit\|outfit" src/ public/
```

Expected: CERO resultados. Si queda alguna referencia, eliminarla.

- [ ] **Step 3: Verificar que los archivos Outfit no existen**

```bash
ls public/fonts/outfit*
```

Expected: "No such file or directory"

- [ ] **Step 4: Build final completo**

Run: `npm run build`
Expected: Build exitoso, 795+ páginas. CSP hashes actualizados.

- [ ] **Step 5: Verificación visual**

Run: `npx astro dev`
Verificar en navegador:
- Homepage: nuevo hero, trust bar, secciones separadas, categorías con SVG
- Dark mode: transición suave, colores stone
- Artículo: badges SVG, ComparisonTable con colores de tienda, TopPick emerald
- Mobile: bottom nav con SVGs, PetQuiz con SVGs
- Footer: fondo claro stone
- Búsqueda: iconos SVG en estados vacío/sin resultados
- CERO emojis visibles en UI (solo en contenido editorial MDX)

- [ ] **Step 6: Commit final si hubo correcciones**

```bash
git add -A
git commit -m "chore: final cleanup — zero emoji in UI, zero Outfit references, verified build"
```
