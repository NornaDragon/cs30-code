// Arrays and object notion assignment (minesweper)
// Maria van der spuy
// 08/03/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let group = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let y = 0; y < height; y += 50) {
    for (let x = 0; x < width; x += 50) {
      spawnGroup(x, y, 5, 5, 1, 50, 50);
    }
  }
}

function draw() {
  background(220);
  displayShapes();
  damage();
}

function displayShapes() {
  for (i = 0; i < group.length; i++) {
    if (group[i].enemy != 0) {
      fill(127.5);
      rect(group[i].x, group[i].y, group[i].wide, group[i].tall);
    }
  }
}

function damage() {
  for (i = 0; i < group.length; i++) {
    if (group[i].hp > 0 && mouseX > group[i].x && mouseX < group[i].x + group[i].wide && mouseY > group[i].y && mouseY < group[i].y + group[i].tall && mouseIsPressed) {
      group[i].hp = group[i].hp - group[i].damage;
    } else if (group[i].hp === 0 && group[i].enemy != 0) {
      group[i].enemy = group[i].enemy - 1;
    }
  }
}

function spawnGroup(theX, theY, theHp, theDamage, theEnemy, theWidth, theHeight) {
  let people = {
    x: theX,
    y: theY,
    hp: theHp,
    damage: theDamage,
    enemy: theEnemy,
    wide: theWidth,
    tall: theHeight,
  };
  group.push(people);
}