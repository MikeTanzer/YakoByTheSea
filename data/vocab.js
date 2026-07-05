// Language-lesson vocabulary — pure data, shared by the game AND tools/check-voices.mjs.
// The clip key for a word is  word_<englishname lowercased>  (e.g. word_dog),
// and the SAME key in each language folder holds that language's word:
//   voice/clips/tl/mom/word_dog.mp3 == "Aso", voice/clips/fr/mom/word_dog.mp3 == "Chien".
// Numbers are numword_1..numword_10; the greeting is  hello.
window.YAKO_VOCAB = {
  // the five languages the game speaks, in flag-row order
  LANGS: [
    { p: 'en', flag: '🇬🇧', label: 'English' },
    { p: 'fr', flag: '🇫🇷', label: 'Français' },
    { p: 'es', flag: '🇪🇸', label: 'Español' },
    { p: 'he', flag: '🇮🇱', label: 'עברית' },
    { p: 'tl', flag: '🇵🇭', label: 'Tagalog' }
  ],
  // object word in every language — English key matches CATEGORY_NAMES / *_DATA names
  WORDS: {
    // animals
    Cat:     { en: 'Cat',      fr: 'Chat',      es: 'Gato',      he: 'חתול',   tl: 'Pusa' },
    Dog:     { en: 'Dog',      fr: 'Chien',     es: 'Perro',     he: 'כלב',    tl: 'Aso' },
    Elephant:{ en: 'Elephant', fr: 'Éléphant',  es: 'Elefante',  he: 'פיל',    tl: 'Elepante' },
    Frog:    { en: 'Frog',     fr: 'Grenouille',es: 'Rana',      he: 'צפרדע',  tl: 'Palaka' },
    Giraffe: { en: 'Giraffe',  fr: 'Girafe',    es: 'Jirafa',    he: "ג'ירפה", tl: 'Dyirap' },
    Horse:   { en: 'Horse',    fr: 'Cheval',    es: 'Caballo',   he: 'סוס',    tl: 'Kabayo' },
    Lion:    { en: 'Lion',     fr: 'Lion',      es: 'León',      he: 'אריה',   tl: 'Leon' },
    Monkey:  { en: 'Monkey',   fr: 'Singe',     es: 'Mono',      he: 'קוף',    tl: 'Unggoy' },
    Owl:     { en: 'Owl',      fr: 'Hibou',     es: 'Búho',      he: 'ינשוף',  tl: 'Kuwago' },
    Pig:     { en: 'Pig',      fr: 'Cochon',    es: 'Cerdo',     he: 'חזיר',   tl: 'Baboy' },
    Rabbit:  { en: 'Rabbit',   fr: 'Lapin',     es: 'Conejo',    he: 'ארנב',   tl: 'Kuneho' },
    Snake:   { en: 'Snake',    fr: 'Serpent',   es: 'Serpiente', he: 'נחש',    tl: 'Ahas' },
    Tiger:   { en: 'Tiger',    fr: 'Tigre',     es: 'Tigre',     he: 'נמר',    tl: 'Tigre' },
    Zebra:   { en: 'Zebra',    fr: 'Zèbre',     es: 'Cebra',     he: 'זברה',   tl: 'Sebra' },
    // colors
    Red:     { en: 'Red',      fr: 'Rouge',     es: 'Rojo',      he: 'אדום',   tl: 'Pula' },
    Orange:  { en: 'Orange',   fr: 'Orange',    es: 'Naranja',   he: 'כתום',   tl: 'Kahel' },
    Yellow:  { en: 'Yellow',   fr: 'Jaune',     es: 'Amarillo',  he: 'צהוב',   tl: 'Dilaw' },
    Green:   { en: 'Green',    fr: 'Vert',      es: 'Verde',     he: 'ירוק',   tl: 'Berde' },
    Blue:    { en: 'Blue',     fr: 'Bleu',      es: 'Azul',      he: 'כחול',   tl: 'Asul' },
    Purple:  { en: 'Purple',   fr: 'Violet',    es: 'Morado',    he: 'סגול',   tl: 'Lila' },
    Pink:    { en: 'Pink',     fr: 'Rose',      es: 'Rosa',      he: 'ורוד',   tl: 'Rosas' },
    Brown:   { en: 'Brown',    fr: 'Marron',    es: 'Marrón',    he: 'חום',    tl: 'Kayumanggi' },
    // shapes
    Circle:  { en: 'Circle',   fr: 'Cercle',    es: 'Círculo',   he: 'עיגול',  tl: 'Bilog' },
    Square:  { en: 'Square',   fr: 'Carré',     es: 'Cuadrado',  he: 'ריבוע',  tl: 'Parisukat' },
    Triangle:{ en: 'Triangle', fr: 'Triangle',  es: 'Triángulo', he: 'משולש',  tl: 'Tatsulok' },
    Heart:   { en: 'Heart',    fr: 'Cœur',      es: 'Corazón',   he: 'לב',     tl: 'Puso' },
    Star:    { en: 'Star',     fr: 'Étoile',    es: 'Estrella',  he: 'כוכב',   tl: 'Bituin' },
    Diamond: { en: 'Diamond',  fr: 'Losange',   es: 'Rombo',     he: 'מעוין',  tl: 'Diyamante' }
  },
  // number words 1-10 (Hebrew uses feminine cardinals, as when counting objects)
  NUMS: {
    1:  { en: 'One',   fr: 'Un',     es: 'Uno',    he: 'אחת',    tl: 'Isa' },
    2:  { en: 'Two',   fr: 'Deux',   es: 'Dos',    he: 'שתיים',  tl: 'Dalawa' },
    3:  { en: 'Three', fr: 'Trois',  es: 'Tres',   he: 'שלוש',   tl: 'Tatlo' },
    4:  { en: 'Four',  fr: 'Quatre', es: 'Cuatro', he: 'ארבע',   tl: 'Apat' },
    5:  { en: 'Five',  fr: 'Cinq',   es: 'Cinco',  he: 'חמש',    tl: 'Lima' },
    6:  { en: 'Six',   fr: 'Six',    es: 'Seis',   he: 'שש',     tl: 'Anim' },
    7:  { en: 'Seven', fr: 'Sept',   es: 'Siete',  he: 'שבע',    tl: 'Pito' },
    8:  { en: 'Eight', fr: 'Huit',   es: 'Ocho',   he: 'שמונה',  tl: 'Walo' },
    9:  { en: 'Nine',  fr: 'Neuf',   es: 'Nueve',  he: 'תשע',    tl: 'Siyam' },
    10: { en: 'Ten',   fr: 'Dix',    es: 'Diez',   he: 'עשר',    tl: 'Sampu' }
  },
  // greeting per language
  HELLO: { en: 'Hello!', fr: 'Bonjour !', es: '¡Hola!', he: 'שלום!', tl: 'Kumusta!' }
};

// Monterey Adventures — Yako learns to count in his own backyard: the Monterey
// Peninsula. Each place has a painted backdrop (scenes/) and its local animals.
window.YAKO_MONTEREY = {
  ANIMALS: {
    sheep: { emoji: '🐑', name: 'sheep' },  cow:      { emoji: '🐮', name: 'cows' },
    bird:  { emoji: '🐦', name: 'birds' },  deer:     { emoji: '🦌', name: 'deer' },
    quail: { emoji: '🐦', name: 'quail' },  rabbit:   { emoji: '🐰', name: 'rabbits' },
    squirrel: { emoji: '🐿️', name: 'squirrels' }, whale: { emoji: '🐋', name: 'whales' },
    seal:  { emoji: '🦭', name: 'seals' },  otter:    { emoji: '🦦', name: 'sea otters' },
    pelican: { emoji: '🐦', name: 'pelicans' }, fish: { emoji: '🐟', name: 'fish' }
  },
  // ordered peninsula tour (campaign advances through these by level)
  PLACES: [
    { id: 'mission',      name: 'Mission Ranch',  scene: 'scenes/mission.png',      animals: ['sheep', 'cow', 'bird'] },
    { id: 'bigsur',       name: 'Big Sur',        scene: 'scenes/bigsur.png',       animals: ['deer', 'cow', 'bird', 'squirrel'] },
    { id: 'carmelvalley', name: 'Carmel Valley',  scene: 'scenes/carmelvalley.png', animals: ['quail', 'rabbit', 'deer', 'squirrel'] },
    { id: 'pebble',       name: 'Pebble Beach',   scene: 'scenes/pebble.png',       animals: ['whale', 'deer', 'seal'] },
    { id: 'pacificgrove', name: 'Pacific Grove',  scene: 'scenes/pacificgrove.png', animals: ['bird', 'seal', 'whale'] },
    { id: 'montereybay',  name: 'Monterey Bay',   scene: 'scenes/montereybay.png',  animals: ['otter', 'pelican', 'whale', 'fish'] }
  ]
};
