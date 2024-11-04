import { useContext } from "react";
import { TileContext } from "../context/TileContext";

export const useTile = () => {
  const context = useContext(TileContext);

  if (!context) {
    throw new Error("useTile must be used in TileContextProvider");
  }

  return context;
};
