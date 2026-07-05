// Tagalog strings — pure data, no logic. {placeholders} are filled by js/i18n.js.
// Tagalog uses the Latin alphabet, so item names and phonics keywords are
// localized (their first letters still land on the QWERTY keyboard).
window.YAKO_STRINGS = window.YAKO_STRINGS || {};
window.YAKO_STRINGS.tl = {
  letterKey: "ang letrang {k}",
  numberKey: "ang numerong {k}",
  find: "Hanapin {key}!",
  starts: "Ang {name} ay nagsisimula sa {letter}. Hanapin ang {letter}!",
  findFor: "Hanapin ang letrang {letter}, para sa {name}!",
  spell: "Baybayin natin ang {word}. Hanapin ang letrang {letter}!",
  next: "Magaling! Ngayon hanapin {key}.",
  countIntro: "Ang susunod na numero ay {num}. Una, hanapin ang numerong {digit}!",
  sound: "Ang {letter} ay para sa {word}! Hanapin ang letrang {letter}!",
  howMany: "Ilan ang {creatures}? Bilangin mo, tapos pindutin ang numero!",
  countAny: "Ilan ang mga ito? Bilangin mo, tapos pindutin ang numero!",
  mathAdd: "{a} {creatures} at {b} pa. Ilan lahat?",
  mathSub: "May {a} {creatures}. {b} ang lumangoy palayo. Ilan ang natira?",
  mathAddClip: "May {a}, at {b} pa ang dumating! Ilan lahat?",
  mathSubClip: "May {a}, at {b} ang lumangoy palayo. Ilan ang natira?",
  doneSpell: "Nabaybay mo ang {word}! Galing!",
  doneNum: "Iyan ang numerong {word}! Galing!",
  doneSpellClip: "Nabaybay mo ang salita! Galing!",
  doneNumClip: "Nabuo mo ang numero! Galing!",
  makeNumber: "Gumawa tayo ng malaking numero!",
  wrong: "Ay! Iyan ay {pressed}. Hanapin {key}!",
  wrongCount: "Ay! Bilangin natin ulit ang {creatures}. Ilan?",
  wrongMath: "Ay! Bilangin mo ulit at subukan!",
  again: "Ay! Subukan mo ulit!",
  level: "Limang bituin! Natapos mo ang level {level}! Proud na proud ako sa'yo!",
  cheers: ["Magaling!","Ang galing-galing mo!","Wow, ang talino mo!","Napakahusay mo!","Tamang-tama, magaling!","Proud na proud ako sa'yo!","Napakagandang trabaho!","Isa kang bituin!"],
  greet: "Kumusta! Tara, maglaro tayo!",
  prompt: {
    letters: "Hanapin ang letra!", numbers: "Hanapin ang numero!", both: "Hanapin ang key!",
    cat: "Hanapin ang unang letra!", catNum: "Alin ito? Pindutin ang numero!",
    spelling: "Baybayin ang salita!", counting: "Buuin ang numero!",
    sounds: "Anong tunog? Hanapin ang letra!", countobj: "Ilan? Pindutin ang numero!",
    math: "Pagsamahin! Pindutin ang numero!", listen: "Makinig! Hanapin ang letra!",
    hello: "Aling wika ang bumabati?", wordsafari: "Makinig at pindutin ang larawan!",
    colormix: "Makinig at pindutin ang tama!", countlang: "Makinig! Aling grupo ito?",
    guesslang: "Aling wika ito?", samediff: "Pareho o magkaiba ang wika?",
    adventures: "Bilangin ang mga hayop!"
  },
  verdicts: {
    best:     "Wow! Pinakamabilis mong oras!",
    perfect:  "Perpekto! Walang mali!",
    faster:   "Bumibilis ka na!",
    good:     "Magaling! Konting practice pa at magiging perpekto!",
    slower:   "Medyo mabagal ngayon, pero nagawa mo!",
    practice: "Okay lang magkamali! Dahan-dahan lang at subukan ulit — kaya mo 'yan!",
    next:     "Humanda ka sa susunod na aralin!",
    repeat:   "Practice natin ito ulit!"
  },
  names: {
    Red:'Pula', Orange:'Kahel', Yellow:'Dilaw', Green:'Berde', Blue:'Asul', Purple:'Lila',
    Pink:'Rosas', Brown:'Kayumanggi',
    Circle:'Bilog', Square:'Parisukat', Triangle:'Tatsulok', Heart:'Puso', Star:'Bituin', Diamond:'Diyamante',
    Cat:'Pusa', Dog:'Aso', Elephant:'Elepante', Frog:'Palaka', Giraffe:'Dyirap', Horse:'Kabayo',
    Lion:'Leon', Monkey:'Unggoy', Owl:'Kuwago', Pig:'Baboy', Rabbit:'Kuneho', Snake:'Ahas',
    Tiger:'Tigre', Zebra:'Sebra'
  },
  creatures: {
    shells: 'kabibe', crabs: 'alimango', starfish: 'bituing-dagat',
    fish: 'isda', octopuses: 'pugita', dolphins: 'lumba-lumba'
  },
  phonics: {
    A:{word:'Aso',emoji:'🐶'}, B:{word:'Bola',emoji:'⚽'}, C:{word:'Cake',emoji:'🍰'}, D:{word:'Daga',emoji:'🐭'},
    E:{word:'Elepante',emoji:'🐘'}, F:{word:'Fish',emoji:'🐟'}, G:{word:'Gatas',emoji:'🥛'}, H:{word:'Hagdan',emoji:'🪜'},
    I:{word:'Isla',emoji:'🏝️'}, J:{word:'Jeep',emoji:'🚙'}, K:{word:'Kabayo',emoji:'🐴'}, L:{word:'Leon',emoji:'🦁'},
    M:{word:'Mansanas',emoji:'🍎'}, N:{word:'Niyog',emoji:'🥥'}, O:{word:'Orasan',emoji:'⏰'}, P:{word:'Pusa',emoji:'🐱'},
    Q:{word:'Queen',emoji:'👑'}, R:{word:'Rosas',emoji:'🌹'}, S:{word:'Saging',emoji:'🍌'}, T:{word:'Tren',emoji:'🚆'},
    U:{word:'Ulan',emoji:'🌧️'}, V:{word:'Vinta',emoji:'⛵'}, W:{word:'Walis',emoji:'🧹'}, X:{word:'Xylophone',emoji:'🎼'},
    Y:{word:'Yoyo',emoji:'🪀'}, Z:{word:'Zoo',emoji:'🐯'}
  }
};
