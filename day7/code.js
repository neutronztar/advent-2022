const fs = require('fs');
const util = require('util');
const PATH = './input.txt';
const AVAILABLE_SPACE = 70000000;
const UPDATE_SIZE = 30000000;

class Dir {
    constructor(dirs, files) {
        this.dirs = dirs;
        this.files = files;
        this.size = null;
    }
}

class File {
    constructor(size) {
        this.size = size;
    }
}

let fileSystem = new Dir({}, {});
let pwd = [];

function changeDirectory(line) {
    let path = line.slice(5);
    if (path === '/') {
        pwd = [];
    }
    else if (path === '..') {
        pwd.pop();
    }
    else {
        pwd.push(path);
    }
}

function addDir(structure, path, dirName) {
    if (path.length === 0) {
        structure['dirs'][dirName] = new Dir({}, {});
        return;
    }
    addDir(structure['dirs'][path[0]], path.slice(1), dirName);
}

function addFile(structure, path, fileName, size) {
    if (path.length === 0) {
        structure['files'][fileName] = new File(size);
        return;
    }
    addFile(structure['dirs'][path[0]], path.slice(1), fileName, size);
}

function buildFileSystem(terminalLogs) {
    for (const line of terminalLogs) {
        if (line.slice(0, 4) === '$ cd') {
            // Change current directory
            changeDirectory(line);
        }
        else if (line.slice(0, 4) === '$ ls') {
            // Do nothing for ls
        }
        else if (line.slice(0, 3) === 'dir') {
            // Add a directory
            addDir(fileSystem, pwd, line.slice(4));
        }
        else {
            // Add a file
            [size, fileName] = line.split(' ');
            addFile(fileSystem, pwd, fileName, parseInt(size))
        }
    }
}

function computeDirSize(dir) {
    let size = 0;
    
    // Check if size already exists
    if (dir['size'] !== null) {
        return dir['size'];
    }
    
    // Add sizes of all files
    for (const file in dir['files']) {
        size += parseInt(dir['files'][file]['size']);
    }

    // Add sizes of all subdirectories
    for (const subDir in dir['dirs']) {
        size += computeDirSize(dir['dirs'][subDir]);
    }

    dir['size'] = size;
    return size;
}

function sumDirSizes(dir, max) {
    let sum = 0;

    // Add this dir's size to sum if it's unber the limit
    if (dir['size'] <= max) {
        sum += dir['size'];
    }

    // Add subdirectory sizes to max
    for (const subDir in dir['dirs']) {
        sum += sumDirSizes(dir['dirs'][subDir], max);
    }

    return sum;
}

function findSmallestPossibleDirToDelete(dir, min, currentBest) {
    if (dir['size'] < currentBest && dir['size'] >= min) {
        currentBest = dir['size'];
    }

    for (const subDir in dir['dirs']) {
        currentBest = findSmallestPossibleDirToDelete(dir['dirs'][subDir], min, currentBest);
    }

    return currentBest;
}

fs.readFile(PATH, (err, data) => {
    if (err) throw err;
  
    let terminalLogs = data.toString().split('\r\n');

    buildFileSystem(terminalLogs);

    computeDirSize(fileSystem)
    console.log('Whole filesystem dir size:', fileSystem['size']);

    console.log('part 1:', sumDirSizes(fileSystem, 100000));

    const minSpaceNeededToBeFreed = UPDATE_SIZE + fileSystem['size'] - AVAILABLE_SPACE;
    console.log('min space neded to be freed:', minSpaceNeededToBeFreed);

    let s = findSmallestPossibleDirToDelete(fileSystem, minSpaceNeededToBeFreed, Number.MAX_VALUE);
    console.log('part 2:', s);

    // Show directory structure
    //console.log(util.inspect(fileSystem, {showHidden: false, depth: null, colors: true}))
});