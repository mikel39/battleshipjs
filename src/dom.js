import { createGrids } from "./helper";

const colorGrids = (object) => {
  const grids = document.querySelectorAll("#ships-grid .grid-row");

  const addClass = (cl, arr) => {
    grids.forEach((element) => {
      const cord = element.getAttribute("data-coordinates").split(",");
      if (arr[0] == cord[0] && arr[1] == cord[1]) {
        element.classList.add(cl);
      }
    });
  };

  const keys = Object.keys(object);
  const values = Object.values(object);

  keys.forEach((key, index) => {
    values[index].forEach((value) => {
      value.forEach((v) => addClass(key, v));
    });
  });
};

const interfaceGrids = () => {
  const shipsGrid = document.getElementById("ships-grid");
  const attackGrid = document.getElementById("attack-grid");
  attackGrid.classList.add("hidden");

  shipsGrid.replaceChildren();
  attackGrid.replaceChildren();

  shipsGrid.appendChild(createGrids(10));
  attackGrid.appendChild(createGrids(10));
};

const colorAttacked = (coordinates) => {
  const attackGrid = document.getElementById("attack-grid");
  const element = attackGrid.querySelector(
    `div[data-coordinates = "${coordinates.join(",")}"]`,
  );
  element.classList.add("attacked");
};

const colorHitted = (coordinates) => {
  const attackGrid = document.getElementById("attack-grid");
  const element = attackGrid.querySelector(
    `div[data-coordinates = "${coordinates.join(",")}"]`,
  );
  element.classList.add("hitted");
};

const attacked = (coordinates) => {
  const shipsGrid = document.getElementById("ships-grid");
  const element = shipsGrid.querySelector(
    `div[data-coordinates = "${coordinates.join(",")}"]`,
  );
  element.textContent = "X";
};

const winAction = (winner) => {
  const dialog = document.getElementById("dialog-winner");

  const message = dialog.querySelector("p");

  message.textContent = "The winner is: " + winner;

  dialog.showModal();
};

const rotate = (n) => {
  const element = document.querySelector(`#select-ships > div:nth-child(${n})`);
  element.classList.toggle("rotate");
};

const playBtn = () => {
  const selectShipsElement = document.getElementById("select-ships");
  const attackGrid = document.getElementById("attack-grid");

  attackGrid.classList.toggle("hidden");
  selectShipsElement.classList.toggle("hidden");
};

const colorDraggedItem = (cord) => {
  const grids = document.querySelectorAll("#ships-grid .grid-row");
  const length =
    cord.length === 4
      ? "four"
      : cord.length === 3
        ? "three"
        : cord.length === 2
          ? "two"
          : "one";

  cord.forEach((cor) => {
    grids.forEach((e) => {
      const ec = e.getAttribute("data-coordinates").split(",");
      if (ec[0] == cor[0] && ec[1] == cor[1]) {
        e.classList.add(length);
      }
    });
  });
};

export {
  winAction,
  attacked,
  interfaceGrids,
  colorAttacked,
  colorGrids,
  colorHitted,
  rotate,
  playBtn,
  colorDraggedItem,
};
