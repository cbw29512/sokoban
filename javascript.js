const map = [  
  "   WWWWW ",  
  " WWW   W ",  
  " WOSB  W ",  
  " WWW BOW ",  
  " WOWWB W ",  
  " W W O WW",  
  " WB XBBOW",  
  " W   O  W",  
  " WWWWWWWW",
];

const main = document.getElementById("maze");

for (let rowAbsolute = 0; rowAbsolute < map.length; rowAbsolute++) {
    let row = map[rowAbsolute];
    let maze = document.createElement("div");
    maze.classList.add("mazeRow");
    for (let columnAbsolute = 0; columnAbsolute < row.length; columnAbsolute++) {
        let wall = document.createElement("div");
        wall.dataset.rowIndex = rowAbsolute;
        wall.dataset.cellIndex = columnAbsolute;
        maze.appendChild(wall);

            switch (row[columnAbsolute]) {
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

            case "X":
                wall.setAttribute("box", "boxDestination");
                wall.dataset.cellType = "end";
                break;
            
            case "B":
                wall.setAttribute("id","walkway");
                wall.dataset.cellType = "box";
                break;
            case "O":
                wall.setAttribute("box", "box");
                wall.dataset.cellType = "Destination";
                break;
        }
    }
    main.appendChild(maze)
}

let boxTop;
let boxLeft;
let x;
let y;
const player = document.getElementById("player");
let start = document.getElementById("start");
start.appendChild(player);
let currentPosition = start;
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            let nextPositionUp = Number(currentPosition.dataset.rowIndex) - 1;
            let nextMoveUp = document.querySelector("[data-row-index = '" + nextPositionUp + "'][data-cell-index = '" + currentPosition.dataset.cellIndex + "']");
            if (nextMoveUp.dataset.cellType === "floor") {
                nextMoveUp.appendChild(player);
                currentPosition = nextMoveUp;
            }
            break;

        case 'ArrowDown':
            let nextPositionDown = Number(currentPosition.dataset.rowIndex) + 1;
            let nextMoveDown = document.querySelector("[data-row-index = '" + nextPositionDown + "'][data-cell-index = '" + currentPosition.dataset.cellIndex + "']");
            if (nextMoveDown.dataset.cellType === "floor") {
                nextMoveDown.appendChild(player);
                currentPosition = nextMoveDown;
            }
            break;

        case 'ArrowLeft':
            let nextPositionLeft = Number(currentPosition.dataset.cellIndex) - 1;
            let nextMoveLeft = document.querySelector("[data-row-index = '" + currentPosition.dataset.rowIndex + "'][data-cell-index = '" + nextPositionLeft + "']");
            if (nextMoveLeft.dataset.cellType === "floor") {
                nextMoveLeft.appendChild(player);
                currentPosition = nextMoveLeft;
            }
            break;

        case 'ArrowRight':
            let nextPositionRight = Number(currentPosition.dataset.cellIndex) + 1;
            let nextMoveRight = document.querySelector("[data-row-index = '" + currentPosition.dataset.rowIndex + "'][data-cell-index = '" + nextPositionRight + "']");
            if (nextMoveRight.dataset.cellType === "floor") {
                nextMoveRight.appendChild(player);
                currentPosition = nextMoveRight;
            } else if (nextMoveRight.dataset.cellType === "end") {
                nextMoveRight.appendChild(player);
                currentPosition = nextMoveRight;
            }
            break;
    }
    
    document.getElementById("player").style.top = boxTop + "px";
    document.getElementById("player").style.left = boxLeft + "px";
    //document.getElementById("winningmessage").innerHTML = + winner + " You've Won";
})
