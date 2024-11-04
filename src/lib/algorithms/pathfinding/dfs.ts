import { getUnvisitedNeighbors } from "../../../utils/getUnvisitedNeighbors";
import { checkStack, isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const dfs = ({
  grid,
  startTile,
  endTile,
}: {
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
}) => {
  const visitedTiles = [];
  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.isVisited = true;
  const unVisited = [base];

  while (unVisited.length) {
    const currentTile = unVisited.pop();
    if (currentTile) {
      if (currentTile.isWall) continue;
      if (currentTile.distance === Infinity) break;
      currentTile.isVisited = true;
      visitedTiles.push(currentTile);
      if (isEqual(currentTile, endTile)) break;
      const neighbors = getUnvisitedNeighbors(grid, currentTile);
      for (const neighbor of neighbors) {
        if (!checkStack(neighbor, unVisited)) {
          neighbor.distance = currentTile.distance + 1;
          neighbor.parent = currentTile;
          unVisited.push(neighbor);
        }
      }
    }
  }

  const path = [];
  let currentTile = grid[endTile.row][endTile.col];
  while (currentTile !== null) {
    currentTile.isPath = true;
    path.unshift(currentTile);
    currentTile = currentTile.parent!;
  }

  return { visitedTiles, path };
};
