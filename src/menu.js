function populateMenu() {
  const grids = document.querySelectorAll("#select-ships > div > div");

  grids.forEach((e) => {
    e.classList.toggle("hidden");
  });
}

function hideShips() {
  const grids = document.querySelectorAll("#select-ships > div > div");

  grids.forEach((e) => {
    e.classList.add("hidden");
  });
}

export { populateMenu, hideShips };
