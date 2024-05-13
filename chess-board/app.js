(() => {
  const chessboardContainer = document.getElementById("chessboard-container");
  const matrixDim = 8;

  const createGrid = () => {
    for (let row = 0; row < matrixDim; row++) {
      const rowContainer = document.createElement("div");
      rowContainer.classList.add("rowContainer");
      for (let col = 0; col < matrixDim; col++) {
        const square = document.createElement("div");
        if (row % 2 == 0) {
          square.classList.add("square");
        } else {
          square.classList.add("evenSquare");
        }
        square.dataset.cell = `${row}-${col}`;
        rowContainer.appendChild(square);
      }
      chessboardContainer.appendChild(rowContainer);
    }
  };

  chessboardContainer.onclick = (event) => {
    const { cell } = event.target.dataset;
    if (cell) {
      const [row, col] = cell.split("-");
      for (let i = 0; i < matrixDim; i++) {
        for (let j = 0; j < matrixDim; j++) {
          const elem = document.querySelector(`[data-cell="${i}-${j}"`);
          if (Math.abs(row - i) == Math.abs(col - j)) {
            elem.classList.add("highlighted-cell");
          } else {
            elem.classList.remove("highlighted-cell");
          }
        }
      }
    }
  };

  createGrid();
})();
