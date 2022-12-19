// Modified from ChatGPT's attempt

const fs = require('fs');

// Initialize the X register. Cycle number is the index of this array.
let x = [1, 1];

// Read the input file
const input = fs.readFileSync('input.txt', 'utf8');

// Split the input into lines
const lines = input.split('\r\n');

// Loop through each line of the input
for (const line of lines) {
  // If the line is a noop instruction, increment the cycle number by 1
  if (line === 'noop') {
    x.push(x[x.length-1]);
  }
  // If the line is an addx instruction, parse the value of V and add it to the X register,
  // then increment the cycle number by 2
  else if (line.startsWith('addx')) {
    const v = parseInt(line.split(' ')[1]);
    x.push(x[x.length-1], x[x.length-1] + v);
  }
}

let signalStrength = 0;
// Check the value of the X register and the cycle number during the 20th, 60th, 100th, 140th, 180th, and 220th cycles
for (let i = 20; i <= 220; i += 40) {
    signalStrength += x[i] * i;
}
console.log('Part 1:', signalStrength);


// Part 2
for (let i = 1; i <= 240; i++) {
    if (Math.abs((x[i] % 40) - (i % 40) + 1) < 2) {
        process.stdout.write('#');
    } else {
        process.stdout.write('.');
    }
    if (i % 40 === 0) {
        process.stdout.write('\n');
    }
}