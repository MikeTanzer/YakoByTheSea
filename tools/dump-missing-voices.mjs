#!/usr/bin/env node
// Dump every MISSING voice clip as JSON [{lang, persona, key, text}] for batch
// generation. Reuses the same derivation as check-voices.mjs, with two
// text-to-speech-safety tweaks for generation only:
//   - spell_* texts title-case the word (so "CAT" is read as the word "Cat",
//     not spelled out letter-by-letter by the TTS)
//   - the zh `level` clip uses a clean numberless phrase (the {level}-template
//     with the number removed reads awkwardly in Mandarin)
import { existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
globalThis.window = globalThis;
for (const lang of ['en', 'fr', 'es', 'he', 'tl', 'zh']) {
  await import(pathToFileURL(join(ROOT, 'data', `strings.${lang}.js`)));
}
await import(pathToFileURL(join(ROOT, 'data', 'lessons.js')));
await import(pathToFileURL(join(ROOT, 'data', 'vocab.js')));
await import(pathToFileURL(join(ROOT, 'data', 'stories.js')));
await import(pathToFileURL(join(ROOT, 'data', 'sentences.js')));

// reuse the checker's derivation by re-importing it is circular; duplicate the
// small bits we need via a dynamic import of the module-level functions is not
// exposed — so we shell out: run the checker with --texts? Simpler: replicate by
// importing the checker file is side-effectful. We inline-require the derivation
// by evaluating the same logic through the checker's own missing report instead:
// run check-voices.mjs programmatically is messy — here we just re-derive with
// the identical code path by importing the checker as a child process JSON dump.
// --- To keep one source of truth, this script re-executes the checker's logic
//     by importing the same data and repeating expectedClips (kept in sync). ---
const S = globalThis.YAKO_STRINGS, LSN = globalThis.YAKO_LESSONS, VOC = globalThis.YAKO_VOCAB,
      MON = globalThis.YAKO_MONTEREY, STO = globalThis.YAKO_STORIES, SEN = globalThis.YAKO_SENTENCES;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const title = w => w.charAt(0) + w.slice(1).toLowerCase();
const fmt = (t, v) => String(t).replace(/\{(\w+)\}/g, (m, k) => (v && k in v) ? v[k] : m);
const LANGS = ['en', 'fr', 'es', 'he', 'tl', 'zh'];
const PERSONAS = ['mom', 'dad', 'grandpa', 'grandma'];
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const DIGITS = '0123456789'.split('');
const OBJECT_WORDS = ['MILK','TREE','BALL','PLANE','CUP','GIRL','BOY','GLASS','CAR','TRUCK','SHIRT','SHOE','SPOON','FORK','CHAIR'];

function expectedClips(lang) {
  const c = S[lang]; const clips = {};
  for (const l of LETTERS) clips[`find_let_${l}`] = fmt(c.find, { key: fmt(c.letterKey, { k: l }) });
  for (const d of DIGITS)  clips[`find_num_${d}`] = fmt(c.find, { key: fmt(c.numberKey, { k: d }) });
  for (let i = 1; i <= (c.cheers || []).length; i++) clips[`cheer_${i}`] = c.cheers[i - 1];
  for (let i = 1; i <= (c.tries  || []).length; i++) clips[`try_${i}`]   = c.tries[i - 1];
  for (let i = 1; i <= (c.ramp   || []).length; i++) clips[`ramp_${i}`]  = c.ramp[i - 1];
  clips.greet = c.greet; clips.try = c.again;
  clips.level = lang === 'zh' ? '五颗星！你完成了这一关！我真为你骄傲！'
                              : fmt(c.level, { level: '' }).replace(/\s+/g, ' ');
  for (const l of LETTERS) { const e = c.phonics[l];
    clips[`sound_${l}`] = fmt(c.sound, { letter: l, word: e.word, sound: e.sound || '' }).replace(/\.\.\./g, ','); }
  for (const cr of ['shells','crabs','starfish','fish','octopuses','dolphins'])
    clips[`howmany_${cr}`] = c.howManyClips ? c.howManyClips[cr]
                                            : fmt(c.howMany, { creatures: lang === 'en' ? cr : c.creatures[cr] });
  for (const k of [...LETTERS, ...DIGITS]) clips[`name_${k}`] = `${k}.`;
  clips.which_one = c.prompt.catNum; clips.done_spell = c.doneSpellClip;
  clips.done_num = c.doneNumClip; clips.make_number = c.makeNumber;
  for (const [k, text] of Object.entries(c.verdicts)) clips[`verdict_${k}`] = text;
  const deacc = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
  for (const n of LSN.CATEGORY_NAMES) {
    const ln = lang === 'en' ? n : (c.names[n] || n);
    clips[`find_for_${n.toLowerCase()}`] = fmt(c.findFor, { letter: deacc(ln).charAt(0).toUpperCase(), name: ln });
  }
  for (const w of new Set([].concat(...Object.values(LSN.WORDS), OBJECT_WORDS)))
    clips[`spell_${w}`] = fmt(c.spell, { word: title(w), letter: w[0] });   // title-case: TTS reads the word
  for (const w of OBJECT_WORDS)
    clips[`obj_${w}`] = fmt(c.starts, { name: title(w), letter: w[0] });
  for (let a = 1; a <= 8; a++) for (let b = 1; b <= 9 - a; b++)
    clips[`math_add_${a}_${b}`] = fmt(c.mathAddClip, { a, b });
  for (let a = 2; a <= 9; a++) for (let b = 1; b <= a - 1; b++)
    clips[`math_sub_${a}_${b}`] = fmt(c.mathSubClip, { a, b });
  for (let n = 10; n <= 99; n++)
    clips[`count_${n}`] = fmt(c.countIntro, { num: n, digit: String(n)[0] });
  for (const [name, tr] of Object.entries(VOC.WORDS)) clips[`word_${name.toLowerCase()}`] = tr[lang] || tr.en;
  for (let n = 1; n <= 10; n++) clips[`numword_${n}`] = VOC.NUMS[n][lang] || VOC.NUMS[n].en;
  clips['hello'] = VOC.HELLO[lang] || VOC.HELLO.en;
  clips['count_any'] = c.countAny;
  for (const pl of MON.PLACES) clips[`place_${pl.id}`] = fmt(VOC.WELCOME[lang] || VOC.WELCOME.en, { p: pl.name });
  for (const key of Object.keys(MON.ANIMALS)) {
    if (key === 'fish') continue;
    const w = VOC.WORDS[cap(key)];
    const word = lang === 'en' ? MON.ANIMALS[key].name : (w ? (w[lang] || w.en) : key).toLowerCase();
    clips[`howmany_${key}`] = fmt(VOC.HOWMANY[lang] || VOC.HOWMANY.en, { w: word });
  }
  return clips;
}
function expectedEnglishOnly() {
  const clips = {};
  for (const s of STO) {
    const walk = beats => beats.forEach((b, i) => {
      if (b.say) clips[`sty_${s.vox}_${b.vk != null ? b.vk : i}`] = b.say;
      if (b.fork) b.fork.options.forEach(o => walk(o.beats));
    });
    walk(s.beats);
  }
  let li = 0;
  for (const st of SEN) for (const ln of st.lines) {
    clips[`sen_${li}`]  = (ln.before + ' blank ' + (ln.after || '')).replace(/\s+/g, ' ').trim() + " Let's spell " + title(ln.answer) + '.';
    clips[`senf_${li}`] = ((ln.before ? ln.before + ' ' : '') + title(ln.answer) + (ln.after ? ' ' + ln.after : '')).replace(/\s+([.!?,])/g, '$1');
    li++;
  }
  return clips;
}

const out = [];
for (const lang of LANGS) {
  const clips = expectedClips(lang);
  for (const persona of PERSONAS)
    for (const [key, text] of Object.entries(clips))
      if (!existsSync(join(ROOT, 'voice', 'clips', lang, persona, `${key}.mp3`)))
        out.push({ lang, persona, key, text });
}
const enOnly = expectedEnglishOnly();
for (const persona of PERSONAS)
  for (const [key, text] of Object.entries(enOnly))
    if (!existsSync(join(ROOT, 'voice', 'clips', 'en', persona, `${key}.mp3`)))
      out.push({ lang: 'en', persona, key, text });

const dest = process.argv[2] || join(ROOT, 'voice', 'missing-voices.json');
writeFileSync(dest, JSON.stringify(out, null, 1));
console.log(`missing clips: ${out.length} -> ${dest}`);
