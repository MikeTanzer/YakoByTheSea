# Yako by the Sea 🐚⭐

A painted-storybook keyboard game for young kids. Yako and his puppy live in a
seaside village; children find letters and numbers, spell words, build numbers,
learn phonics, count sea creatures, and do their first addition and subtraction —
all with a warm narrator voice that teaches and cheers them on in **English,
French, or Spanish**, spoken by their choice of **Mom, Dad, Grandpa, or Grandma**.

## ▶ Play it now

**https://miketanzer.github.io/YakoByTheSea/** — live on GitHub Pages
(auto-deploys on every push to `main`).

Or run it locally — no build step, it's plain HTML/CSS/JS:

```bash
node tools/serve.js        # http://localhost:8765
```

(Any static file server works; a server is required for the voice clips and
videos — opening the file directly with `file://` won't play them.)

On a phone on the same Wi-Fi, open `http://<your-computer-ip>:8765` and use
"Add to Home Screen" for a full-screen app feel.

## Two ways to play

- **START** — the campaign: all 13 lessons in order, easiest to hardest,
  auto-advancing after each completed level. Progress is saved, and a child
  who makes more than 2 mistakes gently repeats the lesson with an
  encouraging word before moving on.
- **Choose a lesson** — practice any single lesson; the win card offers
  "keep playing" or "next lesson".

## The 13 lessons

Numbers · Letters · Letters & Numbers · Shapes · Colors · Animals ·
Letter Sounds · **Listen & Find** (hear the letter, see only a picture clue) ·
How Many? · Spelling · Counting · Add & Subtract — plus free-play **Free Play**.

Levels are 5 stars each; words and numbers grow longer every 3 levels; idle
kids get gentle escalating hints (key cluster → exact key). Every level ends
with spoken coaching: best-time / no-mistakes / getting-faster / take-your-time.

## Structure

```
keyboard-fun.html      the game (markup, styles, game logic)
index.html             GitHub Pages entry point (redirects into the game)
js/i18n.js             language engine — interpolates data/strings.*
js/audio.js            SFX + narrator (recorded clips w/ speech-synth fallback)
data/strings.{en,fr,es}.js   every phrase — single source of truth
data/lessons.js        spelling words, word pictures, category items
voice/clips/<lang>/<persona>/*.mp3   4,644 recorded narration clips
                       (387 phrases × EN/FR/ES × Mom/Dad/Grandpa/Grandma)
tools/check-voices.mjs verify the clip library matches the strings data
tools/serve.js         tiny static server (HTTP Range support for video)
ui/, *.png, *.mp4      painted art, animated backgrounds, sprite sheets
```

Voice clips were generated with Higgsfield (ElevenLabs voices: Isabella, Mark,
Brooks, Mabel). After changing any strings, run:

```bash
node tools/check-voices.mjs          # reports missing clips + the exact text each must say
node tools/check-voices.mjs --texts  # dump the full narration script per language
```
