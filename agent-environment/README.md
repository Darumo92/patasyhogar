# agent-environment/

Setup portable para instalar el entorno completo de agentes (opencode, Claude Code, Codex) en cualquier maquina.

## Quick start (maquina nueva)

```bash
git clone <repo> && cd patasyhogar
bash agent-environment/setup.sh --force
```

Esto instala:
- 47 skills enlazadas a `~/.config/opencode/skills/`
- Plugin `superpowers` en opencode
- MCP servers: Cloudflare, Google Analytics, Google Search Console
- Hooks y config de Claude Code (si se usa)

## Que hace el script

1. **Verifica dependencias**: node, npm, npx, git (pipx opcional)
2. **Enlaza skills** desde `claude-environment/skills/` a:
   - `~/.config/opencode/skills/` (opencode)
   - `~/.claude/skills/` (Claude Code)
   - `~/.agents/skills/` (runtime generico)
   - `~/.codex/skills/` (Codex)
3. **Configura MCP** en `~/.config/opencode/opencode.json`
4. **Instala plugin** superpowers
5. **Instala npm deps** de opencode (`@opencode-ai/plugin`)

## Requisitos previos

- `node` >= 18
- `npm`
- `git`
- `pipx` (opcional, para google-analytics MCP)
- Credenciales Google: `~/.config/gcloud/application_default_credentials.json`
- (Opcional) `CLOUDFLARE_API_TOKEN` en entorno para auth automatico

## Mantenimiento

Para anadir una skill nueva:
1. Copiar a `claude-environment/skills/<nombre>/`
2. Ejecutar `bash agent-environment/setup.sh --force`

Skills se enlazan como symlinks — editar en `claude-environment/skills/` actualiza todas las copias.

## Solo opencode

Si solo usas opencode, el script funciona igual. Los directorios de Claude/Codex se crean pero no afectan a nada si no usas esas herramientas.
