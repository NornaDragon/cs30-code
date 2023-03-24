// improvement
// Maria
// 24/03/2023


let enemies = []

let hasStarted = false
let hasEnded = false
//rgb for the background
let r = 255;
let g = 0;
let b = 0;

// function preload() {
//   soundFormats("mp3", "ogg");
//   mySound = loadSound("GunShotSnglShotIn PE1097906.mp3");
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  enemyLocation();
}

function draw() {
  background(r, g, b);
  enemy();
  crosshair();
  gameStart();
  gameWin();
}

//shows title and controls on top of everything and disappears when the player presses s, then gives hasStarted = true
function gameStart() {
  if (key != "s" && hasStarted === false) {
    background(100);
    fill(0);

    let lines =
      "Shot - Left Click\nEnemy Size - Mouse Wheel\nRandom Background Colour - Space\nRandom Enemy Colour - Enter";
    textLeading((width / 10 + height / 10) / 2);
    textAlign(LEFT);
    textSize((width / 20 + height / 20) / 2);
    text(lines, width / 8, height / 3);

    textAlign(CENTER, TOP);
    textSize((width / 10 + height / 10) / 2);
    text("Simple Shooter", width / 2, height / 40);

    textAlign(CENTER, BASELINE);
    text("Press s to Start", width / 2, height - height / 40);
  } else {
    hasStarted = true;
  }
}

//when the damage function gives back End = true it shows You Win! on top of everything
function gameWin() {
  if (End === true) {
    background(0);
    fill(255);
    textSize(width / 10);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
  }
}

function keyTyped() {
  if (key === " ") {
    r = random(255);
    g = random(255);
    b = random(255);
  }
  if (keyCode === ENTER) {
    for (let i = 0; i < 5; i++) {
      enemies[i].r = random(255);
      enemies[i].g = random(255);
      enemies[i].b = random(255);
    }    
  }
}

//crosshair to follow the mouse
function crosshair() {
  noFill();
  circle(mouseX, mouseY, 75);
  circle(mouseX, mouseY, 50);
  circle(mouseX, mouseY, 25);
  stroke(0);
  line(mouseX, 0, mouseX, height);
  line(0, mouseY, width, mouseY);
}

function mousePressed() {
  if (End === false && hasStarted === true) {
    fill("#FFEB3B");
    circle(mouseX, mouseY, 20);
    // mySound.play();
  }

  for (let i = 0; i < 5; i++){
    if (mouseX > enemies[i].x && mouseX < enemies[i].x + enemies[i].theSize && mouseY > enemies[i].y && mouseY < enemies[i].y + enemies[i].theSize && mouseIsPressed){
      enemies[i].health = enemies[i].health - 1
    }
  }
  
}


// the first enemy shows until its health is below 0 then the next one shows up
function enemy() {
  for (let i = 0; i < 5; i ++) {
    if (enemies[i].health > 0) {
      fill(enemies[i].r, enemies[i].g, enemies[i].b)
      rect(enemies[i].x, enemies[i].y, enemies[i].theSize, enemies[i].theSize*2)
    }
  }
}

//see if you are shoting within each enemy and if you are lowering their health, and ones the 5th enemies health is below 0 telling End = true
// function damage() {
//   if (mouseX > enemy1x && mouseX < enemy1x + theSize && mouseY > enemy1y && mouseY < enemy1y + theSize * 2 && mouseIsPressed) {
//     enemy1damage = enemy1damage - 1;
//   }
  
//   else if (mouseX > enemy2x && mouseX < enemy2x + theSize && mouseY > enemy2y && mouseY < enemy2y + theSize * 2 && mouseIsPressed) {
//     enemy2damage = enemy2damage - 1;
//   }
  
//   else if ( mouseX > enemy3x && mouseX < enemy3x + theSize && mouseY > enemy3y && mouseY < enemy3y + theSize * 2 && mouseIsPressed) {
//     enemy3damage = enemy3damage - 1;
//   }
  
//   else if (mouseX > enemy4x && mouseX < enemy4x + theSize && mouseY > enemy4y && mouseY < enemy4y + theSize * 2 && mouseIsPressed) {
//     enemy4damage = enemy4damage - 1;
//   }

//   else if (mouseX > enemy5x && mouseX < enemy5x + theSize && mouseY > enemy5y && mouseY < enemy5y + theSize * 2 && mouseIsPressed) {
//     enemy5damage = enemy5damage - 1;
//   }

//   else if (enemy5damage < 0) {
//     End = true;
//   }
// }

//changing the size of the enemies
function mouseWheel(event) {
  if (event.delta > 0 && theSize > 5) {
    theSize -= 5;
  } else {
    theSize += 5;
  }
}

function enemy() {
  let monsters = {
    x: random(width),
    y: random(height),
    theSize: 25,
    health: 20,
    backgroundRed: random(255),
    backgroundgreen: random(255),
    backgroundblue: random(255),
    r: random(255),
    g: random(255),
    b: random(255),
  }
  enemies.push(monsters)
}