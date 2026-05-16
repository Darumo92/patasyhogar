---
name: Plan Outreach Autoridad 2026-05-11 → 2026-11-11
description: Plan detallado canales aprobados outreach autoridad externa patasyhogar 6 meses. Cuotas, targets, KPIs, templates.
type: project
---

# Plan Outreach Autoridad — 6 meses

**Inicio:** 2026-05-11 (domingo)
**Re-eval final:** 2026-11-11

## Resumen ejecutivo

Pivot total tras evidencia: filtro Google = falta autoridad externa (no contenido ni autor). Ambos sitios David (patasyhogar ficticio + tuespaciodetrabajo real) sufren mismo blackout → variable común = dominio fresh sin backlinks pre-launch.

Único camino: construir señales externas mediante los canales aprobados, sin email outreach a 3ros.

## Canales — detalle por canal

### 1. Reddit nicho (mantener)

- **Usuario:** u/Pristine_Review5630
- **Subs:** r/mascotas, r/GatosArgentinos
- **Karma actual (2026-05-11):** comment=29, link=3, total=32
- **Cuota:** 2-3 comentarios/día + 1 post propio/sem
- **Reglas:**
  - Sin link a patasyhogar hasta karma >50
  - Mínimo 30-60 min entre comentarios
  - Anécdota Mango/Kira OK (no falsificable)
  - Subs distintos cada acción
  - Aplicar humanizer pre-publicación
- **Tracking:** `project_backlinks_social_status.md`

### 2. Reddit subs grandes ES (nuevo)

- **Subs target:** r/Spain, r/AskSpain, r/Madrid, r/Barcelona, r/Valencia (este último ya unido)
- **Cuota:** 2-3 posts/sem
- **Tipos post:**
  - Pregunta genuina lifestyle relacionada mascotas (ej: "¿cuánto cuesta vivir con perro en Madrid?")
  - Hilo experiencia ("Lo que aprendí adoptando un gato en piso pequeño")
  - Dato contraintuitivo (mover discusión)
- **Reglas:** mismo usuario u/Pristine_Review5630. Sin link hasta karma >50.

### 3. Quora ES

- **Acción setup hoy:** crear cuenta `es.quora.com`
- **Firma:** "Redacción Patas y Hogar" (NO David)
- **Bio cuenta:** "Comparativas y guías honestas sobre productos para perros y gatos · patasyhogar.com"
- **Cuota:** 3 respuestas largas/sem
- **Formato respuesta:**
  - 400-800 palabras
  - Apertura: ejemplo concreto o dato
  - Cuerpo: 3-4 puntos prácticos con detalle
  - Cierre: 1 link contextual a `patasyhogar.com/[slug]` SOLO si añade valor real
- **Ver:** `reference_quora_es_workflow.md`

### 4. Medium

- **Plataforma activa:** Medium
- **Cuota:** 1 artículo/sem
- **Formato:**
  - Versión adaptada (no copia) de artículo patasyhogar
  - Canonical tag → URL original patasyhogar (evita duplicate content)
  - Link contextual 2-3 a patasyhogar dentro cuerpo
- **Target temas:** informativos `/cuidados/` (no comparativas afiliadas — Medium hostil a affiliate)

### Canales descartados

- LinkedIn Articles: descartado por decisión del usuario el 2026-05-16.
- Comentarios en blogs: descartado por decisión del usuario el 2026-05-16.
- Foros: no proponer por defecto; solo retomarlos si el usuario lo pide explícitamente.

## Free tool — Calculadora coste mascotas

**Build:** semana 2 (2026-05-18 onwards)
**URL:** `/calculadora-coste-mascotas/`
**Spec mínimo:**
- Inputs: especie (perro/gato), tamaño (S/M/L), edad (cachorro/adulto/senior), ciudad (top 10 ES + "otra")
- Output: estimación mensual desglosada (pienso + veterinario + higiene + accesorios + seguro)
- Datos base: agregados de tus propios artículos coste mensual
- Schema: WebApplication + FAQPage
- Compartible: link directo con params (`?especie=perro&tamaño=L`)
- CTA salida: link a comparativas relevantes (pienso, seguro)

**Razón:** pieza linkable orgánica. Citable. Compartible Reddit/foros sin sonar promo. Sirve también en Bing/Pinterest.

## KPIs seguimiento mensual

| KPI | Meta mes 1 | Mes 3 | Mes 6 |
|---|---|---|---|
| Indexadas Google | 5 | 15 | 60 |
| Impresiones GSC/sem | 10 | 50 | 200 |
| Backlinks dofollow detectados | 2 | 8 | 20 |
| Brand mentions (Google "patasyhogar") | 5 | 25 | 80 |
| Reddit karma total | 60 | 150 | 300 |
| Quora respuestas con upvotes | 5 | 25 | 60 |
| Medium artículos publicados | 4 | 12 | 24 |

## Hitos re-evaluación

| Fecha | Decisión |
|---|---|
| 2026-06-08 (4 sem) | Si <5 indexadas → revisar mix canales |
| 2026-07-13 (9 sem) | Si <15 indexadas → considerar consolidar uno sitio |
| 2026-08-24 (15 sem) | Si <30 indexadas → evaluar sunset patasyhogar |
| 2026-11-11 (6 m) | Continuar o pivotar definitivo |

## Reglas operativas globales

- **No empezar canales fuera de Reddit, Quora y Medium** sin discusión
- **No emails outreach** (sin prensa, HARO, guest posts, bloggers)
- **No identidad real David expuesta** en patasyhogar
- **No fotos IA**
- **Humanizer obligatorio** en todo contenido publicado externamente (Reddit, Quora, Medium, foros, comentarios)
- **No commits sitio** salvo bug crítico o build calculadora
- **No mirar GSC diario** — solo lunes lectura

## Tracking diario

Cada acción registrada en `project_backlinks_social_status.md` (estado vivo):
- Fecha + canal + URL acción + tema
- Karma/upvotes si aplica
- Backlinks acquired (URL fuente + DR estimado)
