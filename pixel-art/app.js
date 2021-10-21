const gridContainer = document.getElementById('grid-container');
const colorPalette = document.getElementById('color-palette');

const colors = [];
let selectedColor = '';

for (let row = 0; row < 10; row++) {
    const rowNode = document.createElement('div');
    rowNode.classList.add('row');
    for (let col = 0; col < 10; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.onclick = function () {
            if(selectedColor) {
                cell.style.background = selectedColor;
            }
        }
        rowNode.appendChild(cell);
    }
    gridContainer.appendChild(rowNode);
}

for (let count = 0; count < 10; count++) {
    const colorCell = document.createElement('div');
    colorCell.classList.add('cell', 'color-cell');
    const color = generateRandomColor();
    colorCell.style.background = color;
    colors.push(color);
    colorCell.onclick = function () {
        selectedColor = color;
    }
    colorPalette.appendChild(colorCell);
}

function generateRandomColor() {
    let newColor = '';
    do {
        newColor = '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
    } while (colors.indexOf(newColor) > -1);
    return newColor;
}