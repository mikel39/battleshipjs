const randomCoordinates = () => {
  const x = Math.floor(Math.random() * 10) + 1;
  const y = Math.floor(Math.random() * 10) + 1;
  return [x, y];
};

const shipsLengths = () => {
  const result = [];
  let count = 1;
  let c = 4;

  while (count <= 4) {
    for (let i = 0; i < count; i++) {
      result.push(c);
    }
    c--;
    count++;
  }

  return result;
};

const table = () => {
  const result = [];

  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      result.push([i, j]);
    }
  }

  return result;
};

const sanitizeArr = (arr) => {
  arr.forEach((element, index) => {
    arr[index] = Number(element);
  });

  return arr;
};

const getNumberOfChild = (parent, child) => {
  parent = Array.from(parent);
  return parent.indexOf(child);
};
export {
  randomCoordinates,
  shipsLengths,
  table,
  sanitizeArr,
  getNumberOfChild,
};
