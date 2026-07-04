// French strings — pure data, no logic. {placeholders} are filled by js/i18n.js.
window.YAKO_STRINGS = window.YAKO_STRINGS || {};
window.YAKO_STRINGS.fr = {
  letterKey: "la lettre {k}",
  numberKey: "le chiffre {k}",
  find: "Trouve {key} !",
  starts: "{name} commence par {letter}. Trouve {letter} !",
  findFor: "Trouve la lettre {letter}, comme {name} !",
  spell: "Épelons {word}. Trouve la lettre {letter} !",
  next: "Bravo ! Maintenant trouve {key}.",
  countIntro: "Le prochain nombre est {num}. D'abord, trouve le chiffre {digit} !",
  sound: "{letter}... comme {word} ! Trouve la lettre {letter} !",
  howMany: "Regarde bien ! Combien y en a-t-il ? Appuie sur le chiffre !",
  // exact per-creature questions for the recorded clips (correct elision: "d'étoiles")
  howManyClips: {
    shells:    "Combien de coquillages ? Compte-les, puis appuie sur le chiffre !",
    crabs:     "Combien de crabes ? Compte-les, puis appuie sur le chiffre !",
    starfish:  "Combien d'étoiles de mer ? Compte-les, puis appuie sur le chiffre !",
    fish:      "Combien de poissons ? Compte-les, puis appuie sur le chiffre !",
    octopuses: "Combien de poulpes ? Compte-les, puis appuie sur le chiffre !",
    dolphins:  "Combien de dauphins ? Compte-les, puis appuie sur le chiffre !"
  },
  doneSpellClip: "Tu as épelé le mot ! Super !",
  doneNumClip:   "Tu as formé le nombre ! Super !",
  makeNumber:    "Formons un grand nombre !",
  mathAdd: "{a} {creatures} et {b} {creatures} de plus. Combien en tout ?",
  mathSub: "Il y a {a} {creatures}. {b} s'en vont. Combien en reste-t-il ?",
  doneSpell: "Tu as épelé {word} ! Super !",
  doneNum: "C'est le nombre {word} ! Super !",
  wrong: "Oups ! C'est {pressed}. Trouve {key} !",
  wrongCount: "Oups ! Comptons les {creatures} encore. Combien ?",
  wrongMath: "Oups ! Compte encore et réessaie !",
  again: "Oups ! Réessaie !",
  level: "Cinq étoiles ! Tu as fini le niveau {level} ! Bravo !",
  cheers: ["Bravo !","Tu te débrouilles très bien !","Ouah, tu es si intelligent !","Tu es brillant !","C'est exactement ça, bien joué !","Je suis si fier de toi !","Magnifique travail !","Tu es un champion !"],
  greet: "Bonjour ! On joue !",
  prompt: {
    letters: "Trouve la lettre !", numbers: "Trouve le chiffre !", both: "Trouve la touche !",
    cat: "Trouve la première lettre !", catNum: "Lequel est-ce ? Appuie sur le chiffre !",
    spelling: "Épelle le mot !", counting: "Forme le nombre !",
    sounds: "Quel son ? Trouve la lettre !", countobj: "Combien ? Appuie sur le chiffre !",
    math: "Additionne ! Appuie sur le chiffre !", listen: "Écoute ! Trouve la lettre !"
  },
  verdicts: {
    best:     "Ouah ! Ton meilleur temps !",
    perfect:  "Parfait ! Aucune erreur !",
    faster:   "Tu deviens plus rapide !",
    good:     "Bon travail ! Encore un peu d'entraînement et ce sera parfait !",
    slower:   "Un peu plus lent cette fois, mais tu as réussi !",
    practice: "C'est normal de faire des erreurs ! Prends ton temps et réessaie — tu peux le faire !",
    next:     "Prépare-toi pour la prochaine leçon !",
    repeat:   "On s'entraîne encore une fois !"
  },
  names: {
    Red:'Rouge', Orange:'Orange', Yellow:'Jaune', Green:'Vert', Blue:'Bleu', Purple:'Violet',
    Pink:'Rose', Brown:'Marron',
    Circle:'Cercle', Square:'Carré', Triangle:'Triangle', Heart:'Cœur', Star:'Étoile', Diamond:'Losange',
    Cat:'Chat', Dog:'Chien', Elephant:'Éléphant', Frog:'Grenouille', Giraffe:'Girafe', Horse:'Cheval',
    Lion:'Lion', Monkey:'Singe', Owl:'Hibou', Pig:'Cochon', Rabbit:'Lapin', Snake:'Serpent',
    Tiger:'Tigre', Zebra:'Zèbre'
  },
  creatures: {
    shells:'coquillages', crabs:'crabes', starfish:'étoiles de mer',
    fish:'poissons', octopuses:'poulpes', dolphins:'dauphins'
  },
  phonics: {
    A:{word:'Abeille',emoji:'🐝'}, B:{word:'Ballon',emoji:'🎈'}, C:{word:'Chat',emoji:'🐱'}, D:{word:'Dauphin',emoji:'🐬'},
    E:{word:'Étoile',emoji:'⭐'}, F:{word:'Fleur',emoji:'🌸'}, G:{word:'Gâteau',emoji:'🍰'}, H:{word:'Hibou',emoji:'🦉'},
    I:{word:'Île',emoji:'🏝️'}, J:{word:'Jus',emoji:'🧃'}, K:{word:'Koala',emoji:'🐨'}, L:{word:'Lune',emoji:'🌙'},
    M:{word:'Maison',emoji:'🏠'}, N:{word:'Nuage',emoji:'☁️'}, O:{word:'Orange',emoji:'🍊'}, P:{word:'Poisson',emoji:'🐟'},
    Q:{word:'Quille',emoji:'🎳'}, R:{word:'Robot',emoji:'🤖'}, S:{word:'Soleil',emoji:'☀️'}, T:{word:'Tortue',emoji:'🐢'},
    U:{word:'Usine',emoji:'🏭'}, V:{word:'Vache',emoji:'🐮'}, W:{word:'Wagon',emoji:'🚃'}, X:{word:'Xylophone',emoji:'🎼'},
    Y:{word:'Yoyo',emoji:'🪀'}, Z:{word:'Zèbre',emoji:'🦓'}
  }
};
