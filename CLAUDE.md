# Patas y Hogar - patasyhogar.com

Web de guias y comparativas de productos para perros y gatos con monetizacion por afiliados (Amazon, Zooplus, Tiendanimal) y publicidad (AdSense futuro).

## Stack tecnico

- **Framework:** Astro 5 (static output)
- **Deploy:** Cloudflare Pages
- **Dominio:** patasyhogar.com (registrado en Cloudflare)
- **Contenido:** MDX en `src/content/articulos/`
- **CSS:** Plain CSS con custom properties (`src/styles/global.css`). No Tailwind.

## Tipos de contenido

- `tipo: comparativa | informativo` — campo en frontmatter (default: `comparativa`)
- **Comparativas** (`comparativa`): analisis de productos con ComparisonTable, TopPick, AffiliateButton. URL: `/[categoria]/[slug]`
- **Informativos** (`informativo`): guias de cuidados, salud, comportamiento. URL: `/cuidados/[slug]`. Sin disclaimer de afiliados.

## Estructura de categorias (comparativas)

- `alimentacion` - pienso, humeda, snacks, fuentes, comederos
- `higiene` - arena, areneros, cepillos, champus, antiparasitarios
- `paseo` - arneses, correas, transportines, collares, GPS, ropa, accesorios coche
- `juguetes` - juguetes, rascadores, mordedores, alfombras olfato, tuneles, feromonas
- `hogar` - camas, mantas, hamacas, protector sofa, gateras, puertas seguridad

## Clasificacion por animal

- `animal: perro | gato | ambos` — campo obligatorio en frontmatter
- Landing pages: `/perros`, `/gatos`
- Filtros por animal en homepage, categorias, y `/articulos`

## URLs

- Homepage: `/`
- Categoria: `/[categoria]`
- Comparativa: `/[categoria]/[slug]`
- Cuidados (listado): `/cuidados`
- Cuidados (articulo): `/cuidados/[slug]`
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
categoria: alimentacion | higiene | paseo | juguetes | hogar
animal: perro | gato | ambos
tipo?: comparativa | informativo (default: comparativa)
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

## Workflow de revision de articulos (multi-tienda)

Proceso completo para revisar cada articulo comparativo:

### Paso 1: Verificar ASINs en Amazon
- Pedir al usuario precio, disponibilidad e imagen de cada ASIN
- Pasar siempre el enlace completo (https://www.amazon.es/dp/ASIN) para que el usuario pueda clicar
- Si "precio no disponible": buscar ASIN alternativo o eliminar producto
- Si "ASIN no existe": buscar reemplazo

### Paso 2: Verificar nombres de productos
- Verificar con WebFetch que el nombre del producto en el articulo coincide con el nombre real del ASIN
- Los articulos a menudo tienen nombres incorrectos

### Paso 3: Verificar imagenes
- Pedir al usuario la imagen de Amazon de cada producto
- Comprobar que coincide con la del articulo
- Si cambia un producto, SIEMPRE actualizar imagen, precio, nombre, descripcion, enlace

### Paso 4: Buscar en Zooplus y Tiendanimal
- Buscar CADA producto individualmente por nombre especifico (nunca busquedas genericas de categoria)
- Usar WebSearch con `site:zooplus.es nombre-producto` y `site:tiendanimal.es nombre-producto`
- Verificar URL directa con WebFetch (confirmar nombre y precio)
- Solo añadir enlaces verificados que lleven al producto correcto
- NUNCA inventar URLs de tiendas

### Paso 5: Actualizar TopPick
- El TopPick DEBE incluir los mismos enlaces de tienda que su producto en el ComparisonTable
- Si el producto tiene Zooplus/Tiendanimal en el ComparisonTable, el TopPick tambien

### Paso 6: Limpiar articulo
- Eliminar import de AffiliateButton si existe
- Eliminar todos los bloques `<div class="affiliate-button-group">...</div>`
- Actualizar precios en todo el articulo (ComparisonTable, TopPick, texto, tablas markdown)
- Los precios deben ser consistentes en todo el articulo

### Paso 7: Build y push
- `npm run build` (actualiza CSP hashes)
- Commit con resumen de cambios
- Push

### Reglas importantes
- NUNCA adivinar precios — siempre verificar
- NUNCA inventar URLs de Zooplus o Tiendanimal
- Si un producto cambia, actualizar TODO: nombre, ASIN, imagen, precio, descripcion, texto del analisis
- No poner `actualizadoEn` en bulk (senial de freshness spam para Google)
- Imagenes de Amazon (m.media-amazon.com) son OK para hotlinking
- Imagenes de Zooplus/Tiendanimal NO funcionan (hotlinking bloqueado) — descargar a public/images/productos/

### Tiendas soportadas
- **Amazon**: tag `patasyhogar-21` (auto-appended por componentes)
- **Zooplus**: sin codigo de afiliado aun (futuro)
- **Tiendanimal**: sin codigo de afiliado aun (futuro)

### Progreso de revision
- 109 articulos totales
- ~80 revisados, ~29 pendientes (marzo 2026)
- Los articulos de pienso (13) tienen URLs de busqueda de Zooplus que hay que reemplazar por URLs directas

## Workflow de productos

1. Anadir entradas a `PRODUCTOS.md` con nombre, URL Amazon e imagen (vacios si no se tienen aun)
2. Incluir siempre campo `animal` en frontmatter
3. Incluir FAQs con schema en cada articulo
4. El search index en `buscar.json.ts` incluye campos `animal` y `tipo` — mantener en sync
5. Articulos informativos usan `tipo: informativo` y se sirven en `/cuidados/[slug]`
6. Articulos informativos NO llevan ComparisonTable, TopPick ni AffiliateButton
