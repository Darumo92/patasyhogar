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
- **Karma actual (2026-05-25):** comment=69, link=9, total=78
- **Cuota:** 2-3 comentarios/día + 1 post propio/sem
- **Reglas:**
  - Cuenta ya supera karma >50 y un mes; un link propio solo si responde de forma natural a la consulta
  - Gap mínimo global de 5-7 días entre enlaces a patasyhogar.com; el último fue el 2026-05-21
  - Mínimo 30-60 min entre comentarios
  - Anécdota Mango/Kira OK (no falsificable)
  - Subs distintos cada acción
  - Aplicar humanizer pre-publicación
- **Tracking:** `project_reddit_activity.md`

### 2. Reddit subs grandes ES (nuevo)

- **Subs target:** r/Spain, r/AskSpain, r/Madrid, r/Barcelona, r/Valencia (este último ya unido)
- **Cuota:** 2-3 posts/sem
- **Tipos post:**
  - Pregunta genuina lifestyle relacionada mascotas (ej: "¿cuánto cuesta vivir con perro en Madrid?")
  - Hilo experiencia ("Lo que aprendí adoptando un gato en piso pequeño")
  - Dato contraintuitivo (mover discusión)
- **Reglas:** mismo usuario u/Pristine_Review5630. Priorizar conversación sin enlace; cualquier enlace cuenta para el gap global de dominio. Aplicar `humanizer`, guía de voz y pasada final de castellano de España a cada borrador.

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

### 4. Medium — pausado 2026-05-27

- **Estado:** pausado por decisión del usuario.
- **Evidencia:** dos artículos publicados el 2026-05-13 y 2026-05-20; GA4 no registró sesiones con referencia de `medium.com` entre el 2026-05-13 y el 2026-05-27.
- **Acción:** mantener los dos artículos existentes y sus canonical; no publicar nuevas piezas por defecto.
- **Reactivación:** solo si aparecen señales medibles o el usuario lo solicita expresamente.

### Canales descartados

- LinkedIn Articles: descartado por decisión del usuario el 2026-05-16.
- Comentarios en blogs: descartado por decisión del usuario el 2026-05-16.
- Foros: no proponer por defecto; solo retomarlos si el usuario lo pide explícitamente.

## Free tool — Calculadora coste mascotas

**Estado:** publicada el 2026-05-18. Commit `5dea515` añadió `/calculadora-coste-mascotas/` y el commit `8bcc4dc` está por encima en `main`.
**URL:** `/calculadora-coste-mascotas/`
**Spec mínimo:**
- Inputs: especie (perro/gato), tamaño (S/M/L), edad (cachorro/adulto/senior), ciudad (top 10 ES + "otra")
- Output: estimación mensual desglosada (pienso + veterinario + higiene + accesorios + seguro)
- Datos base: agregados de tus propios artículos coste mensual
- Schema: WebApplication + FAQPage
- Compartible: link directo con params (`?especie=perro&tamaño=L`)
- CTA salida: link a comparativas relevantes (pienso, seguro)

**Razón:** pieza linkable orgánica. Citable. Compartible Reddit/foros sin sonar promo. Sirve también en Bing/Pinterest.

**Uso outreach:** promocionar o enlazar la calculadora solo cuando encaje de forma natural. No repetir el ángulo de post propio "cuánto cuesta tener perro o gato al mes", ya usado en r/AskSpain el 2026-05-12 (`1tayoo3`).

## KPIs seguimiento mensual

| KPI | Meta mes 1 | Mes 3 | Mes 6 |
|---|---|---|---|
| Indexadas Google | 5 | 15 | 60 |
| Impresiones GSC/sem | 10 | 50 | 200 |
| Backlinks dofollow detectados | 2 | 8 | 20 |
| Brand mentions (Google "patasyhogar") | 5 | 25 | 80 |
| Reddit karma total | 60 | 150 | 300 |
| Quora respuestas con upvotes | 5 | 25 | 60 |
| Medium artículos publicados | Pausado (2 publicados) | - | - |

## Hitos re-evaluación

| Fecha | Decisión |
|---|---|
| 2026-06-08 (4 sem) | Si <5 indexadas → revisar mix canales |
| 2026-07-13 (9 sem) | Si <15 indexadas → considerar consolidar uno sitio |
| 2026-08-24 (15 sem) | Si <30 indexadas → evaluar sunset patasyhogar |
| 2026-11-11 (6 m) | Continuar o pivotar definitivo |

## Reglas operativas globales

- **Canales activos:** Reddit y Quora. No empezar canales nuevos sin discusión.
- **No emails outreach** (sin prensa, HARO, guest posts, bloggers)
- **No identidad real David expuesta** en patasyhogar
- **No fotos IA**
- **Humanizer obligatorio** en todo contenido publicado externamente (Reddit, Quora, foros, comentarios)
- **No commits sitio** salvo bug crítico o build calculadora
- **No mirar GSC diario** — solo lunes lectura

## Tracking diario

Cada acción se registra en `project_reddit_activity.md` (Reddit) o `project_outreach_content.md` (Quora y registro historico Medium):
- Fecha + canal + URL acción + tema
- Karma/upvotes si aplica
- Backlinks acquired (URL fuente + DR estimado)
