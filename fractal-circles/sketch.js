// Project Title
// Your Name
// Date

let theColors = ["yellow", "yellow", "yellow", "white", "white", "purple", "purple", "black", "black",  "black"];
let theDepth = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if (frameCount%60 === 0) {
    if (theDepth < 9) {
      theDepth++;
    }
    else {
      theDepth = 0;
    }
  }
  
  // let theDepth = Math.floor(map(mouseX, 0, width, 0, 10));
  cir(width/2, width, theDepth);
}

function cir(x, diameter, depth) {
  fill(theColors[depth]);
  circle(x, height/2, diameter);

  if (depth > 0) {
    depth--;
    cir(x-diameter/4, diameter/2, depth);

    cir(x+diameter/4, diameter/2, depth);
  }
}
