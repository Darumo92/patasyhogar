# Sincronizado desde CLAUDE.md — mantener ambos archivos alineados

> Este archivo es el equivalente de `CLAUDE.md` para **OpenAI Codex CLI** (y cualquier otro agente que lea `AGENTS.md`). Claude Code sigue usando `CLAUDE.md` como su entrada principal. Si modificas reglas de proyecto, actualiza **ambos** archivos.
>
> Fuente de verdad semántica: `CLAUDE.md` raíz + `docs/agent-context/` versionado. Cuando haya conflicto, gana lo más reciente en el repo.

---

# Patas y Hogar — patasyhogar.com

Web de guías y comparativas de productos para perros y gatos con monetización por afiliados (Amazon, Zooplus, Tiendanimal) y publicidad (AdSense futuro).

## Project Context

### Stack técnico

- **Framework:** Astro 5 (static output)
- **Deploy:** Cloudflare Pages
- **Dominio:** patasyhogar.com (registrado en Cloudflare)
- **Contenido:** MDX en `src/content/articulos/`
- **CSS:** Plain CSS con custom properties (`src/styles/global.css`). No Tailwind.

### Tipos de contenido

- `tipo: comparativa | informativo` — campo en frontmatter (default: `comparativa`)
- **Comparativas** (`comparativa`): análisis de productos con `ComparisonTable`, `TopPick`, `AffiliateButton`. URL: `/[categoria]/[slug]`
- **Informativos** (`informativo`): guías de cuidados, salud, comportamiento. URL: `/cuidados/[slug]`. Sin disclaimer de afiliados.

### Categorías (comparativas)

- `alimentacion` — pienso, húmeda, snacks, fuentes, comederos
- `higiene` — arena, areneros, cepillos, champús, antiparasitarios
- `paseo` — arneses, correas, transportines, collares, GPS, ropa, accesorios coche
- `juguetes` — juguetes, rascadores, mordedores, alfombras olfato, túneles, feromonas
- `hogar` — camas, mantas, hamacas, protector sofá, gateras, puertas seguridad

### Clasificación por animal

- `animal: perro | gato | ambos` — campo obligatorio en frontmatter
- Landing pages: `/perros`, `/gatos`
- Filtros por animal en homepage, categorías y `/articulos`

### URLs

- Homepage: `/`
- Categoría: `/[categoria]`
- Comparativa: `/[categoria]/[slug]`
- Cuidados (listado): `/cuidados`
- Cuidados (artículo): `/cuidados/[slug]`
- Por animal: `/perros`, `/gatos`
- Todos: `/articulos`
- Búsqueda: `/buscar`
- RSS: `/rss.xml`

### Archivos clave

- `src/content/config.ts` — schema de content collections
- `src/layouts/Base.astro` — layout HTML base con SEO, OG, preconnect
- `src/layouts/Article.astro` — layout artículos con breadcrumb, TOC, related, FAQs
- `src/components/ComparisonTable.astro` — tabla comparativa con Product schema
- `src/components/AffiliateButton.astro` — botón afiliado (auto-appends tag)
- `src/components/TopPick.astro` — producto destacado (auto-appends tag)
- `src/components/ArticleCard.astro` — tarjeta con badge animal
- `src/components/AnimalFilter.astro` — tabs filtro perro/gato
- `src/styles/global.css` — todos los estilos
- `PRODUCTOS.md` — tracking de URLs Amazon e imágenes por artículo
- `scripts/pexels-download.mjs` — descarga imagen individual Pexels por query
- `scripts/pexels-batch-download.mjs` — descarga imágenes Pexels en lote

### Frontmatter de artículos

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

### SEO implementado

- Schema.org: Article, FAQPage, Product/ItemList, BreadcrumbList, WebSite
- Sitemap + robots.txt
- RSS feed
- OG/Twitter meta tags con imagen por artículo
- Preconnect hints para recursos externos

### Afiliación

- Amazon Associates ID: `patasyhogar-21` — se añade automáticamente en `AffiliateButton.astro`, `ComparisonTable.astro` y `TopPick.astro`
- **Nunca** incluir `?tag=patasyhogar-21` en las URLs de los artículos MDX — los componentes lo añaden solos
- Usar URLs directas `/dp/ASIN` (no URLs de búsqueda `/s?k=`)
- **Tiendanimal:** Webgains (`wgcampaignid=1746742`, `wgprogramid=9507`) — auto-appended por componentes
- **Zooplus:** sin código de afiliado aún (futuro)

### CSP y seguridad

- El comando `build` ejecuta `astro build && node scripts/update-csp-hashes.mjs`
- El script post-build escanea `dist/` para inline scripts, calcula SHA-256 hashes y actualiza `public/_headers` + `dist/_headers`
- **Nunca** editar los hashes CSP manualmente — se sobreescriben en cada build
- **Nunca** usar `'unsafe-inline'` para `script-src`

---

## Agent Behavior — Reglas globales

### 0. Regla meta sobre instrucciones persistentes

Cualquier instrucción persistente que el usuario pida guardar (reglas de comportamiento, preferencias de redacción, workflows nuevos) **debe guardarse en el repo**, no en memoria local del agente. Razón: el repo se sincroniza entre ordenadores; la memoria local no.

**Dónde guardar cada cosa:**

- Reglas de comportamiento, correcciones de usuario, workflows nuevos → `docs/agent-context/feedback/<slug>.md`
- Estado del proyecto (planes, calendarios, tracking) → `docs/agent-context/project-state/<slug>.md`
- Métodos técnicos validados → `docs/agent-context/reference/<slug>.md`
- Reglas globales cortas que aplican siempre → este `AGENTS.md` y `CLAUDE.md` (mantener alineados)

**Al inicio de cada sesión o tarea relevante:** leer `docs/agent-context/README.md` y los archivos de `feedback/` que apliquen. Ver `docs/agent-context/AGENTS.md` para detalles.

### 1. Humanización obligatoria en todo texto publicable

Antes de presentar al usuario cualquier texto destinado a publicación, aplicar la guía de humanización y entregar la versión humanizada.

**Aplica a:**

- Artículos MDX nuevos (cuerpo, intros, FAQs, descripciones meta)
- Reescrituras o ediciones de artículos existentes
- Pillar pages
- Comentarios y posts en Reddit
- Captions Pinterest, social copy, email
- Meta titles y meta descriptions

**No aplica a:**

- Mensajes conversacionales en el chat
- Código, commits, PRs
- Frontmatter técnico (slugs, tags, categorías)

**Por qué:** Google rechaza contenido por calidad (Helpful Content + SpamBrain). Patrones AI son trigger directo. Reddit tampoco quiere texto que huela a IA.

**Cómo aplicar en Codex CLI:**

1. Redactar borrador.
2. Antes de presentarlo, leer:
   - `claude-environment/skills/humanizer/SKILL.md` (catálogo de 29 patrones AI a evitar)
   - `.seo-engine/templates/humanization-guide.md` (patrones específicos del proyecto: rule of three, em dashes, copula avoidance, vocabulario AI, asimetría de listas, variación de estructura, experiencia personal)
3. Reescribir aplicando la guía.
4. Pasada audit: "¿qué hace que esto suene AI?" y corregir tells residuales.
5. Presentar versión final humanizada.

> Equivalencia con Claude Code: donde `CLAUDE.md` dice "invocar `Skill humanizer`", aquí el agente debe leer los dos archivos anteriores y aplicar el checklist manualmente.

### 2. Verificación de productos — reglas críticas

**Nunca adivinar datos:**

- Nunca adivinar precios, URLs, imágenes, ASINs ni specs de productos.
- Si no se puede verificar un dato, preguntar al usuario inmediatamente.
- Amazon bloquea scraping con CAPTCHA — pedir al usuario precio E imagen juntos para cada producto.

**Al cambiar un producto/ASIN, actualizar TODO sin excepción:**

1. `nombre` — debe coincidir con el producto real en Amazon.
2. `imagen` — pedir al usuario la URL de Amazon (`m.media-amazon.com`).
3. `precio` — verificado por el usuario.
4. `puntosFuertes` — describir el producto real, no el anterior.
5. Texto del artículo — análisis, tablas comparativas, FAQs, resumen.
6. Verificar que el producto encaja en la temática del artículo.

**Imágenes de productos:**

- CSP solo permite imágenes de `'self'` y `m.media-amazon.com` — nunca usar URLs de otros dominios directamente.
- Imágenes de Zooplus/Tiendanimal no funcionan (hotlinking bloqueado) — descargar a `public/images/productos/`.
- Pedir al usuario precio E imagen en la misma petición.
- Antes de commit, verificar que **todos** los productos en `ComparisonTable` tienen campo `imagen`.
- Imágenes hero de Pexels: comprobar duplicados por hash con `md5 -r public/images/articulos/*.webp | sort | awk '{print $1}' | uniq -d`.
- **Imágenes Amazon optimizadas:** usar siempre `_AC_SL300_` en las URLs (no `_AC_SL1500_`). Las imágenes se muestran a 120-160px; 300px cubre 2x retina.

**Búsqueda en tiendas (obligatorio):**

- Buscar cada producto individualmente en Amazon, Zooplus y Tiendanimal antes de escribir.
- Buscar por nombre exacto: `site:zooplus.es "[nombre producto]"` y `site:tiendanimal.es "[nombre producto]"`.
- Si el nombre no funciona, buscar también por marca.
- Verificar cada URL — confirmar que es el producto correcto, no una página genérica.
- Nunca inventar URLs de Zooplus o Tiendanimal.
- Orden: primero verificar Amazon → luego buscar Zooplus/Tiendanimal para la lista final.

**Verificar nombres:**

- No confiar en los nombres del artículo — verificar que cada nombre coincide con su ASIN antes de buscar en otras tiendas.

**TopPick y ComparisonTable sincronizados:**

- Si un producto es `TopPick` Y está en `ComparisonTable`, ambos deben tener los mismos enlaces de tiendas.

### 3. Checklist obligatorio para artículos nuevos

1. **Verificar que el tema no existe ya** — buscar en `src/content/articulos/` y proponer ampliar el existente si lo hay.
2. **URLs y productos Amazon reales** — buscar en Amazon.es, nunca inventar ASINs/URLs/imágenes. Si un producto no existe, buscar reemplazo equivalente.
3. **Contenido extenso y de calidad SEO** — mínimo ~2000-3000 palabras por comparativa, introducción, H2/H3, comparativas, guía de compra, FAQs.
4. **Imagen única** — verificar duplicados con `md5sum public/images/articulos/*.jpg | sort | awk '{print $1}' | uniq -d`. Especifica y representativa, no genérica.
5. **Campos correctos en `ComparisonTable`:**
   - `nombre: string`
   - `imagen: string`
   - `puntosFuertes: string` (NO array, NO `caracteristicas`, NO `descripcion`)
   - `precio: string` (ej `"~15E"`)
   - `enlaceAmazon: string` (`/dp/ASIN`)
   - `valoracion: number` (escala 1-5, NO `puntuacion`, NO escala 1-10)
6. **Optimización SEO** — título ≤ 60 chars, meta descripción ≤ 155 chars, FAQs con schema (3-5), internal linking, tags relevantes (3-6), `imagenAlt` descriptivo.
7. **Coherencia de experiencias personales:**
   - Grep de nombres propios (`Mango`, `Kira`, `Laura`, `Nala`, `Thor`, `Ana`, `Carlos`) en `src/content/articulos/`.
   - No contradecir anécdotas existentes.
   - Coherencia temporal, ubicación, personalidad.
   - No repetir anécdotas — variar usando quirks del perfil en `.seo-engine/config.yaml`.
   - Mango = tranquilo y territorial; Kira = nerviosa y tragona. No invertir rasgos.
8. **Rebuild tras cambios** — `npm run build`.

### 4. Workflow de revisión de artículos

Cuando se revisa un artículo existente, aplicar checklist completo:

**Contenido y estructura:**

- Productos en la categoría correcta.
- Descripciones coinciden con el producto real.
- Sin duplicados entre secciones.
- Flujo lógico.

**Productos y datos:**

1. Verificar todos los ASINs — pasar enlaces al usuario para precio + imagen.
2. Si precio difiere: actualizar. Si no disponible: reemplazar o eliminar.
3. Buscar cada producto en Zooplus y Tiendanimal.
4. Añadir `precioAmazon`, `precioZooplus`, `precioTiendanimal`.
5. Precios consistentes en `ComparisonTable`, `TopPick`, texto y tablas markdown.

**SEO y calidad:** título ≤ 60, meta ≤ 155, H2/H3 lógica, internal links, FAQs, tags, `imagenAlt`, sin relleno.

**Limpieza:** eliminar imports no usados, grupos de botones redundantes, tablas duplicadas con precios.

**Reglas de revisión:**

- **No** añadir `actualizadoEn` en revisiones masivas — solo cuando hay cambios reales de contenido.
- Ejecutar `npm run build` después de cada artículo revisado.
- Antes de push, ejecutar siempre `npm run build` para actualizar CSP hashes.

### 5. Calidad sobre velocidad

En cambios masivos, procesar pocos artículos a la vez y verificar calidad. No aplicar texto cookie-cutter idéntico a muchos artículos.

### 6. Build antes de push

Siempre ejecutar `npm run build` antes de `git push`. El build actualiza CSP hashes en `public/_headers`; pushing sin buildear puede deployar headers rotos o ocultar errores de build. Si tras buildear `public/_headers` ha cambiado, hacer commit con los headers actualizados antes de pushear.

---

## Pillar pages y clusters

### Pillar pages existentes

| Cluster | Pillar slug | URL | Estado |
|---|---|---|---|
| Alimentación perros | `guia-alimentacion-perros` | `/cuidados/guia-alimentacion-perros/` | publicado |
| Alimentación gatos | `guia-completa-alimentacion-gatos` | `/cuidados/guia-completa-alimentacion-gatos/` | publicado |
| Higiene perros | `guia-completa-higiene-grooming-perros` | `/cuidados/guia-completa-higiene-grooming-perros/` | human-review |
| Higiene gatos | `guia-completa-higiene-cuidado-gatos` | `/cuidados/guia-completa-higiene-cuidado-gatos/` | human-review |
| Paseo perros | `guia-completa-paseo-viaje-perros` | `/cuidados/guia-completa-paseo-viaje-perros/` | human-review |
| Juguetes | `guia-completa-juguetes-enriquecimiento-mascotas` | `/cuidados/guia-completa-juguetes-enriquecimiento-mascotas/` | human-review |
| Hogar mascotas | `guia-completa-hogar-seguro-mascotas` | `/cuidados/guia-completa-hogar-seguro-mascotas/` | human-review |
| Salud perros | `guia-completa-salud-bienestar-perros` | `/cuidados/guia-completa-salud-bienestar-perros/` | human-review |
| Salud gatos | `guia-completa-salud-bienestar-gatos` | `/cuidados/guia-completa-salud-bienestar-gatos/` | human-review |

### Al crear un artículo nuevo en un cluster con pillar

1. Añadir un internal link natural a la pillar page (intro o primera sección).
2. Variar el anchor text.
3. El algoritmo de related articles en `Article.astro` ya prioriza la pillar (+4 score).

### Al crear una nueva pillar page

1. Actualizar tabla en este AGENTS.md y en `CLAUDE.md`.
2. Actualizar `pillarSlugs` en `src/layouts/Article.astro` (línea ~38).
3. Añadir internal links desde todos los artículos del cluster.
4. La pillar debe enlazar a todos los artículos del cluster.
5. Actualizar `.seo-engine/data/topic-clusters.yaml` y `content-queue.yaml`.

### Schema implementado (no tocar manualmente)

- **Homepage:** WebSite + Organization
- **Categorías** (`/alimentacion/`, etc.): ItemList + CollectionPage + Breadcrumb
- **Cuidados** (`/cuidados/`): CollectionPage + Breadcrumb
- **Perros/Gatos**: CollectionPage + Breadcrumb
- **Artículos:** Article + Breadcrumb + FAQPage + HowTo (si hay pasos) + Product (en `ComparisonTable`)
- **Contacto:** ContactPage + Organization
- **Sobre mí:** AboutPage + Person

Los hashes CSP se generan automáticamente con `npm run build`.

### Páginas legales y otras

- `/contacto/` — pagina contacto (footer)
- `/sobre-mi/` — about page con Person schema
- `/aviso-legal/`, `/cookies/`, `/politica-privacidad/` (noindex)

### robots.txt

- `/buscar/`, `/404`, `/api/` bloqueados.
- Bots de IA permitidos (GPTBot, ClaudeBot, PerplexityBot, etc.).

### Performance

- Inter: preload (crítica)
- Outfit: prefetch (headings, no bloquea FCP)
- Scroll reveal: respeta `prefers-reduced-motion`
- Imágenes hero: `loading="eager"`, `width="800"`, `height="400"`
- Imágenes body: `loading="lazy"`, `decoding="async"`
- GA4: diferido 2s post-load

---

## Workflow de productos

1. Añadir entradas a `PRODUCTOS.md` con nombre, URL Amazon e imagen.
2. Incluir siempre campo `animal` en frontmatter.
3. Incluir FAQs con schema en cada artículo.
4. El search index en `buscar.json.ts` incluye campos `animal` y `tipo` — mantener en sync.
5. Artículos informativos usan `tipo: informativo` y se sirven en `/cuidados/[slug]`.
6. Artículos informativos NO llevan `ComparisonTable`, `TopPick` ni `AffiliateButton`.

---

## Imágenes de artículos (Pexels)

Requiere `PEXELS_API_KEY` en `.env`.

```bash
# Listar resultados sin descargar
node scripts/pexels-download.mjs "dog brushing fur grooming" --list

# Descargar la primera imagen
node scripts/pexels-download.mjs "dog brushing fur grooming" muda-pelo-perros-guia-cuidados

# Elegir otra imagen
node scripts/pexels-download.mjs "dog brushing fur grooming" muda-pelo-perros-guia-cuidados --index=2

# Lote
node scripts/pexels-batch-download.mjs
node scripts/pexels-batch-download.mjs --dry-run
```

Guarda automáticamente en `public/images/articulos/<nombre>.webp` (WebP, calidad 80).

**Tamaño máximo:** hero de artículos max 800px de ancho. Los scripts `pexels-download.mjs` y `pexels-batch-download.mjs` redimensionan automáticamente. `optimize-images.mjs` también redimensiona JPG/PNG/WebP sobredimensionados como red de seguridad.

---

## SEO Content Engine

El SEO engine vive en `.seo-engine/`. Usarlo para todas las tareas de blog y SEO.

**Regla universal:** para cualquier tarea de blogs, contenido, SEO, keywords, competidores o documentación, **siempre leer `.seo-engine/config.yaml` y los data files relevantes ANTES de responder**. Incluye escribir, evaluar, revisar, editar, auditar, planificar o responder preguntas sobre contenido. No depender del comportamiento por defecto — consultar los datos del engine.

**Sub-Agent Rule:** paralelizar tareas independientes. No hacer secuencial lo que puede correr simultáneamente.

Detalles completos (file reference, core rules, workflows, SERP intent interpretation, evaluate workflow, create cluster workflow, new feature workflow, SEO data import, changelog format) → ver `.seo-engine/AGENTS.md` y `CLAUDE.md` raíz.

---

## Memory — contexto persistente

**Fuente de verdad:** `docs/agent-context/`. Ver `docs/agent-context/AGENTS.md` para estructura y reglas.

Al inicio de cualquier tarea relevante:

1. Leer `docs/agent-context/feedback/` entero (reglas en vigor).
2. Leer `docs/agent-context/project-state/` que aplique (rutina SEO, plan outreach, estado backlinks).
3. Consultar `docs/agent-context/reference/` para métodos validados (Reddit RSS, Quora ES, dofollow blogs mascotas).

**Memoria local Claude Code (`.claude/memory/`):** existe por compatibilidad con Claude Code; algunos archivos duplican contenido de `docs/agent-context/feedback/`. Codex CLI puede ignorarla — la fuente versionada de feedback vive en `docs/agent-context/`.

---

## Tools & Skills disponibles

Codex CLI no instala skills como plugins — las capacidades que en Claude Code se invocan con `Skill <nombre>` aquí se consiguen leyendo manualmente el archivo correspondiente.

**Skills disponibles en el repo (`claude-environment/skills/<nombre>/SKILL.md`):**

Marketing / SEO: `ab-test-setup`, `ad-creative`, `ai-seo`, `analytics-tracking`, `aso-audit`, `cold-email`, `competitor-alternatives`, `content-strategy`, `copy-editing`, `copywriting`, `customer-research`, `churn-prevention`, `email-sequence`, `find-skills`, `form-cro`, `free-tool-strategy`, `humanizer` (**crítico para texto publicable**), `launch-strategy`, `lead-magnets`, `marketing-ideas`, `marketing-psychology`, `mcp-sentinel`, `onboarding-cro`, `page-cro`, `paid-ads`, `paywall-upgrade-cro`, `popup-cro`, `pricing-strategy`, `product-marketing-context`, `programmatic-seo`, `prompt-master`, `referral-program`, `revops`, `sales-enablement`, `schema-markup`, `seo`, `seo-audit`, `signup-flow-cro`, `site-architecture`, `social-content`.

**Cómo usar en Codex CLI:**

- "Necesito redactar/humanizar un texto publicable" → leer `claude-environment/skills/humanizer/SKILL.md` + `.seo-engine/templates/humanization-guide.md`.
- "Necesito auditar SEO" → leer `claude-environment/skills/seo-audit/SKILL.md`.
- "Necesito un post para Reddit" → leer feedback Reddit en `docs/agent-context/feedback/feedback_reddit_*.md` + skill `cold-email` o `social-content` según aplique.
- Cualquier otra skill → leer `claude-environment/skills/<nombre>/SKILL.md` antes de actuar.

**Plugins Claude Code que no tienen equivalente en Codex CLI:**

- `superpowers`, `ui-ux-pro-max`, `everything-claude-code`, `caveman` → estos son plugins runtime de Claude Code (slash commands, hooks, modos de chat). Codex CLI no los carga. Las reglas críticas que aportan ya están integradas inline en este AGENTS.md y en `docs/agent-context/`.

---

## Diferencias Codex CLI vs Claude Code

| Concepto | Claude Code | Codex CLI |
|---|---|---|
| Entrada principal | `CLAUDE.md` | `AGENTS.md` |
| Skills | Tool `Skill <nombre>` carga frontmatter + body | Leer `claude-environment/skills/<nombre>/SKILL.md` manualmente |
| Plugins | `/plugin install ...` | No aplica — capacidades runtime no portables |
| Slash commands | `/audit`, `/eval`, etc. | Describir la acción en lenguaje natural |
| Memoria local agente | `~/.claude/projects/.../memory/` | No usar; toda memoria persistente en `docs/agent-context/` |
| Hooks (caveman, etc.) | `~/.claude/hooks/` | No aplica |
| Settings | `.claude/settings.json` | No aplica |

**Coexistencia:** ambas herramientas pueden operar el mismo repo en paralelo siempre que cualquier instrucción nueva se guarde en `docs/agent-context/` (versionado) y se mantengan `CLAUDE.md` ↔ `AGENTS.md` sincronizados.

---

## Setup en máquina nueva

```bash
git clone git@github.com:Darumo92/patasyhogar.git
cd patasyhogar
# Para Claude Code:
bash claude-environment/setup.sh
# Luego en Claude Code:
#   /plugin install superpowers ui-ux-pro-max everything-claude-code caveman
# Para Codex CLI:
# Nada extra — Codex lee AGENTS.md directamente.
```

Ver `claude-environment/README.md` para detalles del bootstrap de Claude.


<claude-mem-context>
# Memory Context

# [patasyhogar] recent context, 2026-05-11 10:24pm GMT+2

No previous sessions found.
</claude-mem-context>