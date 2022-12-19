// ChatGPT's slightly wrong 1st try

// const fs = require('fs');

// // Read the input file as a string
// const input = fs.readFileSync('input.txt', 'utf8');

// // Initialize a counter to track the number of characters processed
// let count = 0;

// // Iterate over the input string, four characters at a time
// for (let i = 0; i < input.length - 3; i++) {
//   // Check if the four characters are all different
//   if (new Set([input[i], input[i+1], input[i+2], input[i+3]]).size === 4) {
//     // If they are, print the count and exit the loop
//     console.log(count);
//     break;
//   }
//   // Otherwise, increment the counter
//   count++;
// }




// After explaiing to ChatGPT what it did wrong, ity fixed the off-by-4-error

const fs = require('fs');

// Read the input file as a string
const input = fs.readFileSync('input.txt', 'utf8');

// Initialize a counter to track the number of characters processed
let count = 0;

// Iterate over the input string, four characters at a time
for (let i = 0; i < input.length - 3; i++) {
  // Check if the four characters are all different
  if (new Set([input[i], input[i+1], input[i+2], input[i+3]]).size === 4) {
    // If they are, print the count plus four (to get the end of the marker) and exit the loop
    console.log(count + 4);
    break;
  }
  // Otherwise, increment the counter
  count++;
}
