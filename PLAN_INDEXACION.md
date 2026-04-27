# Plan de recuperación de indexación — patasyhogar.com

Creado: 2026-04-23
Última revisión: 2026-04-27

## Diagnóstico (resumen)

- Dominio <3 meses (primer commit 2026-03-12).
- 82 artículos publicados en 6 semanas. 0 backlinks dofollow.
- 142 URLs sin indexar / 62 indexadas (30% indexación).
- 102 URLs "Rastreada: actualmente sin indexar" (GSC). Sin fallo técnico: canonical, robots, schema, HTTP 200 correctos.
- Causa raíz: **falta de autoridad del dominio + publicación masiva + hubs percibidos como thin**. Google rate-limita indexación en sitios nuevos sin señales externas.
- Inflexión: 2026-04-14 (93→68 indexadas) tras acumular ingesta desde pico de publicación marzo.

## Principio operativo

Evitar a toda costa disparar señales de "site change masivo". Google interpreta cambios uniformes simultáneos (67 lastmods iguales, 100+ redirects, etc.) como manipulación o site migration fallida. Todo cambio de contenido va en **ventanas espaciadas de 5-10 URLs/día** y **commits diferenciados**.

## Ola 1 — aplicada 2026-04-23 (bajo impacto, 1 build)

- [x] Filter sitemap: quitar 9 hubs (`/articulos/`, `/perros/`, `/gatos/`, 6 categorías) hasta ≥5 artículos del cluster indexados. `astro.config.mjs`.
- [x] Matcher pillar salud: añadir `guia-completa-salud-bienestar-{perro,gato}` al pillar matcher de `Article.astro` para que artículos de salud enlacen a su pillar correcto.
- [x] Este PLAN publicado en raíz del repo.

Verificar post-deploy:
- `/sitemap-0.xml` NO contiene los 9 hubs.
- GSC re-envío sitemap manual tras deploy.

## Ola 2 — días 3-14 post-deploy

### A1 — Solicitar indexación manual GSC (user-task, hoy mismo y siguientes)
10 URLs/día max. No superar 12 para evitar throttling. Priorizar top-value comercial.

Día 1 (10 URLs — comparativas de mayor volumen SEO):
```
https://patasyhogar.com/alimentacion/mejor-pienso-perro-esterilizado/
https://patasyhogar.com/higiene/mejor-cepillo-gatos/
https://patasyhogar.com/higiene/mejor-cepillo-perro/
https://patasyhogar.com/paseo/mejor-arnes-perro/
https://patasyhogar.com/higiene/mejor-champu-gato/
https://patasyhogar.com/hogar/mejor-cama-perro-guia/
https://patasyhogar.com/alimentacion/mejor-comedero-gatos-guia/
https://patasyhogar.com/alimentacion/mejor-pienso-gato-esterilizado/
https://patasyhogar.com/juguetes/mejor-juguete-mental-perros-guia/
https://patasyhogar.com/paseo/mejor-transportin-gatos-guia/
```

Día 2:
```
https://patasyhogar.com/higiene/mejor-antiparasitario-gatos-guia/
https://patasyhogar.com/higiene/mejor-antiparasitario-perros-guia/
https://patasyhogar.com/alimentacion/mejor-comida-humeda-gatos/
https://patasyhogar.com/alimentacion/mejor-comida-humeda-perros/
https://patasyhogar.com/paseo/mejor-gps-perro/
https://patasyhogar.com/paseo/collar-gps-gato/
https://patasyhogar.com/higiene/mejor-arenero-arena-gatos/
https://patasyhogar.com/alimentacion/mejor-pienso-hipoalergenico-perro/
https://patasyhogar.com/hogar/mejor-cama-gato-guia/
https://patasyhogar.com/paseo/mejor-arnes-gato-pasear/
```

Día 3 (pillars + informativos clave):
```
https://patasyhogar.com/cuidados/guia-alimentacion-perros/
https://patasyhogar.com/cuidados/guia-completa-alimentacion-gatos/
https://patasyhogar.com/cuidados/guia-completa-higiene-grooming-perros/
https://patasyhogar.com/cuidados/guia-completa-higiene-cuidado-gatos/
https://patasyhogar.com/cuidados/guia-completa-paseo-viaje-perros/
https://patasyhogar.com/cuidados/guia-completa-salud-bienestar-perros/
https://patasyhogar.com/cuidados/guia-completa-salud-bienestar-gatos/
https://patasyhogar.com/cuidados/guia-completa-juguetes-enriquecimiento-mascotas/
https://patasyhogar.com/cuidados/guia-completa-hogar-seguro-mascotas/
https://patasyhogar.com/cuidados/ansiedad-separacion-perros/
```

Día 4-5: resto de comparativas del Tabla.csv + informativos de cuidados con mayor volumen.

### A2 — tipo explícito a 67 artículos (goteo)
Script preparado: `scripts/add-tipo-explicit.mjs` (Ola 2b).
- Ejecutar en lotes de **5 artículos/día**, commit separado cada lote.
- Sólo tocar `tipo:`. NO tocar `actualizadoEn`. NO tocar otras fechas.
- Distribuir por categorías (no 5 iguales juntos).
- 67 artículos / 5 = ~14 días de goteo.

Regla hook: no hacer push masivo de MDX modificados con mismo `actualizadoEn`.

### A3 — Audit internal linking cluster → pillar
- Grep en MDX: verificar que cada artículo del cluster tenga enlace natural (no footer) a su pillar.
- Priorizar reforzar los 9 clusters.
- Objetivo: +5 enlaces entrantes por pillar en 14 días.
- **No** introducir "enlaces de recursos" masivos — deben ser contextuales dentro del párrafo.

## Ola 3 — semanas 2-4

### A4 — Congelar publicación 3 semanas
- No publicar nuevos artículos entre 2026-04-23 y 2026-05-14.
- Si plan v7 exige artículos diarios, pausar según instinct `feedback_no_adelantar_articulos`. Proponer mejoras a existentes como alternativa.

### A5 — E-E-A-T visible
Ejecutar solo tras confirmar sitio.
- Añadir bloque "revisado por" al final de cada pillar con nombre + fecha + credenciales honestas ("Daniel — convive con Kira y Mango. No es veterinario").
- AuthorBox ya existe (commit 0d4daec) — revisar que sea visible en comparativas, no sólo informativas.
- Añadir `@type: Person` con `knowsAbout`, `sameAs` (Pinterest, futuro LinkedIn), `description` en todos los pillars.

### A6 — Diferenciar comparativas (manual, por sesiones)
Problema: ~107 URLs con estructura idéntica (ComparisonTable + TopPick + FAQ + Product schema).
- Por lote de 5 comparativas/semana:
  - Añadir sección "Nuestra metodología" única a ese artículo (cómo probamos, durante cuánto tiempo, qué no evaluamos).
  - Fotos propias (no Amazon) de al menos 1 producto del artículo.
  - Tabla de criterios distinta a la estándar.
- NO regenerar artículos completos en ráfaga — Google lee eso como refresh masivo sospechoso.

### A8 — Backlinks seed (seguir `project_backlinks_social_status.md`)
- Pinterest: 2-3 pines/día, seguir 20-30 cuentas nicho, comentar 3-5/día.
- Reddit: karma >30 antes de drop contextual de enlaces. Post "experiencia" semanal.
- Quora ES: abrir cuenta, 5 respuestas largas con enlace contextual 1×.
- HARO / Qwoted (España): buscar requests mascotas/veterinaria.
- Guest post 1-2 en blogs nicho ES (hogarmania, consumer).

## Ola 4 — mes 2+

### A9 — Re-incluir hubs en sitemap uno a uno
Criterio: hub vuelve al sitemap cuando ≥5 artículos del cluster están indexados según GSC.
Orden sugerido (por volumen tráfico esperado): `/alimentacion/` → `/higiene/` → `/cuidados/` → `/paseo/` → resto.

### A10 — Schema Person refuerzo
- Si ya hay perfiles verificados (Pinterest confirmado), enlazar vía `sameAs` en Article schema `author`.
- Si se consigue publicar en medio externo, añadir URL al `sameAs`.

## No hacer

- No tocar 50+ archivos con mismo commit.
- No cambiar canonical de páginas ya indexadas.
- No hacer redirects 301 masivos.
- No recortar contenido de artículos (thin sugar) — Google interpreta reducción como "deteriorado".
- No desactivar sitemap index entero aunque nos tiente.
- No solicitar indexación a >12 URLs/día en GSC.
- No publicar artículos nuevos hasta 2026-05-14 mínimo.

## KPIs a vigilar (GSC semanal)

| Métrica | Baseline 2026-04-20 | 2026-04-27 (sem 1) | Objetivo 2026-05-14 | Objetivo 2026-06-15 |
|---|---:|---:|---:|---:|
| URLs indexadas | 62 | 62 (=) | 85 | 130 |
| URLs "Rastreada sin indexar" | 102 | 102 (=) | 70 | 40 |
| Impresiones/día | ~3 | 0 | ~20 | ~100 |

### Lectura 2026-04-27 (semana 1)
- **Sin cambios** en indexadas ni "Rastreada sin indexar". 0 impresiones.
- Esperable: sólo 4 días desde Ola 1 (sitemap-hubs eliminado 2026-04-23) + goteo tipo apenas iniciado (5 art/día desde 2026-04-23). Google necesita 2-3 semanas para reflejar.
- Continuar plan: NO precipitar. Mantener goteo + indexación manual GSC + Reddit.
- Próxima revisión: lunes 2026-05-04.

Revisar cada lunes. Si no hay mejora tras 2 semanas de Ola 1+2, revisitar hipótesis H2/H6 con inspección manual por URL.
