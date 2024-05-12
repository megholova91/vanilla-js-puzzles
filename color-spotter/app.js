/**
 ********* TO DO **********
 * create grid of n*n dimension
 *
 * fill grid with randomly generated color
 *
 * fill random cell with lighter shade
 *
 * on click of correct cell :-
 * 1) generate grid of (n+1)*(n+1) dimension
 * 2) add +1 to score
 *
 * on click of wrong cell :-
 * 1) shake grid for 800ms
 * 2) reset score
 *
 **/

(() => {
  let n = 3,
    score = 0;

  let ansRow = Math.floor(Math.random() * n);
  let ansCol = Math.floor(Math.random() * n);

  const gridContainer = document.getElementById("grid-container");
  const scoreContainer = document.getElementById("score");

  scoreContainer.innerHTML = score;

  function initializeGrid(color) {
    //call reset grid
    resetGrid();
    for (let i = 0; i < n; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < n; j++) {
        const col = document.createElement("div");
        col.classList.add("col");
        col.style.backgroundColor = color;
        if (i === ansRow && j === ansCol) {
          col.style.opacity = "0.8";
        }
        col.setAttribute("data-item", `${i}-${j}`);
        row.appendChild(col);
      }
      gridContainer.appendChild(row);
    }
  }

  function resetGrid() {
    gridContainer.innerText = "";
  }

  function resetGame(newScore, newDim) {
    score = newScore;
    n = newDim;
    scoreContainer.innerText = score;
    ansRow = Math.floor(Math.random() * n);
    ansCol = Math.floor(Math.random() * n);
    gridContainer.classList.remove("game-over");
    initializeGrid(generateRandomColor());
  }

  const generateRandomColor = () => {
    return "#" + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
  };

  const shakeGrid = () => {
    gridContainer.classList.add("game-over");
  };

  gridContainer.addEventListener("click", (evt) => {
    const { item } = evt.target.dataset;
    const [row, col] = item.split("-");
    if (ansRow === Number(row) && ansCol === Number(col)) {
      score++;
      n++;
      resetGame(score, n);
    } else {
      shakeGrid();
      setTimeout(function () {
        resetGame(0, 3);
      }, 800);
    }
  });

  initializeGrid(generateRandomColor());
})();
