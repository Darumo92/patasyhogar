━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 SEO ENGINE — GUÍA DE USO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Escribe estos comandos en Claude Code. O simplemente describe lo que quieres de forma natural.

─── ESCRITURA ─────────────────────────────────

"Escribe el siguiente blog"
   → Elige el de mayor prioridad, investiga SERP, redacta, guarda como human-review.

"Escribe un blog sobre [tema]"
   → Comprueba canibalización primero, luego escribe.

"Escribe una comparación: [Producto X] vs [Producto Y]"
   → Usa datos de competitors.yaml.

"Escribe la página pilar de [cluster]"
   → Página pilar comprehensiva para un cluster temático.

"Aprueba el blog [slug]"
   → Marca como publicado tras tu revisión.

"El blog [slug] necesita cambios: [feedback]"
   → Revisa y mantiene en review.

─── INVESTIGACIÓN SERP ────────────────────────

Antes de cada blog, Claude Code necesita datos SERP reales de Google.
NO usará su propia búsqueda web — da resultados genéricos.

SI hay herramienta SEO MCP conectada (Semrush, Ahrefs) → la usa.

EN CASO CONTRARIO → Claude Code te pide que busques en Google y proporciones:
   1. Top 3-5 páginas posicionadas (título + URL)
   2. Preguntas de "Otras preguntas de los usuarios"
   3. Búsquedas relacionadas del pie de Google
   4. Keywords relacionadas de tus herramientas SEO (opcional)

Esto asegura que los blogs se escriben contra competencia real, no suposiciones.

─── NUEVOS ARTÍCULOS Y FEATURES ───────────────

"Escanea nuevos docs en [ruta]"
"Nuevo feature: [nombre] en [ruta doc]"

─── COMPETIDORES ───────────────────────────────

"Actualiza competidor: [nombre] ahora cubre [tema]"
"[Competidor] cambió precios. Actualiza."

─── KEYWORDS ──────────────────────────────────

"Importa keywords: [pegar datos]"
"Genera keywords para [tema]"

─── TOPIC CLUSTERS ────────────────────────────

"Muestra estado de topic clusters"
"Crea cluster para [tema]"
"¿Qué páginas de cluster escribir ahora?"

─── AUDITORÍAS ────────────────────────────────

"Ejecuta auditoría de contenido"
"Comprueba canibalización de keywords"
"¿Qué debería escribir ahora?"
"¿Qué blogs necesitan actualización?"

─── CONFIGURACIÓN ─────────────────────────────

Edita .seo-engine/config.yaml en cualquier momento para cambiar:
- Info del autor, señales de confianza, testimonios
- Texto/URL de CTA, límites de palabras
- Añadir/eliminar competidores
- Cambiar cadencia de publicación

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
