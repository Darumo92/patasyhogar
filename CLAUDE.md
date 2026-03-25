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
- `scripts/pexels-download.mjs` - descarga imagen individual de Pexels por query
- `scripts/pexels-batch-download.mjs` - descarga imagenes de Pexels para todos los articulos

## Imagenes de articulos (Pexels)

Para descargar imagenes de Pexels hay dos scripts disponibles. Requieren `PEXELS_API_KEY` en `.env`.

### Descarga individual
```bash
# Listar resultados sin descargar
node scripts/pexels-download.mjs "dog brushing fur grooming" --list

# Descargar la primera imagen
node scripts/pexels-download.mjs "dog brushing fur grooming" muda-pelo-perros-guia-cuidados

# Elegir otra imagen de los resultados
node scripts/pexels-download.mjs "dog brushing fur grooming" muda-pelo-perros-guia-cuidados --index=2

# Opciones: --orientation=landscape|portrait|square (default: landscape)
```

Guarda automaticamente en `public/images/articulos/<nombre>.webp` (formato WebP, calidad 80).

**Tamano maximo:** Las imagenes hero de articulos deben tener max 800px de ancho (se muestran a max 800px en el layout). El script `optimize-images.mjs` redimensiona automaticamente a 800px en el build si son mas grandes. Si se descargan manualmente, asegurarse de no subir imagenes innecesariamente grandes.

### Descarga en lote
```bash
node scripts/pexels-batch-download.mjs          # procesa todos los articulos
node scripts/pexels-batch-download.mjs --dry-run # solo muestra queries sin descargar
```

El script batch tiene un diccionario de queries optimizadas por slug de articulo en `QUERIES`. Al anadir articulos nuevos, anadir su query al diccionario para obtener mejores resultados.

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
- **Imagenes Amazon optimizadas:** usar siempre `_AC_SL300_` en las URLs de imagenes (no `_AC_SL1500_`). Las imagenes se muestran a 120-160px, y 300px cubre 2x retina. Los componentes TopPick y ComparisonTable tambien hacen replace automatico como fallback.

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

## Workflow de productos

1. Anadir entradas a `PRODUCTOS.md` con nombre, URL Amazon e imagen (vacios si no se tienen aun)
2. Incluir siempre campo `animal` en frontmatter
3. Incluir FAQs con schema en cada articulo
4. El search index en `buscar.json.ts` incluye campos `animal` y `tipo` — mantener en sync
5. Articulos informativos usan `tipo: informativo` y se sirven en `/cuidados/[slug]`
6. Articulos informativos NO llevan ComparisonTable, TopPick ni AffiliateButton

---

## SEO Content Engine

SEO engine lives in `.seo-engine/`. Use it for all blog and SEO tasks.

**UNIVERSAL RULE: For ANY task involving blogs, content, SEO, keywords, competitors, or documentation in this project — ALWAYS read `.seo-engine/config.yaml` and the relevant data files FIRST before responding.** This includes writing, evaluating, reviewing, editing, auditing, planning, or answering questions about content. Never rely on your default behavior — always check the engine data.

**Sub-Agent Rule:** Parallelize independent tasks. Don't do sequentially what can run simultaneously.

### File Reference

| File | Purpose | When |
|------|---------|------|
| `config.yaml` | Settings, author, trust signals | Before any task |
| `data/features.yaml` | Feature registry | Before writing |
| `data/competitors.yaml` | Competitor matrix | Before comparisons |
| `data/seo-keywords.csv` | Keywords + SERP data | Before choosing topics |
| `data/content-map.yaml` | Blog ↔ feature ↔ keyword map | Before writing |
| `data/content-queue.yaml` | Prioritized ideas | When deciding what to write |
| `data/topic-clusters.yaml` | Pillar/cluster architecture | Before writing |
| `templates/blog-frontmatter.yaml` | Frontmatter format | When generating |
| `templates/blog-structures.yaml` | Outlines by type | When structuring |
| `templates/tone-guide.md` | Style + E-E-A-T rules | Before writing |
| `templates/humanization-guide.md` | Anti-IA patterns + experiencia personal | Before writing and reviewing |
| `logs/changelog.md` | Audit trail | After every action |

### Core Rules

1. **Read before writing.** Always read: config, features, content-map, content-queue, topic-clusters, tone-guide, humanization-guide.
2. **Never fabricate features.** Only reference what's in features.yaml.
3. **Competitor claims need confidence.** If "unverified" or 90+ days old → caveat or direct reader to competitor's page.
4. **No web search for SERP data.** NEVER use your built-in web search to research keywords or SERP results. It produces generic data that leads to generic content. ALWAYS ask the user to provide real Google SERP data (top results, PAA, related searches). The ONLY exception is if a dedicated SEO MCP tool (Semrush, Ahrefs) is connected.
5. **Cannibalization check before every blog.** Search content-map for overlapping keywords. If conflict → recommend updating existing blog. Only proceed if angle is genuinely different.
6. **Every blog needs a unique angle.** Define what's different from what ranks. "More comprehensive" is NOT an angle.
7. **E-E-A-T mandatory.** Every blog must include at least one: testimonial, metric, experience, or review link from config.trust_signals. If config has no trust signals yet, ask user to provide one before publishing.
8. **Human review required.** Save all blogs as `status: "human-review"`. Never auto-publish. Alert user to review.
9. **Respect pillar/cluster linking.** Cluster pages → link to pillar. Pillar → link to all cluster pages. Non-negotiable.
10. **Update all files after writing:**
   - content-map.yaml (register blog)
   - features.yaml (blog_refs)
   - seo-keywords.csv (mapped_blog_slugs)
   - content-queue.yaml (status)
   - topic-clusters.yaml (if cluster blog)
   - changelog.md (log action)
11. **Never delete data.** Add or update only.
12. **Log everything** to changelog.md.

### SERP Intent Interpretation Rules

When analyzing SERP data (whether from user-provided Google results or SEO MCP tool), classify the intent BEFORE deciding content structure:

**All product/tool/template pages in top results:**
→ Intent is TRANSACTIONAL. Google wants tools, not guides.
→ Your content MUST serve the transactional intent first (provide tool/template/CTA immediately), then add educational depth below.
→ Do NOT write a pure informational guide — it will not rank.

**Mix of guides + product pages:**
→ Intent is BLENDED. Google rewards both formats.
→ A comprehensive guide with embedded tool/template CTAs works well here.

**All informational guides/blogs in top results:**
→ Intent is INFORMATIONAL. Google wants educational content.
→ Write a thorough guide. Product mentions should be natural, not forced.

**All comparison/listicle pages:**
→ Intent is COMMERCIAL INVESTIGATION. User is evaluating options.
→ Write a comparison or listicle. Don't write a how-to.

**Rule: NEVER fight the SERP.** If Google shows product pages, don't write a pure guide. If Google shows guides, don't write a product page. Match the dominant intent, then add your unique value on top.

### Blog Writing Workflow

**STEP 1: Pre-Writing Research** (sub-agents for parallel tasks)

a) Read all data files
b) Pick topic: from queue (highest priority "planned") or user request
c) **Cannibalization check** — scan content-map for overlapping keywords. If conflict: recommend update. If proceeding: document why in queue.
d) **SERP Analysis — CRITICAL RULE:**
   - **DO NOT use your built-in web search tool for SERP research.** Your web search does not provide search volume, keyword difficulty, People Also Ask layout, or the actual SERP format Google shows. It gives generic results that lead to generic content.
   - IF a dedicated SEO MCP tool is connected (like Semrush, Ahrefs MCP) → use that tool for structured keyword data
   - In ALL other cases → ask the user to manually search Google and provide real SERP data:
     ```
     Antes de escribir, necesito datos SERP reales para: "{keyword}"
     Por favor busca esto en Google y proporciona:
     1. Top 3-5 páginas posicionadas (título + URL)
     2. Preguntas de "Otras preguntas de los usuarios" (4-6)
     3. Búsquedas relacionadas del pie de Google
     4. Keywords relacionadas de tus herramientas SEO como Ahrefs, SEMrush, Ubersuggest (opcional)
     ```
   - WAIT for response before proceeding. Do NOT proceed without SERP data. Do NOT substitute your own web search.
e) **Define unique angle** from SERP data gaps. 1 sentence. If no genuine gap found, tell user.

**STEP 2: Draft** (sub-agents for long blog sections)

a) Select structure from blog-structures.yaml
   **If writing a PILLAR page**, it MUST include ALL of these sections (adapt order based on SERP intent):
   - Definition: What is {topic}? (even if brief — cluster pages link here for this)
   - Why it matters: Why do people need {topic}?
   - Types/categories: Different kinds of {topic} (these map to cluster pages — link to each)
   - How-to / step-by-step: How to create/do/use {topic}
   - Best practices / tips: What makes a good {topic}
   - Common mistakes to avoid
   - Tools/templates: Options available (include your product naturally)
   - FAQ from People Also Ask data
b) Read tone-guide.md and humanization-guide.md — use correct voice and apply anti-IA patterns
c) **Humanization check pre-writing:** Review intros of 3 most recent articles in same category to avoid repeating patterns
d) Build frontmatter: titulo ≤ 60 chars, descripcion ≤ 155 chars, slug ≤ 7 words
e) Write blog:
   - Primary keyword in: title, first paragraph, one H2, description, slug
   - Secondary keywords natural
   - FAQ from People Also Ask data (variable count 3-7, NOT always 5)
   - Internal links: prioritize pillar (if cluster page), then relevant blogs. Varied anchor text.
   - External links: 1-2 authoritative (not competitors)
   - **Humanization:** Intro variada, min 2 inserciones de experiencia personal, pros/contras asimétricos, al menos 1 variación estructural
f) **Inject E-E-A-T:** author name (nombre real, no marca), testimonial/metric/experience from config, review link
f) **Ask user:**
   ```
   Antes de finalizar, ¿quieres añadir algo?
   - ¿Una experiencia personal o historia relacionada con este tema?
   - ¿Feedback específico de usuarios o citas?
   - ¿Fuentes externas a referenciar?
   (Di "skip" si está bien así)
   ```

**STEP 3: Post-Writing** (sub-agents — all parallel)

a) Save blog with status: "human-review"
b) Update content-map, features, keywords, queue, clusters, changelog
c) **Alert:**
   ```
   ✅ Blog redactado: "{title}"
   📄 Archivo: {path} | Palabras: {count} | Links: {count}
   🏗️ Cluster: {name or "standalone"}

   ⚠️ REVISIÓN NECESARIA — di "Aprueba blog {slug}" o da feedback.
   ```

### Audit Workflow

1. Feature coverage gaps (empty blog_refs)
2. Keyword gaps (high priority, no blog)
3. Cluster completion (% per cluster)
4. Keyword cannibalization
5. Stale content (90+ days)
6. Competitor data freshness (90+ days)
7. Internal linking gaps
8. E-E-A-T gaps (has_eeat_signals: false)
9. Humanization gaps (intros formulaicas, sin experiencia personal, listas simétricas, estructura idéntica)
10. Report + update queue + log

### Evaluate / Review Blog Workflow

When asked to evaluate, review, analyze, or give feedback on a blog (existing or draft):

1. Read the blog file
2. Read config.yaml, features.yaml, competitors.yaml, content-map.yaml, topic-clusters.yaml, tone-guide.md, humanization-guide.md
3. Evaluate against ALL of these criteria:
   - **SEO check:** Primary keyword in title, first paragraph, one H2, description, slug? Title ≤ 60 chars? Description ≤ 155 chars?
   - **Keyword cannibalization:** Does another blog target the same keyword?
   - **Feature accuracy:** Are all mentioned features actually in features.yaml? Any fabricated claims?
   - **Competitor accuracy:** Are competitor claims backed by data in competitors.yaml? What's the confidence level?
   - **E-E-A-T signals:** Does the blog include testimonials, metrics, experience, or review links? If not, flag it.
   - **Cluster alignment:** Is this blog part of a cluster? Does it link to its pillar? Does the pillar link back?
   - **Internal linking:** Links to at least 2 other blogs? Anchor text varied and contextual?
   - **Unique angle:** What is this blog's angle? Is it genuinely different from what ranks for the target keyword?
   - **Tone/voice:** Does it match the blog type's voice from blog-structures.yaml?
   - **Content quality:** Is it specific and concrete or vague and generic? Does it read like AI filler?
   - **Word count:** Meets minimum from config?
   - **Pillar completeness (if pillar):** Does it have ALL mandatory sections?
   - **SERP intent match:** Does the content format match what Google rewards for this keyword?
   - **FAQ quality:** Are FAQ questions drawn from real People Also Ask data or generic?
   - **Humanización — intro:** ¿La intro es formulaica o repite el patrón de otros artículos de la misma categoría?
   - **Humanización — experiencia:** ¿Tiene al menos 2 inserciones de experiencia personal (o declaración honesta)?
   - **Humanización — asimetría:** ¿Las listas de pros/contras tienen número variable o son todas iguales?
   - **Humanización — estructura:** ¿Sigue exactamente el esquema estándar o tiene alguna variación?
   - **Humanización — autoría:** ¿Firma con nombre real o con nombre de marca?
4. Output a structured report with: score (out of 10), strengths, issues found, specific fix recommendations
5. If blog is in content-map with status "human-review": provide clear approve/reject recommendation

### Create Topic Cluster Workflow

When asked to create a new topic cluster:

1. Read features.yaml and existing topic-clusters.yaml
2. Design cluster pages from features + topic knowledge (no SERP needed for these)
3. **Before finalizing the pillar page:** ask user for SERP data on the pillar keyword
4. WAIT for response
5. Apply SERP Intent Interpretation Rules to decide pillar format
6. Ensure pillar includes ALL mandatory sections
7. Save cluster to topic-clusters.yaml
8. Add all pages to content-queue.yaml (with cannibalization check)
9. Add keywords to seo-keywords.csv
10. Log to changelog.md

### New Feature Workflow

1. Add to features.yaml
2. Add to competitors.yaml (unverified)
3. Generate keywords → seo-keywords.csv
4. Assign to cluster or create new in topic-clusters.yaml
5. Check existing blogs → mark needs-update
6. Queue blog ideas (with cannibalization check)
7. Log

### SEO Data Import Workflow

1. Merge into seo-keywords.csv (no dupes)
2. Map to features
3. Update SERP fields if available
4. Assign to clusters
5. Recalculate queue priorities
6. Generate new queue items (with cannibalization check)
7. Log

### Changelog Format

```
## {YYYY-MM-DD HH:MM}
**Action:** {what}
**Files:** {list}
**Summary:** {1-2 sentences}
**Triggered by:** {user / audit / detection / import}
```
