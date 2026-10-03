# Brief S17: collares de adiestramiento para perros — opciones, riesgos y alternativas

- Investigación: 2026-10-03. Fecha objetivo del calendario: 2026-09-28 (semana en curso), conservada como planificación.
- Estado: **brief T1 completado**; pendiente T2 (MDX) y aprobación humana. Nada publicado, ningún commit generado.
- Tipo: híbrido guía + comparativa (`tipo: comparativa`, etiqueta del plan «Guia/Comp»); categoría paseo; animal perro; cluster `tc_paseo_perros`; pillar `guia-completa-paseo-viaje-perros` (`/cuidados/guia-completa-paseo-viaje-perros/`).
- Keyword principal: `collares adiestramiento perros` (2900, dato histórico del plan). Slug: `collares-adiestramiento-perros`. URL objetivo: `/paseo/collares-adiestramiento-perros`. Extensión prevista: 2.200-2.600 palabras útiles.
- Restricción dura del plan (`docs/PLAN_EDITORIAL_v7.md:176`): cubrir **solo** collar martingale, collar de cabeza y collar de vibración. Los dispositivos eléctricos, de impulsos, de descarga o de choque **no aparecen como producto, comparación ni ejemplo enlazado en ninguna parte** (ni en este brief, ni en el MDX, ni en imágenes o alt text). Ver «Decisiones de registro» en §2.

## 1. Contexto y objetivo

El lector busca «collares de adiestramiento» y la SERP en español está dominada por tiendas que venden sobre todo dispositivos de impulsos y por comparativas comerciales. El objetivo de S17 es cubrir la intención real —elegir una herramienta de adiestramiento o control— desde seguridad y bienestar animal: qué tipos existen, para qué sirve cada uno, qué riesgos entrañan (incluida la vibración, que no es inocua por defecto) y qué alternativas de refuerzo positivo existen antes de comprar nada.

Ángulo único frente a la SERP: **«opciones, riesgos y alternativas» con evidencia veterinaria y de bienestar, sin promocionar herramientas aversivas**. No es un listicle «los 10 mejores» ni una comparativa de precios.

E-E-A-T: el ángulo es seguridad y bienestar animal con fuentes veterinarias, asociaciones de comportamiento y literatura revisada por pares. Sin anécdotas personales inventadas de Mango/Kira sobre adiestramiento con collares (restricción de la feature).

## 2. SERP observada (2026-10-03)

Método: Playwright MCP (Chromium real con perfil separado y Keyword Surfer instalado), `hl=es&gl=es`, conforme a `reference_serp_playwright.md` y `feedback-serp-playwright-mcp.md`. Las páginas indican «Los resultados están personalizados» (ubicación Rubí, sesión de Google iniciada); no se manipularon cuentas ni controles. Son búsquedas observadas, no una clasificación anónima garantizada para toda España. Los errores de consola no bloquearon la lectura.

**Decisiones de registro:** los títulos y URLs se recogen literalmente por exigencia de aceptación de T1. Los módulos cuyo contenido son dispositivos eléctricos/impulsos (Shopping, Tiendas, parte de Imágenes) se describen como observación de mercado **sin registrar fichas, precios ni destinos de esos productos**, porque quedan fuera de alcance del artículo. Las consultas de «Otras personas también buscan» se transcriben como texto de demanda observada, sin enlaces, marcadas como «no cubrir».

### 2.1 Principal: `collares adiestramiento perros`

Consulta: https://www.google.com/search?q=collares+adiestramiento+perros&hl=es&gl=es

Resultados orgánicos independientes en orden observado (excluyendo módulos de Shopping/Tiendas/Imágenes):

| Orden | Título observado (literal) | URL | Dominio |
| --- | --- | --- | --- |
| 1 | Comprar Collares de Adiestramiento para Perros | https://www.decathlon.es/es/deportes/caza/collares-de-adiestramiento | decathlon.es |
| 2 | COLLARES ADIESTRAMIENTO PERROS 21€ AL MEJOR ... | https://www.collar-adiestramiento.es/ | collar-adiestramiento.es |
| 3 | Collar Adiestramiento Perros | https://www.amazon.es/collar-adiestramiento-perros/s?k=collar+adiestramiento+perros | amazon.es |
| 4 | El mejor collar de entrenamiento para perros: tipos, usos y ... | https://www.kiwoko.com/blogmundoanimal/descubre-cuales-son-los-mejores-collares-de-entrenamiento-para-perros/ | kiwoko.com |
| 5 | Collares de adiestramiento para perros | https://www.zonak9.es/collares-para-perros/adiestramiento.html | zonak9.es |
| 6 | Collar adiestramiento perros usados | https://www.milanuncios.com/anuncios/collar-adiestramiento-perros-usados.htm | milanuncios.com |
| 7 | Me podéis aconsejar un collar de adiestramientos para ... | https://forocoches.com/foro/showthread.php?t=9491214 | forocoches.com |
| 8 | Collares adiestramiento perros: control y comodidad | https://www.leroymerlin.es/productos/jardin-y-terraza/productos-para-mascotas-y-animales/perros/collares-arneses-y-correas-para-perros/collares-para-perros/collares-adiestramiento-perros-p.html | leroymerlin.es |

Notas de la SERP:
- La URL de Kiwoko se observó con parámetro `?srsltid=...`; la URL limpia es la indicada. Fecha visible en el resultado: 16 oct 2025. Es el único competidor puramente editorial de la primera página: su enfoque es «mejores collares…, cómo elegir y cómo usarlos». **Hueco para S17: ningún resultado cubre riesgos + alternativas con evidencia ni un ángulo ético explícito.**
- Módulos adicionales observados (no orgánicos): «Sitios de comparación» (Google Shopping) y «Tiendas», poblados mayoritariamente por dispositivos de impulsos (marcas tipo Canicom/Dogtrace visible en el módulo) **→ excluidos del alcance; sin fichas ni destinos registrados**. Fragmentos comerciales observados hablan de «impulsos electroestáticos»; ese contenido no se traslada al artículo.
- Módulo «Imágenes»: resultados de tiendas y marketplace (Amazon, collar-adiestramiento.es, todoparatumascota.eu) **→ excluidos del alcance de producto**; no se usarán esas imágenes.

**AI Overview / «Vista creada con IA»: NO OBSERVADO** en esta consulta (comprobado con `browser_find` sobre «Vista creada con IA» y revisión del snapshot completo). No hay gista que resumir.

**PAA («Otras preguntas de los usuarios»): NO OBSERVADO** en ninguna de las dos consultas (comprobado con `browser_find` sobre «preguntas de los usuarios»). Las 4 FAQs del artículo se redactan, por tanto, desde intención y búsquedas relacionadas, **no desde PAA literal** (ver §7).

**Relacionadas** (módulo «Otras personas también buscan», transcritas como texto de consulta):
- «Collar de adiestramiento para perros con descarga eléctrica» — **consulta observada; NO CUBRIR** (fuera de alcance por restricción ética/legal de la feature).
- «Son legales los collares de adiestramiento para perros» — **cubrir** con marco legal prudente (ver §5, fila 8, y §9, decisión 5).
- «Collares Adiestramiento Perros Amazon» — transaccional; se sirve con la tabla comparativa.
- «Los 10 mejores collares de adiestramiento para perros» — transaccional; **no adoptar formato listicle de 10**; el artículo es guía + comparativa corta de 3 tipos.
- «Collares Adiestramiento perros caza» — contexto cinegético; **no cubrir** (uso profesional excluido también del ámbito de la Ley 7/2023; ver §5).
- «Collares adiestramiento perros Decathlon» — transaccional; sin implicación editorial.

**Keyword Surfer: no inyectó panel de volumen en la SERP** (comprobado con `browser_find` sobre «Keyword Surfer»). Volumen utilizado: **2900**, histórico del plan (`docs/PLAN_EDITORIAL_v7.md:45` y nota 176, que además registra variantes `collar adiestramiento perro` 2900 y `collar perro adiestramiento` 2900). KD: no disponible; no se inventa.

### 2.2 Variante de confirmación de intención: `collar adiestramiento perro`

Consulta: https://www.google.com/search?q=collar+adiestramiento+perro&hl=es&gl=es

| Orden | Título observado (literal) | URL | Dominio |
| --- | --- | --- | --- |
| 1 | Comprar Collares de Adiestramiento para Perros | https://www.decathlon.es/es/deportes/caza/collares-de-adiestramiento | decathlon.es |
| 2 | COLLARES ADIESTRAMIENTO PERROS 21€ AL MEJOR ... | https://www.collar-adiestramiento.es/ | collar-adiestramiento.es |
| 3 | Collar Adiestramiento Perros | https://www.amazon.es/collar-adiestramiento-perros/s?k=collar+adiestramiento+perros | amazon.es |
| 4 | El mejor collar de entrenamiento para perros: tipos, usos y ... | https://www.kiwoko.com/blogmundoanimal/descubre-cuales-son-los-mejores-collares-de-entrenamiento-para-perros/ | kiwoko.com |
| 5 | Collares de adiestramiento para perros | https://www.zonak9.es/collares-para-perros/adiestramiento.html | zonak9.es |
| 6 | Me podéis aconsejar un collar de adiestramientos para ... | https://forocoches.com/foro/showthread.php?t=9491214 | forocoches.com |
| 7 | Collares adiestramiento perros: control y comodidad | https://www.leroymerlin.es/productos/jardin-y-terraza/productos-para-mascotas-y-animales/perros/collares-arneses-y-correas-para-perros/collares-para-perros/collares-adiestramiento-perros-p.html | leroymerlin.es |
| 8 | Collares, arneses y correas para mascotas | https://www.mediamarkt.es/es/category/collares-arneses-y-correas-102620.html | mediamarkt.es |

Misma composición que la principal (tiendas + marketplace + un blog + foro): **intención transaccional dominante con hueco informacional/ético**, idéntica para singular y plural. No AI Overview, no PAA. Relacionadas observadas: «Collar adiestramiento perros con descarga eléctrica» (NO CUBRIR), «Collar adiestramiento perro grande», «Collar Adiestramiento Perros Amazon», «Collar adiestramiento perros Decathlon», «Collar adiestramiento perros Leroy Merlin», «Collar adiestramiento perros metal» (esta última sugiere demanda de collares metálicos/ahogo → **NO CUBRIR como producto**; entra en el marco de riesgos solo como categoría prohibida por la ley, ver §5). Keyword Surfer tampoco inyectó volumen aquí.

**Lectura de intención (una línea):** transaccional-dominante («comprar collar de adiestramiento») con un vacío claro de contenido informativo fiable sobre riesgos, marco legal y alternativas de refuerzo positivo — exactamente el ángulo de S17.

## 3. Ángulo editorial

1. **Encuadre:** el artículo decide *cuándo una herramienta es apropiada y cuándo no*, no «cuál comprar». La comparativa existe para documentar los tres tipos autorizados con productos reales, no para empujar la compra.
2. **Prohibición explícita y su porqué:** no se mencionan, comparan, enlazan ni ilustran dispositivos eléctricos, de impulsos, de descarga o de choque. Motivos: (a) instrucción expresa del plan por ética y posible regulación (`PLAN_EDITORIAL_v7.md:176` y decisiones de la feature); (b) la Ley 7/2023 prohíbe en España el uso de herramientas de manejo que puedan causar lesiones, «en particular collares eléctricos, de impulsos, de castigo o de ahogo» (art. 27.ñ, texto literal verificado, ver §5); (c) las posiciones veterinarias y de bienestar revisadas documentan riesgos de miedo, agresión y dolor sin ventaja de eficacia frente al refuerzo positivo (ver §5).
3. **La vibración no es neutra por defecto:** el collar de vibración se cubre porque el plan lo exige, pero con reservas explícitas: se usa como estímulo aversivo para suprimir conducta y puede provocar susto, estrés o evitación; no es un sustituto del adiestramiento ni una opción «inocua». Sin promesas de eficacia ni cifras inventadas.
4. **Alternativas primero:** antes de cualquier herramienta, refuerzo positivo, gestión del entorno, arnés adecuado y valoración profesional (educador canino con formación en refuerzo positivo / veterinario comportamentalista). Los tirones se tratan en profundidad en `mejor-arnes-antitirones-perro`; aquí se resume y se enlaza.
5. **Voz:** cercana y prudente, español peninsular. Sin anécdotas de Mango/Kira sobre adiestramiento. Sin afirmar experiencia clínica del autor. Todo claim material con fuente (§5).

## 4. Productos verificados

Estado de verificación honesto. **Bloqueador conocido:** `node scripts/amazon-api.mjs --search "..."` devolvió para las tres búsquedas («collar martingale perro», «collar de cabeza perro adiestramiento», «collar vibracion perro sin descarga») el error `❌ Your account does not currently meet the eligibility requirements. / Necesitas 10+ ventas cualificadas en los últimos 30 días. / Razón: AssociateNotEligible`. Por tanto **ningún precio, imagen ni disponibilidad está verificado vía API**. Los títulos y ASINs se han verificado por fetch directo de la página `/dp/` de Amazon el 2026-10-03 (título literal del `<title>`). Conforme a `feedback-products.md`, precio e imagen hay que pedírselos al usuario antes de escribir el MDX.

**Actualización 2026-10-03 (T1b, verificación por navegador):** los precios e imágenes **ya están verificados** mediante Playwright sobre las fichas renderizadas. El bloqueo de la API de Amazon se mantuvo, pero el navegador sí expuso los valores. Los datos finales y el veredicto del collar de vibración están en **§11**, que es lo que debe usar T2. La tabla de §4 queda como registro histórico del estado «NO VERIFICADO».

### 4.1 Collar martingale

| Campo | Candidato A (Amazon) | Candidato B (Tiendanimal) |
| --- | --- | --- |
| Nombre (título exacto) | Dazzber - Collar martingale para perro, antitirones, antifuga, resistente, para perros medianos y grandes, ajustable de 43,2-63,5 cm, rojo (Auspicious Cloud) | Collar para perros Martingale antitirones y antiescape |
| Tipo | martingale (limit-slip, antifuga) | martingale (limit-slip, antifuga) |
| ASIN | `B07YHPD8Z4` | — (ref. Tiendanimal `MRK000005780`) |
| URL Amazon | `/dp/B07YHPD8Z4` | — |
| URL Tiendanimal | — | https://www.tiendanimal.es/collar-para-perros-martingale-antitirones-y-antiescape/MRK000005780_M.html |
| Precio observado | NO VERIFICADO | NO VERIFICADO |
| Imagen | NO VERIFICADO | NO VERIFICADO (además, CSP no permite hotlink de Tiendanimal: descargar a `public/images/productos/` si se usa) |
| Estado de verificación | PARCIAL: título↔ASIN verificados por fetch de `https://www.amazon.es/dp/B07YHPD8Z4` (2026-10-03). Precio/imagen NO VERIFICADOS (API `AssociateNotEligible`) | PARCIAL: URL resuelve y título confirmado por fetch (2026-10-03). Precio NO VERIFICADO (HTML renderizado por JS; no extraíble del fetch) |
| Fuente/comando | `node scripts/amazon-api.mjs --search "collar martingale perro"` (falló) → búsqueda `site:amazon.es collar martingale perro antitirones` + fetch de la ficha | búsqueda `site:tiendanimal.es collar martingale perro` + fetch de la ficha |

Nota: la variante `B07YHCFS8J` (Dazzber, talla menor) aparece en la misma búsqueda; no se usa salvo que el usuario prefiera una segunda talla.

### 4.2 Collar de cabeza (head collar / headcollar antitirones)

| Campo | Candidato A (Amazon) | Candidato B (Tiendanimal) |
| --- | --- | --- |
| Nombre (título exacto) | Collar Ronzal HALTI - Para evitar que tu perro tire de la correa, Ajustable y Ligero, con banda de nariz acolchada. Adiestramiento canino antitirones collar para perros medianos (Talla 3, Negro) | Halti Optifit collar antitirones negro para perros |
| Tipo | collar de cabeza (ronzal/headcollar) | collar de cabeza (headcollar) |
| ASIN | `B004XNLCPC` | — (ref. Tiendanimal `COA12420A`) |
| URL Amazon | `/dp/B004XNLCPC` | — |
| URL Tiendanimal | — | https://www.tiendanimal.es/halti-optifit-collar-antitirones-negro-para-perros/COA12420A_M.html |
| Precio observado | NO VERIFICADO | NO VERIFICADO |
| Imagen | NO VERIFICADO | NO VERIFICADO (mismo límite CSP) |
| Estado de verificación | PARCIAL: título↔ASIN verificados por fetch de `https://www.amazon.es/dp/B004XNLCPC` (2026-10-03). Precio/imagen NO VERIFICADOS | PARCIAL: URL resuelve y título confirmado por fetch (2026-10-03). Precio NO VERIFICADO |
| Fuente/comando | `node scripts/amazon-api.mjs --search "collar de cabeza perro adiestramiento"` (falló) → búsqueda `site:amazon.es "collar de cabeza" perro Halti Gentle Leader adiestramiento` + fetch | búsqueda `site:tiendanimal.es halti collar de cabeza perro` + fetch |

Alternativas observadas y descartadas por ahora: `B081R1XK7V` (paquete HALTI collar de cabeza + correa) y `B0002H3ZLM` (PetSafe Gentle Leader) — candidatos válidos si el usuario prefiere otra marca; ninguno verificado en precio/imagen.

### 4.3 Collar de vibración

| Campo | Candidato A (Amazon) | Candidato B (Tiendanimal) |
| --- | --- | --- |
| Nombre (título exacto) | STAALGUARD Collar de Adiestramiento para Perros, Sin Descarga Eléctrica, 9 Niveles, Sonido, Vibración y Boost, Alcance 3000m, Recargable, Autonomía 30 Días, Impermeable IP67, para Todos los Perros | — |
| Tipo | collar de vibración/sonido a distancia (el título declara «Sin Descarga Eléctrica») | — |
| ASIN | `B0D8414Q3X` | — |
| URL Amazon | `/dp/B0D8414Q3X` | — |
| URL Tiendanimal | — | NO VERIFICADO / sin candidato apto |
| Precio observado | NO VERIFICADO | — |
| Imagen | NO VERIFICADO (aparecen URLs `hiRes` en la ficha pero sin atribución confirmada a la imagen principal; pedir al usuario) | — |
| Estado de verificación | PARCIAL: título↔ASIN verificados por fetch de `https://www.amazon.es/dp/B0D8414Q3X` (2026-10-03). **Verificación pendiente en T2: confirmar que el producto carece de función electrostática antes de incluirlo; si existe duda, se sustituye o el tipo se publica sin producto.** | — |
| Fuente/comando | `node scripts/amazon-api.mjs --search "collar vibracion perro sin descarga"` (falló) → búsqueda `site:amazon.es collar vibración perro sin descarga entrenamiento` + fetch | búsquedas `site:tiendanimal.es collar vibración perro adiestramiento` y variantes |

Tiendanimal: los resultados para «collar de vibración» incluyen sistemas de adiestramiento con estimulación electrostática → **excluidos por restricción ética/legal**. El «Bark Collar Antiladridos» (`MRK000219429`, sonido/vibración) existe, pero es un collar antiladridos y solapa con `collar-antiladridos-perros` → **no usar** (ver §6). Se deja constancia: **no hay candidato de vibración apto en Tiendanimal en esta investigación**.

**Resumen de estado:** 6 candidatos registrados (3 tipos × 2 tiendas, menos vibración/Tiendanimal). **Títulos y ASINs/refs verificados: 5** (3 Amazon por fetch de ficha, 2 Tiendanimal por fetch de ficha). **Precios: 0 verificados. Imágenes: 0 verificadas.** Todo lo no verificado está marcado `NO VERIFICADO`; nada se ha estimado ni rellenado.

## 5. Evidencia de riesgos y alternativas (ledger de fuentes)

Consulta de todas las fuentes: 2026-10-03. «Verificado» = soporte documental recuperado (fetch o extracto literal), no revisión veterinaria del artículo. Estado por fila según el nivel de acceso real.

| Afirmación | Fuente (URL) | Acceso | Estado y límites |
| --- | --- | --- | --- |
| AVSAB no apoya el uso de aversivos en ningún contexto (collares electrónicos, de pinchos, de ahogo, tirones de correa y otras formas de castigo físico o psicológico); solo métodos basados en recompensa; los métodos aversivos implican riesgos significativos para el bienestar y el vínculo, y el refuerzo positivo es más seguro y más eficaz | https://avsab.org/resources/position-statements/ (Declaración de la Junta 2025 + Position Statement on Humane Dog Training 2021) | Fetch 2026-10-03, texto literal | **Verificado.** No citar el documento antiguo retirado que la propia AVSAB menciona |
| El entrenamiento basado en aversivos compromete el bienestar del perro de compañía dentro y fuera del contexto de entrenamiento (más conductas de estrés, mayor cortisol post-sesión, sesgo cognitivo más pesimista); a mayor proporción de aversivos, peor bienestar | Vieira de Castro et al., 2020, PLoS ONE 15(12):e0225023 — https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0225023 | Abstract literal leído en buscador (coincide con PubMed 33326450); página no fetchada | **Verificado (abstract).** Citar el DOI; no extrapolar cifras ni tamaños muestrales más allá del abstract |
| Revisión de 17 estudios: sin evidencia de que el castigo positivo sea más eficaz que el refuerzo positivo; los métodos aversivos pueden comprometer la salud física y mental (estrés, respuestas emocionales condicionadas, vínculo deteriorado, mayor riesgo de agresión) | Ziv, 2017, J Vet Behav 19:50-60 — https://doi.org/10.1016/j.jveb.2017.02.004 | Extractos de buscador (resúmenes); texto completo de pago, no leído | **Incierto hasta leer el texto.** T2 debe confirmar la cita antes de redactar con ella |
| Uso de dispositivos electrónicos de entrenamiento: consecuencias en bienestar y eficacia comparada (estudio de campo encargado por DEFRA) | Cooper et al., 2014, PLoS ONE 9(8):e102722 — https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0102722 / https://pmc.ncbi.nlm.nih.gov/articles/PMC4153538/ | Extracto de buscador; artículo no leído completo | **Parcial.** Solo como contexto de la categoría excluida; el artículo S17 no lo usará para describir ni enlazar esos dispositivos |
| El collar de cabeza reduce los tirones y no altera la marcha, pero se asocia a señales conductuales de estrés, intentos de quitárselo y rechazo a andar; puede aumentar la presión sobre hocico/nariz; un ajuste inadecuado restringe la apertura de la boca o permite que el perro se lo saque. Los martingales y otros dispositivos que actúan tensando pueden percibirse como aversivos; falta investigación. Algunos perros tiran con fuerzas superiores al 80% de su peso corporal con collar | «Review of Collars, Harnesses, and Head Collars for Walking Dogs», Animals 2025 (MDPI) — https://pmc.ncbi.nlm.nih.gov/articles/PMC12345489/ | Extractos literales amplios leídos en buscador (incluida la tabla beneficios/inconvenientes); artículo completo no fetchado | **Parcial → verificar texto completo en T2 antes de citar datos concretos** (p. ej. el 80%) |
| Con collar de cabeza no se debe tirar nunca de la correa: puede causar lesión cervical | VCA Animal Hospitals, «Head Halter Training for Dogs» — https://vcahospitals.com/know-your-pet/head-halter-training-for-dogs | Extracto literal en buscador | **Parcial.** Regla de seguridad utilizable; fetch en T2 |
| La presión sobre el cuello mediante collar eleva significativamente la presión intraocular; con arnés no | Pauli et al., 2006, J Am Anim Hosp Assoc 42:207-211 — https://pubmed.ncbi.nlm.nih.gov/16611932/ | Abstract literal en buscador (PubMed) | **Parcial.** Uso prudente: documenta el riesgo de la presión de collar, no una recomendación clínica |
| Marco legal español: «Se prohíbe el uso de cualquier herramienta de manejo que pueda causar lesiones al animal, en particular collares eléctricos, de impulsos, de castigo o de ahogo» | Ley 7/2023, art. 27.ñ — https://www.boe.es/buscar/act.php?id=BOE-A-2023-7936 | Fetch 2026-10-03 del texto consolidado; cita literal comprobada | **Verificado.** Matices: la ley excluye de su ámbito (art. 1.3.e) animales de actividades específicas (p. ej. perros de caza, pastores); el texto consolidado del BOE es informativo. No presentar como asesoramiento jurídico; nada sobre sanciones sin fuente |
| Posición veterinaria británica: el uso de collares de descarga para castigar o controlar está abierto a abuso y causa problemas de bienestar y de adiestramiento | BVA, «Electric shock collars and training aids» — https://www.bva.co.uk/take-action/our-policies/electric-shock-collars-and-training-aids/ | Extracto en buscador; página no fetchada | **Parcial.** Contexto de posición institucional; fetch en T2 si se cita |
| Declaración del American College of Veterinary Behaviorists (2 dic 2025): los collares electrónicos implican riesgos de miedo, agresión, dolor y daño duradero sin ventaja de eficacia frente al refuerzo positivo; cita literatura revisada por pares y prohibiciones en varios países | https://www.dacvb.org/page/Shock_Collar_Position_Statement | El fetch devuelve un PDF que la herramienta no parsea; contenido tomado del extracto de búsqueda | **Incierto.** No citar hasta leer el documento |
| El collar martingale (limit-slip) se usa como seguridad antifuga en lebreles y perros de cabeza estrecha; no es 100% a prueba de escapes; con presión fuerte o constante hay riesgo de daño traqueal | Whole Dog Journal (guía con prueba de producto, fuente editorial/comercial) — https://www.whole-dog-journal.com/lifestyle/the-5-best-dog-martingale-collars-for-escape-artist-pups/ | Extracto en buscador | **Incierto/comercial.** Usar solo para el uso general; T2 debe buscar fuente primaria (etología/veterinaria) para el uso en lebreles y los límites del martingale |
| Los collares de vibración no son inocuos por defecto: se emplean como estímulo aversivo para suprimir conducta y cualquier dispositivo que incomode puede percibirse como aversivo | **Opinión editorial razonada** apoyada en Ziv 2017 (estímulos aversivos en general) y en la revisión Animals 2025 («any device could be potentially aversive if it is perceived by the dog as uncomfortable») | — | **No verificado como afirmación empírica específica de vibración.** No se ha localizado estudio primario sobre collares solo-vibración; redactar con esa cautela (ver §9, decisión 4) |

**Límites declarados:** sin datos de prevalencia, sin cifras de eficacia de productos, sin plazos de «corrección» de conductas, sin citas de expertos atribuidas que no estén en las fuentes de la tabla. No hay soporte para comparar marcas entre sí en eficacia.

## 6. Límite de alcance / anti-canibalización

Lectura de los primeros ~45 líneas (frontmatter + intro) de cada artículo existente, 2026-10-03:

| Artículo | URL | Qué cubre ya | Límite para S17 |
| --- | --- | --- | --- |
| `collar-antiladridos-perros.mdx` (comparativa, 2026-03-20) | /paseo/collar-antiladridos-perros/ | Ladridos excesivos: causas, collares antiladridos sin descargas (vibración, ultrasonido, spray de citronela), TopPick MASBRILL, FAQs de crueldad/edad/eficacia | **No tratar ladridos ni collares antiladridos.** El «collar de vibración» de S17 es de adiestramiento a distancia, no antiladridos: delimitarlo expresamente para no solapar. Una frase + enlace |
| `mejor-arnes-antitirones-perro.mdx` (comparativa, 2026-03-25) | /paseo/mejor-arnes-antitirones-perro/ | Por qué los perros tiran, arneses de enganche frontal, TopPick PetSafe Easy Walk, FAQ «¿Arnés antitirones o collar de cabeza tipo Halti?» y daños del collar convencional (tráquea, tiroides, cervicales) | **No repetir la comparativa arnés vs collar de cabeza ni la anatomía del tirón.** S17 profundiza en el collar de cabeza como herramienta (uso, habituación, riesgos) y enlaza al artículo de arneses |
| `mejor-arnes-perro.mdx` (comparativa, 2026-04-01) | /paseo/mejor-arnes-perro/ | Arnés vs collar genérico, tipos, ajuste, seguridad en coche, TopPick Julius-K9, FAQs de talla/uso continuado | **No rehacer «arnés o collar» ni guía de tallas.** Máximo una frase con enlace |
| `mejor-correa-perro.mdx` (comparativa, 2026-04-02) | /paseo/mejor-correa-perro/ | Tipos de correa, ley de correas, longitudes, extensibles, correa de adiestramiento, TopPick Ruffwear Roamer | **No cubrir correas** (solo mención mínima si se nombra la correa junto al martingale, con enlace) |
| `como-socializar-cachorro.mdx` (informativo, 2026-04-08) | /cuidados/como-socializar-cachorro/ | Periodo crítico de socialización, experiencias clave, errores, AVSAB sobre socialización | **No tratar socialización ni cachorros.** Frase de cautela («en cachorros, ninguna herramienta aversiva») + enlace si procede |

**S17 NO cubrirá:** ladridos ni collares antiladridos; comparativas de arneses ni de correas; guías de talla o ajuste de arnés; socialización o educación de cachorros; dispositivos eléctricos/impulsos/ahogo/pinchos en ningún formato; uso cinegético o profesional; normativa autonómica municipal de paseo (vive en `mejor-correa-perro`); programas de modificación de conducta completos (derivar a profesional).

**S17 SÍ cubrirá:** tipos de collar de adiestramiento (martingale, cabeza, vibración), cuándo es apropiado cada uno y cuándo no, riesgos físicos y de bienestar con evidencia, marco legal mínimo verificado y alternativas de refuerzo positivo con enlaces internos.

## 7. Propuesta de estructura

Keyword `collares adiestramiento perros` en título, primera frase, un H2, descripción y slug. Título ≤60 y descripción ≤155 caracteres (a ajustar en T2).

1. Intro (respuesta directa): qué es un collar de adiestramiento, qué tres tipos tienen sentido y cuál es la regla — la herramienta no sustituye al adiestramiento.
2. H2 (keyword exacta): **Collares de adiestramiento para perros: las tres opciones que merece la pena conocer** — mapa de tipos + para quién.
3. H2: **Collar martingale: seguridad antifuga, no una herramienta de castigo** — cuándo (lebreles, cuellos estrechos, perros que se sacan el collar), cuándo no, ajuste y límites (fuente §5).
4. H2: **Collar de cabeza: control del tirón con reservas** — cómo funciona, habituación progresiva, cuándo es apropiado (perros grandes/muy fuertes tras valorar el arnés), cuándo no (estrés, negativas, tirón brusco de la correa) (fuentes §5: revisión Animals 2025, VCA).
5. H2: **Collar de vibración: no es una opción neutra** — qué hace, por qué no es inocuo por defecto, cuándo se podría valorar y con qué garantías, y qué no hace (no educa solo).
6. H2: **Riesgos de los collares de adiestramiento que casi nadie te cuenta** — cuello/tráquea/presión intraocular, estrés y miedo, mal uso, falsa eficacia (fuentes §5).
7. H2 (pregunta): **¿Son legales los collares de adiestramiento para perros en España?** — respuesta con Ley 7/2023 art. 27.ñ y matices, redactada sin nombrar ni describir dispositivos fuera de alcance (ver §9, decisión 5).
8. H2: **Alternativas antes de comprar: refuerzo positivo y cuándo pedir ayuda** — gestión, arnés antitirones (enlace), educación canina, derivación profesional.
9. H2: **Cómo elegir y usar el collar sin dañar a tu perro** — checklist corta de compra/uso; aquí va la `ComparisonTable` (los enlaces de tienda solo en la tabla).
10. 4 FAQs (frontmatter), redactadas desde intención y relacionadas porque **no hubo PAA observado**:
    - ¿Son legales los collares de adiestramiento para perros? (desde relacionadas; respuesta con marco legal verificado, sin producto).
    - ¿Qué puedo usar si mi perro tira de la correa? (respuesta: arnés antitirones + refuerzo positivo; enlace a `mejor-arnes-antitirones-perro`).
    - ¿Los collares de vibración son seguros para los perros? (respuesta: no son inocuos por defecto; reservas y alternativas).
    - ¿Cuándo conviene un collar martingale y cuándo un collar de cabeza? (respuesta: según el problema — escape vs tirón — y siempre con habituación; nunca como castigo).

## 8. Enlaces internos previstos

Salientes (obligatorios los dos primeros por `PLAN_EDITORIAL_v7.md:176`):

| Destino | Motivo | Tratamiento |
| --- | --- | --- |
| /paseo/collar-antiladridos-perros/ | Mandado por el plan; delimita ladridos vs adiestramiento | 1-2 frases + enlace; sin repetir tipos de antiladridos |
| /paseo/mejor-arnes-antitirones-perro/ | Mandado por el plan; alternativa principal al tirón | Resumen de 1-2 frases + enlace; sin repetir su FAQ arnés vs Halti |
| /paseo/mejor-arnes-perro/ | Alternativa de equipo de paseo | 1 enlace contextual |
| /paseo/mejor-correa-perro/ | Correa junto al martingale | 1 enlace contextual |
| /cuidados/como-socializar-cachorro/ | Cautela con cachorros y herramientas aversivas | 1 enlace contextual opcional |
| /cuidados/guia-completa-paseo-viaje-perros/ | Pillar del cluster `tc_paseo_perros` | 1-2 enlaces (cluster → pillar) |

Entrantes propuestos (solo enlaces internos de ida y vuelta, única modificación permitida en artículos existentes):
- `mejor-arnes-antitirones-perro` → su FAQ «¿Arnés antitirones o collar de cabeza tipo Halti?» enlaza a S17.
- `collar-antiladridos-perros` → en el «antes de comprar nada», enlace a S17 como guía de herramientas de adiestramiento.
- `mejor-arnes-perro` y/o `mejor-correa-perro` → 1 enlace en el texto de equipo de paseo.
- Pillar `guia-completa-paseo-viaje-perros` → lista de artículos del cluster.

## 9. Gaps y decisiones pendientes (para el humano)

**Resolución 2026-10-03:** los puntos **1, 3, 4, 5 y 6 quedan resueltos en §11** tras la verificación por navegador y las decisiones del usuario. El **punto 2 se cierra sin PAA observado** (las FAQs de §7 son propias, aceptado). El **punto 3 se cierra usando el volumen 2900 del plan**. El **punto 7 se cierra excluyendo DACVB y Ziv 2017**: no se citan hasta verificar; T2 usa solo fuentes ya verificadas (AVSAB, Vieira de Castro 2020, BOE Ley 7/2023, revisión Animals 2025). Lo que sigue queda como constancia del proceso.

1. **Precios e imágenes de los 3 productos Amazon (y 2 de Tiendanimal): NO VERIFICADOS.** Bloqueo: `AssociateNotEligible` en `scripts/amazon-api.mjs`. Acción: pedir al usuario «¿Precio e imagen?» con los enlaces `/dp/B07YHPD8Z4`, `/dp/B004XNLCPC`, `/dp/B0D8414Q3X` (y las dos fichas de Tiendanimal). Las imágenes Amazon deben ser `m.media-amazon.com` y optimizarse a `_AC_SL300_`.
2. **PAA no observado** en las dos SERPs. Las FAQs de §7 son propias. Si el usuario exige PAA literal, hay que recapturar la SERP (posible variación por personalización/hora).
3. **Keyword Surfer no inyectó volumen.** Se usa 2900 del plan (histórico). KD no disponible. Confirmar el volumen con el usuario si quiere dato fresco.
4. **No existe fuente primaria sobre collares solo-vibración** (búsqueda realizada; solo evidencia general de estímulos aversivos). Decisión: redactar el bloque de vibración como «no inocuo por defecto + falta de evidencia de inocuidad», sin afirmar efectos concretos no documentados. ¿Publicar el tipo con producto (STAALGUARD) o sin producto? El plan exige cubrir el tipo; propongo cubrirlo con el producto una vez confirmado que carece de función electrostática.
5. **Pregunta legal vs prohibición de contenido eléctrico.** La relacionada «Son legales los collares de adiestramiento para perros» exige tocar el marco legal, pero la feature prohíbe contenido sobre dispositivos eléctricos. Propuesta: responder citando solo el art. 27.ñ («herramientas de manejo que puedan causar lesiones al animal») y el enlace al BOE, sin nombrar, describir ni enlazar dispositivos concretos. **Requiere visto bueno del usuario.**
6. **Tiendanimal: sin candidato de vibración apto** y precios no extraíbles (JS). ¿Se acepta la tabla con 4 filas (martingale y cabeza × 2 tiendas) más el STAALGUARD solo-Amazon, o se busca un segundo producto de vibración?
7. **DACVB (PDF no parseado) y Ziv 2017 (texto de pago) sin leer.** No citar hasta verificar; si el usuario lo desea, T2 puede pedirle los PDFs o usar solo las fuentes ya verificadas (AVSAB, Vieira de Castro, BOE, revisión Animals 2025).

## 10. Comprobaciones ejecutadas (T1)

- `node scripts/amazon-api.mjs --help` → error exacto: `❌ No se encontraron ASINs válidos en los argumentos` (el script no implementa `--help` y trata los argumentos como ASINs). No se ha modificado el script. Las tres búsquedas `--search` → `AssociateNotEligible` (ver §4).
- URLs escritas en este brief y su estado de acceso: **fetch directo** (verificado hoy) — SERPs de Google (2, capturadas con Playwright), fichas Amazon `/dp/B07YHPD8Z4`, `/dp/B004XNLCPC`, `/dp/B0D8414Q3X`, fichas Tiendanimal `MRK000005780` y `COA12420A`, AVSAB position-statements, BOE Ley 7/2023. **Solo observadas en resultados de búsqueda (sin fetch o fetch fallido)** — PLoS ONE (Vieira de Castro y Cooper), DOI Ziv 2017, PMC12345489 (Animals 2025), VCA, PubMed Pauli 2006, BVA, Whole Dog Journal, DACVB (PDF no parseable) — todas marcadas como «parcial» o «incierto» en §5; T2 debe fetchearlas antes de citar.
- Escrituras: únicamente `docs/brief-s17-collares-adiestramiento.md`. `git status --short` al cierre: solo este archivo (más artefactos automáticos del MCP de Playwright en `.playwright-mcp/`, sin versionar). Sin commits, builds, descargas de imágenes ni toques a `.seo-engine/`, `PRODUCTOS.md` ni MDX.

## 11. Datos verificados (T1b, 2026-10-03) — usar estos en T2

Verificación read-only con Playwright sobre las fichas renderizadas. Ninguna página devolvió CAPTCHA ni muro. Nada estimado: los valores son los mostrados en pantalla el 2026-10-03.

### 11.1 Selección definitiva (decisión Grupo 4 del usuario: tres filas, una por tipo)

| Tipo | Producto seleccionado | Precio verificado | Imagen (`_AC_SL300_`) | Tienda alternativa |
| --- | --- | --- | --- | --- |
| Collar martingale | Dazzber — Collar martingale antitirones/antifuga, ajustable 43,2-63,5 cm, rojo | `24,11€` | `https://m.media-amazon.com/images/I/81x-4XkVkvL._AC_SL300_.jpg` | Tiendanimal `MRK000005780` — `20.00€` talla 30-40 cm × 4 cm (`24.00€` talla 30-50 cm × 5 cm) |
| Collar de cabeza | Collar Ronzal HALTI — antitirones, banda de nariz acolchada, talla 3 negro | `17,99€` (tachado `21,99€`, «Precio recomendado», −18%) | `https://m.media-amazon.com/images/I/81qCBuEmmML._AC_SL300_.jpg` | Tiendanimal `COA12420A` (Halti Optifit) — `27.09€` talla S (`24.09€` M, `22.99€` L) |
| Collar de vibración | STAALGUARD — Collar de adiestramiento, sonido/vibración, 9 niveles, 3000 m, IP67 | `39,99€` | `https://m.media-amazon.com/images/I/81ZCf+sxcJL._AC_SL300_.jpg` | sin candidato apto en Tiendanimal |

ASINs: `B07YHPD8Z4`, `B004XNLCPC`, `B0D8414Q3X`. URLs de enlace en forma `/dp/ASIN`, **nunca** con `?tag=`.

Imágenes crudas en forma base `https://m.media-amazon.com/images/I/<id>.jpg`: `81x-4XkVkvL`, `81qCBuEmmML`, `81ZCf+sxcJL`. Todas en `m.media-amazon.com` → **compatibles con la CSP**.

Imágenes de Tiendanimal (`dw/image/v2/...`): **CSP-BLOQUEADO**. No se usan por hotlink. Si en el futuro se quiere ilustrar la tienda alternativa, hay que descargar a `public/images/productos/` en un paso separado y autorizado.

### 11.2 Veredicto ético — collar de vibración STAALGUARD `B0D8414Q3X`

**VERDICTO: `SIN-FUNCION-ELECTROSTATICA-CONFIRMADA`** — apto para incluir.

Evidencia literal (consultada 2026-10-03):
- Ficha `https://www.amazon.es/dp/B0D8414Q3X`, bullet: «3 MODOS AJUSTABLES: Sonido, Vibración y Boost de vibración. Adapte el adiestramiento de su perro de manera suave gracias a los modos ajustables en 9 niveles…»
- Mismo URL, bullet: «…con el collar STAALGUARD, sin choque eléctrico, respetando las nuevas regulaciones europeas.»
- Mismo URL, A+ de marca: «Sin descargas eléctricas, cada collar permite una educación suave…»
- Reseña con compra verificada (17 oct 2025, mismo URL): «No usa descarga eléctrica: trabaja con sonido y vibración…»
- Manual ST30-Pro (specs coincidentes: 3000 m, 9 niveles, IP67 collar / IP42 mando), `https://de.mans.io/files/viewer/3506676/3`: «Three training modes: warning sound (beep), vibration and Boost vibration.» «9 levels of vibration.» — sin modo electrostático.
- Escaneo de la página renderizada completa: **0 coincidencias** de `shock`, `impulso`, `estática`, `castigo`, `estimulación`, `púas`.

Gaps declarados (no cambian el veredicto, pero T2 no debe exagerar la certeza): el Q&A de Amazon.es no llegó a renderizar; el campo «Número de modelo» dice «1 Collier», de modo que el vínculo listing↔manual ST30-Pro es por coincidencia de especificaciones y no por modelo explícito; `staalguard.co` solo documenta el collar antiladridos.

Candidatos adicionales descartados/comprobados: `B081R1XK7V` (HALTI collar de cabeza + correa) y `B0002H3ZLM` (PetSafe Gentle Leader) — ambos puramente mecánicos (nailon/neopreno), 0 palabras clave eléctricas en ficha.

### 11.3 Decisiones del usuario (2026-10-03)

| Grupo | Decisión |
| --- | --- |
| 1 — precio e imagen | Verificar con Playwright en lugar de pedirlos. **Hecho**, ver §11.1 |
| 2 — FAQ legal | **Opción 1**: citar solo el art. 27.ñ de la Ley 7/2023 y enlazar al BOE, sin nombrar, describir ni enlazar ningún dispositivo concreto |
| 3 — collar de vibración | **Opción 1**: verificar antes de incluir. **Hecho**, ver §11.2 — se incluye |
| 4 — forma de la tabla | **Opción 1**: tres filas, una por tipo, con la mejor tienda verificada de cada uno |

### 11.4 Notas de formato para T2

- Precio de Amazon en formato coma decimal (`24,11€`); el de Tiendanimal se muestra con punto (`20.00€`) — normalizar a coma en texto editorial (`20,00€`).
- Amazon inyecta CSS en `<body>` y arrastra basura al leer `innerText`; el precio útil es `.apex-pricetopay-value .a-offscreen`.
- Cuidado con precios ajenos en la ficha: en el producto 3 aparece un widget relacionado con `35,00€`; el precio principal es `39,99€`. En el producto 1 aparece `6,03€`, que son plazos de pago (4 × 24,11€), no un precio tachado.
- Producto 1: «Sólo queda(n) 2 en stock.» — no citar como argumento de venta.
- Tiendanimal precios por talla. El banner «−15% > 79€ −10% EXTRA» es promoción, no precio tachado.
