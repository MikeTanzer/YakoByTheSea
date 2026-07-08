// ---------------------------------------------------------------------------
// YAKO.audio — every sound the game makes:
//   • Web-Audio sound effects (applause, chime, try-again tone, free-play notes)
//   • The narrator: recorded Higgsfield persona clips (voice/clips/<lang>/<persona>/)
//     with the speech-synthesis voice as automatic fallback.
// Owns the voice character (persona) and the mute switch.
// Depends on YAKO.i18n (js/i18n.js must load first).
// ---------------------------------------------------------------------------
window.YAKO = window.YAKO || {};
window.YAKO.audio = (function () {
  const I = () => window.YAKO.i18n;

  // ----- mute switch (persisted, like language and persona) -----
  let muted = false;
  try { muted = localStorage.getItem('yako_muted') === 'true'; } catch (e) {}
  function setMuted(m) {
    muted = !!m;
    try { localStorage.setItem('yako_muted', String(muted)); } catch (e) {}
    if (muted) stopAllSounds();
  }
  function isMuted() { return muted; }

  // ----- master volume (persisted; 0..1, scales clips + SFX + synth) -----
  let volume = 1;
  try { const v = parseFloat(localStorage.getItem('yako_volume')); if (!isNaN(v)) volume = Math.min(1, Math.max(0, v)); } catch (e) {}
  function setVolume(v) {
    volume = Math.min(1, Math.max(0, +v || 0));
    try { localStorage.setItem('yako_volume', String(volume)); } catch (e) {}
    VOICE.a.volume = volume;
    if (master) master.gain.value = volume;
  }
  function getVolume() { return volume; }

  // ----- Web Audio context -----
  let actx = null, master = null;
  function ensureAudio() {
    if (!actx) {
      actx = new (window.AudioContext || window.webkitAudioContext)();
      master = actx.createGain();               // every effect routes through this
      master.gain.value = volume;
      master.connect(actx.destination);
    }
    if (actx.state === 'suspended') actx.resume();
  }
  const out = () => master || actx.destination;
  let activeNodes = [];
  function trackNode(node) {
    activeNodes.push(node);
    node.onended = () => { activeNodes = activeNodes.filter(n => n !== node); };
  }
  function stopAllSounds() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    VOICE.token++; try { VOICE.a.pause(); } catch (e) {}
    activeNodes.forEach(n => { try { n.stop(); } catch (e) {} });
    activeNodes = [];
  }

  // ----- sound effects -----
  function oneClap(t, level) {
    const dur = 0.03 + Math.random() * 0.025;
    const buffer = actx.createBuffer(1, Math.ceil(actx.sampleRate * dur), actx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let j = 0; j < data.length; j++) {
      const p = j / data.length;
      const env = Math.pow(1 - p, 2.5) * (p < 0.02 ? p / 0.02 : 1);
      data[j] = (Math.random() * 2 - 1) * env;
    }
    const src = actx.createBufferSource(); src.buffer = buffer;
    const bp = actx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 900 + Math.random() * 1800;
    bp.Q.value = 0.6 + Math.random() * 0.8;
    const gain = actx.createGain();
    gain.gain.value = level * (0.6 + Math.random() * 0.6);
    let node = gain;
    if (actx.createStereoPanner) {
      const pan = actx.createStereoPanner();
      pan.pan.value = (Math.random() * 2 - 1) * 0.8;
      gain.connect(pan); node = pan;
    }
    src.connect(bp); bp.connect(gain); node.connect(out());
    trackNode(src);
    src.start(t);
  }
  function playApplause(durationSec) {
    if (muted || !actx) return 0;
    const total = durationSec || (2.5 + Math.random() * 2.5);
    const now = actx.currentTime + 0.02;
    const claps = Math.floor(total * 55) + 40;
    for (let i = 0; i < claps; i++) {
      const t = now + Math.random() * total;
      const phase = (t - now) / total;
      let env;
      if (phase < 0.12)      env = phase / 0.12;
      else if (phase > 0.78) env = (1 - phase) / 0.22;
      else                   env = 1;
      const lvl = 0.04 + 0.08 * Math.max(0.18, env);
      oneClap(t, lvl);
    }
    return total;
  }
  function playChime() {
    if (muted || !actx) return;
    const now = actx.currentTime;
    const scales = [
      [523.25, 659.25, 783.99, 1046.5],
      [587.33, 739.99, 880.00, 1174.7],
      [659.25, 830.61, 987.77, 1318.5],
    ];
    const notes = scales[Math.floor(Math.random() * scales.length)];
    notes.forEach((f, i) => {
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = f;
      const t = now + i * 0.12;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      osc.connect(gain); gain.connect(out());
      trackNode(osc);
      osc.start(t); osc.stop(t + 0.55);
    });
  }
  function playTryAgainTone() {
    if (muted || !actx) return;
    const now = actx.currentTime;
    const osc = actx.createOscillator();
    const gain = actx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.linearRampToValueAtTime(330, now + 0.25);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain); gain.connect(out());
    trackNode(osc);
    osc.start(now); osc.stop(now + 0.32);
  }
  // Free-play pentatonic note per key
  const PENTA = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
  function playNote(key) {
    if (muted || !actx) return;
    const code = (key && key.charCodeAt(0)) || 0;
    const f = PENTA[code % PENTA.length];
    const now = actx.currentTime;
    const osc = actx.createOscillator();
    const gain = actx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = f;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc.connect(gain); gain.connect(out());
    trackNode(osc);
    osc.start(now); osc.stop(now + 0.5);
  }
  // Music lesson: play a pure note or a chord (array of frequencies) with a soft
  // triangle voice + gentle ADSR. Chords play together; pass {arp:true} to roll them.
  function playTone(freqs, opts) {
    ensureAudio();
    if (muted || !actx) return;
    opts = opts || {};
    freqs = Array.isArray(freqs) ? freqs : [freqs];
    const now = actx.currentTime;
    const dur = opts.dur || 0.95;
    const peak = (opts.gain || 0.34) / Math.max(1, Math.sqrt(freqs.length));   // keep chords from clipping
    freqs.forEach((f, i) => {
      const t = now + (opts.arp ? i * 0.16 : 0);
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(peak, t + 0.02);
      gain.gain.linearRampToValueAtTime(peak * 0.7, t + dur * 0.55);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain); gain.connect(out());
      trackNode(osc);
      osc.start(t); osc.stop(t + dur + 0.05);
    });
  }
  // The old synthesized menu bark was retired (it read as a "recurring noise").
  function startBarkLoop() {}
  function stopBarkLoop() {}

  // ----- narrator persona (persisted) -----
  let voicePersona = 'mom';
  try { voicePersona = localStorage.getItem('yako_persona') || 'mom'; } catch (e) {}
  const PERSONA = {
    mom:     { gender: 'female', pitch: 1.25, rate: 1.0 },
    dad:     { gender: 'male',   pitch: 0.85, rate: 0.97 },
    grandpa: { gender: 'male',   pitch: 0.7,  rate: 0.84 },
    grandma: { gender: 'female', pitch: 1.0,  rate: 0.85 }
  };
  function setPersona(p) { voicePersona = p; try { localStorage.setItem('yako_persona', p); } catch (e) {} pickVoice(); }
  function getPersona() { return voicePersona; }

  // ----- speech synthesis (the always-available fallback voice) -----
  const VOICE_FEM = /(female|Samantha|Victoria|Karen|Moira|Tessa|Fiona|Amelie|Amélie|Audrey|Aurelie|Marie|Chantal|Monica|Mónica|Paulina|Marisol|Zira|Aria|Jenny|Helena|Sabina|Esperanza|Google US English|Google.*[Ff]ran|Google.*[Ee]spa)/;
  const VOICE_MAS = /(\bmale|Daniel|Alex|Fred|Aaron|Tom|Oliver|Thomas|Nicolas|Mathieu|Jorge|Diego|Carlos|Juan|Pablo|David|Mark|Guy)/;
  let voice = null;
  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = speechSynthesis.getVoices(); if (!voices.length) return;
    const pre = I().langPrefix();
    let pool = voices.filter(v => v.lang && v.lang.toLowerCase().slice(0, 2) === pre);
    if (!pool.length) pool = voices;
    const re = (PERSONA[voicePersona] || PERSONA.mom).gender === 'female' ? VOICE_FEM : VOICE_MAS;
    voice = pool.find(v => re.test(v.name)) || pool.find(v => v.default) || pool[0] || null;
  }
  if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = pickVoice;

  function speak(text, opts) {
    if (muted || !('speechSynthesis' in window)) return;
    opts = opts || {};
    pickVoice();                                  // honor current language/persona
    const p = PERSONA[voicePersona] || PERSONA.mom;
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.lang = I().getLang();
    u.rate = (opts.rate || 1) * p.rate;
    u.pitch = p.pitch;
    u.volume = volume;
    speechSynthesis.speak(u);
  }
  function speakName(line, opts) { speak(I().withName(line), opts); }

  // ----- recorded narration clips -----
  const VOICE = { dir: 'voice/clips/', a: new Audio(), token: 0, ready: false };  // flat root clips disabled — persona clips + synth cover everything
  VOICE.a.volume = volume;                       // honor the persisted master volume
  function chClip(ch) {
    ch = String(ch).toUpperCase();
    if (/^[A-Z]$/.test(ch)) return 'let_' + ch;
    if (/^[0-9]$/.test(ch)) return 'num_' + ch;
    return null;
  }
  const isNum = ch => /^[0-9]$/.test(String(ch));
  function stopVoice() { VOICE.token++; try { VOICE.a.pause(); } catch (e) {} }
  function playClips(ids, fallback, opts) {
    const my = VOICE.token; let i = 0; const a = VOICE.a;
    function step() {
      if (my !== VOICE.token) return;          // a newer line took over
      if (i >= ids.length) return;
      a.src = VOICE.dir + ids[i++] + '.mp3';
      a.onended = () => { if (my === VOICE.token) setTimeout(step, 70); };
      a.onerror = () => { if (my === VOICE.token && fallback) { VOICE.token++; speakName(fallback, opts); } };
      const p = a.play(); if (p && p.catch) p.catch(() => {});
    }
    step();
  }
  // say(): play a recorded clip sequence; fall back to the synth voice if clips are absent/blocked
  function say(ids, fallback, opts) {
    stopVoice();
    ids = (ids || []).filter(Boolean);
    if (muted) return;
    if (!VOICE.ready || !ids.length) { if (fallback) speakName(fallback, opts); return; }
    playClips(ids, fallback, opts);
  }
  // Higgsfield persona clips (cheers / try-again / level-up / greeting / find-the-key),
  // per current language + character; synth fallback if a clip is missing.
  function playPersona(keys, fallback, opts) {
    if (muted) return;
    const key = Array.isArray(keys) ? keys[(Math.random() * keys.length) | 0] : keys;
    stopVoice();
    const my = ++VOICE.token, a = VOICE.a;
    a.src = VOICE.dir + I().langPrefix() + '/' + voicePersona + '/' + key + '.mp3';
    a.onended = null;
    a.onerror = () => { if (my === VOICE.token && fallback) speakName(fallback, opts); };
    const p = a.play();
    if (p && p.catch) p.catch(() => { if (my === VOICE.token && fallback) speakName(fallback, opts); });
  }
  // Play several persona clips back-to-back (e.g. "Let's make a big number!" + "Find the number 4!").
  // Any failure mid-chain falls back to speaking the full synth sentence.
  function playPersonaChain(keys, fallback, opts) {
    if (muted) return;
    stopVoice();
    const my = ++VOICE.token, a = VOICE.a;
    const dir = VOICE.dir + I().langPrefix() + '/' + voicePersona + '/';
    let i = 0;
    function step() {
      if (my !== VOICE.token || i >= keys.length) return;
      a.src = dir + keys[i++] + '.mp3';
      a.onended = () => { if (my === VOICE.token) setTimeout(step, 120); };
      a.onerror = () => { if (my === VOICE.token && fallback) speakName(fallback, opts); };
      const p = a.play();
      if (p && p.catch) p.catch(() => { if (my === VOICE.token && fallback) speakName(fallback, opts); });
    }
    step();
  }
  function nextCheer() { const a = I().L().cheers; return a[(Math.random() * a.length) | 0]; }

  // ----- language lessons: play a clip in a SPECIFIC language (not the UI language) -----
  // Used by "Guess the Language", "Word Safari", etc. where the narrator says a word
  // in a chosen tongue. Falls back to synth speech (in that language) if the clip is absent.
  function speakIn(lang, text, opts) {
    if (muted || !text || !('speechSynthesis' in window)) return;
    const p = PERSONA[voicePersona] || PERSONA.mom;
    const u = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const pre = String(lang).slice(0, 2);
    const pool = voices.filter(v => v.lang && v.lang.toLowerCase().slice(0, 2) === pre);
    const re = p.gender === 'female' ? VOICE_FEM : VOICE_MAS;
    u.voice = (pool.find(v => re.test(v.name)) || pool[0] || voice) || null;
    u.lang = pre;
    u.rate = (opts && opts.rate || 1) * p.rate;
    u.pitch = p.pitch;
    speechSynthesis.speak(u);
  }
  function playPersonaLang(lang, key, fallback, opts) {
    if (muted) return;
    stopVoice();
    const pre = String(lang).slice(0, 2);
    const my = ++VOICE.token, a = VOICE.a;
    let fell = false;                                        // fall back at most once
    const fb = () => { if (!fell && my === VOICE.token) { fell = true; speakIn(pre, fallback, opts); } };
    a.src = VOICE.dir + pre + '/' + voicePersona + '/' + key + '.mp3';
    a.onended = null;
    a.onerror = fb;
    const pl = a.play();
    if (pl && pl.catch) pl.catch(fb);
  }
  // Play several clips in sequence, each in its own language: items = [{lang, key, fallback}].
  function playPersonaLangChain(items, opts) {
    if (muted) return;
    stopVoice();
    const my = ++VOICE.token, a = VOICE.a;
    let i = 0;
    function step() {
      if (my !== VOICE.token || i >= items.length) return;
      const it = items[i++]; const pre = String(it.lang).slice(0, 2);
      a.src = VOICE.dir + pre + '/' + voicePersona + '/' + it.key + '.mp3';
      a.onended = () => { if (my === VOICE.token) setTimeout(step, 260); };
      a.onerror = () => { if (my === VOICE.token) { speakIn(pre, it.fallback, opts); setTimeout(step, 900); } };
      const pl = a.play();
      if (pl && pl.catch) pl.catch(() => { if (my === VOICE.token) { speakIn(pre, it.fallback, opts); } });
    }
    step();
  }

  return {
    setMuted: setMuted, isMuted: isMuted,
    setVolume: setVolume, getVolume: getVolume,
    ensureAudio: ensureAudio, stopAllSounds: stopAllSounds,
    playApplause: playApplause, playChime: playChime, playTryAgainTone: playTryAgainTone, playNote: playNote, playTone: playTone,
    startBarkLoop: startBarkLoop, stopBarkLoop: stopBarkLoop,
    setPersona: setPersona, getPersona: getPersona, pickVoice: pickVoice,
    speak: speak, speakName: speakName,
    say: say, playPersona: playPersona, playPersonaChain: playPersonaChain, stopVoice: stopVoice,
    playPersonaLang: playPersonaLang, playPersonaLangChain: playPersonaLangChain, speakIn: speakIn,
    chClip: chClip, isNum: isNum, nextCheer: nextCheer
  };
})();
