# Verificación de productos — reglas críticas

## Nunca adivinar datos

- NUNCA adivinar precios, URLs, imágenes, ASINs ni specs de productos.
- Usar primero `scripts/amazon-api.mjs` para verificar Amazon: título, ASIN, precio, disponibilidad, imagen, URL, features/descripción y reseñas si la API las devuelve. Ver `docs/agent-context/reference/reference_amazon_api_workflow.md`.
- Si la API no devuelve un dato, preguntar al usuario solo por ese dato faltante o verificar por otra fuente permitida.

## Al cambiar un producto/ASIN

Actualizar TODO sin excepción:

1. `nombre` — debe coincidir con el producto real en Amazon.
2. `imagen` — usar la URL devuelta por Amazon API (`m.media-amazon.com`) si está disponible.
3. `precio` — usar el precio devuelta por Amazon API si está disponible.
4. `puntosFuertes` — describir el producto real, no el anterior.
5. Texto del artículo — análisis, tablas comparativas, FAQs, resumen.
6. Verificar que el producto encaja en la temática del artículo.

## Imágenes de productos

- CSP solo permite imágenes de `'self'` y `m.media-amazon.com` — nunca usar URLs de otros dominios directamente.
- Imágenes de Zooplus/Tiendanimal no funcionan (hotlinking bloqueado) — descargar a `public/images/productos/`.
- Pedir al usuario precio o imagen solo si Amazon API no los devuelve.
- Antes de commit, verificar que TODOS los productos en `ComparisonTable` tienen campo `imagen`.
- Imágenes hero de Pexels: comprobar duplicados por hash con `md5sum public/images/articulos/*.webp | sort | awk '{print $1}' | uniq -d`.
- **Imágenes Amazon optimizadas:** usar siempre `_AC_SL300_` en las URLs (no `_AC_SL1500_`). Las imágenes se muestran a 120-160px; 300px cubre 2x retina.

## Búsqueda en tiendas (obligatorio)

- Buscar/verificar cada producto individualmente en Amazon con `scripts/amazon-api.mjs` antes de escribir; después buscar Zooplus y Tiendanimal.
- Buscar por nombre exacto: `site:zooplus.es "[nombre producto]"` y `site:tiendanimal.es "[nombre producto]"`.
- Si el nombre no funciona, buscar también por marca.
- Verificar cada URL — confirmar que es el producto correcto, no una página genérica.
- Nunca inventar URLs de Zooplus o Tiendanimal.
- Orden: primero verificar Amazon → luego buscar Zooplus/Tiendanimal para la lista final.

## Verificar nombres

- No confiar en los nombres del artículo — verificar que cada nombre coincide con su ASIN antes de buscar en otras tiendas.

## TopPick y ComparisonTable sincronizados

- Si un producto es `TopPick` Y está en `ComparisonTable`, ambos deben tener los mismos enlaces de tiendas.

## Tiendas soportadas

- **Amazon**: tag `patasyhogar-21` (auto-appended por componentes)
- **Tiendanimal**: Webgains (`wgcampaignid=1746742`, `wgprogramid=9507`) — auto-appended por componentes
- **Zooplus**: sin código de afiliado aún (futuro)

## Auditoría recurrente

- `npm run audit:amazon` — una vez al mes, revisar todos los productos Amazon.
- `npm run update:amazon-cache` — una vez al mes, refrescar precio/imagen/disponibilidad en `src/data/amazon-products.json`.
- Muestra semanal: `node scripts/audit-amazon-products.mjs --limit 10 --stdout` o `--article <slug>`.
- El auditor genera reporte, no modifica artículos.
