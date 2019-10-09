const map = [
  "  WWWWW ",
  "WWW   W ",
  "WOSB  W ",
  "WWW BOW ",
  "WOWWB W ",
  "W W O WW",
  "WB XBBOW",
  "W   O  W",
  "WWWWWWWW"
];
let currentX = 2;
let currentY = 2;
// let currentPosition = map[currentY][currentX];
const main = document.getElementById("maze");
const winMesssage = document.getElementById("winningmessage");
let gameOver = false;

function renderMaze() {
  let rowcontainer = document.createElement("div");
  for (let rowAbsolute = 0; rowAbsolute < map.length; rowAbsolute++) {
    let row = map[rowAbsolute];
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("mazeRow");
    for (
      let columnAbsolute = 0;
      columnAbsolute < row.length;
      columnAbsolute++
    ) {
      let wall = document.createElement("div");
      wall.dataset.rowIndex = rowAbsolute;
      wall.dataset.cellIndex = columnAbsolute;
      rowDiv.appendChild(wall);

      switch (row[columnAbsolute]) {
        case "C":
          wall.setAttribute("id", "start");
          break;

        case "W":
          wall.classList.add("wall");
          wall.dataset.cellType = "border";
          break;

        case "S":
          wall.setAttribute("id", "start");
          wall.dataset.cellType = "start";
          break;

        case " ":
          wall.classList.add("walkway");
          wall.dataset.cellType = "floor";
          break;

        case "B":
          wall.setAttribute("id", "box");
          wall.dataset.cellType = "box";
          break;

          let box = document.createElement("div");
          box.dataset.cellType = "box";
          cell.appendChild("box");

        case "O":
          wall.setAttribute("id", "emptyStorage");
          wall.dataset.cellType = "emptyStorage";
          break;

        case "X":
          wall.setAttribute("id", "boxOnStart");
          wall.dataset.cellType = "boxOnStart";
          break;
      }
    }
    rowcontainer.appendChild(rowDiv);
    //     main.appendChild(maze);
  }

  if (main.childNodes[0]) {
    main.removeChild(main.childNodes[0]);
  }
  main.appendChild(rowcontainer);
}
renderMaze();
const player = document.getElementById("player");
let start = document.getElementById("start");
start.appendChild(player);
let currentPosition = start;

document.addEventListener("keydown", handleMove);

function makeMoveTwo(x, y) {
  let nextX = currentX + x;
  let nextY = currentY + y;
  let nextPosition = map[nextY][nextX];
  let nextnextX = currentX + 2 * x;
  let nextnextY = currentY + 2 * y;
  let nextNextPosition = map[nextnextY][nextnextX];
  if (nextPosition === "B") {
    map[nextY][nextX] = " ";
    if (nextNextPosition === "O") {
      map[nextnextY][nextnextX] = "X";
    } else {
      map[nextnextY][nextnextX] = "B";
    }
  }
  if (nextPosition === "X") {
    map[nextY][nextX] = "O";
    map[nextnextY][nextnextX] = "B";
  }

  if (map[currentY][currentX] === "S") {
    map[currentY][currentX] = " ";
  }
  if (map[currentY][currentX] === "C") {
    map[currentY][currentX] = "O";
  }
  if (nextPosition === " ") {
    map[nextY][nextX] = "S";
  }
  if (nextPosition === "O") {
    map[nextY][nextX] = "C";
  }
  currentX = nextX;
  currentY = nextY;
  //   return [currentX, currentY];
}

function handleMove(event) {
  let xyArray;
  if (gameOver === false) {
    switch (event.key) {
      case "ArrowUp":
        if (legalMove(0, -1)) {
          makeMoveTwo(0, -1);
          renderMaze();
          //   makeMove(0, -1);
        }
        break;

      case "ArrowDown":
        if (legalMove(0, +1)) {
          makeMoveTwo(0, +1);
          renderMaze();
        }
        break;

      case "ArrowLeft":
        if (legalMove(-1, 0)) {
          makeMoveTwo(-1, 0);
          renderMaze();
        }
        break;

      case "ArrowRight":
        if (legalMove(+1, 0)) {
          makeMoveTwo(+1, 0);
          renderMaze();
        }
        break;
    }
  }
}

function makeMove(x, y) {
  let nextPositionUp = Number(currentPosition.dataset.rowIndex) + y;
  let nextPositionLeft = Number(currentPosition.dataset.cellIndex) + x;
  let nextMoveUp = document.querySelector(
    "[data-row-index = '" +
      nextPositionUp +
      "'][data-cell-index = '" +
      nextPositionLeft +
      "']"
  );
  if (
    nextMoveUp.dataset.cellType === "floor" ||
    nextMoveUp.dataset.cellType === "box"
  ) {
    nextMoveUp.appendChild(player);
    currentPosition = nextMoveUp;
    if (nextMoveUp.dataset.cellType === "end") {
    }
  }
}

function legalMove(x, y) {
  let nextX = currentX + x;
  let nextY = currentY + y;
  let nextPosition = map[nextY][nextX];
  let nextnextX = currentX + 2 * x;
  let nextnextY = currentY + 2 * y;
  let nextNextPosition = map[nextnextY][nextnextX];
  if (nextPosition === " " || nextPosition === "O") {
    return true;
  }
  if (
    nextPosition === "B" &&
    (nextNextPosition === " " || nextNextPosition === "O")
  ) {
    return true;
  }
  if (
    nextPosition === "X" &&
    (nextNextPosition == " " || nextNextPosition === "O")
  ) {
    return true;
  }
  return false;
}
