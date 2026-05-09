---
name: SEO Freeze 2026-04-27 — 0 commits sin permiso explícito
description: Regla activa hasta 2026-05-11 mínimo. NO commits al repo patasyhogar salvo permiso explícito. Cualquier cambio = empeora discovery throttling.
type: feedback
originSessionId: be10b137-616f-44c6-a8cb-15a0c735caab
---
Durante Fase A (2026-04-27 → 2026-05-11): 0 commits patasyhogar.com salvo permiso explícito usuario.

**Why:** Sitio en discovery throttling Google. Auditoría 2026-04-27 confirmó que >600 commits/46 días + redirects masivos + recategorizaciones = signal "site instability" que dispara low-value classification. Cada commit nuevo resetea timer estabilidad. Ningún fix técnico vale el coste.

**How to apply:**
- Si usuario pide "arreglar X" en sitio → recordar fase activa + pedir confirmación explícita antes de tocar
- Si propones tú mejora técnica → STOP. Anotar en project memory para Fase C+.
- Excepciones permitidas Fase A ya consumidas (commit 74cf99e restaurar hubs sitemap)
- Documentación pura (memory files ~/.claude) NO cuenta como commit. Sí permitida.
- PLAN_INDEXACION.md en repo SÍ cuenta (trigger Cloudflare Pages rebuild). Evitar tocar.
- Fase B (desde 2026-05-11) permite 1 commit único (Person sameAs LinkedIn) si verificas perfil
- Fase C (desde 2026-06-08) permite cadencia semanal limitada (1 comparativa + 1 informativo + 1 pillar audit)

**Cómo identificar fase actual:** ver project_seo_daily_routine.md → comparar fecha hoy con calendario fases.
