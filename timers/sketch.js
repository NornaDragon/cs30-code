// Timer Demo
// Maria V.
// 03/05/2023

let circleSize = 20;
let circleTimer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleTimer = new Timer(1000);
  circleTimer.start();
}

function draw() {
  background(220);
  fill(0);
  circle(width/2, height/2, circleSize);
  if (circleTimer.expired()) {
    circleSize += 25;
    circleTimer.start();
  }
}
