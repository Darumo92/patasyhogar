---
name: Investigación SERP con Playwright MCP
description: Método validado para obtener SERP real de Google (AI Overview, top results, PAA, related searches y volumen Keyword Surfer) con el MCP playwright-browser, sin depender de que el usuario pegue los datos.
type: reference
---

# Investigación SERP con Playwright MCP

Desde 2026-08 las SERP de los artículos nuevos (S8, S9, S10…) se investigan con el MCP `playwright-browser`, que navega Google con Chromium real. Esto sustituye a pedirle al usuario los datos SERP a mano, salvo que el MCP falle.

## Requisitos

El MCP `playwright-browser` usa un perfil Chromium **separado** del navegador de escritorio para no bloquearse con el `SingletonLock`:

- `PWTEST_EXTENSION_USER_DATA_DIR=/home/darumo/.config/chromium-playwright` (config en `~/.config/opencode/opencode.json`)
- Perfil clonado del principal (con Keyword Surfer) pero sin caches ni locks.
- Keyword Surfer instalado en ese perfil (ID `bafijghppfhdpldihckdcadbcobikaca`).

**Si el MCP da `Request timed out` en todas las llamadas**, el perfil está bloqueado por el Chromium de escritorio. Solución: reiniciar opencode (el MCP se relanza con el perfil separado) o, si se ha vuelto a apuntar al perfil principal, cerrar el navegador de escritorio.

## Workflow

1. Navegar a Google con la keyword, forzando ES:

   ```
   browser_navigate → https://www.google.com/search?q=<keyword>&hl=es&gl=es
   ```

2. Sacar snapshot accesible para leer la SERP:

   ```
   browser_snapshot
   ```

3. Extraer por bloques:
   - **AI Overview** (si aparece): texto generado + fuentes citadas.
   - **Top 5-10 resultados orgánicos**: título + dominio.
   - **PAA** ("Otras preguntas de los usuarios"): `browser_find` con texto de alguna pregunta, o buscar el bloque en el snapshot.
   - **Búsquedas relacionadas** del pie: hacer scroll/`browser_find`.
   - **Volumen Keyword Surfer**: en el panel lateral que inyecta la extensión (o en la cabecera del resultado).

4. Repetir para las variantes de keyword relevantes (2-6 consultas) para mapear PAA y volúmenes.

## Extracción alternativa con DOM

Si el snapshot no basta, `browser_evaluate` sobre `document.body.innerText` o `browser_run_code_unsafe` con Playwright para leer `document.querySelectorAll('a h3')` (títulos orgánicos) y los contenedores de PAA.

## Reglas

- **No usar `webfetch` a Google** ni el `--dump-dom` de chromium: Google devuelve reCAPTCHA. El MCP con perfil real es lo que funciona.
- Capturar todo (AI Overview, top, PAA, related, volumen) en el **brief** antes de redactar, igual que `docs/brief-s8-cuantas-horas-duerme-perro.md`.
- Si Keyword Surfer no inyecta volumen en la SERP, usar los volúmenes ya registrados en `.seo-engine/data/seo-keywords.csv` y el plan, sin inventar cifras.
- Si el MCP falla tras reiniciar, pedir al usuario solo el dato que falte (SERP o volumen), indicando el intento realizado.
