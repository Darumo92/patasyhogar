# Patas y Hogar - patasyhogar.com

Web de guias y comparativas de productos para perros y gatos con monetizacion por afiliados (Amazon, Zooplus, Tiendanimal) y publicidad (AdSense futuro).

## Stack tecnico

- **Framework:** Astro 5 (static output)
- **Deploy:** Cloudflare Pages
- **Dominio:** patasyhogar.com (registrado en Cloudflare)
- **Contenido:** MDX en `src/content/articulos/`
- **CSS:** Plain CSS con custom properties (`src/styles/global.css`). No Tailwind.

## Estructura de categorias

- `alimentacion` - pienso, humeda, snacks, fuentes, comederos
- `higiene` - arena, areneros, cepillos, champus
- `descanso` - camas, transportines, mochilas, jaulas
- `comportamiento` - juguetes, rascadores, mordedores

## Clasificacion por animal

- `animal: perro | gato | ambos` — campo obligatorio en frontmatter
- Landing pages: `/perros`, `/gatos`
- Filtros por animal en homepage, categorias, y `/articulos`

## URLs

- Homepage: `/`
- Categoria: `/[categoria]`
- Articulo: `/[categoria]/[slug]`
- Por animal: `/perros`, `/gatos`
- Todos: `/articulos`
- Busqueda: `/buscar`
- RSS: `/rss.xml`

## Archivos clave

- `src/content/config.ts` - schema de content collections
- `src/layouts/Base.astro` - layout HTML base con SEO, OG, preconnect
- `src/layouts/Article.astro` - layout articulos con breadcrumb, TOC, related, FAQs
- `src/components/ComparisonTable.astro` - tabla comparativa con Product schema
- `src/components/AffiliateButton.astro` - boton afiliado (auto-appends tag)
- `src/components/TopPick.astro` - producto destacado (auto-appends tag)
- `src/components/ArticleCard.astro` - tarjeta con badge animal
- `src/components/AnimalFilter.astro` - tabs filtro perro/gato
- `src/styles/global.css` - todos los estilos
- `PRODUCTOS.md` - tracking de URLs Amazon e imagenes por articulo

## Frontmatter de articulos

```yaml
titulo: string
descripcion: string
categoria: alimentacion | higiene | descanso | comportamiento
animal: perro | gato | ambos
fecha: date
imagen?: string
imagenAlt?: string
destacado?: boolean (default false)
tags?: string[]
actualizadoEn?: date
faqs?: [{pregunta, respuesta}]
```

## SEO implementado

- Schema.org: Article, FAQPage, Product/ItemList, BreadcrumbList, WebSite
- Sitemap + robots.txt
- RSS feed
- OG/Twitter meta tags con imagen por articulo
- Preconnect hints para recursos externos

## Afiliacion

- Amazon Associates ID: `patasyhogar-21` — se anade automaticamente en `AffiliateButton.astro`, `ComparisonTable.astro` y `TopPick.astro`
- Nunca incluir `?tag=patasyhogar-21` en las URLs de los articulos MDX — los componentes lo anaden solos
- Usar URLs directas `/dp/ASIN` (no URLs de busqueda `/s?k=`)

## CSP y seguridad

- El `build` command ejecuta `astro build && node scripts/update-csp-hashes.mjs`
- El script post-build escanea `dist/` para inline scripts, calcula SHA-256 hashes, y actualiza `public/_headers` + `dist/_headers`
- Nunca editar los hashes CSP manualmente — se sobreescriben en cada build
- Nunca usar `'unsafe-inline'` para script-src

## Checklist obligatorio para articulos

### 1. Verificar que el tema no existe ya
- Buscar en `src/content/articulos/` si ya hay un articulo que cubra el mismo tema
- Si existe uno similar, proponer ampliar/mejorar el existente

### 2. URLs y productos Amazon reales
- Buscar en Amazon.es los productos reales
- Nunca inventar ASINs, URLs ni imagenes de productos
- Usar `fetch_amazon_images.py` como referencia para extraer imagenes reales del HTML de Amazon
- Si un producto no existe en Amazon.es, buscar un reemplazo equivalente

### 3. Contenido extenso y de calidad SEO
- Articulos largos, detallados y de calidad para indexacion y posicionamiento
- Incluir: introduccion, secciones H2/H3, comparativas, guia de compra, consejos, FAQs
- Cada producto con descripcion real, pros y contras reales
- Minimo ~2000-3000 palabras por articulo comparativo

### 4. Imagen del articulo unica y especifica
- La imagen principal NO puede estar ya usada en otro articulo
- Verificar duplicados por hash: `md5sum public/images/articulos/*.jpg | sort | awk '{print $1}' | uniq -d`
- La imagen debe ser especifica y representativa del tema concreto (no fotos genericas de mascotas)
- Fuente recomendada: Pexels.com

### 5. Campos correctos en ComparisonTable
Campos esperados por producto:
- `nombre: string` — nombre del producto
- `imagen: string` — URL de imagen Amazon
- `puntosFuertes: string` — texto descriptivo (NO array, NO `caracteristicas`, NO `descripcion`)
- `precio: string` — ej: "~15E"
- `enlaceAmazon: string` — URL `/dp/ASIN`
- `valoracion: number` — escala 1-5 (NO `puntuacion`, NO escala 1-10)

### 6. Optimizacion SEO
- Titulo: keyword principal, max ~60 caracteres
- Meta descripcion: keyword + CTA, max ~155 caracteres
- FAQs con schema en frontmatter (3-5 por articulo)
- Internal linking a articulos relacionados
- Tags relevantes (3-6 keywords long-tail)
- imagenAlt descriptivo con keywords

### 7. Rebuild tras cambios
- Ejecutar `npm run build` despues de anadir o modificar articulos

## Workflow de productos

1. Anadir entradas a `PRODUCTOS.md` con nombre, URL Amazon e imagen (vacios si no se tienen aun)
2. Incluir siempre campo `animal` en frontmatter
3. Incluir FAQs con schema en cada articulo
4. El search index en `buscar.json.ts` incluye campo `animal` — mantener en sync
