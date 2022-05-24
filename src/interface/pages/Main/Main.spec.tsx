import {
  act,
  screen,
  render,
  getNodeText,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Main } from "./Main";
import MOCK_DATA_THEMES from "../../../../public/data/ThemesMemoryCards.json";

describe("Main", () => {
  describe("render", () => {
    it("GeneralInfo", () => {
      const { container, getByTestId, getByText } = render(<Main />);
      //different methods of getting text
      expect(getByText("Hi, my friends")).toBeInTheDocument();
      expect(
        getNodeText(container.querySelector(".description") as HTMLElement)
      ).toEqual(
        'Happy to see you in the game "Memory Cards". Purpose of the game: open all the cards by finding the pairs.'
      );
      //for searching a part phrase
      const note = getByTestId("general-info-note");
      expect(note).toHaveTextContent("Before playing");
      // screen.debug();
    });

    it("Button", () => {
      const { container, getByRole } = render(<Main />);
      getByRole("button", { name: "Continue" });
      expect(container.getElementsByClassName("options").length).toBe(0);
      // screen.debug();
    });
  });
  describe("actions", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA_THEMES),
      })
    ) as jest.Mock;
    it("Actions after click 'Continue'", async () => {
      const { container, getByText, queryByTestId } = render(<Main />);
      act(() => {
        fireEvent.click(getByText("Continue"));
      });
      await waitFor(() => {
        expect(queryByTestId("button-continue")).not.toBeInTheDocument();
        expect(container.querySelector(".options")).toBeVisible();
      });

      //select "Difficulty level"
      expect(getByText("Difficulty level")).toBeInTheDocument();
      expect(
        getNodeText(container.querySelector(".field") as HTMLElement)
      ).toEqual("Choose the difficulty level");
      expect(container.getElementsByClassName("panel").length).toBe(0);
      act(() => {
        fireEvent.click(container.querySelector(".toggleButton") as Element);
      });
      await waitFor(() => {
        expect(container.querySelector(".panel")).toBeVisible();
        const items = container.getElementsByClassName("panelItem");
        expect(items).toHaveLength(9);
      });
      act(() => {
        fireEvent.click(getByText("6"));
      });
      await waitFor(() => {
        expect(container.getElementsByClassName("panel").length).toBe(0);
      });

      //RadioGroup "Choose the theme of cards"
      expect(getByText("Choose the theme of cards")).toBeInTheDocument();
      const radioAnimalTheme = container.querySelector(
        'input[value="animalTheme"]'
      ) as HTMLElement;
      const radioSuperHeroesTheme = container.querySelector(
        'input[value="superHeroesTheme"]'
      ) as HTMLElement;
      await waitFor(() => {
        expect(radioAnimalTheme).not.toBeChecked();
        expect(radioSuperHeroesTheme).not.toBeChecked();
      });
      act(() => {
        radioAnimalTheme.focus();
      });
      await waitFor(() => {
        expect(radioAnimalTheme).toHaveFocus();
      });
      act(() => {
        radioAnimalTheme.click();
      });
      await waitFor(() => {
        expect(radioAnimalTheme).toBeChecked();
        expect(radioSuperHeroesTheme).not.toBeChecked();
      });
      act(() => {
        radioSuperHeroesTheme.focus();
      });
      await waitFor(() => {
        expect(radioSuperHeroesTheme).toHaveFocus();
      });
      act(() => {
        radioSuperHeroesTheme.click();
      });
      await waitFor(() => {
        expect(radioAnimalTheme).not.toBeChecked();
        expect(radioSuperHeroesTheme).toBeChecked();
      });

      screen.debug();
    });
  });
});
