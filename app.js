const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

const startCells = ["", "", "", "", "", "", "", "", ""];

let go = "circle";
infoDisplay.textContent = "Circle Goes First";
function createBoard() {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
}

createBoard();
function addGo(e) {
  const goDisplay = document.createElement("div");
  console.log(e.target);
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  if (go === "circle") {
    go = "cross";
    infoDisplay.textContent = "Now Its Cross Turn";
  } else {
    go = "circle";
    infoDisplay.textContent = "Now Its Circle Turn";
  }
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const allSquare = document.querySelectorAll(".square");
  //console.log(allSquare);
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombos.forEach((Array) => {
    const circleWin = Array.every((cell) =>
      allSquare[cell].firstChild?.classList.contains("circle")
    );
    if (circleWin) {
      infoDisplay.textContent = "Circle Wins";
      allSquare.forEach((cell) => {
        cell.removeEventListener("click", addGo);
      });
      return;
    }
  });

  winningCombos.forEach((Array) => {
    const crossWin = Array.every((cell) =>
      allSquare[cell].firstChild?.classList.contains("cross")
    );
    if (crossWin) {
      infoDisplay.textContent = "Cross Wins";
      allSquare.forEach((cell) => {
        cell.removeEventListener("click", addGo);
      });
      return;
    }
  });
}
