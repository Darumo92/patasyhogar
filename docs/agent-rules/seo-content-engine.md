# SEO Content Engine

Engine en `.seo-engine/`. Usar para todas las tareas de blog y SEO.

## Regla universal

Para cualquier tarea de blogs, contenido, SEO, keywords, competidores o documentación: **siempre leer `.seo-engine/config.yaml` y los data files relevantes ANTES de responder**.

**Sub-Agent Rule:** paralelizar tareas independientes.

## File Reference

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
| `templates/humanization-guide.md` | Anti-IA patterns | Before writing/reviewing |
| `logs/changelog.md` | Audit trail | After every action |

## Core Rules

1. **Read before writing.** Always read: config, features, content-map, content-queue, topic-clusters, tone-guide, humanization-guide.
2. **Never fabricate features.** Only reference what's in features.yaml.
3. **Competitor claims need confidence.** If "unverified" or 90+ days old → caveat.
4. **No web search for SERP data.** Pedir al usuario SERP real de Google. Excepción: MCP SEO tool dedicada.
5. **Cannibalization check before every blog.** Buscar solapamientos en content-map.
6. **Every blog needs a unique angle.** "Más completo" no es un ángulo.
7. **E-E-A-T mandatory.** Al menos: testimonial, métrica, experiencia o review link de config.trust_signals.
8. **Human review required.** Guardar como `status: "human-review"`. Nunca auto-publicar.
9. **Respect pillar/cluster linking.** Cluster → pillar. Pillar → todos los cluster.
10. **Update all files after writing:** content-map, features, keywords, queue, clusters, changelog.
11. **Never delete data.** Add or update only.
12. **Log everything** to changelog.md.

## SERP Intent Interpretation

- **All product/tool pages** → TRANSACCIONAL. Servir intent transaccional primero.
- **Mix guías + products** → BLENDED. Guía con CTAs embebidos.
- **All guides/blogs** → INFORMACIONAL. Guía exhaustiva.
- **All comparison/listicle** → COMERCIAL INVESTIGACIÓN. Comparativa o listicle.

**Nunca pelear contra la SERP.** Match la intent dominante.

## Blog Writing Workflow

### STEP 1: Pre-Writing Research

a) Read all data files.
b) Pick topic from queue or user request.
c) Cannibalization check.
d) **Keyword Surfer validation** — pedir al usuario verificación de volumen.
e) **SERP Analysis** — pedir al usuario top 3-5 páginas, PAA, related searches. NO usar búsqueda web propia.
f) Definir ángulo único desde gaps SERP.

### STEP 2: Draft

a) Seleccionar estructura de blog-structures.yaml.
   - Si PILLAR: incluir definición, por qué importa, tipos/categorías, how-to, best practices, mistakes, tools, FAQ.
b) Leer tone-guide.md y humanization-guide.md.
c) Humanization check: revisar intros de 3 artículos recientes misma categoría.
d) Frontmatter: titulo ≤ 60, descripcion ≤ 155, slug ≤ 7 palabras.
e) Escribir: keyword en título/primer párrafo/un H2/descripción/slug. FAQ 3-7. Internal links. Humanización: intro variada, 2+ experiencias personales, pros/contras asimétricos.
f) E-E-A-T: nombre real autor, trust signals.
g) Preguntar al usuario si quiere añadir experiencia/feedback/fuentes.

### STEP 3: Post-Writing

a) Save con status "human-review".
b) Update content-map, features, keywords, queue, clusters, changelog.
c) Alert al usuario para revisión.

## Audit Workflow

1. Feature coverage gaps
2. Keyword gaps
3. Cluster completion
4. Cannibalization
5. Stale content (90+ days)
6. Competitor data freshness
7. Internal linking gaps
8. E-E-A-T gaps
9. Humanization gaps
10. Report + update queue + log

## Evaluate Blog Workflow

1. Leer blog + todos los data files.
2. Evaluar: SEO, canibalización, feature accuracy, competitors, E-E-A-T, cluster alignment, internal linking, unique angle, tone, quality, word count, pillar completeness, SERP intent match, FAQ quality, humanización (intro, experiencia, asimetría, estructura, autoría).
3. Output: score/10, strengths, issues, fixes.

## Create Topic Cluster Workflow

1. Leer features.yaml y topic-clusters.yaml.
2. Diseñar cluster pages.
3. Pedir SERP al usuario para pillar keyword.
4. Aplicar SERP Intent Rules.
5. Guardar en topic-clusters.yaml, content-queue.yaml, seo-keywords.csv, changelog.

## New Feature / SEO Data Import

- New feature: add to features → competitors → keywords → cluster → queue → log.
- Import: merge keywords → map features → assign clusters → recalculate priorities → log.

## Changelog Format

```
## {YYYY-MM-DD HH:MM}
**Action:** {what}
**Files:** {list}
**Summary:** {1-2 sentences}
**Triggered by:** {user / audit / detection / import}
```
