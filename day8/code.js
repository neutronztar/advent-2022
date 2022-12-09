const fs = require('fs');
const PATH = './input.txt';

function createGrid(data) {
    const treeGrid = data
        .toString()
        .split('\r\n')
        .map((row) => row.split('').map((val) => parseInt(val)));

    return treeGrid;
}

function scanFromLeft(treeGrid, visibilityGrid) {
    const rows = treeGrid.length;
    const cols = treeGrid[0].length;

    for (let i = 0; i < rows; i++) {
        let tallestTree = -1;
        for (let j = 0; j < cols; j++) {
            let tree = treeGrid[i][j];
            if (tree > tallestTree) {
                // Tree is visible
                tallestTree = tree;
                visibilityGrid[i][j] = true;
            }
        }
    }
}

function rotateClockWise(inputMatrix) {
    return inputMatrix[0].map((val, index) => inputMatrix.map((row) => row[index]).reverse());
}

function scanPerimeter(treeGrid) {
    const rows = treeGrid.length;
    const cols = treeGrid[0].length;
    
    let visibilityGrid = Array(rows)
        .fill()
        .map(() => Array(cols).fill(false));
    
    for (let i = 0; i < 4; i++) {
        scanFromLeft(treeGrid, visibilityGrid);
        treeGrid = rotateClockWise(treeGrid);
        visibilityGrid = rotateClockWise(visibilityGrid);
    }

    return visibilityGrid;
}

function sumVisibileTrees(visibilityGrid) {
    let sum = 0;
    const rows = visibilityGrid.length;
    const cols = visibilityGrid[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            sum += visibilityGrid[i][j];
        }
    }
    return sum;
}

function scanRightFromEachTree(treeGrid, scoreGrid) {
    const rows = treeGrid.length;
    const cols = treeGrid[0].length;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            viewingDisToRight = 0;
            treeHeight = treeGrid[i][j];
            for (let k = j+1; k < cols; k++) {
                if (treeGrid[i][k] < treeHeight) {
                    viewingDisToRight++;
                } else {
                    viewingDisToRight++;
                    break;
                }
            }
            scoreGrid[i][j] *= viewingDisToRight;
        }
    }
}

function calculateTreeScores(treeGrid) {
    const rows = treeGrid.length;
    const cols = treeGrid[0].length;

    let scoreGrid = Array(rows)
        .fill()
        .map(() => Array(cols).fill(1));
    
    for (let i = 0; i < 4; i++) {
        scanRightFromEachTree(treeGrid, scoreGrid);
        treeGrid = rotateClockWise(treeGrid);
        scoreGrid = rotateClockWise(scoreGrid);
    }

    return scoreGrid;
}

function findHighestScore(scoreGrid) {
    highestPerRow = scoreGrid.map((row) => Math.max(...row))
    return Math.max(...highestPerRow);
}

fs.readFile(PATH, (err, data) => {
    if (err) throw err;
    let treeGrid = createGrid(data);

    let visibilityGrid = scanPerimeter(treeGrid);
    console.log('Part 1:', sumVisibileTrees(visibilityGrid));

    let scoreGrid = calculateTreeScores(treeGrid);
    console.log('Part 2:', findHighestScore(scoreGrid));
});
