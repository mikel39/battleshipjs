const createGrids = (size) => {
  const container = document.createElement("div");
  container.classList = "grid-container";

  //tags for X
  const tagsX = () => {
    const container = document.createElement("div");
    container.classList = "tags-x";

    for (let i = 0; i < size; i++) {
      const tagX = document.createElement("p");
      tagX.textContent = String.fromCharCode(65 + i);
      container.appendChild(tagX);
    }
    return container;
  };

  //tags for Y
  const tagsY = () => {
    const container = document.createElement("div");
    container.classList = "tags-y";
    for (let i = 0; i < size; i++) {
      const tagY = document.createElement("p");
      tagY.textContent = i + 1;
      container.appendChild(tagY);
    }
    return container;
  };

  //grid
  const grid = () => {
    const container = document.createElement("div");
    container.classList = "grid";
    let x = 1;
    let y = 1;

    for (let i = 0; i < size * size; i++) {
      const grid = document.createElement("div");
      grid.classList = "grid-row";
      grid.setAttribute("data-coordinates", `${x++},${y}`);

      if (x > 10) {
        x = 1;
        y++;
      }

      container.appendChild(grid);
    }
    return container;
  };

  container.appendChild(tagsX());
  container.appendChild(tagsY());
  container.appendChild(grid());

  return container;
};

export { createGrids };
