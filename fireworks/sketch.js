// OOP fireworks

class Spark {
  constructor(x, y, dx, dy, colour) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy =dy;
    this.colour = colour;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}
