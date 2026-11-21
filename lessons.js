/* ============================================================
 *  LESSONS – edit this file to add or change lessons.
 *  Every lesson runs the same 5 steps:
 *    1 Learn (meet each word)  2 Find (tap the right picture)
 *    3 Catch (game)            4 Say it (speak)   5 Sticker
 *  To add a lesson: add the words to WORDS, then add one line to LESSONS.
 *  Pictures available: ART.items (see art-items.js) + insects in art.js.
 * ============================================================ */
(function () {
  'use strict';
  const C = { red: '#ec4b3c', yellow: '#f6c12a', blue: '#4b9be3', pink: '#f383b0', green: '#5cbf4a', purple: '#9b6bd6', orange: '#f28a2b' };
  const bug = k => () => ART.bug(k, C.pink);
  const item = k => () => ART.item(k);

  /* kind: noun | color | number
   * name: what Miss Bloom says.  a: "a bee" / "an apple".  alias: words the microphone may hear instead. */
  const WORDS = {
    // garden insects
    butterfly: { name: 'butterfly', art: bug('butterfly'), alias: ['butterfly', 'butter fly', 'butterflies', 'butter'] },
    bee: { name: 'bee', art: bug('bee'), alias: ['bee', 'bees', 'be', 'b', 'bea', 'bi', 'beep'] },
    ladybug: { name: 'ladybug', art: bug('ladybug'), alias: ['ladybug', 'lady bug', 'ladybird', 'lady bird', 'lady'] },
    snail: { name: 'snail', art: bug('snail'), alias: ['snail', 'snails', 'nail', 'snell', 'snake'] },
    caterpillar: { name: 'caterpillar', art: bug('caterpillar'), alias: ['caterpillar', 'cater pillar', 'catapillar', 'pillar'] },
    dragonfly: { name: 'dragonfly', art: bug('dragonfly'), alias: ['dragonfly', 'dragon fly', 'dragon'] },
    // colours (shown as butterflies)
    red: { kind: 'color', name: 'red', art: () => ART.bug('butterfly', C.red), alias: ['red', 'read', 'rad', 'bread', 'wed'] },
    yellow: { kind: 'color', name: 'yellow', art: () => ART.bug('butterfly', C.yellow), alias: ['yellow', 'yello', 'jello', 'yell'] },
    blue: { kind: 'color', name: 'blue', art: () => ART.bug('butterfly', C.blue), alias: ['blue', 'blew', 'blu', 'glue', 'boo'] },
    pink: { kind: 'color', name: 'pink', art: () => ART.bug('butterfly', C.pink), alias: ['pink', 'ping', 'pinky'] },
    green: { kind: 'color', name: 'green', art: () => ART.bug('butterfly', C.green), alias: ['green', 'grin', 'queen', 'clean'] },
    // numbers
    one: { kind: 'number', n: 1, name: 'one', art: () => ART.count(1), alias: ['one', 'won', '1', 'wan', 'juan'] },
    two: { kind: 'number', n: 2, name: 'two', art: () => ART.count(2), alias: ['two', 'to', 'too', '2', 'tu'] },
    three: { kind: 'number', n: 3, name: 'three', art: () => ART.count(3), alias: ['three', 'tree', 'free', '3', 'sri'] },
    four: { kind: 'number', n: 4, name: 'four', art: () => ART.count(4), alias: ['four', 'for', '4', 'fore'] },
    five: { kind: 'number', n: 5, name: 'five', art: () => ART.count(5), alias: ['five', '5', 'fife', 'fire'] },
    // fruit
    apple: { name: 'apple', a: 'an apple', art: item('apple'), alias: ['apple', 'apples', 'appo', 'apo'] },
    banana: { name: 'banana', art: item('banana'), alias: ['banana', 'bananas', 'nana'] },
    orange: { name: 'orange', a: 'an orange', art: item('orange'), alias: ['orange', 'orang', 'oranges'] },
    strawberry: { name: 'strawberry', art: item('strawberry'), alias: ['strawberry', 'straw berry', 'strawberries', 'berry'] },
    // pets
    cat: { name: 'cat', art: item('cat'), alias: ['cat', 'cats', 'kat', 'cap', 'kitty'] },
    dog: { name: 'dog', art: item('dog'), alias: ['dog', 'dogs', 'dock', 'doggy', 'dark'] },
    fish: { name: 'fish', art: item('fish'), alias: ['fish', 'fishes', 'fis', 'fit'] },
    bird: { name: 'bird', art: item('bird'), alias: ['bird', 'birds', 'bert', 'burt', 'word'] },
    // farm
    cow: { name: 'cow', art: item('cow'), alias: ['cow', 'cows', 'cal', 'how', 'now'] },
    pig: { name: 'pig', art: item('pig'), alias: ['pig', 'pigs', 'big', 'peg'] },
    duck: { name: 'duck', art: item('duck'), alias: ['duck', 'ducks', 'dock', 'doc', 'tuck'] },
    sheep: { name: 'sheep', art: item('sheep'), alias: ['sheep', 'ship', 'cheap', 'sip'] },
    // toys
    ball: { name: 'ball', art: item('ball'), alias: ['ball', 'balls', 'bowl', 'bol', 'baby'] },
    balloon: { name: 'balloon', art: item('balloon'), alias: ['balloon', 'balloons', 'baloon', 'blue moon', 'loon'] },
    kite: { name: 'kite', art: item('kite'), alias: ['kite', 'kites', 'kate', 'night', 'light'] },
    teddy: { name: 'teddy bear', art: item('teddy'), alias: ['teddy', 'teddy bear', 'bear', 'ready'] },
    // things that go
    car: { name: 'car', art: item('car'), alias: ['car', 'cars', 'ka', 'call', 'caught'] },
    bus: { name: 'bus', art: item('bus'), alias: ['bus', 'buses', 'bass', 'boss', 'bath'] },
    boat: { name: 'boat', art: item('boat'), alias: ['boat', 'boats', 'bot', 'both', 'vote'] },
    plane: { name: 'plane', art: item('plane'), alias: ['plane', 'airplane', 'plain', 'play'] },
    // sky
    sun: { name: 'sun', art: item('sun'), alias: ['sun', 'son', 'some', 'sunny'] },
    moon: { name: 'moon', art: item('moon'), alias: ['moon', 'moons', 'mun', 'noon'] },
    star: { name: 'star', art: item('star'), alias: ['star', 'stars', 'start', 'stop'] },
    rainbow: { name: 'rainbow', art: item('rainbow'), alias: ['rainbow', 'rain bow', 'rain'] },
    // my body
    head: { name: 'head', art: item('head'), alias: ['head', 'heads', 'had', 'hed', 'bed', 'ted', 'hid'] },
    hand: { name: 'hand', art: item('hand'), alias: ['hand', 'hands', 'and', 'han', 'end', 'hen', 'hunt'] },
    eyes: { name: 'eyes', a: 'a pair of eyes', art: item('eyes'), alias: ['eyes', 'eye', 'i', 'ice', 'ayes', 'iris', 'eyes'] },
    nose: { name: 'nose', art: item('nose'), alias: ['nose', 'noses', 'knows', 'no', 'nos', 'rose', 'those'] },
    // clothes
    hat: { name: 'hat', art: item('hat'), alias: ['hat', 'hats', 'had', 'at', 'hot', 'that', 'hut'] },
    shoes: { name: 'shoes', a: 'a pair of shoes', art: item('shoes'), alias: ['shoes', 'shoe', 'shoos', 'choose', 'juice', 'shoot', 'sues'] },
    shirt: { name: 'shirt', art: item('shirt'), alias: ['shirt', 'shirts', 'short', 'shut', 'sure', 'shirty'] },
    socks: { name: 'socks', a: 'a pair of socks', art: item('socks'), alias: ['socks', 'sock', 'sox', 'sacks', 'sax', 'soaks'] },
  };

  /* type 'words' (default) or 'math'.
   * math: op '+' or '-', thing = picture used for counting, sums = [a, b] questions (answers 1..5). */
  const LESSONS = [
    { id: 'garden',  title: 'Garden friends', vi: 'Bạn trong vườn', icon: 'butterfly', words: ['butterfly', 'bee', 'ladybug'] },
    { id: 'colors',  title: 'Colors',         vi: 'Màu sắc',        icon: 'red',       words: ['red', 'yellow', 'blue', 'pink'] },
    { id: 'fruit',   title: 'Yummy fruit',    vi: 'Trái cây',       icon: 'apple',     words: ['apple', 'banana', 'orange', 'strawberry'] },
    { id: 'numbers', title: 'Numbers',        vi: 'Số 1–5',         icon: 'three',     words: ['one', 'two', 'three', 'four', 'five'] },
    { id: 'pets',    title: 'My pets',        vi: 'Thú cưng',       icon: 'cat',       words: ['cat', 'dog', 'fish', 'bird'] },
    { id: 'bugs',    title: 'Little bugs',    vi: 'Côn trùng nhỏ',  icon: 'snail',     words: ['snail', 'caterpillar', 'dragonfly', 'green'] },
    { id: 'plus',    title: 'Add it up',      vi: 'Phép cộng',      type: 'math', op: '+', thing: 'apple', sums: [[1, 1], [2, 1], [1, 2], [2, 2], [3, 1], [3, 2]] },
    { id: 'farm',    title: 'On the farm',    vi: 'Nông trại',      icon: 'pig',       words: ['cow', 'pig', 'duck', 'sheep'] },
    { id: 'toys',    title: 'Toy box',        vi: 'Đồ chơi',        icon: 'teddy',     words: ['ball', 'balloon', 'kite', 'teddy'] },
    { id: 'minus',   title: 'Take away',      vi: 'Phép trừ',       type: 'math', op: '-', thing: 'duck', sums: [[2, 1], [3, 1], [3, 2], [4, 1], [4, 2], [5, 2]] },
    { id: 'go',      title: 'Things that go', vi: 'Xe cộ',          icon: 'car',       words: ['car', 'bus', 'boat', 'plane'] },
    { id: 'sky',     title: 'In the sky',     vi: 'Bầu trời',       icon: 'rainbow',   words: ['sun', 'moon', 'star', 'rainbow'] },
    { id: 'body',    title: 'My body',        vi: 'Cơ thể',         icon: 'head',      words: ['head', 'hand', 'eyes', 'nose'] },
    { id: 'clothes', title: 'Clothes',        vi: 'Quần áo',        icon: 'shirt',     words: ['hat', 'shoes', 'shirt', 'socks'] },
  ];

  window.WORDS = WORDS;
  window.LESSONS = LESSONS;
})();
