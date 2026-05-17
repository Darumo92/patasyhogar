---
name: Usar skills (humanizer, etc.) antes de presentar borradores publicables
description: Siempre leer y aplicar skills relevantes (humanizer, tone-guide, humanization-guide) ANTES de presentar cualquier texto destinado a publicación. No esperar a que el usuario lo pida.
type: feedback
originSessionId: opencode-2026-05-17
---

# Regla: aplicar skills antes de presentar borradores

Antes de presentar al usuario CUALQUIER texto destinado a publicación (comentarios Reddit, respuestas Quora, artículos Medium, posts propios, captions, etc.), aplicar las herramientas de humanización y tono del proyecto.

## Skills y archivos obligatorios

1. **Skill `humanizer`** — catálogo de 29 patrones IA a evitar. Leer antes de humanizar.
2. **`.seo-engine/templates/humanization-guide.md`** — patrones específicos del proyecto: persona del autor, coherencia Mango/Kira, experiencia personal, variación de intros, asimetría de listas, fórmulas de honestidad.
3. **`.seo-engine/templates/tone-guide.md`** — reglas de tono y voz del proyecto.
4. **`feedback_reddit_coherencia_replies.md`** — para replies Reddit específicamente.
5. **`feedback_reddit_humano.md`** — sin paréntesis aclaratorios tipo "(gato naranja, 5 años)".

## Cómo aplicar

1. Redactar borrador.
2. Leer los archivos anteriores.
3. Hacer audit anti-IA: "¿qué hace que esto suene IA?" → corregir tells.
4. Aplicar reglas específicas del proyecto (persona, coherencia, tono Reddit vs Quora vs Medium).
5. Presentar versión final humanizada al usuario.

## Por qué

El usuario tuvo que pedir explícitamente que se usaran las skills. El AGENTS.md ya dice "Antes de presentar al usuario cualquier texto destinado a publicación, aplicar la guía de humanización", pero en la práctica se saltó este paso en el borrador del reply Reddit. Esta feedback refuerza que las skills deben aplicarse proactivamente, no solo cuando el usuario lo recuerde.