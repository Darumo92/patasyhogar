---
name: Amazon API workflow para productos
description: Método validado para verificar productos Amazon con scripts/amazon-api.mjs al crear o revisar comparativas.
type: reference
---

# Amazon API workflow

Usar `scripts/amazon-api.mjs` como primera fuente para productos Amazon en artículos comparativos.

## Requisitos

`.env` debe tener:

```bash
AMAZON_CLIENT_ID=...
AMAZON_CLIENT_SECRET=...
```

No imprimir ni copiar estos valores en respuestas al usuario.

## Comandos

Consultar ASINs concretos:

```bash
node scripts/amazon-api.mjs B0041TN666 B000T4FWQ4
```

Buscar productos por keyword:

```bash
node scripts/amazon-api.mjs --search "comedero automatico gatos"
```

Máximo recomendado: 10 ASINs por llamada.

Auditar todos los productos Amazon usados en artículos MDX:

```bash
npm run audit:amazon
```

Actualizar cache central de datos volátiles Amazon para el sitio estático:

```bash
npm run update:amazon-cache
```

Actualizar solo un artículo:

```bash
node scripts/update-amazon-cache.mjs --article mejor-comedero-automatico-wifi-gatos
```

El cache vive en `src/data/amazon-products.json`. Los componentes `ComparisonTable` y `TopPick` lo usan para sobreescribir precio e imagen de Amazon cuando hay datos disponibles, sin editar los MDX.

Auditar un artículo concreto:

```bash
node scripts/audit-amazon-products.mjs --article mejor-comedero-automatico-wifi-gatos
```

Auditar una muestra rápida:

```bash
node scripts/audit-amazon-products.mjs --limit 10 --stdout
```

El auditor genera un reporte Markdown en `reports/amazon-products/audit-YYYY-MM-DD.md` salvo que se use `--stdout`. No modifica artículos.

Si Amazon devuelve rate limit `429`, repetir con más pausa entre lotes:

```bash
node scripts/audit-amazon-products.mjs --delay 5000 --retries 5
```

## Datos que se pueden usar

- `asin` → para `enlaceAmazon: "/dp/ASIN"`.
- `itemInfo.title.displayValue` → nombre real del producto.
- `offersV2.listings[0].price.money.displayAmount` → precio actual.
- `offersV2.listings[0].availability.message` → disponibilidad.
- `images.primary.large.url` o `images.primary.medium.url` → imagen Amazon.
- `itemInfo.features` → puntos de producto si Amazon los devuelve.
- `customerReviews` → valoración/reseñas solo si Amazon lo devuelve.

## Reglas

- No asumir que todos los campos estarán presentes. Si falta precio, imagen, features o reseñas, no inventarlo.
- Si el producto existe en web pero la API no devuelve un campo, pedir al usuario solo ese dato faltante o verificar manualmente.
- Los artículos MDX no deben guardar URLs con `?tag=patasyhogar-21`; usar `/dp/ASIN` o URL limpia.
- Mantener imágenes de producto en `m.media-amazon.com` y preferir versión optimizada `_AC_SL300_`.
- Tras verificar Amazon, buscar equivalentes en Tiendanimal según las reglas del proyecto.

## Cadencia recomendada

- Mensual: ejecutar `npm run audit:amazon` para revisar todos los productos Amazon.
- Mensual: ejecutar `npm run update:amazon-cache` para refrescar precios, imágenes y disponibilidad desde Amazon API sin tocar artículos.
- Semanal: ejecutar el auditor/cache sobre 5-10 artículos prioritarios o artículos tocados recientemente.
- Antes de crear o revisar una comparativa: auditar todos sus ASINs.

## Severidades del auditor

- Crítico: ASIN no encontrado por Amazon API.
- Alto: sin precio, sin imagen, sin disponibilidad, producto no disponible o entrega problemática.
- Medio: título posiblemente distinto, imagen MDX fuera de `m.media-amazon.com`, precio muy distinto.
- Bajo: diferencia de precio moderada.

## Error corregido

El precio en Creators API no está en `price.displayAmount`. Está en:

```js
offersV2.listings[0].price.money.displayAmount
```
