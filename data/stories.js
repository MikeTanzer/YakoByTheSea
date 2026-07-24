// Story Time — pure data, no logic. Rendered by the story engine in keyboard-fun.html.
//
// A story is { id, title, emoji, scene, vox, beats:[...] }. `scene` is a scene id
// (mission | bigsur | carmelvalley | pebble | pacificgrove | montereybay | carmelstreet)
// used as the painted backdrop; a beat may override it with its own `scene`.
// `vox` = the story's stable narration-clip index (voice/clips/<lang>/<persona>/sty_<vox>_<beat>.mp3),
// kept fixed so the list/campaign order can change without remapping recorded clips.
//
// Beat kinds (each beat also has a `say` line that is shown and spoken):
//   { say }                                          → narration only (auto-advances when read)
//   { say, task:{ kind:'find',  answer:'S' } }       → tap the letter/number key
//   { say, task:{ kind:'count', n:4, emoji:'🐑' } }  → show n emoji, tap the number
//   { say, task:{ kind:'choose', prompt, options:[{emoji,label,correct}] } } → tap the right one
//   { say, task:{ kind:'tiles', target:['I','want','the','ball'] } } → tap the words in order
//   { say, fork:{ options:[{label,emoji,beats:[...]}, ...] } } → pick a path; its beats play next
//
// Every correct task earns a star. Stories are gentle: a wrong tap just says "try again".
window.YAKO_STORIES = [
  {
    id: 'leash-walk',
    title: 'Yako Holds the Leash',
    emoji: '🦮',
    scene: 'carmelstreet',
    vox: 7,
    // A branching story: at the fork the child chooses the park OR the beach, and the
    // chosen path's beats play before the shared ending. (Engine: beat.fork.options[].beats)
    beats: [
      { say: "Welcome to Yako's Dog Walking Service! Yako clips the leash onto his happy puppy for a walk down the Carmel street." },
      { say: "Leash starts with the letter L. Can you find L for Leash?",
        task: { kind: 'find', answer: 'L' } },
      { say: "The path splits in two. Which way should they walk the puppy today?",
        fork: { options: [
          { label: 'Walk to the park', emoji: '🌳', beats: [
            { say: "They stroll to the sunny park, full of big green trees.", scene: 'carmelvalley' },
            { say: "So many friends came to play! Count the dogs at the park.",
              task: { kind: 'count', n: 4, emoji: '🐕' } }
          ] },
          { label: 'Walk to the beach', emoji: '🏖️', beats: [
            { say: "They wander down to the sandy beach beside the waves.", scene: 'pebble' },
            { say: "The puppy found something in the sand. Tap the seashell!",
              task: { kind: 'choose', prompt: 'Find the seashell!',
                options: [ { emoji: '🐚', label: 'Shell', correct: true }, { emoji: '🌳', label: 'Tree' }, { emoji: '🚗', label: 'Car' } ] } }
          ] }
        ] } },
      { say: "Time to walk home. The puppy trots so nicely on the leash!", scene: 'carmelstreet' },
      { say: "Great job walking the puppy, Yako! Here is a yummy treat. Woof woof!" }
    ]
  },
  {
    id: 'ranch-morning',
    title: 'Good Morning at the Ranch',
    emoji: '🐑',
    scene: 'mission',
    vox: 0,
    beats: [
      { say: "Good morning! Yako and his puppy skip down to Mission Ranch, right by the sea." },
      { say: "The meadow is full of soft, woolly sheep. Let's count how many there are!",
        task: { kind: 'count', n: 4, emoji: '🐑' } },
      { say: "Sheep starts with the letter S. Can you find S for Sheep?",
        task: { kind: 'find', answer: 'S' } },
      { say: "Which animal says baa? Tap the one that lives at the ranch!",
        task: { kind: 'choose', prompt: 'Who lives at the ranch?',
          options: [ { emoji: '🐑', label: 'Sheep', correct: true }, { emoji: '🐳', label: 'Whale' }, { emoji: '🦋', label: 'Butterfly' } ] } },
      { say: "The puppy wags his tail and the sheep say baa. What a happy morning at the ranch!" }
    ]
  },
  {
    id: 'bigsur-cliffs',
    title: 'Up the Big Sur Cliffs',
    emoji: '🏔️',
    scene: 'bigsur',
    vox: 1,
    beats: [
      { say: "Today Yako hikes the tall cliffs of Big Sur, where the mountains meet the ocean." },
      { say: "Way up high, a big condor bird spreads its wings. Big Sur starts with B — find B!",
        task: { kind: 'find', answer: 'B' } },
      { say: "Look down in the trees — gentle deer are grazing. Count the deer!",
        task: { kind: 'count', n: 3, emoji: '🦌' } },
      { say: "The waves crash far, far below. How many waves can you count?",
        task: { kind: 'count', n: 5, emoji: '🌊' } },
      { say: "Yako waves at the ocean and his puppy barks hello to a passing bird. Hooray!" }
    ]
  },
  {
    id: 'valley-picnic',
    title: 'A Picnic in Carmel Valley',
    emoji: '🧺',
    scene: 'carmelvalley',
    vox: 2,
    beats: [
      { say: "Yako spreads a blanket under a big oak tree in sunny Carmel Valley." },
      { say: "Little quail run through the golden grass. Count the quail!",
        task: { kind: 'count', n: 4, emoji: '🐦' } },
      { say: "The puppy chases butterflies! Which one is the butterfly?",
        task: { kind: 'choose', prompt: 'Find the butterfly!',
          options: [ { emoji: '🦋', label: 'Butterfly', correct: true }, { emoji: '🐢', label: 'Turtle' }, { emoji: '🦭', label: 'Seal' } ] } },
      { say: "Picnic starts with the letter P. Can you find P for Picnic?",
        task: { kind: 'find', answer: 'P' } },
      { say: "Yummy sandwiches for everyone! Yako and his puppy nap in the warm sun." }
    ]
  },
  {
    id: 'pebble-whales',
    title: 'Whale Watch at Pebble Beach',
    emoji: '🐳',
    scene: 'pebble',
    vox: 3,
    beats: [
      { say: "At Pebble Beach there is one lonely cypress tree on a rock above the sparkling sea." },
      { say: "Whooosh! Whales are spouting out in the water. Count the whales!",
        task: { kind: 'count', n: 3, emoji: '🐳' } },
      { say: "Whale starts with the letter W. Find W for Whale!",
        task: { kind: 'find', answer: 'W' } },
      { say: "Sleepy seals rest on the rocks too. How many seals do you see?",
        task: { kind: 'count', n: 4, emoji: '🦭' } },
      { say: "The puppy barks hello to every whale. They wave their tails back. Splash!" }
    ]
  },
  {
    id: 'grove-butterflies',
    title: 'Butterfly Town',
    emoji: '🦋',
    scene: 'pacificgrove',
    vox: 4,
    beats: [
      { say: "Pacific Grove is called Butterfly Town. Every winter, orange butterflies come to rest." },
      { say: "Count the fluttering monarch butterflies in the trees!",
        task: { kind: 'count', n: 5, emoji: '🦋' } },
      { say: "Down at the tide pools, Yako finds a little starfish. Which one is the starfish?",
        task: { kind: 'choose', prompt: 'Find the starfish!',
          options: [ { emoji: '⭐', label: 'Starfish', correct: true }, { emoji: '🐙', label: 'Octopus' }, { emoji: '🦀', label: 'Crab' } ] } },
      { say: "Butterfly begins with B. Find the letter B!",
        task: { kind: 'find', answer: 'B' } },
      { say: "The puppy sniffs the salty breeze and a butterfly lands on his nose. Achoo!" }
    ]
  },
  {
    id: 'bay-otters',
    title: 'Sea Otters of Monterey Bay',
    emoji: '🦦',
    scene: 'montereybay',
    vox: 5,
    beats: [
      { say: "Monterey Bay has a huge underwater canyon and a famous aquarium by the sea." },
      { say: "Sea otters float on their backs, holding hands so they don't drift apart. Count the otters!",
        task: { kind: 'count', n: 4, emoji: '🦦' } },
      { say: "Otter starts with the letter O. Can you find O for Otter?",
        task: { kind: 'find', answer: 'O' } },
      { say: "Who is floating in the bay? Tap the sea otter!",
        task: { kind: 'choose', prompt: 'Find the sea otter!',
          options: [ { emoji: '🦦', label: 'Otter', correct: true }, { emoji: '🐑', label: 'Sheep' }, { emoji: '🐦', label: 'Bird' } ] } },
      { say: "The puppy wishes he could float like an otter. Yako gives him a big hug instead!" }
    ]
  },
  {
    id: 'tell-me-what-you-need',
    title: 'Tell Me What You Need',
    emoji: '💬',
    scene: 'montereybay',
    vox: 6,
    beats: [
      { say: "Yako's puppy is trying to tell him something. Let's help the puppy use his words!" },
      { say: "The puppy is thirsty. Tap the words in order to say what he needs.",
        task: { kind: 'tiles', target: ['I', 'want', 'water'] } },
      { say: "Good talking! Now the puppy wants to play. Build the sentence!",
        task: { kind: 'tiles', target: ['I', 'want', 'the', 'ball'] } },
      { say: "One more — the puppy needs a rest. Tap the words in order.",
        task: { kind: 'tiles', target: ['I', 'am', 'tired'] } },
      { say: "When we use our words, everyone understands. Great job, little puppy!" }
    ]
  }
];
