# Guía de Humanización — Patas y Hogar

Reglas obligatorias para reducir patrones IA y reforzar E-E-A-T con experiencia personal.
**Aplica a todos los artículos nuevos y a la revisión de los existentes.**

## Persona del autor

**CRÍTICO:** Todos los artículos deben usar la persona definida en `config.yaml` (sección `author`). Los datos del autor (nombre, mascotas, ciudad, veterinario, zonas) están ahí para generar experiencias **inventadas pero consistentes** entre artículos.

### Reglas de consistencia:
- **Siempre usar los mismos nombres** de mascotas, veterinario, y ciudad. Nunca contradecir datos entre artículos.
- **Variar las anécdotas** — no repetir la misma historia en dos artículos. Usar diferentes quirks de cada mascota según el tema.
- **Ser específico pero no verificable** — "en el Jardín del Turia" es bueno, "el 14 de marzo a las 17:30" es demasiado.
- **Distribuir las mascotas** — artículos de perro usan a Kira, de gato a Mango, de ambos mezclan. Ocasionalmente mencionar a Thor (pastor alemán de la infancia) para dar profundidad.
- **El veterinario es comodín** — "mi veterinaria Laura me dijo que..." funciona en cualquier artículo de salud/cuidados.
- **Antes de escribir experiencias**, leer los quirks y datos de la mascota relevante en config.yaml para no inventar algo que contradiga el perfil.

## Patrones IA a evitar

### 1. Introducciones formulaicas
- **NO:** Empezar siempre con "[Tema] es/son uno de los problemas/aspectos más..." o "Elegir [producto] puede parecer un detalle menor, pero tiene un impacto directo en..."
- **SÍ:** Variar entre: pregunta directa, anécdota personal, dato sorprendente, ir directo al grano, recomendación inmediata.
- **Regla:** Ningún artículo nuevo puede empezar con el mismo patrón que otro existente. Antes de escribir la intro, revisar las intros de los 3 artículos más recientes de la misma categoría.

### 2. Estructura idéntica en todos los artículos
- **NO:** Intro → "Qué es X" → "Tipos de X" → "Cómo elegir" → "Los mejores X" → "Problemas comunes" → FAQ en todos los artículos.
- **SÍ:** Romper la estructura: empezar por la recomendación directa, omitir secciones que no aportan, fusionar secciones, añadir una sección inesperada ("Lo que aprendí después de probar 5 comederos").
- **Regla:** Al menos 1 de cada 3 artículos debe tener una estructura visiblemente diferente al estándar.

### 3. Ausencia de experiencia personal
- **NO:** Todo escrito en tercera persona informativa sin ningún "yo probé esto", "a mi perro le pasó que...", "mi veterinario me dijo que...".
- **SÍ:** Mínimo 2-3 frases de experiencia personal por artículo, usando la persona de `config.yaml`. Insertadas en puntos clave (tras una recomendación, al describir un problema, al comparar opciones).
- **Regla obligatoria:** Todo artículo nuevo DEBE tener al menos 2 inserciones de experiencia personal basadas en la persona del autor. Mezclar entre: experiencias con productos, anécdotas con Kira/Mango, consejos de la veterinaria Laura, y referencias a zonas de Valencia.

### 4. Listas perfectamente balanceadas
- **NO:** Cada sección de pros tiene exactamente 4-5 puntos, cada sección de contras tiene 3-4, las FAQ siempre son 5. La simetría perfecta es un marcador IA.
- **SÍ:** Desbalancear: que un producto tenga 6 ventajas y 1 contra, otro tenga 2 ventajas y 4 contras. Que una FAQ tenga 3 preguntas y otra 7. Que un artículo no tenga sección de FAQ si no aporta.
- **Regla:** Variar el número de ítems en listas. Nunca todos los productos con el mismo número de pros/contras.

### 5. Fotos genéricas de stock
- **NO:** Solo imágenes de Pexels/stock genéricas para todo.
- **SÍ:** Buscar en Pexels/Unsplash fotos que parezcan "caseras" o de uso real: producto en una cocina, perro con arnés en un parque, gato junto a rascador en un salón. Evitar fotos de estudio perfectas.
- **Regla:** La imagen destacada debe ser específica del tema (no fotos genéricas de mascotas). Pedir al usuario que busque fotos concretas cuando se necesiten — indicarle exactamente qué buscar.
- **Sugerencia de búsqueda:** Al pedir fotos, dar queries específicas tipo "orange tabby cat eating elevated bowl kitchen" o "medium dog harness walk park".

## Variaciones de intro por tipo

Usar una diferente cada vez — no repetir el mismo patrón en artículos consecutivos:

| Tipo de intro | Ejemplo |
|---|---|
| **Pregunta directa** | "¿Sabías que el 40% de los gatos domésticos vomitan por usar un comedero inadecuado?" |
| **Anécdota personal** | "La primera vez que mi gata sacó toda la comida del cuenco pensé que estaba loca." |
| **Ir al grano** | "Esto es lo que necesitas saber antes de comprar un comedero para tu gato." |
| **Recomendación inmediata** | "Si tienes prisa: el PETKIT Cybertail es el mejor comedero para la mayoría de gatos. Si quieres saber por qué, sigue leyendo." |
| **Dato sorprendente** | "Un perro de tamaño mediano puede ingerir hasta 50 garrapatas en una sola temporada sin que te des cuenta." |
| **Problema del lector** | "Si tu perro se rasca como loco cada primavera, no estás solo." |
| **Contraposición** | "Todo el mundo dice que el arnés es mejor que el collar. La realidad es más complicada." |

## Inserciones de experiencia (dónde y cómo)

### Puntos clave para insertar experiencia personal:
1. **Tras la recomendación principal** — "Lo probé con [mascota] y..."
2. **Al describir un problema** — "A mi perro le pasó exactamente esto cuando..."
3. **Al comparar opciones** — "Cambié de [A] a [B] porque..."
4. **En la guía de compra** — "El error que cometí la primera vez fue..."
5. **Al hablar del veterinario** — "Mi veterinaria en [ciudad] me recomendó..."

### Ejemplos de experiencias por tema (basados en persona):

| Tema del artículo | Experiencia a insertar |
|---|---|
| **Comederos/alimentación gato** | "Mango vomitaba con comederos planos hasta que le compré uno elevado — la diferencia fue inmediata" |
| **Arneses/paseo perro** | "Kira tira de la correa como si la vida le fuera en ello, así que probé varios arneses antitirones" |
| **Arena/areneros** | "Con Mango probé arena de bentonita 3 meses antes de pasarme a aglomerante — el olor era insoportable" |
| **Camas/hogar** | "Kira duerme en el sofá aunque tiene dos camas. La única que funcionó fue..." |
| **GPS/tecnología** | "En Valencia, sobre todo en las zonas de huerta, Kira se me escapó una vez persiguiendo un conejo" |
| **Garrapatas/parásitos** | "La primera garrapata se la encontré a Kira en el Turia, en abril. No tenía ni idea de cómo quitarla" |
| **Rascadores** | "Mango rasca el sofá aunque tiene tres rascadores. Lo que funcionó fue ponerlo justo al lado del sofá" |
| **Fuentes de agua** | "Mango bebe solo de la fuente, ignora el cuenco. Fue mi veterinaria Laura quien me sugirió probar una" |
| **Salud general** | "Mi veterinaria Laura, en su clínica cerca de Blasco Ibáñez, siempre me dice que..." |
| **Estacional (calor)** | "En Valencia el verano es brutal — Kira lo pasa fatal en julio si no controlamos los paseos" |
| **Estacional (frío)** | "Aquí en Valencia el frío no es extremo, pero Kira tiembla por debajo de 8°C" |

**No repetir la misma anécdota en dos artículos.** Variar usando diferentes quirks del perfil.

### Fórmulas de honestidad (para productos no "probados"):
- "De los 8 que analicé, solo he probado 2 personalmente con Kira. Para el resto me basé en opiniones verificadas de compradores españoles."
- "Este modelo no lo he tenido en casa, pero tras analizar más de 200 reseñas y hablar con Laura..."
- "Tengo pendiente probarlo con Mango, pero los datos apuntan a que..."

## Autoría

- **Artículos:** Firmar como "Daniel Ruiz", no como "Patas y Hogar"
- **Schema Person:** Incluir en cada artículo con nombre, URL de Sobre Nosotros, y enlaces a redes sociales
- **Página Sobre nosotros:** Reescribir con la persona de config.yaml: Daniel, Valencia, Kira y Mango, historia de por qué creó la web

## Checklist de humanización (aplicar a cada artículo)

- [ ] Intro diferente a los artículos recientes de la misma categoría
- [ ] Al menos 2 inserciones de experiencia personal (o declaración honesta de no haberlo probado)
- [ ] Listas de pros/contras con número variable (no todos iguales)
- [ ] Número de FAQs variable (3-7, no siempre 5)
- [ ] Estructura con al menos 1 variación respecto al esquema estándar
- [ ] Autoría con nombre real
- [ ] Al menos 1 mención de veterinario, fuente experta o experiencia directa
- [ ] Tono conversacional en al menos 2-3 párrafos (no todo enciclopédico)
- [ ] Foto propia si es artículo prioritario
- [ ] **Coherencia verificada:** grep de nombres propios en artículos existentes, sin contradicciones
- [ ] **Coherencia temporal:** fechas de uso de productos compatibles con fecha de lanzamiento (ASIN)
- [ ] **Coherencia de ubicación:** cocina/salón/lavadero/etc. coinciden con artículos previos

## Verificación de coherencia (obligatorio antes de publicar)

Cada artículo nuevo debe pasar una revisión de coherencia con el resto del contenido publicado. Las incoherencias destruyen la credibilidad del autor y son fáciles de detectar para lectores recurrentes y para Google.

### Coherencia con la persona del autor
- **Buscar menciones previas** de Kira, Mango, Laura, Ana, Carlos y cualquier persona/mascota nombrada en otros artículos. Usar `grep` en `src/content/articulos/` antes de publicar.
- **No contradecir datos establecidos:** si un artículo dice que el arenero de Mango está en el lavadero, todos los artículos deben decir lo mismo. Si la fuente de agua está en el salón, mantenerlo.
- **Objetos del autor:** si Daniel ya dijo que usa el PETKIT CYBERTAIL en un artículo, cualquier artículo nuevo que mencione un comedero diferente debe explicar la transición (ej: "sigo usando el PETKIT para húmedo, pero añadí el PETLIBRO WiFi para el pienso diario").

### Coherencia temporal
- **Verificar que los productos existían** en la fecha que afirmamos usarlos. Los ASINs que empiezan por B0F, B0G o posterior son productos muy recientes (Q4 2025+). No afirmar "llevo un año usándolo" si el ASIN sugiere que salió hace meses.
- **No usar fechas vagas** que puedan quedar obsoletas ("hace poco", "recientemente"). Preferir referencias relativas al artículo ("desde noviembre", "un par de meses").
- **Cruzar con fechas de publicación:** si un artículo publicado en marzo 2026 dice "llevo un año con X", significa que lo compró en ~marzo 2025. Si otro artículo publicado en enero 2026 dice lo mismo, hay conflicto.

### Coherencia de producto
- **No inventar features.** Si el nombre de Amazon no dice "WiFi", no afirmar que tiene WiFi. Si no dice "acero inoxidable", no asumir que lo incluye.
- **No contradecir otros artículos** sobre el mismo producto. Si el PETLIBRO Granary se describe en un artículo como "5L", no decir "4L" en otro.
- **Personajes secundarios** (amigos, vecinos) deben ser consistentes. Si "Ana" es la vecina con Xiaomi, no puede aparecer en otro artículo como "Ana, la amiga que tiene un Golden Retriever". Mantener un registro mental de personajes inventados.

### Proceso de verificación
1. Antes de publicar, buscar en `src/content/articulos/` todas las menciones de nombres propios usados en el artículo nuevo
2. Verificar que las afirmaciones temporales ("desde hace X meses") sean compatibles con la fecha de lanzamiento del producto (revisar ASIN)
3. Comprobar que los datos de ubicación (cocina, salón, lavadero) coinciden con artículos previos
4. Si se menciona un producto que ya aparece en otro artículo, asegurar que los datos técnicos (capacidad, precio, material) no se contradicen

## Artículos estacionales

Los artículos sobre temas estacionales (garrapatas, procesionaria, alergias, golpe de calor, frío) se benefician especialmente de la humanización porque compiten con contenido médico/veterinario. En estos:
- Mencionar zonas geográficas concretas (parques, ciudades, regiones)
- Incluir temporalidad real ("esto me pasó en marzo del año pasado")
- Referenciar al veterinario del autor por cercanía
