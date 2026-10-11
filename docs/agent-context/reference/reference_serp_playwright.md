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

Un `Request timed out` no demuestra por sí solo que haya un bloqueo de perfil. Comprobar la configuración y el error antes de actuar. No cerrar navegadores ajenos ni borrar locks; un perfil ya ocupado requiere resolver quién lo usa.

## Codex: conexión directa verificada el 2026-10-11

El bloque OpenCode anterior describe su configuración histórica. Codex usa esta configuración propia en `~/.codex/config.toml`:

```toml
[mcp_servers.playwright-browser]
command = "npx"
args = ["-y", "@playwright/mcp@latest", "--executable-path", "/usr/bin/chromium"]

[mcp_servers.playwright-browser.env]
PLAYWRIGHT_MCP_USER_DATA_DIR = "/home/darumo/.config/chromium-playwright"
```

Se retiró `--extension` y se sustituyó `PWTEST_EXTENSION_USER_DATA_DIR` por la variable anterior. La conexión directa abre el perfil dedicado sin esperar el enlace de la extensión Playwright; Keyword Surfer siguió funcionando en la prueba. [Documentación MCP oficial](https://github.com/microsoft/playwright-mcp).

Prueba observada con un servidor stdio nuevo del paquete local `@playwright/mcp` 0.0.83: initialize correcto, 25 tools, navegación y snapshot de `https://example.com/`, seguido de Google ES con snapshot real. La cabecera de Keyword Surfer mostró `110` para `primeros auxilios perros`; es una lectura fechada de extensión, no un dato oficial de Google. Se rechazaron cookies opcionales desde la interfaz de Google.

Para verificar dentro de la sesión que conserva el MCP antiguo, se usó el SDK MCP local `Client` + `StdioClientTransport`, lanzando `node /home/darumo/.npm/_npx/9833c18b2d85bc59/node_modules/@playwright/mcp/cli.js --executable-path /usr/bin/chromium` con la variable de perfil indicada. El helper y las capturas están en `/tmp/patasyhogar-s19-browser-repair/`; esa ruta de caché puede cambiar y no debe convertirse en configuración permanente.

El helper impuso 30 s a la navegación y 45 s por operación; cerró solo su navegador y transporte. Ningún bloqueo de perfil ni fallo de sandbox fue observado. No ejecutar dos propietarios del perfil a la vez ni usar `--no-sandbox`. En esta versión `browser_click` exige `target`, no `ref`; consultar `tools/list` antes de reutilizar argumentos de una versión anterior.

La configuración persistente quedó corregida, pero el MCP ya anunciado en una sesión puede conservar sus argumentos anteriores. No se probó su recarga en caliente: abrir una sesión nueva para verificar ese canal. El servidor stdio nuevo sí quedó probado.

El ejecutable existente `~/.local/bin/playwright-cli` es un wrapper de `pnpm dlx --package playwright`. La versión Playwright ya cacheada respondió correctamente a `node /home/darumo/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/cli.js cli --help`. No se instaló otro CLI ni se sobrescribió el wrapper. [El CLI oficial](https://github.com/microsoft/playwright-cli/blob/main/README.md) admite `playwright cli` en instalaciones locales; una ayuda correcta no verifica por sí sola su navegación. Para esta recuperación bastó el MCP y no se hizo una prueba de navegador por CLI.

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
