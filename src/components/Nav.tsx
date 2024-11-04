import { MutableRefObject, useState } from "react";
import { usePathFinding } from "../hooks/usePathFinding";
import { useTile } from "../hooks/useTile";
import {
  EXTENDED_SLEEP_TIME,
  MAZES,
  PATH_FINDING_ALGORITHMS,
  SLEEP_TIME,
  SPEEDS,
} from "../utils/constants";
import { resetGrid, runMazeAlgorithm } from "../utils/helpers";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import Select from "./Select";
import { useSpeed } from "../hooks/useSpeed";
import PlayButton from "./PlayButton";
import { runPathFindingAlgorithm } from "../utils/runPathFindingAlgorithm";
import { animatePath } from "../utils/animatePath";

interface NavPropsInterface {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}

const Nav = ({ isVisualizationRunningRef }: NavPropsInterface) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const {
    maze,
    setMaze,
    grid,
    setGrid,
    algorithm,
    setAlgorithm,
    isGraphVisualized,
    setIsGraphVisualized,
  } = usePathFinding();
  const { startTile, endTile } = useTile();
  const { speed, setSpeed } = useSpeed();

  const handleGenerateMaze = async (maze: MazeType) => {
    if (maze === "NONE") {
      setMaze(maze);
      resetGrid({ grid, startTile, endTile });
      return;
    }

    setMaze(maze);
    setIsDisabled(true);
    await runMazeAlgorithm({
      maze,
      grid,
      speed,
      endTile,
      startTile,
      setIsDisabled,
    });

    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(false);
  };

  const handleRunVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid({ grid: grid.slice(), startTile, endTile });
      return;
    }

    // run the algorithm
    const { visitedTiles, path } = runPathFindingAlgorithm({
      algorithm,
      grid,
      startTile,
      endTile,
    });

    animatePath({ visitedTiles, path, startTile, endTile, speed });
    setIsDisabled(true);
    isVisualizationRunningRef.current = true;

    const delay =
      SLEEP_TIME * (visitedTiles.length + SLEEP_TIME * 2) +
      EXTENDED_SLEEP_TIME *
        (path.length + 60) *
        SPEEDS.find((s) => s.value === speed)!.value;

    setTimeout(() => {
      const newGrid = grid.slice();
      setGrid(newGrid);
      setIsGraphVisualized(true);
      setIsDisabled(false);
      isVisualizationRunningRef.current = false;
    }, delay);
  };

  return (
    <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
      <div className="flex items-center lg-justify-between justify-center w-full sm:w-[52rem]">
        <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
          Path Finding Visualize
        </h1>
        <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
          <Select
            label="Maze"
            value={maze}
            options={MAZES}
            onChange={(e) => handleGenerateMaze(e.target.value as MazeType)}
          />
          <Select
            label="Graph"
            value={algorithm}
            options={PATH_FINDING_ALGORITHMS}
            onChange={(e) => {
              setAlgorithm(e.target.value as AlgorithmType);
            }}
          />
          <Select
            label="Speed"
            value={speed}
            options={SPEEDS}
            onChange={(e) => setSpeed(parseFloat(e.target.value) as SpeedType)}
          />
          <PlayButton
            isDisabled={isDisabled}
            isGraphVisualized={isGraphVisualized}
            handleRunVisualizer={handleRunVisualizer}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
