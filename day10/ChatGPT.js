const fs = require('fs');

// Initialize the X register and the cycle number
let x = 1;
let cycle = 1;

// Read the input file
const input = fs.readFileSync('input.txt', 'utf8');

// Split the input into lines
const lines = input.split('\r\n');

// Loop through each line of the input
for (const line of lines) {
  // If the line is a noop instruction, increment the cycle number by 1
  if (line === 'noop') {
    cycle++;
  }
  // If the line is an addx instruction, parse the value of V and add it to the X register,
  // then increment the cycle number by 2
  else if (line.startsWith('addx')) {
    const v = parseInt(line.split(' ')[1]);
    x += v;
    cycle += 2;
  }
}

// Check the value of the X register and the cycle number during the 20th, 60th, 100th, 140th, 180th, and 220th cycles
for (let i = 20; i <= 220; i += 40) {
  // If the current cycle is a multiple of 40, print the result
  if (cycle % 40 === 0) {
    console.log(i * x);
  }
}

