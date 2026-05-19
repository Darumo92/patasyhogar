# UI Polish & Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pulir la experiencia visual de patasyhogar.com aplicando principios de design engineering (Emil Kowalski): feedback tactil, curvas de easing profesionales, transiciones especificas, y microinteracciones que hacen la web "sentirse bien".

**Architecture:** Todos los cambios son puramente CSS en `src/styles/global.css`, con dos cambios menores en `src/components/Header.astro` (dark mode transition) y `src/components/ScrollReveal.astro` (mejora de reveal). No se anade JavaScript nuevo ni dependencias. Se trabaja siempre con propiedades GPU-accelerated (`transform`, `opacity`, `filter`) para mantener 60fps.

**Tech Stack:** Astro 5, CSS puro con custom properties, sin frameworks JS.

---

### Task 1: Design tokens de animacion

Anadir custom properties para easing curves profesionales y duraciones estandarizadas al `:root` de `global.css`. Estos tokens se reutilizan en todas las tareas siguientes.

**Files:**
- Modify: `src/styles/global.css:45-83` (bloque `:root`)

- [ ] **Step 1: Anadir tokens de easing y duracion al `:root`**

En `src/styles/global.css`, justo despues de `--transition: 0.2s ease;` (linea 80), anadir:

```css
  /* Animation tokens (Emil Kowalski design engineering) */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);

  --duration-instant: 100ms;
  --duration-fast: 160ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
```

- [ ] **Step 2: Actualizar `--transition` para usar la nueva curva**

Cambiar la linea 80:

```css
/* Antes */
--transition: 0.2s ease;

/* Despues */
--transition: 200ms var(--ease-out);
```

- [ ] **Step 3: Verificar que el build compila**

Run: `npm run build`
Expected: Build exitoso sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(css): add animation design tokens — custom easing curves and standardized durations"
```

---

### Task 2: Eliminar `transition: all` — especificar propiedades exactas

`transition: all` anima propiedades innecesarias (width, padding, margin, color de borde, etc.), causando layout thrashing y efectos inesperados. Cada instancia se reemplaza con las propiedades exactas que realmente cambian en hover/active.

**Files:**
- Modify: `src/styles/global.css` (8 lineas)

- [ ] **Step 1: `.nav-link` (linea 294)**

```css
/* Antes */
transition: all var(--transition);

/* Despues */
transition: background-color var(--transition), color var(--transition);
```

- [ ] **Step 2: `.hero-cta-btn` (linea 473)**

```css
/* Antes */
transition: all 0.25s ease;

/* Despues */
transition: background-color var(--duration-normal) var(--ease-out), transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal) var(--ease-out);
```

- [ ] **Step 3: `.seasonal-item` (linea 543)**

```css
/* Antes */
transition: all 0.2s ease;

/* Despues */
transition: box-shadow var(--duration-normal) var(--ease-out), border-color var(--duration-normal) var(--ease-out), transform var(--duration-normal) var(--ease-out);
```

- [ ] **Step 4: `.category-card` (linea 694)**

```css
/* Antes */
transition: all 0.25s ease, background-color 0.3s ease;

/* Despues */
transition: border-color var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal) var(--ease-out), transform var(--duration-normal) var(--ease-out), background-color var(--duration-slow) var(--ease-out);
```

- [ ] **Step 5: `.category-icon` (linea 724)**

```css
/* Antes */
transition: all 0.3s ease;

/* Despues */
transition: background-color var(--duration-slow) var(--ease-out), color var(--duration-slow) var(--ease-out), transform var(--duration-normal) var(--ease-out);
```

- [ ] **Step 6: `.article-card` (linea 755)**

```css
/* Antes */
transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s ease;

/* Despues */
transition: box-shadow var(--duration-slow) var(--ease-out), transform var(--duration-slow) var(--ease-out), border-color var(--duration-slow) var(--ease-out), background-color var(--duration-slow) var(--ease-out);
```

- [ ] **Step 7: `.affiliate-button` (linea 1084)**

```css
/* Antes */
transition: all 0.25s ease;

/* Despues */
transition: background-color var(--duration-normal) var(--ease-out), transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-normal) var(--ease-out);
```

- [ ] **Step 8: `.nav-dropdown-item` (linea 1759)**

```css
/* Antes */
transition: all var(--transition);

/* Despues */
transition: background-color var(--transition), color var(--transition);
```

- [ ] **Step 9: Verificar build**

Run: `npm run build`
Expected: Build exitoso sin errores.

- [ ] **Step 10: Commit**

```bash
git add src/styles/global.css
git commit -m "fix(css): replace transition:all with specific properties — better performance, no layout thrashing"
```

---

### Task 3: Feedback tactil — estados `:active` en todos los elementos interactivos

Los botones deben responder al pulsar. Anadir `transform: scale(0.97)` en `:active` a todos los elementos clicables: botones CTA, article cards, category cards, hero buttons, seasonal items. Esto da feedback instantaneo, especialmente notable en movil.

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: `.hero-cta-btn:active` (despues de los estilos hover, ~linea 498)**

Anadir despues de `.hero-cta-cat:hover`:

```css
.hero-cta-btn:active {
  transform: scale(0.97);
  box-shadow: none;
}
```

- [ ] **Step 2: `.category-card:active` (despues de `.category-card:hover`, ~linea 703)**

```css
.category-card:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-sm);
}
```

- [ ] **Step 3: `.article-card:active` (despues de `.article-card:hover`, ~linea 764)**

```css
.article-card:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-sm);
}
```

- [ ] **Step 4: `.seasonal-item:active` (despues de `.seasonal-item:hover`, ~linea 551)**

```css
.seasonal-item:active {
  transform: scale(0.98);
  box-shadow: none;
}
```

- [ ] **Step 5: `.affiliate-button:active` (despues de `.affiliate-button:hover`, ~linea 1095)**

```css
.affiliate-button:active {
  transform: scale(0.95);
  box-shadow: none;
}
```

- [ ] **Step 6: `.trust-card:active` (despues de `.trust-card:hover`, ~linea 1856)**

```css
.trust-card:active {
  transform: scale(0.98);
  box-shadow: none;
}
```

- [ ] **Step 7: Mejorar `.bottom-nav-item` (sustituir regla existente linea 1935-1938)**

```css
/* Antes */
.bottom-nav-item:hover,
.bottom-nav-item:active {
  color: var(--color-primary);
}

/* Despues */
.bottom-nav-item:hover {
  color: var(--color-primary);
}

.bottom-nav-item:active {
  color: var(--color-primary);
  transform: scale(0.92);
}
```

Tambien anadir `transition: color var(--duration-fast) var(--ease-out), transform var(--duration-instant) var(--ease-out);` a `.bottom-nav-item` (reemplazando `transition: color 0.2s ease;` en linea 1931).

- [ ] **Step 8: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 9: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(css): add :active press feedback to all interactive elements — scale(0.97) for tactile response"
```

---

### Task 4: Mejorar easing de transiciones existentes

Actualizar las transiciones que usan `ease` generico a las curvas custom definidas en Task 1. Esto hace que todo se sienta mas "punchy" e intencional.

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: `.article-card-image img` (linea 786)**

```css
/* Antes */
transition: transform 0.4s ease;

/* Despues */
transition: transform var(--duration-slow) var(--ease-out);
```

- [ ] **Step 2: `.article-card-link` (linea 881)**

```css
/* Antes */
transition: transform 0.2s ease;

/* Despues */
transition: transform var(--duration-fast) var(--ease-out);
```

- [ ] **Step 3: `.logo-svg` (linea 266)**

```css
/* Antes */
transition: transform 0.3s ease;

/* Despues */
transition: transform var(--duration-slow) var(--ease-out-back);
```

Nota: `ease-out-back` da un ligero overshoot al logo (rotacion -8deg + scale 1.1), haciendolo sentir mas jugueton — apropiado para una marca de mascotas.

- [ ] **Step 4: `.hamburger-icon span` (linea 1648)**

```css
/* Antes */
transition: transform 0.25s ease, opacity 0.25s ease;

/* Despues */
transition: transform var(--duration-normal) var(--ease-out), opacity var(--duration-normal) var(--ease-out);
```

- [ ] **Step 5: `.seasonal-arrow` (linea 584)**

```css
/* Antes */
transition: transform 0.2s;

/* Despues */
transition: transform var(--duration-fast) var(--ease-out);
```

- [ ] **Step 6: `.header` (linea 230)**

```css
/* Antes */
transition: background-color 0.3s ease, border-color 0.3s ease;

/* Despues */
transition: background-color var(--duration-slow) var(--ease-out), border-color var(--duration-slow) var(--ease-out);
```

- [ ] **Step 7: `.trust-card` (linea 1850)**

```css
/* Antes */
transition: transform 0.2s ease, box-shadow 0.2s ease;

/* Despues */
transition: transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal) var(--ease-out);
```

- [ ] **Step 8: `.logo` (linea 249)**

```css
/* Antes */
transition: opacity 0.2s ease;

/* Despues */
transition: opacity var(--duration-normal) var(--ease-out);
```

- [ ] **Step 9: `.skip-link` (linea 214)**

```css
/* Antes */
transition: top 0.2s;

/* Despues */
transition: top var(--duration-normal) var(--ease-out);
```

- [ ] **Step 10: `.theme-toggle` (linea 1617)**

Buscar la transition de `.theme-toggle` y actualizar:

```css
/* Antes */
transition: background var(--transition);

/* Despues */
transition: background-color var(--transition);
```

- [ ] **Step 11: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 12: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(css): upgrade all easings to custom curves — punchier, more intentional transitions"
```

---

### Task 5: Scroll reveal mejorado

Mejorar la animacion de scroll reveal para usar la curva custom y reducir la distancia de translateY (20px es un poco agresivo; 12px es mas sutil y profesional).

**Files:**
- Modify: `src/styles/global.css:1957-2002` (seccion SCROLL REVEAL ANIMATIONS)

- [ ] **Step 1: Actualizar keyframes de reveal**

```css
/* Antes */
@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Despues */
@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- [ ] **Step 2: Actualizar easing de la animacion**

```css
/* Antes */
.reveal.revealed {
  animation: reveal-up 0.5s ease forwards;
}

/* Despues */
.reveal.revealed {
  animation: reveal-up 0.4s var(--ease-out) forwards;
}
```

- [ ] **Step 3: Actualizar reveal-group tambien**

```css
/* Antes */
.reveal-group.revealed > * {
  animation: reveal-up 0.5s ease forwards;
}

/* Despues */
.reveal-group.revealed > * {
  animation: reveal-up 0.4s var(--ease-out) forwards;
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(css): refine scroll reveal — subtler 12px travel, custom easing, faster 400ms"
```

---

### Task 6: Transicion suave de dark mode

Actualmente el cambio de tema es instantaneo (flash). Anadir una transicion CSS al `<html>` para suavizar el cambio de colores.

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/Header.astro:228-241` (theme toggle JS)

- [ ] **Step 1: Anadir clase de transicion en CSS**

Anadir al final de la seccion `:root` (despues de la linea 83, antes de `[data-theme="dark"]`):

```css
html.theme-transitioning,
html.theme-transitioning *,
html.theme-transitioning *::before,
html.theme-transitioning *::after {
  transition: background-color 300ms var(--ease-out), color 300ms var(--ease-out), border-color 300ms var(--ease-out), box-shadow 300ms var(--ease-out) !important;
}
```

- [ ] **Step 2: Activar la clase durante el toggle en Header.astro**

En `src/components/Header.astro`, reemplazar el bloque de dark mode (~lineas 228-241):

```javascript
// Antes
const themeBtn = document.getElementById('theme-toggle');
themeBtn?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const metaTheme = document.getElementById('meta-theme-color');
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    if (metaTheme) metaTheme.setAttribute('content', '#2d6a4f');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    if (metaTheme) metaTheme.setAttribute('content', '#121220');
  }
});

// Despues
const themeBtn = document.getElementById('theme-toggle');
themeBtn?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const metaTheme = document.getElementById('meta-theme-color');
  document.documentElement.classList.add('theme-transitioning');
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    if (metaTheme) metaTheme.setAttribute('content', '#2d6a4f');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    if (metaTheme) metaTheme.setAttribute('content', '#121220');
  }
  setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 300);
});
```

Nota: La clase se anade ANTES de cambiar el tema y se quita despues de 300ms. Esto evita que la transicion afecte a otras interacciones (hover, scroll) cuando no se esta cambiando de tema.

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: Build exitoso. Notar que los CSP hashes se actualizan automaticamente.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/components/Header.astro
git commit -m "feat: smooth dark mode transition — 300ms crossfade on theme toggle"
```

---

### Task 7: Focus states accesibles y visibles

Mejorar los focus outlines para navegacion por teclado. El outline actual es el default del navegador, que es inconsistente y a veces invisible.

**Files:**
- Modify: `src/styles/global.css` (seccion base styles, ~linea 130-170)

- [ ] **Step 1: Anadir focus-visible global**

Anadir despues de la seccion de links (despues de `a:hover`, ~linea 145):

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

:focus:not(:focus-visible) {
  outline: none;
}
```

- [ ] **Step 2: Focus especifico para botones de afiliado**

Anadir despues de `.affiliate-button:active` (Task 3):

```css
.affiliate-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}
```

- [ ] **Step 3: Focus para article cards**

Anadir despues de `.article-card:active` (Task 3):

```css
.article-card:focus-within {
  box-shadow: 0 0 0 2px var(--color-primary);
  border-color: var(--color-primary);
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css
git commit -m "a11y(css): add visible focus-visible states for keyboard navigation"
```

---

### Task 8: Microinteracciones de ComparisonTable

Mejorar la interactividad de las filas de producto en la tabla comparativa. Las filas deben dar feedback visual al hacer hover.

**Files:**
- Modify: `src/components/ComparisonTable.astro`

- [ ] **Step 1: Leer el componente actual**

Run: leer `src/components/ComparisonTable.astro` para localizar los estilos inline del componente.

- [ ] **Step 2: Anadir hover sutil a filas de producto**

En la seccion `<style>` del componente, buscar `.comparison-product` y anadir/modificar:

```css
.comparison-product {
  transition: background-color var(--duration-normal, 200ms) var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1));
}

.comparison-product:hover {
  background-color: color-mix(in srgb, var(--color-primary, #2d6a4f) 3%, transparent);
}
```

Nota: Se usan fallbacks en `var()` porque los estilos del componente no tienen acceso garantizado a las custom properties si se renderizan en aislamiento.

- [ ] **Step 3: Anadir `:active` a botones de ordenar**

Buscar `.sort-btn` en los estilos del componente y anadir:

```css
.sort-btn:active {
  transform: scale(0.95);
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 5: Commit**

```bash
git add src/components/ComparisonTable.astro
git commit -m "feat(ComparisonTable): add hover feedback on product rows and active state on sort buttons"
```

---

### Task 9: Pulido del TopPick

Mejorar el componente de producto destacado con un hover sutil y `:active` feedback.

**Files:**
- Modify: `src/components/TopPick.astro`

- [ ] **Step 1: Leer el componente actual**

Run: leer `src/components/TopPick.astro` para localizar los estilos.

- [ ] **Step 2: Anadir hover elevation al contenedor**

En la seccion `<style>` del componente, buscar `.top-pick` y anadir transition + hover:

```css
.top-pick {
  transition: box-shadow var(--duration-slow, 300ms) var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1));
}

.top-pick:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.06);
}
```

- [ ] **Step 3: Anadir hover de imagen de producto**

```css
.top-pick-image img {
  transition: transform var(--duration-slow, 300ms) var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1));
}

.top-pick:hover .top-pick-image img {
  transform: scale(1.03);
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: Build exitoso.

- [ ] **Step 5: Commit**

```bash
git add src/components/TopPick.astro
git commit -m "feat(TopPick): add hover elevation and subtle image zoom"
```

---

### Task 10: Verificacion final y limpieza

Verificar que todas las transiciones son coherentes, el build compila, y no hay regresiones visuales.

**Files:**
- Read: `src/styles/global.css` (verificar coherencia)

- [ ] **Step 1: Buscar `transition: all` residuales**

Run: `grep -n "transition: all" src/styles/global.css`
Expected: 0 resultados. Si hay alguno, corregirlo.

- [ ] **Step 2: Buscar easings genericos `ease;` (sin custom)**

Run: `grep -n "ease;" src/styles/global.css | grep -v "ease-out\|ease-in\|ease-out-back\|cubic-bezier\|--ease"`
Expected: Solo deben quedar los `ease` que estan dentro de keyframes o que son intencionales (ej: `color-scheme`). Corregir cualquier `ease;` suelto a `var(--ease-out)`.

- [ ] **Step 3: Build final completo**

Run: `npm run build`
Expected: Build exitoso. Los CSP hashes se actualizan automaticamente.

- [ ] **Step 4: Verificacion visual**

Run: `npx astro dev` y abrir en navegador. Verificar:
- Homepage: hover en article cards, category cards, hero buttons
- Articulo: hover en affiliate buttons, tabla comparativa, TopPick
- Dark mode: transicion suave al cambiar tema
- Movil: `:active` feedback en todos los botones y cards
- Teclado: focus-visible outlines visibles y consistentes

- [ ] **Step 5: Commit final si hubo correcciones**

```bash
git add src/styles/global.css
git commit -m "chore: final cleanup — consistent easing tokens across all transitions"
```
