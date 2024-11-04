import { binaryTree } from "../lib/algorithms/maze/binaryTree";
import { recursiveDivision } from "../lib/algorithms/maze/recursiveDivision";
import {
  END_TILE_CONFIG,
  MAX_COLS,
  MAX_ROWS,
  SPEEDS,
  START_TILE_CONFIG,
} from "./constants";
import { constructBorder } from "./constructBorder";
import { TILE_STYLE } from "./styles";
import { GridType, MazeType, SpeedType, TileType } from "./types";

export const createRow = (
  row: number,
  startTile: TileType,
  endTile: TileType
) => {
  const currentRow = [];

  for (let col = 0; col < MAX_COLS; col++) {
    currentRow.push({
      row,
      col,
      isEnd: row === endTile.row && col === endTile.col,
      isWall: false,
      isPath: false,
      distance: Infinity,
      isStart: row === startTile.row && col === startTile.col,
      isVisited: false,
      parent: null,
    });
  }

  return currentRow;
};

export const isEqual = (a: TileType, b: TileType) => {
  return a.row === b.row && a.col === b.col;
};

export const isRowColEqual = (row: number, col: number, tile: TileType) => {
  return row === tile.row && col === tile.col;
};

export const createGrid = (startTile: TileType, endTile: TileType) => {
  const grid: GridType = [];

  for (let r = 0; r < MAX_ROWS; r++) {
    grid.push(createRow(r, startTile, endTile));
  }
  return grid;
};

export const resetGrid = ({
  grid,
  startTile = START_TILE_CONFIG,
  endTile = END_TILE_CONFIG,
}: {
  grid: GridType;
  startTile?: TileType;
  endTile: TileType;
}) => {
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      const tile = grid[row][col];
      tile.distance = Infinity;
      tile.isVisited = false;
      tile.isPath = false;
      tile.parent = null;
      tile.isWall = false;

      if (!isEqual(startTile, tile) && !isEqual(endTile, tile)) {
        const tileEle = document.getElementById(`${tile.row}-${tile.col}`);

        if (tileEle) {
          tileEle.className = TILE_STYLE;
        }

        if (tile.row === MAX_ROWS - 1) {
          tileEle?.classList.add("border-b");
        }

        if (tile.col === 0) {
          tileEle?.classList.add("border-l");
        }
      }
    }
  }

  return null;
};

export const checkIfStartOrEndTile = (row: number, col: number): boolean => {
  return (
    (row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2)
  );
};

export const createNewGrid = (
  grid: GridType,
  row: number,
  col: number
): TileType[][] => {
  const newGrid = grid.slice();
  const newTile = {
    ...newGrid[row][col],
    isWall: !newGrid[row][col].isWall,
  };

  newGrid[row][col] = newTile;

  return newGrid;
};

export const runMazeAlgorithm = async ({
  maze,
  grid,
  startTile,
  endTile,
  setIsDisabled,
  speed,
}: {
  maze: MazeType;
  grid: GridType;
  speed: SpeedType;
  endTile: TileType;
  startTile: TileType;
  setIsDisabled: (isDisabled: boolean) => void;
}) => {
  if (maze === "BINARY_TREE") {
    await binaryTree({ grid, startTile, endTile, setIsDisabled, speed });
  } else if (maze === "RECURSIVE_DIVISION") {
    const currentSpeed = SPEEDS.find((s) => s.value === speed)!.value ?? 2;
    await constructBorder({ grid, startTile, endTile });
    await recursiveDivision({
      grid,
      speed,
      row: 1,
      col: 1,
      endTile,
      startTile,
      height: Math.floor((MAX_ROWS - 1) / 2),
      width: Math.floor((MAX_COLS - 1) / 2),
      setIsDisabled,
    });
    setTimeout(() => {
      setIsDisabled(false);
    }, 800 * currentSpeed);
  }
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getRandInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const checkStack = (tile: TileType, stack: TileType[]) => {
  for (let i = 0; i < stack.length; i++) {
    if (isEqual(stack[i], tile)) return true;
  }
  return false;
};

export const dropFromQueue = (tile: TileType, queue: TileType[]) => {
  for (let i = 0; i < queue.length; i++) {
    if (isEqual(tile, queue[i])) {
      queue.splice(i, 1);
      break;
    }
  }
};
