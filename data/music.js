// Yako by the Sea — music playlist for the home-screen media player.
// Pure data, shared by the game. Each track: { title, src }.
//
// TO ADD A SONG: drop the .mp3 in the project (root, or a music/ folder) and
// add a line below. The player's ⏮ / ⏭ buttons cycle through this list in
// order and the current track is remembered per device (localStorage yako_track).
window.YAKO_MUSIC = [
  { title: 'Yako by the Sea', src: 'theme.mp3' }
  // { title: 'Song name here', src: 'music/your-song.mp3' },
];
