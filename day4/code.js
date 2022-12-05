const fs = require('fs');
const PATH = './input.txt';

class Range {
  constructor(min, max) {
    this.min = parseInt(min);
    this.max = parseInt(max);
  }
}

// Check if a contains b
function checkContain(a, b) {
  return a.min <= b.min && a.max >= b.max;
}

// Check if either side of b lies inside a
function checkOverlap(a, b) {
  if (a.min <= b.min && b.min <= a.max) {
    return true;
  }
  if (a.min <= b.max && b.max <= a.max) {
    return true;
  }
  return false;
}

fs.readFile(PATH, (err, data) => {
  if (err) throw err;

  // Convert to array of strings
  let pairs = data.toString().split('\r\n');

  let countContain = 0;
  let countOverlap = 0;

  for (const pair of pairs) {
    [elf1, elf2] = pair.split(',');

    let range1 = new Range(...elf1.split('-'));
    let range2 = new Range(...elf2.split('-'));

    // for part 1
    if (checkContain(range1, range2) || checkContain(range2, range1)) {
      countContain++;
    }

    // for part 2
    if (checkOverlap(range1, range2) || checkOverlap(range2, range1)) {
      countOverlap++;
    }
  }

  console.log(countContain); // part 1 answer
  console.log(countOverlap); // part 2 answer
});
