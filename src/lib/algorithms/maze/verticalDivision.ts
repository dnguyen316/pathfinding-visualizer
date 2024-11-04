import { SPEEDS } from "../../../utils/constants";
import { getRandInt, isEqual, sleep } from "../../../utils/helpers";
import { WALL_TILE_STYLE } from "../../../utils/styles";
import { GridType, TileType } from "../../../utils/types";
import { recursiveDivision } from "./recursiveDivision";

export const verticalDivision = async ({
  row,
  col,
  grid,
  width,
  speed,
  height,
  endTile,
  startTile,
  setIsDisabled,
}: {
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
  row: number;
  col: number;
  height: number;
  width: number;
  setIsDisabled: (isDisabled: boolean) => void;
  speed: number;
}) => {
  const makeWallAt = col + getRandInt(0, width - 1) * 2 + 1;
  const makePassageAt = row + getRandInt(0, height) * 2;

  for (let i = 0; i < 2 * height - 1; i++) {
    if (makePassageAt !== row + i) {
      if (
        !isEqual(grid[row + i][makeWallAt], startTile) &&
        !isEqual(grid[row + i][makeWallAt], endTile)
      ) {
        grid[row + i][makeWallAt].isWall = true;

        document.getElementById(
          `${row + i}-${makeWallAt}`
        )!.className = `${WALL_TILE_STYLE} animate-wall`;
        await sleep(10 * SPEEDS.find((s) => s.value === speed)!.value - 5);
      }
    }
  }

  await recursiveDivision({
    row,
    col,
    grid,
    speed,
    height,
    endTile,
    startTile,
    setIsDisabled,
    width: (makeWallAt - col + 1) / 2,
  });

  await recursiveDivision({
    row,
    grid,
    speed,
    height,
    endTile,
    startTile,
    setIsDisabled,
    col: makeWallAt + 1,
    width: width - (makeWallAt - col + 1) / 2,
  });
};
