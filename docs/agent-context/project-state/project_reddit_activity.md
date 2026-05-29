# Reddit Activity (Patas y Hogar)

Estrategia, reglas y actividad reciente en Reddit.

Última actualización: 2026-05-29 CEST

> **Checklist sesión:** Verificar karma/shadowban via `curl https://www.reddit.com/user/Pristine_Review5630/about.json` · Escanear posts nuevos subs ES · Continuar plan según día actual.

---

## Karma status

> El karma numérico NO es leíble por RSS ni ningún endpoint accesible (`about.json`=403, `about.rss`=404). Lo facilita el usuario desde la app. Para shadowban/cuenta viva sí sirve `user/Pristine_Review5630.rss` — ver `reference_reddit_rss_method.md`.

Karma 2026-05-29: total=85 (dato del usuario). Cuenta viva confirmada vía `user.rss` (comentarios del 27-28 visibles en feed público).
Karma 2026-05-28: comment=71, link=11, total=82. Perfil público; los dos comentarios publicados hoy aparecen visibles en el historial con score inicial 1. Sin enlaces.
Karma 2026-05-27: comment=72, link=11, total=83. Perfil público; el comentario en r/mascotas sobre Martina está visible tras publicación.
Karma 2026-05-26: comment=71, link=9, total=80. Perfil público y actividad reciente visible. Usuario confirma continuar la rutina Reddit; humanización estricta obligatoria en cada post o comentario.
Karma 2026-05-25: comment=69, link=9, total=78. Sano; los tres comentarios del lunes y los tres del 2026-05-24 aparecen públicos en el historial.
Karma 2026-05-24: comment=68, link=9, total=77. Sano. Cuenta cumple condiciones karma >50 + >1 mes, link dropping habilitado con cuidado.
Karma 2026-05-18: comment=60, link=6, total=66. Sano. Se publicaron 4 comentarios en r/mascotas sin link; mantener cero links a patasyhogar hasta 2026-05-20 como mínimo.
Karma 2026-05-17 22:00 CEST: comment=57, link=6, total=63. Sano. Cuenta cumple 1 mes el 2026-05-20 → empezar a drop links contextuales a patasyhogar a partir de esa fecha.
Karma 2026-05-17 mañana: comment=54, link=6, total=60. Sano.
Karma 2026-05-16: comment=50, link=6, total=56. Sano.
Karma 2026-05-13 21:00 CEST: comment=45, link=6, total=51. Sano. Ya supera karma 50, pero la cuenta aún no tiene 1 mes (creada 2026-04-20), así que mantener cero links a patasyhogar hasta 2026-05-20 como mínimo.
Karma 2026-05-11: comment=29, link=3, total=32 (subió +17 comment desde 2026-05-04). Sano.
Karma 2026-05-04: comment=12, link=3, total=15 (subió +4 desde 2026-05-03)

---

## Reglas Reddit

- **Mínimo 30-45 min entre comentarios** primera semana (mejor 1h). Cuenta nueva + rapidez = shadowban.
- **Link propio permitido con cautela:** la cuenta cumple karma >50 y >1 mes, pero debe haber 5-7 días entre enlaces a patasyhogar.com. Último enlace publicado: 2026-05-29; no enlazar antes del 2026-06-03 como mínimo.
- **Chequear shadowban:** copiar URL comentario → abrir en incógnito. Si no aparece → shadowban.
- Comprobar karma via API pública: `curl https://www.reddit.com/user/Pristine_Review5630/about.json`
- Cross-post mínimo 48h tras post original.
- NO repetir mismo post en varios subs.

---

## Estrategia posts propios (NO novato)

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

### Posts propios publicados
- r/mascotas: "¿Vuestros gatos también ignoran el cuenco y solo beben de la fuente?"
- **Feedback:** demasiado básico para alguien que se presenta como experto. Siguientes posts deben mostrar experiencia (comparativas propias, datos, anécdotas con conclusiones).
- 2026-05-19 r/Valencia: "Los que vivís con perro en Valencia: ¿cómo organizáis los paseos cuando empieza el calor fuerte?" — post propio sin link, pregunta de experiencia local sobre horarios, rutas con sombra, botines/chaleco refrescante y zonas a evitar. URL: https://www.reddit.com/r/valencia/comments/1thif2i/los_que_vivís_con_perro_en_valencia_cómo/
- 2026-05-26 r/AskSpain: "Los que tenéis perro y gato, ¿cómo os organizáis cuando no estáis en casa varios días?" — post propio sin link, debate sobre cuidados cuando conviven perro y gato: visitas a domicilio, cuidador en casa o separar soluciones según animal. Visible al publicar, score inicial 1. Humanizer aplicado. URL: https://www.reddit.com/r/askspain/comments/1to4ddp/los_que_tenéis_perro_y_gato_cómo_os_organizáis/

### Próximos pasos Reddit
- **Semana 3:** mantener 10-15 comentarios útiles y 1 post propio/semana, priorizando r/mascotas cuando haya consultas reales.
- **Enlaces:** no forzar ningún enlace; próximo hueco temporal a partir del 2026-05-26 y solo si el hilo pide un recurso que encaje.

---

## Decisiones operativas Reddit/outreach

- 2026-05-27: Revisión del post propio r/AskSpain `1to4ddp`: inicialmente score 8, 35 comentarios, upvote ratio 0.91. Ya se había respondido a `telepattya`; se publicó una única respuesta adicional a `Senrra3195`, por aportar experiencia directa cuidando gatos a domicilio y concretar el tiempo de las visitas. Estado público tras la respuesta: score 9, 36 comentarios, upvote ratio 1.0. No responder en cadena ni reactivar respuestas genéricas o discusiones laterales.
- 2026-05-19: Descartados dos candidatos tras revisión del usuario: r/AskSpain `1tgy848` por relación demasiado débil con la cuenta Patas y Hogar, y r/mascotas `1thewmz` por tratarse de venta/cría de cachorros, tema sensible y poco alineado con la marca. No proponer comentarios en hilos de venta de animales salvo que el usuario lo pida explícitamente.
- 2026-05-12: No buscar menciones en foros como tarea diaria. Mantener foco en Reddit/Quora/blogs según indique el usuario, pero no proponer "mentions foros" por defecto aunque aparezcan en el plan original.
- 2026-05-12 17:37 CEST: Repaso final post propio r/AskSpain `1tayoo3`. Estado público: score 8, 38 comentarios, upvote ratio 1.0. Cuenta: total karma 45 (comment 40, link 5). Se respondieron las cadenas prioritarias: Puzzleheaded-Sun7418, teh_adry, Blackterial, xCrossFaith, HistoricalTackle5049, TuMadreTeCago, pleasedlurker, Weomir, Mamaun30, y replies directas posteriores de Puzzleheaded/Historical. Recomendación: no seguir contestando ahora salvo reply directo nuevo; hacer una pasada ligera por la noche. No enlazar patasyhogar todavía.
- 2026-05-13 21:00 CEST: Revisión inbox público/replies. Últimos 50 comentarios del usuario tienen `replies=0`, sin replies directas pendientes. Post propio r/AskSpain `1tayoo3`: score 12, 58 comentarios, upvote ratio 0.93. Hay 5 comentarios nuevos de primer nivel desde la última pasada (Iron_Gal, noxss, ColleenDi, PLS_PM_ME_YOUR_B0OBS, OrangeOk729). Recomendación: responder como mucho 1-2 si se quiere mantener presencia; prioridad Iron_Gal por leishmania + Librela y ColleenDi por perro senior cardiaco. No responder todos. No enlazar patasyhogar todavía.

---

## Comentarios recientes (2026-05-16 en adelante)

- 2026-05-29 r/AskSpain: Voy a adoptar un gato (1t3o18m) — consejos de adaptación inicial para gato adoptado: habitación tranquila, arenero separado de comida, ventanas/balcón protegidos, compra básica sin sobrecargar y preguntar a protectora por vacunas, chip, castración y comida actual. Humanizer aplicado. Castellano España. Sin link. Visible en RSS público. URL: https://www.reddit.com/r/askspain/comments/1t3o18m/voy_a_adoptar_un_gato/ool09rt/
- 2026-05-29 r/mascotas: es normal? (1tqx2ln) — responder a gato que muerde plástico/cosas filosas: no alarmar por morder, pero retirar plásticos/cortantes, ofrecer alternativas seguras y vigilar si traga trozos, babea, vomita o deja de comer. Humanizer aplicado. Castellano España. Sin link. Visible en RSS público. URL: https://www.reddit.com/r/mascotas/comments/1tqx2ln/es_normal/ooktfrb/
- 2026-05-29 r/AskSpain: ¿Qué seguro veterinario recomendáis en España? (1tfzobj) — advertir por escrito sobre preexistencias y carencias tras ataque de epilepsia, separar RC de seguro veterinario de salud, revisar neurología/pruebas/límite/franquicia/exclusiones/centros concertados y enlazar guía propia de seguros como recurso contextual. Humanizer aplicado. Castellano España. Link propio a `/cuidados/seguro-mascotas-espana-guia-2026/`. Visible en RSS público. URL: https://www.reddit.com/r/askspain/comments/1tfzobj/qu?_seguro_veterinario_recomend?is_en_espa?a/ookj7gj/
- 2026-05-28 r/GatosArgentinos: Ayuda! Tengo tres Gatos y todavía no se adaptaron (1tpfpjr) — desaconsejar dejar la puerta abierta tras ataques previos, reiniciar presentación gradual con intercambio de olores, comida a ambos lados de la puerta, barrera visual/física y sesiones cortas; rotar espacios y repartir recursos para que la gata residente no pierda todo el territorio. Humanizer aplicado. Castellano España. Sin link. Visible tras publicación, score inicial 1. URL: https://www.reddit.com/r/GatosArgentinos/comments/1tpfpjr/ayuda_tengo_tres_gatos_y_todav%C3%ADa_no_se_adaptaron/oocv0xg/
- 2026-05-28 r/mascotas: Perro agresivo(?? (1tppu5t) — explicar que el cambio concreto al moverla de noche puede indicar dolor o asociación negativa, recomendar descartar veterinario, dejar de guiar por collar, crear rutina nocturna con premio/correa sin tensión y acudir a profesional de modificación de conducta o etología si ya hay mordidas. Humanizer aplicado. Castellano España. Sin link. Visible tras publicación, score inicial 1. URL: https://www.reddit.com/r/mascotas/comments/1tppu5t/perro_agresivo/oocgv2x/
- 2026-05-27 r/mascotas: Mi perrita ladra demasiado. ¿Qué podría hacer? (1toqb8t) — explicar que Martina parece reaccionar desde el miedo, evitar forzar saludos, trabajar distancia con refuerzo y recomendar educador canino en positivo por tratarse de una conducta mantenida. Humanizer aplicado. Castellano España. Sin link. Visible tras publicación, score inicial 1. URL: https://www.reddit.com/r/mascotas/comments/1toqb8t/mi_perrita_ladra_demasiado_que_podria_hacer/oo4j5f8/
- 2026-05-27 r/GatosArgentinos: Llegó mi primer gatita (1too7tk) — responder a la duda sobre Chili escondiéndose y durmiendo bajo las sábanas: darle tiempo, mantener espacios seguros y no forzar el contacto. Humanizer aplicado. Castellano España. Sin link. Visible tras publicación, score inicial 1. URL: https://www.reddit.com/r/GatosArgentinos/comments/1too7tk/llegó_mi_primer_gatita/oo57cjl/
- 2026-05-27 r/GatosArgentinos: Consejos para ser mamá luchona (1toxlm6) — orientar sobre revisión veterinaria, vacunas/desparasitación, antipulgas adecuado y mejora gradual de alimentación para gato de interior. Humanizer aplicado. Castellano España. Sin link. Visible tras publicación, score inicial 1. URL: https://www.reddit.com/r/GatosArgentinos/comments/1toxlm6/consejos_para_ser_mamá_luchona/oo5jtua/
- 2026-05-27 r/AskSpain: Reply en post propio sobre perro y gato durante viajes (1to4ddp) — responder solo a `Senrra3195`, agradeciendo la perspectiva de visitas a domicilio y concretando que para Mango encaja una visita diaria que compruebe comida, agua, arenero y estado general, mientras Kira probablemente necesite otra solución. Humanizer aplicado. Castellano España. Sin link. Visible tras publicación, score inicial 1. URL: https://www.reddit.com/r/askspain/comments/1to4ddp/los_que_tenéis_perro_y_gato_cómo_os_organizáis/oo4k2rr/
- 2026-05-25 r/GatosArgentinos: ¿Como evito que mis gatitos se metan en la estufa? (1tmsn66) — recomendar no dejar estufa y gatitos sin supervisión, barrera adicional estable y alejada, evitar bloqueos inflamables, cama cálida alternativa y veterinario ante signos de quemadura. Humanizer aplicado. Castellano España. Sin link. URL: https://www.reddit.com/r/GatosArgentinos/comments/1tmsn66/como_evito_que_mis_gatitos_se_metan_en_la_estufa/onrmfzz/
- 2026-05-25 r/GatosArgentinos: AYUDA Gato de casa con patio a departamento (1tmtt5k) — valorar que se quede con la madre si está bien cuidado, no sumar mudanza/avión/pérdida de exterior a un gato muy sensible; si el traslado es inevitable, consulta veterinaria, habituación al transportín y habitación segura inicial. Humanizer aplicado. Castellano España. Sin link. URL: https://www.reddit.com/r/GatosArgentinos/comments/1tmtt5k/ayuda_gato_de_casa_con_patio_a_departamento/onriija/
- 2026-05-25 r/mascotas: Consejos para gatos (1tmwsux) — convivencia de seis gatos con acoso al de 7 años; recomendar separación inmediata con recursos propios, distribuir comederos/areneros/refugios, descargar energía de los jóvenes y consultar veterinario/etólogo si ya evita comida o arenero. Humanizer aplicado. Castellano España. Sin link por gap global de dominio. URL: https://www.reddit.com/r/mascotas/comments/1tmwsux/consejos_para_gatos/onrcoxw/
- 2026-05-24 r/GatosArgentinos: Experiencias con alergia? Gatos hipoalergénicos? (1tkhh8e) — Fel d 1 como alérgeno real (no pelo), siberiano produce menos pero variación individual enorme, importancia probar gato concreto antes de adoptar, cepillado/paño húmedo/HEPA/dormitorio vetado, antihistamínicos + inmunoterapia como vía si alergia fuerte, opción acogida temporal en protectora. Humanizer aplicado. Castellano España. Sin link. URL: https://www.reddit.com/r/GatosArgentinos/comments/1tkhh8e/experiencias_con_alergia_gatos_hipoalergénicos/onk8kgg/
- 2026-05-24 r/GatosArgentinos: Ayuda! Por favor — gata parió y abandonó cachorros (1tkwtwy) — protocolo neonatos huérfanos urgente: calor 28-32 °C primeras 2 semanas, leche maternizada KMR/Babycat (no vaca/humana), tomas cada 2-3h, estimulación cloacal post-toma con algodón húmedo, pesar diario (ganar 5-10g/día), señales urgencia veterinario, gestión protectora con gatas lactantes adoptantes como mejor opción. Humanizer aplicado. Castellano España. Sin link. Visible el 2026-05-25. URL: https://www.reddit.com/r/GatosArgentinos/comments/1tkwtwy/ayuda_por_favor/onkdom3/
- 2026-05-24 r/GatosArgentinos: Alimento Mon Ami (1tkjtlu) — cambio color/tamaño/avidez = reformulación o cambio lote, cortar nuevo y volver al anterior, transición lenta 7-10d (25/75 → 50/50 → 75/25), dieta blanda pollo+calabaza/arroz 24-48h, probiótico FortiFlora 1/día, retirar leche deslactosada temporal, si persiste 48-72h veterinario, escribir a fabricante con foto lote. Humanizer aplicado. Castellano España. Sin link. Visible el 2026-05-25. URL: https://www.reddit.com/r/GatosArgentinos/comments/1tkjtlu/alimento_mon_ami/onkigvu/
- 2026-05-22 r/mascotas: Cómo hago para que mis perras no ladren tanto? (1tk1bt9) — responder a patio con vista al portón: cortar estímulo visual con malla/cañizo, practicar llamada antes de que exploten y dar trabajo de olfato/mordedor seguro. Sin link por gap tras enlace propio del 2026-05-21. URL: https://www.reddit.com/r/mascotas/comments/1tk1bt9/cómo_hago_para_que_mis_perras_no_ladren_tanto/
- 2026-05-22 r/mascotas: Una gatita feliz de 2 meses (1tk8q4q) — comentario ligero con nombres Nala/Mía/Lía/Mandarina, tono natural. Sin link. URL: https://www.reddit.com/r/mascotas/comments/1tk8q4q/una_gatita_feliz_de_2_meses/
- 2026-05-22 r/GatosArgentinos: Alimento balanceado (1tk1a24) — recomendar cambio gradual de pienso, priorizar tolerancia/edad/cacas normales y constancia de compra frente a etiquetas. Castellano España aplicado. Sin link. URL: https://www.reddit.com/r/GatosArgentinos/comments/1tk1a24/alimento_balanceado/
- 2026-05-21 r/mascotas: La gata de mi parcela. Mis caseros no me dejan tener mascotas (1tjf46h) — comentario corto de apoyo: "Es preciosa!!!". Sin link. Score inicial 1. URL: https://www.reddit.com/r/mascotas/comments/1tjf46h/la_gata_de_mi_parcela_mis_caseros_no_me_dejan/on1ncm0/
- 2026-05-21 r/GatosArgentinos: Que producto o mezcla usan para sacar el olor a pis de gato? (1tir6gf) — recomendar limpiador enzimático, evitar amoníaco/lejía, revisar marcaje/tensión entre gatos/areneros y señales de cistitis o infección. Castellano España aplicado. Sin link. Score inicial 1. URL: https://www.reddit.com/r/GatosArgentinos/comments/1tir6gf/que_producto_o_mezcla_usan_para_sacar_el_olor_a/on1gk8l/
- 2026-05-21 r/GatosArgentinos: Cómo la calmo? (1tj51zr) — hiperactividad nocturna en gata joven, juego dirigido antes de dormir, cortar interacción si muerde/se sube, no adoptar otro gato solo para calmarla. Castellano España aplicado. Sin link. Score inicial 2. URL: https://www.reddit.com/r/GatosArgentinos/comments/1tj51zr/c%C3%B3mo_la_calmo/on180na/
- 2026-05-21 r/GatosArgentinos: Gatita nueva! (1ti0gqu) — primer test de link contextual a patasyhogar: feromonas/Feliway como apoyo, separación real entre gatas y enlace a comparativa de difusores de feromonas. Sigue visible, sin reacción negativa inicial, score 2 al revisar. URL: https://www.reddit.com/r/GatosArgentinos/comments/1ti0gqu/gatita_nueva/on14dne/
- 2026-05-20 r/mascotas: Comprale una cama decían (1ti0i3m) — comentario ligero sobre mascotas que rechazan camas, sugerir manta con olor propio o mover la cama al sitio elegido. Humanizer aplicado. Sin link. Score inicial 1. URL: https://www.reddit.com/r/mascotas/comments/1ti0i3m/comprale_una_cama_dec%C3%ADan/omtnot6/
- 2026-05-20 r/GatosArgentinos: Gatita nueva! (1ti0gqu) — presentación lenta entre gatas, separación unos días más, intercambio de olores, comida cerca de la puerta y encuentros cortos. Humanizer aplicado. Sin link. Score inicial 1. URL: https://www.reddit.com/r/GatosArgentinos/comments/1ti0gqu/gatita_nueva/omth90l/
- 2026-05-20 r/GatosArgentinos: Mi gato es infeliz? (1tiaz8y) — explicar que parece sobreestimulación fuera de casa, no infelicidad; evitar soltarlo por riesgo con coches/autobuses/perros y reforzar juego interior. Humanizer aplicado. Sin link. Score inicial 1. URL: https://www.reddit.com/r/GatosArgentinos/comments/1tiaz8y/mi_gato_es_infeliz/omtbznt/
- 2026-05-19 r/Valencia: Mudanza en pareja y gato desde El Carmen (1tgt1r3) — recomendar ampliar búsqueda fuera del centro, zonas Mislata/Nou Moles/Patraix/Benimaclet y pueblos conectados, preparar pack para casero con contrato actual, fotos, seguro/cláusula de daños y preguntar por malla en terraza. Humanizer aplicado. Sin link. URL: https://www.reddit.com/r/valencia/comments/1tgt1r3/comment/omn0d2k/
- 2026-05-19 r/GatosArgentinos: Tips para que no use la planta de baño? (1th5csw) — recomendar cubrir tierra con piedras/piñas/malla rígida, revisar arenero y probar segundo arenero cerca del baño, advertir plantas tóxicas si también muerde. Humanizer aplicado. Sin link. URL: https://www.reddit.com/r/GatosArgentinos/comments/1th5csw/tips_para_que_no_use_la_planta_de_ba%C3%B1o/
- 2026-05-18 r/mascotas: Nueva gatita conoce a mi gatita de casa (1tggmmc) — introducción lenta entre gata joven sociable y gata adulta tímida, recomendar no decidir en 2 semanas salvo señales graves, volver a intercambio de olores y no interpretar bufidos como mala intención. Humanizer aplicado. Sin link. URL: https://www.reddit.com/r/mascotas/comments/1tggmmc/nueva_gatita_conoce_a_mi_gatita_de_casa/
- 2026-05-18 r/mascotas: Necesito su ayuda (1tg644r) — chihuahua con problema de piel/sarna de 1 año, recomendar dermatólogo veterinario, ordenar pruebas previas, confirmar diagnóstico con raspado/citología/cultivo y evitar remedios al azar con piel abierta. Humanizer aplicado. Sin link. URL: https://www.reddit.com/r/mascotas/comments/1tg644r/necesito_su_ayuda/
- 2026-05-18 r/mascotas: Hace dos días me siguió desde muy lejos, se llamará Pulgoso (1tg7kmt) — perro rescatado, recomendar revisión veterinaria, chip, desparasitación, comida gradual, rutina tranquila y placa con teléfono. Humanizer aplicado. Sin link. URL: https://www.reddit.com/r/mascotas/comments/1tg7kmt/hace_dos_días_me_sigui%C3%B3_desde_muy_lejos_se/
- 2026-05-18 r/mascotas: Qué recomiendan para las pulgas (1tg89zd) — recomendar antiparasitario veterinario por peso/especie, tratar entorno, evitar remedios caseros irritantes y pedir edad/peso/especie antes de concretar. Humanizer aplicado. Sin link. URL: https://www.reddit.com/r/mascotas/comments/1tg89zd/que_recomiendan_para_las_pulgas/
- 2026-05-17 r/mascotas: GPS para mascotas (1tf8hmx) — recomendar Tractive GPS vs AirTag vs TKSTAR, cuota mensual 5-7€, AirTag inútil en zona rural, chip+placa como alternativa barata, preguntar tamaño perro. Humanizer aplicado. Sin link. URL: https://www.reddit.com/r/mascotas/comments/1tf8hmx/gps_para_mascotas/
- 2026-05-17 r/GatosArgentinos: Gatito trans — marcaje post-castración (1tfeoyl) — preguntar tiempo desde castración, limpieza enzimática marcas, separación temporal si agresión con agarre, bloquear vista si marca por gatos exteriores, anécdota Mango manta post-castración. Humanizer aplicado. Sin link. URL: https://www.reddit.com/r/GatosArgentinos/comments/1tfeoyl/gatito_trans/
- 2026-05-17 r/GatosArgentinos: Busca cuevitas/cama para gato (1teaqu1) — advertir que fotos de página no coinciden con producto real, recomendar cama iglú polar (ML/AliExpress 8-15k), sleeping bag gato, y caja cartón+manta (anécdota Mango tiró cama de 20€ y se quedó con caja), sugerir mirar medidas y comentarios compradores. Humanizer aplicado. Sin link. URL: https://www.reddit.com/r/GatosArgentinos/comments/1teaqu1/estoy_buscando_estas_cuevitas/
- 2026-05-17 r/GatosArgentinos: Busca cuevitas/cama para gato (1teaqu1) — advertir fotos no coinciden con producto, recomendar cama iglú polar, sleeping bag gato, caja cartón+manta (anécdota Mango tiró cama 20€), sugerir mirar medidas y comentarios. Humanizer aplicado. Sin link. URL: https://www.reddit.com/r/GatosArgentinos/comments/1teaqu1/estoy_buscando_estas_cuevitas/
- 2026-05-17 r/GatosArgentinos: Reply a u/anochezeras en cuevitas — validar experiencia 3 gatos tamaños distintos, recomendar iglú XL para grande + manta en suelo, iglú normal para mediana, caja cartón+manta como prueba antes de gastar, confirmar que fotos engañosas son comunes. Humanizer aplicado. Sin link.
- 2026-05-16 r/AskSpain: Replies en post propio "¿Os han puesto pegas para alquilar piso por tener perro o gato?" (1tduofk) — responder a boo-was-taken sobre dificultad de demostrar mascota y riesgo práctico de no decirlo, y a IzzyReptilia sobre seguro RC + cláusula de responsabilidad por daños como forma sensata de reducir fricción con casero. Sin link.
- 2026-05-16 r/mascotas: Mi gato ha chupado un poco de pastillas de paracetamol (1temyc7) — recomendar llamar a veterinario/urgencias de inmediato, no esperar síntomas, no inducir vómito ni medicar en casa, guardar blíster/caja y datos de hora, dosis y peso. Sin link.

> Historial completo anterior a 2026-05-16: ver `_archive/project_reddit_comments_full.md`
