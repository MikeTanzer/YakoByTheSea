// Yako by the Sea — Firebase config for cloud sign-in + cross-device progress.
//
// Until you paste a real config here, cloud sign-in stays OFF and the game saves
// progress on-device only (the Google/Facebook buttons show a "coming soon" note).
// The moment apiKey is filled in, the profile menu switches to real sign-in.
//
// ── HOW TO FILL THIS IN ────────────────────────────────────────────────────────
// 1. Create a free project at https://console.firebase.google.com
// 2. Add a Web app (</> icon). Firebase shows a `firebaseConfig = {...}` snippet.
// 3. Copy those values into the object below.
// 4. In Build → Authentication → Sign-in method: enable Google, and (optionally)
//    Facebook (Facebook also needs a Facebook app — see the checklist Claude gave you).
// 5. In Build → Firestore Database: create a database (production mode is fine;
//    Claude will give you the security rule to paste).
// 6. In Authentication → Settings → Authorized domains: add
//    `miketanzer.github.io` (GitHub Pages) — localhost is already allowed for testing.
//
// SAFE TO COMMIT: the Firebase web apiKey is a public identifier, not a secret.
// Access is controlled by Firestore security rules + the authorized-domains list.
window.YAKO_FIREBASE = {
  apiKey: '',
  authDomain: '',       // e.g. yako-by-the-sea.firebaseapp.com
  projectId: '',        // e.g. yako-by-the-sea
  appId: ''             // e.g. 1:1234567890:web:abcdef...
};
