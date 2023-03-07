// cubic disarray
// Your Name
// march 7,2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let boxes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  for (let y = 0; y < height; y+= 50){
    for (let x = 0; y < width; x += 50){
      spawnBox(x, y, 50, random(y*0.25));
    }
  }
}

function draw() {
  background(220);
  for (let i = 0; i < boxes.length; i++){
    displayBox(boxes[i]);
  }
}

function displayBox(myBox) {
  push();
  translate(myBox.x, myBox.y);
  rotate(myBox.rotation);
  square(0,0, myBox.size);
  pop();
}

function spawnBox(theX, theY, theSize, howRotated) {
  let someBox = {
    x: theX,
    y: theY,
    size: theSize,
    rotation: howRotated, 
  };
  boxes.push(someBox);
}