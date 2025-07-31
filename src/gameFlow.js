import { Player } from "./battleship";
import { Computer } from "./computer";
import {
  attacked,
  colorAttacked,
  colorGrids,
  colorHitted,
  winAction,
  interfaceGrids,
  colorDraggedItem,
} from "./dom";
import { sanitizeArr } from "./utils";

const gameFlow = () => {
  const human = new Player("human");
  const computer = new Computer();

  computer.player.gameboard.randomFloat();

  const random = () => {
    interfaceGrids();
    human.gameboard.randomFloat();
    colorGrids(human.gameboard.getShips());
  };

  const play = (coordinates) => {
    coordinates = sanitizeArr(coordinates);

    const hit = computer.player.gameboard.receiveAttack(coordinates);
    colorAttacked(coordinates);
    if (hit) colorHitted(coordinates);

    if (computer.player.hasLost()) {
      winAction("You");
      return;
    }

    const computerCord = computer.randomAtack();
    human.gameboard.receiveAttack(computerCord);
    attacked(computerCord);

    if (human.hasLost()) {
      winAction("Computer");
      return;
    }
  };

  const placeDraggedItem = (length, nth, coordinate, isVertical) => {
    const allCoordinates = [];
    coordinate = coordinate.map((e) => Number(e));

    for (let i = 0; i < length; i++) {
      if (isVertical) {
        allCoordinates.push([coordinate[0], coordinate[1] - nth]);
      } else {
        allCoordinates.push([coordinate[0] - nth, coordinate[1]]);
      }
      nth--;
    }
    colorDraggedItem(allCoordinates);
    human.gameboard.draggedShip(allCoordinates);
  };

  const reseGame = () => {
    human.gameboard.reset();
    computer.player.gameboard.reset();
    computer.player.gameboard.randomFloat();
  };

  return { play, random, placeDraggedItem, reseGame };
};

export { gameFlow };
