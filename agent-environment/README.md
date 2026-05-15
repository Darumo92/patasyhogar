# agent-environment/

Bootstrap comun para agentes locales: Claude Code, Codex CLI, opencode y el runtime de skills bajo `~/.agents`.

La fuente comun de skills vive en:

```bash
claude-environment/skills/
```

`agent-environment/setup.sh` crea enlaces simbolicos desde esa fuente hacia los directorios que lee cada herramienta:

```text
~/.claude/skills/<skill>          -> repo/claude-environment/skills/<skill>
~/.agents/skills/<skill>          -> repo/claude-environment/skills/<skill>
~/.codex/skills/<skill>           -> repo/claude-environment/skills/<skill>
~/.config/opencode/skills/<skill> -> repo/claude-environment/skills/<skill>
```

Tambien enlaza hooks y statusline de Claude Code desde `claude-environment/`.

## Uso

```bash
bash agent-environment/setup.sh
```

Si ya existen skills copiadas, el script no las pisa salvo que uses:

```bash
bash agent-environment/setup.sh --force
```

Con `--force`, cualquier skill gestionada que exista como carpeta/archivo real se mueve a un backup bajo:

```text
~/.agent-environment-backups/<timestamp>/
```

## MCP

Los MCP siguen teniendo formatos distintos por cliente:

- Claude Code usa `.mcp.json` del repo.
- Codex CLI usa `mcp-environment/setup-codex-mcp.sh` para renderizar `~/.codex/config.toml`.
- opencode usa `~/.config/opencode/opencode.json` con la seccion `mcp`.

`agent-environment/setup.sh` ejecuta el setup de Codex y renderiza la seccion `mcp` de opencode en `~/.config/opencode/opencode.json`. Si `CLOUDFLARE_API_TOKEN` esta en el entorno, lo escribe como header local en ese archivo con permisos `600`, porque el OAuth remoto de Cloudflare puede fallar en algunos flujos con `Application authorization failed`. No copia tokens ni credenciales al repo.

## Plugins

Los plugins no son portables 1:1 entre clientes. La lista canonica de plugins deseados esta en `agent-environment/plugins.txt`. Claude Code sigue necesitando instalaciones interactivas para algunos plugins.

## Mantenimiento

Para anadir una skill global, copiala una vez a `claude-environment/skills/<nombre>/`. Despues ejecuta:

```bash
bash agent-environment/setup.sh --force
```

No edites las copias de `~/.claude/skills`, `~/.agents/skills`, `~/.codex/skills` o `~/.config/opencode/skills`: seran enlaces a la fuente comun.
