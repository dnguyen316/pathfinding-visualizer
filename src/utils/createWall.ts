import { MAX_COLS, MAX_ROWS, SPEEDS } from "./constants";
import { isRowColEqual } from "./helpers";
import { WALL_TILE_STYLE } from "./styles";
import { SpeedType, TileType } from "./types";

export const createWall = ({
  speed,
  endTile,
  startTile,
}: {
  speed: SpeedType;
  endTile: TileType;
  startTile: TileType;
}) => {
  const delay = 6 * SPEEDS.find((s) => s.value === speed)!.value - 1;
  for (let row = 0; row < MAX_ROWS; row++) {
    setTimeout(() => {
      for (let col = 0; col < MAX_COLS; col++) {
        if (row % 2 === 0 || col % 2 === 0) {
          if (
            !isRowColEqual(row, col, startTile) &&
            !isRowColEqual(row, col, endTile)
          ) {
            setTimeout(() => {
              document.getElementById(
                `${row}-${col}`
              )!.className = `${WALL_TILE_STYLE} animate-wall`;
            }, delay * col);
          }
        }
      }
    }, delay * (MAX_ROWS / 2) * row);
  }
};
