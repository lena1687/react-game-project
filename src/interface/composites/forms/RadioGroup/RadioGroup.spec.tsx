import { RadioGroup } from "./RadioGroup";
import React from "react";
import MOCK_DATA_THEMES from "../../../../../public/data/ThemesMemoryCards.json";
import {
  act,
  render,
  waitFor,
  screen,
  fireEvent,
} from "@testing-library/react";

describe("RadioGroup", () => {
  it("Choose value", async () => {
    const { container } = render(
      <RadioGroup
        options={MOCK_DATA_THEMES}
        name="ThemesMemoryCards"
        heading="Choose the theme of cards"
      />
    );

    expect(screen.getByText("Choose the theme of cards")).toBeInTheDocument();
    const radioAnimalTheme = container.querySelector(
      'input[value="animalTheme"]'
    ) as HTMLElement;
    const radioSuperHeroesTheme = container.querySelector(
      'input[value="superHeroesTheme"]'
    ) as HTMLElement;
    await waitFor(() => {
      expect(radioAnimalTheme).not.toBeChecked();
    });
    expect(radioSuperHeroesTheme).not.toBeChecked();
    act(() => {
      radioAnimalTheme.focus();
    });
    await waitFor(() => {
      expect(radioAnimalTheme).toHaveFocus();
    });
    fireEvent.click(radioAnimalTheme);
    await waitFor(() => {
      expect(radioAnimalTheme).toBeChecked();
    });
    expect(radioSuperHeroesTheme).not.toBeChecked();
    act(() => {
      radioSuperHeroesTheme.focus();
    });
    await waitFor(() => {
      expect(radioSuperHeroesTheme).toHaveFocus();
    });
    fireEvent.click(radioSuperHeroesTheme);
    await waitFor(() => {
      expect(radioAnimalTheme).not.toBeChecked();
    });
    expect(radioSuperHeroesTheme).toBeChecked();
  });
});
