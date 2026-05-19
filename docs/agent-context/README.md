# Agent Context

Contexto persistente para agentes (Claude Code, OpenCode, Codex CLI). Todo lo que el agente debe recordar entre sesiones vive aquí (no en memoria local del agente).

## Estructura

- `feedback/` — Reglas consolidadas por tema. Leer solo el archivo relevante.
  - `feedback-products.md` — verificación productos, Amazon, imágenes, precios
  - `feedback-content.md` — artículos, review workflow, SEO, publicación
  - `feedback-reddit.md` — tono, coherencia, audiencia Reddit
  - `feedback-outreach.md` — canales outreach, Pinterest
  - `feedback-general.md` — build, analytics, reglas generales
- `project-state/` — Estado activo del proyecto. Cambia con el tiempo.
- `reference/` — Métodos técnicos validados (Amazon API, Reddit, Quora, etc.).

## Cómo usar

Al inicio de tarea relevante, leer SOLO el archivo que aplica:

- Tarea de productos → `feedback-products.md`
- Escribir/revisar artículo → `feedback-content.md`
- Reddit → `feedback-reddit.md`
- Outreach → `feedback-outreach.md`
- General → `feedback-general.md`

No leer todo. Solo lo relevante.

## Mantenimiento

- Regla nueva → añadir sección `##` al archivo temático correspondiente.
- Archivo obsoleto → mover a `_archive/`.
- Fechas absolutas al guardar (`hoy` → `YYYY-MM-DD`).

## Por qué aquí y no en memoria local

La memoria local de cada agente no se sincroniza entre ordenadores ni entre herramientas. Este directorio vive en el repo y es portable.
