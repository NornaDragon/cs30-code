// The Monster Dungeon
// Maria C. van der Spuy
// 23/03/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond

//how to animate my spritesheet animations
//https://www.youtube.com/watch?v=3noMeuufLZY

// the animation works just have to fing how to display it right

let x = 0
let guardAnimation = [];

let tiles;
let levelBackground;
let brick, dirt, empty, owen;
let pathwayTopLeft, pathwayTopRight, pathwayBottomLeft, pathwayBottomRight;
let pathwayLeft, pathwayRight;
let tilesHigh, tilesWide;
let tileWidth, tileHeight;
let levelToLoad;
let lines;

let herostill = true;
let isUp = true;

function preload() {
  //load level data
  levelToLoad = "assets/levels/3.txt";
  lines = loadStrings(levelToLoad);

  //load background
  levelBackground = loadImage("assets/image_and_animation/aroace_background.png");

  //load tile images
  brick = loadImage("assets/image_and_animation/brick.png");
  dirt = loadImage("assets/image_and_animation/dirt.png");
  owen = loadImage("assets/image_and_animation/brick_Owen.png");

  pathwayLeft = loadImage("assets/image_and_animation/ground_pathway/ground_pathway_0.png");
  pathwayRight = loadImage("assets/image_and_animation/ground_pathway/ground_pathway_1.png");

  pathwayTopLeft = loadImage("assets/image_and_animation/pathway/pathway_0.png");
  pathwayTopRight = loadImage("assets/image_and_animation/pathway/pathway_1.png");
  pathwayBottomLeft = loadImage("assets/image_and_animation/pathway/pathway_2.png");
  pathwayBottomRight = loadImage("assets/image_and_animation/pathway/pathway_3.png");

  empty = loadImage("assets/image_and_animation/empty.png");

  //hero animations
  heroIdleImage = loadImage("assets/image_and_animation/guard_idle_sprite_sheet.png");
  heroIdleData = loadJSON("assets/image_and_animation/guard_idle.json");
  
}

function setup() {
  // keep 5:1 ratio
  createCanvas(1500, 300);

  let guardFrames = heroIdleData.frames
  for (i = 0; i < guardFrames.length; i++) {
    let pos = guardFrames[i].position;
    let img = heroIdleImage.get(pos.x, pos.y, pos.w, pos.h);
    guardAnimation.push(img);
  }

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
  // display();
  image(guardAnimation[frameCount % guardAnimation.length], x, 0);
  // heroTravel();
}

function display() {
  image(levelBackground, 0, 0, width, height);

  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      showTile(tiles[y][x], x, y);
    }
  }
}

function heroTravel() {
  if (herostill) {
    
  }
  // if (!herostill) {
  //   image(heroIdleUp, x, height - (height/2), tileWidth, tileHeight);
  // }
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { //d
    x += 5;
  }
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { //a
    x -= 5;
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
    image(pathwayTopLeft, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "A") {
    image(pathwayTopRight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "T") {
    image(pathwayBottomLeft, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "H") {
    image(pathwayBottomRight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "t") {
    image(pathwayLeft, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "h") {
    image(pathwayRight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "O") {
    image(owen, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
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
