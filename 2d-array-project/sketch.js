// The Monster Dungeon
// Maria C. van der Spuy
// 23/03/2023
//
// Extra for Experts:
// created a walking and idle animation for the guard using a character sheet and a JSON file

// how to animate my sprite sheet animations
// https://www.youtube.com/watch?v=3noMeuufLZY

// based some of my levelloader code off of ethan sparrow 2D array project

// starting point for movement of the player character
let moveX = 0;
let moveY = 123;

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

// stationary blocks
let brick, dirt, empty, owen;
let pathwayTopLeft, pathwayTopRight, pathwayBottomLeft, pathwayBottomRight;
let pathwayLeft, pathwayRight;

// Map

let map0, map1, map2, map3, map4, map5, map6, map7, map8

// Base animation guide for all charcters
let Assets24fps_60x60;

//Animation sprite sheets
let guardIdleImage, guardRightIdleImage,guardFrontIdleImage, guardBackIdleImage, guardWalkImage, guardRightWalkImage;
let gremIdleImage;

//level logic
let tilesHigh, tilesWide;
let tileWidth, tileHeight;
let lines;

//direction check
let guardstill = true;
let isUp = true;
let isRight = false;

//level check
let level = 0;
let levelSet = [];

//room change check + a stopper to make that it doesn't go to fast
let isChanged = false;
let wait = 0;

function preload() {
  // load level data
  levelSet.push(loadStrings("assets/levels/0.txt"));
  levelSet.push(loadStrings("assets/levels/1.txt"));
  levelSet.push(loadStrings("assets/levels/2.txt"));
  levelSet.push(loadStrings("assets/levels/3.txt"));
  levelSet.push(loadStrings("assets/levels/4.txt"));
  levelSet.push(loadStrings("assets/levels/5.txt"));
  levelSet.push(loadStrings("assets/levels/6.txt"));
  levelSet.push(loadStrings("assets/levels/7.txt"));
  levelSet.push(loadStrings("assets/levels/8.txt"));  

  // load background
  levelBackground = loadImage("assets/image_and_animation/scenery/aroace_background.png");


  // load tile images

  // map
  map0 = loadImage("assets/image_and_animation/map/map0.png");
  map1 = loadImage("assets/image_and_animation/map/map1.png");
  map2 = loadImage("assets/image_and_animation/map/map2.png");
  map3 = loadImage("assets/image_and_animation/map/map3.png");
  map4 = loadImage("assets/image_and_animation/map/map4.png");
  map5 = loadImage("assets/image_and_animation/map/map5.png");
  map6 = loadImage("assets/image_and_animation/map/map6.png");
  map7 = loadImage("assets/image_and_animation/map/map7.png");
  map8 = loadImage("assets/image_and_animation/map/map8.png");

  // scenery tiles
  brick = loadImage("assets/image_and_animation/scenery/brick.png");
  dirt = loadImage("assets/image_and_animation/scenery/dirt.png");
  owen = loadImage("assets/image_and_animation/scenery/brick_Owen.png");

  // foreground travel tiles
  pathwayLeft = loadImage("assets/image_and_animation/ground_pathway/ground_pathway_0.png");
  pathwayRight = loadImage("assets/image_and_animation/ground_pathway/ground_pathway_1.png");
  // background travel tiles
  pathwayTopLeft = loadImage("assets/image_and_animation/pathway/pathway_0.png");
  pathwayTopRight = loadImage("assets/image_and_animation/pathway/pathway_1.png");
  pathwayBottomLeft = loadImage("assets/image_and_animation/pathway/pathway_2.png");
  pathwayBottomRight = loadImage("assets/image_and_animation/pathway/pathway_3.png");

  //null tile
  empty = loadImage("assets/image_and_animation/scenery/empty.png");

  // All Animation Assets

  // 24 frames for 60 x 60 characters
  Assets24fps_60x60 = loadJSON("assets/image_and_animation/animation/24fps_60x60.json");

  //guard Sprite Sheets
  guardIdleImage = loadImage("assets/image_and_animation/animation/guard_idle_sprite_sheet.png");
  guardRightIdleImage = loadImage("assets/image_and_animation/animation/guard_idle_right_sprite_sheet.png");
  guardFrontIdleImage = loadImage("assets/image_and_animation/animation/guard_idle_right_sprite_sheet.png");
  guardBackIdleImage = loadImage("assets/image_and_animation/animation/guard_idle_right_sprite_sheet.png");
  guardWalkImage = loadImage("assets/image_and_animation/animation/guard_walk_sprite_sheet.png");
  guardRightWalkImage = loadImage("assets/image_and_animation/animation/guard_walk_right_sprite_sheet.png");

  // Grem Sprite Sheet
  gremIdleImage = loadImage("assets/image_and_animation/animation/grem_idle_sprite_sheet.png");
  
}

function setup() {
  // keep 5:1 ratio
  createCanvas(1200, 240);
  levelLoader();


  // splicing the sprite sheet into 24 images then putting them into an array
  let guardFrames = Assets24fps_60x60.frames;
  for (let i = 0; i < guardFrames.length; i++) {
    let pos = guardFrames[i].position;
    let img = guardIdleImage.get(pos.x, pos.y, pos.w, pos.h);
    guardAnimation.push(img);
  }

  let guardRightFrames = Assets24fps_60x60.frames;
  for (let i = 0; i < guardRightFrames.length; i++) {
    let pos = guardRightFrames[i].position;
    let img = guardRightIdleImage.get(pos.x, pos.y, pos.w, pos.h);
    guardRightAnimation.push(img);
  }

  let guardWalkFrames = Assets24fps_60x60.frames;
  for (let i = 0; i < guardWalkFrames.length; i++) {
    let pos = guardWalkFrames[i].position;
    let img = guardWalkImage.get(pos.x, pos.y, pos.w, pos.h);
    guardWalkAnimation.push(img);
  }

  let guardRightWalkFrames = Assets24fps_60x60.frames;
  for (let i = 0; i < guardRightWalkFrames.length; i++) {
    let pos = guardRightWalkFrames[i].position;
    let img = guardRightWalkImage.get(pos.x, pos.y, pos.w, pos.h);
    guardRightWalkAnimation.push(img);
  }

  let gremIdleFrames = Assets24fps_60x60.frames;
  for (let i = 0; i < gremIdleFrames.length; i++) {
    let pos = gremIdleFrames[i].position;
    let img = gremIdleImage.get(pos.x, pos.y, pos.w, pos.h);
    gremAnimation.push(img);
  }

  //creating tiles for the images to 'sit' on
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
  guardTravel();
  gremEnemy();
  roomChange();
}

function levelLoader() {
  lines = levelSet[level]
}

function display() {
  image(levelBackground, 0, 0, width, height);
  //creating tiles for the images to 'sit' on (repeating)
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      let tileType = lines[y][x];
      tiles[y][x] = tileType;
    }
  }

  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      showTile(tiles[y][x], x, y);
    }
  }
}


// If the guard is within the PATH and presses up it goes to next room
// If the guard is within the th and presses down it goes to next room
// wait used as a sortof 'sleep' function
// isChange used with wait to stop the rooms changing to fast

function roomChange() {
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      if (isChanged === false) {
        if (tiles[y][x] === "P" && tiles[y][x] === tiles[1][Math.floor(moveX/60)] && keyIsDown(UP_ARROW)){
          level++;
          levelLoader();
          isChanged = true;
        }
        else if (tiles[y][x] === "A" && tiles[y][x] === tiles[1][Math.floor(moveX/60)] && keyIsDown(UP_ARROW)){
          level++;
          levelLoader();
          isChanged = true;
        }
        else if (tiles[y][x] === "T" && tiles[y][x] === tiles[2][Math.floor(moveX/60)] && keyIsDown(UP_ARROW)){
          level++;
          levelLoader();
          isChanged = true;
        }
        else if (tiles[y][x] === "H" && tiles[y][x] === tiles[2][Math.floor(moveX/60)] && keyIsDown(UP_ARROW)){
          level++;
          levelLoader();
          isChanged = true;
        }
        else if (tiles[y][x] === "t" && tiles[y][x] === tiles[3][Math.floor(moveX/60)] && keyIsDown(DOWN_ARROW)){
          level--;
          levelLoader();
          isChanged = true;
        }
        else if (tiles[y][x] === "h" && tiles[y][x] === tiles[3][Math.floor(moveX/60)] && keyIsDown(DOWN_ARROW)){
          level--;
          levelLoader();
          isChanged = true;
        }
      }
      else {
        if (wait === 100) {
          isChanged = false;
          wait = 0;
        }
        else {
          wait++;
        }
      }
    }
  }
}

// Movement and changing image based on direction and whether their in movement
function guardTravel() {
  if (guardstill) {
    if (isRight) {
      image(guardRightAnimation[frameCount % guardRightAnimation.length], moveX + 3, moveY);
    }
    else {
      image(guardAnimation[frameCount % guardAnimation.length], moveX + 3, moveY);
    }
  }

  if (!guardstill){
    if (isRight) {
      image(guardRightWalkAnimation[frameCount % guardRightWalkAnimation.length], moveX, moveY);
    }
    else {
      image(guardWalkAnimation[frameCount % guardWalkAnimation.length], moveX, moveY);
    }
  }

  if (keyIsDown(RIGHT_ARROW)) {
    isRight = true;
    if (moveX < width-54) {
      moveX += 4.4;
    }
    guardstill = false;
  }
  else {
    guardstill = true;
  }
  if (keyIsDown(LEFT_ARROW)) {
    isRight = false;
    if (moveX > -6) {
      moveX -= 4.4;
    }
    guardstill = false;
  }

  if (keyIsDown(RIGHT_ARROW) && keyIsDown(LEFT_ARROW)) {
    guardstill = true;
  }
}

// Used to show first and last level and used to make sure animation works on different images
function gremEnemy() {
  if (level === 0 || level === 8) {
    image(gremAnimation[frameCount % gremAnimation.length], 1140, moveY + 3);
  }
}

// Putting images on to the tiles
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
  else if (location === "0") {
    image(map0, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "1") {
    image(map1, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "2") {
    image(map2, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "3") {
    image(map3, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "4") {
    image(map4, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "5") {
    image(map5, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "6") {
    image(map6, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "7") {
    image(map7, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "8") {
    image(map8, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else {
    image(empty, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
}

function createEmpty2dArray(cols, rows) {
  let emptyGrid = [];
  for (let y = 0; y < rows; y++) {
    emptyGrid.push([]);
    for (let x = 0; x < cols; x++) {
      emptyGrid[y].push(0);
    }
  }
  return emptyGrid;
}
