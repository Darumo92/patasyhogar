# Feedback: densidad de afiliados

## CTAs de compra solo donde aportan comparación

El usuario confirmó el 2026-06-04 que quiere reducir la presión de afiliación en artículos. Regla activa: evitar botones repetidos por producto y tienda.

**Cómo aplicar:**

- `TopPick` debe ser editorial: imagen, nombre, descripción y precio orientativo/cacheado, sin enlaces a tienda.
- Los enlaces de compra de artículos comparativos deben vivir en `ComparisonTable`.
- No añadir `AffiliateButton` directo en MDX salvo instrucción explícita del usuario y justificación puntual.
- No añadir barras sticky de compra ni CTAs flotantes afiliados.
- Antes de cerrar cambios de artículos/componentes afiliados, ejecutar `node scripts/check-affiliate-density.mjs`.

**Motivo:** reducir apariencia de sitio thin-affiliate, mejorar lectura y concentrar la intención comercial en la tabla comparativa.
