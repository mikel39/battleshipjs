import { Player } from "./battleship";
import { table } from "./utils.js";

class Computer {
  constructor() {
    this.player = new Player("computer");
    this.attacks = table();
  }

  randomAtack() {
    const rdmIndex = Math.floor(Math.random() * this.attacks.length);
    const element = this.attacks[rdmIndex];
    this.attacks.splice(rdmIndex, 1);

    return element;
  }
}

export { Computer };
