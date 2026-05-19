#!/usr/bin/env bash
# agent-environment/setup.sh — instala skills, plugins, MCP y config para opencode (y otros agentes).
# Ejecutar en cualquier maquina nueva: bash agent-environment/setup.sh --force

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILLS_SRC="${ROOT_DIR}/claude-environment/skills"
CLAUDE_ENV="${ROOT_DIR}/claude-environment"
MCP_ENV="${ROOT_DIR}/mcp-environment"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_ROOT="${HOME}/.agent-environment-backups/${STAMP}"
FORCE=0

for arg in "$@"; do
  case "${arg}" in
    --force)
      FORCE=1
      ;;
    -h|--help)
      cat <<EOF
Uso: bash agent-environment/setup.sh [--force]

Instala el entorno completo de agentes:
  1. Skills (symlinks desde claude-environment/skills/ a ~/.config/opencode/skills/ etc.)
  2. Plugin superpowers en opencode.json
  3. MCP servers (Cloudflare, Google Analytics, Google Search Console)
  4. Hooks y config de Claude Code

Destinos de skills:
  ~/.claude/skills
  ~/.agents/skills
  ~/.codex/skills
  ~/.config/opencode/skills

--force mueve conflictos a ~/.agent-environment-backups/<timestamp>/.
EOF
      exit 0
      ;;
    *)
      echo "ERROR: argumento no reconocido: ${arg}" >&2
      exit 1
      ;;
  esac
done

# --- Verificar dependencias ---
echo "==> Verificando dependencias..."
MISSING=""
command -v node >/dev/null 2>&1 || MISSING="${MISSING} node"
command -v npm >/dev/null 2>&1 || MISSING="${MISSING} npm"
command -v npx >/dev/null 2>&1 || MISSING="${MISSING} npx"
command -v git >/dev/null 2>&1 || MISSING="${MISSING} git"

if [[ -n "${MISSING}" ]]; then
  echo "ERROR: faltan dependencias:${MISSING}" >&2
  echo "Instalalas antes de continuar." >&2
  exit 1
fi

# pipx es opcional (para google-analytics MCP)
if ! command -v pipx >/dev/null 2>&1; then
  echo "WARN: pipx no encontrado — google-analytics MCP no funcionara. Instala con: pip install pipx"
fi

echo "OK  Dependencias verificadas"

if [[ ! -d "${SKILLS_SRC}" ]]; then
  echo "ERROR: no encuentro ${SKILLS_SRC}" >&2
  exit 1
fi

backup_path_for() {
  local path="$1"
  local clean
  clean="${path#${HOME}/}"
  printf '%s/%s' "${BACKUP_ROOT}" "${clean}"
}

link_path() {
  local src="$1"
  local dst="$2"
  local backup_dst

  mkdir -p "$(dirname "${dst}")"

  if [[ -L "${dst}" ]]; then
    local current
    current="$(readlink "${dst}")"
    if [[ "${current}" == "${src}" ]]; then
      echo "OK  ${dst} -> ${src}"
      return 0
    fi
  fi

  if [[ -e "${dst}" || -L "${dst}" ]]; then
    if [[ "${FORCE}" -ne 1 ]]; then
      echo "SKIP ${dst} existe. Usa --force para reemplazarlo con enlace simbolico."
      return 0
    fi

    backup_dst="$(backup_path_for "${dst}")"
    mkdir -p "$(dirname "${backup_dst}")"
    mv "${dst}" "${backup_dst}"
    echo "BACKUP ${dst} -> ${backup_dst}"
  fi

  ln -s "${src}" "${dst}"
  echo "LINK ${dst} -> ${src}"
}

link_skills_to() {
  local target_dir="$1"
  mkdir -p "${target_dir}"

  for skill_dir in "${SKILLS_SRC}"/*; do
    [[ -d "${skill_dir}" ]] || continue
    link_path "${skill_dir}" "${target_dir}/$(basename "${skill_dir}")"
  done
}

echo "==> Fuente comun de skills: ${SKILLS_SRC}"
link_skills_to "${HOME}/.claude/skills"
link_skills_to "${HOME}/.agents/skills"
link_skills_to "${HOME}/.codex/skills"
link_skills_to "${HOME}/.config/opencode/skills"

if [[ -d "${CLAUDE_ENV}/hooks" ]]; then
  echo "==> Hooks Claude Code"
  mkdir -p "${HOME}/.claude/hooks"
  for hook in "${CLAUDE_ENV}/hooks"/*; do
    [[ -f "${hook}" ]] || continue
    link_path "${hook}" "${HOME}/.claude/hooks/$(basename "${hook}")"
  done
fi

if [[ -f "${CLAUDE_ENV}/custom_bar.sh" ]]; then
  link_path "${CLAUDE_ENV}/custom_bar.sh" "${HOME}/.claude/custom_bar.sh"
fi

if [[ -f "${CLAUDE_ENV}/settings.json.template" ]]; then
  mkdir -p "${HOME}/.claude"
  if [[ ! -e "${HOME}/.claude/settings.json" || "${FORCE}" -eq 1 ]]; then
    if [[ -e "${HOME}/.claude/settings.json" ]]; then
      backup_dst="$(backup_path_for "${HOME}/.claude/settings.json")"
      mkdir -p "$(dirname "${backup_dst}")"
      mv "${HOME}/.claude/settings.json" "${backup_dst}"
      echo "BACKUP ${HOME}/.claude/settings.json -> ${backup_dst}"
    fi
    sed "s|__HOME__|${HOME}|g" "${CLAUDE_ENV}/settings.json.template" > "${HOME}/.claude/settings.json"
    chmod 600 "${HOME}/.claude/settings.json"
    echo "WRITE ${HOME}/.claude/settings.json"
  else
    echo "SKIP ${HOME}/.claude/settings.json existe. Usa --force para regenerarlo."
  fi
fi

if [[ -x "${MCP_ENV}/setup-codex-mcp.sh" ]]; then
  echo "==> MCP Codex"
  bash "${MCP_ENV}/setup-codex-mcp.sh"
fi

echo "==> MCP opencode"
mkdir -p "${HOME}/.config/opencode"
if [[ ! -f "${HOME}/.config/opencode/opencode.json" ]]; then
  cat > "${HOME}/.config/opencode/opencode.json" <<'EOF'
{
  "$schema": "https://opencode.ai/config.json",
  "autoupdate": false
}
EOF
fi

node <<'EOF'
const fs = require("fs")
const path = `${process.env.HOME}/.config/opencode/opencode.json`
const cfg = JSON.parse(fs.readFileSync(path, "utf8"))

cfg.mcp ||= {}
cfg.mcp["cloudflare-api"] = {
  type: "remote",
  url: "https://mcp.cloudflare.com/mcp",
  enabled: true,
  timeout: 120000,
}

if (process.env.CLOUDFLARE_API_TOKEN) {
  cfg.mcp["cloudflare-api"].headers = {
    Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
  }
}

cfg.mcp["google-analytics"] = {
  type: "local",
  command: ["pipx", "run", "analytics-mcp"],
  enabled: true,
  environment: {
    GOOGLE_APPLICATION_CREDENTIALS: `${process.env.HOME}/.config/gcloud/application_default_credentials.json`,
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID || "patasyhogar-mcp",
  },
  timeout: 120000,
}

cfg.mcp["google-search-console"] = {
  type: "local",
  command: ["npx", "-y", "mcp-server-gsc@0.3.0"],
  enabled: true,
  environment: {
    GOOGLE_APPLICATION_CREDENTIALS: `${process.env.HOME}/.config/gcloud/application_default_credentials.json`,
  },
  timeout: 120000,
}

fs.writeFileSync(path, `${JSON.stringify(cfg, null, 2)}\n`, { mode: 0o600 })

const authPath = `${process.env.HOME}/.local/share/opencode/mcp-auth.json`
if (process.env.CLOUDFLARE_API_TOKEN && fs.existsSync(authPath)) {
  const auth = JSON.parse(fs.readFileSync(authPath, "utf8") || "{}")
  delete auth["cloudflare-api"]
  fs.writeFileSync(authPath, `${JSON.stringify(auth, null, 2)}\n`, { mode: 0o600 })
}
EOF
chmod 600 "${HOME}/.config/opencode/opencode.json"

if command -v jq >/dev/null 2>&1 && [[ -f "${HOME}/.config/opencode/opencode.json" ]]; then
  jq empty "${HOME}/.config/opencode/opencode.json"
  echo "OK  ${HOME}/.config/opencode/opencode.json es JSON valido"
fi

# --- Plugin superpowers ---
echo "==> Plugin superpowers (opencode)"
node <<'EOF'
const fs = require("fs")
const path = `${process.env.HOME}/.config/opencode/opencode.json`
const cfg = JSON.parse(fs.readFileSync(path, "utf8"))

const PLUGIN = "superpowers@git+https://github.com/obra/superpowers.git"

if (!cfg.plugin) {
  cfg.plugin = [PLUGIN]
  console.log("ADD  plugin superpowers")
} else if (!cfg.plugin.includes(PLUGIN)) {
  cfg.plugin.push(PLUGIN)
  console.log("ADD  plugin superpowers")
} else {
  console.log("OK   plugin superpowers ya presente")
}

fs.writeFileSync(path, `${JSON.stringify(cfg, null, 2)}\n`, { mode: 0o600 })
EOF

# --- Instalar dependencias opencode (plugin runtime) ---
echo "==> Dependencias opencode (npm install)"
if [[ -f "${HOME}/.config/opencode/package.json" ]]; then
  (cd "${HOME}/.config/opencode" && npm install --silent 2>/dev/null) && echo "OK  npm install" || echo "WARN npm install fallo (no critico)"
else
  mkdir -p "${HOME}/.config/opencode"
  cat > "${HOME}/.config/opencode/package.json" <<'PKGEOF'
{
  "dependencies": {
    "@opencode-ai/plugin": "^1.14.0"
  }
}
PKGEOF
  (cd "${HOME}/.config/opencode" && npm install --silent 2>/dev/null) && echo "OK  npm install" || echo "WARN npm install fallo (no critico)"
fi

# --- Resumen ---
SKILLS_COUNT=$(find "${SKILLS_SRC}" -maxdepth 1 -mindepth 1 -type d | wc -l)
cat <<EOF

=== Setup completado ===

Skills instaladas: ${SKILLS_COUNT}
Plugin: superpowers
MCP servers: cloudflare-api, google-analytics, google-search-console

Reinicia opencode para que recargue skills y MCP.
Si Cloudflare aparece como pendiente, ejecuta:
  opencode mcp auth cloudflare-api

Para verificar: opencode (deberia listar ${SKILLS_COUNT}+ skills disponibles)
EOF
