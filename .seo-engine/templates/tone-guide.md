# Guía de Tono y Estilo — Patas y Hogar

## Principios generales

1. **Profesional pero cercano.** Escribe como un amigo que sabe mucho de mascotas, no como una enciclopedia.
2. **Específico, nunca genérico.** "Este pienso tiene un 35% de pollo deshidratado" > "Este pienso tiene buenos ingredientes".
3. **Honesto con los inconvenientes.** Si un producto tiene fallos, dilo. La credibilidad se gana con honestidad.
4. **Empático con el dueño.** Entendemos que elegir productos para tu mascota puede ser abrumador.
5. **Sin relleno.** Cada frase debe aportar información útil. Si no aporta, se elimina.

## Voz por tipo de artículo

| Tipo | Voz | Ejemplo |
|------|-----|---------|
| Comparativa | Analítico, experto, basado en datos | "Tras analizar 8 arneses, el Julius-K9 destaca por..." |
| Tutorial | Profesor paciente, primera persona | "Yo empecé bañando a mi gato con guantes y..." |
| Cómo hacer | Resolutivo, directo | "Si tu perro tira de la correa, lo primero es..." |
| Review | Reviewer honesto, admite fallos | "El punto débil de este comedero es que..." |
| Guía experto | Opinión fundamentada, toma posición | "Después de 3 años probando piensos, creo que..." |

## Reglas de estilo

### Lenguaje
- Español de España (no latinoamericano)
- Tuteo (tú, no usted)
- Evitar anglicismos innecesarios (pero "GPS", "ranking" son OK)
- Sin emojis en el texto del artículo (solo en títulos de sección si encaja)

### Estructura
- Párrafos cortos (3-4 frases máximo)
- Listas con viñetas para características
- Tablas para comparaciones numéricas
- Negritas para datos clave (precios, medidas, nombres de producto)
- H2 para secciones principales, H3 para subsecciones

### SEO
- Keyword principal en: título, primer párrafo, un H2, descripción, slug
- Keywords secundarias de forma natural
- Internal links con anchor text variado y contextual
- No keyword stuffing — si suena forzado, reescribe

## E-E-A-T obligatorio

**Cada artículo DEBE incluir al menos uno de estos:**

1. **Experiencia personal** — "Tras probar este arnés durante 3 meses con un labrador de 30 kg..."
2. **Dato verificable** — "Según un estudio de la Universidad de Helsinki (2024)..."
3. **Métrica del sitio** — "En nuestras comparativas de más de 100 productos..."
4. **Cita de veterinario** — "Los veterinarios recomiendan X para perros con tendencia a..."

Si config.yaml no tiene trust signals suficientes, pedir al usuario antes de publicar.

## Menciones de competidores

- **Siempre respetuoso** — empezar por sus fortalezas
- **Nunca difamar** — "no recomendamos X" está bien, "X es basura" no
- **Datos verificables** — si mencionas precios o características de competidores, deben ser reales
- **Enlazar a su web** cuando sea útil para el lector (nofollow)

## CTAs y afiliación

- **CTA suave, máximo 1 por sección** — nunca agresivo
- **Transparencia** — disclaimer de afiliados al inicio de comparativas (ya incluido en layout)
- **No presionar** — "Si te interesa, puedes verlo en Amazon" > "¡CÓMPRALO YA!"
- **Multi-tienda** — ofrecer Amazon, Zooplus y Tiendanimal cuando estén disponibles

## Humanización (anti-detección IA)

**OBLIGATORIO: Leer `templates/humanization-guide.md` antes de escribir o revisar cualquier artículo.**

Resumen de reglas clave:
- **Variar intros** — nunca repetir el mismo patrón en artículos consecutivos
- **Experiencia personal** — mínimo 2-3 inserciones por artículo
- **Asimetría en listas** — no todos los productos con el mismo número de pros/contras
- **Romper la estructura** — no seguir siempre el mismo esquema de secciones
- **Honestidad** — si no has probado algo, dilo abiertamente
- **Autoría real** — nombre real, no marca

## Lo que NUNCA hacer

- Inventar datos, precios, ASINs o URLs de productos
- Escribir frases vacías ("en el mercado actual hay muchas opciones...")
- Copiar descripciones de Amazon textualmente
- Poner keyword principal más de 3-4 veces en un artículo corto
- Escribir artículos sin ángulo único — "más completo" NO es un ángulo
- Usar "sin duda", "sin lugar a dudas", "el mejor del mercado" sin justificación
- Empezar artículos con "[Tema] es uno de los aspectos más..." o variantes formulaicas
- Escribir todos los pros/contras con el mismo número de puntos (simetría perfecta = marcador IA)
- Publicar artículos sin ninguna frase de experiencia personal o declaración honesta
