import { EXTENDED_SLEEP_TIME, SLEEP_TIME, SPEEDS } from "./constants";
import { isEqual } from "./helpers";
import { PATH_TILE_STYLE, VISITED_STYLE } from "./styles";
import { SpeedType, TileType } from "./types";

export const animatePath = ({
  visitedTiles,
  path,
  startTile,
  endTile,
  speed,
}: {
  visitedTiles: TileType[];
  path: TileType[];
  startTile: TileType;
  endTile: TileType;
  speed: SpeedType;
}) => {
  const setDelay = (time: number, adjust: number) =>
    time * adjust * SPEEDS.find((s) => s.value === speed)!.value;
  for (let i = 0; i < visitedTiles.length; i++) {
    setTimeout(() => {
      const tile = visitedTiles[i];
      if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
        document.getElementById(
          `${tile.row}-${tile.col}`
        )!.className = `${VISITED_STYLE} animate-visited`;
      }
    }, setDelay(SLEEP_TIME, i));
  }

  setTimeout(() => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const tile = path[i];
        if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
          document.getElementById(
            `${tile.row}-${tile.col}`
          )!.className = `${PATH_TILE_STYLE} animate-path`;
        }
      }, setDelay(EXTENDED_SLEEP_TIME, i));
    }
  }, setDelay(SLEEP_TIME, visitedTiles.length));
};
