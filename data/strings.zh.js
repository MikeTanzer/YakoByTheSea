// Mandarin (Simplified Chinese) strings — pure data, no logic. {placeholders} are
// filled by js/i18n.js. Like Hebrew: the game teaches the LATIN alphabet on a
// QWERTY keyboard, so item names and phonics keywords stay in English (their
// first letters must be A–Z keys); the narration around them is Mandarin.
window.YAKO_STRINGS = window.YAKO_STRINGS || {};
window.YAKO_STRINGS.zh = {
  letterKey: "字母 {k}",
  numberKey: "数字 {k}",
  find: "找到{key}！",
  starts: "{name} 的第一个字母是 {letter}。找到 {letter}！",
  findFor: "找到 {name} 开头的字母 {letter}！",
  spell: "我们来拼写 {word}。找到字母 {letter}！",
  next: "真棒！现在来找{key}吧！",
  countIntro: "下一个数字是 {num}。先找到数字 {digit}！",
  sound: "{letter}，{word} 的 {letter}！找到字母 {letter}！",
  vowel: "字母 {letter} 的发音像 {word} 里的 {sound}。找出 {letter}！",
  howMany: "有多少{creatures}？数一数，然后按数字！",
  countAny: "有多少呀？数一数，然后按数字！",
  mathAddClip: "这里有 {a} 个，又来了 {b} 个！一共有多少个？",
  mathSubClip: "这里有 {a} 个，游走了 {b} 个。还剩多少个？",
  doneSpellClip: "你拼出了这个词！太棒了！",
  doneNumClip: "你拼出了这个数字！太棒了！",
  makeNumber: "我们来拼一个大数字吧！",
  mathAdd: "{a} 个{creatures}，又来了 {b} 个。一共有多少个？",
  mathSub: "有 {a} 个{creatures}，游走了 {b} 个。还剩多少个？",
  doneSpell: "你拼出了 {word}！太棒了！",
  doneNum: "这就是数字 {word}！太棒了！",
  wrong: "哎呀！那是{pressed}。找到{key}！",
  wrongCount: "哎呀！我们再数一数{creatures}。有多少呢？",
  wrongMath: "哎呀！再数一数，试试看！",
  again: "哎呀！再试一次！",
  level: "五颗星！关卡 {level} 完成了！我真为你骄傲！",
  cheers: ["太棒了！","你做得真好！","哇，你真聪明！","你太厉害了！","完全正确，真棒！","我真为你骄傲！","做得漂亮！","你是小明星！","对啦！你答对了！","哦耶，干得好！","你是小天才！","完美——继续加油！","耶！好样的！","击个掌！答对了！","你真了不起！","太精彩了，小朋友！"],
  ramp: ["答对了！","干得好！","真棒！","你太聪明了！","哇，你真厉害！","哇，我太为你骄傲了！"],
  tries: ["哎呀！没关系，再试一次！","不是这个——你可以的！","差一点！再来一次！","就快找到了！再试试。","别灰心，再来一次！","别担心——你一定行！","嗯，不是那个。再试一次！","再想一想，你一定行！"],
  wrongNamed: "那不是{key}。没关系——再试一次！",
  greet: "你好！我们来玩吧！",
  prompt: {
    letters: "找到字母！", numbers: "找到数字！", both: "找到按键！",
    cat: "找到开头的字母！", catNum: "是哪一个？按数字！",
    spelling: "拼出单词！", counting: "拼出数字！",
    sounds: "是哪个字母的声音？找到它！", countobj: "有多少？按数字！",
    math: "加一加！按数字！", listen: "听一听！找到字母！",
    hello: "哪种语言在问好？", wordsafari: "听一听，点图片！",
    colormix: "听一听，点对的那个！", countlang: "听一听！是哪一组？",
    guesslang: "这是哪种语言？", samediff: "一样还是不一样？",
    adventures: "数一数小动物！"
  },
  verdicts: {
    best:     "哇！这是你最快的一次！",
    perfect:  "完美！一个错都没有！",
    faster:   "你越来越快了！",
    good:     "做得好！再练一练就完美了！",
    slower:   "这次慢了一点，但你做到了！",
    practice: "犯错没关系！慢慢来，再试一次——你可以的！",
    next:     "准备好，下一课要开始啦！",
    repeat:   "我们再练一次这个！"
  },
  // items keep their English names so the answer letter stays on the QWERTY keyboard
  names: {},
  creatures: {
    shells: '贝壳', crabs: '螃蟹', starfish: '海星',
    fish: '小鱼', octopuses: '章鱼', dolphins: '海豚',
    sheep: '绵羊', cows: '奶牛', birds: '小鸟'
  },
  // phonics keywords stay English (Latin first letters); the sentence around them is Mandarin
  phonics: {
    A:{word:'Apple',emoji:'🍎'}, B:{word:'Ball',emoji:'⚽'}, C:{word:'Cat',emoji:'🐱'}, D:{word:'Dog',emoji:'🐶'},
    E:{word:'Egg',emoji:'🥚'}, F:{word:'Fish',emoji:'🐟'}, G:{word:'Goat',emoji:'🐐'}, H:{word:'Hat',emoji:'🎩'},
    I:{word:'Igloo',emoji:'🧊'}, J:{word:'Jam',emoji:'🍓'}, K:{word:'Kite',emoji:'🪁'}, L:{word:'Lion',emoji:'🦁'},
    M:{word:'Moon',emoji:'🌙'}, N:{word:'Nest',emoji:'🪺'}, O:{word:'Orange',emoji:'🍊'}, P:{word:'Pig',emoji:'🐷'},
    Q:{word:'Queen',emoji:'👑'}, R:{word:'Rainbow',emoji:'🌈'}, S:{word:'Sun',emoji:'☀️'}, T:{word:'Tree',emoji:'🌳'},
    U:{word:'Umbrella',emoji:'☂️'}, V:{word:'Violin',emoji:'🎻'}, W:{word:'Whale',emoji:'🐳'}, X:{word:'Fox',emoji:'🦊'},
    Y:{word:'Yo-yo',emoji:'🪀'}, Z:{word:'Zebra',emoji:'🦓'}
  },
  // Mission Ranch counting activity (js/ranch.js) - shown on screen AND read aloud.
  ranch: {
    intro: "我们和 Yako 一起数一数小羊吧！",
    count: "每只小羊都点一下，数一数。",
    total: "数到 {n} 啦！",
    totalOne: "一只小羊！",
    which: "哪一个是 {n}？",
    hint: "点这只小羊！",
    nice: "你全都数完啦！",
    round: "第 {r} 轮，一共 {t} 轮",
    again: "再玩一次",
    explore: "去看看",
    finish: "玩好啦",
    goodbye: "再见啦！下次再来玩哦！",
    replay: "再听一遍",
    sheepLbl: "小羊",
    countedLbl: "数过了",
    countAsk: "有几只小羊？按数字！",
    addAsk: "{a}只小羊，又来了{b}只。现在有几只？",
    subAsk: "{a}只小羊，走了{b}只。还剩几只？",
    mulAsk: "{g}组小羊，每组{c}只。一共有几只？",
    typeIt: "按数字！",
    stageCount: "数一数",
    stageAdd: "加一加",
    stageSub: "减一减",
    stageMul: "分一分",
    clearLbl: "删除",
    mulAskShort: "一共有几只？"
  }
};
