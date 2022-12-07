const fs = require('fs');
const PATH = './input.txt';
const NUM_NO_REPEATS = 4; // change to 14 for part 2

function checkIfAllUnique(group) {
    if (group.length === 1) {
        return true;
    }
    
    for (let i = 1; i < group.length; i++) {
        if (group[0] === group[i]) {
            return false
        }
    }

    return checkIfAllUnique(group.slice(1));
}

fs.readFile(PATH, (err, data) => {
    if (err) throw err;
  
    let message = data.toString();

    for (let i = NUM_NO_REPEATS; i <= message.length; i++) {
        if (checkIfAllUnique(message.slice(i - NUM_NO_REPEATS, i))) {
            console.log('No repetitions at index', i);
            break;
        }
    }
});