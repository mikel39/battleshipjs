import { expect, test } from "vitest";
import { randomCoordinates } from "../utils";

test("random coordinates", () => {
  const random = randomCoordinates();
  expect(random[0]).toBeGreaterThanOrEqual(1);
  expect(random[1]).toBeGreaterThanOrEqual(1);
  expect(random[0]).toBeLessThanOrEqual(10);
  expect(random[1]).toBeLessThanOrEqual(10);
});
