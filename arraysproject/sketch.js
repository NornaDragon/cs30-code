// Arrays and object notion assignment (art?, genurative art?)
// Maria van der spuy
// 08/03/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let group = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnGroup();
}

function draw() {
  background(220);
  displayShapes();
  damage();
}

function displayShapes() {
  if (group[0].enemy != 0){
    fill(127.5);
    rect(group[0].x, group[0].y, group[0].wide, group[0].tall);
  }
}

function damage() {
  if (group[0].hp > 0 &&  mouseX > group[0].x && mouseX < group[0].x + group[0].wide && mouseY > group[0].y && mouseY < group[0].y + group[0].tall && mouseIsPressed) {
      group[0].hp = group[0].hp - group[0].damage;
  }
  else if (group[0].hp === 0 && group[0].enemy != 0) {
      group[0].hp = 100;
      group[0].enemy = group[0].enemy - 1;
  }

}


function spawnGroup() {
  let people = {
    x: random(20, width - 20),
    y: random(20, height - 20),
    hp: 100,
    damage: 1,
    enemy: 5,
    tall: 100,
    wide: 50,
  };
  group.push(people);
}