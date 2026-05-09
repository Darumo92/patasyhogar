---
name: Añadir productos al registro del quiz
description: Al crear/modificar artículos comparativos, añadir también los productos al registro centralizado del recomendador
type: feedback
originSessionId: 4cb9c324-da6c-4be6-ab22-851cb2b8fea1
---
Al crear o modificar artículos comparativos, SIEMPRE añadir los productos al registro centralizado en `src/content/productos/[categoria].yaml` con sus filtros y afinidad para el quiz/recomendador.

**Why:** El recomendador universal en `/elegir/` se alimenta del registro de productos. Si un producto está en un artículo pero no en el registro, no aparece en las recomendaciones. El usuario quiere que el recomendador cubra TODA la web sin dejar nada fuera.

**How to apply:** En el checklist de creación/revisión de artículos, después de verificar productos y hacer build, añadir los productos al YAML correspondiente en `src/content/productos/` con id, datos de tiendas, categoría, subcategoría, animal, articuloSlug, descripcionCorta, filtros y afinidad.
