const fs = require('fs');
const PATH = './input.txt';

function processInput(data) {
    moves = data
        .toString()
        .split('\r\n')
        .map((val) => {
            split = val.split(' ');
            let move = {
                direction: split[0],
                quantity: parseInt(split[1]),
            };
            return move;
        });
    return moves;
}

function moveHead(H, dir) {
    switch (dir) {
        case 'U':
            H.y++;
            break;
        case 'D':
            H.y--;
            break;
        case 'L':
            H.x--;
            break;
        case 'R':
            H.x++;
            break;
        default:
            console.log('Uh oH');
            process.exit(1);
    }
}

function moveTail(H, T) {
    // Tail already touching head case
    if (Math.abs(H.x - T.x) < 2 && Math.abs(H.y - T.y) < 2) {
        return;
    }
    // Vertically lined up case
    if (H.x === T.x) {
        if (H.y > T.y) {
            T.y++;
            return;
        }
        if (H.y < T.y) {
            T.y--;
            return;
        }
    }
    // Horizontally lined up case
    if (H.y === T.y) {
        if (H.x > T.x) {
            T.x++;
            return;
        }
        if (H.x < T.x) {
            T.x--;
            return;
        }
    }
    // Tail 2 above and offset case
    if (H.y === T.y - 2) {
        T.x = H.x;
        T.y--;
        return;
    }
    // Tail 2 below and offset case
    if (H.y === T.y + 2) {
        T.x = H.x;
        T.y++;
        return;
    }
    // Tail 2 right and offset case
    if (H.x === T.x - 2) {
        T.y = H.y;
        T.x--;
        return;
    }
    // Tail 2 left and offset case
    if (H.x === T.x + 2) {
        T.y = H.y;
        T.x++;
        return;
    }
    console.log('Uh oh spaghetio');
    process.exit(1);
}

function simulateMoves(moves, tailHistory) {
    let H = { x: 0, y: 0 }; // Head
    let T = { x: 0, y: 0 }; // Tail

    for (const move of moves) {
        for (let i = 0; i < move.quantity; i++) {
            moveHead(H, move.direction);
            moveTail(H, T);
            tailHistory.push({x: T.x, y: T.y});
        }
    }
}

function countUnique(tailHistory) {
    let uniqueTailHistory = [];

    for (const pos of tailHistory) {
        posAsString = JSON.stringify(pos);
        if (!uniqueTailHistory.includes(posAsString)) {
            uniqueTailHistory.push(posAsString);
        }
    }
    return uniqueTailHistory.length;
}

fs.readFile(PATH, (err, data) => {
    if (err) throw err;
    let moves = processInput(data);
    let tailHistory = [];
    simulateMoves(moves, tailHistory);
    console.log('(pt1) Unique Tail Positions:', countUnique(tailHistory));

    let longTailHistory = [];
});
