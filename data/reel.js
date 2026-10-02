// Narration for the Watch reel — the little film under the "Watch" tab on the home
// screen. One line per clip, keyed by the `vk` on that clip in WATCH_REEL.
//
// This is the SINGLE SOURCE OF TRUTH for the reel narration: the game speaks it and
// tools/check-voices.mjs derives the expected recordings from it, exactly as it does for
// the strings files. Edit the text here, never in keyboard-fun.html.
//
// English-only content, like the Story-Time and Sentences narration: recorded under
// voice/clips/en/<persona>/<key>.mp3 for all four personas, and falling back to the
// speech synthesiser in the other five languages.
//
// VOICE: written to read like a 1980s/90s picture book — short declaratives, concrete
// nouns, present tense, one exclamation mark in the whole film (the whale) and NO
// ellipses, because "..." costs ~0.7s of dead air in the recorded voice.
//
// A LINE MUST FIT ITS CLIP. Every clip is 8.04s; the longest line here is 12 words,
// about 7.5s in the slowest narrator voice. That headroom is why no clip needs to be
// slowed or looped any more — an earlier, much longer script is what forced `ranch` to
// be stretched 3.7x and `scene_ranch_meadow` to be looped.
//
// clip_picnic and clip_sealion carry NO line on purpose: they are short shots that the
// line before them plays across (shots 4 and 9).
window.YAKO_REEL_SAY = {
  reel_01: "A morning walk down a stone street. Zoe pulls Yako along.",   // clip_street_walk
  reel_03: "One sheep comes close. Its wool is warm. Two more follow.",   // ranch
  // reel_04 now serves clip_picnic ONLY, via the second-half segment (SPLIT_04 in
  // keyboard-fun.html). `beach` has its own line below.
  reel_04: "One shell, two shells, three. Then apples under the oaks.",   // clip_picnic (2nd half only)
  reel_05: "One, two, three, four sea shells.",   // beach (four shells are on the sand)
  reel_06: "Tall grass. Warm sun. Yako laughs out loud.",   // valley (8 words ~5.0s, fits the 5s clip)
  reel_07: "Yako holds the leash all by himself.",   // leash (7 words ~4.4s; the floating D-O-G letters were painted out of this clip, so the line no longer spells)
  reel_08: "Far out, the water puffs white. A whale!",   // bigsur
  reel_09: "Grey rocks, blue water. Green trees, yellow sun, white clouds.",   // scene_pointlobos
  // The old reel_09 ended "...A sea lion.", and that clause was the only thing cueing
  // clip_sealion, which had no line of its own. Shortening reel_09 would have left that
  // shot silent and unexplained, so the sea-lion half moved here as its own key.
  reel_10: "Something out there barks. One sea lion.",   // clip_sealion (one animal on screen)
  reel_11: "Three pelicans on the rocks. The sun goes gold.",   // scene_pelican_sunset
  reel_12: "The birds don't move. Yako doesn't move either.",   // scene_pelican_rocks
  // Counts verified against the frame: four otters in the kelp, and four pelicans --
  // three on the right-hand rail plus one on the left pier post. This game teaches
  // counting, so a number in the narration has to match what is actually on screen.
  reel_13: "Four otters float in the kelp, as four pelicans watch from the pier.",   // scene_wharf_otters
  reel_14: "Yako puts the finishing touches and places his flag on top.",   // scene_sandcastle
  reel_15: "The wet sand is cool. He puts his arm around his dog.",   // bay
  reel_16: "He turns and waves. Goodbye, sea. Goodbye, stone street.",   // village
};
