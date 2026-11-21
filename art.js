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

  /* swaying sprig: thin curved stem with alternating almond leaves */
  const PAL = ['#e0533d', '#f39237', '#f6c945', '#a6d14a', '#3f7d3a'];
  function sprig(x, y, h, lean, r, o = {}) {
    const n = o.n || 6, L = o.leaf || 14, pal = o.pal || PAL;
    const cx = x + lean * .15, cy = y - h * .55, ex = x + lean, ey = y - h;
    let s = `<path d="M${f(x)} ${f(y)}Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}" fill="none" stroke="${o.stem || '#6b7f3a'}" stroke-width="${o.sw || 1.6}" stroke-linecap="round"/>`;
    for (let i = 1; i <= n; i++) {
      const t = .22 + .78 * i / (n + 1), u = 1 - t;
      const px = u * u * x + 2 * u * t * cx + t * t * ex, py = u * u * y + 2 * u * t * cy + t * t * ey;
      const dx = 2 * u * (cx - x) + 2 * t * (ex - cx), dy = 2 * u * (cy - y) + 2 * t * (ey - cy);
      const a = Math.atan2(dy, dx) * 180 / Math.PI + 90, side = i % 2 ? 1 : -1;
      s += leaf(px, py, a + side * (38 + r() * 18), L * (1.05 - .35 * t) * (.85 + r() * .3), pal[Math.floor(r() * pal.length)]);
    }
    const ta = Math.atan2(ey - cy, ex - cx) * 180 / Math.PI + 90;
    s += leaf(ex, ey, ta, L * .8, pal[Math.floor(r() * pal.length)]);
    return `<g class="lw-sway" style="animation-delay:-${f(r() * 4)}s;animation-duration:${f(3.4 + r() * 2.4)}s">${s}</g>`;
  }
  /* lumpy bush built from overlapping circles + leaf texture */
  function bush(cx, by, w, h, fill, r, tex) {
    const k = Math.max(4, Math.round(w / (h * .55)));
    let s = `<rect x="${f(cx - w / 2)}" y="${f(by - h * .42)}" width="${f(w)}" height="${f(h * .42 + 80)}" rx="${f(h * .3)}" fill="${fill}"/>`;
    for (let j = 0; j < k; j++) {
      const u = (j + .5) / k, rr = h * (.3 + r() * .14);
      const top = by - h * (.5 + .5 * Math.sin(Math.PI * u));
      s += `<circle cx="${f(cx - w / 2 + u * w)}" cy="${f(top + rr)}" r="${f(rr)}" fill="${fill}"/>`;
    }
    for (let j = 0; j < (tex ? k * 3 : 0); j++) {
      const u = r(); const top = by - h * (.5 + .5 * Math.sin(Math.PI * u));
      s += leaf(cx - w / 2 + u * w, top + h * (.2 + r() * .5), r() * 360, h * .16, tex[j % tex.length]);
    }
    return s;
  }

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
.lw-dec{position:absolute;width:20vmin;height:20vmin;transform-origin:50% 100%;pointer-events:none}
.lw-dec svg{width:100%;height:100%;overflow:visible}
.co-swing{transform-box:fill-box;transform-origin:50% 0;animation:lwSwing 3s ease-in-out infinite alternate}
@keyframes lwSwing{from{transform:rotate(-5deg)}to{transform:rotate(5deg)}}
@media (prefers-reduced-motion:reduce){.lw-sway,.bf-w,.bz-w,.df-w,.cp-seg,.mb-wing,.co-swing,.sn-stalk,.sn-body,.lb-legs{animation:none}}
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

  /* ---------- foliage ---------- */
  function foliageBack() {
    const r = rng(7), g = uid('fb'), b1 = g + 'a', b2 = g + 'b', hz = g + 'h';
    let sp = '';
    for (let i = 0; i < 16; i++) { const x = 20 + i * 62 + r() * 30; sp += sprig(x, 230, 70 + r() * 80, (r() - .5) * 60, r, { n: 6 + Math.floor(r() * 3), leaf: 14 + r() * 6 }); }
    let far = '', mid = '';
    [[60, 170], [230, 150], [420, 165], [600, 150], [790, 170], [960, 155]].forEach(([x, h]) => { far += bush(x, 228, 230, h * .7, `url(#${b1})`, r); });
    [[150, 110], [520, 100], [880, 120]].forEach(([x, h]) => { mid += bush(x, 240, 220, h, `url(#${b2})`, r, ['#4f8f3f', '#8cc35a', '#e5a03a']); });
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 260" preserveAspectRatio="xMidYMax slice"><defs>${lin(b1, '#a9d38a', '#77ad5d')}${lin(b2, '#7fbf5f', '#3f8445')}${lin(hz, '#d6ecc0', '#b5d79b')}</defs>
      <path d="M0 260V170Q120 130 260 160T560 150T820 158T1000 150V260Z" fill="url(#${hz})"/>
      ${far}${sp}${mid}
      <path d="M0 260V238Q250 226 500 236T1000 232V260Z" fill="#3f8445"/></svg>`;
  }
  function foliageFront() {
    const r = rng(23), g = uid('ff'), b1 = g + 'a', gr = g + 'g';
    let tufts = '';
    for (let x = 6; x < 1000; x += 18 + r() * 16) {
      const h = (x < 340 ? 10 : 14) + r() * 10, y = 196;
      tufts += `<path d="M${f(x - 6)} ${y}Q${f(x - 4)} ${f(y - h * .6)} ${f(x - 8)} ${f(y - h)}Q${f(x)} ${f(y - h * .5)} ${f(x + 1)} ${y}Q${f(x + 2)} ${f(y - h * .7)} ${f(x + 7)} ${f(y - h * .9)}Q${f(x + 5)} ${f(y - h * .3)} ${f(x + 7)} ${y}Z" fill="${r() > .5 ? '#2f6e37' : '#3f8a44'}"/>`;
    }
    let big = '', sp = '';
    [[690, 95], [860, 125], [985, 110]].forEach(([x, h], i) => { big += bush(x, 205, 220 - i * 20, h, `url(#${b1})`, r, ['#1f5a2e', '#4f9445', '#2b6b36']); });
    [[700, 110, -10], [770, 90, 20], [900, 120, 10], [960, 95, -25], [820, 70, 12], [600, 60, -8], [520, 45, 10]].forEach(([x, h, l]) => { sp += sprig(x, 200 - h * .4, h, l, r, { n: 5 + Math.floor(r() * 3), leaf: 15 }); });
    [[130, 28, 6], [250, 34, -6], [40, 24, 4]].forEach(([x, h, l]) => { sp += sprig(x, 196, h, l, r, { n: 4, leaf: 9 }); });
    const small = bush(470, 205, 140, 52, `url(#${b1})`, r, ['#4f9445']);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMax slice"><defs>${lin(b1, '#5aa04c', '#1f5a2e')}${lin(gr, '#58a04a', '#2b6b36')}</defs>
      ${sp}${big}${small}
      <path d="M0 200V182Q160 170 330 178T640 176T1000 178V200Z" fill="url(#${gr})"/>
      ${tufts}
      <g id="flowerBed"></g></svg>`;
  }
  function flower(c) {
    c = c || '#ff8fb1';
    const d = dark(c, .22), l = light(c, .45);
    let p = '';
    for (let i = 0; i < 5; i++) p += `<g transform="rotate(${i * 72} 0 -56)"><ellipse cx="0" cy="-66" rx="7.2" ry="10" fill="${c}" stroke="${d}" stroke-width="1"/><ellipse cx="0" cy="-68" rx="3.4" ry="5.6" fill="${l}" opacity=".8"/></g>`;
    return `<g class="lw-flower"><path d="M0 0Q-4 -26 0 -50" stroke="#4f8f3f" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${leaf(-1, -14, -55, 18, '#6fb24a', '#c9ec9c')}${leaf(-1, -28, 50, 15, '#86c45a', '#d6f2b0')}
      ${p}<circle cy="-56" r="7" fill="#f6c945" stroke="#e39a23" stroke-width="1"/>
      <circle cx="-2.4" cy="-57.5" r="1.1" fill="#5b3a1a"/><circle cx="2.4" cy="-57.5" r="1.1" fill="#5b3a1a"/>${smile(0, -54.6, 1.8, '#5b3a1a', 1)}</g>`;
  }
  function decor() {
    const r = rng(41);
    const piece = (pos, rot, pal) => `<div class="lw-dec" style="${pos};transform:rotate(${rot}deg)">${svg('0 0 100 100', sprig(50, 100, 88, (r() - .5) * 26, r, { n: 7, leaf: 17, pal, sw: 2 }) + sprig(50, 100, 60, 18, r, { n: 4, leaf: 13, pal, sw: 1.6 }), 'aria-hidden="true"')}</div>`;
    return piece('left:-10vmin;top:-20vmin', 140, ['#e0533d', '#f39237', '#f6c945', '#a6d14a'])
      + piece('left:calc(100% - 10vmin);top:-20vmin', -140, ['#f6c945', '#a6d14a', '#3f7d3a', '#f39237'])
      + piece('left:-10vmin;top:calc(48% - 20vmin);width:16vmin;height:16vmin', 70, ['#a6d14a', '#3f7d3a', '#f39237'])
      + piece('left:calc(100% - 8vmin);top:calc(42% - 16vmin);width:16vmin;height:16vmin', -70, ['#e0533d', '#a6d14a', '#3f7d3a']);
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
