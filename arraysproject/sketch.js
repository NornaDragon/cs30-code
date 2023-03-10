// Arrays and object notion assignment (art?, genurative art?)
// Maria van der spuy
// 08/03/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let group = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(220);
  spawnGroup();
  damage();
}

function displayShapes() {
  if (i < 5) {
    fill(127.5);
    rect(x, y, 50, 100);
  }
}

function damage() {
  for (let i=0; i<5; i++) {
    if (group.hp > 0 &&  mouseX > group.x && mouseX < group.x + group.wide && mouseY > group.y && mouseY < group.y + group.tall && mouseIsPressed) {
      group.hp = group.hp - group.damage;
    }
    else {
      group.hp = 100;
    }
  }
}


function spawnGroup() {
  let people = {
    x: random(0, width - 10),
    y: random(0, height - 10),
    hp: 100,
    damage: 1,
    tall: 40,
    wide: 20,
  };
  group.push(people);
}