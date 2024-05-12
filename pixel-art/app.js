(() => {
  const gridContainer = document.getElementById("grid-container");
  const colorPalette = document.getElementById("color-palette");

  const colors = [];
  let selectedColor = "";

  for (let row = 0; row < 10; row++) {
    const rowNode = document.createElement("div");
    rowNode.classList.add("row");
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-cell", true);
      rowNode.appendChild(cell);
    }
    gridContainer.appendChild(rowNode);
  }

  for (let count = 0; count < 10; count++) {
    const colorCell = document.createElement("div");
    colorCell.classList.add("cell", "color-cell");
    const color = generateRandomColor();
    colorCell.style.background = color;
    colorCell.setAttribute("data-color", color);
    colors.push(color);
    colorPalette.appendChild(colorCell);
  }

  colorPalette.addEventListener("click", (event) => {
    const item = event.target;
    if (item.dataset.color) {
      selectedColor = item.dataset.color;
    }
  });

  gridContainer.addEventListener("click", (event) => {
    const item = event.target;
    if (item.dataset.cell && selectedColor) {
      item.style.background = selectedColor;
    }
  });

  function generateRandomColor() {
    let newColor = "";
    do {
      newColor =
        "#" + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
    } while (colors.indexOf(newColor) > -1);
    return newColor;
  }
})();
