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
}

function spawnGroup(placement, theGround, health, theHeight, theWidth) {
  let people = {
    x: placement,
    y: theGround,
    hp: health,
    tall: theHeight,
    wide: theWidth,
  };
  push.group(people);
}