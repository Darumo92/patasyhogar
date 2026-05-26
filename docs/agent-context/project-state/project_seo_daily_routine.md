---
name: SEO Rutina Diaria 2026-05-11 → 2026-11-11
description: LOOKUP DIARIO. Plan outreach autoridad externa 6 meses tras descartar hipótesis filtro autor falso (evidencia tuespaciodetrabajo). Reemplaza Fase A/B/C 12 semanas.
type: project
---
# Rutina diaria SEO — Outreach autoridad 6 meses

## Cómo usar

Cada mañana decir "vamos con tareas SEO de hoy" → leer este archivo → ejecutar cuotas del día.

**Inicio del plan:** 2026-05-11
**Última lectura semanal:** 2026-05-25 (lunes, semana 3)

## Contexto cambio plan (2026-05-11)

Plan anterior Fase A/B/C (freeze + cooldown) **descartado**. Razón:

- KPI Fase A falló: 0 impresiones 14 días + 1 URL indexada de 162 sitemap
- GSC: 161 URLs "Rastreada: actualmente sin indexar" (filtro algorítmico)
- Sin acción manual GSC ("No se han detectado problemas")
- **Evidencia clave:** tuespaciodetrabajo (otro sitio David, identidad real + LinkedIn + X) sufre patrón idéntico (1 indexada + 0 imp)
- Diagnóstico: NO es problema contenido ni autor. Es **dominio fresh sin autoridad externa** + Google 2025-2026 post-HCU agresivo
- Bing funciona OK (impresiones + clicks) → infra técnica sana

**Causa raíz:** falta backlinks / brand mentions / señales externas potentes.

**Solución única:** construir autoridad externa por canales aprobados (sin email outreach a 3ros, sin prensa, sin guest posts).

## Canales aprobados + cuotas

| Canal | Cuota semanal | Cómo |
|---|---|---|
| Reddit nicho (r/mascotas, r/GatosArgentinos) | 14-21 comentarios + 1 post propio | u/Pristine_Review5630. Karma 80 el 2026-05-26; enlaces solo contextuales y con gap de 5-7 días desde el último enlace propio. |
| Reddit subs grandes ES (r/Spain, r/AskSpain, r/Madrid, r/Barcelona, r/Valencia) | 2-3 posts/sem | Mismo usuario. Sin enlace salvo encaje excepcional, respetando gap global de dominio y con humanización estricta antes de publicar. |
| Quora ES | 3 respuestas largas/sem | Firmar "Redacción Patas y Hogar". 400-800 palabras. 1 link contextual al final si aporta. |
| Medium | 1 artículo/sem repurposed | Versión adaptada de informativos con backlink/canonical hacia patasyhogar. |

**Total estimado:** 1.5-2h/día.

## Reglas operativas

- **No email outreach.** Sin prensa, sin HARO, sin guest posts, sin contactar bloggers.
- **No fotos IA.** Riesgo detección > beneficio.
- **No identidad real David expuesta en patasyhogar.** David solo en tuespaciodetrabajo.
- **Mantener Mango/Kira narrativa** (no claim falsificable, suficiente para Bing/Reddit).
- **No empezar nuevos canales fuera de esta lista** sin discusión previa.
- **Humanización Reddit obligatoria.** Cada post o comentario debe pasar por `humanizer`, guía de humanización, coherencia de Mango/Kira y castellano de España antes de presentarlo.

## Cadencia semanal

| Día | Foco |
|---|---|
| Lunes | Reddit nicho (3 comentarios) + 1 respuesta Quora |
| Martes | Reddit subs grandes (1 post) + 1 respuesta Quora |
| Miércoles | Medium 1 artículo repurposed + Reddit nicho (3 comentarios) |
| Jueves | 2 respuestas Quora + revisar replies Reddit |
| Viernes | Reddit subs grandes (1 post) + Reddit nicho (3 comentarios) |
| Sábado | 1 respuesta Quora + preparar/publicar Medium si no se hizo el miércoles |
| Domingo | Reddit nicho (3 comentarios) + revisar inbox/karma |

## Mantenimiento Amazon productos

El mantenimiento de productos Amazon forma parte del plan operativo, pero no debe convertirse en edición masiva de artículos.

**Regla base:**

- `npm run update:amazon-cache` actualiza precio, imagen y disponibilidad en `src/data/amazon-products.json` sin tocar MDX.
- `npm run audit:amazon` genera reporte de productos rotos o sospechosos sin modificar artículos.
- Solo tocar artículos cuando el problema sea editorial: producto no disponible, ASIN que ya no corresponde, TopPick inviable, imagen rota no resuelta por cache o recomendación que queda obsoleta.

**Cadencia mensual:**

- Primer viernes de cada mes: ejecutar auditoría completa con `npm run audit:amazon -- --delay 10000 --retries 5`.
- Después ejecutar cache completo con `npm run update:amazon-cache -- --delay 10000 --retries 5`.
- Revisar resumen del reporte y elegir máximo 1 artículo prioritario para corrección editorial si hay problemas graves.

**Cadencia semanal:**

- Viernes: revisar una muestra con `node scripts/audit-amazon-products.mjs --limit 10 --stdout --delay 5000` o auditar 1 artículo tocado recientemente con `--article <slug>`.
- Si hay producto no disponible o con envío absurdo en un TopPick, añadirlo a cola de corrección.
- No corregir manualmente diferencias pequeñas de precio: las cubre el cache.

**Distribución por días cuando haya cola editorial Amazon:**

| Día | Acción Amazon si hay pendientes |
|---|---|
| Lunes | Revisar 1 artículo con problemas críticos/TopPick inviable y decidir si reemplazar producto. |
| Miércoles | Corregir 1 artículo priorizado si requiere reemplazo real; verificar Amazon API + Zooplus/Tiendanimal. |
| Viernes | Ejecutar muestra semanal o mensual según toque; actualizar cache si se tocó producto. |

**Límite de cambios editoriales:**

- Máximo 1-2 artículos por semana salvo bug grave.
- No hacer tandas grandes de 20+ artículos.
- Cache sí puede actualizar cientos de productos porque solo cambia datos volátiles centralizados.

**Estado inicial 2026-05-15:**

- Auditoría completa ejecutada: `reports/amazon-products/audit-2026-05-15.md`.
- Cache completo actualizado: `src/data/amazon-products.json` con 424 ASINs, 0 no encontrados.
- Resumen cache: 349 con precio, 75 sin precio, 288 en stock, 74 no disponibles/no encontrados, 24 con lead time/fecha futura.
- Primer artículo recomendado para revisión editorial: `mejor-rascador-gatos-guia` (8 productos no disponibles y varios posibles desajustes de título).

## Hitos seguimiento

| Fecha | Acción |
|---|---|
| 2026-05-18 | Lectura GSC. Anotar indexadas + impresiones. Sin esperar cambio aún. |
| 2026-05-25 | Lectura semanal: GSC 18-23 may = 1 impresión, 0 clics (vs 2 impresiones, 0 clics del 11-17 may); sitemap reporta 691 enviadas y 0 indexadas. GA4 18-24 may = 4 sesiones / 4 usuarios / 8 vistas (vs 7 / 5 / 13). Cloudflare zona y Web Analytics activos. Mantener outreach; no hay señal para cambiar estrategia antes del hito del 8 jun. |
| 2026-06-08 | Re-eval 1 (4 sem). KPI: ≥5 indexadas + ≥10 impresiones. Si igual → revisar mix canales. |
| 2026-07-13 | Re-eval 2 (9 sem). KPI: ≥15 indexadas + ≥50 imp/sem. Si igual → considerar consolidación sitios. |
| 2026-08-24 | Re-eval 3 (15 sem). KPI: ≥30 indexadas + ≥200 imp/sem. Decisión continuar o sunset. |
| 2026-11-11 | Re-eval final (6 meses). KPI: ≥60 indexadas + tráfico orgánico medible. |

## Probabilidad realista

- Plan actual outreach 6 meses: **25-40%** recuperación parcial Google
- Bing seguirá funcionando independiente
- Reddit/Quora/Medium pueden generar tráfico directo mientras Google se mueve

## NO hacer (refuerzo)

- NO mirar GSC todos los días (ansiedad → cambios reactivos)
- NO publicar artículos nuevos hasta hitos cumplidos
- NO modificar identidad sitio (Daniel/Mango/Kira) — descartado como causa
- NO fotos IA generadas
- NO email outreach a nadie
- NO YouTube/TikTok (no aprobado en pivot)
- NO commits al sitio salvo bug fix técnico crítico

## Free tool publicado

Calculadora coste mantenimiento mascotas mensual ES publicada el 2026-05-18 en `/calculadora-coste-mascotas/`. No volver a proponer "empezar" o "construir" la calculadora; las tareas posibles ahora son promoción, enlaces contextuales o mejoras puntuales.

## Archivos relacionados

- `project_outreach_plan_2026-05-11.md` — plan detallado canales
- `reference_quora_es_workflow.md` — método respuestas Quora
- `project_reddit_activity.md` — actividad y candidatos Reddit
- `project_outreach_content.md` — publicaciones Quora y Medium
- `project_social_accounts.md` — estado de cuentas y canales
