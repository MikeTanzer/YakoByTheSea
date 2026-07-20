// Sentences lesson — pure data. Each "story" is 5 sentences (= one 5-star level);
// the child spells the missing word to complete each sentence, and the sentences
// flow together as a little story (like Story Time, but you build the word).
//
// Each line = { before, answer, after }. The sentence reads:  before ___ after
// `answer` is the word to spell (A–Z only, keep it short & phonetic for young kids).
window.YAKO_SENTENCES = [
  {
    title: 'Yako and the Puppy', emoji: '🐕',
    lines: [
      { before: 'Yako has a happy little', answer: 'DOG',  after: '.' },
      { before: 'The puppy loves to',       answer: 'RUN',  after: 'and jump.' },
      { before: 'They race down to the',    answer: 'SEA',  after: '.' },
      { before: 'After playing, the puppy takes a', answer: 'NAP', after: '.' },
      { before: 'Yako gives his puppy a big', answer: 'HUG', after: '.' }
    ]
  },
  {
    title: 'A Day at the Beach', emoji: '🏖️',
    lines: [
      { before: 'The',                 answer: 'SUN',   after: 'is warm and bright.' },
      { before: 'Yako digs in the soft', answer: 'SAND', after: '.' },
      { before: 'A little',            answer: 'CRAB',  after: 'scuttles by.' },
      { before: 'Big waves splash in the', answer: 'SEA', after: '.' },
      { before: 'Yako finds a pretty pink', answer: 'SHELL', after: '.' }
    ]
  },
  {
    title: 'The Woolly Sheep', emoji: '🐑',
    lines: [
      { before: 'At the ranch there is a woolly', answer: 'SHEEP', after: '.' },
      { before: 'The sheep says',       answer: 'BAA',   after: 'all day.' },
      { before: 'Its soft wool is very', answer: 'WARM', after: '.' },
      { before: 'The sheep eats green',  answer: 'GRASS', after: '.' },
      { before: 'Yako waves the sheep a happy', answer: 'BYE', after: '.' }
    ]
  },
  {
    title: 'Whale Watching', emoji: '🐳',
    lines: [
      { before: 'Yako looks out at the big blue', answer: 'SEA', after: '.' },
      { before: 'Whoosh! A giant',       answer: 'WHALE', after: 'spouts water.' },
      { before: 'The whale flips its huge', answer: 'TAIL', after: '.' },
      { before: 'The happy puppy barks', answer: 'HELLO', after: '.' },
      { before: 'What a fun day out at', answer: 'SEA',   after: '!' }
    ]
  }
];
