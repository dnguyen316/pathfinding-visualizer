import { twMerge } from "tailwind-merge";
import { usePathFinding } from "../hooks/usePathFinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import Tile from "./Tile";
import { MutableRefObject, useState } from "react";
import { checkIfStartOrEndTile, createNewGrid } from "../utils/helpers";

interface GridPropsInterface {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}

const Grid = ({ isVisualizationRunningRef }: GridPropsInterface) => {
  const { grid, setGrid } = usePathFinding();
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEndTile(row, col)) {
      return;
    }

    setIsMouseDown(true);
    const newGrid = createNewGrid(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEndTile(row, col)) {
      return;
    }

    setIsMouseDown(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEndTile(row, col)) {
      return;
    }

    if (isMouseDown) {
      const newGrid = createNewGrid(grid, row, col);
      setGrid(newGrid);
    }
  };

  return (
    <div
      className={twMerge(
        //Base classes
        "flex items-center flex-col justify-center border-sky-300",
        //Control Grid Height
        `lg:min-h-[${MAX_ROWS * 17}px] md:min-h[${MAX_ROWS * 15}] xs:min-h-[${
          MAX_ROWS * 8
        }px] min-h-[${MAX_ROWS * 7}px]`,
        //Control Grid width
        `lg:w-[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] xs:w-[${
          MAX_COLS * 8
        }px] w-[${MAX_COLS * 7}px]`
      )}
    >
      {grid.map((row, index) => (
        <div key={index} className="flex" role="row">
          {row.map((tile, tileIndex) => {
            const { row, col, isEnd, isStart, isPath, isVisited, isWall } =
              tile;
            return (
              <Tile
                key={tileIndex}
                row={tile.row}
                col={tile.col}
                isEnd={isEnd}
                isPath={isPath}
                isStart={isStart}
                isVisited={isVisited}
                isWall={isWall}
                handleMouseDown={() => handleMouseDown(row, col)}
                handleMouseUp={() => handleMouseUp(row, col)}
                handleMouseEnter={() => handleMouseEnter(row, col)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
