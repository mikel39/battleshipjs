import { randomCoordinates, shipsLengths } from "./utils.js";

class Ship {
  #hitted = 0;
  #sunk = false;

  constructor(length) {
    this.length = length;
  }

  hit() {
    this.#hitted++;
    this.#sunk = this.#hitted === this.length;
  }

  isSunk() {
    return this.#sunk;
  }
}

class Gameboard {
  #ships = [];
  #trackCoordinates = [];

  constructor() {
    this.missedHits = [];
  }

  createShip(length) {
    const ship = new Ship(length);
    const coordinates = [];
    const r = { ship, coordinates };
    return r;
  }

  receiveAttack(coordinates) {
    const [coordinateX, coordinateY] = coordinates;
    let ship = null;

    this.#ships.forEach((sp) => {
      sp.coordinates.forEach((coordinate) => {
        if (coordinate[0] === coordinateX && coordinate[1] === coordinateY)
          ship = sp;
      });
    });

    !ship ? this.missedHits.push(coordinates) : ship.ship.hit();
    return !ship ? null : true;
  }

  placeShip(ship, coordinate) {
    const shipLength = ship.ship.length;

    const checkCoordinate = (test) => {
      if (test[0] > 10 || test[1] > 10 || test[0] < 1 || test[1] < 1)
        return null;

      return !this.#trackCoordinates.some(
        (cord) => cord[0] === test[0] && cord[1] === test[1],
      );
    };

    const getAllCord = (start, step, index) => {
      const result = [];
      let current = [...start];

      for (let i = 0; i < shipLength; i++) {
        result.push([...current]);
        current[index] += step;
      }

      return result;
    };

    let index = Math.round(Math.random());
    let step = index === 1 ? -1 : 1;
    const start = [...coordinate];
    let condition = null;
    let arr = null;

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        arr = getAllCord(start, step, index);
        condition = arr.every((e) => checkCoordinate(e));
        if (condition) break;
        step = step === -1 ? 1 : -1;
      }
      if (condition) break;
      index = Math.abs(index - 1);
    }

    if (condition) {
      this.#ships.push(ship);
      arr.forEach((e) => {
        this.#trackCoordinates.push(e);
        ship.coordinates.push(e);
      });
    } else {
      return null;
    }
  }

  randomFloat() {
    this.reset();

    const check = (cntes) => {
      return this.#trackCoordinates.some(
        (cur) => cur[0] === cntes[0] && cur[1] === cntes[1],
      );
    };

    const lengths = shipsLengths();

    while (this.#ships.length < 10) {
      let coordinates = randomCoordinates();
      let condition = check(coordinates);
      while (condition) {
        coordinates = randomCoordinates();
        condition = check(coordinates);
      }
      const ship = this.createShip(lengths[this.#ships.length]);

      this.placeShip(ship, coordinates);
    }
  }

  draggedShip(coordinates) {
    const ship = new Ship();

    this.#ships.push({ coordinates, ship });
  }

  reset() {
    this.#ships.length = 0;
    this.#trackCoordinates.length = 0;
    this.#trackCoordinates.length = 0;
  }

  getAllCoordinates() {
    return [...this.#trackCoordinates];
  }

  getShips() {
    const array = this.#ships.map((ship) => ship.coordinates);

    return {
      four: array.filter((arr) => arr.length === 4),
      three: array.filter((arr) => arr.length === 3),
      two: array.filter((arr) => arr.length === 2),
      one: array.filter((arr) => arr.length === 1),
    };
  }
  ships() {
    return [...this.#ships];
  }
}

class Player {
  constructor(type = "Human") {
    this.type = type;
    this.gameboard = new Gameboard();
  }
  hasLost() {
    const ships = this.gameboard.ships().map((e) => e.ship);

    return ships.every((sh) => sh.isSunk());
  }

  resetGame() {
    this.gameboard = new Gameboard();
  }
}

export { Ship, Gameboard, Player };
