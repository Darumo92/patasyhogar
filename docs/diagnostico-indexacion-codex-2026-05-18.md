# Diagnostico de indexacion — patasyhogar.com

**Fecha:** 2026-05-18  
**Autor:** Codex  
**Propiedad GSC:** `sc-domain:patasyhogar.com`  
**Contexto:** revision del problema "Rastreada: actualmente sin indexar" y contraste con el informe de opencode en `docs/diagnostico-indexacion-patasyhogar-2026-05-18.md`.

---

## Resumen ejecutivo

Google Search Console confirma que varias URLs finales y validas del sitio estan en estado **"Crawled - currently not indexed"**. En las URLs inspeccionadas, Google puede rastrear correctamente, robots.txt permite el acceso, no hay `noindex`, el canonical declarado coincide con el canonical elegido por Google y el fetch es correcto en mobile.

Mi diagnostico: el problema principal no parece tecnico de acceso, canonical o robots. Es un problema de **priorizacion de indexacion** en un sitio relativamente nuevo, con muchas URLs publicadas/consolidadas en poco tiempo, autoridad externa baja, senales internas debiles hacia paginas importantes y bastante ruido historico de URLs antiguas (`/comportamiento/`, `/descanso/`, tags, `www`, variantes sin trailing slash).

El informe de opencode acierta al detectar autoridad baja, enlazado interno debil y ruido de URLs antiguas. Sin embargo, no comparto su conclusion de que `Cache-Control: public, max-age=0, must-revalidate` sea el detonante principal de la no indexacion. Ese header es mejorable, pero no es una senal SEO suficiente para explicar que Google rastree y no indexe.

---

## Posicion sobre el informe de opencode

### Puntos con los que estoy de acuerdo

- Hay pocas senales externas y poco historico organico.
- El enlazado interno hacia pillars y URLs estrategicas es insuficiente.
- Google ha descubierto URLs antiguas o no finales que ensucian el rastreo.
- Las URLs finales importantes deben reforzarse antes de pedir una nueva validacion.
- Hay que vigilar el desfase entre sitemap vivo y datos de GSC.

### Puntos que matizaria o corregiria

1. **`Cache-Control: max-age=0` no deberia tratarse como causa principal.**  
   Muchos sitios indexados sirven HTML con `max-age=0`, `no-cache` o revalidacion. Puede cambiarse por rendimiento/cache, pero no lo pondria como accion critica de indexacion.

2. **Las URLs `/tags/[tag]/` no parecen servir 200 actualmente.**  
   Al comprobar `https://patasyhogar.com/tags/alimentacion-gatito/`, devuelve `301` hacia `/articulos/`. La afirmacion de que renderiza `/articulos/` con 200 probablemente viene de seguir la redireccion con `curl -L` y analizar la pagina final.

3. **No reindexaria URLs con redirect.**  
   Por ejemplo, `/higiene/pipeta-antiparasitaria-gatos/` no debe solicitarse a indexacion. Se debe inspeccionar y reindexar el destino final: `/higiene/mejor-antiparasitario-gatos-guia/`.

4. **`/articulos/` no es una URL SEO prioritaria.**  
   Puede estar indexable, pero no deberia consumir prioridad frente a pillars, categorias y articulos con impresiones.

---

## Evidencia GSC observada

| URL | Estado GSC | Ultimo rastreo | Robots | Fetch | Canonical usuario | Canonical Google | Referring URLs GSC | Diagnostico |
|---|---|---:|---|---|---|---|---|---|
| `/` | Submitted and indexed | 2026-05-17 | Allowed | Successful | `/` | `/` | `/alimentacion/`, `http://patasyhogar.com/` | Correcta e indexada |
| `/alimentacion/` | Crawled - currently not indexed | 2026-04-14 | Allowed | Successful | `/alimentacion/` | `/alimentacion/` | `/higiene/mejor-secador-perros/` | Categoria valida, baja prioridad |
| `/articulos/` | Crawled - currently not indexed | 2026-04-14 | Allowed | Successful | `/articulos/` | `/articulos/` | `/alimentacion/`, URL antigua `/comportamiento/...` | Listado general, no prioritario |
| `/cuidados/guia-alimentacion-perros/` | Crawled - currently not indexed | 2026-04-15 | Allowed | Successful | misma URL | misma URL | no devuelto | Pillar importante con senal interna insuficiente |
| `/cuidados/guia-completa-alimentacion-gatos/` | Crawled - currently not indexed | 2026-04-15 | Allowed | Successful | misma URL | misma URL | `/` | Pillar importante con poco enlazado |
| `/cuidados/guia-completa-higiene-grooming-perros/` | Crawled - currently not indexed | 2026-04-12 | Allowed | Successful | misma URL | misma URL | `/`, `/articulos/` | Pillar valida, necesita mas enlaces contextuales |
| `/higiene/mejor-arenero-autolimpiable-gatos/` | Crawled - currently not indexed | 2026-04-27 | Allowed | Successful | misma URL | misma URL | `/` | Comparativa valida, posible solapamiento con guia general de areneros |
| `/alimentacion/mejor-pienso-perro-raza-pequena/` | Crawled - currently not indexed | 2026-04-27 | Allowed | Successful | misma URL | misma URL | `/alimentacion/` | Articulo con impresiones, necesita enlaces contextuales |
| `/juguetes/mejor-juguete-cachorro/` | Crawled - currently not indexed | 2026-04-02 | Allowed | Successful | misma URL | misma URL | `/juguetes/` | URL final valida; existe historico desde `/comportamiento/` |
| `/higiene/mejor-arenero-arena-gatos/` | Crawled - currently not indexed | 2026-04-27 | Allowed | Successful | misma URL | misma URL | `/`, `/alimentacion/mejor-comedero-gatos-guia/` | Hub/comparativa valida, necesita diferenciarse de arenero autolimpiable |
| `/cuidados/como-eliminar-pulgas-perro-casa/` | Crawled - currently not indexed | 2026-04-01 | Allowed | Successful | misma URL | misma URL | `/`, otra URL de cuidados | Contenido amplio, baja prioridad percibida |
| `/tags/cachorro/` | Crawled - currently not indexed en GSC historico | 2026-03-15 | Allowed | Successful historico | `/tags/cachorro/` | `/tags/cachorro/` | `/tags/` | URL antigua; actualmente debe consolidarse fuera del indice |
| `/comportamiento/mejor-juguete-cachorro/` | Page with redirect | 2026-04-02 | Allowed | Successful | destino `/juguetes/.../` | destino `/juguetes/.../` | URLs antiguas `www` | Redirect correcto si lleva slash |

---

## Estado tecnico del sitio

### Robots.txt

`robots.txt` permite el rastreo general y bloquea solo rutas que no deben rastrearse:

- `/404`
- `/api/`
- `/buscar/`

Tambien declara sitemaps:

- `https://patasyhogar.com/sitemap-index.xml`
- `https://patasyhogar.com/sitemap-0.xml`

Recomendacion: dejar solo `sitemap-index.xml` como sitemap declarado y enviado en GSC. No es una causa critica, pero reduce redundancia.

### Sitemap

El sitemap vivo `https://patasyhogar.com/sitemap-0.xml` contiene 149 URLs. Excluye correctamente:

- legales noindex
- busqueda
- tags
- actualizaciones

GSC reporta una cifra mayor en el sitemap index (`submitted: 691`), que no coincide con el XML vivo actual. Lo interpreto como dato historico o retraso de GSC, no como prueba de que el sitemap actual este mal.

### Canonicals

En las URLs validas inspeccionadas:

- `userCanonical` coincide con `googleCanonical`
- los canonicals son self-referencing
- no he visto canonical cruzado incorrecto en las URLs finales importantes

No parece un problema de canonical.

### Meta robots

Las URLs indexables tienen:

```html
<meta name="robots" content="max-image-preview:large">
```

Esto permite indexacion. No hay `noindex` accidental en las URLs importantes inspeccionadas.

Las paginas legales tienen `noindex, follow`, lo cual es correcto.

### HTTP y redirects

Las URLs finales inspeccionadas devuelven `200`. Las URLs antiguas con slash suelen redirigir correctamente a destinos nuevos.

Problema a revisar: algunas variantes antiguas **sin trailing slash** pueden devolver `404` si no hay regla explicita. Ejemplo comprobado:

- `/comportamiento/mejor-juguete-cachorro` devuelve `404`
- `/comportamiento/mejor-juguete-cachorro/` redirige a `/juguetes/mejor-juguete-cachorro/`

Esto conviene corregir para URLs antiguas que GSC haya visto sin slash.

---

## Patrones encontrados

### 1. Sitio con muchas URLs nuevas o consolidadas

Hay 149 URLs en sitemap y muchas redirecciones historicas. Para un dominio con poca autoridad y poco historico organico, Google puede rastrear pero no indexar inmediatamente la mayoria.

### 2. Poca senal interna hacia URLs importantes

GSC devuelve pocos referring URLs en muchas paginas. Varias URLs dependen de listados o categorias, no de enlaces editoriales contextuales dentro de contenido.

Las pillars deberian ser nodos fuertes de arquitectura, pero algunas tienen muy pocos enlaces visibles para Google en los datos de inspeccion.

### 3. Ruido historico de URLs no finales

Google ha visto:

- rutas `/comportamiento/`
- rutas `/descanso/`
- tags
- variantes `www`
- variantes sin trailing slash
- URLs de articulos consolidados

El sistema de redirects esta bien planteado, pero hay que cubrir las variantes sin slash mas relevantes y esperar consolidacion.

### 4. Posible solapamiento de intencion entre comparativas cercanas

Ejemplo:

- `/higiene/mejor-arenero-arena-gatos/`
- `/higiene/mejor-arenero-autolimpiable-gatos/`
- redirects de areneros abiertos/cerrados/autolimpiables hacia hubs

No es necesariamente incorrecto, pero cada URL debe tener intencion diferenciada y enlaces internos que expliquen esa relacion.

### 5. Listados poco prioritarios

URLs como `/articulos/` pueden ser utiles para usuarios, pero no necesariamente merecen ser objetivo de indexacion prioritaria. No deberian competir por atencion frente a pillars y articulos con demanda.

---

## Causa principal

La causa principal mas probable es:

**Google aun no ve suficientes senales de prioridad, autoridad y utilidad diferencial para indexar masivamente las URLs internas.**

Esto se apoya en:

- Fetch correcto en mobile.
- Robots permitido.
- Canonical correcto.
- Sitemap correcto en vivo.
- Contenido suficiente en muchos articulos.
- Pocos referring URLs en GSC.
- Bajo historico organico.
- Muchas URLs descubiertas/consolidadas en poco tiempo.
- Ruido de rutas antiguas.

No hay evidencia suficiente para atribuir el rechazo de validacion a un fallo tecnico unico.

---

## Problemas tecnicos detectados

### Alta prioridad

1. **Variantes antiguas sin trailing slash pueden devolver 404.**  
   Anadir redirects para las URLs antiguas que GSC o Search Analytics hayan mostrado sin slash.

2. **Sitemaps declarados de forma redundante.**  
   Mantener solo `sitemap-index.xml` en robots.txt y GSC.

3. **Ruido historico de tags.**  
   Actualmente `/tags/:tag/` redirige a `/articulos/`. Mantener esa consolidacion y no intentar indexar tags.

### Media prioridad

4. **Cache HTML conservadora.**  
   `Cache-Control: public, max-age=0, must-revalidate` puede cambiarse a `max-age=3600, s-maxage=3600, must-revalidate` por rendimiento y claridad, pero no lo considero causa principal de indexacion.

---

## Problemas de contenido detectados

No se ha detectado thin content claro en las URLs finales revisadas. Ejemplos de word count local:

- `guia-completa-higiene-grooming-perros.mdx`: 3.632 palabras
- `guia-alimentacion-perros.mdx`: 3.026 palabras
- `mejor-arenero-autolimpiable-gatos.mdx`: 3.620 palabras
- `mejor-pienso-perro-raza-pequena.mdx`: 3.595 palabras
- `como-eliminar-pulgas-perro-casa.mdx`: 4.194 palabras

El riesgo real no es longitud, sino diferenciacion:

- muchas comparativas con estructura similar
- muchos articulos afiliados en un dominio nuevo
- clusters con URLs cercanas semanticamente
- falta de senales externas que respalden experiencia/autoridad

Accion recomendada: reforzar experiencia propia, criterio de seleccion, tablas utiles, actualizacion de productos verificados y enlaces a fuentes/guia pillar cuando tenga sentido.

---

## Problemas de arquitectura y enlazado interno

Este es el area mas importante.

### Problemas

- Las pillars no funcionan aun como hubs fuertes.
- Muchas paginas dependen de cards/listados.
- Faltan enlaces contextuales desde articulos hacia pillars.
- Las categorias podrian enlazar mejor a subclusters y guias principales.
- Home podria dar mas peso a guias esenciales, no solo a recientes/destacados.

### Acciones concretas

1. En `src/pages/index.astro`, anadir un bloque "Guias esenciales" con enlaces directos a:
   - `/cuidados/guia-alimentacion-perros/`
   - `/cuidados/guia-completa-alimentacion-gatos/`
   - `/cuidados/guia-completa-higiene-grooming-perros/`
   - `/cuidados/guia-completa-higiene-cuidado-gatos/`
   - `/cuidados/guia-completa-salud-bienestar-perros/`
   - `/cuidados/guia-completa-salud-bienestar-gatos/`

2. En `src/pages/perros.astro`, enlazar de forma prominente a:
   - alimentacion perros
   - higiene perros
   - salud perros
   - paseo perros

3. En `src/pages/gatos.astro`, enlazar de forma prominente a:
   - alimentacion gatos
   - higiene gatos
   - salud gatos
   - enriquecimiento/juguetes

4. En `src/pages/[categoria]/index.astro`, insertar enlaces editoriales a pillars del cluster:
   - `alimentacion` -> alimentacion perros y gatos
   - `higiene` -> higiene perros y gatos
   - `paseo` -> paseo/viaje perros
   - `juguetes` -> juguetes/enriquecimiento
   - `hogar` -> hogar seguro mascotas

5. En articulos MDX, anadir enlaces contextuales en el primer tercio hacia la pillar correspondiente.

---

## Problemas de sitemap/canonical

### Confirmado

- El sitemap vivo no incluye tags.
- Las URLs finales importantes estan en sitemap.
- Los canonicals de las URLs inspeccionadas son correctos.

### A revisar

- En GSC, eliminar el envio manual de `sitemap-0.xml` y dejar solo `sitemap-index.xml`.
- Revisar en 1-2 semanas si GSC sigue mostrando `submitted: 691`. Si persiste, puede haber historico arrastrado o algun sitemap antiguo cacheado.

---

## Recomendaciones prioritarias

### Prioridad alta

1. Reforzar enlazado interno hacia pillars desde home, landings de animal y categorias.
2. Anadir enlaces contextuales desde articulos hijos hacia su pillar.
3. Corregir redirects de variantes antiguas sin trailing slash que devuelvan 404.
4. Diferenciar mejor paginas con intencion cercana, especialmente areneros y comparativas consolidadas.
5. Solicitar reindexacion solo de URLs finales importantes, no redirects ni tags.

### Prioridad media

1. Limpiar sitemaps enviados/declarados: mantener solo `sitemap-index.xml`.
2. Cambiar cache HTML a `max-age=3600, s-maxage=3600, must-revalidate` si se quiere mejorar consistencia tecnica.
3. Anadir `/sobre-mi/` de forma mas visible en footer o home, aunque ya existe enlazado desde author boxes.
4. Crear una lista de las 20 URLs con mas impresiones y reforzarlas internamente.

### Prioridad baja

1. No tocar tags si siguen redirigiendo a `/articulos/`, salvo para asegurar que todas las variantes redirigen.
2. No intentar indexar legales, busqueda, tags ni URLs antiguas.
3. Construir enlaces externos de calidad gradualmente, priorizando menciones reales en sitios de mascotas, directorios utiles y colaboraciones.

---

## Que cambiar exactamente

### En Astro

1. `src/pages/index.astro`
   - Anadir bloque visible de guias esenciales.
   - Priorizar enlaces a pillars, no solo articulos recientes.

2. `src/pages/perros.astro` y `src/pages/gatos.astro`
   - Anadir bloques editoriales de clusters por animal.
   - Enlazar a pillars con anchors descriptivos.

3. `src/pages/[categoria]/index.astro`
   - Anadir intro editorial por categoria con enlaces a guias pillar.
   - Mantener cards, pero no depender solo de cards.

4. `src/content/articulos/*.mdx`
   - Insertar enlaces contextuales hacia la pillar del cluster.
   - Revisar primero articulos con impresiones en GSC.

### En redirects

Anadir reglas para variantes antiguas sin slash que Google haya visto. Ejemplos:

```txt
/comportamiento/mejor-juguete-cachorro /juguetes/mejor-juguete-cachorro/ 301
/comportamiento/mejor-rascador-gato-grande /juguetes/mejor-rascador-gatos-guia/ 301
```

Revisar Search Analytics para detectar mas variantes sin slash antes de hacer una tanda grande.

### En robots.txt

Opcionalmente dejar solo:

```txt
Sitemap: https://patasyhogar.com/sitemap-index.xml
```

No bloquear `/tags/` si se quiere que Google vea el 301.

### En `_headers`

Opcional:

```txt
/*
  Cache-Control: public, max-age=3600, s-maxage=3600, must-revalidate
```

Esto es mejora tecnica, no solucion principal de indexacion.

---

## URLs que deberia solicitar reindexar

Tras aplicar cambios de enlazado interno y redirects:

1. `https://patasyhogar.com/cuidados/guia-alimentacion-perros/`
2. `https://patasyhogar.com/cuidados/guia-completa-alimentacion-gatos/`
3. `https://patasyhogar.com/cuidados/guia-completa-higiene-grooming-perros/`
4. `https://patasyhogar.com/cuidados/guia-completa-higiene-cuidado-gatos/`
5. `https://patasyhogar.com/cuidados/guia-completa-salud-bienestar-perros/`
6. `https://patasyhogar.com/cuidados/guia-completa-salud-bienestar-gatos/`
7. `https://patasyhogar.com/alimentacion/mejor-pienso-perro-raza-pequena/`
8. `https://patasyhogar.com/alimentacion/mejor-pienso-cachorro-raza-grande/`
9. `https://patasyhogar.com/higiene/mejor-arenero-arena-gatos/`
10. `https://patasyhogar.com/higiene/mejor-arenero-autolimpiable-gatos/`
11. `https://patasyhogar.com/higiene/mejor-antiparasitario-gatos-guia/`
12. `https://patasyhogar.com/cuidados/como-eliminar-pulgas-perro-casa/`

No priorizaria `/articulos/` salvo que se quiera validar que el listado general es rastreable.

---

## URLs que no deberia intentar indexar

- `/tags/*`
- `/comportamiento/*`
- `/descanso/*`
- URLs `www`
- URLs sin trailing slash
- URLs antiguas consolidadas por 301
- `/buscar/`
- `/404`
- `/aviso-legal/`
- `/cookies/`
- `/politica-privacidad/`

Estas URLs deben redirigir, estar bloqueadas/noindexadas o quedar fuera del indice segun el caso.

---

## Plan de validacion

### Semana 1

1. Implementar enlaces internos hacia pillars.
2. Corregir redirects sin trailing slash detectados.
3. Limpiar sitemap enviado en GSC si hay duplicado.
4. Ejecutar `npm run build` y desplegar.

### Semana 1-2

1. Inspeccionar manualmente en GSC:
   - 4 pillars
   - 3 articulos con impresiones
   - 2 categorias
   - 2 URLs antiguas redirigidas
2. Confirmar:
   - fetch correcto
   - indexing allowed
   - canonical correcto
   - sitemap detectado
   - URL final 200 o origen antiguo 301

### Semana 2-4

1. Solicitar indexacion de las URLs finales prioritarias.
2. No solicitar indexacion de redirects ni tags.
3. Monitorizar:
   - bajada de "Crawled - currently not indexed"
   - subida de "Submitted and indexed"
   - impresiones por URL final
   - discovery/referring URLs en inspeccion

### Semana 4-8

1. Revisar si GSC sigue reportando sitemap con 691 URLs.
2. Reforzar las URLs que sigan rastreadas pero no indexadas.
3. Empezar acciones de autoridad externa, pero sin esperar que backlinks resuelvan solos un problema de arquitectura interna.

---

## Conclusion

La validacion ha fallado porque todavia hay paginas finales validas en "Rastreada: actualmente sin indexar". No he encontrado una causa tecnica unica que bloquee la indexacion. La estrategia mas fiable es consolidar senales:

- menos ruido de URLs antiguas
- mas enlaces internos editoriales hacia paginas importantes
- mejor diferenciacion entre paginas cercanas
- reindexacion selectiva de URLs finales
- paciencia para que GSC consolide redirects y sitemap

Cambiar `Cache-Control` puede hacerse, pero no deberia ser la apuesta principal.
