#!/usr/bin/env bash
# claude-environment/setup.sh — sincroniza skills/hooks/settings a ~/.claude/
#
# Compatible macOS y Linux (bash portable, sin sed -i ni flags BSD-only).
#
# Uso:
#   bash claude-environment/setup.sh           # interactivo (pregunta antes backup)
#   bash claude-environment/setup.sh --force   # sobrescribe sin preguntar

set -euo pipefail

ENV_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DST="${HOME}/.claude"
BACKUP="${HOME}/.claude.backup-$(date +%Y%m%d-%H%M%S)"
FORCE="${1:-}"

if [[ ! -d "${ENV_DIR}/skills" ]]; then
  echo "ERROR: no encuentro ${ENV_DIR}/skills. ¿Has clonado el repo correctamente?" >&2
  exit 1
fi

echo "==> Origen:  ${ENV_DIR}"
echo "==> Destino: ${DST}"
echo

# Backup
if [[ -d "${DST}" ]]; then
  if [[ "${FORCE}" != "--force" ]]; then
    echo "Existe ${DST}. Se hará backup de skills/hooks/custom_bar.sh/settings.json en:"
    echo "  ${BACKUP}"
    read -r -p "Continuar? [y/N] " resp
    [[ "${resp}" =~ ^[Yy]$ ]] || { echo "Cancelado."; exit 0; }
  fi
  mkdir -p "${BACKUP}"
  for item in skills hooks custom_bar.sh settings.json; do
    if [[ -e "${DST}/${item}" ]]; then
      mv "${DST}/${item}" "${BACKUP}/" 2>/dev/null || true
    fi
  done
  echo "Backup en ${BACKUP}"
else
  mkdir -p "${DST}"
fi

# Copiar
echo "==> skills/ (40 skills)"
cp -R "${ENV_DIR}/skills" "${DST}/skills"

echo "==> hooks/"
cp -R "${ENV_DIR}/hooks" "${DST}/hooks"

echo "==> custom_bar.sh"
cp "${ENV_DIR}/custom_bar.sh" "${DST}/custom_bar.sh"
chmod +x "${DST}/custom_bar.sh"

echo "==> settings.json (renderizado, __HOME__ → ${HOME})"
sed "s|__HOME__|${HOME}|g" "${ENV_DIR}/settings.json.template" > "${DST}/settings.json"
chmod 600 "${DST}/settings.json"

# Permisos hooks
chmod +x "${DST}/hooks/"*.sh 2>/dev/null || true
chmod +x "${DST}/hooks/"*.js 2>/dev/null || true

cat <<EOF

✅ Sincronización completada (40 skills + hooks + statusline + settings).

Pasos manuales restantes (Claude Code los necesita interactivos):

  /plugin install superpowers
  /plugin install ui-ux-pro-max
  /plugin install everything-claude-code
  /plugin install caveman

Los marketplaces ya están registrados en settings.json.

Reinicia Claude Code para que recoja los hooks.

Per-project memory de patasyhogar vive en docs/agent-context/ (ya en este repo).

EOF
