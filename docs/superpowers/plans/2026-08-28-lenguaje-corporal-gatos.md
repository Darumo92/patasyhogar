# Artículo S12: lenguaje corporal de los gatos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear el artículo informativo S12 sobre lenguaje corporal felino, integrarlo en el cluster de salud y comportamiento de gatos y dejarlo en estado `human-review` con build y auditoría HTML correctos.

**Architecture:** La pieza se implementa como un MDX independiente en la colección existente, respaldado por un brief SERP y fuentes veterinarias verificadas. La integración se mantiene aditiva: SEO engine, calendario y enlaces de retorno desde tres contenidos relacionados, sin refactorizar archivos ni tocar cambios ajenos del worktree.

**Tech Stack:** Astro 5, MDX, content collections, plain CSS existente, scripts Node.js del repositorio, Pexels API, Playwright MCP y Keyword Surfer.

## Global Constraints

- Seguir el diseño aprobado en `docs/superpowers/specs/2026-08-28-lenguaje-corporal-gatos-design.md`.
- Escribir siempre en castellano de España y con tono profesional-cercano.
- Mantener el ángulo `contexto + combinación + patrón habitual`; no traducir gestos aislados como reglas universales.
- Longitud objetivo del cuerpo: 1.800-2.300 palabras.
- Título máximo 60 caracteres; descripción máxima 155; slug máximo 7 palabras.
- La pieza es `tipo: informativo`, `animal: gato`, `categoria: hogar`; no incluye productos ni disclaimer de afiliación.
- No repetir las explicaciones completas de sueño, estrés o mordiscos; resumir y enlazar a sus guías.
- Usar solo la experiencia ya establecida de Mango ante su reflejo en la terraza. Puede aparecer como anécdota y como breve referencia posterior, sin inventar otra experiencia.
- No añadir `actualizadoEn` a los artículos que solo reciben un enlace interno.
- Mantener el artículo y los registros del SEO engine en `human-review` hasta aprobación expresa del usuario.
- No editar hashes CSP manualmente; los actualiza `npm run build`.
- No hacer commit ni push salvo petición expresa del usuario.
- Conservar todos los cambios no relacionados presentes en el worktree.

---

## File Map

**Create:**

- `docs/brief-s12-lenguaje-corporal-gatos.md`: evidencia SERP, fuentes, canibalización, keyword mapping y outline de redacción.
- `src/content/articulos/lenguaje-corporal-gatos.mdx`: artículo publicable en estado editorial `human-review`.
- `public/images/articulos/lenguaje-corporal-gatos.webp`: hero real de Pexels con cuerpo, cola y orejas visibles.

**Modify:**

- `src/content/articulos/guia-completa-salud-bienestar-gatos.mdx`: enlace entrante principal desde el pilar.
- `src/content/articulos/por-que-mi-gato-me-muerde.mdx`: enlace contextual desde la lectura previa al mordisco.
- `src/content/articulos/senales-estres-gatos.mdx`: enlace contextual desde posturas corporales de estrés.
- `.seo-engine/data/content-map.yaml`: nueva entrada y relaciones de enlazado relevantes.
- `.seo-engine/data/content-queue.yaml`: nueva entrada `q_033` en `human-review`.
- `.seo-engine/data/topic-clusters.yaml`: nueva página del cluster `tc_salud_comportamiento_gatos`.
- `.seo-engine/data/seo-keywords.csv`: keyword principal con volumen y SERP actuales.
- `.seo-engine/logs/changelog.md`: registro de creación y verificación.
- `docs/PLAN_EDITORIAL_v7.md`: S12 marcado como creado y pendiente de revisión.

---

### Task 1: Consolidar investigación y preparar la imagen

**Files:**

- Create: `docs/brief-s12-lenguaje-corporal-gatos.md`
- Create: `public/images/articulos/lenguaje-corporal-gatos.webp`
- Reference: `docs/superpowers/specs/2026-08-28-lenguaje-corporal-gatos-design.md`
- Reference: `docs/brief-s11-por-que-gato-me-muerde.md`

**Interfaces:**

- Consumes: SERP y keywords ya capturadas en el diseño aprobado.
- Produces: un brief autosuficiente y una ruta de imagen final que consume el MDX de Task 2.

- [ ] **Step 1: Verificar las cuatro fuentes base**

Abrir y extraer solo las afirmaciones necesarias:

```text
https://icatcare.org/articles/cat-communication
https://catvets.com/resource/aafp-isfm-cat-friendly-veterinary-interaction-guidelines/
https://pubmed.ncbi.nlm.nih.gov/31836868/
https://www.nature.com/articles/s41598-020-73426-0
```

Registrar estas conclusiones con lenguaje prudente:

- International Cat Care: la comunicación visual combina postura, expresión facial, pupilas y piloerección; las señales se interpretan en conjunto.
- AAFP/ISFM: una interacción adecuada exige reconocer el estado emocional actual y dar al gato sensación de control.
- Feline Grimace Scale: orejas, ojos, hocico, bigotes y posición de la cabeza ayudan a valorar dolor agudo; no diagnostican por sí solos.
- Estudio de parpadeo lento: el estrechamiento lento de ojos participa en interacciones positivas gato-humano; no equivale de forma universal a “te quiero”.

- [ ] **Step 2: Crear el brief S12**

Crear `docs/brief-s12-lenguaje-corporal-gatos.md` con estas secciones y datos exactos:

```markdown
# Brief editorial S12: lenguaje corporal de los gatos

- Fecha de investigación: 2026-08-28
- Estado: diseño aprobado, pendiente de redacción y revisión humana
- Tipo: guía informativa
- Cluster: tc_salud_comportamiento_gatos
- Animal: gato

## SERP principal
## Variantes y volumen Keyword Surfer
## AI Overview, PAA y búsquedas relacionadas
## Competidores y gap editorial
## Fuentes verificadas
## Ángulo único
## Propuesta SEO
## Estructura recomendada
## Canibalización y enlazado interno
## Coherencia de Mango
## Reglas de precisión
## Criterio de éxito
```

Usar los volúmenes del diseño: `lenguaje del gato` 1.000/KD 0,27; `lenguaje corporal de gatos` 480; variantes corporales 260-390; `significado cola gatos` 260; `orejas gato significado` 140.

- [ ] **Step 3: Comprobar que el brief está cerrado**

Buscar `TBD`, `TODO`, `por definir` y `pendiente de decidir`. El resultado esperado es cero coincidencias. Confirmar además que aparecen las cuatro URL de fuentes y las keywords `lenguaje del gato`, `lenguaje corporal de gatos` y `significado cola gatos`.

- [ ] **Step 4: Listar candidatas de Pexels**

Run:

```bash
node scripts/pexels-download.mjs "alert cat standing tail up ears home" --list
```

Seleccionar una foto doméstica, no de estudio, con el gato despierto y con cola, orejas y postura visibles. Rechazar gatos dormidos, primeros planos sin cuerpo y composiciones donde la cola quede cortada.

- [ ] **Step 5: Descargar la imagen elegida**

Run, ajustando la consulta solo si la lista anterior no contiene una candidata válida:

```bash
node scripts/pexels-download.mjs "alert cat standing tail up ears home" lenguaje-corporal-gatos
```

Expected: `public/images/articulos/lenguaje-corporal-gatos.webp` existe, tiene un máximo de 800 px de ancho y el script informa de la atribución real que se conservará para el changelog.

- [ ] **Step 6: Verificar visualmente y descartar duplicados**

Abrir `public/images/articulos/lenguaje-corporal-gatos.webp` con la herramienta de lectura de imágenes. Confirmar que el futuro `imagenAlt` podrá describir literalmente animal, postura y entorno.

Run:

```bash
md5sum public/images/articulos/*.webp | sort | cut -d' ' -f1 | uniq -d
```

Expected: la huella de la nueva imagen no aparece en la salida de duplicados.

---

### Task 2: Redactar y humanizar el MDX

**Files:**

- Create: `src/content/articulos/lenguaje-corporal-gatos.mdx`
- Reference: `docs/brief-s12-lenguaje-corporal-gatos.md`
- Reference: `.seo-engine/config.yaml`
- Reference: `.seo-engine/templates/tone-guide.md`
- Reference: `.seo-engine/templates/humanization-guide.md`
- Reference: `src/content/articulos/por-que-mi-gato-me-muerde.mdx`
- Reference: `src/content/articulos/como-duermen-gatos-posturas-horas-significado.mdx`
- Reference: `src/content/articulos/senales-estres-gatos.mdx`

**Interfaces:**

- Consumes: brief, ruta de imagen y fuentes verificadas de Task 1.
- Produces: el slug `/cuidados/lenguaje-corporal-gatos/` y sus enlaces salientes para Task 3.

- [ ] **Step 1: Crear el frontmatter exacto**

Usar esta base y sustituir únicamente `imagenAlt` por una descripción factual de la foto elegida:

```yaml
---
titulo: "Lenguaje corporal de los gatos: cómo entenderlos"
descripcion: "Aprende a interpretar el lenguaje del gato combinando cola, orejas, ojos y postura para saber qué siente, cuándo jugar y cuándo darle espacio."
categoria: hogar
animal: gato
tipo: informativo
fecha: 2026-08-28
imagen: /images/articulos/lenguaje-corporal-gatos.webp
imagenAlt: "Descripción literal de la fotografía elegida"
destacado: false
tags: ["lenguaje del gato", "lenguaje corporal de gatos", "significado cola gatos", "orejas gato significado", "posturas gatos", "comportamiento felino"]
faqs:
  - pregunta: "¿Cómo saber lo que dice tu gato?"
    respuesta: "Respuesta autónoma basada en contexto y combinación de señales."
  - pregunta: "¿Qué significa cada posición de la cola de un gato?"
    respuesta: "Respuesta autónoma que evita asignar un significado absoluto."
  - pregunta: "¿Qué significa que un gato mueva la cola cuando está tumbado?"
    respuesta: "Respuesta autónoma que distingue atención, juego y saturación."
  - pregunta: "¿Por qué mi gato agacha las orejas cuando lo acaricio?"
    respuesta: "Respuesta autónoma sobre incomodidad y necesidad de espacio."
  - pregunta: "¿Cómo dice un gato que te quiere?"
    respuesta: "Respuesta autónoma sobre acercamiento, cola, roce y parpadeo lento."
---
```

Las frases descriptivas de las respuestas son requisitos de contenido, no texto final: escribir cada respuesta completa con 2-4 frases y sin copiar la redacción de la SERP.

- [ ] **Step 2: Escribir una apertura directa no formulaica**

Las primeras dos frases deben explicar que el lenguaje del gato se interpreta leyendo varias señales y el contexto. No empezar con pregunta retórica, definición de diccionario ni anécdota: S9 empezó con anécdota y S11 fue directo al problema.

- [ ] **Step 3: Escribir el método y la tabla de lectura rápida**

Crear `## ¿Cómo interpretar el lenguaje corporal de un gato?` con los tres pasos `situación`, `conjunto corporal` y `patrón habitual`. Añadir una tabla con columnas `Señal`, `Lectura probable`, `Qué más mirar` y filas para cola, orejas, ojos/pupilas, bigotes, cuerpo/pelo y sonidos.

- [ ] **Step 4: Desarrollar cola, cara y postura sin convertirlos en diccionarios absolutos**

Crear estos H2:

```markdown
## Qué dice la cola de tu gato
## Orejas, ojos y bigotes: la cara también habla
```

Cubrir las posiciones definidas en el brief y enlazar las afirmaciones centrales a International Cat Care. Aclarar expresamente que las pupilas también cambian por la luz y que el ronroneo no garantiza bienestar.

- [ ] **Step 5: Escribir los siete patrones completos**

Crear `## Siete patrones para saber qué siente tu gato` y siete H3: relajado, curioso, juego/caza, saturación, miedo, defensa/territorio y posible dolor. Para cada patrón incluir:

- combinación corporal;
- contexto habitual;
- respuesta humana recomendable;
- matiz que evite una traducción universal.

Usar la anécdota ya establecida de Mango frente a su reflejo únicamente en el patrón territorial. Hacer una referencia breve a la misma observación en la sección de respuesta, sin añadir hechos nuevos.

- [ ] **Step 6: Escribir respuesta humana y señales clínicas**

Crear:

```markdown
## Cómo responder a lo que comunica tu gato
## ¿Cuándo puede indicar dolor o enfermedad?
```

Respaldar el enfoque de control y baja coerción con AAFP/ISFM. Explicar las cinco unidades de acción de Feline Grimace Scale sin convertir la puntuación en autodiagnóstico. Recomendar veterinario ante cambios repentinos, persistentes o acompañados de inapetencia, aislamiento, vocalización distinta o limitación de movimiento.

- [ ] **Step 7: Añadir enlaces internos y fuentes externas**

Incluir exactamente estos destinos, una vez cada uno cuando encajen:

```text
/cuidados/guia-completa-salud-bienestar-gatos/
/cuidados/por-que-mi-gato-me-muerde/
/cuidados/senales-estres-gatos/
/cuidados/como-duermen-gatos-posturas-horas-significado/
/cuidados/como-adiestrar-gato-tecnicas/
/cuidados/enriquecimiento-ambiental-gato-interior/
```

Enlazar también las cuatro fuentes de Task 1. No usar `nofollow` en fuentes editoriales ni añadir CTA de afiliación.

- [ ] **Step 8: Medir longitud y revisar canibalización**

Run:

```bash
wc -w src/content/articulos/lenguaje-corporal-gatos.mdx
```

Expected: el cuerpo editorial queda aproximadamente entre 1.800 y 2.300 palabras; el recuento total puede ser algo mayor por frontmatter. Comparar las secciones de sueño, estrés y mordisco con los tres artículos de referencia y reducir cualquier explicación que compita con ellos.

- [ ] **Step 9: Aplicar humanización obligatoria**

Invocar la skill `humanizer`, releer `.seo-engine/templates/humanization-guide.md` y `.seo-engine/templates/tone-guide.md`, y hacer una pasada con esta pregunta: `¿Qué partes suenan escritas por IA?`.

Corregir como mínimo:

- introducciones o cierres previsibles;
- series de párrafos con idéntica longitud;
- listas simétricas;
- frases de falsa rotundidad;
- repeticiones de `la clave`, `es importante` y `no solo... sino también`;
- latinismos o mezclas dialectales.

Mantener dos inserciones editoriales derivadas de la única experiencia aprobada: la anécdota de Mango y un callback breve, sin inventar una segunda historia.

---

### Task 3: Integrar cluster, calendario y enlaces de retorno

**Files:**

- Modify: `src/content/articulos/guia-completa-salud-bienestar-gatos.mdx:31-35`
- Modify: `src/content/articulos/por-que-mi-gato-me-muerde.mdx:71-84`
- Modify: `src/content/articulos/senales-estres-gatos.mdx:153-177`
- Modify: `.seo-engine/data/content-map.yaml:1-40` y entradas de los artículos enlazantes
- Modify: `.seo-engine/data/content-queue.yaml:766-786`
- Modify: `.seo-engine/data/topic-clusters.yaml:1005-1025`
- Modify: `.seo-engine/data/seo-keywords.csv`
- Modify: `.seo-engine/logs/changelog.md:1-3`
- Modify: `docs/PLAN_EDITORIAL_v7.md:5-39`

**Interfaces:**

- Consumes: slug, metadatos, word count, fuentes, enlaces e imagen finales de Tasks 1-2.
- Produces: descubrimiento interno bidireccional y registros editoriales coherentes en estado `human-review`.

- [ ] **Step 1: Añadir tres enlaces de retorno mínimos**

Aplicar cambios locales, sin reescribir secciones:

- En el pilar, convertir la mención de `entender un lenguaje corporal` de la introducción en un enlace a `/cuidados/lenguaje-corporal-gatos/`.
- En S11, enlazar `leer su cuerpo antes del mordisco` o una frase equivalente hacia la nueva guía general.
- En `senales-estres-gatos`, añadir tras la lista corporal una frase que derive a la guía general para interpretar señales fuera de situaciones de estrés.

No añadir `actualizadoEn` a ninguno.

- [ ] **Step 2: Registrar el artículo en `content-map.yaml`**

Añadir la entrada al inicio de `blogs` con:

```yaml
- slug: lenguaje-corporal-gatos
  title: "Lenguaje corporal de los gatos: cómo entenderlos"
  file_path: src/content/articulos/lenguaje-corporal-gatos.mdx
  status: human-review
  published_date: '2026-08-28'
  last_updated: ''
  blog_type: guide
  content_type: informativo
  cluster_id: tc_salud_comportamiento_gatos
  is_pillar: false
```

Añadir keywords con volúmenes, competidores observados, los seis `internal_links_out`, los tres `internal_links_from`, el recuento real y una nota con SERP, ángulo, fuentes y experiencia de Mango. Actualizar `last_updated` del archivo a `2026-08-28` y reflejar el enlace nuevo en las entradas de S11 y de las otras guías modificadas cuando tengan una lista de enlaces salientes.

- [ ] **Step 3: Crear `q_033` en `content-queue.yaml`**

Añadir una entrada completa después de `q_032`:

```yaml
- id: "q_033"
  title: "Lenguaje corporal de los gatos: cómo entenderlos"
  blog_type: "guide"
  content_type: "cluster"
  cluster_id: "tc_salud_comportamiento_gatos"
  animal: "gato"
  target_keywords: ["lenguaje del gato", "lenguaje corporal de gatos", "significado cola gatos"]
  unique_angle: "Interpretar contexto, combinación corporal y patrón habitual en vez de asignar una traducción fija a cada gesto."
  priority: "high"
  priority_reason: "Plan v7.1 S12. lenguaje del gato = 1000 vol y KD 0.27, verificado 2026-08-28."
  status: "human-review"
  actual_word_count: 0
  serp_analyzed: true
  cannibalization_check: "passed — guía general que deriva sueño, estrés y mordiscos a sus artículos especializados"
  notes: "SERP investigada con Playwright MCP y Keyword Surfer. Sustituir actual_word_count por el recuento real del artículo."
  depends_on: []
  internal_link_targets:
    - "guia-completa-salud-bienestar-gatos"
    - "por-que-mi-gato-me-muerde"
    - "senales-estres-gatos"
    - "como-duermen-gatos-posturas-horas-significado"
    - "como-adiestrar-gato-tecnicas"
    - "enriquecimiento-ambiental-gato-interior"
```

Antes de guardar, reemplazar `actual_word_count: 0` por el recuento real; no dejar el cero provisional.

- [ ] **Step 4: Añadir la página al cluster felino**

En `tc_salud_comportamiento_gatos`, insertar después de S11:

```yaml
- title: "Lenguaje corporal de los gatos: cómo entenderlos"
  target_keyword: "lenguaje del gato"
  slug: "lenguaje-corporal-gatos"
  status: "human-review"
  serp_analyzed: true
  blog_slug: "lenguaje-corporal-gatos"
  notes: "Plan v7.1 S12. Volumen 1000 y KD 0.27 verificados 2026-08-28. Ángulo: contexto + combinación + patrón habitual."
```

Actualizar `last_updated` de `topic-clusters.yaml` a `2026-08-28`.

- [ ] **Step 5: Registrar la keyword principal en CSV**

Añadir esta fila, conservando las comillas del campo de features y escapando cualquier coma adicional en notas:

```csv
lenguaje del gato,1000,0.27,0,informational,awareness,"ai_overview,images,paa,videos",guide,,lenguaje-corporal-gatos,tc_salud_comportamiento_gatos,cluster,high,human-review,2026-08-28,keywordsurfer_es,"Plan v7.1 S12. SERP: Tiendanimal, Purina, Medivet, Feliway y Patitas&co. Ángulo: contexto + combinación + patrón habitual."
```

- [ ] **Step 6: Actualizar calendario y changelog**

En `docs/PLAN_EDITORIAL_v7.md`:

- cambiar `Actualizado` a `2026-08-28 — v7.1 semanal, S12 creado`;
- cambiar el estado S12 a `[x] creado 2026-08-28, human-review`;
- no modificar S13 ni semanas posteriores.

Añadir al inicio de `.seo-engine/logs/changelog.md` una entrada `2026-08-28` con archivos, recuento real, atribución Pexels, keywords, fuentes, enlaces y resultado de verificación. Si el build aún no se ha ejecutado, escribir `Verification: pendiente npm run build` y actualizar esa misma línea en Task 4; no afirmar éxito antes de tener evidencia.

- [ ] **Step 7: Validar consistencia de los registros**

Buscar `lenguaje-corporal-gatos` en los cinco archivos de datos y en los tres artículos enlazantes. Expected:

- una entrada principal en content map;
- una entrada `q_033`;
- una página del cluster;
- una fila CSV;
- S12 marcado `human-review` en el calendario;
- tres enlaces entrantes en MDX.

---

### Task 4: Construir y auditar el HTML desplegable

**Files:**

- Verify: `dist/cuidados/lenguaje-corporal-gatos/index.html`
- Modify if needed: any file changed in Tasks 1-3
- Modify after successful verification: `.seo-engine/logs/changelog.md`

**Interfaces:**

- Consumes: implementación completa de Tasks 1-3.
- Produces: evidencia de que Astro genera una página indexable, accesible y coherente con el schema.

- [ ] **Step 1: Ejecutar el build completo**

Run:

```bash
npm run build
```

Expected: exit code 0; Astro genera `dist/cuidados/lenguaje-corporal-gatos/index.html`; los scripts de imágenes, sitemap y CSP terminan correctamente.

- [ ] **Step 2: Verificar límites de título, meta y canonical**

Run:

```bash
node -e "const fs=require('fs');const h=fs.readFileSync('dist/cuidados/lenguaje-corporal-gatos/index.html','utf8');const get=r=>(h.match(r)||[])[1]||'';const title=get(/<title>([^<]+)/);const meta=get(/<meta name=\"description\" content=\"([^\"]+)/);const canonical=get(/<link rel=\"canonical\" href=\"([^\"]+)/);console.log({titleLength:[...title].length,metaLength:[...meta].length,canonical});if([...title].length>60||[...meta].length>155||canonical!=='https://patasyhogar.com/cuidados/lenguaje-corporal-gatos/')process.exit(1)"
```

Expected: título 48, meta 142 y canonical exacto.

- [ ] **Step 3: Verificar schema, FAQs, autor y breadcrumb**

Run:

```bash
rg -o '"@type":"(Article|BreadcrumbList|FAQPage|Question|Answer|Person)"' dist/cuidados/lenguaje-corporal-gatos/index.html
```

Expected: `Article`, `BreadcrumbList`, `FAQPage`, `Question`, `Answer` y `Person`; cinco Questions y cinco Answers.

- [ ] **Step 4: Verificar GEO, indexabilidad y ausencia de afiliación**

Run:

```bash
rg '<h2[^>]*>¿' dist/cuidados/lenguaje-corporal-gatos/index.html
```

Expected: al menos `¿Cómo interpretar...` y `¿Cuándo puede indicar...`.

Run:

```bash
rg -n 'noindex|nofollow|Transparencia:' dist/cuidados/lenguaje-corporal-gatos/index.html
```

Expected: cero coincidencias. Si una fuente externa recibe `nofollow` automáticamente por el layout, confirmar que no existe `noindex` ni disclaimer y documentar ese comportamiento sin modificar el layout.

- [ ] **Step 5: Verificar hero, Open Graph y archivo físico**

Run:

```bash
rg -o '(<meta property="og:image"[^>]+>|<img[^>]+lenguaje-corporal-gatos[^>]+>)' dist/cuidados/lenguaje-corporal-gatos/index.html
```

Expected: OG image y hero apuntan a la imagen nueva; el `img` contiene `alt`, `width` y `height`.

Run:

```bash
test -s public/images/articulos/lenguaje-corporal-gatos.webp
```

Expected: exit code 0.

- [ ] **Step 6: Verificar los seis enlaces salientes y tres entrantes**

Run:

```bash
rg -o 'href="/(cuidados|hogar|alimentacion|higiene|paseo|juguetes)/[^"]+' dist/cuidados/lenguaje-corporal-gatos/index.html | sort -u
```

Expected: aparecen los seis destinos definidos en Task 2. Confirmar además en los HTML construidos del pilar, S11 y estrés que existe `href="/cuidados/lenguaje-corporal-gatos/"`.

- [ ] **Step 7: Repetir la auditoría editorial sobre el HTML real**

Comprobar manualmente:

- respuesta directa en las primeras 1-2 frases;
- tabla legible y sin celdas vacías;
- cinco FAQs con respuestas autónomas;
- ninguna repetición extensa de sueño, estrés o mordiscos;
- referencias externas visibles y correctas;
- castellano de España;
- ningún marcador de borrador, texto provisional o instrucción editorial.

Si falla cualquier punto, corregir el archivo fuente, volver a ejecutar `npm run build` y repetir Steps 2-7.

- [ ] **Step 8: Cerrar changelog y revisar el diff**

Actualizar la línea de verificación del changelog con el resultado real del build y la ruta generada.

Run:

```bash
git diff --check
```

Expected: exit code 0.

Run:

```bash
git status --short
```

Revisar que solo los archivos previstos de este plan se hayan añadido o modificado, además de cambios ajenos que ya existían. No hacer commit ni push.
