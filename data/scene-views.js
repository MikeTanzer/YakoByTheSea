// Story Time backdrops — several painted views of the SAME place.
//
// A story names an area (mission, bigsur, ...) and the story engine walks these views
// one per beat, so each question in a story is asked over a new painting of the same
// area and the story visibly travels through it. The first entry is the area's original
// backdrop. A beat with its own `scene` restarts the walk in that area.
//
// Only the six base scenes have a matching .mp4; every other view is a still.
window.YAKO_SCENE_VIEWS = {
  // Carmel Mission ranch — meadow, mission, farmhouse, barn, the lane to the sea
  mission:      ['mission',      'mission2',      'mission3',      'mission4',      'mission5'],
  // Big Sur — the bridge, the cliff trail, the waterfall cove, the redwood canyon
  bigsur:       ['bigsur',       'bigsur2',       'bigsur3',       'bigsur4',       'bigsur5'],
  // Carmel Valley — vineyards, the red barn, the oak picnic grove, the creek
  carmelvalley: ['carmelvalley', 'carmelvalley2', 'carmelvalley3', 'carmelvalley4', 'carmelvalley5'],
  // Pebble Beach — the Lone Cypress, the dunes, the tide pools, the rocky point
  pebble:       ['pebble',       'pebble2',       'pebble3',       'pebble4',       'pebble5'],
  // Pacific Grove — the butterfly grove, the Victorians, the ice plant shore, the kelp cove
  pacificgrove: ['pacificgrove', 'pacificgrove2', 'pacificgrove3', 'pacificgrove4', 'pacificgrove5'],
  // Monterey Bay — Cannery Row, the fishing wharf, the kelp forest, the bay at sunset
  montereybay:  ['montereybay',  'montereybay2',  'montereybay3',  'montereybay4',  'montereybay5'],
  // Carmel village street — the bakery corner, the cottage, the courtyard, the beach end
  carmelstreet: ['carmelstreet', 'carmelstreet2', 'carmelstreet3', 'carmelstreet4', 'carmelstreet5'],
  // Downtown Carmel — the shop row, the fountain square, the cafe patio, the post office
  carmeltown:   ['carmeltown',   'carmeltown2',   'carmeltown3',   'carmeltown4',   'carmeltown5']
};
