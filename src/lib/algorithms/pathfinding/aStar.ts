import { getUnvisitedNeighbors } from "../../../utils/getUnvisitedNeighbors";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
import { initFunctionCost, initHeuristicCost } from "../../../utils/heuristics";
import { GridType, TileType } from "../../../utils/types";

export const aStar = ({
  grid,
  startTile,
  endTile,
}: {
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
}) => {
  const visitedTiles = [];
  const heuristicCost = initHeuristicCost(grid, endTile);
  const functionCost = initFunctionCost();

  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  functionCost[base.row][base.col] =
    base.distance + heuristicCost[base.row][base.col];
  base.isVisited = true;
  const unVisitedTiles = [base];

  while (unVisitedTiles.length) {
    unVisitedTiles.sort((a, b) => {
      if (functionCost[a.row][a.col] === functionCost[b.row][b.col]) {
        return b.distance - a.distance;
      }

      return functionCost[a.row][a.col] - functionCost[b.row][b.col];
    });

    const currentTile = unVisitedTiles.shift();
    if (currentTile) {
      if (currentTile.isWall) continue;
      if (currentTile.distance === Infinity) break;
      currentTile.isVisited = true;
      visitedTiles.push(currentTile);
      if (isEqual(currentTile, endTile)) break;

      const neighbors = getUnvisitedNeighbors(grid, currentTile);
      for (const neighbor of neighbors) {
        const distanceToNeighbor = currentTile.distance + 1;
        if (distanceToNeighbor < neighbor.distance) {
          dropFromQueue(neighbor, unVisitedTiles);
          neighbor.distance = distanceToNeighbor;
          functionCost[neighbor.row][neighbor.col] =
            neighbor.distance + heuristicCost[neighbor.row][neighbor.col];
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
