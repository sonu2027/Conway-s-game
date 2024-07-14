let cell = document.querySelectorAll(".cell");

// Initially alive cell is empty
let alive = [];

// This function show all the alive cell as yellow color in grid
const showAlive = () => {
  for (let i = 0; i < 900; i++) {
    if (alive.includes(i)) {
      cell[i].style.background = "yellow";
    } else {
      cell[i].style.background = "gray";
    }
  }
};

// whenever the user click on any cell the number of position of cell will pushed in alive array
for (let i = 0; i < 900; i++) {
  cell[i].addEventListener("click", (e) => {
    if (
      e.target.attributes &&
      e.target.attributes.style &&
      e.target.attributes.style.nodeValue == "background: yellow;"
    ) {
      alive = alive.filter((element) => element != i);
    } else {
      alive.push(i);
    }
    showAlive();
  });
}

let start = document.getElementById("start");
let stop = document.getElementById("stop");
let stops = false;
let startRandomly = document.getElementById("startRandomly");

// This function return all the neighbour cell including dead neighbour cell
function getNeighbors(size, row, col) {
  let neighbors = [];

  const neighboursPosition = [
    [-1, 0], // Top
    [1, 0], // Bottom
    [0, -1], // Left
    [0, 1], // Right
    [-1, -1], // Top-left
    [-1, 1], // Top-right
    [1, -1], // Bottom-left
    [1, 1], // Bottom-right
  ];

  // calculating neighbour cell
  for (let i = 0; i < neighboursPosition.length; i++) {
    const newRow = row + neighboursPosition[i][0];
    const newCol = col + neighboursPosition[i][1];

    if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
      neighbors.push(newRow * 30 + newCol);
    }
  }

  return neighbors;
}

const startgame = () => {
  const interval = setInterval(() => {
    if (stops) {
      stops = false;
      clearInterval(interval);
    }

    let newAlive = alive;

    for (let i = 0; i < 900; i++) {
      let row = Math.floor(i / 30);
      let col = i % 30;

      // 30 is the number of row and column in a grid
      let neighbourCell = getNeighbors(30, row, col);

      // This filter all the alive neighbour cell
      let aliveNeighbourCell = neighbourCell.filter((e) => alive.includes(e));

      // That's is the codition which was given in question
      if (aliveNeighbourCell.length == 3 && !newAlive.includes(i))
        newAlive.push(i);
      else if (aliveNeighbourCell.length < 2 || aliveNeighbourCell.length > 3)
        newAlive = newAlive.filter((e) => e != i);

      // if alive cell length will be 0 then the interval will clear and stop working at that point
      if (alive.length == 0) clearInterval(interval);
    }

    //
    alive = newAlive;
    showAlive();
  }, 500);
};

start.addEventListener("click", (e) => {
  startgame();
});

stop.addEventListener("click", () => {
  stops = true;
});

startRandomly.addEventListener("click", () => {
  alive = [];
  const chooseNoOfAliveCell = Math.floor(Math.random() * 901) + 1;
  console.log(chooseNoOfAliveCell);

  for (let i = 0; i < chooseNoOfAliveCell; i++) {
    alive.push(Math.floor(Math.random() * 901));
    alive = [...new Set(alive)];
  }

  showAlive();
  startgame();
});
