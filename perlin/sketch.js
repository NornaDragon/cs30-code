// perlin timing
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBubble();
  noStroke();
  window.setInterval(spawnBubble, 1);
}


function draw() {
  // background(220);

  for (let bubble of theBubbles) {
    bubble.x = noise(bubble.time) * width;
    bubble.y = noise(bubble.time + 300) * height;

    fill(bubble.color);
    circle(bubble.x, bubble.y, bubble.size);

    bubble.time += 0.01;
  }

}

function mousePressed() {
  spawnBubble();
}

function spawnBubble() {
  let bubble = {
    x: random(width),
    y: random(height),
    size: random(5,50),
    color: color(random(255), random(255), random(255), random(255)),
    time: random(1000),
  };
  theBubbles.push(bubble);
}