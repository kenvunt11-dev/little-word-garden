/* More word pictures (people, school, zoo, home, food, clothes, beach…) + scene backgrounds.
 * Same picture-book style as art-items.js. Depends on art.js + art-items.js.
 *   ART.item(kind)        – all kinds below are added to the same registry
 *   ART.scene(name)       – background for the "look and point" picture (viewBox 0 0 400 260)
 */
(function () {
  'use strict';
  const { svg, uid, f, eye, blush, smile, leaf, star, light, dark } = ART._h;
  const { body, face, ell, shine, OL } = ART._i;
  const ln = (c, w = 1.8) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const line = (d, c, w = 2) => `<path d="${d}" fill="none" ${ln(c, w)}/>`;
  const V = '-50 -50 100 100';

  /* ---------- people ---------- */
  // o: { age: kid|adult|baby, skin, hair, hairStyle: short|pigtails|bun|long|curly|tuft, shirt, expr: happy|sad|angry|tired, focus: eyes|nose|mouth|ears, beard }
  function person(o = {}) {
    const age = o.age || 'kid', skin = o.skin || '#f6cfae', hair = o.hair || '#5a3a26', shirt = o.shirt || '#4b9be3';
    const R = age === 'adult' ? 24 : age === 'baby' ? 27 : 26, cy = age === 'adult' ? -14 : age === 'baby' ? -4 : -8;
    const hs = o.hairStyle || 'short';
    let back = '', front = '';
    if (hs === 'long') back = body(`M${-R - 6} ${cy}Q${-R - 8} ${cy + R + 26} ${-R + 4} ${cy + R + 30}H${R - 4}Q${R + 8} ${cy + R + 26} ${R + 6} ${cy}Q${R} ${cy - R - 8} 0 ${cy - R - 6}Q${-R} ${cy - R - 8} ${-R - 6} ${cy}Z`, hair, .5);
    if (hs === 'pigtails') back = body(ell(-R - 6, cy + 6, 9, 13), hair, .4) + body(ell(R + 6, cy + 6, 9, 13), hair, .4);
    if (hs === 'bun') back = body(ell(0, cy - R - 4, 12, 11), hair, .4);
    if (hs === 'curly') back = [-1, -.5, 0, .5, 1].map(k => body(ell(k * R * .9, cy - R * .75 + Math.abs(k) * 10, 12, 12), hair, .3)).join('');
    // shoulders / shirt
    const sh = age === 'adult' ? `M-36 50Q-36 ${cy + R + 14} 0 ${cy + R + 12}Q36 ${cy + R + 14} 36 50Z` : age === 'baby' ? `M-26 50Q-26 ${cy + R + 10} 0 ${cy + R + 8}Q26 ${cy + R + 10} 26 50Z` : `M-30 50Q-30 ${cy + R + 12} 0 ${cy + R + 10}Q30 ${cy + R + 12} 30 50Z`;
    let s = back + body(sh, shirt, .5) + `<path d="M-7 ${cy + R + 8}Q0 ${cy + R + 15} 7 ${cy + R + 8}" fill="none" ${ln(dark(shirt, .35), 1.6)}/>`;
    s += body(ell(-R + 1, cy + 3, 5, 7), skin, .2) + body(ell(R - 1, cy + 3, 5, 7), skin, .2); // ears
    s += body(ell(0, cy, R, R * .96), skin);
    // hair on top
    if (hs === 'tuft') front = `<path d="M-2 ${cy - R + 1}q-2 -9 5 -10q-5 4 -1 10" fill="${hair}" ${ln(dark(hair, .3), 1.2)}/>`;
    else if (hs !== 'none') {
      const fr = hs === 'curly' ? '' : `M${-R - 1} ${cy + 2}Q${-R - 2} ${cy - R - 4} 0 ${cy - R - 3}Q${R + 2} ${cy - R - 4} ${R + 1} ${cy + 2}Q${R - 4} ${cy - R * .5} ${R * .3} ${cy - R * .6}Q${R * .1} ${cy - R * .35} ${-R * .3} ${cy - R * .55}Q${-R * .7} ${cy - R * .55} ${-R - 1} ${cy + 2}Z`;
      if (fr) front = body(fr, hair, .4);
    }
    if (o.beard) front += body(`M${-R + 6} ${cy + 8}Q0 ${cy + R + 12} ${R - 6} ${cy + 8}Q${R - 8} ${cy + R - 2} 0 ${cy + R - 4}Q${-R + 8} ${cy + R - 2} ${-R + 6} ${cy + 8}Z`, hair, .3);
    s += front;
    // face
    const ex = R * .38, ey = cy + 2, er = age === 'baby' ? 4.6 : 4.2, e = o.expr || 'happy';
    if (e === 'tired') s += line(`M${-ex - 4} ${ey}q4 3 8 0M${ex - 4} ${ey}q4 3 8 0`, '#3b2a22', 2);
    else s += eye(-ex, ey, er) + eye(ex, ey, er);
    if (e === 'sad') s += line(`M${-ex - 6} ${ey - 9}l9 -3M${ex + 6} ${ey - 9}l-9 -3`, '#3b2a22', 1.8) + `<path d="M${-ex - 2} ${ey + 6}q-3 6 0 8q3 -2 0 -8z" fill="#7fc8f0"/>`;
    if (e === 'angry') s += line(`M${-ex - 7} ${ey - 10}l10 4M${ex + 7} ${ey - 10}l-10 4`, '#3b2a22', 2.2);
    s += blush(-R * .62, cy + 10, 4.6, 2.8) + blush(R * .62, cy + 10, 4.6, 2.8);
    if (e !== 'angry') s += `<ellipse cx="0" cy="${cy + 7}" rx="2.4" ry="1.8" fill="${dark(skin, .2)}"/>`;
    const my = cy + 14;
    s += e === 'sad' ? line(`M-6 ${my + 3}q6 -5 12 0`, '#7a2a22', 2)
      : e === 'angry' ? line(`M-6 ${my + 2}q6 -4 12 0`, '#7a2a22', 2.2) + `<ellipse cx="0" cy="${cy + 7}" rx="2.4" ry="1.8" fill="${dark(skin, .2)}"/>`
      : e === 'tired' ? `<ellipse cx="0" cy="${my + 1}" rx="4" ry="5" fill="#9c2f37"/><text x="${R + 2}" y="${cy - R + 6}" font-family="'Baloo 2',sans-serif" font-weight="800" font-size="14" fill="#4b9be3">z</text><text x="${R + 10}" y="${cy - R - 4}" font-family="'Baloo 2',sans-serif" font-weight="800" font-size="18" fill="#4b9be3">Z</text>`
      : `<path d="M-7 ${my - 1}Q0 ${my + 8} 7 ${my - 1}Z" fill="#9c2f37" ${ln('#7a2a22', 1.4)}/><path d="M-4 ${my + 2}q4 3 8 0" fill="#f07a8c"/>`;
    if (age === 'baby') s += `<circle cx="0" cy="${my + 1}" r="5" fill="#f383b0" ${ln('#c95a88', 1.4)}/><circle cx="0" cy="${my + 1}" r="2" fill="#fff"/>`;
    if (o.focus) {
      const F = { eyes: [0, ey, R * .85, 9], nose: [0, cy + 7, 8, 7], mouth: [0, my + 1, 12, 8], ears: [R - 1, cy + 3, 9, 11] }[o.focus];
      s += `<ellipse cx="${f(F[0])}" cy="${f(F[1])}" rx="${f(F[2])}" ry="${f(F[3])}" fill="none" stroke="#ffd23f" stroke-width="3.6" stroke-dasharray="5 4"/>`;
    }
    return svg(V, s);
  }

  const P = {
    boy: () => person({ hair: '#5a3a26', shirt: '#4b9be3' }),
    girl: () => person({ hair: '#7a3e22', hairStyle: 'pigtails', shirt: '#f383b0' }),
    baby: () => person({ age: 'baby', hairStyle: 'tuft', hair: '#e0a65a', shirt: '#fff1a8', skin: '#fbd9bd' }),
    mom: () => person({ age: 'adult', hairStyle: 'long', hair: '#6b3a24', shirt: '#9b6bd6' }),
    dad: () => person({ age: 'adult', hair: '#3b2a22', shirt: '#3fae5a', skin: '#e9b48e' }),
    brother: () => person({ hairStyle: 'curly', hair: '#2f2a28', shirt: '#f6922b', skin: '#c98d62' }),
    sister: () => person({ hairStyle: 'bun', hair: '#2f2a28', shirt: '#ec4b3c', skin: '#c98d62' }),
    grandma: () => person({ age: 'adult', hairStyle: 'bun', hair: '#d8d4cf', shirt: '#f383b0' }),
    happy: () => person({ hair: '#7a3e22', hairStyle: 'pigtails', shirt: '#ffd23f', expr: 'happy' }),
    sad: () => person({ hair: '#5a3a26', shirt: '#4b9be3', expr: 'sad' }),
    angry: () => person({ hairStyle: 'curly', hair: '#2f2a28', shirt: '#ec4b3c', skin: '#c98d62', expr: 'angry' }),
    tired: () => person({ hairStyle: 'bun', hair: '#e0a65a', shirt: '#9b6bd6', expr: 'tired' }),
  };

  const SK = '#f6cfae';
  const I = {
    /* ---- school ---- */
    book: () => svg(V, `${body('M-48 -24Q-24 -32 0 -24Q24 -32 48 -24V32Q24 24 0 32Q-24 24 -48 32Z', '#3f8fd6')}
      ${body('M-44 -26Q-22 -32 0 -24V28Q-22 22 -44 28Z', '#fffaf1', .3)}${body('M44 -26Q22 -32 0 -24V28Q22 22 44 28Z', '#fffaf1', .3)}
      ${[-14, -4, 6].map(y => line(`M-36 ${y}Q-20 ${y - 4} -8 ${y}`, '#c9bfae', 1.6)).join('')}
      ${face(22, 0, 26)}`),
    pencil: () => svg(V, `<g transform="rotate(-35)">${body('M-36 -9H24V9H-36Z', '#f6c12a', .4)}
      ${body('M24 -9L44 0L24 9Z', '#f3d2a2', .2)}<path d="M37 -3L44 0L37 3Z" fill="#3b2a22"/>
      ${body('M-48 -9H-40V9H-48Z', '#f383b0', .2)}${body('M-40 -9H-34V9H-40Z', '#b9c2cc', .2)}
      ${face(-6, -1, 18)}</g>`),
    crayon: () => svg(V, `<g transform="rotate(35)">${body('M-44 -10H22V10H-44Z', '#ec4b3c', .4)}
      ${body('M-30 -10H8V10H-30Z', '#ffb3a8', .2)}${body('M22 -8Q40 -6 44 0Q40 6 22 8Z', '#ec4b3c', .2)}
      ${face(-11, -1, 18)}</g>`),
    ruler: () => svg(V, `<g transform="rotate(-18)">${body('M-48 -13H48V13H-48Z', '#8cc63e', .4)}
      ${Array.from({ length: 11 }, (_, i) => line(`M${-42 + i * 8.4} -13v${i % 2 ? 6 : 10}`, '#4f7a22', 1.6)).join('')}
      ${face(0, 3, 18)}</g>`),
    /* ---- zoo ---- */
    lion: () => svg(V, `${Array.from({ length: 12 }, (_, i) => `<g transform="rotate(${i * 30})">${body(ell(0, -32, 13, 16), '#d9772f', .3)}</g>`).join('')}
      ${body(ell(-24, -24, 8, 8), '#f6c15a', .3)}${body(ell(24, -24, 8, 8), '#f6c15a', .3)}
      ${body(ell(0, 0, 30, 29), '#f6c15a')}${body(ell(0, 12, 14, 10), '#fff1d6', .3)}
      <path d="M-5 6h10l-5 5z" fill="#7a3e22"/>${line('M0 11v4M-6 16q6 4 12 0', '#7a3e22', 1.8)}
      ${eye(-11, -4, 5)}${eye(11, -4, 5)}${blush(-20, 6, 5, 3)}${blush(20, 6, 5, 3)}`),
    elephant: () => svg(V, `${body(ell(-32, -6, 20, 24), '#a9b4c2', .4)}${body(ell(32, -6, 20, 24), '#a9b4c2', .4)}
      <ellipse cx="-32" cy="-4" rx="12" ry="15" fill="#f4b9c4"/><ellipse cx="32" cy="-4" rx="12" ry="15" fill="#f4b9c4"/>
      ${body(ell(0, -8, 26, 26), '#b8c2cf')}
      ${body('M-9 4Q-10 30 -2 40Q4 46 12 40Q8 36 6 30Q8 18 9 4Z', '#b8c2cf', .3)}
      <path d="M-16 12q-4 8 2 10M16 12q4 8 -2 10" fill="#fffaf0" ${ln('#c9c2b6', 1.4)}/>
      ${eye(-10, -10, 4.6)}${eye(10, -10, 4.6)}${blush(-18, 2, 4.4, 2.6)}${blush(18, 2, 4.4, 2.6)}`),
    giraffe: () => svg(V, `${body('M-8 -2H10V50H-8Z', '#f6c15a', .4)}
      ${[[0, 10, 4], [-2, 26, 5], [4, 40, 4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#c9853a"/>`).join('')}
      ${line('M-8 -18v-14M8 -18v-14', '#c9853a', 3.4)}<circle cx="-8" cy="-33" r="4" fill="#c9853a"/><circle cx="8" cy="-33" r="4" fill="#c9853a"/>
      ${body(ell(-20, -18, 8, 4.4), '#f6c15a', .2)}${body(ell(20, -18, 8, 4.4), '#f6c15a', .2)}
      ${body(ell(0, -14, 18, 17), '#f6c15a')}${body(ell(0, 0, 12, 8), '#f3dcb0', .3)}
      <circle cx="-12" cy="-24" r="3" fill="#c9853a"/><circle cx="13" cy="-8" r="2.6" fill="#c9853a"/>
      <circle cx="-4" cy="0" r="1.4" fill="#7a3e22"/><circle cx="4" cy="0" r="1.4" fill="#7a3e22"/>
      ${eye(-7, -16, 3.8)}${eye(7, -16, 3.8)}${smile(0, 4, 3, '#7a3e22', 1.6)}`),
    monkey: () => svg(V, `${body(ell(-30, -2, 11, 11), '#a86b3c', .3)}${body(ell(30, -2, 11, 11), '#a86b3c', .3)}
      <circle cx="-30" cy="-2" r="6" fill="#f3d2a8"/><circle cx="30" cy="-2" r="6" fill="#f3d2a8"/>
      ${body(ell(0, -4, 28, 27), '#a86b3c')}
      ${body('M0 -12Q-6 -26 -16 -18Q-26 -8 -18 6Q-14 22 0 22Q14 22 18 6Q26 -8 16 -18Q6 -26 0 -12Z', '#f3d2a8', .3)}
      ${eye(-8, -6, 4.6)}${eye(8, -6, 4.6)}<circle cx="-2.5" cy="4" r="1.3" fill="#7a3e22"/><circle cx="2.5" cy="4" r="1.3" fill="#7a3e22"/>
      ${line('M-8 11q8 7 16 0', '#7a3e22', 2)}${blush(-14, 8, 4, 2.4)}${blush(14, 8, 4, 2.4)}
      ${line('M-4 -30q4 -8 10 -4', '#7a4a26', 2.4)}`),
    /* ---- toys & pets ---- */
    doll: () => svg(V, `${body('M-26 50L-16 14H16L26 50Z', '#f383b0', .4)}${line('M-20 34H20', '#fff', 2.4)}
      ${person({ hairStyle: 'pigtails', hair: '#f6c12a', shirt: '#f383b0', skin: '#fbd9bd' }).replace(/^<svg[^>]*>|<\/svg>$/g, '').replace(/^/, '<g transform="translate(0 -10) scale(.78)">') + '</g>'}`),
    rabbit: () => svg(V, `${body('M-14 -18Q-22 -50 -12 -50Q-4 -50 -4 -20Z', '#fffaf0', .3)}${body('M14 -18Q22 -50 12 -50Q4 -50 4 -20Z', '#fffaf0', .3)}
      <path d="M-12 -22Q-16 -44 -11 -44Q-7 -44 -7 -22Z M12 -22Q16 -44 11 -44Q7 -44 7 -22Z" fill="#f6b5c4"/>
      ${body(ell(0, 32, 22, 16), '#fffaf0', .4)}${body(ell(0, 2, 26, 22), '#fffaf0')}
      ${eye(-10, -2, 4.6)}${eye(10, -2, 4.6)}<path d="M-3 6h6l-3 3z" fill="#f383b0"/>
      ${line('M0 9v3M-5 13q5 3 10 0', '#7a3e22', 1.6)}<rect x="-3" y="13" width="6" height="5" rx="1" fill="#fff" ${ln('#c9c2b6', 1)}/>
      ${blush(-18, 8, 4.6, 2.8)}${blush(18, 8, 4.6, 2.8)}${line('M-12 8h-12M-12 11l-11 3M12 8h12M12 11l11 3', '#c9c2b6', 1.2)}`),
    robot: () => svg(V, `${line('M0 -36v-10', '#6b7a8a', 3)}<circle cx="0" cy="-47" r="4.5" fill="#ec4b3c"/>
      ${body('M-26 -36H26V-4H-26Z', '#9fc7e6', .4)}${body('M-20 -30H20V-10H-20Z', '#2f4a63', .2)}
      <circle cx="-9" cy="-21" r="4" fill="#7fe0ea"/><circle cx="9" cy="-21" r="4" fill="#7fe0ea"/>${line('M-5 -14q5 3 10 0', '#7fe0ea', 2)}
      ${body('M-22 0H22V36H-22Z', '#b9d6ee', .4)}
      <circle cx="-8" cy="12" r="4" fill="#f6c12a"/><circle cx="8" cy="12" r="4" fill="#ec4b3c"/><rect x="-10" y="22" width="20" height="5" rx="2" fill="#5cbf4a"/>
      ${line('M-22 8L-38 20M22 8L38 20', '#6b7a8a', 5)}<circle cx="-39" cy="21" r="5" fill="#9fc7e6"/><circle cx="39" cy="21" r="5" fill="#9fc7e6"/>
      ${line('M-10 36v10M10 36v10', '#6b7a8a', 5)}`),
    rocket: () => svg(V, `<path d="M-8 30Q0 52 8 30Z" fill="#ffd23f"/><path d="M-4 30Q0 42 4 30Z" fill="#f6922b"/>
      ${body('M-18 14L-30 30H-14Z', '#ec4b3c', .2)}${body('M18 14L30 30H14Z', '#ec4b3c', .2)}
      ${body('M0 -48Q22 -26 18 30H-18Q-22 -26 0 -48Z', '#f4f8fb')}${body('M0 -48Q12 -36 15 -26H-15Q-12 -36 0 -48Z', '#ec4b3c', .2)}
      ${body(ell(0, -4, 12, 12), '#7fd3f7', .3)}${face(0, -4, 18)}`),
    /* ---- home ---- */
    bed: () => svg(V, `${body('M-46 -22H-36V36H-46Z', '#c98a4b', .3)}${body('M36 0H46V36H36Z', '#c98a4b', .3)}
      ${body('M-36 8H40V24H-36Z', '#fffaf1', .3)}${body('M-12 4H40V26H-12Z', '#4b9be3', .3)}
      ${[0, 10, 20, 30].map(x => `<circle cx="${x - 2}" cy="15" r="2" fill="#bfe6f7"/>`).join('')}
      ${body(ell(-24, 2, 13, 8), '#fff1c9', .2)}${face(-24, 1, 14)}${line('M-36 24H40', '#a86b3c', 2)}`),
    chair: () => svg(V, `${body('M-22 -44H22V2H-22Z', '#e39a4b', .4)}${body('M-28 2H28V12H-28Z', '#c9853a', .3)}
      ${line('M-24 12V46M24 12V46', '#a86b3c', 6)}${face(0, -22, 26)}`),
    table: () => svg(V, `${body('M-48 -12H48V-2H-48Z', '#c9853a', .3)}${body('M-42 -2H42V8H-42Z', '#e39a4b', .3)}
      ${line('M-36 8V44M36 8V44', '#a86b3c', 6)}
      ${body('M-8 -28H8V-12H-8Z', '#fff', .2)}<path d="M8 -24q7 0 6 6q-1 4 -6 4" fill="none" ${ln('#c9c2b6', 2)}/>
      ${face(0, 2, 20)}`),
    lamp: () => svg(V, `<circle cx="0" cy="-12" r="34" fill="#fff3a6" opacity=".45"/>
      ${line('M0 0V36', '#8a6a52', 4)}${body(ell(0, 40, 20, 6), '#8a6a52', .3)}
      ${body('M-24 4L-14 -36H14L24 4Z', '#ffd23f')}${face(0, -14, 24)}`),
    /* ---- vegetables ---- */
    carrot: () => svg(V, `${[-30, 0, 30].map(a => leaf(0, -28, a, 26, '#5bb04a', '#3f8f3a')).join('')}
      ${body('M-18 -28Q0 -34 18 -28Q8 20 2 46Q-2 50 -4 44Q-12 18 -18 -28Z', '#f6922b')}
      ${line('M-12 -6h6M6 8h6M-6 22h5', '#d8721a', 2)}${face(0, -14, 22)}`),
    tomato: () => svg(V, `${body('M0 -26C30 -30 46 -8 42 10C38 34 18 42 0 42C-18 42 -38 34 -42 10C-46 -8 -30 -30 0 -26Z', '#ec4b3c')}
      ${[-60, -20, 20, 60, 180].map(a => leaf(0, -26, a + (a === 180 ? 0 : 0), a === 180 ? 0 : 16, '#4a9a3a')).join('')}
      <path d="M0 -26v-10" stroke="#4a9a3a" stroke-width="4" stroke-linecap="round"/>${shine('M-30 -6Q-28 -18 -16 -22')}${face(0, 6, 36)}`),
    potato: () => svg(V, `${body('M-40 -6C-42 -26 -14 -34 8 -30C34 -28 46 -12 42 8C38 30 10 36 -10 32C-30 28 -38 14 -40 -6Z', '#d6a56a')}
      ${[[-26, -12], [24, -16], [30, 14], [-22, 20], [6, -24]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.8" fill="#a8783e"/>`).join('')}${face(0, 2, 34)}`),
    corn: () => svg(V, `${body('M-6 -46Q16 -40 16 0Q16 36 0 46Q-16 36 -16 0Q-16 -40 -6 -46Z', '#ffd23f')}
      ${Array.from({ length: 7 }, (_, r) => [-8, 0, 8].map(x => `<ellipse cx="${x}" cy="${-34 + r * 11}" rx="3.4" ry="4" fill="#f6b31f"/>`).join('')).join('')}
      ${body('M-4 46Q-34 30 -30 -12Q-20 10 -6 22Z', '#6cc04a', .3)}${body('M4 46Q34 30 30 -12Q20 10 6 22Z', '#5bb04a', .3)}
      ${face(0, -10, 22)}`),
    /* ---- beach ---- */
    shell: () => svg(V, `${body('M0 38L-40 -4Q-30 -40 0 -42Q30 -40 40 -4Z', '#f7b5a0')}
      ${[-30, -15, 0, 15, 30].map(x => line(`M0 36L${x} -38`, '#e08a74', 2)).join('')}${body('M-10 38H10L6 46H-6Z', '#f39a84', .2)}${face(0, 2, 26)}`),
    crab: () => svg(V, `${[-1, 1].map(k => `${line(`M${k * 20} 10L${k * 40} 22M${k * 22} 16L${k * 38} 32M${k * 18} 20L${k * 30} 38`, '#d8452b', 3)}
      ${line(`M${k * 24} -2Q${k * 38} -10 ${k * 36} -24`, '#e8563a', 4)}${body(`M${k * 36} -24Q${k * 50} -32 ${k * 44} -44Q${k * 36} -40 ${k * 38} -34Q${k * 28} -38 ${k * 30} -28Z`, '#e8563a', .3)}`).join('')}
      ${line('M-8 -12V-26M8 -12V-26', '#d8452b', 3)}<circle cx="-8" cy="-28" r="6" fill="#fff" ${ln('#c9c2b6', 1.2)}/><circle cx="8" cy="-28" r="6" fill="#fff" ${ln('#c9c2b6', 1.2)}/>
      <circle cx="-7" cy="-28" r="3.4" fill="#2a1913"/><circle cx="9" cy="-28" r="3.4" fill="#2a1913"/>
      ${body(ell(0, 4, 30, 20), '#e8563a')}${blush(-16, 8, 5, 3)}${blush(16, 8, 5, 3)}${smile(0, 6, 6, '#7a2a22', 2.2)}`),
    bucket: () => svg(V, `<path d="M-30 -18Q0 -54 30 -18" fill="none" ${ln('#2f6fb0', 3)}/>
      ${body('M-34 -20H34L26 42H-26Z', '#4b9be3')}${body(ell(0, -20, 34, 7), '#f3d58a', .2)}
      ${body('M-34 -6H34L33 2H-33Z', '#ffd23f', .2)}${face(0, 18, 28)}`),
    /* ---- lunch ---- */
    cake: () => svg(V, `<path d="M0 -40q5 -6 0 -12q-5 6 0 12z" fill="#ffb347"/>${line('M0 -38V-24', '#4b9be3', 4)}
      ${body('M-40 6H40V40H-40Z', '#f6a5b8', .4)}${body('M-30 -24H30V6H-30Z', '#fff1d6', .4)}
      ${body('M-32 -24H32V-18Q24 -12 18 -18Q10 -10 2 -18Q-6 -10 -14 -18Q-22 -12 -32 -18Z', '#fff', .2)}
      ${body('M-42 6H42V12Q30 20 20 12Q8 22 -4 12Q-16 20 -28 12Q-36 18 -42 12Z', '#ec4b80', .2)}
      <circle cx="14" cy="-28" r="5" fill="#ec4b3c"/>${face(0, 26, 24)}`),
    icecream: () => svg(V, `${body('M-18 4L0 48L18 4Z', '#e9b66b', .3)}${line('M-12 12l18 18M-4 6l16 16M12 12l-18 18M4 6l-16 16', '#c98a3a', 1.4)}
      ${body(ell(-10, -6, 15, 13), '#7a4a26', .3)}${body(ell(10, -8, 15, 13), '#f6a5b8', .3)}${body(ell(0, -24, 16, 14), '#fff1d6', .3)}
      <circle cx="2" cy="-40" r="5" fill="#ec4b3c"/>${face(0, -22, 18)}`),
    juice: () => svg(V, `${line('M8 -36L18 -50', '#ec4b80', 4)}
      ${body('M-24 -36H24L18 44H-18Z', '#dff3fb', .2)}${body('M-22 -18H22L17 42H-17Z', '#f6922b', .3)}
      ${body(ell(-22, -34, 12, 12), '#ffd23f', .2)}${face(0, 10, 26)}`),
    pizza: () => svg(V, `${body('M-40 -30Q0 -44 40 -30L0 44Z', '#ffd27a')}${body('M-42 -32Q0 -48 42 -32L40 -24Q0 -38 -40 -24Z', '#d6943f', .2)}
      ${[[-16, -16], [16, -18], [0, 10], [-4, -26]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#e8463a" ${ln('#b5221d', 1.2)}/>`).join('')}
      ${eye(-8, -4, 3.6)}${eye(8, -4, 3.6)}${smile(0, 2, 4, '#7a2a22', 1.8)}`),
  };

  /* ---------- scene backgrounds for "look and point" (viewBox 0 0 400 260) ---------- */
  const hillBG = (sky1, sky2, g1, g2) => `<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky1}"/><stop offset="1" stop-color="${sky2}"/></linearGradient></defs><rect width="400" height="260" fill="url(#sk)"/>`
    + `<path d="M0 150Q100 110 200 140T400 120V260H0Z" fill="${g1}"/><path d="M0 190Q120 160 260 185T400 175V260H0Z" fill="${g2}"/>`;
  const cloud = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".95"><circle cx="0" cy="0" r="14"/><circle cx="16" cy="-6" r="18"/><circle cx="34" cy="0" r="13"/><rect x="-6" y="0" width="46" height="12" rx="6"/></g>`;
  const SC = {
    meadow: () => hillBG('#7cc4ee', '#c9ecf7', '#a9d86a', '#8cc63e') + cloud(40, 40, 1) + cloud(290, 30, .8) + `<circle cx="350" cy="50" r="22" fill="#ffd23f"/>`,
    farm: () => hillBG('#7cc4ee', '#c9ecf7', '#b8dc6a', '#8cc63e') + cloud(60, 36, .9) + `<g transform="translate(300 96)"><path d="M0 40V0L30 -24L60 0V40Z" fill="#d9452b"/><path d="M-4 2L30 -28L64 2" fill="none" stroke="#fff" stroke-width="5"/><rect x="20" y="14" width="20" height="26" fill="#fff"/><path d="M20 14l20 26M40 14l-20 26" stroke="#d9452b" stroke-width="3"/></g>` + Array.from({ length: 16 }, (_, i) => `<path d="M${i * 26} 168v14M${i * 26} 172h26" stroke="#e9d3a8" stroke-width="4"/>`).join(''),
    zoo: () => hillBG('#8fd0f2', '#e6f5ee', '#d9c97a', '#b8c96a') + `<g transform="translate(330 70)"><rect x="-6" y="20" width="12" height="70" fill="#8a5a2a"/><ellipse cx="0" cy="14" rx="60" ry="18" fill="#6cae4a"/><ellipse cx="-10" cy="2" rx="40" ry="12" fill="#7fbf5a"/></g><circle cx="60" cy="50" r="24" fill="#ffd23f"/><path d="M120 150q30 -20 60 0q-30 10 -60 0z" fill="#7fd3f7"/>`,
    room: () => `<rect width="400" height="260" fill="#fde6c8"/><rect y="0" width="400" height="180" fill="#ffe9d6"/>${Array.from({ length: 10 }, (_, i) => `<rect x="${i * 40}" y="0" width="20" height="180" fill="#fff3e4"/>`).join('')}<rect y="180" width="400" height="80" fill="#e0b07a"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 52} 180v80" stroke="#c9955a" stroke-width="2"/>`).join('')}<rect x="300" y="30" width="70" height="60" rx="6" fill="#bfe6f7" stroke="#fff" stroke-width="6"/><path d="M335 30v60M300 60h70" stroke="#fff" stroke-width="4"/>`,
    school: () => `<rect width="400" height="260" fill="#fff3d6"/><rect y="190" width="400" height="70" fill="#c9e3a8"/><rect x="40" y="22" width="220" height="100" rx="8" fill="#2f6b4a" stroke="#c98a4b" stroke-width="8"/><text x="70" y="70" font-family="'Baloo 2',sans-serif" font-weight="800" font-size="30" fill="#fff" opacity=".85">A B C</text><text x="70" y="104" font-family="'Baloo 2',sans-serif" font-weight="800" font-size="24" fill="#ffd23f" opacity=".85">1 2 3</text><rect x="290" y="30" width="80" height="60" rx="6" fill="#bfe6f7" stroke="#fff" stroke-width="6"/>`,
    kitchen: () => `<rect width="400" height="260" fill="#e6f4f1"/>${Array.from({ length: 12 }, (_, i) => `<rect x="${i * 34}" y="0" width="34" height="34" fill="none" stroke="#fff" stroke-width="2"/>`).join('')}<rect y="170" width="400" height="90" fill="#f3d5a8"/><rect y="164" width="400" height="12" fill="#e0b07a"/><path d="M0 214h400" stroke="#e8c690" stroke-width="2"/>`,
    beach: () => `<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fc0ee"/><stop offset="1" stop-color="#bfe6f7"/></linearGradient></defs><rect width="400" height="260" fill="url(#sk)"/><circle cx="340" cy="46" r="24" fill="#ffd23f"/>${cloud(50, 40, .8)}<path d="M0 120H400V170H0Z" fill="#3f9ad6"/><path d="M0 120q20 -6 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" fill="#7fd3f7"/><path d="M0 160Q200 140 400 160V260H0Z" fill="#f3d58a"/>`,
    town: () => hillBG('#8fd0f2', '#d8f0f8', '#a9d86a', '#9aa3ad') + `${[[20, 60, 50, '#f6922b'], [80, 40, 44, '#4b9be3'], [300, 50, 46, '#f383b0'], [350, 70, 40, '#5cbf4a']].map(([x, h, w, c]) => `<rect x="${x}" y="${150 - h - 30}" width="${w}" height="${h + 30}" fill="${c}" opacity=".85"/>${[0, 1].map(r => `<rect x="${x + 8}" y="${150 - h - 20 + r * 24}" width="10" height="12" fill="#fff"/><rect x="${x + w - 18}" y="${150 - h - 20 + r * 24}" width="10" height="12" fill="#fff"/>`).join('')}`).join('')}<path d="M0 214H400" stroke="#fff" stroke-width="4" stroke-dasharray="20 16"/><path d="M0 120Q200 112 400 120V150H0Z" fill="#7fd3f7" opacity=".7"/>`,
    night: () => `<rect width="400" height="260" fill="#26305e"/>${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 97) % 400}" cy="${(i * 53) % 150}" r="${1 + (i % 3)}" fill="#fff" opacity=".8"/>`).join('')}<path d="M0 200Q120 170 260 195T400 185V260H0Z" fill="#3f5a8a"/>`,
    garden: () => hillBG('#7cc4ee', '#c9ecf7', '#b8dc6a', '#7fbf4a') + Array.from({ length: 14 }, (_, i) => `<g transform="translate(${15 + i * 28} ${200 + (i % 3) * 14})"><path d="M0 0v-16" stroke="#3f8f4a" stroke-width="2"/><circle cy="-18" r="5" fill="${['#f383b0', '#ffd23f', '#fff', '#9b6bd6'][i % 4]}"/></g>`).join(''),
    blank: () => `<rect width="400" height="260" fill="#fffaf1"/>`,
  };
  ART.scene = name => svg('0 0 400 260', (SC[name] || SC.meadow)(), 'preserveAspectRatio="xMidYMid slice"');

  ART.addItems(Object.assign({}, P, I));
  ART.person = person;
})();
