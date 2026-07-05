#!/usr/bin/env node
// ---------------------------------------------------------------------------
// check-voices.mjs — verifies the recorded narration library is complete.
//
// The expected clip list is DERIVED from data/strings.*.js (the same data the
// game speaks), so the strings files stay the single source of truth.
// For every language × persona it checks voice/clips/<lang>/<persona>/<key>.mp3
// and prints what each missing clip should say (paste that text into
// Higgsfield text2speech_v2/elevenlabs with the matching voice to regenerate).
//
//   node tools/check-voices.mjs          # report
//   node tools/check-voices.mjs --texts  # also dump the full expected script
// ---------------------------------------------------------------------------
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// data/strings.*.js are classic browser scripts writing to window.*
globalThis.window = globalThis;
for (const lang of ['en', 'fr', 'es', 'he', 'tl']) {
  await import(pathToFileURL(join(ROOT, 'data', `strings.${lang}.js`)));
}
await import(pathToFileURL(join(ROOT, 'data', 'lessons.js')));
await import(pathToFileURL(join(ROOT, 'data', 'vocab.js')));
const S = globalThis.YAKO_STRINGS;
const LSN = globalThis.YAKO_LESSONS;
const VOC = globalThis.YAKO_VOCAB;
const MON = globalThis.YAKO_MONTEREY;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

const LANGS    = ['en', 'fr', 'es', 'he', 'tl'];
const PERSONAS = ['mom', 'dad', 'grandpa', 'grandma'];   // Isabella / Mark / Brooks / Mabel
const LETTERS  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const DIGITS   = '0123456789'.split('');
const RECORDED_CHEERS = 8;                               // cheer_1..cheer_8 exist as recordings

const fmt = (t, v) => String(t).replace(/\{(\w+)\}/g, (m, k) => (v && k in v) ? v[k] : m);

// key -> expected spoken text, derived from the language's strings
function expectedClips(lang) {
  const c = S[lang];
  const clips = {};
  for (const l of LETTERS) clips[`find_let_${l}`] = fmt(c.find, { key: fmt(c.letterKey, { k: l }) });
  for (const d of DIGITS)  clips[`find_num_${d}`] = fmt(c.find, { key: fmt(c.numberKey, { k: d }) });
  for (let i = 1; i <= RECORDED_CHEERS; i++) clips[`cheer_${i}`] = c.cheers[i - 1];
  clips.greet = c.greet;
  clips.try   = c.again;                                       // "Oops! Try again!" family
  clips.level = fmt(c.level, { level: '' }).replace(/\s+/g, ' ');  // recorded clip is the generic (numberless) version
  // phonics intros (Letter Sounds game)
  for (const l of LETTERS) {
    const e = c.phonics[l];
    clips[`sound_${l}`] = fmt(c.sound, { letter: l, word: e.word, sound: e.sound || '' }).replace(/\.\.\./g, ',');
  }
  // How Many? intros — per creature, grammar-correct override when present
  for (const cr of ['shells', 'crabs', 'starfish', 'fish', 'octopuses', 'dolphins'])
    clips[`howmany_${cr}`] = c.howManyClips ? c.howManyClips[cr]
                                            : fmt(c.howMany, { creatures: lang === 'en' ? cr : c.creatures[cr] });
  // free-play key names ("B.", "7.")
  for (const k of [...LETTERS, ...DIGITS]) clips[`name_${k}`] = `${k}.`;
  // one-off lines
  clips.which_one   = c.prompt.catNum;
  clips.done_spell  = c.doneSpellClip;
  clips.done_num    = c.doneNumClip;
  clips.make_number = c.makeNumber;
  // performance-coaching verdicts
  for (const [k, text] of Object.entries(c.verdicts)) clips[`verdict_${k}`] = text;
  // "Find the letter R, for Rabbit!" — localized name + localized first letter
  const deacc = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
  for (const n of LSN.CATEGORY_NAMES) {
    const ln = lang === 'en' ? n : (c.names[n] || n);
    clips[`find_for_${n.toLowerCase()}`] = fmt(c.findFor, { letter: deacc(ln).charAt(0).toUpperCase(), name: ln });
  }
  // "Let's spell CAT. Find the letter C!" — one per unique word
  for (const w of new Set([].concat(...Object.values(LSN.WORDS)))) {
    clips[`spell_${w}`] = fmt(c.spell, { word: w, letter: w[0] });
  }
  // Add & Subtract: every possible problem (sum ≤ 9, result ≥ 1); audio is creature-generic
  for (let a = 1; a <= 8; a++) for (let b = 1; b <= 9 - a; b++)
    clips[`math_add_${a}_${b}`] = fmt(c.mathAddClip, { a, b });
  for (let a = 2; a <= 9; a++) for (let b = 1; b <= a - 1; b++)
    clips[`math_sub_${a}_${b}`] = fmt(c.mathSubClip, { a, b });
  // counting intros for every two-digit number (longer numbers stay synth)
  for (let n = 10; n <= 99; n++)
    clips[`count_${n}`] = fmt(c.countIntro, { num: n, digit: String(n)[0] });
  // Language Island: bare vocabulary words, number words 1-10, and the greeting.
  // Same key in each language folder holds THAT language's word (word_dog = "Aso" in tl).
  for (const [name, tr] of Object.entries(VOC.WORDS)) clips[`word_${name.toLowerCase()}`] = tr[lang] || tr.en;
  for (let n = 1; n <= 10; n++) clips[`numword_${n}`] = VOC.NUMS[n][lang] || VOC.NUMS[n].en;
  clips['hello'] = VOC.HELLO[lang] || VOC.HELLO.en;
  clips['count_any'] = c.countAny;   // Monterey Adventures — generic "How many? Count them!"
  // Monterey Adventures: "Welcome to <place>!" intros + per-animal "How many <animal>?" prompts
  for (const pl of MON.PLACES) clips[`place_${pl.id}`] = fmt(VOC.WELCOME[lang] || VOC.WELCOME.en, { p: pl.name });
  for (const key of Object.keys(MON.ANIMALS)) {
    if (key === 'fish') continue;   // howmany_fish already recorded with the sea creatures
    const w = VOC.WORDS[cap(key)];
    const word = lang === 'en' ? MON.ANIMALS[key].name : (w ? (w[lang] || w.en) : key).toLowerCase();
    clips[`howmany_${key}`] = fmt(VOC.HOWMANY[lang] || VOC.HOWMANY.en, { w: word });
  }
  return clips;
}

let present = 0, missing = [];
for (const lang of LANGS) {
  const clips = expectedClips(lang);
  for (const persona of PERSONAS) {
    for (const [key, text] of Object.entries(clips)) {
      const rel = join('voice', 'clips', lang, persona, `${key}.mp3`);
      if (existsSync(join(ROOT, rel))) present++;
      else missing.push({ rel, text });
    }
  }
}

const total = present + missing.length;
console.log(`voice clips: ${present}/${total} present  (${LANGS.length} languages × ${PERSONAS.length} personas × ${total / LANGS.length / PERSONAS.length} keys)`);
if (missing.length) {
  console.log('\nMISSING — regenerate these (text shown is what the clip must say):');
  for (const m of missing) console.log(`  ${m.rel}\n      "${m.text}"`);
  process.exitCode = 1;
} else {
  console.log('all clips present ✔');
}

if (process.argv.includes('--texts')) {
  console.log('\n=== full expected script per language ===');
  for (const lang of LANGS) {
    console.log(`\n--- ${lang} ---`);
    for (const [key, text] of Object.entries(expectedClips(lang))) console.log(`${key}: ${text}`);
  }
}
