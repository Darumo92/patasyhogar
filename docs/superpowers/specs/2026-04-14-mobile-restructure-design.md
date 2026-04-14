# Reestructuración Homepage Mobile

## Problema

La homepage mobile muestra el mismo contenido que desktop sin adaptar la experiencia a las particularidades del dispositivo. Resultado: ~6 pantallas de scroll, navegación redundante (4 formas de llegar a Perros/Gatos), y secciones que compiten entre sí por atención.

## Objetivo

Reducir la homepage mobile a ~3.5 pantallas de scroll, eliminar redundancias de navegación, y optimizar el orden de secciones para maximizar clicks a artículos (donde se monetiza).

## Decisiones de diseño

- **Opción elegida:** B — Content-first con quiz como red de seguridad para indecisos
- **Principio:** La homepage es un hub de distribución de contenido, no un funnel de conversión
- **Target:** El 80%+ del tráfico llega de Google con intención específica → la homepage debe facilitar exploración, no forzar paths

## Cambios

### 1. Hero: quitar CTAs Perros/Gatos en mobile

**Qué:** Ocultar los botones `.hero-ctas` en pantallas ≤768px (donde el bottom nav ya es visible).

**Por qué:** El bottom nav permanente ya ofrece acceso directo a Perros y Gatos. Los CTAs del hero duplican esta funcionalidad y ocupan ~80px de espacio vertical en mobile.

**Cómo:** CSS-only. Añadir `display: none` a `.hero-ctas` dentro de `@media (max-width: 768px)`.

**Impacto en desktop:** Ninguno. Los CTAs siguen visibles en desktop donde no hay bottom nav.

### 2. Artículos: reducir de 6 a 4 en mobile

**Qué:** Mostrar solo 4 article cards en la homepage mobile, manteniendo 6 en desktop.

**Por qué:** 6 cards a 1 columna = ~2100px de scroll. 4 cards = ~1400px. El enlace "Ver todas →" ya existe para explorar más.

**Cómo:** CSS-only. Ocultar el 5º y 6º card con `display: none` en el grid a ≤768px usando `:nth-child(n+5)`.

### 3. Guías: reducir de 6 a 3 en mobile

**Qué:** Mostrar solo 3 guide cards en la homepage mobile, manteniendo 6 en desktop.

**Por qué:** Las guías son contenido secundario. 3 muestran variedad suficiente. El enlace "Ver todas →" ya existe.

**Cómo:** CSS-only. Ocultar a partir del 4º guide card con `:nth-child(n+4)` en `@media (max-width: 768px)`.

### 4. Newsletter: mover al footer en mobile

**Qué:** Ocultar la sección newsletter standalone en mobile. Opcionalmente añadir un CTA simple en el footer.

**Por qué:** La conversión de newsletter en mobile es muy baja. La sección ocupa ~200px de espacio vertical valioso.

**Cómo:** CSS-only. `display: none` en `.newsletter` dentro de `@media (max-width: 768px)`. El footer ya tiene espacio para un eventual link de suscripción.

### 5. Quiz banner: mantener posición actual

**Qué:** El quiz banner ya está en la posición correcta (entre comparativas y guías) en el HTML actual del `index.astro`.

**Por qué:** Actúa como "red de seguridad" — usuarios que scrollean las comparativas sin hacer click probablemente están indecisos, y el quiz les ofrece ayuda personalizada.

**Cómo:** Sin cambios. La posición actual en el HTML ya es la de la opción B.

## Orden resultante en mobile

1. Header (sticky)
2. Hero compacto (título + subtítulo, sin CTAs)
3. Artículo destacado
4. Categorías (2 cols, ya implementado)
5. 4 últimas comparativas + "Ver todas →"
6. Quiz banner
7. 3 guías de cuidados + "Ver todas →"
8. Footer
9. Bottom nav (sticky)

## Orden en desktop (sin cambios)

1. Header (sticky)
2. Hero (título + subtítulo + CTAs Perros/Gatos)
3. Artículo destacado
4. Categorías (5 cols)
5. 6 últimas comparativas
6. Quiz banner
7. 6 guías de cuidados
8. Newsletter
9. Footer

## Archivos afectados

| Archivo | Cambio | Tipo |
|---------|--------|------|
| `src/styles/global.css` | Media queries para ocultar hero CTAs, limitar cards, ocultar newsletter | CSS-only |

## Lo que NO se toca

- **HTML de `index.astro`**: No se modifica. Todos los cambios son CSS-only con media queries, así desktop queda idéntico.
- **Orden de secciones**: El HTML ya tiene el quiz en la posición correcta.
- **Componentes**: Sin cambios a ArticleCard, QuizHomeBanner, etc.
- **Páginas internas**: Solo afecta la homepage.

## Riesgos

- **SEO**: Ocultar contenido con CSS (`display: none`) no afecta al crawl — Google indexa el HTML completo, no el render mobile. El contenido sigue en el DOM.
- **Accesibilidad**: Los elementos ocultos con `display: none` no son leídos por screen readers, lo cual es correcto (no queremos que lean contenido que no se muestra).
