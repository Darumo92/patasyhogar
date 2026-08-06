# Regla: Revisión exhaustiva de artículos nuevos o modificados

**Confirmada:** 2026-08-06

## Regla

Cada vez que se cree un artículo nuevo o se modifique uno existente, se DEBE hacer una revisión completa antes de darlo por bueno. **No se considera terminado hasta que TODO esté verificado.**

## Checklist obligatorio de revisión (sobre el HTML built en `dist/`)

Ejecutar estos checks con bash después de `npm run build`:

```bash
HTML="dist/cuidados/[slug]/index.html"

# 1. Título ≤ 60 chars
echo "1. TÍTULO:" $(grep -oP '<title>\K[^<]+' "$HTML" | wc -c) "chars"

# 2. Meta description ≤ 155 chars
echo "2. META:" $(grep -oP '<meta name="description" content="\K[^"]+' "$HTML" | wc -c) "chars"

# 3. Canonical correcto
echo "3. CANONICAL:" $(grep -oP '<link rel="canonical" href="\K[^"]+' "$HTML")

# 4. Schema types
echo "4. SCHEMA:"
grep -oP '"@type":\s*"\K[^"]+' "$HTML" | sort | uniq -c | sort -rn

# 5. FAQ Questions y Answers
echo "5. FAQ:" $(grep -o '"@type":"Question"' "$HTML" | wc -l) "Q," $(grep -o '"@type":"Answer"' "$HTML" | wc -l) "A"

# 6. H2 en formato pregunta para GEO (mín. 1-2)
echo "6. H2 questions:"
grep -oP '<h2[^>]*>\K[^<]+' "$HTML" | grep -E '^\?|^¿'

# 7. Imagen hero: alt, width/height, existe
echo "7. IMAGEN HERO:"
grep -oP 'alt="[^"]*' "$HTML" | head -1
grep -oP 'width="[^"]+' "$HTML" | head -1
grep -oP 'height="[^"]+' "$HTML" | head -1

# 8. Disclaimer afiliados en artículo (0 para informativos)
echo "8. DISCLAIMER:" $(grep -c "Transparencia:" "$HTML") "(=0 correcto para informativo)"

# 9. No noindex/nofollow
echo "9. INDEXING:" $(grep -o 'noindex\|nofollow' "$HTML" || echo "OK")

# 10. Internal links relevantes
echo "10. INTERNAL LINKS:"
grep -oP 'href="/[^"]*' "$HTML" | grep -E '(cuidados|hogar|alimentacion|higiene|paseo|juguetes)' | sort -u

# 11. Breadcrumb
echo "11. BREADCRUMB:"
grep -oP '"BreadcrumbList".*' "$HTML" | grep -oP '"name":"\K[^"]+' | tr '\n' ' › '
echo ""

# 12. Open Graph
echo "12. OG:" $(grep -oP '<meta property="og:image" content="\K[^"]+' "$HTML")

# 13. Author
echo "13. AUTHOR:" $(grep -oP '"author":\s*\{[^}]*"name":"\K[^"]+' "$HTML")

# 14. Tags y keywords
echo "14. TAGS:" $(grep -oP '"keywords":"\K[^"]+' "$HTML")

# 15. Imagen existe en disco
IMG=$(grep -oP 'src="(/images/[^"]*)"' "$HTML" | head -1 | grep -oP '/images/[^"]+')
echo "15. IMG exists:" $(ls -la "public$IMG" 2>/dev/null && echo "OK" || echo "MISSING")
```

## Reglas adicionales

- **Artículos `tipo: informativo`**: no deben mostrar disclaimer de afiliados en AuthorBox ni en el artículo. Verificar que `AuthorBox` recibe `esInformativo={true}`.
- **Imágenes Pexels**: descargar antes del build, verificar alt text coincide con la foto real.
- **SERP**: usar Playwright + KW Surfer para buscar keyword principal + variantes + PAA antes de escribir.
- **Si Playwright no puede acceder a localhost**, revisar sobre el HTML built en `dist/` ya que eso es lo que se despliega.

## Proceso

1. Escribir/editar MDX
2. `npm run build`
3. Ejecutar checklist completo sobre HTML built
4. Corregir issues encontrados
5. Rebuild y re-verificar
6. Solo entonces marcar como completado
