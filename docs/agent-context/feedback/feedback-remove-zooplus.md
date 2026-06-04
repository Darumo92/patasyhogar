# Feedback: Zooplus desactivado

## No mostrar ni buscar Zooplus por defecto

El usuario confirmó el 2026-06-04 que Zooplus debe retirarse de la web porque no hay afiliado aprobado.

**Cómo aplicar:**

- No renderizar botones, iconos, enlaces, precios, menciones legales ni claims públicos de Zooplus.
- No usar copy tipo "3 tiendas" o "Amazon, Zooplus y Tiendanimal"; usar "tiendas seleccionadas" o mencionar solo Amazon/Tiendanimal cuando proceda.
- En artículos y revisiones nuevas, verificar Amazon con `scripts/amazon-api.mjs` y buscar Tiendanimal cuando tenga sentido. No buscar Zooplus salvo instrucción explícita del usuario.
- Los campos legacy `precioZooplus` y `enlaceZooplus` pueden quedar en contenido histórico mientras no se rendericen públicamente.
- Antes de cerrar tareas relacionadas con contenido/productos, ejecutar `node scripts/check-no-zooplus-public.mjs`.

**Objetivo:** reducir ruido de afiliación, evitar una tienda no monetizada y no dar señales públicas de comparativa con una tienda que ya no forma parte del modelo actual.
