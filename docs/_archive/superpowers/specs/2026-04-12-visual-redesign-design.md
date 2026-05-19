# Visual Redesign — patasyhogar.com

**Fecha:** 2026-04-12
**Estado:** Aprobado
**Alcance:** Full reset visual — nuevo sistema de diseno, nueva estructura de homepage, reskin de todas las paginas

## Resumen

Rediseno visual completo de patasyhogar.com. Direccion "Warm Modern + Bold": fondo claro, tonos verde bosque + lavanda, tipografia contundente (Inter 900, letter-spacing negativo), mucho espacio en blanco. Transmite confianza y eficiencia. Sin cambios en logica de contenido, SEO ni afiliacion.

## Principios de diseno

1. **Confianza y autoridad** — Editorial serio, limpio, sin adornos innecesarios
2. **Eficiencia** — El usuario encuentra lo que busca rapido, sin friccion
3. **Animal first** — Perro/gato como eje principal de navegacion (respaldado por UX research de Baymard, MeasuringU)
4. **Minimalismo funcional** — Cada elemento tiene un proposito. Si no aporta, se elimina

---

## 1. Sistema de diseno

### Paleta de colores (light mode)

```
--green-900: #1a2e1f     (texto sobre verde)
--green-800: #2d4a35     (primario oscuro, CTAs, header nav active)
--green-700: #3d6b4a     (primario, links, accents)
--green-600: #4a8c5c     (labels, badges)
--green-500: #5baa6e
--green-400: #7cc48d     (hover borders, focus rings)
--green-300: #a8d8b4
--green-100: #edf5ef     (fondos sutiles verdes)
--green-50:  #f5faf6     (hover cards categorias)

--lavender-600: #6b4d8a  (gato primario)
--lavender-500: #8b6aaf
--lavender-400: #a88bc7  (hover borders informativos)
--lavender-300: #c9b5dd
--lavender-100: #f3eef8  (fondos sutiles lavanda)
--lavender-50:  #f9f6fc  (hover cards informativos)

--dog-color: #c2662d     (terracota — perro)
--dog-bg:    #fdf0e6     (fondo badge perro)
--cat-color: #6b4d8a     (lavanda — gato, alias de lavender-600)
--cat-bg:    #f3eef8     (fondo badge gato, alias de lavender-100)

--neutral-950: #0f0f0f
--neutral-900: #1a1a1a   (texto principal)
--neutral-800: #2a2a2a
--neutral-700: #444       (texto nav, secundario fuerte)
--neutral-500: #777       (texto secundario)
--neutral-400: #999       (texto terciario, placeholders)
--neutral-300: #bbb
--neutral-200: #e2e2e2   (bordes)
--neutral-100: #f0f0f0   (separadores sutiles)
--neutral-50:  #f8f8f8   (fondos de seccion)
--white:       #fff      (fondo base, tarjetas)
```

### Paleta de colores (dark mode)

```
--green-800: #7cc48d     (invertido — primario claro)
--green-700: #5baa6e
--green-600: #4a8c5c
--green-400: #3d6b4a
--green-100: #1a2e1f
--green-50:  #152318

--lavender-600: #a88bc7  (invertido)
--lavender-400: #6b4d8a
--lavender-100: #2a1f35
--lavender-50:  #1f1828

--dog-color: #e8955e     (mas claro en dark)
--dog-bg:    #2e1f14
--cat-color: #a88bc7
--cat-bg:    #2a1f35

--neutral-950: #f0f0f0   (texto principal — invertido)
--neutral-900: #f0f0f0
--neutral-800: #ccc
--neutral-700: #aaa
--neutral-500: #999
--neutral-400: #666
--neutral-300: #444
--neutral-200: #2a2a2a   (bordes)
--neutral-100: #1f1f1f
--neutral-50:  #1a1a1a   (fondos seccion)
--white:       #0f0f0f   (fondo base)

Header glass: rgba(15,15,15,0.85)
```

### Tipografia

- **Unica familia:** Inter (eliminar Plus Jakarta Sans)
- **Preload:** Inter variable (woff2, latin-ext) — ya se precarga. Verificar que el archivo variable incluye weight 900. Si no, anadir el rango 100-900.
- **Eliminar:** Plus Jakarta Sans — quitar @font-face, preload, y archivos woff2 de Plus Jakarta Sans

| Uso | Weight | Size | Letter-spacing |
|-----|--------|------|----------------|
| Hero h1 | 900 | clamp(2rem, 5vw, 3rem) | -0.04em |
| Article h1 | 900 | clamp(1.75rem, 4vw, 2.5rem) | -0.03em |
| Section h2 | 800 | 1.25rem | -0.02em |
| Article h2 | 800 | 1.4rem | -0.02em |
| Article h3 | 700 | 1.15rem | -0.01em |
| Card title | 800 | 0.95rem | -0.01em |
| Body | 400 | 1rem (16px) | normal |
| Prose body | 400 | 1.05rem | normal |
| Small text | 500 | 0.85rem | normal |
| Label/badge | 700 | 0.65-0.7rem | 0.06-0.1em, uppercase |
| Meta | 400 | 0.7rem | normal |

### Border radius

```
--radius-sm:   8px   (botones pequenos, badges, inputs)
--radius-md:  12px   (tarjetas, componentes medianos)
--radius-lg:  16px   (tarjeta featured, newsletter box, secciones)
--radius-pill: 99px  (pills de animal, CTAs hero, inputs newsletter)
```

### Sombras

```
--shadow-sm:  0 1px 3px rgba(0,0,0,0.04)
--shadow-md:  0 4px 16px rgba(0,0,0,0.06)
--shadow-lg:  0 8px 32px rgba(0,0,0,0.08)
```

### Transiciones

Mantener el sistema actual:
```
--ease-out: cubic-bezier(0.23, 1, 0.32, 1)
--duration-fast: 160ms
--duration-normal: 200ms
--transition: 200ms var(--ease-out)
```

### Contenedor y espaciado

- Max width: 1100px
- Container padding: 1.5rem
- Section gap: 4rem vertical
- Hover cards: translateY(-2px) + shadow-lg

---

## 2. Header

### Desktop (>768px)
- Altura: 56px
- Fondo: frosted glass (rgba white 0.85, blur 16px)
- Sticky top, z-index 100
- Borde inferior: 1px solid neutral-200

**Layout (flex, space-between):**
- Izquierda: Logo "patas&hogar" — texto bold 1rem, 800 weight, letter-spacing -0.03em. El "&" en neutral-400
- Derecha: nav links + iconos
  - Link "Perros" — color terracota, hover: fondo dog-bg, pill shape
  - Link "Gatos" — color lavanda, hover: fondo cat-bg, pill shape
  - Link "Cuidados" — color neutral-700, hover: fondo neutral-100
  - Separador vertical (1px, 20px alto, neutral-200)
  - Icono buscar (lupa SVG, 18px)
  - Icono tema (sol/luna SVG, 18px)
  - Iconos: 36px touch target, hover neutral-100 fondo

### Movil (<=768px)
- Logo izquierda + hamburguesa derecha
- Menu desplegable: Perros, Gatos, Cuidados, separador, 5 categorias, separador, buscar
- Bottom nav se mantiene: Home, Perros, Gatos, Guias, Buscar (5 iconos)

### Eliminar
- Dropdown "Secciones" (desktop)
- Icono SVG animado del logo
- Flecha dropdown y todo su CSS/JS

---

## 3. Homepage

### Estructura (orden vertical)

1. **Hero** (centrado)
   - Label: "+140 guias comparativas verificadas" — 0.7rem, uppercase, green-600
   - H1: "Lo mejor para tu mascota." — 900 weight, clamp(2rem, 5vw, 3rem), -0.04em
   - Subtexto: "Comparativas honestas, sin relleno..." — 1.05rem, neutral-500, max-width 500px
   - 2 CTAs: "Busco para perro" (dog-bg/dog-color) y "Busco para gato" (cat-bg/cat-color) — pill shape, 0.85rem bold
   - Padding: 3.5rem top, 2rem bottom

2. **Articulo destacado** (1 tarjeta grande)
   - Grid 2 columnas: imagen (1.2fr) + cuerpo (1fr)
   - Imagen: aspect-ratio 16/10
   - Cuerpo: badge categoria + h2 1.5rem 800 + descripcion + link "Leer guia →"
   - Se alimenta de `destacado: true` en frontmatter
   - Movil: 1 columna, imagen arriba

3. **Categorias** (grid 5 columnas)
   - Header: "Categorias" h2 + "Ver todas →"
   - 5 tarjetas: emoji Unicode (no SVG) + nombre + conteo dinamico de guias por categoria
   - Hover: borde green-400, fondo green-50, lift -2px
   - Movil: 3 columnas

4. **Ultimas comparativas** (grid 3 columnas)
   - Header: "Ultimas comparativas" h2 + "Ver todas →"
   - Articulos `tipo: comparativa` mas recientes
   - Tarjeta: imagen 16/9, badge animal (pill esquina superior), categoria label, titulo 0.95rem 800, extracto 2 lineas, meta (fecha + tiempo lectura pill verde)
   - Hover: lift -2px, shadow-lg, borde neutral-300
   - Movil: 1 columna

5. **Guias de cuidados** (grid 2 columnas)
   - Header: "Guias de cuidados" h2 + "Ver todas →"
   - Articulos `tipo: informativo`
   - Tarjeta horizontal: icono/emoji (48px box, lavender-100 bg) + titulo + meta
   - Hover: borde lavender-400, fondo lavender-50
   - Movil: 1 columna

6. **Newsletter** (1 instancia, centrada)
   - Caja con fondo neutral-50, borde neutral-200, radius-lg, 2.5rem padding
   - H2: "Nuevas guias en tu email"
   - Subtexto: "Sin spam. Solo cuando publicamos algo que merece la pena."
   - Form: input (pill) + boton (green-800, pill)
   - Max-width form: 420px

### Eliminar de la homepage
- Quiz "Para quien buscas?" — componente, JS, CSS
- Trust bar — seccion completa (funcion absorbida por hero label)
- Seasonal banner — componente, CSS
- Newsletter del footer — duplicado

---

## 4. Paginas de articulo

### Cambios visuales (sin cambio de estructura)

- **H1:** Inter 900, clamp(1.75rem, 4vw, 2.5rem), -0.03em (antes Plus Jakarta Sans)
- **H2:** Inter 800, 1.4rem, -0.02em. Eliminar borde inferior decorativo — sustituir por margen superior mayor (2.5rem)
- **H3:** Inter 700, 1.15rem, -0.01em
- **Prose body:** Inter 400, 1.05rem, line-height 1.75 (se mantiene)
- **Links en prose:** green-700 (verde bosque) en vez de esmeralda
- **Badges categoria:** nueva paleta (green-600 texto, green-100 fondo)
- **Related articles:** mismo estilo ArticleCard que homepage
- **Botones afiliado:** mantener colores por tienda, mantener radius pill (99px). Solo cambiar el color generico de esmeralda a green-800.

### ComparisonTable
- Reskin: bordes neutral-200, sombra shadow-sm, radius-md
- Texto y layout interno se mantiene
- Imagenes de producto se mantienen igual

### TopPick
- Reskin: mismos cambios que ComparisonTable
- Borde de acento: green-700 en vez de esmeralda

### AffiliateButton
- Amazon: mantener #ff9900
- Zooplus: mantener #00473e
- Tiendanimal: mantener #00632E
- Generico: green-800 en vez de esmeralda
- Radius: mantener pill (99px)
- Hover: mantener shadow con color-specific rgba

### Sin cambios
- Breadcrumb (solo recolor a nueva paleta)
- TOC
- FAQs
- Schema markup
- Meta tags

---

## 5. Paginas de categoria (`/alimentacion/`, `/higiene/`, etc.)

- Header: h1 bold + descripcion + conteo articulos
- Filtro animal: 3 pills ("Todos" / "Perros" / "Gatos") — pill activa con fondo del color del animal
- Grid articulos: 3 columnas (1 movil), mismo ArticleCard que homepage
- Sin hero grande ni banners decorativos

---

## 6. Landing de animal (`/perros/`, `/gatos/`)

- H1: "Todo para tu perro" / "Todo para tu gato" — bold, centrado
- Subtexto: "87 guias y comparativas"
- Categorias filtradas: grid 5 tarjetas con conteo por animal
- Articulos destacados del animal
- Guias de cuidados del animal
- Estructura identica a homepage pero filtrada por animal

---

## 7. Pagina /cuidados/

- Mismo patron que categorias
- Tarjetas horizontales (estilo guias de homepage)
- Filtro por animal (pills)
- Orden por fecha

---

## 8. Pagina /articulos/

- Grid completo
- Filtros: animal (pills) + categoria (pills)
- Orden por fecha
- ArticleCard standard

---

## 9. Dark mode

- Mecanismo: sin cambios (toggle header, localStorage, data-theme="dark", prefers-color-scheme)
- Solo cambio de valores de custom properties (ver seccion 1)
- Header glass: rgba(15,15,15,0.85) + blur 16px

---

## 10. Elementos eliminados

| Elemento | Tipo | Archivos afectados |
|----------|------|--------------------|
| Quiz "Para quien buscas?" | Componente + JS + CSS | Homepage, global.css |
| Trust bar | Componente + CSS | Homepage, global.css |
| Seasonal banner | Componente + CSS | Homepage, global.css |
| Newsletter footer | HTML + CSS | Footer, global.css |
| Dropdown "Secciones" | HTML + CSS + JS | Header, global.css |
| Icono SVG logo | Asset + CSS | Header |
| Plus Jakarta Sans | Font files + preload | Base layout, global.css |
| Pagina /actualizaciones | Pagina Astro | src/pages/actualizaciones.astro |
| Borde inferior H2 prose | CSS | global.css |
| Gradientes hero articulos | CSS | global.css |

---

## 11. Lo que NO se toca

- Logica de contenido (MDX, frontmatter, content collections, config.ts)
- Schema.org markup
- Sitemap, robots.txt, RSS
- CSP headers y script de hashes
- Scripts de build y deploy
- Estructura de URLs y redirects
- Componentes de afiliacion (logica interna — solo reskin visual)
- Scripts de Pexels
- PRODUCTOS.md
- .seo-engine/
