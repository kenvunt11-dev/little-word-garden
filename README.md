# Little Word Garden 🌱

English for little ones (4+), made for iPad (web app, add to Home Screen).
Miss Bloom, a flower-fairy teacher, guides the child through 12 short lessons on a garden map.

## Lessons (`lessons.js`)
1 Garden friends · 2 Colors · 3 Yummy fruit · 4 Numbers 1–5 · 5 My pets · 6 Little bugs ·
7 Add it up (+) · 8 On the farm · 9 Toy box · 10 Take away (−) · 11 Things that go · 12 In the sky

Every lesson (about 5 minutes) has the same 5 steps:
1. **Learn** – meet each word (tap to hear it)
2. **Find** – "Where is the apple?" tap the right card (2 words from the last lesson come back for review)
3. **Catch** – tap the right picture flying in the sky
4. **Say it** – the child says the word (microphone optional)
5. **Sticker** – 1–3 stars, the caterpillar grows; every 4 new lessons it becomes a butterfly on the map

No "wrong" screen: a wrong tap just wiggles and Miss Bloom asks again; after 2 tries the answer glows.
Tap Miss Bloom to hear the question again. Lessons unlock one by one.
**Parents:** press and hold a locked lesson for 2 seconds to open it. The mic button (map, top-left) turns speaking practice on/off.

## Add a lesson
In `lessons.js`: add the words to `WORDS` (picture from `ART.item(...)`), then one line in `LESSONS`.
Maths lessons use `type: 'math'`, `op: '+'` or `'-'`, a `thing` to count, and `sums` (answers 1–5).

## Files
- `index.html` – lesson engine, map, games
- `lessons.js` – words + lesson list (edit this)
- `art.js` – Miss Bloom, insects, garden, sky (inline SVG)
- `art-items.js` – word pictures: fruit, pets, farm, toys, vehicles, sky, counting groups, numerals
- `manifest.webmanifest`, `sw.js`, `icons/` – install as an app, works offline

## Run locally
```
python -m http.server 5200
```
Open http://localhost:5200

## iPad
Open the GitHub Pages link in Safari → Share → **Add to Home Screen**. Turn off silent mode so Miss Bloom can talk.
