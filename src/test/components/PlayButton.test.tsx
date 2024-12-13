import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PlayButton from "../../components/PlayButton";

describe("PlayButton component", () => {
  it("should renders the button with correct Play icon", () => {
    render(
      <PlayButton
        isDisabled={false}
        handleRunVisualizer={() => {}}
        isGraphVisualized={false}
      />
    );

    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeTruthy();

    const playIcon = screen.getByTestId("play-icon");

    expect(playIcon).toBeTruthy();
  });

  it("should renders the reset icon button when isGraphVisualized is true", () => {
    render(
      <PlayButton
        isDisabled={false}
        handleRunVisualizer={() => {}}
        isGraphVisualized={true}
      />
    );
    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeTruthy();

    const playIcon = screen.getByTestId("reset-icon");
    expect(playIcon).toBeTruthy();
  });

  it("should call handleRunVisualizer on click", () => {
    const handleRunVisualizer = vi.fn();

    render(
      <PlayButton
        isDisabled={false}
        handleRunVisualizer={handleRunVisualizer}
        isGraphVisualized={true}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleRunVisualizer).toHaveBeenCalledTimes(1);
  });

  it("should disable the button when isDisabled is true", () => {
    render(
      <PlayButton
        isDisabled={true}
        handleRunVisualizer={() => {}}
        isGraphVisualized={true}
      />
    );

    const button = screen.getByRole("button");

    expect(button).toHaveProperty("disabled", true);
  });
});
