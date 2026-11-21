/* ART CONTRACT (index.html depends on exactly this shape)
 * window.ART = {
 *   css: string                      – extra CSS injected once (animations for teacher/bugs/foliage)
 *   teacher(): svg string             – Miss Bloom. Wrapper div gets classes: .talking .cheer .listening
 *                                       Must contain: .mouth-closed, .mouth-open (CSS shows open while .talking)
 *   bug(kind, color): svg string      – kinds: butterfly, bee, ladybug, snail, caterpillar, dragonfly
 *                                       drawn FACING RIGHT, tight viewBox, own flap/crawl animation via css
 *                                       color only used by butterfly (hex)
 *   foliageBack(): svg string         – full-width bottom layer, behind teacher (preserveAspectRatio slice)
 *   foliageFront(): svg string        – full-width bottom layer, in front of teacher; MUST include an
 *                                       empty <g id="flowerBed"></g> where game appends flowers
 *                                       (flowerBed coords: viewBox 0 0 1000 200, ground ≈ y 120..190)
 *   flower(color): svg <g> string     – one flower, base at (0,0), grows upward ~ 60 units tall
 *   decor(): html string              – absolutely positioned corner leaves (inside a fixed full-screen div)
 *   net(): svg string                 – butterfly net
 *   cocoon(): svg string              – chrysalis for the pet card
 * }
 * Original hand-written SVG art ("warm picture-book" style). No external images, no libraries.
 */
(function () {
  'use strict';
  /* ---------- helpers ---------- */
  let UID = 0;
  const uid = p => 'lw' + p + (++UID);
  const f = n => (+n).toFixed(1);
  const svg = (vb, body, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" ${extra}>${body}</svg>`;
  const hex2rgb = h => { h = String(h || '#9b7be0').replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16) || 0; return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const mix = (h, to, a) => { const c = hex2rgb(h); const t = to === 'w' ? 255 : 0; return '#' + c.map(v => Math.round(v + (t - v) * a).toString(16).padStart(2, '0')).join(''); };
  const light = (h, a) => mix(h, 'w', a), dark = (h, a) => mix(h, 'b', a);
  const rng = seed => { let s = seed % 2147483647 || 1; return () => (s = s * 16807 % 2147483647) / 2147483647; };
  const lin = (id, c1, c2, vert = true) => `<linearGradient id="${id}" x1="0" y1="0" x2="${vert ? 0 : 1}" y2="${vert ? 1 : 0}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`;
  const rad = (id, c1, c2, cx = .35, cy = .3) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r=".75"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>`;
  const star = (cx, cy, R, r) => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r : R; d += (i ? 'L' : 'M') + f(cx + q * Math.cos(a)) + ' ' + f(cy + q * Math.sin(a)); } return d + 'Z'; };
  // glossy cartoon eye: dark iris + two highlights
  const eye = (x, y, r, cls = '') => `<g class="${cls}"><ellipse cx="${x}" cy="${y}" rx="${f(r * .86)}" ry="${r}" fill="#2a1913"/><circle cx="${f(x - r * .3)}" cy="${f(y - r * .38)}" r="${f(r * .36)}" fill="#fff"/><circle cx="${f(x + r * .3)}" cy="${f(y + r * .4)}" r="${f(r * .15)}" fill="#fff" opacity=".85"/></g>`;
  const blush = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#ff8a9e" opacity=".55"/>`;
  const smile = (x, y, w, col = '#6b2b22', sw = 1.6) => `<path d="M${f(x - w)} ${y}Q${x} ${f(y + w * .9)} ${f(x + w)} ${y}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>`;
  const leaf = (x, y, a, l, c, rib) => { const w = l * .32; return `<path d="M0 0Q${f(w)} ${f(-l * .45)} 0 ${f(-l)}Q${f(-w)} ${f(-l * .45)} 0 0Z" fill="${c}" transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})"/>` + (rib ? `<path d="M0 -1L0 ${f(-l * .8)}" stroke="${rib}" stroke-width=".8" opacity=".6" transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})"/>` : ''); };

  /* ---------- CSS ---------- */
  const css = `
.mouth-open{display:none}
.talking .mouth-open{display:inline}
.talking .mouth-closed{display:none}
.mb-eye{transform-box:fill-box;transform-origin:center;animation:lwBlink 4.6s infinite}
.mb-eye.e2{animation-delay:.02s}
@keyframes lwBlink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.08)}}
.talking .mouth-open{transform-box:fill-box;transform-origin:50% 0;animation:lwTalk .26s ease-in-out infinite alternate}
@keyframes lwTalk{from{transform:scaleY(1)}to{transform:scaleY(.4)}}
.mb-wing{transform-box:fill-box;transform-origin:100% 70%;animation:lwWing 1.6s ease-in-out infinite alternate}
@keyframes lwWing{from{transform:rotate(-3deg) scaleX(1)}to{transform:rotate(7deg) scaleX(.86)}}
.cheer .mb-wing{animation-duration:.25s}
.mb-head{transform-box:view-box;transform-origin:110px 176px;transition:transform .4s ease}
.listening .mb-head{transform:rotate(-7deg)}
.listening .mb-ear{opacity:1}
.mb-ear{opacity:0;transition:opacity .3s}
.mb-arm{transform-box:view-box;transform-origin:134px 200px;transition:transform .3s}
.cheer .mb-arm{animation:lwWave .35s ease-in-out infinite alternate}
@keyframes lwWave{from{transform:rotate(-8deg)}to{transform:rotate(-34deg)}}
.mb-star{transform-box:fill-box;transform-origin:center;animation:lwTwinkle 2.2s ease-in-out infinite}
.cheer .mb-star,.talking .mb-star{animation-duration:.6s}
@keyframes lwTwinkle{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.18) rotate(18deg)}}
.mb-spark{animation:lwSpark 2.2s ease-in-out infinite}
@keyframes lwSpark{0%,100%{opacity:.2}50%{opacity:1}}
.bf-w{transform-box:fill-box;transform-origin:100% 50%;animation:lwFlap .34s ease-in-out infinite alternate}
@keyframes lwFlap{from{transform:scaleX(1)}to{transform:scaleX(.3)}}
.bz-w{transform-box:fill-box;transform-origin:50% 100%;animation:lwBuzz .09s linear infinite alternate}
.bz-w.b{animation-delay:-.045s}
@keyframes lwBuzz{from{transform:rotate(-12deg)}to{transform:rotate(14deg)}}
.df-w{transform-box:fill-box;transform-origin:100% 50%;animation:lwDf .12s linear infinite alternate}
.df-w.b{animation-delay:-.06s}
@keyframes lwDf{from{transform:scaleY(1) rotate(0)}to{transform:scaleY(.35) rotate(6deg)}}
.lb-legs{animation:lwStep .3s steps(2) infinite}
@keyframes lwStep{from{transform:translateX(-1px)}to{transform:translateX(1.5px)}}
.cp-seg{animation:lwBob .7s ease-in-out infinite alternate}
@keyframes lwBob{from{transform:translateY(1.5px)}to{transform:translateY(-3px)}}
.sn-stalk{transform-box:fill-box;transform-origin:50% 100%;animation:lwStalk 1.8s ease-in-out infinite alternate}
.sn-stalk.b{animation-delay:-.9s}
@keyframes lwStalk{from{transform:rotate(-8deg)}to{transform:rotate(10deg)}}
.sn-body{transform-box:fill-box;transform-origin:0 100%;animation:lwSquish 1.8s ease-in-out infinite alternate}
@keyframes lwSquish{from{transform:scaleX(1)}to{transform:scaleX(1.05)}}
.lw-sway{transform-box:fill-box;transform-origin:50% 100%;animation:lwSway 4s ease-in-out infinite alternate}
@keyframes lwSway{from{transform:rotate(-3deg)}to{transform:rotate(3.5deg)}}
.lw-sky{position:absolute;inset:0;background:radial-gradient(ellipse 60% 40% at 78% 8%,rgba(255,255,255,.35),transparent 70%),linear-gradient(180deg,#56b2e3 0%,#78c4eb 42%,#b2e0f3 74%,#dcf1ee 100%)}
.lw-cloud{position:absolute;animation:lwDrift 80s ease-in-out infinite alternate}
.lw-cloud svg{display:block;width:100%;height:auto}
@keyframes lwDrift{from{transform:translateX(-2vw)}to{transform:translateX(5vw)}}
.co-swing{transform-box:fill-box;transform-origin:50% 0;animation:lwSwing 3s ease-in-out infinite alternate}
@keyframes lwSwing{from{transform:rotate(-5deg)}to{transform:rotate(5deg)}}
@media (prefers-reduced-motion:reduce){.lw-sway,.bf-w,.bz-w,.df-w,.cp-seg,.mb-wing,.co-swing,.lw-cloud,.sn-stalk,.sn-body,.lb-legs{animation:none}}
`;

  /* ---------- Miss Bloom ---------- */
  function flowerHead(cx, cy, r, c1, c2) {
    let s = '';
    for (let i = 0; i < 5; i++) {
      const a = i * 72 - 90;
      s += `<ellipse cx="${cx}" cy="${f(cy - r * .62)}" rx="${f(r * .42)}" ry="${f(r * .6)}" fill="${c1}" stroke="${c2}" stroke-width=".8" transform="rotate(${a + 90} ${cx} ${cy})"/>`;
    }
    return s + `<circle cx="${cx}" cy="${cy}" r="${f(r * .3)}" fill="#f6c945"/><circle cx="${f(cx - r * .08)}" cy="${f(cy - r * .1)}" r="${f(r * .1)}" fill="#fff6c9"/>`;
  }
  function teacher() {
    const g = uid('t'), skin = g + 's', hair = g + 'h', dress = g + 'd', wing = g + 'w', st = g + 'st';
    const wingShape = `<g class="mb-wing">
      <path d="M104 196C78 156 30 124 20 148C10 172 48 198 104 202Z" fill="url(#${wing})" stroke="#6fc3d3" stroke-width="1.8"/>
      <path d="M104 204C66 206 38 228 50 246C62 262 92 234 106 210Z" fill="url(#${wing})" stroke="#6fc3d3" stroke-width="1.8"/>
      <path d="M100 197C80 176 56 160 42 156M100 206C84 214 70 226 64 236" stroke="#bfe8ee" stroke-width="1" fill="none"/>
      <circle cx="48" cy="160" r="2" fill="#fff" class="mb-spark"/><circle cx="66" cy="232" r="1.6" fill="#fff" class="mb-spark"/></g>`;
    return svg('0 0 220 300', `<defs>
      ${rad(skin, '#ffe8d4', '#f4c19c', .4, .35)}
      ${lin(hair, '#7a4630', '#4a2a1e')}
      ${lin(dress, '#b9efd8', '#62bf98')}
      ${rad(wing, 'rgba(255,255,255,.95)', 'rgba(140,215,235,.7)', .7, .6)}
      ${rad(st, '#fff7b8', '#f6b92e', .4, .4)}
    </defs>
    ${wingShape}<g transform="translate(220 0) scale(-1 1)">${wingShape}</g>
    <g class="mb-body">
      <path d="M96 262h10v22c0 5-12 5-12 0zM114 262h10v22c0 5-12 5-12 0z" fill="url(#${skin})"/>
      <ellipse cx="99" cy="288" rx="9" ry="5" fill="#f07a9b"/><ellipse cx="121" cy="288" rx="9" ry="5" fill="#f07a9b"/>
      <ellipse cx="97" cy="286" rx="3" ry="1.4" fill="#ffc3d3"/><ellipse cx="119" cy="286" rx="3" ry="1.4" fill="#ffc3d3"/>
      <path d="M90 190C84 216 70 240 62 262Q110 282 158 262C150 240 136 216 130 190Z" fill="url(#${dress})"/>
      <path d="M62 262q8 9 16 3q8 9 16 3q8 9 16 3q8 9 16 3q8 9 16 3q8 9 16 3q-24-10-96-15z" fill="#4fae86"/>
      <path d="M78 236q32 8 64 0" stroke="#e6fff4" stroke-width="2" fill="none" opacity=".6" stroke-dasharray="1 7" stroke-linecap="round"/>
      <path d="M90 208q20 6 40 0l-1 7q-19 5-38 0z" fill="#f58fae"/>
      <path d="M110 211l-9-6v12zM110 211l9-6v12z" fill="#ef6f96"/><circle cx="110" cy="211" r="3" fill="#ffb3c8"/>
      <path d="M92 192q-10-4-10 4q8 8 18 2zM128 192q10-4 10 4q-8 8-18 2zM100 190q10 10 20 0q-4 10-10 10t-10-10z" fill="#e9fff5" stroke="#9ad9bd" stroke-width=".8"/>
      <path d="M92 196Q76 210 78 234" stroke="url(#${dress})" stroke-width="13" stroke-linecap="round" fill="none"/>
      <circle cx="79" cy="238" r="7" fill="url(#${skin})"/>
    </g>
    <g class="mb-arm">
      <path d="M128 196Q146 206 154 214" stroke="url(#${dress})" stroke-width="13" stroke-linecap="round" fill="none"/>
      <path d="M156 216L176 152" stroke="#c9873e" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M156 216L176 152" stroke="#f3c77a" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="157" cy="214" r="7" fill="url(#${skin})"/>
      <g class="mb-star"><path d="${star(177, 146, 14, 6.2)}" fill="url(#${st})" stroke="#e59a1f" stroke-width="1.4" stroke-linejoin="round"/>
      <circle cx="173" cy="144" r="1.4" fill="#5b3a1a"/><circle cx="181" cy="144" r="1.4" fill="#5b3a1a"/>${smile(177, 148.5, 2.4, '#5b3a1a', 1.1)}</g>
      <path d="M196 128l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM158 126l1.4 3.4 3.4 1.4-3.4 1.4-1.4 3.4-1.4-3.4-3.4-1.4 3.4-1.4z" fill="#fff3a6" class="mb-spark"/>
    </g>
    <g class="mb-head">
      <path d="M102 168h16v24h-16z" fill="#f0b993"/>
      <path d="M50 120C46 70 74 52 110 52S174 70 170 120C172 150 166 172 156 182C140 170 80 170 64 182C54 172 48 150 50 120Z" fill="url(#${hair})"/>
      <circle cx="58" cy="66" r="22" fill="url(#${hair})"/><circle cx="162" cy="66" r="22" fill="url(#${hair})"/>
      <path d="M44 60q6-14 20-14M148 54q8-10 22-6" stroke="#a5684a" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
      <ellipse cx="55" cy="126" rx="8" ry="10" fill="#f4bf99"/><ellipse cx="165" cy="126" rx="8" ry="10" fill="#f4bf99"/>
      <ellipse cx="110" cy="124" rx="56" ry="52" fill="url(#${skin})"/>
      <path d="M54 120C52 76 76 62 110 62S168 76 166 120C160 98 150 88 138 82C130 96 112 100 104 86C94 98 76 100 72 88C62 96 56 108 54 120Z" fill="url(#${hair})"/>
      <path d="M78 74q14-8 30-6M122 70q14 0 24 8" stroke="#a5684a" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".6"/>
      <g transform="translate(152 56) rotate(15)">${flowerHead(0, 0, 18, '#ff9fbf', '#ea6f98')}</g>
      <path d="M134 50l-6 4 7 1zM172 70l6 4-7 2z" fill="#7fc88f"/>
      <path d="M76 110q10-6 20-1M124 109q10-5 20 1" stroke="#6a3a28" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      ${eye(87, 128, 12.5, 'mb-eye')}${eye(133, 128, 12.5, 'mb-eye e2')}
      <path d="M74 122l-5-3M75 127l-6 0M146 122l5-3M145 127l6 0" stroke="#2a1913" stroke-width="1.8" stroke-linecap="round"/>
      ${blush(71, 148, 11, 6.5)}${blush(149, 148, 11, 6.5)}
      <ellipse cx="110" cy="144" rx="3.4" ry="2.4" fill="#e79a7d"/><ellipse cx="109" cy="143.2" rx="1.2" ry=".8" fill="#fff" opacity=".7"/>
      <path class="mouth-closed" d="M100 155Q110 165 120 155" stroke="#8a3a2c" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      <g class="mouth-open"><path d="M99 153Q110 156 121 153Q119 170 110 170Q101 170 99 153Z" fill="#9c2f37"/><ellipse cx="110" cy="166" rx="6" ry="3.2" fill="#f07a8c"/><path d="M100 153.5Q110 156 120 153.5" stroke="#fff" stroke-width="1.6" fill="none"/></g>
      <g class="mb-ear"><path d="M176 112q8 8 0 18M182 106q13 13 0 30" stroke="#7bd3bf" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
    </g>`, 'class="lw-teacher" overflow="visible"');
  }

  /* ---------- bugs ---------- */
  const legs = (xs, y, len, col = '#3b2a22') => xs.map(x => `<path d="M${x} ${y}q-1 ${len * .6} -3 ${len}" stroke="${col}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`).join('');
  const antenna = (x1, y1, x2, y2, col = '#3b2a22', ball = col) => `<path d="M${x1} ${y1}Q${f((x1 + x2) / 2 + 3)} ${f((y1 + y2) / 2)} ${x2} ${y2}" stroke="${col}" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="2.4" fill="${ball}"/>`;

  const bugs = {
    butterfly(c) {
      c = c || '#9b7be0';
      const g = uid('bf'), w = g + 'w', b = g + 'b';
      const wing = `<g class="bf-w wL">
        <path d="M-3 -4C-12 -38 -48 -42 -46 -16C-45 0 -24 4 -3 2Z" fill="url(#${w})" stroke="${dark(c, .35)}" stroke-width="1.6"/>
        <path d="M-3 3C-26 4 -38 22 -28 32C-18 40 -6 26 -3 9Z" fill="url(#${w})" stroke="${dark(c, .35)}" stroke-width="1.6"/>
        <ellipse cx="-28" cy="-18" rx="8" ry="6.5" fill="#fff" opacity=".75"/><circle cx="-28" cy="-18" r="3" fill="${dark(c, .2)}" opacity=".7"/>
        <circle cx="-41" cy="-24" r="2.2" fill="#fff" opacity=".85"/><circle cx="-38" cy="-8" r="2" fill="#fff" opacity=".85"/>
        <circle cx="-19" cy="22" r="4.5" fill="${light(c, .65)}"/><circle cx="-27" cy="30" r="1.8" fill="#fff" opacity=".85"/>
        <path d="M-6 -2C-16 -14 -26 -24 -36 -28M-6 4C-14 10 -20 18 -24 26" stroke="${dark(c, .25)}" stroke-width=".8" fill="none" opacity=".5"/></g>`;
      return svg('-50 -44 100 86', `<defs>${rad(w, light(c, .6), c, .7, .5)}${lin(b, '#6b4a3a', '#3e2a20')}</defs>
        ${wing}<g transform="scale(-1 1)">${wing.replace('wL', 'wR')}</g>
        <ellipse cy="10" rx="4.6" ry="18" fill="url(#${b})"/>
        <path d="M-4 4h8M-4.4 10h8.8M-4 16h8" stroke="#8b6a55" stroke-width="1"/>
        ${antenna(-3, -22, -12, -38)}${antenna(3, -22, 12, -38)}
        <circle cy="-14" r="9.5" fill="#6b4a3a"/><circle cx="-2.5" cy="-17" r="3.5" fill="#8d6a55" opacity=".6"/>
        ${eye(-3.6, -14.5, 3)}${eye(3.6, -14.5, 3)}${blush(-6.5, -9, 2.4, 1.4)}${blush(6.5, -9, 2.4, 1.4)}${smile(0, -10, 2.2, '#f3d7c8', 1.2)}`);
    },
    bee() {
      const g = uid('bz'), body = g + 'b', clip = g + 'c', hd = g + 'h';
      return svg('-44 -42 90 76', `<defs>${rad(body, '#ffe38a', '#f2b51f')}${rad(hd, '#ffeb9e', '#f5c22e')}<clipPath id="${clip}"><ellipse cx="-4" cy="6" rx="25" ry="19"/></clipPath></defs>
        ${legs([-12, -2, 8], 22, 7)}
        <path d="M-28 6L-39 8L-28 11Z" fill="#3b2a22"/>
        <ellipse cx="-4" cy="6" rx="25" ry="19" fill="url(#${body})"/>
        <g clip-path="url(#${clip})" fill="#3b2a22"><path d="M-18 -16q-5 22 0 44h7q-5-22 0-44z"/><path d="M-2 -16q-5 22 0 44h7q-5-22 0-44z"/></g>
        <ellipse cx="-10" cy="-4" rx="10" ry="4" fill="#fff" opacity=".35"/>
        <g class="bz-w"><ellipse cx="-10" cy="-18" rx="9" ry="15" fill="#effaff" opacity=".85" stroke="#9fd3e6" stroke-width="1.3" transform="rotate(-24 -10 -18)"/></g>
        <g class="bz-w b"><ellipse cx="2" cy="-19" rx="8" ry="13" fill="#effaff" opacity=".85" stroke="#9fd3e6" stroke-width="1.3" transform="rotate(14 2 -19)"/></g>
        ${antenna(20, -10, 20, -28)}${antenna(26, -10, 33, -25)}
        <circle cx="23" cy="2" r="13.5" fill="url(#${hd})"/>
        ${eye(28, -1, 4.4)}${blush(26, 8, 3.4, 2)}${smile(31.5, 6.5, 2.6)}`);
    },
    ladybug() {
      const g = uid('lb'), sh = g + 's';
      return svg('-38 -34 76 60', `<defs>${rad(sh, '#ff7a63', '#d02a22', .35, .25)}</defs>
        <g class="lb-legs">${legs([-14, -2, 10], 14, 8, '#2b2626')}</g>
        ${antenna(22, -4, 27, -18, '#2b2626')}${antenna(27, -3, 35, -14, '#2b2626')}
        <circle cx="23" cy="6" r="12" fill="#2f2a2a"/>
        <ellipse cx="27.5" cy="3" rx="4.6" ry="5.2" fill="#fff"/><circle cx="29" cy="3.6" r="2.8" fill="#1a1414"/><circle cx="28" cy="2.2" r="1.1" fill="#fff"/>
        ${blush(27, 11, 3, 1.7)}${smile(31, 9.5, 2.2, '#f5c9c9', 1.2)}
        <path d="M-28 15A28 27 0 0 1 28 15Q0 21 -28 15Z" fill="url(#${sh})" stroke="#a81d18" stroke-width="1.2"/>
        <circle cx="-14" cy="0" r="4.6" fill="#2b2626"/><circle cx="2" cy="-7" r="4.6" fill="#2b2626"/><circle cx="14" cy="4" r="4" fill="#2b2626"/><circle cx="-3" cy="8" r="3.4" fill="#2b2626"/><circle cx="-22" cy="10" r="2.6" fill="#2b2626"/>
        <path d="M-16 -6Q-6 -12 6 -12" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>`);
    },
    snail() {
      const g = uid('sn'), sh = g + 's', bd = g + 'b';
      let sp = '';
      for (let i = 0; i <= 60; i++) { const t = i / 60 * Math.PI * 5, r = 17 * (1 - i / 66); sp += (i ? 'L' : 'M') + f(-6 + r * Math.cos(t)) + ' ' + f(-4 + r * Math.sin(t)); }
      return svg('-46 -46 94 76', `<defs>${rad(sh, '#ffc27a', '#d9732e')}${lin(bd, '#fde9c4', '#eec790')}</defs>
        <g class="sn-body"><path d="M-40 24Q-42 17 -30 17L18 17Q28 16 30 2Q32 -12 39 -11Q47 -10 45 4Q43 23 30 26L-34 26Q-40 26 -40 24Z" fill="url(#${bd})" stroke="#d9a868" stroke-width="1.2"/></g>
        <g class="sn-stalk"><path d="M35 -9L31 -28" stroke="#eec790" stroke-width="3.4" stroke-linecap="round"/><circle cx="31" cy="-30" r="4.6" fill="#fff" stroke="#d9a868"/><circle cx="32.5" cy="-30" r="2.6" fill="#2a1913"/><circle cx="31.6" cy="-31.2" r=".9" fill="#fff"/></g>
        <g class="sn-stalk b"><path d="M40 -9L42 -27" stroke="#eec790" stroke-width="3.4" stroke-linecap="round"/><circle cx="42" cy="-29" r="4.6" fill="#fff" stroke="#d9a868"/><circle cx="43.5" cy="-29" r="2.6" fill="#2a1913"/><circle cx="42.6" cy="-30.2" r=".9" fill="#fff"/></g>
        ${blush(37, 3, 3.4, 2)}${smile(41, 1, 2.4)}
        <circle cx="-6" cy="-4" r="21" fill="url(#${sh})" stroke="#b85d24" stroke-width="1.4"/>
        <path d="${sp}" fill="none" stroke="#b85d24" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M-20 -16Q-12 -24 -2 -24" stroke="#fff" stroke-width="2.6" fill="none" opacity=".55" stroke-linecap="round"/>`);
    },
    caterpillar() {
      const g = uid('cp'), s1 = g + 'a', s2 = g + 'b', hd = g + 'h';
      let segs = '';
      for (let i = 0; i < 5; i++) {
        const x = -40 + i * 13;
        segs += `<g class="cp-seg" style="animation-delay:-${f(i * .14)}s"><ellipse cx="${x}" cy="21" rx="2.4" ry="2" fill="#3f6b2a"/><circle cx="${x}" cy="10" r="10.5" fill="url(#${i % 2 ? s2 : s1})"/><circle cx="${x - 3}" cy="5" r="2.6" fill="#fff" opacity=".45"/><circle cx="${x + 2}" cy="14" r="1.6" fill="#f6c945" opacity=".85"/></g>`;
      }
      return svg('-52 -38 102 64', `<defs>${rad(s1, '#c4ec7a', '#79b83a')}${rad(s2, '#b4e36a', '#5fa232')}${rad(hd, '#d4f48e', '#86c443')}</defs>
        ${segs}
        <g class="cp-seg" style="animation-delay:-.7s">
        ${antenna(28, -10, 25, -26, '#4d7a2c', '#f39237')}${antenna(34, -10, 40, -24, '#4d7a2c', '#f39237')}
        <circle cx="31" cy="1" r="14.5" fill="url(#${hd})"/>
        ${eye(36, -1, 4.6)}${blush(34, 7, 3.4, 2)}${smile(40, 5.5, 2.6)}</g>`);
    },
    dragonfly() {
      const g = uid('df'), ab = g + 'a', hd = g + 'h', wg = g + 'w';
      let rings = '';
      for (let i = 0; i < 6; i++) rings += `<path d="M${-44 + i * 8} -1.6v7" stroke="#1d7f8f" stroke-width="1" opacity=".6"/>`;
      const W = (cx, cy, rx, ry, a, cls) => `<g class="df-w ${cls}"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${wg})" stroke="#8fd0e6" stroke-width="1.1" transform="rotate(${a} ${cx} ${cy})"/><path d="M${cx + rx - 2} ${cy}L${cx - rx + 4} ${cy}" stroke="#a8dcec" stroke-width=".7" transform="rotate(${a} ${cx} ${cy})"/></g>`;
      return svg('-56 -36 112 62', `<defs>${lin(ab, '#55cbd9', '#1f93a6')}${rad(hd, '#7fe0ea', '#2aa6b8')}${rad(wg, 'rgba(255,255,255,.95)', 'rgba(150,220,245,.7)', .3, .5)}</defs>
        ${W(-10, -16, 26, 8, 16, '')}${W(-6, -9, 24, 7, 4, 'b')}
        <rect x="-50" y="-2" width="60" height="7" rx="3.5" fill="url(#${ab})"/>${rings}
        ${legs([10, 15], 6, 6, '#2b4a52')}
        <ellipse cx="13" cy="1" rx="9" ry="7.5" fill="url(#${ab})"/>
        ${W(-8, -20, 28, 8.5, 24, 'b')}${W(-4, -12, 25, 7.5, 8, '')}
        <circle cx="27" cy="-1" r="10.5" fill="url(#${hd})"/>
        ${eye(30, -4, 5.4)}${blush(28, 5, 3, 1.8)}${smile(33.5, 3.5, 2.2)}`);
    },
  };

  /* ---------- painterly meadow + sky ---------- */
  // rough "brush" edge: displace shapes with soft noise (only on static shapes, never animated ones)
  const paint = (id, freq = .04, scale = 5) => `<filter id="${id}" x="-8%" y="-8%" width="116%" height="116%"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="${scale}"/></filter>`;
  const hillY = x => 114 - 34 * Math.sin(Math.PI * (x + 80) / 1000);
  const TINY = ['#5b8fd9', '#7fa6f0', '#4aa7c9', '#f08fb0', '#b48ce0', '#3fb0a0'];
  const BLADE = ['#2e8f7a', '#3fa36c', '#1f6f5e', '#5bb37a', '#2a7f8f'];
  const tiny = (x, y, s, c) => { // little 4-petal meadow flower
    let p = ''; for (let i = 0; i < 4; i++) p += `<ellipse cy="${f(-s * .55)}" rx="${f(s * .34)}" ry="${f(s * .55)}" transform="rotate(${i * 90 + 20})"/>`;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(1 .8)" fill="${c}">${p}<circle r="${f(s * .22)}" fill="#fff3b0"/></g>`;
  };
  const frill = (R, cy = 0, n = 16, k = .62, r = () => .5) => { let d = ''; for (let i = 0; i < n * 2; i++) { const a = i * Math.PI / n, q = i % 2 ? R * k : R * (.9 + r() * .18); d += (i ? 'L' : 'M') + f(q * Math.cos(a)) + ' ' + f(cy + q * Math.sin(a) * .8); } return d + 'Z'; };
  function dandelion(x, y, h, r, s = 1, col = '#f7d23a') {
    const lean = (r() - .5) * 14, tx = x + lean, ty = y - h, R = 9 * s;
    return `<g class="lw-sway" style="animation-delay:-${f(r() * 4)}s;animation-duration:${f(3 + r() * 2)}s"><path d="M${f(x)} ${f(y)}Q${f(x + lean * .2)} ${f(y - h * .5)} ${f(tx)} ${f(ty)}" stroke="#3f8f4a" stroke-width="${f(2 * s)}" fill="none" stroke-linecap="round"/>`
      + `<g transform="translate(${f(tx)} ${f(ty)})"><path d="${frill(R, 0, 16, .62, r)}" fill="${col}" stroke="${dark(col, .2)}" stroke-width=".8" stroke-linejoin="round"/><path d="${frill(R * .6, -1, 11, .6, r)}" fill="${light(col, .3)}"/><ellipse cy="-.5" rx="${f(R * .26)}" ry="${f(R * .18)}" fill="${dark(col, .15)}"/></g></g>`;
  }
  function blades(x, y, h, r, n = 4) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const bx = x + (i - n / 2) * 5 + r() * 4, hh = h * (.6 + r() * .5), lean = (i - n / 2 + .5) * h * .18 + (r() - .5) * 10, w = 3.5 + r() * 3, c = BLADE[Math.floor(r() * BLADE.length)];
      const tx = bx + lean, ty = y - hh;
      s += `<path d="M${f(bx - w)} ${y}Q${f(bx - w * .3 + lean * .3)} ${f(y - hh * .55)} ${f(tx)} ${f(ty)}Q${f(bx + w * .6 + lean * .35)} ${f(y - hh * .5)} ${f(bx + w)} ${y}Z" fill="${c}"/><path d="M${f(bx)} ${y}Q${f(bx + lean * .32)} ${f(y - hh * .5)} ${f(tx)} ${f(ty)}" stroke="${light(c, .35)}" stroke-width=".9" fill="none" opacity=".7"/>`;
    }
    return `<g class="lw-sway" style="animation-delay:-${f(r() * 4)}s;animation-duration:${f(3.5 + r() * 2)}s">${s}</g>`;
  }
  const speckles = (r, n, yAt, yMax) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = r() * 1000, y0 = yAt(x) + 6, y = y0 + r() * (yMax - y0), k = r();
      s += k < .45 ? tiny(x, y, 3.4 + r() * 3.4, TINY[Math.floor(r() * TINY.length)])
        : k < .75 ? `<path d="M${f(x - 4)} ${f(y)}l2-7M${f(x)} ${f(y)}v-9M${f(x + 4)} ${f(y)}l-2-7" stroke="#6faa36" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".8"/>`
        : `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(5 + r() * 9)}" ry="${f(1.4 + r() * 1.4)}" fill="#e4f39a" opacity=".65"/>`;
    }
    return s;
  };
  function foliageBack() {
    const r = rng(7), g = uid('fb'), hl = g + 'h', far = g + 'f', pf = g + 'p';
    let d = 'M0 260V' + f(hillY(0)), crest = 'M0 ' + f(hillY(0) + 5);
    for (let x = 20; x <= 1000; x += 20) { d += 'L' + x + ' ' + f(hillY(x)); crest += 'L' + x + ' ' + f(hillY(x) + 5); }
    d += 'V260Z';
    let bl = '';
    for (let i = 0; i < 15; i++) { const x = i * 72 + r() * 30; bl += `<circle cx="${f(x)}" cy="${f(hillY(x) + 6)}" r="${f(12 + r() * 22)}" fill="${['#7fbf5a', '#94c95a', '#6aae55', '#a9d36a', '#5fa65a'][i % 5]}"/>`; }
    let fl = '';
    for (let i = 0; i < 10; i++) { const x = 30 + i * 105 + r() * 40; fl += dandelion(x, hillY(x) + 34 + r() * 24, 20 + r() * 14, r, .65); }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 260" preserveAspectRatio="xMidYMax slice"><defs>${lin(hl, '#d2e86c', '#86bf3c')}${lin(far, '#c6e396', '#9ccd6c')}${paint(pf)}</defs>
      <g filter="url(#${pf})"><path d="M0 260V150Q140 112 300 134T620 118T1000 104V260Z" fill="url(#${far})"/>${bl}<path d="M560 260Q760 66 1000 84V260Z" fill="#d6ea78"/><path d="M700 140Q840 84 1000 92" stroke="#eef7a8" stroke-width="5" fill="none" opacity=".8"/><path d="${d}" fill="url(#${hl})"/></g>
      <path d="${crest}" stroke="#ecf6a6" stroke-width="5" fill="none" opacity=".75" stroke-linecap="round" stroke-dasharray="40 14 70 10"/>
      ${speckles(r, 160, hillY, 258)}${fl}</svg>`;
  }
  function foliageFront() {
    const r = rng(23), g = uid('ff'), gr = g + 'g', pf = g + 'p';
    const bandY = x => 172 - 6 * Math.sin(x / 130);
    let band = 'M0 200V' + f(bandY(0));
    for (let x = 25; x <= 1000; x += 25) band += 'L' + x + ' ' + f(bandY(x));
    band += 'V200Z';
    let clumps = '';
    for (let x = 8; x < 1010; x += 24 + r() * 28) {
      const left = x < 330, h = left ? 14 + r() * 10 : x < 600 ? 28 + r() * 26 : 46 + r() * 50;
      clumps += blades(x, 202, h, r, left ? 3 : 4 + Math.floor(r() * 3));
      if (!left && r() < .6) clumps += dandelion(x + 8, 202, h * (.85 + r() * .4), r, 1.25 + r() * .8);
      else if (left && r() < .35) clumps += dandelion(x + 6, 202, 20 + r() * 6, r, .7);
      if (!left && r() < .4) { const bx = x - 8, bh = h * (.5 + r() * .4); clumps += `<g class="lw-sway" style="animation-delay:-${f(r() * 4)}s"><path d="M${f(bx)} 202Q${f(bx - 3)} ${f(202 - bh / 2)} ${f(bx - 2)} ${f(202 - bh)}" stroke="#2e8f7a" stroke-width="1.6" fill="none"/>${tiny(bx - 2, 202 - bh, 9, TINY[Math.floor(r() * 3)])}</g>`; }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMax slice"><defs>${lin(gr, '#9ad450', '#4f9a3a')}${paint(pf, .05, 4)}</defs>
      <g filter="url(#${pf})"><path d="${band}" fill="url(#${gr})"/></g>
      ${speckles(r, 36, bandY, 198)}${clumps}
      <g id="flowerBed"></g></svg>`;
  }
  function flower(c) {
    c = c || '#ff8fb1';
    return `<g class="lw-flower"><path d="M-1 0Q-15 -12 -21 -30Q-7 -20 2 0Z" fill="#2e8f7a"/><path d="M1 0Q13 -10 19 -26Q8 -15 -1 0Z" fill="#3fa36c"/>
      <path d="M0 0Q-4 -26 0 -50" stroke="#3f8f4a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <g transform="translate(0 -56)"><path d="${frill(13, 0, 14, .58)}" fill="${c}" stroke="${dark(c, .22)}" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="${frill(8, -1, 10, .58)}" fill="${light(c, .4)}"/><ellipse cy="-1" rx="3.8" ry="3" fill="#f6c945" stroke="#e39a23" stroke-width=".8"/></g></g>`;
  }
  function cloud(r, id) {
    const n = 5 + Math.floor(r() * 3);
    let base = '', strokes = '';
    for (let i = 0; i < n; i++) { const x = 40 + i * (220 / (n - 1)), y = 76 - Math.sin(Math.PI * i / (n - 1)) * 26 + (r() - .5) * 10; base += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(22 + r() * 16)}"/>`; }
    for (let i = 0; i < 8; i++) {
      const x = 36 + r() * 190, y = 46 + r() * 50, w = 30 + r() * 60;
      strokes += `<path d="M${f(x)} ${f(y)}c${f(w * .3)} ${f(-14 - r() * 10)} ${f(w * .8)} -10 ${f(w)} 2c${f(-w * .2)} 10 ${f(-w * .6)} 8 ${f(-w * .5)} -2" stroke="${i % 3 ? '#ffffff' : '#f1f7fb'}" stroke-width="${f(4 + r() * 6)}" fill="none" stroke-linecap="round" opacity="${i % 3 ? .95 : .75}"/>`;
    }
    return svg('0 0 300 130', `<defs>${paint(id, .025, 12)}</defs><g filter="url(#${id})"><g fill="#d9ebf6" transform="translate(4 8)">${base}<rect x="30" y="78" width="230" height="24" rx="12"/></g><g fill="#fdfeff">${base}<rect x="30" y="78" width="230" height="24" rx="12"/></g>${strokes}</g>`, 'aria-hidden="true" overflow="visible"');
  }
  function decor() {
    const r = rng(41), g = uid('sk');
    const sky = '<div class="lw-sky"></div>';
    const spots = [['-3vw', '3vh', '44vw', 80], ['52vw', '7vh', '46vw', 95], ['-6vw', '30vh', '30vw', 70], ['64vw', '33vh', '34vw', 85], ['30vw', '20vh', '22vw', 110], ['40vw', '52vh', '66vw', 120], ['-14vw', '58vh', '44vw', 100]];
    return sky + spots.map(([l, t, w, dur], i) => `<div class="lw-cloud" style="left:${l};top:${t};width:${w};animation-duration:${dur}s;animation-delay:-${i * 13}s">${cloud(r, g + 'c' + i)}</div>`).join('');
  }
  function net() {
    const g = uid('nt'), cl = g + 'c', wd = g + 'w', ms = g + 'm';
    let mesh = '';
    for (let i = -60; i <= 80; i += 9) mesh += `<path d="M${i} 0L${i + 70} 76M${i + 70} 0L${i} 76" />`;
    return svg('0 0 100 100', `<defs><clipPath id="${cl}"><circle cx="38" cy="38" r="27"/></clipPath>${lin(wd, '#d79a56', '#8a5a2a', false)}${rad(ms, 'rgba(255,255,255,.75)', 'rgba(220,240,250,.35)')}</defs>
      <path d="M58 58L93 93" stroke="url(#${wd})" stroke-width="7" stroke-linecap="round"/>
      <path d="M80 80l6 6M85 85l5 5" stroke="#e0533d" stroke-width="7.4" stroke-linecap="butt"/>
      <circle cx="38" cy="38" r="27" fill="url(#${ms})"/>
      <g clip-path="url(#${cl})" stroke="#ffffff" stroke-width="1" opacity=".9" fill="none">${mesh}</g>
      <circle cx="38" cy="38" r="28" fill="none" stroke="#f39237" stroke-width="5"/>
      <path d="M18 22A26 26 0 0 1 34 12" stroke="#ffd59a" stroke-width="2" fill="none" stroke-linecap="round"/>`);
  }
  function cocoon() {
    const g = uid('co'), cg = g + 'g';
    return svg('-24 -42 48 84', `<defs>${rad(cg, '#e3e88f', '#8fae45', .35, .3)}</defs>
      <path d="M-22 -36Q0 -42 22 -35" stroke="#8a5a2a" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      ${leaf(12, -37, 70, 12, '#86c45a')}${leaf(-14, -38, -60, 10, '#f39237')}
      <g class="co-swing"><path d="M0 -37V-28" stroke="#d8cfa6" stroke-width="1.2"/>
      <path d="M0 -29C10 -26 15 -8 13 8C11 24 4 34 0 38C-4 34 -11 24 -13 8C-15 -8 -10 -26 0 -29Z" fill="url(#${cg})" stroke="#6f8f34" stroke-width="1.2"/>
      <path d="M-12 -4Q0 2 12 -4M-12.5 8Q0 14 12.5 8M-10 20Q0 25 10 20" stroke="#6f8f34" stroke-width="1" fill="none" opacity=".6"/>
      <path d="M-6 -20Q-9 -8 -8 4" stroke="#fff" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/>
      <path d="M-6 -12q2.4 2 4.6 0M1.6 -12q2.4 2 4.6 0" stroke="#4a5a22" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      ${blush(-6, -7.5, 2.6, 1.5)}${blush(6, -7.5, 2.6, 1.5)}
      <path d="M-1.4 -6q1.4 1.2 2.8 0" stroke="#4a5a22" stroke-width="1" fill="none" stroke-linecap="round"/></g>`);
  }

  window.ART = {
    css,
    teacher,
    bug: (kind, color) => (bugs[kind] || bugs.butterfly)(color),
    foliageBack,
    foliageFront,
    flower,
    decor,
    net,
    cocoon,
  };
})();
