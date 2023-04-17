// Project Title

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = "red";
    this.speed = 5;
    this.size = 5;
  }

  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.size);
  }
  
  move() {
    let choice = random(100);
    if (choice < 25) {
      this.y -= this.speed;
    }
    else if (choice < 50) {
      this.y += this.speed;
    }
    else if (choice < 75) {
      this.x -= this.speed;
    }
    else if (choice < 100) {
      this.x += this.speed;
    }
  }
}

let kevin;
let wasi;

function setup() {
  createCanvas(windowWidth, windowHeight);
  kevin = new Walker(width/2, height/2);
  wasi = new Walker(200, 400);
  wasi.colour = "blue";
}

function draw() {
  kevin.move();
  kevin.display();
  wasi.move();
  wasi.display();
}
