# Backlinks + Social Status (Patas y Hogar)

Estado vivo de las campañas de backlinks y redes para patasyhogar.com. Actualizar tras cada acción.

Última actualización: 2026-05-13

---

## 1. Pinterest

### Cuenta
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

### Pines publicados (13 — día 1: 10 + día 5: 3)
| # | Artículo | Tablero | Archivo local |
|---|----------|---------|---------------|
| 1 | Mejores camas para perros | Cuidado de perros | `/tmp/pin-mejor-cama-perro.png` |
| 2 | Mejor arnés perro | Paseo y viaje con mascotas | `/tmp/pin-mejor-arnes-perro.png` |
| 3 | Mejor pienso perro | Comida para mascotas | `/tmp/pin-mejor-pienso-perro.png` |
| 4 | Mejor fuente agua gatos | Comida para mascotas | `/tmp/pin-mejor-fuente-agua-gatos-silenciosa.png` |
| 5 | Mejor arena aglomerante gato | Cuidado de gatos | `/tmp/pin-mejor-arena-aglomerante-gatos.png` |
| 6 | Mejor rascador gatos | Juguetes y enriquecimiento | `/tmp/pin-mejor-rascador-gatos-guia.png` |
| 7 | Mejor antiparasitario perros | Cuidado de perros | `/tmp/pin-mejor-antiparasitario-perros-guia.png` |
| 8 | Mejor comedero auto WiFi gato | Comida para mascotas | `/tmp/pin-mejor-comedero-automatico-wifi-gatos.png` |
| 9 | Mejor transportín gato | Paseo y viaje con mascotas | `/tmp/pin-mejor-transportin-gatos-guia.png` |
| 10 | Mejor champú piel sensible perro | Cuidado de perros | `/tmp/pin-mejor-champu-perros-piel-sensible.png` |
| 11 | Mejor arenero autolimpiable gatos | Cuidado de gatos | `/tmp/pin-mejor-arenero-autolimpiable-gatos.png` (día 5) |
| 12 | Mejor GPS perro | Paseo y viaje con mascotas | `/tmp/pin-mejor-gps-perro.png` (día 5) |
| 13 | Mejor juguete mental perros | Juguetes y enriquecimiento | `/tmp/pin-mejor-juguete-mental-perros-guia.png` (día 5) |

### Generación de pines
- Script: `scripts/generate-pin.mjs` (1 pin) y `scripts/generate-pins-batch.mjs` (batch)
- Formato: 1000×1500 PNG, hero image con overlay oscuro + título + `patasyhogar.com`
- Sharp compone el SVG con el hero WebP del artículo.

### Estado tráfico (2026-04-22)
- **0 impresiones** tras primeras 24-48h. Normal: sandbox cuenta nueva Pinterest (2-4 semanas).
- Rich Pins se auto-activan con OG tags correctos (ya los tenemos). Pinterest retiró debugger público 2024.
- Claim dominio toma 24-72h adicionales tras verificación DNS.

### Comentarios en pines ajenos (día 5 - 2026-04-24)
| Pin | Cuenta | Tema |
|---|---|---|
| PawHut 72L arenero autolimpiable | Aosom.es | Arenero gato grande |
| NICREW 2.4L fuente | tiposdegatos | Fuente gato silenciosa |
| Tractive GPS | blogdeuma | GPS Tractive batería |
| Dispensador golosinas | Brandmelab | Juguete mental Kong |
| Adoptar gatos pequeños | elgatofeliz_pinterest | Adopción gatito pequeño |

### Cuentas seguidas (día 5 - 2026-04-24)
- tiposdegatos
- elgatofeliz_pinterest
- blogdeuma
- Aosomes
- Brandmelab

### Plan Pinterest
- **No** subir 10 pines de golpe y abandonar. Postea **2-3/día consistente** para evitar flag abandono.
- Follow 20-30 cuentas grandes del nicho (perros, gatos, hogar, mascotas).
- Repinea 5-10 pines ajenos relevantes/día.
- Comenta 3-5 pines ajenos/día.
- Esperar 2-6 semanas para primer tráfico real.

---

## 2. Reddit

### Cuenta
- **Usuario:** u/Pristine_Review5630
- **URL perfil:** https://www.reddit.com/user/Pristine_Review5630/
- **Email:** contacto@patasyhogar.com
- **Verificación email:** sí
- **Estado:** sin shadowban. 6 comentarios visibles públicamente.

### Perfil
- Nombre mostrar: "Daniel (patasyhogar)"
- Bio: "Daniel, desde Valencia. Vivo con Kira (mestiza adoptada) y Mango (gato naranja). Escribo sobre productos y cuidados de mascotas."
- Avatar: logo verde patasyhogar (favicon-512.png)
- Enlaces redes sociales configurados:
  - https://www.pinterest.com/patasyhogar/
  - https://patasyhogar.com

### Subs unidos
- r/gatos, r/mascotas, r/AdoptaUnPerro, r/espanol, r/AskEspanol, r/Valencia
- (r/perros estaba baneado por unmoderated)

### Comentarios publicados (acumulado)
Karma 2026-05-13 21:00 CEST: comment=45, link=6, total=51. Sano. Ya supera karma 50, pero la cuenta aún no tiene 1 mes (creada 2026-04-20), así que mantener cero links a patasyhogar hasta 2026-05-20 como mínimo.
Karma 2026-05-11: comment=29, link=3, total=32 (subió +17 comment desde 2026-05-04). Sano.
Karma 2026-05-04: comment=12, link=3, total=15 (subió +4 desde 2026-05-03)

Últimos comentarios (vía /user/.../comments.json):
- 2026-05-13 r/mascotas: Ayuda pezón morado/inflamado con quistes mamarios (1tbi0kk) — recomendar veterinario cuanto antes, señales de urgencia, no manipular/drenar, llamar clínicas para foto/pago fraccionado si hay problema de disponibilidad o dinero. Día 3 plan outreach. Humanizer aplicado.
- 2026-05-13 r/GatosArgentinos: Edad castración hembras gatita 5 meses pequeña con riesgo patio (1tbfygv) — no estirar sin vet, decidir por peso/estado general, riesgo celo/escape/machos, consulta ya. Día 3 plan outreach. Humanizer aplicado.
- 2026-05-13 r/GatosArgentinos: Mordida juego vs estrés en gato (1tb2p7c) — diferenciar juego pasado de rosca vs enojo por lenguaje corporal, evitar manos como juguete, redirigir a caña/presa, anécdota Mango pequeño. Día 3 plan outreach. Humanizer aplicado.
- 2026-05-12 r/AskSpain: Reply a Mamaun30 en post propio coste mascotas España (1tayoo3) — destacar que mucha gente calcula con gato joven/sano y la vejez cambia el coste real; caso >200€/mes incluso con seguro. Día 2 plan outreach. Humanizer aplicado.
- 2026-05-12 r/AskSpain: Post propio "¿Cuánto os cuesta al mes tener perro o gato en España, sin contar caprichos?" (1tayoo3) — pregunta de coste mensual real mascotas en España, sin link, para conversación en sub grande ES. URL: https://www.reddit.com/r/askspain/comments/1tayoo3/cuánto_os_cuesta_al_mes_tener_perro_o_gato_en/ Día 2 plan outreach. Humanizer aplicado.
- 2026-05-12 r/mascotas: Reply a MiriMix13 en artrosis labrador senior (1taftjo) — validar dificultad emocional de limitar paseos, explicar UCM/hospital universitario con supervisión, sugerir llamar y preguntar por dolor crónico + rehabilitación + revisión medicación/calidad de vida, llevar historial de tratamientos. Día 2 plan outreach. Humanizer aplicado.
- 2026-05-12 r/mascotas: Reply a HearingSoft250 en gato llora al llegar a casa (1t7d72j) — confirmar estimulación activa/caza dirigida y matizar que si cambio brusco o maullido distinto conviene vet para descartar dolor dental, tiroides o cistitis. Día 2 plan outreach. Humanizer aplicado.
- 2026-05-12 r/GatosArgentinos: Reply a tom_varela en gato hiperactivo post-castración (1t9axsw) — caña con captura final, evitar frustración si nunca alcanza presa. Día 2 plan outreach. Humanizer aplicado.
- 2026-05-12 r/GatosArgentinos: Reply a Useful-Addendum7593 en asma felina (1t9a69s) — llevar registro de episodios con hora, duración y contexto antes de consulta vet. Día 2 plan outreach. Humanizer aplicado.
- 2026-05-12 r/mascotas: Reply a Marianabananamar en orejas perro (1t8janw) — cierre corto tras agradecimiento, sin olor/rojez y sin meter nada profundo va bien. Día 2 plan outreach. Humanizer aplicado.
- 2026-05-12 r/mascotas: Artrosis en perrete (1taftjo) — recomendar unidad dolor/rehabilitación, hospital veterinario en Madrid, paseos cortos antes del umbral, alfombras antideslizantes, control peso labrador senior. Día 2 plan outreach. Humanizer aplicado.
- 2026-05-11 r/mascotas: Reply a Marianabananamar en orejas perro (1t8janw) — confusión vídeos tratamiento vs prevención, limpiador sirve para ambas, 1x/mes basta perro sano. Día 1 plan outreach. Humanizer aplicado.
- 2026-05-11 r/mascotas: Reply a Recent-Garage7968 (OP) en AYUDA URGENTE (1t9xeg1) — info crítica: microchip a nombre ella + juicios previos + amenaza suicidio. Reply: patrón juega a favor OP, microchip no equivale propiedad legal absoluta, documentar pruebas cesión hecho, 024 línea suicidio ES, no responder amenaza, denuncia coacción, consulta abogado primera gratuita. Día 1 plan outreach. Humanizer aplicado.
- 2026-05-11 r/GatosArgentinos: Gatito asma felina (1t9a69s) — pinta asma sí, AeroKat cámara espaciadora gato clave inhalador, descartar cardiopatía hipertrófica con ecocardio cardiólogo veterinario, 2da opinión internista felino vs clínica general, triggers ambientales (arena polvorienta, humo, ambientadores, velas), castración no provocó coincidencia temporal. Día 1 plan outreach. Humanizer aplicado.
- 2026-05-11 r/GatosArgentinos: Gato hiperactivo post-castración (1t9axsw) — testosterona baja 6-8 sem no de golpe, energía sin canalizar, sesiones caña 2-3x/día caza-mata-come, sesión larga pre-cena, premios escondidos casa, arañazo es sobreestimulación post-op no agresividad, anécdota Mango. Día 1 plan outreach. Humanizer aplicado.
- 2026-05-11 r/mascotas: AYUDA URGENTE adopción perrita conflictiva (1t9xeg1) — no llevar protectora (mes y medio apego), verificar microchip 20-40€, regularizar si caducado, bloqueo número/WhatsApp/Instagram + capturas previas, denuncia preventiva acoso sin abogado, abogado plan B primera consulta gratuita ES, anécdota Kira protectora. Día 1 plan outreach. Humanizer aplicado.
- 2026-05-10 r/mascotas: Limpieza orejas perro (1t8janw) — limpiador específico Otoclean/Epi-Otic, masaje base oreja, no bastoncillos, ácaros Otodectes si cera oscura, frecuencia según raza, no agua oxigenada/alcohol. Día 14 Fase A. Humanizer aplicado.
- 2026-05-10 r/GatosArgentinos: Encías inflamadas gata 1 mes (1t76idv) — limpieza dental anestesia + radiografía, descartar reabsorción dental raíz, test calicivirus FIV FeLV, derivar odontólogo veterinario, comida húmeda templada. Día 14 Fase A. Humanizer aplicado.
- 2026-05-10 r/mascotas: Reply a Roby1414 en gato llora bienvenida (1t7d72j) — validar + cierre, aguantar primeros días sin ceder, cambio en 10-15 días. Día 14 Fase A.
- 2026-05-10 r/GatosArgentinos: Reply a SmokedOutSoul_ en gata muerde cola (1t6tpx2) — validar + cierre, hiperestesia tiene manejo, ánimo. Día 14 Fase A.
- 2026-05-09 r/mascotas: Shih tzu camina mal (1t42z4p) — segunda opinión traumatólogo veterinario, luxación rótula común raza pequeña, alfombras suelo liso, no saltar muebles. Día 13 Fase A. Humanizer aplicado.
- 2026-05-09 r/mascotas: Gato llora bienvenida (1t7d72j) — refuerzo intermitente, ignorar 5-10 min llegada, juego caña pre-cena, revisar estímulos patio. Día 13 Fase A. Humanizer aplicado.
- 2026-05-09 r/GatosArgentinos: Gata muerde cola obsesivamente (1t6tpx2) — hiperestesia felina o compulsivo, vet revisar lumbar/cola, juego caña 2-3x/día, interrumpir bucle sin regañar. Día 13 Fase A. Humanizer aplicado.
- 2026-05-07 r/mascotas: Reply a helena_voss en gatito no acepta gatita (8 meses) — pivot a coexistencia separada, duplicar recursos, etóloga si agresión activa. Día 11 Fase A
- 2026-05-07 r/GatosArgentinos: Reply a olivialittlefeet en alimentos castradas — aclarar pienso=alimento balanceado seco. Día 11 Fase A
- 2026-05-04 r/mascotas: Reply a youboycer en Kisa muerde cobija — anécdota Mango manta vieja por suya. Día 8 Fase A
- 2026-05-04 r/mascotas: Reply a Shot-Market-8980 en Apoquel barato — matiz Wallapop conocidos vs desconocidos, pregunta seguro. Día 8 Fase A
- 2026-05-04 r/mascotas: Apoquel barato — evitar Wallapop, comparar Zooplus/Tiendanimal, genérico oclacitinib. Día 8 Fase A
- 2026-05-04 r/GatosArgentinos: Comederos automáticos dos michis — PETLIBRO, depósito 3-4L, dos separados si dietas distintas. Día 8 Fase A
- 2026-05-04 r/mascotas: Kisa muerde cobija — destete temprano, ritual confort, anécdota Mango manta propia. Día 8 Fase A
- 2026-05-03 r/GatosArgentinos: Reply a nomueraspolilla en Vainilla/canillas ("Normal asustarse, me alegra que esté bien. Bebedero de circulación lo soluciona"). Día 7 Fase A
- 2026-05-03 r/GatosArgentinos: Vecina gatos escapan — hablar con vecina ya por gatito en árbol + conversación de fondo antes de que pase algo malo. Día 7 Fase A
- 2026-05-03 r/mascotas: Nombre nueva integrante familia (Luna, Canela, Chispa). Día 7 Fase A
- 2026-05-03 r/GatosArgentinos: Vainilla descubrió canillas — instinto agua movimiento + señales alarma + anécdota Mango bebedero. Día 7 Fase A
- 2026-05-02 r/GatosArgentinos: Pica/cordones operación (etóloga sí + compañero con precaución + red balcón urgente + juego activo caza). Día 6 Fase A
- 2026-05-02 r/GatosArgentinos: Alimento gato castrado Livra vs Royal Canin (Livra OK, RC formulación bajó, taurina suplemento si comida casera). Día 6 Fase A
- 2026-05-01 r/mascotas: Recomendaciones gato orinándose camas (FIC recurrente + limpiador enzimático no lavandina + Feliway + anécdota Mango arenero movido obras). Día 5 Fase A
- 2026-05-01 r/GatosArgentinos: Titi trayendo ratones (regañar no asocia + complementar luna_swet juego predatorio + cascabel ligero reduce éxito caza). Día 5 Fase A
- 2026-04-30 r/mascotas: Historial médico 3 perros (carpeta física + foto cartilla + Sheets fechas). Día 4 Fase A
- 2026-04-30 r/GatosArgentinos: Hierba gatera no reacción (catnip 30% no responde, valeriana, matatabi). Día 4 Fase A
- 2026-04-30 r/mascotas: Pequeño gigante 40kg gente entrometida (filtro consejos + sesión puntual adiestrador refuerzo positivo). Día 4 Fase A
- 2026-04-30 r/mascotas: Reply a YaTocaCambiar en hilo pequeño gigante (descartar pisar patas + adiestrador solo si problema concreto)
- 2026-04-29 r/mascotas: Cachorro Coco no come (papilla croqueta + 5 tomas + parásitos internos). Día 3 Fase A
- 2026-04-29 r/GatosArgentinos: Cono Michael Jackson (anécdota Mango ligera). Día 3 Fase A
- 2026-04-29 r/mascotas: Gato perdido 8 años (búsqueda nocturna + arenero usado + Mango armario escobas). Día 3 Fase A
- 2026-04-28 r/mascotas: Chuby celo 6 años. Día 2 Fase A
- 2026-04-28 r/GatosArgentinos: Manta eléctrica reply
- 2026-04-28 r/GatosArgentinos: Motita reply
- 2026-04-28 r/GatosArgentinos: Castrar gata embarazada
- 2026-04-27 r/GatosArgentinos: Manta eléctrica gatos (+10 años) — anécdota Mango cable mordido + almohadilla autocalentable + bolsa agua. Día 1 Fase A
- 2026-04-27 r/GatosArgentinos: Motita adopción
- 2026-04-27 r/mascotas: Malassezia Schnauzer (cuidado remedios caseros)
- 2026-04-26 r/mascotas: Seresto antiparasitario
- 2026-04-26 r/mascotas: empatía mascotas
- 2026-04-26 r/mascotas: tratar 3 a la vez antiparasitario
- 2026-04-26 r/mascotas: Oscar/Kira anécdota
- 2026-04-25 r/mascotas: Mango pulgas parking
- 2026-04-24 r/GatosArgentinos: adopción Mango bebé
- 2026-04-23 r/GatosArgentinos: GPS vs chip
- 2026-04-21 r/GatosArgentinos: torre comedero perros
- 2026-04-21 r/mascotas: Excellent pienso
- 2026-04-20 r/GatosArgentinos: Mango 2 meses traumatizado
- 2026-04-20 r/GatosArgentinos: gatos memoria asociativa
- 2026-04-20 r/mascotas: Kira protectora 8 meses
- 2026-04-20 r/mascotas: Luna/Canela nombre

Posts antiguos día 1-2 originales (referencia histórica):
- r/mascotas: Nombre gatita adoptada, socializar perro arisco, alimento 4 gatos Purina
- r/GatosArgentinos: gatos olvidan, adoptar arisco, torre rascador ventana

### Posts propios publicados (1 — día 3)
- r/mascotas: "¿Vuestros gatos también ignoran el cuenco y solo beben de la fuente?"
- **Feedback:** demasiado básico para alguien que se presenta como experto. Siguientes posts deben mostrar experiencia (comparativas propias, datos, anécdotas con conclusiones).

### Estadísticas cuenta
- Karma comentarios: 0
- Karma post: 1
- Total karma: 1
- Creada: 2026-04-20

### Estrategia futura posts propios (NO novato)

Patrón: experiencia detallada + conclusión técnica + pregunta específica al final.

**Ejemplos aprobados:**

1. **Comparativa personal con dato**
   ```
   Comparé 5 fuentes de agua para gatos durante 4 meses. Esto es lo que aprendí
   [experiencia real, mediciones, conclusión, pregunta técnica concreta al final]
   ```

2. **Historia + aprendizaje**
   ```
   Llevé a mi perra al vet con 40€ de arnés roto. La respuesta del veterinario me sorprendió
   [anécdota, giro, conclusión útil, pregunta específica]
   ```

3. **Dato contraintuitivo**
   ```
   Dato raro: mi gato NO usa el arenero desde que lo cambié de sitio. ¿Es tan sensible el feline?
   [experimento, marcas, conclusión, pregunta sobre estudios/evidencia]
   ```

### Reglas Reddit
- **Mínimo 30-45 min entre comentarios** primera semana (mejor 1h). Cuenta nueva + rapidez = shadowban.
- **Nunca link a patasyhogar.com** en posts/comentarios hasta karma >50 y cuenta >1 mes.
- **Chequear shadowban:** copiar URL comentario → abrir en incógnito. Si no aparece → shadowban.
- Comprobar karma via API pública: `curl https://www.reddit.com/user/Pristine_Review5630/about.json`
- Cross-post mínimo 48h tras post original.
- NO repetir mismo post en varios subs.

### Subs ES mascotas activos
- r/mascotas (~ES+LATAM mixto, más fotos que text)
- r/GatosArgentinos (más activo, text posts frecuentes)
- r/AdoptaUnPerro
- r/Dogtraining_Spanish
- r/Valencia (local, uso futuro)

### Subs no-útiles (muertos/fotos only)
- r/perros: baneado por unmoderated
- r/gatos: portugués (no ES)
- r/espanol / r/AskEspanol: casi nada de mascotas

### Próximos pasos Reddit
- **Día 4-5:** 3-5 comentarios más + primer post propio **tipo experiencia/comparativa** (no novato)
- **Día 7-10:** Si karma >30 → primer drop contextual de enlace ("lo analicé aquí: patasyhogar.com/[slug]")
- **Semana 2-3:** Incorporar 1 post propio/semana + 10-15 comentarios útiles

### Decisiones operativas Reddit/outreach
- 2026-05-12: No buscar menciones en foros como tarea diaria. Mantener foco en Reddit/Quora/blogs según indique el usuario, pero no proponer "mentions foros" por defecto aunque aparezcan en el plan original.
- 2026-05-12 17:37 CEST: Repaso final post propio r/AskSpain `1tayoo3`. Estado público: score 8, 38 comentarios, upvote ratio 1.0. Cuenta: total karma 45 (comment 40, link 5). Se respondieron las cadenas prioritarias: Puzzleheaded-Sun7418, teh_adry, Blackterial, xCrossFaith, HistoricalTackle5049, TuMadreTeCago, pleasedlurker, Weomir, Mamaun30, y replies directas posteriores de Puzzleheaded/Historical. Recomendación: no seguir contestando ahora salvo reply directo nuevo; hacer una pasada ligera por la noche. No enlazar patasyhogar todavía.
- 2026-05-13 21:00 CEST: Revisión inbox público/replies. Últimos 50 comentarios del usuario tienen `replies=0`, sin replies directas pendientes. Post propio r/AskSpain `1tayoo3`: score 12, 58 comentarios, upvote ratio 0.93. Hay 5 comentarios nuevos de primer nivel desde la última pasada (Iron_Gal, noxss, ColleenDi, PLS_PM_ME_YOUR_B0OBS, OrangeOk729). Recomendación: responder como mucho 1-2 si se quiere mantener presencia; prioridad Iron_Gal por leishmania + Librela y ColleenDi por perro senior cardiaco. No responder todos. No enlazar patasyhogar todavía.

---

## 3. Canales pendientes (no iniciados)

### Medium
- **Cuenta:** https://medium.com/@patasyhogar
- **Estado:** iniciado 2026-05-13
- **Regla:** usar import/canonical o canonical manual hacia patasyhogar.com. Evitar comparativas afiliadas puras; priorizar informativos y piezas editoriales.

#### Artículos publicados
| Fecha | Título | URL | Canonical | Notas |
|---|---|---|---|---|
| 2026-05-13 | "Cuánto cuesta tener un perro en España: números reales de 2026" | https://medium.com/@patasyhogar/cu%C3%A1nto-cuesta-tener-un-perro-en-espa%C3%B1a-n%C3%BAmeros-reales-de-2026-2d816a1e6a29 | https://patasyhogar.com/cuidados/cuanto-cuesta-mantener-un-perro-al-mes/ | Primer artículo Medium del plan outreach. Importado/adaptado desde Patas y Hogar, imagen hero convertida a JPG para preview, topics: Pets, Dogs, Spain, Pet Care, Personal Finance. |

### Quora ES
- **Cuenta:** creada 2026-05-11 con identidad editorial Patas y Hogar
- **Credencial usada:** "Redacción de Patas y Hogar sobre perros y gatos"
- **Estado:** iniciado
- **Regla cuenta nueva:** primeras 1-2 respuestas sin enlace para evitar patrón promocional
- **Nofollow pero Google indexa + tráfico referral**

#### Respuestas publicadas
| Fecha | Pregunta | URL | Link | Notas |
|---|---|---|---|---|
| 2026-05-13 | "Cuánto cuesta tener un perro pequeño o un gato durante un mes? Cuánto costaría mantenerlo cada uno" | https://qr.ae/pFv67q | No | Segunda respuesta cuenta nueva. Comparativa perro pequeño vs gato en España: rangos mensuales, partidas recurrentes, primer año y fondo de emergencias. Sin link para evitar patrón promocional temprano. Humanizer aplicado. |
| 2026-05-11 | "Cuál es el pienso más sabroso y bueno para un gato delicado, esterilizado y de más de 10 años" | https://es.quora.com/unanswered/Cuál-es-el-pienso-más-sabroso-y-bueno-para-un-gato-delicado-esterilizado-y-de-más-de-10-años | No | Primera respuesta cuenta nueva. Humanizer aplicado. Tema gato senior esterilizado, revisión veterinaria previa, transición lenta, comida húmeda. |

### Comentarios blogs mascotas ES (prioridad baja-media)
- hogarmania.com/mascotas
- 20minutos.es (artículos mascotas)
- consumer.es/mascotas
- hola.com/mascotas

### Grupos Facebook ES mascotas (prioridad baja)
- Sin backlink SEO. Tráfico directo si se referencia sitio.

### Foros evaluados y descartados
- mundoanimalia.com → ahora es marketplace, no foro
- mascotadomestica.com → blog WordPress sin foro
- mascotalia.com → caído
- foro.mascotaking.com → caído
- animalesmascotas.com → blog sin foro

---

## 4. Checklist para nueva sesión

Cuando retomar esto en sesión nueva:

1. Leer este archivo para contexto
2. Verificar karma/shadowban Reddit via curl about.json
3. Escanear posts nuevos subs ES (`scripts/generate-pins-batch.mjs` pattern para batch)
4. Check Pinterest impresiones (si aún 0 tras 2-4 semanas → revisar Rich Pins manual)
5. Continuar plan según día actual
