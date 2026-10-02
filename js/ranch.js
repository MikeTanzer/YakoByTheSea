/* ===========================================================================
   Mission Ranch — "count the sheep with Yako"  (Phase 1 activity)

   A self-contained, code-drawn counting game that runs as a full-screen overlay.
   It deliberately does NOT reuse the keyboard-answer challenge pipeline: that
   flow assumes a key press decides the answer, whereas here the child taps each
   animal in turn. Everything it needs it owns.

   Design notes that matter if you change this file:
     • The sheep are inline SVG, not bitmaps. A toddler touch target is 64-130
       CSS px (so 2-3x that in device pixels) and the painted sheep in
       scenes/mission.png are only ~70px wide — upscaling them turns to mush.
       SVG stays crisp, has clean alpha, and can actually be animated.
     • The stage art is scenes/mission_meadow.png, cropped from the real
       painting to the sheep-FREE right-hand meadow. The spec requires that
       every animal that looks countable matches the target, so the decorative
       flock must not share the frame.
     • Visual feedback is synchronous on tap; narration is queued. That is what
       makes rapid tapping safe — the count and the badge never lag or double,
       and the spoken numbers still arrive in order.
   =========================================================================== */
(function () {
  'use strict';

  var YAKO = (window.YAKO = window.YAKO || {});
  function A() { return YAKO.audio || null; }
  function I() { return YAKO.i18n || null; }

  // ---------------------------------------------------------------- strings
  // English is the base layer; the active language overrides it key by key, so
  // a language that is missing one string degrades to English for that string
  // only instead of losing the whole activity.
  function T() {
    var S = window.YAKO_STRINGS || {};
    var p = I() ? I().langPrefix() : 'en';
    var base = (S.en && S.en.ranch) || {};
    var loc = (S[p] && S[p].ranch) || {};
    var out = {}, k;
    for (k in base) out[k] = base[k];
    for (k in loc) if (loc[k]) out[k] = loc[k];
    return out;
  }
  function fmt(t, v) {
    return String(t || '').replace(/\{(\w+)\}/g, function (m, k) { return (v && k in v) ? v[k] : m; });
  }
  function numWord(n) {
    var V = window.YAKO_VOCAB, p = I() ? I().langPrefix() : 'en';
    var w = V && V.NUMS && V.NUMS[n];
    return w ? (w[p] || w.en) : String(n);
  }
  function isRTL() { return (I() ? I().langPrefix() : 'en') === 'he'; }

  // ------------------------------------------------------------- difficulty
  // Parent-selectable floor; `span` then adapts gently inside the tier.
  // Each tier caps every stage. `max` is the counting range; addMax/subMax cap the
  // result of an arithmetic round; mulG/mulC cap the groups x per-group factors.
  var TIERS = {
    beginner:  { min: 1, max: 3,  addMax: 5,  subMax: 5,  mulG: 2, mulC: 3 },
    growing:   { min: 1, max: 5,  addMax: 10, subMax: 10, mulG: 3, mulC: 4 },
    confident: { min: 1, max: 10, addMax: 20, subMax: 20, mulG: 5, mulC: 5 }
  };
  // The child works through these in order; a stage unlocks after ROUNDS_PER_STAGE
  // completed rounds, and a grown-up can also jump straight to one.
  var STAGES = ['count', 'add', 'sub', 'mul'];
  var ROUNDS_PER_STAGE = 6;
  var ROUNDS = 3;
  var STORE = 'yako_ranch';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; }
  }
  function save(p) {
    try { localStorage.setItem(STORE, JSON.stringify(p)); } catch (e) {}
  }
  function progress() {
    var p = load();
    if (!TIERS[p.tier]) p.tier = 'beginner';
    p.rounds = p.rounds | 0;
    p.sessions = p.sessions | 0;
    p.hints = p.hints | 0;
    p.span = Math.max(TIERS[p.tier].min + 1, Math.min(TIERS[p.tier].max, p.span | 0 || 2));
    if (STAGES.indexOf(p.stage) < 0) p.stage = null;          // null = follow the unlock ladder
    p.stageIdx = Math.min(STAGES.length - 1, Math.floor(p.rounds / ROUNDS_PER_STAGE));
    return p;
  }

  // ------------------------------------------------------------------ utils
  function rnd(n) { return Math.floor(Math.random() * n); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = rnd(i + 1); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function el(tag, cls, html) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (html != null) d.innerHTML = html;
    return d;
  }
  var reduceMotion = false;
  try {
    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduceMotion = mq.matches;
    if (mq.addEventListener) mq.addEventListener('change', function (e) { reduceMotion = e.matches; paint(); });
  } catch (e) {}

  // ------------------------------------------------------------ audio queue
  // One narration at a time, in order, cancellable. Every clip carries a
  // watchdog: playPersona's onend does not fire if a clip stalls mid-download,
  // and a stalled queue would freeze the whole round.
  var qToken = 0, qChain = Promise.resolve(), qDepth = 0;

  function duck(on) {
    try { if (window.fadeMusicDuck) window.fadeMusicDuck(on ? 0.35 : 1, on ? 200 : 700); } catch (e) {}
  }
  function qReset() {
    qToken++; qChain = Promise.resolve(); qDepth = 0; duck(false);
    try { if (A()) A().stopVoice(); } catch (e) {}          // stops a recorded clip...
    // ...but NOT the speech synthesiser. Without this the utterances queue up
    // instead of replacing each other: tap replay a few times and the backlog
    // makes the button look dead.
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
  }
  function speakOnce(key, text, opts) {
    return new Promise(function (res) {
      var a = A();
      if (!a) { setTimeout(res, 250); return; }
      var done = false;
      function fin() { if (done) return; done = true; res(); }
      var words = String(text || '').split(/\s+/).filter(Boolean).length || 2;
      var guard = setTimeout(fin, Math.min(12000, words * 420 + 4000));
      var o = { rate: (opts && opts.rate) || 0.95, onend: function () { clearTimeout(guard); fin(); } };
      try {
        if (key) a.playPersona(key, text, o);
        else a.speak(text, o);
      } catch (e) { clearTimeout(guard); fin(); }
    });
  }
  function qPush(fn) {
    var my = qToken;
    qDepth++;
    if (qDepth === 1) duck(true);
    qChain = qChain
      .then(function () { return (my === qToken) ? fn() : null; })
      .catch(function () {})
      .then(function () { qDepth = Math.max(0, qDepth - 1); if (qDepth === 0) duck(false); });
    return qChain;
  }
  function qClip(key, text, opts) { return qPush(function () { return speakOnce(key, text, opts); }); }
  function qSay(text, opts) { return qPush(function () { return speakOnce(null, text, opts); }); }
  function qThen(fn) { var my = qToken; return qChain.then(function () { if (my === qToken) return fn(); }); }

  // ------------------------------------------------------------- sheep art
  // Side-view sheep. Two mirrored variants plus small scale/tone jitter so a
  // field of them does not read as a row of clones.
  // Painted sheep cut from the same oil-painting style as the Mission Ranch
  // backdrop (objects/sheep_a|b|c.png, chroma-keyed to transparent). The earlier
  // flat SVG never sat right on a painted meadow.
  var SHEEP_ART = ['sheep_a', 'sheep_b', 'sheep_c'];
  function sheepSVG(v) {
    var art = SHEEP_ART[v % SHEEP_ART.length];
    var flip = (v % 2) ? ' flipped' : '';
    // ?v=2 busts the persistent `yako-media` cache, which is deliberately NOT cleared
    // on a service-worker version bump — without it the old photoreal sheep keep serving.
    return '<span class="shArt' + flip + '" style="background-image:url(objects/' + art + '.png?v=2)"></span>';
  }

  // ------------------------------------------------------------ placement
  // A jittered grid, not rejection sampling: with up to 10 sheep in a small
  // meadow, random placement collides constantly and retry loops can stall.
  // A grid guarantees separation; the jitter keeps it from looking like a table.
  function layout(n) {
    var wide = stage && stage.clientWidth > stage.clientHeight * 1.2;
    var cols = Math.max(1, Math.min(n, Math.round(Math.sqrt(n * (wide ? 2.1 : 1.15))) || 1));
    var rows = Math.ceil(n / cols);
    var pts = [];
    for (var i = 0; i < n; i++) {
      var r = Math.floor(i / cols), c = i % cols;
      var inRow = Math.min(cols, n - r * cols);
      pts.push({
        x: (c + 0.5 + (Math.random() - 0.5) * 0.40) / inRow,
        y: (r + 0.5 + (Math.random() - 0.5) * 0.30) / rows
      });
    }
    return shuffle(pts);
  }

  // ------------------------------------------------------------------ state
  var root = null, stage = null, flock = null, bar = null, barText = null,
      choiceRow = null, yakoEl = null, roundTag = null, replayBtn = null;
  var st = null;          // per-round state
  var idleTimer = null, demoTimer = null, askTimer = null;
  var lastSpoken = '';    // what the replay button repeats

  function clearTimers() {
    clearTimeout(idleTimer); idleTimer = null;
    clearTimeout(demoTimer); demoTimer = null;
    clearTimeout(askTimer); askTimer = null;
  }

  // ------------------------------------------------------------------- UI
  function setInstruction(text) {
    lastSpoken = text;
    if (barText) barText.textContent = text;
    syncBarHeight();
  }
  // The number pad owns the bottom of the screen, so the shared sound + music
  // controls anchor to the TOP of that bar instead of the viewport edge.
  function syncBarHeight() {
    if (!bar) return;
    var h = Math.round(bar.getBoundingClientRect().height);
    if (h) document.body.style.setProperty('--ranchBarH', h + 'px');
  }
  function yakoMood(m) {
    if (!yakoEl) return;
    yakoEl.classList.remove('welcome', 'cheer', 'point', 'idle', 'sorry');
    if (m) yakoEl.classList.add(m);
  }
  function paint() {
    if (root) root.classList.toggle('reduce', !!reduceMotion);
  }

  function build() {
    root = el('div', 'ranchScreen');
    root.id = 'ranch';
    root.setAttribute('role', 'application');
    root.hidden = true;

    var top = el('div', 'rTop');
    var home = el('button', 'rIcon rHome');
    home.type = 'button';
    home.innerHTML = '🏠';
    home.addEventListener('click', function () { close(); });
    roundTag = el('div', 'rRound');
    top.appendChild(home);
    top.appendChild(roundTag);
    root.appendChild(top);

    stage = el('div', 'rStage');
    flock = el('div', 'rFlock');
    stage.appendChild(flock);
    // Yako + puppy. Two layers, best-effort:
    //   1. a transparent dancing video loop (see mountDance below)
    //   2. a 4-pose flipbook (ui/yako_poses.png) that shows if the video can't run
    yakoEl = el('div', 'rYako');
    yakoEl.setAttribute('aria-hidden', 'true');
    stage.appendChild(yakoEl);
    mountDance(yakoEl);
    root.appendChild(stage);

    bar = el('div', 'rBar');
    barText = el('p', 'rText');
    barText.id = 'rInstruction';
    replayBtn = el('button', 'rIcon rReplay');
    replayBtn.type = 'button';
    replayBtn.innerHTML = '🔊';
    replayBtn.addEventListener('click', function () {
      // Replay repeats ONLY the current instruction; it never re-queues counting.
      qReset();
      var line = lastSpoken;
      // Chrome drops an utterance passed to speak() in the same tick as cancel(),
      // so let the cancel settle first. Also nudge a synth that parked itself.
      setTimeout(function () {
        try { if (window.speechSynthesis && window.speechSynthesis.paused) window.speechSynthesis.resume(); } catch (e) {}
        if (line) qSay(line);
      }, 90);
      armIdle();
    });
    bar.appendChild(barText);
    choiceRow = el('div', 'rChoices');
    bar.appendChild(choiceRow);
    root.appendChild(bar);

    document.body.appendChild(root);
    paint();
  }

  // --------------------------------------------------------------- rounds
  function stageFor(p) { return p.stage || STAGES[p.stageIdx] || 'count'; }

  // Build one round for the current stage, capped by the parent-chosen tier.
  function makeRound(p) {
    var t = TIERS[p.tier], sg = stageFor(p);
    var hi = Math.max(t.min, Math.min(t.max, p.span));
    if (sg === 'add') {
      var a = 1 + rnd(Math.max(1, Math.min(hi, t.addMax - 1)));
      var b = 1 + rnd(Math.max(1, Math.min(hi, t.addMax - a)));
      return { stage: 'add', a: a, b: b, answer: a + b, groups: [a, b] };
    }
    if (sg === 'sub') {
      // hi is the counting span; hi + 1 let A reach 11 while the span caps at 10,
      // putting one more sheep on the meadow than the tier allows.
      var A = 2 + rnd(Math.max(1, Math.min(t.subMax, hi) - 1));
      var B = 1 + rnd(Math.max(1, A - 1));
      return { stage: 'sub', a: A, b: B, answer: A - B, groups: [A], leaving: B };
    }
    if (sg === 'mul') {
      var g = 2 + rnd(Math.max(1, t.mulG - 1));
      var c = 2 + rnd(Math.max(1, t.mulC - 1));
      var gr = []; for (var i = 0; i < g; i++) gr.push(c);
      return { stage: 'mul', a: g, b: c, answer: g * c, groups: gr };
    }
    var n = t.min + rnd(hi - t.min + 1);
    return { stage: 'count', a: n, b: 0, answer: n, groups: [n] };
  }

  function askFor(r) {
    var t = T();
    if (r.stage === 'add') return fmt(t.addAsk, { a: r.a, b: r.b });
    if (r.stage === 'sub') return fmt(t.subAsk, { a: r.a, b: r.b });
    if (r.stage === 'mul') return fmt(t.mulAsk, { g: r.a, c: r.b });
    return t.countAsk || t.count;
  }
  // The narrator already has recordings that fit most of these rounds, in all six
  // languages and all four voices: reuse them instead of falling back to synth.
  //   counting  -> howmany_sheep        add -> math_add_<a>_<b>
  //   subtract  -> math_sub_<a>_<b>     (multiply has no recording yet)
  function askClip(r) {
    if (r.stage === 'count') return 'howmany_sheep';
    if (r.stage === 'add')   return 'math_add_' + r.a + '_' + r.b;
    if (r.stage === 'sub')   return 'math_sub_' + r.a + '_' + r.b;
    if (r.stage === 'mul') return 'ranch_mul';     // numberless "How many all together?"
    return null;
  }

  // Lay the flock out as one cluster per group, so 3 groups of 4 READ as 3 groups.
  function placeGroups(groups) {
    var pts = [], G = groups.length;
    for (var gi = 0; gi < G; gi++) {
      var n = groups[gi];
      var cols = Math.max(1, Math.round(Math.sqrt(n * 1.5)) || 1);
      var rows = Math.ceil(n / cols);
      for (var i = 0; i < n; i++) {
        var r = Math.floor(i / cols), c = i % cols;
        var inRow = Math.min(cols, n - r * cols);
        var lx = (c + 0.5 + (Math.random() - 0.5) * 0.34) / inRow;
        var ly = (r + 0.5 + (Math.random() - 0.5) * 0.28) / rows;
        pts.push({ g: gi, x: (gi + lx) / G, y: ly });
      }
    }
    return pts;
  }

  function startRound() {
    clearTimers();
    qReset();
    var p = progress();
    var r = makeRound(p);
    st = {
      round: r, answer: r.answer, typed: '', phase: 'ask',
      hints: 0, wrong: 0, tier: p.tier, stage: r.stage
    };
    flock.innerHTML = '';
    choiceRow.innerHTML = '';
    choiceRow.classList.remove('on');

    var t = T();
    roundTag.textContent = fmt(t.round, { r: (p.sessionRound || 0) + 1, t: ROUNDS });

    var pts = placeGroups(r.groups);
    var total = pts.length;
    // Addition reads as a story: the first group is already grazing, then the new
    // ones WALK IN one at a time so the child can count them arriving. Subtraction
    // is the same in reverse - the leavers wander off the edge.
    var arriveFrom = (r.stage === 'add') ? r.groups[0] : total;   // index where group B starts
    var departFrom = (r.stage === 'sub') ? total - (r.leaving || 0) : total;
    st.arriving = (r.stage === 'add') ? (r.groups[1] || 0) : 0;
    st.departing = (r.stage === 'sub') ? (r.leaving || 0) : 0;

    for (var i = 0; i < total; i++) {
      var d = document.createElement('div');
      var isArrival = i >= arriveFrom;
      var isDeparture = i >= departFrom;
      d.className = 'sheep' + (isArrival ? ' arrives' : '') + (isDeparture ? ' departs' : '');
      d.setAttribute('aria-hidden', 'true');          // decorative: the answer is typed
      d.style.left = (12 + pts[i].x * 76) + '%';
      d.style.top = (30 + pts[i].y * 52) + '%';
      d.style.setProperty('--s', (0.88 + Math.random() * 0.24).toFixed(3));
      if (isArrival) {
        // stagger by arrival order so 1, 2, 3 or 4 sheep read as separate events
        d.style.setProperty('--d', (700 + (i - arriveFrom) * 620) + 'ms');
        d.style.setProperty('--from', (46 + Math.random() * 14).toFixed(0) + 'vw');
      } else if (isDeparture) {
        d.style.setProperty('--d', (900 + (i - departFrom) * 560) + 'ms');
        d.style.setProperty('--to', (44 + Math.random() * 14).toFixed(0) + 'vw');
      } else {
        d.style.setProperty('--d', (i * 70) + 'ms');
      }
      d.innerHTML = sheepSVG(i);
      flock.appendChild(d);
    }
    mountWalk();                    // swap the stills for the shared walking loop
    // group separators so "4 + 3" and "3 groups of 4" read at a glance
    if (r.groups.length > 1) {
      for (var gi2 = 1; gi2 < r.groups.length; gi2++) {
        var sep = el('div', 'rSep');
        sep.style.left = (12 + (gi2 / r.groups.length) * 76) + '%';
        sep.textContent = r.stage === 'add' ? '+' : '×';
        flock.appendChild(sep);
      }
    }

    buildPad();
    yakoMood('welcome');
    var ask = askFor(r), clip = askClip(r);
    setInstruction(ask);
    // Let the sheep finish arriving (or leaving) before the question is asked, so
    // the child watches the change happen and only then is asked about it.
    var moves = st.arriving + st.departing;
    var wait = reduceMotion ? 0 : (moves ? 700 + moves * 620 + 500 : 0);
    clearTimeout(askTimer);
    askTimer = setTimeout(function () {
      if (!st) return;
      // question asked -> Yako settles into the waiting-to-type idle
      (clip ? qClip(clip, ask) : qSay(ask)).then(function () { yakoMood('idle'); });
      armIdle();
    }, wait);
    updateAnswerBox();
  }

  // ---------------------------------------------------------- typed answer
  function buildPad() {
    choiceRow.innerHTML = '';
    choiceRow.classList.add('on');
    var box = el('div', 'rAnswer');
    box.id = 'rAnswerBox';
    box.setAttribute('aria-live', 'polite');
    choiceRow.appendChild(box);
    var pad = el('div', 'rPad');
    var keys = ['1','2','3','4','5','6','7','8','9','0','back'];
    keys.forEach(function (k) {
      var b = el('button', 'rKey' + (k === 'back' ? ' back' : ''));
      b.type = 'button';
      b.textContent = k === 'back' ? '⌫' : k;
      b.setAttribute('aria-label', k === 'back' ? (T().clearLbl || 'Clear') : numWord(+k));
      b.addEventListener('click', function () { press(k); });
      pad.appendChild(b);
    });
    choiceRow.appendChild(pad);
  }

  function updateAnswerBox() {
    var box = document.getElementById('rAnswerBox');
    if (!box || !st) return;
    var need = String(st.answer).length;
    var shown = st.typed;
    box.textContent = shown || '';
    box.classList.toggle('empty', !shown);
    box.setAttribute('aria-label', shown ? shown : (T().typeIt || 'Type the number'));
    box.dataset.need = String(need);
  }

  function press(k) {
    if (!st || st.phase !== 'ask') return;
    if (k === 'back') { st.typed = st.typed.slice(0, -1); updateAnswerBox(); armIdle(); return; }
    if (!/^[0-9]$/.test(k)) return;
    if (st.typed.length >= String(st.answer).length) st.typed = '';   // start over past the length
    st.typed += k;
    updateAnswerBox();
    armIdle();
    if (st.typed.length === String(st.answer).length) setTimeout(checkAnswer, 220);
  }

  function checkAnswer() {
    if (!st || st.phase !== 'ask') return;
    var box = document.getElementById('rAnswerBox');
    if (+st.typed === st.answer) {
      st.phase = 'done';
      if (box) box.classList.add('right');
      sparkle();
      roundWon();
    } else {
      st.wrong++;
      if (box) box.classList.add('nope');
      var t = T();
      qReset();
      // `tries` lives at the TOP level of the strings file, not inside `ranch`, and T()
      // merges only the ranch sub-object — so t.tries was undefined in all six languages
      // and this always picked try_1. Read the top-level array the way i18n exposes it.
      var LL = (I() && I().L) ? I().L() : null;
      var tries = (LL && LL.tries) || [];
      var ti = 1 + rnd(Math.max(1, Math.min(8, tries.length)));   // try_1..try_8 are recorded
      // Fall back to the try line, never to t.hint — hint says "Tap this sheep!", which is
      // the wrong instruction for an answer the child types on the number pad.
      qClip('try_' + ti, tries[ti - 1] || t.again || '');
      // Yako reacts to the child: a gentle "that's OK" sway, then back to waiting.
      yakoMood('sorry');
      setTimeout(function () {
        if (!st) return;
        st.typed = '';
        updateAnswerBox();
        if (box) box.classList.remove('nope');
        yakoMood('idle');
      }, 700);
      if (st.wrong >= 2) revealHelp();
      armIdle();
    }
  }

  // After repeated difficulty, demonstrate: count the flock aloud one by one.
  function revealHelp() {
    if (!st) return;
    var kids = flock.querySelectorAll('.sheep:not(.departs)');   // never count the ones that walked off
    qReset();
    for (var i = 0; i < kids.length && i < 20; i++) {
      (function (node, n) {
        qClip('numword_' + n, numWord(n)).then(function () {
          if (!st) return;
          node.classList.add('ping');
          setTimeout(function () { node.classList.remove('ping'); }, 500);
        });
      })(kids[i], i + 1);
    }
  }

  function roundWon() {
    clearTimers();
    st.phase = 'done';
    var t = T(), p = progress();
    p.rounds++;
    p.sessionRound = (p.sessionRound || 0) + 1;
    p.hints += st.hints;
    p.lastN = st.answer;
    // Gentle adaptation, inside the parent-chosen tier only.
    if (st.hints === 0 && st.wrong === 0) p.span = Math.min(TIERS[p.tier].max, p.span + 1);
    else if (st.hints >= 2 || st.wrong >= 2) p.span = Math.max(TIERS[p.tier].min + 1, p.span - 1);
    p.updated = Date.now();
    save(p);

    yakoMood('cheer');
    sparkle();
    setInstruction(t.nice);
    qClip('ranch_nice', t.nice).then(function () {
      if (!st) return;
      if (p.sessionRound >= ROUNDS) endSession();
      else setTimeout(function () { if (st) startRound(); }, 450);
    });
  }

  function endSession() {
    clearTimers();
    var t = T(), p = progress();
    p.sessionRound = 0;
    p.sessions++;
    save(p);
    st = null;
    flock.innerHTML = '';
    choiceRow.innerHTML = '';
    choiceRow.classList.add('on');
    yakoMood('welcome');
    setInstruction(t.goodbye);
    qClip('ranch_goodbye', t.goodbye);
    [[t.again, function () { p.sessionRound = 0; save(p); st = {}; startRound(); }],
     [t.explore, function () { close('explore'); }],
     [t.finish, function () { close(); }]
    ].forEach(function (pair) {
      var b = el('button', 'rBig');
      b.type = 'button';
      b.textContent = pair[0];
      b.addEventListener('click', pair[1]);
      choiceRow.appendChild(b);
    });
  }

  // ----------------------------------------------------------------- hints
  function armIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(hint, 9000);
  }
  function hint() {
    if (!st || st.phase === 'done') return;
    var t = T();
    st.hints++;
    if (st.phase === 'ask') {
      // First nudge re-reads the question and Yako points at the flock; a second
      // nudge stops asking and demonstrates, counting the sheep out loud.
      yakoMood('point');
      qReset();
      if (st.hints >= 2) revealHelp();
      else { var c = askClip(st.round); var a2 = askFor(st.round); if (c) qClip(c, a2); else qSay(a2); }
    }
    armIdle();
  }

  function sparkle() {
    if (reduceMotion) return;
    for (var i = 0; i < 10; i++) {
      var s = el('span', 'rSpark');
      s.style.left = (20 + Math.random() * 60) + '%';
      s.style.top = (30 + Math.random() * 40) + '%';
      s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      s.style.setProperty('--dy', (-40 - Math.random() * 90) + 'px');
      s.style.setProperty('--d', (i * 45) + 'ms');
      s.textContent = (i % 2) ? '⭐' : '🐚';
      stage.appendChild(s);
      (function (node) { setTimeout(function () { node.remove(); }, 1400); })(s);
    }
  }


  // ------------------------------------------------------- transparent dance
  // No generated video can carry an alpha channel, and this ffmpeg build cannot
  // encode VP9 alpha either. So the clip is "alpha-packed": the colour image on
  // top, its own matte underneath, recombined here into a canvas. Plain H.264,
  // works in every browser. The 4-pose sprite stays visible underneath and is
  // what you see if any of this fails.
  var danceCv = null, danceVid = null, danceRaf = null, danceOff = null;

  function mountDance(host) {
    if (reduceMotion) return;                       // honour the OS setting: sprite only
    var v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('playsinline', ''); v.setAttribute('muted', '');
    v.preload = 'auto'; v.src = 'video/dance.mp4';
    var cv = document.createElement('canvas');
    cv.className = 'rDance';
    cv.setAttribute('aria-hidden', 'true');
    var ctx = cv.getContext('2d', { willReadFrequently: true });
    var off = document.createElement('canvas');
    var octx = off.getContext('2d', { willReadFrequently: true });
    danceCv = cv; danceVid = v; danceOff = off;

    function fail() { try { cv.remove(); } catch (e) {} danceCv = null; stopDance(); }
    v.addEventListener('error', fail);

    v.addEventListener('loadeddata', function () {
      var w = v.videoWidth, h = v.videoHeight / 2;
      if (!w || !h) { fail(); return; }
      // Render at half the source size: it displays at ~100-210 CSS px, and the
      // per-frame pixel work scales with area.
      var cw = Math.round(w / 2), ch = Math.round(h / 2);
      cv.width = cw; cv.height = ch; off.width = cw; off.height = ch;
      host.appendChild(cv);
      host.classList.add('hasDance');
      var play = v.play();
      if (play && play.catch) play.catch(fail);
      tick();

      function frame() {
        if (!danceCv) return;
        octx.clearRect(0, 0, cw, ch);
        octx.drawImage(v, 0, h, w, h, 0, 0, cw, ch);        // matte half
        var mat = octx.getImageData(0, 0, cw, ch);
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(v, 0, 0, w, h, 0, 0, cw, ch);          // colour half
        var col = ctx.getImageData(0, 0, cw, ch);
        var c = col.data, m = mat.data;
        for (var i = 0; i < c.length; i += 4) c[i + 3] = m[i];   // luminance -> alpha
        ctx.putImageData(col, 0, 0);
      }
      danceTick = tick;
      function tick() {
        if (!danceCv) return;
        frame();
        // one callback per decoded video frame where supported; rAF otherwise
        if (v.requestVideoFrameCallback) danceRaf = v.requestVideoFrameCallback(tick);
        else danceRaf = requestAnimationFrame(tick);
      }
    });
  }

  // ---- shared walking-sheep loop -------------------------------------------------
  // video/sheep_walk.mp4 is ALPHA-PACKED: colour on the top half, matte on the bottom
  // (generated video has no alpha channel). One <video> per sheep would mean one
  // hardware decode per sheep — ten at the confident tier, which stalls a phone. So we
  // decode ONCE, composite ONCE into an offscreen RGBA canvas, and then blit that into
  // every sheep on screen. Cost per frame is 1 decode + 1 composite + N cheap drawImage
  // calls. If anything fails the painted stills underneath simply stay visible.
  var walkVid = null, walkOff = null, walkOctx = null, walkMat = null, walkMctx = null,
      walkRaf = null, walkOn = false;
  var danceTick = null;      // set by mountDance so resumeDance can restart the real loop

  function mountWalk() {
    if (reduceMotion) return;                 // honour the OS setting: stills only
    if (walkOn) { paintWalkTargets(); return; }
    walkOn = true;
    var v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('playsinline', ''); v.setAttribute('muted', '');
    v.preload = 'auto'; v.src = 'video/sheep_walk.mp4';
    walkVid = v;
    v.addEventListener('error', function () { walkOn = false; walkVid = null; });
    v.addEventListener('loadeddata', function () {
      var w = v.videoWidth, h = v.videoHeight / 2;
      if (!w || !h) { walkOn = false; walkVid = null; return; }
      walkOff = document.createElement('canvas'); walkOff.width = w; walkOff.height = h;
      walkOctx = walkOff.getContext('2d', { willReadFrequently: true });
      walkMat = document.createElement('canvas'); walkMat.width = w; walkMat.height = h;
      walkMctx = walkMat.getContext('2d', { willReadFrequently: true });
      var pl = v.play(); if (pl && pl.catch) pl.catch(function () { walkOn = false; });
      paintWalkTargets();
      walkTick();
    });
  }

  // give every sheep its own canvas, sized to the source frame
  function paintWalkTargets() {
    if (!walkOff || !flock) return;
    var arts = flock.querySelectorAll('.shArt');
    for (var i = 0; i < arts.length; i++) {
      if (arts[i].querySelector('canvas')) continue;
      var c = document.createElement('canvas');
      c.width = walkOff.width; c.height = walkOff.height;
      c.className = 'shWalk';
      arts[i].appendChild(c);
      arts[i].classList.add('hasWalk');
    }
  }

  function walkFrame() {
    if (!walkVid || !walkOff) return;
    var w = walkOff.width, h = walkOff.height;
    walkMctx.clearRect(0, 0, w, h);
    walkMctx.drawImage(walkVid, 0, h, w, h, 0, 0, w, h);      // matte half
    var mat = walkMctx.getImageData(0, 0, w, h);
    walkOctx.clearRect(0, 0, w, h);
    walkOctx.drawImage(walkVid, 0, 0, w, h, 0, 0, w, h);      // colour half
    var col = walkOctx.getImageData(0, 0, w, h);
    var c = col.data, m = mat.data;
    for (var i = 0; i < c.length; i += 4) c[i + 3] = m[i];    // luminance -> alpha
    walkOctx.putImageData(col, 0, 0);
    if (!flock) return;
    var cvs = flock.querySelectorAll('canvas.shWalk');
    for (var j = 0; j < cvs.length; j++) {                    // one composite, N blits
      var cx = cvs[j].getContext('2d');
      cx.clearRect(0, 0, w, h);
      cx.drawImage(walkOff, 0, 0);
    }
  }

  function walkTick() {
    if (!walkOn || !walkVid) return;
    walkFrame();
    if (walkVid.requestVideoFrameCallback) walkRaf = walkVid.requestVideoFrameCallback(walkTick);
    else walkRaf = requestAnimationFrame(walkTick);
  }

  function stopWalk() {
    walkOn = false;
    if (walkRaf != null && walkVid) {
      if (walkVid.cancelVideoFrameCallback) { try { walkVid.cancelVideoFrameCallback(walkRaf); } catch (e) {} }
      else cancelAnimationFrame(walkRaf);
    }
    walkRaf = null;
    if (walkVid) { try { walkVid.pause(); } catch (e) {} }
  }

  function stopDance() {
    if (danceRaf != null) {
      if (danceVid && danceVid.cancelVideoFrameCallback) { try { danceVid.cancelVideoFrameCallback(danceRaf); } catch (e) {} }
      else cancelAnimationFrame(danceRaf);
      danceRaf = null;
    }
    if (danceVid) { try { danceVid.pause(); } catch (e) {} }
  }
  // resumeDance() used to re-register the frame callback WITHOUT ever drawing, so the
  // dance never came back after a close or a tab switch. It now restarts the real tick.
  function resumeDance() {
    if (!danceCv || !danceVid || danceRaf != null) return;
    var p = danceVid.play(); if (p && p.catch) p.catch(function () {});
    if (typeof danceTick === 'function') danceTick();
  }
  function resumeWalk() {
    if (!walkVid || walkRaf != null) return;
    walkOn = true;
    var p = walkVid.play(); if (p && p.catch) p.catch(function () {});
    walkTick();
  }

  // ------------------------------------------------------------ open/close
  var onLeave = null;
  function open(opts) {
    opts = opts || {};
    if (!root) build();
    onLeave = opts.onLeave || null;
    var p = progress();
    if (opts.tier && TIERS[opts.tier]) { p.tier = opts.tier; }
    p.sessionRound = 0;
    save(p);
    root.hidden = false;
    root.dir = isRTL() ? 'rtl' : 'ltr';
    setTimeout(syncBarHeight, 60);
    window.addEventListener('resize', syncBarHeight);
    document.body.classList.add('ranchOpen');
    document.body.classList.add('playing');       // shared sound + music player
    try { if (A()) A().ensureAudio(); } catch (e) {}
    st = {};
    startRound();
    setTimeout(function () { var f = root.querySelector('.sheep'); if (f) f.focus(); }, 420);
  }
  function close(reason) {
    clearTimers();
    qReset();
    stopDance();
    stopWalk();
    st = null;
    if (root) root.hidden = true;
    window.removeEventListener('resize', syncBarHeight);
    document.body.classList.remove('ranchOpen');
    document.body.classList.remove('playing');
    var cb = onLeave; onLeave = null;
    if (cb) { try { cb(reason || 'home'); } catch (e) {} }
  }

  // Leaving the tab must cancel pending audio and timers, not keep narrating.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && root && !root.hidden) { clearTimers(); qReset(); stopDance(); stopWalk(); }
    else if (!document.hidden && root && !root.hidden && st) { armIdle(); resumeDance(); resumeWalk(); }
  });
  document.addEventListener('keydown', function (e) {
    if (!root || root.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (!st || st.phase !== 'ask') return;
    if (/^[0-9]$/.test(e.key)) { e.preventDefault(); press(e.key); return; }
    if (e.key === 'Backspace') { e.preventDefault(); press('back'); return; }
    if (e.key === 'Enter') {
      // Enter checks early — useful when the answer has fewer digits than typed.
      e.preventDefault();
      if (st.typed) checkAnswer();
    }
  });

  YAKO.ranch = {
    open: open,
    close: close,
    tiers: TIERS,
    progress: progress,
    setTier: function (t) { if (TIERS[t]) { var p = progress(); p.tier = t; save(p); } },
    hasProgress: function () { var p = load(); return !!(p && p.rounds); }
  };
})();
