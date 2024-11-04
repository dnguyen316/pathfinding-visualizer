import { isEqual } from "./helpers";
import { TileType } from "./types";

export const isInQueue = (tile: TileType, queue: TileType[]) => {
  for (const q of queue) {
    if (isEqual(tile, q)) return true;
  }

  return false;
};
