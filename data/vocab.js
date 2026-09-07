// Language-lesson vocabulary — pure data, shared by the game AND tools/check-voices.mjs.
// The clip key for a word is  word_<englishname lowercased>  (e.g. word_dog),
// and the SAME key in each language folder holds that language's word:
//   voice/clips/tl/mom/word_dog.mp3 == "Aso", voice/clips/fr/mom/word_dog.mp3 == "Chien".
// Numbers are numword_1..numword_10; the greeting is  hello.
window.YAKO_VOCAB = {
  // the six languages the game speaks, in flag-row order
  LANGS: [
    { p: 'en', flag: '🇬🇧', label: 'English' },
    { p: 'fr', flag: '🇫🇷', label: 'Français' },
    { p: 'es', flag: '🇪🇸', label: 'Español' },
    { p: 'he', flag: '🇮🇱', label: 'עברית' },
    { p: 'tl', flag: '🇵🇭', label: 'Tagalog' },
    { p: 'zh', flag: '🇨🇳', label: '中文' }
  ],
  // object word in every language — English key matches CATEGORY_NAMES / *_DATA names
  WORDS: {
    // animals
    Cat:     { en: 'Cat',      fr: 'Chat',      es: 'Gato',      he: 'חתול',   tl: 'Pusa',       zh: '猫' },
    Dog:     { en: 'Dog',      fr: 'Chien',     es: 'Perro',     he: 'כלב',    tl: 'Aso',        zh: '狗' },
    Elephant:{ en: 'Elephant', fr: 'Éléphant',  es: 'Elefante',  he: 'פיל',    tl: 'Elepante',   zh: '大象' },
    Frog:    { en: 'Frog',     fr: 'Grenouille',es: 'Rana',      he: 'צפרדע',  tl: 'Palaka',     zh: '青蛙' },
    Giraffe: { en: 'Giraffe',  fr: 'Girafe',    es: 'Jirafa',    he: "ג'ירפה", tl: 'Dyirap',     zh: '长颈鹿' },
    Horse:   { en: 'Horse',    fr: 'Cheval',    es: 'Caballo',   he: 'סוס',    tl: 'Kabayo',     zh: '马' },
    Lion:    { en: 'Lion',     fr: 'Lion',      es: 'León',      he: 'אריה',   tl: 'Leon',       zh: '狮子' },
    Monkey:  { en: 'Monkey',   fr: 'Singe',     es: 'Mono',      he: 'קוף',    tl: 'Unggoy',     zh: '猴子' },
    Owl:     { en: 'Owl',      fr: 'Hibou',     es: 'Búho',      he: 'ינשוף',  tl: 'Kuwago',     zh: '猫头鹰' },
    Pig:     { en: 'Pig',      fr: 'Cochon',    es: 'Cerdo',     he: 'חזיר',   tl: 'Baboy',      zh: '猪' },
    Rabbit:  { en: 'Rabbit',   fr: 'Lapin',     es: 'Conejo',    he: 'ארנב',   tl: 'Kuneho',     zh: '兔子' },
    Snake:   { en: 'Snake',    fr: 'Serpent',   es: 'Serpiente', he: 'נחש',    tl: 'Ahas',       zh: '蛇' },
    Tiger:   { en: 'Tiger',    fr: 'Tigre',     es: 'Tigre',     he: 'נמר',    tl: 'Tigre',      zh: '老虎' },
    Zebra:   { en: 'Zebra',    fr: 'Zèbre',     es: 'Cebra',     he: 'זברה',   tl: 'Sebra',      zh: '斑马' },
    // local Monterey Peninsula animals
    Seal:    { en: 'Seal',     fr: 'Phoque',    es: 'Foca',      he: 'כלב ים',  tl: 'Poka',      zh: '海豹' },
    Otter:   { en: 'Otter',    fr: 'Loutre',    es: 'Nutria',    he: 'לוטרה',   tl: 'Otter',     zh: '海獭' },
    Whale:   { en: 'Whale',    fr: 'Baleine',   es: 'Ballena',   he: 'לווייתן', tl: 'Balyena',   zh: '鲸鱼' },
    Deer:    { en: 'Deer',     fr: 'Cerf',      es: 'Ciervo',    he: 'אייל',    tl: 'Usa',       zh: '鹿' },
    Quail:   { en: 'Quail',    fr: 'Caille',    es: 'Codorniz',  he: 'שליו',    tl: 'Pugo',      zh: '鹌鹑' },
    Squirrel:{ en: 'Squirrel', fr: 'Écureuil',  es: 'Ardilla',   he: 'סנאי',    tl: 'Ardilya',   zh: '松鼠' },
    Pelican: { en: 'Pelican',  fr: 'Pélican',   es: 'Pelícano',  he: 'שקנאי',   tl: 'Pelikano',  zh: '鹈鹕' },
    Sheep:   { en: 'Sheep',    fr: 'Mouton',    es: 'Oveja',     he: 'כבשה',    tl: 'Tupa',      zh: '绵羊' },
    Cow:     { en: 'Cow',      fr: 'Vache',     es: 'Vaca',      he: 'פרה',     tl: 'Baka',      zh: '奶牛' },
    Bird:    { en: 'Bird',     fr: 'Oiseau',    es: 'Pájaro',    he: 'ציפור',   tl: 'Ibon',      zh: '小鸟' },
    Fish:    { en: 'Fish',     fr: 'Poisson',   es: 'Pez',       he: 'דג',      tl: 'Isda',      zh: '鱼' },
    // colors
    Red:     { en: 'Red',      fr: 'Rouge',     es: 'Rojo',      he: 'אדום',   tl: 'Pula',       zh: '红色' },
    Orange:  { en: 'Orange',   fr: 'Orange',    es: 'Naranja',   he: 'כתום',   tl: 'Kahel',      zh: '橙色' },
    Yellow:  { en: 'Yellow',   fr: 'Jaune',     es: 'Amarillo',  he: 'צהוב',   tl: 'Dilaw',      zh: '黄色' },
    Green:   { en: 'Green',    fr: 'Vert',      es: 'Verde',     he: 'ירוק',   tl: 'Berde',      zh: '绿色' },
    Blue:    { en: 'Blue',     fr: 'Bleu',      es: 'Azul',      he: 'כחול',   tl: 'Asul',       zh: '蓝色' },
    Purple:  { en: 'Purple',   fr: 'Violet',    es: 'Morado',    he: 'סגול',   tl: 'Lila',       zh: '紫色' },
    Pink:    { en: 'Pink',     fr: 'Rose',      es: 'Rosa',      he: 'ורוד',   tl: 'Rosas',      zh: '粉色' },
    Brown:   { en: 'Brown',    fr: 'Marron',    es: 'Marrón',    he: 'חום',    tl: 'Kayumanggi', zh: '棕色' },
    // shapes
    Circle:  { en: 'Circle',   fr: 'Cercle',    es: 'Círculo',   he: 'עיגול',  tl: 'Bilog',      zh: '圆形' },
    Square:  { en: 'Square',   fr: 'Carré',     es: 'Cuadrado',  he: 'ריבוע',  tl: 'Parisukat',  zh: '正方形' },
    Triangle:{ en: 'Triangle', fr: 'Triangle',  es: 'Triángulo', he: 'משולש',  tl: 'Tatsulok',   zh: '三角形' },
    Heart:   { en: 'Heart',    fr: 'Cœur',      es: 'Corazón',   he: 'לב',     tl: 'Puso',       zh: '爱心' },
    Star:    { en: 'Star',     fr: 'Étoile',    es: 'Estrella',  he: 'כוכב',   tl: 'Bituin',     zh: '星星' },
    Diamond: { en: 'Diamond',  fr: 'Losange',   es: 'Rombo',     he: 'מעוין',  tl: 'Diyamante',  zh: '菱形' }
  },
  // number words 1-10 (Hebrew uses feminine cardinals, as when counting objects)
  NUMS: {
    1:  { en: 'One',   fr: 'Un',     es: 'Uno',    he: 'אחת',    tl: 'Isa',    zh: '一' },
    2:  { en: 'Two',   fr: 'Deux',   es: 'Dos',    he: 'שתיים',  tl: 'Dalawa', zh: '二' },
    3:  { en: 'Three', fr: 'Trois',  es: 'Tres',   he: 'שלוש',   tl: 'Tatlo',  zh: '三' },
    4:  { en: 'Four',  fr: 'Quatre', es: 'Cuatro', he: 'ארבע',   tl: 'Apat',   zh: '四' },
    5:  { en: 'Five',  fr: 'Cinq',   es: 'Cinco',  he: 'חמש',    tl: 'Lima',   zh: '五' },
    6:  { en: 'Six',   fr: 'Six',    es: 'Seis',   he: 'שש',     tl: 'Anim',   zh: '六' },
    7:  { en: 'Seven', fr: 'Sept',   es: 'Siete',  he: 'שבע',    tl: 'Pito',   zh: '七' },
    8:  { en: 'Eight', fr: 'Huit',   es: 'Ocho',   he: 'שמונה',  tl: 'Walo',   zh: '八' },
    9:  { en: 'Nine',  fr: 'Neuf',   es: 'Nueve',  he: 'תשע',    tl: 'Siyam',  zh: '九' },
    10: { en: 'Ten',   fr: 'Dix',    es: 'Diez',   he: 'עשר',    tl: 'Sampu',  zh: '十' }
  },
  // greeting per language
  HELLO: { en: 'Hello!', fr: 'Bonjour !', es: '¡Hola!', he: 'שלום!', tl: 'Kumusta!', zh: '你好！' },
  // "How many <animal>?" naming the animal in every language ({w} = the animal word)
  HOWMANY: {
    en: 'How many {w}? Count them, then press the number!',
    fr: 'Combien de {w} ? Compte-les, puis appuie sur le chiffre !',
    es: '¿Cuántos {w} hay? ¡Cuéntalos y aprieta el número!',
    he: 'כמה {w}? ספרו אותם ולחצו על המספר!',
    tl: 'Ilan ang {w}? Bilangin mo, tapos pindutin ang numero!',
    zh: '有多少{w}？数一数，然后按数字！'
  },
  // "Welcome to {place}!" for the Monterey Adventures place intros ({p} = English place name)
  WELCOME: {
    en: "Welcome to {p}! Let's count!",
    fr: 'Bienvenue à {p} ! On compte !',
    es: '¡Bienvenido a {p}! ¡A contar!',
    he: 'ברוכים הבאים ל-{p}! בואו נספור!',
    tl: 'Maligayang pagdating sa {p}! Bilangin natin!',
    zh: '欢迎来到{p}！我们来数数吧！'
  }
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
  // ordered peninsula tour (campaign advances through these by level);
  // fact + loves feed the tap-the-location Yako card (spoken by the narrator)
  PLACES: [
    { id: 'mission',      name: 'Mission Ranch',  scene: 'scenes/mission.png',      animals: ['sheep', 'cow', 'bird'],
      fact:  'Mission Ranch is a cozy old ranch in Carmel where woolly sheep graze in the meadow by the sea.',
      loves: 'Yako loves saying good morning to the sheep while his puppy tries to count them all!' },
    { id: 'bigsur',       name: 'Big Sur',        scene: 'scenes/bigsur.png',       animals: ['deer', 'cow', 'bird', 'squirrel'],
      fact:  'Big Sur is a wild, beautiful coast where giant cliffs meet the ocean and condors soar overhead.',
      loves: 'Yako loves hiking the big cliffs and waving at the waves crashing far below with his puppy!' },
    { id: 'carmelvalley', name: 'Carmel Valley',  scene: 'scenes/carmelvalley.png', animals: ['quail', 'rabbit', 'deer', 'squirrel'],
      fact:  'Carmel Valley is full of sunny golden hills, old oak trees, and little quail running in the grass.',
      loves: 'Yako loves picnics under the oak trees while his puppy chases butterflies through the tall grass!' },
    { id: 'pebble',       name: 'Pebble Beach',   scene: 'scenes/pebble.png',       animals: ['whale', 'deer', 'seal'],
      fact:  'Pebble Beach is famous for its lone cypress tree standing on a rock above the sparkling sea.',
      loves: 'Yako loves looking for spouting whales from the shore — his puppy barks hello to every one!' },
    { id: 'pacificgrove', name: 'Pacific Grove',  scene: 'scenes/pacificgrove.png', animals: ['bird', 'seal', 'whale'],
      fact:  'Pacific Grove is called Butterfly Town, because thousands of monarch butterflies rest there every winter.',
      loves: 'Yako loves tide-pooling on the rocky shore, finding starfish while his puppy sniffs the sea breeze!' },
    { id: 'montereybay',  name: 'Monterey Bay',   scene: 'scenes/montereybay.png',  animals: ['otter', 'pelican', 'whale', 'fish'],
      fact:  'Monterey Bay has a huge underwater canyon and a famous aquarium full of amazing sea creatures.',
      loves: 'Yako loves watching the sea otters float on their backs — his puppy wishes he could float like that too!' }
  ]
};
