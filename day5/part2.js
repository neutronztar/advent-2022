const fs = require('fs');
const PATH = './input.txt';

let stacks = {
    '1': ['B', 'V', 'S', 'N', 'T', 'C', 'H', 'Q'],
    '2': ['W', 'D', 'B', 'G'],
    '3': ['F', 'W', 'R', 'T', 'S', 'Q', 'B'],
    '4': ['L', 'G', 'W', 'S', 'Z', 'J', 'D', 'N'],
    '5': ['M', 'P', 'D', 'V', 'F'],
    '6': ['F', 'W', 'J'],
    '7': ['L', 'N', 'Q', 'B', 'J', 'V'],
    '8': ['G', 'T', 'R', 'C', 'J', 'Q', 'S', 'N'],
    '9': ['J', 'S', 'Q', 'C', 'W', 'D', 'M']
}

fs.readFile(PATH, (err, data) => {
    if (err) throw err;
  
    // Convert to array of strings
    let steps = data.toString().split('\r\n');
    
    for (const step of steps) {
        [, quantity, , fromStack, , toStack] = step.split(' ');
        quantity = parseInt(quantity);
        let crates = stacks[fromStack].splice(-quantity, quantity);
        stacks[toStack].push(...crates);
    }
    
    let result1 = '';
    for (let i = 1; i < 10; i++) {
        result1 += stacks[i].slice(-1)[0];
    }
    console.log(result1); // Part 2 answer
  

});
