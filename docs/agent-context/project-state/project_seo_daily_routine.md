---
name: SEO Rutina Diaria 2026-05-11 → 2026-11-11
description: LOOKUP DIARIO. Plan outreach autoridad externa 6 meses tras descartar hipótesis filtro autor falso (evidencia tuespaciodetrabajo). Reemplaza Fase A/B/C 12 semanas.
type: project
---
# Rutina diaria SEO — Outreach autoridad 6 meses

## Cómo usar

Cada mañana decir "vamos con tareas SEO de hoy" → leer este archivo → ejecutar cuotas del día.

**Inicio del plan:** 2026-05-11
**Última lectura semanal:** 2026-06-09 (martes, semana 5)
**Última actualización operativa:** 2026-06-14 (domingo, semana 5)

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
| Reddit nicho (r/mascotas, r/GatosArgentinos) | 14-21 comentarios + 1 post propio | u/Pristine_Review5630. Karma 85 el 2026-05-29; enlaces solo contextuales y con gap de 5-7 días desde el último enlace propio. Último enlace: 2026-05-29, no enlazar antes del 2026-06-03 como mínimo. |
| Reddit subs grandes ES (r/Spain, r/AskSpain, r/Madrid, r/Barcelona, r/Valencia) | 2-3 posts/sem | Mismo usuario. Sin enlace salvo encaje excepcional, respetando gap global de dominio y con humanización estricta antes de publicar. |
| Quora ES | 3-4 respuestas largas/sem | Firmar "Redacción Patas y Hogar". 400-800 palabras. 1 link contextual al final si aporta. |

**Medium pausado desde 2026-05-27:** tras 2 artículos publicados, GA4 no registró sesiones desde `medium.com` entre el 2026-05-13 y el 2026-05-27. Mantener piezas existentes, pero no invertir cuota semanal nueva salvo reactivación explícita.

**Total estimado:** 1-1.5h/día.

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
| Miércoles | Reddit nicho (3 comentarios) + localizar oportunidad contextual de enlace si el gap lo permite |
| Jueves | 2 respuestas Quora + revisar replies Reddit |
| Viernes | Reddit subs grandes (1 post) + Reddit nicho (3 comentarios) |
| Sábado | 1 respuesta Quora + revisar replies Reddit |
| Domingo | Reddit nicho (3 comentarios) + revisar inbox/karma |

## Contenido nuevo — cadencia baja reactivada

El 2026-06-12 el usuario confirmó retomar artículos nuevos con cadencia baja porque Bing sí indexa y puede generar tracción aunque Google siga bloqueado. La regla actual es:

- 1 artículo nuevo por semana, no calendario masivo.
- Mantener Reddit + Quora como rutina diaria de autoridad externa.
- Antes de escribir cada artículo: cannibalization check, SERP real aportada por el usuario, fuentes oficiales si aplica, humanización y `npm run build`.
- Evitar comparativas nuevas sin verificación completa de productos.
- Ver `docs/PLAN_EDITORIAL_v7.md` v7.1 para el calendario semanal.

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
| Miércoles | Corregir 1 artículo priorizado si requiere reemplazo real; verificar Amazon API + Tiendanimal. |
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
| 2026-05-30 | Ajuste operativo sábado: el último enlace propio en Reddit fue el 2026-05-29 en r/AskSpain, así que el gap global bloquea nuevos enlaces a patasyhogar hasta el 2026-06-03 como mínimo. Hoy priorizar Quora y revisión de replies/actividad Reddit sin enlaces. |
| 2026-06-01 | Lectura semanal: GSC 25-30 may = 0 impresiones, 0 clics; sitemap sigue con 691 enviadas y 0 indexadas. GA4 25-31 may = 3 sesiones / 3 usuarios / 3 vistas / 2 sesiones con interacción (vs 4 / 4 / 8 / 2 del 18-24 may). Cloudflare 25-31 may = 9.534 requests y 2.499 uniques diarios agregados (vs 11.077 y 2.629 del 18-24 may). Mantener outreach sin cambios hasta re-eval del 2026-06-08. Último enlace propio Reddit 2026-05-29: no enlazar antes del 2026-06-03 como mínimo. |
| 2026-06-02 | Lectura operativa martes: GSC 26-31 may = 0 impresiones, 0 clics; GA4 26 may-1 jun = 4 sesiones / 3 usuarios / 4 vistas / 4 sesiones con interacción, fuentes principales `chatgpt.com / referral`, `bing / organic` y `copilot.com / (not set)`. Cloudflare GraphQL intentado, pero el wrapper MCP devolvió `Cannot read properties of null (reading 'map')` incluso con query mínima; no usar el endpoint REST antiguo de Zone Analytics. Mantener pauta del martes: post Reddit sub grande sin enlace + 1 respuesta Quora. Último enlace propio Reddit 2026-05-29: no enlazar antes del 2026-06-03 como mínimo. |
| 2026-06-04 | Lectura operativa jueves: GSC 28 may-3 jun = 0 impresiones, 0 clics (semana previa 21-27 may = 1 impresión, 0 clics). GA4 28 may-3 jun = 5 sesiones / 3 usuarios / 3 vistas / 3 sesiones con interacción; fuentes: `chatgpt.com / referral`, `es.search.yahoo.com / referral` y `bing / organic`. Cloudflare 28 may-3 jun = 10.024 requests, 3.315 page views y 2.507 uniques diarios agregados (vs 9.811 requests, 3.558 page views y 2.506 uniques diarios agregados del 21-27 may). Diagnóstico sin cambios: Google sigue bloqueado, edge estable. Mantener jueves: 2 respuestas Quora + revisar replies Reddit. Enlace propio permitido por gap desde el 2026-06-03, pero solo si encaja de forma contextual. |
| 2026-06-06 | Lectura operativa sábado: GSC 30 may-1 jun disponible = 0 impresiones, 0 clics; GSC 23-29 may = 0 impresiones, 0 clics. GA4 30 may-5 jun = 7 sesiones / 4 usuarios / 5 vistas / 5 sesiones con interacción (vs 5 sesiones / 5 usuarios / 9 vistas / 4 sesiones con interacción del 23-29 may). Fuentes actuales: `(direct) / (none)`, `chatgpt.com / referral`, `es.search.yahoo.com / referral` y `bing / organic`. Cloudflare GraphQL sí respondió: 30 may-5 jun = 10.963 requests, 3.134 page views y 2.540 uniques diarios agregados (vs 10.093 requests, 3.870 page views y 2.374 uniques diarios agregados del 23-29 may). Diagnóstico sin cambios: Google sigue a cero; edge estable; mantener sábado con 1 respuesta Quora + revisión ligera de replies Reddit. |
| 2026-06-08 | Re-eval 1 (4 sem). KPI fallido según lectura 2026-06-09: GSC 1-7 jun = 0 impresiones, 0 clics; sitemap = 691 enviadas y 0 indexadas. GA4 1-7 jun = 8 sesiones / 5 usuarios / 6 vistas / 5 sesiones con interacción (vs 3 / 2 / 3 / 2 del 25-31 may); fuentes: `chatgpt.com / referral`, `(direct) / (none)`, `es.search.yahoo.com / referral`, `bing / organic`. Cloudflare 1-7 jun = 10.230 requests, 3.172 page views y 2.381 uniques diarios agregados (vs 9.534 / 3.668 / 2.499 del 25-31 may). Decisión: no cambiar contenido ni identidad; ajustar mix dentro de canales aprobados con más Quora/answers evergreen y Reddit sin enlace forzado. |
| 2026-06-13 | Lectura operativa sábado: GSC 6-11 jun disponible = 1 impresión, 0 clics (la impresión fue el 2026-06-08; 12 jun aún no aparece). Semana anterior 30 may-5 jun = 0 impresiones, 0 clics. GA4 6-12 jun = 7 sesiones aproximadas por fuentes visibles: Bing organic, Ecosia organic, ChatGPT y directo; páginas vistas aisladas en fuentes de agua para gatos, chaleco salvavidas perro, gato vomita, perro no quiere comer y limpiador enzimático. Cloudflare zona activa. Diagnóstico sin cambios: Google sigue prácticamente bloqueado; mantener autoridad externa y aprovechar señales de Bing/AI. Como el 2026-06-12 se publicó la guía de coche del plan v7.1, hoy no tocaba crear otro artículo. Cierre: Quora sobre perro grande que no quiere subir al coche publicado con link contextual a la guía DGT; Reddit r/mascotas `1u4c1wv` publicado sin enlace sobre rutina para perro joven recién adoptado. |
| 2026-06-14 | Cierre domingo: rutina Reddit nicho completada con 3 comentarios sin enlace propio. Publicados en r/mascotas `1u561k8` (juguetes tranquilos para gato senior), r/mascotas `1u4vu9b` (herida en patita de gato, consejo prudente veterinario) y r/GatosArgentinos `1u5708z` (segunda opinión por olor fuerte, menor agua y analítica alterada). Humanizer aplicado y castellano España. RSS usuario vacío y Reddit rate-limited con 429 durante la sesión, así que URLs exactas de comentario quedan pendientes de capturar. No hubo cambio técnico ni contenido nuevo hoy. |
| 2026-07-13 | Re-eval 2 (9 sem). KPI: ≥15 indexadas + ≥50 imp/sem. Si igual → considerar consolidación sitios. |
| 2026-08-24 | Re-eval 3 (15 sem). KPI: ≥30 indexadas + ≥200 imp/sem. Decisión continuar o sunset. |
| 2026-11-11 | Re-eval final (6 meses). KPI: ≥60 indexadas + tráfico orgánico medible. |

## Probabilidad realista

- Plan actual outreach 6 meses: **25-40%** recuperación parcial Google
- Bing seguirá funcionando independiente
- Reddit/Quora pueden generar tráfico directo mientras Google se mueve

## NO hacer (refuerzo)

- NO mirar GSC todos los días (ansiedad → cambios reactivos)
- NO publicar artículos nuevos en masa. Desde 2026-06-12 sí se permite 1 artículo/semana con workflow completo.
- NO modificar identidad sitio (Daniel/Mango/Kira) — descartado como causa
- NO fotos IA generadas
- NO email outreach a nadie
- NO YouTube/TikTok (no aprobado en pivot)
- NO commits al sitio salvo artículo semanal aprobado, bug fix técnico crítico o mantenimiento validado.

## Free tool publicado

Calculadora coste mantenimiento mascotas mensual ES publicada el 2026-05-18 en `/calculadora-coste-mascotas/`. No volver a proponer "empezar" o "construir" la calculadora; las tareas posibles ahora son promoción, enlaces contextuales o mejoras puntuales.

## Archivos relacionados

- `project_outreach_plan_2026-05-11.md` — plan detallado canales
- `reference_quora_es_workflow.md` — método respuestas Quora
- `project_reddit_activity.md` — actividad y candidatos Reddit
- `project_outreach_content.md` — publicaciones Quora y registro histórico Medium
- `project_social_accounts.md` — estado de cuentas y canales
