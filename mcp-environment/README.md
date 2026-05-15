# mcp-environment/

Configuracion MCP versionada para que Claude Code y OpenAI Codex CLI usen los mismos servidores en este repo.

## Servidores configurados

| MCP | Proveedor | Estado | Uso |
|---|---|---|---|
| `cloudflare-api` | Cloudflare | Oficial | Analiticas y API de Cloudflare via OAuth |
| `google-analytics` | Google Analytics | Oficial/experimental | Lectura de datos GA4 con `analytics-mcp` |
| `google-search-console` | Tercero auditado: `ahonn/mcp-server-gsc` | No oficial, version fijada | Search Analytics de Google Search Console |

## Search Console

Google no publica todavia un MCP oficial especifico para Search Console. Por eso este repo usa `mcp-server-gsc@0.3.0`, solo tras auditoria manual, y queda fijado a version exacta.

Auditoria realizada el 2026-05-13:

- Fuente revisada: `https://github.com/ahonn/mcp-server-gsc`.
- Paquete npm revisado: `mcp-server-gsc@0.3.0`.
- Tarball npm: 7 ficheros, solo `dist/`, `README.md` y `package.json`.
- `npm audit --omit=dev`: 0 vulnerabilidades.
- No se detectaron `child_process`, `eval`, `fetch`, `curl`, `wget`, lectura de `.ssh`, `.aws`, `.env`, ni dominios de exfiltracion en el paquete publicado.
- El cliente usa `googleapis` y `google-auth-library` contra APIs oficiales de Google.
- Scope configurado por el servidor: `https://www.googleapis.com/auth/webmasters.readonly`.
- Riesgo residual: es un paquete de tercero, no esta cubierto por soporte oficial de Google, y debe revisarse de nuevo antes de subir version.

Reglas:

- No usar `latest`; mantener `mcp-server-gsc@0.3.0` hasta nueva auditoria.
- Usar service account dedicada, sin permisos de otros productos.
- Dar acceso en Search Console solo a la propiedad `patasyhogar.com`.
- No guardar el JSON de credenciales en el repo.
- En Codex queda desactivada la herramienta `submit_sitemap` como defensa adicional.

## Claude Code

Claude Code lee el archivo versionado del repo:

```bash
.mcp.json
```

Al abrir Claude Code en el proyecto, aprueba los MCP del proyecto cuando lo pida. Para autenticar Cloudflare:

```bash
/mcp
```

Luego inicia login en `cloudflare-api`.

Alternativa no interactiva: exportar un token limitado antes de abrir Claude Code y anadirlo manualmente como header si hiciera falta. Por defecto se prefiere OAuth en Claude.

Google Analytics requiere credenciales ADC:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/ruta/a/credentials.json
export GOOGLE_PROJECT_ID=tu-proyecto-google-cloud
```

El servidor oficial se ejecuta con:

```bash
pipx run analytics-mcp
```

Search Console usa la misma variable `GOOGLE_APPLICATION_CREDENTIALS`. En esta maquina apunta a credenciales ADC de usuario, no a una clave de service account:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/gcloud/application_default_credentials.json"
```

## Codex CLI

Aplica la plantilla versionada a `~/.codex/config.toml`:

```bash
bash mcp-environment/setup-codex-mcp.sh
```

Luego reinicia Codex y autentica Cloudflare:

```bash
export CLOUDFLARE_API_TOKEN=tu-token-limitado
```

En esta version de Codex se usa `CLOUDFLARE_API_TOKEN` como bearer token. El token debe poder ver al menos una cuenta: incluye `Account Resources: Read` y limita los recursos/permisos restantes al minimo necesario. Un token limitado solo a zona puede pasar `tokens/verify` pero fallar en el MCP con `invalid_token: no user or account information`.

Importante: `CLOUDFLARE_API_TOKEN` debe estar en el entorno del proceso que lanza Codex. El archivo correcto depende del sistema y de la shell:

- macOS con zsh: `~/.zshrc` para shells interactivas; `~/.zprofile` si Codex se lanza desde una shell login.
- Linux con bash: `~/.bashrc` para shells interactivas; `~/.bash_profile` o `~/.profile` deben cargarlo si Codex se lanza desde una shell login.
- Otros casos: exporta las variables en el perfil de la shell que use el proceso que ejecuta `codex`.

El setup de Codex aplica una defensa adicional: si `CLOUDFLARE_API_TOKEN` esta disponible al ejecutar `bash mcp-environment/setup-codex-mcp.sh`, escribe un header `Authorization` en `~/.codex/config.toml` local (`chmod 600`). No se versiona el token en el repo. Esto evita fallos cuando Codex no hereda variables de shell a tiempo para autenticar MCP remotos.

Para Google Analytics, exporta las mismas variables antes de abrir Codex:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/ruta/a/credentials.json
export GOOGLE_PROJECT_ID=tu-proyecto-google-cloud
```

Para Search Console, la misma credencial ADC debe tener acceso a la propiedad en Google Search Console:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/gcloud/application_default_credentials.json"
```

## Requisitos locales

- `pipx` para `google-analytics`.
- Google Cloud CLI para generar ADC con OAuth.
- Node/npm para `google-search-console`.
- No guardar credenciales JSON ni tokens en el repo.
- Crear tokens Cloudflare con permisos minimos para leer analiticas/configuracion del dominio.

## Configuracion local validada en esta maquina

Se intento usar service account key, pero la organizacion bloquea la creacion de claves con `iam.disableServiceAccountKeyCreation`. Se mantuvo esa restriccion y se uso OAuth/ADC:

```bash
gcloud auth application-default login \
  --client-id-file="$HOME/.credentials/patasyhogar/oauth-client.json" \
  --scopes=https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/cloud-platform
```

Variables persistentes en el perfil de shell correspondiente a la maquina:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/gcloud/application_default_credentials.json"
export GOOGLE_PROJECT_ID="patasyhogar-mcp"
export CLOUDFLARE_API_TOKEN="..."
```

Comprobado el 2026-05-13:

- `gcloud auth application-default print-access-token` refresca token correctamente.
- `pipx run analytics-mcp` arranca el servidor MCP oficial de Google Analytics.
- `npx -y mcp-server-gsc@0.3.0` arranca el servidor MCP de Search Console auditado.
- Google Analytics Admin API lista `Patasyhogar` como `properties/528356279`.
- Search Console API lista `sc-domain:patasyhogar.com` con permiso `siteOwner`.
