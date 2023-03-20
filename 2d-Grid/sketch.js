// 2d array demo drawing grid
// Maria
// 20/03/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// let grid = [[0, 0, 1, 1], 
//             [1, 1, 0, 0],
//             [0, 1, 0, 1],
//             [1, 1, 1, 1]]

let grid;

const ROWS = 100;
const COLS = 100;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createRandomGrid(ROWS, COLS);

  if (width < height) {
    cellSize = width/ROWS;
  }
  else {
    cellSize = height/ROWS;
  }
}

function draw() {
  background(220);
  displayGrid();
}

function keyTyped() {
  if (key === "r") {
    grid = createRandomGrid(ROWS, COLS);
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }

  else if (grid[y][x] === 1) {
    grid[y][x] = 0;
  }
}

function displayGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === 1) {
        fill(0);
      }
      else if (grid[y][x] === 0) {
        fill(255);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function createRandomGrid(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      if (random(50) > 25) {
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}