---
name: Quora ES workflow para Patas y Hogar
description: Método validado responder Quora ES firmando como marca editorial, sin exponer identidad real, con link contextual seguro.
type: reference
---

# Quora ES — workflow Patas y Hogar

## Setup cuenta (one-time)

### Datos cuenta
- **Plataforma:** `es.quora.com`
- **Email:** contacto@patasyhogar.com
- **Nombre mostrar:** "Patas y Hogar"
- **Foto perfil:** logo verde patasyhogar (favicon-512.png, mismo que Reddit/Pinterest)
- **Bio:** "Comparativas y guías honestas sobre productos para perros y gatos. patasyhogar.com"
- **Ubicación:** España
- **Credenciales:** "Redacción · Patas y Hogar"
- **Links externos en perfil:** https://patasyhogar.com (dofollow desde Quora user profile)

### Setup espacios (Spaces)
- Seguir 5-10 espacios ES nicho:
  - Mascotas
  - Perros
  - Gatos
  - Adiestramiento canino
  - Veterinaria
  - Alimentación animal
  - Mascotas en España (si existe)

### Verificación
- Email verificado
- Sin teléfono (Quora no obliga ES)
- Notificaciones email semanales

## Patrón respuesta — formato 400-800 palabras

### Estructura

```
[Apertura — anécdota corta o dato concreto (40-80 palabras)]

[Punto 1 — desarrollo práctico con detalle (100-150 palabras)]

[Punto 2 — desarrollo práctico con detalle (100-150 palabras)]

[Punto 3 — desarrollo práctico con detalle (100-150 palabras)]

[Cierre — síntesis + link contextual SOLO si añade (40-80 palabras)]
```

### Reglas

1. **Apertura sin pleasantries.** No "buena pregunta", no "depende de muchos factores". Entrar directo.
2. **3 puntos prácticos máx.** Más = TL;DR.
3. **Datos concretos.** Cantidades, marcas, frecuencias, no abstracto.
4. **Tono experto humilde.** "En la mayoría de casos…", "Suele recomendarse…" mejor que afirmaciones absolutas.
5. **Link contextual al final si aporta:**
   - Solo 1 link por respuesta
   - Anchor text contextual, NO "lee aquí" / "más info aquí"
   - Ejemplo: "Si te interesa profundizar en la elección de pienso para gato esterilizado, [tenemos un análisis comparativo](https://patasyhogar.com/alimentacion/mejor-pienso-gato-esterilizado/) con marcas concretas."
   - Si link no aporta naturalmente → omitir
6. **Humanizer obligatorio** antes de publicar. Tells AI matan Quora.
7. **No firmar al final** ("Daniel" / "Patas y Hogar"). Nombre perfil ya firma.

### Ejemplo respuesta tipo

Pregunta: "¿Qué pienso debe comer un gato esterilizado?"

```
Tras la esterilización, el gasto energético baja entre 25-30% pero el apetito sube — combinación que lleva a sobrepeso si no se ajusta la dieta.

Tres cosas que mirar al elegir pienso:

**Proteína animal alta y carbohidrato bajo.** El gato es carnívoro estricto. Busca primera ingrediente carne nombrada (no "subproductos"), proteína bruta >38% y grasa moderada 12-15%. Marcas con buena ratio: Orijen Fit & Trim, Acana Indoor, Applaws Natural.

**L-carnitina y fibra moderada.** L-carnitina ayuda metabolismo grasas. Fibra ayuda saciedad sin engordar — pulpa de remolacha o psyllium funcionan bien.

**pH urinario controlado.** Gato esterilizado tiende a problemas urinarios. Pienso etiquetado "esterilizado" suele incluir control pH y minerales magnesio/fosfato bajos.

Cuidado con marcas supermercado tipo "Sterilised" — muchas son las mismas que normales con etiqueta cambiada. Mejor revisar análisis composición.

Si quieres comparar varias marcas con datos concretos de análisis y precio por kg, [hicimos un análisis detallado de pienso para gato esterilizado](https://patasyhogar.com/alimentacion/mejor-pienso-gato-esterilizado/).
```

## Cuota y cadencia

- **3 respuestas largas/semana** (lunes, jueves, sábado)
- Cada respuesta = 30-45 min trabajo
- **Espaciar 24h+ entre respuestas** (evitar batch publicación → spam flag)
- **No responder >5/sem** primer mes (cuenta nueva tiene umbrales)

## Cómo encontrar preguntas

1. **Topic feed** (espacios seguidos) — preguntas recientes nicho
2. **Search Quora ES** con keywords mascotas tipo:
   - "pienso gato"
   - "arnés perro mejor"
   - "arenero gato"
   - "comedero automático"
3. **Preguntas alto tráfico** = >5 respuestas ya = tema popular = mejor distribución
4. **Preguntas viejas con vistas** > preguntas nuevas sin engagement

### Búsqueda automática desde agente

Validado el 2026-05-19:

- **Preferente:** Brave Search con operador `site:es.quora.com/` funciona desde `webfetch` y devuelve títulos, URLs y snippets suficientes para elegir pregunta.
- **No usar como primera opción:** Quora search directo (`https://es.quora.com/search?q=...`) devuelve 403/security verification.
- **Fallback limitado:** DuckDuckGo HTML puede funcionar 1-2 consultas, pero después puede pedir captcha. Google/Bing suelen bloquear o pedir challenge.

Formato recomendado:

```text
https://search.brave.com/search?q=site%3Aes.quora.com%2F%20gato%20estresado
```

Ejemplos de queries útiles:

```text
site:es.quora.com/ gato estresado
site:es.quora.com/ perro pulgas
site:es.quora.com/ gato maulla noche
site:es.quora.com/ pienso gato esterilizado
site:es.quora.com/ perro no quiere comer
```

Cómo aplicar:

1. Buscar en Brave con 2-4 variaciones de keyword.
2. Priorizar preguntas con intención clara y encaje con un artículo existente de Patas y Hogar.
3. Abrir el resultado manualmente en Quora si hace falta confirmar si permite respuesta nueva; el agente puede no leer Quora directo por 403.
4. Si Brave devuelve una pregunta con snippet suficiente, preparar respuesta sin depender de leer todo Quora.
5. No responder preguntas donde el snippet sugiera urgencia veterinaria inmediata salvo para recomendar veterinario y sin link promocional.

## Métricas seguimiento

Registrar en `project_backlinks_social_status.md` semanalmente:
- Respuestas publicadas (URL + tema)
- Upvotes recibidos
- Vistas estimadas
- Comentarios respondidos
- Backlinks dofollow desde perfil (siempre activo)

## Riesgos

- **Spam flag** si link drop en cada respuesta sin valor → ratio respuesta:link debe ser 2-3:1 mínimo (algunas sin link)
- **Cuenta nueva limitada** primer mes — no forzar volumen
- **Shadowban silencioso** si patrón promocional detectado — verificar respuestas en incógnito ocasionalmente
- **Tradución/duplicación** desde respuestas en EN no funciona bien — escribir nativo ES
