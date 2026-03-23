# Plantilla: [Producto X] vs [Producto Y] — ¿Cuál es mejor para tu [perro/gato]?

## Estructura para artículos de comparación directa (X vs Y)

```mdx
---
titulo: "[Producto X] vs [Producto Y]: cuál elegir en 2026"
descripcion: "Comparamos [X] y [Y]: ingredientes, precio, opiniones y para qué tipo de [perro/gato] es mejor cada uno."
categoria: [categoría]
animal: [perro | gato | ambos]
fecha: [YYYY-MM-DD]
imagen: /images/articulos/[slug].webp
imagenAlt: "[descripción con keywords]"
tags: ["[X] vs [Y]", "[categoría]", "[animal]"]
faqs:
  - pregunta: "¿Es mejor [X] o [Y]?"
    respuesta: "[Respuesta directa con matiz según caso de uso]"
  - pregunta: "¿Cuál tiene mejor relación calidad-precio?"
    respuesta: "[Respuesta con datos de precio reales]"
  - pregunta: "¿Puedo combinar [X] y [Y]?"
    respuesta: "[Respuesta práctica]"
---

import ComparisonTable from '@/components/ComparisonTable.astro';
import TopPick from '@/components/TopPick.astro';

<TopPick
  nombre="[Ganador]"
  descripcion="[Por qué gana en contexto general]"
  precio="~[precio]€"
  enlaceAmazon="https://www.amazon.es/dp/[ASIN]"
  etiqueta="Nuestra elección"
  imagen="[URL imagen Amazon]"
/>

## [X] vs [Y]: comparativa rápida

[Tabla markdown con las diferencias clave: 5-7 criterios]

## [Producto X]: análisis completo

### Puntos fuertes
### Puntos débiles
### Para quién es ideal

## [Producto Y]: análisis completo

### Puntos fuertes
### Puntos débiles
### Para quién es ideal

## Comparación detallada

### [Criterio 1: ej. Ingredientes]
### [Criterio 2: ej. Precio]
### [Criterio 3: ej. Palatabilidad]
### [Criterio 4: ej. Disponibilidad]

## Veredicto: ¿cuál elegir?

[Recomendación por caso de uso específico, no genérica]

- **Elige [X] si:** [caso concreto]
- **Elige [Y] si:** [caso concreto]
```

## Reglas para comparaciones X vs Y

1. **Nunca declarar un ganador absoluto** — siempre depende del caso de uso
2. **Precios reales verificados** — nunca inventar precios
3. **Datos específicos** — gramos de proteína, no "tiene buena proteína"
4. **Reconocer fortalezas de ambos** — no sesgar hacia uno
5. **E-E-A-T:** incluir al menos una experiencia personal o dato verificable
6. **Enlazar a reviews individuales** si existen en el sitio
