import { MAX_COLS, MAX_ROWS, SLEEP_TIME } from "./constants";
import { isEqual, sleep } from "./helpers";
import { GridType, TileType } from "./types";
import { WALL_TILE_STYLE } from "./styles";

export const constructBorder = async ({
  grid,
  startTile,
  endTile,
}: {
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
}) => {
  const shapes = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: -1, col: 0 },
  ];

  let row = 0,
    col = 0;

  for (let i = 0; i < 4; i++) {
    const direction = shapes[i];
    while (
      row + direction.row >= 0 &&
      row + direction.row < MAX_ROWS &&
      col + direction.col >= 0 &&
      col + direction.col < MAX_COLS
    ) {
      row += direction.row;
      col += direction.col;

      if (
        !isEqual(grid[row][col], startTile) &&
        !isEqual(grid[row][col], endTile)
      ) {
        grid[row][col].isWall = true;
        const tileEle = document.getElementById(`${row}-${col}`);
        if (tileEle) {
          tileEle.classList.add(...WALL_TILE_STYLE.split(" "), "animate-wall");
        }
        await sleep(SLEEP_TIME);
      }
    }

    if (row < 0) row = 0;
    if (row >= MAX_ROWS) row = MAX_ROWS - 1;
    if (col < 0) col = 0;
    if (row >= MAX_COLS) row = MAX_COLS - 1;
  }
};
