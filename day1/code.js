const fs = require('fs');

const PATH = './input.txt';

fs.readFile(PATH, (err, data) => {
  if (err) throw err;

  // Convert to array of strings
  let arr = data.toString().split('\r\n');
  let cals = 0;
  let totals = [];

  for (const line of arr) {
    if (line !== '') {
      cals += parseInt(line);
    } else {
      totals.push(cals);
      cals = 0;
    }
  }

  // Solution to part 1
  console.log(Math.max(...totals));

  let max1 = -Infinity;
  let max2 = -Infinity;
  let max3 = -Infinity;
  for (const val of totals) {
    if (val > max1) {
      max3 = max2;
      max2 = max1;
      max1 = val;
    } else if (val > max2) {
      max3 = max2;
      max2 = val;
    } else if (val > max3) {
      max3 = val;
    }
  }

  // Solution to part 2
  console.log(max1 + max2 + max3);
});
