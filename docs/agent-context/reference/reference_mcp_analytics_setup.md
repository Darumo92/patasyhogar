---
name: MCP analytics setup — Cloudflare, GA4, Search Console
description: Configuracion MCP versionada para analiticas web en Claude Code y Codex CLI.
type: reference
updated: 2026-05-13
---

# MCP analytics setup

Fuente versionada:

- Claude Code: `.mcp.json`
- Codex CLI: `mcp-environment/codex.config.toml` + `mcp-environment/setup-codex-mcp.sh`
- Documentacion operativa: `mcp-environment/README.md`

## Servidores activos

| MCP | Fuente | Estado |
|---|---|---|
| `cloudflare-api` | `https://mcp.cloudflare.com/mcp` | Oficial Cloudflare |
| `google-analytics` | `googleanalytics/google-analytics-mcp`, comando `pipx run analytics-mcp` | Oficial/experimental Google Analytics |
| `google-search-console` | `mcp-server-gsc@0.3.0` | Tercero auditado, no oficial |

## Search Console — regla de seguridad

No hay MCP oficial de Google Search Console a fecha 2026-05-13. No presentar `google-search-console` como oficial.

El paquete aprobado para este repo es `mcp-server-gsc@0.3.0`, fijado a version exacta. No usar `latest`. No actualizar sin nueva auditoria.

Auditoria 2026-05-13:

- Repo revisado: `https://github.com/ahonn/mcp-server-gsc`
- npm revisado: `mcp-server-gsc@0.3.0`
- Tarball npm: 7 ficheros (`dist/*`, `README.md`, `package.json`)
- `npm audit --omit=dev`: 0 vulnerabilidades
- Scan textual del paquete: sin `child_process`, `eval`, `fetch`, `curl`, `wget`, lectura de `.ssh`, `.aws`, `.env`, ni dominios de exfiltracion
- Dependencias principales: `googleapis`, `google-auth-library`, `@modelcontextprotocol/sdk`, `zod`
- Scope usado por el servidor: `https://www.googleapis.com/auth/webmasters.readonly`
- Riesgo residual: tercero, sin soporte oficial de Google; datos GSC pueden contener texto controlado por terceros y provocar prompt injection indirecta si se pegan sin filtrar en contexto

Mitigaciones:

- Usar OAuth/ADC de usuario cuando la organizacion bloquee service account keys
- Mantener permisos minimos en Search Console
- No guardar credenciales en el repo
- En Codex, `submit_sitemap` queda deshabilitado mediante `disabled_tools`

## Credenciales necesarias

Codex:

- `CLOUDFLARE_API_TOKEN` para Cloudflare
- `GOOGLE_APPLICATION_CREDENTIALS` para GA4/GSC
- `GOOGLE_PROJECT_ID` para GA4

Claude Code:

- Cloudflare puede usar OAuth via `/mcp`
- GA4/GSC usan `GOOGLE_APPLICATION_CREDENTIALS`
- GA4 usa tambien `GOOGLE_PROJECT_ID`

Nota Cloudflare Codex 2026-05-13:

- Se probo un token API activo via `tokens/verify`, pero `GET /accounts` devolvia `result: []` y el MCP respondia `invalid_token: Failed to verify token: no user or account information`.
- `codex mcp login cloudflare-api` completo el flujo, pero `codex mcp list` siguio mostrando `Auth: Unsupported` para el MCP remoto, asi que esta instalacion no usa OAuth para ese servidor.
- Para Codex, mantener `bearer_token_env_var = "CLOUDFLARE_API_TOKEN"`.
- El token debe estar asociado a una cuenta visible para el MCP e incluir `Account Resources: Read`; un token limitado solo a zona puede fallar aunque sea valido para la API REST.

## Configuracion local 2026-05-13

La organizacion `darumo092-org` bloquea service account keys con `iam.disableServiceAccountKeyCreation`, y el usuario no podia editar esa politica. Se descarto crear clave JSON de service account y se configuro ADC con OAuth client propio:

- OAuth client local: `~/.credentials/patasyhogar/oauth-client.json`
- ADC generado: `~/.config/gcloud/application_default_credentials.json`
- Scopes concedidos:
  - `https://www.googleapis.com/auth/analytics.readonly`
  - `https://www.googleapis.com/auth/webmasters.readonly`
  - `https://www.googleapis.com/auth/cloud-platform`

Variables persistidas en `~/.zshrc`:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/gcloud/application_default_credentials.json"
export GOOGLE_PROJECT_ID="patasyhogar-mcp"
```

Verificacion:

- `gcloud auth application-default print-access-token` OK
- `pipx run analytics-mcp` arranca
- `npx -y mcp-server-gsc@0.3.0` arranca
- Google Analytics Admin API ve cuenta `Darumo` y propiedad `Patasyhogar` (`properties/528356279`)
- Search Console API ve `sc-domain:patasyhogar.com` con `siteOwner`
