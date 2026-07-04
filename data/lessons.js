// Lesson vocabulary shared by the game AND tools/check-voices.mjs — pure data.
window.YAKO_LESSONS = {
  // Spelling words grouped by length (difficulty grows every 3 levels)
  WORDS: {
    3: ['CAT','DOG','PIG','BAT','SUN','HAT','BED','CUP','BUS','FOX','COW','HEN','BEE','ANT','OWL','BUG','MAP','NET','PEN','TOP','CAR','CAP','JAR','BOX'],
    4: ['FISH','BIRD','FROG','STAR','MOON','TREE','CAKE','DUCK','BOAT','LION','BEAR','BALL','DOOR','SHIP','GOAT','KITE','LEAF','NEST','RAIN'],
    5: ['APPLE','HOUSE','TIGER','HORSE','TRAIN','MOUSE','SNAKE','BREAD','CLOUD','SHEEP','PLANT','BEACH','WHALE','CHAIR','GRAPE'],
    6: ['BANANA','FLOWER','ORANGE','PURPLE','TURTLE','MONKEY','ROCKET','PARROT','RABBIT','PENCIL','GARDEN','PUPPET']
  },
  // The picture shown with each spelling word
  WORD_EMOJI: {
    CAT:'🐱', DOG:'🐶', PIG:'🐷', BAT:'🦇', SUN:'☀️', HAT:'🎩', BED:'🛏️', CUP:'🥤', BUS:'🚌', FOX:'🦊',
    COW:'🐮', HEN:'🐔', BEE:'🐝', ANT:'🐜', OWL:'🦉', BUG:'🐞', MAP:'🗺️', NET:'🥅', PEN:'🖊️', TOP:'🪀',
    CAR:'🚗', CAP:'🧢', JAR:'🫙', BOX:'📦',
    FISH:'🐟', BIRD:'🐦', FROG:'🐸', STAR:'⭐', MOON:'🌙', TREE:'🌳', CAKE:'🍰', DUCK:'🦆', BOAT:'⛵',
    LION:'🦁', BEAR:'🐻', BALL:'⚽', DOOR:'🚪', SHIP:'🚢', GOAT:'🐐', KITE:'🪁', LEAF:'🍃', NEST:'🪺', RAIN:'🌧️',
    APPLE:'🍎', HOUSE:'🏠', TIGER:'🐯', HORSE:'🐴', TRAIN:'🚆', MOUSE:'🐭', SNAKE:'🐍', BREAD:'🍞',
    CLOUD:'☁️', SHEEP:'🐑', PLANT:'🪴', BEACH:'🏖️', WHALE:'🐳', CHAIR:'🪑', GRAPE:'🍇',
    BANANA:'🍌', FLOWER:'🌸', ORANGE:'🍊', PURPLE:'🟣', TURTLE:'🐢', MONKEY:'🐵', ROCKET:'🚀',
    PARROT:'🦜', RABBIT:'🐰', PENCIL:'✏️', GARDEN:'🌷', PUPPET:'🎭'
  },
  // English names of every color/shape/animal item — clip keys are find_for_<name lowercased>
  CATEGORY_NAMES: [
    'Red','Orange','Yellow','Green','Blue','Purple','Pink','Brown',
    'Circle','Square','Triangle','Heart','Star','Diamond',
    'Cat','Dog','Elephant','Frog','Giraffe','Horse','Lion','Monkey','Owl','Pig','Rabbit','Snake','Tiger','Zebra'
  ]
};
