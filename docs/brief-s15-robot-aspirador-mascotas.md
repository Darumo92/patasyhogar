# S15 — Robot aspirador para mascotas

- Fecha de investigación: 2026-09-16. Semana objetivo: 2026-09-14.
- Estado: `published`; aprobado por el usuario el 2026-09-16, con autorización para subir todos los cambios a main.
- Slug: `mejor-robot-aspirador-mascotas`. Categoría: higiene, igual que los aspiradores manuales y su registro del recomendador. Animal: ambos.
- Cluster: `tc_hogar_mascotas`.

## SERP real y volumen

Google España consultado con Playwright MCP (`hl=es&gl=es`). Sesión personalizada; posiciones orientativas de esta consulta, no ranking universal.

| Consulta | Keyword Surfer ES | Intención observada |
|---|---:|---|
| robot aspirador mascotas | 590/mes | Mixta: categorías comerciales y comparativas |
| mejor robot aspirador mascotas | 210/mes | Investigación comercial, comparativas y foros |
| robot aspirador para mascotas | 210/mes | Variante en ideas de Keyword Surfer, no consulta independiente |

El valor adicional 0,97 de la extensión no se registra como dificultad. No se observó bloque AI Overview ni People Also Ask en las dos SERP principales. Las FAQs serán editoriales, no atribuidas a PAA.

Resultados de la consulta principal, en orden observado:
1. MediaMarkt: https://www.mediamarkt.es/es/category/aspiradores-y-robots-aspirador-102642.html
2. PcComponentes: https://www.pccomponentes.com/blog/mejores-robots-aspiradores-para-hogares-con-mascotas
3. Amazon: categoría de robots especiales para mascotas.
4. El Independiente: https://www.elindependiente.com/de-tiendas/2026/01/21/mejor-robot-aspirador-mascotas/
5. Reddit: https://www.reddit.com/r/RobotVacuums/comments/1jo71pc/best_robot_vacuum_for_pet_owners_for_dog_hair/
6. La Casa Sibarita: https://lacasasibarita.es/limpieza/robot-aspirador/para-mascotas/
7. Rowenta: https://www.rowenta.es/Robots-aspiradores/robot-aspirador-para-mascotas
8. Mediavida: https://www.mediavida.com/foro/mascotas/mascotas-casa-usais-robot-limpieza-716870
9. Idealo: https://www.idealo.es/cat/33151F107758034/robots-aspiradores.html
10. YouTube: comparativa de robots con autovaciado.

La variante con «mejor» añade Nuevo Estilo, ABC, El Mueble y Aiho. Predominan listas de productos. Relacionadas: OCU, opiniones, calidad-precio, pelo largo, Xiaomi, MediaMarkt y El Corte Inglés.

## Ángulo y canibalización

Elegir por el trabajo que queda al dueño: aspirado diario con base de polvo frente a estaciones que también lavan mopas. Explicar pelo enredado, alfombras, arena seca, accidentes y convivencia con animales sensibles. No ordenar por Pa ni prometer detección infalible de heces.

`mejor-aspirador-pelo-mascotas` compara cinco aspiradores de escoba, sin robots en la tabla. Mantendrá la intención de limpieza manual y tapicerías; enlace recíproco para robots. El mapa de contenido no contiene otra comparativa de robots. La mención de robot en guías generales no cubre esta intención.

En El Independiente se observó mezcla entre L10s Ultra original y Gen 2 (5300 frente a 10000 Pa) y entre Xiaomi X10 y X10+. Se usarán fichas de fabricantes, no esos datos secundarios.

## Verificación de productos

Primero se ejecutó `node scripts/amazon-api.mjs --search "robot aspirador mascotas"`. Respuesta: `AssociateNotEligible`. No se modificó el cliente ni se fingió respuesta de API. Verificación alternativa directa de las tres fichas con Playwright: título, precio nuevo sin cupón, stock y fotografía. Precios visibles el 2026-09-16; pueden variar. No se actualiza el cache automático con datos manuales.

| Modelo exacto | ASIN | Precio Amazon | Stock | Imagen normalizada comprobada |
|---|---|---:|---|---|
| Dreame L10s Ultra Gen 2 | B0DCVYS9FQ | 299,00 € | En stock | `61LNBsxjsjL._AC_SL300_.jpg` |
| Roborock Q7 L5+ blanco | B0DWK8GJZX | 209,99 € | En stock | `518ZZDibQUL._AC_SL300_.jpg` |
| Xiaomi Robot Vacuum X20 Max, versión ES | B0DFHW2JTT | 417,99 € | En stock | `61ZI3VJ4h-L._AC_SL300_.jpg` |

URLs: `https://www.amazon.es/dp/` + ASIN. Imágenes: `https://m.media-amazon.com/images/I/` + identificador. Las tres cargaron con anchura natural 300 px en navegador (alturas 291, 248 y 300).

Fuentes técnicas primarias leídas:
- https://es.dreametech.com/products/robot-aspirador-l10s-ultra-gen-2 (Playwright, webfetch falló): 10000 Pa, goma flotante, TriCut **vendido aparte**, mopas giratorias y extensibles, elevación 10,5 mm, navegación 3DAdapt, base con lavado/secado/vaciado, depósito 300 ml y bolsa 3,2 l. Autonomía hasta 240 min solo aspirado estándar, dato de laboratorio. Modo mascotas configurado en app; no atribuir cámara RGB ni reconocimiento infalible.
- https://es.roborock.com/products/roborock-q7-l5-plus (Playwright): 8000 Pa, JawScrapers Comb y lateral antienredos, LiDAR, base RockDock Plus, mopa plana sin vibración ni giro. La FAQ distingue elevación y luz estructurada de la serie Q10. Q7 L5+ no incorpora esas prestaciones. 150 min máximo de fabricante. Q7 L5 y L5+ no son intercambiables para añadir autovaciado.
- https://www.mi.com/es/product/xiaomi-robot-vacuum-x20-max/ (webfetch): 8000 Pa, cepillo cortapelos incluido en accesorios (viene instalado el normal), mopa extensible, lavado de mopas en base a unos 55 °C, elevación 10 mm, luz estructurada. Recomienda evitar alfombras de más de 8 mm, pelo largo o flecos. Autonomía hasta 120 min en aspirado y fregado estándar; no comparar directamente con 240 min de solo aspirado Dreame.

Tiendanimal: búsquedas individuales `site:tiendanimal.es` con Roborock Q7, Dreame L10s y Xiaomi X20, sin resultados. Repetidas por marca: Roborock/Dreame sin resultados; Xiaomi muestra comederos, fuente y aspirador de escoba, sin X20 Max. No añadir enlaces a otros productos. Zooplus desactivado.

## Redacción y medios

- Tres opciones con diferencias verificables. Recomendación documental Dreame por estación completa a 299 €, Roborock para menor gasto, Xiaomi para cepillo cortapelos incluido y lavado caliente de mopas.
- Puntuaciones editoriales explícitas, no estrellas de compradores ni resultados de pruebas físicas.
- Sin inventar pruebas en casa, mediciones de ruido, porcentajes recogidos, testimonios ni experiencias veterinarias. Declaración de metodología y decisiones en primera persona.
- Imagen Pexels 4107240, cottonbro studio: https://www.pexels.com/es-es/foto/suelo-de-madera-aspiradora-4107240/. Descargada a 800 × 600 WebP. Vista: robot blanco sobre suelo de madera junto a un sofá ocupado. Foto ilustrativa, no modelo analizado.
- Enlaces previstos: pillar hogar, aspiradores manuales, muda de perros, estrés felino, limpiador enzimático. Entrantes desde pillar y aspiradores.
- Humanizer y guías de tono/humanización leídos. Intros revisadas: tecnología mascotas, pillar hogar y cámara mascotas.

## Verificación de cierre

- MDX: 2359 palabras de cuerpo (sin frontmatter, imports ni componentes), cuatro FAQs, cinco enlaces internos salientes y dos entrantes. Registro de los tres productos y seguimiento SEO actualizados.
- Humanizer: revisados giros promocionales, repeticiones, dialecto y afirmaciones de experiencia. Primera persona limitada a criterio editorial y declaración de no haber probado los productos.
- `npm run build`: correcto, 168 páginas. El primer intento detectó los imports MDX omitidos; corregidos y build completo repetido con éxito.
- HTML del artículo nuevo y de los dos artículos enlazadores comprobado: título/meta dentro de límites, canonical, Article/BreadcrumbList/FAQPage y enlaces internos existentes.
- Artículo nuevo: título renderizado 55 caracteres (entidad HTML de espacio decodificada), descripción 145, cuatro Q/A, tres Product con precios coincidentes, dos H2 interrogativos, autor Daniel Ruiz, etiquetas, disclaimer y hero/OG correctos. Sin meta noindex/nofollow; los enlaces afiliados sí llevan sus atributos correspondientes.
- Hero Pexels único por SHA-256: `e0fce572da592e32e7c485fefe5a1f809404a47df1e620bb4ac1cc0f84769a3d`.
- Preview local revisada con Playwright en escritorio y móvil de 390 px: portada y cuatro instancias de imágenes de producto cargadas; tres enlaces de compra, cero en TopPick; sin desbordamiento horizontal ni errores de consola.
- `node scripts/check-affiliate-density.mjs`: correcto.
- `node scripts/check-no-zooplus-public.mjs`: correcto.
- Revisión humana aprobada el 2026-09-16. El usuario confirma mantener TopPick editorial sin botón y autoriza commit/push a main.
