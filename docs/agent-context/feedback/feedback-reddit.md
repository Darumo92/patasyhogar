# Feedback: Reddit

## Mantener rutina Reddit con humanización estricta

El usuario confirmó el 2026-05-26 que Reddit sigue formando parte del plan diario y no debe descartarse al preparar tareas. Para posts propios, comentarios y replies, aplicar siempre `humanizer`, `.seo-engine/templates/humanization-guide.md`, la voz del proyecto y pasada final de castellano de España antes de presentar el borrador.

### Cómo aplicar

- No retirar Reddit del plan diario por defecto.
- Evitar fórmulas repetidas, tono enciclopédico y enlaces forzados.
- Revisar coherencia con el hilo completo para comentarios y con los posts propios recientes para publicaciones nuevas.
- Mantener los límites de enlaces propios y el tracking de publicaciones.

## Reddit ES — priorizar r/mascotas sobre GatosArgentinos

Cuota diaria Reddit Fase A/B: priorizar **r/mascotas** (mixto perros+gatos, peso ES) sobre **r/GatosArgentinos** (público argentino).

Distribución ideal: **2 r/mascotas + 1 r/GatosArgentinos** por día (no al revés).

**Why:**
- Afiliados patasyhogar = Amazon ES + Zooplus ES + Tiendanimal ES (España)
- r/GatosArgentinos audiencia AR — productos y compras MercadoLibre/MercadoPago. NO convierte
- r/mascotas mezcla ES+LATAM con peso ES significativo
- Posts perro español (bulldog francés, etc) llegan público objetivo real

GatosArgentinos sigue valiendo solo como **karma builder warm-up** (cuenta nueva), no como canal monetización.

### Subs ES verificados (2026-04-27)

Únicos accesibles + mascotas:
- **r/mascotas** — 15K subs, lang=es, mixto perros+gatos, peso ES (UNICO real ES)

403/inexistentes (probados):
- r/perros, r/perro, r/AskEspanol -> BANEADOS
- r/perrosespana, r/perros_espanoles, r/AdoptaUnPerro, r/Dogtraining_Spanish, r/PerrosES, r/CuidoMiPerro, r/PerroEspanol, r/perros_es, r/PerritosEspanol, r/Adiestramientocanino -> 403 (privados/no existen)

r/Spain, r/Madrid, r/Barcelona, r/Valencia: subs generales, sin tag mascotas. Search endpoint bloqueado vía API. Skip salvo búsqueda manual.

### How to apply

Al sugerir hilos Reddit:
1. Filtrar primero r/mascotas, etiquetar DOG vs CAT vs MIX
2. Solo si <2 candidatos buenos r/mascotas, completar con r/GatosArgentinos
3. Hilos perro ES = oro (raza específica + comprador potencial Amazon ES)

Patrones detección hilo perro: keywords `perro/perra/perrito/perrita/cachorr/raza/braqui/labrador/bulldog/mestiz`.

### Borrador pendiente día 2 (2026-04-28)

Hilo: r/mascotas — Bulldog francés respiratorios
URL: https://reddit.com/r/mascotas/comments/1swgo44/es_verdad_que_esta_raza_tienen_problemas/

```
Buenas. Sí, es real, y no es cosa de tu perro — es la raza. Los braquicéfalos (bulldogs, pugs, boxers, shih tzu) vienen con la cara aplastada por años de selección humana, y eso les deja las fosas nasales estrechas y el paladar largo. No es que tu perro esté haciendo nada raro, viene así de fábrica.

Yo tengo una mestiza, Kira, así que no he pasado por esto en primera persona, pero en el parque al que vamos hay un par de bulldogs y la dueña de uno tuvo que llevarlo de urgencia un agosto porque no podía respirar bien. La mayoría se asusta igual que tú la primera vez, porque nadie te avisa de esto cuando entras en la raza.

Mientras consigues el permiso, lo que sí tienes que mirar ya: las encías y la lengua. Si las ves moradas o azuladas, eso es urgencia veterinaria, no esperas a nada. Y en el día a día tres cosas que les cambian la vida: arnés siempre y nunca collar (aprieta justo donde menos pueden permitírselo), cero ejercicio con calor (saca a primera o de noche), y peso a raya — un kilo de más se lo nota muchísimo. Si lo ves jadeando tumbado tranquilo en el sofá, sin haber corrido y sin calor, eso ya no es normal.

Sobre el vet: pregunta antes de dar por hecho que no puedes. Muchas clínicas dan facilidades de pago, y según la zona hay protectoras que colaboran con veterinarios a precio reducido. Y si te hablan de la cirugía BOAS, infórmate bien pero no la pospongas — la gente que la hace dice que les cambia el perro por completo.
```

Verificar antes pegar: hilo sigue activo + OP no respondió cosas que invaliden el comentario.

## Verificar comentarios previos antes de proponer post Reddit

Antes de proponer un post Reddit para comentar, verificar con el usuario si ya ha comentado en el pasado.

**Why:** Comentar dos veces en el mismo hilo da patrón sospechoso (anti-spam Reddit + Google ve cuenta repetida). Daniel ya había comentado en `r/mascotas/comments/1t4urwg/` y se evitó publicar segundo comentario por aviso suyo (2026-05-08).

**How to apply:**
- SIEMPRE presentar lista AMPLIA de candidatos URLs + título PRIMERO.
- Preguntar "¿en cuáles ya comentaste?" ANTES de redactar nada.
- Esperar filtro del usuario antes de invertir tiempo redactando comentarios.
- No tengo acceso al historial Reddit del usuario, depender 100% de su confirmación.
- Errores cometidos 2026-05-08: propuse 1t4urwg (ya comentado), luego 1t43suc (ya comentado). Dos rondas perdidas por no preguntar al inicio.

## Reddit coherencia con el post — siempre leer body completo

**Regla fuego:** antes de redactar cualquier borrador de comentario Reddit (nuevo o reply), leer SIEMPRE el body completo del post + los comentarios ya publicados. El comentario debe encajar con lo que el OP realmente pregunta, no con lo que el título sugiere a primera vista.

**Why:** ocurrió 2026-04-30 día 4 Fase A. Borrador 3 sobre "Mi pequeño gigante vigilando" asumió desde el título que el OP necesitaba consejos sobre articulaciones, dieta y arnés de un perro gigante. El body real iba sobre gente entrometida que le da consejos no pedidos y duda sobre adiestrador. El comentario habría sido irónico (más consejos no pedidos) y fuera de tema. Daniel pidió no volver a comentar "porque sí".

**How to apply (cada comentario Reddit, sin excepción):**

1. Leer body completo del post (`selftext`), no solo título.
2. Leer comentarios ya publicados — entender qué se ha dicho ya, qué tono, si hay consenso, si alguien dijo algo que confirmar/matizar.
3. Identificar la pregunta o necesidad real del OP. Si hay varias preguntas, decidir cuál abordar.
4. Escribir comentario que **responda a lo que pide**. No meter consejos técnicos no pedidos.
5. Si el OP se queja de algo (consejos no pedidos, juicios, etc.), no caer en la misma trampa.
6. Si el ángulo no encaja con experiencia real (Mango/Kira/Daniel Valencia), descartar el hilo y buscar otro.

**Checklist mental antes de pegar borrador:**
- ¿Qué pregunta el OP exactamente? (1 frase)
- ¿Mi comentario responde esa pregunta? (sí/no)
- ¿Estoy dando consejos que NO ha pedido?
- ¿Coherente con anécdotas previas Mango/Kira?
- ¿Castellano peninsular si r/mascotas, AR si r/GatosArgentinos?

Aplica también si Daniel pide "redactar comentario para X hilo" sin más contexto — siempre fetch del post primero.

## Reddit replies — coherencia con cadena, no contradecir ni filler

Antes de redactar cualquier reply en Reddit, releer SIEMPRE la cadena completa:

1. **Post original OP** — qué pregunta/cuenta
2. **Mi comentario previo** — qué aporté yo
3. **Reply ajeno** — qué tono/postura tiene (¿me da la razón? ¿corrige? ¿pregunta? ¿agradece?)

El reply debe responder a ESA cadena, no a un tema genérico relacionado.

### Errores a evitar

**Error 1: contradecir a alguien que me da la razón**
Caso real (2026-04-28, hilo Motita r/GatosArgentinos):
- OP: adoptó gata, tiene 2 perros viejos
- Yo: aporté método presentación gradual con olores + barrera
- Reply OP: "Totalmente. Los procesos importantes. Nosotros 3 meses... Ahora duermen juntos, juegan, se aman!"
- Borrador erróneo mío: "se ignoran como hermanos viejos, es lo máximo a lo que puedes aspirar entre perro y gato"
- -> CONTRADICE su caso (ella dice "se aman", yo digo "máximo es ignorarse"). Suena a minimizar su experiencia.

**Error 2: añadir teoría nueva cuando solo necesita cierre amable**
Si el reply es validación/agradecimiento ("Buenísima data, gracias!", "Totalmente, sí, eso hicimos"), NO meter más datos técnicos. Reply correcto = validar + cerrar corto.

**Error 3: mismo recetario en tono diferente**
Si responde con relato emocional, no responder con bullet técnico. Adaptar registro.

### Cómo aplicar

Antes de pegar borrador, comprobar:

- ¿He leído el POST OP, no solo el reply?
- ¿El reply ajeno me da la razón, me corrige, pregunta, o agradece? Cada caso lleva tono distinto:
  - **Da la razón:** validar SU caso + cierre amable. NO repetir mi teoría.
  - **Agradece:** una frase corta natural. NO meter dato nuevo no pedido.
  - **Pregunta:** responder pregunta concreta + 1 frase contexto.
  - **Corrige:** si tiene razón -> reconocer. Si no -> matizar sin pelear.
- ¿Mi reply contradice algo que la persona acaba de afirmar como cierto en su caso?
- ¿Mi caso personal (Mango/Kira) refuerza o resta a lo que cuenta?
- Idioma: castellano peninsular (tú, vosotros, "espero que le sirva", NO "vos", "che", "buenísima data" en mis posts).

### Patrón reply validación (cuando me dan la razón)

```
[Validar SU experiencia concreta sin mover el foco a la mía]
[Frase corta amable de cierre, sin teoría añadida]
```

Ejemplo correcto Motita:
> "Eso es justo lo bonito, cuando la paciencia da sus frutos. Cuatro meses parece mucho cuando lo estás viviendo, pero verlos durmiendo juntos después compensa de sobra. Disfrutadlos."

**Why:** Usuario detectó dos veces seguidas (2026-04-28) borradores incoherentes con la cadena: primero introducir Kira sin contexto en hilo extraño (lectores no saben quién es), después contradecir a OP que me daba la razón. Ahorra revisión manual del usuario si el flujo de redacción incluye este chequeo de coherencia explícito antes de entregar borrador.

## Reddit comments — tono humano, sin paréntesis SEO

En comentarios Reddit, NO usar paréntesis aclaratorios para describir mascotas/personas. Suena a artículo SEO o bot.

**Mal:** "Mango (gato naranja, 5 años) llegó a casa con pulgas..."
**Bien:** "A Mango lo recogí hace unos años en un parking, naranja y muy flaco. Llegó con pulgas..."
**Bien:** "Tengo un gato naranja, Mango, que llegó a casa con pulgas..."

**Why:** Usuario detectó que "(gato naranja)" en comentario pulgas r/mascotas (2026-04-25) sonaba robot. Reddit espera registro conversacional, no fichas técnicas. Paréntesis = patrón típico de IA/SEO.

**How to apply:**
- Borradores Reddit/foros conversacionales: leer en alto antes de pasar al usuario
- Datos del animal van en la narración, no entre paréntesis
- Variar formas: "mi gato naranja", "el naranja", "Mango, naranja, ~5 años"
- Empezar comentario sin "Nombre (X, Y)" — empezar con anécdota o respuesta directa

### Aplica también
- Cuerpo de artículos cuando hablo de Mango/Kira en primera persona — paréntesis matan voz
- Posts propios Reddit
- Comentarios Pinterest

## Reddit/Patas y Hogar — siempre castellano de España

Todos los borradores de Reddit, replies, posts propios y textos sociales para Patas y Hogar deben ir en **castellano de España**, aunque el hilo sea de r/GatosArgentinos u otra comunidad LATAM.

**Regla:** mantener la voz de Daniel/Patas y Hogar. No adaptar el comentario a voseo ni jerga argentina por el subreddit.

**Usar:** tú, puedes, tienes, gato, perro, arenero, comedero, pienso, veterinario, vale.

**Evitar:** vos, tenés, podés, andá, michi como voz por defecto, bandeja para arenero, MELI, laburo, re como intensificador, expresiones argentinas.

**Checklist antes de entregar borrador Reddit:**
- ¿Está en castellano peninsular?
- ¿Se coló algún `tenés/podés/vos/michi/bandeja`?
- ¿Estoy contestando como Daniel desde España, no imitando el registro del OP?

Si el OP usa español LATAM, se puede citar su término si hace falta, pero la respuesta propia debe seguir en castellano de España.
