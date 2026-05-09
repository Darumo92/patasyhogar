#!/bin/bash
# Statusline espectacular — datos reales del stdin que pasa Claude Code
input=$(cat)

# ── Frame de animación (1 Hz, basado en date +%s — cross-shell, sin polling) ──
anim_s=$(date +%s)
anim_frame=$(( anim_s % 13 ))       # 0..12: recorre los 10 bloques + 2 de pausa
pulse_frame=$(( anim_s % 4 ))       # 0..3: breathing del dot "live"

# ── Campos básicos ─────────────────────────────────────────────────────────
model_id=$(echo "$input" | jq -r '.model.id // ""')
model_display=$(echo "$input" | jq -r '.model.display_name // ""')
# claude-sonnet-4-7 → Sonnet 4.7 · claude-opus-4-7 → Opus 4.7 · claude-haiku-4-5 → Haiku 4.5
if [[ "$model_id" =~ claude-(opus|sonnet|haiku)-([0-9]+)-([0-9]+) ]]; then
    fam="${BASH_REMATCH[1]}"
    model="$(tr '[:lower:]' '[:upper:]' <<< ${fam:0:1})${fam:1} ${BASH_REMATCH[2]}.${BASH_REMATCH[3]}"
elif [ -n "$model_display" ]; then
    model="$model_display"
else
    model="Claude"
fi
effort=$(echo "$input" | jq -r '.output_config.effort // "med"')
cwd=$(echo "$input"    | jq -r '.workspace.current_dir // .cwd // ""')
ctx_pct=$(echo "$input" | jq -r '.context_window.used_percentage // 0' | awk '{printf "%d", $1}')
tok_in=$(echo "$input"  | jq -r '.context_window.total_input_tokens // 0')
tok_out=$(echo "$input" | jq -r '.context_window.total_output_tokens // 0')
dur_ms=$(echo "$input"  | jq -r '.cost.total_duration_ms // 0')
rl_5h=$(echo "$input"   | jq -r '.rate_limits.five_hour.used_percentage // 0' | awk '{printf "%d", $1}')
rl_5h_reset=$(echo "$input" | jq -r '.rate_limits.five_hour.resets_at // 0')
rl_7d=$(echo "$input"   | jq -r '.rate_limits.seven_day.used_percentage // 0' | awk '{printf "%d", $1}')
rl_7d_reset=$(echo "$input" | jq -r '.rate_limits.seven_day.resets_at // 0')

# ── Carpeta abreviada ──────────────────────────────────────────────────────
folder="${cwd/#$HOME/~}"
folder=$(basename "$folder")
[ -z "$folder" ] && folder="~"

# ── Formato de tokens (1.2k / 3.4M) ────────────────────────────────────────
fmt_n() {
    local n=$1
    if   [ "$n" -lt 1000 ];     then echo "$n"
    elif [ "$n" -lt 1000000 ];  then LC_NUMERIC=C awk "BEGIN{printf \"%.1fk\", $n/1000}"
    else                              LC_NUMERIC=C awk "BEGIN{printf \"%.1fM\", $n/1000000}"
    fi
}
tokens_total=$((tok_in + tok_out))
tok_fmt=$(fmt_n "$tokens_total")

# ── Duración de sesión ─────────────────────────────────────────────────────
secs=$((dur_ms / 1000))
if   [ "$secs" -lt 60 ];   then dur_str="${secs}s"
elif [ "$secs" -lt 3600 ]; then dur_str="$((secs/60))m"
else                            dur_str="$((secs/3600))h$((secs%3600/60))m"
fi

# ── Tiempo hasta reset (formato "2h" / "3d 5h") ────────────────────────────
# "—" = sin ventana abierta (API no envía resets_at aún)
# "ya" = reset vencido (caso real y raro)
fmt_reset() {
    local target=$1
    local now=$(date +%s)
    if [ "$target" -le 0 ]; then echo "—"; return; fi
    local diff=$((target - now))
    if [ "$diff" -le 0 ]; then echo "ya"; return; fi
    local d=$(( diff / 86400 ))
    local h=$(( (diff % 86400) / 3600 ))
    local m=$(( (diff % 3600) / 60 ))
    if   [ "$d" -gt 0 ] && [ "$h" -gt 0 ]; then echo "${d}d ${h}h"
    elif [ "$d" -gt 0 ];                   then echo "${d}d"
    elif [ "$h" -gt 0 ] && [ "$m" -gt 0 ]; then echo "${h}h ${m}m"
    elif [ "$h" -gt 0 ];                   then echo "${h}h"
    elif [ "$m" -gt 0 ];                   then echo "${m}m"
    else                                        echo "<1m"
    fi
}
rst_5h=$(fmt_reset "$rl_5h_reset")
rst_7d=$(fmt_reset "$rl_7d_reset")

# ── Barra multicolor verde→amarillo→rojo (10 bloques, degradado continuo) ──
width=10
filled=$(( (ctx_pct * width + 50) / 100 ))
[ "$filled" -gt "$width" ] && filled=$width
bar=""
for ((i=0; i<width; i++)); do
    pos=$(( (2*i + 1) * 5 ))           # centro del bloque en %: 5, 15, 25… 95
    if [ "$pos" -le 50 ]; then
        r=$(( pos * 255 / 50 )); g=255
    else
        r=255; g=$(( (100 - pos) * 255 / 50 ))
    fi
    if [ "$i" -lt "$filled" ]; then
        # Shimmer premium: el bloque en la posición de la animación gana brillo
        if [ "$i" -eq "$anim_frame" ]; then
            br=$(( (r + 255) / 2 ))
            bg=$(( (g + 255) / 2 ))
            bar+="\033[1m\033[38;2;${br};${bg};200m█\033[22m"
        else
            bar+="\033[38;2;${r};${g};0m█"
        fi
    else
        # Traza tenue del shimmer al pasar por bloques vacíos
        if [ "$i" -eq "$anim_frame" ]; then
            bar+="\033[38;2;110;110;110m█"
        else
            bar+="\033[38;2;60;60;60m█"
        fi
    fi
done
bar+="\033[0m"

# ── Dot "live" pulsante (breathing verde, 4 frames) ────────────────────────
case "$pulse_frame" in
    0) live_dot="\033[38;2;40;170;80m●\033[0m" ;;
    1) live_dot="\033[38;2;80;215;120m●\033[0m" ;;
    2) live_dot="\033[1m\033[38;2;140;255;180m●\033[22m\033[0m" ;;
    3) live_dot="\033[38;2;80;215;120m●\033[0m" ;;
esac

# ── Rate limits con color según severidad ──────────────────────────────────
color_pct() {
    local p=$1
    if   [ "$p" -gt 85 ]; then echo "\033[1;31m"
    elif [ "$p" -gt 60 ]; then echo "\033[1;33m"
    else                        echo "\033[1;32m"
    fi
}
c5h=$(color_pct "$rl_5h")
c7d=$(color_pct "$rl_7d")
RST="\033[0m"

# ── Sentinel real ──────────────────────────────────────────────────────────
SENTINEL_SCRIPT="$HOME/.claude/skills/mcp-sentinel/hooks/sentinel_preflight.py"
SETTINGS_FILE="$HOME/.claude/settings.json"
if [ -x "$SENTINEL_SCRIPT" ] && grep -q "sentinel_preflight" "$SETTINGS_FILE" 2>/dev/null; then
    SNTL="\033[1;32mSNTL:ON\033[0m"
else
    SNTL="\033[1;31mSNTL:OFF\033[0m"
fi

# ── Salida ─────────────────────────────────────────────────────────────────
echo -e "$live_dot 📁 $folder │ 🤖 $model ($effort) │ $bar ${ctx_pct}% │ 🔢 ${tok_fmt} │ ⏱ ${dur_str} │ 📊 Ventana 5h: ${c5h}${rl_5h}%${RST} (reset en ${rst_5h}) · Semana: ${c7d}${rl_7d}%${RST} (reset en ${rst_7d}) │ 🛡 $SNTL"
