// bousing balls demo

let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall(width/2, height/2);
}

function draw() {
  background(220);
  moveShapes();
  displayShapes();
}

function mousePressed() {
  spawnBall(mouseX, mouseY);
}

function moveShapes() {
  for (let i=0; i<shapes.length; i++) {
    shapes[i].x += shapes[i].dx;
    shapes[i].y += shapes[i].dy;
    if (shapes[i].x > width - shapes.length || shapes[i].x < 0 + shapes.length) {
      shapes[i].dx = shapes[i].dx * -1;
    }
    
    if (shapes[i].y > height - shapes.length || shapes[i].y < 0 + shapes.length) {
      shapes[i].dy = shapes[i].dy * -1;
    }
  }
}

function displayShapes() {
  for (let i=0; i<shapes.length; i++) {
    fill(shapes[i].theColour);
    circle(shapes[i].x, shapes[i].y, shapes[i].diameter);
  }
}

function spawnBall(tempX, tempY) {
  let newBall = {
    x: tempX,
    y: tempY,
    dx: random(-5, 5),
    dy: random(-5, 5),
    diameter: random(25, 100),
    theColour: color(random(255), random(255), random(255))
  };
  shapes.push(newBall);
}