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
    10: { en: 'Ten',   fr: 'Dix',    es: 'Diez',   he: 'עשר',    tl: 'Sampu',  zh: '十' },
    // 11-20: Count Sheep counts aloud up to 20 at the Confident tier (js/ranch.js counts
    // every sheep on the meadow). Without these, numWord() fell back to the bare numeral
    // "11", so the narrator read a digit instead of the word — in every language.
    // Hebrew keeps the feminine counting forms used for 1-10 above.
    11: { en: 'Eleven',    fr: 'Onze',     es: 'Once',       he: 'אחת עשרה',   tl: 'Labing-isa',   zh: '十一' },
    12: { en: 'Twelve',    fr: 'Douze',    es: 'Doce',       he: 'שתים עשרה',  tl: 'Labindalawa',  zh: '十二' },
    13: { en: 'Thirteen',  fr: 'Treize',   es: 'Trece',      he: 'שלוש עשרה',  tl: 'Labintatlo',   zh: '十三' },
    14: { en: 'Fourteen',  fr: 'Quatorze', es: 'Catorce',    he: 'ארבע עשרה',  tl: 'Labing-apat',  zh: '十四' },
    15: { en: 'Fifteen',   fr: 'Quinze',   es: 'Quince',     he: 'חמש עשרה',   tl: 'Labinlima',    zh: '十五' },
    16: { en: 'Sixteen',   fr: 'Seize',    es: 'Dieciséis',  he: 'שש עשרה',    tl: 'Labing-anim',  zh: '十六' },
    17: { en: 'Seventeen', fr: 'Dix-sept', es: 'Diecisiete', he: 'שבע עשרה',   tl: 'Labimpito',    zh: '十七' },
    18: { en: 'Eighteen',  fr: 'Dix-huit', es: 'Dieciocho',  he: 'שמונה עשרה', tl: 'Labingwalo',   zh: '十八' },
    19: { en: 'Nineteen',  fr: 'Dix-neuf', es: 'Diecinueve', he: 'תשע עשרה',   tl: 'Labinsiyam',   zh: '十九' },
    20: { en: 'Twenty',    fr: 'Vingt',    es: 'Veinte',     he: 'עשרים',     tl: 'Dalawampu',    zh: '二十' }
  },
  // greeting per language
  // ---- Vowels -------------------------------------------------------------
  // The sound each vowel makes WHEN USED AS A VOWEL INSIDE a word — not the letter
  // name, and not the initial-sound phonics in PHONICS (which teaches "A is for
  // Apple"). Here the example word carries the vowel in the MIDDLE, which is the
  // only way to demonstrate the sound being taught: cat, not apple.
  //
  // Every vowel has two: the short sound and the long sound. Teaching only one
  // would be teaching a half-truth — a child who learns "A says ah" cannot read
  // "cake". Y is included because it is a vowel whenever a word has no other one.
  //
  // The sounds are spelled the way a speech synthesiser pronounces them correctly,
  // not in IPA — these strings are read aloud verbatim when no recorded clip exists.
  // English only, like the rest of the phonics: the narration around them is
  // localized, the letters and sounds are not (the answer keys must stay QWERTY).
  VOWELS: {
    A: [{ k: 'short', sound: 'aah', word: 'cat',     emoji: '🐱' },
        { k: 'long',  sound: 'ay',  word: 'cake',    emoji: '🎂' }],
    E: [{ k: 'short', sound: 'eh',  word: 'bed',     emoji: '🛏️' },
        { k: 'long',  sound: 'ee',  word: 'tree',    emoji: '🌳' }],
    I: [{ k: 'short', sound: 'ih',  word: 'pig',     emoji: '🐷' },
        { k: 'long',  sound: 'eye', word: 'bike',    emoji: '🚲' }],
    O: [{ k: 'short', sound: 'ah',  word: 'dog',     emoji: '🐶' },
        { k: 'long',  sound: 'oh',  word: 'boat',    emoji: '⛵' }],
    U: [{ k: 'short', sound: 'uh',  word: 'sun',     emoji: '☀️' },
        { k: 'long',  sound: 'yoo', word: 'unicorn', emoji: '🦄' }],
    // Y is the odd one: as a vowel it borrows E's long sound at the end of a long
    // word (happy) and I's long sound at the end of a short one (fly).
    Y: [{ k: 'short', sound: 'ee',  word: 'happy',   emoji: '😊' },
        { k: 'long',  sound: 'eye', word: 'fly',     emoji: '🦋' }]
  },

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
  // Place-card prose (fact + loves) translated per language; the English original
  // lives on each PLACES entry above and is the fallback for any gap here.
  // Place names stay in Latin script so the narration matches the card's title.
  PLACE_T: {
    mission: {
      fr: { fact: "Mission Ranch est un vieux ranch tout douillet à Carmel, où des moutons à la laine bien douce broutent dans le pré au bord de la mer.",
            loves: "Yako adore dire bonjour aux moutons pendant que son chiot essaie de tous les compter !" },
      es: { fact: "Mission Ranch es un rancho antiguo y acogedor en Carmel, donde las ovejas lanudas pastan en el prado junto al mar.",
            loves: "¡A Yako le encanta darles los buenos días a las ovejas mientras su perrito trata de contarlas todas!" },
      he: { fact: "Mission Ranch היא חווה ישנה וחמימה בעיירה Carmel, שבה כבשים צמריריות רועות באחו שליד הים.",
            loves: "Yako אוהב להגיד בוקר טוב לכבשים, בזמן שהגור שלו מנסה לספור את כולן!" },
      tl: { fact: "Ang Mission Ranch ay isang kaaya-aya at lumang rantso sa Carmel, kung saan nanginginain ang mga mabalahibong tupa sa parang sa tabi ng dagat.",
            loves: "Gustong-gusto ni Yako na batiin ng magandang umaga ang mga tupa habang sinusubukan naman ng kanyang tuta na bilangin silang lahat!" },
      zh: { fact: "Mission Ranch 是 Carmel 一座暖洋洋的老牧场，毛茸茸的绵羊在海边的草地上吃草。",
            loves: "Yako 最喜欢跟绵羊说早上好，他的小狗在旁边努力想把它们全都数清楚！" }
    },
    bigsur: {
      fr: { fact: "Big Sur est une côte sauvage et magnifique, où d'immenses falaises plongent dans l'océan et où des condors planent tout là-haut.",
            loves: "Yako adore marcher sur les grandes falaises avec son chiot et faire coucou aux vagues qui viennent se briser tout en bas !" },
      es: { fact: "Big Sur es una costa salvaje y hermosa, donde unos acantilados gigantes bajan hasta el océano y los cóndores planean allá arriba.",
            loves: "¡A Yako le encanta caminar por los acantilados grandes con su perrito y saludar a las olas que rompen allá abajo, muy lejos!" },
      he: { fact: "Big Sur הוא חוף פראי ויפה, שבו צוקים ענקיים נפגשים עם האוקיינוס וקונדורים מרחפים גבוה בשמיים.",
            loves: "Yako אוהב לטייל עם הגור שלו על הצוקים הגדולים ולנופף לגלים שמתנפצים הרחק למטה!" },
      tl: { fact: "Ang Big Sur ay isang mabangis at magandang baybayin, kung saan sinasalubong ng mga higanteng bangin ang karagatan, at lumilipad sa itaas ang mga kondor.",
            loves: "Gustong-gusto ni Yako na mag-hiking sa malalaking bangin kasama ang kanyang tuta, at kumaway sa mga along humahampas sa ibaba, doon sa malayo!" },
      zh: { fact: "Big Sur 是一片又野又美的海岸，巨大的悬崖直直地立在大海边，神鹫在高高的天上盘旋。",
            loves: "Yako 最喜欢带着小狗爬上高高的悬崖，向下面远处拍打的海浪挥挥手！" }
    },
    carmelvalley: {
      fr: { fact: "Carmel Valley, c'est plein de collines dorées par le soleil, de vieux chênes et de petites cailles qui courent dans l'herbe.",
            loves: "Yako adore pique-niquer sous les chênes pendant que son chiot court après les papillons dans les hautes herbes !" },
      es: { fact: "Carmel Valley está lleno de colinas doradas y soleadas, robles viejos y codornices pequeñitas que corren entre la hierba.",
            loves: "¡A Yako le encantan los picnics debajo de los robles mientras su perrito persigue mariposas entre la hierba alta!" },
      he: { fact: "Carmel Valley מלא בגבעות זהובות שטופות שמש, בעצי אלון זקנים ובציפורים קטנות שרצות בין העשבים.",
            loves: "Yako אוהב לעשות פיקניק מתחת לעצי האלון, בזמן שהגור שלו רודף אחרי פרפרים בעשב הגבוה!" },
      tl: { fact: "Ang Carmel Valley ay puno ng maaraw at ginintuang mga burol, matatandang punong oak, at maliliit na pugong tumatakbo sa damuhan.",
            loves: "Gustong-gusto ni Yako ang piknik sa ilalim ng mga punong oak habang hinahabol naman ng kanyang tuta ang mga paruparo sa matataas na damo!" },
      zh: { fact: "Carmel Valley 到处都是洒满阳光的金色山坡、古老的橡树，还有在草丛里跑来跑去的小鹌鹑。",
            loves: "Yako 最喜欢在橡树下野餐，他的小狗在高高的草丛里追蝴蝶！" }
    },
    pebble: {
      fr: { fact: "Pebble Beach est célèbre pour son cyprès solitaire, planté sur un rocher au-dessus de la mer qui scintille.",
            loves: "Depuis le rivage, Yako adore guetter les baleines qui soufflent, et son chiot dit bonjour à chacune en aboyant !" },
      es: { fact: "Pebble Beach es famoso por su ciprés solitario, que crece sobre una roca por encima del mar brillante.",
            loves: "¡Desde la orilla, a Yako le encanta buscar ballenas que lanzan chorros de agua, y su perrito les ladra hola a todas!" },
      he: { fact: "Pebble Beach מפורסם בזכות עץ הברוש הבודד שעומד על סלע מעל הים הנוצץ.",
            loves: "Yako אוהב לעמוד על החוף ולחפש לווייתנים שמתיזים מים, והגור שלו נובח שלום לכל אחד מהם!" },
      tl: { fact: "Sikat ang Pebble Beach dahil sa nag-iisang punong sipres na nakatayo sa isang bato sa itaas ng kumikinang na dagat.",
            loves: "Mula sa dalampasigan, gustong-gusto ni Yako na maghanap ng mga balyenang bumubuga ng tubig, at tinatahulan naman ng kanyang tuta ang bawat isa bilang pagbati!" },
      zh: { fact: "Pebble Beach 最有名的就是那棵孤零零的柏树，它高高地站在岩石上，下面是闪闪发光的大海。",
            loves: "Yako 最喜欢在岸边找喷水的鲸鱼，他的小狗会对每一只都汪汪地打招呼！" }
    },
    pacificgrove: {
      fr: { fact: "On surnomme Pacific Grove la ville des papillons, car des milliers de monarques viennent s'y reposer chaque hiver.",
            loves: "Yako adore chercher des étoiles de mer dans les petites flaques entre les rochers, pendant que son chiot renifle l'air marin !" },
      es: { fact: "A Pacific Grove lo llaman el Pueblo de las Mariposas, porque miles de mariposas monarca descansan allí cada invierno.",
            loves: "¡A Yako le encanta buscar estrellas de mar en los charquitos de la orilla rocosa, mientras su perrito huele la brisa marina!" },
      he: { fact: "Pacific Grove נקראת עיר הפרפרים, כי אלפי פרפרי מונרך נחים שם בכל חורף.",
            loves: "Yako אוהב לחפש כוכבי ים בשלוליות הקטנות שבין סלעי החוף, בזמן שהגור שלו מרחרח את אוויר הים!" },
      tl: { fact: "Tinatawag ang Pacific Grove na Bayan ng mga Paruparo, dahil libu-libong paruparong monarch ang nagpapahinga roon tuwing taglamig.",
            loves: "Gustong-gusto ni Yako na maglaro sa maliliit na lawa sa mabatong dalampasigan at maghanap ng bituing-dagat, habang sinisinghot naman ng kanyang tuta ang simoy ng dagat!" },
      zh: { fact: "Pacific Grove 还有一个名字，叫蝴蝶镇，因为每年冬天都有成千上万只帝王蝶来这里休息。",
            loves: "Yako 最喜欢在礁石海岸的小水洼里找海星，他的小狗在旁边闻着海风！" }
    },
    montereybay: {
      fr: { fact: "À Monterey Bay, il y a un immense canyon sous l'eau et un aquarium célèbre, rempli d'animaux marins extraordinaires.",
            loves: "Yako adore regarder les loutres de mer flotter sur le dos, et son chiot aimerait bien flotter comme elles, lui aussi !" },
      es: { fact: "Monterey Bay tiene un cañón submarino enorme y un acuario famoso lleno de criaturas marinas asombrosas.",
            loves: "¡A Yako le encanta ver a las nutrias marinas flotar boca arriba, y a su perrito también le gustaría flotar así!" },
      he: { fact: "Monterey Bay הוא מפרץ שיש בו קניון ענק ועמוק מתחת למים, ואקווריום מפורסם מלא ביצורי ים מדהימים.",
            loves: "Yako אוהב להסתכל על לוטרות הים שצפות על הגב שלהן, והגור שלו כל כך רוצה לצוף ככה גם הוא!" },
      tl: { fact: "May napakalaking lambak sa ilalim ng dagat ang Monterey Bay, at may sikat ding akwaryum na puno ng kahanga-hangang mga nilalang ng karagatan.",
            loves: "Gustong-gusto ni Yako na panoorin ang mga sea otter na nakalutang nang nakatihaya, at gusto rin sana ng kanyang tuta na lumutang nang ganoon!" },
      zh: { fact: "Monterey Bay 有一条巨大的海底峡谷，还有一座很有名的水族馆，里面住着许多奇妙的海洋动物。",
            loves: "Yako 最喜欢看海獭仰面躺在水上漂啊漂，他的小狗也好想跟它们一样漂起来！" }
    }
  },
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
