# UI Redesign: Fresh Playful + Editorial — Design Spec

## Vision

Rediseño visual completo de patasyhogar.com. De "web genérica de mascotas con emojis" a una marca con identidad visual propia: fresca, amigable, profesional. Estilo Fresh Playful con disciplina editorial.

**Principios:**
- Los iconos SVG reemplazan TODOS los emojis
- Los colores de marca de cada tienda (Amazon, Zooplus, Tiendanimal) se respetan siempre
- Los fondos son claros y cálidos (stone), nunca oscuros excepto dark mode
- La tipografía Plus Jakarta Sans da personalidad sin sacrificar legibilidad
- Cada componente tiene feedback táctil (:active) y transiciones con curvas custom (ya implementado)

---

## 1. Design System

### 1.1 Paleta de colores

Reemplaza TODAS las custom properties en `:root` de `global.css`:

```
Primary:       #059669  (emerald-600, vibrante)
Primary Dark:  #047857  (emerald-700, hover/active)
Primary Light: #34d399  (emerald-400, badges/fondos suaves)
Accent:        #f97316  (orange-500, CTAs secundarios/destacados)
Accent Dark:   #ea580c  (orange-600, hover accent)

Dog:           #ea580c  (orange-600)
Dog Dark:      #c2410c  (orange-700)
Cat:           #7c3aed  (violet-600)
Cat Dark:      #6d28d9  (violet-700)

BG:            #fafaf9  (stone-50)
BG Card:       #ffffff
BG Muted:      #f5f5f4  (stone-100)
Text:          #1c1917  (stone-900)
Text Muted:    #57534e  (stone-600)
Text Light:    #78716c  (stone-500)
Border:        #e7e5e4  (stone-200)
Border Dark:   #d6d3d1  (stone-300)
```

**Dark mode:**
```
BG:            #0c0a09  (stone-950)
BG Card:       #1c1917  (stone-900)
BG Muted:      #292524  (stone-800)
Text:          #fafaf9  (stone-50)
Text Muted:    #a8a29e  (stone-400)
Text Light:    #78716c  (stone-500)
Border:        #292524  (stone-800)
Border Dark:   #44403c  (stone-700)
Primary:       #34d399  (emerald-400, más brillante en oscuro)
```

**Tiendas (no cambian en dark mode para los botones sólidos):**
```
Amazon:        #FF9900  (texto: #0f1111)
Zooplus:       #00473e
Tiendanimal:   #00632E
```

### 1.2 Tipografía

Reemplaza Outfit por **Plus Jakarta Sans** como fuente display:

```
Display: 'Plus Jakarta Sans', system-ui, sans-serif  (weight 700-800)
Body:    'Inter', system-ui, sans-serif               (weight 400-600)
```

- Descargar Plus Jakarta Sans (latin + latin-ext, weight 700 y 800) como woff2 self-hosted
- Eliminar Outfit de los @font-face
- Preload Plus Jakarta Sans (es la fuente de headings, crítica)
- Prefetch se elimina (ya no hay Outfit)

**Escalas:**
- Hero h1: 2.4rem/800/-0.03em
- Section h2: 1.6rem/800/-0.02em
- Card h3: 1.05rem/700/-0.02em
- Body: 1rem/400/1.65 line-height
- Meta: 0.85rem/500
- Badge: 0.65rem/700/uppercase

### 1.3 Sistema de iconos

Reemplazar TODOS los emojis por SVG inline de Lucide Icons (https://lucide.dev):

**Categorías:**
- Alimentación: `beef` o `cookie` (icono de comida)
- Higiene: `sparkles` o `droplets`
- Paseo: `footprints` o `map-pin`
- Juguetes: `gamepad-2` o `puzzle`
- Hogar: `home`
- Cuidados: `heart`

**Animales:**
- Perro: `dog` (Lucide tiene icono de perro)
- Gato: `cat` (Lucide tiene icono de gato)
- Ambos: `heart` o `paw-print`

**UI general:**
- Buscar: `search`
- Tema: `sun` / `moon`
- Menu: `menu`
- Reloj: `clock`
- Flecha: `arrow-right`, `chevron-right`
- Estrella: `star`
- Escudo: `shield-check`
- Libro: `book-open`

**Implementación:**
- SVG inline directamente en los componentes Astro (no icon font)
- Tamaño estándar: 20px en texto, 28px en cards de categoría, 16px en badges
- Stroke-width: 2 (estándar Lucide)
- Color: `currentColor` para heredar del padre

**Componente IconCategory:** Crear `src/components/IconCategory.astro` que recibe `category` y devuelve el SVG correcto. Elimina el emoji hardcodeado.

### 1.4 Sombras y radios

```
Shadow SM:  0 1px 3px rgba(0,0,0,0.04)
Shadow MD:  0 4px 12px rgba(0,0,0,0.06)
Shadow LG:  0 8px 24px rgba(0,0,0,0.08)
Shadow XL:  0 12px 32px rgba(0,0,0,0.1)

Radius SM:  10px  (antes 8px)
Radius MD:  14px  (antes 12px)
Radius LG:  18px  (antes 14px)
Radius XL:  22px  (antes 16px — cards principales)
```

Los radios suben ligeramente para el estilo "rounded/fresh".

### 1.5 Tokens de animación (ya implementados)

Se mantienen los tokens de la sesión anterior:
```
--ease-out: cubic-bezier(0.23, 1, 0.32, 1)
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1)
--duration-instant: 100ms
--duration-fast: 160ms
--duration-normal: 200ms
--duration-slow: 300ms
```

---

## 2. Homepage

### 2.1 Hero

**Estructura:**
- Fondo: gradiente suave emerald-50 → emerald-100 → amber-50 (sutil)
- Izquierda: kicker ("Guías y comparativas honestas" con icono heart), h1 (Plus Jakarta 2.4rem 800), subtítulo, 2 CTAs pill (perros color dog, gatos color cat)
- Derecha: card del artículo destacado (el más reciente con `destacado: true`), ligeramente rotada (1-2deg), con sombra
- Mobile: stacked, card debajo de los CTAs

**Eliminar:** hero stats (números sueltos), gradiente texto actual, dot pattern de fondo.

### 2.2 Barra de confianza

Reemplaza las 3 trust-card grandes. Una sola fila horizontal:
- 3 items inline: icono SVG + texto corto
- Separados por `|` (divider 1px)
- Sin fondo ni borde — minimal
- Mobile: wrap vertical si no cabe

Items: "Productos probados" (shield-check) | "60+ guías detalladas" (book-open) | "Sin publi encubierta" (heart)

### 2.3 Categorías

Misma estructura de grid 6 cards pero:
- Iconos SVG (via IconCategory) en vez de emojis
- Icono sobre fondo emerald-50 con radius 14px
- Hover: icono escala, fondo del icono sube a emerald-100
- Active: scale(0.98) (ya implementado)

### 2.4 Artículos populares — separados por animal

En vez de un solo bloque mezclado:
- **Sección "Populares para perros"** — heading con icono perro SVG + color dog, 3 cards
- **Sección "Populares para gatos"** — heading con icono gato SVG + color cat, 3 cards
- Cada sección con link "Ver todas las guías para [animal] →"

### 2.5 Pet Quiz

Mismo flujo de 3 pasos. Cambios visuales:
- Emojis → iconos SVG (perro, gato, y categorías)
- Botones de opción: fondo blanco con borde, hover con tint del color correspondiente
- Transición entre pasos: slide horizontal (no solo fade)
- Progress dots → progress bar animada

### 2.6 Últimos artículos

- Grid con filtro animal (tabs Perro/Gato/Todos)
- Cards con nuevo diseño (ver sección 4)
- Botón "Ver todos los artículos →" al final

### 2.7 Sección temporal/estacional

Se mantiene pero con iconos SVG en vez de emojis.

---

## 3. Header y navegación

### 3.1 Header

- Mantener sticky + backdrop-filter blur (funciona bien)
- Logo: "Patas" en text color + "&" en primary + "Hogar" en text color. Font: Plus Jakarta Sans 800
- Eliminar icono emoji del logo, usar un SVG paw-print pequeño
- Fondo: rgba del nuevo BG (#fafaf9) al 80% + blur

### 3.2 Nav desktop

- Links con hover: fondo muted, color primary
- Active: pill con fondo primary-light translúcido
- Dropdown: mismo estilo pero con iconos SVG por categoría
- Search: mantener icono, abrir overlay/modal de búsqueda (mejora futura, no scope de este rediseño)

### 3.3 Nav mobile

- Hamburger animado (ya funciona bien)
- Bottom nav: iconos SVG (Home, Perros, Gatos, Buscar) en vez de emojis
- Active: color primary, stroke-width 2.5
- :active scale(0.92) (ya implementado)

---

## 4. Article Cards

- Border-radius: 22px (xl)
- Imagen 16:9 con gradient overlay sutil
- Badges: pills redondeados con colores de categoría (mantener sistema actual de colores por categoría)
- Badge animal: icono SVG perro/gato pequeño (no emoji) + texto
- Título: Plus Jakarta Sans 700
- Excerpt: 2 líneas max, text clamp
- Meta: icono clock + tiempo lectura + fecha
- "Leer →" con transición translateX en hover
- Hover: shadow-lg + translateY(-3px) + image zoom (ya implementado)
- Active: scale(0.98) (ya implementado)
- Placeholder (sin imagen): gradiente suave emerald-50 con icono SVG del animal centrado (no emoji)

---

## 5. Componentes de afiliado

### 5.1 AffiliateButton

- Pill shape (border-radius: 100px)
- Colores de marca de cada tienda: Amazon #FF9900, Zooplus #00473e, Tiendanimal #00632E
- Icono de marca a la izquierda (descargar logos oficiales a `public/images/stores/` como SVG o PNG 2x)
- Componente StoreIcon.astro actualizado para usar logos reales
- Shadow con color de la tienda (glow)
- Active: scale(0.95) (ya implementado)

### 5.2 ComparisonTable

- Fondo de card: blanco con radius 22px
- Filas de producto: hover background con tint primary 3% (ya implementado)
- Precios por tienda: fila con dot de color de marca + fondo tintado + precio bold
- Badge "Mejor precio" en emerald para el más barato
- Sort buttons: estilo pill, active scale(0.95) (ya implementado)
- Imagen producto: radius 12px
- Nombre producto: Plus Jakarta Sans 700
- Estrellas: color accent (#f97316)

### 5.3 TopPick

- Fondo: gradiente emerald-50 → emerald-100
- Borde: 2px primary
- Badge "Mejor opción" en primary sólido
- Imagen producto: fondo blanco con sombra sutil, radius 16px
- Botones CTA: con logo de tienda + precio
- Hover: shadow-lg elevación (ya implementado)

---

## 6. Footer

**Cambio radical:** de navy oscuro (#1a1a2e) a stone claro (#f5f5f4).

- Fondo: BG Muted (#f5f5f4)
- Border-top: 2px solid border (#e7e5e4)
- 4 columnas: Brand + descripción | Categorías | Info/Legal | Newsletter
- Logo: Plus Jakarta Sans 800, igual que header
- Links: color text-muted, hover primary
- Newsletter: input pill + botón primary pill
- Copyright + disclaimer afiliación: text-light, font-size 0.75rem
- Mobile: 1 columna stacked

**Dark mode footer:** BG Muted oscuro (#292524), misma estructura.

---

## 7. Páginas secundarias

### 7.1 Categoría ([categoria].astro)

- Header de página: fondo muted con icono SVG grande (en vez de emoji)
- Breadcrumb: mantener, actualizar colores
- Grid de artículos: mismo diseño nuevo de cards

### 7.2 Animal (perros.astro, gatos.astro)

- Header: icono SVG perro/gato grande + color del animal
- Subcategory pills: con iconos SVG pequeños
- Secciones por categoría: heading con icono SVG

### 7.3 Búsqueda (buscar.astro)

- Input: pill shape grande, icono search SVG, fondo blanco con sombra
- Resultados: cards compactas con highlight de match
- Empty state: icono SVG paw-print (no emoji)
- No results: icono SVG search-x (no emoji)

### 7.4 About / Contacto

- Se mantienen como texto largo
- Headings: Plus Jakarta Sans
- Contacto cards: nuevo estilo con iconos SVG

### 7.5 Artículo (Article.astro layout)

- Breadcrumb con colores actualizados
- TOC: mantener estructura, actualizar tipografía
- Article body: Inter 1rem/1.7 (ya funciona bien)
- FAQs: accordion con icono chevron SVG
- Related articles: cards nuevas

---

## 8. Dark mode

Se mantiene la implementación actual (data-theme="dark" + transición suave de 300ms).

Cambios:
- Nuevos colores dark (stone-950 como base, no navy)
- Primary pasa a emerald-400 (#34d399) en dark (más brillante)
- Cards con fondo stone-900
- Botones de tienda: Amazon sólido, Zooplus/Tiendanimal translúcidos con borde
- Hero: gradiente oscuro con tints emerald sutil

---

## 9. Fuera de scope

No se incluye en este rediseño:
- Cambios en contenido de artículos (MDX)
- Cambios en lógica de afiliación
- Nuevas funcionalidades (search overlay, filtros avanzados)
- Cambios en sitemap, RSS, SEO schema
- Cambios en scripts de build/CSP (se regeneran automáticamente)
- Descarga real de logos de tiendas (requiere acceso a programas de afiliados — se usan SVGs placeholder hasta tener los reales)

---

## 10. Archivos afectados

**CSS:**
- `src/styles/global.css` — paleta, tipografía, radios, sombras, hero, footer, trust, cards, badges, nav, quiz, search, dark mode

**Componentes:**
- `src/components/Header.astro` — logo SVG, nav icons
- `src/components/Footer.astro` — rediseño completo a light
- `src/components/ArticleCard.astro` — badges con SVG, placeholder SVG
- `src/components/ComparisonTable.astro` — precios por tienda, badges
- `src/components/TopPick.astro` — nuevo layout con logos tienda
- `src/components/AffiliateButton.astro` — logos tienda
- `src/components/StoreIcon.astro` — logos reales (o placeholder SVG)
- `src/components/PetQuiz.astro` — iconos SVG, transiciones
- `src/components/AnimalFilter.astro` — iconos SVG
- `src/components/ScrollReveal.astro` — sin cambios (ya optimizado)
- NUEVO: `src/components/IconCategory.astro` — mapea categoría → SVG
- NUEVO: `src/components/TrustBar.astro` — barra de confianza compacta

**Páginas:**
- `src/pages/index.astro` — hero nuevo, trust bar, secciones separadas
- `src/pages/[categoria].astro` — iconos SVG
- `src/pages/perros.astro` — iconos SVG
- `src/pages/gatos.astro` — iconos SVG
- `src/pages/buscar.astro` — iconos SVG, empty states
- `src/pages/sobre-mi.astro` — tipografía
- `src/pages/contacto.astro` — iconos SVG

**Layouts:**
- `src/layouts/Base.astro` — font preload (Jakarta en vez de Outfit)
- `src/layouts/Article.astro` — tipografía headings

**Assets:**
- NUEVO: `public/fonts/plus-jakarta-sans-latin.woff2`
- NUEVO: `public/fonts/plus-jakarta-sans-latin-ext.woff2`
- NUEVO: `public/images/stores/amazon.svg` (placeholder hasta tener oficial)
- NUEVO: `public/images/stores/zooplus.svg` (placeholder hasta tener oficial)
- NUEVO: `public/images/stores/tiendanimal.svg` (placeholder hasta tener oficial)
- ELIMINAR: `public/fonts/outfit-latin.woff2`
- ELIMINAR: `public/fonts/outfit-latin-ext.woff2`
