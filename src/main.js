import "./styles.css";
import { interfaceGrids, playBtn } from "./dom.js";
import { gameFlow } from "./gameFlow.js";
import { getNumberOfChild } from "./utils";
import { populateMenu, hideShips } from "./menu.js";

document.addEventListener("DOMContentLoaded", () => {
  interfaceGrids();

  const game = gameFlow();

  document.getElementById("random").addEventListener("click", () => {
    game.random();
    hideShips();
  });

  document.getElementById("select-ships").addEventListener("click", (e) => {
    if (e.target.classList.contains("grid-row")) {
      e.target.parentElement.classList.toggle("rotate");
    }
  });

  ///drag over
  let numDragItem = null;
  let vertical = null;
  let length = null;
  let element = null;

  document.getElementById("select-ships").addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("select-ship")) {
      numDragItem = getNumberOfChild(
        e.target.children,
        document.elementFromPoint(e.clientX, e.clientY),
      );

      vertical = e.target.classList.contains("rotate");
      length = e.target.children.length;
      element = e.target;
    }
  });

  document.querySelector("#ships-grid").addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  document.querySelector("#ships-grid").addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("grid-row")) {
      const cord = e.target.getAttribute("data-coordinates").split(",");
      game.placeDraggedItem(length, numDragItem, cord, vertical);
      element.classList.toggle("hidden");
    }
  });

  ///

  document.querySelector("#play").addEventListener("click", playBtn);

  document.getElementById("attack-grid").addEventListener("click", (e) => {
    if (
      e.target.classList.contains("grid-row") &&
      !e.target.classList.contains("attacked")
    ) {
      const coordinates = e.target.getAttribute("data-coordinates").split(",");
      game.play(coordinates);
    }
  });

  document.querySelector(".reset-button").addEventListener("click", () => {
    game.reseGame();
    playBtn();
    document.querySelector("dialog").close();
    interfaceGrids();
    populateMenu();
  });
});
