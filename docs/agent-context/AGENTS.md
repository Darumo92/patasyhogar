# Sincronizado desde CLAUDE.md — mantener ambos archivos alineados

> Equivalente de `docs/agent-context/README.md` adaptado para **Codex CLI** y cualquier otro agente que lea `AGENTS.md`. Las reglas son idénticas a las que sigue Claude Code.

# Agent Context

Contexto persistente para agentes (Claude Code, Codex CLI, etc.). Todo lo que el agente debe recordar entre sesiones y entre ordenadores vive aquí, **no** en memoria local del agente.

## Estructura

- `feedback/` — Reglas de comportamiento que el usuario ha confirmado o corregido. Aplicarlas siempre.
- `project-state/` — Estado activo del proyecto (planes, calendarios, tracking SEO). Cambia con el tiempo.
- `reference/` — Métodos validados (cómo obtener URLs Reddit, workflows Quora ES, dofollow blogs mascotas, etc.).

## Cómo usar

Al inicio de cualquier tarea relevante:

1. **Leer `feedback/` entero** — son reglas que ya están en vigor.
2. **Leer `project-state/` que aplique** a la tarea:
   - `project_seo_daily_routine.md` para rutina SEO diaria.
   - `project_outreach_plan_2026-05-11.md` para plan outreach autoridad 6 meses.
   - `project_backlinks_social_status.md` para estado vivo Reddit/Pinterest.
   - `project_keywords_pending_review.md` para keywords pendientes.
   - `project_mango_kira_fictional.md` para perfil de mascotas ficticias.
3. **Consultar `reference/`** cuando se necesite el método validado correspondiente.

## Mantenimiento

- Cuando el usuario corrige o confirma una regla nueva → crear archivo en `feedback/` con frontmatter `name`, `description`, `type: feedback`.
- Cuando un archivo queda obsoleto → moverlo a `_archive/` o eliminarlo (no acumular obsoletos en raíz).
- Convertir fechas relativas a absolutas al guardar (`hoy` → `YYYY-MM-DD`).

## Por qué aquí y no en memoria local del agente

La memoria local de Claude Code (en `~/.claude/`) y la de Codex CLI no se sincronizan entre ordenadores ni entre herramientas. Este directorio sí (vive en el repo). Cualquier instrucción persistente debe guardarse aquí para que sea visible tanto a Claude Code como a Codex CLI.

Ver también:

- `CLAUDE.md` raíz — sección "Regla de instrucciones (meta)".
- `AGENTS.md` raíz — sección "Agent Behavior > 0. Regla meta sobre instrucciones persistentes".
