// The Monster Dungeon
// Maria C. van der Spuy
// 23/03/2023
//
// Extra for Experts:
// created an a walking and idle animation for the guard using a character sheet and a JSON file

// how to animate my spritesheet animations
// https://www.youtube.com/watch?v=3noMeuufLZY

// starting point for movement of the player character
let x = 0;
let y = 123;

// arrays to hold the animations of all the states of all the characters

// guard idle left and right
let guardAnimation = [];
let guardRightAnimation = [];
// guard walk left and right
let guardWalkAnimation = [];
let guardRightWalkAnimation = [];
// grem idle left
let gremAnimation = [];


let tiles;
let levelBackground;
let brick, dirt, empty, owen;
let pathwayTopLeft, pathwayTopRight, pathwayBottomLeft, pathwayBottomRight;
let pathwayLeft, pathwayRight;
let heroIdleImage, heroIdleData, heroWalkImage, heroWalkData;
let tilesHigh, tilesWide;
let tileWidth, tileHeight;
let levelToLoad;
let lines;

let herostill = true;
let isUp = true;
let isRight = false;

function preload() {
  // load level data
  levelToLoad = "assets/levels/3.txt";
  lines = loadStrings(levelToLoad);

  // load background
  levelBackground = loadImage("assets/image_and_animation/aroace_background.png");

  // load tile images

  // scenery tiles
  brick = loadImage("assets/image_and_animation/brick.png");
  dirt = loadImage("assets/image_and_animation/dirt.png");
  owen = loadImage("assets/image_and_animation/brick_Owen.png");

  // foreground travel tiles
  pathwayLeft = loadImage("assets/image_and_animation/ground_pathway/ground_pathway_0.png");
  pathwayRight = loadImage("assets/image_and_animation/ground_pathway/ground_pathway_1.png");
  // background travel tiles
  pathwayTopLeft = loadImage("assets/image_and_animation/pathway/pathway_0.png");
  pathwayTopRight = loadImage("assets/image_and_animation/pathway/pathway_1.png");
  pathwayBottomLeft = loadImage("assets/image_and_animation/pathway/pathway_2.png");
  pathwayBottomRight = loadImage("assets/image_and_animation/pathway/pathway_3.png");

  //null tile
  empty = loadImage("assets/image_and_animation/empty.png");

  // All Animation Assets

  // 24 frames for 60 x 60 characters
  Assets24fps_60x60 = loadJSON("assets/image_and_animation/24fps_60x60.json")

  //hero Sprite Sheets
  heroIdleImage = loadImage("assets/image_and_animation/guard_idle_sprite_sheet.png");
  heroRightIdleImage = loadImage("assets/image_and_animation/guard_idle_right_sprite_sheet.png");
  heroWalkImage = loadImage("assets/image_and_animation/guard_walk_sprite_sheet.png")
  heroRightWalkImage = loadImage("assets/image_and_animation/guard_walk_right_sprite_sheet.png")

  // Grem Sprite Sheet
  gremIdleImage = loadImage("assets/image_and_animation/grem_idle_sprite_sheet.png");
  
}

function setup() {
  // keep 5:1 ratio
  createCanvas(1200, 240);

  // splting the sprite sheet into 24 images then putting them into an array
  let guardFrames = Assets24fps_60x60.frames;
  for (let i = 0; i < guardFrames.length; i++) {
    let pos = guardFrames[i].position;
    let img = heroIdleImage.get(pos.x, pos.y, pos.w, pos.h);
    guardAnimation.push(img);
  }

  let guardRightFrames = Assets24fps_60x60.frames;
  for (let i = 0; i < guardRightFrames.length; i++) {
    let pos = guardRightFrames[i].position;
    let img = heroRightIdleImage.get(pos.x, pos.y, pos.w, pos.h);
    guardRightAnimation.push(img);
  }

  let guardWalkFrames = Assets24fps_60x60.frames;
  for (let i = 0; i < guardWalkFrames.length; i++) {
    let pos = guardWalkFrames[i].position;
    let img = heroWalkImage.get(pos.x, pos.y, pos.w, pos.h);
    guardWalkAnimation.push(img);
  }

  let guardRightWalkFrames = Assets24fps_60x60.frames;
  for (let i = 0; i < guardRightWalkFrames.length; i++) {
    let pos = guardRightWalkFrames[i].position;
    let img = heroRightWalkImage.get(pos.x, pos.y, pos.w, pos.h);
    guardRightWalkAnimation.push(img);
  }

  let gremIdleFrames = Assets24fps_60x60.frames;
  for (let i = 0; i < gremIdleFrames.length; i++) {
    let pos = gremIdleFrames[i].position;
    let img = gremIdleImage.get(pos.x, pos.y, pos.w, pos.h);
    gremAnimation.push(img);
  }

  // making the scelitin of the canvas
  tilesHigh = lines.length;
  tilesWide = lines[0].length;

  tileWidth = width / tilesWide;
  tileHeight = height / tilesHigh;

  tiles = createEmpty2dArray(tilesWide, tilesHigh);


  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      let tileType = lines[y][x];
      tiles[y][x] = tileType;
    }
  }
}

function draw() {
  display();
  heroTravel();
  gremEnemy();
}

function display() {
  image(levelBackground, 0, 0, width, height);

  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      showTile(tiles[y][x], x, y);
    }
  }
}


// find P,A,T,H,t,h in the array
//if guard is within the PATH and presses up or w to goes to next room
//if guard is within the th and presses down or s, goes to next room
function roomChange() {
  // for (let y = 0; y < tilesHigh; y++) {
  //   for (let x = 0; x < tilesWide; x++) {
  //     if (tiles[y][x] === 'P', 'A', 'T', 'H' && tiles[y][x]){

  //     }
  //   }
  // }
}

function heroTravel() {
  if (herostill) {
    if (isRight) {
      image(guardRightAnimation[frameCount % guardRightAnimation.length], x + 3, y);
    }
    else {
      image(guardAnimation[frameCount % guardAnimation.length], x + 3, y);
    }
  }

  if (!herostill){
    if (isRight) {
      image(guardRightWalkAnimation[frameCount % guardRightWalkAnimation.length], x, y);
    }
    else {
      image(guardWalkAnimation[frameCount % guardWalkAnimation.length], x, y);
    }
  }

  if (keyIsDown(RIGHT_ARROW)) {
    isRight = true
    if (x < width-54) {
      x += 4.4;
    }
    herostill = false;
  }
  else {
    herostill = true;
  }
  if (keyIsDown(LEFT_ARROW)) {
    isRight = false
    if (x > -6) {
      x -= 4.4;
    }
    herostill = false;
  }
}

function gremEnemy() {
  image(gremAnimation[frameCount % gremAnimation.length], 1140, y + 3)
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
