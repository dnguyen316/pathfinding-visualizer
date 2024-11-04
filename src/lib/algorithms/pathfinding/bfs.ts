import { getUnvisitedNeighbors } from "../../../utils/getUnvisitedNeighbors";
import { isEqual } from "../../../utils/helpers";
import { isInQueue } from "../../../utils/isInQueue";
import { GridType, TileType } from "../../../utils/types";

export const bfs = ({
  grid,
  startTile,
  endTile,
}: {
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
}) => {
  const visitedTiles: TileType[] = [];
  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.isVisited = true;
  const unVisited = [base];

  while (unVisited.length) {
    const currentTile = unVisited.shift();
    if (currentTile) {
      if (currentTile.isWall) continue;
      if (currentTile.distance === Infinity) break;
      currentTile.isVisited = true;
      visitedTiles.push(currentTile);
      if (isEqual(currentTile, endTile)) break;

      const neighbors = getUnvisitedNeighbors(grid, currentTile);
      for (const neighbor of neighbors) {
        if (!isInQueue(neighbor, unVisited)) {
          neighbor.distance = currentTile.distance + 1;
          neighbor.parent = currentTile;
          unVisited.push(neighbor);
        }
      }
    }
  }

  const path = [];
  let tile = grid[endTile.row][endTile.col];
  while (tile !== null) {
    tile.isPath = true;
    path.unshift(tile);
    tile = tile.parent!;
  }

  return { visitedTiles, path };
};
