# Amazon Products Maintenance (Patas y Hogar)

Integrado en rutina SEO diaria desde 2026-05-15.

Última actualización: 2026-05-25 CEST

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

1. `champu-perros-piel-sensible` — **REVISADO 2026-05-25.** Virbac Allermyl sustituido de B00O4B8SUA a B0D4DTPKHF (250 ml; Amazon 24,98€; Zooplus 26,99€; Tiendanimal 29,69€). TropiClean B000WT8REK ajustado a 592 ml / 26,67€ y figura con stock escaso. Menforsan corregido a la variante de 300 ml B00P7QPZSE (6,26€); Tiendanimal muestra el mismo producto con formato distinto. Beaphar renombrado a Champú Alta Cosmética Pieles Sensibles B00OKFHO0U (250 ml; 9,50€), retirando las afirmaciones de Bio Shampoo que no correspondían al ASIN.
2. `mejor-arenero-arena-gatos` — REVISADO 2026-05-21. Petkit Pura Max → Pura MAX 2 (B0D9QGW2M6, 549€). Quedan 4 productos no disponibles: Yangbaga acero inox, Ever Clean Total Cover, Tigerino Canada, Ever Clean Aqua Breeze.
3. `collar-antiladridos-perros` — **DETECTADO 2026-05-24.** MASBRILL Collar (B0BYJBKL8Z) no disponible (2 menciones). Revisar reemplazo.
4. `mejor-aspirador-pelo-mascotas` — 4 productos no disponibles.
5. `asiento-coche-perro` — DETECTADO 2026-05-24. Ruffwear Load Up (B00R36BWCO) no disponible; 4Knines Hammock cambio precio 65→95€.
6. `collar-gps-gato` — DETECTADO 2026-05-24. Tabcat (B09XF678NT) no disponible; Tractive Mini (B0BX6PCCWD) precio 24,99→43,05€ (desajuste grande).
7. **`mejor-rascador-gatos-guia` — REVISADO 2026-05-17. 5 productos reemplazados, 4 precios actualizados.**

## Muestras semanales

- 2026-05-24 (domingo, recuperación del viernes 2026-05-22): 10 artículos auditados (`--limit 10 --stdout --delay 5000`). 20 críticos, 14 medios, 9 bajos, 12 OK. Reporte vía stdout (no persistido). Detectados artículos para cola editorial arriba.
- 2026-05-25 (lunes): `champu-perros-piel-sensible` revisión cerrada. 0 críticos, 1 alto (TropiClean con stock escaso), 0 medios, 0 bajos, 5 OK. Corregido el tratamiento de `IN_STOCK_SCARCE` para que el sitio no presente como agotados los productos que siguen disponibles con pocas unidades. Los componentes Amazon ahora convierten las URLs limpias `/dp/ASIN` de contenido en enlaces externos correctos a `amazon.es`.
