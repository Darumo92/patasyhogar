# Sincronizado desde CLAUDE.md — mantener ambos archivos alineados

> Reglas del SEO Content Engine para **Codex CLI** y cualquier agente que lea `AGENTS.md`. Equivalente a la sección "SEO Content Engine" de `CLAUDE.md` raíz.

# SEO Content Engine

SEO engine en `.seo-engine/`. Usar para **todas** las tareas de blog y SEO.

## Regla universal

Para cualquier tarea que involucre blogs, contenido, SEO, keywords, competidores o documentación en este proyecto — **siempre leer `.seo-engine/config.yaml` y los data files relevantes ANTES de responder**.

Incluye: escribir, evaluar, revisar, editar, auditar, planificar o responder preguntas sobre contenido. Nunca depender del comportamiento por defecto del modelo.

**Sub-Agent Rule:** paralelizar tareas independientes. No hacer secuencial lo que puede correr simultáneamente.

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
| `templates/humanization-guide.md` | Anti-IA patterns + experiencia personal | Before writing and reviewing |
| `logs/changelog.md` | Audit trail | After every action |

## Core Rules

1. **Read before writing.** Always read: config, features, content-map, content-queue, topic-clusters, tone-guide, humanization-guide.
2. **Never fabricate features.** Only reference what's in `features.yaml`.
3. **Competitor claims need confidence.** If "unverified" or 90+ days old → caveat o derivar al usuario a la página del competidor.
4. **No web search for SERP data.** Nunca usar búsqueda web propia para investigar keywords o SERP results — produce datos genéricos. Siempre pedir al usuario que proporcione SERP real de Google (top results, PAA, related searches). Única excepción: una MCP tool SEO dedicada (Semrush, Ahrefs).
5. **Cannibalization check before every blog.** Buscar en `content-map` solapamientos de keyword. Si hay conflicto → recomendar update del blog existente. Solo proceder si el ángulo es genuinamente distinto.
6. **Every blog needs a unique angle.** Definir qué cambia respecto a lo que ya rankea. "Más completo" no es un ángulo.
7. **E-E-A-T mandatory.** Cada blog debe incluir al menos uno: testimonial, métrica, experiencia o review link de `config.trust_signals`. Si no hay trust signals, pedir uno al usuario antes de publicar.
8. **Human review required.** Guardar todos los blogs como `status: "human-review"`. Nunca auto-publicar. Alertar al usuario para revisión.
9. **Respect pillar/cluster linking.** Cluster pages → enlazan a pillar. Pillar → enlaza a todas las cluster pages. No negociable.
10. **Update all files after writing:** `content-map.yaml` (registrar blog), `features.yaml` (blog_refs), `seo-keywords.csv` (mapped_blog_slugs), `content-queue.yaml` (status), `topic-clusters.yaml` (si cluster), `changelog.md` (log action).
11. **Never delete data.** Add or update only.
12. **Log everything** to `changelog.md`.

## SERP Intent Interpretation Rules

Al analizar datos SERP (sea de usuario o de MCP SEO tool), clasificar la intent **antes** de decidir la estructura:

- **All product/tool/template pages** → intent TRANSACCIONAL. Google quiere herramientas, no guías. El contenido debe servir la intent transaccional primero (proveer tool/template/CTA arriba), luego añadir profundidad educativa abajo. **No** escribir guía informacional pura — no rankeará.
- **Mix guías + product pages** → intent BLENDED. Guía completa con CTAs embebidos a tool/template funciona bien.
- **All informational guides/blogs** → intent INFORMACIONAL. Escribir guía exhaustiva. Menciones de producto naturales, no forzadas.
- **All comparison/listicle pages** → intent COMERCIAL INVESTIGACIÓN. Escribir comparativa o listicle. No how-to.

**Regla:** nunca pelear contra la SERP. Si Google muestra product pages, no escribir guía pura. Si muestra guías, no escribir product page. Match la intent dominante y añadir valor único encima.

## Blog Writing Workflow

### STEP 1: Pre-Writing Research

a) Read all data files.
b) Pick topic: from queue (highest priority `planned`) or user request.
c) **Cannibalization check** — escanear `content-map` para solapes. Si conflicto: recomendar update. Si procede: documentar por qué en queue.
d) **Keyword Surfer validation (obligatorio antes de escribir):**
   - Antes de pedir SERP, pedir al usuario que verifique la keyword objetivo en Keyword Surfer:
     ```
     Antes de escribir, necesito verificar la keyword objetivo.
     Por favor busca en Google con Keyword Surfer activo: "{keyword}"
     Dime:
     1. Volumen de la keyword exacta
     2. Pantallazo de las "Keyword ideas" de Keyword Surfer
     ```
   - WAIT for response. Si la keyword tiene 0 vol, analizar variantes y proponer la de mayor volumen.
   - Actualizar `seo-keywords.csv` con datos reales antes de proceder.
e) **SERP Analysis — regla crítica:**
   - **No usar búsqueda web propia para SERP.** No provee volumen, dificultad, PAA real ni el formato real de Google.
   - Si hay MCP SEO tool conectada → usarla.
   - En el resto de casos → pedir al usuario SERP real (top 3-5 páginas, PAA, related searches).
   - WAIT for response. No proceder sin SERP data. No sustituir por búsqueda web propia.
f) **Definir ángulo único** desde gaps de SERP. 1 frase. Si no hay gap real → avisar al usuario.

### STEP 2: Draft

a) Seleccionar estructura de `blog-structures.yaml`.

   **Si es PILLAR**, debe incluir TODAS estas secciones (adaptar orden según intent SERP):
   - Definición: qué es {topic}.
   - Por qué importa.
   - Tipos / categorías (mapean a cluster pages — enlazar a cada una).
   - How-to / step-by-step.
   - Best practices / tips.
   - Common mistakes.
   - Tools/templates (incluir el producto naturalmente).
   - FAQ del People Also Ask.

b) Leer `tone-guide.md` y `humanization-guide.md` — usar voz correcta y aplicar patrones anti-IA.

c) **Humanization check pre-writing:** revisar intros de 3 artículos más recientes de la misma categoría para no repetir patrones.

d) Frontmatter: `titulo` ≤ 60 chars, `descripcion` ≤ 155 chars, slug ≤ 7 palabras.

e) Escribir blog:
   - Keyword primaria en: título, primer párrafo, un H2, descripción, slug.
   - Keywords secundarias naturales.
   - FAQ del People Also Ask (3-7, NO siempre 5).
   - Internal links: priorizar pillar (si cluster page), luego blogs relevantes. Anchor text variado.
   - External links: 1-2 autoritativos (no competidores).
   - **Humanización:** intro variada, mínimo 2 inserciones de experiencia personal, pros/contras asimétricos, al menos 1 variación estructural.

f) **Inyectar E-E-A-T:** nombre de autor (nombre real, no marca), testimonial/métrica/experiencia de config, review link.

g) **Preguntar al usuario:**
   ```
   Antes de finalizar, ¿quieres añadir algo?
   - ¿Una experiencia personal o historia relacionada con este tema?
   - ¿Feedback específico de usuarios o citas?
   - ¿Fuentes externas a referenciar?
   (Di "skip" si está bien así)
   ```

### STEP 3: Post-Writing

a) Save blog with `status: "human-review"`.
b) Update `content-map`, `features`, `keywords`, `queue`, `clusters`, `changelog`.
c) **Alert:**
   ```
   ✅ Blog redactado: "{title}"
   📄 Archivo: {path} | Palabras: {count} | Links: {count}
   🏗️ Cluster: {name or "standalone"}

   ⚠️ REVISIÓN NECESARIA — di "Aprueba blog {slug}" o da feedback.
   ```

## Audit Workflow

1. Feature coverage gaps (empty `blog_refs`).
2. Keyword gaps (high priority, no blog).
3. Cluster completion (% per cluster).
4. Keyword cannibalization.
5. Stale content (90+ days).
6. Competitor data freshness (90+ days).
7. Internal linking gaps.
8. E-E-A-T gaps (`has_eeat_signals: false`).
9. Humanization gaps (intros formulaicas, sin experiencia personal, listas simétricas, estructura idéntica).
10. Report + update queue + log.

## Evaluate / Review Blog Workflow

Al evaluar, revisar, analizar o dar feedback sobre un blog:

1. Leer el archivo del blog.
2. Leer `config.yaml`, `features.yaml`, `competitors.yaml`, `content-map.yaml`, `topic-clusters.yaml`, `tone-guide.md`, `humanization-guide.md`.
3. Evaluar contra TODOS estos criterios:
   - SEO: keyword primaria en título, primer párrafo, un H2, descripción, slug. Título ≤ 60. Descripción ≤ 155.
   - Canibalización: otro blog targetea la misma keyword?
   - Feature accuracy: features mencionadas están en `features.yaml`? Claims fabricados?
   - Competitor accuracy: claims respaldados por `competitors.yaml`? Confianza?
   - E-E-A-T: testimonials, métricas, experiencia, review links?
   - Cluster alignment: parte de cluster? Enlaza a pillar? Pillar enlaza de vuelta?
   - Internal linking: ≥ 2 blogs? Anchor variado y contextual?
   - Unique angle: ¿genuinamente distinto a lo que rankea?
   - Tone/voice: coincide con el blog type de `blog-structures.yaml`?
   - Calidad: específico y concreto o vago/AI filler?
   - Word count: cumple mínimo de config?
   - Pillar completeness: tiene todas las secciones obligatorias?
   - SERP intent match: el formato coincide con lo que Google premia?
   - FAQ quality: del PAA real o genéricas?
   - Humanización — intro: formulaica o repite patrón?
   - Humanización — experiencia: ≥ 2 inserciones personales (o declaración honesta)?
   - Humanización — asimetría: pros/contras con número variable?
   - Humanización — estructura: ¿alguna variación del esquema estándar?
   - Humanización — autoría: firma con nombre real (no marca)?
4. Output: score (sobre 10), strengths, issues, fixes específicos.
5. Si `status: "human-review"` en content-map: recomendar approve/reject.

## Create Topic Cluster Workflow

1. Leer `features.yaml` y `topic-clusters.yaml`.
2. Diseñar cluster pages desde features + conocimiento (no necesita SERP).
3. **Antes de finalizar la pillar:** pedir al usuario SERP data de la keyword pillar.
4. WAIT for response.
5. Aplicar SERP Intent Interpretation Rules.
6. Pillar incluye todas las secciones obligatorias.
7. Guardar cluster en `topic-clusters.yaml`.
8. Añadir páginas a `content-queue.yaml` (con cannibalization check).
9. Añadir keywords a `seo-keywords.csv`.
10. Log a `changelog.md`.

## New Feature Workflow

1. Add to `features.yaml`.
2. Add to `competitors.yaml` (unverified).
3. Generate keywords → `seo-keywords.csv`.
4. Assign to cluster o crear nuevo en `topic-clusters.yaml`.
5. Check existing blogs → mark `needs-update`.
6. Queue blog ideas (con cannibalization check).
7. Log.

## SEO Data Import Workflow

1. Merge en `seo-keywords.csv` (sin duplicados).
2. Map a features.
3. Update SERP fields si disponibles.
4. Assign to clusters.
5. Recalculate queue priorities.
6. Generate new queue items (con cannibalization check).
7. Log.

## Changelog Format

```
## {YYYY-MM-DD HH:MM}
**Action:** {what}
**Files:** {list}
**Summary:** {1-2 sentences}
**Triggered by:** {user / audit / detection / import}
```
