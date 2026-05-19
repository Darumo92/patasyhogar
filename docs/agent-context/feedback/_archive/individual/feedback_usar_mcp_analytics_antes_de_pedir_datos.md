---
name: Usar MCP Analytics/GSC/Cloudflare antes de pedir datos
description: Desde 2026-05-13, para revisar planes SEO, rendimiento y prioridades, consultar primero Google Search Console, Google Analytics y Cloudflare Analytics disponibles por MCP.
type: feedback
---

El usuario confirmó el 2026-05-13 que ya hay acceso MCP a Google Search Console, Google Analytics y analytics/API de Cloudflare. Para cualquier revisión de plan SEO, diagnóstico de tráfico, priorización, rutina diaria, evaluación de contenidos existentes, indexación, clicks, impresiones, CTR, posiciones, rendimiento técnico o validación de si el plan actual tiene sentido, consultar primero esas fuentes mediante MCP antes de pedir datos al usuario.

## How to apply

- No pedir al usuario exportaciones, capturas o métricas que pueda obtener directamente de:
  - Google Search Console MCP
  - Google Analytics MCP
  - Cloudflare MCP/API
- Antes de decir "necesito que me pases los datos", comprobar si el dato está accesible por esos MCP.
- Usar GSC para queries, páginas, clicks, impresiones, CTR, posición media, indexación y oportunidades SEO.
- Usar GA4 para sesiones, usuarios, canales, engagement, conversiones/eventos si están configurados y comparación temporal.
- Usar Cloudflare para tráfico a nivel edge, requests, caché, errores, rendimiento, DNS/deploy/configuración si aplica.
- En Cloudflare, no usar el endpoint REST antiguo `/zones/{zone}/analytics/dashboard` para tráfico: el 2026-05-13 devolvió `Zone Analytics API is sunset and replaced by GraphQL API`. Para métricas de tráfico usar GraphQL/RUM si está disponible; REST sigue valiendo para zona, DNS, settings, seguridad y configuración.
- Si un MCP falla, no tiene permisos o no expone el dato concreto, indicar el intento realizado y pedir solo el dato faltante.

## Límites

Esta regla no elimina otros checks obligatorios:

- Keyword Surfer y SERP real siguen siendo necesarios cuando el workflow de contenido lo exige.
- GSC muestra rendimiento propio, no reemplaza el análisis de SERP actual de Google para una keyword nueva.
- La verificación de productos, ASINs, precios e imágenes sigue requiriendo fuentes verificables o confirmación del usuario cuando Amazon/tiendas bloqueen scraping.
- No usar datos de analytics como única razón para publicar artículos nuevos durante el plan outreach 2026-05-11 -> 2026-11-11; la regla de no publicar contenido nuevo sigue activa salvo confirmación explícita del usuario.
