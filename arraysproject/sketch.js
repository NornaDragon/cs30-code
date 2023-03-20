// Arrays and object notion assignment (minesweeper)
// Maria van der spuy
// 08/03/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let group = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  //spawning elements
  for (let x = 0; x < width; x += 50) {
    for (let y = 0; y < height; y += 50) {
      spawnGroup(x, y, 5, 5, 1, 50, 50);
    }
  }
}

function draw() {
  background(185);
  damage();
  displayShapes();
  Nums();
  Havelost();
}

//lose popup
function Havelost() {
  for (let i = 0; i < group.length; i++){
    if (group[i].mine && group[i].hp === 0) {
      fill(255);
      textSize(width / 10);
      textAlign(CENTER, CENTER);
      text("You Lose...", width / 2, height / 2);
    }
  }
}

function displayShapes() {
  for (let i = 0; i < group.length; i++) {
    // displaying mines
    if (group[i].mine){
      fill(0);
      circle(group[i].x + 25, group[i].y + 25, group[i].wide);
    }

    // displaying blocks
    if (group[i].displayed !== 0) {
      fill(127.5);
      rect(group[i].x, group[i].y, group[i].wide, group[i].tall);
    }
    
    //place and removing flags with right click
    if (group[i].hp > 0 && mouseX > group[i].x && mouseX < group[i].x + group[i].wide && mouseY > group[i].y && mouseY < group[i].y + group[i].tall && mouseIsPressed && mouseButton === RIGHT) {
      group[i].flag = !group[i].flag
    }
    // displaying flags
    if (group[i].flag === true && group[i].hp > 0) {
      fill(255,0,0);
      triangle(group[i].x + 10, group[i].y + 10, group[i].x + 40, group[i].y + 25, group[i].x + 10, group[i].y + 40);
    }
  }
}

// wip (not in use)
function Nums() {
  for (let i = 0; i < group.length; i++) {
    for (let x = 0; x < width; x += 50) {
      for (let y = 0; y < height; y += 50) {
        numOfColms = round(width/50)
        thecolm = round(group[i].x/50 - 1)
        numOfRow = round(height/50)
        therow = round(group[i].y/50 - 1)

        // checking if there is a mine around a non-mine square, and if there is adding a point on the minesSurrounding
        // only brings 0 or really high num
        if (!group[i].mine) {
          if (group[int(((group[i].therow * group[i].numOfColms + group[i].thecolm) - 1))].mine === true || group[int(((group[i].therow * group[i].numOfColms + group[i].thecolm) + 1))].mine === true || group[int((group[i].therow * (group[i].numOfColms - 1) + group[i].thecolm))].mine === true || group[int((group[i].therow * (group[i].numOfColms - 1) + group[i].thecolm) - 1)].mine === true || group[int((group[i].therow * (group[i].numOfColms - 1) + group[i].thecolm) + 1)].mine === true || group[int((group[i].therow * (group[i].numOfColms + 1) + group[i].thecolm))].mine === true || group[int((group[i].therow * (group[i].numOfColms + 1) + group[i].thecolm) - 1)].mine === true || group[int((group[i].therow * (group[i].numOfColms + 1) + group[i].thecolm) + 1)].mine  === true) {
            group[i].minesSurrounding++;
          }
        }
        // checking minesSurrounding for a num and puting the corresponding num
        if (!group[i].mine) {
          textSize(group[i].wide);
          textAlign(CENTER, CENTER);
          //check that it at least sort of works
          if (group[i].minesSurrounding === 0) {
            fill(0);
            text(":(", group[i].x + 25, group[i].y + 25);
          }
          //the nums
          if (group[i].minesSurrounding === 1) {
            fill(0,0,255);
            text("1", group[i].x + 25, group[i].y + 25);
          }

          if (group[i].minesSurrounding === 2) {
            fill(0,130,0);
            text("2", group[i].x + 25, group[i].y + 25);
          }
    
          if (group[i].minesSurrounding === 3) {
            fill(255,0,0);
            text("3", group[i].x + 25, group[i].y + 25);
          }
    
          if (group[i].minesSurrounding === 4) {
            fill(0,0,132);
            text("4", group[i].x + 25, group[i].y + 25);
          }

          if (group[i].minesSurrounding === 5) {
            fill(132,0,0);
            text("5", group[i].x + 25, group[i].y + 25);
          }

          if (group[i].minesSurrounding === 6) {
            fill(0,130,132);
            text("6", group[i].x + 25, group[i].y + 25);
          }

          if (group[i].minesSurrounding === 7) {
            fill(132,0,132);
            text("7", group[i].x + 25, group[i].y + 25);
          }

          if (group[i].minesSurrounding === 8) {
            fill(117);
            text("8", group[i].x + 25, group[i].y + 25);
          }      
        }
      }
    }
  }
}

// put blocks on top of everything until they are clicked
function damage() {
  for (let i = 0; i < group.length; i++) {
    if (group[i].flag === false && group[i].hp > 0 && mouseX > group[i].x && mouseX < group[i].x + group[i].wide && mouseY > group[i].y && mouseY < group[i].y + group[i].tall && mouseIsPressed && mouseButton === LEFT) {
      group[i].hp = group[i].hp - group[i].damage;
    }
    
    else if (group[i].hp === 0 && group[i].displayed !== 0) {
      group[i].displayed = group[i].displayed - 1;
    }
  }
}

function spawnGroup(theX, theY, theHp, theDamage, isdisplayed, theWidth, theHeight, allColm, whatColm, allRow, whatRow) {
  let people = {
    x: theX,
    y: theY,
    hp: theHp,
    damage: theDamage,
    displayed: isdisplayed,
    wide: theWidth,
    tall: theHeight,
    mine: random(1) > 0.7,
    minesSurrounding: 0,
    flag: false,
    numOfColms: allColm,
    thecolm: whatColm,
    numOfRow: allRow,
    therow: whatRow,
  };
  group.push(people);
}