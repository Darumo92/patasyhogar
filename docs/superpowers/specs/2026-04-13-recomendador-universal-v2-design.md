# Recomendador Universal de Productos v2 — Spec de Diseno

## Resumen

Reemplaza el quiz estatico v1 por un recomendador universal que cubre TODOS los productos de la web. Una sola herramienta interactiva en `/elegir/` que guia al usuario con preguntas adaptadas a cada categoria de producto y recomienda productos concretos con enlaces de afiliado. Se alimenta de un registro centralizado de productos que se actualiza cada vez que se anade un articulo nuevo.

**Objetivo:** Captar trafico SEO con intencion de compra, aumentar conversiones de afiliado con recomendaciones personalizadas, y ofrecer una herramienta util que diferencia la web de la competencia.

**Reemplaza:** Quiz v1 (selector estatico de pienso para perros). Se eliminan todos los archivos del sistema v1.

---

## 1. Arquitectura

### Registro centralizado de productos

Cada producto de la web existe en un registro central. Es la fuente unica de datos para el recomendador.

**Ubicacion:** `src/content/productos/` (Astro data collection, Zod validated)

```
src/content/productos/
├── alimentacion.yaml     # Todos los productos de alimentacion (perro + gato)
├── higiene.yaml          # Champus, cepillos, antiparasitarios...
├── paseo.yaml            # Arneses, transportines, GPS...
├── juguetes.yaml         # Juguetes, rascadores, alfombras...
└── hogar.yaml            # Camas, protectores, gateras...
```

**Cobertura:** TODOS los productos de TODOS los articulos comparativos existentes se incluyen en el registro desde el dia 1. Cuando se anade un articulo nuevo, sus productos se anaden al registro correspondiente.

**Los articulos MDX NO se modifican.** El registro es una fuente de datos paralela. Los articulos siguen con sus ComparisonTable inline como siempre. A futuro se podria unificar, pero no es necesario ahora.

### Configuracion del quiz

**Ubicacion:** `src/data/quiz-config.yaml`

Define:
- Categorias y subcategorias disponibles
- Que preguntas hacer por subcategoria (pool reutilizable)
- Variantes de texto/opciones por animal (perro vs gato)
- Mapeo de tags de quiz a tags de articulos informativos

### Una sola pagina

**URL:** `/elegir/`
**Archivo:** `src/pages/elegir/index.astro`

No hay landing separada ni multiples paginas. Es UNA herramienta interactiva.

### Motor de recomendacion

Mismo algoritmo de dos fases que v1:
- **Fase 1 — Filtros duros:** Categoria + subcategoria + animal + filtros especificos (tamano, etapa) eliminan productos incompatibles
- **Fase 2 — Scoring ponderado:** Las respuestas del usuario generan tags que se cruzan con los pesos de afinidad de cada producto

La diferencia con v1: las preguntas son dinamicas segun la subcategoria elegida, y el catalogo de productos es todo el registro, no un YAML de quiz fijo.

---

## 2. Modelo de datos

### Schema de producto

```yaml
- id: royal-canin-mini-adult           # Unico global, kebab-case
  nombre: "Royal Canin Mini Adult"
  marca: "Royal Canin"
  imagen: "https://m.media-amazon.com/images/I/51Ro8SkLgNL._AC_SL300_.jpg"
  precio: "~52E"
  precioAmazon: "51,52E (8 kg)"
  precioZooplus: null
  precioTiendanimal: null
  enlaceAmazon: "https://www.amazon.es/dp/B000T4FWQ4"
  enlaceZooplus: null
  enlaceTiendanimal: null
  categoria: alimentacion
  subcategoria: pienso
  animal: perro
  articuloSlug: mejor-pienso-perro-raza-pequena
  descripcionCorta: "El estandar veterinario para razas pequenas."
  filtros:                              # Fase 1: eliminatorios
    tamano: [pequeno]
    etapa: [adulto]
  afinidad:                             # Fase 2: scoring 0-5
    esterilizado: 1
    actividad_moderada: 2
    actividad_baja: 2
    presupuesto_medio: 3
    presupuesto_economico: 1
```

### Schema Zod (para config.ts)

```typescript
const producto = z.object({
  id: z.string(),
  nombre: z.string(),
  marca: z.string().optional(),
  imagen: z.string().optional(),
  precio: z.string(),
  precioAmazon: z.string().optional().nullable(),
  precioZooplus: z.string().optional().nullable(),
  precioTiendanimal: z.string().optional().nullable(),
  enlaceAmazon: z.string().optional().nullable(),
  enlaceZooplus: z.string().optional().nullable(),
  enlaceTiendanimal: z.string().optional().nullable(),
  categoria: z.enum(CATEGORIAS),
  subcategoria: z.string(),
  animal: z.enum(ANIMALES),
  articuloSlug: z.string(),
  descripcionCorta: z.string(),
  filtros: z.record(z.array(z.string())).default({}),
  afinidad: z.record(z.number()).default({}),
});

const productos = defineCollection({
  type: 'data',
  schema: z.array(producto),
});
```

### Schema de quiz-config.yaml

```yaml
categorias:
  - id: string                          # Coincide con CATEGORIAS del site
    nombre: string
    descripcion: string
    icono: string                        # Referencia a IconCategory
    subcategorias:
      - id: string                      # Coincide con subcategoria del producto
        nombre: string
        descripcion: string
        soloAnimal: perro | gato | null  # Si solo aplica a un animal
        preguntas: string[]              # IDs de preguntas para perro (o generico)
        preguntasGato: string[]?         # IDs de preguntas para gato (si difieren)

preguntas:
  [id]:
    texto: string                        # Texto para perro (o generico)
    textoGato: string?                   # Texto alternativo para gato
    filtro: string | null                # Campo en filtros del producto (null = solo scoring)
    opciones:
      - texto: string
        valor: string?                   # Para filtros duros
        tags: Record<string, number>?    # Para scoring
    opcionesGato:                        # Opciones alternativas para gato
      - texto: string
        valor: string?
        tags: Record<string, number>?

articuloTagMap:                          # Mapeo tags quiz → tags articulos informativos
  piel_sensible: ["piel sensible", "alergias", "dermatitis"]
  esterilizado: ["esterilizado", "castrado", "esterilización"]
  sobrepeso: ["sobrepeso", "obesidad", "dieta"]
  # ...
```

---

## 3. Flujo del usuario

### Paso 1 — Categoria

**"Que estas buscando para tu mascota?"**

5 tarjetas grandes con icono (de IconCategory) y nombre:
- Alimentacion
- Higiene y cuidado
- Paseo y viaje
- Juguetes y diversion
- Hogar y confort

Cada tarjeta muestra contador: "X productos". Solo se muestran categorias con productos en el registro. Seleccion = auto-avance.

### Paso 2 — Subcategoria

**"Que tipo de producto necesitas?"**

Botones con nombre + descripcion corta. Solo subcategorias con productos. Si solo hay una subcategoria en esa categoria, se salta automaticamente.

### Paso 3 — Animal (condicional)

**"Para quien es?"**

Perro / Gato. Solo aparece si la subcategoria tiene productos para ambos. Si solo hay perro (ej: arneses), se salta. Si la subcategoria tiene `soloAnimal` definido, se salta.

### Pasos 4-N — Preguntas especificas

Las preguntas definidas en `quiz-config.yaml` para esa subcategoria + animal. Si el animal es gato y existe `preguntasGato`, se usan esas. Si no, las genericas. Si la pregunta tiene `textoGato`/`opcionesGato`, se usan cuando el animal es gato.

Misma UX que v1:
- Barra de progreso
- Opciones como botones grandes con radio visual
- Auto-avance 300ms tras seleccion
- Boton "Volver" para corregir
- Transicion CSS slide
- Respeta `prefers-reduced-motion`

Tipicamente 3-5 preguntas segun subcategoria.

### Pantalla de resultado

**"Para tu [animal] [tamano] [etapa], te recomendamos..."**

1. **Recomendacion principal** — estilo TopPick ampliado. Imagen, nombre, descripcion, precios multi-tienda con enlaces afiliado, enlace "Lee nuestro analisis completo" al articulo.

2. **2 alternativas** — tarjetas compactas con afiliado y enlace al articulo.

3. **Articulos relacionados** (si hay match) — 1-2 articulos informativos cuyo animal + tags coincidan con las respuestas. Aparecen en bloque separado: "Tambien te puede interesar". Si no hay match, no aparece.

4. **Escape a articulo completo** — "Ver todos los productos de esta categoria →" enlaza al articulo comparativo.

### Acciones

- "Buscar otro producto" — vuelve al paso 1
- "Volver a empezar" — resetea todo
- URL compartible via hash: `#c=alimentacion&s=pienso&a=perro&r=1,2,0,1,2`

---

## 4. Diferenciacion visual

### Header — pill con acento

```html
<a class="nav-link nav-link--tool" href="/elegir/">Te ayudamos a elegir</a>
```

Estilo diferenciado: fondo primario suave, border-radius pill, hover mas intenso. En movil, mismo tratamiento. NO es un nav-link plano como los demas.

### Homepage — seccion propia

Seccion dedicada entre "Ultimas comparativas" y "Guias de cuidados":
- Fondo con tinte primario (rompe el patron de tarjetas blancas)
- Centrado, no grid
- Headline: "No sabes que producto elegir para tu mascota?"
- Subtexto + boton CTA grande
- Micro-dato: "X categorias · Y productos comparados"

### Pagina /elegir/ — identidad de herramienta

- NO usa `category-page-header` como las paginas de categoria
- Badge "Herramienta interactiva" arriba
- Titulo es la primera pregunta (accion inmediata, sin intro)
- Tarjetas de categoria con iconos grandes
- Fondo sutil diferenciado

### Resultados — recomendacion personalizada

- Tarjeta principal mas grande que TopPick standard
- Badge "Recomendado para ti" (personalizado)
- Articulos informativos en bloque separado con icono de libro

---

## 5. SEO y Schema

### Meta tags

| URL | Title | Description |
|-----|-------|-------------|
| `/elegir/` | Te ayudamos a elegir - Patas y Hogar | Responde unas preguntas sobre tu mascota y te recomendamos el producto ideal. Comparamos precios en Amazon, Zooplus y Tiendanimal. |

**Nota:** Keywords a validar con Keyword Surfer antes de contenido final.

### Schema.org

- `WebApplication` (applicationCategory: UtilityApplication, price: 0)
- `BreadcrumbList`: Inicio > Te ayudamos a elegir
- `FAQPage` con FAQs generales del recomendador (se definen en el page, no en quiz-config)

### Internal linking

**Recomendador → Articulos:**
- Cada resultado enlaza a su articulo completo
- Articulos informativos sugeridos enlazados

**Articulos → Recomendador:**
- `QuizCTA.astro` en articulos comparativos
- Homepage CTA section

**Sitemap:** `/elegir/` se incluye automaticamente

---

## 6. Estructura de archivos

```
src/
├── content/
│   ├── config.ts                       # Eliminar quizzes, anadir productos
│   ├── productos/                      # Data collection — registro de productos
│   │   ├── alimentacion.yaml
│   │   ├── higiene.yaml
│   │   ├── paseo.yaml
│   │   ├── juguetes.yaml
│   │   └── hogar.yaml
│   └── articulos/                      # Sin cambios
├── data/
│   └── quiz-config.yaml                # Categorias, subcategorias, preguntas
├── pages/
│   ├── elegir/
│   │   └── index.astro                 # Pagina unica del recomendador
│   └── index.astro                     # Modificar: anadir seccion CTA
├── components/
│   ├── QuizCategoryPicker.astro        # Nuevo: selector de categoria/subcategoria
│   ├── QuizQuestion.astro              # Modificar: soporte preguntas dinamicas
│   ├── QuizResult.astro                # Modificar: anadir articulos informativos
│   ├── QuizCTA.astro                   # Modificar: nueva URL /elegir/
│   └── QuizHomeBanner.astro            # Nuevo: seccion CTA para homepage
├── styles/
│   └── global.css                      # Expandir estilos quiz + homepage + nav pill
└── ...
```

### Archivos a ELIMINAR (v1)

- `src/content/quizzes/` (directorio completo)
- `src/pages/selector/` (directorio completo)

---

## 7. Migracion de productos

### Cobertura total dia 1

Se extraen los productos de TODOS los articulos comparativos existentes. Fuentes por categoria:

**Alimentacion** (~20 articulos): pienso perro (por tamano, edad, condicion), pienso gato (indoor, esterilizado, senior, cachorro, pelo largo, urinario), comida humeda perro/gato, snacks perro/gato, comederos.

**Higiene** (~15 articulos): cepillos perro/gato, champu perro/gato, antiparasitarios perro/gato, collares antiparasitarios, secador perros, cepillos pelo sofa.

**Paseo** (~10 articulos): arneses, transportines, GPS, collares luminosos, bozales, dispensador bolsas, protector maletero, asiento coche.

**Juguetes** (~10 articulos): juguetes perro (cachorro, mental, resistente), juguetes gato, rascadores, alfombras olfato, difusores feromonas, circuito agilidad.

**Hogar** (~10 articulos): camas, protector sofa, gateras, puertas seguridad, camaras vigilancia, aspirador pelo mascotas, repelente gatos muebles, empapadores.

Cada producto se extrae con: nombre, marca, imagen, precios, enlaces de tiendas, y se le asignan filtros y afinidad segun su perfil.

### Proceso de migracion

1. Subagentes extraen productos de los MDX (leyendo ComparisonTable props)
2. Se estructuran en el formato del registro con filtros y afinidad
3. Se validan con el schema Zod en build time
4. Se verifica que el build pasa

---

## 8. Impacto en archivos existentes

| Archivo | Cambio |
|---------|--------|
| `src/content/config.ts` | Eliminar `quizzes`, anadir `productos` |
| `src/styles/global.css` | Expandir estilos quiz, anadir homepage CTA, nav pill |
| `src/components/Header.astro` | Cambiar "Selector" a pill "Te ayudamos a elegir" → `/elegir/` |
| `src/components/Footer.astro` | Cambiar `/selector/` → `/elegir/` |
| `src/pages/index.astro` | Anadir seccion QuizHomeBanner |
| `CLAUDE.md` | Anadir regla de registro de productos al checklist de articulos |

### Lo que NO se toca

- Articulos MDX con ComparisonTable — siguen con datos inline
- Layouts (Base.astro, Article.astro) — sin cambios
- Componentes de producto (ComparisonTable, TopPick, AffiliateButton) — sin cambios
- Otros componentes (ArticleCard, AnimalFilter, etc.) — sin cambios

---

## 9. Fuera de alcance (v2)

- Unificar ComparisonTable para leer del registro (refactor futuro)
- Analytics de respuestas del quiz (requiere backend)
- Preguntas tipo multiple (seleccionar varias opciones)
- Busqueda de productos por texto dentro del recomendador
- Comparador lado a lado de productos seleccionados
- Notificaciones de cambio de precio
