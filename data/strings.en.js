// English strings — pure data, no logic. {placeholders} are filled by js/i18n.js.
// This file is ALSO the source of truth for regenerating voice clips (tools/check-voices.mjs).
window.YAKO_STRINGS = window.YAKO_STRINGS || {};
window.YAKO_STRINGS.en = {
  letterKey: "the letter {k}",
  numberKey: "the number {k}",
  find: "Find {key}!",
  starts: "{name} starts with {letter}. Find {letter}!",
  findFor: "Find the letter {letter}, for {name}!",
  spell: "Let's spell {word}. Find the letter {letter}!",
  next: "Great! Now find {key}.",
  countIntro: "The next number is {num}. First, find the number {digit}!",
  sound: "{letter} says {sound}. {letter} is for {word}! Find the letter {letter}!",
  howMany: "How many {creatures}? Count them, then press the number!",
  // recorded math clips are creature-generic (the creatures are shown on screen)
  mathAddClip: "There are {a}, and {b} more come along! How many all together?",
  mathSubClip: "There are {a}, and {b} swim away. How many are left?",
  doneSpellClip: "You spelled the word! Amazing!",
  doneNumClip:   "You made the number! Amazing!",
  makeNumber:    "Let's make a big number!",
  mathAdd: "{a} {creatures} and {b} more {creatures}. How many all together?",
  mathSub: "There are {a} {creatures}. {b} swim away. How many are left?",
  doneSpell: "You spelled {word}! Amazing!",
  doneNum: "That's the number {word}! Amazing!",
  wrong: "Oops! That's {pressed}. Find {key}!",
  wrongCount: "Oops! Let's count the {creatures} again. How many?",
  wrongMath: "Oops! Count them again and try!",
  again: "Oops! Try again!",
  level: "Five stars! You finished level {level}! I'm so proud of you!",
  cheers: ["Great job!","You're doing so well!","Wow, you're so smart!","You're brilliant!","That's exactly right, well done!","I'm so proud of you!","Wonderful work!","You're a superstar!"],
  greet: "Hello! Let's play!",
  prompt: {
    letters: "Find the letter!", numbers: "Find the number!", both: "Find the key!",
    cat: "Find the key it starts with!", catNum: "Which one is it? Press the number!",
    spelling: "Spell the word!", counting: "Build the number!",
    sounds: "What sound? Find the letter!", countobj: "How many? Press the number!",
    math: "Add it up! Press the number!", listen: "Listen! Find the letter!",
    hello: "Which language says hello?", wordsafari: "Listen and tap the picture!",
    colormix: "Listen and tap the right one!", countlang: "Listen! Which group is it?",
    guesslang: "Which language is it?", samediff: "Same language or different?"
  },
  // spoken + on-screen performance feedback at the end of a level
  verdicts: {
    best:     "Wow! Your best time ever!",
    perfect:  "Perfect! No mistakes at all!",
    faster:   "You're getting faster!",
    good:     "Great work! A little more practice and it'll be perfect!",
    slower:   "A little slower this time, but you did it!",
    practice: "It's okay to make mistakes! Take your time and try again — you can do it!",
    next:     "Get ready for the next lesson!",
    repeat:   "Let's practice this one more time!"
  },
  // English is the canonical key language — no name translations needed.
  names: {},
  creatures: {},
  // phonics: letter -> { sound, word, emoji }
  phonics: {
    A:{sound:'ah',word:'Apple',emoji:'🍎'}, B:{sound:'buh',word:'Ball',emoji:'⚽'}, C:{sound:'kuh',word:'Cat',emoji:'🐱'}, D:{sound:'duh',word:'Dog',emoji:'🐶'},
    E:{sound:'eh',word:'Egg',emoji:'🥚'}, F:{sound:'ff',word:'Fish',emoji:'🐟'}, G:{sound:'guh',word:'Goat',emoji:'🐐'}, H:{sound:'huh',word:'Hat',emoji:'🎩'},
    I:{sound:'ih',word:'Igloo',emoji:'🧊'}, J:{sound:'juh',word:'Jam',emoji:'🍓'}, K:{sound:'kuh',word:'Kite',emoji:'🪁'}, L:{sound:'ll',word:'Lion',emoji:'🦁'},
    M:{sound:'mm',word:'Moon',emoji:'🌙'}, N:{sound:'nn',word:'Nest',emoji:'🪺'}, O:{sound:'ah',word:'Orange',emoji:'🍊'}, P:{sound:'puh',word:'Pig',emoji:'🐷'},
    Q:{sound:'kwuh',word:'Queen',emoji:'👑'}, R:{sound:'rr',word:'Rainbow',emoji:'🌈'}, S:{sound:'sss',word:'Sun',emoji:'☀️'}, T:{sound:'tuh',word:'Tree',emoji:'🌳'},
    U:{sound:'uh',word:'Umbrella',emoji:'☂️'}, V:{sound:'vv',word:'Violin',emoji:'🎻'}, W:{sound:'wuh',word:'Whale',emoji:'🐳'}, X:{sound:'ks',word:'Fox',emoji:'🦊'},
    Y:{sound:'yuh',word:'Yo-yo',emoji:'🪀'}, Z:{sound:'zz',word:'Zebra',emoji:'🦓'}
  }
};
