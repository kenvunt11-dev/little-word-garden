# Little Word Garden 🌱

English for little ones (4+). Miss Bloom, a flower-fairy teacher, talks with the child in a garden full of insects.

- Tap an insect → hear its name
- **Nói chuyện** → Miss Bloom asks "What's this?", the child answers by voice (or taps a picture card)
- **Bắt bướm** → "Catch the blue butterfly!"
- Correct answers grow flowers and turn the caterpillar into a butterfly

Uses only free browser features (speechSynthesis + SpeechRecognition). No ads, no tracking, progress stays on the device.

## Files
- `index.html` – game logic
- `art.js` – all illustrations (inline SVG, `window.ART`)
- `manifest.webmanifest`, `sw.js`, `icons/` – install as an app on iPad / phone

## Run locally
```
python -m http.server 5200
```
Open http://localhost:5200 in Chrome (allow the microphone).

## iPad
Open the GitHub Pages link in Safari → Share → **Add to Home Screen**.
