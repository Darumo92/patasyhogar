---
name: Phase C Recovery Plan 2026-05-25
description: Plan ejecutable Phase C edición artículos prioritarios. Test case, herramientas, KPIs, escape hatch. Leer al iniciar trabajo Phase C el 2026-05-25.
type: project
originSessionId: 3c6128ab-e239-47e3-8e8c-2c52369ec2a6
---
# Phase C — Plan de Recuperación de Indexación

**Inicio:** 2026-05-25 (tras extensión Phase A)
**Test case:** `mejor-pienso-perro-raza-pequena`
**Cadencia:** 1 artículo/semana inicial. Re-eval semana 5 para decidir ramp a 2/sem.

## Diagnóstico raíz (2026-05-07)

Google rechazó 161 páginas por **calidad de contenido**, no técnico. Helpful Content System + SpamBrain detectaron "scaled content abuse":
- 100+ URLs `mejor-X` con plantilla idéntica
- Texto formulaico (IA detectable)
- 0 backlinks autoridad
- Trigger 04-12: cambios masivos tags/redirects → re-evaluación calidad

Pico histórico: 93 indexadas (04-13). Estado actual: 1 (homepage).

## Constraint mayor: Daniel Ruiz ficticio

No hay autor real verificable externamente. Implicación:
- Person schema sin sameAs creíble
- E-E-A-T propio = falso

**Solución:** autoridad por terceros. Cada artículo Phase C debe incluir:
- 2+ enlaces a fuentes veterinarias oficiales (AVMA, FECAVA, AVEPA, Colegios Veterinarios Madrid/Barcelona)
- 1+ cita textual de estudio veterinario con URL real
- 1+ link a documentación oficial fabricante (no marketing)
- Person schema: quitar pretensión de credenciales. "Editor de patasyhogar.com, dueño de mascotas" — no "experto"

## Plantilla obligatoria por artículo (8 cambios)

1. **Intro reescrita** (200-300 palabras): anécdota específica + dato concreto/auditables (ej: "tras analizar 47 piensos y leer 600 reseñas...")
2. **Sección "Lo que dicen los compradores reales"** (NUEVA, 400-500 palabras): patrones extraídos de 50-100 reseñas Amazon/Zooplus reales con porcentajes específicos
3. **Pros/contras asimétricos**: variar entre 2/4, 4/2, 5/1, 3/3 según producto real (no siempre 3/2)
4. **FAQs reales** (4-7) basadas en People Also Ask de Google (regla: usuario provee datos SERP, no Claude web search)
5. **Fotos AI consistentes** (2-3): Mango/Kira generados con Leonardo.ai
6. **Datos Amazon verificados** (regla CLAUDE.md): pedir precios + imágenes al usuario, 0 inventos
7. **Internal linking en cuerpo**: mínimo 3 enlaces contextuales (no solo footer), variar anchor text, enlazar a pillar
8. **Autoridad citada**: 2+ fuentes veterinarias + 1 estudio + 1 doc fabricante

## Herramienta AI fotos: Leonardo.ai (decisión 2026-05-07)

Razones tras estudio comparativo (Bing, Firefly, Ideogram, Krea, Leonardo, Fooocus, ComfyUI):
- 150 créditos/día gratis = sobrado para 2 art/sem
- Character Reference feature para consistencia Mango/Kira
- Flux Schnell model: realismo "snapshot móvil"
- 0 setup técnico

**Workflow:**
1. Sesión inicial 2h (ANTES 25-may): generar 1 imagen canónica Mango (gato naranja, marcas específicas) + 1 canónica Kira (mestiza beige)
2. Por artículo: subir canónica como Character Reference + prompt escena específica
3. Style prompt: "casual snapshot, iPhone photo, kitchen counter, natural daylight, slightly imperfect framing"
4. Avoid prompt: "professional, studio lighting, product photography, sharp focus"

Plan B si consistencia falla: Fooocus local (Mac M-series). Setup 2-3h.

## Test case y orden de ataque

### Tier 1 (impresiones reales, prioridad alta)
1. **mejor-pienso-perro-raza-pequena** (50 imp, pos 14-21) ← TEST CASE semana 1
2. mejor-pienso-cachorro-raza-grande (25 imp, query pos 9.69)
3. pipeta-antiparasitaria-gatos (22 imp, pos 8)
4. mejor-juguete-cachorro (14 imp, pos 7)
5-16. resto Tier 1 (impresiones 1-4)

### Tier 2 (recientes en patasyhogar-3, "calientes")
- mejor-rascador-gatos-guia, mejor-cepillo-gatos, mejor-cama-perro-guia,
  mejor-arnes-antitirones-perro, mejor-comedero-automatico-wifi-gatos,
  mejor-fuente-agua-gatos-silenciosa, mejor-gps-perro, mejor-cepillo-perro,
  mejor-arnes-perro, mejor-pienso-perro-esterilizado

### Tier 3 (pillars)
- guia-alimentacion-perros, guia-completa-alimentacion-gatos,
  guia-completa-higiene-grooming-perros, guia-completa-paseo-viaje-perros

## Cronograma ejecutable

### Phase A extendida (KPI no cumplido) — hasta 2026-05-25
- 0 commits absolutos
- Reddit 2-3 comentarios/día → karma target 50
- Última semana (15-20 may): setup Leonardo.ai + generar fotos canónicas Mango/Kira
- Pre-trabajo: listar 50 reseñas Amazon de piensos perros pequeños

### Phase C semanas 1-4 (25-may → 21-jun)
- Semana 1: mejor-pienso-perro-raza-pequena (test case)
- Semana 2: mejor-pienso-cachorro-raza-grande
- Semana 3: pipeta-antiparasitaria-gatos
- Semana 4: mejor-juguete-cachorro
- 1 commit/semana, máximo. 0 cambios entre commits (deja a Google reaccionar)

### Re-eval 1 — 2026-06-29 (semana 5)
- Decisión ramp 1→2/sem o ajustar estrategia (escape Nivel 1)

### Re-eval 2 — 2026-07-27 (semana 9, ~8 artículos editados)
- Si <2 reindexados Y 0 impresiones nuevas: pausa + análisis profundo (escape Nivel 2)
- Considerar pivot a contenido informativo puro o preparar rebrand en paralelo

### Re-eval 3 — 2026-08-31 (semana 14, ~12 artículos editados)
- Si <5 indexados Y tendencia plana/negativa: ejecutar rebrand (escape Nivel 3)
- Si ≥10 indexados: continuar + extender Phase C 6 sem más

## Escape hatch (3 niveles)

**Nivel 1 (06-29):** test case sin movimiento → aumentar agresividad diferenciación. NO rebrand.

**Nivel 2 (07-27):** <2 de 8 reindexados → pausar, analizar. Considerar:
- a) Pivot informativo puro (quitar afiliación de los 8)
- b) Preparar rebrand sin ejecutar

**Nivel 3 (08-31):** <5 de 12 reindexados → rebrand:
- Dominio nuevo (verificar disponibilidad)
- Migrar SOLO los 12 mejor editados con 301
- Resto: noindex en patasyhogar.com + cierre eventual
- Aprovechar Reddit karma acumulado

## Coste por artículo (5-6h)

- Leer 50-100 reseñas: 60-90 min
- Sintetizar reseñas: 30 min
- Reescribir intro: 30 min
- Pros/contras asimétricos: 30 min
- Investigar y citar fuentes vet: 45 min
- FAQs reales (usuario provee SERP): 30 min
- Verificar ASINs/precios: 30-60 min
- Generar 3 fotos AI: 20 min
- QA + commit: 30 min

## Reglas absolutas Phase C

- NO tocar `actualizadoEn` salvo cambio genuino mayor
- NO mover artículos entre categorías
- NO crear nuevas categorías ni redirects
- NO publicar artículos nuevos hasta tras Re-eval 3
- NO añadir features (recomendador, calculadoras)
- NO A/B test estructural
- 1 commit por artículo. Mensaje: descriptivo del cambio real
- Tras commit: 7 días sin tocar (ventana de evaluación Google)

## Reddit en paralelo

- Karma target arranque Phase C: 50
- Hasta karma 50: 0 links a patasyhogar
- Karma >50: primer link contextual SOLO a artículos ya pasados por Phase C edit
- Cuota: 2-3 comentarios/día + 1 post/sem
