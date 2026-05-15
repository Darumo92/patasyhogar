# claude-environment/

Entorno Claude Code replicable para este proyecto. Versionado para que cualquier máquina (macOS o Linux) reproduzca las mismas skills, hooks y settings tras `git pull`.

## Uso recomendado en máquina nueva

Para sincronizar skills entre Claude Code, Codex CLI, opencode y `~/.agents`, usa la capa comun:

```bash
git clone git@github.com:Darumo92/patasyhogar.git
cd patasyhogar
bash agent-environment/setup.sh --force
```

`agent-environment/setup.sh` crea enlaces simbolicos hacia `claude-environment/skills/` en vez de copiar skills a cada cliente.

## Uso legacy solo Claude Code

```bash
git clone git@github.com:Darumo92/patasyhogar.git
cd patasyhogar
bash claude-environment/setup.sh
```

El script:

1. Hace backup de `~/.claude/{skills,hooks,custom_bar.sh,settings.json}` si existían
2. Copia 40 skills → `~/.claude/skills/`
3. Copia hooks → `~/.claude/hooks/`
4. Renderiza `settings.json.template` sustituyendo `__HOME__` por `$HOME` real
5. Imprime los `/plugin install` que faltan ejecutar manualmente en Claude Code

Después, en Claude Code:

```
/plugin install superpowers
/plugin install ui-ux-pro-max
/plugin install everything-claude-code
/plugin install caveman
```

Los marketplaces correspondientes ya quedan registrados en el `settings.json` renderizado.

## Contenido

| Archivo | Qué es |
|---------|--------|
| `skills/` | 40 skills sueltas (humanizer, seo, mcp-sentinel, marketing, etc.) ~3MB |
| `hooks/` | caveman-activate, caveman-mode-tracker, statusline |
| `custom_bar.sh` | statusline custom |
| `settings.json.template` | hooks globales + statusline + marketplaces (placeholders `__HOME__`) |
| `setup.sh` | Script bootstrap (idempotente, compatible macOS y Linux) |

## Mantenimiento desde el Mac principal

Cuando instales/modifiques skills o hooks en `~/.claude/`, propaga los cambios al repo:

```bash
cd ~/Proyectos/patasyhogar

# Sincronizar skills (deref symlinks)
rm -rf claude-environment/skills
cp -RL ~/.claude/skills claude-environment/skills

# Sincronizar hooks y statusline
cp -R ~/.claude/hooks/. claude-environment/hooks/
cp ~/.claude/custom_bar.sh claude-environment/custom_bar.sh

# Si cambia settings.json global, regenerar template manualmente
# (sustituir tu /Users/<user>/ por __HOME__ y guardar a settings.json.template)

git add claude-environment/
git commit -m "chore(env): sync claude-environment con ~/.claude/"
git push
```

## Per-project memory

NO va en `claude-environment/`. Vive en `docs/agent-context/`:

- `feedback/` — reglas de comportamiento confirmadas
- `project-state/` — planes y tracking SEO activos
- `reference/` — métodos validados

Ver `CLAUDE.md` raíz para el patrón.

## Compatibilidad Linux

`setup.sh` evita flags BSD-only (`sed -i` con argumento, `cp` con flags GNU-only). Probado funciona en macOS; debería funcionar en Linux con bash 4+.
