// ---------------------------------------------------------------------------
// YAKO.i18n — language, string templates, and localized game vocabulary.
// Data lives in data/strings.<lang>.js (loaded before this file); this module
// only interpolates. Owns the narrator language and the player's name.
// ---------------------------------------------------------------------------
window.YAKO = window.YAKO || {};
window.YAKO.i18n = (function () {
  const S = window.YAKO_STRINGS || {};
  if (!S.en) console.warn('[i18n] data/strings.en.js did not load — strings will be broken');

  // ----- narrator language (persisted) -----
  let voiceLang = 'en-GB';
  try { voiceLang = localStorage.getItem('yako_lang') || 'en-GB'; } catch (e) {}
  function setLang(l) { voiceLang = l; try { localStorage.setItem('yako_lang', l); } catch (e) {} }
  function getLang() { return voiceLang; }
  function langPrefix() { return voiceLang.slice(0, 2); }   // 'en' | 'fr' | 'es'

  // ----- player name (used to personalize spoken lines via '%') -----
  let playerName = '';
  function setPlayerName(n) { playerName = n || ''; }
  function withName(s) {
    if (playerName) return s.split('%').join(playerName);
    let out = s.replace(/%/g, '')
               .replace(/\s+([!?.,])/g, '$1')
               .replace(/,\s*([!?.])/g, '$1')
               .replace(/^[\s,]+/, '')
               .replace(/\s{2,}/g, ' ')
               .trim();
    return out.charAt(0).toUpperCase() + out.slice(1);
  }

  // ----- template interpolation: "Find {key}!" + {key:"the letter A"} -----
  function fmt(t, v) { return String(t).replace(/\{(\w+)\}/g, (m, k) => (v && k in v) ? v[k] : m); }

  // Build the per-language phrase API (same shape the game has always called).
  function makeLang(c) {
    const dk = k => fmt(/[0-9]/.test(String(k)) ? c.numberKey : c.letterKey, { k: k });
    return {
      dk: dk,
      find:       a => fmt(c.find, { key: dk(a) }),
      starts:     (n, l) => fmt(c.starts, { name: n, letter: l }),
      findFor:    (n, l) => fmt(c.findFor, { name: n, letter: l }),
      spell:      (w, l) => fmt(c.spell, { word: w, letter: l }),
      next:       a => fmt(c.next, { key: dk(a) }),
      countIntro: (num, d) => fmt(c.countIntro, { num: num, digit: d }),
      sound:      (l, w, s) => fmt(c.sound, { letter: l, word: w, sound: s || '' }),
      howMany:    cr => fmt(c.howMany, { creatures: cr }),
      mathAdd:    (a, b, cr) => fmt(c.mathAdd, { a: a, b: b, creatures: cr }),
      mathSub:    (a, b, cr) => fmt(c.mathSub, { a: a, b: b, creatures: cr }),
      doneSpell:  w => fmt(c.doneSpell, { word: w }),
      doneNum:    w => fmt(c.doneNum, { word: w }),
      wrong:      (pd, a) => fmt(c.wrong, { pressed: pd, key: dk(a) }),
      wrongCount: cr => fmt(c.wrongCount, { creatures: cr }),
      wrongMath:  () => c.wrongMath,
      again:      () => c.again,
      level:      lv => fmt(c.level, { level: lv }),
      cheers: c.cheers,
      greet:  c.greet,
      prompt: c.prompt,
      verdicts: c.verdicts
    };
  }
  const TR = {};
  for (const p in S) TR[p] = makeLang(S[p]);
  function L() { return TR[langPrefix()] || TR.en; }

  // ----- localized vocabulary (color/shape/animal names, sea creatures, phonics) -----
  function deacc(s) { return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function locName(eng) {
    const p = langPrefix();
    if (p === 'en') return eng;
    const c = S[p];
    return (c && c.names && c.names[eng]) || eng;
  }
  function locLetter(eng) { return deacc(locName(eng)).charAt(0).toUpperCase(); }
  function locCreat(eng) {
    const p = langPrefix();
    if (p === 'en') return eng;
    const c = S[p];
    return (c && c.creatures && c.creatures[eng]) || eng;
  }
  // -> [keyword, emoji, sound?]  (sound only exists for English)
  function phonFor(letter) {
    const c = S[langPrefix()] || S.en;
    const e = c && c.phonics && c.phonics[letter];
    return e ? [e.word, e.emoji, e.sound || ''] : [letter, '', ''];
  }

  return {
    setLang: setLang, getLang: getLang, langPrefix: langPrefix,
    setPlayerName: setPlayerName, withName: withName,
    TR: TR, L: L,
    deacc: deacc, locName: locName, locLetter: locLetter, locCreat: locCreat, phonFor: phonFor
  };
})();
