// OOP fireworks

class Spark {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.a = 255;
    this.size = 5;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    circle(this.x, this.y, this.size);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    this.a--;
  }

  isDead() {
    return this.a <= 0;
  }
}

let fireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].display();

    if (fireworks[i].isDead()) {
      fireworks.splice(i, 1);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 100; i++) {
    spawnSpark();
  }
}

function mouseClicked() {
  for (let i = 0; i < 100; i++) {
    spawnSpark();
  }
}

function mouseReleased() {
  for (let i = 0; i < 100; i++) {
    spawnSpark();
  }
}

function spawnSpark() {
  let fire = new Spark(mouseX, mouseY, random(-5, 5), random(-5, 5));
  fireworks.push(fire);
}