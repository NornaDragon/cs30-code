// Arrays and object notion assignment (minesweeper)
// Maria van der spuy
// 08/03/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let group = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let x = 0; x < width; x += 50) {
    for (let y = 0; y < height; y += 50) {
      spawnGroup(x, y, 5, 5, 1, 50, 50);
    }
  }
}

function draw() {
  background(185);
  displayShapes();
  damage();
  Havelost();
}

function Havelost() {
  for (let i = 0; i < group.length; i++){
    if (group[i].mine && group[i].hp === 0) {
      fill(255);
      textSize(width / 10);
      textAlign(CENTER, CENTER);
      text("You Lose...", width / 2, height / 2);
    }
  }
}

function displayShapes() {
  for (let i = 0; i < group.length; i++) {
    if (group[i].mine){
      fill(0);
      circle(group[i].x + 25, group[i].y + 25, group[i].wide);
    }

    if (group[i].displayed !== 0) {
      fill(127.5);
      rect(group[i].x, group[i].y, group[i].wide, group[i].tall);
    }

    if (group[i].hp > 0 && mouseX > group[i].x && mouseX < group[i].x + group[i].wide && mouseY > group[i].y && mouseY < group[i].y + group[i].tall && mouseIsPressed && mouseButton === RIGHT) {
      fill(255,0,0);
      triangle(group[i].x + 10, group[i].y + 10, group[i].x + 40, group[i].y + 25, group[i].x + 10, group[i].y + 40);
    }

    if (!group[i].mine) {
      textSize(group[i].wide);
      textAlign(CENTER, CENTER);

      fill(0,0,255);
      text("1", group[i].x + 25, group[i].y + 25);

      fill(0,130,0);
      text("2", group[i].x + 25, group[i].y + 25);

      fill(255,0,0);
      text("3", group[i].x + 25, group[i].y + 25);

      fill(0,0,132);
      text("4", group[i].x + 25, group[i].y + 25);

      fill(132,0,0);
      text("5", group[i].x + 25, group[i].y + 25);

      fill(0,130,132);
      text("6", group[i].x + 25, group[i].y + 25);

      fill(132,0,132);
      text("7", group[i].x + 25, group[i].y + 25);

      fill(117);
      text("8", group[i].x + 25, group[i].y + 25);
    }
  }
}

function damage() {
  for (let i = 0; i < group.length; i++) {
    if (group[i].hp > 0 && mouseX > group[i].x && mouseX < group[i].x + group[i].wide && mouseY > group[i].y && mouseY < group[i].y + group[i].tall && mouseIsPressed && mouseButton === LEFT) {
      group[i].hp = group[i].hp - group[i].damage;
    }
    
    else if (group[i].hp === 0 && group[i].displayed !== 0) {
      group[i].displayed = group[i].displayed - 1;
    }
  }
}

function spawnGroup(theX, theY, theHp, theDamage, isdisplayed, theWidth, theHeight) {
  let people = {
    x: theX,
    y: theY,
    hp: theHp,
    damage: theDamage,
    displayed: isdisplayed,
    wide: theWidth,
    tall: theHeight,
    mine: random(1) > 0.9,
    lost: false
  };
  group.push(people);
}