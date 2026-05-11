# Agent Context

Contexto persistente para Claude Code. Todo lo que el agente debe recordar entre sesiones y entre ordenadores vive aquí (no en memoria local de Claude Code).

## Estructura

- `feedback/` — Reglas de comportamiento que el usuario ha confirmado o corregido. Aplicarlas siempre.
- `project-state/` — Estado activo del proyecto (planes, calendarios, tracking SEO). Cambia con el tiempo.
- `reference/` — Métodos validados (cómo obtener URLs Reddit, etc.).

## Cómo usar

Al inicio de cualquier tarea relevante:

1. Leer `feedback/` entero — son reglas que ya están en vigor.
2. Leer `project-state/` que aplique a la tarea (ej: `project_seo_daily_routine.md` para rutina SEO diaria, `project_outreach_plan_2026-05-11.md` para plan outreach autoridad 6 meses, `project_backlinks_social_status.md` para estado vivo Reddit/Pinterest).
3. Consultar `reference/` cuando se necesite el método validado correspondiente.

## Mantenimiento

- Cuando el usuario corrige o confirma una regla nueva → crear archivo en `feedback/` con frontmatter `name`, `description`, `type: feedback`.
- Cuando un archivo queda obsoleto → moverlo a `_archive/` o eliminarlo (no acumular obsoletos en raíz).
- Convertir fechas relativas a absolutas al guardar (`hoy` → `2026-05-09`).

## Por qué aquí y no en memoria de Claude Code

La memoria local de Claude Code no se sincroniza entre ordenadores. Este directorio sí (vive en el repo). Cualquier instrucción persistente debe guardarse aquí.

Ver también la sección "Regla de instrucciones (meta)" en `CLAUDE.md` raíz.
