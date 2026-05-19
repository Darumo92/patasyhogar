# docs/agent-rules/

Reglas detalladas del proyecto extraídas de AGENTS.md/CLAUDE.md para **carga bajo demanda**.

Estos archivos NO se cargan automáticamente en cada sesión. El agente los lee cuando la tarea lo requiere.

## Archivos

| Archivo | Cuándo leer |
|---------|------------|
| `product-verification.md` | Al crear/revisar artículos con productos |
| `article-checklist.md` | Al crear o revisar cualquier artículo |
| `pillar-pages.md` | Al crear artículos en clusters o pillar pages |
| `seo-content-engine.md` | Al escribir, evaluar, auditar o planificar contenido SEO |

## Relación con otros archivos

- `AGENTS.md` / `CLAUDE.md` → reglas mínimas siempre activas
- `docs/agent-context/feedback/` → reglas de comportamiento confirmadas por el usuario
- `docs/agent-context/project-state/` → estado vivo del proyecto
- `docs/agent-context/reference/` → métodos técnicos validados
- `.seo-engine/` → datos y templates del SEO engine
