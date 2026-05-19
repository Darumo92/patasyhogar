# Universal Product Recommender v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the v1 static quiz with a universal product recommender at `/elegir/` that covers all 375 products from all 86 comparativa articles, with dynamic questions per subcategory and informative article suggestions.

**Architecture:** Centralized product registry (Astro data collection, 5 YAML files by category) + quiz config (questions per subcategory) + single page with vanilla JS engine. Two-phase recommendation: hard filters then weighted scoring. Products extracted from all existing articles. Auto-expands when new articles are added.

**Tech Stack:** Astro 5 (static), YAML data collections with Zod, vanilla JS, plain CSS with existing custom properties.

**Spec:** `docs/superpowers/specs/2026-04-13-recomendador-universal-v2-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Delete | `src/content/quizzes/` | Remove v1 quiz data |
| Delete | `src/pages/selector/` | Remove v1 quiz pages |
| Modify | `src/content/config.ts` | Remove `quizzes`, add `productos` collection |
| Create | `src/content/productos/alimentacion.yaml` | Product registry: food (113 products) |
| Create | `src/content/productos/higiene.yaml` | Product registry: hygiene (95 products) |
| Create | `src/content/productos/paseo.yaml` | Product registry: walking/travel (74 products) |
| Create | `src/content/productos/juguetes.yaml` | Product registry: toys (39 products) |
| Create | `src/content/productos/hogar.yaml` | Product registry: home (54 products) |
| Create | `src/data/quiz-config.yaml` | Categories, subcategories, question pool |
| Create | `src/components/QuizCategoryPicker.astro` | Category + subcategory selection UI |
| Modify | `src/components/QuizQuestion.astro` | Support dynamic questions per subcategory |
| Modify | `src/components/QuizResult.astro` | Add informative article suggestions |
| Create | `src/components/QuizHomeBanner.astro` | Homepage CTA section |
| Modify | `src/components/QuizCTA.astro` | Update URL to /elegir/ |
| Create | `src/pages/elegir/index.astro` | Single page: quiz + JS engine |
| Modify | `src/styles/global.css` | Expand quiz styles + nav pill + homepage CTA |
| Modify | `src/components/Header.astro` | Pill-style "Te ayudamos a elegir" link |
| Modify | `src/components/Footer.astro` | Update link to /elegir/ |
| Modify | `src/pages/index.astro` | Add QuizHomeBanner section |
| Modify | `CLAUDE.md` | Add product registry rule to article checklist |

---

### Task 1: Delete v1 and update schema

**Files:**
- Delete: `src/content/quizzes/` (entire directory)
- Delete: `src/pages/selector/` (entire directory)
- Modify: `src/content/config.ts`

- [ ] **Step 1: Delete v1 files**

```bash
rm -rf src/content/quizzes/ src/pages/selector/
```

- [ ] **Step 2: Update config.ts — remove quizzes, add productos**

Replace the entire file `src/content/config.ts` with:

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

export const collections = { articulos, productos };
```

- [ ] **Step 3: Create empty productos directory**

```bash
mkdir -p src/content/productos
```

- [ ] **Step 4: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: remove v1 quiz system, add productos collection schema"
```

---

### Task 2: Create quiz-config.yaml

**Files:**
- Create: `src/data/quiz-config.yaml`

This file defines the entire quiz flow: categories, subcategories, questions, and article tag mapping. It's the brain of the recommender.

- [ ] **Step 1: Create data directory and config file**

```bash
mkdir -p src/data
```

Create `src/data/quiz-config.yaml` with the complete quiz configuration. The subcategories are derived from the 86 existing articles. Each subcategory maps to the `subcategoria` field in the product registry.

```yaml
# =============================================================================
# QUIZ CONFIG — Categories, subcategories, and question pool
# =============================================================================

categorias:
  - id: alimentacion
    nombre: "Alimentación"
    descripcion: "Pienso, comida húmeda, snacks y comederos"
    icono: alimentacion
    subcategorias:
      - id: pienso
        nombre: "Pienso seco"
        descripcion: "El alimento principal del día a día"
        preguntas: [tamano, edad, condicion, actividad, presupuesto]
        preguntasGato: [edad, condicion_gato, estilo_vida, presupuesto]
      - id: comida-humeda
        nombre: "Comida húmeda"
        descripcion: "Latas y sobres para complementar o alimentar"
        preguntas: [tamano, edad, presupuesto]
        preguntasGato: [edad, presupuesto]
      - id: snacks
        nombre: "Snacks y premios"
        descripcion: "Para entrenar, premiar o complementar"
        preguntas: [tamano, presupuesto]
        preguntasGato: [presupuesto]
      - id: comedero
        nombre: "Comedero"
        descripcion: "Estándar, elevado, antiengulle o automático"
        preguntas: [tipo_comedero, presupuesto]
        preguntasGato: [tipo_comedero_gato, presupuesto]
      - id: fuente-agua
        nombre: "Fuente de agua"
        descripcion: "Agua fresca y filtrada siempre disponible"
        soloAnimal: gato
        preguntas: [prioridad_fuente, presupuesto]
      - id: bebedero
        nombre: "Bebedero"
        descripcion: "Cuencos y fuentes para hidratación"
        soloAnimal: perro
        preguntas: [tamano, presupuesto]

  - id: higiene
    nombre: "Higiene y cuidado"
    descripcion: "Cepillos, champús, antiparasitarios y limpieza"
    icono: higiene
    subcategorias:
      - id: cepillo
        nombre: "Cepillo"
        descripcion: "Para el pelaje de tu mascota"
        preguntas: [tipo_pelo, presupuesto]
      - id: champu
        nombre: "Champú"
        descripcion: "Baño y cuidado de la piel"
        preguntas: [condicion_piel, presupuesto]
      - id: antiparasitario
        nombre: "Antiparasitario"
        descripcion: "Protección contra pulgas y garrapatas"
        preguntas: [tamano, formato_antiparasitario, presupuesto]
        preguntasGato: [formato_antiparasitario, presupuesto]
      - id: cortapelos
        nombre: "Cortapelos"
        descripcion: "Para recortar el pelo en casa"
        soloAnimal: perro
        preguntas: [tipo_pelo, presupuesto]
      - id: cortaunas
        nombre: "Cortaúñas"
        descripcion: "Para mantener las uñas a raya"
        soloAnimal: perro
        preguntas: [tamano, presupuesto]
      - id: dental
        nombre: "Higiene dental"
        descripcion: "Cepillos de dientes y limpiadores de oídos"
        soloAnimal: perro
        preguntas: [tamano, presupuesto]
      - id: secador
        nombre: "Secador"
        descripcion: "Para secar después del baño"
        soloAnimal: perro
        preguntas: [tamano, presupuesto]
      - id: toallitas
        nombre: "Toallitas"
        descripcion: "Para limpieza rápida entre baños"
        soloAnimal: perro
        preguntas: [prioridad_toallitas, presupuesto]
      - id: bolsas-caca
        nombre: "Bolsas y dispensador"
        descripcion: "Para recoger en el paseo"
        soloAnimal: perro
        preguntas: [prioridad_bolsas, presupuesto]
      - id: empapadores
        nombre: "Empapadores"
        descripcion: "Para cachorros, senior o interior"
        soloAnimal: perro
        preguntas: [uso_empapador, presupuesto]
      - id: arenero
        nombre: "Arenero y arena"
        descripcion: "Arenero y tipo de arena para tu gato"
        soloAnimal: gato
        preguntas: [tipo_arenero, presupuesto]
      - id: limpiador
        nombre: "Limpiador enzimático"
        descripcion: "Elimina manchas y olores de orina"
        preguntas: [presupuesto]
      - id: aspirador
        nombre: "Aspirador pelo mascotas"
        descripcion: "Para eliminar pelo de sofás y alfombras"
        preguntas: [presupuesto]
      - id: protector-patas
        nombre: "Protector de almohadillas"
        descripcion: "Ceras y botas para asfalto y nieve"
        soloAnimal: perro
        preguntas: [uso_protector_patas, presupuesto]
      - id: quitapelos
        nombre: "Quitapelos sofá"
        descripcion: "Rodillos y cepillos para muebles"
        soloAnimal: perro
        preguntas: [presupuesto]

  - id: paseo
    nombre: "Paseo y viaje"
    descripcion: "Arneses, transportines, GPS y accesorios"
    icono: paseo
    subcategorias:
      - id: arnes
        nombre: "Arnés"
        descripcion: "Para pasear cómodo y seguro"
        preguntas: [tamano, tira, uso_arnes, presupuesto]
      - id: arnes-gato
        nombre: "Arnés para gato"
        descripcion: "Para pasear con tu gato de forma segura"
        soloAnimal: gato
        preguntas: [presupuesto]
      - id: correa
        nombre: "Correa"
        descripcion: "Fija, extensible o de entrenamiento"
        soloAnimal: perro
        preguntas: [tamano, tipo_correa, presupuesto]
      - id: collar
        nombre: "Collar luminoso"
        descripcion: "Para paseos nocturnos con visibilidad"
        soloAnimal: perro
        preguntas: [tamano, presupuesto]
      - id: bozal
        nombre: "Bozal"
        descripcion: "Seguro, cómodo y bien ventilado"
        soloAnimal: perro
        preguntas: [tamano, presupuesto]
      - id: transportin
        nombre: "Transportín"
        descripcion: "Para viajes y visitas al veterinario"
        preguntas: [tamano, medio_transporte, presupuesto]
      - id: gps
        nombre: "GPS y localizador"
        descripcion: "Para no perder nunca a tu mascota"
        preguntas: [presupuesto]
      - id: protector-coche
        nombre: "Protector de coche"
        descripcion: "Fundas de maletero y asiento"
        soloAnimal: perro
        preguntas: [tipo_protector_coche, presupuesto]
      - id: ropa
        nombre: "Ropa para perro"
        descripcion: "Abrigos, chubasqueros y chalecos"
        soloAnimal: perro
        preguntas: [tamano, tipo_ropa, presupuesto]
      - id: antiladridos
        nombre: "Collar antiladridos"
        descripcion: "Sin descargas: vibración, ultrasonido o spray"
        soloAnimal: perro
        preguntas: [tamano, presupuesto]

  - id: juguetes
    nombre: "Juguetes y diversión"
    descripcion: "Juguetes, rascadores y enriquecimiento"
    icono: juguetes
    subcategorias:
      - id: juguete
        nombre: "Juguete"
        descripcion: "Para jugar, morder y entretenerse"
        preguntas: [tamano, edad, tipo_juego, presupuesto]
        preguntasGato: [tipo_juego_gato, presupuesto]
      - id: rascador
        nombre: "Rascador"
        descripcion: "Postes, árboles y rascadores de pared"
        soloAnimal: gato
        preguntas: [espacio, presupuesto]
      - id: alfombra-olfato
        nombre: "Alfombra de olfato"
        descripcion: "Estimulación mental a través del olfato"
        soloAnimal: perro
        preguntas: [tamano, presupuesto]
      - id: feromonas
        nombre: "Difusor de feromonas"
        descripcion: "Para reducir estrés y marcaje"
        soloAnimal: gato
        preguntas: [problema_feromonas, presupuesto]
      - id: agilidad
        nombre: "Circuito de agilidad"
        descripcion: "Túneles, vallas y slalom para entrenar"
        soloAnimal: perro
        preguntas: [espacio, presupuesto]

  - id: hogar
    nombre: "Hogar y confort"
    descripcion: "Camas, mantas, protectores y seguridad"
    icono: hogar
    subcategorias:
      - id: cama
        nombre: "Cama"
        descripcion: "Para descansar cómodo"
        preguntas: [tamano, tipo_cama, presupuesto]
        preguntasGato: [tipo_cama_gato, presupuesto]
      - id: manta
        nombre: "Manta"
        descripcion: "Para abrigarse y proteger el sofá"
        soloAnimal: perro
        preguntas: [tamano, presupuesto]
      - id: protector-sofa
        nombre: "Protector de sofá"
        descripcion: "Impermeables y antiarañazos"
        preguntas: [presupuesto]
      - id: gatera
        nombre: "Gatera"
        descripcion: "Puertas para gatos con chip o magnéticas"
        soloAnimal: gato
        preguntas: [tipo_gatera, presupuesto]
      - id: puerta-seguridad
        nombre: "Puerta de seguridad"
        descripcion: "Barreras para escaleras y pasillos"
        soloAnimal: perro
        preguntas: [tipo_instalacion, presupuesto]
      - id: camara
        nombre: "Cámara de vigilancia"
        descripcion: "Para vigilar a tu mascota cuando no estás"
        preguntas: [presupuesto]
      - id: refrigeracion
        nombre: "Alfombrilla refrigerante"
        descripcion: "Para combatir el calor en verano"
        soloAnimal: perro
        preguntas: [tamano, presupuesto]
      - id: piscina
        nombre: "Piscina"
        descripcion: "Plegables y resistentes a uñas"
        soloAnimal: perro
        preguntas: [tamano, presupuesto]
      - id: jaula
        nombre: "Jaula / crate"
        descripcion: "Para casa y coche"
        soloAnimal: perro
        preguntas: [tamano, uso_jaula, presupuesto]
      - id: rampa
        nombre: "Rampa o escalera"
        descripcion: "Acceso seguro al sofá, cama o coche"
        soloAnimal: perro
        preguntas: [tamano, uso_rampa, presupuesto]
      - id: repelente
        nombre: "Repelente para muebles"
        descripcion: "Sprays para evitar arañazos y marcaje"
        soloAnimal: gato
        preguntas: [presupuesto]

# =============================================================================
# QUESTION POOL — Reusable question definitions
# =============================================================================

preguntas:
  tamano:
    texto: "¿Qué tamaño tiene tu perro?"
    textoGato: "¿Tu gato es de raza grande o estándar?"
    filtro: tamano
    opciones:
      - texto: "Pequeño (menos de 10 kg)"
        valor: pequeno
      - texto: "Mediano (10-25 kg)"
        valor: mediano
      - texto: "Grande (25-45 kg)"
        valor: grande
      - texto: "Gigante (más de 45 kg)"
        valor: grande
    opcionesGato:
      - texto: "Estándar"
        valor: estandar
      - texto: "Raza grande (Maine Coon, Ragdoll...)"
        valor: grande

  edad:
    texto: "¿Qué edad tiene?"
    filtro: etapa
    opciones:
      - texto: "Cachorro (menos de 1 año)"
        valor: cachorro
      - texto: "Adulto (1-7 años)"
        valor: adulto
      - texto: "Senior (más de 7 años)"
        valor: senior

  condicion:
    texto: "¿Tiene alguna necesidad especial?"
    filtro: null
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

  condicion_gato:
    texto: "¿Tiene alguna necesidad especial?"
    filtro: null
    opciones:
      - texto: "Esterilizado o castrada"
        tags: { esterilizado: 1 }
      - texto: "Problemas urinarios"
        tags: { urinario: 1 }
      - texto: "Pelo largo (bolas de pelo)"
        tags: { pelo_largo: 1 }
      - texto: "Piel sensible o alergias"
        tags: { piel_sensible: 1 }
      - texto: "Ninguna en particular"
        tags: {}

  estilo_vida:
    texto: "¿Tu gato sale a la calle?"
    filtro: null
    opciones:
      - texto: "Vive solo en interior"
        tags: { indoor: 1 }
      - texto: "Sale al exterior"
        tags: { outdoor: 1 }

  actividad:
    texto: "¿Cuánta actividad diaria hace?"
    filtro: null
    opciones:
      - texto: "Poca (paseos cortos)"
        tags: { actividad_baja: 1 }
      - texto: "Moderada (1-2 horas de paseo)"
        tags: { actividad_moderada: 1 }
      - texto: "Alta (deporte, campo, trabajo)"
        tags: { actividad_alta: 1 }

  presupuesto:
    texto: "¿Qué presupuesto manejas?"
    filtro: null
    opciones:
      - texto: "Económico (lo más barato que funcione)"
        tags: { presupuesto_economico: 1 }
      - texto: "Medio (buena relación calidad-precio)"
        tags: { presupuesto_medio: 1 }
      - texto: "Premium (lo mejor, sin límite)"
        tags: { presupuesto_premium: 1 }

  tira:
    texto: "¿Tu perro tira mucho de la correa?"
    filtro: null
    opciones:
      - texto: "Sí, bastante"
        tags: { antitirones: 1 }
      - texto: "Normal, pero quiero control"
        tags: { control: 1 }
      - texto: "No, es tranquilo"
        tags: { confort: 1 }

  uso_arnes:
    texto: "¿Para qué lo vas a usar principalmente?"
    filtro: null
    opciones:
      - texto: "Paseo diario por ciudad"
        tags: { uso_ciudad: 1 }
      - texto: "Senderismo o campo"
        tags: { uso_campo: 1 }
      - texto: "Viajes en coche"
        tags: { uso_coche: 1 }

  tipo_juego:
    texto: "¿Qué tipo de juego le gusta más?"
    filtro: null
    opciones:
      - texto: "Morder y destrozar cosas"
        tags: { juego_morder: 1 }
      - texto: "Juegos mentales y olfato"
        tags: { juego_mental: 1 }
      - texto: "Perseguir y traer"
        tags: { juego_fisico: 1 }
      - texto: "Un poco de todo"
        tags: {}

  tipo_juego_gato:
    texto: "¿Qué tipo de juego le gusta más?"
    filtro: null
    opciones:
      - texto: "Cazar y perseguir"
        tags: { juego_cazar: 1 }
      - texto: "Trepar y esconderse"
        tags: { juego_trepar: 1 }
      - texto: "Juego interactivo contigo"
        tags: { juego_interactivo: 1 }

  medio_transporte:
    texto: "¿Cómo lo vas a transportar?"
    filtro: null
    opciones:
      - texto: "En coche"
        tags: { transporte_coche: 1 }
      - texto: "En avión (cabina)"
        tags: { transporte_avion: 1 }
      - texto: "A pie o transporte público"
        tags: { transporte_pie: 1 }

  espacio:
    texto: "¿Cuánto espacio tienes?"
    filtro: null
    opciones:
      - texto: "Piso pequeño, poco espacio"
        tags: { espacio_pequeno: 1 }
      - texto: "Espacio normal"
        tags: { espacio_medio: 1 }
      - texto: "Mucho espacio (casa, jardín)"
        tags: { espacio_grande: 1 }

  tipo_pelo:
    texto: "¿Qué tipo de pelo tiene?"
    filtro: null
    opciones:
      - texto: "Pelo corto y liso"
        tags: { pelo_corto: 1 }
      - texto: "Pelo largo o semilargo"
        tags: { pelo_largo: 1 }
      - texto: "Pelo duro o rizado"
        tags: { pelo_duro: 1 }

  condicion_piel:
    texto: "¿Tiene algún problema de piel?"
    filtro: null
    opciones:
      - texto: "Piel sensible o atópica"
        tags: { piel_sensible: 1 }
      - texto: "Parásitos o picores"
        tags: { antipicores: 1 }
      - texto: "Piel normal, baño de mantenimiento"
        tags: { piel_normal: 1 }

  formato_antiparasitario:
    texto: "¿Qué formato prefieres?"
    filtro: null
    opciones:
      - texto: "Collar (protección continua)"
        tags: { formato_collar: 1 }
      - texto: "Pipeta (aplicación mensual)"
        tags: { formato_pipeta: 1 }
      - texto: "Pastilla (vía oral)"
        tags: { formato_pastilla: 1 }
      - texto: "No tengo preferencia"
        tags: {}

  tipo_cama:
    texto: "¿Qué tipo de cama prefieres?"
    filtro: null
    opciones:
      - texto: "Colchón o colchoneta"
        tags: { cama_colchon: 1 }
      - texto: "Cama con bordes (nido)"
        tags: { cama_nido: 1 }
      - texto: "Cama elevada o hamaca"
        tags: { cama_elevada: 1 }
      - texto: "Ortopédica (perro mayor o con dolores)"
        tags: { cama_ortopedica: 1 }

  tipo_cama_gato:
    texto: "¿Qué tipo de cama prefieres?"
    filtro: null
    opciones:
      - texto: "Cueva o iglú"
        tags: { cama_cueva: 1 }
      - texto: "Cama donut (acurrucarse)"
        tags: { cama_donut: 1 }
      - texto: "Hamaca de ventana"
        tags: { cama_hamaca: 1 }
      - texto: "Cama clásica o colchón"
        tags: { cama_colchon: 1 }

  tipo_comedero:
    texto: "¿Qué tipo de comedero buscas?"
    filtro: null
    opciones:
      - texto: "Automático con WiFi y app"
        tags: { comedero_automatico: 1 }
      - texto: "Antiengulle (come muy rápido)"
        tags: { comedero_lento: 1 }
      - texto: "Elevado (mejor postura)"
        tags: { comedero_elevado: 1 }
      - texto: "Estándar o básico"
        tags: {}

  tipo_comedero_gato:
    texto: "¿Qué tipo de comedero buscas?"
    filtro: null
    opciones:
      - texto: "Automático con WiFi y app"
        tags: { comedero_automatico: 1 }
      - texto: "Estándar elevado o inclinado"
        tags: { comedero_elevado: 1 }
      - texto: "Antihormigas"
        tags: { comedero_antihormigas: 1 }

  prioridad_fuente:
    texto: "¿Qué es lo más importante para ti?"
    filtro: null
    opciones:
      - texto: "Que sea silenciosa"
        tags: { fuente_silenciosa: 1 }
      - texto: "Que sea fácil de limpiar"
        tags: { fuente_facil: 1 }
      - texto: "Que tenga gran capacidad"
        tags: { fuente_grande: 1 }

  tipo_correa:
    texto: "¿Qué tipo de correa buscas?"
    filtro: null
    opciones:
      - texto: "Extensible (más libertad)"
        tags: { correa_extensible: 1 }
      - texto: "Fija corta (más control)"
        tags: { correa_fija: 1 }
      - texto: "Larga de entrenamiento"
        tags: { correa_larga: 1 }

  tipo_protector_coche:
    texto: "¿Qué quieres proteger?"
    filtro: null
    opciones:
      - texto: "El maletero"
        tags: { protector_maletero: 1 }
      - texto: "El asiento trasero"
        tags: { protector_asiento: 1 }

  tipo_ropa:
    texto: "¿Qué necesitas?"
    filtro: null
    opciones:
      - texto: "Abrigo para invierno"
        tags: { ropa_abrigo: 1 }
      - texto: "Chubasquero para lluvia"
        tags: { ropa_chubasquero: 1 }
      - texto: "Chaleco salvavidas (playa/piscina)"
        tags: { ropa_chaleco: 1 }

  tipo_arenero:
    texto: "¿Qué tipo de arenero prefieres?"
    filtro: null
    opciones:
      - texto: "Cerrado (menos olor)"
        tags: { arenero_cerrado: 1 }
      - texto: "Abierto (más accesible)"
        tags: { arenero_abierto: 1 }
      - texto: "Autolimpiable"
        tags: { arenero_auto: 1 }

  tipo_gatera:
    texto: "¿Qué tipo de gatera necesitas?"
    filtro: null
    opciones:
      - texto: "Con microchip (solo tu gato entra)"
        tags: { gatera_chip: 1 }
      - texto: "Magnética"
        tags: { gatera_magnetica: 1 }
      - texto: "Manual básica"
        tags: { gatera_manual: 1 }

  problema_feromonas:
    texto: "¿Qué problema quieres tratar?"
    filtro: null
    opciones:
      - texto: "Estrés general o mudanza"
        tags: { feromona_estres: 1 }
      - texto: "Marcaje con orina"
        tags: { feromona_marcaje: 1 }
      - texto: "Agresividad entre gatos"
        tags: { feromona_agresividad: 1 }

  uso_empapador:
    texto: "¿Para qué lo vas a usar?"
    filtro: null
    opciones:
      - texto: "Cachorro en aprendizaje"
        tags: { empapador_cachorro: 1 }
      - texto: "Perro senior o incontinente"
        tags: { empapador_senior: 1 }
      - texto: "Perro de interior"
        tags: { empapador_interior: 1 }

  prioridad_toallitas:
    texto: "¿Qué es lo más importante?"
    filtro: null
    opciones:
      - texto: "Hipoalergénicas (piel sensible)"
        tags: { toallita_hipo: 1 }
      - texto: "Biodegradables"
        tags: { toallita_bio: 1 }
      - texto: "Lo más económicas"
        tags: { toallita_economica: 1 }

  prioridad_bolsas:
    texto: "¿Qué prefieres?"
    filtro: null
    opciones:
      - texto: "Biodegradables / compostables"
        tags: { bolsa_bio: 1 }
      - texto: "Con dispensador para correa"
        tags: { bolsa_dispensador: 1 }
      - texto: "Lo más barato"
        tags: { bolsa_economica: 1 }

  uso_protector_patas:
    texto: "¿Para qué situación?"
    filtro: null
    opciones:
      - texto: "Asfalto caliente en verano"
        tags: { patas_calor: 1 }
      - texto: "Nieve o frío extremo"
        tags: { patas_frio: 1 }
      - texto: "Terreno abrasivo (montaña)"
        tags: { patas_montana: 1 }

  tipo_instalacion:
    texto: "¿Cómo la quieres instalar?"
    filtro: null
    opciones:
      - texto: "A presión (sin agujeros)"
        tags: { puerta_presion: 1 }
      - texto: "Con tornillos (más segura)"
        tags: { puerta_tornillos: 1 }

  uso_jaula:
    texto: "¿Para qué la vas a usar?"
    filtro: null
    opciones:
      - texto: "En casa (crate training)"
        tags: { jaula_casa: 1 }
      - texto: "Para el coche"
        tags: { jaula_coche: 1 }
      - texto: "Ambos usos"
        tags: {}

  uso_rampa:
    texto: "¿Para acceder a dónde?"
    filtro: null
    opciones:
      - texto: "Al sofá o la cama"
        tags: { rampa_sofa: 1 }
      - texto: "Al coche"
        tags: { rampa_coche: 1 }

# =============================================================================
# ARTICLE TAG MAP — Quiz tags → article tags for informative suggestions
# =============================================================================

articuloTagMap:
  piel_sensible: ["piel sensible", "alergias", "dermatitis", "atopia"]
  esterilizado: ["esterilizado", "castrado", "esterilización"]
  sobrepeso: ["sobrepeso", "obesidad", "dieta", "peso"]
  diabetico: ["diabetes", "diabético"]
  digestivo: ["digestión", "problemas digestivos", "estómago"]
  urinario: ["urinario", "cistitis", "cálculos"]
  pelo_largo: ["pelo largo", "bolas de pelo"]
  indoor: ["gato interior", "indoor", "gato de interior"]
  antitirones: ["tirones", "paseo", "tira de la correa"]
  piel_sensible: ["piel sensible", "champú suave", "dermatitis"]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/quiz-config.yaml
git commit -m "feat: add quiz-config with all categories, subcategories, and question pool"
```

---

### Task 3: Migrate alimentacion products (26 articles, ~113 products)

**Files:**
- Create: `src/content/productos/alimentacion.yaml`

**Process:** Read each article's ComparisonTable `productos` array. For each product, create a registry entry with the format below. Assign `subcategoria` based on the article type, and assign `filtros` and `afinidad` based on the product's profile and the quiz questions defined for that subcategory.

**Subcategory mapping for alimentacion articles:**

| Article slug | subcategoria | animal |
|---|---|---|
| mejor-pienso-perro-raza-pequena | pienso | perro |
| mejor-pienso-perro-adulto-raza-mediana | pienso | perro |
| mejor-pienso-perro-raza-grande | pienso | perro |
| mejor-pienso-cachorro-raza-grande | pienso | perro |
| mejor-pienso-perro-senior | pienso | perro |
| mejor-pienso-perro-esterilizado | pienso | perro |
| mejor-pienso-hipoalergenico-perro | pienso | perro |
| mejor-pienso-perro-diabetico | pienso | perro |
| mejor-pienso-cachorro-gato | pienso | gato |
| mejor-pienso-gato-esterilizado | pienso | gato |
| mejor-pienso-gato-indoor | pienso | gato |
| mejor-pienso-gato-pelo-largo | pienso | gato |
| mejor-pienso-gato-senior | pienso | gato |
| pienso-gato-problemas-urinarios | pienso | gato |
| mejor-comida-humeda-perros | comida-humeda | perro |
| mejor-comida-humeda-gatos | comida-humeda | gato |
| mejores-snacks-naturales-perros | snacks | perro |
| snacks-naturales-gatos | snacks | gato |
| mejor-comedero-perros-guia | comedero | perro |
| mejor-comedero-gatos-guia | comedero | gato |
| mejor-comedero-automatico-wifi-gatos | comedero | gato |
| mejor-comedero-automatico-perros-app | comedero | perro |
| mejor-comedero-antihormigas-mascotas | comedero | ambos |
| comparativa-fuentes-agua-gatos | fuente-agua | gato |
| mejor-fuente-agua-gatos-silenciosa | fuente-agua | gato |
| mejor-bebedero-perros-guia | bebedero | perro |

**Product entry format:**

```yaml
- id: royal-canin-mini-adult                # kebab-case, unique globally
  nombre: "Royal Canin Mini Adult"           # exact name from ComparisonTable
  marca: "Royal Canin"                       # first word(s) of nombre, or explicit marca field
  imagen: "https://m.media-amazon.com/..."   # exact imagen from ComparisonTable
  precio: "~52€"                             # exact precio from ComparisonTable
  precioAmazon: "51,52€ (8 kg)"             # if present
  precioZooplus: null                        # if not present
  precioTiendanimal: null                    # if not present
  enlaceAmazon: "https://www.amazon.es/dp/B000T4FWQ4"  # WITHOUT tag param
  enlaceZooplus: null
  enlaceTiendanimal: null
  categoria: alimentacion
  subcategoria: pienso                       # from mapping table above
  animal: perro                              # from article frontmatter
  articuloSlug: mejor-pienso-perro-raza-pequena  # article slug
  descripcionCorta: "..."                    # from puntosFuertes, shortened to 1-2 sentences
  filtros:                                   # HARD filters — which quiz options make this product eligible
    tamano: [pequeno]                        # from article context (raza-pequena → pequeno)
    etapa: [adulto]                          # from article context (adulto/cachorro/senior)
  afinidad:                                  # SOFT scoring — how well it matches each preference (0-5)
    esterilizado: 1                          # 0 = irrelevant, 1-2 = somewhat relevant, 3-5 = ideal
    actividad_moderada: 2
    presupuesto_medio: 3
```

**Rules for assigning `filtros`:**
- `tamano`: Derived from article slug/context. `raza-pequena` → `[pequeno]`, `raza-mediana` → `[mediano]`, `raza-grande` → `[grande]`. Hypoallergenic/diabetic products apply to all sizes: `[pequeno, mediano, grande]`.
- `etapa`: From article. `cachorro` → `[cachorro]`, `adulto` or default → `[adulto]`, `senior` → `[senior]`. Hypoallergenic/diabetic apply to `[adulto, senior]`.
- For non-food products (comederos, fuentes): typically no `filtros` needed since quiz questions are all soft scoring.

**Rules for assigning `afinidad`:**
- Look at the quiz questions for this subcategory (from quiz-config.yaml).
- For each tag that a quiz option can generate, assign a weight 0-5 based on how well the product matches.
- Example: Royal Canin Mini Adult is a standard medium-price food → `presupuesto_medio: 3`, `presupuesto_economico: 1`, `presupuesto_premium: 0`. It's okay for low activity dogs → `actividad_baja: 2`, `actividad_moderada: 2`. Not specifically for sensitive skin → `piel_sensible: 0`.
- If a product is THE answer for a specific condition (e.g., Royal Canin Diabetic for diabetico), give it weight 5.

- [ ] **Step 1: Read all 26 alimentacion articles and extract products**

Read each article's ComparisonTable productos array. For articles with TopPick that adds extra products not in the table, include those too.

- [ ] **Step 2: Create alimentacion.yaml with all products**

Write `src/content/productos/alimentacion.yaml` with all ~113 products in the format above.

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add src/content/productos/alimentacion.yaml
git commit -m "feat: add alimentacion product registry (113 products from 26 articles)"
```

---

### Task 4: Migrate higiene products (22 articles, ~95 products)

**Files:**
- Create: `src/content/productos/higiene.yaml`

Same process as Task 3. Read all 22 higiene articles, extract ComparisonTable products, structure in registry format.

**Subcategory mapping:**

| Article slug | subcategoria |
|---|---|
| mejor-cepillo-perro | cepillo |
| mejor-cepillo-gatos | cepillo |
| cepillos-quitar-pelo-perro-sofa | quitapelos |
| champu-perros-piel-sensible | champu |
| mejor-champu-gato | champu |
| mejor-antiparasitario-perros-guia | antiparasitario |
| mejor-antiparasitario-gatos-guia | antiparasitario |
| mejor-collar-antiparasitario-perro | antiparasitario |
| collar-antipulgas-natural-perro | antiparasitario |
| mejor-cortapelos-perros | cortapelos |
| mejor-cortaunas-perros | cortaunas |
| mejor-cepillo-dientes-perros | dental |
| como-limpiar-oidos-perro | dental |
| mejor-secador-perros | secador |
| mejor-toallitas-perros | toallitas |
| mejores-bolsas-caca-perro-biodegradables | bolsas-caca |
| mejor-dispensador-bolsas-caca-perro | bolsas-caca |
| mejores-empapadores-perros | empapadores |
| mejor-arenero-arena-gatos | arenero |
| mejor-limpiador-enzimatico-mascotas | limpiador |
| mejor-aspirador-pelo-mascotas | aspirador |
| mejor-protector-patas-perro | protector-patas |

- [ ] **Step 1: Read all 22 higiene articles and extract products**
- [ ] **Step 2: Create higiene.yaml with all ~95 products**
- [ ] **Step 3: Verify build**
- [ ] **Step 4: Commit**

```bash
git add src/content/productos/higiene.yaml
git commit -m "feat: add higiene product registry (95 products from 22 articles)"
```

---

### Task 5: Migrate paseo products (17 articles, ~74 products)

**Files:**
- Create: `src/content/productos/paseo.yaml`

**Subcategory mapping:**

| Article slug | subcategoria |
|---|---|
| mejor-arnes-perro | arnes |
| mejor-arnes-antitirones-perro | arnes |
| mejor-arnes-gato-pasear | arnes-gato |
| mejor-correa-perro | correa |
| correa-extensible-perros | correa |
| mejor-collar-luminoso-perro | collar |
| collar-antiladridos-perros | antiladridos |
| mejor-bozal-perro | bozal |
| mejor-transportin-perros-guia | transportin |
| mejor-transportin-gatos-guia | transportin |
| mejor-gps-perro | gps |
| collar-gps-gato | gps |
| mejor-protector-maletero-perros | protector-coche |
| asiento-coche-perro | protector-coche |
| mejor-abrigo-perro-invierno | ropa |
| mejor-chubasquero-perro | ropa |
| mejor-chaleco-salvavidas-perro | ropa |
| mejor-dispensador-bolsas-caca-perro | — already in higiene |

- [ ] **Step 1: Read all 17 paseo articles and extract products**
- [ ] **Step 2: Create paseo.yaml with all ~74 products**
- [ ] **Step 3: Verify build**
- [ ] **Step 4: Commit**

```bash
git add src/content/productos/paseo.yaml
git commit -m "feat: add paseo product registry (74 products from 17 articles)"
```

---

### Task 6: Migrate juguetes products (9 articles, ~39 products)

**Files:**
- Create: `src/content/productos/juguetes.yaml`

**Subcategory mapping:**

| Article slug | subcategoria |
|---|---|
| mejor-juguete-cachorro | juguete |
| mejor-juguete-mental-perros-guia | juguete |
| mejor-juguete-resistente-perros-guia | juguete |
| mejor-juguete-gatos-guia | juguete |
| mejor-rascador-gatos-guia | rascador |
| arbol-rascador-pequeno-pisos | rascador |
| alfombras-olfato-perros | alfombra-olfato |
| mejor-difusor-feromonas-gatos | feromonas |
| mejor-circuito-agilidad-perros | agilidad |

- [ ] **Step 1: Read all 9 juguetes articles and extract products**
- [ ] **Step 2: Create juguetes.yaml with all ~39 products**
- [ ] **Step 3: Verify build**
- [ ] **Step 4: Commit**

```bash
git add src/content/productos/juguetes.yaml
git commit -m "feat: add juguetes product registry (39 products from 9 articles)"
```

---

### Task 7: Migrate hogar products (12 articles, ~54 products)

**Files:**
- Create: `src/content/productos/hogar.yaml`

**Subcategory mapping:**

| Article slug | subcategoria |
|---|---|
| mejor-cama-perro-guia | cama |
| mejor-cama-gato-guia | cama |
| mejor-manta-perros | manta |
| protector-sofa-mascotas | protector-sofa |
| mejor-gatera-puerta-gato | gatera |
| mejor-puerta-seguridad-perros | puerta-seguridad |
| mejor-camara-vigilar-mascotas | camara |
| alfombrilla-refrigerante-perros | refrigeracion |
| mejor-piscina-perros | piscina |
| jaula-perro-casa-coche | jaula |
| mejor-escalera-rampa-perros | rampa |
| mejor-repelente-gatos-muebles | repelente |

- [ ] **Step 1: Read all 12 hogar articles and extract products**
- [ ] **Step 2: Create hogar.yaml with all ~54 products**
- [ ] **Step 3: Verify build**
- [ ] **Step 4: Commit**

```bash
git add src/content/productos/hogar.yaml
git commit -m "feat: add hogar product registry (54 products from 12 articles)"
```

---

### Task 8: Create QuizCategoryPicker component

**Files:**
- Create: `src/components/QuizCategoryPicker.astro`

This component renders both the category grid (step 1) and the subcategory buttons (step 2). Both are rendered at build time and toggled by JS.

- [ ] **Step 1: Create the component**

Create `src/components/QuizCategoryPicker.astro`:

```astro
---
import IconCategory from './IconCategory.astro';

interface Subcategoria {
  id: string;
  nombre: string;
  descripcion: string;
  soloAnimal?: string;
  count: number;
}

interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  subcategorias: Subcategoria[];
  totalProducts: number;
}

interface Props {
  categorias: Categoria[];
}

const { categorias } = Astro.props;
---

{/* Step 1: Category selection */}
<div class="quiz-step quiz-step--active" data-step="categoria" id="quiz-step-categoria">
  <h2 class="quiz-question-text">¿Qué estás buscando para tu mascota?</h2>
  <div class="quiz-category-grid">
    {categorias.map(cat => (
      <button
        type="button"
        class="quiz-category-card"
        data-categoria={cat.id}
      >
        <span class="quiz-category-icon" aria-hidden="true">
          <IconCategory category={cat.id} size={32} />
        </span>
        <span class="quiz-category-name">{cat.nombre}</span>
        <span class="quiz-category-desc">{cat.descripcion}</span>
        <span class="quiz-category-count">{cat.totalProducts} productos</span>
      </button>
    ))}
  </div>
</div>

{/* Step 2: Subcategory selection (one set per category, hidden by default) */}
{categorias.map(cat => (
  <div class="quiz-step" data-step="subcategoria" data-for-categoria={cat.id}>
    <h2 class="quiz-question-text">¿Qué tipo de producto necesitas?</h2>
    <div class="quiz-options">
      {cat.subcategorias.map(sub => (
        <button
          type="button"
          class="quiz-option quiz-option--with-desc"
          data-subcategoria={sub.id}
          data-solo-animal={sub.soloAnimal || ''}
        >
          <span class="quiz-option-main">
            <strong>{sub.nombre}</strong>
            <span class="quiz-option-desc">{sub.descripcion}</span>
          </span>
          <span class="quiz-option-count">{sub.count}</span>
        </button>
      ))}
    </div>
    <button type="button" class="quiz-back-btn" data-action="back">← Volver</button>
  </div>
))}

{/* Step 3: Animal selection (conditional — hidden by default, shown by JS if needed) */}
<div class="quiz-step" data-step="animal" id="quiz-step-animal">
  <h2 class="quiz-question-text">¿Para quién es?</h2>
  <div class="quiz-options quiz-options--animal">
    <button type="button" class="quiz-option quiz-option--animal" data-animal="perro">
      <span class="quiz-option-animal-icon" aria-hidden="true"><IconCategory category="perro" size={28} /></span>
      Perro
    </button>
    <button type="button" class="quiz-option quiz-option--animal" data-animal="gato">
      <span class="quiz-option-animal-icon" aria-hidden="true"><IconCategory category="gato" size={28} /></span>
      Gato
    </button>
  </div>
  <button type="button" class="quiz-back-btn" data-action="back">← Volver</button>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuizCategoryPicker.astro
git commit -m "feat: add QuizCategoryPicker with category, subcategory, and animal steps"
```

---

### Task 9: Update QuizQuestion for dynamic questions

**Files:**
- Modify: `src/components/QuizQuestion.astro`

The v1 QuizQuestion rendered one static question. v2 needs to render ALL possible questions at build time (hidden), and the JS engine shows the right ones based on the subcategory. Each question is identified by its `data-question-id`.

- [ ] **Step 1: Replace QuizQuestion.astro**

Replace `src/components/QuizQuestion.astro` with:

```astro
---
interface Opcion {
  texto: string;
  valor?: string;
  tags?: Record<string, number>;
}

interface Pregunta {
  id: string;
  texto: string;
  textoGato?: string;
  filtro?: string | null;
  opciones: Opcion[];
  opcionesGato?: Opcion[];
}

interface Props {
  preguntas: Record<string, Pregunta>;
}

const { preguntas } = Astro.props;
---

{Object.entries(preguntas).map(([id, q]) => (
  <div
    class="quiz-step"
    data-step="pregunta"
    data-question-id={id}
    role="radiogroup"
    aria-labelledby={`q-${id}`}
    style="display:none;"
  >
    {/* Perro version */}
    <h2 id={`q-${id}`} class="quiz-question-text" data-texto-perro={q.texto} data-texto-gato={q.textoGato || q.texto}>
      {q.texto}
    </h2>
    <div class="quiz-options" data-variant="perro">
      {q.opciones.map((opt, i) => (
        <button
          type="button"
          class="quiz-option"
          role="radio"
          aria-checked="false"
          data-option-index={i}
          data-valor={opt.valor || ''}
          data-tags={JSON.stringify(opt.tags || {})}
          data-filtro={q.filtro || ''}
        >
          {opt.texto}
        </button>
      ))}
    </div>
    {/* Gato version (hidden, swapped by JS if animal is gato and opcionesGato exists) */}
    {q.opcionesGato && (
      <div class="quiz-options" data-variant="gato" style="display:none;">
        {q.opcionesGato.map((opt, i) => (
          <button
            type="button"
            class="quiz-option"
            role="radio"
            aria-checked="false"
            data-option-index={i}
            data-valor={opt.valor || ''}
            data-tags={JSON.stringify(opt.tags || {})}
            data-filtro={q.filtro || ''}
          >
            {opt.texto}
          </button>
        ))}
      </div>
    )}
    <button type="button" class="quiz-back-btn" data-action="back">← Volver</button>
  </div>
))}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuizQuestion.astro
git commit -m "feat: update QuizQuestion for dynamic questions with animal variants"
```

---

### Task 10: Update QuizResult with article suggestions

**Files:**
- Modify: `src/components/QuizResult.astro`

Extends v1 result to include informative article suggestions. Receives all products and articles at build time; JS shows the right ones.

- [ ] **Step 1: Replace QuizResult.astro**

Replace `src/components/QuizResult.astro` with:

```astro
---
import StoreIcon from './StoreIcon.astro';

interface Producto {
  id: string;
  nombre: string;
  marca?: string;
  imagen?: string;
  precio: string;
  precioAmazon?: string | null;
  precioZooplus?: string | null;
  precioTiendanimal?: string | null;
  enlaceAmazon?: string | null;
  enlaceZooplus?: string | null;
  enlaceTiendanimal?: string | null;
  categoria: string;
  subcategoria: string;
  animal: string;
  articuloSlug: string;
  descripcionCorta: string;
  filtros: Record<string, string[]>;
  afinidad: Record<string, number>;
}

interface ArticuloInfo {
  slug: string;
  titulo: string;
  descripcion: string;
  animal: string;
  tags: string[];
}

interface Props {
  productos: Producto[];
  articulos: ArticuloInfo[];
}

const { productos, articulos } = Astro.props;

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

function optimizeImg(url?: string | null): string | undefined {
  return url?.replace(/\._AC_SL\d+_/, '._AC_SL300_') ?? undefined;
}

function buildStores(p: Producto) {
  const stores: { nombre: string; clase: string; precio: string; href: string }[] = [];
  if (p.enlaceAmazon) stores.push({ nombre: 'Amazon', clase: 'amazon', precio: p.precioAmazon || p.precio, href: amazonHref(p.enlaceAmazon) });
  if (p.enlaceZooplus) stores.push({ nombre: 'Zooplus', clase: 'zooplus', precio: p.precioZooplus || p.precio, href: p.enlaceZooplus });
  if (p.enlaceTiendanimal) stores.push({ nombre: 'Tiendanimal', clase: 'tiendanimal', precio: p.precioTiendanimal || p.precio, href: tiendanimalHref(p.enlaceTiendanimal) });
  return stores;
}
---

<div class="quiz-result" id="quiz-result">
  <div class="quiz-shared-notice" id="quiz-shared-notice" style="display:none;">
    Resultado basado en respuestas compartidas.
    <a href="#" id="quiz-shared-redo">¿Quieres hacer el test tú?</a>
  </div>

  <h2 class="quiz-result-title" id="quiz-result-title">Te recomendamos...</h2>
  <p class="quiz-result-summary" id="quiz-result-summary"></p>

  {/* One main recommendation card per product — JS shows the winner */}
  {productos.map((p, i) => {
    const stores = buildStores(p);
    return (
      <div class="quiz-rec-main" data-product-id={p.id} style="display:none;">
        <span class="quiz-rec-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Recomendado para ti
        </span>
        <div class="quiz-rec-body">
          {p.imagen && (
            <img src={optimizeImg(p.imagen)} alt={p.nombre} width="130" height="130" class="quiz-rec-img" loading="lazy" decoding="async" />
          )}
          <div class="quiz-rec-info">
            <p class="quiz-rec-name">{p.nombre}</p>
            <p class="quiz-rec-desc">{p.descripcionCorta}</p>
            <p class="quiz-rec-price">{p.precio}</p>
            <div class="quiz-rec-stores">
              {stores.map(s => (
                <a href={s.href} class={`affiliate-button ${s.clase}`} target="_blank" rel="nofollow noopener noreferrer sponsored">
                  <StoreIcon tienda={s.clase as any} size={15} />
                  {s.nombre} — {s.precio}
                </a>
              ))}
            </div>
            <a href={`/${p.categoria}/${p.articuloSlug}/`} class="quiz-rec-article-link">
              Lee nuestro análisis completo →
            </a>
          </div>
        </div>
      </div>
    );
  })}

  {/* Alternative cards */}
  <div id="quiz-alts-container" style="display:none;">
    <p class="quiz-alts-title">Otras buenas opciones</p>
    {productos.map((p, i) => {
      const stores = buildStores(p);
      return (
        <div class="quiz-alt-card" data-product-id={p.id} style="display:none;">
          {p.imagen && (
            <img src={optimizeImg(p.imagen)} alt={p.nombre} width="80" height="80" class="quiz-alt-img" loading="lazy" decoding="async" />
          )}
          <div class="quiz-alt-info">
            <p class="quiz-alt-name">{p.nombre}</p>
            <p class="quiz-alt-desc">{p.descripcionCorta}</p>
            <p class="quiz-alt-price">{p.precio}</p>
            <div class="quiz-alt-stores">
              {stores.map(s => (
                <a href={s.href} class={`affiliate-button ${s.clase}`} target="_blank" rel="nofollow noopener noreferrer sponsored" style="font-size:0.8rem;padding:0.45rem 0.85rem;">
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

  {/* Informative article suggestions */}
  <div id="quiz-articles-container" style="display:none;">
    <p class="quiz-alts-title">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px;" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
      También te puede interesar
    </p>
    {articulos.map(a => (
      <a href={`/cuidados/${a.slug}/`} class="quiz-article-suggestion" data-article-slug={a.slug} data-article-animal={a.animal} data-article-tags={JSON.stringify(a.tags)} style="display:none;">
        <span class="quiz-article-title">{a.titulo}</span>
        <span class="quiz-article-desc">{a.descripcion}</span>
      </a>
    ))}
  </div>

  {/* Actions */}
  <div class="quiz-actions">
    <button type="button" class="quiz-restart-btn" id="quiz-restart">↻ Buscar otro producto</button>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuizResult.astro
git commit -m "feat: update QuizResult with article suggestions and dynamic product display"
```

---

### Task 11: Create QuizHomeBanner component

**Files:**
- Create: `src/components/QuizHomeBanner.astro`

- [ ] **Step 1: Create the component**

Create `src/components/QuizHomeBanner.astro`:

```astro
---
interface Props {
  totalProducts: number;
  totalCategories: number;
}

const { totalProducts, totalCategories } = Astro.props;
---

<section class="quiz-home-banner">
  <div class="container">
    <div class="quiz-home-inner">
      <div class="quiz-home-icon" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></svg>
      </div>
      <h2>¿No sabes qué producto elegir para tu mascota?</h2>
      <p>Responde unas preguntas y te recomendamos el ideal. Comparamos precios en Amazon, Zooplus y Tiendanimal.</p>
      <a href="/elegir/" class="quiz-start-btn">
        Te ayudamos a elegir
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
      <p class="quiz-home-meta">{totalCategories} categorías · {totalProducts} productos comparados</p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuizHomeBanner.astro
git commit -m "feat: add QuizHomeBanner for homepage CTA section"
```

---

### Task 12: Update QuizCTA with new URL

**Files:**
- Modify: `src/components/QuizCTA.astro`

- [ ] **Step 1: Update QuizCTA**

Replace the `href` in `src/components/QuizCTA.astro` from `/selector/${slug}/` to `/elegir/`:

```astro
---
interface Props {
  titulo?: string;
  descripcion?: string;
}

const {
  titulo = '¿No sabes cuál elegir?',
  descripcion = 'Te ayudamos a encontrar el producto ideal en menos de un minuto.',
} = Astro.props;
---

<a href="/elegir/" class="quiz-cta">
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

Note: removed `slug` prop — no longer needed since there's only one universal page.

- [ ] **Step 2: Commit**

```bash
git add src/components/QuizCTA.astro
git commit -m "feat: update QuizCTA to point to /elegir/"
```

---

### Task 13: Create main page /elegir/ with JS engine

**Files:**
- Create: `src/pages/elegir/index.astro`

This is the most complex file. It loads all products and quiz config at build time, renders all components, embeds the data as JSON, and includes the JS engine that handles the entire interactive flow.

- [ ] **Step 1: Create the page directory**

```bash
mkdir -p src/pages/elegir
```

- [ ] **Step 2: Create the page**

Create `src/pages/elegir/index.astro`. This file:

1. Loads quiz-config.yaml and all product collections at build time
2. Counts products per category/subcategory to show in UI
3. Loads informative articles for suggestions
4. Renders QuizCategoryPicker, QuizQuestion, QuizResult
5. Embeds product data + quiz config as JSON for client JS
6. Includes Schema.org (WebApplication, BreadcrumbList)
7. Contains the inline JS engine (~250 lines)

The JS engine manages:
- Navigation between steps (categoria → subcategoria → animal → preguntas → resultado)
- Dynamic question loading based on selected subcategory + animal
- Two-phase recommendation (filter + score)
- Informative article matching
- URL hash for shareable results
- Back navigation, restart, keyboard accessibility

```astro
---
import Base from '@/layouts/Base.astro';
import QuizCategoryPicker from '@/components/QuizCategoryPicker.astro';
import QuizQuestion from '@/components/QuizQuestion.astro';
import QuizResult from '@/components/QuizResult.astro';
import { getCollection } from 'astro:content';
import quizConfig from '@/data/quiz-config.yaml';

// Load all products from all category files
const productCollections = await getCollection('productos');
const allProducts = productCollections.flatMap(c => c.data);

// Load informative articles for suggestions
const allArticles = await getCollection('articulos');
const informativeArticles = allArticles
  .filter(a => a.data.tipo === 'informativo')
  .map(a => ({
    slug: a.slug,
    titulo: a.data.titulo,
    descripcion: a.data.descripcion,
    animal: a.data.animal,
    tags: a.data.tags,
  }));

// Count products per category and subcategory
const countByCategoria: Record<string, number> = {};
const countBySubcategoria: Record<string, Record<string, number>> = {};
const animalsBySubcategoria: Record<string, Set<string>> = {};

for (const p of allProducts) {
  countByCategoria[p.categoria] = (countByCategoria[p.categoria] || 0) + 1;
  if (!countBySubcategoria[p.categoria]) countBySubcategoria[p.categoria] = {};
  countBySubcategoria[p.categoria][p.subcategoria] = (countBySubcategoria[p.categoria][p.subcategoria] || 0) + 1;
  const key = `${p.categoria}/${p.subcategoria}`;
  if (!animalsBySubcategoria[key]) animalsBySubcategoria[key] = new Set();
  animalsBySubcategoria[key].add(p.animal);
  if (p.animal === 'ambos') {
    animalsBySubcategoria[key].add('perro');
    animalsBySubcategoria[key].add('gato');
  }
}

// Build category data for QuizCategoryPicker
const categoriasForPicker = quizConfig.categorias
  .filter(cat => countByCategoria[cat.id] > 0)
  .map(cat => ({
    ...cat,
    totalProducts: countByCategoria[cat.id] || 0,
    subcategorias: cat.subcategorias
      .filter(sub => (countBySubcategoria[cat.id]?.[sub.id] || 0) > 0)
      .map(sub => ({
        ...sub,
        count: countBySubcategoria[cat.id]?.[sub.id] || 0,
      })),
  }));

// Build product data for JS engine (minimal: id, filtros, afinidad, categoria, subcategoria, animal)
const productsForEngine = allProducts.map(p => ({
  id: p.id,
  categoria: p.categoria,
  subcategoria: p.subcategoria,
  animal: p.animal,
  filtros: p.filtros,
  afinidad: p.afinidad,
}));

// Build subcategory → questions mapping for JS
const subcatQuestions: Record<string, { perro: string[]; gato: string[] }> = {};
for (const cat of quizConfig.categorias) {
  for (const sub of cat.subcategorias) {
    const key = `${cat.id}/${sub.id}`;
    subcatQuestions[key] = {
      perro: sub.preguntas,
      gato: sub.preguntasGato || sub.preguntas,
    };
  }
}

// Animals per subcategory for JS (to skip animal step when only one)
const animalsPerSubcat: Record<string, string[]> = {};
for (const [key, set] of Object.entries(animalsBySubcategoria)) {
  animalsPerSubcat[key] = [...set].filter(a => a !== 'ambos');
}

const siteUrl = 'https://patasyhogar.com';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Te ayudamos a elegir', item: `${siteUrl}/elegir/` },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Te ayudamos a elegir - Patas y Hogar',
  description: 'Responde unas preguntas sobre tu mascota y te recomendamos el producto ideal.',
  url: `${siteUrl}/elegir/`,
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'All',
  inLanguage: 'es',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};
---

<Base
  title="Te ayudamos a elegir | Patas y Hogar"
  description="Responde unas preguntas sobre tu mascota y te recomendamos el producto ideal. Comparamos precios en Amazon, Zooplus y Tiendanimal."
>
  <script is:inline type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} slot="head" />
  <script is:inline type="application/ld+json" set:html={JSON.stringify(webAppSchema)} slot="head" />

  <div class="quiz-container">
    <nav class="breadcrumb" aria-label="Migas de pan">
      <a href="/">Inicio</a>
      <span class="breadcrumb-sep" aria-hidden="true">›</span>
      <span>Te ayudamos a elegir</span>
    </nav>

    <div class="quiz-tool-badge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></svg>
      Herramienta interactiva
    </div>

    {/* Category + Subcategory + Animal steps */}
    <QuizCategoryPicker categorias={categoriasForPicker} />

    {/* Dynamic questions (all rendered, JS shows/hides) */}
    <div id="quiz-questions-area">
      <div class="quiz-progress" id="quiz-progress" style="display:none;" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={5}>
        <div class="quiz-progress-fill" id="quiz-progress-fill" style="width:0%"></div>
      </div>
      <QuizQuestion preguntas={quizConfig.preguntas} />
    </div>

    {/* Results */}
    <QuizResult productos={allProducts} articulos={informativeArticles} />
  </div>

  {/* Data for JS engine */}
  <script type="application/json" id="quiz-engine-data" set:html={JSON.stringify({
    products: productsForEngine,
    subcatQuestions,
    animalsPerSubcat,
    articuloTagMap: quizConfig.articuloTagMap || {},
  })} />

  {/* JS Engine */}
  <script is:inline>
  (function() {
    var data = JSON.parse(document.getElementById('quiz-engine-data').textContent);
    var products = data.products;
    var subcatQuestions = data.subcatQuestions;
    var animalsPerSubcat = data.animalsPerSubcat;
    var articuloTagMap = data.articuloTagMap;

    // State
    var state = { categoria: null, subcategoria: null, animal: null, questionIds: [], currentQ: 0, answers: {} };

    // DOM refs
    var stepCategoria = document.getElementById('quiz-step-categoria');
    var stepAnimal = document.getElementById('quiz-step-animal');
    var progressEl = document.getElementById('quiz-progress');
    var progressFill = document.getElementById('quiz-progress-fill');
    var resultEl = document.getElementById('quiz-result');
    var summaryEl = document.getElementById('quiz-result-summary');
    var restartBtn = document.getElementById('quiz-restart');
    var sharedNotice = document.getElementById('quiz-shared-notice');
    var sharedRedo = document.getElementById('quiz-shared-redo');
    var altsContainer = document.getElementById('quiz-alts-container');
    var articlesContainer = document.getElementById('quiz-articles-container');
    var allSteps = document.querySelectorAll('.quiz-step');
    var allQuestionSteps = document.querySelectorAll('[data-step="pregunta"]');
    var subcatSteps = document.querySelectorAll('[data-step="subcategoria"]');

    function hideAllSteps() {
      allSteps.forEach(function(s) { s.classList.remove('quiz-step--active'); s.style.display = 'none'; });
      progressEl.style.display = 'none';
      resultEl.classList.remove('quiz-result--visible');
    }

    function showStep(el) {
      hideAllSteps();
      if (el) { el.style.display = ''; el.classList.add('quiz-step--active'); }
    }

    // Step 1: Category
    function showCategoria() {
      showStep(stepCategoria);
    }

    stepCategoria.querySelectorAll('.quiz-category-card').forEach(function(card) {
      card.addEventListener('click', function() {
        state.categoria = card.dataset.categoria;
        showSubcategoria();
      });
    });

    // Step 2: Subcategory
    function showSubcategoria() {
      var target = document.querySelector('[data-step="subcategoria"][data-for-categoria="' + state.categoria + '"]');
      showStep(target);
    }

    subcatSteps.forEach(function(step) {
      step.querySelectorAll('.quiz-option').forEach(function(opt) {
        opt.addEventListener('click', function() {
          state.subcategoria = opt.dataset.subcategoria;
          var soloAnimal = opt.dataset.soloAnimal;
          if (soloAnimal) {
            state.animal = soloAnimal;
            startQuestions();
          } else {
            checkAnimalStep();
          }
        });
      });
    });

    // Step 3: Animal (conditional)
    function checkAnimalStep() {
      var key = state.categoria + '/' + state.subcategoria;
      var animals = animalsPerSubcat[key] || [];
      if (animals.length <= 1) {
        state.animal = animals[0] || 'perro';
        startQuestions();
      } else {
        showStep(stepAnimal);
      }
    }

    stepAnimal.querySelectorAll('[data-animal]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.animal = btn.dataset.animal;
        setTimeout(function() { startQuestions(); }, 200);
      });
    });

    // Steps 4-N: Questions
    function startQuestions() {
      var key = state.categoria + '/' + state.subcategoria;
      var qMap = subcatQuestions[key];
      state.questionIds = qMap ? (state.animal === 'gato' ? qMap.gato : qMap.perro) : [];
      state.currentQ = 0;
      state.answers = {};

      // Swap text/options for gato if needed
      if (state.animal === 'gato') {
        allQuestionSteps.forEach(function(step) {
          var heading = step.querySelector('.quiz-question-text');
          if (heading && heading.dataset.textoGato) heading.textContent = heading.dataset.textoGato;
          var perroOpts = step.querySelector('[data-variant="perro"]');
          var gatoOpts = step.querySelector('[data-variant="gato"]');
          if (gatoOpts) {
            if (perroOpts) perroOpts.style.display = 'none';
            gatoOpts.style.display = '';
          }
        });
      } else {
        allQuestionSteps.forEach(function(step) {
          var heading = step.querySelector('.quiz-question-text');
          if (heading && heading.dataset.textoPerro) heading.textContent = heading.dataset.textoPerro;
          var perroOpts = step.querySelector('[data-variant="perro"]');
          var gatoOpts = step.querySelector('[data-variant="gato"]');
          if (perroOpts) perroOpts.style.display = '';
          if (gatoOpts) gatoOpts.style.display = 'none';
        });
      }

      showQuestion(0);
    }

    function showQuestion(idx) {
      state.currentQ = idx;
      if (idx >= state.questionIds.length) { showResult(); return; }
      var qId = state.questionIds[idx];
      var step = document.querySelector('[data-question-id="' + qId + '"]');
      showStep(step);
      progressEl.style.display = '';
      var pct = ((idx + 1) / state.questionIds.length * 100).toFixed(0);
      progressFill.style.width = pct + '%';
      progressEl.setAttribute('aria-valuenow', idx + 1);
      progressEl.setAttribute('aria-valuemax', state.questionIds.length);
    }

    // Option click handlers for question steps
    allQuestionSteps.forEach(function(step) {
      step.querySelectorAll('.quiz-option').forEach(function(opt) {
        opt.addEventListener('click', function() {
          var qId = step.dataset.questionId;
          // Store answer
          var filtro = opt.dataset.filtro;
          var valor = opt.dataset.valor;
          var tags = JSON.parse(opt.dataset.tags || '{}');
          state.answers[qId] = { filtro: filtro, valor: valor, tags: tags, text: opt.textContent.trim() };

          // Visual feedback
          var parent = opt.closest('.quiz-options');
          parent.querySelectorAll('.quiz-option').forEach(function(o) {
            o.classList.remove('quiz-option--selected');
            o.setAttribute('aria-checked', 'false');
          });
          opt.classList.add('quiz-option--selected');
          opt.setAttribute('aria-checked', 'true');

          // Auto-advance
          setTimeout(function() { showQuestion(state.currentQ + 1); }, 300);
        });
      });
    });

    // Back buttons
    document.querySelectorAll('[data-action="back"]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var step = btn.closest('.quiz-step');
        var stepType = step.dataset.step;
        if (stepType === 'subcategoria') { showCategoria(); }
        else if (stepType === 'animal') { showSubcategoria(); }
        else if (stepType === 'pregunta') {
          if (state.currentQ > 0) showQuestion(state.currentQ - 1);
          else {
            var key = state.categoria + '/' + state.subcategoria;
            var animals = animalsPerSubcat[key] || [];
            if (animals.length > 1) { showStep(stepAnimal); }
            else { showSubcategoria(); }
          }
        }
      });
    });

    // Result
    function showResult() {
      // Collect filters and tags from answers
      var hardFilters = {};
      var softTags = {};
      for (var qId in state.answers) {
        var a = state.answers[qId];
        if (a.filtro && a.valor) hardFilters[a.filtro] = a.valor;
        for (var t in a.tags) softTags[t] = a.tags[t];
      }

      // Phase 1: Filter by categoria + subcategoria + animal + hard filters
      var candidates = products.filter(function(p) {
        if (p.categoria !== state.categoria) return false;
        if (p.subcategoria !== state.subcategoria) return false;
        if (p.animal !== state.animal && p.animal !== 'ambos') return false;
        for (var fk in hardFilters) {
          if (p.filtros[fk] && p.filtros[fk].indexOf(hardFilters[fk]) === -1) return false;
        }
        return true;
      });

      // Fallback: relax hard filters if 0 candidates
      if (candidates.length === 0) {
        candidates = products.filter(function(p) {
          return p.categoria === state.categoria && p.subcategoria === state.subcategoria &&
            (p.animal === state.animal || p.animal === 'ambos');
        });
      }
      if (candidates.length === 0) {
        candidates = products.filter(function(p) {
          return p.categoria === state.categoria && (p.animal === state.animal || p.animal === 'ambos');
        });
      }

      // Phase 2: Score
      candidates.forEach(function(p) {
        var score = 0;
        for (var tag in softTags) {
          score += (softTags[tag] || 0) * (p.afinidad[tag] || 0);
        }
        p._score = score;
      });
      candidates.sort(function(a, b) { return b._score !== a._score ? b._score - a._score : 0; });

      // Build summary
      var parts = [];
      for (var i = 0; i < state.questionIds.length; i++) {
        var ans = state.answers[state.questionIds[i]];
        if (ans) parts.push(ans.text.toLowerCase());
      }
      var animalText = state.animal === 'perro' ? 'perro' : 'gato';
      summaryEl.innerHTML = parts.length > 0
        ? 'Para tu <strong>' + animalText + '</strong>, ' + parts.join(', ') + ':'
        : '';

      // Show main recommendation
      hideAllSteps();
      var mainCards = resultEl.querySelectorAll('.quiz-rec-main');
      mainCards.forEach(function(c) { c.style.display = 'none'; });
      if (candidates.length > 0) {
        var mainCard = resultEl.querySelector('.quiz-rec-main[data-product-id="' + candidates[0].id + '"]');
        if (mainCard) mainCard.style.display = '';
      }

      // Show alternatives
      var altCards = resultEl.querySelectorAll('.quiz-alt-card');
      altCards.forEach(function(c) { c.style.display = 'none'; });
      var hasAlts = false;
      for (var a = 1; a < Math.min(3, candidates.length); a++) {
        var altCard = resultEl.querySelector('.quiz-alt-card[data-product-id="' + candidates[a].id + '"]');
        if (altCard) { altCard.style.display = ''; hasAlts = true; }
      }
      altsContainer.style.display = hasAlts ? '' : 'none';

      // Show informative articles
      var articleEls = resultEl.querySelectorAll('.quiz-article-suggestion');
      articleEls.forEach(function(el) { el.style.display = 'none'; });
      var shownArticles = 0;
      var allTags = Object.keys(softTags);
      if (allTags.length > 0) {
        var matchTags = [];
        for (var tg in softTags) {
          if (articuloTagMap[tg]) matchTags = matchTags.concat(articuloTagMap[tg]);
        }
        if (matchTags.length > 0) {
          articleEls.forEach(function(el) {
            if (shownArticles >= 2) return;
            var aAnimal = el.dataset.articleAnimal;
            if (aAnimal !== state.animal && aAnimal !== 'ambos') return;
            var aTags = JSON.parse(el.dataset.articleTags || '[]');
            var matched = aTags.some(function(t) {
              return matchTags.some(function(mt) { return t.toLowerCase().indexOf(mt.toLowerCase()) >= 0; });
            });
            if (matched) { el.style.display = ''; shownArticles++; }
          });
        }
      }
      articlesContainer.style.display = shownArticles > 0 ? '' : 'none';

      resultEl.classList.add('quiz-result--visible');
    }

    // Restart
    restartBtn.addEventListener('click', function() {
      state = { categoria: null, subcategoria: null, animal: null, questionIds: [], currentQ: 0, answers: {} };
      // Reset all option selections
      document.querySelectorAll('.quiz-option--selected').forEach(function(o) {
        o.classList.remove('quiz-option--selected');
        o.setAttribute('aria-checked', 'false');
      });
      // Reset question text to perro default
      allQuestionSteps.forEach(function(step) {
        var heading = step.querySelector('.quiz-question-text');
        if (heading && heading.dataset.textoPerro) heading.textContent = heading.dataset.textoPerro;
        var perroOpts = step.querySelector('[data-variant="perro"]');
        var gatoOpts = step.querySelector('[data-variant="gato"]');
        if (perroOpts) perroOpts.style.display = '';
        if (gatoOpts) gatoOpts.style.display = 'none';
      });
      sharedNotice.style.display = 'none';
      history.replaceState(null, '', window.location.pathname);
      showCategoria();
    });

    // Shared redo
    if (sharedRedo) {
      sharedRedo.addEventListener('click', function(e) {
        e.preventDefault();
        restartBtn.click();
      });
    }

    // Init
    showCategoria();
  })();
  </script>
</Base>
```

**Important:** This file imports `quiz-config.yaml` using `import quizConfig from '@/data/quiz-config.yaml'`. Astro supports YAML imports natively with the `@astrojs/yaml` integration or via Vite. If the import doesn't work, add to `astro.config.mjs`:

```javascript
// In vite.config section, if YAML import fails:
// npm install @rollup/plugin-yaml
```

Alternatively, read the YAML file with `fs.readFileSync` and `yaml.parse` at build time if the import doesn't work.

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -10
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/elegir/
git commit -m "feat: add universal recommender page with JS engine"
```

---

### Task 14: Update navigation and homepage

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Update Header — pill-style link**

In `src/components/Header.astro`, replace the existing "Selector" nav-link with a pill-styled one:

```html
<!-- Desktop nav: replace the Selector link -->
<a class="nav-link nav-link--tool" href="/elegir/" aria-current={isActive('/elegir/') ? 'page' : undefined}>Te ayudamos a elegir</a>
```

```html
<!-- Mobile menu: replace the Selector link -->
<a class="mobile-link mobile-link--tool" href="/elegir/">Te ayudamos a elegir</a>
```

- [ ] **Step 2: Update Footer**

In `src/components/Footer.astro`, replace `/selector/` link text and href:

```html
<li><a href="/elegir/">Te ayudamos a elegir</a></li>
```

- [ ] **Step 3: Add QuizHomeBanner to homepage**

In `src/pages/index.astro`, add the import at the top:

```typescript
import QuizHomeBanner from '@/components/QuizHomeBanner.astro';
```

Also add after the existing imports, to count products:

```typescript
const productCollections = await getCollection('productos');
const totalProducts = productCollections.reduce((sum, c) => sum + c.data.length, 0);
```

Then insert the banner section between "Últimas comparativas" (section 4) and "Guías de cuidados" (section 5):

```astro
  {/* 4.5 Quiz CTA Banner */}
  {totalProducts > 0 && (
    <QuizHomeBanner totalProducts={totalProducts} totalCategories={5} />
  )}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: update navigation and homepage with recommender links"
```

---

### Task 15: Expand CSS styles

**Files:**
- Modify: `src/styles/global.css`

Add styles for new v2 elements. Append to the existing quiz section in global.css.

- [ ] **Step 1: Add new styles**

Add after the existing quiz styles in `src/styles/global.css`:

```css
/* Nav pill for tool link */
.nav-link--tool {
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  padding: 0.4rem 0.85rem !important;
  border-radius: var(--radius-pill);
  font-weight: 700 !important;
  transition: background var(--transition);
}

.nav-link--tool:hover {
  background: color-mix(in srgb, var(--color-primary) 20%, transparent);
}

.mobile-link--tool {
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
  border-radius: var(--radius-md);
  font-weight: 700;
}

/* Tool badge */
.quiz-tool-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-pill);
  margin-bottom: 1.5rem;
}

/* Category grid */
.quiz-category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;
}

.quiz-category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  background: var(--color-bg-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  text-align: center;
  font-family: var(--font-sans);
  transition: border-color var(--transition), background var(--transition), transform var(--duration-fast) var(--ease-out);
}

.quiz-category-card:hover {
  border-color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 5%, var(--color-bg-card));
  transform: translateY(-2px);
}

.quiz-category-card:active {
  transform: scale(0.97);
}

.quiz-category-icon {
  color: var(--color-primary);
}

.quiz-category-name {
  font-size: 0.95rem;
  font-weight: 700;
}

.quiz-category-desc {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  line-height: 1.4;
}

.quiz-category-count {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-text-light);
  background: var(--color-bg-muted);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-pill);
}

/* Option with description */
.quiz-option--with-desc {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
}

.quiz-option--with-desc::before {
  display: none;
}

.quiz-option-main {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.quiz-option-desc {
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--color-text-muted);
}

.quiz-option-count {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-text-light);
  background: var(--color-bg-muted);
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-pill);
  margin-left: auto;
  align-self: center;
}

/* Animal selection */
.quiz-options--animal {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.quiz-option--animal {
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  text-align: center;
  font-size: 1.05rem;
}

.quiz-option--animal::before {
  display: none;
}

.quiz-option-animal-icon {
  color: var(--color-primary);
}

/* Article suggestion */
.quiz-article-suggestion {
  display: block;
  padding: 0.875rem 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-text);
  transition: border-color var(--transition), background var(--transition);
}

.quiz-article-suggestion:hover {
  border-color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 3%, transparent);
  color: var(--color-text);
}

.quiz-article-title {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.quiz-article-desc {
  display: block;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.4;
}

/* Homepage banner */
.quiz-home-banner {
  background: color-mix(in srgb, var(--color-primary) 5%, var(--color-bg));
  border-top: 1px solid color-mix(in srgb, var(--color-primary) 15%, var(--color-border));
  border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 15%, var(--color-border));
  padding: 3rem 0;
  margin: 2rem 0;
}

.quiz-home-inner {
  text-align: center;
  max-width: 560px;
  margin: 0 auto;
}

.quiz-home-icon {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.quiz-home-banner h2 {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.quiz-home-banner p {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.quiz-home-meta {
  font-size: 0.8rem;
  color: var(--color-text-light);
  margin-top: 0.75rem;
}

@media (max-width: 540px) {
  .quiz-category-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .quiz-options--animal {
    grid-template-columns: 1fr 1fr;
  }

  .quiz-home-banner h2 {
    font-size: 1.25rem;
  }
}

@media (max-width: 360px) {
  .quiz-category-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add v2 quiz styles — category grid, nav pill, homepage banner"
```

---

### Task 16: Update CLAUDE.md and build verification

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add product registry rule to CLAUDE.md**

In the "Checklist obligatorio para articulos" section, add a new item after "8. Rebuild tras cambios":

```markdown
### 9. Registro de productos (recomendador)
- Al crear o modificar un articulo comparativo, anadir los productos al registro en `src/content/productos/[categoria].yaml`
- Cada producto necesita: id, nombre, marca, imagen, precios, enlaces, categoria, subcategoria, animal, articuloSlug, descripcionCorta, filtros, afinidad
- Verificar que la subcategoria coincide con una existente en `src/data/quiz-config.yaml`
- Si la subcategoria no existe, anadirla al quiz-config con sus preguntas
```

- [ ] **Step 2: Full build and verification**

```bash
npm run build
```

- [ ] **Step 3: Preview and test**

```bash
npm run preview
```

Test in browser:
1. `/elegir/` — category grid shows 5 categories with product counts
2. Select "Alimentación" → subcategories appear (Pienso, Comida húmeda, etc.)
3. Select "Pienso seco" → animal selection (Perro/Gato)
4. Select "Perro" → size question appears
5. Answer all questions → recommendation with affiliate links
6. "Buscar otro producto" resets to category grid
7. Test back navigation at every step
8. Test with gato path — different questions should appear
9. Homepage banner visible between comparativas and guides
10. Header has pill-style "Te ayudamos a elegir" link
11. Dark mode works correctly
12. Mobile responsive layout

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: update CLAUDE.md with product registry checklist, final build"
```
