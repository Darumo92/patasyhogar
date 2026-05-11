---
name: SEO Master Plan 2026-04-27 (12 semanas)
description: Plan integral recuperación indexación tras auditoría exhaustiva 2026-04-27. Diagnóstico = discovery throttling Google. Reemplaza PLAN_INDEXACION.md.
type: project
originSessionId: be10b137-616f-44c6-a8cb-15a0c735caab
---
# SEO Master Plan — Recuperación discovery throttling

**Fecha auditoría:** 2026-04-27
**Última revisión:** 2026-05-04
**Próxima revisión:** lunes 2026-05-11 (cierre Fase A)

## Diagnóstico (validado con datos GSC reales)

Sitio en **discovery throttling** activo de Google. Confirmado por:
- Crawl budget mínimo: Google no relee sitemap sin force manual (lastmod ignorado)
- Indexadas útiles ~11 (de 26 totales: 12 tags + 2 www + 1 fantasma) — auditoría 2026-04-27
- 137 URLs "rastreada sin indexar" — auditoría 2026-04-27
- 13 días blackout impresiones (04-07/04-19)
- 0 clics 28 días, ratio indexación útil ~6%

### Causas (ordenadas por peso)

1. **Site instability signal** (50%): >600 commits/46 días, 100+ redirects, recategorizaciones masivas (`/comportamiento/` → 4 destinos, `/descanso/` → 2), 5 cambios nav en 4 días, lastmod sincronizado en bloque (37 art 04-09), eliminación 644 tags + 44 redirects mismo día (04-12)
2. **Authority deficit** (30%): dominio 46 días, 0 backlinks dofollow, 0 menciones marca externas, ratio publicación/autoridad inverosímil
3. **Scaled content pattern** (15%): 100+ URLs `mejor-X` con plantilla idéntica (ComparisonTable+TopPick+FAQs+Schema), imágenes Pexels/Amazon (no propias)
4. **Auto-sabotaje Ola 1** (5%): quitar 9 hubs sitemap fue contraproducente — eliminó señal arquitectónica. YA REVERTIDO commit `74cf99e` 2026-04-27

### Realidad incómoda

- Este trimestre perdido. Google necesita 8-12 semanas estabilidad
- Octubre 2026 = primer mes posible con tráfico real
- Ningún truco técnico saca del throttling: solo backlinks reales + engagement orgánico + tiempo
- Indexing API NO sirve (solo JobPosting/BroadcastEvent — abuso = manual action)
- Ping sitemap deprecated 2023
- IndexNow ignorado por Google
- Resubmit GSC = 0 efecto sin autoridad

## Histórico GSC — Serie completa (CSV exportado 2026-05-07)

### Picos históricos clave
| Fecha | Indexadas | Sin indexar | Impresiones |
|---|---|---|---|
| 2026-03-16 | 73 | 644 | 68 | ← crawl masivo tras sitemap submit |
| 2026-03-18 | 78 | 21 | 0 | ← Google estabilizó |
| 2026-04-13 | 93 | 61 | 0 | ← PICO MÁXIMO indexadas |
| 2026-04-14 | 68 | 121 | 0 | ← CAÍDA INICIO (−25, día después eliminación 644 tags 04-12) |
| 2026-04-18 | 62 | 142 | 0 | |
| 2026-04-21 | 26 | 178 | 0 | ← CAÍDA DRÁSTICA −36 |
| 2026-04-25 | 15 | 190 | 1 | |
| 2026-04-28 | 7 | 198 | 0 | |
| 2026-05-02 | **1** | **204** | 0 | ← ESTADO ACTUAL |

### Seguimiento semanal auditorías
| Fecha | Indexadas | Sin indexar | Rastreada+sin-indexar | Notas |
|---|---|---|---|---|
| 2026-04-27 | ~11 útiles | ~137+ | 137 | auditoría manual |
| 2026-05-04 | 15 | 190 | 149 | lectura GSC |
| 2026-05-07 | **1** | **204** | **161** | CSV exportado — caída confirmada |

### Problemas cobertura (2026-05-07)
- **Rastreada: actualmente sin indexar → 161 páginas (Error)** ← CRÍTICO: Google leyó el contenido y decidió NO indexar
- Página con redirección: 24
- noindex: 9
- robots.txt: 5
- 404: 4
- Canonical alternativa: 1

### Diagnóstico actualizado (2026-05-07)
**NO es solo throttling. Es quality rejection activo.**
- Pico 93 indexadas (04-13) → 1 indexada (05-02): caída sistemática sostenida 3+ semanas
- Trigger: eliminación 644 tags + 44 redirects 04-12 → re-crawl de calidad 04-14 → inicio caída
- 161 "rastreada sin indexar / Error" = Google crawleó Y RECHAZÓ por calidad — no es técnico
- Helpful Content / SpamBrain filter activo sobre contenido con plantilla escalada
- KPI Phase A (0 días blackout) NO se cumplirá 2026-05-11 → extensión +2 semanas a 2026-05-25

## Plan 12 semanas (3 fases)

### Fase A — CONGELACIÓN (2026-04-27 → 2026-05-11)

**Regla absoluta:** 0 commits al sitio. 0 modificaciones MDX. 0 cambios nav/styling. 0 publicación. 0 cancelar Ola 2 goteo `tipo`.

Únicas excepciones permitidas (ya aplicadas):
- ✅ Restaurar 9 hubs sitemap (commit 74cf99e, 2026-04-27)

Acción usuario única:
- Tras Cloudflare Pages publique 74cf99e: GSC → Sitemaps → 3 puntos sitemap-index.xml → "Volver a enviar". UNA SOLA VEZ.
- 0 solicitudes reindexación durante esta fase

### Fase B — SEÑALES EXTERNAS (2026-05-11 → 2026-06-08, 4 semanas)

**Objetivo:** sumar autoridad sin tocar sitio.

Cuotas semanales (Reddit-only por decisión usuario 2026-04-27):
- Reddit ES: 2-3 comentarios/día + 1 post propio/semana max
- Skip: Pinterest (pausado), Quora, foros, HARO, guest posts, periodistas

### Fase C — DIFERENCIACIÓN CONTENIDO (2026-06-08 → 2026-07-20, 6 semanas)

**Objetivo:** romper patrón scaled content sin trigger señal masive.

Cadencia semanal:
- 1 comparativa editada (foto propia Mango/Kira con producto real, sección "Cómo lo probamos" única, fechas uso reales). NO tocar `actualizadoEn` salvo cambio genuino
- 1 informativo editado
- 1 pillar auditado/mejorado (6 pillars en 6 semanas)

Prohibido en esta fase:
- Publicar nuevos artículos
- Tocar nav/components/styles
- Cambiar canonicals
- A/B test estructural
- Mover artículos entre categorías
- Refrescar `actualizadoEn` masivo

## Re-evaluaciones GSC

| Hito | Fecha | KPI mínimo | Acción si falla |
|---|---|---|---|
| Confirmar crawl normalizado | 2026-05-11 | 0 días blackout impresiones | +2 semanas congelación |
| Re-eval 1 | 2026-05-25 | Indexadas ≥35 | Continuar congelación |
| Re-eval 2 | 2026-06-15 | Indexadas ≥60 | Si <40: reescribir 5 comparativas con foto propia |
| Re-eval 3 | 2026-07-15 | Indexadas ≥85 + 50 imp/día | Decisión: reanudar publicación o pivot |

## Lo que NO hacer (lecciones)

1. No buscar más "fix SEO técnico". Cada uno empeora signal estabilidad.
2. No solicitar reindexación masiva (>3 URLs/día = throttle GSC, >12 = manipulación)
3. No tocar canonicals existentes
4. No mover artículos entre categorías (ya 100+ redirects acumulados)
5. No refrescar `actualizadoEn` (Google detecta fake refresh)
6. No publicar nuevos artículos hasta julio-agosto
7. No añadir features (recomendador, calculadoras, comparadores)
8. No A/B test que cambie HTML estructural
9. No tocar PLAN_INDEXACION.md repo (commit innecesario rompe congelación)
10. No quitar sitemaps GSC (señal "retirado" = ruido)

## Errores técnicos detectados (NO arreglar ahora)

Pendientes para Fase C+ commits únicos no consecutivos:
- 2 URLs `www.` sin slash indexadas (verificar redirect Cloudflare Pages activo)
- Cadena 301 doble salto (`www-no-slash → apex → trailing-slash`)
- `/tags/:tag/` redirect 301 → `/articulos/` (cambiar destino a `/`)
- Limpieza robots.txt: quitar línea `Sitemap: ...sitemap-0.xml` (dejar solo index)

Todos secundarios. NO causa caída. Posponer.

## Estado sitemaps GSC (auditado 2026-04-27, verificado 2026-05-04)

- sitemap-index.xml: 691 páginas descubiertas (histórico acumulado, normal)
- sitemap-0.xml: 149 páginas (actualizado — subió de 140 por goteo Ola 2)
- Discrepancia 691 vs 149 = histórico GSC, NO bug
- Google solo relee tras force manual = síntoma discovery throttling
- Estructura código correcta. NO tocar.
