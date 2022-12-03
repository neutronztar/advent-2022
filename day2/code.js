const fs = require('fs');

const PATH = './input.txt';

function playGame(opp, me) {
  let points = me === 'X' ? 1 : me === 'Y' ? 2 : me === 'Z' ? 3 : 0;

  switch (opp) {
    case 'A':
      switch (me) {
        case 'X':
          points += 3; // draw
          break;
        case 'Y':
          points += 6; // win
          break;
        case 'Z':
          points += 0; // loss
          break;
        default:
          console.log('no bueno');
      }
      break;
    case 'B':
      switch (me) {
        case 'X':
          points += 0; // loss
          break;
        case 'Y':
          points += 3; // draw
          break;
        case 'Z':
          points += 6; // win
          break;
        default:
          console.log('no bueno');
      }
      break;
    case 'C':
      switch (me) {
        case 'X':
          points += 6; // win
          break;
        case 'Y':
          points += 0; // loss
          break;
        case 'Z':
          points += 3; // draw
          break;
        default:
          console.log('no bueno');
      }
      break;
    default:
      console.log('no bueno');
  }
  return points;
}

function decideMove(opp, me) {
  switch (opp) {
    case 'A': //rock
      switch (me) {
        case 'X':
          return 'Z';
        case 'Y':
          return 'X';
        case 'Z':
          return 'Y';
      }
      break;
    case 'B': //paper
      switch (me) {
        case 'X':
          return 'X';
        case 'Y':
          return 'Y';
        case 'Z':
          return 'Z';
      }
      break;
    case 'C': //scissors
      switch (me) {
        case 'X':
          return 'Y';
        case 'Y':
          return 'Z';
        case 'Z':
          return 'X';
      }
  }
}

fs.readFile(PATH, (err, data) => {
  if (err) throw err;

  // Convert to array of strings
  let games = data.toString().split('\r\n');

  total = 0;
  for (const game of games) {
    total += playGame(game[0], game[2]);
  }
  console.log(total); // answer for part 1

  total2 = 0;
  for (const game of games) {
    total2 += playGame(game[0], decideMove(game[0], game[2]));
  }
  console.log(total2); // answer for part 2
});
