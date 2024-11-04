import { getUnvisitedNeighbors } from "../../../utils/getUnvisitedNeighbors";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const dijkstra = ({
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
  const unVisitedTiles = [base];

  while (unVisitedTiles.length > 0) {
    unVisitedTiles.sort((a, b) => a.distance - b.distance);
    const currentTile = unVisitedTiles.shift();
    if (currentTile) {
      if (currentTile.isWall) continue;
      if (currentTile.distance === Infinity) break;
      currentTile.isVisited = true;
      visitedTiles.push(currentTile);
      if (isEqual(currentTile, endTile)) break;
      const neighbors = getUnvisitedNeighbors(grid, currentTile);
      for (const neighbor of neighbors) {
        if (currentTile.distance + 1 < neighbor.distance) {
          dropFromQueue(neighbor, unVisitedTiles);
          neighbor.distance = currentTile.distance + 1;
          neighbor.parent = currentTile;
          unVisitedTiles.push(neighbor);
        }
      }
    }
  }

  const path = [];
  let current = grid[endTile.row][endTile.col];
  while (current !== null) {
    current.isPath = true;
    path.unshift(current);
    current = current.parent!;
  }

  return { visitedTiles, path };
};
