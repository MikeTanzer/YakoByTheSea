// Yako by the Sea — optional cloud layer (Firebase Auth + Firestore).
//
// GUARDED: if data/firebase.js has no apiKey, this module does NOTHING — the game
// runs exactly as before, saving progress in localStorage on the device only.
//
// When configured, it adds:
//   • Google / Facebook sign-in (popup)
//   • Cross-device progress: the child's stars + per-lesson stats (count/first/best/last)
//     are merged with the cloud on sign-in and pushed back after each level.
//
// It talks to the game through a tiny bridge (window.YAKO_GAME) and a DOM event
// ('yako:progress') the game fires whenever stats change — no tight coupling.
window.YAKO_CLOUD = (function () {
  var FB_VER = '10.12.5';
  var cfg = window.YAKO_FIREBASE || {};
  var enabled = !!(cfg.apiKey && cfg.apiKey.length > 20);
  var auth = null, db = null, user = null, ready = false;
  var listeners = [];
  var pushTimer = null;

  // Validation at the cloud↔local boundary: only finite, sane numbers and short
  // printable names ever cross it (a tampered Firestore doc must not be able to
  // poison localStorage or the UI).
  var MAX_SECONDS = 86400, MAX_COUNT = 1000000;
  function num(v) { v = parseFloat(v); return (isNaN(v) || !isFinite(v) || v < 0) ? null : v; }
  function cleanTime(v) { v = num(v); return v == null ? null : Math.min(v, MAX_SECONDS); }
  function cleanCount(v) { v = num(v); return v == null ? null : Math.min(Math.round(v), MAX_COUNT); }
  function cleanName(s) { return String(s || '').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, 20); }
  function cleanMode(m) { return /^[a-z]{1,24}$/.test(m) ? m : null; }
  function on(fn) { listeners.push(fn); }
  function emit() { listeners.forEach(function (fn) { try { fn(user); } catch (e) {} }); }

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.async = true; s.onload = res; s.onerror = function () { rej(new Error('load ' + src)); };
      document.head.appendChild(s);
    });
  }

  // ---- Read every yako_* stat out of localStorage into a plain object ----
  function snapshot() {
    var modes = {};
    function slot(m) { return (modes[m] = modes[m] || {}); }
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i), mm;
        if ((mm = /^yako_count_(.+)$/.exec(k))) slot(mm[1]).count = num(localStorage.getItem(k));
        else if ((mm = /^yako_first_(.+)$/.exec(k))) slot(mm[1]).first = num(localStorage.getItem(k));
        else if ((mm = /^yako_best_(.+)$/.exec(k))) slot(mm[1]).best = num(localStorage.getItem(k));
        else if ((mm = /^yako_last_(.+)$/.exec(k))) slot(mm[1]).last = num(localStorage.getItem(k));
      }
    } catch (e) {}
    var name = '', points = 0;
    try { name = localStorage.getItem('kbfun_name') || ''; points = num(localStorage.getItem('yako_points')) || 0; } catch (e) {}
    return { name: name, points: points, modes: modes };
  }

  // ---- Best-of merge: never lose a record, never inflate a play count ----
  // Everything is passed through the clean* validators here, so whatever comes
  // back from Firestore is clamped before it can reach localStorage or the UI.
  function merge(local, cloud) {
    local = local || { modes: {} }; cloud = cloud || { modes: {} };
    var out = { modes: {} };
    out.points = cleanCount(Math.max(local.points || 0, cloud.points || 0)) || 0;
    out.name = cleanName(local.name || cloud.name || '');
    var keys = {}; Object.keys(local.modes || {}).forEach(function (m) { keys[m] = 1; }); Object.keys(cloud.modes || {}).forEach(function (m) { keys[m] = 1; });
    Object.keys(keys).slice(0, 200).forEach(function (m) {   // cap: a tampered doc can't spam thousands of keys
      if (!cleanMode(m)) return;
      var l = (local.modes || {})[m] || {}, c = (cloud.modes || {})[m] || {};
      var o = {};
      o.count = cleanCount(Math.max(l.count || 0, c.count || 0));     // max, not sum → no double count across syncs
      o.best = cleanTime(minDef(l.best, c.best));                     // fastest ever
      o.first = cleanTime(minDef(l.first, c.first));                  // earliest baseline (min = the true first attempt)
      o.last = cleanTime((l.count || 0) >= (c.count || 0) ? (l.last != null ? l.last : c.last) : (c.last != null ? c.last : l.last));
      out.modes[m] = o;
    });
    return out;
  }
  function minDef(a, b) { if (a == null) return b == null ? null : b; if (b == null) return a; return Math.min(a, b); }

  function applyLocal(data) {
    try {
      if (data.points != null) localStorage.setItem('yako_points', String(data.points));
      if (data.name && !(localStorage.getItem('kbfun_name') || '')) localStorage.setItem('kbfun_name', data.name);
      var modes = data.modes || {};
      Object.keys(modes).forEach(function (m) {
        if (!cleanMode(m)) return;   // defense in depth — only lesson-shaped keys reach localStorage
        var o = modes[m] || {};
        if (o.count != null) localStorage.setItem('yako_count_' + m, String(o.count));
        if (o.best != null) localStorage.setItem('yako_best_' + m, String(o.best));
        if (o.first != null) localStorage.setItem('yako_first_' + m, String(o.first));
        if (o.last != null) localStorage.setItem('yako_last_' + m, String(o.last));
      });
    } catch (e) {}
  }

  function docRef() { return user && db ? db.collection('progress').doc(user.uid) : null; }

  function pull() {
    var ref = docRef(); if (!ref) return Promise.resolve();
    return ref.get().then(function (snap) {
      var cloud = snap.exists ? snap.data() : null;
      var merged = merge(snapshot(), cloud);
      applyLocal(merged);
      if (window.YAKO_GAME && window.YAKO_GAME.reloadProgress) window.YAKO_GAME.reloadProgress();
      return ref.set(merged, { merge: true });   // write the merged result straight back
    }).catch(function () {});
  }

  function push() {
    var ref = docRef(); if (!ref) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(function () {
      try { ref.set(snapshot(), { merge: true }); } catch (e) {}
    }, 1500);   // debounce — a burst of stat writes becomes one round-trip
  }

  function signIn(which) {
    if (!ready || !auth) return Promise.reject(new Error('cloud not ready'));
    var provider = which === 'facebook'
      ? new firebase.auth.FacebookAuthProvider()
      : new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  }
  function signOut() { return (auth ? auth.signOut() : Promise.resolve()); }

  function init() {
    if (!enabled) return Promise.resolve(false);
    var base = 'https://www.gstatic.com/firebasejs/' + FB_VER + '/';
    return loadScript(base + 'firebase-app-compat.js')
      .then(function () { return loadScript(base + 'firebase-auth-compat.js'); })
      .then(function () { return loadScript(base + 'firebase-firestore-compat.js'); })
      .then(function () {
        firebase.initializeApp(cfg);
        auth = firebase.auth(); db = firebase.firestore();
        ready = true;
        auth.onAuthStateChanged(function (u) {
          user = u || null;
          emit();
          if (user) pull();
        });
        // Push whenever the game reports a stat change.
        document.addEventListener('yako:progress', push);
        return true;
      })
      .catch(function (e) { ready = false; return false; });
  }

  return {
    enabled: enabled,
    isReady: function () { return ready; },
    currentUser: function () { return user; },
    init: init, onChange: on, signIn: signIn, signOut: signOut, push: push
  };
})();
