const chessboardContainer = document.getElementById('chessboard-container');
const matrixDim = 8;

for (let row = 0; row < matrixDim; row++) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('rowContainer');
    for (let col = 0; col < matrixDim; col++) {
        const square = document.createElement('div');
        if (row % 2 == 0) {
            square.classList.add('square');
        } else {
            square.classList.add('evenSquare');
        }
        square.id = `${row}-${col}`;
        rowContainer.appendChild(square);

        square.onclick = function () {
            for (let i = 0; i < matrixDim; i++) {
                for (let j = 0; j < matrixDim; j++) {
                    const diagonalElement = document.getElementById(`${i}-${j}`);
                    if (diagonalElement) {
                        if (Math.abs(row - i) == Math.abs(col - j)) {
                            diagonalElement.classList.add('highlighted-cell');
                        } else {
                            diagonalElement.classList.remove('highlighted-cell');
                        }
                    }
                }
            }
        }
    }
    chessboardContainer.appendChild(rowContainer);
}