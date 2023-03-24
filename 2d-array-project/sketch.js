// The Monster Dungeon
// Maria C. van der Spuy
// 23/03/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// get a good way to import my animation (guard, angi, fire, grem)
// make and get tiles
// create damage and attack systems (menu system?)

// if i can get all that
// equipable items
// more frendly and monster verients
// customization


const ROWS = 5;
const COLS = 15;
let grid;
let cellSize;

let doorUp;
let doorDown;
let brick;

let guard;
let torch;
let angi;
let grem;


function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmptyDungeon(ROWS, COLS);
  
  
  if(width < height) {
    cellSize = width/COLS;
  }
  else {
    cellSize = height/ROWS;
  }
}

function draw() {
  background(220);
  displayDungeon(grid);
}

function displayDungeon(grid) {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === 0) {
        fill("brown");
      }
      if (grid[y][x] === 1) {
        fill("black");
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function createEmptyDungeon(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}
