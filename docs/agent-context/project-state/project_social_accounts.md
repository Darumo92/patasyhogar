# Social Accounts & Channels (Patas y Hogar)

Cuentas activas, perfiles y canales evaluados.

Última actualización: 2026-05-19 CEST

---

## Pinterest

- **URL perfil:** https://www.pinterest.com/patasyhogar/
- **Tipo:** Business account (gratis)
- **Email:** contacto@patasyhogar.com
- **Verificación dominio:** completada via DNS TXT en Cloudflare
  - Registro TXT: `pinterest-site-verification=893b63f38a557656d114459afe5c2ee2`
- **Meta tag verificación:** añadido en `src/layouts/Base.astro`
  ```html
  <meta name="p:domain_verify" content="893b63f38a557656d114459afe5c2ee2" />
  ```
- **sameAs en schemas:** añadido en Organization (index), Person (sobre-mi + Article), publisher (Article). Commit 75288d0.

### Tableros (5)
| # | Nombre | Descripción |
|---|--------|-------------|
| 1 | Cuidado de perros | Guías, trucos y consejos para cuidar a tu perro: alimentación, higiene, paseos, salud y bienestar |
| 2 | Cuidado de gatos | Todo sobre gatos: alimentación, arena, areneros, fuentes de agua, juguetes y cuidados en casa |
| 3 | Comida para mascotas | Comparativas de pienso, comida húmeda, snacks y fuentes para perros y gatos |
| 4 | Juguetes y enriquecimiento | Juguetes mentales, alfombras olfato, rascadores y accesorios |
| 5 | Paseo y viaje con mascotas | Arneses, correas, transportines, GPS y accesorios de coche |

### Generación de pines
- Script: `scripts/generate-pin.mjs` (1 pin) y `scripts/generate-pins-batch.mjs` (batch)
- Formato: 1000×1500 PNG, hero image con overlay oscuro + título + `patasyhogar.com`
- Sharp compone el SVG con el hero WebP del artículo.

### Estado tráfico (2026-04-22)
- **0 impresiones** tras primeras 24-48h. Normal: sandbox cuenta nueva Pinterest (2-4 semanas).
- Rich Pins se auto-activan con OG tags correctos (ya los tenemos). Pinterest retiró debugger público 2024.
- Claim dominio toma 24-72h adicionales tras verificación DNS.

### Plan Pinterest
- **No** subir 10 pines de golpe y abandonar. Postea **2-3/día consistente** para evitar flag abandono.
- Follow 20-30 cuentas grandes del nicho (perros, gatos, hogar, mascotas).
- Repinea 5-10 pines ajenos relevantes/día.
- Comenta 3-5 pines ajenos/día.
- Esperar 2-6 semanas para primer tráfico real.

---

## Reddit

- **Usuario:** u/Pristine_Review5630
- **URL perfil:** https://www.reddit.com/user/Pristine_Review5630/
- **Email:** contacto@patasyhogar.com
- **Verificación email:** sí
- **Estado:** sin shadowban
- **Creada:** 2026-04-20
- **Nombre mostrar:** "Daniel (patasyhogar)"
- **Bio:** "Daniel, desde Valencia. Vivo con Kira (mestiza adoptada) y Mango (gato naranja). Escribo sobre productos y cuidados de mascotas."
- **Avatar:** logo verde patasyhogar (favicon-512.png)
- **Enlaces redes sociales:** Pinterest + patasyhogar.com
- **Subs unidos:** r/gatos, r/mascotas, r/AdoptaUnPerro, r/espanol, r/AskEspanol, r/Valencia

---

## Medium

- **Cuenta:** https://medium.com/@patasyhogar
- **Estado:** iniciado 2026-05-13
- **Regla:** usar import/canonical o canonical manual hacia patasyhogar.com. Evitar comparativas afiliadas puras; priorizar informativos y piezas editoriales.

---

## Quora ES

- **Cuenta:** creada 2026-05-11 con identidad editorial Patas y Hogar
- **Credencial usada:** "Redacción de Patas y Hogar sobre perros y gatos"
- **Estado:** iniciado
- **Regla cuenta nueva:** primeras 1-2 respuestas sin enlace para evitar patrón promocional
- **Nofollow pero Google indexa + tráfico referral**

---

## Subs ES mascotas activos

- r/mascotas (~ES+LATAM mixto, más fotos que text)
- r/GatosArgentinos (más activo, text posts frecuentes)
- r/AdoptaUnPerro
- r/Dogtraining_Spanish
- r/Valencia (local, uso futuro)

## Subs no-útiles (muertos/fotos only)

- r/perros: baneado por unmoderated
- r/gatos: portugués (no ES)
- r/espanol / r/AskEspanol: casi nada de mascotas

---

## Canales descartados

- LinkedIn: descartado. El usuario no tiene ni tendrá este canal para Patas y Hogar.
- Comentarios blogs mascotas ES: descartado. No proponer prospección ni comentarios en blogs.
- Foros: no proponer por defecto; solo si el usuario lo pide.
- Grupos Facebook ES mascotas: sin backlink SEO. Tráfico directo si se referencia sitio. Prioridad baja.

### Foros evaluados y descartados
- mundoanimalia.com → ahora es marketplace, no foro
- mascotadomestica.com → blog WordPress sin foro
- mascotalia.com → caído
- foro.mascotaking.com → caído
- animalesmascotas.com → blog sin foro
