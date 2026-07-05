// Spanish strings — pure data, no logic. {placeholders} are filled by js/i18n.js.
window.YAKO_STRINGS = window.YAKO_STRINGS || {};
window.YAKO_STRINGS.es = {
  letterKey: "la letra {k}",
  numberKey: "el número {k}",
  find: "¡Encuentra {key}!",
  starts: "{name} empieza con {letter}. ¡Encuentra {letter}!",
  findFor: "¡Encuentra la letra {letter}, de {name}!",
  spell: "Vamos a deletrear {word}. ¡Encuentra la letra {letter}!",
  next: "¡Muy bien! Ahora encuentra {key}.",
  countIntro: "El siguiente número es {num}. ¡Primero, encuentra el número {digit}!",
  sound: "{letter}... de {word}. ¡Encuentra la letra {letter}!",
  howMany: "¿Cuántos hay? ¡Cuéntalos y aprieta el número!",
  // exact per-creature questions for the recorded clips (correct gender: cuántas conchas/estrellas)
  howManyClips: {
    shells:    "¿Cuántas conchas hay? ¡Cuéntalas y aprieta el número!",
    crabs:     "¿Cuántos cangrejos hay? ¡Cuéntalos y aprieta el número!",
    starfish:  "¿Cuántas estrellas de mar hay? ¡Cuéntalas y aprieta el número!",
    fish:      "¿Cuántos peces hay? ¡Cuéntalos y aprieta el número!",
    octopuses: "¿Cuántos pulpos hay? ¡Cuéntalos y aprieta el número!",
    dolphins:  "¿Cuántos delfines hay? ¡Cuéntalos y aprieta el número!"
  },
  mathAddClip: "¡Hay {a}, y {b} más! ¿Cuántos hay en total?",
  mathSubClip: "Hay {a}, y {b} se van nadando. ¿Cuántos quedan?",
  doneSpellClip: "¡Deletreaste la palabra! ¡Increíble!",
  doneNumClip:   "¡Formaste el número! ¡Increíble!",
  makeNumber:    "¡Vamos a formar un número grande!",
  mathAdd: "{a} {creatures} y {b} {creatures} más. ¿Cuántos hay en total?",
  mathSub: "Hay {a} {creatures}. {b} se van nadando. ¿Cuántos quedan?",
  doneSpell: "¡Deletreaste {word}! ¡Increíble!",
  doneNum: "¡Es el número {word}! ¡Increíble!",
  wrong: "¡Uy! Eso es {pressed}. ¡Encuentra {key}!",
  wrongCount: "¡Uy! Contemos los {creatures} otra vez. ¿Cuántos?",
  wrongMath: "¡Uy! ¡Cuéntalos otra vez!",
  again: "¡Uy! ¡Intenta otra vez!",
  level: "¡Cinco estrellas! ¡Terminaste el nivel {level}! ¡Muy bien!",
  cheers: ["¡Muy bien!","¡Lo estás haciendo genial!","¡Vaya, qué inteligente eres!","¡Eres brillante!","¡Exacto, bien hecho!","¡Estoy muy orgullosa de ti!","¡Excelente trabajo!","¡Eres una estrella!"],
  greet: "¡Hola! ¡A jugar!",
  prompt: {
    letters: "¡Encuentra la letra!", numbers: "¡Encuentra el número!", both: "¡Encuentra la tecla!",
    cat: "¡Encuentra la primera letra!", catNum: "¿Cuál es? ¡Aprieta el número!",
    spelling: "¡Deletrea la palabra!", counting: "¡Forma el número!",
    sounds: "¿Qué sonido? ¡Encuentra la letra!", countobj: "¿Cuántos? ¡Aprieta el número!",
    math: "¡Suma! ¡Aprieta el número!", listen: "¡Escucha! ¡Encuentra la letra!",
    hello: "¿Qué idioma dice hola?", wordsafari: "¡Escucha y toca la imagen!",
    colormix: "¡Escucha y toca el correcto!", countlang: "¡Escucha! ¿Qué grupo es?",
    guesslang: "¿Qué idioma es?", samediff: "¿Mismo idioma o diferente?"
  },
  verdicts: {
    best:     "¡Guau! ¡Tu mejor tiempo!",
    perfect:  "¡Perfecto! ¡Sin errores!",
    faster:   "¡Cada vez eres más rápido!",
    good:     "¡Buen trabajo! ¡Un poco más de práctica y será perfecto!",
    slower:   "¡Un poco más lento esta vez, pero lo lograste!",
    practice: "¡Está bien equivocarse! Tómate tu tiempo y vuelve a intentarlo — ¡tú puedes!",
    next:     "¡Prepárate para la próxima lección!",
    repeat:   "¡Practiquemos una vez más!"
  },
  names: {
    Red:'Rojo', Orange:'Naranja', Yellow:'Amarillo', Green:'Verde', Blue:'Azul', Purple:'Morado',
    Pink:'Rosa', Brown:'Marrón',
    Circle:'Círculo', Square:'Cuadrado', Triangle:'Triángulo', Heart:'Corazón', Star:'Estrella', Diamond:'Rombo',
    Cat:'Gato', Dog:'Perro', Elephant:'Elefante', Frog:'Rana', Giraffe:'Jirafa', Horse:'Caballo',
    Lion:'León', Monkey:'Mono', Owl:'Búho', Pig:'Cerdo', Rabbit:'Conejo', Snake:'Serpiente',
    Tiger:'Tigre', Zebra:'Cebra'
  },
  creatures: {
    shells:'conchas', crabs:'cangrejos', starfish:'estrellas de mar',
    fish:'peces', octopuses:'pulpos', dolphins:'delfines'
  },
  phonics: {
    A:{word:'Abeja',emoji:'🐝'}, B:{word:'Barco',emoji:'⛵'}, C:{word:'Casa',emoji:'🏠'}, D:{word:'Delfín',emoji:'🐬'},
    E:{word:'Estrella',emoji:'⭐'}, F:{word:'Flor',emoji:'🌸'}, G:{word:'Gato',emoji:'🐱'}, H:{word:'Helado',emoji:'🍦'},
    I:{word:'Isla',emoji:'🏝️'}, J:{word:'Jugo',emoji:'🧃'}, K:{word:'Koala',emoji:'🐨'}, L:{word:'Luna',emoji:'🌙'},
    M:{word:'Manzana',emoji:'🍎'}, N:{word:'Nube',emoji:'☁️'}, O:{word:'Oso',emoji:'🐻'}, P:{word:'Pez',emoji:'🐟'},
    Q:{word:'Queso',emoji:'🧀'}, R:{word:'Rana',emoji:'🐸'}, S:{word:'Sol',emoji:'☀️'}, T:{word:'Tortuga',emoji:'🐢'},
    U:{word:'Uvas',emoji:'🍇'}, V:{word:'Vaca',emoji:'🐮'}, W:{word:'Wagón',emoji:'🚃'}, X:{word:'Xilófono',emoji:'🎼'},
    Y:{word:'Yoyo',emoji:'🪀'}, Z:{word:'Zorro',emoji:'🦊'}
  }
};
