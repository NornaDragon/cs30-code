// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let triangleVertices = [{x:500, y:50}, {x:50, y:750}, {x:950, y:750}];
let theColorsDemo = ["blue", "red", "green", "white", "yellow","pink", "orange", "black"];
let theColors = ["red", "orange", "yellow", "white", "yellow", "orange", "red", "white"];
let depth = 7;

function setup() {
  createCanvas(1000, 800);
}

function draw() {
  background(220);
  if (frameCount%60 === 0) {
    if (depth < 7) {
      depth++;
    }
    else {
      depth = 0;
    }
  }
  sierpincki(triangleVertices, depth);
}

function sierpincki(points, depth) {
  fill(theColorsDemo[depth]);
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);

  if (depth > 0) {
    sierpincki([getMidPoint(points[0], points[1]), points[1], getMidPoint(points[1], points[2])], depth-1);

    sierpincki([getMidPoint(points[0], points[2]), getMidPoint(points[1], points[2]), points[2]], depth-1);

    sierpincki([points[0], getMidPoint(points[0], points[1]), getMidPoint(points[0], points[2])], depth-1);

  }
}

function getMidPoint(point1, point2) {
  let xDiff = point1.x + point2.x;
  let yDiff = point1.y + point2.y;
  let theMidPoint = {x:xDiff/2, y:yDiff/2};
  return theMidPoint;
}