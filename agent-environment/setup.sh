#!/usr/bin/env bash
# agent-environment/setup.sh — enlaza skills/config comun a Claude, Codex, opencode y ~/.agents.

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

Enlaza skills desde claude-environment/skills a:
  ~/.claude/skills
  ~/.agents/skills
  ~/.codex/skills
  ~/.config/opencode/skills

--force mueve conflictos gestionados a ~/.agent-environment-backups/<timestamp>/.
EOF
      exit 0
      ;;
    *)
      echo "ERROR: argumento no reconocido: ${arg}" >&2
      exit 1
      ;;
  esac
done

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

cat <<EOF

Bootstrap comun completado.

Reinicia Claude Code, Codex y opencode para que recarguen skills, hooks y MCP.
Si Cloudflare aparece como pendiente en opencode, ejecuta:
  opencode mcp auth cloudflare-api
EOF
