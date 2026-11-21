# Little Word Garden 🌱

English for little ones (4+), made for iPad (web app, add to Home Screen).
Miss Bloom, a flower-fairy teacher, guides the child through 12 short lessons on a garden map.

## Lessons (`lessons.js`)
24 lessons following the topic order of the *English for Everyone Junior* beginner course
(own pictures and wording, adapted for age 4: 4 words + 1 sentence pattern each):
1 Hello, friends · 2 My school things · 3 Colors · 4 Numbers 1–5 · 5 At the zoo · 6 My family ·
7 My toys · 8 Add it up (+) · 9 Feelings · 10 My pets · 11 My body · 12 In the garden ·
13 In town · 14 My home · 15 Take away (−) · 16 On the farm · 17 Yummy fruit · 18 Vegetables ·
19 At the toy shop · 20 My clothes · 21 At the beach · 22 Lunchtime · 23 Numbers 6–10 · 24 Good night

Every lesson (about 5–6 minutes) has the same 5 steps:
1. **Look & point** – a picture scene with numbered things; Miss Bloom says the sentence pattern
   ("What's that? It's a lion! Roar!"), the child taps each one
2. **Find** – "Where is the lion? Can you find it?" tap the right card (2 words from the last lesson come back)
3. **Catch** – tap the right picture flying in the sky
4. **Say it** – "Can you say lion?" (microphone optional)
5. **Sticker** – 1–3 stars; the caterpillar grows, every 4 new lessons it becomes a butterfly on the map

No "wrong" screen: a wrong tap wiggles, Miss Bloom says "Let's try again!"; after 2 tries the answer glows.
Tap Miss Bloom to hear the question again. The map has 4 pages of 6 lessons (arrows left/right).

**Parents**
- Press and hold a locked lesson for 2 seconds to open it.
- Mic button (map, top-left): speaking practice on/off.
- Speaker button: try Miss Bloom's voices one by one; the app remembers the choice.
- For the softest voice on iPad: Settings → Accessibility → Spoken Content → Voices → English →
  download **Ava (Enhanced/Premium)** or **Samantha (Enhanced)**, then pick it with the speaker button.

## Add a lesson
In `lessons.js`: add the words to `WORDS` (picture from `ART.item(...)`), then one line in `LESSONS`
with a sentence pattern, e.g. `intro: "It's {a}. {sound}"` and a `scene`.
Maths lessons use `type: 'math'`, `op: '+'` or `'-'`, a `thing` to count, and `sums` (answers 1–5).

## Files
- `index.html` – lesson engine, map, games
- `lessons.js` – words + lesson list (edit this)
- `art.js` – Miss Bloom, insects, garden, sky (inline SVG)
- `art-items.js` – word pictures: fruit, pets, farm, toys, vehicles, sky, counting groups, numerals
- `art-more.js` – people, feelings, body, school, zoo, home, vegetables, clothes, beach, food + scene backgrounds
- `manifest.webmanifest`, `sw.js`, `icons/` – install as an app, works offline

## Run locally
```
python -m http.server 5200
```
Open http://localhost:5200

## iPad
Open the GitHub Pages link in Safari → Share → **Add to Home Screen**. Turn off silent mode so Miss Bloom can talk.

## Miss Bloom's voice (`voice/`)
Every phrase Miss Bloom says is a pre-made MP3 clip (natural Kokoro voice `af_heart`, free and offline), named by a hash of the text.
If a phrase has no clip, the device voice reads that line instead (the speaker button on the map switches between "Miss Bloom (tự nhiên)" and device voices).

After adding or changing words/lessons, remake the clips (only new phrases are generated):
1. Open the app in Chrome, console: `copy(JSON.stringify(__lwg.allLines()))`, paste into `../voice-tools/lines.json`
2. `cd ../voice-tools` then `.venv\Scripts\python make_voice.py build lines.json ..\kids-english-garden\voice`
3. Bump the cache name in `sw.js`, commit `voice/`.
