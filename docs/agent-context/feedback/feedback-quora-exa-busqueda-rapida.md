# Regla: Buscar preguntas de Quora con Exa MCP (no perder tiempo con Brave/DDG)

**Fecha:** 2026-08-18

Para encontrar preguntas de Quora usar **Exa MCP** (`web_search_exa`) con `site:es.quora.com <keywords>`. Es el método que usa `tuespaciodetrabajo` y no se bloquea con 429/403.

- El MCP `exa` llega vía el plugin "everything-claude-code" de Claude Code (`https://mcp.exa.ai/mcp`).
- Si Exa no está disponible en el entorno, caer a Brave Search `site:es.quora.com/` vía `webfetch`, pero **sacar las 4 preguntas del día de UNA sola búsqueda**, sin encadenar reintentos con `sleep`.
- NO usar `webfetch` a DuckDuckGo HTML (captcha a la 1-2 consultas) ni `es.quora.com/search` directo (403).
- Entregar borradores por chat con URL de pregunta + texto listo. No crear `.md` de sesión.

**Por qué:** el 2026-08-18 se perdió tiempo encadenando búsquedas Brave/DDG que rate-limitan. Con Exa, una sola llamada devuelve todas las preguntas candidatas.
