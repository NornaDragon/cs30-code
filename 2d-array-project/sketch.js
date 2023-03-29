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

// dist(x1, y1, x2, y2)
// map(value, start1, stop1, start2, stop2, [withinBounds])
// offset 



let tiles;
let levelBackground;
let brick, pathway, dirt, empty;
let tilesHigh, tilesWide;
let tileWidth, tileHeight;
let levelToLoad;
let lines;

function preload() {
  //load level data
  levelToLoad = "assets/levels/0.txt";
  lines = loadStrings(levelToLoad);

  //load background
  levelBackground = loadImage("assets/image_and_animation/aroace_background.png");

  //load tile images
  brick = loadImage("assets/image_and_animation/brick.png");
  dirt = loadImage("assets/image_and_animation/dirt.png");
  pathway = loadImage("assets/image_and_animation/pathway.png");
  empty = loadImage("assets/image_and_animation/empty.png");
}

function setup() {
  // keep this a 4:3 ratio, or it will stretch in weird ways
  createCanvas(200, 80);

  tilesHigh = lines.length;
  tilesWide = lines[0].length;

  tileWidth = width / tilesWide;
  tileHeight = height / tilesHigh;

  tiles = createEmpty2dArray(tilesWide, tilesHigh);

  //put values into 2d array of characters
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      let tileType = lines[y][x];
      tiles[y][x] = tileType;
    }
  }
}

function draw() {
  display();
}

function display() {
  image(levelBackground, 0, 0, width, height);

  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      showTile(tiles[y][x], x, y);
    }
  }
}

function showTile(location, x, y) {
  if (location === "D") {
    image(dirt, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "B") {
    image(brick, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "P") {
    image(pathway, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else {
    image(empty, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
}

function createEmpty2dArray(cols, rows) {
  let randomGrid = [];
  for (let y = 0; y < rows; y++) {
    randomGrid.push([]);
    for (let x = 0; x < cols; x++) {
      randomGrid[y].push(0);
    }
  }
  return randomGrid;
}


// const ROWS = 5;
// const COLS = 15;
// let grid;
// let cellSize;

// let doorUp;
// let doorDown;
// let brick;

// let guard;
// let torch;
// let angi;
// let grem;


// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   grid = createEmptyDungeon(ROWS, COLS);
  
  
//   if(width < height) {
//     cellSize = width/COLS;
//   }
//   else {
//     cellSize = height/ROWS;
//   }
// }

// function draw() {
//   background(220);
//   displayDungeon(grid);
// }

// function displayDungeon(grid) {
//   for (let y = 0; y < ROWS; y++) {
//     for (let x = 0; x < COLS; x++) {
//       if (grid[y][x] === 0) {
//         fill("brown");
//       }
//       if (grid[y][x] === 1) {
//         fill("black");
//       }
//       rect(x*cellSize, y*cellSize, cellSize, cellSize);
//     }
//   }
// }

// function createEmptyDungeon(ROWS, COLS) {
//   let newGrid = [];
//   for (let y = 0; y < ROWS; y++) {
//     newGrid.push([]);
//     for (let x = 0; x < COLS; x++) {
//       newGrid[y].push(0);
//     }
//   }
//   return newGrid;
// }
