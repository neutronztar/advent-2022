const fs = require('fs');

const PATH = './input.txt';

function itemToPriority(item) {
  if (item === item.toLowerCase()) {
    return item.charCodeAt(0) - 96;
  } else {
    return item.charCodeAt(0) - 38;
  }
}

function findItem(pack) {
  pack = pack.split('');
  c1 = pack.slice(0, pack.length / 2);
  c2 = pack.slice(pack.length / 2);
  for (const item of c1) {
    if (c2.includes(item)) {
      return item;
    }
  }
  console.log('uh oh');
  return;
}

function findBadge(pack1, pack2, pack3) {
  for (const item of pack1) {
    if (pack2.includes(item) && pack3.includes(item)) {
      return item;
    }
  }
  console.log('uh oh');
  return;
}

fs.readFile(PATH, (err, data) => {
  if (err) throw err;

  // Convert to array of strings
  let packs = data.toString().split('\r\n');

  let sum = 0;
  for (const pack of packs) {
    item = findItem(pack);
    sum += itemToPriority(item);
  }

  console.log('part 1:', sum); // part 1 answer

  let sum2 = 0;
  // Loop through groups
  for (let i = 0; i < packs.length; i += 3) {
    badge = findBadge(packs[i], packs[i + 1], packs[i + 2]);
    sum2 += itemToPriority(badge);
  }

  console.log('part 2:', sum2); // part 2 answer
});
