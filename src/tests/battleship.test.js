import { expect, test } from "vitest";
import { Ship } from "../battleship";

test("test Ship class", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBeFalsy();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});
