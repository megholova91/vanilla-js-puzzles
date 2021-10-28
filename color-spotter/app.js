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

const gridContainer = document.getElementById('grid-container');
const scoreContainer = document.getElementById('score');
var n = 4;
var score = 0;
scoreContainer.innerHTML = score;

const renderGrid = () => {
    clearGrid();
    const color = generateRandomColor();
    const randomRow = Math.floor(Math.random() * n);
    const randomCol = Math.floor(Math.random() * n);
    for (let row = 0; row < n; row++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        for (let col = 0; col < n; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.background = color;
            const uniqueCell = row === randomRow && col === randomCol;
            if (uniqueCell) {
                cell.style.opacity = '0.8';
            }
            cell.onclick = function () {
                if (uniqueCell) {
                    n++;
                    score++;
                    renderGridWithScore();
                } else {
                    score = 0;
                    n = 4;
                    gridContainer.classList.add('game-over');
                    setTimeout(() => {
                        renderGridWithScore();
                    }, 900);
                }

            }
            gridRow.appendChild(cell);
        }
        gridContainer.appendChild(gridRow);
    }

}

const clearGrid = () => {
    while (gridContainer.hasChildNodes()) {
        gridContainer.lastChild.remove();
    }
    gridContainer.classList.remove('game-over');
}

const renderGridWithScore = () => {
    renderGrid();
    scoreContainer.innerHTML = score;
}

const generateRandomColor = () => {
    return '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
}

renderGrid();