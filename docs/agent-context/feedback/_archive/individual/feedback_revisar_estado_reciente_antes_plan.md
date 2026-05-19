---
name: Revisar estado reciente antes de proponer plan diario
description: Antes de proponer tareas del plan diario, revisar commits recientes y tracking para no sugerir cosas ya hechas o temas repetidos.
type: feedback
originSessionId: opencode-2026-05-19
---

# Regla: contrastar plan con estado real reciente

Antes de responder a "vamos con el plan de hoy" o variantes, no basta con leer los archivos base del plan. Hay que revisar también el estado reciente del repo y del tracking.

## Cómo aplicar

1. Revisar `git log --oneline -10` para detectar trabajo reciente no reflejado en documentos antiguos.
2. Revisar `project_backlinks_social_status.md` para posts/comentarios ya publicados y evitar repetir ángulos.
3. Revisar `.seo-engine/logs/changelog.md` si el plan menciona builds, herramientas o contenido SEO.
4. Si un archivo de plan está desactualizado, actualizarlo antes de proponer tareas.

## Corrección que originó esta regla

El 2026-05-19 se propuso empezar la calculadora de coste mascotas y hacer un post propio en Reddit sobre costes, pero la calculadora ya estaba publicada el 2026-05-18 y el post propio de coste mensual ya se había publicado en r/AskSpain el 2026-05-12. No repetir esa propuesta.
