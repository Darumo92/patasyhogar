# Agent Context

Contexto persistente para agentes (Claude Code, OpenCode, Codex CLI). Todo lo que el agente debe recordar entre sesiones vive aquí (no en memoria local del agente).

## Estructura

- `feedback/` — Reglas de comportamiento confirmadas por el usuario. Aplicarlas siempre que la tarea aplique.
- `project-state/` — Estado activo del proyecto (planes, calendarios, tracking). Cambia con el tiempo.
- `reference/` — Métodos técnicos validados (workflows Amazon API, Reddit, Quora, etc.).

## Cómo usar

Al inicio de tarea relevante:

1. **Leer `feedback/` que aplique** — son reglas en vigor.
2. **Leer `project-state/` que aplique** a la tarea.
3. **Consultar `reference/`** cuando se necesite un método validado.

No es necesario leer todo siempre. Leer solo lo relevante a la tarea actual.

## Mantenimiento

- Regla nueva → crear en `feedback/` con frontmatter `name`, `description`, `type: feedback`.
- Archivo obsoleto → mover a `_archive/`.
- Fechas absolutas al guardar (`hoy` → `YYYY-MM-DD`).

## Por qué aquí y no en memoria local

La memoria local de cada agente no se sincroniza entre ordenadores ni entre herramientas. Este directorio vive en el repo y es portable.
