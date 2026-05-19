# Patas y Hogar — patasyhogar.com

Web de guías y comparativas de productos para perros y gatos con monetización por afiliados (Amazon, Zooplus, Tiendanimal).

## Regla de instrucciones (meta)

Cualquier instrucción persistente debe guardarse en el repo, NO en memoria local de Claude Code.

**Dónde guardar cada cosa:**
- Reglas de comportamiento → `docs/agent-context/feedback/<slug>.md`
- Estado del proyecto → `docs/agent-context/project-state/<slug>.md`
- Métodos validados → `docs/agent-context/reference/<slug>.md`
- Reglas globales cortas → este `CLAUDE.md`

**Al inicio de cada sesión / tarea relevante:** leer `docs/agent-context/feedback/` que aplique.

## Stack técnico

- **Framework:** Astro 5 (static output)
- **Deploy:** Cloudflare Pages
- **Dominio:** patasyhogar.com
- **Contenido:** MDX en `src/content/articulos/`
- **CSS:** Plain CSS con custom properties (`src/styles/global.css`). No Tailwind.

## Tipos de contenido

- `tipo: comparativa | informativo` (default: `comparativa`)
- **Comparativas**: análisis de productos con ComparisonTable, TopPick, AffiliateButton. URL: `/[categoria]/[slug]`
- **Informativos**: guías de cuidados, salud, comportamiento. URL: `/cuidados/[slug]`. Sin disclaimer de afiliados.

## Categorías

- `alimentacion` — pienso, húmeda, snacks, fuentes, comederos
- `higiene` — arena, areneros, cepillos, champús, antiparasitarios
- `paseo` — arneses, correas, transportines, collares, GPS, ropa
- `juguetes` — juguetes, rascadores, mordedores, alfombras olfato, túneles
- `hogar` — camas, mantas, hamacas, protector sofá, gateras

## Clasificación por animal

- `animal: perro | gato | ambos` — campo obligatorio en frontmatter

## URLs

- Homepage: `/` | Categoría: `/[categoria]` | Comparativa: `/[categoria]/[slug]`
- Cuidados: `/cuidados` y `/cuidados/[slug]` | Por animal: `/perros`, `/gatos`
- Todos: `/articulos` | Búsqueda: `/buscar` | RSS: `/rss.xml`

## Frontmatter

```yaml
titulo: string
descripcion: string
categoria: alimentacion | higiene | paseo | juguetes | hogar
animal: perro | gato | ambos
tipo?: comparativa | informativo
fecha: date
imagen?: string
imagenAlt?: string
destacado?: boolean
tags?: string[]
actualizadoEn?: date
faqs?: [{pregunta, respuesta}]
```

## Archivos clave

- `src/content/config.ts` — schema de content collections
- `src/layouts/Article.astro` — layout artículos con breadcrumb, TOC, related, FAQs
- `src/components/ComparisonTable.astro` — tabla comparativa con Product schema
- `src/components/TopPick.astro` — producto destacado
- `src/styles/global.css` — todos los estilos
- `PRODUCTOS.md` — tracking de URLs Amazon e imágenes

## Afiliación

- Amazon Associates ID: `patasyhogar-21` — auto-appended por componentes
- Nunca incluir `?tag=patasyhogar-21` en URLs de artículos MDX — los componentes lo añaden solos
- Usar URLs directas `/dp/ASIN`
- Tiendanimal: Webgains — auto-appended por componentes

## CSP y seguridad

- `npm run build` ejecuta `astro build && node scripts/update-csp-hashes.mjs`
- Nunca editar hashes CSP manualmente
- Nunca usar `'unsafe-inline'` para script-src
- **Siempre `npm run build` antes de `git push`**

## Humanización obligatoria en texto publicable

Antes de presentar texto destinado a publicación:
1. Leer skill `humanizer` + `.seo-engine/templates/humanization-guide.md`
2. Reescribir aplicando anti-patterns AI
3. Pasada audit: "¿qué suena AI?" y corregir

Aplica a: artículos MDX, pillar pages, posts Reddit, social copy, meta titles/descriptions.
No aplica a: chat, código, commits, frontmatter técnico.

## Verificación de productos

Reglas detalladas en `docs/agent-rules/product-verification.md`. Resumen:
- NUNCA adivinar precios, URLs, imágenes, ASINs ni specs
- Usar `scripts/amazon-api.mjs` para verificar Amazon
- Buscar cada producto en Zooplus y Tiendanimal individualmente

## Artículos nuevos y revisiones

Checklist completo en `docs/agent-rules/article-checklist.md`. Resumen:
- Verificar que el tema no existe ya
- Productos reales verificados con Amazon API
- Mínimo ~2000-3000 palabras por comparativa
- SEO: título ≤ 60, meta ≤ 155, FAQs, internal linking
- Coherencia experiencias personales (Mango, Kira)
- `npm run build` después de cambios

## SEO Content Engine

Reglas completas en `docs/agent-rules/seo-content-engine.md`. Resumen:
- Siempre leer `.seo-engine/config.yaml` y data files antes de escribir contenido
- Pedir SERP real al usuario, no usar búsqueda web propia
- Cannibalization check antes de cada blog
- Human review obligatorio

## Pillar pages

Info completa en `docs/agent-rules/pillar-pages.md`.

## Schema implementado (no tocar manualmente)

- Homepage: WebSite + Organization
- Categorías: ItemList + CollectionPage + Breadcrumb
- Artículos: Article + Breadcrumb + FAQPage + HowTo + Product
- Contacto: ContactPage + Organization
- Sobre mí: AboutPage + Person

## Performance

- Inter: preload (crítica) | Outfit: prefetch (headings)
- Scroll reveal: respeta `prefers-reduced-motion`
- Imágenes hero: `loading="eager"` 800x400 | Body: `loading="lazy"`
- GA4: diferido 2s post-load

## Imágenes Pexels

```bash
node scripts/pexels-download.mjs "query" nombre-archivo     # individual
node scripts/pexels-download.mjs "query" --list              # listar
node scripts/pexels-batch-download.mjs                       # lote
```

Max 800px ancho (auto). Requiere `PEXELS_API_KEY` en `.env`.

## Contexto persistente

Vive en `docs/agent-context/`. Al inicio de tarea relevante:
1. Leer `docs/agent-context/feedback/` — reglas en vigor
2. Leer `docs/agent-context/project-state/` que aplique
3. Consultar `docs/agent-context/reference/` para métodos validados
