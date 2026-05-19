# Quiz/Selector de Productos — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive quiz system that recommends products based on user answers, starting with a dog food selector quiz.

**Architecture:** Astro data collection for quiz definitions (YAML), static HTML pre-rendered at build time with vanilla JS (~120 lines) for client interaction. Two-phase recommendation engine: hard filters (eliminate incompatible products) then weighted scoring (rank by preferences). Results include affiliate links to Amazon/Zooplus/Tiendanimal reusing existing TopPick/ComparisonTable styling patterns.

**Tech Stack:** Astro 5 (static), YAML data collections with Zod validation, vanilla JS, plain CSS with existing custom properties.

**Spec:** `docs/superpowers/specs/2026-04-13-quiz-selector-productos-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/content/quizzes/pienso-perro.yaml` | Quiz data: questions, products, scoring |
| Modify | `src/content/config.ts` | Register `quizzes` data collection |
| Create | `src/components/QuizQuestion.astro` | Render one question with option buttons |
| Create | `src/components/QuizResult.astro` | Render recommendation card + alternatives |
| Create | `src/components/QuizCTA.astro` | Banner to embed in MDX articles |
| Create | `src/pages/selector/index.astro` | Landing page: grid of available quizzes |
| Create | `src/pages/selector/[slug].astro` | Dynamic quiz page: shell + questions + result + inline JS engine |
| Modify | `src/styles/global.css` | Quiz styles (prefixed `quiz-*`) |
| Modify | `src/components/Header.astro` | Add "Selector" nav link |
| Modify | `src/components/Footer.astro` | Add /selector/ to "Explorar" section |

---

### Task 1: Register quizzes data collection

**Files:**
- Modify: `src/content/config.ts`

- [ ] **Step 1: Add Zod schema and export collection**

In `src/content/config.ts`, add the quiz schemas and register the collection. The final file should be:

```typescript
import { defineCollection, z } from 'astro:content';

const CATEGORIAS = ['alimentacion', 'higiene', 'paseo', 'juguetes', 'hogar'] as const;
const ANIMALES = ['perro', 'gato', 'ambos'] as const;
const TIPOS = ['comparativa', 'informativo'] as const;

const articulos = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    categoria: z.enum(CATEGORIAS),
    animal: z.enum(ANIMALES),
    tipo: z.enum(TIPOS).default('comparativa'),
    fecha: z.coerce.date(),
    imagen: z.string().optional(),
    imagenAlt: z.string().optional(),
    destacado: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    actualizadoEn: z.coerce.date().optional(),
    faqs: z.array(z.object({
      pregunta: z.string(),
      respuesta: z.string(),
    })).optional(),
  }),
});

const quizOpcion = z.object({
  texto: z.string(),
  tags: z.record(z.union([z.string(), z.number()])),
});

const quizPregunta = z.object({
  id: z.string(),
  texto: z.string(),
  tipo: z.enum(['single']).default('single'),
  opciones: z.array(quizOpcion).min(2),
});

const quizProducto = z.object({
  nombre: z.string(),
  imagen: z.string().optional(),
  precio: z.string(),
  precioAmazon: z.string().optional(),
  precioZooplus: z.string().optional(),
  precioTiendanimal: z.string().optional(),
  enlaceAmazon: z.string().optional(),
  enlaceZooplus: z.string().optional(),
  enlaceTiendanimal: z.string().optional(),
  articuloSlug: z.string(),
  descripcionCorta: z.string(),
  filtros: z.record(z.array(z.string())),
  pesos: z.record(z.number()),
});

const quizzes = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    titulo: z.string(),
    descripcion: z.string(),
    animal: z.enum(ANIMALES),
    imagen: z.string().optional(),
    imagenAlt: z.string().optional(),
    preguntas: z.array(quizPregunta).min(1),
    productos: z.array(quizProducto).min(1),
    faqs: z.array(z.object({
      pregunta: z.string(),
      respuesta: z.string(),
    })).optional(),
  }),
});

export const collections = { articulos, quizzes };
```

- [ ] **Step 2: Create quizzes directory**

```bash
mkdir -p src/content/quizzes
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build 2>&1 | head -20
```

Expected: Build succeeds (no quizzes yet, empty collection is fine).

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: register quizzes data collection with Zod schema"
```

---

### Task 2: Create quiz data file (pienso-perro)

**Files:**
- Create: `src/content/quizzes/pienso-perro.yaml`

This is the largest file in the project. It contains all 5 questions, 16 products with real data extracted from existing articles, and FAQs. All product data (ASINs, prices, images) comes from the existing MDX articles — nothing is invented.

- [ ] **Step 1: Create the quiz YAML**

Create `src/content/quizzes/pienso-perro.yaml` with the full quiz definition. Product data is extracted from existing articles — every ASIN, price, and image URL matches what's already published.

```yaml
slug: pienso-perro
titulo: "¿Qué pienso necesita tu perro?"
descripcion: "Responde 5 preguntas sobre tu perro y descubre qué pienso le conviene. Recomendaciones personalizadas con precios en Amazon, Zooplus y Tiendanimal."
animal: perro
imagen: /images/selector/pienso-perro.webp
imagenAlt: "Perro comiendo pienso de su comedero"

preguntas:
  - id: tamano
    texto: "¿Qué tamaño tiene tu perro?"
    tipo: single
    opciones:
      - texto: "Pequeño (menos de 10 kg)"
        tags: { tamano: "pequeno" }
      - texto: "Mediano (10-25 kg)"
        tags: { tamano: "mediano" }
      - texto: "Grande (25-45 kg)"
        tags: { tamano: "grande" }
      - texto: "Gigante (más de 45 kg)"
        tags: { tamano: "grande" }

  - id: edad
    texto: "¿Qué edad tiene?"
    tipo: single
    opciones:
      - texto: "Cachorro (menos de 1 año)"
        tags: { etapa: "cachorro" }
      - texto: "Adulto (1-7 años)"
        tags: { etapa: "adulto" }
      - texto: "Senior (más de 7 años)"
        tags: { etapa: "senior" }

  - id: condicion
    texto: "¿Tiene alguna necesidad especial?"
    tipo: single
    opciones:
      - texto: "Esterilizado o castrado"
        tags: { esterilizado: 1 }
      - texto: "Sobrepeso o tendencia a engordar"
        tags: { sobrepeso: 1 }
      - texto: "Piel sensible o alergias"
        tags: { piel_sensible: 1 }
      - texto: "Problemas digestivos"
        tags: { digestivo: 1 }
      - texto: "Diabético"
        tags: { diabetico: 1 }
      - texto: "Ninguna en particular"
        tags: {}

  - id: actividad
    texto: "¿Cuánta actividad diaria hace?"
    tipo: single
    opciones:
      - texto: "Poca (paseos cortos)"
        tags: { actividad_baja: 1 }
      - texto: "Moderada (1-2 horas de paseo)"
        tags: { actividad_moderada: 1 }
      - texto: "Alta (deporte, campo, trabajo)"
        tags: { actividad_alta: 1 }

  - id: presupuesto
    texto: "¿Qué presupuesto manejas al mes?"
    tipo: single
    opciones:
      - texto: "Económico (menos de 30€/mes)"
        tags: { presupuesto_economico: 1 }
      - texto: "Medio (30-50€/mes)"
        tags: { presupuesto_medio: 1 }
      - texto: "Premium (lo mejor, sin límite)"
        tags: { presupuesto_premium: 1 }

productos:
  # === PEQUEÑO ===
  - nombre: "Royal Canin Mini Adult"
    imagen: "https://m.media-amazon.com/images/I/51Ro8SkLgNL._AC_SL300_.jpg"
    precio: "~52€"
    precioAmazon: "51,52€ (8 kg)"
    enlaceAmazon: "https://www.amazon.es/dp/B000T4FWQ4"
    articuloSlug: mejor-pienso-perro-raza-pequena
    descripcionCorta: "El estándar veterinario para razas pequeñas. Croqueta adaptada a mandíbulas pequeñas, alta palatabilidad y fórmula contrastada."
    filtros:
      etapa: [adulto]
      tamano: [pequeno]
    pesos:
      actividad_moderada: 2
      actividad_baja: 2
      presupuesto_medio: 3
      presupuesto_economico: 1
      digestivo: 2
      esterilizado: 1

  - nombre: "Orijen Small Breed"
    imagen: "https://m.media-amazon.com/images/I/61l3Qn78jEL._AC_SL300_.jpg"
    precio: "~52€"
    precioAmazon: "52,29€"
    enlaceAmazon: "https://www.amazon.es/dp/B08LRFRVQS"
    articuloSlug: mejor-pienso-perro-raza-pequena
    descripcionCorta: "85% ingredientes animales, sin cereales. La opción premium sin compromisos para razas pequeñas activas."
    filtros:
      etapa: [adulto]
      tamano: [pequeno]
    pesos:
      actividad_alta: 3
      actividad_moderada: 2
      presupuesto_premium: 3
      digestivo: 2
      piel_sensible: 1

  # === MEDIANO ===
  - nombre: "Orijen Original"
    imagen: "https://m.media-amazon.com/images/I/61KdEvWe+0L._AC_SL300_.jpg"
    precio: "~83€"
    precioAmazon: "83,25€ (11,4 kg)"
    enlaceAmazon: "https://www.amazon.es/dp/B06XNBWL48"
    articuloSlug: mejor-pienso-perro-adulto-raza-mediana
    descripcionCorta: "85% ingredientes animales, sin cereales. Máxima densidad nutricional para perros medianos activos."
    filtros:
      etapa: [adulto]
      tamano: [mediano]
    pesos:
      actividad_alta: 3
      actividad_moderada: 2
      presupuesto_premium: 3
      digestivo: 3
      piel_sensible: 1

  - nombre: "Acana Adult Dog"
    imagen: "https://m.media-amazon.com/images/I/71II6RWqfkL._AC_SL300_.jpg"
    precio: "~75€"
    precioAmazon: "74,57€ (11,4 kg)"
    enlaceAmazon: "https://www.amazon.es/dp/B01C6TXKZ4"
    articuloSlug: mejor-pienso-perro-adulto-raza-mediana
    descripcionCorta: "70% ingredientes animales con pollo de granja. Grain-free equilibrado a un precio razonable."
    filtros:
      etapa: [adulto]
      tamano: [mediano]
    pesos:
      actividad_moderada: 3
      actividad_alta: 2
      presupuesto_medio: 3
      presupuesto_premium: 2
      digestivo: 2

  # === GRANDE ===
  - nombre: "Royal Canin Maxi Adult"
    imagen: "https://m.media-amazon.com/images/I/61PNX8UYIJL._AC_SL300_.jpg"
    precio: "~83€"
    precioAmazon: "82,50€ (15 kg)"
    enlaceAmazon: "https://www.amazon.es/dp/B007WIUS3M"
    articuloSlug: mejor-pienso-perro-raza-grande
    descripcionCorta: "Croqueta adaptada a razas grandes con glucosamina y condroitina para articulaciones. Alta digestibilidad."
    filtros:
      etapa: [adulto]
      tamano: [grande]
    pesos:
      actividad_moderada: 3
      actividad_baja: 2
      presupuesto_medio: 3
      presupuesto_economico: 1
      digestivo: 2
      esterilizado: 1

  - nombre: "Orijen Original (Razas grandes)"
    imagen: "https://m.media-amazon.com/images/I/61KdEvWe+0L._AC_SL300_.jpg"
    precio: "~83€"
    precioAmazon: "83,25€ (11,4 kg)"
    enlaceAmazon: "https://www.amazon.es/dp/B06XNBWL48"
    articuloSlug: mejor-pienso-perro-raza-grande
    descripcionCorta: "Sin cereales, 85% ingredientes animales frescos. 38% proteína de pollo, pavo y arenque."
    filtros:
      etapa: [adulto]
      tamano: [grande]
    pesos:
      actividad_alta: 3
      actividad_moderada: 2
      presupuesto_premium: 3
      digestivo: 2
      piel_sensible: 1

  # === CACHORRO ===
  - nombre: "Royal Canin Maxi Puppy"
    imagen: "https://m.media-amazon.com/images/I/517I1wtlEqL._AC_SL300_.jpg"
    precio: "~74€"
    precioAmazon: "73,92€"
    enlaceAmazon: "https://www.amazon.es/Royal-Canin-Maxi-Junior-cachorros/dp/B007WIHE1G"
    articuloSlug: mejor-pienso-cachorro-raza-grande
    descripcionCorta: "Calcio y fósforo equilibrados para un crecimiento seguro. Digestibilidad excelente y croqueta adaptada a cachorros."
    filtros:
      etapa: [cachorro]
      tamano: [mediano, grande]
    pesos:
      actividad_alta: 2
      actividad_moderada: 2
      presupuesto_medio: 3
      presupuesto_economico: 1
      digestivo: 2

  - nombre: "Purina Pro Plan Puppy Large Robust"
    imagen: "https://m.media-amazon.com/images/I/7144-oyklFL._AC_SL300_.jpg"
    precio: "~54€"
    precioAmazon: "54,03€"
    enlaceAmazon: "https://www.amazon.es/Purina-ProPlan-Robust-Balance-Cachorro/dp/B00Y9SSWOU"
    articuloSlug: mejor-pienso-cachorro-raza-grande
    descripcionCorta: "Fórmula Healthy Start con colostro para defensas y DHA para desarrollo cerebral. Saco de 12 kg."
    filtros:
      etapa: [cachorro]
      tamano: [mediano, grande]
    pesos:
      actividad_moderada: 2
      actividad_alta: 1
      presupuesto_economico: 3
      presupuesto_medio: 2
      digestivo: 1

  # === SENIOR ===
  - nombre: "Royal Canin Maxi Ageing 8+"
    imagen: "https://m.media-amazon.com/images/I/81kuGCN7ttL._AC_SL300_.jpg"
    precio: "~32€"
    precioAmazon: "31,94€ (3 kg)"
    enlaceAmazon: "https://www.amazon.es/dp/B007ZYR6LA"
    articuloSlug: mejor-pienso-perro-senior
    descripcionCorta: "Fórmula específica para perros grandes senior. Condroprotectores y croqueta adaptada a mandíbulas con menos fuerza."
    filtros:
      etapa: [senior]
      tamano: [mediano, grande]
    pesos:
      actividad_baja: 3
      actividad_moderada: 2
      presupuesto_medio: 2
      presupuesto_economico: 2
      digestivo: 2

  - nombre: "Eukanuba Senior Medium Pollo"
    imagen: "https://m.media-amazon.com/images/I/71ZzvG1AiwL._AC_SL300_.jpg"
    precio: "~79€"
    precioAmazon: "79,25€ (15 kg)"
    enlaceAmazon: "https://www.amazon.es/dp/B00CGOSQ5Y"
    articuloSlug: mejor-pienso-perro-senior
    descripcionCorta: "Mejor precio/kg para perros senior. Condroitina y glucosamina naturales, DHA para función cognitiva."
    filtros:
      etapa: [senior]
      tamano: [mediano, grande]
    pesos:
      actividad_moderada: 2
      actividad_baja: 2
      presupuesto_economico: 3
      presupuesto_medio: 2
      digestivo: 1

  # === ESTERILIZADO ===
  - nombre: "Royal Canin Medium Sterilised"
    imagen: "https://m.media-amazon.com/images/I/51o3jvkbhzL._AC_SL300_.jpg"
    precio: "~29€"
    precioAmazon: "29,13€ (3 kg)"
    enlaceAmazon: "https://www.amazon.es/dp/B005K7HYS4"
    articuloSlug: mejor-pienso-perro-esterilizado
    descripcionCorta: "El estándar veterinario para esterilizados. 28% proteína, 13% grasa y L-carnitina para control de peso."
    filtros:
      etapa: [adulto]
      tamano: [mediano, grande]
    pesos:
      esterilizado: 5
      sobrepeso: 3
      actividad_baja: 2
      actividad_moderada: 1
      presupuesto_medio: 2
      presupuesto_economico: 2

  - nombre: "Purina Pro Plan Light/Sterilised Cordero"
    imagen: "https://m.media-amazon.com/images/I/81b238f203L._AC_SL300_.jpg"
    precio: "~63€"
    precioAmazon: "63,23€ (14 kg)"
    enlaceAmazon: "https://www.amazon.es/dp/B0CSKRMBHK"
    articuloSlug: mejor-pienso-perro-esterilizado
    descripcionCorta: "Cordero como ingrediente principal, excelente digestibilidad. Saco de 14 kg con el mejor precio/kg para esterilizados."
    filtros:
      etapa: [adulto]
      tamano: [mediano, grande]
    pesos:
      esterilizado: 4
      sobrepeso: 3
      actividad_moderada: 2
      presupuesto_economico: 3
      presupuesto_medio: 2
      digestivo: 2

  # === HIPOALERGÉNICO ===
  - nombre: "Royal Canin Hypoallergenic"
    imagen: "https://m.media-amazon.com/images/I/519EAoli2jL._AC_SL300_.jpg"
    precio: "~22€"
    precioAmazon: "22,28€ (2 kg)"
    enlaceAmazon: "https://www.amazon.es/dp/B0041TS3DC"
    articuloSlug: mejor-pienso-hipoalergenico-perro
    descripcionCorta: "Proteína hidrolizada de bajo peso molecular. La fórmula veterinaria de referencia para alergias alimentarias."
    filtros:
      etapa: [adulto, senior]
      tamano: [pequeno, mediano, grande]
    pesos:
      piel_sensible: 5
      digestivo: 3
      presupuesto_medio: 1
      presupuesto_premium: 2

  - nombre: "Hill's z/d Prescription Diet"
    imagen: "https://m.media-amazon.com/images/I/51HvY1ic3rL._AC_SL300_.jpg"
    precio: "~67€"
    precioAmazon: "66,99€"
    enlaceAmazon: "https://www.amazon.es/dp/B0015TLP86"
    articuloSlug: mejor-pienso-hipoalergenico-perro
    descripcionCorta: "Proteína hidrolizada de pollo ultrafiltrada, una sola fuente de carbohidrato. Evidencia clínica sólida."
    filtros:
      etapa: [adulto, senior]
      tamano: [pequeno, mediano, grande]
    pesos:
      piel_sensible: 4
      digestivo: 4
      presupuesto_premium: 2

  # === DIABÉTICO ===
  - nombre: "Royal Canin Diabetic DS37"
    imagen: "https://m.media-amazon.com/images/I/6101d9gzNDL._AC_SL300_.jpg"
    precio: "~92€"
    precioAmazon: "91,99€ (12 kg)"
    enlaceAmazon: "https://www.amazon.es/dp/B009PZISPA"
    articuloSlug: mejor-pienso-perro-diabetico
    descripcionCorta: "Fórmula con cebada de absorción lenta y alta fibra. El pienso más recetado por veterinarios para diabetes canina."
    filtros:
      etapa: [adulto, senior]
      tamano: [pequeno, mediano, grande]
    pesos:
      diabetico: 5
      sobrepeso: 2
      presupuesto_medio: 1
      presupuesto_premium: 2

  - nombre: "Purina Pro Plan DM Diabetes Management"
    imagen: "https://m.media-amazon.com/images/I/71E1wdICuSL._AC_SL300_.jpg"
    precio: "~29€"
    precioAmazon: "28,98€ (3 kg)"
    enlaceAmazon: "https://www.amazon.es/dp/B015NXJTE6"
    articuloSlug: mejor-pienso-perro-diabetico
    descripcionCorta: "Alta proteína, baja en carbohidratos. Enfoque bajo en almidón con buena palatabilidad."
    filtros:
      etapa: [adulto, senior]
      tamano: [pequeno, mediano, grande]
    pesos:
      diabetico: 4
      sobrepeso: 2
      presupuesto_economico: 2
      presupuesto_medio: 2

faqs:
  - pregunta: "¿El selector sustituye al consejo de un veterinario?"
    respuesta: "No. Este selector te orienta hacia piensos de calidad adecuados al perfil de tu perro, pero si tiene problemas de salud (diabetes, alergias graves, enfermedad renal) siempre debes consultar con tu veterinario antes de cambiar su alimentación."
  - pregunta: "¿Los precios son exactos?"
    respuesta: "Los precios son orientativos y se actualizan periódicamente. Haz clic en el enlace de cada tienda para ver el precio actual. Comparamos Amazon, Zooplus y Tiendanimal para que encuentres la mejor oferta."
  - pregunta: "¿Puedo repetir el test con otras respuestas?"
    respuesta: "Sí, pulsa 'Volver a empezar' en la pantalla de resultados para probar con un perfil diferente. Es útil si tienes más de un perro o quieres explorar opciones."
  - pregunta: "¿Cómo cambio de pienso sin problemas digestivos?"
    respuesta: "La transición debe ser gradual durante 7-10 días. Empieza mezclando un 25% del pienso nuevo con un 75% del anterior los primeros 3 días, luego 50/50 otros 3, después 75/25, y finalmente 100% del nuevo."
```

- [ ] **Step 2: Create placeholder image directory**

```bash
mkdir -p public/images/selector
```

Note: The hero image (`/images/selector/pienso-perro.webp`) needs to be downloaded via Pexels. This can be done later — the quiz will render fine without it. Use a search like `"dog eating kibble food bowl"` with `pexels-download.mjs`.

- [ ] **Step 3: Verify build passes with quiz data**

```bash
npm run build 2>&1 | tail -5
```

Expected: Build succeeds. Astro validates the YAML against the Zod schema. Any validation error means a field is wrong.

- [ ] **Step 4: Commit**

```bash
git add src/content/quizzes/pienso-perro.yaml
git commit -m "feat: add dog food quiz data with 16 products from existing articles"
```

---

### Task 3: Add quiz styles to global.css

**Files:**
- Modify: `src/styles/global.css`

Add all quiz styles before the implementation components, so they're available when we build. All classes use `quiz-` prefix to avoid collisions.

- [ ] **Step 1: Add quiz styles at the end of global.css**

Append the following CSS block at the end of `src/styles/global.css`:

```css
/* =========================================
   QUIZ / SELECTOR
   ========================================= */

/* Quiz landing grid */
.quiz-landing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.quiz-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  transition: box-shadow var(--transition), transform var(--transition);
}

.quiz-card-link:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  color: inherit;
}

.quiz-card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.quiz-card-body {
  padding: 1.25rem;
}

.quiz-card-body h2 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  letter-spacing: -0.01em;
}

.quiz-card-body p {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin: 0 0 0.75rem;
}

.quiz-card-meta {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-primary);
}

/* Quiz shell */
.quiz-container {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem var(--container-padding);
}

/* Quiz intro */
.quiz-intro {
  text-align: center;
}

.quiz-intro-img {
  width: 100%;
  max-width: 480px;
  height: auto;
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
}

.quiz-intro h1 {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.quiz-intro-desc {
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.quiz-intro-meta {
  font-size: 0.85rem;
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
}

.quiz-start-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background: var(--color-primary);
  border: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: background var(--transition), transform var(--duration-fast) var(--ease-out);
}

.quiz-start-btn:hover {
  background: var(--color-primary-dark);
}

.quiz-start-btn:active {
  transform: scale(0.97);
}

/* Progress bar */
.quiz-progress {
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.quiz-progress-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 2px;
  transition: width var(--duration-slow) var(--ease-out);
}

/* Question */
.quiz-step {
  display: none;
}

.quiz-step.quiz-step--active {
  display: block;
  animation: quizFadeIn 250ms var(--ease-out);
}

@keyframes quizFadeIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .quiz-step.quiz-step--active {
    animation: none;
  }
}

.quiz-question-text {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 1.25rem;
  text-align: center;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.quiz-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 1.25rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  background: var(--color-bg-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: left;
  transition: border-color var(--transition), background var(--transition), transform var(--duration-fast) var(--ease-out);
}

.quiz-option:hover {
  border-color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 5%, var(--color-bg-card));
}

.quiz-option:active {
  transform: scale(0.98);
}

.quiz-option--selected {
  border-color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 8%, var(--color-bg-card));
}

.quiz-option--selected::before {
  content: '';
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--color-primary);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M20 6L9 17l-5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

.quiz-option:not(.quiz-option--selected)::before {
  content: '';
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  background: var(--color-bg);
}

.quiz-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1.5rem;
  padding: 0.5rem 0;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-light);
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--transition);
}

.quiz-back-btn:hover {
  color: var(--color-text);
}

/* Result section */
.quiz-result {
  display: none;
}

.quiz-result.quiz-result--visible {
  display: block;
  animation: quizFadeIn 350ms var(--ease-out);
}

.quiz-result-title {
  font-size: 1.3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 0.5rem;
}

.quiz-result-summary {
  text-align: center;
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.quiz-result-summary strong {
  color: var(--color-text);
}

/* Main recommendation (TopPick style) */
.quiz-rec-main {
  background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 5%, var(--color-bg-card)) 0%, color-mix(in srgb, var(--color-primary) 10%, var(--color-bg-card)) 100%);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-xl);
  padding: 1.75rem 1.5rem 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.quiz-rec-badge {
  position: absolute;
  top: -0.8rem;
  left: 1.25rem;
  background: var(--color-primary);
  color: #fff;
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-pill);
  font-size: 0.7rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.quiz-rec-body {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  margin-top: 0.25rem;
}

.quiz-rec-img {
  flex-shrink: 0;
  width: 130px;
  height: 130px;
  object-fit: contain;
  background: var(--color-bg-muted);
  border-radius: var(--radius-md);
  padding: 0.5rem;
}

.quiz-rec-info {
  flex: 1;
  min-width: 0;
}

.quiz-rec-name {
  font-size: 1.15rem;
  font-weight: 800;
  margin: 0 0 0.4rem;
  letter-spacing: -0.02em;
}

.quiz-rec-desc {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin: 0 0 0.6rem;
}

.quiz-rec-price {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-primary);
  margin: 0 0 0.75rem;
}

.quiz-rec-stores {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.quiz-rec-article-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
}

.quiz-rec-article-link:hover {
  text-decoration: underline;
}

/* Alternatives */
.quiz-alts-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--color-text-muted);
}

.quiz-alt-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  margin-bottom: 0.75rem;
  background: var(--color-bg-card);
  transition: box-shadow var(--transition);
}

.quiz-alt-card:hover {
  box-shadow: var(--shadow-sm);
}

.quiz-alt-img {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  object-fit: contain;
  background: var(--color-bg-muted);
  border-radius: var(--radius-sm);
  padding: 0.35rem;
}

.quiz-alt-info {
  flex: 1;
  min-width: 0;
}

.quiz-alt-name {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.quiz-alt-desc {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin: 0 0 0.5rem;
}

.quiz-alt-price {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-primary);
  margin: 0 0 0.5rem;
}

.quiz-alt-stores {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

/* Restart and actions */
.quiz-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 2rem;
}

.quiz-restart-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.65rem 1.5rem;
  font-family: var(--font-sans);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text-muted);
  background: var(--color-bg-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: all var(--transition);
}

.quiz-restart-btn:hover {
  color: var(--color-text);
  border-color: var(--color-text-light);
}

/* Shared result notice */
.quiz-shared-notice {
  text-align: center;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  background: var(--color-bg-muted);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.quiz-shared-notice a {
  font-weight: 600;
  color: var(--color-primary);
}

/* Quiz CTA banner for articles */
.quiz-cta {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  margin: 2rem 0;
  background: color-mix(in srgb, var(--color-primary) 5%, var(--color-bg-card));
  border: 1px solid color-mix(in srgb, var(--color-primary) 20%, var(--color-border));
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--color-text);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.quiz-cta:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  color: var(--color-text);
}

.quiz-cta-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: #fff;
  border-radius: 50%;
}

.quiz-cta-text {
  flex: 1;
}

.quiz-cta-text strong {
  display: block;
  font-size: 0.95rem;
  margin-bottom: 0.15rem;
}

.quiz-cta-text span {
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.quiz-cta-arrow {
  font-size: 1.2rem;
  color: var(--color-primary);
  font-weight: 700;
}

/* Quiz FAQs */
.quiz-faqs {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.quiz-faqs h2 {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.quiz-faq-item {
  margin-bottom: 1rem;
}

.quiz-faq-item h3 {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.quiz-faq-item p {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
}

/* Responsive */
@media (max-width: 540px) {
  .quiz-intro h1 {
    font-size: 1.4rem;
  }

  .quiz-rec-body {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .quiz-rec-img {
    width: 140px;
    height: 140px;
  }

  .quiz-rec-stores {
    justify-content: center;
  }

  .quiz-rec-article-link {
    width: 100%;
    justify-content: center;
  }

  .quiz-alt-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .quiz-alt-stores {
    justify-content: center;
  }

  .quiz-landing-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add quiz component styles to global.css"
```

---

### Task 4: Create QuizQuestion component

**Files:**
- Create: `src/components/QuizQuestion.astro`

- [ ] **Step 1: Create the component**

Create `src/components/QuizQuestion.astro`:

```astro
---
interface Opcion {
  texto: string;
  tags: Record<string, string | number>;
}

interface Props {
  id: string;
  texto: string;
  opciones: Opcion[];
  stepIndex: number;
}

const { id, texto, opciones, stepIndex } = Astro.props;
---

<div
  class="quiz-step"
  data-step={stepIndex}
  data-question-id={id}
  role="radiogroup"
  aria-labelledby={`q-${id}`}
>
  <h2 id={`q-${id}`} class="quiz-question-text">{texto}</h2>
  <div class="quiz-options">
    {opciones.map((opt, i) => (
      <button
        type="button"
        class="quiz-option"
        role="radio"
        aria-checked="false"
        data-option-index={i}
        data-tags={JSON.stringify(opt.tags)}
      >
        {opt.texto}
      </button>
    ))}
  </div>
  {stepIndex > 0 && (
    <button type="button" class="quiz-back-btn" data-action="back">
      ← Volver
    </button>
  )}
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuizQuestion.astro
git commit -m "feat: add QuizQuestion component"
```

---

### Task 5: Create QuizResult component

**Files:**
- Create: `src/components/QuizResult.astro`

This component renders all products as hidden HTML. The JS engine shows the right ones.

- [ ] **Step 1: Create the component**

Create `src/components/QuizResult.astro`:

```astro
---
import StoreIcon from './StoreIcon.astro';

interface Producto {
  nombre: string;
  imagen?: string;
  precio: string;
  precioAmazon?: string;
  precioZooplus?: string;
  precioTiendanimal?: string;
  enlaceAmazon?: string;
  enlaceZooplus?: string;
  enlaceTiendanimal?: string;
  articuloSlug: string;
  descripcionCorta: string;
  filtros: Record<string, string[]>;
  pesos: Record<string, number>;
}

interface FAQ {
  pregunta: string;
  respuesta: string;
}

interface Props {
  productos: Producto[];
  faqs?: FAQ[];
}

const { productos, faqs } = Astro.props;

const AMAZON_TAG = 'patasyhogar-21';
const WEBGAINS_CAMPAIGN = '1746742';
const WEBGAINS_PROGRAM = '9507';

function amazonHref(url: string): string {
  if (url.includes('tag=')) return url;
  return `${url}${url.includes('?') ? '&' : '?'}tag=${AMAZON_TAG}`;
}

function tiendanimalHref(url: string): string {
  return `https://assets.ikhnaie.me/click.html?wgcampaignid=${WEBGAINS_CAMPAIGN}&wgprogramid=${WEBGAINS_PROGRAM}&wgtarget=${encodeURIComponent(url)}`;
}

function optimizeImg(url?: string): string | undefined {
  return url?.replace(/\._AC_SL\d+_/, '._AC_SL300_');
}

function buildStores(p: Producto) {
  const stores: { nombre: string; clase: string; precio: string; href: string }[] = [];
  if (p.enlaceAmazon) stores.push({ nombre: 'Amazon', clase: 'amazon', precio: p.precioAmazon || p.precio, href: amazonHref(p.enlaceAmazon) });
  if (p.enlaceZooplus) stores.push({ nombre: 'Zooplus', clase: 'zooplus', precio: p.precioZooplus || p.precio, href: p.enlaceZooplus });
  if (p.enlaceTiendanimal) stores.push({ nombre: 'Tiendanimal', clase: 'tiendanimal', precio: p.precioTiendanimal || p.precio, href: tiendanimalHref(p.enlaceTiendanimal) });
  return stores;
}

function articuloUrl(slug: string): string {
  // Product articles are always comparativas under their category
  // The slug contains enough info; we build a relative path that works
  return `/alimentacion/${slug}/`;
}
---

<div class="quiz-result" id="quiz-result">
  <div class="quiz-shared-notice" id="quiz-shared-notice" style="display:none;">
    Resultado basado en respuestas compartidas.
    <a href="#" id="quiz-shared-redo">¿Quieres hacer el test tú?</a>
  </div>

  <h2 class="quiz-result-title">Tu pienso ideal es...</h2>
  <p class="quiz-result-summary" id="quiz-result-summary"></p>

  {/* Main recommendation — one per product, JS shows the winner */}
  {productos.map((p, i) => {
    const stores = buildStores(p);
    return (
      <div class="quiz-rec-main" data-product-index={i} style="display:none;">
        <span class="quiz-rec-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Nuestra recomendación
        </span>
        <div class="quiz-rec-body">
          {p.imagen && (
            <img
              src={optimizeImg(p.imagen)}
              alt={p.nombre}
              width="130"
              height="130"
              class="quiz-rec-img"
              loading="lazy"
              decoding="async"
            />
          )}
          <div class="quiz-rec-info">
            <p class="quiz-rec-name">{p.nombre}</p>
            <p class="quiz-rec-desc">{p.descripcionCorta}</p>
            <p class="quiz-rec-price">{p.precio}</p>
            <div class="quiz-rec-stores">
              {stores.map(s => (
                <a
                  href={s.href}
                  class={`affiliate-button ${s.clase}`}
                  target="_blank"
                  rel="nofollow noopener noreferrer sponsored"
                >
                  <StoreIcon tienda={s.clase as any} size={15} />
                  {s.nombre} — {s.precio}
                </a>
              ))}
            </div>
            <a href={articuloUrl(p.articuloSlug)} class="quiz-rec-article-link">
              Lee nuestro análisis completo →
            </a>
          </div>
        </div>
      </div>
    );
  })}

  {/* Alternative cards — also one per product, JS shows #2 and #3 */}
  <div id="quiz-alts-container" style="display:none;">
    <p class="quiz-alts-title">Otras buenas opciones</p>
    {productos.map((p, i) => {
      const stores = buildStores(p);
      return (
        <div class="quiz-alt-card" data-product-index={i} style="display:none;">
          {p.imagen && (
            <img
              src={optimizeImg(p.imagen)}
              alt={p.nombre}
              width="80"
              height="80"
              class="quiz-alt-img"
              loading="lazy"
              decoding="async"
            />
          )}
          <div class="quiz-alt-info">
            <p class="quiz-alt-name">{p.nombre}</p>
            <p class="quiz-alt-desc">{p.descripcionCorta}</p>
            <p class="quiz-alt-price">{p.precio}</p>
            <div class="quiz-alt-stores">
              {stores.map(s => (
                <a
                  href={s.href}
                  class={`affiliate-button ${s.clase}`}
                  target="_blank"
                  rel="nofollow noopener noreferrer sponsored"
                  style="font-size:0.8rem;padding:0.45rem 0.85rem;"
                >
                  <StoreIcon tienda={s.clase as any} size={13} />
                  {s.nombre} — {s.precio}
                </a>
              ))}
            </div>
          </div>
        </div>
      );
    })}
  </div>

  {/* Actions */}
  <div class="quiz-actions">
    <button type="button" class="quiz-restart-btn" id="quiz-restart">
      ↻ Volver a empezar
    </button>
  </div>

  {/* FAQs */}
  {faqs && faqs.length > 0 && (
    <div class="quiz-faqs">
      <h2>Preguntas frecuentes</h2>
      {faqs.map(faq => (
        <div class="quiz-faq-item">
          <h3>{faq.pregunta}</h3>
          <p>{faq.respuesta}</p>
        </div>
      ))}
    </div>
  )}
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuizResult.astro
git commit -m "feat: add QuizResult component with product cards and FAQs"
```

---

### Task 6: Create QuizCTA component

**Files:**
- Create: `src/components/QuizCTA.astro`

- [ ] **Step 1: Create the component**

Create `src/components/QuizCTA.astro`:

```astro
---
interface Props {
  slug: string;
  titulo?: string;
  descripcion?: string;
}

const {
  slug,
  titulo = '¿No sabes cuál elegir?',
  descripcion = 'Nuestro selector te recomienda uno en menos de un minuto.',
} = Astro.props;
---

<a href={`/selector/${slug}/`} class="quiz-cta">
  <span class="quiz-cta-icon" aria-hidden="true">
    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></svg>
  </span>
  <span class="quiz-cta-text">
    <strong>{titulo}</strong>
    <span>{descripcion}</span>
  </span>
  <span class="quiz-cta-arrow" aria-hidden="true">→</span>
</a>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuizCTA.astro
git commit -m "feat: add QuizCTA banner component for article embeds"
```

---

### Task 7: Create quiz page [slug].astro with inline JS engine

**Files:**
- Create: `src/pages/selector/[slug].astro`

This is the main quiz page. It fetches quiz data, renders components, includes Schema.org, and contains the inline quiz engine JS.

- [ ] **Step 1: Create the page**

Create `src/pages/selector/[slug].astro`:

```astro
---
import Base from '@/layouts/Base.astro';
import QuizQuestion from '@/components/QuizQuestion.astro';
import QuizResult from '@/components/QuizResult.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const quizzes = await getCollection('quizzes');
  return quizzes.map(q => ({
    params: { slug: q.data.slug },
    props: { quiz: q.data },
  }));
}

const { quiz } = Astro.props;

const siteUrl = 'https://patasyhogar.com';
const quizUrl = `${siteUrl}/selector/${quiz.slug}/`;

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Selector', item: `${siteUrl}/selector/` },
    { '@type': 'ListItem', position: 3, name: quiz.titulo, item: quizUrl },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: quiz.titulo,
  description: quiz.descripcion,
  url: quizUrl,
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'All',
  inLanguage: 'es',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
};

const faqSchema = quiz.faqs && quiz.faqs.length > 0 ? {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: quiz.faqs.map(f => ({
    '@type': 'Question',
    name: f.pregunta,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.respuesta,
    },
  })),
} : null;

// Build the product data JSON for the client-side engine
const productsForEngine = quiz.productos.map((p, i) => ({
  index: i,
  filtros: p.filtros,
  pesos: p.pesos,
}));

// Build answer label map for result summary text
const answerLabels: Record<string, Record<string, string>> = {};
for (const q of quiz.preguntas) {
  answerLabels[q.id] = {};
  for (const opt of q.opciones) {
    for (const [key, val] of Object.entries(opt.tags)) {
      if (typeof val === 'string') {
        answerLabels[q.id][val] = opt.texto;
      }
    }
  }
}
---

<Base
  title={`${quiz.titulo} | Patas y Hogar`}
  description={quiz.descripcion}
  image={quiz.imagen}
>
  <script is:inline type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} slot="head" />
  <script is:inline type="application/ld+json" set:html={JSON.stringify(webAppSchema)} slot="head" />
  {faqSchema && <script is:inline type="application/ld+json" set:html={JSON.stringify(faqSchema)} slot="head" />}

  <div class="quiz-container">
    <nav class="breadcrumb" aria-label="Migas de pan">
      <a href="/">Inicio</a>
      <span class="breadcrumb-sep" aria-hidden="true">›</span>
      <a href="/selector/">Selector</a>
      <span class="breadcrumb-sep" aria-hidden="true">›</span>
      <span>{quiz.titulo}</span>
    </nav>

    {/* Intro screen */}
    <div class="quiz-intro" id="quiz-intro">
      {quiz.imagen && (
        <img
          src={quiz.imagen}
          alt={quiz.imagenAlt || quiz.titulo}
          width="480"
          height="270"
          class="quiz-intro-img"
          loading="eager"
        />
      )}
      <h1>{quiz.titulo}</h1>
      <p class="quiz-intro-desc">{quiz.descripcion}</p>
      <p class="quiz-intro-meta">{quiz.preguntas.length} preguntas · ~1 minuto</p>
      <button type="button" class="quiz-start-btn" id="quiz-start">
        Empezar test
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>

    {/* Progress bar */}
    <div class="quiz-progress" id="quiz-progress" style="display:none;" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={quiz.preguntas.length}>
      <div class="quiz-progress-fill" id="quiz-progress-fill" style="width:0%"></div>
    </div>

    {/* Questions */}
    {quiz.preguntas.map((pregunta, i) => (
      <QuizQuestion
        id={pregunta.id}
        texto={pregunta.texto}
        opciones={pregunta.opciones}
        stepIndex={i}
      />
    ))}

    {/* Result */}
    <QuizResult productos={quiz.productos} faqs={quiz.faqs} />
  </div>

  {/* Quiz data for the JS engine */}
  <script type="application/json" id="quiz-data" set:html={JSON.stringify({
    totalSteps: quiz.preguntas.length,
    products: productsForEngine,
    questionIds: quiz.preguntas.map(q => q.id),
  })} />

  {/* Quiz Engine */}
  <script is:inline>
  (function() {
    var data = JSON.parse(document.getElementById('quiz-data').textContent);
    var totalSteps = data.totalSteps;
    var products = data.products;
    var questionIds = data.questionIds;

    var currentStep = -1; // -1 = intro
    var answers = [];

    var introEl = document.getElementById('quiz-intro');
    var progressEl = document.getElementById('quiz-progress');
    var progressFill = document.getElementById('quiz-progress-fill');
    var resultEl = document.getElementById('quiz-result');
    var summaryEl = document.getElementById('quiz-result-summary');
    var startBtn = document.getElementById('quiz-start');
    var restartBtn = document.getElementById('quiz-restart');
    var steps = document.querySelectorAll('.quiz-step');
    var sharedNotice = document.getElementById('quiz-shared-notice');
    var sharedRedo = document.getElementById('quiz-shared-redo');
    var altsContainer = document.getElementById('quiz-alts-container');

    // Collect all option buttons per step
    var stepOptions = [];
    steps.forEach(function(step) {
      stepOptions.push(step.querySelectorAll('.quiz-option'));
    });

    function showStep(n) {
      currentStep = n;
      introEl.style.display = n === -1 ? '' : 'none';
      progressEl.style.display = n >= 0 && n < totalSteps ? '' : 'none';
      resultEl.classList.remove('quiz-result--visible');

      steps.forEach(function(s) { s.classList.remove('quiz-step--active'); });

      if (n >= 0 && n < totalSteps) {
        steps[n].classList.add('quiz-step--active');
        var pct = ((n + 1) / totalSteps * 100).toFixed(0);
        progressFill.style.width = pct + '%';
        progressEl.setAttribute('aria-valuenow', n + 1);

        // Focus the question heading
        var heading = steps[n].querySelector('.quiz-question-text');
        if (heading) heading.focus();

        // Restore selection if going back
        if (answers[n] !== undefined) {
          var opts = stepOptions[n];
          opts.forEach(function(o) {
            o.classList.remove('quiz-option--selected');
            o.setAttribute('aria-checked', 'false');
          });
          opts[answers[n]].classList.add('quiz-option--selected');
          opts[answers[n]].setAttribute('aria-checked', 'true');
        }
      } else if (n >= totalSteps) {
        progressEl.style.display = 'none';
        showResult();
      }
    }

    function selectOption(stepIdx, optIdx) {
      answers[stepIdx] = optIdx;
      var opts = stepOptions[stepIdx];
      opts.forEach(function(o) {
        o.classList.remove('quiz-option--selected');
        o.setAttribute('aria-checked', 'false');
      });
      opts[optIdx].classList.add('quiz-option--selected');
      opts[optIdx].setAttribute('aria-checked', 'true');

      // Auto-advance after brief delay
      setTimeout(function() { showStep(stepIdx + 1); }, 300);
    }

    function computeResult() {
      // Collect tags from all answers
      var tags = {};
      for (var i = 0; i < answers.length; i++) {
        if (answers[i] === undefined) continue;
        var optTags = JSON.parse(stepOptions[i][answers[i]].dataset.tags);
        for (var key in optTags) {
          tags[key] = optTags[key];
        }
      }

      // Phase 1: Hard filters
      var candidates = products.filter(function(p) {
        for (var filterKey in p.filtros) {
          var userVal = tags[filterKey];
          if (typeof userVal === 'string' && p.filtros[filterKey].indexOf(userVal) === -1) {
            return false;
          }
        }
        return true;
      });

      // Fallback: relax tamano first, then etapa
      if (candidates.length === 0) {
        candidates = products.filter(function(p) {
          var userEtapa = tags['etapa'];
          if (typeof userEtapa === 'string' && p.filtros['etapa'] && p.filtros['etapa'].indexOf(userEtapa) === -1) {
            return false;
          }
          return true;
        });
      }
      if (candidates.length === 0) {
        candidates = products.slice();
      }

      // Phase 2: Weighted scoring
      candidates.forEach(function(p) {
        var score = 0;
        for (var tag in tags) {
          var tagVal = typeof tags[tag] === 'number' ? tags[tag] : 0;
          var weight = p.pesos[tag] || 0;
          score += tagVal * weight;
        }
        p._score = score;
      });

      // Sort by score descending, then by original index (editorial order)
      candidates.sort(function(a, b) {
        if (b._score !== a._score) return b._score - a._score;
        return a.index - b.index;
      });

      return candidates;
    }

    function showResult() {
      var ranked = computeResult();
      if (ranked.length === 0) return;

      // Build summary text
      var summaryParts = [];
      for (var i = 0; i < steps.length; i++) {
        if (answers[i] !== undefined) {
          var text = stepOptions[i][answers[i]].textContent.trim();
          summaryParts.push(text.toLowerCase());
        }
      }
      if (summaryParts.length > 0) {
        summaryEl.innerHTML = 'Para un perro <strong>' + summaryParts.slice(0, 2).join('</strong>, <strong>') + '</strong>' +
          (summaryParts.length > 2 ? ', ' + summaryParts.slice(2).join(', ') : '') + ':';
      }

      // Show main recommendation (index 0)
      var mainCards = resultEl.querySelectorAll('.quiz-rec-main');
      mainCards.forEach(function(c) { c.style.display = 'none'; });
      var mainIdx = ranked[0].index;
      var mainCard = resultEl.querySelector('.quiz-rec-main[data-product-index="' + mainIdx + '"]');
      if (mainCard) mainCard.style.display = '';

      // Show alternatives (indices 1 and 2)
      var altCards = resultEl.querySelectorAll('.quiz-alt-card');
      altCards.forEach(function(c) { c.style.display = 'none'; });
      var hasAlts = false;
      for (var a = 1; a < Math.min(3, ranked.length); a++) {
        var altIdx = ranked[a].index;
        var altCard = resultEl.querySelector('.quiz-alt-card[data-product-index="' + altIdx + '"]');
        if (altCard) { altCard.style.display = ''; hasAlts = true; }
      }
      altsContainer.style.display = hasAlts ? '' : 'none';

      // Update URL hash
      var hash = '#r=' + answers.join(',');
      history.replaceState(null, '', hash);

      resultEl.classList.add('quiz-result--visible');
    }

    // Event: Start button
    startBtn.addEventListener('click', function() { showStep(0); });

    // Event: Option selection
    steps.forEach(function(step, si) {
      stepOptions[si].forEach(function(opt, oi) {
        opt.addEventListener('click', function() { selectOption(si, oi); });
        opt.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectOption(si, oi);
          }
        });
      });
    });

    // Event: Back buttons
    document.querySelectorAll('[data-action="back"]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (currentStep > 0) showStep(currentStep - 1);
      });
    });

    // Event: Restart
    restartBtn.addEventListener('click', function() {
      answers = [];
      stepOptions.forEach(function(opts) {
        opts.forEach(function(o) {
          o.classList.remove('quiz-option--selected');
          o.setAttribute('aria-checked', 'false');
        });
      });
      sharedNotice.style.display = 'none';
      history.replaceState(null, '', window.location.pathname);
      showStep(-1);
    });

    // Event: Shared result redo link
    if (sharedRedo) {
      sharedRedo.addEventListener('click', function(e) {
        e.preventDefault();
        answers = [];
        sharedNotice.style.display = 'none';
        history.replaceState(null, '', window.location.pathname);
        showStep(0);
      });
    }

    // Check for shared result hash on load
    var hash = window.location.hash;
    if (hash && hash.indexOf('#r=') === 0) {
      var parts = hash.substring(3).split(',');
      if (parts.length === totalSteps) {
        var valid = true;
        for (var i = 0; i < parts.length; i++) {
          var idx = parseInt(parts[i], 10);
          if (isNaN(idx) || idx < 0 || idx >= stepOptions[i].length) { valid = false; break; }
          answers[i] = idx;
        }
        if (valid) {
          introEl.style.display = 'none';
          sharedNotice.style.display = '';
          showResult();
        }
      }
    }
  })();
  </script>
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/selector/
git commit -m "feat: add quiz page with inline recommendation engine"
```

---

### Task 8: Create selector landing page

**Files:**
- Create: `src/pages/selector/index.astro`

- [ ] **Step 1: Create the landing page**

Create `src/pages/selector/index.astro`:

```astro
---
import Base from '@/layouts/Base.astro';
import { getCollection } from 'astro:content';

const quizzes = await getCollection('quizzes');

const siteUrl = 'https://patasyhogar.com';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Selector', item: `${siteUrl}/selector/` },
  ],
};

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Selector de productos para mascotas',
  description: 'Tests interactivos para encontrar el producto ideal para tu perro o gato. Recomendaciones personalizadas con precios comparados.',
  url: `${siteUrl}/selector/`,
  numberOfItems: quizzes.length,
  inLanguage: 'es',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Patas y Hogar',
    url: siteUrl,
  },
};

const animalEmoji: Record<string, string> = {
  perro: '🐶',
  gato: '🐱',
  ambos: '🐾',
};
---

<Base
  title={`Selector de productos para mascotas ${new Date().getFullYear()} | Patas y Hogar`}
  description="Tests interactivos para encontrar el producto ideal para tu perro o gato. Responde unas preguntas y descubre qué pienso, arnés o cama le conviene."
>
  <script is:inline type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} slot="head" />
  <script is:inline type="application/ld+json" set:html={JSON.stringify(collectionSchema)} slot="head" />

  <div class="category-page-header">
    <div class="container">
      <div class="category-icon-large" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></svg>
      </div>
      <h1>Selector de productos</h1>
      <p>Responde unas preguntas y te recomendamos el producto ideal para tu mascota</p>
    </div>
  </div>

  <div class="container section">
    <nav class="breadcrumb" aria-label="Migas de pan">
      <a href="/">Inicio</a>
      <span class="breadcrumb-sep" aria-hidden="true">›</span>
      <span>Selector</span>
    </nav>

    {quizzes.length > 0 ? (
      <div class="quiz-landing-grid">
        {quizzes.map(q => (
          <a href={`/selector/${q.data.slug}/`} class="quiz-card-link">
            {q.data.imagen && (
              <img
                src={q.data.imagen}
                alt={q.data.imagenAlt || q.data.titulo}
                width="400"
                height="180"
                class="quiz-card-img"
                loading="lazy"
                decoding="async"
              />
            )}
            <div class="quiz-card-body">
              <h2>{q.data.titulo}</h2>
              <p>{q.data.descripcion}</p>
              <span class="quiz-card-meta">
                {animalEmoji[q.data.animal] || ''} {q.data.preguntas.length} preguntas · ~1 minuto
              </span>
            </div>
          </a>
        ))}
      </div>
    ) : (
      <div class="text-center" style="padding: 4rem 0;">
        <h2 style="margin-bottom: 0.5rem;">Próximamente</h2>
        <p class="text-muted">Estamos preparando los primeros selectores.</p>
      </div>
    )}
  </div>
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/selector/index.astro
git commit -m "feat: add selector landing page with quiz grid"
```

---

### Task 9: Update navigation (Header + Footer)

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Add Selector link to Header**

In `src/components/Header.astro`, add the "Selector" link in the desktop nav (before the search icon separator) and in the mobile menu.

Desktop nav — add after the "Cuidados" link and before the `<div class="nav-sep">`:

```html
      <a class="nav-link" href="/selector/" aria-current={isActive('/selector/') ? 'page' : undefined}>Selector</a>
```

Mobile menu — add after the "Cuidados" link and before the `<div class="mobile-sep">`:

```html
    <a class="mobile-link" href="/selector/">Selector</a>
```

- [ ] **Step 2: Add Selector link to Footer**

In `src/components/Footer.astro`, add a "Selector" link in the "Explorar" section, after "Todos los artículos":

```html
          <li><a href="/selector/">Selector</a></li>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.astro src/components/Footer.astro
git commit -m "feat: add Selector links to header and footer navigation"
```

---

### Task 10: Build, verify, and download quiz image

**Files:**
- No new files (verification task)

- [ ] **Step 1: Build the project**

```bash
npm run build
```

Expected: Build succeeds. Check for any Zod validation errors in quiz data.

- [ ] **Step 2: Preview and test in browser**

```bash
npm run preview
```

Open in browser and test:
1. `http://localhost:4321/selector/` — landing page shows the quiz card
2. `http://localhost:4321/selector/pienso-perro/` — quiz loads with intro screen
3. Click "Empezar test" — first question appears with progress bar
4. Answer all 5 questions — verify auto-advance works, back button works
5. Result screen shows recommendation with affiliate links
6. Click "Volver a empezar" — quiz resets
7. Test shared URL: answer quiz, copy the hash URL, open in new tab — should show result directly with notice banner
8. Test keyboard navigation: Tab through options, Enter to select
9. Test dark mode: toggle theme, verify quiz looks correct
10. Test mobile: resize browser to 375px, verify responsive layout

- [ ] **Step 3: Download quiz hero image from Pexels**

```bash
node scripts/pexels-download.mjs "dog eating kibble food bowl" pienso-perro --list
```

Pick the best result (specific to a dog eating from a bowl), then:

```bash
node scripts/pexels-download.mjs "dog eating kibble food bowl" selector/pienso-perro --index=N
```

(Replace N with the chosen index.) This saves to `public/images/selector/pienso-perro.webp`.

- [ ] **Step 4: Final build and commit**

```bash
npm run build
git add -A
git commit -m "feat: quiz selector system complete with dog food quiz"
```

---

### Task 11 (optional): Insert QuizCTA in food articles

**Files:**
- Modify: select MDX articles in `src/content/articulos/`

This task inserts the `QuizCTA` banner in the most relevant dog food articles. Do 3-4 articles max — the most trafficked ones.

- [ ] **Step 1: Add QuizCTA to pienso mediano article**

In `src/content/articulos/mejor-pienso-perro-adulto-raza-mediana.mdx`, add after the imports:

```mdx
import QuizCTA from '@/components/QuizCTA.astro';
```

Then insert the component after the ComparisonTable section (before the buying guide or FAQ section):

```mdx
<QuizCTA slug="pienso-perro" titulo="¿Aún no tienes claro cuál le conviene?" descripcion="Nuestro selector te recomienda el pienso ideal para tu perro en menos de un minuto." />
```

- [ ] **Step 2: Repeat for 2-3 more articles**

Add the same import + component to:
- `mejor-pienso-perro-raza-pequena.mdx`
- `mejor-pienso-perro-raza-grande.mdx`
- `mejor-pienso-perro-esterilizado.mdx`

Vary the `descripcion` text slightly for each to avoid duplicate content.

- [ ] **Step 3: Build and commit**

```bash
npm run build
git add src/content/articulos/mejor-pienso-perro-adulto-raza-mediana.mdx src/content/articulos/mejor-pienso-perro-raza-pequena.mdx src/content/articulos/mejor-pienso-perro-raza-grande.mdx src/content/articulos/mejor-pienso-perro-esterilizado.mdx
git commit -m "feat: add QuizCTA banners to dog food comparison articles"
```
