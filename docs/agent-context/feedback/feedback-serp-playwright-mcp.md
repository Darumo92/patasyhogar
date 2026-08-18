# Regla: Investigar SERP con Playwright MCP (no pedirla al usuario salvo fallo)

**Confirmada:** 2026-08-18

## Regla

Los datos SERP reales de Google (AI Overview, top resultados, PAA, búsquedas relacionadas y volumen Keyword Surfer) los obtiene el agente **directamente con el MCP `playwright-browser`**, no pidiéndoselos al usuario.

**Why:** El usuario corrigió que se pidieran los datos SERP a mano cuando el agente ya puede sacarlos con Playwright MCP. Los artículos S8/S9/S10 ya se investigaron así ("SERP investigada con Chromium + Keyword Surfer"). Pedir al usuario lo que el MCP puede obtener es trabajo redundante.

**How to apply:**
1. Antes de cada artículo nuevo: navegar con `playwright-browser` a `https://www.google.com/search?q=<keyword>&hl=es&gl=es` y extraer AI Overview, top 5-10, PAA, related searches y volumen.
2. Repetir para las variantes de keyword relevantes.
3. Guardar todo en el brief del artículo.
4. Solo si el MCP falla (timeout, reCAPTCHA, perfil bloqueado), pedir al usuario el dato que falte, indicando el intento realizado.

## Dependencia de configuración

El MCP `playwright-browser` debe usar un perfil Chromium **separado** (`/home/darumo/.config/chromium-playwright`), no el principal del usuario, para evitar el bloqueo por `SingletonLock`. Ver `reference_serp_playwright.md`.

## Límites

- No sustituye Keyword Surfer si la extensión no inyecta volumen: usar entonces `seo-keywords.csv` y el plan, sin inventar cifras.
- La regla antigua "no usar web search propio" sigue vigente para `webfetch`/`--dump-dom` contra Google (devuelve reCAPTCHA). Playwright MCP con perfil real es la vía válida.
