#!/usr/bin/env node
// ---------------------------------------------------------------------------
// check-voices.mjs — verifies the recorded narration library is complete.
//
// The expected clip list is DERIVED from data/strings.*.js (the same data the
// game speaks), so the strings files stay the single source of truth.
// For every language × persona it checks voice/clips/<lang>/<persona>/<key>.mp3
// and prints what each missing clip should say (paste that text into
// Higgsfield seed_audio with the matching voice to regenerate).
//
// Story-Time narration (sty_*), Sentences narration (sen_*/senf_*) and the Watch-reel
// narration (reel_*) are English-only content — they're checked under voice/clips/en/
// for all personas.
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
for (const lang of ['en', 'fr', 'es', 'he', 'tl', 'zh']) {
  await import(pathToFileURL(join(ROOT, 'data', `strings.${lang}.js`)));
}
await import(pathToFileURL(join(ROOT, 'data', 'lessons.js')));
await import(pathToFileURL(join(ROOT, 'data', 'vocab.js')));
await import(pathToFileURL(join(ROOT, 'data', 'stories.js')));
await import(pathToFileURL(join(ROOT, 'data', 'sentences.js')));
await import(pathToFileURL(join(ROOT, 'data', 'reel.js')));
const S = globalThis.YAKO_STRINGS;
const LSN = globalThis.YAKO_LESSONS;
const VOC = globalThis.YAKO_VOCAB;
const MON = globalThis.YAKO_MONTEREY;
const STO = globalThis.YAKO_STORIES;
const SEN = globalThis.YAKO_SENTENCES;
const REEL = globalThis.YAKO_REEL_SAY || {};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const title = w => w.charAt(0) + w.slice(1).toLowerCase();

const LANGS    = ['en', 'fr', 'es', 'he', 'tl', 'zh'];
const PERSONAS = ['mom', 'dad', 'grandpa', 'grandma'];   // Isabella / Mark / Brooks / Mabel
const LETTERS  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const DIGITS   = '0123456789'.split('');
// everyday objects — mirrors OBJECTS_DATA in keyboard-fun.html
const OBJECT_WORDS = ['MILK','TREE','BALL','PLANE','CUP','GIRL','BOY','GLASS','CAR','TRUCK','SHIRT','SHOE','SPOON','FORK','CHAIR'];

const fmt = (t, v) => String(t).replace(/\{(\w+)\}/g, (m, k) => (v && k in v) ? v[k] : m);

// key -> expected spoken text, derived from the language's strings
function expectedClips(lang) {
  const c = S[lang];
  const clips = {};
  for (const l of LETTERS) clips[`find_let_${l}`] = fmt(c.find, { key: fmt(c.letterKey, { k: l }) });
  for (const d of DIGITS)  clips[`find_num_${d}`] = fmt(c.find, { key: fmt(c.numberKey, { k: d }) });
  for (let i = 1; i <= (c.cheers || []).length; i++) clips[`cheer_${i}`] = c.cheers[i - 1];
  for (let i = 1; i <= (c.tries  || []).length; i++) clips[`try_${i}`]   = c.tries[i - 1];
  for (let i = 1; i <= (c.ramp   || []).length; i++) clips[`ramp_${i}`]  = c.ramp[i - 1];
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
  // "Let's spell CAT. Find the letter C!" — one per unique word (spelling lesson + objects)
  for (const w of new Set([].concat(...Object.values(LSN.WORDS), OBJECT_WORDS))) {
    clips[`spell_${w}`] = fmt(c.spell, { word: w, letter: w[0] });
  }
  // Objects lesson — "Milk starts with M. Find M!"
  for (const w of OBJECT_WORDS) {
    clips[`obj_${w}`] = fmt(c.starts, { name: title(w), letter: w[0] });
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
  // Place-card blurbs. Only expected once that language has been translated (vocab.js `t`) —
  // otherwise we would be asking for English audio to be filed under a foreign narrator.
  for (const pl of MON.PLACES) {
    const t = lang === 'en' ? { fact: pl.fact, loves: pl.loves }
                            : (MON.PLACE_T && MON.PLACE_T[pl.id] && MON.PLACE_T[pl.id][lang]);
    if (!t) continue;
    // The card keeps its em-dash on screen; the narrator gets a comma, which TTS paces correctly.
    const spoken = s => s.replace(/\s*—\s*/g, ', ');
    clips[`pfact_${pl.id}`]  = spoken(t.fact);
    clips[`ploves_${pl.id}`] = spoken(t.loves);
  }
  for (const key of Object.keys(MON.ANIMALS)) {
    if (key === 'fish') continue;   // howmany_fish already recorded with the sea creatures
    const w = VOC.WORDS[cap(key)];
    const word = lang === 'en' ? MON.ANIMALS[key].name : (w ? (w[lang] || w.en) : key).toLowerCase();
    clips[`howmany_${key}`] = fmt(VOC.HOWMANY[lang] || VOC.HOWMANY.en, { w: word });
  }
  // Mission Ranch activity lines that are NOT templated (the add/sub prompts reuse
  // the existing math_add_*/math_sub_* recordings, so they are not repeated here).
  if (c.ranch) {
    if (c.ranch.nice)        clips['ranch_nice']    = c.ranch.nice;
    if (c.ranch.goodbye)     clips['ranch_goodbye'] = c.ranch.goodbye;
    if (c.ranch.mulAskShort) clips['ranch_mul']     = c.ranch.mulAskShort;
  }
  return clips;
}

// English-only narration: Story-Time beats + Sentences lines (the content itself is English)
function expectedEnglishOnly() {
  const clips = {};
  for (const s of STO) {
    if (s.intro) clips[`sintro_${s.vox}`] = s.intro;   // narration over the story's intro film
    const walk = beats => beats.forEach((b, i) => {
      if (b.say) clips[`sty_${s.vox}_${b.vk != null ? b.vk : i}`] = b.say;
      if (b.fork) b.fork.options.forEach(o => walk(o.beats));
    });
    walk(s.beats);
  }
  // Spoken task instructions on 'choose' story beats. These live beside the narration
  // (styp_* next to sty_*) because the prompt is a second clip played after the say line.
  for (const s of STO) {
    const walk = beats => beats.forEach((b, i) => {
      const vk = b.vk != null ? b.vk : i;
      if (b.task && b.task.prompt) clips[`styp_${s.vox}_${vk}`] = b.task.prompt;
      if (b.fork) b.fork.options.forEach(o => walk(o.beats || []));
    });
    walk(s.beats);
  }
  // Watch-reel narration — one line per clip of the little film (data/reel.js)
  for (const [key, text] of Object.entries(REEL)) clips[key] = text;
  let li = 0;
  for (const st of SEN) for (const ln of st.lines) {
    clips[`sen_${li}`]  = (ln.before + ' blank ' + (ln.after || '')).replace(/\s+/g, ' ').trim() + " Let's spell " + ln.answer + '.';
    clips[`senf_${li}`] = ((ln.before ? ln.before + ' ' : '') + ln.answer + (ln.after ? ' ' + ln.after : '')).replace(/\s+([.!?,])/g, '$1');
    li++;
  }
  return clips;
}

// ---------------------------------------------------------------------------
// RUNTIME-ONLY keys: reachable from js/ranch.js but NOT part of the derivation
// above. The ranch was written after this checker and drives the same key
// namespaces from its own generator, bounded by the TIERS table rather than by
// the lesson's own caps — so the game can ask for clips this file never expected
// and js/audio.js silently drops to the speech synthesiser with nobody the wiser.
// These are reported as a TRACKED SHORTFALL, separately from the core corpus, so
// that a genuine regression in the core is never masked by a known backlog.
function runtimeOnlyClips(lang) {
  const c = S[lang], clips = {};
  // Vowels lesson: each vowel has a short AND a long sound, so "A says aah, like in
  // cat" and "A says ay, like in cake" are two different recordings. The sound and the
  // example word stay English in every language (the answer letters are QWERTY); only
  // the sentence around them is localized, which is why these are per-language keys.
  for (const [letter, sounds] of Object.entries(VOC.VOWELS || {}))
    for (const v of sounds)
      clips[`vowel_${letter}_${v.k}`] = fmt(c.vowel || S.en.vowel,
        { letter, sound: v.sound, word: v.word });
  // Count Sheep counts every sheep aloud, up to 20 (js/ranch.js: `i < 20`).
  for (let n = 11; n <= 20; n++)
    if (VOC.NUMS[n]) clips[`numword_${n}`] = VOC.NUMS[n][lang] || VOC.NUMS[n].en;
  // Confident tier: addMax 20 with the span capped at 10 -> a,b each reach 10.
  for (let a = 1; a <= 10; a++) for (let b = 1; b <= 10; b++)
    if (a + b > 9) clips[`math_add_${a}_${b}`] = fmt(c.mathAddClip, { a, b });
  // sub: A reaches the span cap of 10 (2..10), B is 1..A-1.
  for (let a = 10; a <= 10; a++) for (let b = 1; b <= a - 1; b++)
    clips[`math_sub_${a}_${b}`] = fmt(c.mathSubClip, { a, b });
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
const enOnly = expectedEnglishOnly();
let enPresent = 0, enMissing = [];
for (const persona of PERSONAS) {
  for (const [key, text] of Object.entries(enOnly)) {
    const rel = join('voice', 'clips', 'en', persona, `${key}.mp3`);
    if (existsSync(join(ROOT, rel))) enPresent++;
    else enMissing.push({ rel, text });
  }
}

// tracked shortfall (does NOT fail the run; it is a known backlog, not a regression)
let rtPresent = 0, rtMissing = [];
for (const lang of LANGS) {
  const extra = runtimeOnlyClips(lang);
  for (const persona of PERSONAS)
    for (const [key, text] of Object.entries(extra)) {
      const rel = join('voice', 'clips', lang, persona, `${key}.mp3`);
      if (existsSync(join(ROOT, rel))) rtPresent++; else rtMissing.push({ rel, text });
    }
}

const total = present + missing.length;
console.log(`voice clips: ${present}/${total} present  (${LANGS.length} languages × ${PERSONAS.length} personas × ${total / LANGS.length / PERSONAS.length} keys)`);
console.log(`story/sentence clips (English-only): ${enPresent}/${enPresent + enMissing.length} present`);
const allMissing = missing.concat(enMissing);
if (allMissing.length) {
  console.log('\nMISSING — regenerate these (text shown is what the clip must say):');
  for (const m of allMissing) console.log(`  ${m.rel}\n      "${m.text}"`);
  process.exitCode = 1;
} else {
  console.log('all clips present ✔');
}
if (rtMissing.length) {
  console.log(`\nRUNTIME-ONLY SHORTFALL (reachable at runtime, never derived above):`);
  console.log(`  ${rtPresent}/${rtPresent + rtMissing.length} present — ${rtMissing.length} clips not yet recorded.`);
  console.log(`  These degrade to the speech synthesiser at runtime. Not a regression; a backlog.`);
  console.log(`  Run with --runtime to list them.`);
  if (process.argv.includes('--runtime'))
    for (const m of rtMissing) console.log(`  ${m.rel}\n      "${m.text}"`);
}

if (process.argv.includes('--texts')) {
  console.log('\n=== full expected script per language ===');
  for (const lang of LANGS) {
    console.log(`\n--- ${lang} ---`);
    for (const [key, text] of Object.entries(expectedClips(lang))) console.log(`${key}: ${text}`);
  }
  console.log('\n--- en-only (stories + sentences) ---');
  for (const [key, text] of Object.entries(expectedEnglishOnly())) console.log(`${key}: ${text}`);
}
