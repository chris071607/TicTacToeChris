let cellWidth = 100;
let cellHeight = 100;
let canvasWidth = 800;
let canvasHeight = 600;
let startXpos = (canvasWidth - cellWidth * 3) / 2;
let startYpos = (canvasHeight - cellHeight * 3) / 2;
let cells = new Array(9).fill("white");
let currentPlayer = Math.random() < 0.5 ? "Blauw" : "Rood"; 
let winningPlayer = "?";
let gameEnded = false;
let restartButton;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  restartButton = createButton('Start opnieuw');
  restartButton.position(startXpos + cellWidth * 3 + 20, startYpos);
  restartButton.mousePressed(restartGame);
}

function draw() {
  background(220);
  textSize(24);
  textAlign(CENTER, TOP);
  fill(0);
  text(`${currentPlayer} is aan zet`, width / 2, 10);
  textSize(24);
  textAlign(CENTER, BOTTOM);
  

  if (winningPlayer === "Blauw") {
    fill("blue");
  } else if (winningPlayer === "Rood") {
    fill("red");
  } else {
    fill(0);
  }
  
  text(`Winnende speler: ${winningPlayer}`, width / 2, height - 10);

  // Speelraster
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      let x = startXpos + i * cellWidth;
      let y = startYpos + j * cellHeight;
      let cellColor = cells[index];
      stroke(0);
      fill(cellColor);
      rect(x, y, cellWidth, cellHeight);
    }
  }

  if (!gameEnded) {
    checkWin();
    checkDraw();
  }
}

function mouseClicked() {
  if (!gameEnded) {
    if (currentPlayer === "Blauw") {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let index = i * 3 + j;
          let x = startXpos + i * cellWidth;
          let y = startYpos + j * cellHeight;
          if (
            mouseX >= x &&
            mouseX <= x + cellWidth &&
            mouseY >= y &&
            mouseY <= y + cellHeight
          ) {
            if (cells[index] === "white") {
              cells[index] = "blue";
              currentPlayer = "Rood";
            }
          }
        }
      }
    } else if (currentPlayer === "Rood") {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let index = i * 3 + j;
          let x = startXpos + i * cellWidth;
          let y = startYpos + j * cellHeight;
          if (
            mouseX >= x &&
            mouseX <= x + cellWidth &&
            mouseY >= y &&
            mouseY <= y + cellHeight
          ) {
            if (cells[index] === "white") {
              cells[index] = "red";
              currentPlayer = "Blauw"; 
            }
          }
        }
      }
    }
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      cells[a] === cells[b] &&
      cells[b] === cells[c] &&
      cells[a] !== "white"
    ) {
      winningPlayer = currentPlayer === "Blauw" ? "Rood" : "Blauw"; // Aangepaste tekst
      gameEnded = true; 
      restartButton.show(); 
    }
  }
}

function checkDraw() {
  if (cells.every(cell => cell !== "white")) {
    winningPlayer = "Gelijkspel";
    gameEnded = true;
    restartButton.show();
  }
}

function restartGame() {
  cells = new Array(9).fill("white");
  currentPlayer = Math.random() < 0.5 ? "Blauw" : "Rood";
  winningPlayer = "?";
  gameEnded = false;
  restartButton.hide();
}
