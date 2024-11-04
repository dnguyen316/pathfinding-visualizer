import { GridType, TileType } from "../../../utils/types";
import { horizontalDivision } from "./horizontalDivision";
import { verticalDivision } from "./verticalDivision";

export const recursiveDivision = async ({
  grid,
  startTile,
  endTile,
  row,
  col,
  height,
  width,
  setIsDisabled,
  speed,
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
  // base case recursion
  if (height <= 1 || width <= 1) {
    return;
  }

  if (height > width) {
    await horizontalDivision({
      row,
      col,
      grid,
      width,
      speed,
      height,
      endTile,
      startTile,
      setIsDisabled,
    });
  } else {
    await verticalDivision({
      row,
      col,
      grid,
      width,
      speed,
      height,
      endTile,
      startTile,
      setIsDisabled,
    });
  }
};
