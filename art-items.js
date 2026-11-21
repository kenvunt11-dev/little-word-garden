/* Word pictures for lessons, picture-book style: flat colour, soft shade, thin warm outline, cute face.
 * ART.item(kind) -> svg string   (kinds listed in ITEMS below)
 * ART.count(n)   -> svg string   (n ladybugs + numeral, n = 1..5)
 * Depends on art.js (uses ART._h helpers).
 */
(function () {
  'use strict';
  const { svg, uid, f, eye, blush, smile, leaf, star, light, dark } = ART._h;
  const OL = '#4a2f25';
  const ol = (w = 2.2) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const ell = (cx, cy, rx, ry) => `M${f(cx - rx)} ${f(cy)}a${f(rx)} ${f(ry)} 0 1 0 ${f(rx * 2)} 0a${f(rx)} ${f(ry)} 0 1 0 ${f(-rx * 2)} 0Z`;
  // flat body with a soft darker edge on the lower-right + outline
  const body = (d, fill, k = 1) => {
    const id = uid('cl');
    return `<clipPath id="${id}"><path d="${d}"/></clipPath><path d="${d}" fill="${dark(fill, .16)}"/>`
      + `<g clip-path="url(#${id})"><path d="${d}" fill="${fill}" transform="translate(${f(-5 * k)} ${f(-6 * k)})"/></g><path d="${d}" fill="none" ${ol()}/>`;
  };
  const shine = d => `<path d="${d}" stroke="#fff" stroke-width="4.5" fill="none" opacity=".55" stroke-linecap="round"/>`;
  const n1 = v => +(+v).toFixed(1);
  const face = (x, y, s, m = '#5a2a22') => eye(n1(x - s * .42), n1(y), n1(s * .17)) + eye(n1(x + s * .42), n1(y), n1(s * .17))
    + blush(n1(x - s * .74), n1(y + s * .34), n1(s * .17), n1(s * .1)) + blush(n1(x + s * .74), n1(y + s * .34), n1(s * .17), n1(s * .1))
    + smile(x, +f(y + s * .3), +f(s * .15), m, +f(s * .06));
  const wheel = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#3b3033" ${ol()}/><circle cx="${x}" cy="${y}" r="${f(r * .45)}" fill="#d9d2c8"/>`;
  const V = '-50 -50 100 100';
  const SKIN = '#f7cfae', HAIR = '#6b3f2a';

  const ITEMS = {
    /* ---- fruit ---- */
    apple: () => svg('-50 -56 100 106', `<path d="M2 -26Q3 -42 12 -50" stroke="#7a4a26" stroke-width="5" fill="none" stroke-linecap="round"/>
      ${leaf(9, -42, 62, 26, '#6cc04a', '#3f8f3a')}
      ${body('M0 -24C-18 -38 -46 -30 -44 -2C-42 28 -20 46 0 40C20 46 42 28 44 -2C46 -30 18 -38 0 -24Z', '#e8463a')}
      ${shine('M-32 -12Q-30 -24 -18 -27')}${face(0, 6, 40)}`),
    banana: () => svg('-56 -46 112 92', `${body('M-40 -26Q-48 32 4 36Q42 36 50 0Q30 14 4 10Q-22 6 -26 -28Z', '#ffd84a')}
      <path d="M-40 -26l-3 -9 12 3z" fill="#7a5a32" ${ol(1.6)}/><path d="M50 2l5 -1 -2 6z" fill="#7a5a32"/>
      ${shine('M-38 -6Q-34 18 -10 26')}${face(-8, 18, 32)}`),
    orange: () => svg('-50 -54 100 104', `${body(ell(0, 4, 40, 39), '#f6922b')}
      ${[[-22, -12], [-10, 26], [18, 20], [24, -10], [6, -22], [-28, 14]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="#d8721a"/>`).join('')}
      <path d="M0 -34v-6" stroke="#6b4a2a" stroke-width="4" stroke-linecap="round"/>${leaf(2, -38, 70, 22, '#6cc04a', '#3f8f3a')}
      ${shine('M-28 -14Q-24 -26 -10 -30')}${face(0, 8, 38)}`),
    strawberry: () => svg('-50 -54 100 106', `${body('M0 46C-30 32 -44 2 -38 -18Q-20 -32 0 -26Q20 -32 38 -18C44 2 30 32 0 46Z', '#ee4b53')}
      ${[[-24, -8], [-10, -14], [10, -14], [24, -8], [-28, 10], [28, 10], [-16, 28], [16, 28], [0, 38]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="2.4" fill="#ffe27a"/>`).join('')}
      ${[-70, -35, 0, 35, 70].map(a => leaf(0, -26, a, 22, '#5bb04a')).join('')}<circle cx="0" cy="-28" r="4" fill="#4a9a3a"/>
      <path d="M0 -30v-12" stroke="#4a9a3a" stroke-width="4" stroke-linecap="round"/>${face(0, 6, 36)}`),
    /* ---- pets ---- */
    cat: () => svg(V, `<path d="M26 34Q46 30 42 8Q40 -2 46 -6" stroke="${OL}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M26 34Q46 30 42 8Q40 -2 46 -6" stroke="#f4a35a" stroke-width="6" fill="none" stroke-linecap="round"/>
      ${body(ell(0, 30, 28, 18), '#f4a35a')}
      <path d="M-14 44v4M14 44v4" stroke="${OL}" stroke-width="2"/>
      ${body('M-36 -18L-32 -46L-10 -34Z', '#f4a35a', .4)}${body('M36 -18L32 -46L10 -34Z', '#f4a35a', .4)}
      <path d="M-29 -24L-27 -38L-16 -32Z M29 -24L27 -38L16 -32Z" fill="#f6a3b0"/>
      ${body(ell(0, -8, 38, 30), '#f4a35a')}
      <path d="M-8 -36q2 7 0 12M0 -38v13M8 -36q-2 7 0 12" stroke="#d9772f" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${eye(-14, -8, 6.5)}${eye(14, -8, 6.5)}${blush(-25, 4, 6, 3.6)}${blush(25, 4, 6, 3.6)}
      <path d="M-3 0h6l-3 3.4z" fill="#e5708a"/><path d="M-6 6q3 4 6 0q3 4 6 0" stroke="#5a2a22" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M-20 2h-16M-20 7l-14 4M20 2h16M20 7l14 4" stroke="${OL}" stroke-width="1.3" stroke-linecap="round"/>`),
    dog: () => svg(V, `${body(ell(0, 32, 26, 16), '#e9c79a')}
      ${body('M-30 -30C-48 -26 -50 4 -40 12C-32 16 -26 2 -24 -14Z', '#9a6a44', .4)}${body('M30 -30C48 -26 50 4 40 12C32 16 26 2 24 -14Z', '#9a6a44', .4)}
      ${body(ell(0, -8, 34, 32), '#e9c79a')}
      <ellipse cx="14" cy="-14" rx="10" ry="9" fill="#c99560"/>
      ${body(ell(0, 10, 16, 11), '#fff6e6', .3)}
      <ellipse cx="0" cy="3" rx="6" ry="4.4" fill="#3b2a22"/><ellipse cx="-1.6" cy="1.6" rx="1.8" ry="1" fill="#fff" opacity=".7"/>
      <path d="M0 7v4M-6 11q6 5 12 0" stroke="#5a2a22" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M-2 13h4v5q-2 3 -4 0z" fill="#ef7a8c" ${ol(1.2)}/>
      ${eye(-13, -12, 6.2)}${eye(13, -12, 6.2)}${blush(-24, 2, 5.6, 3.4)}${blush(24, 2, 5.6, 3.4)}`),
    fish: () => svg('-52 -44 104 88', `<path d="M-30 0L-50 -20Q-46 0 -50 20Z" fill="#ffb347" ${ol()}/>
      <path d="M-4 -24Q8 -40 20 -26Z M-2 22Q6 34 16 24Z" fill="#ffb347" ${ol()}/>
      ${body(ell(2, 0, 36, 25), '#4fb3e8')}
      <path d="M-14 -22q-6 22 0 44M0 -25q-6 25 0 50" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/>
      ${eye(20, -5, 6.5)}${blush(22, 8, 5, 3)}${smile(30, 6, 4, '#5a2a22', 2)}
      <circle cx="44" cy="-24" r="4" fill="#dff3fb" ${ol(1.2)}/><circle cx="48" cy="-36" r="2.6" fill="#dff3fb" ${ol(1)}/>`),
    bird: () => svg(V, `<path d="M-6 38v8M6 38v8M-10 46h8M2 46h8" stroke="#f39237" stroke-width="3" stroke-linecap="round"/>
      <path d="M-4 -34q2 -12 10 -10q-6 2 -4 10" fill="#3a85cf" ${ol(1.6)}/>
      ${body(ell(0, 4, 34, 34), '#5aa9e6')}
      ${body(ell(4, 16, 20, 18), '#fff1c9', .3)}
      ${body('M-30 4Q-46 18 -34 30Q-20 30 -14 14Z', '#3a85cf', .4)}
      <path d="M30 -6L46 0L30 6Z" fill="#f39237" ${ol(1.8)}/>
      ${eye(10, -8, 6.4)}${eye(-8, -8, 5.6)}${blush(20, 4, 5, 3)}${blush(-16, 4, 4.6, 2.8)}`),
    /* ---- farm ---- */
    cow: () => svg(V, `<path d="M-26 -30Q-34 -44 -24 -46M26 -30Q34 -44 24 -46" stroke="#e9d8b8" stroke-width="7" fill="none" stroke-linecap="round"/>
      ${body(ell(-40, -16, 12, 7), '#fffaf0', .3)}${body(ell(40, -16, 12, 7), '#fffaf0', .3)}
      ${body(ell(0, -6, 34, 34), '#fffaf0')}
      <path d="M-30 -24Q-20 -34 -10 -26Q-14 -12 -28 -12Z" fill="#3b2a22"/><path d="M18 -36Q30 -34 32 -20Q22 -16 16 -26Z" fill="#3b2a22"/>
      ${body(ell(0, 20, 26, 17), '#f7b5b5', .4)}
      <ellipse cx="-9" cy="20" rx="3.6" ry="5" fill="#c9707a"/><ellipse cx="9" cy="20" rx="3.6" ry="5" fill="#c9707a"/>
      ${eye(-13, -8, 6)}${eye(13, -8, 6)}${blush(-26, 4, 5, 3)}${blush(26, 4, 5, 3)}
      <path d="M-6 30q6 4 12 0" stroke="#5a2a22" stroke-width="2" fill="none" stroke-linecap="round"/>`),
    pig: () => svg(V, `${body('M-34 -16L-30 -44L-8 -30Z', '#f6a5b8', .4)}${body('M34 -16L30 -44L8 -30Z', '#f6a5b8', .4)}
      ${body(ell(0, 0, 38, 34), '#f6a5b8')}
      ${body(ell(0, 10, 15, 11), '#f28aa3', .3)}
      <ellipse cx="-5" cy="10" rx="3" ry="4.4" fill="#b8506a"/><ellipse cx="5" cy="10" rx="3" ry="4.4" fill="#b8506a"/>
      ${eye(-16, -8, 6)}${eye(16, -8, 6)}${blush(-28, 8, 6, 3.4)}${blush(28, 8, 6, 3.4)}
      <path d="M-7 26q7 5 14 0" stroke="#5a2a22" stroke-width="2" fill="none" stroke-linecap="round"/>`),
    duck: () => svg(V, `<path d="M-14 40v6M6 40v6" stroke="#f39237" stroke-width="4" stroke-linecap="round"/>
      ${body('M-40 6Q-46 40 -6 42Q34 44 36 16Q36 2 20 4L-30 4Q-36 4 -40 6Z', '#ffd84a')}
      ${body(ell(12, -18, 22, 22), '#ffd84a')}
      ${body('M-24 16Q-8 4 8 14Q0 32 -24 16Z', '#f6c12a', .3)}
      <path d="M30 -16Q46 -16 46 -10Q46 -4 30 -6Z" fill="#f39237" ${ol(1.8)}/>
      <path d="M8 -40q2 -8 8 -6q-4 2 -2 6" fill="#ffd84a" ${ol(1.4)}/>
      ${eye(18, -22, 5.6)}${eye(4, -22, 5)}${blush(24, -10, 4.6, 2.8)}`),
    sheep: () => svg(V, `<path d="M-16 34v12M-4 36v10M6 36v10M18 34v12" stroke="#5a4038" stroke-width="5" stroke-linecap="round"/>
      <g fill="#fffaf0" ${ol()}>${[[-26, -4], [-14, -20], [4, -24], [22, -16], [30, 2], [22, 20], [2, 26], [-18, 22], [-32, 10]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15"/>`).join('')}</g>
      <ellipse cx="0" cy="0" rx="32" ry="26" fill="#fffaf0"/>
      ${body(ell(-28, -6, 9, 5), '#e8c9ad', .2)}${body(ell(28, -6, 9, 5), '#e8c9ad', .2)}
      ${body(ell(0, 2, 20, 22), '#f3d9c0')}
      <g fill="#fffaf0" ${ol(1.6)}><circle cx="-8" cy="-20" r="7"/><circle cx="0" cy="-23" r="7"/><circle cx="8" cy="-20" r="7"/></g>
      ${face(0, 2, 26)}`),
    /* ---- toys ---- */
    ball: () => { const id = uid('bc'); return svg(V, `<clipPath id="${id}"><circle r="40"/></clipPath>
      <g clip-path="url(#${id})"><path d="M0 -40Q-26 0 0 40H-42V-40Z" fill="#ec4b3c"/><path d="M0 -40Q26 0 0 40H42V-40Z" fill="#4b9be3"/><path d="M0 -40Q-26 0 0 40Q26 0 0 -40Z" fill="#fff3c4"/><path d="M-42 -6H42V8H-42Z" fill="#f6c12a" opacity=".9"/></g>
      <circle r="40" fill="none" ${ol()}/>${shine('M-26 -20Q-20 -32 -6 -36')}${face(0, 10, 30)}`); },
    balloon: () => svg('-50 -54 100 108', `<path d="M0 34Q-8 44 2 50Q10 54 0 58" stroke="${OL}" stroke-width="1.8" fill="none"/>
      ${body('M0 34C-34 30 -40 -2 -36 -18C-30 -44 30 -44 36 -18C40 -2 34 30 0 34Z', '#ec4b3c')}
      <path d="M-5 38L5 38L0 32Z" fill="#c2302a" ${ol(1.6)}/>${shine('M-24 -20Q-20 -32 -8 -34')}${face(0, -4, 34)}`),
    kite: () => svg('-50 -52 100 124', `<path d="M0 34Q-14 44 0 52Q14 58 2 66" stroke="${OL}" stroke-width="1.8" fill="none"/>
      <path d="M-6 44l-6 -4 0 8zM6 44l6 -4 0 8z" fill="#f383b0"/><path d="M-4 56l-6 -4 0 8zM8 56l6 -4 0 8z" fill="#f6c12a"/>
      <path d="M0 -46L34 -6L0 34L-34 -6Z" fill="#4b9be3"/><path d="M0 -46L34 -6H0Z M0 -6V34L-34 -6Z" fill="#f6c12a"/>
      <path d="M0 -46L34 -6L0 34L-34 -6Z M0 -46V34M-34 -6H34" fill="none" ${ol()}/>${face(0, -6, 24)}`),
    teddy: () => svg(V, `${body(ell(0, 30, 26, 18), '#b77a4b')}${body(ell(0, 32, 13, 10), '#e7c39b', .3)}
      ${body(ell(-28, -32, 11, 11), '#b77a4b', .4)}${body(ell(28, -32, 11, 11), '#b77a4b', .4)}
      <circle cx="-28" cy="-32" r="5" fill="#e7c39b"/><circle cx="28" cy="-32" r="5" fill="#e7c39b"/>
      ${body(ell(0, -8, 32, 28), '#b77a4b')}
      ${body(ell(0, 2, 13, 10), '#e7c39b', .3)}
      <ellipse cx="0" cy="-2" rx="5" ry="3.6" fill="#3b2a22"/>
      <path d="M0 2v4M-5 6q5 4 10 0" stroke="#3b2a22" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      ${eye(-12, -14, 5.4)}${eye(12, -14, 5.4)}${blush(-21, -2, 5, 3)}${blush(21, -2, 5, 3)}
      <path d="M-8 18l8 5 8 -5 -2 9 -6 -3 -6 3z" fill="#ec4b3c" ${ol(1.4)}/>`),
    /* ---- go ---- */
    car: () => svg('-54 -40 108 80', `${body('M-48 14V0Q-48 -8 -38 -10L-26 -12L-16 -30Q-12 -34 -4 -34H18Q26 -34 30 -28L38 -12L44 -10Q50 -8 50 0V14Q50 20 44 20H-42Q-48 20 -48 14Z', '#e8463a')}
      <path d="M-20 -12L-12 -28H6V-12Z" fill="#bfe6f7" ${ol(1.8)}/><path d="M12 -12V-28H24L32 -12Z" fill="#bfe6f7" ${ol(1.8)}/>
      ${eye(-4, -20, 3.6)}${eye(4, -20, 3.6)}
      <circle cx="44" cy="0" r="3.4" fill="#ffe27a" ${ol(1.2)}/>${smile(30, 6, 5, '#5a2a22', 2)}${blush(20, 4, 4, 2.4)}
      ${wheel(-26, 20, 10)}${wheel(28, 20, 10)}`),
    bus: () => svg('-56 -44 112 88', `${body('M-50 22V-26Q-50 -34 -42 -34H38Q48 -34 50 -24L52 -2V22Q52 28 46 28H-44Q-50 28 -50 22Z', '#f6c12a')}
      ${[-42, -22, -2, 18].map(x => `<rect x="${x}" y="-26" width="16" height="16" rx="3" fill="#bfe6f7" ${ol(1.6)}/>`).join('')}
      <path d="M36 -26H44Q48 -26 49 -20L50 -6H36Z" fill="#bfe6f7" ${ol(1.6)}/>
      <path d="M-50 2H52" stroke="#e39a1f" stroke-width="5"/>
      ${eye(40, -15, 3.2)}${smile(42, 10, 4.6, '#5a2a22', 2)}${blush(32, 12, 4, 2.4)}
      ${wheel(-30, 28, 10)}${wheel(30, 28, 10)}`),
    boat: () => svg('-52 -54 104 104', `<path d="M-2 -48V18" stroke="#7a4a26" stroke-width="4"/>
      <path d="M2 -46Q34 -22 36 10H2Z" fill="#fff" ${ol()}/><path d="M-6 -36Q-30 -12 -32 10H-6Z" fill="#ec4b3c" ${ol()}/>
      ${body('M-46 14H46Q40 36 24 38H-24Q-40 36 -46 14Z', '#3f8fd6')}
      ${face(0, 24, 22)}
      <path d="M-52 44q8 -6 16 0t16 0t16 0t16 0t16 0t16 0" stroke="#4fb3e8" stroke-width="4" fill="none" stroke-linecap="round"/>`),
    plane: () => svg('-56 -44 112 88', `<path d="M-6 -2L-24 -38H-10L18 -2Z" fill="#4b9be3" ${ol()}/>
      <path d="M-40 -6L-50 -26H-40L-30 -8Z" fill="#4b9be3" ${ol()}/>
      ${body('M-46 -8Q-46 -16 -32 -16H34Q52 -16 54 -2Q52 12 34 12H-32Q-46 12 -46 4Z', '#f4f8fb')}
      ${[-24, -12, 0, 12].map(x => `<circle cx="${x}" cy="-4" r="3.6" fill="#bfe6f7" ${ol(1.3)}/>`).join('')}
      ${eye(38, -6, 3.4)}${smile(42, 4, 3.6, '#5a2a22', 1.8)}
      <path d="M-4 4L-20 36H-6L18 4Z" fill="#4b9be3" ${ol()}/>`),
    /* ---- sky ---- */
    sun: () => svg(V, `${Array.from({ length: 10 }, (_, i) => `<path d="M0 -46L6 -34H-6Z" fill="#f6a623" transform="rotate(${i * 36})"/>`).join('')}
      ${body(ell(0, 0, 30, 30), '#ffd23f')}${face(0, 2, 30)}`),
    moon: () => svg(V, `${body('M8 -40A40 40 0 1 0 38 18A32 32 0 1 1 8 -40Z', '#ffe58a')}
      <path d="M-26 -2q4 4 8 0M-10 2q4 4 8 0" stroke="#5a2a22" stroke-width="2" fill="none" stroke-linecap="round"/>
      ${blush(-26, 10, 5, 3)}${smile(-12, 14, 4, '#5a2a22', 1.8)}
      <path d="${star(30, -30, 6, 2.6)}" fill="#fff3a6"/><path d="${star(40, -6, 4, 1.8)}" fill="#fff3a6"/>`),
    star: () => svg(V, `${body(star(0, 4, 46, 21), '#ffd23f')}${face(0, 8, 26)}`),
    rainbow: () => svg('-56 -40 112 80', `${['#ec4b3c', '#f6922b', '#ffd23f', '#5cbf4a', '#4b9be3', '#9b6bd6'].map((c, i) => `<path d="M${-44 + i * 6} 22A${44 - i * 6} ${44 - i * 6} 0 0 1 ${44 - i * 6} 22" stroke="${c}" stroke-width="6.4" fill="none"/>`).join('')}
      <path d="M-47 22A47 47 0 0 1 47 22M-11 22A11 11 0 0 1 11 22" stroke="${OL}" stroke-width="2" fill="none"/>
      ${[-40, 40].map(x => `<g fill="#fff" ${ol(1.8)}><circle cx="${x - 10}" cy="26" r="9"/><circle cx="${x + 10}" cy="26" r="9"/><circle cx="${x}" cy="20" r="12"/></g><ellipse cx="${x}" cy="28" rx="16" ry="6" fill="#fff"/>`).join('')}
      ${face(-40, 24, 14)}${face(40, 24, 14)}`),
    /* ---- my body ---- */
    head: () => svg(V, `${body('M-40 8C-46 -34 -20 -48 0 -48C20 -48 46 -34 40 8Z', HAIR)}
      ${body(ell(-35, 8, 7, 10), SKIN, .3)}${body(ell(35, 8, 7, 10), SKIN, .3)}
      ${body(ell(0, 8, 33, 36), SKIN)}
      <path d="M-34 -2C-38 -34 -14 -44 2 -42C24 -42 40 -30 34 -2C26 -16 14 -20 4 -14C-6 -22 -22 -18 -34 -2Z" fill="${HAIR}" ${ol()}/>
      <path d="M-2 -42Q2 -54 12 -50Q4 -48 4 -42" fill="${HAIR}" ${ol(1.6)}/>
      ${face(0, 10, 34)}<path d="M-2 14q2 2.4 4 0" stroke="#c98a6a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`),
    hand: () => svg(V, `<path d="M36 -44q8 4 10 12M42 -50q10 6 12 16" stroke="#9fd0ee" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${body('M-24 42C-30 30 -32 16 -30 6L-42 -8Q-50 -18 -42 -22Q-36 -24 -30 -16L-24 -8L-26 -34Q-26 -42 -20 -42Q-14 -42 -14 -34L-14 -14Q-12 -16 -10 -14L-10 -40Q-10 -48 -3 -48Q4 -48 4 -40L4 -14Q6 -16 8 -14L8 -38Q8 -46 14 -46Q20 -46 20 -38L20 -12Q22 -14 24 -12L24 -30Q24 -37 29 -37Q34 -37 34 -30L34 6C34 28 26 38 18 42Z', SKIN)}
      ${face(4, 14, 30)}`),
    eyes: () => svg('-52 -40 104 80', `${body('M-48 -14Q0 -38 48 -14V18Q0 38 -48 18Z', SKIN)}
      <path d="M-34 -20Q-22 -28 -10 -20M10 -20Q22 -28 34 -20" stroke="${HAIR}" stroke-width="4.4" fill="none" stroke-linecap="round"/>
      ${[-22, 22].map(x => `<ellipse cx="${x}" cy="2" rx="15" ry="12" fill="#fff" ${ol()}/>${eye(x, 2, 9)}
        <path d="M${x - 15} -1l-5 -4M${x - 12} -7l-3 -5M${x + 15} -1l5 -4M${x + 12} -7l3 -5" stroke="${OL}" stroke-width="2" stroke-linecap="round"/>`).join('')}
      ${blush(-30, 22, 7, 3.6)}${blush(30, 22, 7, 3.6)}`),
    nose: () => svg(V, `${body(ell(0, 2, 42, 42), SKIN)}
      ${body('M-4 -32Q6 -32 9 -6Q22 2 18 16Q12 25 0 22Q-12 25 -18 16Q-22 2 -9 -6Q-14 -32 -4 -32Z', '#f4b896', .5)}
      <ellipse cx="-7" cy="14" rx="3.6" ry="2.6" fill="#a8604a"/><ellipse cx="7" cy="14" rx="3.6" ry="2.6" fill="#a8604a"/>
      ${shine('M-2 -24Q2 -16 1 -8')}${blush(-28, 8, 7, 4)}${blush(28, 8, 7, 4)}${smile(0, 32, 7, '#5a2a22', 2)}
      <path d="${star(-30, -26, 5, 2.2)}" fill="#ffd23f"/><path d="${star(32, -22, 4, 1.8)}" fill="#ffd23f"/>`),
    /* ---- clothes ---- */
    hat: () => svg('-56 -46 112 84', `${body(ell(0, 18, 52, 14), '#f2c45a')}
      ${body('M-28 16Q-30 -32 0 -34Q30 -32 28 16Z', '#f6d06a')}
      <path d="M-28.6 2Q0 9 28.6 2V12Q0 19 -28.6 12Z" fill="#ec4b3c" ${ol(1.6)}/>
      ${[0, 72, 144, 216, 288].map(a => `<circle cx="20" cy="2" r="5" fill="#f383b0" ${ol(1.2)} transform="rotate(${a} 20 7) translate(0 0)"/>`).join('')}<circle cx="20" cy="7" r="3.6" fill="#ffd23f" ${ol(1.2)}/>
      ${face(-4, -14, 26)}`),
    shoes: () => svg('-56 -40 112 80', [[-27, -2], [27, 4]].map(([x, y]) => `<g transform="translate(${x} ${y}) scale(.9)">
      ${body('M-24 10V-14Q-24 -22 -16 -22H-2Q4 -22 6 -14L10 -6Q22 -4 26 4Q28 12 22 14H-20Q-24 14 -24 10Z', '#ec4b3c')}
      <path d="M-26 10H26Q26 20 18 20H-20Q-26 20 -26 10Z" fill="#fffaf0" ${ol()}/>
      <path d="M-6 -16l8 4M-8 -10l9 4" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>
      ${eye(12, 2, 3.4)}${blush(18, 8, 3.4, 2)}${smile(5, 7, 3.4, '#5a2a22', 1.8)}</g>`).join('')),
    shirt: () => svg(V, `${body('M-16 -38Q0 -30 16 -38L44 -22L34 0L24 -6V40H-24V-6L-34 0L-44 -22Z', '#4b9be3')}
      <path d="M-16 -38Q0 -24 16 -38" fill="#fff3c4" ${ol(1.8)}/>
      <path d="M-24 28H24" stroke="#ffd23f" stroke-width="4"/>
      <path d="${star(18, -12, 6, 2.6)}" fill="#ffd23f" ${ol(1.2)}/>
      ${face(-2, 6, 30)}`),
    socks: () => svg('-56 -50 112 100', [[-24, -4, '#f383b0'], [22, 2, '#f383b0']].map(([x, y, c]) => {
      const d = 'M-12 -40H10V6Q10 12 16 14Q30 18 30 28Q30 40 16 40H-2Q-14 40 -14 28Z', id = uid('sk');
      return `<g transform="translate(${x} ${y}) scale(.9)"><clipPath id="${id}"><path d="${d}"/></clipPath>${body(d, '#fffaf0')}
      <g clip-path="url(#${id})" fill="${c}">${[-40, -26, -12].map(s => `<rect x="-20" y="${s}" width="40" height="7"/>`).join('')}<path d="M18 12Q34 18 32 34Q30 44 16 44L14 12Z"/></g>
      <path d="${d}" fill="none" ${ol()}/>${eye(6, 22, 3.4)}${blush(-4, 28, 3.6, 2.2)}${smile(1, 28, 3.4, '#5a2a22', 1.8)}</g>`;
    }).join('')),
  };

  // n copies of a picture laid out like dice; kind = 'ladybug' or any ITEMS key
  function group(n, kind = 'ladybug', badge = true) {
    const P = { 0: [], 1: [[50, 50, 66]], 2: [[26, 50, 46], [74, 50, 46]], 3: [[50, 28, 42], [26, 72, 42], [74, 72, 42]],
      4: [[27, 28, 40], [73, 28, 40], [27, 74, 40], [73, 74, 40]], 5: [[23, 24, 34], [77, 24, 34], [50, 50, 34], [23, 78, 34], [77, 78, 34]] }[n] || [];
    const one = kind === 'ladybug' ? ART.bug('ladybug') : ART.item(kind);
    const pics = P.map(([x, y, s]) => one.replace('<svg ', `<svg x="${f(x - s / 2)}" y="${f(y - s / 2)}" width="${s}" height="${s}" `)).join('');
    return svg('0 0 100 100', pics + (badge ? `<circle cx="89" cy="11" r="10.5" fill="#fff" ${ol(1.8)}/><text x="89" y="16.5" text-anchor="middle" font-family="'Baloo 2',sans-serif" font-weight="800" font-size="16" fill="${OL}">${n}</text>` : ''));
  }
  // big numeral with n dots under it (answer cards in maths)
  function numeral(n) {
    const dots = Array.from({ length: n }, (_, i) => `<circle cx="${f(50 + (i - (n - 1) / 2) * 15)}" cy="86" r="5.5" fill="#f6922b" ${ol(1.4)}/>`).join('');
    return svg('0 0 100 100', `<text x="50" y="66" text-anchor="middle" font-family="'Baloo 2',sans-serif" font-weight="800" font-size="74" fill="#4b9be3" stroke="${OL}" stroke-width="2.4" paint-order="stroke">${n}</text>${dots}`);
  }

  ART.item = kind => (ITEMS[kind] || ITEMS.star)();
  ART.items = Object.keys(ITEMS);
  ART.count = n => group(n);
  ART.group = group;
  ART.numeral = numeral;
})();
