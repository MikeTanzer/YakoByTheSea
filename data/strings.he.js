// Hebrew strings — pure data, no logic. {placeholders} are filled by js/i18n.js.
// Note: the game teaches the LATIN alphabet on a QWERTY keyboard, so item names
// and phonics keywords stay in English (their first letters must be A–Z keys);
// the narration around them is Hebrew. Plural imperatives keep it gender-neutral.
window.YAKO_STRINGS = window.YAKO_STRINGS || {};
window.YAKO_STRINGS.he = {
  letterKey: "האות {k}",
  numberKey: "המספר {k}",
  find: "מצאו את {key}!",
  starts: "{name} מתחיל באות {letter}. מצאו את {letter}!",
  findFor: "מצאו את האות {letter} של {name}!",
  spell: "בואו נאיית {word}. מצאו את האות {letter}!",
  next: "יופי! עכשיו מצאו את {key}.",
  countIntro: "המספר הבא הוא {num}. קודם, מצאו את הספרה {digit}!",
  sound: "{letter} כמו {word}! מצאו את האות {letter}!",
  howMany: "כמה {creatures}? ספרו אותם ולחצו על המספר!",
  countAny: "כמה יש? ספרו אותם ולחצו על המספר!",
  mathAdd: "{a} {creatures} ועוד {b} {creatures}. כמה ביחד?",
  mathSub: "יש {a} {creatures}. {b} שוחים משם. כמה נשארו?",
  mathAddClip: "יש {a}, ועוד {b} מגיעים! כמה יש ביחד?",
  mathSubClip: "יש {a}, ו-{b} שוחים משם. כמה נשארו?",
  doneSpell: "איִיתם את {word}! מדהים!",
  doneNum: "זה המספר {word}! מדהים!",
  doneSpellClip: "איִיתם את המילה! מדהים!",
  doneNumClip: "בניתם את המספר! מדהים!",
  makeNumber: "בואו נבנה מספר גדול!",
  wrong: "אופס! זה {pressed}. מצאו את {key}!",
  wrongCount: "אופס! בואו נספור את ה{creatures} שוב. כמה?",
  wrongMath: "אופס! ספרו שוב ונסו!",
  again: "אופס! נסו שוב!",
  level: "חמישה כוכבים! סיימתם את שלב {level}! אני כל כך גאה בכם!",
  cheers: ["כל הכבוד!","אתם מצליחים ממש יפה!","וואו, אתם כל כך חכמים!","אתם מבריקים!","בדיוק נכון, כל הכבוד!","אני כל כך גאה בכם!","עבודה נהדרת!","אתם כוכבים אמיתיים!"],
  greet: "שלום! בואו נשחק!",
  prompt: {
    letters: "מצאו את האות!", numbers: "מצאו את המספר!", both: "מצאו את המקש!",
    cat: "מצאו את האות הראשונה!", catNum: "איזה מהם? לחצו על המספר!",
    spelling: "אייתו את המילה!", counting: "בנו את המספר!",
    sounds: "איזה צליל? מצאו את האות!", countobj: "כמה? לחצו על המספר!",
    math: "חברו! לחצו על המספר!", listen: "הקשיבו! מצאו את האות!",
    hello: "איזו שפה אומרת שלום?", wordsafari: "הקשיבו וגעו בתמונה!",
    colormix: "הקשיבו וגעו בנכון!", countlang: "הקשיבו! איזו קבוצה זו?",
    guesslang: "איזו שפה זו?", samediff: "אותה שפה או שפה שונה?",
    adventures: "ספרו את החיות!"
  },
  verdicts: {
    best:     "וואו! הזמן הכי טוב שלכם!",
    perfect:  "מושלם! בלי טעויות בכלל!",
    faster:   "אתם נהיים מהירים יותר!",
    good:     "עבודה יפה! עוד קצת תרגול וזה יהיה מושלם!",
    slower:   "קצת יותר לאט הפעם, אבל הצלחתם!",
    practice: "זה בסדר לטעות! קחו את הזמן ונסו שוב — אתם יכולים!",
    next:     "מוכנים לשיעור הבא!",
    repeat:   "בואו נתרגל את זה עוד פעם אחת!"
  },
  // items keep their English names so the answer letter stays on the QWERTY keyboard
  names: {},
  creatures: {
    shells: 'צדפים', crabs: 'סרטנים', starfish: 'כוכבי ים',
    fish: 'דגים', octopuses: 'תמנונים', dolphins: 'דולפינים'
  },
  // phonics keywords stay English (Latin first letters); the sentence around them is Hebrew
  phonics: {
    A:{word:'Apple',emoji:'🍎'}, B:{word:'Ball',emoji:'⚽'}, C:{word:'Cat',emoji:'🐱'}, D:{word:'Dog',emoji:'🐶'},
    E:{word:'Egg',emoji:'🥚'}, F:{word:'Fish',emoji:'🐟'}, G:{word:'Goat',emoji:'🐐'}, H:{word:'Hat',emoji:'🎩'},
    I:{word:'Igloo',emoji:'🧊'}, J:{word:'Jam',emoji:'🍓'}, K:{word:'Kite',emoji:'🪁'}, L:{word:'Lion',emoji:'🦁'},
    M:{word:'Moon',emoji:'🌙'}, N:{word:'Nest',emoji:'🪺'}, O:{word:'Orange',emoji:'🍊'}, P:{word:'Pig',emoji:'🐷'},
    Q:{word:'Queen',emoji:'👑'}, R:{word:'Rainbow',emoji:'🌈'}, S:{word:'Sun',emoji:'☀️'}, T:{word:'Tree',emoji:'🌳'},
    U:{word:'Umbrella',emoji:'☂️'}, V:{word:'Violin',emoji:'🎻'}, W:{word:'Whale',emoji:'🐳'}, X:{word:'Fox',emoji:'🦊'},
    Y:{word:'Yo-yo',emoji:'🪀'}, Z:{word:'Zebra',emoji:'🦓'}
  }
};
