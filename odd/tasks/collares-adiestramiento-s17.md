# S17: collares de adiestramiento para perros (híbrido guía + comparativa)

Ruta ODD, no SDD. Documento creado automáticamente antes de la primera escritura de fuente, siguiendo la plantilla de `odd/tasks/gato-agresivo-s16.md`.

## Objetivo

Publicar el artículo semanal S17 del plan editorial v7.1: «Collares de adiestramiento para perros: opciones, riesgos y alternativas», keyword `collares adiestramiento perros` (2900, Keyword Surfer), dentro del cluster `tc_paseo_perros`.

## Problema

Es una keyword de alto volumen (2900) sin cobertura propia. El contenido actual solo roza el tema desde `collar-antiladridos-perros` y `mejor-arnes-antitirones-perro`, que tratan dispositivos y arneses, no la elección de collar de adiestramiento. Existe riesgo real de canibalización y riesgo ético/regulatorio si se promocionan collares eléctricos.

## Por qué

- El plan (`docs/PLAN_EDITORIAL_v7.md:45`) calendariza S17 para la semana 2026-09-28→2026-10-04, que es la semana en curso (hoy 2026-10-03). Cadencia confirmada: mínimo un artículo nuevo por semana.
- Nota del plan (`docs/PLAN_EDITORIAL_v7.md:176`): «NO incluir collares electricos (etica + posible regulacion). Cubrir: collar martingale, collar de cabeza, collar vibracion. Enlaza a collar-antiladridos y arnes-antitirones existentes.»

## Decisiones de producto (autorizadas por el usuario el 2026-10-03)

1. **Formato híbrido guía + comparativa.** `tipo: comparativa`, `categoria: paseo`, `animal: perro`, URL `/paseo/collares-adiestramiento-perros`. Guía de fondo (tipos, riesgos, cuándo NO usarlos, alternativas con refuerzo positivo) más `ComparisonTable` con productos reales verificados. Etiqueta del plan «Guia/Comp».
2. **Hero con Pexels autorizado.** El usuario autoriza la clave configurada en `.env` vía `scripts/pexels-download.mjs`, igual que en S16.

## Alcance autorizado

### Autorizado

- `docs/brief-s17-collares-adiestramiento.md` (nuevo)
- `src/content/articulos/collares-adiestramiento-perros.mdx` (nuevo)
- `public/images/articulos/collares-adiestramiento-perros.webp` (nuevo, Pexels)
- `PRODUCTOS.md` — alta de los productos verificados
- `.seo-engine/data/content-map.yaml`, `content-queue.yaml`, `features.yaml`, `topic-clusters.yaml`, `seo-keywords.csv` — registro de S17
- `docs/PLAN_EDITORIAL_v7.md` — marcar S17 `[x]` al publicar
- `odd/tasks/collares-adiestramiento-s17.md` y su espejo Engram `odd/collares-adiestramiento-s17/tasks`

### No autorizado

- Collares eléctricos, de descarga o de choque en ningún formato (contenido, tabla, imagen, alt text).
- Modificar artículos existentes salvo enlaces internos de ida y vuelta estrictamente necesarios.
- Subir imágenes por scraping de Amazon.
- Publicar sin aprobación explícita del usuario. El artículo se detiene en `status: human-review`.
- `git push`, publicación o despliegue sin autorización explícita.

## Restricciones

- Idioma: español peninsular.
- Zooplus deshabilitado globalmente. Verificar Amazon con `scripts/amazon-api.mjs` y Tiendanimal individualmente. Ejecutar `npm run check:no-zooplus-public`.
- Densidad de afiliados: enlaces de compra solo en `ComparisonTable`. `TopPick` es editorial, sin enlaces de tienda. Ningún `AffiliateButton` directo en MDX. Ejecutar `npm run check:affiliate-density`.
- Nunca escribir `?tag=patasyhogar-21` en el MDX; usar `/dp/ASIN`.
- Nunca adivinar precios, URLs, imágenes, ASINs ni especificaciones.
- Humanización obligatoria antes de presentar texto publicable: skill `humanizer` + `.seo-engine/templates/humanization-guide.md`.
- Nunca editar hashes CSP a mano. `npm run build` siempre antes de `git push`.
- E-E-A-T: el ángulo es seguridad y bienestar animal, con fuentes veterinarias/asociaciones de comportamiento. Sin anécdotas personales inventadas de Mango/Kira sobre adiestramiento con collares.

## Checklist de tareas

### T1 — Investigación y brief (`docs/brief-s17-collares-adiestramiento.md`) — ruta delegada

- [ ] T1.1 SERP real en español con `playwright-browser` MCP (`google.com/search?q=collares+adiestramiento+perros&hl=es&gl=es`): AI Overview, top 5-10 resultados, PAA, relacionadas y volumen Keyword Surfer. Solo si el MCP falla, pedir el dato al usuario.
- [ ] T1.2 Verificación de productos reales: `scripts/amazon-api.mjs` para Amazon, búsqueda individual en Tiendanimal. Cubrir los tres tipos del plan: collar martingale, collar de cabeza y collar de vibración.
- [ ] T1.3 Fuentes de bienestar/veterinarias para el ángulo de riesgos y alternativas (refuerzo positivo). Separar claramente lo verificado de lo no verificado.
- [ ] T1.4 Check de canibalización explícito frente a `collar-antiladridos-perros`, `mejor-arnes-antitirones-perro`, `mejor-arnes-perro`, `mejor-correa-perro` y `como-socializar-cachorro`.
- [ ] T1.5 Ledger de fuentes: afirmación, URL, fecha de consulta, estado verificado/incierto.

**Aceptación T1:** títulos y URLs observadas literalmente, sin KD ni precios inventados; productos con ASIN/URL reales o marcados como no disponibles; sin duplicar el alcance de los artículos enlazados.

### T2 — Escritura del MDX y registro editorial — ruta delegada

- [ ] T2.1 Redactar `collares-adiestramiento-perros.mdx` (~2200-2600 palabras útiles), con H2 de pregunta, 4 FAQs, keyword en título/primera frase/un H2/descripción/slug, y enlaces internos de ida y vuelta.
- [ ] T2.2 Aplicar guía de humanización y pasada de auditoría «¿qué suena a IA?».
- [ ] T2.3 Hero Pexels verificado visualmente, con `imagen` e `imagenAlt` exactos.
- [ ] T2.4 Actualizar `PRODUCTOS.md` y los data files de `.seo-engine/`.
- [ ] T2.5 Dejar `status: human-review` en el flujo editorial.

**Aceptación T2:** frontmatter válido contra `src/content/config.ts`; sin collares eléctricos en ninguna parte; sin Zooplus; sin `?tag=`; sin `AffiliateButton` directo; título ≤60 y descripción ≤155 caracteres.

### T3 — Build, comprobaciones y revisión — ruta delegada (per-action)

- [ ] T3.1 `npm run build`
- [ ] T3.2 `npm run check:affiliate-density`
- [ ] T3.3 `npm run check:no-zooplus-public`
- [ ] T3.4 `git diff --check`
- [ ] T3.5 Revisar el HTML construido en `dist/` contra las 15 comprobaciones de `docs/agent-context/feedback/feedback-article-review-checklist.md`.
- [ ] T3.6 Una pasada editorial enfocada.

**Aceptación T3:** las cuatro comprobaciones pasan y las 15 comprobaciones de revisión del HTML construido se cumplen.

## Criterios de aceptación de la feature

1. Artículo publicable, en español peninsular, sin contenido de collares eléctricos ni de choque.
2. Datos de producto reales verificados; nada de precios, ASINs o URLs inventados.
3. Sin canibalización: el artículo enlaza a `collar-antiladridos-perros` y `mejor-arnes-antitirones-perro` sin repetir su alcance.
4. Build limpio y comprobaciones de afiliados/Zooplus en verde.
5. Estado final `human-review`; la publicación es decisión humana aparte.

## Comprobaciones aplicables

| Comprobación | Cuándo | Resultado observado |
| --- | --- | --- |
| `npm run build` | T3.1, tras cada mutación de contenido | pendiente |
| `npm run check:affiliate-density` | T3.2 | pendiente |
| `npm run check:no-zooplus-public` | T3.3 | pendiente |
| `git diff --check` | T3.4 | pendiente |
| Revisión de 15 puntos sobre `dist/` | T3.5 | pendiente |
| Test-first | no aplicable | Sin runner determinista para contenido MDX; la sustitución proporcional es el build, las comprobaciones de scripts y la revisión estructural/semántica del HTML construido |

## Estrategia de entrega

`single-pr` (una unidad de trabajo, un commit convencional sobre `main`, patrón establecido por S12-S16).

Previsión de líneas autorizadas (adiciones + borrados, sin generados): ~600-700. Supera el heurístico de ~400 porque un artículo es un artefacto único y coherente; partirlo en commits produciría slices ilegibles sin reducir el riesgo de revisión. Se explica y se continúa sin rework por tamaño.

## Estado RDD

`off` — decidido por configuración global (`gentle-ai review mode status`, leído 2026-10-03: `receipt-driven development: off (decided by global)`, clone-local `unset`). No iniciar ni solicitar RDD. La entrega sigue la política ordinaria del repositorio: commit convencional y `git push` solo con autorización explícita del usuario.

## Progreso

| Tarea | Estado | Evidencia | Commit |
| --- | --- | --- | --- |
| T1 Investigación y brief | **hecho** | `docs/brief-s17-collares-adiestramiento.md` (§1-§11). SERP real con Playwright el 2026-10-03 (2 consultas). 6 candidatos, 5 títulos↔ASIN verificados. Ledger de 12 fuentes. Límite anti-canibalización en §6. | — |
| T1b Verificación de datos | **hecho** | Precios e imágenes de los 5 productos verificados por navegador sobre fichas renderizadas (§11.1). Veredicto STAALGUARD `SIN-FUNCION-ELECTROSTATICA-CONFIRMADA` con evidencia literal y gaps declarados (§11.2). | — |
| T2 Escritura | **hecho** | `src/content/articulos/collares-adiestramiento-perros.mdx`, 2601 palabras. Título 58 car., descripción 148 car., 8 H2 (2 en pregunta), 4 FAQs, 5 tags. Sin `?tag=`, sin Zooplus, sin `AffiliateButton`, cero menciones a dispositivos eléctricos. Humanización aplicada. | — |
| T2b Imagen y registro | **hecho** | Hero Pexels 14945757 (Hope Pontifex), 39.514 bytes, 800px, verificado visualmente (perro atigrado con collar plano turquesa). `imagen`/`imagenAlt` en frontmatter. 3 productos en `PRODUCTOS.md`. Registro en `content-map`, `content-queue`, `features`, `topic-clusters`, `seo-keywords.csv` y `changelog.md`. YAML y CSV válidos (17 columnas, 191 filas). | — |
| T3 Build y comprobaciones | **hecho** | `npm run build` PASS (170 páginas, 13 hashes CSP) · `check:affiliate-density` PASS · `check:no-zooplus-public` PASS · `git diff --check` PASS. Revisión de 15 puntos sobre `dist/`: 14 PASS, 1 «FAIL» adjudicado como falso positivo. | — |
| Verificación independiente | **hecho** | Veredicto inicial `NEEDS FIXES` sobre `dist/`. Precios exactos frente a §11.1 (24,11€ / 17,99€ / 39,99€), specs coincidentes, cero términos prohibidos, cero Zooplus, las 3 imágenes responden HTTP 200, FAQ schema 4/4 idéntica al texto visible. 3 defectos señalados; 2 corregidos, 1 fuera de alcance. | — |
| Corrección acotada | **hecho** | Ver «Corrección aplicada» | — |

## Corrección aplicada (2026-10-03)

| Defecto | Acción | Verificación |
| --- | --- | --- |
| Marca HALTI en JSON-LD como `"Collar"` (el componente hacía `nombre.split(' ')[0]`) | Añadido `marca` explícito a los tres productos en el MDX | `"brand"` ahora `Dazzber` / `HALTI` / `STAALGUARD` |
| Typo «antitronces» en el nombre del HALTI | Corregido a «antitirones» en MDX, brief §11.1 y `PRODUCTOS.md` | `grep -c "antitronces"` → 0 en los tres archivos |

Tras la corrección: `npm run build` PASS (170 páginas, 13 hashes CSP) · `check:affiliate-density` PASS · `check:no-zooplus-public` PASS · `git diff --check` limpio.

## Hallazgos fuera del alcance de S17 (decisión humana)

Son comportamientos de componentes compartidos que afectan a las ~150 comparativas del sitio, no defectos introducidos por este artículo.

1. **`ComparisonTable.astro` afirma condiciones comerciales no verificadas en el JSON-LD** — `PRICE_VALID_UNTIL` (año+1) en `:45`, `hasMerchantReturnPolicy` con devolución gratuita de 30 días y compromisos de envío/manipulación en `:95-131`. Se emiten para todos los productos sin evidencia. Es un riesgo de exactitud en structured data. **Requiere decisión: corregir el componente (cambio transversal) o dejarlo como está.**
2. **Badge «Mejor opción»** — `ComparisonTable.astro:206`, hardcodeado para la primera fila. Contradice la tesis de este artículo («sin un ganador universal»).
3. **Dimensiones intrínsecas del hero** — `width="800" height="400"` con fuente real 800×533. Convención del layout para todos los artículos (`object-fit: cover`).
4. **Pillar `guia-completa-paseo-viaje-perros`** — `human-review` en `pillar-pages.md:11`, `published` en `topic-clusters.yaml:489`. Sin corregir.
5. **Enlaces entrantes/salientes del pillar** siguen pendientes.

## Adjudicación de los hallazgos de T3 (spot check de padre, contra el código)

| Hallazgo | Veredicto | Evidencia |
| --- | --- | --- |
| `?tag=` en el HTML construido (6 ocurrencias) | **Correcto por diseño** | `ComparisonTable.astro:24-25` añade `tag=${AMAZON_TAG}` automáticamente. La prohibición del proyecto afecta al MDX, que está limpio. |
| `rel="nofollow noopener noreferrer sponsored"` (check 9) | **Correcto por diseño** | `ComparisonTable.astro:247,269`. Es el tratamiento que Google exige para enlaces de afiliado. El grep del checklist falla igual en `mejor-arnes-perro` y `collar-antiladridos-perros` → defecto preexistente del checklist, no regresión de S17. |
| Imagen TopPick en `_AC_SL320_` en vez de `_AC_SL300_` | **Correcto por diseño** | `TopPick.astro:26-28` redimensiona a propósito (160px × retina 2x). Se escribe `_AC_SL300_` en el MDX y el componente normaliza. |
| Hero 800×400 con fuente 800×533 | **Consistente** | Markup idéntico al hero de `mejor-arnes-perro`; el layout recorta con `object-fit: cover`. |
| `validate-products.mjs` incompleto | **No bloqueante** | Timeout a los 120 s, 25/430 ASINs; no llegó a los de S17. Los productos ya están verificados en T1b. |

## Hallazgos abiertos para decisión humana

1. **Badge «Mejor opción» de la tabla comparativa** — viene de `ComparisonTable.astro:206`, hardcodeado para la primera fila y aplicable a las ~150 comparativas del sitio. Contradice la tesis del artículo («sin un ganador universal»). **Fuera del alcance de S17**: cambiarlo tocaría un componente compartido. El `TopPick` sí está correcto (`etiqueta="Solo para una necesidad antifuga"`).
2. **Marca del HALTI en JSON-LD** — aparece como `"Collar"`. Cosmético, en structured data.
3. **Inconsistencia de estado del pillar** — `docs/agent-rules/pillar-pages.md:11` lo marca `human-review`, `.seo-engine/data/topic-clusters.yaml:489` lo marca `published`. Detectado, no corregido.
4. **Enlaces entrantes/salientes del pillar** siguen pendientes.

## Estado de sincronización

- **Local: al día.** Este documento refleja el estado real.
- **Engram: al día.** Espejo `odd/collares-adiestramiento-s17/tasks` resincronizado el 2026-10-03 con el estado completo (hubo un hueco temporal tras un reinicio del servidor en el que el runtime no expuso Engram; ya recuperado).

## Siguiente paso

Verificación independiente del HTML construido. Después: informar al usuario y esperar su aprobación (el artículo queda en `human-review`, sin commit, sin push).
