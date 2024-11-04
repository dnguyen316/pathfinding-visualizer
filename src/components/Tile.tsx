import { twMerge } from "tailwind-merge";
import {
  END_TILE_STYLE,
  PATH_TILE_STYLE,
  START_TILE_STYLE,
  TILE_STYLE,
  VISITED_STYLE,
  WALL_TILE_STYLE,
} from "../utils/styles";
import { MAX_ROWS } from "../utils/constants";

interface MouseActionFunc {
  (row: number, col: number): void;
}

interface TilePropsInterface {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
  isVisited: boolean;
  handleMouseDown: MouseActionFunc;
  handleMouseUp: MouseActionFunc;
  handleMouseEnter: MouseActionFunc;
}

const Tile = ({
  row,
  col,
  isEnd,
  isPath,
  isWall,
  isStart,
  isVisited,
  handleMouseUp,
  handleMouseDown,
  handleMouseEnter,
}: TilePropsInterface) => {
  let tileStyle;

  if (isStart) {
    tileStyle = START_TILE_STYLE;
  } else if (isEnd) {
    tileStyle = END_TILE_STYLE;
  } else if (isWall) {
    tileStyle = WALL_TILE_STYLE;
  } else if (isPath) {
    tileStyle = PATH_TILE_STYLE;
  } else if (isVisited) {
    tileStyle = VISITED_STYLE;
  } else {
    tileStyle = TILE_STYLE;
  }

  const borderStyle =
    row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "";
  const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? "border-l" : "";

  return (
    <div
      className={twMerge(tileStyle, borderStyle, edgeStyle)}
      id={`${row}-${col}`}
      onMouseUp={() => handleMouseUp(row, col)}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
    ></div>
  );
};

export default Tile;
