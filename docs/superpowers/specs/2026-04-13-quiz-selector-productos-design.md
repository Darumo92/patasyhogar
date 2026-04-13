# Quiz/Selector de Productos — Spec de Diseno

## Resumen

Sistema de quizzes interactivos para patasyhogar.com que recomienda productos personalizados basandose en las respuestas del usuario. Cada quiz es una pagina estatica con interaccion cliente JS vanilla. El primer quiz sera "Que pienso necesita tu perro?".

**Objetivo:** Captar trafico SEO de busquedas con intencion de compra ("que pienso comprar para mi perro"), aumentar conversiones de afiliado con recomendaciones personalizadas, y mejorar engagement conectando usuarios con los articulos existentes.

---

## 1. Arquitectura

### Almacenamiento: Astro Content Collection (type: data)

Cada quiz es un archivo YAML en `src/content/quizzes/`. Se registra como data collection en `src/content/config.ts` con schema Zod.

**Por que data collection y no alternativas:**
- Validacion Zod en build time — errores de datos se detectan antes de deploy
- API consistente con el resto del proyecto (`getCollection`, `getEntry`)
- TypeScript inference automatica
- YAML es legible y editable sin tocar codigo

**Por que NO un registro centralizado de productos:**
- Refactorizar 90+ MDX para referenciar un registro central no aporta valor inmediato
- Cada quiz curada 10-15 productos — manejable como dato autocontenido
- Los productos del quiz referencian el articulo fuente via `articuloSlug`

### Estructura de archivos

```
src/
├── content/
│   ├── config.ts                    # Anadir collection 'quizzes' type: data
│   └── quizzes/
│       ├── pienso-perro.yaml        # Primer quiz
│       └── ...                      # Futuros quizzes
├── pages/
│   └── selector/
│       ├── index.astro              # Landing con grid de quizzes
│       └── [slug].astro             # Pagina dinamica de quiz
├── components/
│   ├── QuizShell.astro              # Contenedor: intro + progreso + slots
│   ├── QuizQuestion.astro           # Renderiza pregunta con opciones
│   ├── QuizResult.astro             # Resultado: top pick + alternativas
│   └── QuizCTA.astro                # Banner para insertar en articulos MDX
└── styles/
    └── global.css                   # Estilos del quiz (anadidos al CSS existente)
```

### Generacion estatica con interaccion cliente

- Todas las preguntas y productos se renderizan en build time como HTML con `display: none`
- El JS del cliente (~120 lineas, vanilla) gestiona: navegacion entre pasos, recogida de respuestas, filtro + scoring, y mostrar el resultado
- Zero llamadas a API, zero latencia, funciona offline
- Los datos del quiz se serializan como `<script type="application/json">` en build time para que el JS los consuma

---

## 2. Modelo de datos

### Schema del quiz YAML

```yaml
slug: string                     # URL: /selector/{slug}/
titulo: string                   # H1 y og:title
descripcion: string              # Meta description y texto intro
animal: perro | gato | ambos
imagen: string                   # Hero image del quiz
imagenAlt: string

preguntas:
  - id: string                   # Identificador unico (ej: "tamano")
    texto: string                # Texto de la pregunta
    tipo: single                 # single (futuro: multiple)
    opciones:
      - texto: string            # Texto visible
        tags: Record<string, string | number>  # Tags generados al seleccionar

productos:
  - nombre: string
    imagen: string               # URL imagen Amazon (m.media-amazon.com)
    precio: string               # Precio referencia (ej: "~83E")
    precioAmazon: string?
    precioZooplus: string?
    precioTiendanimal: string?
    enlaceAmazon: string?        # URL /dp/ASIN (sin tag, se anade automatico)
    enlaceZooplus: string?
    enlaceTiendanimal: string?
    articuloSlug: string         # Slug del articulo con analisis completo
    descripcionCorta: string     # 1-2 frases para el resultado
    filtros:                     # Fase 1: requisitos eliminatorios
      etapa: string[]            # [cachorro, adulto, senior]
      tamano: string[]           # [pequeno, mediano, grande]
    pesos:                       # Fase 2: scoring ponderado
      Record<string, number>     # tag → peso (0-5)

faqs:
  - pregunta: string
    respuesta: string
```

### Schema Zod (para config.ts)

```typescript
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

const quizzes = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    titulo: z.string(),
    descripcion: z.string(),
    animal: z.enum(['perro', 'gato', 'ambos']),
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
```

---

## 3. Motor de recomendacion

### Fase 1 — Filtros duros (eliminatorios)

Cada producto define filtros con arrays de valores validos. Si la respuesta del usuario no esta en el array, el producto se elimina.

```
Producto.filtros.etapa = [adulto, senior]
Usuario responde: cachorro
→ Producto ELIMINADO
```

Campos de filtro duro: `etapa`, `tamano`. Son los unicos donde una mala recomendacion es un error grave (recomendar pienso de adulto a un cachorro).

**Fallback si 0 productos sobreviven:** relajar filtros por prioridad (primero `tamano`, luego `etapa`). Mostrar aviso: "No tenemos una recomendacion exacta para tu perfil, pero estos productos se acercan."

### Fase 2 — Scoring ponderado

```
score(producto) = SUM(
  para cada tag en respuestas_usuario:
    respuesta.tags[tag] * producto.pesos[tag]   // 0 si el tag no existe en el producto
)
```

- Los pesos del producto van de 0 (irrelevante) a 5 (ideal para este perfil)
- El valor del tag en la respuesta es tipicamente 1, pero podria ser mayor para opciones con mas peso
- Empates se resuelven por orden editorial (indice en el array YAML)

### Resultado

- **Top 1:** recomendacion principal — estilo TopPick con precios multi-tienda
- **Top 2-3:** alternativas — tarjetas compactas con enlace afiliado y al articulo
- Si top 1 y top 2 tienen score identico, ambos se muestran como co-recomendacion

---

## 4. UX y flujo

### Puntos de entrada

1. `/selector/` — landing con grid de quizzes disponibles
2. Articulos MDX — componente `QuizCTA.astro` insertado en articulos del cluster relevante
3. Navegacion principal — enlace "Selector" en el header

### Flujo del quiz

```
[Intro] → [Pregunta 1] → [Pregunta 2] → ... → [Resultado]
```

**Intro:**
- Titulo, descripcion, imagen hero
- "5 preguntas, ~1 minuto"
- Boton "Empezar"

**Preguntas:**
- Barra de progreso visual (`role="progressbar"`)
- Opciones como botones grandes (ancho completo en movil, 2 columnas en desktop)
- Seleccion = auto-avance tras 300ms delay (sin boton "Siguiente")
- Boton "Volver" discreto para corregir
- Transicion CSS: slide horizontal 250ms (`transform` + `opacity`)

**Resultado:**
- Texto personalizado interpolando respuestas: "Para un **perro mediano adulto** con **actividad moderada**..."
- Recomendacion principal estilo TopPick con precios multi-tienda y enlaces afiliado
- 2 alternativas en tarjetas compactas
- Enlace "Lee nuestro analisis completo →" a cada articulo
- Boton "Volver a empezar"
- FAQs del quiz

### Resultado compartible via URL hash

Respuestas codificadas en hash: `/selector/pienso-perro/#r=1,2,0,1,2`

- Cada numero = indice de opcion seleccionada
- Al cargar con hash: auto-computa y muestra resultado sin pasar por preguntas
- Banner sutil: "Resultado compartido. Quieres hacer el test tu? →"
- Sin backend, sin cookies

### Animaciones

- Solo CSS transitions (`transform`, `opacity`) — GPU-optimized
- Respeta `prefers-reduced-motion` (transiciones instantaneas)
- Consistente con scroll reveal existente en Base.astro

### Accesibilidad

- `role="radiogroup"` + `role="radio"` + `aria-checked` para opciones
- `aria-live="polite"` en contenedor de pregunta (anuncia cambio de paso)
- Focus management: focus al titulo de nueva pregunta al cambiar paso
- Navegacion por teclado: Tab entre opciones, Enter/Space para seleccionar
- `role="progressbar"` + `aria-valuenow`/`aria-valuemax` en barra de progreso

---

## 5. SEO y Schema

### Meta tags por pagina

| URL | Title | Keyword objetivo |
|-----|-------|------------------|
| `/selector/` | Selector de productos para mascotas - Patas y Hogar | (hub) |
| `/selector/pienso-perro/` | Que pienso necesita tu perro? - Test gratuito | que pienso comprar para mi perro |

Meta description: keyword + CTA, ~150 chars.

**Nota:** Keywords a validar con Keyword Surfer antes de escribir contenido final.

### Schema.org

**`/selector/` (landing):**
- `CollectionPage` + `BreadcrumbList`

**`/selector/[slug]/` (quiz):**
- `WebApplication` (applicationCategory: UtilityApplication, price: 0)
- `FAQPage` (con las FAQs del quiz)
- `BreadcrumbList`: Inicio > Selector > {titulo}

### Internal linking

**Quiz → Articulos:**
- Resultado enlaza al articulo de analisis completo
- Intro puede enlazar a pillar page del cluster

**Articulos → Quiz:**
- `QuizCTA.astro` en articulos del cluster relevante
- Posicion: despues de ComparisonTable o antes de FAQs
- Texto natural, no banner generico

### Sitemap

Anadir `/selector/` y `/selector/[slug]/` al sitemap. Hashes de resultado no generan rutas (comportamiento por defecto de Astro).

---

## 6. Primer quiz: "Que pienso necesita tu perro?"

### Preguntas

**P1 — Tamano** (filtro duro: `tamano`)
- Pequeno (menos de 10 kg) → `{ tamano: "pequeno" }`
- Mediano (10-25 kg) → `{ tamano: "mediano" }`
- Grande (25-45 kg) → `{ tamano: "grande" }`
- Gigante (mas de 45 kg) → `{ tamano: "grande" }`

**P2 — Edad** (filtro duro: `etapa`)
- Cachorro (menos de 1 ano) → `{ etapa: "cachorro" }`
- Adulto (1-7 anos) → `{ etapa: "adulto" }`
- Senior (mas de 7 anos) → `{ etapa: "senior" }`

**P3 — Condicion especial** (scoring)
- Esterilizado / castrado → `{ esterilizado: 1 }`
- Sobrepeso o tendencia a engordar → `{ sobrepeso: 1 }`
- Piel sensible o alergias → `{ piel_sensible: 1 }`
- Problemas digestivos → `{ digestivo: 1 }`
- Diabetico → `{ diabetico: 1 }`
- Ninguna → (sin tags)

**P4 — Actividad** (scoring)
- Poca (paseos cortos) → `{ actividad_baja: 1 }`
- Moderada (1-2h de paseo) → `{ actividad_moderada: 1 }`
- Alta (deporte, campo, trabajo) → `{ actividad_alta: 1 }`

**P5 — Presupuesto** (scoring)
- Economico (menos de 30E/mes) → `{ presupuesto_economico: 1 }`
- Medio (30-50E/mes) → `{ presupuesto_medio: 1 }`
- Premium (sin limite) → `{ presupuesto_premium: 1 }`

### Catalogo de productos

12-15 productos extraidos de articulos existentes:

| Segmento | Articulo fuente |
|----------|----------------|
| Pequeno + adulto | `mejor-pienso-perro-raza-pequena` |
| Mediano + adulto | `mejor-pienso-perro-adulto-raza-mediana` |
| Grande + adulto | `mejor-pienso-perro-raza-grande` |
| Cachorro grande | `mejor-pienso-cachorro-raza-grande` |
| Senior | `mejor-pienso-perro-senior` |
| Esterilizado | `mejor-pienso-perro-esterilizado` |
| Hipoalergenico | `mejor-pienso-hipoalergenico-perro` |
| Diabetico | `mejor-pienso-perro-diabetico` |

Datos exactos (ASIN, precio, imagen, enlaces) se copian de los articulos. No se inventan.

---

## 7. Componentes detallados

### QuizShell.astro
Contenedor del quiz. Recibe datos del quiz como props. Renderiza:
- Seccion intro (titulo, descripcion, imagen, boton empezar)
- Barra de progreso
- Slot para preguntas (renderizadas por [slug].astro en loop)
- Seccion resultado
- Script JSON con datos del quiz para el JS cliente
- Schema.org (WebApplication, FAQPage, BreadcrumbList)

### QuizQuestion.astro
Recibe una pregunta como prop. Renderiza:
- Texto de la pregunta como heading
- Opciones como botones con `data-tags` (JSON serializado)
- `data-question-id` para el JS

### QuizResult.astro
Recibe productos como props. Renderiza:
- Contenedor oculto para la recomendacion principal (estilo TopPick)
- Contenedores para 2 alternativas (tarjetas compactas)
- Enlaces a articulos completos
- Boton "Volver a empezar"
- FAQs
- Los affiliate links usan la misma logica de tag-appending que ComparisonTable/TopPick

### QuizCTA.astro
Banner simple para insertar en articulos MDX:
- Props: `slug` (del quiz), `texto` (opcional, con default)
- Renderiza un bloque con icono, texto y enlace al quiz

### quiz-engine.js
Script inline (~120 lineas) que gestiona:
- Estado: paso actual + respuestas[]
- Navegacion: avanzar, retroceder
- Auto-avance tras seleccion (300ms)
- Filtro fase 1 + scoring fase 2
- Mostrar resultado (toggle display, interpolar texto)
- Parsear hash de URL para resultados compartidos
- Focus management y aria updates

---

## 8. Estilos

Todos los estilos se anaden a `src/styles/global.css` (consistente con el proyecto, sin CSS modules ni styled components).

Reutilizar variables CSS existentes: `--color-primary`, `--color-bg-card`, `--color-border`, `--radius-lg`, `--shadow-md`, etc.

Reutilizar patrones visuales de ComparisonTable y TopPick para las tarjetas de resultado (consistencia visual).

Nuevas clases con prefijo `quiz-` para evitar colisiones.

---

## 9. Impacto en archivos existentes

| Archivo | Cambio |
|---------|--------|
| `src/content/config.ts` | Anadir collection `quizzes` |
| `src/styles/global.css` | Anadir estilos `quiz-*` |
| `src/components/Header.astro` | Anadir enlace "Selector" en nav |
| `src/components/Footer.astro` | Anadir enlace a /selector/ en seccion "Explorar" |
| `astro.config.mjs` | Sin cambios (las nuevas paginas se incluyen automaticamente en sitemap) |
| `public/_headers` | Sin cambios manuales (CSP hashes se regeneran en build) |
| Articulos MDX (selectos) | Insertar `QuizCTA` en articulos del cluster alimentacion |

---

## 10. Fuera de alcance (v1)

- Quizzes de otras categorias (arneses, camas, juguetes) — futuros, misma arquitectura
- Preguntas tipo `multiple` (seleccionar varias opciones) — preparado en schema pero no implementado
- Analytics de respuestas (que opciones elige la gente) — requeriria backend
- A/B testing de preguntas/orden — complejidad innecesaria para v1
- Quiz para gatos — segundo quiz, misma arquitectura, datos diferentes
