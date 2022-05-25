import { Select } from "./Select";
import { COMPLEXITY_MEMORY_CARDS } from "../../../../consts/common";
import React from "react";
import { getNodeText, render, screen } from "@testing-library/react";
import { fireEvent, waitFor } from "@storybook/testing-library";

describe("Select", () => {
  it("Choose value", async () => {
    const { container } = render(
      <Select
        options={COMPLEXITY_MEMORY_CARDS}
        topLabel="Difficulty level"
        placeholder="Choose the difficulty level"
      />
    );
    expect(screen.getByText("Difficulty level")).toBeInTheDocument();
    expect(
      getNodeText(container.querySelector(".field") as HTMLElement)
    ).toEqual("Choose the difficulty level");
    expect(container.getElementsByClassName("panel").length).toBe(0);
    fireEvent.click(container.querySelector(".fieldWrap") as Element);
    await waitFor(() => {
      expect(container.querySelector(".panel")).toBeVisible();
    });
    const items = container.getElementsByClassName("panelItem");
    expect(items).toHaveLength(9);
    fireEvent.click(screen.getByText("6"));
    await waitFor(() => {
      expect(
        getNodeText(container.querySelector(".field") as HTMLElement)
      ).toEqual("6");
    });
    expect(container.getElementsByClassName("panel").length).toBe(0);
  });
});
