# Amazon Products Maintenance (Patas y Hogar)

Integrado en rutina SEO diaria desde 2026-05-15.

Última actualización: 2026-05-21 CEST

---

## Estado actual

- API Amazon elegible y operativa.
- Cache central: `src/data/amazon-products.json`.
- Componentes que usan cache: `ComparisonTable` y `TopPick`.
- Auditoría completa ejecutada: `reports/amazon-products/audit-2026-05-15.md`.
- Cache completo actualizado: 424 ASINs, 0 no encontrados.

## Cadencia

- Mensual: `npm run audit:amazon -- --delay 10000 --retries 5` + `npm run update:amazon-cache -- --delay 10000 --retries 5`.
- Semanal: muestra de 10 artículos o artículo tocado recientemente.
- Editorial: máximo 1-2 artículos/semana, solo si hay producto roto, no disponible o TopPick inviable.

## Próxima cola editorial sugerida

1. `mejor-arenero-arena-gatos` — **REVISADO 2026-05-21.** Petkit Pura Max → Pura MAX 2 (B0D9QGW2M6, 549€). Quedan 4 productos no disponibles: Yangbaga acero inox, Ever Clean Total Cover, Tigerino Canada, Ever Clean Aqua Breeze. Prioridad siguiente editorial.
2. `mejor-aspirador-pelo-mascotas` — 4 productos no disponibles.
3. **`mejor-rascador-gatos-guia` — REVISADO 2026-05-17. 5 productos reemplazados, 4 precios actualizados, artículo y registro productos actualizados.**
