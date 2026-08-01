# S8 Cuántas horas duerme un perro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear la guía informativa S8 sobre cuánto duerme un perro según su edad, con enfoque híbrido prudente, fuentes verificables, enlazado interno y estado `human-review`.

**Architecture:** El artículo será una página MDX estática dentro de la colección existente. Responderá primero con orientaciones habituales por edad y explicará después por qué los estudios no respaldan una cifra universal. Los rangos, el sueño nocturno y el triage veterinario se presentarán en bloques autónomos para lectores, snippets y AI Overview.

**Tech Stack:** Astro 5, MDX content collections, Markdown, YAML, Pexels downloader, CSS/layout existentes.

**Spec:** `docs/brief-s8-cuantas-horas-duerme-perro.md`

**Control de versiones:** No crear commits ni hacer push salvo petición explícita del usuario.

---

## File Structure

- Create: `src/content/articulos/cuantas-horas-duerme-perro.mdx` — artículo informativo y FAQ.
- Create: `public/images/articulos/cuantas-horas-duerme-perro.webp` — imagen hero 800x400 optimizada por el script de Pexels.
- Modify: `src/content/articulos/guia-completa-salud-bienestar-perros.mdx` — enlace del pillar hacia la nueva guía y matiz de sus cifras rígidas.
- Modify: `src/content/articulos/cachorro-primeras-semanas-casa.mdx` — enlace contextual desde la sección de sueño del cachorro.
- Modify: `src/content/articulos/guia-completa-hogar-seguro-mascotas.mdx` — matiz y enlace desde la sección de descanso.
- Modify: `src/content/articulos/mejor-cama-perro-guia.mdx` — matiz y enlace desde la introducción sobre horas de descanso.
- Modify: `.seo-engine/data/content-map.yaml` — registro completo del nuevo artículo.
- Modify: `.seo-engine/data/content-queue.yaml` — `q_030` pasa de `planned` a `human-review`.
- Modify: `.seo-engine/data/seo-keywords.csv` — mapear la keyword al slug y actualizar estado.
- Modify: `.seo-engine/data/topic-clusters.yaml` — registrar `blog_slug` y estado dentro de salud canina.
- Modify: `.seo-engine/logs/changelog.md` — documentar creación, fuentes y validación.
- Modify: `docs/PLAN_EDITORIAL_v7.md` — marcar S8 como creada en revisión humana.

### Task 1: Crear la imagen específica del artículo

**Files:**
- Create: `public/images/articulos/cuantas-horas-duerme-perro.webp`

- [ ] **Step 1: Listar candidatos de Pexels**

Run:

```bash
node scripts/pexels-download.mjs "sleeping dog couch home" --list
```

Expected: lista de hasta diez fotografías apaisadas con identificador, fotógrafo y descripción.

- [ ] **Step 2: Revisar la primera foto**

Comprobar que la foto de índice 0 muestra un perro dormido o descansando de forma natural en un sofá, cama o suelo de una vivienda. Rechazarla si es un retrato mirando a cámara, una imagen de estudio, un cachorro posando o una escena donde no se perciba descanso.

- [ ] **Step 3: Descargar el candidato elegido**

Si la foto cumple el criterio, ejecutar:

```bash
node scripts/pexels-download.mjs "sleeping dog couch home" cuantas-horas-duerme-perro --index=0
```

Si no lo cumple, usar esta búsqueda alternativa exacta y descargar su índice 0 después de revisarlo:

```bash
node scripts/pexels-download.mjs "dog sleeping sofa indoors" --list
node scripts/pexels-download.mjs "dog sleeping sofa indoors" cuantas-horas-duerme-perro --index=0
```

Expected: `public/images/articulos/cuantas-horas-duerme-perro.webp`, máximo 800 px de ancho.

- [ ] **Step 4: Comprobar dimensiones y duplicados**

Run:

```bash
identify public/images/articulos/cuantas-horas-duerme-perro.webp
md5sum public/images/articulos/*.webp | sort | uniq -w32 -d
```

Expected: la imagen nueva es WebP, tiene 800 px o menos de ancho y su hash no aparece duplicado.

### Task 2: Redactar el artículo MDX

**Files:**
- Create: `src/content/articulos/cuantas-horas-duerme-perro.mdx`

- [ ] **Step 1: Crear el frontmatter definitivo**

Usar exactamente estos campos base:

```yaml
---
titulo: "Cuántas horas duerme un perro según su edad"
descripcion: "Cuántas horas duerme un perro según su edad, cuánto descansa por la noche y qué cambios en el sueño justifican consultar al veterinario."
categoria: hogar
animal: perro
tipo: informativo
fecha: 2026-08-03
imagen: /images/articulos/cuantas-horas-duerme-perro.webp
imagenAlt: "Perro dormido en un sofá dentro de casa"
destacado: false
tags: ["cuántas horas duerme un perro", "cuánto duerme un perro", "sueño perros", "perro duerme mucho", "sueño cachorro", "perro senior"]
faqs:
  - pregunta: "¿Cuántas horas seguidas duerme un perro por la noche?"
    respuesta: "Un perro adulto suele concentrar la parte más larga de su descanso durante la noche, pero no todos duermen ocho horas seguidas. Puede despertarse, cambiar de sitio y volver a dormir. La edad, la rutina de la casa, el ruido y la necesidad de salir influyen más que una cifra fija."
  - pregunta: "¿Es normal que mi perro duerma todo el día?"
    respuesta: "Puede ser normal si es cachorro, senior o ha tenido más actividad de la habitual y, al despertarse, come, juega y se mueve como siempre. Pide valoración veterinaria si el aumento es repentino o aparece junto con falta de apetito, dolor, dificultad para levantarse, desorientación o poco interés por lo que antes le gustaba."
  - pregunta: "¿Cuánto duerme un cachorro de 2 meses?"
    respuesta: "Los cachorros de dos meses alternan periodos cortos de actividad con muchas siestas. Las guías suelen hablar de hasta 18 o 20 horas de descanso, aunque la investigación objetiva en cachorros tan pequeños es limitada y a menudo se mezcla sueño con reposo. Lo importante es que pueda dormir sin interrupciones y se muestre activo cuando está despierto."
  - pregunta: "¿Cuántas horas duerme un perro mayor?"
    respuesta: "No existe una cifra universal para perros mayores. Es habitual que aumente el descanso diurno y que el sueño nocturno se fragmente. Si además se desorienta, pasea por casa de noche, no reconoce espacios o cambia su relación contigo, consulta al veterinario para descartar dolor o deterioro cognitivo."
  - pregunta: "¿Debo despertar a mi perro si duerme mucho?"
    respuesta: "No hace falta despertarlo solo para que cumpla un horario. Déjalo descansar si respira con normalidad y responde al ruido o al contacto suave. Si cuesta mucho despertarlo, parece débil, respira con esfuerzo o no puede levantarse, necesita atención veterinaria."
  - pregunta: "¿Cómo sé si está dormido o solo descansando?"
    respuesta: "Un perro que descansa puede permanecer quieto con los ojos abiertos o reaccionar enseguida a cualquier sonido. Durante el sueño suele cerrar los ojos, relajar más el cuerpo y responder menos al entorno; en fase REM puede mover las patas, los ojos o el hocico. Esta diferencia explica por qué las estimaciones de horas varían tanto entre estudios."
---
```

- [ ] **Step 2: Escribir la respuesta directa y la tabla temprana**

Las primeras 40-60 palabras deben:

- Responder con las orientaciones divulgativas: cachorro hasta 18-20 h de descanso, adulto 12-14 h y senior 14-18 h.
- Incluir en la misma pantalla que no son objetivos clínicos ni límites universales.
- Dar prioridad al cambio respecto al patrón habitual y al estado del perro cuando está despierto.

La tabla debe tener estas columnas:

```markdown
| Etapa | Orientación habitual | Cómo se reparte | Qué conviene observar |
|---|---:|---|---|
| Cachorro de 2-3 meses | Hasta 18-20 h de descanso | Muchas siestas y despertares | Que tenga energía, apetito y pueda dormir sin interrupciones |
| Cachorro de 4-12 meses | El total suele bajar gradualmente | Más sueño nocturno y menos siestas | Cambios bruscos, irritabilidad o dificultad para relajarse |
| Adulto | 12-14 h como orientación divulgativa | Noche más varias siestas | Su patrón habitual, actividad y respuesta al despertar |
| Senior | 14-18 h como orientación divulgativa | Más sueño diurno y posible fragmentación nocturna | Dolor, desorientación, inquietud nocturna o menor interacción |
```

Añadir inmediatamente una nota: estas cifras mezclan a menudo sueño y reposo; no sirven para diagnosticar.

- [ ] **Step 3: Desarrollar la estructura aprobada**

Usar estos encabezados y cubrir cada requisito:

```markdown
## Cuántas horas duerme un perro según su edad
### Cachorro de 2 a 3 meses
### Cachorro de 4 a 12 meses
### Perro adulto
### Perro senior
## ¿Cuántas horas duerme un perro por la noche?
## Por qué las cifras cambian tanto de una fuente a otra
## ¿Por qué los perros duermen tanto?
## Factores que cambian sus horas de sueño
## Mi perro duerme mucho: cuándo puede ser normal
## Cuándo consultar al veterinario por un cambio de sueño
## Cómo ayudar a tu perro a descansar mejor
```

Requisitos de contenido:

- Diferenciar sueño fisiológico, somnolencia y reposo quieto.
- Citar a Kinsman et al. para 16 semanas/12 meses y a Lucas et al. para sueño frente a somnolencia.
- Citar a Woods et al. al explicar variabilidad y ritmo nocturno.
- Citar a Takeuchi y Harada al hablar de sueño diurno y vigilia nocturna en perros muy mayores.
- Incluir factores: edad, actividad, entorno, rutina, temperatura, dolor, medicación y estado de salud.
- Explicar que mover las patas o el hocico durante REM suele ser normal; no diagnosticar convulsiones desde el texto.
- Evitar cifras por raza sin evidencia sólida.
- No usar anécdotas de Kira, Mango o Laura.

- [ ] **Step 4: Escribir el bloque de triage veterinario**

Organizarlo en tres niveles:

1. **Observar el patrón:** duerme más tras actividad o calor, pero despierta con normalidad, come y mantiene interés.
2. **Pedir cita:** cambio repentino, no quiere jugar, dificultad para levantarse, dolor, inquietud nocturna, desorientación o cambio de interacción.
3. **Urgencias:** dificultad respiratoria, encías azuladas o muy pálidas, colapso, debilidad extrema, dolor intenso o incapacidad para levantarse.

Enlazar Merck y Cornell en las afirmaciones de urgencia. No inventar fronteras como “más de 15 horas”.

- [ ] **Step 5: Añadir enlaces internos en contexto**

El artículo debe enlazar una vez, con anchors naturales, a:

```text
/cuidados/guia-completa-salud-bienestar-perros/
/cuidados/cachorro-primeras-semanas-casa/
/cuidados/cuanto-ejercicio-necesita-perro/
/cuidados/juegos-con-perros/
/cuidados/por-que-perro-ladra-noche/
/cuidados/golpe-calor-perros/
/hogar/mejor-cama-perro-guia/
```

- [ ] **Step 6: Comprobar extensión y límites SEO**

Run:

```bash
node -e "const fs=require('fs'); const s=fs.readFileSync('src/content/articulos/cuantas-horas-duerme-perro.mdx','utf8'); const body=s.replace(/^---[\s\S]*?---/,'').replace(/<[^>]+>/g,' '); console.log('palabras',body.trim().split(/\s+/).length)"
```

Expected: entre 2.000 y 2.500 palabras, sin relleno.

Run:

```bash
node -e "const title='Cuántas horas duerme un perro según su edad'; const meta='Cuántas horas duerme un perro según su edad, cuánto descansa por la noche y qué cambios en el sueño justifican consultar al veterinario.'; console.log([...title].length,[...meta].length)"
```

Expected: `43 136`.

### Task 3: Crear enlazado bidireccional y coherencia interna

**Files:**
- Modify: `src/content/articulos/guia-completa-salud-bienestar-perros.mdx:73-75`
- Modify: `src/content/articulos/cachorro-primeras-semanas-casa.mdx:208-231`
- Modify: `src/content/articulos/guia-completa-hogar-seguro-mascotas.mdx:103-105`
- Modify: `src/content/articulos/mejor-cama-perro-guia.mdx:43`

- [ ] **Step 1: Enlazar desde el pillar de salud**

Reescribir el inicio de `### Descanso` para que diga, con enlace contextual:

```markdown
Como orientación general, muchas guías sitúan el descanso de un adulto en 12-14 horas diarias y el de un cachorro en hasta 18-20, aunque estas cifras suelen mezclar sueño y reposo. En la guía sobre [cuántas horas duerme un perro según su edad](/cuidados/cuantas-horas-duerme-perro/) explicamos qué se ha medido en estudios y qué cambios sí justifican consultar al veterinario.
```

Eliminar la anécdota de Kira que aparece en ese mismo párrafo para no reforzar experiencia ficticia.

- [ ] **Step 2: Enlazar desde la guía del cachorro**

Mantener la orientación para ocho semanas, pero añadir al final del primer párrafo:

```markdown
Estas cifras son orientativas y suelen incluir tiempo de reposo. Si quieres ver cómo cambia el patrón durante el primer año y qué han medido los estudios, consulta la guía de [horas de sueño del perro según su edad](/cuidados/cuantas-horas-duerme-perro/).
```

- [ ] **Step 3: Matizar el pillar de hogar**

Reescribir la primera frase de `## Descanso: camas, mantas y dónde dormir`:

```markdown
El descanso no es negociable, pero no existe un número idéntico para todos. Las orientaciones habituales hablan de 12-14 horas para un perro adulto y 14-16 para un gato; en la práctica importan la edad, la actividad y los cambios respecto a su rutina. Puedes ampliar la parte canina en nuestra guía sobre [cuánto duerme un perro](/cuidados/cuantas-horas-duerme-perro/).
```

- [ ] **Step 4: Matizar la introducción de camas**

Sustituir la afirmación rígida inicial por:

```markdown
Los perros pasan una parte considerable del día dormidos o descansando. Las guías suelen hablar de 12-14 horas en adultos y más tiempo en cachorros y senior, pero el total cambia según qué se considere sueño, la edad y la actividad. En nuestra guía sobre [cuántas horas duerme un perro](/cuidados/cuantas-horas-duerme-perro/) explicamos esos matices.
```

- [ ] **Step 5: Verificar enlaces y ausencia de slug inventado**

Run:

```bash
rg -n "cuantas-horas-duerme-perro" src/content/articulos
```

Expected: una mención en el artículo nuevo y enlaces entrantes desde los cuatro artículos modificados.

### Task 4: Actualizar el SEO Content Engine y el calendario

**Files:**
- Modify: `.seo-engine/data/content-map.yaml`
- Modify: `.seo-engine/data/content-queue.yaml`
- Modify: `.seo-engine/data/seo-keywords.csv`
- Modify: `.seo-engine/data/topic-clusters.yaml`
- Modify: `.seo-engine/logs/changelog.md`
- Modify: `docs/PLAN_EDITORIAL_v7.md`

- [ ] **Step 1: Añadir el artículo a content-map**

Añadir una entrada con:

```yaml
- slug: cuantas-horas-duerme-perro
  title: "Cuántas horas duerme un perro según su edad"
  file_path: src/content/articulos/cuantas-horas-duerme-perro.mdx
  status: human-review
  published_date: '2026-08-03'
  last_updated: ''
  blog_type: guide
  content_type: informativo
  cluster_id: tc_salud_comportamiento_perros
  is_pillar: false
  target_keywords:
  - keyword: "cuántas horas duerme un perro"
    search_volume: 210
    is_primary: true
  - keyword: "porque mi perro duerme mucho"
    search_volume: 90
    is_primary: false
  - keyword: "cuánto duerme un perro"
    search_volume: 40
    is_primary: false
  internal_links_out:
  - guia-completa-salud-bienestar-perros
  - cachorro-primeras-semanas-casa
  - cuanto-ejercicio-necesita-perro
  - juegos-con-perros
  - por-que-perro-ladra-noche
  - golpe-calor-perros
  - mejor-cama-perro-guia
  internal_links_from:
  - guia-completa-salud-bienestar-perros
  - cachorro-primeras-semanas-casa
  - guia-completa-hogar-seguro-mascotas
  - mejor-cama-perro-guia
  has_eeat_signals: true
  notes: "Plan v7.1 S8. SERP real 2026-08-01. Enfoque híbrido prudente: rangos divulgativos como orientación, estudios sobre sueño/reposo y triage veterinario respaldado por Merck y Cornell. Sin anécdotas ficticias."
  needs_update_reason: ''
```

Añadir `word_count` con el entero exacto impreso en Task 2, Step 6. No usar una estimación.

- [ ] **Step 2: Actualizar q_030**

En `.seo-engine/data/content-queue.yaml`:

- Cambiar `status: "planned"` a `status: "human-review"`.
- Sustituir `estimated_word_count` por `actual_word_count` y usar el entero exacto impreso en Task 2, Step 6.
- Mantener `serp_analyzed: true` y el cannibalization check.

- [ ] **Step 3: Mapear keyword y cluster**

En `.seo-engine/data/seo-keywords.csv`, para `cuántas horas duerme un perro`:

- Escribir `cuantas-horas-duerme-perro` en `mapped_blog_slugs`.
- Cambiar `status` de `planned` a `human-review`.

En `.seo-engine/data/topic-clusters.yaml`:

- Cambiar el estado de la página a `human-review`.
- Escribir `blog_slug: "cuantas-horas-duerme-perro"`.

- [ ] **Step 4: Actualizar plan editorial y changelog**

En `docs/PLAN_EDITORIAL_v7.md`, marcar S8 como:

```text
[x] creado 2026-08-01, human-review
```

En `.seo-engine/logs/changelog.md`, añadir una entrada fechada 2026-08-01 con archivos, recuento real, fuentes, imagen y resultado del build.

### Task 5: Auditar humanización, precisión y build

**Files:**
- Review: `src/content/articulos/cuantas-horas-duerme-perro.mdx`
- Review: todos los archivos modificados en Tasks 1-4

- [ ] **Step 1: Hacer auditoría anti-IA**

Buscar y corregir:

- Introducción formulaica o que tarde en responder.
- Repetición de “es importante”, “clave”, “fundamental” o “sin duda”.
- Párrafos con tres ideas perfectamente simétricas.
- H2 seguido de una frase que solo repita el encabezado.
- Abuso de negritas, listas o contrastes “no es X, es Y”.
- Afirmaciones vagas atribuidas a “los expertos” o “los veterinarios”.
- Cualquier anécdota atribuida a Kira, Mango o Laura.

Hacer una segunda pasada con la pregunta: “¿Qué hace que esto suene escrito por IA?”. Corregir cualquier ritmo demasiado uniforme, cierres genéricos o frases ensambladas.

- [ ] **Step 2: Verificar castellano de España y fuentes**

Run:

```bash
rg -n "\b(auto|carro|vos|tenés|podés|michi|computadora)\b" src/content/articulos/cuantas-horas-duerme-perro.mdx
rg -n "Kira|Mango|Laura|18-20|12-14|14-18|15 horas|20 horas" src/content/articulos/cuantas-horas-duerme-perro.mdx
```

Expected: ningún latinismo; ninguna mascota ficticia; cada rango aparece como orientación y no como frontera médica.

- [ ] **Step 3: Verificar frontmatter, enlaces e imagen**

Run:

```bash
test -f public/images/articulos/cuantas-horas-duerme-perro.webp
test -f src/content/articulos/cuantas-horas-duerme-perro.mdx
rg -n "https://pmc.ncbi.nlm.nih.gov|https://pubmed.ncbi.nlm.nih.gov|merckvetmanual.com|vet.cornell.edu" src/content/articulos/cuantas-horas-duerme-perro.mdx
```

Expected: ambos archivos existen y el artículo contiene fuentes primarias/veterinarias verificables.

- [ ] **Step 4: Validar YAML, CSV y whitespace**

Run:

```bash
ruby -e "require 'yaml'; %w[.seo-engine/data/content-map.yaml .seo-engine/data/content-queue.yaml .seo-engine/data/topic-clusters.yaml].each { |f| YAML.safe_load_file(f, permitted_classes: [Date], aliases: true) }; puts 'YAML válido'"
git diff --check
```

Expected: YAML válido y ningún error de whitespace.

Validar también que todas las filas de `.seo-engine/data/seo-keywords.csv` conservan 17 columnas con el parser usado durante la investigación.

- [ ] **Step 5: Ejecutar el build completo**

Run:

```bash
npm run build
```

Expected: `astro build` termina con código 0, se genera `/cuidados/cuantas-horas-duerme-perro/` y `scripts/update-csp-hashes.mjs` finaliza sin errores.

- [ ] **Step 6: Revisar el diff final**

Run:

```bash
git status --short
```

Expected: solo cambios intencionados de S8 y actualizaciones relacionadas. No modificar ni revertir los cambios previos del usuario en archivos de tracking.
