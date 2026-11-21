/* ============================================================
 *  LESSONS – edit this file to add or change lessons.
 *  Order and topics follow the "English for Everyone Junior" beginner
 *  course, made smaller for a 4-year-old (4 words + 1 sentence pattern).
 *
 *  Every lesson runs the same 5 steps:
 *    1 Look & point (a picture scene)   2 Find (tap the right card)
 *    3 Catch (game)   4 Say it (speak)   5 Sticker
 *
 *  Sentence patterns – write them with these blanks:
 *    {name} apple   {Name} Apple   {a} an apple   {A} An apple
 *    {pl} apples    {sound} Moo!   (sound only if the word has one)
 *  A lesson can set: intro (how Miss Bloom presents a word), ask (Find question),
 *  catch (game prompt). A word can override them for itself.
 *  Scenes: meadow farm zoo room school kitchen beach town night garden blank
 * ============================================================ */
(function () {
  'use strict';
  const C = { red: '#ec4b3c', yellow: '#f6c12a', blue: '#4b9be3', pink: '#f383b0', green: '#5cbf4a', purple: '#9b6bd6', orange: '#f28a2b' };
  const bug = k => () => ART.bug(k, C.pink);
  const it = k => () => ART.item(k);

  const WORDS = {
    // people
    boy: { name: 'boy', art: it('boy'), alias: ['boy', 'boys', 'boi', 'buoy'] },
    girl: { name: 'girl', art: it('girl'), alias: ['girl', 'girls', 'curl', 'gal', 'girly'] },
    baby: { name: 'baby', art: it('baby'), alias: ['baby', 'babies', 'bay be', 'maybe'] },
    teacher: { name: 'teacher', art: () => ART.teacher(), alias: ['teacher', 'teach', 'cheetah', 'feature'], intro: "This is a teacher... That's me! Hi!" },
    mom: { name: 'mom', art: it('mom'), alias: ['mom', 'mum', 'mommy', 'mummy', 'mama', 'ma'] },
    dad: { name: 'dad', art: it('dad'), alias: ['dad', 'daddy', 'dada', 'that', 'dead'] },
    brother: { name: 'brother', art: it('brother'), alias: ['brother', 'brothers', 'bro', 'brutha'] },
    sister: { name: 'sister', art: it('sister'), alias: ['sister', 'sisters', 'sis', 'sista'] },
    // feelings
    happy: { name: 'happy', art: it('happy'), alias: ['happy', 'happi', 'hippie', 'happen'] },
    sad: { name: 'sad', art: it('sad'), alias: ['sad', 'said', 'set', 'sat'] },
    angry: { name: 'angry', art: it('angry'), alias: ['angry', 'hungry', 'angri', 'anger'] },
    tired: { name: 'tired', art: it('tired'), alias: ['tired', 'tire', 'tyre', 'tied'] },
    // body
    head: { name: 'head', art: it('head'), alias: ['head', 'heads', 'had', 'hat', 'red'], intro: 'This is my head. Nod, nod! Head!' },
    hand: { name: 'hand', art: it('hand'), alias: ['hand', 'hands', 'and', 'hunt'], intro: 'This is my hand. Wave hello! Hand!' },
    eyes: { name: 'eyes', a: 'eyes', pl: 'eyes', art: it('eyes'), alias: ['eyes', 'eye', 'ice', 'i'], intro: 'These are my eyes. Blink, blink! Eyes!', ask: 'Where are the eyes?' },
    nose: { name: 'nose', art: it('nose'), alias: ['nose', 'nos', 'knows', 'no'], intro: 'This is my nose. Sniff, sniff! Nose!' },
    // school
    book: { name: 'book', art: it('book'), alias: ['book', 'books', 'buk', 'look'] },
    pencil: { name: 'pencil', art: it('pencil'), alias: ['pencil', 'pencils', 'pensil', 'pencil'] },
    crayon: { name: 'crayon', art: it('crayon'), alias: ['crayon', 'crayons', 'cray on', 'crown'] },
    ruler: { name: 'ruler', art: it('ruler'), alias: ['ruler', 'rulers', 'rula', 'cooler'] },
    // garden insects
    butterfly: { name: 'butterfly', art: bug('butterfly'), alias: ['butterfly', 'butter fly', 'butterflies', 'butter'], sound: 'Flap, flap!' },
    bee: { name: 'bee', art: bug('bee'), alias: ['bee', 'bees', 'be', 'b', 'bea', 'bi', 'beep'], sound: 'Buzz, buzz!' },
    ladybug: { name: 'ladybug', art: bug('ladybug'), alias: ['ladybug', 'lady bug', 'ladybird', 'lady bird', 'lady'] },
    snail: { name: 'snail', art: bug('snail'), alias: ['snail', 'snails', 'nail', 'snell', 'snake'], sound: 'Slow, slow!' },
    // colours (butterflies)
    red: { kind: 'color', name: 'red', art: () => ART.bug('butterfly', C.red), alias: ['red', 'read', 'rad', 'bread', 'wed'] },
    yellow: { kind: 'color', name: 'yellow', art: () => ART.bug('butterfly', C.yellow), alias: ['yellow', 'yello', 'jello', 'yell'] },
    blue: { kind: 'color', name: 'blue', art: () => ART.bug('butterfly', C.blue), alias: ['blue', 'blew', 'blu', 'glue', 'boo'] },
    green: { kind: 'color', name: 'green', art: () => ART.bug('butterfly', C.green), alias: ['green', 'grin', 'queen', 'clean'] },
    // numbers
    one: { kind: 'number', n: 1, name: 'one', art: () => ART.count(1), alias: ['one', 'won', '1', 'wan', 'juan'] },
    two: { kind: 'number', n: 2, name: 'two', art: () => ART.count(2), alias: ['two', 'to', 'too', '2', 'tu'] },
    three: { kind: 'number', n: 3, name: 'three', art: () => ART.count(3), alias: ['three', 'tree', 'free', '3', 'sri'] },
    four: { kind: 'number', n: 4, name: 'four', art: () => ART.count(4), alias: ['four', 'for', '4', 'fore'] },
    five: { kind: 'number', n: 5, name: 'five', art: () => ART.count(5), alias: ['five', '5', 'fife', 'fire'] },
    six: { kind: 'number', n: 6, name: 'six', art: () => ART.group(6, 'star'), alias: ['six', '6', 'sex', 'sick', 'sticks'] },
    seven: { kind: 'number', n: 7, name: 'seven', art: () => ART.group(7, 'star'), alias: ['seven', '7', 'heaven', 'sven'] },
    eight: { kind: 'number', n: 8, name: 'eight', art: () => ART.group(8, 'star'), alias: ['eight', '8', 'ate', 'hate', 'a'] },
    nine: { kind: 'number', n: 9, name: 'nine', art: () => ART.group(9, 'star'), alias: ['nine', '9', 'nein', 'line', 'mine'] },
    ten: { kind: 'number', n: 10, name: 'ten', art: () => ART.group(10, 'star'), alias: ['ten', '10', 'then', 'tan', 'den'] },
    // zoo
    lion: { name: 'lion', art: it('lion'), alias: ['lion', 'lions', 'line', 'ryan'], sound: 'Roar!' },
    elephant: { name: 'elephant', a: 'an elephant', art: it('elephant'), alias: ['elephant', 'elephants', 'elefant'], sound: 'Toot toot!' },
    giraffe: { name: 'giraffe', art: it('giraffe'), alias: ['giraffe', 'giraffes', 'giraf', 'draft'], sound: 'So tall!' },
    monkey: { name: 'monkey', art: it('monkey'), alias: ['monkey', 'monkeys', 'monk', 'money'], sound: 'Ooh ooh, ah ah!' },
    // toys
    ball: { name: 'ball', art: it('ball'), alias: ['ball', 'balls', 'bowl', 'bol'], sound: 'Bounce, bounce!' },
    teddy: { name: 'teddy bear', art: it('teddy'), alias: ['teddy', 'teddy bear', 'bear', 'ready'] },
    doll: { name: 'doll', art: it('doll'), alias: ['doll', 'dolls', 'dull', 'dog', 'all'] },
    car: { name: 'car', art: it('car'), alias: ['car', 'cars', 'ka', 'call', 'caught'], sound: 'Beep beep!' },
    robot: { name: 'robot', art: it('robot'), alias: ['robot', 'robots', 'row bot', 'rowboat'], sound: 'Beep boop!' },
    rocket: { name: 'rocket', art: it('rocket'), alias: ['rocket', 'rockets', 'rock it', 'locket'], sound: 'Whoosh!' },
    balloon: { name: 'balloon', art: it('balloon'), alias: ['balloon', 'balloons', 'baloon', 'loon'] },
    kite: { name: 'kite', art: it('kite'), alias: ['kite', 'kites', 'kate', 'night', 'light'] },
    // pets
    cat: { name: 'cat', art: it('cat'), alias: ['cat', 'cats', 'kat', 'cap', 'kitty'], sound: 'Meow!' },
    dog: { name: 'dog', art: it('dog'), alias: ['dog', 'dogs', 'dock', 'doggy', 'dark'], sound: 'Woof woof!' },
    fish: { name: 'fish', pl: 'fish', art: it('fish'), alias: ['fish', 'fishes', 'fis', 'fit'], sound: 'Blub blub!' },
    rabbit: { name: 'rabbit', art: it('rabbit'), alias: ['rabbit', 'rabbits', 'rabid', 'bunny'], sound: 'Hop, hop!' },
    // town
    bus: { name: 'bus', pl: 'buses', art: it('bus'), alias: ['bus', 'buses', 'bass', 'boss', 'bath'], sound: 'Beep!' },
    boat: { name: 'boat', art: it('boat'), alias: ['boat', 'boats', 'bot', 'both', 'vote'], sound: 'Toot toot!' },
    plane: { name: 'plane', art: it('plane'), alias: ['plane', 'airplane', 'plain', 'play'], sound: 'Zoom!' },
    // home
    bed: { name: 'bed', art: it('bed'), alias: ['bed', 'beds', 'bad', 'bet', 'bread'] },
    chair: { name: 'chair', art: it('chair'), alias: ['chair', 'chairs', 'share', 'cheer'] },
    table: { name: 'table', art: it('table'), alias: ['table', 'tables', 'tabel', 'cable'] },
    lamp: { name: 'lamp', art: it('lamp'), alias: ['lamp', 'lamps', 'lamb', 'lump'] },
    // farm
    cow: { name: 'cow', art: it('cow'), alias: ['cow', 'cows', 'cal', 'how', 'now'], sound: 'Moo!' },
    pig: { name: 'pig', art: it('pig'), alias: ['pig', 'pigs', 'big', 'peg'], sound: 'Oink oink!' },
    duck: { name: 'duck', art: it('duck'), alias: ['duck', 'ducks', 'dock', 'doc', 'tuck'], sound: 'Quack quack!' },
    sheep: { name: 'sheep', pl: 'sheep', art: it('sheep'), alias: ['sheep', 'ship', 'cheap', 'sip'], sound: 'Baa!' },
    // fruit & vegetables
    apple: { name: 'apple', a: 'an apple', art: it('apple'), alias: ['apple', 'apples', 'appo', 'apo'] },
    banana: { name: 'banana', art: it('banana'), alias: ['banana', 'bananas', 'nana'] },
    orange: { name: 'orange', a: 'an orange', art: it('orange'), alias: ['orange', 'orang', 'oranges'] },
    strawberry: { name: 'strawberry', pl: 'strawberries', art: it('strawberry'), alias: ['strawberry', 'straw berry', 'strawberries', 'berry'] },
    carrot: { name: 'carrot', art: it('carrot'), alias: ['carrot', 'carrots', 'karat', 'parrot'] },
    tomato: { name: 'tomato', pl: 'tomatoes', art: it('tomato'), alias: ['tomato', 'tomatoes', 'tomahto', 'potato'] },
    potato: { name: 'potato', pl: 'potatoes', art: it('potato'), alias: ['potato', 'potatoes', 'potahto', 'tomato'] },
    corn: { name: 'corn', pl: 'corn', art: it('corn'), alias: ['corn', 'con', 'cone', 'horn', 'born'] },
    // clothes
    hat: { name: 'hat', art: it('hat'), alias: ['hat', 'hats', 'had', 'at', 'cat'] },
    shoes: { name: 'shoes', a: 'my shoes', pl: 'shoes', art: it('shoes'), alias: ['shoes', 'shoe', 'choose', 'juice'], ask: 'Where are the shoes?' },
    shirt: { name: 'shirt', art: it('shirt'), alias: ['shirt', 'shirts', 't shirt', 'tshirt', 'short'] },
    socks: { name: 'socks', a: 'my socks', pl: 'socks', art: it('socks'), alias: ['socks', 'sock', 'sucks', 'sox'], ask: 'Where are the socks?' },
    // beach
    shell: { name: 'shell', art: it('shell'), alias: ['shell', 'shells', 'shall', 'sell'] },
    crab: { name: 'crab', art: it('crab'), alias: ['crab', 'crabs', 'grab', 'crap'], sound: 'Snap snap!' },
    bucket: { name: 'bucket', art: it('bucket'), alias: ['bucket', 'buckets', 'bucky', 'pocket'] },
    // lunch
    cake: { name: 'cake', art: it('cake'), alias: ['cake', 'cakes', 'kate', 'take'] },
    icecream: { name: 'ice cream', a: 'an ice cream', art: it('icecream'), alias: ['ice cream', 'icecream', 'i scream', 'cream'] },
    juice: { name: 'juice', pl: 'juice', art: it('juice'), alias: ['juice', 'juices', 'shoes', 'deuce'] },
    pizza: { name: 'pizza', art: it('pizza'), alias: ['pizza', 'pizzas', 'peter', 'pizz'] },
    // sky
    sun: { name: 'sun', art: it('sun'), alias: ['sun', 'son', 'some', 'sunny'], intro: 'Good morning, sun! Sun!' },
    moon: { name: 'moon', art: it('moon'), alias: ['moon', 'moons', 'mun', 'noon'], intro: 'Good night, moon! Moon!' },
    star: { name: 'star', art: it('star'), alias: ['star', 'stars', 'start', 'stop'], intro: 'Twinkle, twinkle, little star! Star!' },
    rainbow: { name: 'rainbow', art: it('rainbow'), alias: ['rainbow', 'rain bow', 'rain'], intro: 'Wow! A rainbow! Rainbow!' },
  };

  /* type 'words' (default) or 'math' (op '+' or '-', thing to count, sums [a, b], answers 1..5) */
  const LESSONS = [
    { id: 'friends', title: 'Hello, friends',  vi: 'Xin chào',        scene: 'meadow',  words: ['boy', 'girl', 'baby', 'teacher'], intro: 'Hello! This is {a}. {Name}!' },
    { id: 'school',  title: 'My school things', vi: 'Đồ dùng học tập', scene: 'school',  words: ['book', 'pencil', 'crayon', 'ruler'], intro: "What's this?... It's {a}! {Name}!" },
    { id: 'colors',  title: 'Colors',          vi: 'Màu sắc',         scene: 'garden',  words: ['red', 'yellow', 'blue', 'green'], intro: "It's {name}! A {name} butterfly!" },
    { id: 'numbers', title: 'Numbers 1 to 5',  vi: 'Số 1–5',          scene: 'garden',  words: ['one', 'two', 'three', 'four', 'five'], intro: 'How many ladybugs?... {Name}!' },
    { id: 'zoo',     title: 'At the zoo',      vi: 'Sở thú',          scene: 'zoo',     words: ['lion', 'elephant', 'giraffe', 'monkey'], intro: "What's that?... It's {a}! {sound}" },
    { id: 'family',  title: 'My family',       vi: 'Gia đình',        scene: 'room',    words: ['mom', 'dad', 'brother', 'sister'], intro: 'This is my {name}. Hi, {name}!', ask: 'Where is my {name}?' },
    { id: 'toys',    title: 'My toys',         vi: 'Đồ chơi',         scene: 'room',    words: ['ball', 'teddy', 'doll', 'car'], intro: 'This is my {name}! {sound}' },
    { id: 'plus',    title: 'Add it up',       vi: 'Phép cộng',       type: 'math', op: '+', thing: 'apple', sums: [[1, 1], [2, 1], [1, 2], [2, 2], [3, 1], [3, 2]] },
    { id: 'feelings', title: 'Feelings', vi: 'Cảm xúc',       scene: 'meadow',  words: ['happy', 'sad', 'angry', 'tired'], intro: "I'm {name}!... {Name}.", ask: 'Who is {name}?', catch: 'Catch the {name} face!' },
    { id: 'pets',    title: 'My pets',         vi: 'Thú cưng',        scene: 'room',    words: ['cat', 'dog', 'fish', 'rabbit'], intro: 'I have {a}! {sound}' },
    { id: 'body',    title: 'My body',         vi: 'Cơ thể',          scene: 'meadow',  words: ['head', 'hand', 'eyes', 'nose'], intro: 'This is my {name}! {Name}!' },
    { id: 'garden',  title: 'In the garden',   vi: 'Trong vườn',      scene: 'garden',  words: ['butterfly', 'bee', 'ladybug', 'snail'], intro: 'Look! {A}! {sound}' },
    { id: 'town',    title: 'In town',         vi: 'Xe cộ',           scene: 'town',    words: ['car', 'bus', 'boat', 'plane'], intro: "There's {a}! {sound}" },
    { id: 'home',    title: 'My home',         vi: 'Nhà của bé',      scene: 'room',    words: ['bed', 'chair', 'table', 'lamp'], intro: "Where's the {name}?... Here it is! The {name}!" },
    { id: 'minus',   title: 'Take away',       vi: 'Phép trừ',        type: 'math', op: '-', thing: 'duck', sums: [[2, 1], [3, 1], [3, 2], [4, 1], [4, 2], [5, 2]] },
    { id: 'farm',    title: 'On the farm',     vi: 'Nông trại',       scene: 'farm',    words: ['cow', 'pig', 'duck', 'sheep'], intro: "It's {a}. {sound}" },
    { id: 'fruit',   title: 'Yummy fruit',     vi: 'Trái cây',        scene: 'kitchen', words: ['apple', 'banana', 'orange', 'strawberry'], intro: 'I like {pl}! Yummy!' },
    { id: 'veggies', title: 'Vegetables',      vi: 'Rau củ',          scene: 'kitchen', words: ['carrot', 'tomato', 'potato', 'corn'], intro: 'Crunch, crunch! I like {pl}!' },
    { id: 'toyshop', title: 'At the toy shop', vi: 'Cửa hàng đồ chơi', scene: 'room',   words: ['robot', 'rocket', 'balloon', 'kite'], intro: 'Ooh! I like {pl}! {sound}' },
    { id: 'clothes', title: 'My clothes',      vi: 'Quần áo',         scene: 'room',    words: ['hat', 'shoes', 'shirt', 'socks'], intro: "I'm wearing {a}! {Name}!" },
    { id: 'beach',   title: 'At the beach',    vi: 'Bãi biển',        scene: 'beach',   words: ['shell', 'crab', 'fish', 'bucket'], intro: 'I can see {a}! {sound}' },
    { id: 'lunch',   title: 'Lunchtime',       vi: 'Bữa trưa',        scene: 'kitchen', words: ['cake', 'icecream', 'juice', 'pizza'], intro: '{Name}, please!... Thank you!' },
    { id: 'numbers2', title: 'Numbers 6 to 10', vi: 'Số 6–10',        scene: 'night',   words: ['six', 'seven', 'eight', 'nine', 'ten'], intro: "Let's count the stars!... {Name}!", ask: 'Where are {name} stars?', catch: 'Catch {name} stars!' },
    { id: 'night',   title: 'Good night',      vi: 'Chúc ngủ ngon',   scene: 'night',   words: ['sun', 'moon', 'star', 'rainbow'] },
  ];

  window.WORDS = WORDS;
  window.LESSONS = LESSONS;
})();
