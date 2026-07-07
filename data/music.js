// Yako by the Sea — music playlist for the home-screen media player.
// Pure data, shared by the game. Each track: { title, src }.
//
// The FIRST track is the default and plays on load. The current song LOOPS on
// repeat; the ⏭ next button in the foot ribbon switches to the next song (which
// then loops too). Songs never auto-advance on their own.
//
// TO ADD A SONG: drop the .mp3 in the music/ folder and add a line below.
window.YAKO_MUSIC = [
  { title: 'Baby Yak',   src: 'music/baby-yak.mp3' },
  { title: 'Untitled 2', src: 'music/untitled-2.mp3' },
  { title: 'Untitled',   src: 'music/untitled.mp3' }
];

// 🥚 SECRET playlist — an Easter egg. Tapping the little seashell 🐚 in the foot
// ribbon flips the media player over to this hidden set of songs (tap again to go
// back). These are different tracks from the main playlist above.
window.YAKO_MUSIC_SECRET = [
  { title: 'Yako by the Sea (Secret Theme)', src: 'theme.mp3' },
  { title: 'Baby Yak Boom-Bap Anthem',       src: 'music/baby-yak-boom-bap-anthem.mp3' }
];
