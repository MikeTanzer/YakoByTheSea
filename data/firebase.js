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
// 5. In Build → Firestore Database: create a database, then paste these rules
//    (Rules tab) — each signed-in user can only touch their own progress doc,
//    and the doc must be progress-shaped (no using the DB as free storage):
//
//      rules_version = '2';
//      service cloud.firestore {
//        match /databases/{database}/documents {
//          match /progress/{uid} {
//            allow read: if request.auth != null && request.auth.uid == uid;
//            allow write: if request.auth != null && request.auth.uid == uid
//              && request.resource.data.keys().hasOnly(['name', 'points', 'modes'])
//              && request.resource.data.name is string
//              && request.resource.data.name.size() <= 40
//              && request.resource.data.points is number
//              && request.resource.data.modes is map
//              && request.resource.data.modes.size() <= 200;
//          }
//        }
//      }
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
